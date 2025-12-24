import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  useGetBlogBySlugQuery,
  useUpdateBlogMutation,
} from '../../../api/blogsApi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { blogUpdateFormSchema, BlogUpdateFormValues } from '../BlogForm.shemas'
import { BlogForm } from '../components/BlogForm'
import { BlogUpdateForm } from '../components/BlogUpdateForm'


export default function BlogEditPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: blog } = useGetBlogBySlugQuery(slug!)
  const [updateBlog] = useUpdateBlogMutation()
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm<BlogUpdateFormValues>({
    resolver: zodResolver(blogUpdateFormSchema),
  })

  React.useEffect(() => {
    if (blog)
      reset({
        title: blog.title,
        is_published: blog.is_published,
        article: blog.article,
        excerpt: blog.excerpt
      })
  }, [blog, reset])

  const onSubmit = async (data: BlogUpdateFormValues) => {
    try {
      await updateBlog({ blog_id: blog!.id, body: data as any }).unwrap()
      navigate(`/blogs/${ blog!.slug}`)
    } catch (err) {
      alert('Update failed')
    }
  }

  if (!blog) return <div>Loading...</div>
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Edit blog</h1>
      <BlogUpdateForm register={register} onSubmit={handleSubmit(onSubmit)} />
    </div>
  )
}
