// import React, { useState, useEffect } from 'react'
// import { getAccountNarrative } from '../services/api'
// import DocumentIcon from './icons/DocumentIcon'

// function AccountNarrative({ accountId }) {
//   const [narrative, setNarrative] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const fetchNarrative = async () => {
//       if (!accountId) return

//       setLoading(true)
//       setError(null)
//       try {
//         const data = await getAccountNarrative(accountId)
//         setNarrative(data)
//       } catch (err) {
//         console.error('Error fetching account narrative:', err)
//         setError('Failed to load account narrative')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchNarrative()
//   }, [accountId])

//   if (loading) {
//     return (
//       <div className="bg-white/70 backdrop-blur-lg p-4 rounded-2xl border border-gray-200/60 shadow-xl animate-pulse">
//         <div className="h-4 bg-gray-200/80 rounded mb-2"></div>
//         <div className="h-4 bg-gray-200/70 rounded w-3/4"></div>
//       </div>
//     )
//   }

//   if (error) {
//     return <div className="bg-white/70 backdrop-blur-lg text-red-700 p-3 rounded-2xl border border-red-200/60 shadow-xl">{error}</div>
//   }

//   if (!narrative) return null

//   return (
//     <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-gray-200/60 shadow-xl overflow-hidden">
//       <div className="relative px-5 py-4 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
//         <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <h4 className="relative text-base font-semibold flex items-center gap-2">
//           <DocumentIcon size={16} className="text-white" />
//           Account Risk Profile
//         </h4>
//       </div>

//       <div className="p-5 space-y-3">
//         <p className="text-sm text-gray-700">Account: <strong className="text-gray-900">{accountId}</strong></p>
//         <p className="text-sm text-gray-700 leading-relaxed">{narrative.narrative}</p>
//         {narrative.risk_level && (
//           <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
//             narrative.risk_level.toLowerCase() === 'critical' ? 'bg-red-600 text-white' :
//             narrative.risk_level.toLowerCase() === 'high' ? 'bg-orange-600 text-white' :
//             narrative.risk_level.toLowerCase() === 'medium' ? 'bg-yellow-500 text-gray-900' :
//             'bg-green-700 text-white'
//           }`}>
//             {narrative.risk_level} RISK
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default AccountNarrative

// --claude
import React, { useState, useEffect } from 'react'
import { getAccountNarrative } from '../services/api'
import DocumentIcon from './icons/DocumentIcon'

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Mono:wght@400;600&family=Instrument+Sans:wght@400;500;600;700&display=swap');

  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }

  @keyframes fade-slide-up {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
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
    0%, 100% { box-shadow: 0 0 0 1px rgba(201,168,76,0.15); }
    50%       { box-shadow: 0 0 20px 2px rgba(201,168,76,0.18); }
  }

  @keyframes type-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .an-card {
    background: #070D0A;
    border: 1px solid rgba(201,168,76,0.18);
    font-family: 'Instrument Sans', sans-serif;
    color: #E8E3D8;
    overflow: hidden;
    animation: border-glow 4s ease-in-out infinite;
  }

  .an-card .font-mono { font-family: 'IBM Plex Mono', monospace; }
  .an-card .font-serif { font-family: 'DM Serif Display', serif; }

  .skeleton-line {
    background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(201,168,76,0.08) 50%, rgba(255,255,255,0.04) 75%);
    background-size: 400px 100%;
    animation: shimmer 1.6s ease-in-out infinite;
    height: 10px;
  }

  .inner-section {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(201,168,76,0.1);
    padding: 16px;
    position: relative;
  }

  .inner-section::before {
    content: '';
    position: absolute;
    top: -1px; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent);
  }

  .narrative-text {
    color: #8A9490;
    font-size: 0.88rem;
    line-height: 1.8;
    animation: type-in 0.6s ease forwards;
  }
`

const RISK_CONFIG = {
  critical: { bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.4)', color: '#F87171' },
  high:     { bg: 'rgba(251,146,60,0.12)',  border: 'rgba(251,146,60,0.4)',  color: '#FB923C' },
  medium:   { bg: 'rgba(201,168,76,0.12)',  border: 'rgba(201,168,76,0.4)',  color: '#C9A84C' },
  low:      { bg: 'rgba(22,160,90,0.12)',   border: 'rgba(22,160,90,0.4)',   color: '#16A05A' },
}
const getRisk = (l) => RISK_CONFIG[(l || '').toLowerCase()] || RISK_CONFIG.low

/* ── Skeleton ── */
const SkeletonLoader = () => (
  <>
    <style>{CSS}</style>
    <div className="an-card">
      <div style={{
        padding: '18px 20px',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
        background: 'linear-gradient(135deg, rgba(15,107,61,0.08) 0%, transparent 100%)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div className="skeleton-line" style={{ width: 26, height: 26, flexShrink: 0 }} />
        <div className="skeleton-line" style={{ width: 160, height: 12 }} />
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="font-mono" style={{ fontSize: '0.6rem', color: '#2A3530', letterSpacing: '0.12em' }}>
          GENERATING PROFILE
          <span style={{ animation: 'pulse-dot 0.8s step-end infinite', display: 'inline-block', marginLeft: 3, color: '#C9A84C' }}>▋</span>
        </div>
        <div className="skeleton-line" style={{ width: '55%', height: 10 }} />
        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="skeleton-line" style={{ width: '100%' }} />
          <div className="skeleton-line" style={{ width: '92%' }} />
          <div className="skeleton-line" style={{ width: '80%' }} />
          <div className="skeleton-line" style={{ width: '87%' }} />
        </div>
        <div className="skeleton-line" style={{ width: 90, height: 22, marginTop: 4 }} />
      </div>
    </div>
  </>
)

/* ── Error ── */
const ErrorState = ({ message }) => (
  <>
    <style>{CSS}</style>
    <div className="an-card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: 36, height: 36, flexShrink: 0,
        border: '1px solid rgba(248,113,113,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
          <path d="M8 2L14 13H2L8 2Z" stroke="#F87171" strokeWidth="1.2" />
          <path d="M8 6.5V9.5M8 10.5V11.5" stroke="#F87171" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      <div>
        <div className="font-mono" style={{ fontSize: '0.65rem', color: '#F87171', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Profile Error</div>
        <p style={{ color: '#5A6560', fontSize: '0.82rem' }}>{message}</p>
      </div>
    </div>
  </>
)

/* ── Main ── */
function AccountNarrative({ accountId }) {
  const [narrative, setNarrative] = useState(null)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)

  useEffect(() => {
    const fetchNarrative = async () => {
      if (!accountId) return
      setLoading(true)
      setError(null)
      try {
        const data = await getAccountNarrative(accountId)
        setNarrative(data)
      } catch (err) {
        console.error('Error fetching account narrative:', err)
        setError('Failed to load account narrative. Please retry.')
      } finally {
        setLoading(false)
      }
    }
    fetchNarrative()
  }, [accountId])

  if (loading)   return <SkeletonLoader />
  if (error)     return <ErrorState message={error} />
  if (!narrative) return null

  const risk = narrative.risk_level ? getRisk(narrative.risk_level) : null

  return (
    <>
      <style>{CSS}</style>
      <div className="an-card">

        {/* ── Header ── */}
        <div style={{
          padding: '18px 20px',
          borderBottom: '1px solid rgba(201,168,76,0.12)',
          background: 'linear-gradient(135deg, rgba(15,107,61,0.1) 0%, rgba(7,13,10,0) 100%)',
          position: 'relative',
          overflow: 'hidden',
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

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 34, height: 34, flexShrink: 0,
                border: '1px solid rgba(201,168,76,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(201,168,76,0.06)',
                position: 'relative',
              }}>
                <DocumentIcon size={16} style={{ color: '#C9A84C' }} />
                <div style={{ position: 'absolute', bottom: -1, right: -1, width: 7, height: 7, background: '#C9A84C' }} />
              </div>
              <div>
                <div className="font-mono" style={{ fontSize: '0.6rem', color: '#4A5550', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 3 }}>
                  Forensic Profile
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#E8E3D8' }}>
                  Account Risk Narrative
                </div>
              </div>
            </div>

            {/* GPT badge */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(201,168,76,0.06)',
              border: '1px solid rgba(201,168,76,0.2)',
              padding: '4px 10px',
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: '50%', background: '#C9A84C',
                display: 'inline-block',
                animation: 'pulse-dot 1.8s ease-in-out infinite',
                color: '#C9A84C',
              }} />
              <span className="font-mono" style={{ fontSize: '0.6rem', color: '#C9A84C', letterSpacing: '0.1em' }}>GPT-POWERED</span>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Account ID row */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            animation: 'fade-slide-up 0.4s ease forwards',
          }}>
            <span className="font-mono" style={{ fontSize: '0.6rem', color: '#4A5550', letterSpacing: '0.12em', textTransform: 'uppercase', flexShrink: 0 }}>
              Account
            </span>
            <div style={{ flex: 1, height: 1, background: 'rgba(201,168,76,0.08)' }} />
            <span className="font-mono" style={{
              fontSize: '0.75rem', color: '#C4C0B8',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              padding: '3px 10px',
              letterSpacing: '0.04em',
            }}>
              {accountId}
            </span>
          </div>

          {/* Narrative text */}
          <div className="inner-section" style={{ animation: 'fade-slide-up 0.45s 0.05s ease forwards', opacity: 0 }}>
            <div className="font-mono" style={{ fontSize: '0.6rem', color: '#4A5550', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
              AI-Generated Summary
            </div>
            {/* decorative quote mark */}
            <div className="font-serif" style={{ fontSize: '3rem', lineHeight: 0.5, color: 'rgba(201,168,76,0.15)', marginBottom: 8, userSelect: 'none' }}>
              "
            </div>
            <p className="narrative-text">{narrative.narrative}</p>
          </div>

          {/* Risk level badge */}
          {risk && (
            <div style={{ animation: 'fade-slide-up 0.45s 0.12s ease forwards', opacity: 0 }}>
              <div className="font-mono" style={{ fontSize: '0.6rem', color: '#4A5550', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                Assessed Risk
              </div>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '5px 14px',
                background: risk.bg,
                border: `1px solid ${risk.border}`,
                fontSize: '0.65rem',
                fontFamily: 'IBM Plex Mono, monospace',
                color: risk.color,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>
                <span style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: risk.color, color: risk.color,
                  display: 'inline-block',
                  animation: 'pulse-dot 1.8s ease-in-out infinite',
                }} />
                {narrative.risk_level} RISK
              </span>
            </div>
          )}

          {/* Footer */}
          <div style={{
            paddingTop: 12,
            borderTop: '1px solid rgba(201,168,76,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <svg viewBox="0 0 12 12" width="10" height="10" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#2A3530" strokeWidth="1" />
              <path d="M6 5.5V8.5M6 4V4.5" stroke="#2A3530" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <span className="font-mono" style={{ fontSize: '0.62rem', color: '#2A3530', letterSpacing: '0.08em' }}>
              GENERATED BY RIFT AI ENGINE · NOT LEGAL ADVICE
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountNarrative