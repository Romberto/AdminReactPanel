import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  useGetProjectBySlugQuery,
  useUpdateProjectMutation,
} from '../../../api/projectsApi'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import ImageGallery from '../components/ImageGallery'
import ProjectForm from '../components/ProjectForm'
import { projectFormSchema, ProjectFormValues } from '../projectForm.schema'

export default function ProjectEditPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: project } = useGetProjectBySlugQuery(slug!)
  const [updateProject] = useUpdateProjectMutation()
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
  })

  React.useEffect(() => {
    if (project)
      reset({
        title: project.title,
        slug: project.slug,
        description: project.description ?? undefined,
        is_published: project.is_published,
        shot_description: project.shot_description ?? undefined,
        quadrature: project.quadrature ?? undefined,
        floors: project.floors ?? undefined,
        bedrooms: project.bedrooms ?? undefined,
      })
  }, [project])

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      await updateProject({
        project_id: project!.id,
        body: data as any,
      }).unwrap()
      navigate(`/projects/${data.slug ?? project!.slug}`)
    } catch (err) {
      alert('Update failed')
    }
  }

  if (!project) return <div>Loading...</div>
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Edit project</h1>
      <ProjectForm register={register} onSubmit={handleSubmit(onSubmit)} />
      {project?.images && (
        <ImageGallery projectId={project.id} images={project.images} />
      )}
    </div>
  )
}
