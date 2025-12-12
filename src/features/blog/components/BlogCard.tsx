import React from 'react'
import type { BlogsRead } from '../types'
import { Link } from 'react-router-dom'

const BlogCard: React.FC<{ blog: BlogsRead }> = ({ blog }) => {
  const previewImage =
    blog.images?.find((img) => img.is_preview === true) ||
    blog.images?.[0] ||
    null
  return (
    <div className="border rounded shadow hover:shadow-md overflow-hidden">
      <Link to={`/blogs/${blog.slug}/edit`}>
        <div className="h-48 bg-slate-100 flex items-center justify-center">
          {previewImage ? (
            <img
              src={previewImage.public_url}
              alt={blog.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="text-slate-400">No preview</div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{blog.title}</h3>
        <p className="text-sm text-slate-600">{blog.slug}</p>
        <div className="mt-3 flex gap-2">
          <Link
            to={`/blogs/${blog.slug}/edit`}
            className="text-sm text-blue-600"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogCard