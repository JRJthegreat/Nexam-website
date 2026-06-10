# NEXAM Website — Testimonials Section Agent

Rebuild `src/components/Testimonials.jsx` for the NEXAM AI website.

## Context
- Project: `/Users/air/NEXAM WEBSITE/Nexam-website/` — Vite + React 18, Tailwind v4
- CSS vars: `--neon-primary: #116780`, `--neon-secondary: #260865`, `--bg-color: #04070D`, `--text-primary: #FAFAFA`, `--text-secondary: #D5DBE6`, `--border-color: rgba(255,255,255,0.08)`, `--neon-success: #10B981`
- Reuse CSS classes: `.glass-card`, `.neon-border`, `.container`, `.section-header`, `.pill-tag`, `.pill-dot`, `.font-mono`, `.partner-icon`, `.partner-tag`
- Named React imports: `import { useState, useEffect, useRef } from 'react'`
- Framer Motion: `import { motion, AnimatePresence } from 'framer-motion'`

## Testimonials data (4 case studies)
```js
const TESTIMONIALS = [
  {
    company: 'TalentCount', companyUrl: 'http://talentcount.org', role: 'CEO, Recruitment Tech',
    quote: 'NEXAM routed us directly to three enterprise HR buyers in the first two weeks. We closed our first deal at $340K in under 30 days. Nothing in our traditional SDR stack came close to this.',
    metrics: ['+340% Pipeline', '$340K First Deal', '18 Days to Close'],
  },
  {
    company: 'ProRec Solution', companyUrl: 'http://prorecsolution.com', role: 'Managing Director',
    quote: 'We were spending $15K/month on SDR salaries with inconsistent results. NEXAM replaced that overhead with precision routing. Our cost-per-meeting dropped by 60% in the first month.',
    metrics: ['60% Lower CPM', '4× ROI Month 1', '12 Qualified Meetings'],
  },
  {
    company: 'GRENKE Australia', companyUrl: 'http://grenke.com.au', companyTag: 'AUSTRALIA',
    role: 'Head of Business Development',
    quote: "The routing infrastructure found buyers we didn't even know were in our ICP. The signal intelligence surfaced pain-aligned prospects invisible to our previous outreach strategy.",
    metrics: ['New ICP Segments', '$1.2M Pipeline', '21-Day Activation'],
  },
  {
    company: 'EMRG Media', companyUrl: 'http://emrgmedia.com', role: 'Founder & CEO',
    quote: "As an agency founder, I needed a system that could scale without headcount. NEXAM's variable-cost model meant I only paid for results. The routing layer found our exact buyer profile at scale.",
    metrics: ['Zero Fixed Cost', '8× Deal Value', '30-Day Pipeline Fill'],
  },
]
```

## Card design (two-column: 60% quote / 40% metrics)
- Outer: `.glass-card.neon-border` wrapper
- Left: large `"` quotation mark in gradient text (6rem, absolute top-left), quote at 1.2rem, then favicon + company name + role
- Right: "Key Outcomes" label + 3 metric pill badges (`background: rgba(17,103,128,0.12)`, teal border, `.font-mono`, 0.75rem, pill shape). Right separated by subtle vertical border.
- Mobile: single column via scoped `<style>` breakpoint

Favicon URL: `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url={companyUrl}&size=128` with `onError` fallback to hide.

## Card animation
`AnimatePresence mode="wait"` + `motion.div`:
- `initial={{ opacity:0, y:30, scale:0.97 }}`
- `animate={{ opacity:1, y:0, scale:1 }}`
- `exit={{ opacity:0, y:-20, scale:0.97 }}`
- `transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}`

## Navigation
- Dots: width animates 8px → 24px on active (CSS transition 0.3s). Active dot has teal box-shadow glow.
- Prev/Next arrow buttons, absolutely positioned at carousel midpoint.
- Auto-advance: `setInterval` every 5s, clears on unmount, resets on manual navigation.

Pill tag: `PARTNER RESULTS`. Heading: `The Routing Layer in Action`. Subtext: `Real outcomes from businesses that connected their routing layer.`

## File to write
`/Users/air/NEXAM WEBSITE/Nexam-website/src/components/Testimonials.jsx`
