import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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
  return (
    <section className="routing-infrastructure container">
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

      <div className="processing-layers">
        {LAYERS.map((layer, i) => (
          <LayerCard key={i} layer={layer} index={i} />
        ))}
      </div>
    </section>
  )
}
