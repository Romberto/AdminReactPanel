

export interface BlogsRead {
  id: string
  title: string
  slug: string
  is_published: boolean
  article: string
  excerpt: string
  created_at: string
  updated_at: string
  public_url: string

}

export interface BlogUpdate {
  title?: string
  article?: string
  excerpt?: string
  is_published?: boolean
}

export interface BlogCreate {
  title: string
  slug: string
  description?: string
  is_published?: boolean
}
