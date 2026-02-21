// import React from 'react'

// const AccountInfo = ({ accountDetails, onClose }) => {
//   if (!accountDetails) {
//     return (
//       <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-gray-200/60 shadow-xl p-6 h-full flex items-center justify-center text-gray-500">
//         <p>Select an account to view details</p>
//       </div>
//     )
//   }

//   const getRiskStyles = (riskLevel) => {
//     switch (riskLevel) {
//       case 'CRITICAL':
//         return { badge: 'bg-red-600 text-white', text: 'text-red-700', ring: 'bg-blue-600', smurf: 'bg-orange-600', shell: 'bg-red-600' }
//       case 'HIGH':
//         return { badge: 'bg-orange-600 text-white', text: 'text-orange-700', ring: 'bg-blue-600', smurf: 'bg-orange-600', shell: 'bg-red-600' }
//       case 'MEDIUM':
//         return { badge: 'bg-yellow-500 text-gray-900', text: 'text-yellow-700', ring: 'bg-blue-600', smurf: 'bg-orange-600', shell: 'bg-red-600' }
//       case 'LOW':
//         return { badge: 'bg-green-700 text-white', text: 'text-green-700', ring: 'bg-blue-600', smurf: 'bg-orange-600', shell: 'bg-red-600' }
//       default:
//         return { badge: 'bg-gray-700 text-white', text: 'text-gray-700', ring: 'bg-blue-600', smurf: 'bg-orange-600', shell: 'bg-red-600' }
//     }
//   }

//   const riskStyles = getRiskStyles(accountDetails.risk_level)

//   return (
//     <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-gray-200/60 shadow-xl overflow-hidden h-full flex flex-col">
//       <div className="relative px-5 py-4 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
//         <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <div className="relative flex justify-between items-start gap-3">
//           <div className="min-w-0">
//             <h3 className="text-base font-semibold break-all">{accountDetails.account_id}</h3>
//             <div className={`inline-flex mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${riskStyles.badge}`}>
//               {accountDetails.risk_level}
//             </div>
//           </div>
//           <button
//             className="shrink-0 text-white/80 hover:text-white text-xl font-bold cursor-pointer transition-colors"
//             onClick={onClose}
//             aria-label="Close account details"
//           >
//             X
//           </button>
//         </div>
//       </div>

//       <div className="p-5 flex flex-col gap-5">
//         <div className="bg-white/60 p-4 rounded-xl border border-gray-200/60">
//           <div className="flex justify-between items-center">
//             <span className="text-sm text-gray-600 font-medium">Suspicion Score</span>
//             <span className={`text-2xl font-bold ${riskStyles.text}`}>
//               {accountDetails.final_score.toFixed(1)}/100
//             </span>
//           </div>
//         </div>

//         <div className="flex flex-col gap-3">
//           <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Risk Factor Breakdown</h4>
//         <div className="flex flex-col gap-1.5">
//           <span className="text-xs text-gray-600 font-medium">Ring Involvement</span>
//           <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
//             <div
//               className={`absolute top-0 left-0 h-full rounded-full transition-all ${riskStyles.ring}`}
//               style={{ width: `${accountDetails.ring_involvement_score}%` }}
//             ></div>
//           </div>
//           <span className="text-xs text-gray-800 font-semibold self-end">
//             {accountDetails.ring_involvement_score.toFixed(1)}
//           </span>
//         </div>

//         <div className="flex flex-col gap-1.5">
//           <span className="text-xs text-gray-600 font-medium">Smurfing Behavior</span>
//           <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
//             <div
//               className={`absolute top-0 left-0 h-full rounded-full transition-all ${riskStyles.smurf}`}
//               style={{ width: `${accountDetails.smurfing_score}%` }}
//             ></div>
//           </div>
//           <span className="text-xs text-gray-800 font-semibold self-end">
//             {accountDetails.smurfing_score.toFixed(1)}
//           </span>
//         </div>

//         <div className="flex flex-col gap-1.5">
//           <span className="text-xs text-gray-600 font-medium">Shell Characteristics</span>
//           <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
//             <div
//               className={`absolute top-0 left-0 h-full rounded-full transition-all ${riskStyles.shell}`}
//               style={{ width: `${accountDetails.shell_score}%` }}
//             ></div>
//           </div>
//           <span className="text-xs text-gray-800 font-semibold self-end">
//             {accountDetails.shell_score.toFixed(1)}
//           </span>
//         </div>
//         </div>

//       {accountDetails.risk_factors && accountDetails.risk_factors.length > 0 && (
//         <div className="bg-red-50/70 p-4 rounded-xl border border-red-200/70">
//           <h4 className="text-sm font-bold text-red-700 uppercase tracking-wide mb-2">Identified Risk Factors</h4>
//           <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
//             {accountDetails.risk_factors.map((factor, idx) => (
//               <li key={idx}>{factor}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//         <div className="mt-auto pt-4 border-t border-gray-200/70">
//           <p className="text-xs text-gray-500 text-center italic">
//             Click on nodes in the graph to view more details
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AccountInfo


// ----cluade 
import React from 'react'

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Mono:wght@400;600&family=Instrument+Sans:wght@400;500;600;700&display=swap');

  @keyframes bar-fill {
    from { width: 0%; }
    to   { width: var(--bar-width); }
  }

  @keyframes score-pop {
    0%   { transform: scale(0.85); opacity: 0; }
    70%  { transform: scale(1.05); }
    100% { transform: scale(1); opacity: 1; }
  }

  @keyframes fade-slide {
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

  .ai-bar {
    height: 4px;
    border-radius: 0;
    animation: bar-fill 1s cubic-bezier(.4,0,.2,1) forwards;
    width: 0;
  }

  .score-pop { animation: score-pop 0.5s ease forwards; }
  .fade-slide { animation: fade-slide 0.45s ease forwards; }

  .account-card {
    background: #070D0A;
    border: 1px solid rgba(201,168,76,0.18);
    font-family: 'Instrument Sans', sans-serif;
    color: #E8E3D8;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .account-card .font-mono { font-family: 'IBM Plex Mono', monospace; }
  .account-card .font-serif { font-family: 'DM Serif Display', serif; }

  .gold-text {
    background: linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .inner-section {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(201,168,76,0.1);
    padding: 16px;
    position: relative;
  }

  .inner-section::before {
    content: '';
    position: absolute;
    top: -1px; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent);
  }

  .risk-factor-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 9px 0;
    border-bottom: 1px solid rgba(201,168,76,0.07);
    font-size: 0.8rem;
    color: #8A9490;
    line-height: 1.5;
    animation: fade-slide 0.4s ease forwards;
    opacity: 0;
  }

  .close-btn {
    background: rgba(201,168,76,0.08);
    border: 1px solid rgba(201,168,76,0.25);
    color: #C9A84C;
    width: 28px; height: 28px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.75rem;
    transition: background 0.2s, border-color 0.2s;
    flex-shrink: 0;
  }
  .close-btn:hover {
    background: rgba(201,168,76,0.18);
    border-color: rgba(201,168,76,0.6);
  }
`

const RISK_CONFIG = {
  CRITICAL: {
    badge: { bg: 'rgba(220,38,38,0.15)', border: 'rgba(220,38,38,0.5)', color: '#F87171' },
    dot: '#F87171',
    scoreColor: '#F87171',
    bars: { ring: '#F87171', smurf: '#FB923C', shell: '#F87171' },
  },
  HIGH: {
    badge: { bg: 'rgba(234,88,12,0.15)', border: 'rgba(234,88,12,0.5)', color: '#FB923C' },
    dot: '#FB923C',
    scoreColor: '#FB923C',
    bars: { ring: '#C9A84C', smurf: '#FB923C', shell: '#F87171' },
  },
  MEDIUM: {
    badge: { bg: 'rgba(201,168,76,0.15)', border: 'rgba(201,168,76,0.5)', color: '#C9A84C' },
    dot: '#C9A84C',
    scoreColor: '#C9A84C',
    bars: { ring: '#C9A84C', smurf: '#C9A84C', shell: '#FB923C' },
  },
  LOW: {
    badge: { bg: 'rgba(22,160,90,0.15)', border: 'rgba(22,160,90,0.5)', color: '#16A05A' },
    dot: '#16A05A',
    scoreColor: '#16A05A',
    bars: { ring: '#16A05A', smurf: '#C9A84C', shell: '#C9A84C' },
  },
}

const getRisk = (level) => RISK_CONFIG[level] || RISK_CONFIG['LOW']

/* ── Metric Bar ── */
const MetricBar = ({ label, value, color, delay = '0s' }) => (
  <div style={{ marginBottom: 16 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
      <span className="font-mono" style={{ fontSize: '0.65rem', color: '#4A5550', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
      <span className="font-mono" style={{ fontSize: '0.75rem', color, fontWeight: 600 }}>{value.toFixed(1)}</span>
    </div>
    {/* Track */}
    <div style={{
      width: '100%', height: 4,
      background: 'rgba(255,255,255,0.06)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div
        className="ai-bar"
        style={{
          '--bar-width': `${value}%`,
          background: `linear-gradient(90deg, ${color}80, ${color})`,
          animationDelay: delay,
          position: 'absolute', top: 0, left: 0, height: '100%',
        }}
      />
      {/* shimmer */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: `${value}%`,
        height: '100%',
        background: `linear-gradient(90deg, transparent 60%, rgba(255,255,255,0.3) 80%, transparent 100%)`,
        animation: `bar-fill 1s cubic-bezier(.4,0,.2,1) ${delay} forwards`,
        animationFillMode: 'forwards',
      }} />
    </div>
  </div>
)

/* ── Empty State ── */
const EmptyState = () => (
  <>
    <style>{CSS}</style>
    <div className="account-card" style={{ alignItems: 'center', justifyContent: 'center', padding: 32 }}>
      <svg viewBox="0 0 60 60" width="48" height="48" fill="none" style={{ marginBottom: 16, opacity: 0.3 }}>
        <path d="M30 6L6 18V30C6 43.5 16.5 55.5 30 58C43.5 55.5 54 43.5 54 30V18L30 6Z"
          stroke="#C9A84C" strokeWidth="1.5" />
        <path d="M22 30L27 35L38 24" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="font-mono" style={{ color: '#2A3530', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        No Account Selected
      </p>
      <p style={{ color: '#2A3530', fontSize: '0.78rem', marginTop: 6, textAlign: 'center' }}>
        Select a node in the graph to view forensic details
      </p>
    </div>
  </>
)

/* ── Main Component ── */
const AccountInfo = ({ accountDetails, onClose }) => {
  if (!accountDetails) return <EmptyState />

  const risk = getRisk(accountDetails.risk_level)
  const scorePercent = Math.min(accountDetails.final_score, 100)

  return (
    <>
      <style>{CSS}</style>
      <div className="account-card">

        {/* ── Header ── */}
        <div style={{
          padding: '20px 20px 16px',
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
          }} />

          {/* scan line */}
          <div style={{
            position: 'absolute', left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)',
            animation: 'scan-h 4s ease-in-out infinite',
          }} />

          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              {/* label */}
              <div className="font-mono" style={{ fontSize: '0.6rem', color: '#4A5550', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>
                Account ID
              </div>
              {/* id */}
              <div className="font-mono" style={{ fontSize: '0.9rem', color: '#E8E3D8', fontWeight: 600, wordBreak: 'break-all', letterSpacing: '0.04em' }}>
                {accountDetails.account_id}
              </div>
              {/* Risk badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                marginTop: 10,
                padding: '4px 10px',
                background: risk.badge.bg,
                border: `1px solid ${risk.badge.border}`,
                fontSize: '0.65rem',
                fontFamily: 'IBM Plex Mono, monospace',
                color: risk.badge.color,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}>
                <span style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: risk.dot, color: risk.dot,
                  animation: 'pulse-dot 1.5s ease-in-out infinite',
                  display: 'inline-block',
                }} />
                {accountDetails.risk_level} RISK
              </div>
            </div>

            <button className="close-btn" onClick={onClose} aria-label="Close">✕</button>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* ── Score ── */}
          <div className="inner-section fade-slide">
            <div className="font-mono" style={{ fontSize: '0.6rem', color: '#4A5550', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
              Suspicion Score
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div className="score-pop">
                <span className="font-serif" style={{ fontSize: '3rem', lineHeight: 1, color: risk.scoreColor }}>
                  {accountDetails.final_score.toFixed(1)}
                </span>
                <span className="font-mono" style={{ fontSize: '0.75rem', color: '#4A5550', marginLeft: 4 }}>/100</span>
              </div>
              {/* radial-ish gauge */}
              <svg viewBox="0 0 60 60" width="52" height="52">
                <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                <circle
                  cx="30" cy="30" r="24"
                  fill="none"
                  stroke={risk.scoreColor}
                  strokeWidth="4"
                  strokeDasharray={`${(scorePercent / 100) * 150.8} 150.8`}
                  strokeLinecap="butt"
                  transform="rotate(-90 30 30)"
                  style={{ opacity: 0.85 }}
                />
                <circle cx="30" cy="30" r="2" fill={risk.scoreColor} />
              </svg>
            </div>
            {/* sub-bar */}
            <div style={{ marginTop: 12, height: 2, background: 'rgba(255,255,255,0.05)' }}>
              <div style={{
                height: '100%',
                width: `${scorePercent}%`,
                background: `linear-gradient(90deg, ${risk.scoreColor}50, ${risk.scoreColor})`,
                transition: 'width 1s ease',
              }} />
            </div>
          </div>

          {/* ── Risk Factor Bars ── */}
          <div className="inner-section" style={{ animationDelay: '0.1s' }}>
            <div className="font-mono" style={{ fontSize: '0.6rem', color: '#4A5550', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16 }}>
              Risk Factor Breakdown
            </div>

            <MetricBar label="Ring Involvement" value={accountDetails.ring_involvement_score} color={risk.bars.ring} delay="0.1s" />
            <MetricBar label="Smurfing Behaviour" value={accountDetails.smurfing_score} color={risk.bars.smurf} delay="0.25s" />
            <MetricBar label="Shell Characteristics" value={accountDetails.shell_score} color={risk.bars.shell} delay="0.4s" />
          </div>

          {/* ── Identified Risk Factors ── */}
          {accountDetails.risk_factors && accountDetails.risk_factors.length > 0 && (
            <div className="inner-section" style={{ animationDelay: '0.2s' }}>
              <div className="font-mono" style={{ fontSize: '0.6rem', color: '#4A5550', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>
                Identified Risk Factors
              </div>
              <div>
                {accountDetails.risk_factors.map((factor, idx) => (
                  <div
                    key={idx}
                    className="risk-factor-item"
                    style={{ animationDelay: `${0.05 * idx + 0.2}s` }}
                  >
                    {/* icon */}
                    <svg viewBox="0 0 12 12" width="12" height="12" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                      <path d="M6 1L1 3.5V6C1 9 3.4 11.2 6 12C8.6 11.2 11 9 11 6V3.5L6 1Z"
                        stroke="#F87171" strokeWidth="1" />
                      <path d="M4.5 6L5.5 7L7.5 5" stroke="#F87171" strokeWidth="0.8" strokeLinecap="round" />
                    </svg>
                    <span>{factor}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Footer hint ── */}
          <div style={{
            marginTop: 'auto',
            paddingTop: 12,
            borderTop: '1px solid rgba(201,168,76,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <svg viewBox="0 0 12 12" width="10" height="10" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#2A3530" strokeWidth="1" />
              <path d="M6 5.5V8.5M6 4V4.5" stroke="#2A3530" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <span className="font-mono" style={{ fontSize: '0.62rem', color: '#2A3530', letterSpacing: '0.08em' }}>
              CLICK GRAPH NODES TO INVESTIGATE
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountInfo