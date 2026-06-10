# NEXAM Website — Hero Section Agent

Rebuild `src/components/Hero.jsx` for the NEXAM AI website.

## Context
- Project: `/Users/air/NEXAM WEBSITE/Nexam-website/` — Vite + React 18, Tailwind v4
- CSS vars: `--neon-primary: #116780`, `--neon-secondary: #260865`, `--bg-color: #04070D`, `--text-primary: #FAFAFA`, `--text-secondary: #D5DBE6`, `--neon-success: #10B981`
- Reuse CSS classes from `src/index.css`: `.glass-card`, `.neon-border`, `.gradient-text`, `.pill-tag`, `.pill-dot`, `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-large`, `.font-mono`, `.container`, `.hero`, `.hero-title`, `.hero-subtitle`, `.hero-actions`, `.social-proof`, `.metric-value`, `.metric-label`, `.metric-divider`
- Import: `import { CTA_LINK, METRICS } from '../constants.js'`
- GSAP: `import { gsap } from 'gsap'` + `import { ScrollTrigger } from 'gsap/ScrollTrigger'`; `gsap.registerPlugin(ScrollTrigger)` at module level
- Named React imports only: `import { useEffect, useRef, useState } from 'react'`
- Reference canvas code from `_old_script.js` (lines 22–122)

## What to build

### NetworkCanvas (internal component in same file)
Enhanced version of the original canvas animation:
- Fixed, full-viewport canvas, z-index -2, opacity 0.7, pointer-events none
- Particle density: `Math.floor((width * height) / 8000)` (denser than original)
- Particles: random size 0.5–3px, random opacity 0.3–0.9
- Connection lines at dist < 100: teal `rgba(17, 103, 128, opacity)` with distance-based fade
- Data packets: every 3s, spawn a 3px bright teal dot that travels between two random particles over 1.5s (linear interpolation)
- Mouse interaction within 180px: purple connection lines + gentle repulsion within 80px
- Full cleanup on unmount: cancelAnimationFrame, clearInterval, event listeners

### Hero section content
Pill tag → h1 (gradient text second line) → subtitle → two CTA buttons → metrics glass card → floating status badges

### GSAP entry animations (use `gsap.context()` for cleanup)
Stagger in sequence on mount:
1. Pill tag: `{ y: -20, opacity: 0 }` → 0s delay
2. h1 lines: `{ y: 40, opacity: 0 }` → 0.15s stagger
3. Subtitle: `{ y: 30, opacity: 0 }` → 0.4s delay
4. CTA buttons: `{ y: 20, opacity: 0, scale: 0.95 }` → 0.6s delay, 0.1s stagger
5. Metrics card: `{ y: 40, opacity: 0 }` → 0.9s delay
All use `ease: "power3.out"` and `gsap.fromTo()`.

### Animated metric counters
IntersectionObserver triggers a count-up animation for each metric when the card enters viewport:
- `$10M+` → count 0 to 10, prefix `$`, suffix `M+`
- `>75` → count 0 to 75, prefix `>`
- `120ms` → count 0 to 120, suffix `ms`
Counter runs over 1.5s using setInterval. Clean up on unmount.

### Floating status badges
Three pill-shaped badges with absolute positioning (top-right area of section):
- `[green dot] LATENCY: 120ms`
- `[green dot] SIGNAL: ACTIVE`  
- `[green dot] NODE: VALIDATED`
Style: `background: rgba(17,103,128,0.15)`, `border: 1px solid rgba(17,103,128,0.3)`, `font-family: var(--font-mono)`, `font-size: 0.65rem`, `color: var(--neon-primary)`
CSS `float-badge` keyframe: moves ±6px vertically, different durations (4s, 5s, 6s) and delays per badge. Inject via `<style>` tag.

## File to write
`/Users/air/NEXAM WEBSITE/Nexam-website/src/components/Hero.jsx`
