import React, { useState, useEffect } from 'react'
import { getAccountNarrative } from '../services/api'

function AccountNarrative({ accountId }) {
  const [narrative, setNarrative] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNarrative = async () => {
      if (!accountId) return

      setLoading(true)
      setError(null)
      try {
        const data = await getAccountNarrative(accountId)
        setNarrative(data)
      } catch (err) {
        console.error('Error fetching account narrative:', err)
        setError('Failed to load account narrative')
      } finally {
        setLoading(false)
      }
    }

    fetchNarrative()
  }, [accountId])

  if (loading) {
    return (
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 animate-pulse">
        <div className="h-4 bg-blue-200 rounded mb-2"></div>
        <div className="h-4 bg-blue-200 rounded w-3/4"></div>
      </div>
    )
  }

  if (error) {
    return <div className="bg-red-50 text-red-700 p-3 rounded-lg border border-red-200">{error}</div>
  }

  if (!narrative) return null

  return (
    <div className="bg-blue-50 p-5 rounded-lg border border-blue-200 shadow-md">
      <h4 className="text-base font-bold text-blue-800 mb-3">💼 Account Risk Profile</h4>
      <div className="space-y-3">
        <p className="text-sm text-gray-700">Account: <strong className="text-gray-900">{accountId}</strong></p>
        <p className="text-sm text-gray-700 leading-relaxed">{narrative.narrative}</p>
        {narrative.risk_level && (
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
            narrative.risk_level.toLowerCase() === 'critical' ? 'bg-red-600 text-white' :
            narrative.risk_level.toLowerCase() === 'high' ? 'bg-orange-600 text-white' :
            narrative.risk_level.toLowerCase() === 'medium' ? 'bg-yellow-500 text-gray-900' :
            'bg-green-700 text-white'
          }`}>
            {narrative.risk_level} RISK
          </div>
        )}
      </div>
    </div>
  )
}

export default AccountNarrative
