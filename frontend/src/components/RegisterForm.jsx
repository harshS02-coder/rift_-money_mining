// import React, { useState } from 'react'
// import { register as apiRegister } from '../services/api'

// const RegisterForm = ({ onClose, onSwitchToLogin }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     organizationName: '',
//     password: '',
//     confirmPassword: ''
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [success, setSuccess] = useState(false)

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//     setError('')
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
    
//     // Validation
//     if (!formData.name || !formData.email || !formData.organizationName || !formData.password || !formData.confirmPassword) {
//       setError('Please fill in all fields')
//       return
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match')
//       return
//     }

//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters')
//       return
//     }

//     setLoading(true)
//     setError('')

//     try {
//       // Call backend API - saves user to MongoDB
//       const response = await apiRegister({
//         full_name: formData.name,
//         email: formData.email,
//         organization_name: formData.organizationName,
//         password: formData.password
//       })
      
//       // Success - user saved to database
//       setSuccess(true)
//       setLoading(false)
      
//       // Wait 2 seconds to show success message, then redirect to login
//       setTimeout(() => {
//         onSwitchToLogin()
//       }, 2000)
//     } catch (error) {
//       console.error('Registration failed:', error)
      
//       // Extract error message - handle different error formats
//       let errorMessage = 'Registration failed. Please try again.'
      
//       if (error.response?.data) {
//         const data = error.response.data
        
//         // Handle Pydantic validation errors (array of error objects)
//         if (Array.isArray(data.detail)) {
//           errorMessage = data.detail.map(err => {
//             const field = err.loc?.[err.loc.length - 1] || 'field'
//             return `${field}: ${err.msg}`
//           }).join(', ')
//         } 
//         // Handle single validation error object
//         else if (typeof data.detail === 'object' && data.detail.msg) {
//           errorMessage = data.detail.msg
//         }
//         // Handle string error message
//         else if (typeof data.detail === 'string') {
//           errorMessage = data.detail
//         }
//         // Fallback to any message property
//         else if (data.message) {
//           errorMessage = data.message
//         }
//       }
      
//       setError(errorMessage)
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
//       {/* Modal Container */}
//       <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl w-full max-w-md mx-4 transform transition-all animate-slideUp max-h-[90vh] overflow-y-auto overflow-hidden">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors z-10"
//           aria-label="Close"
//         >
//           <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>

//         {/* Header */}
//         <div className="relative px-8 pt-8 pb-6 border-b border-white/20 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
//           <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />
//           <h2 className="relative text-3xl font-bold mb-2">Create Account</h2>
//           <p className="relative text-white/80">Register your organization</p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="px-8 py-6">
//           {/* Name Field */}
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-sm font-semibold text-black mb-2">
//               Full Name
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter your full name"
//                 className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all"
//               />
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                 <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           {/* Email Field */}
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-semibold text-black mb-2">
//               Email Address
//             </label>
//             <div className="relative">
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all"
//               />
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                 <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           {/* Organization Name Field */}
//           <div className="mb-4">
//             <label htmlFor="organizationName" className="block text-sm font-semibold text-black mb-2">
//               Organization Name
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 id="organizationName"
//                 name="organizationName"
//                 value={formData.organizationName}
//                 onChange={handleChange}
//                 placeholder="Enter your organization"
//                 className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all"
//               />
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                 <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           {/* Password Field */}
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-sm font-semibold text-black mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Create a password"
//                 className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-black transition-colors"
//               >
//                 {showPassword ? (
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                   </svg>
//                 ) : (
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                   </svg>
//                 )}
//               </button>
//             </div>
//             <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
//           </div>

//           {/* Confirm Password Field */}
//           <div className="mb-6">
//             <label htmlFor="confirmPassword" className="block text-sm font-semibold text-black mb-2">
//               Confirm Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="Confirm your password"
//                 className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-black transition-colors"
//               >
//                 {showConfirmPassword ? (
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                   </svg>
//                 ) : (
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                   </svg>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Success Message */}
//           {success && (
//             <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-fadeIn">
//               <div className="flex items-center gap-3">
//                 <div className="flex-shrink-0">
//                   <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-green-800">Registration Successful!</p>
//                   <p className="text-xs text-green-600 mt-1">Your account has been created. Redirecting to login...</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Error Message */}
//           {error && (
//             <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
//               <p className="text-sm text-red-600 font-medium">{error}</p>
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading || success}
//             className="w-full bg-black text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 active:bg-gray-900 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? 'Creating Account...' : success ? 'Account Created!' : 'Create Account'}
//           </button>
//         </form>

//         {/* Footer */}
//         <div className="px-8 py-6 bg-white/60 rounded-b-2xl border-t border-gray-200/60">
//           <p className="text-center text-sm text-gray-600">
//             Already have an account?{' '}
//             <button 
//               onClick={onSwitchToLogin}
//               className="text-black font-semibold hover:underline"
//             >
//               Sign In
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default RegisterForm


//claude --
import React, { useState } from 'react'
import { register as apiRegister } from '../services/api'

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Mono:wght@400;600&family=Instrument+Sans:wght@400;500;600;700&display=swap');

  @keyframes modal-in {
    from { opacity: 0; transform: translateY(20px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes overlay-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes scan-h {
    0%   { top: 0%; opacity: 1; }
    90%  { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; box-shadow: 0 0 6px currentColor; }
    50%       { opacity: 0.4; box-shadow: none; }
  }

  @keyframes border-glow {
    0%, 100% { box-shadow: 0 0 0 1px rgba(201,168,76,0.2), 0 32px 80px rgba(0,0,0,0.8); }
    50%       { box-shadow: 0 0 40px 4px rgba(201,168,76,0.18), 0 32px 80px rgba(0,0,0,0.8); }
  }

  @keyframes fade-slide-up {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  @keyframes success-in {
    0%   { transform: scale(0.8); opacity: 0; }
    70%  { transform: scale(1.05); }
    100% { transform: scale(1); opacity: 1; }
  }

  .rf-overlay {
    position: fixed; inset: 0; z-index: 60;
    display: flex; align-items: center; justify-content: center;
    background: rgba(3,7,4,0.85);
    backdrop-filter: blur(10px);
    animation: overlay-in 0.25s ease forwards;
    padding: 16px;
  }

  .rf-modal {
    background: #070D0A;
    border: 1px solid rgba(201,168,76,0.22);
    width: 100%;
    max-width: 460px;
    max-height: 90vh;
    overflow-y: auto;
    overflow-x: hidden;
    animation: modal-in 0.3s cubic-bezier(.4,0,.2,1) forwards, border-glow 4s ease-in-out infinite;
    position: relative;
    scrollbar-width: thin;
    scrollbar-color: rgba(201,168,76,0.25) rgba(255,255,255,0.02);
  }

  .rf-modal::-webkit-scrollbar { width: 4px; }
  .rf-modal::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
  .rf-modal::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.25); }

  .rf-modal .font-mono  { font-family: 'IBM Plex Mono', monospace; }
  .rf-modal .font-serif { font-family: 'DM Serif Display', serif; }
  .rf-modal .font-sans  { font-family: 'Instrument Sans', sans-serif; }

  .gold-text {
    background: linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── Input ── */
  .rf-input {
    width: 100%;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(201,168,76,0.18);
    color: #E8E3D8;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.82rem;
    padding: 11px 40px 11px 14px;
    outline: none;
    transition: border-color 0.18s, background 0.18s;
    letter-spacing: 0.03em;
    box-sizing: border-box;
  }

  .rf-input::placeholder { color: #2A3530; letter-spacing: 0.04em; }
  .rf-input:focus {
    border-color: rgba(201,168,76,0.55);
    background: rgba(201,168,76,0.04);
  }

  /* password match indicator */
  .rf-input.match   { border-color: rgba(22,160,90,0.5); }
  .rf-input.mismatch { border-color: rgba(248,113,113,0.5); }

  /* ── Submit button ── */
  .rf-btn {
    width: 100%;
    background: linear-gradient(135deg, #C9A84C 0%, #E8C97A 60%, #C9A84C 100%);
    color: #070D0A;
    font-family: 'Instrument Sans', sans-serif;
    font-weight: 700;
    font-size: 0.82rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 14px;
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.15s, box-shadow 0.15s;
  }

  .rf-btn::after {
    content: '';
    position: absolute; inset: 0;
    background: rgba(255,255,255,0.12);
    opacity: 0;
    transition: opacity 0.15s;
  }

  .rf-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 10px 32px rgba(201,168,76,0.35); }
  .rf-btn:hover:not(:disabled)::after { opacity: 1; }
  .rf-btn:active:not(:disabled) { transform: scale(0.98); }
  .rf-btn:disabled {
    background: rgba(201,168,76,0.15);
    color: rgba(201,168,76,0.4);
    cursor: not-allowed;
  }

  .rf-btn-success {
    width: 100%;
    background: rgba(22,160,90,0.1);
    border: 1px solid rgba(22,160,90,0.35);
    color: #16A05A;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 14px;
    cursor: default;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }

  /* ── Text btn ── */
  .rf-text-btn {
    background: none; border: none; cursor: pointer;
    color: #C9A84C;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 0.15s;
  }
  .rf-text-btn:hover { color: #E8C97A; }

  /* ── Close btn ── */
  .rf-close {
    position: absolute; top: 14px; right: 14px;
    width: 28px; height: 28px;
    background: rgba(201,168,76,0.06);
    border: 1px solid rgba(201,168,76,0.2);
    color: #C9A84C;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.7rem;
    transition: background 0.15s, border-color 0.15s;
    z-index: 10;
  }
  .rf-close:hover { background: rgba(201,168,76,0.14); border-color: rgba(201,168,76,0.5); }

  /* ── Eye toggle ── */
  .rf-eye {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer; padding: 0;
    color: #4A5550;
    transition: color 0.15s;
    display: flex; align-items: center;
  }
  .rf-eye:hover { color: #C9A84C; }

  .rf-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent);
  }

  /* ── Field group ── */
  .rf-field { margin-bottom: 14px; }

  .rf-label {
    display: block;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.58rem;
    color: #4A5550;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 7px;
  }

  /* ── Banner ── */
  .rf-banner {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 12px 14px; border: 1px solid;
    margin-bottom: 14px;
    animation: fade-slide-up 0.3s ease forwards;
    position: relative;
  }

  .rf-banner::before {
    content: '';
    position: absolute; top: -1px; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, currentColor, transparent);
    opacity: 0.3;
  }

  /* ── Step indicator ── */
  .rf-steps {
    display: flex; align-items: center; gap: 6px;
    margin-bottom: 18px;
  }

  .rf-step-dot {
    width: 5px; height: 5px;
    border: 1px solid rgba(201,168,76,0.3);
    background: transparent;
    transition: background 0.2s, border-color 0.2s;
  }

  .rf-step-dot.active {
    background: #C9A84C;
    border-color: #C9A84C;
    box-shadow: 0 0 6px rgba(201,168,76,0.5);
  }

  .rf-step-line {
    flex: 1; height: 1px;
    background: rgba(201,168,76,0.12);
  }
`

/* ── Reusable eye toggle icon ── */
const EyeIcon = ({ open }) => open ? (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
) : (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

/* ── Field icon ── */
const FieldIcon = ({ d }) => (
  <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(74,85,80,0.5)" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  </div>
)

const RegisterForm = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', organizationName: '', password: '', confirmPassword: ''
  })
  const [showPassword, setShowPassword]               = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.organizationName || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields'); return
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match'); return
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters'); return
    }

    setLoading(true); setError('')
    try {
      await apiRegister({
        full_name: formData.name,
        email: formData.email,
        organization_name: formData.organizationName,
        password: formData.password,
      })
      setSuccess(true); setLoading(false)
      setTimeout(() => onSwitchToLogin(), 2200)
    } catch (err) {
      let msg = 'Registration failed. Please try again.'
      const data = err.response?.data
      if (data) {
        if (Array.isArray(data.detail))
          msg = data.detail.map(e => `${e.loc?.[e.loc.length - 1] || 'field'}: ${e.msg}`).join(', ')
        else if (typeof data.detail === 'object' && data.detail.msg) msg = data.detail.msg
        else if (typeof data.detail === 'string') msg = data.detail
        else if (data.message) msg = data.message
      }
      setError(msg); setLoading(false)
    }
  }

  /* password match state */
  const pwMatch = formData.confirmPassword.length > 0
    ? formData.password === formData.confirmPassword ? 'match' : 'mismatch'
    : ''

  /* filled fields count for step indicator */
  const filledCount = Object.values(formData).filter(Boolean).length
  const stepActive = (i) => filledCount >= i + 1

  return (
    <>
      <style>{CSS}</style>
      <style>{`@keyframes spin { from{transform:rotate(0deg)}to{transform:rotate(360deg)} }`}</style>

      <div className="rf-overlay" onClick={onClose}>
        <div className="rf-modal font-sans" onClick={e => e.stopPropagation()}>

          {/* Close */}
          <button className="rf-close" onClick={onClose} aria-label="Close">✕</button>

          {/* ── Header ── */}
          <div style={{
            padding: '28px 28px 22px',
            borderBottom: '1px solid rgba(201,168,76,0.12)',
            background: 'linear-gradient(135deg, rgba(15,107,61,0.1) 0%, rgba(7,13,10,0) 100%)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.04,
              backgroundImage: `linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)`,
              backgroundSize: '20px 20px', pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', left: 0, right: 0, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)',
              animation: 'scan-h 5s ease-in-out infinite',
            }} />

            <div style={{ position: 'relative' }}>
              {/* Brand mark */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <div style={{
                  width: 28, height: 28,
                  background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg viewBox="0 0 20 20" width="14" height="14" fill="none">
                    <path d="M10 2L3 5.5V10C3 14 6.2 17.5 10 19C13.8 17.5 17 14 17 10V5.5L10 2Z" fill="#070D0A" />
                    <path d="M7 10L9 12L13 8" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="font-mono" style={{ color: '#C9A84C', fontSize: '0.8rem', letterSpacing: '0.14em', fontWeight: 600 }}>RIFT</span>
                <span style={{ color: 'rgba(201,168,76,0.2)' }}>|</span>
                <span className="font-mono" style={{ color: '#2A3530', fontSize: '0.6rem', letterSpacing: '0.1em' }}>FORENSIC TRACKER</span>
              </div>

              <h2 className="font-serif gold-text" style={{ fontSize: '2rem', lineHeight: 1.1, marginBottom: 6 }}>
                Register Organisation
              </h2>
              <p className="font-mono" style={{ fontSize: '0.65rem', color: '#4A5550', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Create your investigation dashboard account
              </p>

              {/* Step dots */}
              <div className="rf-steps" style={{ marginTop: 18, marginBottom: 0 }}>
                {[0, 1, 2, 3, 4].map(i => (
                  <React.Fragment key={i}>
                    <div className={`rf-step-dot ${stepActive(i) ? 'active' : ''}`} />
                    {i < 4 && <div className="rf-step-line" />}
                  </React.Fragment>
                ))}
                <span className="font-mono" style={{ fontSize: '0.55rem', color: '#4A5550', letterSpacing: '0.1em', marginLeft: 8, whiteSpace: 'nowrap' }}>
                  {filledCount}/5 FIELDS
                </span>
              </div>
            </div>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} style={{ padding: '22px 28px' }}>

            {/* Full Name */}
            <div className="rf-field">
              <label className="rf-label" htmlFor="name">Full Name</label>
              <div style={{ position: 'relative' }}>
                <input className="rf-input" type="text" id="name" name="name"
                  value={formData.name} onChange={handleChange} placeholder="Enter your full name" autoComplete="name" />
                <FieldIcon d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </div>
            </div>

            {/* Email */}
            <div className="rf-field">
              <label className="rf-label" htmlFor="email">Email Address</label>
              <div style={{ position: 'relative' }}>
                <input className="rf-input" type="email" id="email" name="email"
                  value={formData.email} onChange={handleChange} placeholder="Enter your email" autoComplete="email" />
                <FieldIcon d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </div>
            </div>

            {/* Organization */}
            <div className="rf-field">
              <label className="rf-label" htmlFor="organizationName">Organization Name</label>
              <div style={{ position: 'relative' }}>
                <input className="rf-input" type="text" id="organizationName" name="organizationName"
                  value={formData.organizationName} onChange={handleChange} placeholder="Enter your organization" autoComplete="organization" />
                <FieldIcon d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </div>
            </div>

            {/* Password */}
            <div className="rf-field">
              <label className="rf-label" htmlFor="password">Password</label>
              <div style={{ position: 'relative' }}>
                <input className="rf-input" type={showPassword ? 'text' : 'password'} id="password" name="password"
                  value={formData.password} onChange={handleChange} placeholder="Create a password" autoComplete="new-password" />
                <button type="button" className="rf-eye" onClick={() => setShowPassword(!showPassword)}>
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              <div className="font-mono" style={{ fontSize: '0.55rem', color: '#2A3530', letterSpacing: '0.08em', marginTop: 5 }}>
                MINIMUM 6 CHARACTERS
              </div>
            </div>

            {/* Confirm Password */}
            <div className="rf-field" style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                <label className="rf-label" htmlFor="confirmPassword" style={{ marginBottom: 0 }}>Confirm Password</label>
                {pwMatch === 'match' && (
                  <span className="font-mono" style={{ fontSize: '0.55rem', color: '#16A05A', letterSpacing: '0.08em' }}>✓ MATCH</span>
                )}
                {pwMatch === 'mismatch' && (
                  <span className="font-mono" style={{ fontSize: '0.55rem', color: '#F87171', letterSpacing: '0.08em' }}>✗ MISMATCH</span>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <input className={`rf-input ${pwMatch}`} type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword" name="confirmPassword"
                  value={formData.confirmPassword} onChange={handleChange}
                  placeholder="Confirm your password" autoComplete="new-password" />
                <button type="button" className="rf-eye" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <EyeIcon open={showConfirmPassword} />
                </button>
              </div>
            </div>

            {/* Success banner */}
            {success && (
              <div className="rf-banner" style={{
                background: 'rgba(22,160,90,0.07)', borderColor: 'rgba(22,160,90,0.35)', color: '#16A05A',
              }}>
                <div style={{
                  width: 26, height: 26, flexShrink: 0,
                  border: '1px solid rgba(22,160,90,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  animation: 'success-in 0.4s ease forwards',
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16A05A" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-mono" style={{ fontSize: '0.58rem', color: '#16A05A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>
                    Registration Successful
                  </div>
                  <span className="font-mono" style={{ fontSize: '0.7rem', color: '#8A9490' }}>
                    Account created. Redirecting to sign in...
                  </span>
                </div>
                <span style={{ marginLeft: 'auto', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#16A05A', color: '#16A05A', display: 'inline-block', animation: 'pulse-dot 1.5s ease-in-out infinite' }} />
                </span>
              </div>
            )}

            {/* Error banner */}
            {error && (
              <div className="rf-banner" style={{
                background: 'rgba(248,113,113,0.06)', borderColor: 'rgba(248,113,113,0.3)', color: '#F87171',
              }}>
                <div style={{
                  width: 26, height: 26, flexShrink: 0,
                  border: '1px solid rgba(248,113,113,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2L14 13H2L8 2Z" stroke="#F87171" strokeWidth="1.2" />
                    <path d="M8 6.5V9.5M8 10.5V11.5" stroke="#F87171" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="font-mono" style={{ fontSize: '0.58rem', color: '#F87171', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>
                    Registration Error
                  </div>
                  <span className="font-mono" style={{ fontSize: '0.7rem', color: '#8A9490' }}>{error}</span>
                </div>
                <button onClick={() => setError('')} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#F87171', cursor: 'pointer', fontSize: '0.7rem', fontFamily: 'IBM Plex Mono, monospace', flexShrink: 0 }}>✕</button>
              </div>
            )}

            {/* Submit */}
            {success ? (
              <div className="rf-btn-success">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Account Created
              </div>
            ) : (
              <button type="submit" className="rf-btn" disabled={loading || success}>
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      style={{ animation: 'spin 1s linear infinite' }}>
                      <path strokeLinecap="round" d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                    Creating Account...
                  </span>
                ) : 'Create Account →'}
              </button>
            )}
          </form>

          {/* ── Footer ── */}
          <div className="rf-divider" />
          <div style={{ padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <span className="font-mono" style={{ fontSize: '0.65rem', color: '#4A5550', letterSpacing: '0.06em' }}>
              Already have an account?
            </span>
            <button className="rf-text-btn" onClick={onSwitchToLogin}>Sign In →</button>
          </div>

          {/* Security note */}
          <div style={{
            padding: '10px 28px',
            background: 'rgba(22,160,90,0.04)',
            borderTop: '1px solid rgba(22,160,90,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <svg viewBox="0 0 12 12" width="9" height="9" fill="none">
              <path d="M6 1L1 3.5V6C1 9 3.4 11.2 6 12C8.6 11.2 11 9 11 6V3.5L6 1Z" stroke="#16A05A" strokeWidth="0.9" />
              <path d="M4 6L5 7L8 4.5" stroke="#16A05A" strokeWidth="0.9" strokeLinecap="round" />
            </svg>
            <span className="font-mono" style={{ fontSize: '0.55rem', color: '#16A05A', letterSpacing: '0.1em', opacity: 0.7 }}>
              SOC 2 COMPLIANT · AML CERTIFIED · ENCRYPTED
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterForm