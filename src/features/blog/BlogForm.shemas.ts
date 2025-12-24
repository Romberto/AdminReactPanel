import * as z from 'zod'

export const blogFormSchema = z.object({
  title: z.string().min(1, 'Обязательное поле'),
  slug: z.string().min(1, 'Обязательное поле'),
  is_published: z.boolean().optional(),
  article: z.string().optional(),
  excerpt: z.string().optional(),
})

export type BlogFormValues = z.infer<typeof blogFormSchema>

export const blogUpdateFormSchema = z.object({
  title: z.string().min(1, 'Обязательное поле'),
  is_published: z.boolean().optional(),
  article: z.string().optional(),
  excerpt: z.string().optional(),
})

export type BlogUpdateFormValues = z.infer<typeof blogUpdateFormSchema>

