import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CTA_LINK, METRICS } from '../constants.js'

gsap.registerPlugin(ScrollTrigger)

// ─── NetworkCanvas ────────────────────────────────────────────────────────────

function NetworkCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    // ── Particles ──────────────────────────────────────────────────────────

    const particles = []

    class Particle {
      constructor(w, h) {
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.radius = Math.random() * 2.5 + 0.5  // 0.5–3px
        this.opacity = Math.random() * 0.6 + 0.3  // 0.3–0.9
      }
      update(w, h) {
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0 || this.x > w) this.vx *= -1
        if (this.y < 0 || this.y > h) this.vy *= -1
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(17, 103, 128, ${this.opacity})`
        ctx.fill()
      }
    }

    function buildParticles(w, h) {
      particles.length = 0
      const count = Math.floor((w * h) / 8000)
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(w, h))
      }
    }

    buildParticles(width, height)

    // ── Data packets ───────────────────────────────────────────────────────

    const packets = []

    function spawnPacket() {
      if (particles.length < 2) return
      const aIdx = Math.floor(Math.random() * particles.length)
      let bIdx
      do { bIdx = Math.floor(Math.random() * particles.length) } while (bIdx === aIdx)
      const src = particles[aIdx]
      const dst = particles[bIdx]
      packets.push({
        sx: src.x, sy: src.y,
        tx: dst.x, ty: dst.y,
        x: src.x, y: src.y,
        startTime: performance.now(),
        duration: 1500,
      })
    }

    const packetTimer = setInterval(spawnPacket, 3000)
    spawnPacket()

    function updatePackets(now) {
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i]
        const progress = Math.min(1, (now - p.startTime) / p.duration)
        p.x = p.sx + (p.tx - p.sx) * progress
        p.y = p.sy + (p.ty - p.sy) * progress
        if (progress >= 1) packets.splice(i, 1)
      }
    }

    function drawPackets() {
      for (const p of packets) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(17, 220, 255, 0.95)'
        ctx.shadowColor = 'rgba(17, 220, 255, 0.8)'
        ctx.shadowBlur = 6
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    // ── Mouse ──────────────────────────────────────────────────────────────

    const mouse = { x: null, y: null }
    const onMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Animation loop ─────────────────────────────────────────────────────

    let rafId

    function animate(now) {
      ctx.clearRect(0, 0, width, height)
      updatePackets(now)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(width, height)
        particles[i].draw()

        // particle–particle connections (dist < 100)
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            const opacity = (1 - dist / 100) * 0.25
            ctx.beginPath()
            ctx.strokeStyle = `rgba(17, 103, 128, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }

        // mouse connections + gentle repulsion (dist < 180)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particles[i].x - mouse.x
          const dy = particles[i].y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 180) {
            const opacity = (1 - dist / 180) * 0.4
            ctx.beginPath()
            ctx.strokeStyle = `rgba(38, 8, 101, ${opacity})`
            ctx.lineWidth = 1
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
            if (dist < 80 && dist > 0) {
              particles[i].x += (dx / dist) * 0.8
              particles[i].y += (dy / dist) * 0.8
            }
          }
        }
      }

      drawPackets()
      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)

    // ── Resize ─────────────────────────────────────────────────────────────

    const onResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      buildParticles(width, height)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      clearInterval(packetTimer)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -2,
        pointerEvents: 'none',
        opacity: 0.7,
      }}
    />
  )
}

// ─── MetricBlock with count-up ────────────────────────────────────────────────

function MetricBlock({ metric }) {
  // Parse "$10M+" → prefix="$", target=10, suffix="M+"
  // Parse ">75"  → prefix=">", target=75, suffix=""
  // Parse "120ms"→ prefix="", target=120, suffix="ms"
  const match = metric.value.match(/^([^0-9]*)(\d+)(.*)$/)
  const prefix = match ? match[1] : ''
  const target = match ? parseInt(match[2], 10) : 0
  const suffix = match ? match[3] : ''

  const [count, setCount] = useState(0)
  const intervalRef = useRef(null)
  const blockRef = useRef(null)

  useEffect(() => {
    const el = blockRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        observer.disconnect()
        const duration = 1500
        const startTime = performance.now()
        intervalRef.current = setInterval(() => {
          const elapsed = performance.now() - startTime
          const progress = Math.min(elapsed / duration, 1)
          setCount(Math.floor(progress * target))
          if (progress >= 1) {
            clearInterval(intervalRef.current)
            setCount(target)
          }
        }, 16)
      },
      { threshold: 0.5 }
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [target])

  return (
    <div className="metric-block" ref={blockRef}>
      <div className={`metric-value${metric.mono ? ' font-mono' : ''}`}>
        {prefix}{count}{suffix}
      </div>
      <div className="metric-label">{metric.label}</div>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const BADGES = [
  { label: 'LATENCY', value: '120ms', delay: '0s',   duration: '3s' },
  { label: 'SIGNAL',  value: 'ACTIVE',    delay: '0.8s', duration: '3.7s' },
  { label: 'NODE',    value: 'VALIDATED', delay: '1.6s', duration: '4.4s' },
]

export default function Hero() {
  const pillRef    = useRef(null)
  const titleRef   = useRef(null)
  const subtitleRef = useRef(null)
  const actionsRef  = useRef(null)
  const metricsRef  = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Pill tag
      gsap.fromTo(
        pillRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      )

      // 2. h1 — animate as a whole (two visual lines inside one element)
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.15 }
      )

      // 3. Subtitle
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.4 }
      )

      // 4. CTA buttons — staggered
      if (actionsRef.current) {
        gsap.fromTo(
          Array.from(actionsRef.current.children),
          { y: 20, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
            delay: 0.6,
          }
        )
      }

      // 5. Metrics card
      gsap.fromTo(
        metricsRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.9 }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero container" style={{ position: 'relative' }}>
      <NetworkCanvas />

      {/* Pill tag */}
      <div className="pill-tag" ref={pillRef}>
        <span className="pill-dot" />
        <span>INFRASTRUCTURE &bull; NOT A SERVICE</span>
      </div>

      {/* Headline */}
      <h1 className="hero-title" ref={titleRef}>
        Banks route capital.<br />
        <span className="gradient-text">We route access.</span>
      </h1>

      {/* Subtitle */}
      <p className="hero-subtitle" ref={subtitleRef}>
        NEXAM AI is the routing layer between businesses and their Ideal Client Profile.
        We don&rsquo;t replace your BD team &mdash; we give them an unfair information advantage.
      </p>

      {/* CTA buttons */}
      <div
        className="hero-actions"
        ref={actionsRef}
        style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
      >
        <a
          href={CTA_LINK}
          className="btn btn-primary btn-large"
          target="_blank"
          rel="noopener noreferrer"
        >
          Initialize Connection
        </a>
        <a
          href={CTA_LINK}
          className="btn btn-secondary btn-large"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </a>
      </div>

      {/* Metrics card */}
      <div className="social-proof glass-card" ref={metricsRef}>
        {METRICS.map((metric, i) => (
          <div key={metric.label} style={{ display: 'contents' }}>
            <MetricBlock metric={metric} />
            {i < METRICS.length - 1 && <div className="metric-divider" />}
          </div>
        ))}
      </div>

      {/* Floating status badges */}
      <div
        style={{
          position: 'absolute',
          top: '120px',
          right: '0',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        {BADGES.map((badge) => (
          <div
            key={badge.label}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 10px',
              borderRadius: '999px',
              background: 'rgba(17, 103, 128, 0.15)',
              border: '1px solid rgba(17, 103, 128, 0.3)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--neon-primary)',
              letterSpacing: '0.08em',
              animation: `float-badge ${badge.duration} ease-in-out ${badge.delay} infinite alternate`,
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: 'var(--neon-success)',
                boxShadow: '0 0 6px var(--neon-success)',
                flexShrink: 0,
              }}
            />
            {badge.label}: {badge.value}
          </div>
        ))}
      </div>

      {/* float-badge keyframes — injected once inline */}
      <style>{`
        @keyframes float-badge {
          from { transform: translateY(0px); }
          to   { transform: translateY(-6px); }
        }
      `}</style>
    </section>
  )
}
