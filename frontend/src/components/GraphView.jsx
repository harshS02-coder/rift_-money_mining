// import React, { useState, useEffect, useRef } from 'react'
// import * as d3 from 'd3'

// const GraphView = ({ data, onAccountClick }) => {
//   const containerRef = useRef(null)
//   const svgRef = useRef(null)
//   const gRef = useRef(null)
//   const [hoveredNode, setHoveredNode] = useState(null)
//   const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

//   const scroll = (direction, distance = 50) => {
//     if (!gRef.current) return

//     const g = d3.select(gRef.current)
//     const currentTransform = d3.zoomTransform(d3.select(svgRef.current).node())

//     let newTransform = currentTransform
//     switch (direction) {
//       case 'up':
//         newTransform = currentTransform.translate(0, distance)
//         break
//       case 'down':
//         newTransform = currentTransform.translate(0, -distance)
//         break
//       case 'left':
//         newTransform = currentTransform.translate(distance, 0)
//         break
//       case 'right':
//         newTransform = currentTransform.translate(-distance, 0)
//         break
//       default:
//         break
//     }

//     d3.select(svgRef.current)
//       .transition()
//       .duration(300)
//       .call(
//         d3.zoom().transform,
//         newTransform
//       )
//   }

//   const resetView = () => {
//     if (!svgRef.current) return
//     d3.select(svgRef.current)
//       .transition()
//       .duration(500)
//       .call(d3.zoom().transform, d3.zoomIdentity)
//   }

//   useEffect(() => {
//     if (!data || !containerRef.current) return

//     // Prepare graph data from rings and account scores
//     const nodes = []
//     const links = []
//     const nodeSet = new Set()

//     // Add ALL accounts as nodes from account_scores
//     if (data.account_scores && data.account_scores.length > 0) {
//       data.account_scores.forEach((scoreData) => {
//         if (!nodeSet.has(scoreData.account_id)) {
//           nodes.push({
//             id: scoreData.account_id,
//             group: scoreData.risk_level || 'LOW',
//             score: scoreData.final_score || 0,
//           })
//           nodeSet.add(scoreData.account_id)
//         }
//       })
//     }

//     // Extract links from rings
//     if (data.rings_detected && data.rings_detected.length > 0) {
//       data.rings_detected.forEach((ring) => {
//         // Create links for the ring
//         for (let i = 0; i < ring.accounts.length; i++) {
//           const source = ring.accounts[i]
//           const target = ring.accounts[(i + 1) % ring.accounts.length]
//           links.push({
//             source,
//             target,
//             value: ring.total_amount,
//             ringId: ring.ring_id,
//           })
//         }
//       })
//     }

//     if (nodes.length === 0) {
//       // Show message if no graph data
//       d3.select(svgRef.current).selectAll('*').remove()
//       d3.select(svgRef.current)
//         .append('text')
//         .attr('x', '50%')
//         .attr('y', '50%')
//         .attr('text-anchor', 'middle')
//         .style('fill', '#999')
//         .text('No transactions or patterns detected')
//       return
//     }

//     const width = containerRef.current.clientWidth
//     const height = containerRef.current.clientHeight

//     // Clear previous SVG
//     d3.select(svgRef.current).selectAll('*').remove()

//     // Create SVG
//     const svg = d3
//       .select(svgRef.current)
//       .attr('width', width)
//       .attr('height', height)

//     // Add gradient definitions for beautiful node effects
//     const defs = svg.append('defs')
    
//     // Critical gradient (red)
//     const criticalGradient = defs.append('radialGradient')
//       .attr('id', 'criticalGradient')
//     criticalGradient.append('stop').attr('offset', '0%').attr('stop-color', '#ff6b6b')
//     criticalGradient.append('stop').attr('offset', '100%').attr('stop-color', '#d32f2f')
    
//     // High gradient (orange)
//     const highGradient = defs.append('radialGradient')
//       .attr('id', 'highGradient')
//     highGradient.append('stop').attr('offset', '0%').attr('stop-color', '#ffa726')
//     highGradient.append('stop').attr('offset', '100%').attr('stop-color', '#f57c00')
    
//     // Medium gradient (yellow)
//     const mediumGradient = defs.append('radialGradient')
//       .attr('id', 'mediumGradient')
//     mediumGradient.append('stop').attr('offset', '0%').attr('stop-color', '#ffeb3b')
//     mediumGradient.append('stop').attr('offset', '100%').attr('stop-color', '#fbc02d')
    
//     // Low gradient (green)
//     const lowGradient = defs.append('radialGradient')
//       .attr('id', 'lowGradient')
//     lowGradient.append('stop').attr('offset', '0%').attr('stop-color', '#66bb6a')
//     lowGradient.append('stop').attr('offset', '100%').attr('stop-color', '#388e3c')
    
//     // Add drop shadow filter
//     const filter = defs.append('filter')
//       .attr('id', 'drop-shadow')
//       .attr('height', '150%')
//     filter.append('feGaussianBlur')
//       .attr('in', 'SourceAlpha')
//       .attr('stdDeviation', 3)
//     filter.append('feOffset')
//       .attr('dx', 2)
//       .attr('dy', 2)
//       .attr('result', 'offsetblur')
//     const feMerge = filter.append('feMerge')
//     feMerge.append('feMergeNode')
//     feMerge.append('feMergeNode')
//       .attr('in', 'SourceGraphic')

//     // Create main group for zoom/pan
//     const g = svg.append('g').attr('class', 'graph-group')
//     gRef.current = g.node()

//     // Create force simulation with optimized parameters
//     const simulation = d3
//       .forceSimulation(nodes)
//       .force('link', d3.forceLink(links).id((d) => d.id).distance(80))
//       .force('charge', d3.forceManyBody().strength(-200))
//       .force('center', d3.forceCenter(width / 2, height / 2))
//       .force('collide', d3.forceCollide().radius(50))

//     // Create links with enhanced styling and better visibility
//     const link = g
//       .append('g')
//       .attr('class', 'links')
//       .selectAll('line')
//       .data(links)
//       .join('line')
//       .attr('stroke', (d) => {
//         // Color based on transaction amount
//         const amount = d.value
//         if (amount > 40000) return '#d32f2f' // High amount - red
//         if (amount > 20000) return '#f57c00' // Medium-high - orange  
//         if (amount > 10000) return '#1976d2' // Medium - blue
//         return '#607d8b' // Low - gray
//       })
//       .attr('stroke-opacity', 0.7)
//       .attr('stroke-width', (d) => {
//         // Width based on transaction amount (more prominent)
//         const baseWidth = Math.sqrt(d.value / 10000)
//         return Math.max(3, Math.min(baseWidth, 10))
//       })
//       .attr('stroke-linecap', 'round')
//       .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))')
//       .style('cursor', 'pointer')

//     // Add edge labels showing transaction amounts
//     const edgeLabels = g
//       .append('g')
//       .attr('class', 'edge-labels')
//       .selectAll('text')
//       .data(links)
//       .join('text')
//       .attr('font-size', '10px')
//       .attr('text-anchor', 'middle')
//       .attr('dy', -5)
//       .style('fill', '#1a1a1a')
//       .style('font-weight', '700')
//       .style('pointer-events', 'none')
//       .style('text-shadow', '0 0 3px rgba(255,255,255,0.95), 0 0 2px rgba(255,255,255,0.95)')
//       .text((d) => {
//         // Format amount with K for thousands
//         const amount = d.value
//         if (amount >= 1000) {
//           return `$${(amount / 1000).toFixed(1)}K`
//         }
//         return `$${amount.toFixed(0)}`
//       })

//     // Create nodes
//     const node = g
//       .append('g')
//       .selectAll('circle')
//       .data(nodes)
//       .join('circle')
//       .attr('r', (d) => {
//         switch (d.group) {
//           case 'CRITICAL':
//             return 30
//           case 'HIGH':
//             return 24
//           case 'MEDIUM':
//             return 18
//           case 'LOW':
//             return 12
//           default:
//             return 15
//         }
//       })
//       .attr('fill', (d) => {
//         switch (d.group) {
//           case 'CRITICAL':
//             return 'url(#criticalGradient)'
//           case 'HIGH':
//             return 'url(#highGradient)'
//           case 'MEDIUM':
//             return 'url(#mediumGradient)'
//           case 'LOW':
//             return 'url(#lowGradient)'
//           default:
//             return 'url(#mediumGradient)'
//         }
//       })
//       .attr('stroke', '#fff')
//       .attr('stroke-width', 3)
//       .style('cursor', 'pointer')
//       .style('filter', 'url(#drop-shadow)')
//       .on('click', (event, d) => {
//         event.stopPropagation()
//         onAccountClick?.(d.id)
//       })
//       .on('mouseenter', function (event, d) {
//         d3.select(this).transition().duration(200).attr('r', (d) => {
//           switch (d.group) {
//             case 'CRITICAL':
//               return 38
//             case 'HIGH':
//               return 30
//             case 'MEDIUM':
//               return 22
//             case 'LOW':
//               return 16
//             default:
//               return 20
//           }
//         })
        
//         // Show tooltip with account details
//         setHoveredNode(d)
//         const rect = svgRef.current.getBoundingClientRect()
//         setTooltipPos({
//           x: event.clientX - rect.left + 10,
//           y: event.clientY - rect.top + 10,
//         })
//       })
//       .on('mouseleave', function () {
//         d3.select(this).transition().duration(200).attr('r', (d) => {
//           switch (d.group) {
//             case 'CRITICAL':
//               return 30
//             case 'HIGH':
//               return 24
//             case 'MEDIUM':
//               return 18
//             case 'LOW':
//               return 12
//             default:
//               return 15
//           }
//         })
        
//         // Hide tooltip
//         setHoveredNode(null)
//       })

//     // Create labels with better visibility - BLACK TEXT
//     const labels = g
//       .append('g')
//       .selectAll('text')
//       .data(nodes)
//       .join('text')
//       .attr('font-size', '11px')
//       .attr('text-anchor', 'middle')
//       .attr('dy', '0.35em')
//       .text((d) => d.id.substring(0, 8))
//       .style('pointer-events', 'none')
//       .style('fill', '#000')
//       .style('font-weight', '700')
//       .style('text-shadow', '0 0 3px rgba(255,255,255,0.9), 0 0 3px rgba(255,255,255,0.9), 0 0 5px rgba(255,255,255,0.8)')

//     // Add beautiful legend with background
//     const legendBg = svg.append('rect')
//       .attr('x', width - 195)
//       .attr('y', 10)
//       .attr('width', 185)
//       .attr('height', 125)
//       .attr('rx', 8)
//       .attr('fill', 'rgba(255, 255, 255, 0.95)')
//       .attr('stroke', '#e0e0e0')
//       .attr('stroke-width', 2)
//       .style('filter', 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))')

//     const legend = svg
//       .append('g')
//       .attr('class', 'legend')
//       .attr('transform', `translate(${width - 180}, 25)`)

//     // Legend title
//     legend.append('text')
//       .attr('x', 0)
//       .attr('y', 0)
//       .style('font-size', '13px')
//       .style('font-weight', 'bold')
//       .style('fill', '#333')
//       .text('Risk Levels')

//     const riskLevels = [
//       { level: 'CRITICAL', color: '#d32f2f' },
//       { level: 'HIGH', color: '#f57c00' },
//       { level: 'MEDIUM', color: '#fbc02d' },
//       { level: 'LOW', color: '#388e3c' },
//     ]

//     riskLevels.forEach((risk, i) => {
//       const item = legend.append('g').attr('transform', `translate(0, ${i * 25 + 20})`)

//       item
//         .append('circle')
//         .attr('r', 8)
//         .attr('fill', risk.color)
//         .attr('stroke', '#fff')
//         .attr('stroke-width', 2)
//         .style('filter', 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))')

//       item
//         .append('text')
//         .attr('x', 20)
//         .attr('dy', '0.35em')
//         .style('font-size', '12px')
//         .style('font-weight', '600')
//         .style('fill', '#333')
//         .text(risk.level)
//     })

//     // Add zoom functionality
//     const zoom = d3
//       .zoom()
//       .scaleExtent([0.5, 8])
//       .on('zoom', (event) => {
//         g.attr('transform', event.transform)
//       })

//     svg.call(zoom)

//     // Update positions on tick
//     simulation.on('tick', () => {
//       link
//         .attr('x1', (d) => d.source.x)
//         .attr('y1', (d) => d.source.y)
//         .attr('x2', (d) => d.target.x)
//         .attr('y2', (d) => d.target.y)

//       // Update edge labels to be positioned at the midpoint of edges
//       edgeLabels
//         .attr('x', (d) => (d.source.x + d.target.x) / 2)
//         .attr('y', (d) => (d.source.y + d.target.y) / 2)

//       node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)

//       labels.attr('x', (d) => d.x).attr('y', (d) => d.y)
//     })
//   }, [data, onAccountClick])

//   return (
//     <div className="w-full h-full min-h-[500px] max-h-[600px] bg-white/70 backdrop-blur-lg rounded-2xl overflow-hidden relative shadow-xl border border-gray-200/60" ref={containerRef}>
//       <svg ref={svgRef} className="w-full h-full"></svg>

//       {/* Enhanced Scroll Controls with gradient background */}
//       <div className="absolute bottom-5 left-5 flex flex-col gap-2 z-10 bg-white/80 backdrop-blur p-4 rounded-2xl shadow-2xl border border-gray-200/70">
//         {/* Up Button */}
//         <button
//           className="w-10 h-10 border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-white text-blue-600 rounded-lg cursor-pointer text-base font-extrabold flex items-center justify-center transition-all duration-300 hover:from-blue-600 hover:to-blue-500 hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-blue-400/50 active:scale-95 hover:rotate-6"
//           onClick={() => scroll('up')}
//           title="Scroll Up"
//         >
//           ▲
//         </button>

//         {/* Left, Center, Right Buttons */}
//         <div className="flex gap-2 justify-center">
//           <button
//             className="w-10 h-10 border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-white text-blue-600 rounded-lg cursor-pointer text-base font-extrabold flex items-center justify-center transition-all duration-300 hover:from-blue-600 hover:to-blue-500 hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-blue-400/50 active:scale-95 hover:-rotate-6"
//             onClick={() => scroll('left')}
//             title="Scroll Left"
//           >
//             ◄
//           </button>
//           <button
//             className="min-w-[65px] h-10 bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-600 text-green-700 rounded-lg cursor-pointer text-sm font-extrabold flex items-center justify-center transition-all duration-300 hover:from-green-600 hover:to-green-500 hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-green-400/50 active:scale-95"
//             onClick={resetView}
//             title="Reset View"
//           >
//             ⊙
//           </button>
//           <button
//             className="w-10 h-10 border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-white text-blue-600 rounded-lg cursor-pointer text-base font-extrabold flex items-center justify-center transition-all duration-300 hover:from-blue-600 hover:to-blue-500 hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-blue-400/50 active:scale-95 hover:rotate-6"
//             onClick={() => scroll('right')}
//             title="Scroll Right"
//           >
//             ►
//           </button>
//         </div>

//         {/* Down Button */}
//         <button
//           className="w-10 h-10 border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-white text-blue-600 rounded-lg cursor-pointer text-base font-extrabold flex items-center justify-center transition-all duration-300 hover:from-blue-600 hover:to-blue-500 hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-blue-400/50 active:scale-95 hover:-rotate-6"
//           onClick={() => scroll('down')}
//           title="Scroll Down"
//         >
//           ▼
//         </button>
//       </div>

//       {/* Enhanced tooltip for account details on hover */}
//       {hoveredNode && (
//         <div
//           className="absolute bg-white/90 backdrop-blur rounded-2xl shadow-2xl p-4 z-20 pointer-events-none max-w-[280px] border border-blue-200 animate-[tooltipFadeIn_0.2s_ease-out]"
//           style={{
//             left: `${tooltipPos.x}px`,
//             top: `${tooltipPos.y}px`,
//           }}
//         >
//           <div className="flex items-center gap-2.5 mb-3 flex-wrap">
//             <div className={`text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap uppercase shadow-md ${
//               hoveredNode.group === 'CRITICAL' ? 'bg-gradient-to-r from-red-600 to-red-500 text-white' :
//               hoveredNode.group === 'HIGH' ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white' :
//               hoveredNode.group === 'MEDIUM' ? 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900' :
//               'bg-gradient-to-r from-green-700 to-green-600 text-white'
//             }`}>
//               {hoveredNode.group}
//             </div>
//             <div className="text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent break-words">{hoveredNode.id}</div>
//           </div>
//           <div className="border-t-2 border-gray-200 pt-3">
//             <div className="flex justify-between items-center gap-3 text-xs">
//               <span className="text-gray-600 font-semibold">Risk Score:</span>
//               <span className="text-gray-900 font-extrabold text-base">{hoveredNode.score.toFixed(1)}/100</span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default GraphView

// claude ---
import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Instrument+Sans:wght@400;600;700&display=swap');

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; box-shadow: 0 0 6px currentColor; }
    50%       { opacity: 0.4; box-shadow: none; }
  }

  @keyframes tooltip-in {
    from { opacity: 0; transform: translateY(6px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes border-glow {
    0%, 100% { box-shadow: 0 0 0 1px rgba(201,168,76,0.18); }
    50%       { box-shadow: 0 0 24px 2px rgba(201,168,76,0.22); }
  }

  @keyframes scan-h {
    0%   { left: -100%; }
    100% { left: 100%; }
  }

  .gv-wrap {
    width: 100%;
    height: 100%;
    min-height: 520px;
    max-height: 620px;
    background: #070D0A;
    border: 1px solid rgba(201,168,76,0.18);
    position: relative;
    overflow: hidden;
    animation: border-glow 5s ease-in-out infinite;
  }

  /* subtle dot-grid bg */
  .gv-wrap::before {
    content: '';
    position: absolute; inset: 0;
    background-image: radial-gradient(rgba(201,168,76,0.08) 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none;
    z-index: 0;
  }

  .gv-svg { width: 100%; height: 100%; position: relative; z-index: 1; }

  /* ── Nav controls ── */
  .gv-controls {
    position: absolute;
    bottom: 16px; left: 16px;
    z-index: 10;
    display: flex; flex-direction: column; gap: 4px;
    background: rgba(7,13,10,0.92);
    border: 1px solid rgba(201,168,76,0.2);
    padding: 10px;
    backdrop-filter: blur(12px);
  }

  .gv-controls-row {
    display: flex; gap: 4px; justify-content: center;
  }

  .ctrl-btn {
    width: 32px; height: 32px;
    background: rgba(201,168,76,0.06);
    border: 1px solid rgba(201,168,76,0.22);
    color: #C9A84C;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    font-size: 0.65rem;
    transition: background 0.15s, border-color 0.15s, transform 0.1s;
    font-family: 'IBM Plex Mono', monospace;
    position: relative;
  }

  .ctrl-btn:hover {
    background: rgba(201,168,76,0.15);
    border-color: rgba(201,168,76,0.55);
    transform: scale(1.08);
  }
  .ctrl-btn:active { transform: scale(0.95); }

  .ctrl-btn-reset {
    width: 72px; height: 32px;
    background: rgba(22,160,90,0.08);
    border: 1px solid rgba(22,160,90,0.3);
    color: #16A05A;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    font-size: 0.58rem;
    font-family: 'IBM Plex Mono', monospace;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: background 0.15s, border-color 0.15s;
  }
  .ctrl-btn-reset:hover {
    background: rgba(22,160,90,0.18);
    border-color: rgba(22,160,90,0.6);
  }

  /* ── Tooltip ── */
  .gv-tooltip {
    position: absolute;
    background: rgba(7,13,10,0.97);
    border: 1px solid rgba(201,168,76,0.3);
    padding: 14px 16px;
    z-index: 20;
    pointer-events: none;
    max-width: 240px;
    animation: tooltip-in 0.18s ease forwards;
    backdrop-filter: blur(12px);
  }

  .gv-tooltip::before {
    content: '';
    position: absolute; top: -1px; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent);
  }

  /* ── Legend ── */
  .gv-legend {
    position: absolute;
    top: 14px; right: 14px;
    background: rgba(7,13,10,0.92);
    border: 1px solid rgba(201,168,76,0.2);
    padding: 12px 14px;
    z-index: 10;
    backdrop-filter: blur(12px);
  }

  .gv-legend::before {
    content: '';
    position: absolute; top: -1px; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent);
  }

  /* ── Scan line overlay ── */
  .gv-scanline {
    position: absolute; top: 0; bottom: 0;
    width: 80px;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.04), transparent);
    animation: scan-h 8s linear infinite;
    pointer-events: none; z-index: 2;
  }
`

/* ── RIFT colour scheme for risk ── */
const RISK_COLORS = {
  CRITICAL: { fill: '#F87171', stroke: 'rgba(248,113,113,0.5)', glow: '#F87171', label: '#F87171' },
  HIGH:     { fill: '#FB923C', stroke: 'rgba(251,146,60,0.5)',  glow: '#FB923C', label: '#FB923C' },
  MEDIUM:   { fill: '#C9A84C', stroke: 'rgba(201,168,76,0.5)',  glow: '#C9A84C', label: '#C9A84C' },
  LOW:      { fill: '#16A05A', stroke: 'rgba(22,160,90,0.5)',   glow: '#16A05A', label: '#16A05A' },
}
const getRiskColor = (group) => RISK_COLORS[group] || RISK_COLORS.LOW

const LEGEND_ITEMS = [
  { level: 'CRITICAL', ...RISK_COLORS.CRITICAL },
  { level: 'HIGH',     ...RISK_COLORS.HIGH },
  { level: 'MEDIUM',   ...RISK_COLORS.MEDIUM },
  { level: 'LOW',      ...RISK_COLORS.LOW },
]

const NODE_RADIUS = { CRITICAL: 28, HIGH: 22, MEDIUM: 16, LOW: 11, default: 14 }
const getR  = (group) => NODE_RADIUS[group] || NODE_RADIUS.default
const getR2 = (group) => Math.round(getR(group) * 1.3)

const GraphView = ({ data, onAccountClick }) => {
  const containerRef = useRef(null)
  const svgRef       = useRef(null)
  const gRef         = useRef(null)
  const zoomRef      = useRef(null)

  const [hoveredNode, setHoveredNode] = useState(null)
  const [tooltipPos,  setTooltipPos]  = useState({ x: 0, y: 0 })

  /* ── Pan helpers ── */
  const pan = (direction, dist = 60) => {
    if (!svgRef.current || !zoomRef.current) return
    const svg = d3.select(svgRef.current)
    const t = d3.zoomTransform(svg.node())
    const deltas = { up: [0, dist], down: [0, -dist], left: [dist, 0], right: [-dist, 0] }
    const [dx, dy] = deltas[direction] || [0, 0]
    svg.transition().duration(280).call(zoomRef.current.transform, t.translate(dx, dy))
  }

  const resetView = () => {
    if (!svgRef.current || !zoomRef.current) return
    d3.select(svgRef.current).transition().duration(480).call(zoomRef.current.transform, d3.zoomIdentity)
  }

  /* ── Build D3 graph ── */
  useEffect(() => {
    if (!data || !containerRef.current) return

    const nodes = []
    const links = []
    const nodeSet = new Set()

    if (data.account_scores?.length) {
      data.account_scores.forEach(s => {
        if (!nodeSet.has(s.account_id)) {
          nodes.push({ id: s.account_id, group: s.risk_level || 'LOW', score: s.final_score || 0 })
          nodeSet.add(s.account_id)
        }
      })
    }

    if (data.rings_detected?.length) {
      data.rings_detected.forEach(ring => {
        for (let i = 0; i < ring.accounts.length; i++) {
          links.push({
            source: ring.accounts[i],
            target: ring.accounts[(i + 1) % ring.accounts.length],
            value:  ring.total_amount,
            ringId: ring.ring_id,
          })
        }
      })
    }

    const width  = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight

    const svg = d3.select(svgRef.current).attr('width', width).attr('height', height)
    svg.selectAll('*').remove()

    if (nodes.length === 0) {
      svg.append('text')
        .attr('x', '50%').attr('y', '50%')
        .attr('text-anchor', 'middle')
        .style('fill', '#2A3530')
        .style('font-family', 'IBM Plex Mono, monospace')
        .style('font-size', '0.75rem')
        .style('letter-spacing', '0.1em')
        .text('NO TRANSACTIONS OR PATTERNS DETECTED')
      return
    }

    const defs = svg.append('defs')

    /* Glow filters per risk level */
    Object.entries(RISK_COLORS).forEach(([level, c]) => {
      const f = defs.append('filter').attr('id', `glow-${level}`).attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%')
      f.append('feGaussianBlur').attr('in', 'SourceGraphic').attr('stdDeviation', 4).attr('result', 'blur')
      const merge = f.append('feMerge')
      merge.append('feMergeNode').attr('in', 'blur')
      merge.append('feMergeNode').attr('in', 'SourceGraphic')
    })

    /* Link color by amount */
    const linkColor = (val) => {
      if (val > 40000) return 'rgba(248,113,113,0.55)'
      if (val > 20000) return 'rgba(251,146,60,0.5)'
      if (val > 10000) return 'rgba(201,168,76,0.45)'
      return 'rgba(22,160,90,0.3)'
    }

    const g = svg.append('g').attr('class', 'graph-group')
    gRef.current = g.node()

    const simulation = d3.forceSimulation(nodes)
      .force('link',    d3.forceLink(links).id(d => d.id).distance(90))
      .force('charge',  d3.forceManyBody().strength(-220))
      .force('center',  d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius(55))

    /* Links */
    const link = g.append('g').selectAll('line').data(links).join('line')
      .attr('stroke', d => linkColor(d.value))
      .attr('stroke-opacity', 0.8)
      .attr('stroke-width', d => Math.max(1.5, Math.min(Math.sqrt(d.value / 8000), 6)))
      .attr('stroke-linecap', 'round')

    /* Edge amount labels */
    const edgeLabels = g.append('g').selectAll('text').data(links).join('text')
      .attr('text-anchor', 'middle')
      .attr('dy', -5)
      .style('font-family', 'IBM Plex Mono, monospace')
      .style('font-size', '9px')
      .style('fill', 'rgba(201,168,76,0.7)')
      .style('pointer-events', 'none')
      .style('letter-spacing', '0.04em')
      .text(d => d.value >= 1000 ? `$${(d.value / 1000).toFixed(1)}K` : `$${d.value.toFixed(0)}`)

    /* Nodes — outer glow ring */
    const nodeGlow = g.append('g').selectAll('circle').data(nodes).join('circle')
      .attr('r', d => getR(d.group) + 5)
      .attr('fill', 'none')
      .attr('stroke', d => getRiskColor(d.group).fill)
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.3)
      .style('pointer-events', 'none')

    /* Nodes — main circle */
    const node = g.append('g').selectAll('circle').data(nodes).join('circle')
      .attr('r', d => getR(d.group))
      .attr('fill', d => {
        const c = getRiskColor(d.group)
        return c.fill
      })
      .attr('fill-opacity', 0.15)
      .attr('stroke', d => getRiskColor(d.group).fill)
      .attr('stroke-width', 1.5)
      .style('cursor', 'pointer')
      .style('filter', d => `url(#glow-${d.group})`)
      .on('click', (event, d) => { event.stopPropagation(); onAccountClick?.(d.id) })
      .on('mouseenter', function (event, d) {
        d3.select(this).transition().duration(180).attr('r', getR2(d.group)).attr('fill-opacity', 0.3)
        setHoveredNode(d)
        const rect = svgRef.current.getBoundingClientRect()
        setTooltipPos({ x: event.clientX - rect.left + 14, y: event.clientY - rect.top + 14 })
      })
      .on('mouseleave', function (event, d) {
        d3.select(this).transition().duration(180).attr('r', getR(d.group)).attr('fill-opacity', 0.15)
        setHoveredNode(null)
      })

    /* Drag */
    node.call(
      d3.drag()
        .on('start', (event, d) => { if (!event.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y })
        .on('drag',  (event, d) => { d.fx = event.x; d.fy = event.y })
        .on('end',   (event, d) => { if (!event.active) simulation.alphaTarget(0); d.fx = null; d.fy = null })
    )

    /* Node labels */
    const labels = g.append('g').selectAll('text').data(nodes).join('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .style('font-family', 'IBM Plex Mono, monospace')
      .style('font-size', '8px')
      .style('fill', d => getRiskColor(d.group).label)
      .style('pointer-events', 'none')
      .style('letter-spacing', '0.04em')
      .style('font-weight', '600')
      .text(d => d.id.substring(0, 7))

    /* Zoom */
    const zoom = d3.zoom().scaleExtent([0.3, 8]).on('zoom', event => g.attr('transform', event.transform))
    zoomRef.current = zoom
    svg.call(zoom)

    /* Tick */
    simulation.on('tick', () => {
      link.attr('x1', d => d.source.x).attr('y1', d => d.source.y).attr('x2', d => d.target.x).attr('y2', d => d.target.y)
      edgeLabels.attr('x', d => (d.source.x + d.target.x) / 2).attr('y', d => (d.source.y + d.target.y) / 2)
      nodeGlow.attr('cx', d => d.x).attr('cy', d => d.y)
      node.attr('cx', d => d.x).attr('cy', d => d.y)
      labels.attr('x', d => d.x).attr('y', d => d.y)
    })

    return () => simulation.stop()
  }, [data, onAccountClick])

  return (
    <>
      <style>{CSS}</style>
      <div className="gv-wrap" ref={containerRef}>
        {/* dot-grid via ::before pseudo */}
        <div className="gv-scanline" />

        <svg ref={svgRef} className="gv-svg" />

        {/* ── Legend ── */}
        <div className="gv-legend">
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.58rem', color: '#4A5550', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>
            Risk Levels
          </div>
          {LEGEND_ITEMS.map(({ level, fill }) => (
            <div key={level} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
              <div style={{
                width: 8, height: 8,
                border: `1.5px solid ${fill}`,
                background: `${fill}20`,
                boxShadow: `0 0 6px ${fill}60`,
                flexShrink: 0,
              }} />
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.6rem', color: fill, letterSpacing: '0.1em' }}>
                {level}
              </span>
            </div>
          ))}
        </div>

        {/* ── Controls ── */}
        <div className="gv-controls">
          <div className="gv-controls-row">
            <button className="ctrl-btn" onClick={() => pan('up')} title="Pan Up">▲</button>
          </div>
          <div className="gv-controls-row">
            <button className="ctrl-btn" onClick={() => pan('left')} title="Pan Left">◄</button>
            <button className="ctrl-btn-reset" onClick={resetView} title="Reset">RESET</button>
            <button className="ctrl-btn" onClick={() => pan('right')} title="Pan Right">►</button>
          </div>
          <div className="gv-controls-row">
            <button className="ctrl-btn" onClick={() => pan('down')} title="Pan Down">▼</button>
          </div>
        </div>

        {/* ── Tooltip ── */}
        {hoveredNode && (
          <div className="gv-tooltip" style={{ left: tooltipPos.x, top: tooltipPos.y }}>
            {/* Risk badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10, flexWrap: 'wrap' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '3px 8px',
                background: `${getRiskColor(hoveredNode.group).fill}15`,
                border: `1px solid ${getRiskColor(hoveredNode.group).fill}50`,
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.58rem',
                color: getRiskColor(hoveredNode.group).fill,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                <span style={{
                  width: 4, height: 4, borderRadius: '50%',
                  background: getRiskColor(hoveredNode.group).fill,
                  display: 'inline-block',
                  animation: 'pulse-dot 1.8s ease-in-out infinite',
                  color: getRiskColor(hoveredNode.group).fill,
                }} />
                {hoveredNode.group}
              </span>
            </div>

            {/* Account ID */}
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.58rem', color: '#4A5550', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Account</div>
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: '#C4C0B8', marginBottom: 10, wordBreak: 'break-all', letterSpacing: '0.04em' }}>
              {hoveredNode.id}
            </div>

            {/* Score */}
            <div style={{ borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.58rem', color: '#4A5550', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Risk Score
                </span>
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.9rem', color: getRiskColor(hoveredNode.group).fill, fontWeight: 600 }}>
                  {hoveredNode.score.toFixed(1)}
                  <span style={{ fontSize: '0.6rem', color: '#4A5550', marginLeft: 2 }}>/100</span>
                </span>
              </div>
              {/* mini score bar */}
              <div style={{ height: 2, background: 'rgba(255,255,255,0.06)', marginTop: 7, position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, height: '100%',
                  width: `${hoveredNode.score}%`,
                  background: getRiskColor(hoveredNode.group).fill,
                  transition: 'width 0.5s ease',
                }} />
              </div>
            </div>

            {/* Hint */}
            <div style={{ marginTop: 10, fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.55rem', color: '#2A3530', letterSpacing: '0.08em' }}>
              CLICK TO INSPECT →
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default GraphView
