import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const LoginForm = ({ onClose, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    organizationName: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.organizationName || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    const result = await login(formData.organizationName, formData.password)
    
    if (result.success) {
      onClose()
    } else {
      setError(result.error || 'Login failed')
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 transform transition-all animate-slideUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-gray-200">
          <h2 className="text-3xl font-bold text-black mb-2">Login</h2>
          <p className="text-gray-600">Access your organization's dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-6">
          {/* Organization Name Field */}
          <div className="mb-6">
            <label htmlFor="organizationName" className="block text-sm font-semibold text-black mb-2">
              Organization Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="organizationName"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                placeholder="Enter your organization"
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-black mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-black transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-gray-100 border border-gray-300 rounded-lg">
              <p className="text-sm text-black font-medium">{error}</p>
            </div>
          )}

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 border-2 border-gray-300 rounded bg-white checked:bg-black checked:border-black focus:ring-2 focus:ring-black/10"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <button type="button" className="text-sm text-black font-semibold hover:underline">
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 active:bg-gray-900 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="px-8 py-6 bg-gray-50 rounded-b-2xl border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button 
              onClick={onSwitchToRegister}
              className="text-black font-semibold hover:underline"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
