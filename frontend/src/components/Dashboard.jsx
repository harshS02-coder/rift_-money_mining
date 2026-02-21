import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import FileUpload from './FileUpload'
import GraphView from './GraphView'
import RingTable from './RingTable'
import AccountInfo from './AccountInfo'
import AccountNarrative from './AccountNarrative'
import RecommendationsList from './RecommendationsList'
import CycleAnalysisPanel from './CycleAnalysisPanel'
import InvestigationSummary from './InvestigationSummary'
import SuspiciousAccountsList from './SuspiciousAccountsList'
import DownloadReportButton from './DownloadReportButton'
import { healthCheck } from '../services/api'

const Dashboard = () => {
  const [analysisData, setAnalysisData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [selectedRing, setSelectedRing] = useState(null)
  const [backendHealthy, setBackendHealthy] = useState(false)
  const { user, logout } = useAuth()

  // Check backend health on mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        await healthCheck()
        setBackendHealthy(true)
        setError(null)
      } catch (err) {
        console.error('Backend health check failed:', err)
        setBackendHealthy(false)
        
        // Provide helpful error message based on environment
        const isDev = process.env.NODE_ENV === 'development'
        const msg = isDev 
          ? 'Backend connection failed. Ensure FastAPI server is running:\n   cd backend && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000'
          : `Backend connection failed. The API server at ${window.location.origin} is not responding. Please check that:\n   1. The backend service is running\n   2. Network connectivity is established\n   3. Check browser console for detailed errors`
        
        setError(msg)
      }
    }
    checkHealth()
  }, [])

  const handleAnalysisComplete = (data) => {
    setAnalysisData(data)
    setSelectedAccount(null)
  }

  const handleAccountClick = (accountId) => {
    const account = analysisData?.account_scores.find(
      (s) => s.account_id === accountId
    )
    setSelectedAccount(account)
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-100 overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 to-blue-800 text-white py-4 shadow-lg">
        <div className="flex justify-between items-center w-full px-10">
          <div>
            <h1 className="text-3xl font-bold mb-1">🔍 RIFT 2026</h1>
            <p className="text-sm opacity-90">Financial Ring Forensic Tracker - Money Muling Detection Engine</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-sm">
              <div className={`w-3 h-3 rounded-full animate-pulse-slow ${backendHealthy ? 'bg-green-500' : 'bg-red-500'}`}></div>
              {/* <span>{backendHealthy ? 'Backend Connected' : 'Backend Disconnected'}</span> */}
            </div>
            <div className="border-l border-white/30 pl-6">
              <div className="text-sm opacity-90">Welcome, {user?.organizationName}</div>
              <button
                onClick={logout}
                className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded mt-1 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col w-full flex-1">
        {/* Upload Section */}
        <section id="home" className="w-full py-20 px-10 min-h-[400px] flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700">
          <div className="max-w-7xl mx-auto w-full">
            {!analysisData ? (
              <>
                <h2 className="text-4xl font-semibold text-white text-center mb-10 pb-3 border-b-4 border-white/30">Upload Transaction File</h2>
                <div className="text-center text-white space-y-6 mb-8">
                  <div className="text-6xl">📊</div>
                  <h2 className="text-3xl font-bold">Begin Your Financial Crime Investigation</h2>
                  <p className="text-lg leading-relaxed max-w-2xl mx-auto opacity-90">
                    Upload a CSV file containing transaction data to analyze money
                    muling patterns using our graph-based detection engine powered by AI.
                  </p>
                  <p className="text-sm bg-white/10 backdrop-blur-lg py-3 px-6 rounded-lg inline-block font-medium">
                    Supports CSV with: id, from_account, to_account, amount, timestamp
                  </p>
                </div>
              </>
            ) : (
              <h2 className="text-4xl font-semibold text-white text-center pb-3 border-b-4 border-white/30">Data Analysis Complete ✓</h2>
            )}
            <FileUpload
              onAnalysisComplete={handleAnalysisComplete}
              onLoading={setLoading}
              onError={setError}
            />
            {error && (
              <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded flex items-center gap-3 mt-6">
                <span className="text-2xl">⚠️</span>
                <span className="flex-1 text-red-700">{error}</span>
                <button 
                  onClick={() => setError(null)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Dismiss
                </button>
              </div>
            )}
            {loading && (
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded flex items-center gap-3 mt-6">
                <div className="w-5 h-5 border-3 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-blue-700">Analyzing transactions with AI...</p>
              </div>
            )}
          </div>
        </section>

        {/* AI Insights Section */}
        {analysisData && (
          <section className="w-full py-16 px-10 bg-white border-b border-gray-200 min-h-[300px]">
            <div className="max-w-7xl mx-auto w-full">
              <h2 className="text-3xl font-semibold text-blue-700 mb-8 pb-3 border-b-4 border-blue-700">🤖 AI-Powered Investigation Insights</h2>
              
              {/* Download Report Section */}
              <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 shadow-md">
                <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
                  📥 Export Analysis Results
                </h3>
                <DownloadReportButton 
                  analysisId={analysisData.analysis_id}
                  analysisData={analysisData}
                />
              </div>

              <InvestigationSummary analysisId={analysisData.analysis_id} />
              
              <div className="mt-10">
                <SuspiciousAccountsList 
                  analysisData={analysisData}
                  onAccountSelect={handleAccountClick}
                />
              </div>

              {selectedAccount && (
                <div className="mt-8">
                  <div>
                    <AccountNarrative accountId={selectedAccount.account_id} />
                    <RecommendationsList accountId={selectedAccount.account_id} />
                  </div>
                </div>
              )}
              
              {selectedRing && (
                <div className="mt-8">
                  <CycleAnalysisPanel analysisId={analysisData.analysis_id} ringIndex={selectedRing.index} />
                </div>
              )}
            </div>
            <div className="text-center py-5 text-blue-600 text-sm font-semibold">
              ↓ Scroll down for detailed analysis ↓
            </div>
          </section>
        )}

        {/* Summary Statistics Section */}
        {analysisData && (
          <section className="w-full py-16 px-10 bg-gray-50 border-b border-gray-200 min-h-[300px]">
            <div className="max-w-7xl mx-auto w-full">
              <h2 className="text-3xl font-semibold text-blue-700 mb-8 pb-3 border-b-4 border-blue-700">📊 Analysis Summary</h2>
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Transaction Statistics */}
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">Transaction Data</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 text-sm">Total Transactions</span>
                        <span className="font-semibold text-blue-600">{analysisData.total_transactions}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 text-sm">Total Volume</span>
                        <span className="font-semibold text-blue-600">${(analysisData.summary?.total_volume || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 text-sm">Avg Transaction</span>
                        <span className="font-semibold text-blue-600">${(analysisData.summary?.avg_transaction || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                      </div>
                    </div>
                  </div>

                  {/* Account Statistics */}
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">Account Analysis</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 text-sm">Total Accounts</span>
                        <span className="font-semibold text-blue-600">{analysisData.total_accounts}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 text-sm">Suspicious Accounts</span>
                        <span className="font-semibold text-blue-600">{analysisData.summary?.suspicious_accounts || 0}</span>
                      </div>
                    </div>
                  </div>

                  {/* Detection Results */}
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">Pattern Detection</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 text-sm">Cycles Detected</span>
                        <span className="font-semibold text-blue-600">{analysisData.rings_detected.length}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 text-sm">Smurfing Alerts</span>
                        <span className="font-semibold text-blue-600">{analysisData.smurfing_alerts.length}</span>
                      </div>
                    </div>
                  </div>

                  {/* Risk Assessment */}
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">Risk Assessment</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 text-sm">🚨 Critical Risk</span>
                        <span className="font-semibold text-red-600">{analysisData.critical_accounts.length}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 text-sm">⚠️ High Risk</span>
                        <span className="font-semibold text-orange-600">{analysisData.high_risk_accounts.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Transaction Graph Section */}
        {analysisData && (
          <section className="w-full py-16 px-10 bg-white border-b border-gray-200 min-h-[600px]">
            <div className="max-w-7xl mx-auto w-full">
              <h2 className="text-3xl font-semibold text-blue-700 mb-8 pb-3 border-b-4 border-blue-700">🔗 Transaction Network Graph</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[500px]">
                <div className="lg:col-span-2 bg-gray-50 rounded-xl overflow-hidden shadow-lg border border-gray-200">
                  <GraphView
                    data={analysisData}
                    onAccountClick={handleAccountClick}
                  />
                </div>
                <div className="bg-white rounded-xl border border-gray-200 overflow-y-auto max-h-[600px] shadow-lg scrollbar-thin">
                  <AccountInfo
                    accountDetails={selectedAccount}
                    onClose={() => setSelectedAccount(null)}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Data Tables Section */}
        {analysisData && (
          <section className="w-full py-16 px-10 pb-20 bg-gray-50 min-h-[400px]">
            <div className="max-w-7xl mx-auto w-full">
              <h2 className="text-3xl font-semibold text-blue-700 mb-8 pb-3 border-b-4 border-blue-700">📋 Detailed Detection Results</h2>
              <div className="bg-white rounded-xl border border-gray-200 overflow-auto mt-8 shadow-lg">
                <RingTable
                  rings={analysisData.rings_detected}
                  smurfingAlerts={analysisData.smurfing_alerts}
                  shellAccounts={analysisData.shell_accounts}
                />
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-10 border-t border-gray-800">
        <p className="text-center text-gray-400">
          RIFT 2026 © Detecting Financial Crimes Through Graph Analysis | Powered by AI | v1.0.0
        </p>
      </footer>
    </div>
  )
}

export default Dashboard
