import { api } from './base'
import { ProjectRead, ProjectCreate, ProjectUpdate, ImageRead } from '../features/projects/types'
import { BlogsRead } from '../features/blog/types';

export const blogsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBlogs: build.query<BlogsRead[], { skip?: number; limit?: number; search?: string; only_published?: boolean } | void>({
      query: (params) => {
        const query = params ? new URLSearchParams(params as any).toString() : ''
        return { url: `/api/v1/blog/?${query}` }
      },
      providesTags: ['Blogs']
    }),

})
})
export const {
  useGetBlogsQuery,
} = blogsApi

