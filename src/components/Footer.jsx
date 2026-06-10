import { Link } from 'react-router-dom'

export default function Footer() {
  const linkStyle = {
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.2s ease',
    fontFamily: 'var(--font-body)',
  }

  return (
    <footer>
      <div
        className="container footer-content"
        style={{ flexDirection: 'column', gap: '32px', padding: '48px 24px 32px' }}
      >
        {/* Top row: brand + links */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', flexWrap: 'wrap', gap: '32px', width: '100%',
        }}>
          <div className="footer-brand">
            <img
              src="/logo.png"
              alt="NEXAM AI"
              style={{ height: 28, opacity: 0.6, filter: 'grayscale(100%)' }}
            />
            <p className="footer-tagline">
              Connecting B2B executives with their ideal clients.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <Link
              to="/privacy"
              style={linkStyle}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              Privacy Policy
            </Link>
            <a
              href="mailto:jude@ainexam.com"
              style={linkStyle}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              Contact
            </a>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: '100%', height: '1px', background: 'var(--border-color)' }} />

        {/* Bottom row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '16px',
        }}>
          <p className="copyright">© 2026 NEXAM AI. All rights reserved.</p>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            color: 'var(--text-secondary)', letterSpacing: '0.05em',
          }}>
            <span className="pill-dot" style={{ flexShrink: 0 }} />
            ALL SYSTEMS OPTIMIZED
          </div>
        </div>
      </div>
    </footer>
  )
}
