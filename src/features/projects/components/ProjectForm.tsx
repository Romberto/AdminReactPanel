// ProjectForm.tsx

import { UseFormRegister } from 'react-hook-form'
import { ProjectFormValues } from '../projectForm.schema'

interface Props {
  register: UseFormRegister<ProjectFormValues>
  onSubmit: React.FormEventHandler<HTMLFormElement>
}
export default function ProjectForm({ register, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-6">
      {/* Basic info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Название проекта
          </label>
          <input
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Например: Nordic House 160"
            {...register('title')}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Slug (URL)
          </label>
          <input
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="nordic-house-160"
            {...register('slug')}
          />
        </div>
      </div>

      {/* Descriptions */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Описание проекта
        </label>
        <textarea
          rows={3}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Описание дома"
          {...register('description')}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Техническое описание
        </label>
        <textarea
          rows={3}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Короткое описание проекта"
          {...register('shot_description')}
        />
      </div>

      {/* Numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Площадь, м²
          </label>
          <input
            type="number"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('quadrature', { valueAsNumber: true })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Этажей</label>
          <input
            type="number"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('floors', { valueAsNumber: true })}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Спален</label>
          <input
            type="number"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('bedrooms', { valueAsNumber: true })}
          />
        </div>
      </div>

      {/* Publish */}
      <div className="flex items-center gap-3 rounded border p-3">
        <input
          type="checkbox"
          className="h-4 w-4 accent-blue-600"
          {...register('is_published')}
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium">Опубликовать проект</span>
          <span className="text-xs text-gray-500">
            Проект будет виден на сайте
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium"
        >
          Сохранить
        </button>
      </div>
    </form>
  )
}
