import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  useGetProjectBySlugQuery,
  useDeleteProjectMutation,
  useUploadImageMutation,
  useDeleteImageMutation,
  useReorderImagesMutation,
  useIsPreviewImagesMutation,
  useIsPlanImagesMutation,
  useIsGalleryImagesMutation,
} from '../../../api/projectsApi'
import ImageUploader from '../components/ImageUploader'

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { data: project, isLoading, refetch } = useGetProjectBySlugQuery(slug!)
  const [deleteProject] = useDeleteProjectMutation()
  const [deleteImage] = useDeleteImageMutation()
  const [isPreviewImage] = useIsPreviewImagesMutation()
  const [isPlanImage] = useIsPlanImagesMutation()
  const [isGalleryImage] = useIsGalleryImagesMutation()

  // ⭐ локальный стейт для мгновенного отображения бордера
  const [previewId, setPreviewId] = useState<string | null>(null)
  const [planIds, setPlanIds] = useState<string[] | null>(null)
  const [galleryIds, setGalleryIds] = useState<string[] | null>(null)

  // Устанавливаем previewId при загрузке
  useEffect(() => {
    if (project?.images) {
      const previewImg = project.images.find(img => img.is_preview)
      setPreviewId(previewImg ? previewImg.id : null)
      const planImgs = project.images.filter(Img => Img.is_plan)
      if (planImgs.length > 0) {
        setPlanIds(planImgs.map(img => img.id))
      } else {
        setPlanIds(null)
      }
      const gelleryImgs = project.images.filter(img => img.is_gallery)
      if (gelleryImgs.length > 0) {
        setGalleryIds(gelleryImgs.map(img => img.id))
      } else {
        setGalleryIds(null)
      }
    }
  }, [project])

  if (isLoading) return <div>Loading...</div>
  if (!project) return <div>Not found</div>

  const handleDelete = async () => {
    if (!confirm('Delete project?')) return
    await deleteProject(project.id)
    navigate('/dashboard')
  }
  console.log()
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl">{project.title}</h1>
        <div className="flex gap-2">
          <Link className="text-blue-600" to={`/dashboard`}>
            Home
          </Link>
          <Link className="text-blue-600" to={`/projects/${project.slug}/edit`}>
            Edit
          </Link>
          <button className="text-red-600" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className="mb-4">
        <p>{project.description}</p>
        <p className="text-sm text-slate-500">Slug: {project.slug}</p>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Images</h3>

        <ImageUploader
          projectSlug={project.slug}
          projectId={project.id}
          onUploaded={() => refetch()}
        />

        <div className="grid grid-cols-3 gap-2 mt-4">
          {project.images?.map(img => (
            <div
              key={img.id}
              className={`
                p-2 min-w-[220px]
                
                ${planIds?.includes(img.id) ? 'border-4 border-green-400' : ''}
                ${galleryIds?.includes(img.id) ? 'border-4 border-sky-400' : ''}
                ${previewId === img.id ? 'border-4 border-yellow-400' : 'border'}
              `}
            >
              <img
                src={img.public_url}
                alt={img.caption || ''}
                className="w-full h-40 object-cover"
              />

              <div className="flex justify-between mt-2">
                {/* DELETE */}
                <button
                  className="text-sm text-red-600"
                  onClick={() => {
                    if (confirm('Delete image?')) {
                      deleteImage({ project_id: project.id, image_id: img.id })
                      refetch()
                    }
                  }}
                >
                  Delete
                </button>

                {/* SET PREVIEW */}
                <button
                  className="text-sm text-blue-700"
                  onClick={async () => {
                    // 1. отправляем запрос
                    await isPreviewImage({
                      project_id: project.id,
                      image_id: img.id,
                    })

                    // 2. мгновенно показываем жёлтую рамку
                    setPreviewId(img.id)

                    // 3. обновляем проект с сервера
                    refetch()
                  }}
                >
                  Is preview
                </button>
                {/* SET GALLERY*/}
                <button
                  className="text-sm text-blue-700"
                  onClick={async () => {
                    // 1. отправляем запрос
                    await isGalleryImage({
                      image_id: img.id,
                    })

                    // 2. мгновенно показываем жёлтую рамку
                    setGalleryIds(prev => (prev ? [...prev, img.id] : [img.id]))

                    // 3. обновляем проект с сервера
                    refetch()
                  }}
                >
                  Is gallery
                </button>
                {/* SET PLAN */}
                <button
                  className="text-sm text-blue-700"
                  onClick={async () => {
                    // 1. отправляем запрос
                    await isPlanImage({
                      image_id: img.id,
                    })

                    // 2. мгновенно показываем жёлтую рамку
                    setPlanIds(prev => (prev ? [...prev, img.id] : [img.id]))

                    // 3. обновляем проект с сервера
                    refetch()
                  }}
                >
                  Is plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
