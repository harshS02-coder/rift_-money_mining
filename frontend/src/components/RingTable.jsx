import React from 'react'

const RingTable = ({ rings, smurfingAlerts, shellAccounts }) => {
  const [activeTab, setActiveTab] = React.useState('fraud-rings')

  // Separate rings by classification - ONLY show explicitly classified rings
  const fraudRings = rings?.filter(r => r.classification === 'FRAUD') || []
  const legitimateRings = rings?.filter(r => r.classification === 'LEGITIMATE') || []

  const renderRingRow = (ring, index) => {
    const isfraud = ring.classification === 'FRAUD'
    return (
      <tr key={`ring-${index}`} className={`border-b border-gray-200 transition-colors ${isfraud ? 'bg-red-50 hover:bg-red-100' : 'bg-green-50 hover:bg-green-100'}`}>
        <td className="py-3 px-4">
          {isfraud && <span className="inline-block bg-red-600 text-white text-xs font-bold px-2 py-1 rounded mr-2">🚨 FRAUD</span>}
          {!isfraud && <span className="inline-block bg-green-700 text-white text-xs font-bold px-2 py-1 rounded mr-2">✓ LEGIT</span>}
          <span className="font-mono text-sm">{ring.ring_id}</span>
        </td>
        <td className="py-3 px-4">
          <div className="flex flex-wrap gap-1">
            {ring.accounts.map((acc, i) => (
              <span key={`${ring.ring_id}-${i}`} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                {acc}
              </span>
            ))}
          </div>
        </td>
        <td className="py-3 px-4 text-center font-semibold">{ring.length}</td>
        <td className="py-3 px-4 text-right font-semibold">${ring.total_amount.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}</td>
        <td className="py-3 px-4 text-center font-semibold">{ring.transactions.length}</td>
        <td className="py-3 px-4">
          <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full rounded-full transition-all" 
              style={{
                width: `${(ring.isolation_score || 0) * 100}%`,
                backgroundColor: (ring.isolation_score || 0) > 0.75 ? '#d32f2f' : (ring.isolation_score || 0) > 0.5 ? '#f57c00' : '#4caf50'
              }}
            ></div>
          </div>
          <span className="text-xs text-gray-700 font-semibold mt-1 block text-center">{((ring.isolation_score || 0) * 100).toFixed(0)}%</span>
        </td>
      </tr>
    )
  }

  const renderSmurfingRow = (alert, index) => (
    <tr key={`smurf-${index}`} className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
      <td className="py-3 px-4">
        <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">{alert.account_id}</code>
      </td>
      <td className="py-3 px-4 text-center font-semibold">{alert.transaction_count}</td>
      <td className="py-3 px-4 text-center">
        <span className="text-green-600 font-semibold">{alert.fan_in}→</span>
        <span className="font-mono text-xs mx-1">{alert.account_id}</span>
        <span className="text-red-600 font-semibold">→{alert.fan_out}</span>
      </td>
      <td className="py-3 px-4 text-right font-semibold">${alert.total_amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}</td>
      <td className="py-3 px-4">
        <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full rounded-full transition-all"
            style={{
              width: `${alert.risk_score}%`,
              backgroundColor:
                alert.risk_score > 80
                  ? '#d32f2f'
                  : alert.risk_score > 60
                    ? '#f57c00'
                    : alert.risk_score > 40
                      ? '#fbc02d'
                      : '#388e3c',
            }}
          ></div>
        </div>
        <span className="text-xs text-gray-700 font-semibold mt-1 block text-center">{alert.risk_score.toFixed(1)}</span>
      </td>
    </tr>
  )

  const renderShellRow = (shell, index) => (
    <tr key={`shell-${index}`} className="border-b border-gray-200 hover:bg-yellow-50 transition-colors">
      <td className="py-3 px-4">
        <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">{shell.account_id}</code>
      </td>
      <td className="py-3 px-4 text-center font-semibold">{shell.total_transactions}</td>
      <td className="py-3 px-4 text-right font-semibold">${shell.total_throughput.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}</td>
      <td className="py-3 px-4 text-right font-semibold">${shell.avg_transaction_value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}</td>
      <td className="py-3 px-4">
        <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full rounded-full transition-all"
            style={{
              width: `${shell.risk_score}%`,
              backgroundColor:
                shell.risk_score > 80
                  ? '#d32f2f'
                  : shell.risk_score > 60
                    ? '#f57c00'
                    : shell.risk_score > 40
                      ? '#fbc02d'
                      : '#388e3c',
            }}
          ></div>
        </div>
        <span className="text-xs text-gray-700 font-semibold mt-1 block text-center">{shell.risk_score.toFixed(1)}</span>
      </td>
    </tr>
  )

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="flex gap-1 bg-gray-100 p-2 border-b border-gray-300 overflow-x-auto">
        <button
          className={`px-4 py-2 font-semibold text-sm rounded transition-all whitespace-nowrap ${activeTab === 'fraud-rings' ? 'bg-red-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
          onClick={() => setActiveTab('fraud-rings')}
        >
          🚨 Fraud Rings ({fraudRings?.length || 0})
        </button>
        <button
          className={`px-4 py-2 font-semibold text-sm rounded transition-all whitespace-nowrap ${activeTab === 'legitimate-rings' ? 'bg-green-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
          onClick={() => setActiveTab('legitimate-rings')}
        >
          ✓ Legitimate Cycles ({legitimateRings?.length || 0})
        </button>
        <button
          className={`px-4 py-2 font-semibold text-sm rounded transition-all whitespace-nowrap ${activeTab === 'all-rings' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
          onClick={() => setActiveTab('all-rings')}
        >
          🔄 All Cycles ({rings?.length || 0})
        </button>
        <button
          className={`px-4 py-2 font-semibold text-sm rounded transition-all whitespace-nowrap ${activeTab === 'smurfing' ? 'bg-orange-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
          onClick={() => setActiveTab('smurfing')}
        >
          💰 Smurfing ({smurfingAlerts?.length || 0})
        </button>
        <button
          className={`px-4 py-2 font-semibold text-sm rounded transition-all whitespace-nowrap ${activeTab === 'shells' ? 'bg-yellow-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
          onClick={() => setActiveTab('shells')}
        >
          🏚️ Shell Accounts ({shellAccounts?.length || 0})
        </button>
      </div>

      <div className="overflow-x-auto">
        {activeTab === 'fraud-rings' && (
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 border-b-2 border-gray-300">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Ring ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Accounts Involved</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Length</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700 text-sm">Total Amount</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Transactions</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Isolation Score</th>
              </tr>
            </thead>
            <tbody>
              {fraudRings && fraudRings.length > 0 ? (
                fraudRings.map((ring, idx) => renderRingRow(ring, idx))
              ) : (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-gray-500 italic">
                    No fraud rings detected
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {activeTab === 'legitimate-rings' && (
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 border-b-2 border-gray-300">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Ring ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Accounts Involved</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Length</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700 text-sm">Total Amount</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Transactions</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Isolation Score</th>
              </tr>
            </thead>
            <tbody>
              {legitimateRings && legitimateRings.length > 0 ? (
                legitimateRings.map((ring, idx) => renderRingRow(ring, idx))
              ) : (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-gray-500 italic">
                    No legitimate cycles detected
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {activeTab === 'all-rings' && (
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 border-b-2 border-gray-300">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Ring ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Accounts Involved</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Length</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700 text-sm">Total Amount</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Transactions</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Isolation Score</th>
              </tr>
            </thead>
            <tbody>
              {rings && rings.length > 0 ? (
                rings.map((ring, idx) => renderRingRow(ring, idx))
              ) : (
                <tr>
                  <td colSpan="6" className="py-10 text-center text-gray-500 italic">
                    No cycles detected
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {activeTab === 'smurfing' && (
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 border-b-2 border-gray-300">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Account ID</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Transactions</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Fan In/Out</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700 text-sm">Total Amount</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Risk Score</th>
              </tr>
            </thead>
            <tbody>
              {smurfingAlerts && smurfingAlerts.length > 0 ? (
                smurfingAlerts.map((alert, idx) => renderSmurfingRow(alert, idx))
              ) : (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-gray-500 italic">
                    No smurfing patterns detected
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {activeTab === 'shells' && (
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 border-b-2 border-gray-300">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Account ID</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Transactions</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700 text-sm">Total Throughput</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700 text-sm">Avg per Transaction</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700 text-sm">Risk Score</th>
              </tr>
            </thead>
            <tbody>
              {shellAccounts && shellAccounts.length > 0 ? (
                shellAccounts.map((shell, idx) => renderShellRow(shell, idx))
              ) : (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-gray-500 italic">
                    No shell accounts detected
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default RingTable
