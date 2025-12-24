import { UseFormRegister } from 'react-hook-form'

import { BlogFormValues, BlogUpdateFormValues } from '../BlogForm.shemas'

type Props = {
  register: UseFormRegister<BlogUpdateFormValues> 
  onSubmit: React.FormEventHandler<HTMLFormElement>
}


export function BlogUpdateForm({ register, onSubmit }: Props) {

  return (
    <form
      onSubmit={(onSubmit)}
      className="max-w-3xl mx-auto space-y-8 bg-white p-6 rounded-xl shadow-sm"
    >
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1">Заголовок *</label>
        <input
          {...(register && register('title'))}
          className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Название статьи"
        />

      </div>


      {/* Excerpt */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Краткое описание
        </label>
        <textarea
          {...(register && register('excerpt'))}
          rows={3}
          className="w-full rounded-lg border px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Короткое описание статьи для карточек и SEO"
        />
      </div>

      {/* Article */}
      <div>
        <label className="block text-sm font-medium mb-1">Текст статьи</label>
        <textarea
          {...(register && register('article'))}
          rows={10}
          className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Основной текст статьи..."
        />
      </div>

      {/* Publish switch */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          {...(register && register('is_published'))}
          className="h-4 w-4 rounded border-gray-300"
        />
        <span className="text-sm">Опубликовать сразу</span>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="submit"
          className="rounded-lg bg-black px-6 py-2 text-white hover:bg-black/90 disabled:opacity-50"
        >Сохранить
        </button>
      </div>
    </form>
  )
}
