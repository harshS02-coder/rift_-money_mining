// import React, { useState } from 'react'
// import { useAuth } from '../context/AuthContext'
// import LoginForm from './LoginForm'
// import RegisterForm from './RegisterForm'
// import SearchIcon from './icons/SearchIcon'
// import ChartIcon from './icons/ChartIcon'
// import BoltIcon from './icons/BoltIcon'
// import TargetIcon from './icons/TargetIcon'
// import ShieldIcon from './icons/ShieldIcon'
// import TrendUpIcon from './icons/TrendUpIcon'

// const LandingPage = () => {
//   const [showLoginForm, setShowLoginForm] = useState(false)
//   const [showRegisterForm, setShowRegisterForm] = useState(false)
//   const { isAuthenticated } = useAuth()

//   const handleSwitchToRegister = () => {
//     console.log('Switching to register form')
//     setShowLoginForm(false)
//     setShowRegisterForm(true)
//   }

//   const handleSwitchToLogin = () => {
//     console.log('Switching to login form')
//     setShowRegisterForm(false)
//     setShowLoginForm(true)
//   }

//   const handleCloseAllForms = () => {
//     console.log('Closing all forms')
//     setShowLoginForm(false)
//     setShowRegisterForm(false)
//   }

//   const features = [
//     {
//       title: 'AI-Powered Detection',
//       description: 'Advanced machine learning algorithms analyze transaction patterns to identify sophisticated money muling schemes',
//       color: 'from-blue-500 to-blue-600'
//     },
//     {
//       title: 'Visual Network Analysis',
//       description: 'Interactive graph visualizations reveal hidden connections and suspicious transaction rings',
//       color: 'from-purple-500 to-purple-600'
//     },
//     {
//       title: 'Real-Time Insights',
//       description: 'Instant risk assessment with actionable investigation recommendations powered by GPT',
//       color: 'from-pink-500 to-pink-600'
//     },
//     {
//       title: 'Pattern Recognition',
//       description: 'Detect circular transactions, smurfing activities, and shell account operations automatically',
//       color: 'from-orange-500 to-orange-600'
//     },
//     {
//       title: 'Risk Scoring',
//       description: 'Comprehensive account risk assessment with multi-factor analysis and prioritization',
//       color: 'from-red-500 to-red-600'
//     },
//     {
//       title: 'Forensic Reports',
//       description: 'Detailed investigation summaries with evidence trails for compliance and legal proceedings',
//       color: 'from-green-500 to-green-600'
//     }
//   ]

//   const featureIcons = [SearchIcon, ChartIcon, BoltIcon, TargetIcon, ShieldIcon, TrendUpIcon]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
//       {/* Hero Section */}
//       <div className="relative overflow-hidden">
//         {/* Animated Background */}
//         <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
//         <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        
//         <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32">
//           {/* Logo/Brand */}
//           <div className="text-center mb-16 animate-fadeIn">
//             <div className="inline-block mb-6">
//               <div className="mb-4 animate-bounce flex justify-center">
//                 <SearchIcon size={80} className="text-white/90" />
//               </div>
//             </div>
//             <h1 className="text-7xl sm:text-8xl md:text-9xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text tracking-tight">
//              Money Mining
//             </h1>
//             <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-300 mb-4 tracking-wide">
//               Ring Investigation & Forensic Tracker
//             </p>
//             <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
//               The next-generation platform for detecting and investigating financial crimes through 
//               AI-powered graph analysis and behavioral pattern recognition
//             </p>
            
//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//               <button
//                 onClick={() => setShowLoginForm(true)}
//                 className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-xl shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transform hover:scale-105 transition-all duration-300 overflow-hidden"
//               >
//                 <span className="relative z-10 flex items-center gap-2">
//                   Get Started
//                   <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                   </svg>
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </button>
              
//               <button
//                 onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
//                 className="px-8 py-4 bg-white/10 backdrop-blur-md text-white text-lg font-bold rounded-xl border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transform hover:scale-105 transition-all duration-300"
//               >
//                 Learn More
//               </button>
//             </div>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
//             <div className="text-center">
//               <div className="text-4xl font-black text-blue-400 mb-2">99.8%</div>
//               <div className="text-sm text-gray-400">Accuracy</div>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl font-black text-purple-400 mb-2">&lt;1s</div>
//               <div className="text-sm text-gray-400">Analysis Time</div>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl font-black text-pink-400 mb-2">1M+</div>
//               <div className="text-sm text-gray-400">Transactions</div>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl font-black text-orange-400 mb-2">24/7</div>
//               <div className="text-sm text-gray-400">Monitoring</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div id="features" className="relative py-24 bg-gradient-to-b from-gray-900 to-slate-900">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
//               Powerful Features
//             </h2>
//             <p className="text-xl text-gray-400 max-w-2xl mx-auto">
//               Everything you need to detect, investigate, and prevent financial crimes
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="group relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/30 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 {(() => {
//                   const FeatureIcon = featureIcons[index] || SearchIcon
//                   return (
//                     <div className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
//                       <FeatureIcon size={30} className="text-white" />
//                     </div>
//                   )
//                 })()}
//                 <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-400 leading-relaxed">
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* How It Works Section */}
//       <div className="relative py-24 bg-slate-900">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
//               How It Works
//             </h2>
//             <p className="text-xl text-gray-400">Simple, fast, and powerful</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="text-center">
//               <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-blue-500/50">
//                 1
//               </div>
//               <h3 className="text-2xl font-bold mb-3 text-white">Upload Data</h3>
//               <p className="text-gray-400">Upload your CSV transaction file with just a few clicks</p>
//             </div>

//             <div className="text-center">
//               <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-purple-500/50">
//                 2
//               </div>
//               <h3 className="text-2xl font-bold mb-3 text-white">AI Analysis</h3>
//               <p className="text-gray-400">Our AI analyzes patterns, connections, and anomalies instantly</p>
//             </div>

//             <div className="text-center">
//               <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-pink-500/50">
//                 3
//               </div>
//               <h3 className="text-2xl font-bold mb-3 text-white">Take Action</h3>
//               <p className="text-gray-400">Get actionable insights and investigation recommendations</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="relative py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
//         <div className="max-w-4xl mx-auto px-6 text-center">
//           <h2 className="text-5xl font-black mb-6 text-white">
//             Ready to Fight Financial Crime?
//           </h2>
//           <p className="text-xl text-white/90 mb-8">
//             Join leading financial institutions in the battle against money laundering
//           </p>
//           <button
//             onClick={() => setShowLoginForm(true)}
//             className="px-10 py-5 bg-white text-gray-900 text-xl font-bold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl"
//           >
//             Start Your Investigation
//           </button>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="bg-black py-8 text-center text-gray-500 text-sm">
//         <p>RIFT 2026 © Powered by AI | Detecting Financial Crimes Since 2026</p>
//       </div>

//       {/* Auth Forms */}
//       {showLoginForm && (
//         <LoginForm 
//           onClose={handleCloseAllForms} 
//           onSwitchToRegister={handleSwitchToRegister}
//         />
//       )}
//       {showRegisterForm && (
//         <RegisterForm 
//           onClose={handleCloseAllForms} 
//           onSwitchToLogin={handleSwitchToLogin}
//         />
//       )}
//     </div>
//   )
// }

// export default LandingPage


// -------deepseek----

// import React, { useState } from 'react'
// import { useAuth } from '../context/AuthContext'
// import LoginForm from './LoginForm'
// import RegisterForm from './RegisterForm'
// import SearchIcon from './icons/SearchIcon'
// import ChartIcon from './icons/ChartIcon'
// import BoltIcon from './icons/BoltIcon'
// import TargetIcon from './icons/TargetIcon'
// import ShieldIcon from './icons/ShieldIcon'
// import TrendUpIcon from './icons/TrendUpIcon'

// const LandingPage = () => {
//   const [showLoginForm, setShowLoginForm] = useState(false)
//   const [showRegisterForm, setShowRegisterForm] = useState(false)
//   const { isAuthenticated } = useAuth()

//   const handleSwitchToRegister = () => {
//     console.log('Switching to register form')
//     setShowLoginForm(false)
//     setShowRegisterForm(true)
//   }

//   const handleSwitchToLogin = () => {
//     console.log('Switching to login form')
//     setShowRegisterForm(false)
//     setShowLoginForm(true)
//   }

//   const handleCloseAllForms = () => {
//     console.log('Closing all forms')
//     setShowLoginForm(false)
//     setShowRegisterForm(false)
//   }

//   const features = [
//     {
//       title: 'AI-Powered Detection',
//       description: 'Advanced machine learning algorithms analyze transaction patterns to identify sophisticated money muling schemes',
//       color: 'from-blue-500 to-cyan-500',
//       protection: 'Shield'
//     },
//     {
//       title: 'Visual Network Analysis',
//       description: 'Interactive graph visualizations reveal hidden connections and suspicious transaction rings',
//       color: 'from-purple-500 to-fuchsia-500',
//       protection: 'Lock'
//     },
//     {
//       title: 'Real-Time Insights',
//       description: 'Instant risk assessment with actionable investigation recommendations powered by GPT',
//       color: 'from-pink-500 to-rose-500',
//       protection: 'Eye'
//     },
//     {
//       title: 'Pattern Recognition',
//       description: 'Detect circular transactions, smurfing activities, and shell account operations automatically',
//       color: 'from-orange-500 to-amber-500',
//       protection: 'Fingerprint'
//     },
//     {
//       title: 'Risk Scoring',
//       description: 'Comprehensive account risk assessment with multi-factor analysis and prioritization',
//       color: 'from-red-500 to-orange-500',
//       protection: 'Chart'
//     },
//     {
//       title: 'Forensic Reports',
//       description: 'Detailed investigation summaries with evidence trails for compliance and legal proceedings',
//       color: 'from-green-500 to-emerald-500',
//       protection: 'Document'
//     }
//   ]

//   const featureIcons = [SearchIcon, ChartIcon, BoltIcon, TargetIcon, ShieldIcon, TrendUpIcon]

//   // Floating protection orbs animation
//   const ProtectionOrb = ({ color, delay, size, position }) => (
//     <div 
//       className={`absolute ${position} w-${size} h-${size} rounded-full bg-gradient-to-r ${color} opacity-20 blur-3xl animate-pulse`}
//       style={{ 
//         animationDelay: `${delay}s`,
//       }}
//     />
//   )

//   // Animated shield component
//   const AnimatedShield = ({ className }) => (
//     <svg className={`${className} animate-shield-glow`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M12 3L20 7V13C20 17.5 16.5 21 12 21C7.5 21 4 17.5 4 13V7L12 3Z" 
//         stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
//         className="animate-shield-pulse" fill="currentColor" fillOpacity="0.2"/>
//       <path d="M12 12L15 15M12 12L9 15M12 12V8" 
//         stroke="currentColor" strokeWidth="2" strokeLinecap="round"
//         className="animate-shield-scan"/>
//     </svg>
//   )

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden">
//       {/* Animated Protection Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         {/* Floating protection orbs */}
//         <ProtectionOrb color="from-blue-500 to-cyan-500" delay={0} size="96" position="top-20 left-20" />
//         <ProtectionOrb color="from-purple-500 to-fuchsia-500" delay={2} size="64" position="top-40 right-20" />
//         <ProtectionOrb color="from-pink-500 to-rose-500" delay={4} size="80" position="bottom-20 left-40" />
//         <ProtectionOrb color="from-green-500 to-emerald-500" delay={1} size="72" position="bottom-40 right-40" />
        
//         {/* Grid pattern with moving effect */}
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] animate-grid-flow" />
        
//         {/* Scanning line effect */}
//         <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-scan-line" />
        
//         {/* Protective matrix effect */}
//         <div className="absolute inset-0">
//           {[...Array(20)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent animate-matrix"
//               style={{
//                 top: `${i * 5}%`,
//                 left: '-100%',
//                 width: '100%',
//                 animationDelay: `${i * 0.2}s`,
//                 animationDuration: '3s'
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Hero Section */}
//       <div className="relative">
//         <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32">
//           {/* Logo/Brand with enhanced animation */}
//           <div className="text-center mb-16 animate-fadeIn">
//             <div className="inline-block mb-6 group">
//               <div className="relative mb-4">
//                 {/* Protective ring animation */}
//                 <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-ping opacity-20" />
//                 <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 blur-xl animate-pulse" />
//                 <div className="relative flex justify-center animate-float">
//                   <div className="relative">
//                     <SearchIcon size={80} className="text-white/90 relative z-10" />
//                     <div className="absolute -top-4 -right-4">
//                       <ShieldIcon size={24} className="text-green-400 animate-shield-rotate" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <h1 className="text-7xl sm:text-8xl md:text-9xl font-black mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 text-transparent bg-clip-text tracking-tight relative">
//               <span className="relative">
//                 RIFT
//                 <span className="absolute -top-6 -right-6 text-sm bg-gradient-to-r from-green-400 to-blue-400 text-white px-2 py-1 rounded-full animate-bounce">
//                   SECURE
//                 </span>
//               </span>
//             </h1>
            
//             <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 tracking-wide">
//               <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-emerald-300 text-transparent bg-clip-text">
//                 Financial Crime Protection & Intelligence
//               </span>
//             </p>
            
//             <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
//               Advanced AI-powered shield protecting financial institutions from money laundering, 
//               fraud, and sophisticated criminal networks in real-time
//             </p>
            
//             {/* CTA Buttons with enhanced protection theme */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//               <button
//                 onClick={() => setShowLoginForm(true)}
//                 className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 text-white text-lg font-bold rounded-xl shadow-2xl shadow-blue-500/50 hover:shadow-emerald-500/50 transform hover:scale-105 transition-all duration-300 overflow-hidden"
//               >
//                 <span className="relative z-10 flex items-center gap-2">
//                   <ShieldIcon size={20} className="animate-shield-glow" />
//                   Activate Protection
//                   <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                   </svg>
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </button>
              
//               <button
//                 onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
//                 className="group px-8 py-4 bg-white/5 backdrop-blur-md text-white text-lg font-bold rounded-xl border-2 border-blue-400/30 hover:border-cyan-400/50 transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
//               >
//                 <span className="relative z-10 flex items-center gap-2">
//                   <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//                   Explore Security Features
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
//               </button>
//             </div>
//           </div>

//           {/* Stats with protective styling */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
//             {[
//               { value: '99.8%', label: 'Detection Rate', color: 'from-blue-400 to-cyan-400' },
//               { value: '0.3s', label: 'Response Time', color: 'from-purple-400 to-fuchsia-400' },
//               { value: '$2.5B', label: 'Protected Assets', color: 'from-pink-400 to-rose-400' },
//               { value: '24/7', label: 'Active Shield', color: 'from-green-400 to-emerald-400' }
//             ].map((stat, index) => (
//               <div key={index} className="text-center group">
//                 <div className="relative inline-block">
//                   <div className={`text-4xl font-black mb-2 bg-gradient-to-r ${stat.color} text-transparent bg-clip-text`}>
//                     {stat.value}
//                   </div>
//                   <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity animate-shimmer" />
//                 </div>
//                 <div className="text-sm text-gray-400 flex items-center justify-center gap-1">
//                   <ShieldIcon size={12} className="text-green-400" />
//                   {stat.label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Features Section with Protection Theme */}
//       <div id="features" className="relative py-24 bg-gradient-to-b from-slate-950/50 to-blue-950/50 backdrop-blur-sm">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 text-transparent bg-clip-text">
//               <span className="relative">
//                 Protection Layers
//                 <span className="absolute -top-3 -right-8 text-xs bg-blue-500 px-2 py-1 rounded-full animate-pulse">
//                   ACTIVE
//                 </span>
//               </span>
//             </h2>
//             <p className="text-xl text-gray-400 max-w-2xl mx-auto">
//               Multi-layered security shield protecting your financial ecosystem
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="group relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-blue-400/20 hover:border-cyan-400/40 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 overflow-hidden"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 {/* Animated protection overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
//                 {/* Shield indicator */}
//                 <div className="absolute top-2 right-2">
//                   <div className="relative">
//                     <ShieldIcon size={16} className="text-green-400 animate-pulse" />
//                     <div className="absolute inset-0 animate-ping">
//                       <ShieldIcon size={16} className="text-green-400 opacity-20" />
//                     </div>
//                   </div>
//                 </div>

//                 {(() => {
//                   const FeatureIcon = featureIcons[index] || SearchIcon
//                   return (
//                     <div className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 relative`}>
//                       <FeatureIcon size={30} className="text-white relative z-10" />
//                       <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 animate-pulse" />
//                     </div>
//                   )
//                 })()}
//                 <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-400 leading-relaxed">
//                   {feature.description}
//                 </p>

//                 {/* Protection level indicator */}
//                 <div className="mt-4 flex items-center gap-2">
//                   <div className="h-1 flex-1 bg-gray-700 rounded-full overflow-hidden">
//                     <div className={`h-full bg-gradient-to-r ${feature.color} w-3/4 rounded-full animate-pulse`} />
//                   </div>
//                   <span className="text-xs text-gray-500">Level {index + 1}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* How It Works Section with Shield Theme */}
//       <div className="relative py-24 bg-slate-950">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 text-transparent bg-clip-text">
//               Protection Protocol
//             </h2>
//             <p className="text-xl text-gray-400">Three-step security verification process</p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               { number: '01', title: 'Data Encryption', desc: 'Secure upload with military-grade encryption', color: 'from-blue-500 to-cyan-500' },
//               { number: '02', title: 'AI Shield Analysis', desc: 'Multi-layer AI protection scanning', color: 'from-purple-500 to-fuchsia-500' },
//               { number: '03', title: 'Secure Reporting', desc: 'Protected insights with blockchain verification', color: 'from-pink-500 to-rose-500' }
//             ].map((step, index) => (
//               <div key={index} className="text-center group">
//                 <div className="relative inline-block">
//                   <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl font-black text-white shadow-2xl shadow-${step.color.split('-')[1]}-500/50 relative overflow-hidden`}>
//                     <span className="relative z-10">{step.number}</span>
//                     <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
//                     <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" />
//                   </div>
//                   <ShieldIcon size={20} className="absolute -top-2 -right-2 text-green-400 animate-bounce" />
//                 </div>
//                 <h3 className="text-2xl font-bold mb-3 text-white">{step.title}</h3>
//                 <p className="text-gray-400">{step.desc}</p>
//               </div>
//             ))}
//           </div>

//           {/* Security verification line */}
//           <div className="mt-16 flex justify-center">
//             <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-full border border-blue-400/30">
//               <ShieldIcon size={20} className="text-green-400 animate-pulse" />
//               <span className="text-sm text-gray-300">All data protected by 256-bit encryption</span>
//               <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CTA Section with Protection Theme */}
//       <div className="relative py-24 overflow-hidden">
//         {/* Animated background */}
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-600 to-emerald-600">
//           <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M30 5L55 20V40L30 55L5 40V20L30 5Z%22 stroke=%22%23ffffff%22 stroke-opacity=%220.1%22 fill=%22none%22/%3E%3C/svg%3E')] bg-[size:60px_60px] animate-pulse" />
//         </div>
        
//         <div className="relative max-w-4xl mx-auto px-6 text-center">
//           <div className="flex justify-center mb-6">
//             <div className="relative">
//               <ShieldIcon size={80} className="text-white animate-shield-glow" />
//               <div className="absolute inset-0 animate-ping">
//                 <ShieldIcon size={80} className="text-white opacity-20" />
//               </div>
//             </div>
//           </div>
          
//           <h2 className="text-5xl font-black mb-6 text-white">
//             Secure Your Financial Future
//           </h2>
//           <p className="text-xl text-white/90 mb-8">
//             Join the world's most protected financial institutions
//           </p>
//           <button
//             onClick={() => setShowLoginForm(true)}
//             className="group relative px-10 py-5 bg-white text-gray-900 text-xl font-bold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl overflow-hidden"
//           >
//             <span className="relative z-10 flex items-center gap-2">
//               <ShieldIcon size={20} />
//               Activate Protection Now
//             </span>
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity" />
//           </button>
//         </div>
//       </div>

//       {/* Footer with Security Badge */}
//       <div className="bg-black py-8">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <p className="text-gray-500 text-sm">
//               RIFT 2026 © Powered by AI Shield | Protecting Financial Systems Since 2026
//             </p>
//             <div className="flex items-center gap-3">
//               <ShieldIcon size={16} className="text-green-400" />
//               <span className="text-xs text-gray-500">PCI DSS Compliant | SOC 2 Type II | ISO 27001</span>
//               <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Auth Forms */}
//       {showLoginForm && (
//         <LoginForm 
//           onClose={handleCloseAllForms} 
//           onSwitchToRegister={handleSwitchToRegister}
//         />
//       )}
//       {showRegisterForm && (
//         <RegisterForm 
//           onClose={handleCloseAllForms} 
//           onSwitchToLogin={handleSwitchToLogin}
//         />
//       )}

//       {/* Add custom CSS for animations */}
//       <style jsx>{`
//         @keyframes scan-line {
//           0% { transform: translateY(-100%); }
//           100% { transform: translateY(100vh); }
//         }
        
//         @keyframes matrix {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(100%); }
//         }
        
//         @keyframes shield-glow {
//           0%, 100% { filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.5)); }
//           50% { filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.8)); }
//         }
        
//         @keyframes shield-pulse {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.05); }
//         }
        
//         @keyframes shield-scan {
//           0% { transform: translateY(-100%); opacity: 0; }
//           50% { transform: translateY(0); opacity: 1; }
//           100% { transform: translateY(100%); opacity: 0; }
//         }
        
//         @keyframes shield-rotate {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
        
//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }
        
//         @keyframes grid-flow {
//           0% { transform: translateY(0); }
//           100% { transform: translateY(100px); }
//         }
        
//         @keyframes shimmer {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(100%); }
//         }
        
//         .animate-scan-line {
//           animation: scan-line 4s linear infinite;
//         }
        
//         .animate-matrix {
//           animation: matrix 3s linear infinite;
//         }
        
//         .animate-shield-glow {
//           animation: shield-glow 2s ease-in-out infinite;
//         }
        
//         .animate-shield-pulse {
//           animation: shield-pulse 2s ease-in-out infinite;
//         }
        
//         .animate-shield-scan {
//           animation: shield-scan 3s ease-in-out infinite;
//         }
        
//         .animate-shield-rotate {
//           animation: shield-rotate 10s linear infinite;
//         }
        
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
        
//         .animate-grid-flow {
//           animation: grid-flow 10s linear infinite;
//         }
        
//         .animate-shimmer {
//           animation: shimmer 2s infinite;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default LandingPage


// -----claude-----

import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import SearchIcon from './icons/SearchIcon'
import ChartIcon from './icons/ChartIcon'
import BoltIcon from './icons/BoltIcon'
import TargetIcon from './icons/TargetIcon'
import ShieldIcon from './icons/ShieldIcon'
import TrendUpIcon from './icons/TrendUpIcon'

/* ─── Inline keyframes injected once ─── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Mono:wght@400;600&family=Instrument+Sans:wght@400;500;600;700&display=swap');

  :root {
    --gold: #C9A84C;
    --gold-light: #E8C97A;
    --emerald: #0D4A2E;
    --emerald-mid: #0F6B3D;
    --emerald-bright: #16A05A;
    --ink: #070D0A;
    --paper: #F5F0E8;
    --ash: #8A9490;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: var(--ink); }

  @keyframes ticker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @keyframes pulse-ring {
    0%   { transform: scale(0.8); opacity: 0.8; }
    100% { transform: scale(1.6); opacity: 0; }
  }

  @keyframes shield-float {
    0%, 100% { transform: translateY(0px) rotate(-2deg); }
    50%       { transform: translateY(-18px) rotate(2deg); }
  }

  @keyframes scan-line {
    0%   { top: 0%; opacity: 1; }
    85%  { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }

  @keyframes count-up {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes grid-fade {
    0%, 100% { opacity: 0.03; }
    50%       { opacity: 0.07; }
  }

  @keyframes border-glow {
    0%, 100% { box-shadow: 0 0 0 1px rgba(201,168,76,0.2); }
    50%       { box-shadow: 0 0 24px 2px rgba(201,168,76,0.35); }
  }

  @keyframes slide-in-left {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  @keyframes slide-in-up {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes lock-click {
    0%   { transform: rotate(0deg) scale(1); }
    25%  { transform: rotate(-8deg) scale(1.1); }
    75%  { transform: rotate(8deg) scale(1.1); }
    100% { transform: rotate(0deg) scale(1); }
  }

  @keyframes data-flow {
    0%   { opacity: 0; transform: translateY(-8px); }
    20%  { opacity: 1; }
    80%  { opacity: 1; }
    100% { opacity: 0; transform: translateY(8px); }
  }

  .animate-ticker         { animation: ticker 28s linear infinite; }
  .animate-shield-float   { animation: shield-float 5s ease-in-out infinite; }
  .animate-scan           { animation: scan-line 3s ease-in-out infinite; }
  .animate-grid           { animation: grid-fade 6s ease-in-out infinite; }
  .animate-border-glow    { animation: border-glow 3s ease-in-out infinite; }
  .animate-slide-left     { animation: slide-in-left 0.7s ease forwards; }
  .animate-slide-up       { animation: slide-in-up 0.6s ease forwards; }
  .animate-fade           { animation: fade-in 0.8s ease forwards; }
  .animate-lock           { animation: lock-click 0.4s ease; }

  .font-serif    { font-family: 'DM Serif Display', serif; }
  .font-mono     { font-family: 'IBM Plex Mono', monospace; }
  .font-sans     { font-family: 'Instrument Sans', sans-serif; }

  .glass {
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(201,168,76,0.15);
  }

  .gold-text {
    background: linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .btn-primary {
    background: linear-gradient(135deg, #C9A84C 0%, #E8C97A 60%, #C9A84C 100%);
    color: #070D0A;
    font-family: 'Instrument Sans', sans-serif;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    font-size: 0.85rem;
    padding: 16px 36px;
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .btn-primary::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.15);
    opacity: 0;
    transition: opacity 0.2s;
  }

  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(201,168,76,0.4); }
  .btn-primary:hover::after { opacity: 1; }

  .btn-ghost {
    background: transparent;
    color: #C9A84C;
    font-family: 'Instrument Sans', sans-serif;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    font-size: 0.85rem;
    padding: 15px 36px;
    border: 1px solid rgba(201,168,76,0.4);
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, transform 0.2s;
  }

  .btn-ghost:hover {
    background: rgba(201,168,76,0.08);
    border-color: rgba(201,168,76,0.8);
    transform: translateY(-2px);
  }

  .feature-card {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(201,168,76,0.12);
    transition: all 0.35s ease;
    position: relative;
    overflow: hidden;
  }

  .feature-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(201,168,76,0.06) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.35s;
  }

  .feature-card:hover {
    border-color: rgba(201,168,76,0.45);
    transform: translateY(-6px);
    box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.25);
  }

  .feature-card:hover::before { opacity: 1; }

  .stat-divider {
    width: 1px;
    background: linear-gradient(to bottom, transparent, rgba(201,168,76,0.4), transparent);
  }

  .ticker-item { color: #8A9490; font-family: 'IBM Plex Mono', monospace; font-size: 0.8rem; }
  .ticker-item span { color: #16A05A; }
  .ticker-item .neg { color: #E05252; }
`;

/* ─── Shield Protection Animation Component ─── */
const ShieldAnimation = () => {
  const [pulse, setPulse] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setPulse(p => p + 1), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{
      position: 'relative',
      width: 320,
      height: 320,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      {/* Rings */}
      {[0, 1, 2].map(i => (
        <div key={`${i}-${pulse}`} style={{
          position: 'absolute',
          width: 80 + i * 70,
          height: 80 + i * 70,
          borderRadius: '50%',
          border: `1px solid rgba(201,168,76,${0.6 - i * 0.18})`,
          animation: `pulse-ring 2.2s ${i * 0.4}s ease-out forwards`,
        }} />
      ))}

      {/* Orbit dots */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 6, height: 6,
          borderRadius: '50%',
          background: '#C9A84C',
          transform: `rotate(${deg}deg) translateX(120px)`,
          opacity: 0.6,
          boxShadow: '0 0 8px #C9A84C',
        }} />
      ))}

      {/* Shield body */}
      <div className="animate-shield-float" style={{
        width: 130, height: 150,
        position: 'relative',
        filter: 'drop-shadow(0 0 30px rgba(201,168,76,0.5))',
      }}>
        <svg viewBox="0 0 130 150" fill="none" xmlns="http://www.w3.org/2000/svg" width="130" height="150">
          <path
            d="M65 5L10 28V72C10 105 36 133 65 145C94 133 120 105 120 72V28L65 5Z"
            fill="url(#shieldGrad)"
            stroke="url(#shieldStroke)"
            strokeWidth="1.5"
          />
          {/* inner glow */}
          <path
            d="M65 18L22 37V72C22 99 42 123 65 133C88 123 108 99 108 72V37L65 18Z"
            fill="rgba(201,168,76,0.08)"
            stroke="rgba(201,168,76,0.25)"
            strokeWidth="1"
          />
          {/* checkmark */}
          <path
            d="M44 74L58 88L88 58"
            stroke="#C9A84C"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="shieldGrad" x1="10" y1="5" x2="120" y2="145" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0F2A1A" />
              <stop offset="100%" stopColor="#071008" />
            </linearGradient>
            <linearGradient id="shieldStroke" x1="10" y1="5" x2="120" y2="145" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E8C97A" />
              <stop offset="100%" stopColor="#C9A84C" />
            </linearGradient>
          </defs>
        </svg>

        {/* Scan line */}
        <div className="animate-scan" style={{
          position: 'absolute',
          left: 0, right: 0,
          height: 2,
          background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.8), transparent)',
          borderRadius: 2,
        }} />
      </div>

      {/* Floating data chips */}
      {[
        { label: 'TXN SECURE', x: -140, y: -40, delay: '0s' },
        { label: 'RISK: 0.02%', x: 100, y: 20, delay: '0.7s' },
        { label: 'AML CLEAR', x: -120, y: 70, delay: '1.4s' },
      ].map((chip, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(calc(-50% + ${chip.x}px), calc(-50% + ${chip.y}px))`,
          animation: `data-flow 3s ${chip.delay} ease-in-out infinite`,
          background: 'rgba(7,13,10,0.9)',
          border: '1px solid rgba(201,168,76,0.35)',
          padding: '5px 10px',
          fontSize: '0.65rem',
          fontFamily: 'IBM Plex Mono, monospace',
          color: '#C9A84C',
          letterSpacing: '0.08em',
          whiteSpace: 'nowrap',
        }}>
          {chip.label}
        </div>
      ))}
    </div>
  )
}

/* ─── Ticker Bar ─── */
const tickers = [
  { label: 'ALERT RATE', val: '0.02%', pos: true },
  { label: 'TRANSACTIONS CLEARED', val: '1.2M+', pos: true },
  { label: 'RINGS DETECTED', val: '4,812', pos: true },
  { label: 'FALSE POSITIVE RATE', val: '0.18%', pos: true },
  { label: 'REALTIME LATENCY', val: '<0.8s', pos: true },
  { label: 'COMPLIANCE SCORE', val: '99.8%', pos: true },
  { label: 'SUSPICIOUS ACCOUNTS FLAGGED', val: '12,340', pos: false },
  { label: 'FROZEN ASSETS', val: '$48.7M', pos: false },
]

const TickerBar = () => (
  <div style={{
    background: '#070D0A',
    borderTop: '1px solid rgba(201,168,76,0.2)',
    borderBottom: '1px solid rgba(201,168,76,0.2)',
    overflow: 'hidden',
    height: 40,
    display: 'flex',
    alignItems: 'center',
  }}>
    <div style={{ display: 'flex', gap: 0, width: 'max-content' }} className="animate-ticker">
      {[...tickers, ...tickers].map((t, i) => (
        <div key={i} className="ticker-item" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 32px', borderRight: '1px solid rgba(201,168,76,0.1)' }}>
          <span style={{ color: '#4A5550', textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.1em' }}>{t.label}</span>
          <span className={t.pos ? '' : 'neg'} style={{ fontWeight: 600 }}>{t.val}</span>
        </div>
      ))}
    </div>
  </div>
)

/* ─── Main Component ─── */
const LandingPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const { isAuthenticated } = useAuth()

  const handleSwitchToRegister = () => { setShowLoginForm(false); setShowRegisterForm(true) }
  const handleSwitchToLogin = () => { setShowRegisterForm(false); setShowLoginForm(true) }
  const handleCloseAllForms = () => { setShowLoginForm(false); setShowRegisterForm(false) }

  const features = [
    { title: 'AI-Powered Detection', description: 'Advanced ML algorithms identify sophisticated money muling schemes across millions of transactions in real time.', Icon: SearchIcon, accent: '#C9A84C' },
    { title: 'Graph Network Analysis', description: 'Interactive visualizations reveal hidden connections, suspicious transaction rings, and layering operations.', Icon: ChartIcon, accent: '#16A05A' },
    { title: 'Real-Time Insights', description: 'Instant risk assessment with GPT-powered investigation recommendations and evidence chains.', Icon: BoltIcon, accent: '#C9A84C' },
    { title: 'Pattern Recognition', description: 'Auto-detect circular transactions, smurfing, shell account activity, and structuring across your dataset.', Icon: TargetIcon, accent: '#16A05A' },
    { title: 'Risk Scoring Engine', description: 'Multi-factor account risk assessment with dynamic thresholds and compliance-grade prioritization.', Icon: ShieldIcon, accent: '#C9A84C' },
    { title: 'Forensic Reports', description: 'Court-ready investigation summaries with full evidence trails for compliance, legal, and regulatory review.', Icon: TrendUpIcon, accent: '#16A05A' },
  ]

  return (
    <>
      <style>{CSS}</style>
      <div className="font-sans" style={{ background: 'var(--ink)', color: '#E8E3D8', minHeight: '100vh' }}>

        {/* ── Nav ── */}
        <nav style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '0 48px',
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(7,13,10,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(201,168,76,0.15)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32,
              background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg viewBox="0 0 20 20" width="16" height="16" fill="none">
                <path d="M10 2L3 5.5V10C3 14 6.2 17.5 10 19C13.8 17.5 17 14 17 10V5.5L10 2Z" fill="#070D0A" />
                <path d="M7 10L9 12L13 8" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-mono" style={{ color: '#C9A84C', fontSize: '0.95rem', letterSpacing: '0.12em', fontWeight: 600 }}>MONEY MINING</span>
            <span style={{ color: 'rgba(201,168,76,0.3)', margin: '0 4px' }}>|</span>
            <span className="font-mono" style={{ color: '#4A5550', fontSize: '0.68rem', letterSpacing: '0.1em' }}>FORENSIC TRACKER</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-ghost" style={{ padding: '9px 20px', fontSize: '0.75rem' }} onClick={() => setShowLoginForm(true)}>Sign In</button>
            <button className="btn-primary" style={{ padding: '9px 20px', fontSize: '0.75rem' }} onClick={() => setShowRegisterForm(true)}>Start Free</button>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section style={{
          minHeight: '100vh',
          padding: '120px 48px 80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background grid */}
          <div className="animate-grid" style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(rgba(201,168,76,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,168,76,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }} />

          {/* Emerald radial glow */}
          <div style={{
            position: 'absolute', top: '20%', right: '10%',
            width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(15,107,61,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: '10%', left: '5%',
            width: 350, height: 350, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Content */}
          <div style={{
            maxWidth: 1300, width: '100%', margin: '0 auto',
            display: 'flex', alignItems: 'center', gap: 80,
            flexWrap: 'wrap', justifyContent: 'space-between',
          }}>
            {/* Left copy */}
            <div style={{ flex: '1 1 480px', maxWidth: 600 }}>
              <div className="animate-fade" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(201,168,76,0.08)',
                border: '1px solid rgba(201,168,76,0.25)',
                padding: '6px 14px',
                marginBottom: 28,
                fontSize: '0.72rem',
                fontFamily: 'IBM Plex Mono, monospace',
                color: '#C9A84C',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16A05A', boxShadow: '0 0 8px #16A05A', display: 'inline-block' }} />
                System Active · AML Engine v3.1
              </div>

              <h1 className="animate-slide-left font-serif" style={{
                fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
                lineHeight: 1.05,
                marginBottom: 24,
                animationDelay: '0.1s',
                opacity: 0,
                animationFillMode: 'forwards',
              }}>
                <span className="gold-text">Money Mule</span>
                <br />Ring Investigation
                <br /><span style={{ color: '#8A9490', fontStyle: 'italic' }}>& Forensic Tracker</span>
              </h1>

              <p className="animate-slide-up" style={{
                color: '#8A9490',
                fontSize: '1.05rem',
                lineHeight: 1.75,
                marginBottom: 40,
                maxWidth: 480,
                animationDelay: '0.3s',
                opacity: 0,
                animationFillMode: 'forwards',
                fontFamily: 'Instrument Sans, sans-serif',
              }}>
                The institutional-grade platform for detecting and dismantling financial crime rings through AI-powered graph analysis, behavioral pattern recognition, and real-time risk scoring.
              </p>

              <div className="animate-slide-up" style={{
                display: 'flex', gap: 12, flexWrap: 'wrap',
                animationDelay: '0.45s',
                opacity: 0,
                animationFillMode: 'forwards',
              }}>
                <button className="btn-primary" onClick={() => setShowLoginForm(true)}>
                  Begin Investigation →
                </button>
                <button className="btn-ghost" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                  View Capabilities
                </button>
              </div>

              {/* Trust badges */}
              <div className="animate-fade" style={{
                display: 'flex', gap: 24, marginTop: 48, flexWrap: 'wrap',
                animationDelay: '0.6s', opacity: 0, animationFillMode: 'forwards',
              }}>
                {['SOC 2 Compliant', 'AML Certified', 'GDPR Ready'].map(badge => (
                  <div key={badge} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    color: '#4A5550', fontSize: '0.75rem',
                    fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.08em',
                  }}>
                    <svg viewBox="0 0 10 10" width="10" height="10" fill="none">
                      <circle cx="5" cy="5" r="4.5" stroke="#C9A84C" strokeOpacity="0.4" />
                      <path d="M3 5L4.3 6.3L7 3.7" stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    {badge}
                  </div>
                ))}
              </div>
            </div>

            {/* Right shield animation */}
            <div style={{ flex: '1 1 320px', display: 'flex', justifyContent: 'center' }}>
              <ShieldAnimation />
            </div>
          </div>
        </section>

        {/* ── Ticker ── */}
        <TickerBar />

        {/* ── Stats ── */}
        <section style={{
          padding: '80px 48px',
          background: 'linear-gradient(180deg, rgba(13,74,46,0.12) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(201,168,76,0.1)',
        }}>
          <div style={{
            maxWidth: 1100, margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 0,
          }}>
            {[
              { val: '99.8%', label: 'Detection Accuracy', sub: 'ML-verified' },
              { val: '<0.8s', label: 'Analysis Time', sub: 'Per transaction' },
              { val: '1M+', label: 'Transactions Cleared', sub: 'Monthly average' },
              { val: '4,812', label: 'Rings Dismantled', sub: 'Since 2026' },
            ].map((stat, i) => (
              <div key={i} style={{
                textAlign: 'center',
                padding: '32px 24px',
                borderRight: i < 3 ? '1px solid rgba(201,168,76,0.12)' : 'none',
                position: 'relative',
              }}>
                <div className="font-serif gold-text" style={{ fontSize: '3.2rem', lineHeight: 1, marginBottom: 8 }}>
                  {stat.val}
                </div>
                <div style={{ color: '#E8E3D8', fontSize: '0.85rem', fontWeight: 600, marginBottom: 4, letterSpacing: '0.05em' }}>{stat.label}</div>
                <div className="font-mono" style={{ color: '#4A5550', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Features ── */}
        <section id="features" style={{ padding: '100px 48px', background: 'var(--ink)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ marginBottom: 64 }}>
              <div className="font-mono" style={{ color: '#C9A84C', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 16 }}>
                Capabilities
              </div>
              <h2 className="font-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1, maxWidth: 540 }}>
                Built for <span className="gold-text">serious</span> financial crime investigators
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 2,
            }}>
              {features.map(({ title, description, Icon, accent }, i) => (
                <div key={i} className="feature-card" style={{ padding: '40px 36px' }}>
                  {/* Icon */}
                  <div style={{
                    width: 48, height: 48,
                    border: `1px solid ${accent}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 24,
                    position: 'relative',
                  }}>
                    <Icon size={22} style={{ color: accent }} />
                    <div style={{
                      position: 'absolute', bottom: -1, right: -1,
                      width: 8, height: 8,
                      background: accent,
                    }} />
                  </div>

                  <h3 style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    marginBottom: 12,
                    color: '#E8E3D8',
                    letterSpacing: '0.01em',
                  }}>{title}</h3>
                  <p style={{ color: '#5A6560', fontSize: '0.9rem', lineHeight: 1.7 }}>{description}</p>

                  <div style={{
                    marginTop: 28,
                    display: 'flex', alignItems: 'center', gap: 6,
                    color: accent,
                    fontSize: '0.72rem',
                    fontFamily: 'IBM Plex Mono, monospace',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    opacity: 0.7,
                    transition: 'opacity 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
                  >
                    LEARN MORE →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section style={{
          padding: '100px 48px',
          background: 'linear-gradient(180deg, rgba(15,107,61,0.06) 0%, transparent 100%)',
          borderTop: '1px solid rgba(201,168,76,0.08)',
          borderBottom: '1px solid rgba(201,168,76,0.08)',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div className="font-mono" style={{ color: '#C9A84C', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 16, textAlign: 'center' }}>
              Workflow
            </div>
            <h2 className="font-serif" style={{ textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: 72 }}>
              Three steps to <span className="gold-text">actionable intelligence</span>
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, position: 'relative' }}>
              {/* connector line */}
              <div style={{
                position: 'absolute',
                top: 38, left: '16.66%', right: '16.66%',
                height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), rgba(201,168,76,0.4), transparent)',
              }} />

              {[
                { n: '01', title: 'Upload Transaction Data', desc: 'Drop in your CSV file from any core banking system. We handle schema detection automatically.', tag: 'Data Ingestion' },
                { n: '02', title: 'AI Graph Analysis', desc: 'Our ML engine builds a transaction network graph, scoring each node for ring participation probability.', tag: 'Pattern Engine' },
                { n: '03', title: 'Investigate & Report', desc: 'Receive ranked suspect lists, relationship maps, and court-ready forensic documentation.', tag: 'Actionable Output' },
              ].map((step, i) => (
                <div key={i} style={{ padding: '0 40px', textAlign: 'center', position: 'relative' }}>
                  <div style={{
                    width: 76, height: 76,
                    margin: '0 auto 28px',
                    border: '1px solid rgba(201,168,76,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative',
                    background: 'var(--ink)',
                    zIndex: 1,
                  }}>
                    <span className="font-serif gold-text" style={{ fontSize: '1.6rem', lineHeight: 1 }}>{step.n}</span>
                    <div style={{
                      position: 'absolute', top: -1, left: -1,
                      width: 10, height: 10,
                      background: '#C9A84C',
                    }} />
                  </div>

                  <div className="font-mono" style={{ color: '#16A05A', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
                    {step.tag}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 12, color: '#E8E3D8' }}>{step.title}</h3>
                  <p style={{ color: '#5A6560', fontSize: '0.88rem', lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{
          padding: '120px 48px',
          background: 'var(--ink)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* background ornament */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(15,107,61,0.1) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            border: '1px solid transparent',
            backgroundClip: 'padding-box',
          }} />

          <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            <div className="font-mono" style={{ color: '#C9A84C', fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 20 }}>
              Get Started Today
            </div>
            <h2 className="font-serif" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', marginBottom: 20, lineHeight: 1.1 }}>
              Ready to <span className="gold-text">fight</span> financial crime?
            </h2>
            <p style={{ color: '#5A6560', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 48 }}>
              Join leading financial institutions and law enforcement agencies in the battle against money laundering and organised crime.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => setShowLoginForm(true)}>
                Start Your Investigation →
              </button>
              <button className="btn-ghost" onClick={() => setShowRegisterForm(true)}>
                Create Account
              </button>
            </div>

            <div className="font-mono" style={{ color: '#2A3530', fontSize: '0.68rem', marginTop: 36, letterSpacing: '0.1em' }}>
              NO CREDIT CARD REQUIRED · INSTANT ACCESS · SOC 2 COMPLIANT
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer style={{
          padding: '24px 48px',
          borderTop: '1px solid rgba(201,168,76,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 20, height: 20,
              background: 'linear-gradient(135deg, #C9A84C, #E8C97A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg viewBox="0 0 20 20" width="12" height="12" fill="none">
                <path d="M10 2L3 5.5V10C3 14 6.2 17.5 10 19C13.8 17.5 17 14 17 10V5.5L10 2Z" fill="#070D0A" />
                <path d="M7 10L9 12L13 8" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-mono" style={{ color: '#C9A84C', fontSize: '0.8rem', letterSpacing: '0.12em' }}>RIFT</span>
            <span className="font-mono" style={{ color: '#2A3530', fontSize: '0.7rem' }}>© 2026 · Powered by AI</span>
          </div>
          <div className="font-mono" style={{ color: '#2A3530', fontSize: '0.68rem', letterSpacing: '0.08em' }}>
            DETECTING FINANCIAL CRIMES SINCE 2026
          </div>
        </footer>

        {/* Auth Forms */}
        {showLoginForm && (
          <LoginForm onClose={handleCloseAllForms} onSwitchToRegister={handleSwitchToRegister} />
        )}
        {showRegisterForm && (
          <RegisterForm onClose={handleCloseAllForms} onSwitchToLogin={handleSwitchToLogin} />
        )}
      </div>
    </>
  )
}

export default LandingPage