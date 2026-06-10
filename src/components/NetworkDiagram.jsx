import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(MotionPathPlugin)

// Static node data
const BUYER_NODES = [
  { id: 0, label: 'Enterprise HR', y: 50,  matchScore: '97%' },
  { id: 1, label: 'FinTech CFO',   y: 120, matchScore: '91%' },
  { id: 2, label: 'SaaS Ops',      y: 190, matchScore: '88%' },
  { id: 3, label: 'Agency Founder',y: 260, matchScore: '94%' },
  { id: 4, label: 'Corp Dev',      y: 330, matchScore: '86%' },
]

const PROVIDER_NODES = [
  { id: 0, label: 'Staffing Agency',    y: 100 },
  { id: 1, label: 'HR Tech Platform',   y: 200 },
  { id: 2, label: 'Exec Search Firm',   y: 300 },
]

const HUB_X = 450
const HUB_Y = 200
const BUYER_X = 80
const PROVIDER_X = 820

// Pre-computed bezier paths (static IDs required by MotionPathPlugin)
const BUYER_PATHS = BUYER_NODES.map(n =>
  `M ${BUYER_X} ${n.y} C ${BUYER_X + 120} ${n.y} ${HUB_X - 120} ${HUB_Y} ${HUB_X} ${HUB_Y}`
)
const PROVIDER_PATHS = PROVIDER_NODES.map(n =>
  `M ${HUB_X} ${HUB_Y} C ${HUB_X + 120} ${HUB_Y} ${PROVIDER_X - 120} ${n.y} ${PROVIDER_X} ${n.y}`
)

// Tooltip sub-component
function Tooltip({ node, x, y }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x + 16,
        top: y - 16,
        zIndex: 20,
        background: 'rgba(4,7,13,0.92)',
        border: '1px solid rgba(17,103,128,0.45)',
        borderRadius: 8,
        padding: '10px 14px',
        minWidth: 168,
        pointerEvents: 'none',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.78rem', color: 'var(--text-primary)', marginBottom: 6, fontWeight: 600 }}>
        {node.label}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
        <div>Match Score: <span style={{ color: 'var(--neon-success)' }}>{node.matchScore}</span></div>
        <div>Latency: <span style={{ color: '#FAFAFA' }}>&lt; 120ms</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          Status:{' '}
          <span
            style={{
              display: 'inline-block',
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--neon-success)',
              boxShadow: '0 0 5px var(--neon-success)',
              marginLeft: 2,
            }}
          />
          <span style={{ color: 'var(--neon-success)' }}>Route Active</span>
        </div>
      </div>
    </div>
  )
}

export default function NetworkDiagram() {
  const svgRef = useRef(null)
  const counterRef = useRef(null)
  const packet0Ref = useRef(null)
  const packet1Ref = useRef(null)
  const packet2Ref = useRef(null)
  const hubInnerRef = useRef(null)

  const routesRef = useRef(47832)
  const timelinesRef = useRef([])
  const timeoutsRef = useRef([])

  const [activeNode, setActiveNode] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  // Update counter display
  const updateCounter = () => {
    routesRef.current += 1
    if (counterRef.current) {
      counterRef.current.textContent = routesRef.current.toLocaleString()
    }
  }

  // Hub pulse on completion
  const pulseHub = () => {
    if (!hubInnerRef.current) return
    gsap.timeline()
      .to(hubInnerRef.current, { duration: 0.18, scale: 1.12, transformOrigin: '450px 200px', ease: 'power2.out' })
      .to(hubInnerRef.current, { duration: 0.22, scale: 1,    transformOrigin: '450px 200px', ease: 'power2.in' })
  }

  // Single packet route loop
  const runPacketLoop = (packetRef) => {
    if (!packetRef.current || !svgRef.current) return

    const buyerIdx    = Math.floor(Math.random() * BUYER_NODES.length)
    const providerIdx = Math.floor(Math.random() * PROVIDER_NODES.length)

    const tl = gsap.timeline({
      onComplete: () => {
        updateCounter()
        pulseHub()
        // Remove this timeline from tracking array
        timelinesRef.current = timelinesRef.current.filter(t => t !== tl)
        // Delay then repeat
        const tid = setTimeout(() => {
          timeoutsRef.current = timeoutsRef.current.filter(t => t !== tid)
          runPacketLoop(packetRef)
        }, 480 + Math.random() * 300)
        timeoutsRef.current.push(tid)
      }
    })

    // Reset packet to buyer node start position
    const buyerNode = BUYER_NODES[buyerIdx]
    gsap.set(packetRef.current, { x: 0, y: 0, opacity: 1 })

    tl.to(packetRef.current, {
      duration: 1.1 + Math.random() * 0.3,
      ease: 'power1.inOut',
      motionPath: {
        path: `#path-buyer-${buyerIdx}-to-hub`,
        align: `#path-buyer-${buyerIdx}-to-hub`,
        alignOrigin: [0.5, 0.5],
        autoRotate: false,
        start: 0,
        end: 1,
      },
    })
    .to(packetRef.current, {
      duration: 1.1 + Math.random() * 0.3,
      ease: 'power1.inOut',
      motionPath: {
        path: `#path-hub-to-provider-${providerIdx}`,
        align: `#path-hub-to-provider-${providerIdx}`,
        alignOrigin: [0.5, 0.5],
        autoRotate: false,
        start: 0,
        end: 1,
      },
    })
    .to(packetRef.current, { duration: 0.2, opacity: 0 })

    timelinesRef.current.push(tl)
  }

  useEffect(() => {
    if (!svgRef.current) return

    // Initialise counter display
    if (counterRef.current) {
      counterRef.current.textContent = routesRef.current.toLocaleString()
    }

    const packetRefs = [packet0Ref, packet1Ref, packet2Ref]
    const offsets = [0, 700, 1400]

    offsets.forEach((delay, i) => {
      const tid = setTimeout(() => {
        timeoutsRef.current = timeoutsRef.current.filter(t => t !== tid)
        runPacketLoop(packetRefs[i])
      }, delay)
      timeoutsRef.current.push(tid)
    })

    return () => {
      // Kill all active timelines
      timelinesRef.current.forEach(tl => tl.kill())
      timelinesRef.current = []
      // Clear all pending timeouts
      timeoutsRef.current.forEach(tid => clearTimeout(tid))
      timeoutsRef.current = []
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleNodeEnter = (node, e) => {
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    // Convert SVG coordinates to container-relative pixel position
    const scaleX = rect.width / 900
    const scaleY = rect.height / 400
    setTooltipPos({
      x: BUYER_X * scaleX + rect.left - svg.parentElement.getBoundingClientRect().left,
      y: node.y * scaleY + rect.top - svg.parentElement.getBoundingClientRect().top,
    })
    setActiveNode(node)
  }

  const handleNodeLeave = () => setActiveNode(null)

  return (
    <motion.section
      className="two-sided-network container"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="section-header">
        <h2>The Two-Sided Routing Network</h2>
        <p>System-level processing applied to complex B2B pipelines.</p>
      </div>

      <div
        className="glass-card neon-border"
        style={{ padding: '48px', position: 'relative', overflow: 'hidden' }}
      >
        {/* Routes counter */}
        <div
          style={{
            position: 'absolute',
            top: 16,
            right: 24,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--neon-primary)',
            letterSpacing: '0.08em',
            opacity: 0.9,
          }}
        >
          ROUTES PROCESSED:{' '}
          <span ref={counterRef} style={{ color: 'var(--text-primary)' }}>
            47,832
          </span>
        </div>

        {/* SVG Diagram */}
        <svg
          ref={svgRef}
          viewBox="0 0 900 400"
          style={{ width: '100%', height: 'auto', overflow: 'visible' }}
        >
          <defs>
            {/* Glow filter for packets */}
            <filter id="packet-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Hub outer glow */}
            <filter id="hub-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Node hover glow */}
            <filter id="node-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── Buyer → Hub paths (static IDs) ── */}
          {BUYER_NODES.map((n, i) => (
            <path
              key={`buyer-path-${i}`}
              id={`path-buyer-${i}-to-hub`}
              d={BUYER_PATHS[i]}
              stroke="rgba(17,103,128,0.18)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="4 6"
            />
          ))}

          {/* ── Hub → Provider paths (static IDs) ── */}
          {PROVIDER_NODES.map((n, i) => (
            <path
              key={`provider-path-${i}`}
              id={`path-hub-to-provider-${i}`}
              d={PROVIDER_PATHS[i]}
              stroke="rgba(38,8,101,0.25)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="4 6"
            />
          ))}

          {/* ── NEXAM Hub (center) ── */}
          {/* Outer ambient glow disk */}
          <circle
            cx={HUB_X}
            cy={HUB_Y}
            r={68}
            fill="rgba(17,103,128,0.04)"
            filter="url(#hub-glow)"
          />
          {/* Outer rotating ring */}
          <circle
            cx={HUB_X}
            cy={HUB_Y}
            r={55}
            fill="rgba(17,103,128,0.08)"
            stroke="var(--neon-primary)"
            strokeWidth="1.5"
            strokeDasharray="8 4"
            style={{
              transformOrigin: `${HUB_X}px ${HUB_Y}px`,
              animation: 'rotate 20s linear infinite',
            }}
          />
          {/* Inner circle */}
          <circle
            ref={hubInnerRef}
            cx={HUB_X}
            cy={HUB_Y}
            r={42}
            fill="rgba(17,103,128,0.15)"
            stroke="var(--neon-primary)"
            strokeWidth="1"
          />
          {/* Hub label */}
          <text
            x={HUB_X}
            y={HUB_Y - 6}
            textAnchor="middle"
            fontFamily="var(--font-heading)"
            fontSize="12"
            fontWeight="700"
            fill="white"
            letterSpacing="1.5"
          >
            NEXAM
          </text>
          <text
            x={HUB_X}
            y={HUB_Y + 11}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="8"
            fontWeight="400"
            fill="rgba(255,255,255,0.55)"
            letterSpacing="2"
          >
            ROUTING
          </text>

          {/* ── Buyer Nodes (left) ── */}
          {BUYER_NODES.map((n, i) => (
            <g
              key={`buyer-${i}`}
              style={{ cursor: 'pointer' }}
              onMouseEnter={(e) => handleNodeEnter(n, e)}
              onMouseLeave={handleNodeLeave}
            >
              <circle
                cx={BUYER_X}
                cy={n.y}
                r={20}
                fill="rgba(17,103,128,0.15)"
                stroke="rgba(17,103,128,0.4)"
                strokeWidth="1"
              />
              <circle
                cx={BUYER_X}
                cy={n.y}
                r={4}
                fill="rgba(17,103,128,0.6)"
              />
              <text
                x={BUYER_X - 28}
                y={n.y + 4}
                textAnchor="end"
                fontFamily="var(--font-body)"
                fontSize="10.5"
                fill="var(--text-secondary)"
              >
                {n.label}
              </text>
            </g>
          ))}

          {/* ── Provider Nodes (right) ── */}
          {PROVIDER_NODES.map((n, i) => (
            <g key={`provider-${i}`}>
              <circle
                cx={PROVIDER_X}
                cy={n.y}
                r={20}
                fill="rgba(38,8,101,0.15)"
                stroke="rgba(38,8,101,0.5)"
                strokeWidth="1"
              />
              <circle
                cx={PROVIDER_X}
                cy={n.y}
                r={4}
                fill="rgba(38,8,101,0.7)"
              />
              <text
                x={PROVIDER_X + 28}
                y={n.y + 4}
                textAnchor="start"
                fontFamily="var(--font-body)"
                fontSize="10.5"
                fill="var(--text-secondary)"
              >
                {n.label}
              </text>
            </g>
          ))}

          {/* ── Section labels ── */}
          <text
            x={BUYER_X}
            y={390}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="8"
            fill="rgba(17,103,128,0.6)"
            letterSpacing="1.5"
          >
            DEMAND SIDE
          </text>
          <text
            x={PROVIDER_X}
            y={390}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="8"
            fill="rgba(38,8,101,0.8)"
            letterSpacing="1.5"
          >
            SUPPLY SIDE
          </text>

          {/* ── Animated Packets ── */}
          {/* Packet 0 */}
          <circle
            ref={packet0Ref}
            r={4}
            fill="#116780"
            filter="url(#packet-glow)"
            opacity={0}
            cx={BUYER_X}
            cy={BUYER_NODES[0].y}
          />
          {/* Packet 1 */}
          <circle
            ref={packet1Ref}
            r={4}
            fill="#1a8fa6"
            filter="url(#packet-glow)"
            opacity={0}
            cx={BUYER_X}
            cy={BUYER_NODES[1].y}
          />
          {/* Packet 2 */}
          <circle
            ref={packet2Ref}
            r={3.5}
            fill="#0e5a6e"
            filter="url(#packet-glow)"
            opacity={0}
            cx={BUYER_X}
            cy={BUYER_NODES[2].y}
          />
        </svg>

        {/* Hover Tooltip */}
        {activeNode && (
          <Tooltip node={activeNode} x={tooltipPos.x} y={tooltipPos.y} />
        )}

        {/* Legend */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 32,
            marginTop: 20,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--text-secondary)',
            opacity: 0.7,
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ display: 'inline-block', width: 10, height: 2, background: 'rgba(17,103,128,0.6)', borderRadius: 1 }} />
            Buyer signals
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: '#116780', opacity: 0.8 }} />
            Live packet
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ display: 'inline-block', width: 10, height: 2, background: 'rgba(38,8,101,0.7)', borderRadius: 1 }} />
            Provider routes
          </span>
        </div>
      </div>
    </motion.section>
  )
}
