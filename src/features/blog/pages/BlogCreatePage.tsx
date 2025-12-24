import { useCreateBlogMutation } from '../../../api/blogsApi'
import { useNavigate } from 'react-router-dom'
import { BlogForm } from '../components/BlogForm'
import { BlogFormValues } from '../BlogForm.shemas'

export default function BlogCreatePage() {
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

      <BlogForm onSubmit={onSubmit} />
    </div>
  )
}
