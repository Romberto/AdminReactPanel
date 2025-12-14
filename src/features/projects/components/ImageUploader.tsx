import React, { useState } from 'react'
import { useUploadImageMutation } from '../../../api/projectsApi'
import convertToWebP from '../../../utils/utils'

type Props = {
  projectSlug: string
  projectId: number
  onUploaded?: () => void
}

export default function ImageUploader({ projectSlug, projectId, onUploaded }: Props) {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [progress, setProgress] = useState<Record<string, number>>({})
  const [error, setError] = useState<string | null>(null)

  const [uploadImage] = useUploadImageMutation()

  // ---------- Select ----------
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const f = Array.from(e.target.files)
    setFiles(f)
    setPreviews(f.map(file => URL.createObjectURL(file)))
    setError(null)
  }



  // ---------- Upload ----------
  const uploadAll = async () => {
    setError(null)

    for (const file of files) {
      try {
        setProgress(p => ({ ...p, [file.name]: 5 }))

        // 1️⃣ WebP
        const webpBlob = await convertToWebP (file)
        setProgress(p => ({ ...p, [file.name]: 25 }))

        // 2️⃣ Presigned URL
        const presignRes = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/admin/projects/storage/presign`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              slug: projectSlug,
              content_type: 'image/webp',
            }),
          }
        )

        if (!presignRes.ok) throw new Error('Presign failed')

        const { upload_url, public_url, file_path } =
          await presignRes.json()

        setProgress(p => ({ ...p, [file.name]: 50 }))

        // 3️⃣ Upload to Timeweb S3
        const uploadRes = await fetch(upload_url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'image/webp',
            'x-amz-acl': 'public-read'
          },
          body: webpBlob,
        })
        
        if (!uploadRes.ok) {
          throw new Error(`S3 upload failed: ${uploadRes.status}`)
        }
        
        setProgress(p => ({ ...p, [file.name]: 80 }))
        
        // 4️⃣ Save metadata — ТОЛЬКО если upload OK
        await uploadImage({
          project_id: projectId,
          public_url,
          path_to_file: file_path,
        }).unwrap()
        

        setProgress(p => ({ ...p, [file.name]: 100 }))
      } catch (err) {
        console.error(err)
        setProgress(p => ({ ...p, [file.name]: -1 }))
        setError(`Ошибка загрузки: ${file.name}`)
      }
    }

    setFiles([])
    setPreviews([])
    onUploaded?.()
  }

  return (
    <div className="p-2 border rounded">
      <label className="block mb-2">Upload images</label>
      <input type="file" multiple accept="image/*" onChange={handleSelect} />

      {previews.length > 0 && (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {previews.map((p, i) => (
            <div key={p}>
              <img src={p} className="w-full h-24 object-cover rounded" />
              <div className="h-2 bg-slate-200 rounded mt-1">
                <div
                  className="h-2 bg-green-500 rounded"
                  style={{
                    width: `${Math.max(0, progress[files[i].name] || 0)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 flex gap-2">
        <button
          onClick={uploadAll}
          disabled={!files.length}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Upload
        </button>

        <button
          className="border px-3 py-1 rounded"
          onClick={() => {
            setFiles([])
            setPreviews([])
            setError(null)
          }}
        >
          Clear
        </button>
      </div>

      {error && <div className="mt-2 text-red-600 text-sm">{error}</div>}
    </div>
  )
}
