import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetBlogBySlugQuery } from '../../../api/blogsApi'
import BlogImageUploader from '../components/BlogImageUploader'

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { data: blog, isLoading, refetch } = useGetBlogBySlugQuery(slug!)
  if (isLoading) return <div>Loading...</div>
  if (!blog) return <div>Not found</div>
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
        <img
          src={`${blog.public_url}`}
          alt={blog.public_url || ''}
          className="w-full h-40 object-cover rounded-lg shadow-sm"
        />
      )}
    </div>
  )
}
