import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './features/auth/pages/LoginPage'
import TelegramLoginPage from './features/auth/pages/TelegramLoginPage'
import ProjectListPage from './features/projects/pages/ProjectListPage'
import ProjectDetailPage from './features/projects/pages/ProjectDetailPage'
import ProjectCreatePage from './features/projects/pages/ProjectCreatePage'
import ProjectEditPage from './features/projects/pages/ProjectEditPage'
import ProtectedRoute from './features/auth/components/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/telegram" element={<TelegramLoginPage />} />

      <Route path="/dashboard" element={<ProtectedRoute><ProjectListPage /></ProtectedRoute>} />
      <Route path="/projects/create" element={<ProtectedRoute><ProjectCreatePage /></ProtectedRoute>} />
      <Route path="/projects/:slug" element={<ProtectedRoute><ProjectDetailPage /></ProtectedRoute>} />
      <Route path="/projects/:slug/edit" element={<ProtectedRoute><ProjectEditPage /></ProtectedRoute>} />
    </Routes>
  )
}
