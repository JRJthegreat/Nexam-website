import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TESTIMONIALS = [
  {
    company: 'TalentCount',
    companyUrl: 'http://talentcount.org',
    role: 'CEO, Recruitment Tech',
    quote:
      'NEXAM routed us directly to three enterprise HR buyers in the first two weeks. We closed our first deal at $340K in under 30 days. Nothing in our traditional SDR stack came close to this.',
    metrics: ['+340% Pipeline', '$340K First Deal', '18 Days to Close'],
  },
  {
    company: 'ProRec Solution',
    companyUrl: 'http://prorecsolution.com',
    role: 'Managing Director',
    quote:
      'We were spending $15K/month on SDR salaries with inconsistent results. NEXAM replaced that overhead with precision routing. Our cost-per-meeting dropped by 60% in the first month.',
    metrics: ['60% Lower CPM', '4× ROI Month 1', '12 Qualified Meetings'],
  },
  {
    company: 'GRENKE Australia',
    companyUrl: 'http://grenke.com.au',
    companyTag: 'AUSTRALIA',
    role: 'Head of Business Development',
    quote:
      "The routing infrastructure found buyers we didn't even know were in our ICP. The signal intelligence surfaced pain-aligned prospects that were invisible to our previous outreach strategy.",
    metrics: ['New ICP Segments', '$1.2M Pipeline', '21-Day Activation'],
  },
  {
    company: 'EMRG Media',
    companyUrl: 'http://emrgmedia.com',
    role: 'Founder & CEO',
    quote:
      "As an agency founder, I needed a system that could scale without headcount. NEXAM's variable-cost model meant I only paid for results. The routing layer found our exact buyer profile at scale.",
    metrics: ['Zero Fixed Cost', '8× Deal Value', '30-Day Pipeline Fill'],
  },
]

function faviconUrl(companyUrl) {
  return `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(companyUrl)}&size=128`
}

function MetricPill({ label }) {
  return (
    <span
      style={{
        background: 'rgba(17,103,128,0.12)',
        border: '1px solid rgba(17,103,128,0.25)',
        color: 'var(--neon-primary)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        padding: '6px 14px',
        borderRadius: '999px',
        whiteSpace: 'nowrap',
        letterSpacing: '0.03em',
      }}
    >
      {label}
    </span>
  )
}

function ActiveCard({ testimonial }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.97 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card neon-border"
      style={{
        padding: '48px',
        display: 'grid',
        gridTemplateColumns: '3fr 2fr',
        gap: '48px',
        alignItems: 'center',
      }}
    >
      {/* Quote area */}
      <div style={{ position: 'relative' }}>
        {/* Decorative large quotation mark */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-16px',
            left: '-8px',
            fontSize: '6rem',
            lineHeight: 1,
            fontFamily: 'var(--font-heading)',
            background: 'linear-gradient(135deg, var(--neon-primary), var(--neon-secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            pointerEvents: 'none',
            userSelect: 'none',
            opacity: 0.6,
          }}
        >
          &ldquo;
        </span>

        {/* Quote text */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.2rem',
            color: 'var(--text-primary)',
            lineHeight: 1.7,
            paddingTop: '40px',
            marginBottom: '32px',
            fontStyle: 'normal',
          }}
        >
          {testimonial.quote}
        </p>

        {/* Attribution */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img
            src={faviconUrl(testimonial.companyUrl)}
            alt={`${testimonial.company} logo`}
            width={28}
            height={28}
            style={{
              borderRadius: '6px',
              objectFit: 'contain',
              background: 'rgba(255,255,255,0.05)',
              flexShrink: 0,
            }}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '2px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--text-primary)',
                }}
              >
                {testimonial.company}
              </span>
              {testimonial.companyTag && (
                <span className="partner-tag">{testimonial.companyTag}</span>
              )}
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                letterSpacing: '0.03em',
              }}
            >
              {testimonial.role}
            </span>
          </div>
        </div>
      </div>

      {/* Metrics area */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          alignItems: 'flex-start',
          borderLeft: '1px solid var(--border-color)',
          paddingLeft: '48px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--text-secondary)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '4px',
          }}
        >
          Key Outcomes
        </p>
        {testimonial.metrics.map((metric, i) => (
          <MetricPill key={i} label={metric} />
        ))}
      </div>

      {/* Mobile-only metrics (hidden on desktop via inline style + CSS) */}
      <style>{`
        @media (max-width: 768px) {
          .testimonial-card-grid {
            grid-template-columns: 1fr !important;
          }
          .testimonial-metrics-col {
            border-left: none !important;
            padding-left: 0 !important;
            border-top: 1px solid var(--border-color) !important;
            padding-top: 24px !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
          }
          .testimonial-card-wrap {
            padding: 32px 24px !important;
          }
        }
      `}</style>
    </motion.div>
  )
}

function DotButton({ active, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Go to testimonial"
      style={{
        width: active ? '24px' : '8px',
        height: '8px',
        borderRadius: '999px',
        background: active ? 'var(--neon-primary)' : 'rgba(255,255,255,0.2)',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        transition: 'width 0.3s ease, background 0.3s ease',
        flexShrink: 0,
        boxShadow: active ? '0 0 8px rgba(17,103,128,0.6)' : 'none',
      }}
    />
  )
}

function ArrowButton({ direction, onClick }) {
  const isLeft = direction === 'left'
  return (
    <button
      onClick={onClick}
      aria-label={isLeft ? 'Previous testimonial' : 'Next testimonial'}
      style={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        [isLeft ? 'left' : 'right']: '-20px',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'rgba(17,103,128,0.12)',
        border: '1px solid rgba(17,103,128,0.25)',
        color: 'var(--neon-primary)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.1rem',
        transition: 'background 0.2s ease, box-shadow 0.2s ease',
        zIndex: 10,
        lineHeight: 1,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(17,103,128,0.25)'
        e.currentTarget.style.boxShadow = '0 0 16px rgba(17,103,128,0.3)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(17,103,128,0.12)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {isLeft ? '‹' : '›'}
    </button>
  )
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const intervalRef = useRef(null)

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 5000)
  }

  useEffect(() => {
    startInterval()
    return () => clearInterval(intervalRef.current)
  }, [])

  const navigate = (index) => {
    setActiveIndex(index)
    startInterval()
  }

  const prev = () => navigate((activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => navigate((activeIndex + 1) % TESTIMONIALS.length)

  return (
    <section className="container" style={{ padding: '80px 24px' }}>
      {/* Section header */}
      <div className="section-header">
        <div className="pill-tag">
          <span className="pill-dot" />
          PARTNER RESULTS
        </div>
        <h2>The Routing Layer in Action</h2>
        <p>Real outcomes from businesses that connected their routing layer.</p>
      </div>

      {/* Carousel wrapper */}
      <div style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto' }}>
        {/* Cards area */}
        <div
          style={{
            overflow: 'hidden',
            position: 'relative',
            minHeight: '320px',
          }}
        >
          <AnimatePresence mode="wait">
            <ActiveCard key={activeIndex} testimonial={TESTIMONIALS[activeIndex]} />
          </AnimatePresence>
        </div>

        {/* Prev / Next arrows */}
        <ArrowButton direction="left" onClick={prev} />
        <ArrowButton direction="right" onClick={next} />

        {/* Navigation dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            marginTop: '32px',
          }}
        >
          {TESTIMONIALS.map((_, i) => (
            <DotButton key={i} active={i === activeIndex} onClick={() => navigate(i)} />
          ))}
        </div>
      </div>
    </section>
  )
}
