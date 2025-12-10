import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './features/auth/pages/LoginPage'
import TelegramLoginPage from './features/auth/pages/TelegramLoginPage'
import ProjectListPage from './features/projects/pages/ProjectListPage'
import ProjectDetailPage from './features/projects/pages/ProjectDetailPage'
import ProjectCreatePage from './features/projects/pages/ProjectCreatePage'
import ProjectEditPage from './features/projects/pages/ProjectEditPage'
import ProtectedRoute from './features/auth/components/ProtectedRoute'
import Header from './features/header/components/Header'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 px-4 py-6">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/telegram" element={<TelegramLoginPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <ProjectListPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects/create"
            element={
              <ProtectedRoute>
                <ProjectCreatePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects/:slug"
            element={
              <ProtectedRoute>
                <ProjectDetailPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects/:slug/edit"
            element={
              <ProtectedRoute>
                <ProjectEditPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
