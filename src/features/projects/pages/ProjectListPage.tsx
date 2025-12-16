import React from 'react'
import { Link } from 'react-router-dom'
import { useGetProjectsQuery } from '../../../api/projectsApi'
import ProjectCard from '../components/ProjectCard'

export default function ProjectListPage() {
  const { data: projects, isLoading } = useGetProjectsQuery({
    skip: 0,
    limit: 100,
    only_published: false,
  } as any)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl">Projects</h1>
        <Link
          to="/projects/create"
          className="bg-green-600 text-white px-3 py-2 rounded"
        >
          Create project
        </Link>
      </div>

      {isLoading && <div>Loading...</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects?.map(p => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  )
}
