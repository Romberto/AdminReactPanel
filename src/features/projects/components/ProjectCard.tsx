import React from 'react'
import type { ProjectRead } from '../types'
import { Link } from 'react-router-dom'

const ProjectCard: React.FC<{ project: ProjectRead }> = ({ project }) => {
  const previewImage =
    project.images?.find(img => img.is_preview === true) ||
    project.images?.[0] ||
    null
  return (
    <div className="border rounded shadow hover:shadow-md overflow-hidden">
      <Link to={`/projects/${project.slug}/edit`}>
        <div className="h-48 bg-slate-100 flex items-center justify-center">
          {previewImage ? (
            <img
              src={previewImage.public_url}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="text-slate-400">No preview</div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="text-sm text-slate-600">{project.slug}</p>
        <div className="mt-3 flex gap-2">
          <Link
            to={`/projects/${project.slug}/edit`}
            className="text-sm text-blue-600"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
