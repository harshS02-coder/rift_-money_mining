import axios from 'axios'

// Dynamically determine API base URL
const getAPIBaseURL = () => {
  // Development: use Vite proxy
  if (process.env.NODE_ENV === 'development') {
    console.log('📡 API Mode: Development (Vite proxy to localhost:8000)')
    return '/api'
  }
  
  // Production: check for environment variable first
  if (import.meta.env.VITE_API_URL) {
    console.log('📡 API Mode: Production (from VITE_API_URL)', import.meta.env.VITE_API_URL)
    return import.meta.env.VITE_API_URL
  }
  
  // Production fallback: Try relative path first (for same-origin deployments)
  console.log('📡 API Mode: Production (attempting relative path /api)')
  return '/api'
}

const API_BASE_URL = getAPIBaseURL()

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method.toUpperCase(), config.url)
    return config
  },
  (error) => Promise.reject(error)
)

// Add response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url)
    return response
  },
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

// Transaction Analysis APIs
export const analyzeTransactions = (transactions) => {
  return api.post('/analyze', { transactions })
}

export const uploadCSV = (file) => {
  const formData = new FormData()
  formData.append('file', file)
  return api.post('/upload-csv', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const getAnalysis = (analysisId) => {
  return api.get(`/analysis/${analysisId}`)
}

export const getAccountDetails = (accountId) => {
  return api.get(`/accounts/${accountId}`)
}

export const getStatistics = () => {
  return api.get('/stats')
}

export const healthCheck = () => {
  // Use the configured API base URL for health check
  return axios.get(`${API_BASE_URL}/`, { timeout: 5000 })
}

// LLM APIs
export const getLLMStatus = () => {
  return api.get('/llm-status')
}

export const getInvestigationSummary = (analysisId) => {
  return api.get(`/investigation-summary/${analysisId}`)
    .then(response => response.data)
    .catch(err => {
      console.warn('Failed to fetch investigation summary:', err.message)
      return {
        overview: 'AI summary generation failed',
        top_suspects: [],
        key_findings: []
      }
    })
}

export const getAccountNarrative = (accountId) => {
  return api.get(`/account-narrative/${accountId}`)
    .then(response => response.data)
    .catch(err => {
      console.warn('Failed to fetch account narrative:', err.message)
      return {
        narrative: 'Unable to generate AI narrative for this account.',
        risk_level: 'UNKNOWN'
      }
    })
}

export const getRecommendations = (accountId) => {
  return api.get(`/recommendations/${accountId}`)
    .then(response => response.data)
    .catch(err => {
      console.warn('Failed to fetch recommendations:', err.message)
      return {
        steps: [
          { title: 'Review Transaction History', priority: 'HIGH', description: 'Examine all transactions' },
          { title: 'Check Connected Accounts', priority: 'HIGH', description: 'Verify account connections' },
          { title: 'Verify Documentation', priority: 'MEDIUM', description: 'Check KYC documents' }
        ]
      }
    })
}

export const getCycleAnalysis = (analysisId, ringIndex) => {
  return api.get(`/cycle-analysis/${analysisId}/${ringIndex}`)
    .then(response => response.data)
    .catch(err => {
      console.warn('Failed to fetch cycle analysis:', err.message)
      return {
        ring_details: { length: 0, total_amount: 0 },
        participants: [],
        ai_analysis: 'Unable to generate cycle analysis.'
      }
    })
}

// Download APIs
export const downloadReportJSON = (analysisId) => {
  // Use the configured API base URL instead of hardcoded localhost
  const downloadURL = `${API_BASE_URL}/download-report-json/${analysisId}`
  
  return axios.get(downloadURL, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => {
      // Create a blob from the JSON data
      const jsonString = JSON.stringify(response.data, null, 2)
      const blob = new Blob([jsonString], { type: 'application/json' })
      
      // Create a temporary download link
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `rift_analysis_${analysisId.substring(0, 8)}.json`
      
      // Trigger the download
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      
      return response.data
    })
    .catch(err => {
      console.error('Failed to download report:', err)
      throw err
    })
}

export const getReportJSON = (analysisId) => {
  const reportURL = `${API_BASE_URL}/download-report-json/${analysisId}`
  
  return axios.get(reportURL)
    .then(response => response.data)
    .catch(err => {
      console.error('Failed to fetch report:', err)
      throw err
    })
}

// Authentication APIs
export const register = (userData) => {
  return api.post('/auth/register', userData)
}

export const login = (credentials) => {
  return api.post('/auth/login', credentials)
}

export const logout = () => {
  return api.post('/auth/logout')
}

export const getCurrentUser = () => {
  return api.get('/auth/me')
}

// Set/Remove auth token in axios headers
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

export default api
