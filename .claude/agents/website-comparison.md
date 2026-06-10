# NEXAM Website — Comparison + Pricing Agent

Rebuild two component files for the NEXAM AI website.

## Context
- Project: `/Users/air/NEXAM WEBSITE/Nexam-website/` — Vite + React 18, Tailwind v4
- CSS vars: `--neon-primary: #116780`, `--neon-secondary: #260865`, `--bg-color: #04070D`, `--text-primary: #FAFAFA`, `--text-secondary: #D5DBE6`, `--border-color: rgba(255,255,255,0.08)`, `--neon-success: #10B981`, `--neon-error: #EF4444`
- Reuse CSS classes: `.glass-card`, `.neon-border`, `.container`, `.section-header`, `.pill-tag`, `.pill-dot`, `.font-mono`, `.comparison`, `.card-header`, `.status-badge`, `.comparison-list`, `.icon-x`, `.icon-check`, `.btn`, `.btn-primary`, `.btn-large`
- Named React imports: `import { useState, useRef } from 'react'`
- Framer Motion: `import { motion, AnimatePresence } from 'framer-motion'`
- Import: `import { CTA_LINK } from '../constants.js'`

## File 1: `src/components/Comparison.jsx`

### 3 columns
```js
const COLUMNS = [
  { title: 'Traditional SDR / Agency', badge: { text: 'High Latency', type: 'error' },
    items: [
      { icon: 'x', text: 'Broad "Spray and Pray" Targeting' },
      { icon: 'x', text: 'High Overhead (Salaries, Benefits)' },
      { icon: 'x', text: '3–6 Months to See Results' },
      { icon: 'x', text: 'Ignored by Spam Filters' },
      { icon: 'x', text: 'No Signal Intelligence' },
    ], variant: 'traditional' },
  { title: 'AI Tools Alone', badge: { text: 'Incomplete', type: 'warning' },
    items: [
      { icon: 'x', text: 'No Validated Buyer Intent' },
      { icon: 'x', text: 'Requires In-House Expertise' },
      { icon: 'x', text: 'Still 60–90 Days to Pipeline' },
      { icon: 'check', text: 'Lower Cost Base' },
      { icon: 'x', text: 'No Routing Infrastructure' },
    ], variant: 'ai-tools' },
  { title: 'NEXAM Protocol', badge: { text: 'Optimized', type: 'success' },
    items: [
      { icon: 'check', text: 'Precision Pain-Signal Routing' },
      { icon: 'check', text: 'Variable-Based Cost Structure' },
      { icon: 'check', text: 'Direct ROI in 21–30 Days' },
      { icon: 'check', text: 'Multi-Node Inbox Control' },
      { icon: 'check', text: 'Intelligent ICP Matching' },
    ], variant: 'nexam', featured: true },
]
```

Featured NEXAM column: `.glass-card.neon-border`, `transform: scaleY(1.02)`, `background: rgba(17,103,128,0.05)`.
Warning badge: `rgba(245,158,11,0.1)` bg, `#F59E0B` text, matching border.
Each `motion.li`: `initial={{ opacity:0, x:-20 }}`, `whileInView={{ opacity:1, x:0 }}`, `viewport={{ once:true }}`, `transition={{ delay: index*0.08, duration:0.5 }}`.
Layout: `display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; max-width: 1000px; margin: 0 auto; align-items: stretch`.
Pill tag: `THE FUNDAMENTAL SHIFT`. Heading: `A New Paradigm in B2B Growth`.

## File 2: `src/components/Pricing.jsx`

Single centered performance-based pricing card, max-width 600px.

### Rotating conic-gradient border
Inject via `<style>` tag:
```css
@property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
@keyframes spin-border { to { --angle: 360deg; } }
```
Absolutely positioned div: `background: conic-gradient(from var(--angle, 0deg), #116780, #260865, #116780)`, `animation: spin-border 4s linear infinite`, `opacity: 0.4`, `inset: -2px`, `border-radius: 18px`, `z-index: -1`.

### SVG ROI arc gauge (200×120 viewBox)
Background arc + animated fill arc. `strokeDasharray={251}`. Animate `strokeDashoffset` from 251 → 60 (~76% filled) on scroll into view.
Gradient: `linearGradient` teal→purple. Center label: `4–8×` ROI MULTIPLIER.

### Three value prop metric cards (3-column grid)
1. `Performance-Based` / `No Fixed Overhead`
2. `21–30 Days` / `Time to First ROI`
3. `75+ Active Nodes` / `Validated Buyer Pool`
Style: `background: rgba(17,103,128,0.08)`, `border: 1px solid rgba(17,103,128,0.2)`, staggered `motion.div` fade-up on scroll.

Pill tag: `PERFORMANCE MODEL`. Heading: `Aligned With Your Success`. CTA button → `CTA_LINK`.

## Files to write
- `/Users/air/NEXAM WEBSITE/Nexam-website/src/components/Comparison.jsx`
- `/Users/air/NEXAM WEBSITE/Nexam-website/src/components/Pricing.jsx`
