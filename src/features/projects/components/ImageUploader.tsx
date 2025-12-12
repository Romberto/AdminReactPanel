import React, { useEffect, useState } from 'react'
import { useUploadImageMutation } from '../../../api/projectsApi'
import { supabase } from '../../../lib/supabaseClient'

type Props = {
  projectSlug: string,
  projectId:number,
  onUploaded?: () => void
}

async function loginUser({ email, password }: { email: string; password: string }) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data
  } catch (e) {
    throw e
  }
}

const SUPABASE_EMAIL = import.meta.env.VITE_SUPABASE_EMAIL
const SUPABASE_PASSWORD = import.meta.env.VITE_SUPABASE_PASSWORD

export default function ImageUploader({ projectSlug, projectId, onUploaded }: Props) {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [progress, setProgress] = useState<Record<string, number>>({})
  const [uploadImage] = useUploadImageMutation()
  const [isAuth, setIsAuth] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    const { data } = await supabase.auth.getSession()
    if (data.session) {
      setIsAuth(true)
      return
    }
    if (!SUPABASE_EMAIL || !SUPABASE_PASSWORD) {
      console.error('SUPABASE_EMAIL or SUPABASE_PASSWORD env is missing')
      return
    }
    await loginUser({ email: SUPABASE_EMAIL, password: SUPABASE_PASSWORD })
    setIsAuth(true)
  }

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const f = Array.from(e.target.files)
    setFiles(f)
    setPreviews(f.map(file => URL.createObjectURL(file)))
    setError(null)
  }


  // ---------- Convert to WebP ----------
  const convertToWebP = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (!ctx) return reject("Canvas not supported")

        ctx.drawImage(img, 0, 0)

        canvas.toBlob(
          blob => {
            if (!blob) return reject("WebP conversion failed")
            resolve(blob)
          },
          'image/webp',
          0.7 // качество 70
        )
      }
      img.onerror = reject
      img.src = URL.createObjectURL(file)
    })
  }

  // ---------- Upload ----------
  const uploadAll = async () => {
    setError(null)
    for (const file of files) {
      try {
        setProgress(prev => ({ ...prev, [file.name]: 1 }))

        // 1) Convert to WebP
        const webpBlob = await convertToWebP(file)
        const newFileName = `${crypto.randomUUID()}.webp`
        setProgress(prev => ({ ...prev, [file.name]: 30 }))

        // 2) Upload to supabase storage
        const filePath = `${projectSlug}/${newFileName}`

        const { error: uploadErr } = await supabase
          .storage
          .from('projects')
          .upload(filePath, webpBlob, {
            contentType: 'image/webp',
            upsert: true
          })

        if (uploadErr) throw uploadErr
        setProgress(prev => ({ ...prev, [file.name]: 70 }))

        // 3) Get public URL
        const { data: publicData } = supabase
          .storage
          .from('projects')
          .getPublicUrl(filePath)

        const public_url = publicData.publicUrl
        console.log(public_url)
        // 4) Send metadata to backend via RTK Mutation
        await uploadImage({
          project_id: projectId,
          public_url,
          path_to_file: filePath
        }).unwrap()

        setProgress(prev => ({ ...prev, [file.name]: 100 }))
      } catch (err) {
        console.error(err)
        setProgress(prev => ({ ...prev, [file.name]: -1 }))
        const message = err instanceof Error ? err.message : 'Upload failed'
        setError(`Не удалось загрузить ${file.name}: ${message}`)
      }
    }

    setFiles([])
    setPreviews([])
    onUploaded && onUploaded()
  }

  return (
    <div className="p-2 border rounded">
      <label className="block mb-2">Upload images (multiple)</label>
      <input type="file" multiple accept="image/*" onChange={handleSelect} />

      {previews.length > 0 && (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {previews.map((p, i) => (
            <div key={p} className="relative">
              <img src={p} className="w-full h-24 object-cover rounded" />
              <div className="text-xs truncate">{files[i].name}</div>
              <div className="h-2 bg-slate-200 rounded mt-1">
                <div
                  style={{
                    width: `${Math.max(0, progress[files[i].name] || 0)}%`
                  }}
                  className="h-2 bg-green-500 rounded"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 flex gap-2">
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded"
          onClick={uploadAll}
          disabled={files.length === 0}
        >
          Upload
        </button>

        <button
          className="px-3 py-1 rounded border"
          onClick={() => {
            setFiles([])
            setPreviews([])
            setError(null)
          }}
        >
          Clear
        </button>
      </div>

      {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
    </div>
  )
}
