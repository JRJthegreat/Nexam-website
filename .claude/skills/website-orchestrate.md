# NEXAM Website — Full Rebuild Orchestrator

You are the Orchestrator for the NEXAM AI website rebuild. Run all sub-agents in the correct sequence.

## Project
`/Users/air/NEXAM WEBSITE/Nexam-website/` — Vite + React 18 + Tailwind v4 + GSAP + Framer Motion

## Stage 1: Scaffold (run first, blocks all others)
Invoke `/website-scaffold` and wait for it to complete. Validate:
- `npm run dev` starts without errors on localhost:5173
- All 11 component stubs exist in `src/components/`

## Stage 2: Components (run all in parallel after Stage 1)
Spawn all 7 component agents simultaneously:
- `/website-hero`
- `/website-trusted-by`
- `/website-routing-layers`
- `/website-network`
- `/website-comparison`
- `/website-testimonials`
- `/website-polish`

## Stage 3: Build & Verify (after all Stage 2 complete)
Invoke `/website-build` to assemble, build, and verify.

## Failure handling
- Stage 1 fail: halt, fix, retry
- Stage 2 partial fail: render `<section data-section="name" className="min-h-[200px]" />` stub, continue, re-queue failed agent with error log
- Build fail: identify which component file caused the Vite error, re-queue only that agent with the full error
- Visual fail: re-queue owning agent with screenshot description and expected behavior

## Section order in App.jsx
Nav → Hero → TrustedBy → RoutingLayers → NetworkDiagram → ProcessTimeline → Comparison → Pricing → Testimonials → CTA → Footer
