// import React, { useState } from 'react'
// import { downloadReportJSON } from '../services/api'
// import DownloadIcon from './icons/DownloadIcon'
// import AlertTriangleIcon from './icons/AlertTriangleIcon'
// import CheckIcon from './icons/CheckIcon'
// import DocumentIcon from './icons/DocumentIcon'

// function DownloadReportButton({ analysisId, analysisData }) {
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(false)

//   const handleDownload = async () => {
//     try {
//       setLoading(true)
//       setError(null)
//       setSuccess(false)

//       await downloadReportJSON(analysisId)
//       setSuccess(true)
      
//       // Clear success message after 3 seconds
//       setTimeout(() => {
//         setSuccess(false)
//       }, 3000)
//     } catch (err) {
//       console.error('Download failed:', err)
//       setError('Failed to download report. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="flex flex-col gap-3">
//       <button
//         onClick={handleDownload}
//         disabled={loading}
//         className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
//           loading
//             ? 'bg-gray-400 text-white cursor-not-allowed opacity-75'
//             : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg active:scale-95'
//         }`}
//         title="Download analysis report as JSON"
//       >
//         <span className="text-xl inline-flex">
//           <DownloadIcon size={18} className="text-white" />
//         </span>
//         <span>
//           {loading ? 'Downloading...' : 'Download JSON Report'}
//         </span>
//       </button>

//       {error && (
//         <div className="bg-white/70 backdrop-blur-lg border border-red-200/70 p-3 rounded-2xl flex items-start gap-2 shadow-sm">
//           <span className="inline-flex mt-0.5">
//             <AlertTriangleIcon size={18} className="text-red-700" />
//           </span>
//           <span className="text-red-700 text-sm">{error}</span>
//         </div>
//       )}

//       {success && (
//         <div className="bg-white/70 backdrop-blur-lg border border-green-200/70 p-3 rounded-2xl flex items-start gap-2 shadow-sm animate-pulse">
//           <span className="inline-flex mt-0.5">
//             <CheckIcon size={18} className="text-green-700" />
//           </span>
//           <span className="text-green-700 text-sm">Report downloaded successfully!</span>
//         </div>
//       )}

//       <div className="text-xs text-gray-700 bg-white/70 backdrop-blur-lg p-4 rounded-2xl border border-gray-200/60 shadow-sm">
//         <p className="font-semibold mb-1 inline-flex items-center gap-2">
//           <DocumentIcon size={14} className="text-gray-700" />
//           JSON Export Format:
//         </p>
//         <p>Contains suspicious_accounts, fraud_rings, and summary statistics for further analysis and compliance reporting.</p>
//       </div>
//     </div>
//   )
// }

// export default DownloadReportButton

//claude ---
import React, { useState } from 'react'
import { downloadReportJSON } from '../services/api'
import DownloadIcon from './icons/DownloadIcon'
import AlertTriangleIcon from './icons/AlertTriangleIcon'
import CheckIcon from './icons/CheckIcon'
import DocumentIcon from './icons/DocumentIcon'

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Instrument+Sans:wght@400;500;600;700&display=swap');

  @keyframes fade-slide-up {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; box-shadow: 0 0 6px currentColor; }
    50%       { opacity: 0.4; box-shadow: none; }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  @keyframes bar-progress {
    from { width: 0%; }
    to   { width: 100%; }
  }

  .drb-wrap {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-family: 'Instrument Sans', sans-serif;
  }

  .drb-wrap .font-mono { font-family: 'IBM Plex Mono', monospace; }

  /* ── Main download button ── */
  .drb-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 13px 28px;
    background: linear-gradient(135deg, #C9A84C 0%, #E8C97A 60%, #C9A84C 100%);
    color: #070D0A;
    font-family: 'Instrument Sans', sans-serif;
    font-weight: 700;
    font-size: 0.82rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.15s, box-shadow 0.15s;
    align-self: flex-start;
  }

  .drb-btn::after {
    content: '';
    position: absolute; inset: 0;
    background: rgba(255,255,255,0.12);
    opacity: 0;
    transition: opacity 0.15s;
  }

  .drb-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(201,168,76,0.4); }
  .drb-btn:hover:not(:disabled)::after { opacity: 1; }
  .drb-btn:active:not(:disabled) { transform: scale(0.98); }

  .drb-btn:disabled {
    background: rgba(201,168,76,0.2);
    color: rgba(201,168,76,0.5);
    cursor: not-allowed;
    box-shadow: none;
  }

  /* ── Loading bar ── */
  .drb-progress-track {
    height: 2px;
    background: rgba(201,168,76,0.1);
    position: relative;
    overflow: hidden;
  }

  .drb-progress-fill {
    position: absolute; top: 0; left: 0; height: 100%;
    background: linear-gradient(90deg, #C9A84C, #E8C97A);
    animation: bar-progress 2s ease-in-out infinite;
  }

  /* ── Status banners ── */
  .drb-banner {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 12px 14px;
    border: 1px solid;
    animation: fade-slide-up 0.3s ease forwards;
    position: relative;
  }

  .drb-banner::before {
    content: '';
    position: absolute; top: -1px; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, currentColor, transparent);
    opacity: 0.3;
  }

  /* ── Info card ── */
  .drb-info {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(201,168,76,0.1);
    padding: 16px;
    position: relative;
  }

  .drb-info::before {
    content: '';
    position: absolute; top: -1px; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent);
  }
`

function DownloadReportButton({ analysisId, analysisData }) {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)
  const [success, setSuccess] = useState(false)

  const handleDownload = async () => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)
      await downloadReportJSON(analysisId)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3500)
    } catch (err) {
      console.error('Download failed:', err)
      setError('Failed to download report. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="drb-wrap">

        {/* ── Button row ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <button
            className="drb-btn"
            onClick={handleDownload}
            disabled={loading}
            title="Download analysis report as JSON"
          >
            {loading ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite', flexShrink: 0 }}>
                  <path strokeLinecap="round" d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Exporting...
              </>
            ) : (
              <>
                <DownloadIcon size={15} style={{ color: '#070D0A', flexShrink: 0 }} />
                Download JSON Report
              </>
            )}
          </button>

          {/* Format badge */}
          <span className="font-mono" style={{
            fontSize: '0.6rem', color: '#4A5550',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(201,168,76,0.12)',
            padding: '4px 10px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            JSON · UTF-8
          </span>
        </div>

        {/* ── Loading progress bar ── */}
        {loading && (
          <div className="drb-progress-track" style={{ marginTop: 2 }}>
            <div className="drb-progress-fill" />
          </div>
        )}

        {/* ── Error banner ── */}
        {error && (
          <div className="drb-banner" style={{
            background: 'rgba(248,113,113,0.06)',
            borderColor: 'rgba(248,113,113,0.3)',
            color: '#F87171',
          }}>
            <div style={{
              width: 26, height: 26, flexShrink: 0,
              border: '1px solid rgba(248,113,113,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <AlertTriangleIcon size={13} style={{ color: '#F87171' }} />
            </div>
            <div>
              <div className="font-mono" style={{ fontSize: '0.58rem', color: '#F87171', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>
                Export Error
              </div>
              <span className="font-mono" style={{ fontSize: '0.72rem', color: '#8A9490' }}>{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#F87171', cursor: 'pointer', fontSize: '0.7rem', fontFamily: 'IBM Plex Mono, monospace', flexShrink: 0 }}
            >
              ✕
            </button>
          </div>
        )}

        {/* ── Success banner ── */}
        {success && (
          <div className="drb-banner" style={{
            background: 'rgba(22,160,90,0.06)',
            borderColor: 'rgba(22,160,90,0.3)',
            color: '#16A05A',
          }}>
            <div style={{
              width: 26, height: 26, flexShrink: 0,
              border: '1px solid rgba(22,160,90,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <CheckIcon size={13} style={{ color: '#16A05A' }} />
            </div>
            <div>
              <div className="font-mono" style={{ fontSize: '0.58rem', color: '#16A05A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>
                Export Successful
              </div>
              <span className="font-mono" style={{ fontSize: '0.72rem', color: '#8A9490' }}>
                Report saved to your downloads folder
              </span>
            </div>
            <span style={{
              marginLeft: 'auto', flexShrink: 0,
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: '50%',
                background: '#16A05A', color: '#16A05A',
                display: 'inline-block',
                animation: 'pulse-dot 1.5s ease-in-out infinite',
              }} />
              <span className="font-mono" style={{ fontSize: '0.58rem', color: '#16A05A', letterSpacing: '0.08em' }}>LIVE</span>
            </span>
          </div>
        )}

        {/* ── Info card ── */}
        <div className="drb-info">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{
              width: 24, height: 24, flexShrink: 0,
              border: '1px solid rgba(201,168,76,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(201,168,76,0.06)',
            }}>
              <DocumentIcon size={12} style={{ color: '#C9A84C' }} />
            </div>
            <span className="font-mono" style={{ fontSize: '0.6rem', color: '#4A5550', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              JSON Export Format
            </span>
          </div>

          {/* Field list */}
          {[
            { field: 'suspicious_accounts', desc: 'All flagged accounts with risk scores' },
            { field: 'fraud_rings',         desc: 'Detected transaction ring structures' },
            { field: 'summary_statistics',  desc: 'Aggregated metrics for compliance reporting' },
          ].map(({ field, desc }) => (
            <div key={field} style={{
              display: 'flex', alignItems: 'baseline', gap: 10,
              padding: '7px 0',
              borderBottom: '1px solid rgba(201,168,76,0.06)',
            }}>
              <span className="font-mono" style={{ fontSize: '0.65rem', color: '#C9A84C', letterSpacing: '0.04em', flexShrink: 0 }}>
                {field}
              </span>
              <span style={{ color: '#4A5550', fontSize: '0.78rem' }}>{desc}</span>
            </div>
          ))}

          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg viewBox="0 0 12 12" width="9" height="9" fill="none">
              <path d="M6 1L1 3.5V6C1 9 3.4 11.2 6 12C8.6 11.2 11 9 11 6V3.5L6 1Z" stroke="#16A05A" strokeWidth="0.9" />
              <path d="M4 6L5 7L8 4.5" stroke="#16A05A" strokeWidth="0.9" strokeLinecap="round" />
            </svg>
            <span className="font-mono" style={{ fontSize: '0.55rem', color: '#2A3530', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Suitable for compliance & legal proceedings
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default DownloadReportButton
