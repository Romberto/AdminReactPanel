export interface ImageRead {
  id: number
  project_id: number
  public_url: string
  caption?: string | null
  ordering: number
  uploaded_at: string
  is_preview: boolean
}

export interface ProjectRead {
  id: number
  title: string
  slug: string
  description?: string | null
  is_published: boolean
  preview_image_id?: number | null
  created_at: string
  updated_at: string
  images?: ImageRead[]
}

export interface ProjectCreate {
  title: string
  slug: string
  description?: string
  is_published?: boolean
}

export interface ProjectUpdate {
  title?: string
  slug?: string
  description?: string
  is_published?: boolean
  preview_image_id?: number | null
}
