// import React, { useState } from 'react'
// import MoneyIcon from './icons/MoneyIcon'
// import LinkIcon from './icons/LinkIcon'
// import BuildingIcon from './icons/BuildingIcon'

// function SuspiciousAccountsList({ analysisData, onAccountSelect }) {
//   const [sortBy, setSortBy] = useState('risk_score')
//   const [filterRisk, setFilterRisk] = useState('all')

//   // Get all suspicious accounts
//   const suspiciousAccounts = analysisData.account_scores.filter(account => {
//     const isSuspicious = 
//       analysisData.critical_accounts.includes(account.account_id) || 
//       analysisData.high_risk_accounts.includes(account.account_id)
    
//     if (filterRisk === 'critical') {
//       return analysisData.critical_accounts.includes(account.account_id)
//     } else if (filterRisk === 'high') {
//       return analysisData.high_risk_accounts.includes(account.account_id)
//     }
//     return isSuspicious
//   })

//   // Sort accounts
//   const sortedAccounts = [...suspiciousAccounts].sort((a, b) => {
//     if (sortBy === 'risk_score') {
//       return b.final_score - a.final_score
//     } else if (sortBy === 'account_id') {
//       return a.account_id.localeCompare(b.account_id)
//     } else if (sortBy === 'risk_level') {
//       const riskOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 }
//       return riskOrder[a.risk_level] - riskOrder[b.risk_level]
//     }
//     return 0
//   })

//   const getRiskClasses = (riskLevel) => {
//     switch (riskLevel) {
//       case 'CRITICAL':
//         return { badge: 'bg-red-600', bar: 'bg-red-600', text: 'text-red-700' }
//       case 'HIGH':
//         return { badge: 'bg-orange-600', bar: 'bg-orange-600', text: 'text-orange-700' }
//       case 'MEDIUM':
//         return { badge: 'bg-yellow-500 text-gray-900', bar: 'bg-yellow-500', text: 'text-yellow-700' }
//       case 'LOW':
//         return { badge: 'bg-green-700', bar: 'bg-green-700', text: 'text-green-700' }
//       default:
//         return { badge: 'bg-gray-600', bar: 'bg-gray-600', text: 'text-gray-700' }
//     }
//   }

//   return (
//     <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-gray-200/60 shadow-xl overflow-hidden max-h-[600px] flex flex-col">
//       <div className="relative bg-gradient-to-r from-slate-900 via-red-900 to-orange-700 text-white p-4 flex justify-between items-center flex-wrap gap-3">
//         <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <h3 className="text-lg font-bold m-0 inline-flex items-center gap-2">
//           <MoneyIcon size={18} className="text-white" />
//           Suspicious Accounts ({suspiciousAccounts.length})
//         </h3>
//         <div className="relative flex gap-2 flex-wrap">
//           <select 
//             value={filterRisk} 
//             onChange={(e) => setFilterRisk(e.target.value)}
//             className="bg-white/90 text-gray-800 border border-white/30 rounded-lg px-3 py-1.5 text-sm font-medium cursor-pointer hover:bg-white transition-colors"
//           >
//             <option value="all">All Risk Levels</option>
//             <option value="critical">Critical Only</option>
//             <option value="high">High Only</option>
//           </select>
//           <select 
//             value={sortBy} 
//             onChange={(e) => setSortBy(e.target.value)}
//             className="bg-white/90 text-gray-800 border border-white/30 rounded-lg px-3 py-1.5 text-sm font-medium cursor-pointer hover:bg-white transition-colors"
//           >
//             <option value="risk_score">Sort by Risk Score</option>
//             <option value="risk_level">Sort by Risk Level</option>
//             <option value="account_id">Sort by Account ID</option>
//           </select>
//         </div>
//       </div>

//       {sortedAccounts.length === 0 ? (
//         <div className="text-center py-10 text-gray-500">
//           <p>No suspicious accounts found</p>
//         </div>
//       ) : (
//         <div className="overflow-x-auto flex-1">
//           <table className="w-full border-collapse">
//             <thead className="sticky top-0 bg-gray-50/90 backdrop-blur border-b-2 border-gray-200">
//               <tr>
//                 <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Account ID</th>
//                 <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Risk Level</th>
//                 <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Risk Score</th>
//                 <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Score Breakdown</th>
//                 <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {sortedAccounts.map((account, idx) => (
//                 <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
//                   <td className="py-3 px-4">
//                     <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">{account.account_id}</code>
//                   </td>
//                   <td className="py-3 px-4 text-center">
//                     <span
//                       className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wide ${getRiskClasses(account.risk_level).badge}`}
//                     >
//                       {account.risk_level}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4">
//                     <div className="flex flex-col items-center gap-1">
//                       <span className="text-sm font-bold text-gray-800">{account.final_score.toFixed(1)}</span>
//                       <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
//                         <div 
//                           className={`h-full rounded-full transition-all ${getRiskClasses(account.risk_level).bar}`}
//                           style={{ 
//                             width: `${account.final_score}%`,
//                           }}
//                         ></div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="py-3 px-4">
//                     <div className="flex justify-center gap-2 flex-wrap">
//                       {account.ring_involvement_score > 0 && (
//                         <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium" title="Ring Involvement">
//                           <span className="inline-flex items-center gap-1">
//                             <LinkIcon size={14} className="text-blue-800" />
//                             {account.ring_involvement_score.toFixed(0)}
//                           </span>
//                         </span>
//                       )}
//                       {account.smurfing_score > 0 && (
//                         <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium" title="Smurfing">
//                           <span className="inline-flex items-center gap-1">
//                             <MoneyIcon size={14} className="text-green-800" />
//                             {account.smurfing_score.toFixed(0)}
//                           </span>
//                         </span>
//                       )}
//                       {account.shell_score > 0 && (
//                         <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium" title="Shell Activity">
//                           <span className="inline-flex items-center gap-1">
//                             <BuildingIcon size={14} className="text-yellow-800" />
//                             {account.shell_score.toFixed(0)}
//                           </span>
//                         </span>
//                       )}
//                     </div>
//                   </td>
//                   <td className="py-3 px-4 text-center">
//                     <button 
//                       className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all active:scale-95"
//                       onClick={() => onAccountSelect(account.account_id)}
//                       title="View account details"
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <div className="bg-gray-50/80 backdrop-blur px-4 py-3 border-t border-gray-200/70">
//         <div className="flex justify-around items-center">
//           <div className="flex gap-2 items-center">
//             <span className="text-sm text-gray-600 font-medium">Critical:</span>
//             <span className="text-sm font-bold text-red-600">{analysisData.critical_accounts.length}</span>
//           </div>
//           <div className="flex gap-2 items-center">
//             <span className="text-sm text-gray-600 font-medium">High:</span>
//             <span className="text-sm font-bold text-orange-600">{analysisData.high_risk_accounts.length}</span>
//           </div>
//           <div className="flex gap-2 items-center">
//             <span className="text-sm text-gray-600 font-medium">Total:</span>
//             <span className="text-sm font-bold text-gray-800">{suspiciousAccounts.length}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SuspiciousAccountsList

//--claude 
import React, { useState } from 'react'
import MoneyIcon from './icons/MoneyIcon'
import LinkIcon from './icons/LinkIcon'
import BuildingIcon from './icons/BuildingIcon'

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Mono:wght@400;600&family=Instrument+Sans:wght@400;500;600;700&display=swap');

  @keyframes fade-slide-up {
    from { opacity: 0; transform: translateY(8px); }
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

  @keyframes bar-fill {
    from { width: 0%; }
    to   { width: var(--bar-w); }
  }

  @keyframes border-glow {
    0%, 100% { box-shadow: 0 0 0 1px rgba(201,168,76,0.15); }
    50%       { box-shadow: 0 0 20px 2px rgba(201,168,76,0.18); }
  }

  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }

  .sal-card {
    background: #070D0A;
    border: 1px solid rgba(201,168,76,0.18);
    font-family: 'Instrument Sans', sans-serif;
    color: #E8E3D8;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    max-height: 600px;
    animation: border-glow 4s ease-in-out infinite;
  }

  .sal-card .font-mono { font-family: 'IBM Plex Mono', monospace; }

  /* ── custom select ── */
  .rift-select {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(201,168,76,0.22);
    color: #C9A84C;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.08em;
    padding: 5px 10px;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
  }
  .rift-select:hover { background: rgba(201,168,76,0.07); border-color: rgba(201,168,76,0.5); }
  .rift-select option { background: #0D1810; color: #C9A84C; }

  /* ── table ── */
  .sal-table { width: 100%; border-collapse: collapse; }

  .sal-thead {
    position: sticky; top: 0; z-index: 2;
    background: #0A130D;
    border-bottom: 1px solid rgba(201,168,76,0.15);
  }

  .sal-th {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #4A5550;
    padding: 10px 16px;
    text-align: left;
    font-weight: 600;
    white-space: nowrap;
  }
  .sal-th.center { text-align: center; }

  .sal-row {
    border-bottom: 1px solid rgba(201,168,76,0.06);
    transition: background 0.18s;
    animation: fade-slide-up 0.35s ease forwards;
    opacity: 0;
  }
  .sal-row:last-child { border-bottom: none; }
  .sal-row:hover { background: rgba(201,168,76,0.03); }

  .sal-td { padding: 12px 16px; vertical-align: middle; }
  .sal-td.center { text-align: center; }

  .score-bar-track {
    width: 100%;
    height: 3px;
    background: rgba(255,255,255,0.06);
    margin-top: 5px;
    position: relative;
    overflow: hidden;
  }

  .score-bar-fill {
    height: 100%;
    animation: bar-fill 0.8s cubic-bezier(.4,0,.2,1) forwards;
    position: absolute; top: 0; left: 0;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.06em;
    padding: 3px 8px;
    white-space: nowrap;
  }

  .view-btn {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.62rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 6px 14px;
    border: 1px solid rgba(201,168,76,0.3);
    background: rgba(201,168,76,0.06);
    color: #C9A84C;
    cursor: pointer;
    transition: background 0.18s, border-color 0.18s, transform 0.12s;
    position: relative;
  }
  .view-btn::after {
    content: '';
    position: absolute;
    bottom: -1px; right: -1px;
    width: 5px; height: 5px;
    background: #C9A84C;
  }
  .view-btn:hover {
    background: rgba(201,168,76,0.14);
    border-color: rgba(201,168,76,0.6);
    transform: translateY(-1px);
  }
  .view-btn:active { transform: scale(0.97); }

  .sal-scroll { overflow-y: auto; flex: 1; }
  .sal-scroll::-webkit-scrollbar { width: 4px; }
  .sal-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
  .sal-scroll::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.25); }
`

const RISK = {
  CRITICAL: { badge: { bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.4)', color: '#F87171' }, bar: '#F87171', dot: '#F87171' },
  HIGH:     { badge: { bg: 'rgba(251,146,60,0.12)',  border: 'rgba(251,146,60,0.4)',  color: '#FB923C' }, bar: '#FB923C', dot: '#FB923C' },
  MEDIUM:   { badge: { bg: 'rgba(201,168,76,0.12)',  border: 'rgba(201,168,76,0.4)',  color: '#C9A84C' }, bar: '#C9A84C', dot: '#C9A84C' },
  LOW:      { badge: { bg: 'rgba(22,160,90,0.12)',   border: 'rgba(22,160,90,0.4)',   color: '#16A05A' }, bar: '#16A05A', dot: '#16A05A' },
}
const getRisk = (l) => RISK[l] || RISK.LOW

function SuspiciousAccountsList({ analysisData, onAccountSelect }) {
  const [sortBy, setSortBy]       = useState('risk_score')
  const [filterRisk, setFilterRisk] = useState('all')

  const suspiciousAccounts = analysisData.account_scores.filter(account => {
    const isSuspicious =
      analysisData.critical_accounts.includes(account.account_id) ||
      analysisData.high_risk_accounts.includes(account.account_id)
    if (filterRisk === 'critical') return analysisData.critical_accounts.includes(account.account_id)
    if (filterRisk === 'high')     return analysisData.high_risk_accounts.includes(account.account_id)
    return isSuspicious
  })

  const sortedAccounts = [...suspiciousAccounts].sort((a, b) => {
    if (sortBy === 'risk_score') return b.final_score - a.final_score
    if (sortBy === 'account_id') return a.account_id.localeCompare(b.account_id)
    if (sortBy === 'risk_level') {
      const o = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 }
      return o[a.risk_level] - o[b.risk_level]
    }
    return 0
  })

  return (
    <>
      <style>{CSS}</style>
      <div className="sal-card">

        {/* ── Header ── */}
        <div style={{
          padding: '18px 20px',
          borderBottom: '1px solid rgba(201,168,76,0.12)',
          background: 'linear-gradient(135deg, rgba(15,107,61,0.1) 0%, rgba(7,13,10,0) 100%)',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
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

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            {/* Left: title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 34, height: 34, flexShrink: 0,
                border: '1px solid rgba(248,113,113,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(248,113,113,0.06)', position: 'relative',
              }}>
                <MoneyIcon size={16} style={{ color: '#F87171' }} />
                <div style={{ position: 'absolute', bottom: -1, right: -1, width: 7, height: 7, background: '#F87171' }} />
              </div>
              <div>
                <div className="font-mono" style={{ fontSize: '0.6rem', color: '#4A5550', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 3 }}>
                  Threat Registry
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#E8E3D8' }}>
                  Suspicious Accounts
                  <span className="font-mono" style={{ fontSize: '0.72rem', color: '#F87171', marginLeft: 8, fontWeight: 600 }}>
                    ({suspiciousAccounts.length})
                  </span>
                </div>
              </div>
            </div>

            {/* Right: controls */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <select className="rift-select" value={filterRisk} onChange={e => setFilterRisk(e.target.value)}>
                  <option value="all">ALL RISK</option>
                  <option value="critical">CRITICAL</option>
                  <option value="high">HIGH</option>
                </select>
                <svg viewBox="0 0 10 10" width="8" height="8" fill="none" style={{ position: 'absolute', right: 8, pointerEvents: 'none' }}>
                  <path d="M2 3.5L5 6.5L8 3.5" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <select className="rift-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                  <option value="risk_score">SORT: SCORE</option>
                  <option value="risk_level">SORT: LEVEL</option>
                  <option value="account_id">SORT: ID</option>
                </select>
                <svg viewBox="0 0 10 10" width="8" height="8" fill="none" style={{ position: 'absolute', right: 8, pointerEvents: 'none' }}>
                  <path d="M2 3.5L5 6.5L8 3.5" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ── Table ── */}
        {sortedAccounts.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48, gap: 12 }}>
            <svg viewBox="0 0 48 48" width="40" height="40" fill="none" style={{ opacity: 0.2 }}>
              <path d="M24 4L4 14V24C4 35 12.8 44.4 24 47C35.2 44.4 44 35 44 24V14L24 4Z" stroke="#C9A84C" strokeWidth="1.5" />
              <path d="M18 24L21.5 27.5L30 19" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="font-mono" style={{ color: '#2A3530', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              No suspicious accounts found
            </span>
          </div>
        ) : (
          <div className="sal-scroll">
            <table className="sal-table">
              <thead className="sal-thead">
                <tr>
                  <th className="sal-th">#</th>
                  <th className="sal-th">Account ID</th>
                  <th className="sal-th center">Risk Level</th>
                  <th className="sal-th center">Score</th>
                  <th className="sal-th center">Signals</th>
                  <th className="sal-th center">Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedAccounts.map((account, idx) => {
                  const risk = getRisk(account.risk_level)
                  return (
                    <tr
                      key={idx}
                      className="sal-row"
                      style={{ animationDelay: `${idx * 0.04}s` }}
                    >
                      {/* Row number */}
                      <td className="sal-td" style={{ width: 40 }}>
                        <span className="font-mono" style={{ fontSize: '0.6rem', color: '#2A3530' }}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </td>

                      {/* Account ID */}
                      <td className="sal-td">
                        <span className="font-mono" style={{
                          fontSize: '0.75rem',
                          color: '#C4C0B8',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.07)',
                          padding: '3px 8px',
                          letterSpacing: '0.04em',
                          display: 'inline-block',
                        }}>
                          {account.account_id}
                        </span>
                      </td>

                      {/* Risk Level */}
                      <td className="sal-td center">
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5,
                          padding: '3px 9px',
                          background: risk.badge.bg,
                          border: `1px solid ${risk.badge.border}`,
                          fontSize: '0.6rem',
                          fontFamily: 'IBM Plex Mono, monospace',
                          color: risk.badge.color,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                        }}>
                          <span style={{
                            width: 4, height: 4, borderRadius: '50%',
                            background: risk.dot, color: risk.dot,
                            display: 'inline-block',
                            animation: 'pulse-dot 1.8s ease-in-out infinite',
                          }} />
                          {account.risk_level}
                        </span>
                      </td>

                      {/* Score */}
                      <td className="sal-td" style={{ minWidth: 90 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <span className="font-mono" style={{ fontSize: '0.78rem', color: risk.badge.color, fontWeight: 600 }}>
                            {account.final_score.toFixed(1)}
                          </span>
                          <div className="score-bar-track" style={{ maxWidth: 70 }}>
                            <div
                              className="score-bar-fill"
                              style={{
                                '--bar-w': `${account.final_score}%`,
                                background: `linear-gradient(90deg, ${risk.bar}60, ${risk.bar})`,
                                animationDelay: `${idx * 0.04}s`,
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Signals */}
                      <td className="sal-td center">
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 5, flexWrap: 'wrap' }}>
                          {account.ring_involvement_score > 0 && (
                            <span className="chip" style={{
                              background: 'rgba(201,168,76,0.08)',
                              border: '1px solid rgba(201,168,76,0.25)',
                              color: '#C9A84C',
                            }} title="Ring Involvement">
                              <LinkIcon size={10} style={{ color: '#C9A84C' }} />
                              {account.ring_involvement_score.toFixed(0)}
                            </span>
                          )}
                          {account.smurfing_score > 0 && (
                            <span className="chip" style={{
                              background: 'rgba(22,160,90,0.08)',
                              border: '1px solid rgba(22,160,90,0.25)',
                              color: '#16A05A',
                            }} title="Smurfing">
                              <MoneyIcon size={10} style={{ color: '#16A05A' }} />
                              {account.smurfing_score.toFixed(0)}
                            </span>
                          )}
                          {account.shell_score > 0 && (
                            <span className="chip" style={{
                              background: 'rgba(251,146,60,0.08)',
                              border: '1px solid rgba(251,146,60,0.25)',
                              color: '#FB923C',
                            }} title="Shell Activity">
                              <BuildingIcon size={10} style={{ color: '#FB923C' }} />
                              {account.shell_score.toFixed(0)}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="sal-td center">
                        <button
                          className="view-btn"
                          onClick={() => onAccountSelect(account.account_id)}
                          title="Investigate account"
                        >
                          INSPECT →
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Footer stats ── */}
        <div style={{
          padding: '10px 20px',
          borderTop: '1px solid rgba(201,168,76,0.1)',
          background: '#050A07',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          flexWrap: 'wrap',
          gap: 8,
        }}>
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { label: 'Critical', val: analysisData.critical_accounts.length, color: '#F87171' },
              { label: 'High',     val: analysisData.high_risk_accounts.length, color: '#FB923C' },
              { label: 'Total',    val: suspiciousAccounts.length, color: '#C9A84C' },
            ].map(({ label, val, color }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="font-mono" style={{ fontSize: '0.6rem', color: '#4A5550', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
                <span className="font-mono" style={{ fontSize: '0.85rem', color, fontWeight: 700 }}>{val}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg viewBox="0 0 12 12" width="10" height="10" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#2A3530" strokeWidth="1" />
              <path d="M6 5.5V8.5M6 4V4.5" stroke="#2A3530" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <span className="font-mono" style={{ fontSize: '0.6rem', color: '#2A3530', letterSpacing: '0.08em' }}>
              SHOWING {sortedAccounts.length} OF {suspiciousAccounts.length} ACCOUNTS
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default SuspiciousAccountsList
