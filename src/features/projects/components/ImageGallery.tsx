import { useState } from 'react'
import { ImageRead } from '../types'
import { useDeleteImageMutation } from '../../../api/projectsApi'


interface Props {
  projectId: number
  images: ImageRead[]
}

export default function ImageGallery({ projectId, images }: Props) {
  const [selected, setSelected] = useState<ImageRead | null>(null)
  const [deleteImage] = useDeleteImageMutation()

  const handleDelete = async (img: ImageRead) => {
    if (!confirm('Удалить фото?')) return
    await deleteImage({ project_id: projectId, image_id: img.id })
  }


  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative group cursor-pointer"
            onClick={() => setSelected(img)}
          >
            <img
              src={`${img.file_path}`}
              alt={img.caption || ''}
              className="w-full h-40 object-cover rounded-lg shadow-sm"
            />

            {/* Кнопка удаления */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDelete(img)
              }}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-sm rounded opacity-0 group-hover:opacity-100 transition"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* FULLSCREEN MODAL */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <img
            src={`${selected.file_path}`}
            alt=""
            className="max-w-full max-h-full rounded-lg"
          />

          {/* Кнопка закрытия */}
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={() => setSelected(null)}
          >
            ✕
          </button>
        </div>
      )}
    </>
  )
}
