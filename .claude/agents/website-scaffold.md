# NEXAM Website — Scaffold Agent

Bootstrap or re-scaffold the Vite + React + Tailwind project for the NEXAM AI website.

## Working directory
`/Users/air/NEXAM WEBSITE/Nexam-website/`

## Steps

### 1. Back up existing files before Vite overwrites them
```bash
cp index.html _old_index.html 2>/dev/null; cp style.css _old_style.css 2>/dev/null; cp script.js _old_script.js 2>/dev/null
```

### 2. Scaffold Vite + React
```bash
cd "/Users/air/NEXAM WEBSITE/Nexam-website"
npm create vite@latest . -- --template react --yes
npm install
```

### 3. Install all dependencies
```bash
npm install gsap @gsap/react framer-motion three @react-three/fiber @react-three/drei lucide-react
```

### 4. Configure Tailwind v4
Tailwind v4 uses `@tailwindcss/vite` plugin — install and configure:
```bash
npm install -D @tailwindcss/vite
```

Update `vite.config.js` to use `@tailwindcss/vite`. In `src/index.css`, use `@import "tailwindcss"` and `@theme {}` block.

### 5. Brand tokens in `src/index.css`
Add to `@theme {}` block:
```css
@theme {
  --color-neon-primary: #116780;
  --color-neon-secondary: #260865;
  --color-bg-dark: #04070D;
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

Port ALL CSS from `_old_style.css` into `src/index.css` — custom properties (:root), utility classes (.glass-card, .neon-border, .gradient-text, .pill-tag, .btn, etc.), keyframes.

### 6. Create `src/constants.js`
```js
export const CTA_LINK = "https://cal.com/rood-judeley-joseph-9rlmdj/partner-alignment-call-15-m";
export const PARTNERS = [
  { name: "TalentCount", url: "http://talentcount.org" },
  { name: "ProRec Solution", url: "http://prorecsolution.com" },
  { name: "GRENKE Australia", url: "http://grenke.com.au", tag: "AUSTRALIA" },
  { name: "EMRG Media", url: "http://emrgmedia.com" },
];
export const METRICS = [
  { value: "$10M+", label: "Deal Value Routed" },
  { value: ">75", label: "Active Nodes" },
  { value: "120ms", label: "Avg. Signal Response", mono: true },
];
```

### 7. Create component stubs
Create `src/components/` with stub files for: Nav, Hero, TrustedBy, RoutingLayers, NetworkDiagram, ProcessTimeline, Comparison, Pricing, Testimonials, CTA, Footer.

Stub format:
```jsx
export default function ComponentName() {
  return <section data-section="component-name" className="min-h-[200px]" />;
}
```

### 8. Wire `src/App.jsx`
Import and render all 11 components in order. Add radial glow divs. Background `bg-[#04070D]`.

### 9. Update `index.html`
NEXAM AI title + description. Dark class on `<html>`. Single `<div id="root">` with Vite module script.

### 10. Copy assets
```bash
cp logo.png public/logo.png && cp test.png public/test.png
```

### 11. Verify
```bash
npm run dev &
sleep 4
curl -s http://localhost:5173 | grep -q 'NEXAM' && echo "OK"
kill %1
npm run build
```

## Success criteria
- `npm run dev` starts, curl returns NEXAM HTML
- `npm run build` completes with zero errors
- All 11 component stubs exist in `src/components/`
- `src/constants.js` exists with CTA_LINK, PARTNERS, METRICS
