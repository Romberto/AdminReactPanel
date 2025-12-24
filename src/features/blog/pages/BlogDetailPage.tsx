import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  useDeleteBlogImageMutation,
  useGetBlogBySlugQuery,
} from '../../../api/blogsApi'
import BlogImageUploader from '../components/BlogImageUploader'

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string | null>(null)
  const { data: blog, isLoading, refetch } = useGetBlogBySlugQuery(slug!)
  const [deleteImage] = useDeleteBlogImageMutation()
  const [deleteBlog] = useDeleteBlogImageMutation()

  if (isLoading) return <div>Loading...</div>
  if (!blog) return <div>Not found</div>

  const handleDelete = async (blog_id: string) => {
    if (!confirm('Удалить фото?')) return
    await deleteImage({ blog_id: blog_id })
  }

  const handleDeleteBlog = async () => {
    if (!confirm('Delete project?')) return
    await deleteBlog({ blog_id: blog.id })
    navigate('/dashboard')
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl">{blog.title}</h1>
        <div className="flex gap-2">
          <a className="text-blue-600" href={`/blogs`}>
            Home
          </a>
          <a className="text-blue-600" href={`/blogs/${blog.slug}/edit`}>
            Edit
          </a>
          <button className="text-red-600" onClick={handleDeleteBlog}>
            Delete
          </button>
        </div>
      </div>

      <div className="mb-4">
        <p>Работа с изображением</p>
        <p>{blog.title}</p>
        <p className="text-sm text-slate-500">Slug: {blog.slug}</p>
        <p className="text-sm text-slate-500">
          Published: {blog.is_published ? 'Yes' : 'No'}
        </p>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Images</h3>
        <BlogImageUploader
          blogId={blog.id}
          blogSlug={blog.slug}
          onUploaded={() => refetch()}
        />
      </div>
      {blog.public_url && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          <div
            className="relative group cursor-pointer"
            onClick={() => setSelected(blog.id)}
          >
            <img
              src={`${blog.public_url}`}
              alt={blog.public_url || ''}
              className="w-full h-40 object-cover rounded-lg shadow-sm"
            />

            {/* Кнопка удаления */}
            <button
              onClick={e => {
                e.stopPropagation()
                handleDelete(blog.id)
              }}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-sm rounded opacity-0 group-hover:opacity-100 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
