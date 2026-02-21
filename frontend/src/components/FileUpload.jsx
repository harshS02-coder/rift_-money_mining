import React, { useRef } from 'react'
import { uploadCSV, analyzeTransactions } from '../services/api'

const FileUpload = ({ onAnalysisComplete, onLoading, onError }) => {
  const fileInputRef = useRef(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [fileName, setFileName] = React.useState(null)

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
      if (!file.name.endsWith('.csv')) {
        onError('Please upload a CSV file')
        return
      }

      setFileName(file.name)
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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col border-2 border-purple-100 hover:border-purple-300 transition-all duration-300">
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-fuchsia-600 text-white py-3 px-4 border-b border-purple-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse-slow"></div>
        <h3 className="m-0 text-sm font-bold tracking-wide relative z-10 flex items-center gap-2">
          <span className="text-lg animate-bounce">📊</span>
          Transaction Data Upload
        </h3>
      </div>
      
      <div className="p-4 flex justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <button
          className={`group relative flex items-center justify-center gap-3 py-4 px-6 w-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white border-3 rounded-xl text-base font-bold cursor-pointer transition-all duration-500 whitespace-nowrap overflow-hidden
            ${isDragging 
              ? 'scale-105 shadow-2xl shadow-fuchsia-500/60 border-fuchsia-400 ring-4 ring-fuchsia-300 animate-pulse' 
              : 'shadow-lg shadow-purple-500/40 border-transparent hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/60 hover:-translate-y-1 active:scale-100 active:translate-y-0'
            }`}
          onClick={handleFileClick}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <span className="text-2xl flex items-center group-hover:scale-125 transition-transform duration-300">📁</span>
          <span className="tracking-wide relative z-10 text-shadow-md">
            {isDragging ? 'Drop File Here!' : 'Upload CSV File'}
          </span>
          <span className="text-xl flex items-center group-hover:rotate-12 transition-transform duration-300">✨</span>
        </button>
      </div>

      {fileName && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 py-3 px-4 border-t-2 border-green-200">
          <p className="m-0 mb-1.5 text-sm text-green-700 font-bold break-words flex items-center gap-2">
            <span className="text-base">✓</span> 
            {fileName}
          </p>
          <p className="m-0 text-xs text-gray-600 leading-relaxed">
            📋 <span className="font-medium">Format:</span> id, from_account, to_account, amount, timestamp
          </p>
        </div>
      )}
    </div>
  )
}

export default FileUpload
