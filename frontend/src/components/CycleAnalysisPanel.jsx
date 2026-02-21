import React, { useState, useEffect } from 'react'
import { getCycleAnalysis } from '../services/api'

function CycleAnalysisPanel({ analysisId, ringIndex }) {
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!analysisId || ringIndex === undefined) return

      setLoading(true)
      setError(null)
      try {
        const data = await getCycleAnalysis(analysisId, ringIndex)
        setAnalysis(data)
      } catch (err) {
        console.error('Error fetching cycle analysis:', err)
        setError('Failed to load ring analysis')
      } finally {
        setLoading(false)
      }
    }

    fetchAnalysis()
  }, [analysisId, ringIndex])

  if (loading) {
    return (
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 animate-pulse">
        <div className="h-6 bg-purple-200 rounded mb-3"></div>
        <div className="h-4 bg-purple-200 rounded mb-2"></div>
        <div className="h-4 bg-purple-200 rounded w-4/5"></div>
      </div>
    )
  }

  if (error) {
    return <div className="bg-red-50 text-red-700 p-3 rounded-lg border border-red-200">{error}</div>
  }

  if (!analysis) return null

  return (
    <div className="bg-purple-50 p-5 rounded-lg border border-purple-200 shadow-md">
      <h3 className="text-lg font-bold text-purple-800 mb-4">🔄 Ring Analysis</h3>
      
      <div className="flex gap-2 mb-4 border-b border-purple-300">
        <button 
          className={`px-4 py-2 font-semibold text-sm transition-all ${
            activeTab === 'overview' 
              ? 'bg-purple-600 text-white rounded-t' 
              : 'text-purple-600 hover:bg-purple-100 rounded-t'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`px-4 py-2 font-semibold text-sm transition-all ${
            activeTab === 'participants' 
              ? 'bg-purple-600 text-white rounded-t' 
              : 'text-purple-600 hover:bg-purple-100 rounded-t'
          }`}
          onClick={() => setActiveTab('participants')}
        >
          Participants
        </button>
        <button 
          className={`px-4 py-2 font-semibold text-sm transition-all ${
            activeTab === 'analysis' 
              ? 'bg-purple-600 text-white rounded-t' 
              : 'text-purple-600 hover:bg-purple-100 rounded-t'
          }`}
          onClick={() => setActiveTab('analysis')}
        >
          AI Analysis
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg border border-purple-200">
        {activeTab === 'overview' && (
          <div className="space-y-2">
            {analysis.ring_details && (
              <>
                <p className="text-sm text-gray-700"><strong className="text-gray-900">Ring Length:</strong> {analysis.ring_details.length} accounts</p>
                <p className="text-sm text-gray-700"><strong className="text-gray-900">Total Volume:</strong> ${(analysis.ring_details.total_amount || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                <p className="text-sm text-gray-700"><strong className="text-gray-900">Detection Type:</strong> {analysis.ring_details.type || 'Cycle'}</p>
              </>
            )}
          </div>
        )}

        {activeTab === 'participants' && (
          <div>
            {analysis.participants && analysis.participants.length > 0 ? (
              <ul className="space-y-2">
                {analysis.participants.map((participant, idx) => (
                  <li key={idx} className="bg-purple-100 px-3 py-2 rounded border border-purple-200">
                    <span className="font-mono text-sm text-purple-900">{participant}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No participants data available</p>
            )}
          </div>
        )}

        {activeTab === 'analysis' && (
          <div>
            {analysis.ai_analysis ? (
              <p className="text-sm text-gray-700 leading-relaxed">{analysis.ai_analysis}</p>
            ) : (
              <p className="text-sm text-gray-500">No AI analysis available</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CycleAnalysisPanel
