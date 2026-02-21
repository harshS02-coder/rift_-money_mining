import React, { useState } from 'react'

function SuspiciousAccountsList({ analysisData, onAccountSelect }) {
  const [sortBy, setSortBy] = useState('risk_score')
  const [filterRisk, setFilterRisk] = useState('all')

  // Get all suspicious accounts
  const suspiciousAccounts = analysisData.account_scores.filter(account => {
    const isSuspicious = 
      analysisData.critical_accounts.includes(account.account_id) || 
      analysisData.high_risk_accounts.includes(account.account_id)
    
    if (filterRisk === 'critical') {
      return analysisData.critical_accounts.includes(account.account_id)
    } else if (filterRisk === 'high') {
      return analysisData.high_risk_accounts.includes(account.account_id)
    }
    return isSuspicious
  })

  // Sort accounts
  const sortedAccounts = [...suspiciousAccounts].sort((a, b) => {
    if (sortBy === 'risk_score') {
      return b.final_score - a.final_score
    } else if (sortBy === 'account_id') {
      return a.account_id.localeCompare(b.account_id)
    } else if (sortBy === 'risk_level') {
      const riskOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 }
      return riskOrder[a.risk_level] - riskOrder[b.risk_level]
    }
    return 0
  })

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'CRITICAL':
        return '#dc2626'
      case 'HIGH':
        return '#f97316'
      case 'MEDIUM':
        return '#eab308'
      case 'LOW':
        return '#22c55e'
      default:
        return '#666'
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden max-h-[600px] flex flex-col">
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-4 flex justify-between items-center flex-wrap gap-3">
        <h3 className="text-lg font-bold m-0">🚨 Suspicious Accounts ({suspiciousAccounts.length})</h3>
        <div className="flex gap-2 flex-wrap">
          <select 
            value={filterRisk} 
            onChange={(e) => setFilterRisk(e.target.value)}
            className="bg-white/90 text-gray-800 border border-white/30 rounded px-3 py-1.5 text-sm font-medium cursor-pointer hover:bg-white transition-colors"
          >
            <option value="all">All Risk Levels</option>
            <option value="critical">🔴 Critical Only</option>
            <option value="high">🟠 High Only</option>
          </select>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/90 text-gray-800 border border-white/30 rounded px-3 py-1.5 text-sm font-medium cursor-pointer hover:bg-white transition-colors"
          >
            <option value="risk_score">Sort by Risk Score</option>
            <option value="risk_level">Sort by Risk Level</option>
            <option value="account_id">Sort by Account ID</option>
          </select>
        </div>
      </div>

      {sortedAccounts.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p>No suspicious accounts found</p>
        </div>
      ) : (
        <div className="overflow-x-auto flex-1">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-gray-100 border-b-2 border-gray-300">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Account ID</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Risk Level</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Risk Score</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Score Breakdown</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedAccounts.map((account, idx) => (
                <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">{account.account_id}</code>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wide"
                      style={{ backgroundColor: getRiskColor(account.risk_level) }}
                    >
                      {account.risk_level}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm font-bold text-gray-800">{account.final_score.toFixed(1)}</span>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all"
                          style={{ 
                            width: `${account.final_score}%`,
                            backgroundColor: getRiskColor(account.risk_level)
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-2 flex-wrap">
                      {account.ring_involvement_score > 0 && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium" title="Ring Involvement">
                          🔄 {account.ring_involvement_score.toFixed(0)}
                        </span>
                      )}
                      {account.smurfing_score > 0 && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium" title="Smurfing">
                          💰 {account.smurfing_score.toFixed(0)}
                        </span>
                      )}
                      {account.shell_score > 0 && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium" title="Shell Activity">
                          🏚️ {account.shell_score.toFixed(0)}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors"
                      onClick={() => onAccountSelect(account.account_id)}
                      title="View account details"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        <div className="flex justify-around items-center">
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-600 font-medium">Critical:</span>
            <span className="text-sm font-bold text-red-600">{analysisData.critical_accounts.length}</span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-600 font-medium">High:</span>
            <span className="text-sm font-bold text-orange-600">{analysisData.high_risk_accounts.length}</span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-600 font-medium">Total:</span>
            <span className="text-sm font-bold text-gray-800">{suspiciousAccounts.length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuspiciousAccountsList
