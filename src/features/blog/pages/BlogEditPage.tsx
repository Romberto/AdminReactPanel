import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  useGetBlogBySlugQuery,
  useUpdateBlogMutation,
} from '../../../api/blogsApi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import BlogImageGallery from '../components/BlogImageGallery'

const schema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().optional(),
  is_published: z.boolean().optional(),
  preview_image_id: z.number().optional().nullable(),
})

type Form = z.infer<typeof schema>

export default function BlogEditPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: blog } = useGetBlogBySlugQuery(slug!)
  const [updateBlog] = useUpdateBlogMutation()
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm<Form>({
    resolver: zodResolver(schema),
  })

  React.useEffect(() => {
    if (blog)
      reset({
        title: blog.title,
        slug: blog.slug,
        description: blog.description ?? undefined,
        is_published: blog.is_published,
        preview_image_id: blog.preview_image_id ?? undefined,
      })
  }, [blog, reset])

  const onSubmit = async (data: Form) => {
    try {
      await updateBlog({ blog_id: blog!.id, body: data as any }).unwrap()
      navigate(`/blogs/${data.slug ?? blog!.slug}`)
    } catch (err) {
      alert('Update failed')
    }
  }

  if (!blog) return <div>Loading...</div>
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Edit blog</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 max-w-lg">
        <input
          className="border p-2 w-full"
          placeholder="Title"
          {...register('title')}
        />
        <input
          className="border p-2 w-full"
          placeholder="Slug"
          {...register('slug')}
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          {...register('description')}
        />
        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register('is_published')} />
            <span>Published</span>
          </label>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Save
        </button>
      </form>
      <BlogImageGallery blogId={blog.id} images={blog.images} />
    </div>
  )
}
