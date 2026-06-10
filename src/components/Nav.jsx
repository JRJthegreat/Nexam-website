import { useEffect, useState } from 'react'
import { CTA_LINK } from '../constants.js'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80)
      const maxScroll = document.body.scrollHeight - window.innerHeight
      setProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Scroll progress bar — fixed at very top, above nav */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          zIndex: 200,
          background: 'linear-gradient(to right, var(--neon-primary), var(--neon-secondary))',
          transformOrigin: 'left',
          transform: `scaleX(${progress})`,
          transition: 'transform 0.1s linear',
        }}
      />

      <nav
        className="header"
        style={{
          height: scrolled ? '56px' : '72px',
          transition: 'height 0.3s ease, background 0.3s ease',
          background: scrolled ? 'rgba(4,7,13,0.97)' : 'rgba(5,5,5,0.8)',
        }}
      >
        <div className="container nav-content">
          <a href="/" className="logo">
            <img src="/logo.png" className="logo-img" alt="NEXAM AI" />
          </a>
          <a
            href={CTA_LINK}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Access the Routing Layer</span>
          </a>
        </div>
      </nav>
    </>
  )
}
