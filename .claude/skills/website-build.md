# NEXAM Website — Build & Verify Agent

Assemble, build, and verify the NEXAM AI website after all component agents have completed.

## Context
Project: `/Users/air/NEXAM WEBSITE/Nexam-website/` — Vite + React 18

## Step 1: Verify all components exist
Check that these files are non-stub (i.e., not just a `<section data-section=.../>` stub):
`src/components/Nav.jsx`, `Hero.jsx`, `TrustedBy.jsx`, `RoutingLayers.jsx`, `NetworkDiagram.jsx`, `ProcessTimeline.jsx`, `Comparison.jsx`, `Pricing.jsx`, `Testimonials.jsx`, `CTA.jsx`, `Footer.jsx`

If any are stubs, re-invoke the appropriate sub-agent command before proceeding.

## Step 2: Verify `src/App.jsx` imports all 11 components
The section order must be: Nav → Hero → TrustedBy → RoutingLayers → NetworkDiagram → ProcessTimeline → Comparison → Pricing → Testimonials → CTA → Footer

If App.jsx is missing imports or has wrong order, update it.

## Step 3: Run build
```bash
cd "/Users/air/NEXAM WEBSITE/Nexam-website"
npm run build
```

If build fails: read the full Vite error output. Identify which file caused the error. Fix only that file. Re-run build.

Common issues:
- GSAP `registerPlugin` called outside module scope → move to top level
- Framer Motion named import missing → check `{ motion, AnimatePresence, useInView }` from `framer-motion`
- Missing default export → ensure every component file has `export default function ComponentName()`
- Tailwind class not found → check if it's defined in `src/index.css` or use inline `style={{}}`

## Step 4: Start dev server and verify visually
```bash
npm run dev &
sleep 4
```

Check each section loads by visiting http://localhost:5173 in a browser. Confirm:
- [ ] Three.js/canvas renders in hero with particle network
- [ ] Marquee scrolls smoothly in TrustedBy
- [ ] Layer cards stagger-animate on scroll in RoutingLayers
- [ ] Data packets travel in NetworkDiagram
- [ ] Timeline draws on scroll in ProcessTimeline
- [ ] Comparison columns reveal on scroll
- [ ] Pricing gauge animates on scroll
- [ ] Testimonials carousel auto-advances
- [ ] CTA magnetic button responds to hover
- [ ] Scroll progress bar visible at top
- [ ] Footer system status dot pulses

## Step 5: Check bundle sizes
```bash
npm run build 2>&1 | grep -E 'kB|gzip'
```
Target: < 800KB total gzipped. If over, identify the largest chunk and consider lazy loading Three.js or the NetworkDiagram component.

## Step 6: Mobile check
Resize browser to 768px width. Verify:
- Hero title wraps cleanly
- Layer cards stack vertically
- Network diagram scales correctly
- Testimonials carousel works on touch
- Footer collapses to single column

## Final output
Report: build status (pass/fail), bundle sizes, any visual issues found, mobile status.
