import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'

const GraphView = ({ data, onAccountClick }) => {
  const containerRef = useRef(null)
  const svgRef = useRef(null)
  const gRef = useRef(null)
  const [hoveredNode, setHoveredNode] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  const scroll = (direction, distance = 50) => {
    if (!gRef.current) return

    const g = d3.select(gRef.current)
    const currentTransform = d3.zoomTransform(d3.select(svgRef.current).node())

    let newTransform = currentTransform
    switch (direction) {
      case 'up':
        newTransform = currentTransform.translate(0, distance)
        break
      case 'down':
        newTransform = currentTransform.translate(0, -distance)
        break
      case 'left':
        newTransform = currentTransform.translate(distance, 0)
        break
      case 'right':
        newTransform = currentTransform.translate(-distance, 0)
        break
      default:
        break
    }

    d3.select(svgRef.current)
      .transition()
      .duration(300)
      .call(
        d3.zoom().transform,
        newTransform
      )
  }

  const resetView = () => {
    if (!svgRef.current) return
    d3.select(svgRef.current)
      .transition()
      .duration(500)
      .call(d3.zoom().transform, d3.zoomIdentity)
  }

  useEffect(() => {
    if (!data || !containerRef.current) return

    // Prepare graph data from rings and account scores
    const nodes = []
    const links = []
    const nodeSet = new Set()

    // Add ALL accounts as nodes from account_scores
    if (data.account_scores && data.account_scores.length > 0) {
      data.account_scores.forEach((scoreData) => {
        if (!nodeSet.has(scoreData.account_id)) {
          nodes.push({
            id: scoreData.account_id,
            group: scoreData.risk_level || 'LOW',
            score: scoreData.final_score || 0,
          })
          nodeSet.add(scoreData.account_id)
        }
      })
    }

    // Extract links from rings
    if (data.rings_detected && data.rings_detected.length > 0) {
      data.rings_detected.forEach((ring) => {
        // Create links for the ring
        for (let i = 0; i < ring.accounts.length; i++) {
          const source = ring.accounts[i]
          const target = ring.accounts[(i + 1) % ring.accounts.length]
          links.push({
            source,
            target,
            value: ring.total_amount,
            ringId: ring.ring_id,
          })
        }
      })
    }

    if (nodes.length === 0) {
      // Show message if no graph data
      d3.select(svgRef.current).selectAll('*').remove()
      d3.select(svgRef.current)
        .append('text')
        .attr('x', '50%')
        .attr('y', '50%')
        .attr('text-anchor', 'middle')
        .style('fill', '#999')
        .text('No transactions or patterns detected')
      return
    }

    const width = containerRef.current.clientWidth
    const height = containerRef.current.clientHeight

    // Clear previous SVG
    d3.select(svgRef.current).selectAll('*').remove()

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)

    // Add gradient definitions for beautiful node effects
    const defs = svg.append('defs')
    
    // Critical gradient (red)
    const criticalGradient = defs.append('radialGradient')
      .attr('id', 'criticalGradient')
    criticalGradient.append('stop').attr('offset', '0%').attr('stop-color', '#ff6b6b')
    criticalGradient.append('stop').attr('offset', '100%').attr('stop-color', '#d32f2f')
    
    // High gradient (orange)
    const highGradient = defs.append('radialGradient')
      .attr('id', 'highGradient')
    highGradient.append('stop').attr('offset', '0%').attr('stop-color', '#ffa726')
    highGradient.append('stop').attr('offset', '100%').attr('stop-color', '#f57c00')
    
    // Medium gradient (yellow)
    const mediumGradient = defs.append('radialGradient')
      .attr('id', 'mediumGradient')
    mediumGradient.append('stop').attr('offset', '0%').attr('stop-color', '#ffeb3b')
    mediumGradient.append('stop').attr('offset', '100%').attr('stop-color', '#fbc02d')
    
    // Low gradient (green)
    const lowGradient = defs.append('radialGradient')
      .attr('id', 'lowGradient')
    lowGradient.append('stop').attr('offset', '0%').attr('stop-color', '#66bb6a')
    lowGradient.append('stop').attr('offset', '100%').attr('stop-color', '#388e3c')
    
    // Add drop shadow filter
    const filter = defs.append('filter')
      .attr('id', 'drop-shadow')
      .attr('height', '150%')
    filter.append('feGaussianBlur')
      .attr('in', 'SourceAlpha')
      .attr('stdDeviation', 3)
    filter.append('feOffset')
      .attr('dx', 2)
      .attr('dy', 2)
      .attr('result', 'offsetblur')
    const feMerge = filter.append('feMerge')
    feMerge.append('feMergeNode')
    feMerge.append('feMergeNode')
      .attr('in', 'SourceGraphic')

    // Create main group for zoom/pan
    const g = svg.append('g').attr('class', 'graph-group')
    gRef.current = g.node()

    // Create force simulation with optimized parameters
    const simulation = d3
      .forceSimulation(nodes)
      .force('link', d3.forceLink(links).id((d) => d.id).distance(80))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius(50))

    // Create links with enhanced styling and better visibility
    const link = g
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', (d) => {
        // Color based on transaction amount
        const amount = d.value
        if (amount > 40000) return '#d32f2f' // High amount - red
        if (amount > 20000) return '#f57c00' // Medium-high - orange  
        if (amount > 10000) return '#1976d2' // Medium - blue
        return '#607d8b' // Low - gray
      })
      .attr('stroke-opacity', 0.7)
      .attr('stroke-width', (d) => {
        // Width based on transaction amount (more prominent)
        const baseWidth = Math.sqrt(d.value / 10000)
        return Math.max(3, Math.min(baseWidth, 10))
      })
      .attr('stroke-linecap', 'round')
      .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))')
      .style('cursor', 'pointer')

    // Add edge labels showing transaction amounts
    const edgeLabels = g
      .append('g')
      .attr('class', 'edge-labels')
      .selectAll('text')
      .data(links)
      .join('text')
      .attr('font-size', '10px')
      .attr('text-anchor', 'middle')
      .attr('dy', -5)
      .style('fill', '#1a1a1a')
      .style('font-weight', '700')
      .style('pointer-events', 'none')
      .style('text-shadow', '0 0 3px rgba(255,255,255,0.95), 0 0 2px rgba(255,255,255,0.95)')
      .text((d) => {
        // Format amount with K for thousands
        const amount = d.value
        if (amount >= 1000) {
          return `$${(amount / 1000).toFixed(1)}K`
        }
        return `$${amount.toFixed(0)}`
      })

    // Create nodes
    const node = g
      .append('g')
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', (d) => {
        switch (d.group) {
          case 'CRITICAL':
            return 30
          case 'HIGH':
            return 24
          case 'MEDIUM':
            return 18
          case 'LOW':
            return 12
          default:
            return 15
        }
      })
      .attr('fill', (d) => {
        switch (d.group) {
          case 'CRITICAL':
            return 'url(#criticalGradient)'
          case 'HIGH':
            return 'url(#highGradient)'
          case 'MEDIUM':
            return 'url(#mediumGradient)'
          case 'LOW':
            return 'url(#lowGradient)'
          default:
            return 'url(#mediumGradient)'
        }
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .style('cursor', 'pointer')
      .style('filter', 'url(#drop-shadow)')
      .on('click', (event, d) => {
        event.stopPropagation()
        onAccountClick?.(d.id)
      })
      .on('mouseenter', function (event, d) {
        d3.select(this).transition().duration(200).attr('r', (d) => {
          switch (d.group) {
            case 'CRITICAL':
              return 38
            case 'HIGH':
              return 30
            case 'MEDIUM':
              return 22
            case 'LOW':
              return 16
            default:
              return 20
          }
        })
        
        // Show tooltip with account details
        setHoveredNode(d)
        const rect = svgRef.current.getBoundingClientRect()
        setTooltipPos({
          x: event.clientX - rect.left + 10,
          y: event.clientY - rect.top + 10,
        })
      })
      .on('mouseleave', function () {
        d3.select(this).transition().duration(200).attr('r', (d) => {
          switch (d.group) {
            case 'CRITICAL':
              return 30
            case 'HIGH':
              return 24
            case 'MEDIUM':
              return 18
            case 'LOW':
              return 12
            default:
              return 15
          }
        })
        
        // Hide tooltip
        setHoveredNode(null)
      })

    // Create labels with better visibility - BLACK TEXT
    const labels = g
      .append('g')
      .selectAll('text')
      .data(nodes)
      .join('text')
      .attr('font-size', '11px')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .text((d) => d.id.substring(0, 8))
      .style('pointer-events', 'none')
      .style('fill', '#000')
      .style('font-weight', '700')
      .style('text-shadow', '0 0 3px rgba(255,255,255,0.9), 0 0 3px rgba(255,255,255,0.9), 0 0 5px rgba(255,255,255,0.8)')

    // Add beautiful legend with background
    const legendBg = svg.append('rect')
      .attr('x', width - 195)
      .attr('y', 10)
      .attr('width', 185)
      .attr('height', 125)
      .attr('rx', 8)
      .attr('fill', 'rgba(255, 255, 255, 0.95)')
      .attr('stroke', '#e0e0e0')
      .attr('stroke-width', 2)
      .style('filter', 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))')

    const legend = svg
      .append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width - 180}, 25)`)

    // Legend title
    legend.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .style('font-size', '13px')
      .style('font-weight', 'bold')
      .style('fill', '#333')
      .text('Risk Levels')

    const riskLevels = [
      { level: 'CRITICAL', color: '#d32f2f', icon: '🔴' },
      { level: 'HIGH', color: '#f57c00', icon: '🟠' },
      { level: 'MEDIUM', color: '#fbc02d', icon: '🟡' },
      { level: 'LOW', color: '#388e3c', icon: '🟢' },
    ]

    riskLevels.forEach((risk, i) => {
      const item = legend.append('g').attr('transform', `translate(0, ${i * 25 + 20})`)

      item
        .append('circle')
        .attr('r', 8)
        .attr('fill', risk.color)
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .style('filter', 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))')

      item
        .append('text')
        .attr('x', 20)
        .attr('dy', '0.35em')
        .style('font-size', '12px')
        .style('font-weight', '600')
        .style('fill', '#333')
        .text(`${risk.icon} ${risk.level}`)
    })

    // Add zoom functionality
    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 8])
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
      })

    svg.call(zoom)

    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y)

      // Update edge labels to be positioned at the midpoint of edges
      edgeLabels
        .attr('x', (d) => (d.source.x + d.target.x) / 2)
        .attr('y', (d) => (d.source.y + d.target.y) / 2)

      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y)

      labels.attr('x', (d) => d.x).attr('y', (d) => d.y)
    })
  }, [data, onAccountClick])

  return (
    <div className="w-full h-full min-h-[500px] max-h-[600px] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-lg overflow-hidden relative shadow-inner border-2 border-gray-200" ref={containerRef}>
      <svg ref={svgRef} className="w-full h-full"></svg>

      {/* Enhanced Scroll Controls with gradient background */}
      <div className="absolute bottom-5 left-5 flex flex-col gap-2 z-10 bg-gradient-to-br from-white to-blue-50 p-4 rounded-xl shadow-2xl border-2 border-blue-100">
        {/* Up Button */}
        <button
          className="w-10 h-10 border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-white text-blue-600 rounded-lg cursor-pointer text-base font-extrabold flex items-center justify-center transition-all duration-300 hover:from-blue-600 hover:to-blue-500 hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-blue-400/50 active:scale-95 hover:rotate-6"
          onClick={() => scroll('up')}
          title="Scroll Up"
        >
          ▲
        </button>

        {/* Left, Center, Right Buttons */}
        <div className="flex gap-2 justify-center">
          <button
            className="w-10 h-10 border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-white text-blue-600 rounded-lg cursor-pointer text-base font-extrabold flex items-center justify-center transition-all duration-300 hover:from-blue-600 hover:to-blue-500 hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-blue-400/50 active:scale-95 hover:-rotate-6"
            onClick={() => scroll('left')}
            title="Scroll Left"
          >
            ◄
          </button>
          <button
            className="min-w-[65px] h-10 bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-600 text-green-700 rounded-lg cursor-pointer text-sm font-extrabold flex items-center justify-center transition-all duration-300 hover:from-green-600 hover:to-green-500 hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-green-400/50 active:scale-95"
            onClick={resetView}
            title="Reset View"
          >
            ⊙
          </button>
          <button
            className="w-10 h-10 border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-white text-blue-600 rounded-lg cursor-pointer text-base font-extrabold flex items-center justify-center transition-all duration-300 hover:from-blue-600 hover:to-blue-500 hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-blue-400/50 active:scale-95 hover:rotate-6"
            onClick={() => scroll('right')}
            title="Scroll Right"
          >
            ►
          </button>
        </div>

        {/* Down Button */}
        <button
          className="w-10 h-10 border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-white text-blue-600 rounded-lg cursor-pointer text-base font-extrabold flex items-center justify-center transition-all duration-300 hover:from-blue-600 hover:to-blue-500 hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-blue-400/50 active:scale-95 hover:-rotate-6"
          onClick={() => scroll('down')}
          title="Scroll Down"
        >
          ▼
        </button>
      </div>

      {/* Enhanced tooltip for account details on hover */}
      {hoveredNode && (
        <div
          className="absolute bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl p-4 z-20 pointer-events-none max-w-[280px] border-2 border-blue-400 animate-[tooltipFadeIn_0.2s_ease-out]"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
          }}
        >
          <div className="flex items-center gap-2.5 mb-3 flex-wrap">
            <div className={`text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap uppercase shadow-md ${
              hoveredNode.group === 'CRITICAL' ? 'bg-gradient-to-r from-red-600 to-red-500 text-white' :
              hoveredNode.group === 'HIGH' ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white' :
              hoveredNode.group === 'MEDIUM' ? 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-gray-900' :
              'bg-gradient-to-r from-green-700 to-green-600 text-white'
            }`}>
              {hoveredNode.group}
            </div>
            <div className="text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent break-words">{hoveredNode.id}</div>
          </div>
          <div className="border-t-2 border-gray-200 pt-3">
            <div className="flex justify-between items-center gap-3 text-xs">
              <span className="text-gray-600 font-semibold">Risk Score:</span>
              <span className="text-gray-900 font-extrabold text-base">{hoveredNode.score.toFixed(1)}/100</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GraphView
