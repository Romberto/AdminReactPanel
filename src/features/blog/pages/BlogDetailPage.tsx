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
        {blog.images && blog.images.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-4">
            {blog.images.map(img => (
              <div key={img.id} className="p-2 border">
                <img
                  src={img.public_url}
                  alt={blog.title}
                  className="w-full h-40 object-cover"
                />
                {img.is_preview && (
                  <p className="text-xs text-yellow-600 mt-1">Preview</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
