import { api } from './base'
import { BlogsImageRead, BlogsRead, BlogUpdate } from '../features/blog/types'



export const blogsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBlogs: build.query<
      BlogsRead[],
      { skip?: number; limit?: number; search?: string; only_published?: boolean } | void
    >({
      query: (params) => {
        const query = params ? new URLSearchParams(params as any).toString() : ''
        return { url: `/api/v1/blog/?${query}` }
      },
      providesTags: ['Blogs'],
    }),
    getBlogBySlug: build.query<BlogsRead, string>({
      query: (slug) => `/api/v1/blog/${slug}`,
      providesTags: ['Blogs'],
    }),
    updateBlog: build.mutation<BlogsRead, { blog_id: number; body: BlogUpdate }>({
      query: ({ blog_id, body }) => ({
        url: `/api/v1/admin/blogs/${blog_id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Blogs'],
    }),
    uploadBlogImage: build.mutation<BlogsImageRead, { blog_id: number; file: File }>({
      query: ({ blog_id, file }) => {
        const fd = new FormData()
        fd.append('file', file)
        return {
          url: `/api/v1/admin/blogs/${blog_id}/images`,
          method: 'POST',
          body: fd,
        }
      },
      invalidatesTags: ['BlogsImages', 'Blogs'],
    }),
    deleteBlogImage: build.mutation<
      { message: string },
      { blog_id: number; image_id: number }
    >({
      query: ({ blog_id, image_id }) => ({
        url: `/api/v1/admin/blogs/${blog_id}/images/${image_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BlogsImages', 'Blogs'],
    }),
  }),
})
export const {
  useGetBlogsQuery,
  useGetBlogBySlugQuery,
  useUpdateBlogMutation,
  useUploadBlogImageMutation,
  useDeleteBlogImageMutation,
} = blogsApi

