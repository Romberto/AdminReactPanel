export interface AuthResponse {
  access_token: string
  refresh_token: string
  token_type?: string
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
