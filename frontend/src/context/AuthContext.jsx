import React, { createContext, useContext, useState, useEffect } from 'react'
import { login as apiLogin, getCurrentUser, setAuthToken } from '../services/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('rift_token')
      
      if (token) {
        try {
          // Set token in axios headers
          setAuthToken(token)
          
          // Verify token is valid by fetching user data
          const response = await getCurrentUser()
          const userData = response.data
          
          setUser({
            id: userData.id,
            organizationName: userData.organization_name,
            email: userData.email,
            fullName: userData.full_name
          })
          setIsAuthenticated(true)
        } catch (error) {
          console.error('Token validation failed:', error)
          // Token is invalid, clear it
          localStorage.removeItem('rift_token')
          localStorage.removeItem('rift_user')
          setAuthToken(null)
        }
      }
      setLoading(false)
    }
    
    checkAuth()
  }, [])

  const login = async (organizationName, password) => {
    try {
      // Call backend API
      const response = await apiLogin({
        organization_name: organizationName,
        password: password
      })
      
      const { access_token } = response.data
      
      // Store token and set in axios headers
      localStorage.setItem('rift_token', access_token)
      setAuthToken(access_token)
      
      // Fetch user data
      const userResponse = await getCurrentUser()
      const userData = userResponse.data
      
      const user = {
        id: userData.id,
        organizationName: userData.organization_name,
        email: userData.email,
        fullName: userData.full_name
      }
      
      setUser(user)
      setIsAuthenticated(true)
      localStorage.setItem('rift_user', JSON.stringify(user))
      
      return { success: true }
    } catch (error) {
      console.error('Login failed:', error)
      
      // Extract error message - handle different error formats
      let errorMessage = 'Login failed'
      
      if (error.response?.data) {
        const data = error.response.data
        
        // Handle Pydantic validation errors (array of error objects)
        if (Array.isArray(data.detail)) {
          errorMessage = data.detail.map(err => {
            const field = err.loc?.[err.loc.length - 1] || 'field'
            return `${field}: ${err.msg}`
          }).join(', ')
        } 
        // Handle single validation error object
        else if (typeof data.detail === 'object' && data.detail.msg) {
          errorMessage = data.detail.msg
        }
        // Handle string error message
        else if (typeof data.detail === 'string') {
          errorMessage = data.detail
        }
        // Fallback to any message property
        else if (data.message) {
          errorMessage = data.message
        }
      }
      
      return { success: false, error: errorMessage }
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('rift_token')
    localStorage.removeItem('rift_user')
    setAuthToken(null)
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
