export interface BlogsImageRead {
  id: number
  blog_id: number
  public_url: string
  link_to_disk: string
  uploaded_at: string
  is_preview: boolean
}

export interface BlogsRead {
  id: number
  title: string
  slug: string
  description?: string | null
  is_published: boolean
  preview_image_id?: number | null
  created_at: string
  updated_at: string
  images?: BlogsImageRead[]
}
