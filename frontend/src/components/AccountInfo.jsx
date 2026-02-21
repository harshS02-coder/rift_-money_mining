import React from 'react'

const AccountInfo = ({ accountDetails, onClose }) => {
  if (!accountDetails) {
    return (
      <div className="bg-white rounded-lg p-6 h-full flex items-center justify-center text-gray-500">
        <p>Select an account to view details</p>
      </div>
    )
  }

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'CRITICAL':
        return '#d32f2f'
      case 'HIGH':
        return '#f57c00'
      case 'MEDIUM':
        return '#fbc02d'
      case 'LOW':
        return '#388e3c'
      default:
        return '#1976d2'
    }
  }

  return (
    <div className="bg-white rounded-lg p-5 h-full flex flex-col gap-5">
      <div className="flex justify-between items-center pb-3 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 break-all">{accountDetails.account_id}</h3>
        <button className="text-gray-500 hover:text-red-600 text-xl font-bold cursor-pointer transition-colors" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div
          className="inline-block px-3 py-1.5 rounded-full text-white text-sm font-bold uppercase tracking-wide mb-3"
          style={{ backgroundColor: getRiskColor(accountDetails.risk_level) }}
        >
          {accountDetails.risk_level}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 font-medium">Suspicion Score</span>
          <span
            className="text-2xl font-bold"
            style={{ color: getRiskColor(accountDetails.risk_level) }}
          >
            {accountDetails.final_score.toFixed(1)}/100
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Risk Factor Breakdown</h4>
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-gray-600 font-medium">Ring Involvement</span>
          <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-blue-600 rounded-full transition-all"
              style={{ width: `${accountDetails.ring_involvement_score}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-800 font-semibold self-end">
            {accountDetails.ring_involvement_score.toFixed(1)}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-gray-600 font-medium">Smurfing Behavior</span>
          <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-orange-600 rounded-full transition-all"
              style={{ width: `${accountDetails.smurfing_score}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-800 font-semibold self-end">
            {accountDetails.smurfing_score.toFixed(1)}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-gray-600 font-medium">Shell Characteristics</span>
          <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-red-600 rounded-full transition-all"
              style={{ width: `${accountDetails.shell_score}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-800 font-semibold self-end">
            {accountDetails.shell_score.toFixed(1)}
          </span>
        </div>
      </div>

      {accountDetails.risk_factors && accountDetails.risk_factors.length > 0 && (
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <h4 className="text-sm font-bold text-red-700 uppercase tracking-wide mb-2">Identified Risk Factors</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            {accountDetails.risk_factors.map((factor, idx) => (
              <li key={idx}>{factor}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center italic">
          Click on nodes in the graph to view more details
        </p>
      </div>
    </div>
  )
}

export default AccountInfo
