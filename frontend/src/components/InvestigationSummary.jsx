import React, { useState, useEffect } from 'react'
import { getInvestigationSummary } from '../services/api'

function InvestigationSummary({ analysisId }) {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSummary = async () => {
      if (!analysisId) return
      
      setLoading(true)
      setError(null)
      try {
        const data = await getInvestigationSummary(analysisId)
        setSummary(data)
      } catch (err) {
        console.error('Error fetching investigation summary:', err)
        setError('Failed to load AI summary')
      } finally {
        setLoading(false)
      }
    }

    fetchSummary()
  }, [analysisId])

  if (loading) {
    return (
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-lg animate-pulse">
        <div className="h-8 bg-blue-200 rounded mb-4 w-3/4"></div>
        <div className="h-4 bg-blue-100 rounded mb-2"></div>
        <div className="h-4 bg-blue-100 rounded mb-2 w-5/6"></div>
        <div className="h-4 bg-blue-100 rounded w-4/6"></div>
      </div>
    )
  }

  if (error) {
    return <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">{error}</div>
  }

  if (!summary) return null

  return (
    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-lg max-h-[500px] overflow-y-auto scrollbar-thin">
      <h3 className="text-xl font-bold text-blue-800 mb-4 pb-2 border-b-2 border-blue-300">📋 AI Investigation Summary</h3>
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">{summary.overview}</p>
        {summary.top_suspects && summary.top_suspects.length > 0 && (
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="text-base font-semibold text-red-700 mb-3 flex items-center gap-2">🚨 Top Suspects</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {summary.top_suspects.slice(0, 5).map((suspect, idx) => (
                <li key={idx} className="ml-2">{suspect}</li>
              ))}
            </ul>
          </div>
        )}
        {summary.key_findings && summary.key_findings.length > 0 && (
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="text-base font-semibold text-yellow-700 mb-3 flex items-center gap-2">🔍 Key Findings</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {summary.key_findings.slice(0, 5).map((finding, idx) => (
                <li key={idx} className="ml-2">{finding}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default InvestigationSummary
