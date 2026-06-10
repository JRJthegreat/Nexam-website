# NEXAM Website — Nav + CTA + Footer + Global Polish Agent

Rebuild three component files for the NEXAM AI website.

## Context
- Project: `/Users/air/NEXAM WEBSITE/Nexam-website/` — Vite + React 18, Tailwind v4
- CSS vars: `--neon-primary: #116780`, `--neon-secondary: #260865`, `--bg-color: #04070D`, `--text-primary: #FAFAFA`, `--text-secondary: #D5DBE6`, `--border-color: rgba(255,255,255,0.08)`, `--neon-success: #10B981`
- Reuse CSS classes: `.glass-card`, `.neon-border`, `.container`, `.pill-dot`, `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-large`, `.header`, `.nav-content`, `.logo`, `.logo-img`, `.font-mono`, `.cta-section`, `.cta-box`, `.cta-buttons`, `.footer-content`, `.copyright`, `.footer-brand`, `.footer-tagline`
- Named React imports: `import { useEffect, useRef, useState } from 'react'`
- Framer Motion: `import { motion } from 'framer-motion'`
- Import: `import { CTA_LINK } from '../constants.js'`

## File 1: `src/components/Nav.jsx`

Sticky nav with two scroll-driven behaviors:
1. **Height compress**: 72px → 56px after scrollY > 80. `transition: height 0.3s ease`
2. **Background**: `rgba(5,5,5,0.8)` → `rgba(4,7,13,0.97)` after scroll
3. **Scroll progress bar**: fixed 2px bar at very top (`z-index: 200`), `background: linear-gradient(to right, var(--neon-primary), var(--neon-secondary))`, `scaleX(progress)` with `transform-origin: left`, 0.1s linear transition. Progress = `scrollY / (scrollHeight - innerHeight)`.

Both scroll values derived from a single `scroll` event listener. `{ passive: true }`.

Logo: `<img src="/logo.png" className="logo-img" alt="NEXAM AI" />`
CTA: `<a href={CTA_LINK} className="btn btn-primary" ...>Access the Routing Layer</a>`

## File 2: `src/components/CTA.jsx`

### MagneticButton component (internal)
On `mousemove`: calculate offset from button center, if within 80px radius apply `translate(xOffset, yOffset)` proportional to distance (max 12px movement). `transition: none` on enter, snap back with `cubic-bezier(0.25,0.46,0.45,0.94)` on leave.

### Particle burst on click
12 `motion.div` particles spawned at click coordinates, each with a radial angle. Animate outward 60px + fade to opacity 0 over 0.7s. Clear after 800ms via setTimeout.

### Rotating border
Inject via `<style>` tag: `@property --cta-angle` + `@keyframes cta-spin { to { --cta-angle: 360deg; } }`. Div: `conic-gradient(from var(--cta-angle), transparent 30%, var(--neon-primary) 50%, transparent 70%)`, `animation: cta-spin 6s linear infinite`, `opacity: 0.4`, `inset: -1px`, `z-index: 0`.

Content: heading, paragraph, two buttons (MagneticButton primary + secondary link). Particles render inside the MagneticButton with `position: absolute; top: 0; left: 0`.

## File 3: `src/components/Footer.jsx`

Two-column layout (PROTOCOL links / COMPANY links), brand left.

**PROTOCOL links**: Signal Layer, Routing Layer, Connection Layer, Network Diagram (all link to CTA_LINK)
**COMPANY links**: Partner Alignment, Case Studies, Pricing Model, Contact (all link to CTA_LINK)

Bottom bar: copyright left, `[pill-dot] ALL SYSTEMS OPTIMIZED` right in `.font-mono`.
Logo in footer: `height: 28px; opacity: 0.6; filter: grayscale(100%)`
Add `onMouseEnter`/`onMouseLeave` hover on footer links for `text-secondary` → `text-primary` transition.

## Files to write
- `/Users/air/NEXAM WEBSITE/Nexam-website/src/components/Nav.jsx`
- `/Users/air/NEXAM WEBSITE/Nexam-website/src/components/CTA.jsx`
- `/Users/air/NEXAM WEBSITE/Nexam-website/src/components/Footer.jsx`
