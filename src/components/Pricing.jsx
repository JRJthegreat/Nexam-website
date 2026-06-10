import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { CTA_LINK } from '../constants.js';

const VALUE_PROPS = [
  {
    label: 'Investment',
    value: 'Performance-Based',
    sub: 'No Fixed Overhead',
  },
  {
    label: 'Timeline',
    value: '21–30 Days',
    sub: 'Time to First ROI',
  },
  {
    label: 'Network',
    value: '75+ Active Nodes',
    sub: 'Validated Buyer Pool',
  },
];

const FULL_DASH = 251;
const FILLED_DASH = 60;

export default function Pricing() {
  const arcRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!arcRef.current) return;
    if (isInView) {
      arcRef.current.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)';
      arcRef.current.style.strokeDashoffset = String(FILLED_DASH);
    } else {
      arcRef.current.style.transition = 'none';
      arcRef.current.style.strokeDashoffset = String(FULL_DASH);
    }
  }, [isInView]);

  return (
    <section className="container" style={{ padding: '80px 24px' }}>
      <style>{`
        @keyframes spin-border {
          to { --angle: 360deg; }
        }
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
      `}</style>

      <div className="section-header">
        <div className="pill-tag">
          <span className="pill-dot" />
          PERFORMANCE MODEL
        </div>
        <h2>Aligned With Your Success</h2>
        <p>No retainers. No seat licenses. Our cost structure moves when your results do.</p>
      </div>

      <div ref={sectionRef} style={{ maxWidth: '600px', margin: '0 auto' }}>
        <motion.div
          className="glass-card neon-border"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            padding: '56px 48px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Rotating border decoration */}
          <div
            style={{
              position: 'absolute',
              inset: -2,
              borderRadius: 18,
              zIndex: -1,
              background:
                'conic-gradient(from var(--angle, 0deg), #116780, #260865, #116780)',
              animation: 'spin-border 4s linear infinite',
              opacity: 0.4,
            }}
          />

          {/* SVG ROI Arc Gauge */}
          <svg
            viewBox="0 0 200 120"
            style={{ width: 200, height: 120, margin: '0 auto 32px', display: 'block' }}
          >
            {/* Background arc */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Animated fill arc */}
            <path
              ref={arcRef}
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="url(#gauge-gradient)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={FULL_DASH}
              strokeDashoffset={FULL_DASH}
            />
            <defs>
              <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#116780" />
                <stop offset="100%" stopColor="#260865" />
              </linearGradient>
            </defs>
            {/* Center label */}
            <text
              x="100"
              y="90"
              textAnchor="middle"
              fill="white"
              fontSize="24"
              fontWeight="700"
              fontFamily="Space Grotesk, sans-serif"
            >
              4–8×
            </text>
            <text
              x="100"
              y="108"
              textAnchor="middle"
              fill="#D5DBE6"
              fontSize="11"
              fontFamily="Space Grotesk, sans-serif"
            >
              ROI MULTIPLIER
            </text>
          </svg>

          {/* Three value prop metric cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              marginBottom: '32px',
            }}
          >
            {VALUE_PROPS.map((vp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                style={{
                  background: 'rgba(17,103,128,0.08)',
                  border: '1px solid rgba(17,103,128,0.2)',
                  borderRadius: '8px',
                  padding: '16px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '0.65rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#116780',
                    fontWeight: 600,
                    marginBottom: '6px',
                  }}
                >
                  {vp.label}
                </div>
                <div
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: '#FAFAFA',
                    lineHeight: 1.2,
                    marginBottom: '4px',
                  }}
                >
                  {vp.value}
                </div>
                <div
                  style={{
                    fontSize: '0.72rem',
                    color: '#D5DBE6',
                    opacity: 0.8,
                  }}
                >
                  {vp.sub}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <a
            href={CTA_LINK}
            className="btn btn-primary btn-large"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: '32px', display: 'inline-flex' }}
          >
            Initialize Connection
          </a>
        </motion.div>
      </div>
    </section>
  );
}
