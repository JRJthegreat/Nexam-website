import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    id: '01',
    label: 'Signal Detected',
    desc: 'High-intent buyer pain identified in real-time.',
  },
  {
    id: '02',
    label: 'Profile Matched',
    desc: 'ICP scored and validated against your exact criteria.',
  },
  {
    id: '03',
    label: 'Route Mapped',
    desc: 'Optimal connection pathway dynamically calculated.',
  },
  {
    id: '04',
    label: 'Connection Established',
    desc: 'Qualified prospect delivered to your calendar.',
  },
  {
    id: '05',
    label: 'ROI Delivered',
    desc: 'Validated B2B transaction completed in 21-30 days.',
  },
]

function StepNode({ step, index, totalSteps }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isLast = index === totalSteps - 1

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        minWidth: 0,
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Step number above line */}
      <div
        className="font-mono"
        style={{
          fontSize: '0.7rem',
          color: isInView ? 'var(--neon-primary)' : 'var(--text-secondary)',
          letterSpacing: '0.1em',
          marginBottom: '10px',
          transition: 'color 0.4s ease',
        }}
      >
        {step.id}
      </div>

      {/* Circle node on the line */}
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'var(--bg-color)',
          border: isInView
            ? '2px solid var(--neon-primary)'
            : '2px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
          flexShrink: 0,
          transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
          boxShadow: isInView
            ? '0 0 16px rgba(17, 103, 128, 0.7), 0 0 32px rgba(17, 103, 128, 0.3)'
            : 'none',
        }}
      >
        {/* Inner dot */}
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: isInView ? 'var(--neon-primary)' : 'var(--border-color)',
            transition: 'background 0.4s ease, box-shadow 0.4s ease',
            boxShadow: isInView ? '0 0 8px var(--neon-primary)' : 'none',
          }}
        />
      </div>

      {/* Label + description below line */}
      <div style={{ marginTop: '14px', padding: '0 4px' }}>
        <div
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            fontSize: '0.875rem',
            color: 'var(--text-primary)',
            marginBottom: '6px',
            lineHeight: 1.3,
          }}
        >
          {step.label}
        </div>
        <div
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
          }}
        >
          {step.desc}
        </div>
      </div>

      {/* Connector segment to next node (except last) */}
      {!isLast && (
        <div
          style={{
            position: 'absolute',
            top: '38px', // vertically centered on node (step num ~26px + node 32px / 2)
            left: '50%',
            width: '100%',
            height: '1px',
            background: isInView
              ? 'linear-gradient(to right, var(--neon-primary), rgba(17,103,128,0.3))'
              : 'var(--border-color)',
            transition: 'background 0.5s ease',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      )}
    </motion.div>
  )
}

export default function ProcessTimeline() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const svgRef = useRef(null)
  const nodesRef = useRef(null)
  const [lineWidth, setLineWidth] = useState(0)

  useEffect(() => {
    const updateWidth = () => {
      if (nodesRef.current) {
        setLineWidth(nodesRef.current.offsetWidth)
      }
    }
    updateWidth()
    const ro = new ResizeObserver(updateWidth)
    if (nodesRef.current) ro.observe(nodesRef.current)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!lineRef.current || lineWidth === 0) return

    gsap.set(lineRef.current, {
      strokeDasharray: lineWidth,
      strokeDashoffset: lineWidth,
    })

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 75%',
      end: 'center 40%',
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(lineRef.current, {
          strokeDashoffset: lineWidth * (1 - self.progress),
        })
      },
    })

    return () => trigger.kill()
  }, [lineWidth])

  // The SVG line sits at the vertical center of the node row.
  // Node row height: ~26px (num) + 32px (circle) = 58px top offset to center of circle
  const NODE_CENTER_Y = 58

  return (
    <section ref={sectionRef} className="container" style={{ padding: '80px 24px' }}>
      <div className="section-header">
        <div className="pill-tag">
          <span className="pill-dot" />
          THE PROCESS
        </div>
        <h2>From Signal to Revenue</h2>
        <p>Five stages. Zero manual latency.</p>
      </div>

      <div
        style={{
          position: 'relative',
          overflowX: 'auto',
          paddingBottom: '8px',
        }}
      >
        {/* Horizontal SVG line */}
        {lineWidth > 0 && (
          <svg
            ref={svgRef}
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: `${NODE_CENTER_Y}px`,
              left: 0,
              width: lineWidth,
              height: '2px',
              pointerEvents: 'none',
              zIndex: 1,
              overflow: 'visible',
            }}
          >
            <line
              ref={lineRef}
              x1="0"
              y1="1"
              x2={lineWidth}
              y2="1"
              stroke="var(--neon-primary)"
              strokeWidth="1"
              strokeDasharray={lineWidth}
              strokeDashoffset={lineWidth}
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>
        )}

        {/* Step nodes */}
        <div
          ref={nodesRef}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative',
            minWidth: '600px',
            zIndex: 2,
          }}
        >
          {STEPS.map((step, i) => (
            <StepNode
              key={step.id}
              step={step}
              index={i}
              totalSteps={STEPS.length}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
