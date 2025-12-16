import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useCreateProjectMutation } from '../../../api/projectsApi'
import { useNavigate } from 'react-router-dom'
import ProjectForm from '../components/ProjectForm'
import { projectFormSchema, ProjectFormValues } from '../projectForm.schema'

export default function ProjectCreatePage() {
  const { register, handleSubmit, reset } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
  })
  const [createProject] = useCreateProjectMutation()
  const navigate = useNavigate()

  const onSubmit = async (data: ProjectFormValues) => {
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

      <ProjectForm register={register} onSubmit={handleSubmit(onSubmit)} />
    </div>
  )
}
