import React, { useState, useEffect } from 'react'
import LoginForm from './LoginForm'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-gradient-to-r from-blue-700 to-blue-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className={`text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-blue-700' : 'text-white'
            }`}
          >
            🔍 RIFT 2026
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('home')}
              className={`font-medium transition-all duration-300 hover:scale-105 ${
                isScrolled
                  ? 'text-gray-700 hover:text-blue-700'
                  : 'text-white hover:text-blue-200'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className={`font-medium transition-all duration-300 hover:scale-105 ${
                isScrolled
                  ? 'text-gray-700 hover:text-blue-700'
                  : 'text-white hover:text-blue-200'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => setShowLoginForm(true)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                isScrolled
                  ? 'bg-gradient-to-r from-blue-700 to-blue-800 text-white hover:from-blue-800 hover:to-blue-900'
                  : 'bg-white text-blue-700 hover:bg-blue-50'
              }`}
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-white/20 pt-4">
            <button
              onClick={() => scrollToSection('home')}
              className={`block w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
                isScrolled
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className={`block w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
                isScrolled
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => setShowLoginForm(true)}
              className={`block w-full text-center px-4 py-2 rounded-lg font-semibold transition-colors ${
                isScrolled
                  ? 'bg-gradient-to-r from-blue-700 to-blue-800 text-white hover:from-blue-800 hover:to-blue-900'
                  : 'bg-white text-blue-700 hover:bg-blue-50'
              }`}
            >
              Login
            </button>
          </div>
        )}
      </div>

      {/* Login Form Modal */}
      {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} />}
    </nav>
  )
}

export default Navbar
