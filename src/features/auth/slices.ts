import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AuthResponse } from './types'

interface AuthState {
  token: string | null
  refresh: string | null
}

const initialState: AuthState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  refresh:
    typeof window !== 'undefined' ? localStorage.getItem('refresh') : null,
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<AuthResponse>) {
      state.token = action.payload.access_token
      state.refresh = action.payload.refresh_token
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.access_token)
        localStorage.setItem('refresh', action.payload.refresh_token)
      }
    },
    logout(state) {
      state.token = null
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('refresh')
      }
    },
  },
})

export const { setAuth, logout } = slice.actions
export const authReducer = slice.reducer
