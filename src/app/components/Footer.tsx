import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="relative bg-[#030308] overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>

      {/* Ambient Glow */}
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%) translateY(50%)', width: '800px', height: '400px', background: 'rgba(139,92,246,0.04)', filter: 'blur(150px)', borderRadius: '50%', pointerEvents: 'none' }}></div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 10 }}>

        {/* ── CTA Banner ── */}
        <div style={{ paddingTop: '96px', paddingBottom: '80px' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.06) 100%)',
            border: '1px solid rgba(139,92,246,0.15)',
            borderRadius: '24px',
            padding: '64px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '32px'
          }}>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5em', color: 'var(--primary)', fontWeight: 800, opacity: 0.9 }}>Ready to Elevate?</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, color: '#fff', margin: 0 }}>
              Let&apos;s build the <span className="text-gradient">future together.</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '520px', lineHeight: 1.7, opacity: 0.7 }}>
              Architecting high-performance digital ecosystems for visionary brands worldwide.
            </p>
            <Link href="/#contact" className="btn btn-primary" style={{ padding: '18px 48px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 700, borderRadius: '12px', marginTop: '8px' }}>
              Start a Project <i className="fas fa-arrow-right" style={{ marginLeft: '12px', fontSize: '11px' }}></i>
            </Link>
          </div>
        </div>

        {/* ── Main Footer Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '64px',
          paddingBottom: '80px'
        }} className="footer-grid">
          <style>{`
            @media (min-width: 768px) {
              .footer-grid { grid-template-columns: 1fr 1fr !important; }
            }
            @media (min-width: 1024px) {
              .footer-grid { grid-template-columns: 2fr 1fr 1.3fr 1.5fr !important; gap: 48px !important; }
            }
          `}</style>

          {/* Brand Column */}
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: '24px' }}>
              Ecotrustia <span style={{ color: 'var(--primary)' }}>Solutions</span>
            </h3>
            <div style={{ width: '48px', height: '2px', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', borderRadius: '2px', marginBottom: '24px' }}></div>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.9, opacity: 0.75, maxWidth: '320px', marginBottom: '32px' }}>
              Your trusted partner for advanced AI automation, high-scale web development, and creative digital engineering. Built for excellence.
            </p>

            {/* Inline Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
              <a href="mailto:ecotrustiasolutions@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '14px', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '13px', fontWeight: 500, transition: 'color 0.3s' }} className="footer-contact-link">
                <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="fas fa-envelope" style={{ color: 'var(--primary)', fontSize: '12px' }}></i>
                </span>
                ecotrustiasolutions@gmail.com
              </a>
              <a href="tel:+971557888645" style={{ display: 'flex', alignItems: 'center', gap: '14px', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '13px', fontWeight: 500, transition: 'color 0.3s' }} className="footer-contact-link">
                <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="fas fa-phone" style={{ color: 'var(--primary)', fontSize: '12px' }}></i>
                </span>
                +971 55 788 8645
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: 'var(--text-muted)', fontSize: '13px', fontWeight: 500 }}>
                <span style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="fas fa-map-marker-alt" style={{ color: 'var(--primary)', fontSize: '12px' }}></i>
                </span>
                United Arab Emirates
              </div>
            </div>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { icon: "fa-facebook-f", link: "https://www.facebook.com/profile.php?id=61571744234287" },
                { icon: "fa-linkedin-in", link: "https://www.linkedin.com/company/ecotrustia-solutions/" },
                { icon: "fa-instagram", link: "https://www.instagram.com/ecotrustia_solutions/" },
                { icon: "fa-whatsapp", link: "https://wa.me/971557888645" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  className="footer-social-icon"
                  style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', textDecoration: 'none', transition: 'all 0.3s' }}
                >
                  <i className={`fab ${social.icon}`} style={{ fontSize: '14px' }}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 700, color: '#fff', marginBottom: '28px' }}>Quick Links</h4>
            <div style={{ width: '32px', height: '2px', background: 'rgba(139,92,246,0.4)', borderRadius: '2px', marginBottom: '28px' }}></div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { label: "Home", href: "/" },
                { label: "Services", href: "/#services" },
                { label: "Our Process", href: "/#process" },
                { label: "Tools", href: "/tools" },
                { label: "FAQ", href: "/#faq" },
                { label: "Contact", href: "/#contact" }
              ].map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none', transition: 'all 0.3s' }}>
                    <i className="fas fa-chevron-right" style={{ fontSize: '8px', color: 'rgba(139,92,246,0.4)', transition: 'all 0.3s' }}></i>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 700, color: '#fff', marginBottom: '28px' }}>Our Services</h4>
            <div style={{ width: '32px', height: '2px', background: 'rgba(59,130,246,0.4)', borderRadius: '2px', marginBottom: '28px' }}></div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                "AI Email Automation",
                "WhatsApp Automation",
                "Web Development",
                "E-Commerce Stores",
                "SEO Performance",
                "Brand Identity & Design",
                "Video Production"
              ].map((service, i) => (
                <li key={i}>
                  <Link href="/#services" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none', transition: 'all 0.3s' }}>
                    <i className="fas fa-chevron-right" style={{ fontSize: '8px', color: 'rgba(59,130,246,0.4)', transition: 'all 0.3s' }}></i>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 700, color: '#fff', marginBottom: '28px' }}>Newsletter</h4>
            <div style={{ width: '32px', height: '2px', background: 'rgba(16,185,129,0.4)', borderRadius: '2px', marginBottom: '28px' }}></div>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '28px', opacity: 0.75 }}>
              Subscribe to our latest insights on AI automation, web technology, and digital strategy.
            </p>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', fontSize: '13px', color: '#fff', outline: 'none', transition: 'all 0.3s' }}
              />
              <button
                type="submit"
                style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: '#fff', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}
              >
                Subscribe <i className="fas fa-paper-plane" style={{ marginLeft: '8px', fontSize: '10px' }}></i>
              </button>
            </form>
            <p style={{ fontSize: '10px', color: 'var(--text-muted)', opacity: 0.4, marginTop: '14px', lineHeight: 1.6 }}>
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>

        {/* ── Gradient Divider ── */}
        <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)', marginBottom: '32px' }}></div>

        {/* ── Bottom Bar ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px', paddingBottom: '40px', fontSize: '11px', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px rgba(16,185,129,0.5)', animation: 'pulse 2s infinite' }}></div>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>All Systems Operational</span>
          </div>

          <p style={{ opacity: 0.5 }}>© 2026 Ecotrustia Solutions. All rights reserved.</p>

          <div style={{ display: 'flex', gap: '28px' }}>
            <Link href="#" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }} className="footer-link">Privacy Policy</Link>
            <Link href="#" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }} className="footer-link">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Hover Styles */}
      <style>{`
        .footer-link:hover { color: var(--primary) !important; }
        .footer-link:hover i { color: var(--primary) !important; transform: translateX(4px); }
        .footer-contact-link:hover { color: var(--primary) !important; }
        .footer-social-icon:hover {
          background: rgba(139,92,246,0.2) !important;
          border-color: rgba(139,92,246,0.5) !important;
          color: #fff !important;
          box-shadow: 0 0 20px rgba(139,92,246,0.35);
          transform: translateY(-3px);
        }
        input:focus {
          border-color: rgba(139,92,246,0.4) !important;
          box-shadow: 0 0 20px rgba(139,92,246,0.1);
        }
        button[type="submit"]:hover {
          box-shadow: 0 0 30px rgba(139,92,246,0.4);
          transform: translateY(-2px);
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;