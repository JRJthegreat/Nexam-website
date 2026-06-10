# NEXAM Website — TrustedBy Section Agent

Rebuild `src/components/TrustedBy.jsx` for the NEXAM AI website.

## Context
- Project: `/Users/air/NEXAM WEBSITE/Nexam-website/` — Vite + React 18, Tailwind v4
- CSS vars: `--neon-primary: #116780`, `--text-secondary: #D5DBE6`, `--border-color: rgba(255,255,255,0.08)`
- Reuse CSS classes: `.trusted-by`, `.trusted-label`, `.partner-logo-group.horizontal`, `.partner-icon`, `.partner-name`, `.partner-tag`
- Import: `import { PARTNERS } from '../constants.js'`
- Named React imports: `import { useRef, useState } from 'react'`
- No external dependencies beyond react + constants.js

## What to build

An infinite marquee logo strip with smooth CSS animation.

### Structure
- Section with class `.trusted-by`
- `<h3 className="trusted-label">Trusted by Industry Leaders</h3>`
- A track wrapper div with `overflow: hidden; position: relative`
- Left/right blur edge masks using `background: linear-gradient(to right, #04070D, transparent)` (120px wide each)
- Marquee track renders `[...PARTNERS, ...PARTNERS]` (duplicated for seamless loop)
- Track animation: `animation: 'scroll-left 25s linear infinite'` — the `scroll-left` keyframe is defined in `src/index.css` (translates to -50%)

### PartnerLogo sub-component
Favicon URL: `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url={partner.url}&size=128`
Show `.partner-icon` (32×32, grayscale, transition to color on hover), `.partner-name`, and `.partner-tag` if partner.tag exists.

### Pause on hover
Use `useRef` on the track + `useState` for paused flag. `animationPlayState: paused/running` on the track. Propagate `onMouseEnter`/`onMouseLeave` to each partner logo so hovering any logo pauses the whole track.

## File to write
`/Users/air/NEXAM WEBSITE/Nexam-website/src/components/TrustedBy.jsx`
