import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authReducer } from '../features/auth/slices'
import {
  supabaseSessionReducer,
  initSupabaseAuthListener,
} from '../features/auth/supabaseSessionSlice'
import { api } from '../api/base'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    supabaseSession: supabaseSessionReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)
initSupabaseAuthListener(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
