import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetProjectBySlugQuery, useDeleteProjectMutation, useUploadImageMutation, useDeleteImageMutation, useReorderImagesMutation } from '../../../api/projectsApi'
import ImageUploader from '../components/ImageUploader'
import ImageReorder from '../components/ImageReorder'

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { data: project, isLoading, refetch } = useGetProjectBySlugQuery(slug!)
  const [deleteProject] = useDeleteProjectMutation()
  const [uploadImage] = useUploadImageMutation()
  const [deleteImage] = useDeleteImageMutation()
  const [reorderImages] = useReorderImagesMutation()

  if (isLoading) return <div>Loading...</div>
  if (!project) return <div>Not found</div>

  const handleDelete = async () => {
    if (!confirm('Delete project?')) return
    await deleteProject(project.id)
    navigate('/dashboard')
  }

  const handleFile = async (file: File) => {
    await uploadImage({ project_id: project.id, file })
    refetch()
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl">{project.title}</h1>
        <div className="flex gap-2">
          <a className="text-blue-600" href={`/projects/${project.slug}/edit`}>Edit</a>
          <button className="text-red-600" onClick={handleDelete}>Delete</button>
        </div>
      </div>

      <div className="mb-4">
        <p>{project.description}</p>
        <p className="text-sm text-slate-500">Slug: {project.slug}</p>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Images</h3>
        <ImageUploader projectId={project.id} onUploaded={() => refetch()} />
        <div className="mt-4">
          <ImageReorder images={project.images ?? []} projectId={project.id} onReordered={() => refetch()} />
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {project.images?.map(img => (
            <div key={img.id} className="border p-2">
              <img src={`${import.meta.env.VITE_API_URL}/${img.file_path}`} alt={img.caption || ''} className="w-full h-40 object-cover" />
              <div className="flex justify-between mt-2">
                <button className="text-sm text-red-600" onClick={() => { if(confirm('Delete image?')) { deleteImage({ project_id: project.id, image_id: img.id }); refetch(); } }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
