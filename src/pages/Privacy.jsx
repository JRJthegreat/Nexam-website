import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const SECTIONS = [
  {
    title: '1. Introduction',
    content: `NEXAM AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with our services. By accessing our platform, you agree to the terms outlined in this policy.`,
  },
  {
    title: '2. Information We Collect',
    content: `We may collect the following types of information:

• **Contact Information:** Name, email address, phone number, and company name when you submit a form or book a call through our platform.

• **Usage Data:** Information about how you interact with our website, including pages visited, time spent, referring URLs, and browser/device information.

• **Communication Data:** Records of correspondence when you contact us directly via email or through our booking system.

• **Business Information:** Details about your company, target market, and business objectives that you voluntarily provide during onboarding or consultation calls.`,
  },
  {
    title: '3. How We Use Your Information',
    content: `We use the information we collect to:

• Facilitate introductions and connections between solution providers and enterprise buyers through our routing infrastructure.

• Respond to inquiries, schedule alignment calls, and deliver our services.

• Send relevant communications about our platform, updates, and partnership opportunities.

• Improve and optimize the performance of our routing systems and website.

• Comply with applicable legal obligations.

We will only contact you for purposes directly related to the services you have expressed interest in. We do not engage in unsolicited mass marketing.`,
  },
  {
    title: '4. SMS and Text Messaging',
    content: `No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.

If you provide your mobile number and opt in to receive SMS communications from NEXAM AI, you may receive messages related to your inquiry, scheduled calls, or service updates. Message and data rates may apply. You may opt out at any time by replying STOP to any message.`,
  },
  {
    title: '5. Data Sharing and Disclosure',
    content: `We do not sell, trade, or rent your personal information to third parties. We may share information in the following limited circumstances:

• **Service Providers:** Trusted third-party vendors who assist in operating our website or delivering services (e.g., calendar scheduling tools, CRM platforms), subject to confidentiality obligations.

• **Legal Requirements:** When required by law, regulation, or valid legal process, or to protect the rights, safety, or property of NEXAM AI or others.

• **Business Transfers:** In connection with a merger, acquisition, or sale of assets, with appropriate notice to affected users.

We do not share your information with enterprise buyers or other partners without your explicit knowledge and consent as part of the routing process.`,
  },
  {
    title: '6. Cookies and Tracking',
    content: `Our website uses cookies and similar tracking technologies to enhance your browsing experience and analyze site traffic. These may include:

• **Essential Cookies:** Required for basic site functionality.

• **Analytics Cookies:** Help us understand how visitors interact with our site (e.g., Google Analytics).

You can control cookie preferences through your browser settings. Disabling certain cookies may affect your experience on our platform.`,
  },
  {
    title: '7. Data Retention',
    content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, maintain our business relationship with you, or comply with legal obligations. When data is no longer required, we delete or anonymize it in accordance with our internal data governance procedures.`,
  },
  {
    title: '8. Your Rights',
    content: `Depending on your jurisdiction, you may have the right to:

• Access the personal information we hold about you.

• Request correction of inaccurate or incomplete data.

• Request deletion of your personal information, subject to legal obligations.

• Withdraw consent for marketing communications at any time.

• Lodge a complaint with the relevant data protection authority.

To exercise any of these rights, contact us at jude@ainexam.com.`,
  },
  {
    title: '9. Data Security',
    content: `We implement reasonable technical and organizational measures to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.`,
  },
  {
    title: '10. Third-Party Links',
    content: `Our website may contain links to third-party websites, including our booking platform (Cal.com). This Privacy Policy does not apply to those sites. We encourage you to review the privacy policies of any third-party services you access through our platform.`,
  },
  {
    title: '11. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised "Last Updated" date. Continued use of our services after any changes constitutes your acceptance of the updated policy.`,
  },
  {
    title: '12. Contact Us',
    content: `If you have questions, concerns, or requests regarding this Privacy Policy or the handling of your personal information, please contact us at:

**NEXAM AI**
Email: jude@ainexam.com`,
  },
]

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="bg-[#04070D] text-[#FAFAFA] min-h-screen overflow-x-hidden">
      <div className="radial-glow glow-top-left" style={{ opacity: 0.08 }} />

      {/* Minimal nav */}
      <nav style={{
        borderBottom: '1px solid var(--border-color)',
        background: 'rgba(4,7,13,0.97)',
        backdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div className="container nav-content">
          <Link to="/" className="logo">
            <img src="/logo.png" className="logo-img" alt="NEXAM AI" />
          </Link>
          <Link
            to="/"
            style={{
              color: 'var(--text-secondary)', textDecoration: 'none',
              fontSize: '0.9rem', fontFamily: 'var(--font-body)',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      <main style={{ maxWidth: 760, margin: '0 auto', padding: '72px 24px 120px' }}>

        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
          <div className="pill-tag" style={{ marginBottom: '24px' }}>
            <span className="pill-dot" />
            LEGAL
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)',
            letterSpacing: '-0.02em', marginBottom: '16px',
          }}>
            Privacy Policy
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
            Last Updated: June 2026
          </p>
        </div>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {SECTIONS.map((section, i) => (
            <div
              key={i}
              style={{
                paddingBottom: '40px',
                borderBottom: i < SECTIONS.length - 1 ? '1px solid var(--border-color)' : 'none',
              }}
            >
              <h2 style={{
                fontFamily: 'var(--font-heading)', fontSize: '1.2rem',
                color: 'var(--text-primary)', marginBottom: '16px',
              }}>
                {section.title}
              </h2>
              <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                {section.content.split('\n').map((line, j) => {
                  if (line.trim() === '') return <br key={j} />
                  // Bold text between **
                  const parts = line.split(/(\*\*[^*]+\*\*)/)
                  return (
                    <p key={j} style={{ marginBottom: line.startsWith('•') ? '8px' : '0' }}>
                      {parts.map((part, k) =>
                        part.startsWith('**') && part.endsWith('**')
                          ? <strong key={k} style={{ color: 'var(--text-primary)' }}>{part.slice(2, -2)}</strong>
                          : part
                      )}
                    </p>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '32px 24px' }}>
        <div className="container" style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '16px',
        }}>
          <p className="copyright">© 2026 NEXAM AI. All rights reserved.</p>
          <Link to="/" style={{
            color: 'var(--text-secondary)', textDecoration: 'none',
            fontSize: '0.85rem', fontFamily: 'var(--font-body)',
          }}>
            ← Back to Home
          </Link>
        </div>
      </footer>
    </div>
  )
}
