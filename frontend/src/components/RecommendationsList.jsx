import React, { useState, useEffect } from 'react'
import { getRecommendations } from '../services/api'

function RecommendationsList({ accountId }) {
  const [recommendations, setRecommendations] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedSteps, setExpandedSteps] = useState({})

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!accountId) return

      setLoading(true)
      setError(null)
      try {
        const data = await getRecommendations(accountId)
        setRecommendations(data)
      } catch (err) {
        console.error('Error fetching recommendations:', err)
        setError('Failed to load recommendations')
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [accountId])

  const toggleStep = (idx) => {
    setExpandedSteps(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }))
  }

  if (loading) {
    return (
      <div className="bg-green-50 p-4 rounded-lg border border-green-200 animate-pulse">
        <div className="h-4 bg-green-200 rounded mb-2"></div>
        <div className="h-4 bg-green-200 rounded w-5/6"></div>
      </div>
    )
  }

  if (error) {
    return <div className="bg-red-50 text-red-700 p-3 rounded-lg border border-red-200">{error}</div>
  }

  if (!recommendations || !recommendations.steps) return null

  return (
    <div className="bg-green-50 p-5 rounded-lg border border-green-200 shadow-md">
      <h4 className="text-base font-bold text-green-800 mb-3">📋 Investigation Steps</h4>
      <ol className="list-decimal list-inside space-y-3">
        {recommendations.steps.map((step, idx) => (
          <li key={idx} className="text-gray-700">
            <div 
              className="inline-flex items-center gap-2 cursor-pointer hover:text-green-700 transition-colors"
              onClick={() => toggleStep(idx)}
            >
              <span className="font-semibold">{step.title || `Step ${idx + 1}`}</span>
              {step.priority && <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${
                step.priority.toLowerCase() === 'critical' ? 'bg-red-600 text-white' :
                step.priority.toLowerCase() === 'high' ? 'bg-orange-600 text-white' :
                'bg-yellow-500 text-gray-900'
              }`}>{step.priority}</span>}
            </div>
            {expandedSteps[idx] && step.description && (
              <div className="mt-2 ml-6 p-3 bg-white rounded border border-green-200">
                <p className="text-sm text-gray-700">{step.description}</p>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default RecommendationsList
