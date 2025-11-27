import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../store'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = useSelector((s: RootState) => s.auth.token)
  const isAdmin = useSelector((s: RootState) => s.auth.isAdmin)
  const location = useLocation()
  if (!token || !isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return <>{children}</>
}

export default ProtectedRoute
