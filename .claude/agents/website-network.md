# NEXAM Website — Network Diagram Agent

Rebuild `src/components/NetworkDiagram.jsx` — animated routing simulation.

## Context
- Project: `/Users/air/NEXAM WEBSITE/Nexam-website/` — Vite + React 18, Tailwind v4
- CSS vars: `--neon-primary: #116780`, `--neon-secondary: #260865`, `--bg-color: #04070D`, `--text-primary: #FAFAFA`, `--text-secondary: #D5DBE6`, `--neon-success: #10B981`
- Reuse CSS classes: `.glass-card`, `.neon-border`, `.container`, `.section-header`, `.font-mono`, `.two-sided-network`
- GSAP: `import { gsap } from 'gsap'` + `import { MotionPathPlugin } from 'gsap/MotionPathPlugin'`; `gsap.registerPlugin(MotionPathPlugin)` at module level
- Named React imports: `import { useEffect, useRef, useState } from 'react'`
- Framer Motion: `import { motion } from 'framer-motion'`

## What to build

SVG-based animated routing simulation inside a 900×400 viewBox.

### Node layout
**Buyer nodes** (x=80), 5 nodes at y = 50, 120, 190, 260, 330:
`Enterprise HR`, `FinTech CFO`, `SaaS Ops`, `Agency Founder`, `Corp Dev`
Style: `fill: rgba(17,103,128,0.15)`, `stroke: rgba(17,103,128,0.4)`, r=20

**NEXAM Hub** (center: x=450, y=200):
- Outer ring: r=55, teal stroke, animated rotation (CSS `rotate` keyframe from index.css)
- Inner: r=42, gradient fill, "NEXAM / ROUTING" text

**Provider nodes** (x=820), 3 nodes at y = 100, 200, 300:
`Staffing Agency`, `HR Tech Platform`, `Exec Search Firm`
Style: `fill: rgba(38,8,101,0.15)`, `stroke: rgba(38,8,101,0.4)`, r=20

### Static SVG paths (REQUIRED for MotionPathPlugin — must have static IDs)
5 paths buyer→hub: `path-buyer-0-to-hub` through `path-buyer-4-to-hub`
3 paths hub→provider: `path-hub-to-provider-0` through `path-hub-to-provider-2`
Cubic bezier paths. Example buyer 0 (80,50) → hub (450,200): `M 80 50 C 200 50 300 200 450 200`
Path style: `stroke: rgba(17,103,128,0.15)`, `strokeWidth: 1`, `fill: none`

### 3 animated data packets
`<circle r={4}` refs: `packet0Ref`, `packet1Ref`, `packet2Ref`. Fill `#116780`, SVG filter for glow.
Each packet runs a self-rescheduling loop (staggered 0 / 700 / 1400ms offsets):
1. Animate along buyer→hub path (MotionPathPlugin, 1.2s, power1.inOut)
2. On complete → animate along hub→provider path
3. On complete → increment routes counter, pulse hub (scale 1 → 1.12 → 1), wait 0.5s, repeat

### Live routes counter
Starts at 47832. Increments on each completed route. Displayed as `toLocaleString()` top-right of card.

### Hover tooltip
On buyer node hover: show tooltip with buyer label, match score (per-node array, 87–97%), latency `< 120ms`, status "Route Active" with green dot. Position by converting SVG coordinates to DOM pixels via `getBoundingClientRect()`.

### Hub rotation
Use existing CSS `@keyframes rotate` (in index.css) on the outer ring: `animation: rotate 20s linear infinite`.

### Cleanup
Kill all GSAP timelines and clearTimeout all pending timeouts in useEffect return.

## File to write
`/Users/air/NEXAM WEBSITE/Nexam-website/src/components/NetworkDiagram.jsx`
