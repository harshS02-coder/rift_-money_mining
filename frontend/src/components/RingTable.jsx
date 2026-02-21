// import React from 'react'
// import AlertTriangleIcon from './icons/AlertTriangleIcon'
// import CheckIcon from './icons/CheckIcon'
// import RefreshIcon from './icons/RefreshIcon'
// import MoneyIcon from './icons/MoneyIcon'
// import BuildingIcon from './icons/BuildingIcon'

// const RingTable = ({ rings, smurfingAlerts, shellAccounts }) => {
//   const [activeTab, setActiveTab] = React.useState('fraud-rings')

//   // Separate rings by classification - ONLY show explicitly classified rings
//   const fraudRings = rings?.filter(r => r.classification === 'FRAUD') || []
//   const legitimateRings = rings?.filter(r => r.classification === 'LEGITIMATE') || []

//   const renderRingRow = (ring, index) => {
//     const isfraud = ring.classification === 'FRAUD'
//     return (
//       <tr key={`ring-${index}`} className={`border-b border-gray-200 transition-colors ${isfraud ? 'bg-red-50 hover:bg-red-100' : 'bg-green-50 hover:bg-green-100'}`}>
//         <td className="py-3 px-4">
//           {isfraud && (
//             <span className="inline-flex items-center gap-1 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded mr-2">
//               <AlertTriangleIcon size={14} className="text-white" />
//               FRAUD
//             </span>
//           )}
//           {!isfraud && (
//             <span className="inline-flex items-center gap-1 bg-green-700 text-white text-xs font-bold px-2 py-1 rounded mr-2">
//               <CheckIcon size={14} className="text-white" />
//               LEGIT
//             </span>
//           )}
//           <span className="font-mono text-sm">{ring.ring_id}</span>
//         </td>
//         <td className="py-3 px-4">
//           <div className="flex flex-wrap gap-1">
//             {ring.accounts.map((acc, i) => (
//               <span key={`${ring.ring_id}-${i}`} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
//                 {acc}
//               </span>
//             ))}
//           </div>
//         </td>
//         <td className="py-3 px-4 text-center font-semibold">{ring.length}</td>
//         <td className="py-3 px-4 text-right font-semibold">${ring.total_amount.toLocaleString('en-US', {
//           minimumFractionDigits: 2,
//           maximumFractionDigits: 2
//         })}</td>
//         <td className="py-3 px-4 text-center font-semibold">{ring.transactions.length}</td>
//         <td className="py-3 px-4">
//           <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
//             <div 
//               className="absolute top-0 left-0 h-full rounded-full transition-all" 
//               style={{
//                 width: `${(ring.isolation_score || 0) * 100}%`,
//                 backgroundColor: (ring.isolation_score || 0) > 0.75 ? '#d32f2f' : (ring.isolation_score || 0) > 0.5 ? '#f57c00' : '#4caf50'
//               }}
//             ></div>
//           </div>
//           <span className="text-xs text-gray-700 font-semibold mt-1 block text-center">{((ring.isolation_score || 0) * 100).toFixed(0)}%</span>
//         </td>
//       </tr>
//     )
//   }

//   const renderSmurfingRow = (alert, index) => (
//     <tr key={`smurf-${index}`} className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
//       <td className="py-3 px-4">
//         <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">{alert.account_id}</code>
//       </td>
//       <td className="py-3 px-4 text-center font-semibold">{alert.transaction_count}</td>
//       <td className="py-3 px-4 text-center">
//         <span className="text-green-600 font-semibold">{alert.fan_in}→</span>
//         <span className="font-mono text-xs mx-1">{alert.account_id}</span>
//         <span className="text-red-600 font-semibold">→{alert.fan_out}</span>
//       </td>
//       <td className="py-3 px-4 text-right font-semibold">${alert.total_amount.toLocaleString('en-US', {
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2
//       })}</td>
//       <td className="py-3 px-4">
//         <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
//           <div
//             className="absolute top-0 left-0 h-full rounded-full transition-all"
//             style={{
//               width: `${alert.risk_score}%`,
//               backgroundColor:
//                 alert.risk_score > 80
//                   ? '#d32f2f'
//                   : alert.risk_score > 60
//                     ? '#f57c00'
//                     : alert.risk_score > 40
//                       ? '#fbc02d'
//                       : '#388e3c',
//             }}
//           ></div>
//         </div>
//         <span className="text-xs text-gray-700 font-semibold mt-1 block text-center">{alert.risk_score.toFixed(1)}</span>
//       </td>
//     </tr>
//   )

//   const renderShellRow = (shell, index) => (
//     <tr key={`shell-${index}`} className="border-b border-gray-200 hover:bg-yellow-50 transition-colors">
//       <td className="py-3 px-4">
//         <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">{shell.account_id}</code>
//       </td>
//       <td className="py-3 px-4 text-center font-semibold">{shell.total_transactions}</td>
//       <td className="py-3 px-4 text-right font-semibold">${shell.total_throughput.toLocaleString('en-US', {
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2
//       })}</td>
//       <td className="py-3 px-4 text-right font-semibold">${shell.avg_transaction_value.toLocaleString('en-US', {
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2
//       })}</td>
//       <td className="py-3 px-4">
//         <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
//           <div
//             className="absolute top-0 left-0 h-full rounded-full transition-all"
//             style={{
//               width: `${shell.risk_score}%`,
//               backgroundColor:
//                 shell.risk_score > 80
//                   ? '#d32f2f'
//                   : shell.risk_score > 60
//                     ? '#f57c00'
//                     : shell.risk_score > 40
//                       ? '#fbc02d'
//                       : '#388e3c',
//             }}
//           ></div>
//         </div>
//         <span className="text-xs text-gray-700 font-semibold mt-1 block text-center">{shell.risk_score.toFixed(1)}</span>
//       </td>
//     </tr>
//   )

//   return (
//     <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-gray-200/60 shadow-xl overflow-hidden">
//       <div className="flex gap-2 bg-gray-50/80 backdrop-blur p-3 border-b border-gray-200/70 overflow-x-auto">
//         <button
//           className={`px-4 py-2 font-semibold text-sm rounded-xl transition-all whitespace-nowrap ${activeTab === 'fraud-rings' ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-md' : 'bg-white/80 text-gray-700 hover:bg-white'}`}
//           onClick={() => setActiveTab('fraud-rings')}
//         >
//           <span className="inline-flex items-center gap-2">
//             <AlertTriangleIcon size={14} className="text-current" />
//             Fraud Rings ({fraudRings?.length || 0})
//           </span>
//         </button>
//         <button
//           className={`px-4 py-2 font-semibold text-sm rounded-xl transition-all whitespace-nowrap ${activeTab === 'legitimate-rings' ? 'bg-gradient-to-r from-green-700 to-emerald-600 text-white shadow-md' : 'bg-white/80 text-gray-700 hover:bg-white'}`}
//           onClick={() => setActiveTab('legitimate-rings')}
//         >
//           <span className="inline-flex items-center gap-2">
//             <CheckIcon size={14} className="text-current" />
//             Legitimate Cycles ({legitimateRings?.length || 0})
//           </span>
//         </button>
//         <button
//           className={`px-4 py-2 font-semibold text-sm rounded-xl transition-all whitespace-nowrap ${activeTab === 'all-rings' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'bg-white/80 text-gray-700 hover:bg-white'}`}
//           onClick={() => setActiveTab('all-rings')}
//         >
//           <span className="inline-flex items-center gap-2">
//             <RefreshIcon size={14} className="text-current" />
//             All Cycles ({rings?.length || 0})
//           </span>
//         </button>
//         <button
//           className={`px-4 py-2 font-semibold text-sm rounded-xl transition-all whitespace-nowrap ${activeTab === 'smurfing' ? 'bg-gradient-to-r from-orange-600 to-yellow-500 text-white shadow-md' : 'bg-white/80 text-gray-700 hover:bg-white'}`}
//           onClick={() => setActiveTab('smurfing')}
//         >
//           <span className="inline-flex items-center gap-2">
//             <MoneyIcon size={14} className="text-current" />
//             Smurfing ({smurfingAlerts?.length || 0})
//           </span>
//         </button>
//         <button
//           className={`px-4 py-2 font-semibold text-sm rounded-xl transition-all whitespace-nowrap ${activeTab === 'shells' ? 'bg-gradient-to-r from-yellow-600 to-amber-500 text-white shadow-md' : 'bg-white/80 text-gray-700 hover:bg-white'}`}
//           onClick={() => setActiveTab('shells')}
//         >
//           <span className="inline-flex items-center gap-2">
//             <BuildingIcon size={14} className="text-current" />
//             Shell Accounts ({shellAccounts?.length || 0})
//           </span>
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         {activeTab === 'fraud-rings' && (
//           <table className="w-full border-collapse">
//             <thead className="bg-gray-50/90 backdrop-blur border-b-2 border-gray-200">
//               <tr>
//                 <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Ring ID</th>
//                 <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Accounts Involved</th>
//                 <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Length</th>
//                 <th className="text-right py-3 px-4 font-semibold text-gray-700 text-sm">Total Amount</th>
//                 <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Transactions</th>
//                 <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Isolation Score</th>
//               </tr>
//             </thead>
//             <tbody>
//               {fraudRings && fraudRings.length > 0 ? (
//                 fraudRings.map((ring, idx) => renderRingRow(ring, idx))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="py-10 text-center text-gray-500 italic">
//                     No fraud rings detected
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}

//         {activeTab === 'legitimate-rings' && (
//           <table className="w-full border-collapse">
//             <thead className="bg-gray-50/90 backdrop-blur border-b-2 border-gray-200">
//               <tr>
//                 <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Ring ID</th>
//                 <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Accounts Involved</th>
//                 <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Length</th>
//                 <th className="text-right py-3 px-4 font-semibold text-gray-700 text-sm">Total Amount</th>
//                 <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Transactions</th>
//                 <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Isolation Score</th>
//               </tr>
//             </thead>
//             <tbody>
//               {legitimateRings && legitimateRings.length > 0 ? (
//                 legitimateRings.map((ring, idx) => renderRingRow(ring, idx))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="py-10 text-center text-gray-500 italic">
//                     No legitimate cycles detected
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}

//         {activeTab === 'all-rings' && (
//           <table className="w-full border-collapse">
//             <thead className="bg-gray-50/90 backdrop-blur border-b-2 border-gray-200">
//               <tr>
//                 <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Ring ID</th>
//                 <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Accounts Involved</th>
//                 <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Length</th>
//                 <th className="text-right py-3 px-4 font-semibold text-gray-700 text-sm">Total Amount</th>
//                 <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Transactions</th>
//                 <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Isolation Score</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rings && rings.length > 0 ? (
//                 rings.map((ring, idx) => renderRingRow(ring, idx))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="py-10 text-center text-gray-500 italic">
//                     No cycles detected
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}

//         {activeTab === 'smurfing' && (
//           <table className="w-full border-collapse">
//             <thead className="bg-gray-50/90 backdrop-blur border-b-2 border-gray-200">
//               <tr>
//                 <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Account ID</th>
//                 <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Transactions</th>
//                 <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Fan In/Out</th>
//                 <th className="text-right py-3 px-4 font-semibold text-gray-700 text-sm">Total Amount</th>
//                 <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Risk Score</th>
//               </tr>
//             </thead>
//             <tbody>
//               {smurfingAlerts && smurfingAlerts.length > 0 ? (
//                 smurfingAlerts.map((alert, idx) => renderSmurfingRow(alert, idx))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="py-10 text-center text-gray-500 italic">
//                     No smurfing patterns detected
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}

//         {activeTab === 'shells' && (
//           <table className="w-full border-collapse">
//             <thead className="bg-gray-50/90 backdrop-blur border-b-2 border-gray-200">
//               <tr>
//                 <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Account ID</th>
//                 <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Transactions</th>
//                 <th className="text-right py-3 px-4 font-semibold text-gray-700 text-sm">Total Throughput</th>
//                 <th className="text-right py-3 px-4 font-semibold text-gray-700 text-sm">Avg per Transaction</th>
//                 <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Risk Score</th>
//               </tr>
//             </thead>
//             <tbody>
//               {shellAccounts && shellAccounts.length > 0 ? (
//                 shellAccounts.map((shell, idx) => renderShellRow(shell, idx))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="py-10 text-center text-gray-500 italic">
//                     No shell accounts detected
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   )
// }

// export default RingTable

// --claude 

import React from 'react'
import AlertTriangleIcon from './icons/AlertTriangleIcon'
import CheckIcon from './icons/CheckIcon'
import RefreshIcon from './icons/RefreshIcon'
import MoneyIcon from './icons/MoneyIcon'
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

  .rt-card {
    background: #070D0A;
    border: 1px solid rgba(201,168,76,0.18);
    font-family: 'Instrument Sans', sans-serif;
    color: #E8E3D8;
    overflow: hidden;
    animation: border-glow 4s ease-in-out infinite;
  }

  .rt-card .font-mono { font-family: 'IBM Plex Mono', monospace; }

  /* ── Tab bar ── */
  .tab-bar {
    display: flex;
    gap: 2px;
    background: #050A07;
    border-bottom: 1px solid rgba(201,168,76,0.12);
    overflow-x: auto;
    padding: 0;
    scrollbar-width: none;
  }
  .tab-bar::-webkit-scrollbar { display: none; }

  .tab-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 12px 16px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.62rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    white-space: nowrap;
    cursor: pointer;
    border: none;
    background: transparent;
    color: #4A5550;
    border-bottom: 2px solid transparent;
    transition: color 0.18s, border-color 0.18s, background 0.18s;
    position: relative;
  }

  .tab-btn:hover { color: #8A9490; background: rgba(255,255,255,0.02); }

  .tab-btn.active-fraud    { color: #F87171; border-bottom-color: #F87171; background: rgba(248,113,113,0.05); }
  .tab-btn.active-legit    { color: #16A05A; border-bottom-color: #16A05A; background: rgba(22,160,90,0.05); }
  .tab-btn.active-all      { color: #C9A84C; border-bottom-color: #C9A84C; background: rgba(201,168,76,0.05); }
  .tab-btn.active-smurf    { color: #FB923C; border-bottom-color: #FB923C; background: rgba(251,146,60,0.05); }
  .tab-btn.active-shell    { color: #FBBF24; border-bottom-color: #FBBF24; background: rgba(251,191,36,0.05); }

  .tab-count {
    font-size: 0.58rem;
    padding: 1px 5px;
    border-radius: 0;
  }

  /* ── Table ── */
  .rt-table { width: 100%; border-collapse: collapse; }

  .rt-thead {
    position: sticky; top: 0; z-index: 2;
    background: #0A130D;
    border-bottom: 1px solid rgba(201,168,76,0.15);
  }

  .rt-th {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.58rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #4A5550;
    padding: 10px 14px;
    font-weight: 600;
    white-space: nowrap;
  }
  .rt-th.left   { text-align: left; }
  .rt-th.center { text-align: center; }
  .rt-th.right  { text-align: right; }

  .rt-row {
    border-bottom: 1px solid rgba(201,168,76,0.06);
    transition: background 0.15s;
    animation: fade-slide-up 0.3s ease forwards;
    opacity: 0;
  }
  .rt-row:last-child { border-bottom: none; }
  .rt-row.fraud-row:hover  { background: rgba(248,113,113,0.04); }
  .rt-row.legit-row:hover  { background: rgba(22,160,90,0.04); }
  .rt-row.smurf-row:hover  { background: rgba(251,146,60,0.04); }
  .rt-row.shell-row:hover  { background: rgba(251,191,36,0.04); }
  .rt-row.neutral-row:hover { background: rgba(201,168,76,0.03); }

  .rt-td { padding: 11px 14px; vertical-align: middle; }
  .rt-td.center { text-align: center; }
  .rt-td.right  { text-align: right; }

  .acc-chip {
    display: inline-block;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.58rem;
    letter-spacing: 0.04em;
    padding: 2px 7px;
    background: rgba(201,168,76,0.08);
    border: 1px solid rgba(201,168,76,0.2);
    color: #C9A84C;
    margin: 2px;
  }

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

  .id-chip {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.7rem;
    color: #C4C0B8;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    padding: 3px 9px;
    letter-spacing: 0.04em;
    display: inline-block;
  }

  .empty-row td {
    padding: 48px 16px;
    text-align: center;
  }

  .rt-scroll { overflow-x: auto; max-height: 480px; overflow-y: auto; }
  .rt-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
  .rt-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
  .rt-scroll::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.25); }
`

/* ── Score bar color ── */
const scoreColor = (score, max = 1, isPercent = false) => {
  const v = isPercent ? score / 100 : score / max
  if (v > 0.75) return '#F87171'
  if (v > 0.5)  return '#FB923C'
  if (v > 0.25) return '#C9A84C'
  return '#16A05A'
}

/* ── Empty state ── */
const EmptyRow = ({ cols, label }) => (
  <tr className="empty-row">
    <td colSpan={cols}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <svg viewBox="0 0 40 40" width="32" height="32" fill="none" style={{ opacity: 0.2 }}>
          <circle cx="20" cy="20" r="18" stroke="#C9A84C" strokeWidth="1.2" />
          <path d="M14 20h12M20 14v12" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <span className="font-mono" style={{ color: '#2A3530', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {label}
        </span>
      </div>
    </td>
  </tr>
)

/* ── Ring row ── */
const RingRow = ({ ring, index }) => {
  const isFraud = ring.classification === 'FRAUD'
  const iso = (ring.isolation_score || 0) * 100

  return (
    <tr className={`rt-row ${isFraud ? 'fraud-row' : 'legit-row'}`} style={{ animationDelay: `${index * 0.04}s` }}>
      <td className="rt-td">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '2px 7px',
            background: isFraud ? 'rgba(248,113,113,0.12)' : 'rgba(22,160,90,0.12)',
            border: `1px solid ${isFraud ? 'rgba(248,113,113,0.4)' : 'rgba(22,160,90,0.4)'}`,
            fontSize: '0.58rem',
            fontFamily: 'IBM Plex Mono, monospace',
            color: isFraud ? '#F87171' : '#16A05A',
            letterSpacing: '0.1em',
            flexShrink: 0,
          }}>
            {isFraud
              ? <AlertTriangleIcon size={10} style={{ color: '#F87171' }} />
              : <CheckIcon size={10} style={{ color: '#16A05A' }} />
            }
            {isFraud ? 'FRAUD' : 'LEGIT'}
          </span>
          <span className="id-chip">{ring.ring_id}</span>
        </div>
      </td>

      <td className="rt-td">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0 }}>
          {ring.accounts.map((acc, i) => (
            <span key={i} className="acc-chip">{acc}</span>
          ))}
        </div>
      </td>

      <td className="rt-td center">
        <span className="font-mono" style={{ fontSize: '0.78rem', color: '#C4C0B8', fontWeight: 600 }}>{ring.length}</span>
      </td>

      <td className="rt-td right">
        <span className="font-mono" style={{ fontSize: '0.78rem', color: '#C9A84C', fontWeight: 600 }}>
          ${ring.total_amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </td>

      <td className="rt-td center">
        <span className="font-mono" style={{ fontSize: '0.78rem', color: '#C4C0B8', fontWeight: 600 }}>{ring.transactions.length}</span>
      </td>

      <td className="rt-td" style={{ minWidth: 90 }}>
        <div style={{ textAlign: 'center' }}>
          <span className="font-mono" style={{ fontSize: '0.72rem', color: scoreColor(iso, 100, true), fontWeight: 600 }}>
            {iso.toFixed(0)}%
          </span>
          <div className="score-bar-track">
            <div className="score-bar-fill" style={{
              '--bar-w': `${iso}%`,
              background: scoreColor(iso, 100, true),
            }} />
          </div>
        </div>
      </td>
    </tr>
  )
}

/* ── Smurfing row ── */
const SmurfRow = ({ alert, index }) => (
  <tr className="rt-row smurf-row" style={{ animationDelay: `${index * 0.04}s` }}>
    <td className="rt-td"><span className="id-chip">{alert.account_id}</span></td>

    <td className="rt-td center">
      <span className="font-mono" style={{ fontSize: '0.78rem', color: '#C4C0B8', fontWeight: 600 }}>{alert.transaction_count}</span>
    </td>

    <td className="rt-td center">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.72rem' }}>
        <span style={{ color: '#16A05A', fontWeight: 700 }}>{alert.fan_in}</span>
        <span style={{ color: '#4A5550' }}>→</span>
        <span style={{
          color: '#C9A84C', fontSize: '0.62rem',
          background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)',
          padding: '1px 5px',
        }}>{alert.account_id}</span>
        <span style={{ color: '#4A5550' }}>→</span>
        <span style={{ color: '#F87171', fontWeight: 700 }}>{alert.fan_out}</span>
      </div>
    </td>

    <td className="rt-td right">
      <span className="font-mono" style={{ fontSize: '0.78rem', color: '#C9A84C', fontWeight: 600 }}>
        ${alert.total_amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
    </td>

    <td className="rt-td" style={{ minWidth: 90 }}>
      <div style={{ textAlign: 'center' }}>
        <span className="font-mono" style={{ fontSize: '0.72rem', color: scoreColor(alert.risk_score, 100, true), fontWeight: 600 }}>
          {alert.risk_score.toFixed(1)}
        </span>
        <div className="score-bar-track">
          <div className="score-bar-fill" style={{
            '--bar-w': `${alert.risk_score}%`,
            background: scoreColor(alert.risk_score, 100, true),
          }} />
        </div>
      </div>
    </td>
  </tr>
)

/* ── Shell row ── */
const ShellRow = ({ shell, index }) => (
  <tr className="rt-row shell-row" style={{ animationDelay: `${index * 0.04}s` }}>
    <td className="rt-td"><span className="id-chip">{shell.account_id}</span></td>

    <td className="rt-td center">
      <span className="font-mono" style={{ fontSize: '0.78rem', color: '#C4C0B8', fontWeight: 600 }}>{shell.total_transactions}</span>
    </td>

    <td className="rt-td right">
      <span className="font-mono" style={{ fontSize: '0.78rem', color: '#C9A84C', fontWeight: 600 }}>
        ${shell.total_throughput.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
    </td>

    <td className="rt-td right">
      <span className="font-mono" style={{ fontSize: '0.78rem', color: '#8A9490', fontWeight: 600 }}>
        ${shell.avg_transaction_value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
    </td>

    <td className="rt-td" style={{ minWidth: 90 }}>
      <div style={{ textAlign: 'center' }}>
        <span className="font-mono" style={{ fontSize: '0.72rem', color: scoreColor(shell.risk_score, 100, true), fontWeight: 600 }}>
          {shell.risk_score.toFixed(1)}
        </span>
        <div className="score-bar-track">
          <div className="score-bar-fill" style={{
            '--bar-w': `${shell.risk_score}%`,
            background: scoreColor(shell.risk_score, 100, true),
          }} />
        </div>
      </div>
    </td>
  </tr>
)

/* ── Tab config ── */
const TABS = [
  { key: 'fraud-rings',      activeClass: 'active-fraud', Icon: AlertTriangleIcon, label: 'Fraud Rings',       iconColor: '#F87171' },
  { key: 'legitimate-rings', activeClass: 'active-legit', Icon: CheckIcon,         label: 'Legit Cycles',      iconColor: '#16A05A' },
  { key: 'all-rings',        activeClass: 'active-all',   Icon: RefreshIcon,       label: 'All Cycles',        iconColor: '#C9A84C' },
  { key: 'smurfing',         activeClass: 'active-smurf', Icon: MoneyIcon,         label: 'Smurfing',          iconColor: '#FB923C' },
  { key: 'shells',           activeClass: 'active-shell', Icon: BuildingIcon,      label: 'Shell Accounts',    iconColor: '#FBBF24' },
]

const RING_HEADERS = ['Ring ID', 'Accounts Involved', 'Length', 'Total Amount', 'Transactions', 'Isolation Score']
const RING_ALIGNS  = ['left', 'left', 'center', 'right', 'center', 'center']
const SMURF_HEADERS = ['Account ID', 'Transactions', 'Fan In / Out', 'Total Amount', 'Risk Score']
const SMURF_ALIGNS  = ['left', 'center', 'center', 'right', 'center']
const SHELL_HEADERS = ['Account ID', 'Transactions', 'Total Throughput', 'Avg per Txn', 'Risk Score']
const SHELL_ALIGNS  = ['left', 'center', 'right', 'right', 'center']

const TableHead = ({ headers, aligns }) => (
  <thead className="rt-thead">
    <tr>
      {headers.map((h, i) => (
        <th key={i} className={`rt-th ${aligns[i]}`}>{h}</th>
      ))}
    </tr>
  </thead>
)

/* ── Main ── */
const RingTable = ({ rings, smurfingAlerts, shellAccounts }) => {
  const [activeTab, setActiveTab] = React.useState('fraud-rings')

  const fraudRings     = rings?.filter(r => r.classification === 'FRAUD') || []
  const legitimateRings = rings?.filter(r => r.classification === 'LEGITIMATE') || []

  const tabCounts = {
    'fraud-rings':      fraudRings.length,
    'legitimate-rings': legitimateRings.length,
    'all-rings':        rings?.length || 0,
    'smurfing':         smurfingAlerts?.length || 0,
    'shells':           shellAccounts?.length || 0,
  }

  const tabCountColors = {
    'fraud-rings':      { bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.3)', color: '#F87171' },
    'legitimate-rings': { bg: 'rgba(22,160,90,0.12)',   border: 'rgba(22,160,90,0.3)',   color: '#16A05A' },
    'all-rings':        { bg: 'rgba(201,168,76,0.12)',  border: 'rgba(201,168,76,0.3)',  color: '#C9A84C' },
    'smurfing':         { bg: 'rgba(251,146,60,0.12)',  border: 'rgba(251,146,60,0.3)',  color: '#FB923C' },
    'shells':           { bg: 'rgba(251,191,36,0.12)',  border: 'rgba(251,191,36,0.3)',  color: '#FBBF24' },
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="rt-card">

        {/* ── Tab bar ── */}
        <div className="tab-bar">
          {TABS.map(({ key, activeClass, Icon, label, iconColor }) => {
            const isActive = activeTab === key
            const cc = tabCountColors[key]
            return (
              <button
                key={key}
                className={`tab-btn ${isActive ? activeClass : ''}`}
                onClick={() => setActiveTab(key)}
              >
                <Icon size={12} style={{ color: isActive ? cc.color : '#4A5550', flexShrink: 0 }} />
                {label}
                <span style={{
                  padding: '1px 6px',
                  fontSize: '0.58rem',
                  fontFamily: 'IBM Plex Mono, monospace',
                  background: isActive ? cc.bg : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isActive ? cc.border : 'rgba(255,255,255,0.07)'}`,
                  color: isActive ? cc.color : '#2A3530',
                  letterSpacing: '0.06em',
                }}>
                  {tabCounts[key]}
                </span>
              </button>
            )
          })}
        </div>

        {/* ── Table content ── */}
        <div className="rt-scroll">

          {/* Fraud rings */}
          {activeTab === 'fraud-rings' && (
            <table className="rt-table">
              <TableHead headers={RING_HEADERS} aligns={RING_ALIGNS} />
              <tbody>
                {fraudRings.length > 0
                  ? fraudRings.map((r, i) => <RingRow key={i} ring={r} index={i} />)
                  : <EmptyRow cols={6} label="No fraud rings detected" />
                }
              </tbody>
            </table>
          )}

          {/* Legit rings */}
          {activeTab === 'legitimate-rings' && (
            <table className="rt-table">
              <TableHead headers={RING_HEADERS} aligns={RING_ALIGNS} />
              <tbody>
                {legitimateRings.length > 0
                  ? legitimateRings.map((r, i) => <RingRow key={i} ring={r} index={i} />)
                  : <EmptyRow cols={6} label="No legitimate cycles detected" />
                }
              </tbody>
            </table>
          )}

          {/* All rings */}
          {activeTab === 'all-rings' && (
            <table className="rt-table">
              <TableHead headers={RING_HEADERS} aligns={RING_ALIGNS} />
              <tbody>
                {rings?.length > 0
                  ? rings.map((r, i) => <RingRow key={i} ring={r} index={i} />)
                  : <EmptyRow cols={6} label="No cycles detected" />
                }
              </tbody>
            </table>
          )}

          {/* Smurfing */}
          {activeTab === 'smurfing' && (
            <table className="rt-table">
              <TableHead headers={SMURF_HEADERS} aligns={SMURF_ALIGNS} />
              <tbody>
                {smurfingAlerts?.length > 0
                  ? smurfingAlerts.map((a, i) => <SmurfRow key={i} alert={a} index={i} />)
                  : <EmptyRow cols={5} label="No smurfing patterns detected" />
                }
              </tbody>
            </table>
          )}

          {/* Shells */}
          {activeTab === 'shells' && (
            <table className="rt-table">
              <TableHead headers={SHELL_HEADERS} aligns={SHELL_ALIGNS} />
              <tbody>
                {shellAccounts?.length > 0
                  ? shellAccounts.map((s, i) => <ShellRow key={i} shell={s} index={i} />)
                  : <EmptyRow cols={5} label="No shell accounts detected" />
                }
              </tbody>
            </table>
          )}
        </div>

        {/* ── Footer ── */}
        <div style={{
          padding: '9px 16px',
          borderTop: '1px solid rgba(201,168,76,0.08)',
          background: '#050A07',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6,
        }}>
          <svg viewBox="0 0 12 12" width="10" height="10" fill="none">
            <circle cx="6" cy="6" r="5" stroke="#2A3530" strokeWidth="1" />
            <path d="M6 5.5V8.5M6 4V4.5" stroke="#2A3530" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <span className="font-mono" style={{ fontSize: '0.6rem', color: '#2A3530', letterSpacing: '0.08em' }}>
            RIFT FORENSIC ENGINE · CYCLE & PATTERN DETECTION
          </span>
        </div>
      </div>
    </>
  )
}

export default RingTable