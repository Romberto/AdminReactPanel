export interface AuthResponse {
  access_token: string
  token_type?: string
  user_id: number
  is_admin: boolean
}

export interface PassLoginRequest {
  login: string
  password: string
}

export interface TelegramAuthData {
  id: number
  first_name: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}
