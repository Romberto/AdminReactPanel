import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Dispatch } from '@reduxjs/toolkit'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../../lib/supabaseClient'

interface SupabaseSessionState {
  session: Session | null
  user: User | null
  ready: boolean
}

const initialState: SupabaseSessionState = {
  session: null,
  user: null,
  ready: false,
}

const supabaseSessionSlice = createSlice({
  name: 'supabaseSession',
  initialState,
  reducers: {
    setSupabaseSession(state, action: PayloadAction<Session | null>) {
      state.session = action.payload
      state.user = action.payload?.user ?? null
      state.ready = true
    },
  },
})

export const { setSupabaseSession } = supabaseSessionSlice.actions
export const supabaseSessionReducer = supabaseSessionSlice.reducer

export const initSupabaseAuthListener = (dispatch: Dispatch) => {
  supabase.auth.getSession().then(({ data }) => {
    dispatch(setSupabaseSession(data.session ?? null))
  })

  supabase.auth.onAuthStateChange((_event, session) => {
    dispatch(setSupabaseSession(session ?? null))
  })
}
