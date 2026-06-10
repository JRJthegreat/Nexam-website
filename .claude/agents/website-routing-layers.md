# NEXAM Website — Routing Layers + Process Timeline Agent

Rebuild two component files for the NEXAM AI website.

## Context
- Project: `/Users/air/NEXAM WEBSITE/Nexam-website/` — Vite + React 18, Tailwind v4
- CSS vars: `--neon-primary: #116780`, `--neon-secondary: #260865`, `--bg-color: #04070D`, `--text-primary: #FAFAFA`, `--text-secondary: #D5DBE6`, `--border-color: rgba(255,255,255,0.08)`, `--neon-success: #10B981`
- Reuse CSS classes: `.glass-card`, `.neon-border`, `.container`, `.section-header`, `.pill-tag`, `.pill-dot`, `.font-mono`, `.layer-card`, `.layer-header`, `.processing-layers`, `.routing-infrastructure`
- GSAP: `import { gsap } from 'gsap'` + `import { ScrollTrigger } from 'gsap/ScrollTrigger'`; `gsap.registerPlugin(ScrollTrigger)` at module level
- Framer Motion: `import { motion, useInView } from 'framer-motion'`
- Named React imports: `import { useEffect, useRef } from 'react'`

## File 1: `src/components/RoutingLayers.jsx`

### Layers data
```js
const LAYERS = [
  { num: '01', title: 'Signal Layer', desc: 'We monitor the market for high-intent pain signals, mapping your exact solution to the problems buyers are actively trying to solve.' },
  { num: '02', title: 'Routing Layer', desc: 'Our system-level processing dynamically maps the connection, aligning your offer intelligently with the targeted nodes without manual latency.' },
  { num: '03', title: 'Connection Layer', desc: 'Your ideal client is delivered on demand. Highly qualified prospects are automatically routed directly to your calendar or Slack pipeline.' },
]
```

### Animations
- Each `LayerCard` uses Framer Motion `whileInView` with alternating entrance: even cards slide from x: -60, odd from x: 60, opacity 0 → 1
- Transition: `{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }`
- Layer number badge glows with `box-shadow: 0 0 20px var(--neon-primary)` when in view
- Vertical SVG dashed connector line behind the cards — GSAP ScrollTrigger `scrub: 1` animates `strokeDashoffset` from full height to 0

### SVG connector
Absolutely positioned behind `.processing-layers`. Height measured via `ResizeObserver` on the wrapper. Kill ScrollTrigger in useEffect cleanup.

## File 2: `src/components/ProcessTimeline.jsx`

### Steps data
```js
const STEPS = [
  { id: '01', label: 'Signal Detected', desc: 'High-intent buyer pain identified in real-time.' },
  { id: '02', label: 'Profile Matched', desc: 'ICP scored and validated against your exact criteria.' },
  { id: '03', label: 'Route Mapped', desc: 'Optimal connection pathway dynamically calculated.' },
  { id: '04', label: 'Connection Established', desc: 'Qualified prospect delivered to your calendar.' },
  { id: '05', label: 'ROI Delivered', desc: 'Validated B2B transaction completed in 21-30 days.' },
]
```

### Layout
Horizontal flex row with `minWidth: 600px` + `overflowX: auto` for mobile. 5 step nodes distributed evenly. Horizontal SVG line spanning full width. Each node: 32×32px circle on the line. When line reaches node (scroll-driven): border → `var(--neon-primary)`, inner dot fills teal, box-shadow glow.

SVG line: GSAP ScrollTrigger `scrub: 1` animates `strokeDashoffset` left-to-right. Width measured via ResizeObserver. Kill in cleanup.

Pill tag: `THE PROCESS`. Heading: `From Signal to Revenue`. Subtext: `Five stages. Zero manual latency.`

## Files to write
- `/Users/air/NEXAM WEBSITE/Nexam-website/src/components/RoutingLayers.jsx`
- `/Users/air/NEXAM WEBSITE/Nexam-website/src/components/ProcessTimeline.jsx`
