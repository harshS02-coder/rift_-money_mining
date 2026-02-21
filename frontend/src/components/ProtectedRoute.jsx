import React from 'react'
import { useAuth } from '../context/AuthContext'
import LandingPage from './LandingPage'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LandingPage />
  }

  return children
}

export default ProtectedRoute
