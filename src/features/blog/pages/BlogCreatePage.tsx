import { useCreateBlogMutation } from '../../../api/blogsApi'
import { useNavigate } from 'react-router-dom'
import { BlogForm } from '../components/BlogForm'
import { blogFormSchema, BlogFormValues } from '../BlogForm.shemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export default function BlogCreatePage() {
  const { register, handleSubmit, reset } = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
  })
  const [createBlog] = useCreateBlogMutation()
  const navigate = useNavigate()

  const onSubmit = async (data: BlogFormValues) => {
    try {
      const res = await createBlog(data).unwrap()
      navigate(`/blogs/${res.slug}`)
    } catch {
      alert('Create failed')
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Создание статьи</h1>
      <BlogForm register={register} onSubmit={handleSubmit(onSubmit)} />
    </div>
  )
}
