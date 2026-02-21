import React, { useState, useEffect } from 'react'
import { getCycleAnalysis } from '../services/api'
import RefreshIcon from './icons/RefreshIcon'

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
      <div className="bg-white/70 backdrop-blur-lg p-4 rounded-2xl border border-gray-200/60 shadow-xl animate-pulse">
        <div className="h-6 bg-gray-200/80 rounded mb-3"></div>
        <div className="h-4 bg-gray-200/70 rounded mb-2"></div>
        <div className="h-4 bg-gray-200/70 rounded w-4/5"></div>
      </div>
    )
  }

  if (error) {
    return <div className="bg-white/70 backdrop-blur-lg text-red-700 p-3 rounded-2xl border border-red-200/60 shadow-xl">{error}</div>
  }

  if (!analysis) return null

  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-gray-200/60 shadow-xl overflow-hidden">
      <div className="relative px-5 py-4 bg-gradient-to-r from-slate-900 via-violet-900 to-purple-700 text-white">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />
        <h3 className="relative text-base font-semibold flex items-center gap-2">
          <RefreshIcon size={18} className="text-white" />
          Ring Analysis
        </h3>
      </div>

      <div className="p-5">
      <div className="flex gap-2 mb-4 border-b border-gray-200/70">
        <button 
          className={`px-4 py-2 font-semibold text-sm transition-all ${
            activeTab === 'overview' 
              ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-t-xl' 
              : 'text-purple-700 hover:bg-white/70 rounded-t-xl'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`px-4 py-2 font-semibold text-sm transition-all ${
            activeTab === 'participants' 
              ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-t-xl' 
              : 'text-purple-700 hover:bg-white/70 rounded-t-xl'
          }`}
          onClick={() => setActiveTab('participants')}
        >
          Participants
        </button>
        <button 
          className={`px-4 py-2 font-semibold text-sm transition-all ${
            activeTab === 'analysis' 
              ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-t-xl' 
              : 'text-purple-700 hover:bg-white/70 rounded-t-xl'
          }`}
          onClick={() => setActiveTab('analysis')}
        >
          AI Analysis
        </button>
      </div>

      <div className="bg-white/70 p-4 rounded-xl border border-gray-200/70">
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
                  <li key={idx} className="bg-purple-50/70 px-3 py-2 rounded-xl border border-purple-200/60">
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
    </div>
  )
}

export default CycleAnalysisPanel
