import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetProjectBySlugQuery, useUpdateProjectMutation } from '../../../api/projectsApi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().optional(),
  is_published: z.boolean().optional(),
  preview_image_id: z.number().optional().nullable()
})

type Form = z.infer<typeof schema>

export default function ProjectEditPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: project } = useGetProjectBySlugQuery(slug!)
  const [updateProject] = useUpdateProjectMutation()
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm<Form>({ resolver: zodResolver(schema) })

  React.useEffect(() => {
    if (project) reset({
      title: project.title,
      slug: project.slug,
      description: project.description ?? undefined,
      is_published: project.is_published,
      preview_image_id: project.preview_image_id ?? undefined
    })
  }, [project])

  const onSubmit = async (data: Form) => {
    try {
      await updateProject({ project_id: project!.id, body: data as any }).unwrap()
      navigate(`/projects/${data.slug ?? project!.slug}`)
    } catch (err) {
      alert('Update failed')
    }
  }

  if (!project) return <div>Loading...</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Edit project</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 max-w-lg">
        <input className="border p-2 w-full" placeholder="Title" {...register('title')} />
        <input className="border p-2 w-full" placeholder="Slug" {...register('slug')} />
        <textarea className="border p-2 w-full" placeholder="Description" {...register('description')} />
        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register('is_published')} />
            <span>Published</span>
          </label>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Save</button>
      </form>
    </div>
  )
}
