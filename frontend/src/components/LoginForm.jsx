// import React, { useState } from 'react'
// import { useAuth } from '../context/AuthContext'

// const LoginForm = ({ onClose, onSwitchToRegister }) => {
//   const [formData, setFormData] = useState({
//     organizationName: '',
//     password: ''
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [error, setError] = useState('')
//   const { login } = useAuth()

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//     setError('')
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
    
//     if (!formData.organizationName || !formData.password) {
//       setError('Please fill in all fields')
//       return
//     }

//     const result = await login(formData.organizationName, formData.password)
    
//     if (result.success) {
//       onClose()
//     } else {
//       setError(result.error || 'Login failed')
//     }
//   }

//   return (
//     <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
//       {/* Modal Container */}
//       <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl w-full max-w-md mx-4 transform transition-all animate-slideUp overflow-hidden">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
//           aria-label="Close"
//         >
//           <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>

//         {/* Header */}
//         <div className="relative px-8 pt-8 pb-6 border-b border-white/20 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
//           <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />
//           <h2 className="relative text-3xl font-bold mb-2">Login</h2>
//           <p className="relative text-white/80">Access your organization's dashboard</p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="px-8 py-6">
//           {/* Organization Name Field */}
//           <div className="mb-6">
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
//           <div className="mb-6">
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
//                 placeholder="Enter your password"
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
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="mb-6 p-3 bg-gray-100 border border-gray-300 rounded-lg">
//               <p className="text-sm text-black font-medium">{error}</p>
//             </div>
//           )}

//           {/* Remember Me & Forgot Password */}
//           <div className="flex items-center justify-between mb-6">
//             <label className="flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 className="w-4 h-4 border-2 border-gray-300 rounded bg-white checked:bg-black checked:border-black focus:ring-2 focus:ring-black/10"
//               />
//               <span className="ml-2 text-sm text-gray-600">Remember me</span>
//             </label>
//             <button type="button" className="text-sm text-black font-semibold hover:underline">
//               Forgot password?
//             </button>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-black text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 active:bg-gray-900 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
//           >
//             Sign In
//           </button>
//         </form>

//         {/* Footer */}
//         <div className="px-8 py-6 bg-white/60 rounded-b-2xl border-t border-gray-200/60">
//           <p className="text-center text-sm text-gray-600">
//             Don't have an account?{' '}
//             <button 
//               onClick={onSwitchToRegister}
//               className="text-black font-semibold hover:underline"
//             >
//               Create Account
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default LoginForm


//claude 
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

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
    0%, 100% { opacity: 1; box-shadow: 0 0 6px #C9A84C; }
    50%       { opacity: 0.4; box-shadow: none; }
  }

  @keyframes border-glow {
    0%, 100% { box-shadow: 0 0 0 1px rgba(201,168,76,0.2), 0 32px 80px rgba(0,0,0,0.8); }
    50%       { box-shadow: 0 0 40px 4px rgba(201,168,76,0.18), 0 32px 80px rgba(0,0,0,0.8); }
  }

  .lf-overlay {
    position: fixed; inset: 0; z-index: 60;
    display: flex; align-items: center; justify-content: center;
    background: rgba(3,7,4,0.85);
    backdrop-filter: blur(10px);
    animation: overlay-in 0.25s ease forwards;
    padding: 16px;
  }

  .lf-modal {
    background: #070D0A;
    border: 1px solid rgba(201,168,76,0.22);
    width: 100%;
    max-width: 440px;
    overflow: hidden;
    animation: modal-in 0.3s cubic-bezier(.4,0,.2,1) forwards, border-glow 4s ease-in-out infinite;
    position: relative;
  }

  .lf-modal .font-mono  { font-family: 'IBM Plex Mono', monospace; }
  .lf-modal .font-serif { font-family: 'DM Serif Display', serif; }
  .lf-modal .font-sans  { font-family: 'Instrument Sans', sans-serif; }

  .gold-text {
    background: linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── Input ── */
  .lf-input {
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

  .lf-input::placeholder { color: #2A3530; letter-spacing: 0.04em; }

  .lf-input:focus {
    border-color: rgba(201,168,76,0.55);
    background: rgba(201,168,76,0.04);
  }

  /* ── Submit button ── */
  .lf-btn {
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

  .lf-btn::after {
    content: '';
    position: absolute; inset: 0;
    background: rgba(255,255,255,0.12);
    opacity: 0;
    transition: opacity 0.15s;
  }

  .lf-btn:hover { transform: translateY(-1px); box-shadow: 0 10px 32px rgba(201,168,76,0.35); }
  .lf-btn:hover::after { opacity: 1; }
  .lf-btn:active { transform: scale(0.98); }

  /* ── Text btn ── */
  .lf-text-btn {
    background: none; border: none; cursor: pointer;
    color: #C9A84C;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 0.15s;
  }
  .lf-text-btn:hover { color: #E8C97A; }

  /* ── Close btn ── */
  .lf-close {
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
  .lf-close:hover { background: rgba(201,168,76,0.14); border-color: rgba(201,168,76,0.5); }

  /* ── Checkbox ── */
  .lf-checkbox {
    appearance: none;
    width: 14px; height: 14px;
    border: 1px solid rgba(201,168,76,0.3);
    background: rgba(255,255,255,0.03);
    cursor: pointer;
    flex-shrink: 0;
    position: relative;
    transition: background 0.15s, border-color 0.15s;
  }
  .lf-checkbox:checked {
    background: rgba(201,168,76,0.15);
    border-color: rgba(201,168,76,0.7);
  }
  .lf-checkbox:checked::after {
    content: '✓';
    position: absolute; top: -1px; left: 1px;
    font-size: 10px; color: #C9A84C;
    font-family: monospace;
  }

  .lf-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent);
  }

  /* ── Eye toggle ── */
  .lf-eye {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer; padding: 0;
    color: #4A5550;
    transition: color 0.15s;
    display: flex; align-items: center;
  }
  .lf-eye:hover { color: #C9A84C; }
`

const LoginForm = ({ onClose, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({ organizationName: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.organizationName || !formData.password) { setError('Please fill in all fields'); return }
    setLoading(true)
    const result = await login(formData.organizationName, formData.password)
    setLoading(false)
    if (result.success) { onClose() } else { setError(result.error || 'Authentication failed') }
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="lf-overlay" onClick={onClose}>
        <div className="lf-modal font-sans" onClick={e => e.stopPropagation()}>

          {/* Close */}
          <button className="lf-close" onClick={onClose} aria-label="Close">✕</button>

          {/* ── Header ── */}
          <div style={{
            padding: '28px 28px 22px',
            borderBottom: '1px solid rgba(201,168,76,0.12)',
            background: 'linear-gradient(135deg, rgba(15,107,61,0.1) 0%, rgba(7,13,10,0) 100%)',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* grid bg */}
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.04,
              backgroundImage: `linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)`,
              backgroundSize: '20px 20px', pointerEvents: 'none',
            }} />
            {/* scan line */}
            <div style={{
              position: 'absolute', left: 0, right: 0, height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)',
              animation: 'scan-h 5s ease-in-out infinite',
            }} />

            <div style={{ position: 'relative' }}>
              {/* RIFT brand mark */}
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
                Sign In
              </h2>
              <p className="font-mono" style={{ fontSize: '0.65rem', color: '#4A5550', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Access your organization's investigation dashboard
              </p>
            </div>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} style={{ padding: '24px 28px' }}>

            {/* Organization Name */}
            <div style={{ marginBottom: 18 }}>
              <label className="font-mono" htmlFor="organizationName" style={{
                display: 'block', fontSize: '0.6rem', color: '#4A5550',
                letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8,
              }}>
                Organization Name
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className="lf-input"
                  type="text"
                  id="organizationName"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  placeholder="Enter your organization"
                  autoComplete="organization"
                />
                {/* icon */}
                <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(74,85,80,0.6)" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 18 }}>
              <label className="font-mono" htmlFor="password" style={{
                display: 'block', fontSize: '0.6rem', color: '#4A5550',
                letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8,
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className="lf-input"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button type="button" className="lf-eye" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                marginBottom: 16,
                background: 'rgba(248,113,113,0.07)',
                border: '1px solid rgba(248,113,113,0.3)',
                padding: '10px 14px',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L14 13H2L8 2Z" stroke="#F87171" strokeWidth="1.2" />
                  <path d="M8 6.5V9.5M8 10.5V11.5" stroke="#F87171" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span className="font-mono" style={{ fontSize: '0.68rem', color: '#F87171', letterSpacing: '0.06em' }}>{error}</span>
              </div>
            )}

            {/* Remember / Forgot */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" className="lf-checkbox" />
                <span className="font-mono" style={{ fontSize: '0.62rem', color: '#4A5550', letterSpacing: '0.08em' }}>Remember me</span>
              </label>
              <button type="button" className="lf-text-btn">Forgot password?</button>
            </div>

            {/* Submit */}
            <button type="submit" className="lf-btn" disabled={loading}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                  </svg>
                  AUTHENTICATING...
                </span>
              ) : 'Sign In →'}
            </button>
          </form>

          {/* ── Footer ── */}
          <div className="lf-divider" />
          <div style={{ padding: '16px 28px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <span className="font-mono" style={{ fontSize: '0.65rem', color: '#4A5550', letterSpacing: '0.06em' }}>
              No account?
            </span>
            <button className="lf-text-btn" onClick={onSwitchToRegister}>
              Create Organisation →
            </button>
          </div>

          {/* Bottom security note */}
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

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </>
  )
}

export default LoginForm