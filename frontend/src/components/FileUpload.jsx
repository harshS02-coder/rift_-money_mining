// import React, { useRef, useState } from 'react'
// import { uploadCSV } from '../services/api'
// import UploadIcon from './icons/UploadIcon'
// import CheckIcon from './icons/CheckIcon'

// const FileUpload = ({ onAnalysisComplete, onLoading, onError, loading = false }) => {
//   const fileInputRef = useRef(null)
//   const [isDragging, setIsDragging] = useState(false)
//   const [selectedFile, setSelectedFile] = useState(null)

//   const formatBytes = (bytes) => {
//     if (!bytes && bytes !== 0) return ''
//     if (bytes < 1024) return `${bytes} B`
//     const kb = bytes / 1024
//     if (kb < 1024) return `${kb.toFixed(1)} KB`
//     const mb = kb / 1024
//     return `${mb.toFixed(1)} MB`
//   }

//   const handleDragEnter = (e) => {
//     e.preventDefault()
//     e.stopPropagation()
//     setIsDragging(true)
//   }

//   const handleDragLeave = (e) => {
//     e.preventDefault()
//     e.stopPropagation()
//     setIsDragging(false)
//   }

//   const handleDrop = async (e) => {
//     e.preventDefault()
//     e.stopPropagation()
//     setIsDragging(false)

//     const files = e.dataTransfer.files
//     if (files.length > 0) {
//       await handleFile(files[0])
//     }
//   }

//   const handleFileClick = () => {
//     if (loading) return
//     fileInputRef.current?.click()
//   }

//   const handleFileChange = async (e) => {
//     const files = e.target.files
//     if (files.length > 0) {
//       await handleFile(files[0])
//     }
//   }

//   const handleFile = async (file) => {
//     try {
//       if (loading) return
//       if (!file.name.endsWith('.csv')) {
//         onError('Please upload a CSV file')
//         return
//       }

//       setSelectedFile(file)
//       onLoading(true)
//       const response = await uploadCSV(file)
//       onAnalysisComplete(response.data)
//       onError(null)
//     } catch (error) {
//       console.error('Upload error:', error)
//       onError(error.response?.data?.detail || 'Failed to upload and analyze file')
//     } finally {
//       onLoading(false)
//       if (fileInputRef.current) {
//         fileInputRef.current.value = ''
//       }
//     }
//   }

//   return (
//     <div className="w-full">
//       <div className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
//         <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
//           <div>
//             <h3 className="text-2xl font-black text-white mb-1 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-transparent bg-clip-text">
//               Upload transaction data
//             </h3>
//             <p className="text-sm text-white/80 leading-relaxed">
//               Drag & drop a CSV file here, or click to browse. We’ll analyze cycles, smurfing, and shell patterns.
//             </p>
//           </div>

//           <a
//             href="/sample_transactions.csv"
//             className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-bold hover:bg-white/20 hover:border-white/40 transition-all duration-300"
//           >
//             Download sample CSV
//           </a>
//         </div>

//         <div
//           role="button"
//           tabIndex={0}
//           aria-disabled={loading}
//           onClick={handleFileClick}
//           onKeyDown={(e) => {
//             if (loading) return
//             if (e.key === 'Enter' || e.key === ' ') {
//               e.preventDefault()
//               handleFileClick()
//             }
//           }}
//           onDragEnter={handleDragEnter}
//           onDragLeave={handleDragLeave}
//           onDragOver={(e) => {
//             e.preventDefault()
//             e.stopPropagation()
//           }}
//           onDrop={handleDrop}
//           className={`relative rounded-2xl border-2 border-dashed p-8 sm:p-10 text-center cursor-pointer transition-all duration-300 overflow-hidden
//             ${loading ? 'opacity-80 cursor-not-allowed' : ''}
//             ${isDragging
//               ? 'border-pink-300 bg-white/15 shadow-2xl shadow-pink-500/20 scale-[1.01]'
//               : 'border-white/25 bg-white/5 hover:bg-white/10 hover:border-white/40'}
//           `}
//         >
//           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

//           <input
//             ref={fileInputRef}
//             type="file"
//             accept=".csv"
//             onChange={handleFileChange}
//             disabled={loading}
//             style={{ display: 'none' }}
//           />

//           <div className="relative z-10">
//             <div className="mb-4 flex items-center justify-center">
//               <UploadIcon size={56} className="text-white/90" title="Upload" />
//             </div>
//             <div className="text-lg sm:text-xl font-black text-white mb-2">
//               {loading ? 'Analyzing…' : isDragging ? 'Drop your CSV to start' : 'Choose a CSV file to analyze'}
//             </div>
//             <div className="text-sm text-white/80">
//               {loading
//                 ? 'We’re running graph analysis and scoring suspicious accounts.'
//                 : 'Expected columns: id, from_account, to_account, amount, timestamp'}
//             </div>

//             {loading && (
//               <div className="mt-5 flex items-center justify-center gap-3">
//                 <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
//                 <span className="text-sm font-bold text-white/90">Please wait</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {selectedFile && (
//           <div className="mt-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 p-4">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//               <div>
//                 <div className="text-sm font-black text-emerald-700 break-words flex items-center gap-2">
//                   <CheckIcon size={16} className="text-emerald-700" />
//                   {selectedFile.name}
//                 </div>
//                 <div className="text-xs text-gray-600 mt-1">
//                   Size: <span className="font-semibold">{formatBytes(selectedFile.size)}</span>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 disabled={loading}
//                 onClick={() => {
//                   if (loading) return
//                   setSelectedFile(null)
//                   onError(null)
//                 }}
//                 className="px-4 py-2 rounded-xl bg-white border border-emerald-200 text-emerald-700 text-sm font-bold hover:bg-emerald-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
//               >
//                 Clear
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default FileUpload


//claude--
import React, { useRef, useState } from 'react'
import { uploadCSV } from '../services/api'
import UploadIcon from './icons/UploadIcon'
import CheckIcon from './icons/CheckIcon'

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Mono:wght@400;600&family=Instrument+Sans:wght@400;500;600;700&display=swap');

  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  @keyframes border-glow {
    0%, 100% { box-shadow: 0 0 0 1px rgba(201,168,76,0.18); }
    50%       { box-shadow: 0 0 28px 3px rgba(201,168,76,0.22); }
  }

  @keyframes drag-glow {
    0%, 100% { box-shadow: 0 0 0 1px rgba(201,168,76,0.5), inset 0 0 60px rgba(201,168,76,0.04); }
    50%       { box-shadow: 0 0 40px 4px rgba(201,168,76,0.35), inset 0 0 60px rgba(201,168,76,0.08); }
  }

  @keyframes shimmer-sweep {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
  }

  @keyframes fade-slide-up {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; box-shadow: 0 0 6px #C9A84C; }
    50%       { opacity: 0.4; box-shadow: none; }
  }

  @keyframes scan-h {
    0%   { top: 0%; opacity: 1; }
    90%  { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }

  @keyframes progress-indeterminate {
    0%   { left: -40%; width: 40%; }
    60%  { left: 100%; width: 40%; }
    100% { left: 100%; width: 40%; }
  }

  .fu-wrap {
    width: 100%;
    font-family: 'Instrument Sans', sans-serif;
  }

  .fu-wrap .font-mono  { font-family: 'IBM Plex Mono', monospace; }
  .fu-wrap .font-serif { font-family: 'DM Serif Display', serif; }

  /* ── Outer card ── */
  .fu-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(201,168,76,0.18);
    padding: 24px;
    position: relative;
    overflow: hidden;
    animation: border-glow 5s ease-in-out infinite;
  }

  .fu-card::before {
    content: '';
    position: absolute; top: -1px; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent);
  }

  /* ── Drop zone ── */
  .fu-dropzone {
    border: 1px dashed rgba(201,168,76,0.25);
    padding: 48px 24px;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: border-color 0.2s, background 0.2s;
    background: rgba(255,255,255,0.01);
    outline: none;
  }

  .fu-dropzone:hover:not(.disabled) {
    border-color: rgba(201,168,76,0.5);
    background: rgba(201,168,76,0.03);
  }

  .fu-dropzone.dragging {
    border-color: rgba(201,168,76,0.8);
    border-style: solid;
    background: rgba(201,168,76,0.05);
    animation: drag-glow 1.5s ease-in-out infinite;
  }

  .fu-dropzone.loading-state {
    opacity: 0.75;
    cursor: not-allowed;
  }

  /* shimmer sweep on hover */
  .fu-shimmer {
    position: absolute; inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(201,168,76,0.06) 50%, transparent 60%);
    pointer-events: none;
    animation: shimmer-sweep 2.4s ease-in-out infinite;
  }

  /* scan line */
  .fu-scan {
    position: absolute; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent);
    animation: scan-h 4s ease-in-out infinite;
    pointer-events: none;
  }

  /* ── Upload icon box ── */
  .fu-icon-box {
    width: 60px; height: 60px;
    border: 1px solid rgba(201,168,76,0.3);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 20px;
    position: relative;
    background: rgba(201,168,76,0.06);
    transition: border-color 0.2s, background 0.2s;
  }

  .fu-dropzone:hover:not(.disabled) .fu-icon-box,
  .fu-dropzone.dragging .fu-icon-box {
    border-color: rgba(201,168,76,0.6);
    background: rgba(201,168,76,0.12);
  }

  .fu-icon-box::after {
    content: '';
    position: absolute; bottom: -1px; right: -1px;
    width: 8px; height: 8px;
    background: #C9A84C;
  }

  /* ── Progress bar ── */
  .fu-progress-track {
    height: 2px;
    background: rgba(255,255,255,0.05);
    position: relative;
    overflow: hidden;
    margin-top: 20px;
  }

  .fu-progress-fill {
    position: absolute; top: 0; height: 100%;
    background: linear-gradient(90deg, #C9A84C, #E8C97A);
    animation: progress-indeterminate 1.6s ease-in-out infinite;
  }

  /* ── File info card ── */
  .fu-file-card {
    margin-top: 14px;
    background: rgba(22,160,90,0.06);
    border: 1px solid rgba(22,160,90,0.25);
    padding: 14px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
    animation: fade-slide-up 0.3s ease forwards;
    position: relative;
  }

  .fu-file-card::before {
    content: '';
    position: absolute; top: -1px; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(22,160,90,0.4), transparent);
  }

  /* ── Clear button ── */
  .fu-clear-btn {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(201,168,76,0.2);
    color: #C9A84C;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.62rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 6px 14px;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
    flex-shrink: 0;
  }

  .fu-clear-btn:hover:not(:disabled) {
    background: rgba(201,168,76,0.1);
    border-color: rgba(201,168,76,0.5);
  }

  .fu-clear-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  /* ── Sample link ── */
  .fu-sample-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.65rem;
    color: #4A5550;
    letter-spacing: 0.08em;
    text-decoration: none;
    border: 1px solid rgba(201,168,76,0.15);
    background: rgba(255,255,255,0.02);
    padding: 6px 12px;
    transition: color 0.15s, border-color 0.15s, background 0.15s;
  }

  .fu-sample-link:hover {
    color: #C9A84C;
    border-color: rgba(201,168,76,0.4);
    background: rgba(201,168,76,0.05);
  }
`

const FileUpload = ({ onAnalysisComplete, onLoading, onError, loading = false }) => {
  const fileInputRef = useRef(null)
  const [isDragging, setIsDragging]     = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const formatBytes = (bytes) => {
    if (!bytes && bytes !== 0) return ''
    if (bytes < 1024) return `${bytes} B`
    const kb = bytes / 1024
    if (kb < 1024) return `${kb.toFixed(1)} KB`
    return `${(kb / 1024).toFixed(1)} MB`
  }

  const handleDragEnter = (e) => { e.preventDefault(); e.stopPropagation(); if (!loading) setIsDragging(true) }
  const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false) }
  const handleDragOver  = (e) => { e.preventDefault(); e.stopPropagation() }

  const handleDrop = async (e) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(false)
    if (e.dataTransfer.files.length > 0) await handleFile(e.dataTransfer.files[0])
  }

  const handleFileClick = () => { if (!loading) fileInputRef.current?.click() }
  const handleFileChange = async (e) => { if (e.target.files.length > 0) await handleFile(e.target.files[0]) }

  const handleFile = async (file) => {
    if (loading) return
    if (!file.name.endsWith('.csv')) { onError('Please upload a CSV file'); return }
    setSelectedFile(file)
    onLoading(true)
    try {
      const response = await uploadCSV(file)
      onAnalysisComplete(response.data)
      onError(null)
    } catch (err) {
      console.error('Upload error:', err)
      onError(err.response?.data?.detail || 'Failed to upload and analyze file')
    } finally {
      onLoading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const dropzoneClass = [
    'fu-dropzone',
    isDragging    ? 'dragging'      : '',
    loading       ? 'loading-state' : '',
  ].filter(Boolean).join(' ')

  return (
    <>
      <style>{CSS}</style>
      <div className="fu-wrap">
        <div className="fu-card">

          {/* ── Header row ── */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 18, flexWrap: 'wrap' }}>
            <div>
              <div className="font-mono" style={{ fontSize: '0.58rem', color: '#4A5550', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>
                Data Ingestion
              </div>
              <h3 className="font-serif" style={{
                fontSize: '1.4rem', lineHeight: 1.1, marginBottom: 6,
                background: 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Upload Transaction Data
              </h3>
              <p className="font-mono" style={{ fontSize: '0.65rem', color: '#4A5550', letterSpacing: '0.06em', lineHeight: 1.6 }}>
                Drag & drop a CSV file to start analysis. RIFT maps the network,<br />
                detects rings, smurfing, and shell patterns automatically.
              </p>
            </div>

            <a href="/sample_transactions.csv" className="fu-sample-link" download>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
              Sample CSV
            </a>
          </div>

          {/* ── Drop zone ── */}
          <div
            role="button"
            tabIndex={0}
            aria-disabled={loading}
            className={dropzoneClass}
            onClick={handleFileClick}
            onKeyDown={e => { if (!loading && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); handleFileClick() } }}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="fu-shimmer" />
            <div className="fu-scan" />

            <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileChange} disabled={loading} style={{ display: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Icon */}
              <div className="fu-icon-box">
                {loading ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" style={{ animation: 'spin 1.2s linear infinite' }}>
                    <path strokeLinecap="round" d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                ) : isDragging ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                ) : (
                  <UploadIcon size={24} style={{ color: '#C9A84C' }} />
                )}
              </div>

              {/* Main text */}
              <div className="font-mono" style={{
                fontSize: '0.9rem', fontWeight: 600, color: '#C4C0B8',
                marginBottom: 8, letterSpacing: '0.04em',
              }}>
                {loading
                  ? 'Analysing transactions...'
                  : isDragging
                    ? 'Release to begin analysis'
                    : 'Drop CSV file here or click to browse'}
              </div>

              {/* Sub text */}
              <div className="font-mono" style={{ fontSize: '0.62rem', color: '#4A5550', letterSpacing: '0.08em', lineHeight: 1.7 }}>
                {loading
                  ? 'Running graph analysis · scoring suspicious accounts · detecting rings'
                  : 'Expected columns: id · from_account · to_account · amount · timestamp'}
              </div>

              {/* Column chips */}
              {!loading && !isDragging && (
                <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap', marginTop: 18 }}>
                  {['id', 'from_account', 'to_account', 'amount', 'timestamp'].map(col => (
                    <span key={col} className="font-mono" style={{
                      fontSize: '0.55rem', color: '#C9A84C',
                      background: 'rgba(201,168,76,0.08)',
                      border: '1px solid rgba(201,168,76,0.18)',
                      padding: '2px 8px', letterSpacing: '0.06em',
                    }}>
                      {col}
                    </span>
                  ))}
                </div>
              )}

              {/* Format badge */}
              {!loading && (
                <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <span className="font-mono" style={{
                    fontSize: '0.58rem', color: '#2A3530',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(201,168,76,0.1)',
                    padding: '2px 8px', letterSpacing: '0.1em',
                  }}>
                    .CSV ONLY
                  </span>
                </div>
              )}
            </div>

            {/* Loading progress bar inside drop zone */}
            {loading && (
              <div className="fu-progress-track">
                <div className="fu-progress-fill" />
              </div>
            )}
          </div>

          {/* ── Selected file card ── */}
          {selectedFile && (
            <div className="fu-file-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                {/* icon */}
                <div style={{
                  width: 28, height: 28, flexShrink: 0,
                  border: '1px solid rgba(22,160,90,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(22,160,90,0.08)',
                }}>
                  <CheckIcon size={13} style={{ color: '#16A05A' }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div className="font-mono" style={{ fontSize: '0.72rem', color: '#C4C0B8', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 260 }}>
                    {selectedFile.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 3 }}>
                    <span className="font-mono" style={{ fontSize: '0.58rem', color: '#4A5550', letterSpacing: '0.08em' }}>
                      {formatBytes(selectedFile.size)}
                    </span>
                    {loading && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span style={{
                          width: 4, height: 4, borderRadius: '50%',
                          background: '#C9A84C', color: '#C9A84C',
                          display: 'inline-block',
                          animation: 'pulse-dot 1.2s ease-in-out infinite',
                        }} />
                        <span className="font-mono" style={{ fontSize: '0.55rem', color: '#C9A84C', letterSpacing: '0.1em' }}>PROCESSING</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="button"
                disabled={loading}
                className="fu-clear-btn"
                onClick={() => { if (!loading) { setSelectedFile(null); onError(null) } }}
              >
                Clear ✕
              </button>
            </div>
          )}

          {/* ── Footer hint ── */}
          <div style={{
            marginTop: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <svg viewBox="0 0 12 12" width="9" height="9" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#2A3530" strokeWidth="1" />
              <path d="M6 5.5V8.5M6 4V4.5" stroke="#2A3530" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <span className="font-mono" style={{ fontSize: '0.55rem', color: '#2A3530', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Data is processed locally · Not stored on our servers
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default FileUpload