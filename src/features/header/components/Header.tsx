
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../hooks'
import { logout } from '../../auth/slices'

const Header: React.FC = () => {
  const token = useAppSelector((state) => state.auth.token)
  const userId = useAppSelector((state) => state.auth.userId)
  const isAdmin = useAppSelector((state) => state.auth.isAdmin)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <header className="bg-white shadow-md border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="text-xl font-bold text-blue-600">
              Admin Panel
            </Link>
            {token && (
              <nav className="flex items-center gap-4">
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Projects
                </Link>
                <Link
                  to="/blogs"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Blogs
                </Link>
              </nav>
            )}
          </div>
          <div className="flex items-center gap-4">
            {token ? (
              <>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>User ID: {userId}</span>
                  {isAdmin && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      Admin
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
