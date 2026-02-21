// import React, { useState, useEffect } from 'react'
// import { getInvestigationSummary } from '../services/api'
// import SparklesIcon from './icons/SparklesIcon'
// import AlertTriangleIcon from './icons/AlertTriangleIcon'
// import SearchIcon from './icons/SearchIcon'

// function InvestigationSummary({ analysisId }) {
//   const [summary, setSummary] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const fetchSummary = async () => {
//       if (!analysisId) return
      
//       setLoading(true)
//       setError(null)
//       try {
//         const data = await getInvestigationSummary(analysisId)
//         setSummary(data)
//       } catch (err) {
//         console.error('Error fetching investigation summary:', err)
//         setError('Failed to load AI summary')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchSummary()
//   }, [analysisId])

//   if (loading) {
//     return (
//       <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl border border-gray-200/60 shadow-xl animate-pulse">
//         <div className="h-8 bg-gray-200/80 rounded-lg mb-4 w-3/4"></div>
//         <div className="h-4 bg-gray-200/70 rounded mb-2"></div>
//         <div className="h-4 bg-gray-200/70 rounded mb-2 w-5/6"></div>
//         <div className="h-4 bg-gray-200/70 rounded w-4/6"></div>
//       </div>
//     )
//   }

//   if (error) {
//     return <div className="bg-white/70 backdrop-blur-lg text-red-700 p-4 rounded-2xl border border-red-200/60 shadow-xl">{error}</div>
//   }

//   if (!summary) return null

//   return (
//     <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-gray-200/60 shadow-xl overflow-hidden">
//       <div className="relative px-6 py-4 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
//         <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <h3 className="relative text-lg font-semibold flex items-center gap-2">
//           <SparklesIcon size={18} className="text-white" />
//           AI Investigation Summary
//         </h3>
//       </div>

//       <div className="p-6 space-y-4 max-h-[420px] overflow-y-auto scrollbar-thin">
//         <p className="text-gray-700 leading-relaxed">{summary.overview}</p>
//         {summary.top_suspects && summary.top_suspects.length > 0 && (
//           <div className="bg-red-50/70 p-4 rounded-xl border border-red-200/70">
//             <h4 className="text-base font-semibold text-red-700 mb-3 flex items-center gap-2">
//               <AlertTriangleIcon size={16} className="text-red-700" />
//               Top Suspects
//             </h4>
//             <ul className="list-disc list-inside space-y-1 text-gray-700">
//               {summary.top_suspects.slice(0, 5).map((suspect, idx) => (
//                 <li key={idx} className="ml-2">{suspect}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//         {summary.key_findings && summary.key_findings.length > 0 && (
//           <div className="bg-yellow-50/70 p-4 rounded-xl border border-yellow-200/70">
//             <h4 className="text-base font-semibold text-yellow-700 mb-3 flex items-center gap-2">
//               <SearchIcon size={16} className="text-yellow-700" />
//               Key Findings
//             </h4>
//             <ul className="list-disc list-inside space-y-1 text-gray-700">
//               {summary.key_findings.slice(0, 5).map((finding, idx) => (
//                 <li key={idx} className="ml-2">{finding}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default InvestigationSummary

//----claude 
import React, { useState, useEffect } from 'react'
import { getInvestigationSummary } from '../services/api'
import SparklesIcon from './icons/SparklesIcon'
import AlertTriangleIcon from './icons/AlertTriangleIcon'
import SearchIcon from './icons/SearchIcon'

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Mono:wght@400;600&family=Instrument+Sans:wght@400;500;600;700&display=swap');

  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }

  @keyframes type-cursor {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  @keyframes fade-slide-up {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
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
    0%, 100% { box-shadow: 0 0 0 1px rgba(201,168,76,0.15); }
    50%       { box-shadow: 0 0 24px 2px rgba(201,168,76,0.2); }
  }

  .inv-card {
    background: #070D0A;
    border: 1px solid rgba(201,168,76,0.18);
    font-family: 'Instrument Sans', sans-serif;
    color: #E8E3D8;
    overflow: hidden;
    animation: border-glow 4s ease-in-out infinite;
  }

  .inv-card .font-mono { font-family: 'IBM Plex Mono', monospace; }
  .inv-card .font-serif { font-family: 'DM Serif Display', serif; }

  .skeleton-line {
    background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(201,168,76,0.08) 50%, rgba(255,255,255,0.04) 75%);
    background-size: 400px 100%;
    animation: shimmer 1.6s ease-in-out infinite;
    height: 10px;
    border-radius: 0;
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

  .list-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 9px 0;
    border-bottom: 1px solid rgba(201,168,76,0.06);
    font-size: 0.83rem;
    color: #8A9490;
    line-height: 1.6;
    animation: fade-slide-up 0.4s ease forwards;
    opacity: 0;
  }

  .list-item:last-child { border-bottom: none; }

  .inv-scroll::-webkit-scrollbar { width: 4px; }
  .inv-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
  .inv-scroll::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.25); }
`

/* ── Skeleton Loader ── */
const SkeletonLoader = () => (
  <>
    <style>{CSS}</style>
    <div className="inv-card" style={{ padding: 0 }}>
      {/* header skeleton */}
      <div style={{
        padding: '18px 20px',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
        background: 'linear-gradient(135deg, rgba(15,107,61,0.08) 0%, transparent 100%)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div className="skeleton-line" style={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0 }} />
        <div className="skeleton-line" style={{ width: 200, height: 12 }} />
      </div>

      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="font-mono" style={{ fontSize: '0.6rem', color: '#2A3530', letterSpacing: '0.12em', marginBottom: 4 }}>
          GENERATING AI REPORT
          <span style={{ animation: 'type-cursor 0.8s step-end infinite', display: 'inline-block', marginLeft: 3, color: '#C9A84C' }}>▋</span>
        </div>
        <div className="skeleton-line" style={{ width: '100%' }} />
        <div className="skeleton-line" style={{ width: '88%' }} />
        <div className="skeleton-line" style={{ width: '76%' }} />
        <div className="skeleton-line" style={{ width: '92%', marginTop: 8 }} />
        <div className="skeleton-line" style={{ width: '65%' }} />
        <div className="skeleton-line" style={{ width: '80%', marginTop: 8 }} />
        <div className="skeleton-line" style={{ width: '70%' }} />
      </div>
    </div>
  </>
)

/* ── Error State ── */
const ErrorState = ({ message }) => (
  <>
    <style>{CSS}</style>
    <div className="inv-card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: 36, height: 36, flexShrink: 0,
        border: '1px solid rgba(248,113,113,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <AlertTriangleIcon size={18} style={{ color: '#F87171' }} />
      </div>
      <div>
        <div className="font-mono" style={{ fontSize: '0.65rem', color: '#F87171', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
          Report Error
        </div>
        <p style={{ color: '#5A6560', fontSize: '0.82rem' }}>{message}</p>
      </div>
    </div>
  </>
)

/* ── Main Component ── */
function InvestigationSummary({ analysisId }) {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSummary = async () => {
      if (!analysisId) return
      setLoading(true)
      setError(null)
      try {
        const data = await getInvestigationSummary(analysisId)
        setSummary(data)
      } catch (err) {
        console.error('Error fetching investigation summary:', err)
        setError('Failed to load AI summary. Please retry.')
      } finally {
        setLoading(false)
      }
    }
    fetchSummary()
  }, [analysisId])

  if (loading) return <SkeletonLoader />
  if (error)   return <ErrorState message={error} />
  if (!summary) return null

  return (
    <>
      <style>{CSS}</style>
      <div className="inv-card">

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
            backgroundSize: '20px 20px',
            pointerEvents: 'none',
          }} />

          {/* scan line */}
          <div style={{
            position: 'absolute', left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)',
            animation: 'scan-h 5s ease-in-out infinite',
          }} />

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* AI icon box */}
              <div style={{
                width: 34, height: 34,
                border: '1px solid rgba(201,168,76,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
                flexShrink: 0,
              }}>
                <SparklesIcon size={16} style={{ color: '#C9A84C' }} />
                <div style={{
                  position: 'absolute', bottom: -1, right: -1,
                  width: 7, height: 7, background: '#C9A84C',
                }} />
              </div>

              <div>
                <div className="font-mono" style={{ fontSize: '0.6rem', color: '#4A5550', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 3 }}>
                  AI Forensic Report
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#E8E3D8', letterSpacing: '0.01em' }}>
                  Investigation Summary
                </div>
              </div>
            </div>

            {/* live badge */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(201,168,76,0.06)',
              border: '1px solid rgba(201,168,76,0.2)',
              padding: '4px 10px',
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: '50%',
                background: '#C9A84C',
                display: 'inline-block',
                animation: 'pulse-dot 1.8s ease-in-out infinite',
              }} />
              <span className="font-mono" style={{ fontSize: '0.6rem', color: '#C9A84C', letterSpacing: '0.1em' }}>GPT-POWERED</span>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div
          className="inv-scroll"
          style={{ maxHeight: 420, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}
        >

          {/* Overview */}
          {summary.overview && (
            <div className="inner-section" style={{ animation: 'fade-slide-up 0.5s ease forwards' }}>
              <div className="font-mono" style={{ fontSize: '0.6rem', color: '#4A5550', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
                Overview
              </div>
              <p style={{ color: '#8A9490', fontSize: '0.88rem', lineHeight: 1.75 }}>
                {summary.overview}
              </p>
            </div>
          )}

          {/* Top Suspects */}
          {summary.top_suspects && summary.top_suspects.length > 0 && (
            <div className="inner-section" style={{ animation: 'fade-slide-up 0.5s 0.1s ease forwards', opacity: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <div style={{
                  width: 26, height: 26,
                  border: '1px solid rgba(248,113,113,0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <AlertTriangleIcon size={13} style={{ color: '#F87171' }} />
                </div>
                <span className="font-mono" style={{ fontSize: '0.6rem', color: '#F87171', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  Top Suspects
                </span>
              </div>

              <div>
                {summary.top_suspects.slice(0, 5).map((suspect, idx) => (
                  <div key={idx} className="list-item" style={{ animationDelay: `${idx * 0.06 + 0.15}s` }}>
                    {/* index badge */}
                    <span className="font-mono" style={{
                      fontSize: '0.6rem', color: '#F87171',
                      background: 'rgba(248,113,113,0.1)',
                      border: '1px solid rgba(248,113,113,0.2)',
                      padding: '1px 5px',
                      flexShrink: 0, marginTop: 1,
                    }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span style={{ color: '#C4C0B8' }}>{suspect}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Findings */}
          {summary.key_findings && summary.key_findings.length > 0 && (
            <div className="inner-section" style={{ animation: 'fade-slide-up 0.5s 0.2s ease forwards', opacity: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <div style={{
                  width: 26, height: 26,
                  border: '1px solid rgba(201,168,76,0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <SearchIcon size={13} style={{ color: '#C9A84C' }} />
                </div>
                <span className="font-mono" style={{ fontSize: '0.6rem', color: '#C9A84C', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  Key Findings
                </span>
              </div>

              <div>
                {summary.key_findings.slice(0, 5).map((finding, idx) => (
                  <div key={idx} className="list-item" style={{ animationDelay: `${idx * 0.06 + 0.25}s` }}>
                    <span className="font-mono" style={{
                      fontSize: '0.6rem', color: '#C9A84C',
                      background: 'rgba(201,168,76,0.08)',
                      border: '1px solid rgba(201,168,76,0.2)',
                      padding: '1px 5px',
                      flexShrink: 0, marginTop: 1,
                    }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span style={{ color: '#C4C0B8' }}>{finding}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            borderTop: '1px solid rgba(201,168,76,0.08)',
            paddingTop: 12,
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

export default InvestigationSummary
