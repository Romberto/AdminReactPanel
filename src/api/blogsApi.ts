import { api } from './base'
import {
  BlogCreate,
  BlogsRead,
  BlogUpdate,
} from '../features/blog/types'

export const blogsApi = api.injectEndpoints({
  endpoints: build => ({
    getBlogs: build.query<
      BlogsRead[],
      {
        skip?: number
        limit?: number
        search?: string
        only_published?: boolean
      } | void
    >({
      query: params => {
        const query = params
          ? new URLSearchParams(params as any).toString()
          : ''
        return { url: `/api/v1/blog/?${query}` }
      },
      providesTags: ['Blogs'],
    }),
    getBlogBySlug: build.query<BlogsRead, string>({
      query: slug => `/api/v1/blog/${slug}`,
      providesTags: ['Blogs'],
    }),
    updateBlog: build.mutation<
      BlogsRead,
      { blog_id: string; body: BlogUpdate }
    >({
      query: ({ blog_id, body }) => ({
        url: `/api/v1/admin/blogs/${blog_id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Blogs'],
    }),
    uploadBlogImage: build.mutation<
      { message: string },
      { blog_id: string; public_url: string; path_to_file: string }
    >({
      query: ({ blog_id, public_url, path_to_file }) => {
        return {
          url: `/api/v1/admin/blogs/${blog_id}/images`,
          method: 'POST',
          body: { public_url, path_to_file },
        }
      },
      invalidatesTags: ['BlogsImages', 'Blogs'],
    }),
    deleteBlogImage: build.mutation<
      { message: string },
      { blog_id: string; image_id: string }
    >({
      query: ({ blog_id, image_id }) => ({
        url: `/api/v1/admin/blogs/${blog_id}/images/${image_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BlogsImages', 'Blogs'],
    }),
    createBlog: build.mutation<BlogsRead, BlogCreate>({
      query: body => ({ url: '/api/v1/admin/blogs', method: 'POST', body }),
      invalidatesTags: ['Blogs'],
    }),
  }),
})
export const {
  useGetBlogsQuery,
  useGetBlogBySlugQuery,
  useUpdateBlogMutation,
  useUploadBlogImageMutation,
  useDeleteBlogImageMutation,
  useCreateBlogMutation,
} = blogsApi
