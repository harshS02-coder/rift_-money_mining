import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const LandingPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const { isAuthenticated } = useAuth()

  const handleSwitchToRegister = () => {
    console.log('Switching to register form')
    setShowLoginForm(false)
    setShowRegisterForm(true)
  }

  const handleSwitchToLogin = () => {
    console.log('Switching to login form')
    setShowRegisterForm(false)
    setShowLoginForm(true)
  }

  const handleCloseAllForms = () => {
    console.log('Closing all forms')
    setShowLoginForm(false)
    setShowRegisterForm(false)
  }

  const features = [
    {
      icon: '🔍',
      title: 'AI-Powered Detection',
      description: 'Advanced machine learning algorithms analyze transaction patterns to identify sophisticated money muling schemes',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '📊',
      title: 'Visual Network Analysis',
      description: 'Interactive graph visualizations reveal hidden connections and suspicious transaction rings',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: '⚡',
      title: 'Real-Time Insights',
      description: 'Instant risk assessment with actionable investigation recommendations powered by GPT',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: '🎯',
      title: 'Pattern Recognition',
      description: 'Detect circular transactions, smurfing activities, and shell account operations automatically',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: '🛡️',
      title: 'Risk Scoring',
      description: 'Comprehensive account risk assessment with multi-factor analysis and prioritization',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: '📈',
      title: 'Forensic Reports',
      description: 'Detailed investigation summaries with evidence trails for compliance and legal proceedings',
      color: 'from-green-500 to-green-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32">
          {/* Logo/Brand */}
          <div className="text-center mb-16 animate-fadeIn">
            <div className="inline-block mb-6">
              <div className="text-8xl mb-4 animate-bounce">🔍</div>
            </div>
            <h1 className="text-7xl sm:text-8xl md:text-9xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text tracking-tight">
              RIFT 2026
            </h1>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-300 mb-4 tracking-wide">
              Ring Investigation & Forensic Tracker
            </p>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              The next-generation platform for detecting and investigating financial crimes through 
              AI-powered graph analysis and behavioral pattern recognition
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setShowLoginForm(true)}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-xl shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <button
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white text-lg font-bold rounded-xl border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transform hover:scale-105 transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            <div className="text-center">
              <div className="text-4xl font-black text-blue-400 mb-2">99.8%</div>
              <div className="text-sm text-gray-400">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-purple-400 mb-2">&lt;1s</div>
              <div className="text-sm text-gray-400">Analysis Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-pink-400 mb-2">1M+</div>
              <div className="text-sm text-gray-400">Transactions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-orange-400 mb-2">24/7</div>
              <div className="text-sm text-gray-400">Monitoring</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative py-24 bg-gradient-to-b from-gray-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to detect, investigate, and prevent financial crimes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/30 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-4xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="relative py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              How It Works
            </h2>
            <p className="text-xl text-gray-400">Simple, fast, and powerful</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-blue-500/50">
                1
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Upload Data</h3>
              <p className="text-gray-400">Upload your CSV transaction file with just a few clicks</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-purple-500/50">
                2
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">AI Analysis</h3>
              <p className="text-gray-400">Our AI analyzes patterns, connections, and anomalies instantly</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-pink-500/50">
                3
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Take Action</h3>
              <p className="text-gray-400">Get actionable insights and investigation recommendations</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black mb-6 text-white">
            Ready to Fight Financial Crime?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join leading financial institutions in the battle against money laundering
          </p>
          <button
            onClick={() => setShowLoginForm(true)}
            className="px-10 py-5 bg-white text-gray-900 text-xl font-bold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Start Your Investigation
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black py-8 text-center text-gray-500 text-sm">
        <p>RIFT 2026 © Powered by AI | Detecting Financial Crimes Since 2026</p>
      </div>

      {/* Auth Forms */}
      {showLoginForm && (
        <LoginForm 
          onClose={handleCloseAllForms} 
          onSwitchToRegister={handleSwitchToRegister}
        />
      )}
      {showRegisterForm && (
        <RegisterForm 
          onClose={handleCloseAllForms} 
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
    </div>
  )
}

export default LandingPage
