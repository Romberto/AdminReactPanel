import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useCreateProjectMutation } from '../../../api/projectsApi'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  is_published: z.boolean().optional(),
  shot_description: z.string().optional(),
  quadrature: z.number().optional(),
  floors: z.number().optional(),
  bedrooms: z.number().optional()
})

type Form = z.infer<typeof schema>

export default function ProjectCreatePage() {
  const { register, handleSubmit } = useForm<Form>({ resolver: zodResolver(schema) })
  const [createProject] = useCreateProjectMutation()
  const navigate = useNavigate()

  const onSubmit = async (data: Form) => {
    try {
      const res = await createProject(data as any).unwrap()
      navigate(`/projects/${res.slug}`)
    } catch (err) {
      alert('Create failed')
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Create project</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 max-w-lg">
        <input className="border p-2 w-full" placeholder="Title" {...register('title')} />
        <input className="border p-2 w-full" placeholder="Slug" {...register('slug')} />
        <textarea className="border p-2 w-full" placeholder="Description" {...register('description')} />
        <textarea className="border p-2 w-full" placeholder="Shot_Description" {...register('shot_description')} />
        <input className="border p-2 w-full" placeholder="Quadrature" {...register('quadrature')} />
        <input className="border p-2 w-full" placeholder="Floors" {...register('floors')} />
        <input className="border p-2 w-full" placeholder="Bedrooms" {...register('bedrooms')} />
        
        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register('is_published')} />
            <span>Published</span>
          </label>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">Create</button>
      </form>
    </div>
  )
}
