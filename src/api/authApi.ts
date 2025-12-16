import { api } from './base'
import {
  AuthResponse,
  PassLoginRequest,
  TelegramAuthData,
} from '../features/auth/types'

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<AuthResponse, PassLoginRequest>({
      query: credentials => ({
        url: '/api/v1/login/password',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    telegramLogin: build.mutation<AuthResponse, TelegramAuthData>({
      query: data => ({
        url: '/api/v1/auth/telegram',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
})

export const { useLoginMutation, useTelegramLoginMutation } = authApi
