

export interface BlogsRead {
  id: string
  title: string
  slug: string
  description?: string | null
  is_published: boolean
  preview_image_id?: number | null
  created_at: string
  updated_at: string
  public_url: string

}

export interface BlogUpdate {
  title?: string
  slug?: string
  description?: string | null
  is_published?: boolean
  preview_image_id?: number | null
}

export interface BlogCreate {
  title: string
  slug: string
  description?: string
  is_published?: boolean
}
