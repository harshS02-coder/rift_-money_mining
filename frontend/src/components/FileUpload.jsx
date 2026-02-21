import React, { useRef, useState } from 'react'
import { uploadCSV } from '../services/api'
import UploadIcon from './icons/UploadIcon'
import CheckIcon from './icons/CheckIcon'

const FileUpload = ({ onAnalysisComplete, onLoading, onError, loading = false }) => {
  const fileInputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const formatBytes = (bytes) => {
    if (!bytes && bytes !== 0) return ''
    if (bytes < 1024) return `${bytes} B`
    const kb = bytes / 1024
    if (kb < 1024) return `${kb.toFixed(1)} KB`
    const mb = kb / 1024
    return `${mb.toFixed(1)} MB`
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      await handleFile(files[0])
    }
  }

  const handleFileClick = () => {
    if (loading) return
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e) => {
    const files = e.target.files
    if (files.length > 0) {
      await handleFile(files[0])
    }
  }

  const handleFile = async (file) => {
    try {
      if (loading) return
      if (!file.name.endsWith('.csv')) {
        onError('Please upload a CSV file')
        return
      }

      setSelectedFile(file)
      onLoading(true)
      const response = await uploadCSV(file)
      onAnalysisComplete(response.data)
      onError(null)
    } catch (error) {
      console.error('Upload error:', error)
      onError(error.response?.data?.detail || 'Failed to upload and analyze file')
    } finally {
      onLoading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className="w-full">
      <div className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-black text-white mb-1 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-transparent bg-clip-text">
              Upload transaction data
            </h3>
            <p className="text-sm text-white/80 leading-relaxed">
              Drag & drop a CSV file here, or click to browse. We’ll analyze cycles, smurfing, and shell patterns.
            </p>
          </div>

          <a
            href="/sample_transactions.csv"
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-bold hover:bg-white/20 hover:border-white/40 transition-all duration-300"
          >
            Download sample CSV
          </a>
        </div>

        <div
          role="button"
          tabIndex={0}
          aria-disabled={loading}
          onClick={handleFileClick}
          onKeyDown={(e) => {
            if (loading) return
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleFileClick()
            }
          }}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onDrop={handleDrop}
          className={`relative rounded-2xl border-2 border-dashed p-8 sm:p-10 text-center cursor-pointer transition-all duration-300 overflow-hidden
            ${loading ? 'opacity-80 cursor-not-allowed' : ''}
            ${isDragging
              ? 'border-pink-300 bg-white/15 shadow-2xl shadow-pink-500/20 scale-[1.01]'
              : 'border-white/25 bg-white/5 hover:bg-white/10 hover:border-white/40'}
          `}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            disabled={loading}
            style={{ display: 'none' }}
          />

          <div className="relative z-10">
            <div className="mb-4 flex items-center justify-center">
              <UploadIcon size={56} className="text-white/90" title="Upload" />
            </div>
            <div className="text-lg sm:text-xl font-black text-white mb-2">
              {loading ? 'Analyzing…' : isDragging ? 'Drop your CSV to start' : 'Choose a CSV file to analyze'}
            </div>
            <div className="text-sm text-white/80">
              {loading
                ? 'We’re running graph analysis and scoring suspicious accounts.'
                : 'Expected columns: id, from_account, to_account, amount, timestamp'}
            </div>

            {loading && (
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span className="text-sm font-bold text-white/90">Please wait</span>
              </div>
            )}
          </div>
        </div>

        {selectedFile && (
          <div className="mt-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="text-sm font-black text-emerald-700 break-words flex items-center gap-2">
                  <CheckIcon size={16} className="text-emerald-700" />
                  {selectedFile.name}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Size: <span className="font-semibold">{formatBytes(selectedFile.size)}</span>
                </div>
              </div>

              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  if (loading) return
                  setSelectedFile(null)
                  onError(null)
                }}
                className="px-4 py-2 rounded-xl bg-white border border-emerald-200 text-emerald-700 text-sm font-bold hover:bg-emerald-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FileUpload
