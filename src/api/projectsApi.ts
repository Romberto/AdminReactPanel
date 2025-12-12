import { api } from './base'
import { ProjectRead, ProjectCreate, ProjectUpdate, ImageRead } from '../features/projects/types'

export const projectsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProjects: build.query<ProjectRead[], { skip?: number; limit?: number; search?: string; only_published?: boolean } | void>({
      query: (params) => {
        const query = params ? new URLSearchParams(params as any).toString() : ''
        return { url: `/api/v1/projects/?${query}` }
      },
      providesTags: ['Projects']
    }),
    getProjectBySlug: build.query<ProjectRead, string>({
      query: (slug) => `/api/v1/projects/${slug}`,
      providesTags: ['Projects']
    }),
    createProject: build.mutation<ProjectRead, ProjectCreate>({
      query: (body) => ({ url: '/api/v1/admin/projects', method: 'POST', body }),
      invalidatesTags: ['Projects']
    }),
    updateProject: build.mutation<ProjectRead, { project_id: number; body: ProjectUpdate }>({
      query: ({ project_id, body }) => ({ url: `/api/v1/admin/projects/${project_id}`, method: 'PUT', body }),
      invalidatesTags: ['Projects']
    }),
    deleteProject: build.mutation<{ message: string }, number>({
      query: (project_id) => ({ url: `/api/v1/admin/projects/${project_id}`, method: 'DELETE' }),
      invalidatesTags: ['Projects']
    }),
    uploadImage: build.mutation<ImageRead, { project_id: number, public_url: string , path_to_file: string }>({
      query: ({ project_id, public_url, path_to_file }) => {
        return {
          url: `/api/v1/admin/projects/${project_id}/images`,
          method: 'POST',
          body: { public_url, path_to_file }
        }
      },
      invalidatesTags: ['Images', 'Projects']
    }),
    deleteImage: build.mutation<{ message: string }, { project_id: number; image_id: number }>({
      query: ({ project_id, image_id }) => ({ url: `/api/v1/admin/projects/${project_id}/images/${image_id}`, method: 'DELETE' }),
      invalidatesTags: ['Images', 'Projects']
    }),
    reorderImages: build.mutation<{ message: string }, { project_id: number; orders: Record<number, number> }>({
      query: ({ project_id, orders }) => ({ url: `/api/v1/admin/projects/${project_id}/images/reorder`, method: 'POST', body: orders }),
      invalidatesTags: ['Images', 'Projects']
    }),
    isPreviewImages: build.mutation<{ message: string }, { project_id: number; image_id: number }>({
      query: ({ project_id, image_id }) => ({ url: `/api/v1/admin/projects/${project_id}/images/ispreview/${image_id}`, method: 'POST' }),
      invalidatesTags: ['Images', 'Projects']
    })
  })
})

export const {
  useGetProjectsQuery,
  useGetProjectBySlugQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useUploadImageMutation,
  useDeleteImageMutation,
  useReorderImagesMutation,
  useIsPreviewImagesMutation
} = projectsApi
