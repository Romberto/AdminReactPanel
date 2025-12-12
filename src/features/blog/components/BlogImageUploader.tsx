import React, { useState } from 'react'
import { useUploadBlogImageMutation } from '../../../api/blogsApi'

type Props = {
  blogId: number
  onUploaded?: () => void
}

export default function BlogImageUploader({ blogId, onUploaded }: Props) {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [progress, setProgress] = useState<Record<string, number>>({})
  const [uploadBlogImage] = useUploadBlogImageMutation()

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const f = Array.from(e.target.files)
    setFiles(f)
    setPreviews(f.map((file) => URL.createObjectURL(file)))
  }

  const uploadAll = async () => {
    for (const file of files) {
      setProgress((prev) => ({ ...prev, [file.name]: 0 }))
      try {
        await uploadBlogImage({ blog_id: blogId, file }).unwrap()
        setProgress((prev) => ({ ...prev, [file.name]: 100 }))
      } catch (err) {
        console.error('Upload failed', err)
        setProgress((prev) => ({ ...prev, [file.name]: -1 }))
      }
    }
    setFiles([])
    setPreviews([])
    onUploaded && onUploaded()
  }
  return (
    <div className="p-2 border rounded">
      <label className="block mb-2">Upload images (multiple)</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleSelect}
      />
      {previews.length > 0 && (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {previews.map((p, i) => (
            <div key={p} className="relative">
              <img src={p} className="w-full h-24 object-cover rounded" />
              <div className="text-xs truncate">{files[i].name}</div>
              <div className="h-2 bg-slate-200 rounded mt-1">
                <div
                  style={{
                    width: `${Math.max(0, progress[files[i].name] || 0)}%`,
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
          }}
        >
          Clear
        </button>
      </div>
    </div>
  )
}

