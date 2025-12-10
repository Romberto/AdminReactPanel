import { useGetBlogsQuery } from '../../../api/blogsApi'
import BlogCard from '../../blog/components/BlogCard'

export default function BlogListPage() {
  const { data: blogs, isLoading } = useGetBlogsQuery({
    skip: 0,
    limit: 100,
    only_published: false,
  } as any)
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {blogs?.map((b) => (
          <BlogCard key={b.id} blog={b} />
        ))}
      </div>
    </div>
  )
}