export interface ImageRead {
  id: string 
  project_id: string 
  public_url: string
  caption?: string | null
  ordering: number
  uploaded_at: string
  is_preview: boolean
  is_plan: boolean
  is_gallery: boolean
}

export interface ProjectRead {
  id: string
  title: string
  slug: string
  description?: string | null
  is_published: boolean
  preview_image_id?: number | null
  created_at: string
  updated_at: string
  images?: ImageRead[]
  shot_description: string
  quadrature: number
  floors: number
  bedrooms: number

}

export interface ProjectCreate {
  title: string
  slug: string
  description?: string
  is_published?: boolean
  shot_description: string
  quadrature: number
  floors: number
  bedrooms: number
}

export interface ProjectUpdate {
  title?: string
  slug?: string
  description?: string
  is_published?: boolean
  preview_image_id?: string  | null
  shot_description: string
  quadrature: number
  floors: number
  bedrooms: number
}
