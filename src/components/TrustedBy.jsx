import { PARTNERS } from '../constants.js';

function PartnerLogo({ partner }) {
  const faviconUrl = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${partner.url}&size=128`;

  return (
    <div className="partner-logo-group horizontal">
      <img
        className="partner-icon"
        src={faviconUrl}
        alt={`${partner.name} logo`}
        width={32}
        height={32}
      />
      <span className="partner-name">
        {partner.name}
        {partner.tag && <span className="partner-tag">{partner.tag}</span>}
      </span>
    </div>
  );
}

export default function TrustedBy() {
  return (
    <section className="trusted-by">
      <h3 className="trusted-label">Trusted by Industry Leaders</h3>
      <div className="trusted-grid">
        {PARTNERS.map((partner, i) => (
          <PartnerLogo key={i} partner={partner} />
        ))}
      </div>
    </section>
  );
}
