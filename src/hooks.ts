import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { useMemo } from 'react'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export function useTokenHeader() {
  const token = useSelector((s: RootState) => s.auth.token)
  return useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : {}),
    [token]
  )
}
