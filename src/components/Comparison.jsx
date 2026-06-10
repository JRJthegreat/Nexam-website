import { motion } from 'framer-motion';

const COLUMNS = [
  {
    title: 'Traditional SDR / Agency',
    badge: { text: 'High Latency', type: 'error' },
    items: [
      { icon: 'x', text: 'Broad "Spray and Pray" Targeting' },
      { icon: 'x', text: 'High Overhead (Salaries, Benefits)' },
      { icon: 'x', text: '3–6 Months to See Results' },
      { icon: 'x', text: 'Ignored by Spam Filters' },
      { icon: 'x', text: 'No Signal Intelligence' },
    ],
    variant: 'traditional',
  },
  {
    title: 'AI Tools Alone',
    badge: { text: 'Incomplete', type: 'warning' },
    items: [
      { icon: 'x', text: 'No Validated Buyer Intent' },
      { icon: 'x', text: 'Requires In-House Expertise' },
      { icon: 'x', text: 'Still 60–90 Days to Pipeline' },
      { icon: 'check', text: 'Lower Cost Base' },
      { icon: 'x', text: 'No Routing Infrastructure' },
    ],
    variant: 'ai-tools',
  },
  {
    title: 'NEXAM Protocol',
    badge: { text: 'Optimized', type: 'success' },
    items: [
      { icon: 'check', text: 'Precision Pain-Signal Routing' },
      { icon: 'check', text: 'Variable-Based Cost Structure' },
      { icon: 'check', text: 'Direct ROI in 21–30 Days' },
      { icon: 'check', text: 'Multi-Node Inbox Control' },
      { icon: 'check', text: 'Intelligent ICP Matching' },
    ],
    variant: 'nexam',
    featured: true,
  },
];

function BadgeStyles(type) {
  if (type === 'error') return {};
  if (type === 'success') return {};
  // warning
  return {
    background: 'rgba(245,158,11,0.1)',
    color: '#F59E0B',
    border: '1px solid rgba(245,158,11,0.2)',
  };
}

function ComparisonCard({ col }) {
  const isFeatured = col.featured;

  return (
    <div
      className={`comparison-card${isFeatured ? ' glass-card neon-border' : ''}`}
      style={
        isFeatured
          ? {
              transform: 'scaleY(1.02)',
              background: 'rgba(17,103,128,0.05)',
              transformOrigin: 'center center',
            }
          : undefined
      }
    >
      <div className="card-header">
        <h3>{col.title}</h3>
        <span
          className={col.badge.type !== 'warning' ? `status-badge ${col.badge.type}` : 'status-badge'}
          style={col.badge.type === 'warning' ? BadgeStyles('warning') : undefined}
        >
          {col.badge.text}
        </span>
      </div>

      <ul className="comparison-list">
        {col.items.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
          >
            <span className={item.icon === 'check' ? 'icon-check' : 'icon-x'}>
              {item.icon === 'check' ? '✓' : '✕'}
            </span>
            {item.text}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default function Comparison() {
  return (
    <section className="comparison container">
      <div className="section-header">
        <div className="pill-tag">
          <span className="pill-dot" />
          THE FUNDAMENTAL SHIFT
        </div>
        <h2>A New Paradigm in B2B Growth</h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          maxWidth: '1000px',
          margin: '0 auto',
          alignItems: 'stretch',
        }}
      >
        {COLUMNS.map((col, i) => (
          <ComparisonCard key={i} col={col} />
        ))}
      </div>
    </section>
  );
}
