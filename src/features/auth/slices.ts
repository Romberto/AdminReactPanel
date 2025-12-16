import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AuthResponse } from './types'

interface AuthState {
  token: string | null
  userId: number | null
  isAdmin: boolean
}

const initialState: AuthState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  userId:
    typeof window !== 'undefined'
      ? Number(localStorage.getItem('userId')) || null
      : null,
  isAdmin: false,
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<AuthResponse>) {
      state.token = action.payload.access_token
      state.userId = action.payload.user_id
      state.isAdmin = action.payload.is_admin
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.access_token)
        localStorage.setItem('userId', String(action.payload.user_id))
      }
    },
    logout(state) {
      state.token = null
      state.userId = null
      state.isAdmin = false
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
      }
    },
  },
})

export const { setAuth, logout } = slice.actions
export const authReducer = slice.reducer
