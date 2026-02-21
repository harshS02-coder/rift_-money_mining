// import React, { useState, useEffect } from 'react'
// import { useAuth } from '../context/AuthContext'
// import FileUpload from './FileUpload'
// import GraphView from './GraphView'
// import RingTable from './RingTable'
// import AccountInfo from './AccountInfo'
// import AccountNarrative from './AccountNarrative'
// import RecommendationsList from './RecommendationsList'
// import CycleAnalysisPanel from './CycleAnalysisPanel'
// import InvestigationSummary from './InvestigationSummary'
// import SuspiciousAccountsList from './SuspiciousAccountsList'
// import DownloadReportButton from './DownloadReportButton'
// import { healthCheck } from '../services/api'
// import SearchIcon from './icons/SearchIcon'
// import UploadIcon from './icons/UploadIcon'
// import AlertTriangleIcon from './icons/AlertTriangleIcon'
// import SparklesIcon from './icons/SparklesIcon'
// import DownloadIcon from './icons/DownloadIcon'
// import ChartIcon from './icons/ChartIcon'
// import LinkIcon from './icons/LinkIcon'
// import DocumentIcon from './icons/DocumentIcon'

// const Dashboard = () => {
//   const [analysisData, setAnalysisData] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [selectedAccount, setSelectedAccount] = useState(null)
//   const [selectedRing, setSelectedRing] = useState(null)
//   const [backendHealthy, setBackendHealthy] = useState(false)
//   const { user, logout } = useAuth()

//   // Check backend health on mount
//   useEffect(() => {
//     const checkHealth = async () => {
//       try {
//         await healthCheck()
//         setBackendHealthy(true)
//         setError(null)
//       } catch (err) {
//         console.error('Backend health check failed:', err)
//         setBackendHealthy(false)
        
//         // Provide helpful error message based on environment
//         const isDev = process.env.NODE_ENV === 'development'
//         const msg = isDev 
//           ? 'Backend connection failed. Ensure FastAPI server is running:\n   cd backend && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000'
//           : `Backend connection failed. The API server at ${window.location.origin} is not responding. Please check that:\n   1. The backend service is running\n   2. Network connectivity is established\n   3. Check browser console for detailed errors`
        
//         setError(msg)
//       }
//     }
//     checkHealth()
//   }, [])

//   const handleAnalysisComplete = (data) => {
//     setAnalysisData(data)
//     setSelectedAccount(null)
//   }

//   const handleAccountClick = (accountId) => {
//     const account = analysisData?.account_scores.find(
//       (s) => s.account_id === accountId
//     )
//     setSelectedAccount(account)
//   }

//   return (
//     <div className="flex flex-col min-h-screen w-full bg-gray-100 overflow-x-hidden">
//       {/* Header */}
//       <header className="sticky top-0 z-50 text-white shadow-lg">
//         <div className="relative bg-gradient-to-r from-gray-900 via-slate-900 to-black overflow-hidden">
//           <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:50px_50px]" />
//           <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />

//           <div className="relative w-full px-6 sm:px-10 py-4">
//             <div className="flex justify-between items-center gap-6">
//               <div className="min-w-0">
//                 <h1 className="flex items-center gap-2 text-2xl sm:text-3xl font-black mb-1 tracking-tight">
//                   <SearchIcon size={26} className="text-white/90" />
//                   <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 text-transparent bg-clip-text">
//                     Money Mining
//                   </span>
//                 </h1>
//                 <p className="text-xs sm:text-sm text-white/70 truncate">
//                   Financial Ring Forensic Tracker - Money Muling Detection Engine
//                 </p>
//               </div>

//               <div className="flex items-center gap-4 sm:gap-6">
//                 <div className="flex items-center gap-2 sm:gap-3 text-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2">
//                   <div className={`w-2.5 h-2.5 rounded-full animate-pulse-slow ${backendHealthy ? 'bg-green-400' : 'bg-red-400'}`} />
//                   <span className="hidden sm:inline text-white/80 font-semibold">
//                     {backendHealthy ? 'Backend connected' : 'Backend disconnected'}
//                   </span>
//                 </div>

//                 <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2">
//                   <div className="text-xs sm:text-sm text-white/80">Welcome, <span className="font-bold text-white">{user?.organizationName}</span></div>
//                   <button
//                     onClick={logout}
//                     className="mt-1 text-xs font-bold px-3 py-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 transition-all"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex flex-col w-full flex-1">
//         {/* Upload Section */}
//         <section id="home" className="relative w-full py-20 px-6 sm:px-10 min-h-[520px] flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black overflow-hidden">
//           <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:50px_50px]" />
//           <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />

//           <div className="relative max-w-5xl mx-auto w-full">
//             {!analysisData ? (
//               <>
//                 <div className="text-center mb-10">
//                   <div className="inline-block mb-5">
//                     <UploadIcon size={72} className="text-white/90" />
//                   </div>
//                   <h2 className="text-4xl sm:text-5xl font-black mb-3 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 text-transparent bg-clip-text">
//                     Upload transaction file
//                   </h2>
//                   <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
//                     Start an investigation by uploading a CSV. RIFT maps the network, detects rings, and scores accounts for risk.
//                   </p>
//                 </div>
//               </>
//             ) : (
//               <div className="text-center mb-10">
//                 <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-emerald-300 to-green-300 text-transparent bg-clip-text">
//                   Data analysis complete
//                 </h2>
//                 <p className="text-white/80 mt-2">Scroll down for graphs, rings, and AI insights.</p>
//               </div>
//             )}
//             <FileUpload
//               onAnalysisComplete={handleAnalysisComplete}
//               onLoading={setLoading}
//               onError={setError}
//               loading={loading}
//             />
//             {error && (
//               <div className="mt-6 bg-red-50/95 backdrop-blur border border-red-200 p-4 rounded-2xl flex items-start gap-3">
//                 <AlertTriangleIcon size={22} className="text-red-700 mt-0.5" />
//                 <div className="flex-1">
//                   <div className="text-red-800 font-black">Upload failed</div>
//                   <div className="text-red-700 text-sm whitespace-pre-line mt-1">{error}</div>
//                 </div>
//                 <button
//                   onClick={() => setError(null)}
//                   className="text-red-700 hover:text-red-900 font-bold"
//                 >
//                   Dismiss
//                 </button>
//               </div>
//             )}
//           </div>
//         </section>

//         {/* AI Insights Section */}
//         {analysisData && (
//           <section className="relative w-full py-16 px-6 sm:px-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-b border-gray-200 overflow-hidden min-h-[300px]">
//             <div className="absolute inset-0 bg-grid-white/[0.4] bg-[size:40px_40px] opacity-20" />
//             <div className="max-w-7xl mx-auto w-full">
//               <div className="relative bg-white/70 backdrop-blur-lg rounded-2xl border border-gray-200/60 shadow-xl overflow-hidden">
//                 <div className="relative px-6 py-5 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
//                   <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />
//                   <h2 className="relative flex items-center gap-2 text-2xl sm:text-3xl font-semibold">
//                     <SparklesIcon size={22} className="text-white" />
//                     AI-Powered Investigation Insights
//                   </h2>
//                 </div>

//                 <div className="p-6 space-y-10">
//                   {/* Download Report Section */}
//                   <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl border border-gray-200/60 shadow-sm">
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                       <DownloadIcon size={18} className="text-gray-700" />
//                       Export Analysis Results
//                     </h3>
//                     <DownloadReportButton 
//                       analysisId={analysisData.analysis_id}
//                       analysisData={analysisData}
//                     />
//                   </div>

//                   <InvestigationSummary analysisId={analysisData.analysis_id} />

//                   <SuspiciousAccountsList 
//                     analysisData={analysisData}
//                     onAccountSelect={handleAccountClick}
//                   />

//                   {selectedAccount && (
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                       <AccountNarrative accountId={selectedAccount.account_id} />
//                       <RecommendationsList accountId={selectedAccount.account_id} />
//                     </div>
//                   )}

//                   {selectedRing && (
//                     <CycleAnalysisPanel analysisId={analysisData.analysis_id} ringIndex={selectedRing.index} />
//                   )}
//                 </div>
//               </div>
//             </div>
//             <div className="text-center py-5 text-blue-600 text-sm font-semibold">
//               ↓ Scroll down for detailed analysis ↓
//             </div>
//           </section>
//         )}

//         {/* Summary Statistics Section */}
//         {analysisData && (
//           <section className="relative w-full py-16 px-6 sm:px-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-b border-gray-200 overflow-hidden min-h-[300px]">
//             <div className="absolute inset-0 bg-grid-white/[0.4] bg-[size:40px_40px] opacity-20" />
//             <div className="max-w-7xl mx-auto w-full">
//               <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-gray-200/60 shadow-xl overflow-hidden">
//                 <div className="relative px-6 py-5 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
//                   <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />
//                   <h2 className="relative flex items-center gap-2 text-2xl sm:text-3xl font-semibold">
//                     <ChartIcon size={22} className="text-white" />
//                     Analysis Summary
//                   </h2>
//                 </div>

//                 <div className="p-8">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                   {/* Transaction Statistics */}
//                   <div className="bg-white/70 p-5 rounded-2xl border border-gray-200/60">
//                     <h4 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">Transaction Data</h4>
//                     <div className="space-y-3">
//                       <div className="flex justify-between items-center py-2">
//                         <span className="text-gray-600 text-sm">Total Transactions</span>
//                         <span className="font-semibold text-blue-600">{analysisData.total_transactions}</span>
//                       </div>
//                       <div className="flex justify-between items-center py-2">
//                         <span className="text-gray-600 text-sm">Total Volume</span>
//                         <span className="font-semibold text-blue-600">${(analysisData.summary?.total_volume || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
//                       </div>
//                       <div className="flex justify-between items-center py-2">
//                         <span className="text-gray-600 text-sm">Avg Transaction</span>
//                         <span className="font-semibold text-blue-600">${(analysisData.summary?.avg_transaction || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Account Statistics */}
//                   <div className="bg-white/70 p-5 rounded-2xl border border-gray-200/60">
//                     <h4 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">Account Analysis</h4>
//                     <div className="space-y-3">
//                       <div className="flex justify-between items-center py-2">
//                         <span className="text-gray-600 text-sm">Total Accounts</span>
//                         <span className="font-semibold text-blue-600">{analysisData.total_accounts}</span>
//                       </div>
//                       <div className="flex justify-between items-center py-2">
//                         <span className="text-gray-600 text-sm">Suspicious Accounts</span>
//                         <span className="font-semibold text-blue-600">{analysisData.summary?.suspicious_accounts || 0}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Detection Results */}
//                   <div className="bg-white/70 p-5 rounded-2xl border border-gray-200/60">
//                     <h4 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">Pattern Detection</h4>
//                     <div className="space-y-3">
//                       <div className="flex justify-between items-center py-2">
//                         <span className="text-gray-600 text-sm">Cycles Detected</span>
//                         <span className="font-semibold text-blue-600">{analysisData.rings_detected.length}</span>
//                       </div>
//                       <div className="flex justify-between items-center py-2">
//                         <span className="text-gray-600 text-sm">Smurfing Alerts</span>
//                         <span className="font-semibold text-blue-600">{analysisData.smurfing_alerts.length}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Risk Assessment */}
//                   <div className="bg-white/70 p-5 rounded-2xl border border-gray-200/60">
//                     <h4 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">Risk Assessment</h4>
//                     <div className="space-y-3">
//                       <div className="flex justify-between items-center py-2">
//                         <span className="flex items-center justify-between gap-2 text-gray-600 text-sm">
//                           <span className="inline-flex items-center gap-2">
//                             <AlertTriangleIcon size={14} className="text-gray-600" />
//                             Critical Risk
//                           </span>
//                         </span>
//                         <span className="font-semibold text-red-600">{analysisData.critical_accounts.length}</span>
//                       </div>
//                       <div className="flex justify-between items-center py-2">
//                         <span className="inline-flex items-center gap-2 text-gray-600 text-sm">
//                           <AlertTriangleIcon size={14} className="text-gray-600" />
//                           High Risk
//                         </span>
//                         <span className="font-semibold text-orange-600">{analysisData.high_risk_accounts.length}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             </div>
//           </section>
//         )}

//         {/* Transaction Graph Section */}
//         {analysisData && (
//           <section className="relative w-full py-16 px-6 sm:px-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-b border-gray-200 overflow-hidden min-h-[600px]">
//             <div className="absolute inset-0 bg-grid-white/[0.4] bg-[size:40px_40px] opacity-20" />
//             <div className="max-w-7xl mx-auto w-full">
//               <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-gray-200/60 shadow-xl overflow-hidden">
//                 <div className="relative px-6 py-5 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
//                   <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />
//                   <h2 className="relative flex items-center gap-2 text-2xl sm:text-3xl font-semibold">
//                     <LinkIcon size={22} className="text-white" />
//                     Transaction Network Graph
//                   </h2>
//                 </div>

//                 <div className="p-6">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[500px]">
//                 <div className="lg:col-span-2">
//                   <GraphView
//                     data={analysisData}
//                     onAccountClick={handleAccountClick}
//                   />
//                 </div>
//                 <div className="overflow-y-auto max-h-[600px] scrollbar-thin">
//                   <AccountInfo
//                     accountDetails={selectedAccount}
//                     onClose={() => setSelectedAccount(null)}
//                   />
//                 </div>
//               </div>
//               </div>
//               </div>
//             </div>
//           </section>
//         )}

//         {/* Data Tables Section */}
//         {analysisData && (
//           <section className="relative w-full py-16 px-6 sm:px-10 pb-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-[400px] overflow-hidden">
//             <div className="absolute inset-0 bg-grid-white/[0.4] bg-[size:40px_40px] opacity-20" />
//             <div className="max-w-7xl mx-auto w-full">
//               <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-gray-200/60 shadow-xl overflow-hidden">
//                 <div className="relative px-6 py-5 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
//                   <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />
//                   <h2 className="relative flex items-center gap-2 text-2xl sm:text-3xl font-semibold">
//                     <DocumentIcon size={22} className="text-white" />
//                     Detailed Detection Results
//                   </h2>
//                 </div>

//                 <div className="p-6 overflow-auto">
//                 <RingTable
//                   rings={analysisData.rings_detected}
//                   smurfingAlerts={analysisData.smurfing_alerts}
//                   shellAccounts={analysisData.shell_accounts}
//                 />
//               </div>
//               </div>
//             </div>
//           </section>
//         )}
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-8 px-10 border-t border-gray-800">
//         <p className="text-center text-gray-400">
//           RIFT 2026 © Detecting Financial Crimes Through Graph Analysis | Powered by AI | v1.0.0
//         </p>
//       </footer>
//     </div>
//   )
// }

// export default Dashboard


// --claude

import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import FileUpload from './FileUpload'
import GraphView from './GraphView'
import RingTable from './RingTable'
import AccountInfo from './AccountInfo'
import AccountNarrative from './AccountNarrative'
import RecommendationsList from './RecommendationsList'
import CycleAnalysisPanel from './CycleAnalysisPanel'
import InvestigationSummary from './InvestigationSummary'
import SuspiciousAccountsList from './SuspiciousAccountsList'
import DownloadReportButton from './DownloadReportButton'
import { healthCheck } from '../services/api'
import SearchIcon from './icons/SearchIcon'
import UploadIcon from './icons/UploadIcon'
import AlertTriangleIcon from './icons/AlertTriangleIcon'
import SparklesIcon from './icons/SparklesIcon'
import DownloadIcon from './icons/DownloadIcon'
import ChartIcon from './icons/ChartIcon'
import LinkIcon from './icons/LinkIcon'
import DocumentIcon from './icons/DocumentIcon'

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Mono:wght@400;600&family=Instrument+Sans:wght@400;500;600;700&display=swap');

  :root {
    --gold: #C9A84C;
    --gold-light: #E8C97A;
    --emerald: #0D4A2E;
    --emerald-mid: #0F6B3D;
    --emerald-bright: #16A05A;
    --ink: #070D0A;
    --ink-mid: #0A130D;
    --ink-light: #0F1A10;
    --paper: #F5F0E8;
    --ash: #8A9490;
  }

  * { box-sizing: border-box; }

  body {
    background: var(--ink);
    margin: 0;
  }

  @keyframes scan-h {
    0%   { top: 0%; opacity: 1; }
    90%  { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; box-shadow: 0 0 8px currentColor; }
    50%       { opacity: 0.35; box-shadow: none; }
  }

  @keyframes border-glow {
    0%, 100% { box-shadow: 0 0 0 1px rgba(201,168,76,0.15); }
    50%       { box-shadow: 0 0 24px 2px rgba(201,168,76,0.2); }
  }

  @keyframes fade-slide-up {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes ticker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @keyframes grid-breathe {
    0%, 100% { opacity: 0.03; }
    50%       { opacity: 0.065; }
  }

  @keyframes float-up {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }

  .db-font-mono  { font-family: 'IBM Plex Mono', monospace; }
  .db-font-serif { font-family: 'DM Serif Display', serif; }
  .db-font-sans  { font-family: 'Instrument Sans', sans-serif; }

  .gold-text {
    background: linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── Navbar ── */
  .db-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    height: 64px;
    background: rgba(7,13,10,0.95);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(201,168,76,0.15);
    display: flex; align-items: center;
    padding: 0 32px;
    justify-content: space-between;
    gap: 16px;
  }

  /* ── Section wrapper ── */
  .db-section {
    width: 100%;
    padding: 80px 40px;
    position: relative;
  }

  .db-section-inner {
    max-width: 1300px;
    margin: 0 auto;
    width: 100%;
  }

  /* ── Section card ── */
  .db-section-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(201,168,76,0.15);
    overflow: hidden;
    animation: border-glow 5s ease-in-out infinite;
  }

  /* ── Section card header ── */
  .db-card-header {
    padding: 18px 24px;
    border-bottom: 1px solid rgba(201,168,76,0.12);
    background: linear-gradient(135deg, rgba(15,107,61,0.1) 0%, rgba(7,13,10,0) 100%);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .db-card-header-grid {
    position: absolute; inset: 0; opacity: 0.04;
    background-image: linear-gradient(rgba(201,168,76,1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
  }

  .db-card-header-scan {
    position: absolute; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent);
    animation: scan-h 6s ease-in-out infinite;
  }

  /* ── Stat card ── */
  .stat-card {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(201,168,76,0.1);
    padding: 20px;
    position: relative;
    transition: border-color 0.2s;
  }
  .stat-card:hover { border-color: rgba(201,168,76,0.3); }
  .stat-card::before {
    content: '';
    position: absolute; top: -1px; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent);
  }

  .stat-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid rgba(201,168,76,0.06);
  }
  .stat-row:last-child { border-bottom: none; }

  /* ── Logout btn ── */
  .logout-btn {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.62rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 6px 14px;
    border: 1px solid rgba(201,168,76,0.3);
    background: rgba(201,168,76,0.06);
    color: #C9A84C;
    cursor: pointer;
    transition: background 0.18s, border-color 0.18s;
    position: relative;
  }
  .logout-btn::after {
    content: '';
    position: absolute; bottom: -1px; right: -1px;
    width: 5px; height: 5px; background: #C9A84C;
  }
  .logout-btn:hover { background: rgba(201,168,76,0.14); border-color: rgba(201,168,76,0.6); }

  /* ── Error banner ── */
  .error-banner {
    margin-top: 20px;
    background: rgba(248,113,113,0.07);
    border: 1px solid rgba(248,113,113,0.3);
    padding: 14px 18px;
    display: flex; align-items: flex-start; gap: 12px;
  }

  /* ── Scroll hint ── */
  .scroll-hint {
    text-align: center;
    padding: 16px 0 0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    color: rgba(201,168,76,0.4);
    text-transform: uppercase;
  }

  /* ── Main scrollbar ── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
  ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.25); }
`

/* ── Section header icon box ── */
const HeaderIconBox = ({ Icon, color = '#C9A84C' }) => (
  <div style={{
    width: 34, height: 34, flexShrink: 0,
    border: `1px solid ${color}55`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: `${color}10`, position: 'relative',
  }}>
    <Icon size={16} style={{ color }} />
    <div style={{ position: 'absolute', bottom: -1, right: -1, width: 7, height: 7, background: color }} />
  </div>
)

/* ── Section card header ── */
const SectionHeader = ({ icon: Icon, label, title, iconColor = '#C9A84C', right }) => (
  <div className="db-card-header">
    <div className="db-card-header-grid" />
    <div className="db-card-header-scan" />
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12 }}>
      <HeaderIconBox Icon={Icon} color={iconColor} />
      <div>
        <div className="db-font-mono" style={{ fontSize: '0.58rem', color: '#4A5550', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 3 }}>
          {label}
        </div>
        <div className="db-font-sans" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#E8E3D8' }}>{title}</div>
      </div>
    </div>
    {right && <div style={{ position: 'relative' }}>{right}</div>}
  </div>
)

/* ── Stat card component ── */
const StatCard = ({ label, accentColor = '#C9A84C', rows }) => (
  <div className="stat-card">
    <div className="db-font-mono" style={{
      fontSize: '0.58rem', color: accentColor, letterSpacing: '0.14em',
      textTransform: 'uppercase', marginBottom: 14,
    }}>
      {label}
    </div>
    {rows.map(({ key, val, valColor }) => (
      <div key={key} className="stat-row">
        <span className="db-font-sans" style={{ color: '#5A6560', fontSize: '0.82rem' }}>{key}</span>
        <span className="db-font-mono" style={{ fontSize: '0.82rem', color: valColor || accentColor, fontWeight: 600 }}>{val}</span>
      </div>
    ))}
  </div>
)

/* ── Main Dashboard ── */
const Dashboard = () => {
  const [analysisData, setAnalysisData]     = useState(null)
  const [loading, setLoading]               = useState(false)
  const [error, setError]                   = useState(null)
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [selectedRing, setSelectedRing]     = useState(null)
  const [backendHealthy, setBackendHealthy] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    const checkHealth = async () => {
      try {
        await healthCheck()
        setBackendHealthy(true)
        setError(null)
      } catch (err) {
        setBackendHealthy(false)
        const isDev = process.env.NODE_ENV === 'development'
        setError(isDev
          ? 'Backend connection failed. Ensure FastAPI server is running:\n   cd backend && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000'
          : `Backend connection failed. The API server at ${window.location.origin} is not responding.`
        )
      }
    }
    checkHealth()
  }, [])

  const handleAnalysisComplete = (data) => { setAnalysisData(data); setSelectedAccount(null) }
  const handleAccountClick = (accountId) => {
    const account = analysisData?.account_scores.find(s => s.account_id === accountId)
    setSelectedAccount(account)
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="db-font-sans" style={{ background: 'var(--ink)', color: '#E8E3D8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        {/* ── Navbar ── */}
        <nav className="db-nav">
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32,
              background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg viewBox="0 0 20 20" width="16" height="16" fill="none">
                <path d="M10 2L3 5.5V10C3 14 6.2 17.5 10 19C13.8 17.5 17 14 17 10V5.5L10 2Z" fill="#070D0A" />
                <path d="M7 10L9 12L13 8" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="db-font-mono" style={{ color: '#C9A84C', fontSize: '0.95rem', letterSpacing: '0.12em', fontWeight: 600 }}>MONEY MINING</span>
            <span style={{ color: 'rgba(201,168,76,0.25)', margin: '0 4px' }}>|</span>
            <span className="db-font-mono" style={{ color: '#2A3530', fontSize: '0.65rem', letterSpacing: '0.1em' }}>FORENSIC TRACKER</span>
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Backend status */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 7,
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${backendHealthy ? 'rgba(22,160,90,0.3)' : 'rgba(248,113,113,0.3)'}`,
              padding: '5px 12px',
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: '50%',
                background: backendHealthy ? '#16A05A' : '#F87171',
                color: backendHealthy ? '#16A05A' : '#F87171',
                display: 'inline-block',
                animation: 'pulse-dot 2s ease-in-out infinite',
              }} />
              <span className="db-font-mono" style={{
                fontSize: '0.6rem', letterSpacing: '0.1em',
                color: backendHealthy ? '#16A05A' : '#F87171',
              }}>
                {backendHealthy ? 'CONNECTED' : 'OFFLINE'}
              </span>
            </div>

            {/* User info */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(201,168,76,0.15)',
              padding: '5px 12px',
            }}>
              <div>
                <div className="db-font-mono" style={{ fontSize: '0.55rem', color: '#4A5550', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Operator</div>
                <div className="db-font-mono" style={{ fontSize: '0.72rem', color: '#C9A84C', fontWeight: 600 }}>{user?.organizationName}</div>
              </div>
              <div style={{ width: 1, height: 28, background: 'rgba(201,168,76,0.12)' }} />
              <button className="logout-btn" onClick={logout}>Sign Out</button>
            </div>
          </div>
        </nav>

        {/* ── Main content ── */}
        <main style={{ flex: 1, paddingTop: 64 }}>

          {/* ── Upload Section ── */}
          <section style={{
            minHeight: 520, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '80px 40px', position: 'relative', overflow: 'hidden',
            background: 'var(--ink)',
          }}>
            {/* Animated grid */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `linear-gradient(rgba(201,168,76,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.05) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
              animation: 'grid-breathe 6s ease-in-out infinite',
            }} />
            {/* Radial glows */}
            <div style={{ position: 'absolute', top: '20%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(15,107,61,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', maxWidth: 800, width: '100%', margin: '0 auto' }}>
              {!analysisData ? (
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                  {/* Upload icon with float */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24, animation: 'float-up 4s ease-in-out infinite' }}>
                    <div style={{
                      width: 72, height: 72,
                      border: '1px solid rgba(201,168,76,0.35)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      position: 'relative',
                      background: 'rgba(201,168,76,0.06)',
                    }}>
                      <UploadIcon size={32} style={{ color: '#C9A84C' }} />
                      <div style={{ position: 'absolute', bottom: -1, right: -1, width: 10, height: 10, background: '#C9A84C' }} />
                    </div>
                  </div>
                  <h2 className="db-font-serif gold-text" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: 12 }}>
                    Upload Transaction File
                  </h2>
                  <p className="db-font-sans" style={{ color: '#5A6560', fontSize: '1rem', lineHeight: 1.7, maxWidth: 540, margin: '0 auto' }}>
                    Start an investigation by uploading a CSV. RIFT maps the network, detects rings, and scores every account for risk.
                  </p>
                </div>
              ) : (
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16,
                    background: 'rgba(22,160,90,0.1)', border: '1px solid rgba(22,160,90,0.35)',
                    padding: '5px 14px',
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16A05A', display: 'inline-block', animation: 'pulse-dot 1.8s ease-in-out infinite', color: '#16A05A' }} />
                    <span className="db-font-mono" style={{ fontSize: '0.65rem', color: '#16A05A', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Analysis Complete</span>
                  </div>
                  <h2 className="db-font-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#E8E3D8' }}>
                    Data <span className="gold-text">processed</span> successfully
                  </h2>
                  <p className="db-font-sans" style={{ color: '#5A6560', marginTop: 8 }}>Scroll down to view graphs, detection results, and AI insights.</p>
                </div>
              )}

              {/* FileUpload component */}
              <FileUpload
                onAnalysisComplete={handleAnalysisComplete}
                onLoading={setLoading}
                onError={setError}
                loading={loading}
              />

              {/* Error banner */}
              {error && (
                <div className="error-banner">
                  <AlertTriangleIcon size={18} style={{ color: '#F87171', flexShrink: 0, marginTop: 2 }} />
                  <div style={{ flex: 1 }}>
                    <div className="db-font-mono" style={{ fontSize: '0.65rem', color: '#F87171', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5 }}>
                      Upload Failed
                    </div>
                    <div className="db-font-sans" style={{ color: '#8A9490', fontSize: '0.82rem', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{error}</div>
                  </div>
                  <button onClick={() => setError(null)} style={{
                    background: 'none', border: 'none', color: '#F87171',
                    cursor: 'pointer', fontSize: '0.75rem', fontFamily: 'IBM Plex Mono, monospace',
                    letterSpacing: '0.08em', flexShrink: 0,
                  }}>
                    DISMISS ✕
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* ── AI Insights Section ── */}
          {analysisData && (
            <section className="db-section" style={{ background: 'var(--ink-mid)', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
              <div className="db-section-inner">
                <div className="db-section-card">
                  <SectionHeader
                    icon={SparklesIcon}
                    label="AI Engine"
                    title="Investigation Insights"
                    iconColor="#C9A84C"
                  />
                  <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>

                    {/* Download report */}
                    <div style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(201,168,76,0.1)',
                      padding: 20, position: 'relative',
                    }}>
                      <div style={{
                        position: 'absolute', top: -1, left: 0, right: 0, height: 1,
                        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)',
                      }} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                        <DownloadIcon size={14} style={{ color: '#C9A84C' }} />
                        <span className="db-font-mono" style={{ fontSize: '0.6rem', color: '#4A5550', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                          Export Results
                        </span>
                      </div>
                      <DownloadReportButton analysisId={analysisData.analysis_id} analysisData={analysisData} />
                    </div>

                    <InvestigationSummary analysisId={analysisData.analysis_id} />
                    <SuspiciousAccountsList analysisData={analysisData} onAccountSelect={handleAccountClick} />

                    {selectedAccount && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
                        <AccountNarrative accountId={selectedAccount.account_id} />
                        <RecommendationsList accountId={selectedAccount.account_id} />
                      </div>
                    )}

                    {selectedRing && (
                      <CycleAnalysisPanel analysisId={analysisData.analysis_id} ringIndex={selectedRing.index} />
                    )}
                  </div>
                </div>
                <div className="scroll-hint">↓ Scroll for summary & graph analysis ↓</div>
              </div>
            </section>
          )}

          {/* ── Summary Statistics Section ── */}
          {analysisData && (
            <section className="db-section" style={{ background: 'var(--ink)', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
              <div className="db-section-inner">
                <div className="db-section-card">
                  <SectionHeader icon={ChartIcon} label="Data Overview" title="Analysis Summary" iconColor="#C9A84C" />
                  <div style={{ padding: 24 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2 }}>
                      <StatCard
                        label="Transaction Data"
                        accentColor="#C9A84C"
                        rows={[
                          { key: 'Total Transactions', val: analysisData.total_transactions },
                          { key: 'Total Volume', val: `$${(analysisData.summary?.total_volume || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}` },
                          { key: 'Avg Transaction', val: `$${(analysisData.summary?.avg_transaction || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}` },
                        ]}
                      />
                      <StatCard
                        label="Account Analysis"
                        accentColor="#16A05A"
                        rows={[
                          { key: 'Total Accounts', val: analysisData.total_accounts },
                          { key: 'Suspicious Accounts', val: analysisData.summary?.suspicious_accounts || 0, valColor: '#FB923C' },
                        ]}
                      />
                      <StatCard
                        label="Pattern Detection"
                        accentColor="#C9A84C"
                        rows={[
                          { key: 'Cycles Detected', val: analysisData.rings_detected.length },
                          { key: 'Smurfing Alerts', val: analysisData.smurfing_alerts.length, valColor: '#FB923C' },
                        ]}
                      />
                      <StatCard
                        label="Risk Assessment"
                        accentColor="#F87171"
                        rows={[
                          { key: 'Critical Risk', val: analysisData.critical_accounts.length, valColor: '#F87171' },
                          { key: 'High Risk', val: analysisData.high_risk_accounts.length, valColor: '#FB923C' },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── Transaction Graph Section ── */}
          {analysisData && (
            <section className="db-section" style={{ background: 'var(--ink-mid)', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
              <div className="db-section-inner">
                <div className="db-section-card">
                  <SectionHeader icon={LinkIcon} label="Network Visualization" title="Transaction Network Graph" iconColor="#16A05A" />
                  <div style={{ padding: 24 }}>
                    <div style={{
                      display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16,
                      minHeight: 500,
                    }}>
                      <div>
                        <GraphView data={analysisData} onAccountClick={handleAccountClick} />
                      </div>
                      <div style={{ overflowY: 'auto', maxHeight: 600 }}>
                        <AccountInfo accountDetails={selectedAccount} onClose={() => setSelectedAccount(null)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── Detection Results / Ring Table Section ── */}
          {analysisData && (
            <section className="db-section" style={{ background: 'var(--ink)', borderTop: '1px solid rgba(201,168,76,0.08)', paddingBottom: 100 }}>
              <div className="db-section-inner">
                <div className="db-section-card">
                  <SectionHeader icon={DocumentIcon} label="Forensic Data" title="Detailed Detection Results" iconColor="#C9A84C" />
                  <div style={{ padding: 24, overflowX: 'auto' }}>
                    <RingTable
                      rings={analysisData.rings_detected}
                      smurfingAlerts={analysisData.smurfing_alerts}
                      shellAccounts={analysisData.shell_accounts}
                    />
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>

        {/* ── Footer ── */}
        <footer style={{
          padding: '20px 40px',
          borderTop: '1px solid rgba(201,168,76,0.1)',
          background: '#050A07',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 18, height: 18, background: 'linear-gradient(135deg, #C9A84C, #E8C97A)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 20 20" width="12" height="12" fill="none">
                <path d="M10 2L3 5.5V10C3 14 6.2 17.5 10 19C13.8 17.5 17 14 17 10V5.5L10 2Z" fill="#070D0A" />
                <path d="M7 10L9 12L13 8" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="db-font-mono" style={{ color: '#C9A84C', fontSize: '0.75rem', letterSpacing: '0.12em' }}>MONEY MINING</span>
            <span className="db-font-mono" style={{ color: '#2A3530', fontSize: '0.65rem' }}>©HUMANS_INTHELOOP</span>
          </div>
          <span className="db-font-mono" style={{ color: '#2A3530', fontSize: '0.62rem', letterSpacing: '0.08em' }}>
            DETECTING FINANCIAL CRIMES THROUGH GRAPH ANALYSIS · POWERED BY AI · v1.0.0
          </span>
        </footer>
      </div>
    </>
  )
}

export default Dashboard