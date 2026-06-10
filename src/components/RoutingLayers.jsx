import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LAYERS = [
  {
    num: '01',
    title: 'Signal Layer',
    desc: 'We monitor the market for high-intent pain signals, mapping your exact solution to the problems buyers are actively trying to solve.',
  },
  {
    num: '02',
    title: 'Routing Layer',
    desc: 'Our system-level processing dynamically maps the connection, aligning your offer intelligently with the targeted nodes without manual latency.',
  },
  {
    num: '03',
    title: 'Connection Layer',
    desc: 'Your ideal client is delivered on demand. Highly qualified prospects are automatically routed directly to your calendar or Slack pipeline.',
  },
]

function LayerCard({ layer, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className="glass-card neon-border layer-card"
      initial={{ x: index % 2 === 0 ? -60 : 60, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="layer-header">
        <span
          className="font-mono"
          style={{
            fontSize: '1.5rem',
            color: 'var(--neon-primary)',
            background: 'rgba(17, 103, 128, 0.1)',
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(17, 103, 128, 0.3)',
            transition: 'box-shadow 0.4s ease',
            boxShadow: isInView ? '0 0 20px var(--neon-primary)' : 'none',
          }}
        >
          {layer.num}
        </span>
        <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>
          {layer.title}
        </h3>
      </div>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
        {layer.desc}
      </p>
    </motion.div>
  )
}

export default function RoutingLayers() {
  const sectionRef = useRef(null)
  const wrapperRef = useRef(null)
  const lineRef = useRef(null)
  const svgRef = useRef(null)
  const [svgHeight, setSvgHeight] = useState(0)

  useEffect(() => {
    const updateHeight = () => {
      if (wrapperRef.current) {
        setSvgHeight(wrapperRef.current.offsetHeight)
      }
    }
    updateHeight()
    const ro = new ResizeObserver(updateHeight)
    if (wrapperRef.current) ro.observe(wrapperRef.current)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!lineRef.current || !svgRef.current || svgHeight === 0) return

    const totalLength = svgHeight
    gsap.set(lineRef.current, {
      strokeDasharray: totalLength,
      strokeDashoffset: totalLength,
    })

    const trigger = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(lineRef.current, {
          strokeDashoffset: totalLength * (1 - self.progress),
        })
      },
    })

    return () => trigger.kill()
  }, [svgHeight])

  return (
    <section ref={sectionRef} className="routing-infrastructure container">
      <div className="section-header">
        <div className="pill-tag">
          <span className="pill-dot" />
          THE ROUTING LAYER
        </div>
        <h2>Connect with your ideal clients</h2>
        <p>
          B2B executives and business owners partner in our process to discover
          high-value prospects. Every connection is engineered — not guessed.
        </p>
      </div>

      <div ref={wrapperRef} style={{ position: 'relative' }}>
        {/* SVG vertical connector line behind cards */}
        {svgHeight > 0 && (
          <svg
            ref={svgRef}
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              transform: 'translateX(-50%)',
              width: '2px',
              height: svgHeight,
              pointerEvents: 'none',
              zIndex: 0,
              overflow: 'visible',
            }}
          >
            <line
              ref={lineRef}
              x1="1"
              y1="0"
              x2="1"
              y2={svgHeight}
              stroke="var(--neon-primary)"
              strokeWidth="1"
              strokeDasharray={`6 8`}
              strokeDashoffset={svgHeight}
              strokeLinecap="round"
            />
          </svg>
        )}

        <div className="processing-layers" style={{ position: 'relative', zIndex: 1 }}>
          {LAYERS.map((layer, i) => (
            <LayerCard key={i} layer={layer} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
