import React, { useState } from 'react'
import { downloadReportJSON } from '../services/api'

function DownloadReportButton({ analysisId, analysisData }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleDownload = async () => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      await downloadReportJSON(analysisId)
      setSuccess(true)
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    } catch (err) {
      console.error('Download failed:', err)
      setError('Failed to download report. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleDownload}
        disabled={loading}
        className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
          loading
            ? 'bg-gray-400 text-white cursor-not-allowed opacity-75'
            : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg active:scale-95'
        }`}
        title="Download analysis report as JSON"
      >
        <span className="text-xl">
          {loading ? '⏳' : '⬇️'}
        </span>
        <span>
          {loading ? 'Downloading...' : 'Download JSON Report'}
        </span>
      </button>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-600 p-3 rounded flex items-start gap-2">
          <span className="text-xl">❌</span>
          <span className="text-red-700 text-sm">{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border-l-4 border-green-600 p-3 rounded flex items-start gap-2 animate-pulse">
          <span className="text-xl">✅</span>
          <span className="text-green-700 text-sm">Report downloaded successfully!</span>
        </div>
      )}

      <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded border border-gray-200">
        <p className="font-semibold mb-1">📋 JSON Export Format:</p>
        <p>Contains suspicious_accounts, fraud_rings, and summary statistics for further analysis and compliance reporting.</p>
      </div>
    </div>
  )
}

export default DownloadReportButton
