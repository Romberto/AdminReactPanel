import * as z from 'zod'

export const projectFormSchema = z.object({
  title: z.string().min(1, 'Обязательное поле'),
  slug: z.string().min(1, 'Обязательное поле'),
  description: z.string().optional(),
  is_published: z.boolean().optional(),
  shot_description: z.string().optional(),
  quadrature: z.coerce.number().optional(),
  floors: z.coerce.number().optional(),
  bedrooms: z.coerce.number().optional(),
})

export type ProjectFormValues = z.infer<typeof projectFormSchema>
