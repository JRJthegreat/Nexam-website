import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CTA_LINK } from '../constants.js'

// ---------------------------------------------------------------------------
// MagneticButton — translates slightly toward the cursor on hover
// ---------------------------------------------------------------------------
function MagneticButton({ href, children, className, onClick }) {
  const btnRef = useRef(null)

  const handleMouseEnter = () => {
    if (btnRef.current) btnRef.current.style.transition = 'none'
  }

  const handleMouseMove = (e) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const distance = Math.sqrt(x * x + y * y)
    const maxDistance = 80
    if (distance < maxDistance) {
      const factor = (1 - distance / maxDistance) * 12
      btn.style.transform = `translate(${(x * factor) / distance}px, ${(y * factor) / distance}px)`
    }
  }

  const handleMouseLeave = () => {
    if (btnRef.current) {
      btnRef.current.style.transition =
        'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)'
      btnRef.current.style.transform = 'translate(0, 0)'
    }
  }

  return (
    <a
      ref={btnRef}
      href={href}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

// ---------------------------------------------------------------------------
// CTA section
// ---------------------------------------------------------------------------
export default function CTA() {
  const [particles, setParticles] = useState([])

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      angle: (i / 12) * Math.PI * 2,
      x,
      y,
    }))
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 800)
  }

  return (
    <section className="cta-section container">
      {/* Rotating conic-gradient border decoration */}
      <style>{`
        @property --cta-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes cta-spin {
          to { --cta-angle: 360deg; }
        }
      `}</style>

      <div
        className="glass-card cta-box neon-border"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        {/* Animated conic-gradient border overlay */}
        <div
          style={{
            position: 'absolute',
            inset: -1,
            borderRadius: 17,
            zIndex: 0,
            background:
              'conic-gradient(from var(--cta-angle, 0deg), transparent 30%, var(--neon-primary) 50%, transparent 70%)',
            animation: 'cta-spin 6s linear infinite',
            opacity: 0.4,
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2>Ready to connect the routing layer?</h2>
          <p>
            Stop waiting for FOMO to creep in. Bypass the noise and establish a
            direct path to your ideal client base today.
          </p>

          <div className="cta-buttons" style={{ position: 'relative' }}>
            {/* Primary magnetic button with particle burst */}
            <MagneticButton
              href={CTA_LINK}
              className="btn btn-primary btn-large"
              onClick={handleClick}
            >
              {/* Button label */}
              <span style={{ position: 'relative', zIndex: 1 }}>
                Book Initialization Call
              </span>

              {/* Particle burst — absolutely positioned inside button */}
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ x: p.x, y: p.y, opacity: 1, scale: 1 }}
                  animate={{
                    x: p.x + Math.cos(p.angle) * 60,
                    y: p.y + Math.sin(p.angle) * 60,
                    opacity: 0,
                    scale: 0.3,
                  }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--neon-primary)',
                    pointerEvents: 'none',
                    zIndex: 0,
                  }}
                />
              ))}
            </MagneticButton>

            <a
              href={CTA_LINK}
              className="btn btn-secondary btn-large"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
