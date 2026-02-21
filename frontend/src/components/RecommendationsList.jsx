// import React, { useState, useEffect } from 'react'
// import { getRecommendations } from '../services/api'
// import DocumentIcon from './icons/DocumentIcon'

// function RecommendationsList({ accountId }) {
//   const [recommendations, setRecommendations] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [expandedSteps, setExpandedSteps] = useState({})

//   useEffect(() => {
//     const fetchRecommendations = async () => {
//       if (!accountId) return

//       setLoading(true)
//       setError(null)
//       try {
//         const data = await getRecommendations(accountId)
//         setRecommendations(data)
//       } catch (err) {
//         console.error('Error fetching recommendations:', err)
//         setError('Failed to load recommendations')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchRecommendations()
//   }, [accountId])

//   const toggleStep = (idx) => {
//     setExpandedSteps(prev => ({
//       ...prev,
//       [idx]: !prev[idx]
//     }))
//   }

//   if (loading) {
//     return (
//       <div className="bg-white/70 backdrop-blur-lg p-4 rounded-2xl border border-gray-200/60 shadow-xl animate-pulse">
//         <div className="h-4 bg-gray-200/80 rounded mb-2"></div>
//         <div className="h-4 bg-gray-200/70 rounded w-5/6"></div>
//       </div>
//     )
//   }

//   if (error) {
//     return <div className="bg-white/70 backdrop-blur-lg text-red-700 p-3 rounded-2xl border border-red-200/60 shadow-xl">{error}</div>
//   }

//   if (!recommendations || !recommendations.steps) return null

//   return (
//     <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-gray-200/60 shadow-xl overflow-hidden">
//       <div className="relative px-5 py-4 bg-gradient-to-r from-slate-900 via-emerald-900 to-green-700 text-white">
//         <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <h4 className="relative text-base font-semibold flex items-center gap-2">
//           <DocumentIcon size={16} className="text-white" />
//           Investigation Steps
//         </h4>
//       </div>

//       <ol className="p-5 list-decimal list-inside space-y-3">
//         {recommendations.steps.map((step, idx) => (
//           <li key={idx} className="text-gray-700">
//             <div 
//               className="inline-flex items-center gap-2 cursor-pointer hover:text-green-700 transition-colors"
//               onClick={() => toggleStep(idx)}
//             >
//               <span className="font-semibold">{step.title || `Step ${idx + 1}`}</span>
//               {step.priority && <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${
//                 step.priority.toLowerCase() === 'critical' ? 'bg-red-600 text-white' :
//                 step.priority.toLowerCase() === 'high' ? 'bg-orange-600 text-white' :
//                 'bg-yellow-500 text-gray-900'
//               }`}>{step.priority}</span>}
//             </div>
//             {expandedSteps[idx] && step.description && (
//               <div className="mt-2 ml-6 p-3 bg-white/70 rounded-xl border border-gray-200/70">
//                 <p className="text-sm text-gray-700">{step.description}</p>
//               </div>
//             )}
//           </li>
//         ))}
//       </ol>
//     </div>
//   )
// }

// export default RecommendationsList

//--claude 
import React, { useState, useEffect } from 'react'
import { getRecommendations } from '../services/api'
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

  @keyframes expand-down {
    from { opacity: 0; transform: translateY(-6px); max-height: 0; }
    to   { opacity: 1; transform: translateY(0); max-height: 300px; }
  }

  @keyframes scan-h {
    0%   { top: 0%; opacity: 1; }
    90%  { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; box-shadow: 0 0 6px #16A05A; }
    50%       { opacity: 0.4; box-shadow: none; }
  }

  @keyframes border-glow {
    0%, 100% { box-shadow: 0 0 0 1px rgba(201,168,76,0.15); }
    50%       { box-shadow: 0 0 24px 2px rgba(201,168,76,0.18); }
  }

  .rec-card {
    background: #070D0A;
    border: 1px solid rgba(201,168,76,0.18);
    font-family: 'Instrument Sans', sans-serif;
    color: #E8E3D8;
    overflow: hidden;
    animation: border-glow 4s ease-in-out infinite;
  }

  .rec-card .font-mono { font-family: 'IBM Plex Mono', monospace; }

  .skeleton-line {
    background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(201,168,76,0.08) 50%, rgba(255,255,255,0.04) 75%);
    background-size: 400px 100%;
    animation: shimmer 1.6s ease-in-out infinite;
    height: 10px;
  }

  .step-row {
    border-bottom: 1px solid rgba(201,168,76,0.07);
    transition: background 0.2s;
    animation: fade-slide-up 0.4s ease forwards;
    opacity: 0;
  }

  .step-row:last-child { border-bottom: none; }

  .step-row:hover { background: rgba(201,168,76,0.03); }

  .step-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    cursor: pointer;
    width: 100%;
    background: none;
    border: none;
    color: inherit;
    text-align: left;
    font-family: 'Instrument Sans', sans-serif;
  }

  .step-expand {
    animation: expand-down 0.3s ease forwards;
    overflow: hidden;
  }

  .chevron {
    transition: transform 0.25s ease;
    flex-shrink: 0;
    margin-left: auto;
  }

  .chevron.open { transform: rotate(180deg); }

  .priority-badge {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.58rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 2px 7px;
    flex-shrink: 0;
  }

  .rec-scroll::-webkit-scrollbar { width: 4px; }
  .rec-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
  .rec-scroll::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.25); }
`

const PRIORITY_STYLES = {
  critical: { bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.35)', color: '#F87171', dot: '#F87171' },
  high:     { bg: 'rgba(251,146,60,0.12)',  border: 'rgba(251,146,60,0.35)',  color: '#FB923C', dot: '#FB923C' },
  medium:   { bg: 'rgba(201,168,76,0.12)',  border: 'rgba(201,168,76,0.35)',  color: '#C9A84C', dot: '#C9A84C' },
  low:      { bg: 'rgba(22,160,90,0.12)',   border: 'rgba(22,160,90,0.35)',   color: '#16A05A', dot: '#16A05A' },
}

const getPriority = (p) => PRIORITY_STYLES[(p || '').toLowerCase()] || PRIORITY_STYLES.medium

/* ── Skeleton ── */
const SkeletonLoader = () => (
  <>
    <style>{CSS}</style>
    <div className="rec-card">
      <div style={{
        padding: '18px 20px',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
        background: 'linear-gradient(135deg, rgba(15,107,61,0.08) 0%, transparent 100%)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div className="skeleton-line" style={{ width: 26, height: 26, flexShrink: 0 }} />
        <div className="skeleton-line" style={{ width: 180, height: 12 }} />
      </div>
      <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="font-mono" style={{ fontSize: '0.6rem', color: '#2A3530', letterSpacing: '0.12em' }}>
          LOADING STEPS
          <span style={{ animation: 'type-cursor 0.8s step-end infinite', display: 'inline-block', marginLeft: 3, color: '#C9A84C' }}>▋</span>
        </div>
        {[100, 85, 92, 75].map((w, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="skeleton-line" style={{ width: 28, height: 28, flexShrink: 0 }} />
            <div className="skeleton-line" style={{ width: `${w}%`, height: 10 }} />
          </div>
        ))}
      </div>
    </div>
  </>
)

/* ── Error ── */
const ErrorState = ({ message }) => (
  <>
    <style>{CSS}</style>
    <div className="rec-card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
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
        <div className="font-mono" style={{ fontSize: '0.65rem', color: '#F87171', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
          Load Error
        </div>
        <p style={{ color: '#5A6560', fontSize: '0.82rem' }}>{message}</p>
      </div>
    </div>
  </>
)

/* ── Step Row ── */
const StepRow = ({ step, idx, expanded, onToggle }) => {
  const p = getPriority(step.priority)

  return (
    <div className="step-row" style={{ animationDelay: `${idx * 0.07}s` }}>
      <button className="step-header" onClick={() => onToggle(idx)}>
        {/* Step number box */}
        <div style={{
          width: 32, height: 32, flexShrink: 0,
          border: `1px solid ${p.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
          background: p.bg,
        }}>
          <span className="font-mono" style={{ fontSize: '0.7rem', color: p.color, fontWeight: 600 }}>
            {String(idx + 1).padStart(2, '0')}
          </span>
          <div style={{
            position: 'absolute', bottom: -1, right: -1,
            width: 5, height: 5, background: p.dot,
          }} />
        </div>

        {/* Title */}
        <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#C4C0B8', flex: 1, lineHeight: 1.4 }}>
          {step.title || `Step ${idx + 1}`}
        </span>

        {/* Priority badge */}
        {step.priority && (
          <span className="priority-badge" style={{
            background: p.bg,
            border: `1px solid ${p.border}`,
            color: p.color,
          }}>
            {step.priority}
          </span>
        )}

        {/* Chevron */}
        <svg
          className={`chevron${expanded ? ' open' : ''}`}
          viewBox="0 0 12 12" width="12" height="12" fill="none"
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="#4A5550" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Expanded description */}
      {expanded && step.description && (
        <div className="step-expand" style={{ padding: '0 20px 16px 64px' }}>
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(201,168,76,0.1)',
            borderLeft: `2px solid ${p.color}`,
            padding: '12px 14px',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: -1, left: 0, right: 0, height: 1,
              background: `linear-gradient(90deg, ${p.color}50, transparent)`,
            }} />
            <p style={{ fontSize: '0.82rem', color: '#8A9490', lineHeight: 1.7 }}>
              {step.description}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Main ── */
function RecommendationsList({ accountId }) {
  const [recommendations, setRecommendations] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedSteps, setExpandedSteps] = useState({})

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!accountId) return
      setLoading(true)
      setError(null)
      try {
        const data = await getRecommendations(accountId)
        setRecommendations(data)
      } catch (err) {
        console.error('Error fetching recommendations:', err)
        setError('Failed to load recommendations. Please retry.')
      } finally {
        setLoading(false)
      }
    }
    fetchRecommendations()
  }, [accountId])

  const toggleStep = (idx) =>
    setExpandedSteps(prev => ({ ...prev, [idx]: !prev[idx] }))

  if (loading) return <SkeletonLoader />
  if (error)   return <ErrorState message={error} />
  if (!recommendations || !recommendations.steps) return null

  const steps = recommendations.steps
  const criticalCount = steps.filter(s => (s.priority || '').toLowerCase() === 'critical').length

  return (
    <>
      <style>{CSS}</style>
      <div className="rec-card">

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

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* icon box */}
              <div style={{
                width: 34, height: 34,
                border: '1px solid rgba(201,168,76,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', flexShrink: 0,
                background: 'rgba(201,168,76,0.06)',
              }}>
                <DocumentIcon size={16} style={{ color: '#C9A84C' }} />
                <div style={{ position: 'absolute', bottom: -1, right: -1, width: 7, height: 7, background: '#C9A84C' }} />
              </div>
              <div>
                <div className="font-mono" style={{ fontSize: '0.6rem', color: '#4A5550', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 3 }}>
                  Action Plan
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#E8E3D8' }}>
                  Investigation Steps
                </div>
              </div>
            </div>

            {/* step count + critical count */}
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <div className="font-mono" style={{
                fontSize: '0.62rem', color: '#C9A84C',
                background: 'rgba(201,168,76,0.07)',
                border: '1px solid rgba(201,168,76,0.2)',
                padding: '3px 9px',
                letterSpacing: '0.08em',
              }}>
                {steps.length} STEPS
              </div>
              {criticalCount > 0 && (
                <div className="font-mono" style={{
                  fontSize: '0.62rem', color: '#F87171',
                  background: 'rgba(248,113,113,0.08)',
                  border: '1px solid rgba(248,113,113,0.3)',
                  padding: '3px 9px',
                  letterSpacing: '0.08em',
                  display: 'flex', alignItems: 'center', gap: 5,
                }}>
                  <span style={{
                    width: 5, height: 5, borderRadius: '50%', background: '#F87171',
                    display: 'inline-block',
                    animation: 'pulse-dot 1.5s ease-in-out infinite',
                  }} />
                  {criticalCount} CRITICAL
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Steps list ── */}
        <div className="rec-scroll" style={{ maxHeight: 420, overflowY: 'auto' }}>
          {steps.map((step, idx) => (
            <StepRow
              key={idx}
              step={step}
              idx={idx}
              expanded={!!expandedSteps[idx]}
              onToggle={toggleStep}
            />
          ))}

          {/* Footer */}
          <div style={{
            padding: '12px 20px',
            borderTop: '1px solid rgba(201,168,76,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <svg viewBox="0 0 12 12" width="10" height="10" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#2A3530" strokeWidth="1" />
              <path d="M6 5.5V8.5M6 4V4.5" stroke="#2A3530" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <span className="font-mono" style={{ fontSize: '0.62rem', color: '#2A3530', letterSpacing: '0.08em' }}>
              CLICK EACH STEP TO EXPAND DETAILS
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default RecommendationsList
