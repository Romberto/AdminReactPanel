import { useState } from 'react'
import { BlogsImageRead } from '../types'
import { useDeleteBlogImageMutation } from '../../../api/blogsApi'

interface Props {
  blogId: number
  images?: BlogsImageRead[]
}

export default function BlogImageGallery({ blogId, images = [] }: Props) {
  const [selected, setSelected] = useState<BlogsImageRead | null>(null)
  const [deleteBlogImage] = useDeleteBlogImageMutation()

  const handleDelete = async (img: BlogsImageRead) => {
    if (!confirm('Удалить фото?')) return
    await deleteBlogImage({ blog_id: blogId, image_id: img.id })
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {images.map(img => (
          <div
            key={img.id}
            className="relative group cursor-pointer"
            onClick={() => setSelected(img)}
          >
            <img
              src={`${img.public_url}`}
              alt=""
              className="w-full h-40 object-cover rounded-lg shadow-sm"
            />

            {/* Кнопка удаления */}
            <button
              onClick={e => {
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
            src={`${selected.public_url}`}
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
