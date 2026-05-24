'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FaShieldAlt,
  FaUserCheck,
  FaDatabase,
  FaCogs,
  FaPaperPlane,
  FaCopy,
  FaCheck,
  FaArrowLeft,
  FaPrint,
} from 'react-icons/fa';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('section-1');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 140;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const sections = ['section-1', 'section-2', 'section-3', 'section-4', 'section-5'];
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const sidebarItems = [
    { id: 'section-1', label: '1. Information We Collect', shortLabel: 'Collection', icon: <FaUserCheck /> },
    { id: 'section-2', label: '2. Client-Side Protocol', shortLabel: 'Client-Side', icon: <FaDatabase /> },
    { id: 'section-3', label: '3. How We Use Data', shortLabel: 'Usage', icon: <FaCogs /> },
    { id: 'section-4', label: '4. Data Security', shortLabel: 'Security', icon: <FaShieldAlt /> },
    { id: 'section-5', label: '5. Contact Support', shortLabel: 'Contact', icon: <FaPaperPlane /> },
  ];

  return (
    <div className="pp-root">
      <title>Privacy Protocol | Ecotrustia Solutions</title>
      <meta
        name="description"
        content="Read the Privacy Policy of Ecotrustia Solutions to understand how we collect, use, and protect your data while using our digital products and services."
      />

      {/* ── Ambient glows ── */}
      <div className="pp-glow pp-glow-top" />
      <div className="pp-glow pp-glow-left" />
      <div className="pp-glow pp-glow-right" />

      {/* ── Page wrapper ── */}
      <div className="pp-wrapper">

        {/* ══ Hero ══ */}
        <header className="pp-hero">
          <div className="pp-breadcrumb">
            <Link href="/" className="pp-back-link">
              <FaArrowLeft className="pp-back-icon" />
              Back to Hub
            </Link>
          </div>

          <div className="pp-badge">Security Compliance</div>

          <h1 className="pp-title">
            Privacy <span className="pp-title-accent">Protocol</span>
          </h1>

          <p className="pp-subtitle">
            &quot;Your digital sovereignty is absolute. Explore our architectural guidelines on data transmission and user safety.&quot;
          </p>
        </header>

        {/* ══ Utility bar ══ */}
        <div className="pp-utilbar">
          <div className="pp-util-meta">
            <span className="pp-util-dot" />
            Last Architecture Update: May 2026
          </div>
          <div className="pp-util-actions">
            <button id="btn-copy-link" onClick={handleCopy} className="pp-btn pp-btn-ghost">
              {copied ? (
                <><FaCheck className="pp-btn-icon pp-btn-icon--green" /> Staged to Clipboard</>
              ) : (
                <><FaCopy className="pp-btn-icon" /> Copy Document URL</>
              )}
            </button>
            <button id="btn-print-doc" onClick={handlePrint} className="pp-btn pp-btn-solid">
              <FaPrint className="pp-btn-icon" /> Export to PDF
            </button>
          </div>
        </div>

        {/* ══ Two-column grid ══ */}
        <div className="pp-grid">

          {/* ── Sidebar ── */}
          <aside className="pp-sidebar">
            <div className="pp-nav-card">
              <div className="pp-nav-header">
                <span className="pp-nav-eyebrow">Document Anchors</span>
                <h3 className="pp-nav-title">Navigation Matrix</h3>
              </div>
              <nav className="pp-nav-list">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`pp-nav-btn${activeSection === item.id ? ' pp-nav-btn--active' : ''}`}
                  >
                    <span className="pp-nav-icon">{item.icon}</span>
                    <span className="pp-nav-label-full">{item.label}</span>
                    <span className="pp-nav-label-short">{item.shortLabel}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* ── Blog-style content ── */}
          <div className="pp-content">

            {/* Section 1 */}
            <section id="section-1" className="pp-section">
              <span className="pp-section-eyebrow">Protocol Node 01</span>
              <h2 className="pp-section-heading">1. Information We Collect</h2>
              <p className="pp-para">
                We collect information to provide better services to all our users. When you use Ecotrustia Solutions
                and the Neural Workbench suite, we may collect the following types of data:
              </p>
              <ul className="pp-list">
                <li>
                  <strong>Device Info</strong> — Operating system versions and hardware models to optimize
                  performance across all platforms.
                </li>
                <li>
                  <strong>Usage Data</strong> — Interactive metrics on how you communicate with our sandbox tools,
                  helping us refine the experience over time.
                </li>
                <li>
                  <strong>Cookies</strong> — Minimal persistent parameters strictly necessary to retain sessions
                  and user preferences between visits.
                </li>
              </ul>
            </section>

            <hr className="pp-divider" />

            {/* Section 2 */}
            <section id="section-2" className="pp-section">
              <span className="pp-section-eyebrow">Protocol Node 02</span>
              <h2 className="pp-section-heading">2. Client-Side Processing</h2>
              <p className="pp-para">
                At Ecotrustia Solutions, we prioritize zero-server data transfer wherever possible. Tools such as
                the Lorem Ipsum Generator, Password Generator, and various converters operate entirely client-side.
                This means your text, passwords, and sensitive inputs are{' '}
                <strong className="pp-strong">never transmitted to or stored on our servers</strong>.
              </p>
              <p className="pp-para">
                Inputs, generated outputs, passwords, and converter stream buffers are restricted entirely to your
                local execution terminal — ensuring absolute architectural sovereignty over your data at all times.
              </p>
            </section>

            <hr className="pp-divider" />

            {/* Section 3 */}
            <section id="section-3" className="pp-section">
              <span className="pp-section-eyebrow">Protocol Node 03</span>
              <h2 className="pp-section-heading">3. How We Use Information</h2>
              <p className="pp-para">
                The information we collect from all our services is used strictly for the following operational purposes:
              </p>
              <ul className="pp-list">
                <li>
                  To provide, maintain, optimize, and improve the user interface latency and algorithmic tools
                  of Ecotrustia Solutions.
                </li>
                <li>
                  To engineer and design next-generation features, experimental layouts, and responsive components
                  that serve our growing user base.
                </li>
                <li>
                  To safeguard Ecotrustia Solutions, our digital nodes, and users against malicious scripts, bots,
                  or unauthorized operations targeting the platform.
                </li>
              </ul>
            </section>

            <hr className="pp-divider" />

            {/* Section 4 */}
            <section id="section-4" className="pp-section">
              <span className="pp-section-eyebrow">Protocol Node 04</span>
              <h2 className="pp-section-heading">4. Data Security</h2>
              <p className="pp-para">
                We work hard to protect you from unauthorized access, alteration, disclosure, or destruction of
                information we hold. We enforce end-to-end encryption protocols and regularly audit our
                infrastructure to ensure architectural-grade security compliance.
              </p>
              <p className="pp-para">
                Every external digital transition is wrapped under rigid Transport Layer Security (TLS) envelopes
                for maximum node safety. Ecotrustia engineers conduct routine integrity checks and penetration tests
                on active hosting containers to prevent data breach vectors and maintain platform resilience.
              </p>
            </section>

            <hr className="pp-divider" />

            {/* Section 5 */}
            <section id="section-5" className="pp-section">
              <span className="pp-section-eyebrow">Protocol Node 05</span>
              <h2 className="pp-section-heading">5. Contact Us</h2>
              <p className="pp-para">
                If you have any questions about this Privacy Policy, please contact our support and legal department.
                We respond to verified security or privacy questions within 24 operational hours.
              </p>
              <p className="pp-para">
                Reach our secure privacy line directly at{' '}
                <a href="mailto:ecotrustiasolutions@gmail.com" className="pp-email-link">
                  ecotrustiasolutions@gmail.com
                </a>
                . Our team will acknowledge and triage your request promptly.
              </p>
            </section>

          </div>
        </div>
      </div>

      {/* ══ Scoped styles ══ */}
      <style jsx>{`

        /* ─ Root / Background ─ */
        .pp-root {
          min-height: 100vh;
          background: #050505;
          color: #fff;
          font-family: 'Inter', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
          position: relative;
          width: 100%;
          max-width: 100vw;
        }

        /* ─ Ambient glows ─ */
        .pp-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          filter: blur(140px);
        }
        .pp-glow-top   { top: 0; left: 50%; transform: translateX(-50%); width: 800px; height: 400px; background: radial-gradient(circle, rgba(147,51,234,0.10) 0%, transparent 70%); }
        .pp-glow-left  { top: 30%; left: -8%; width: 480px; height: 480px; background: rgba(109,40,217,0.05); }
        .pp-glow-right { bottom: 20%; right: -8%; width: 560px; height: 560px; background: rgba(67,56,202,0.05); }

        /* ─ Page Wrapper ─ */
        .pp-wrapper {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          padding: 0 48px 120px;
          position: relative;
          z-index: 10;
          box-sizing: border-box;
          overflow-x: hidden;
        }

        /* ─ Hero ─ */
        .pp-hero {
          padding-top: 148px;
          padding-bottom: 64px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .pp-breadcrumb {
          width: 100%;
          text-align: left;
          margin-bottom: 40px;
        }
        .pp-back-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: #6b7280;
          text-decoration: none;
          transition: color 0.25s;
        }
        .pp-back-link:hover { color: #a78bfa; }
        .pp-back-icon { transition: transform 0.25s; }
        .pp-back-link:hover .pp-back-icon { transform: translateX(-4px); }

        .pp-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 24px;
          border-radius: 999px;
          background: rgba(147,51,234,0.10);
          border: 1px solid rgba(147,51,234,0.20);
          color: #a78bfa;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.45em;
          margin-bottom: 32px;
          user-select: none;
        }

        .pp-title {
          font-size: clamp(3rem, 10vw, 6.5rem);
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: -0.05em;
          text-transform: uppercase;
          color: #fff;
          text-shadow: 0 0 40px rgba(147,51,234,0.30);
          margin-bottom: 28px;
        }
        .pp-title-accent {
          background: linear-gradient(135deg, #a78bfa, #818cf8, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .pp-subtitle {
          color: #9ca3af;
          font-size: clamp(0.875rem, 2vw, 1.0625rem);
          line-height: 1.75;
          max-width: 640px;
          font-style: italic;
          font-weight: 500;
        }

        /* ─ Utility Bar ─ */
        .pp-utilbar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 20px 32px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.05);
          background: rgba(255,255,255,0.01);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          margin-bottom: 56px;
        }
        .pp-util-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: #6b7280;
          user-select: none;
        }
        .pp-util-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          animation: pulse 2s infinite;
          flex-shrink: 0;
        }
        @keyframes pulse {
          0%,100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .pp-util-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .pp-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          border: none;
          transition: all 0.25s;
          white-space: nowrap;
        }
        .pp-btn-ghost {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.10);
          color: #d1d5db;
        }
        .pp-btn-ghost:hover { background: #7c3aed; color: #fff; border-color: #7c3aed; }
        .pp-btn-solid {
          background: #7c3aed;
          color: #fff;
          box-shadow: 0 4px 20px rgba(124,58,237,0.25);
        }
        .pp-btn-solid:hover { background: #6d28d9; }
        .pp-btn-icon { font-size: 10px; flex-shrink: 0; }
        .pp-btn-icon--green { color: #34d399; }

        /* ─ Two-column Grid ─ */
        .pp-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          width: 100%;
          min-width: 0;
          overflow-x: hidden;
        }

        /* ─ Sidebar (Navigation Matrix Card) ─ */
        .pp-sidebar {
          /* sticky handled via CSS below for desktop */
        }
        .pp-nav-card {
          background: rgba(255,255,255,0.02);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 28px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .pp-nav-header {
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .pp-nav-eyebrow {
          display: block;
          font-size: 9px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          color: #a78bfa;
          margin-bottom: 6px;
        }
        .pp-nav-title {
          font-size: 1.0625rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          color: #fff;
        }
        .pp-nav-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .pp-nav-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 16px;
          border-radius: 14px;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          cursor: pointer;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          color: #6b7280;
          transition: all 0.25s;
          white-space: normal;
          width: 100%;
          text-align: left;
        }
        .pp-nav-btn:hover { color: #fff; border-color: rgba(255,255,255,0.12); }
        .pp-nav-btn--active {
          background: #7c3aed;
          border-color: #7c3aed;
          color: #fff;
          box-shadow: 0 4px 16px rgba(124,58,237,0.20);
        }
        .pp-nav-icon {
          font-size: 11px;
          flex-shrink: 0;
          color: #a78bfa;
        }
        .pp-nav-btn--active .pp-nav-icon { color: #fff; }
        /* Always show full labels — vertical column layout on all screen sizes */
        .pp-nav-label-full  { display: inline; }
        .pp-nav-label-short { display: none; }

        /* ─ Blog Content ─ */
        .pp-content {
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow-x: hidden;
          width: 100%;
        }

        .pp-section {
          padding: 48px 0;
          width: 100%;
          overflow-x: hidden;
        }
        .pp-section:first-child { padding-top: 8px; }

        .pp-section-eyebrow {
          display: inline-block;
          font-size: 9px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          color: #a78bfa;
          margin-bottom: 12px;
        }

        .pp-section-heading {
          font-size: clamp(1.25rem, 3vw, 1.75rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          color: #fff;
          margin-bottom: 24px;
          line-height: 1.1;
        }

        .pp-para {
          font-size: 0.9375rem;
          color: #9ca3af;
          line-height: 1.85;
          font-weight: 400;
          margin-bottom: 20px;
          width: 100%;
        }
        .pp-para:last-child { margin-bottom: 0; }

        .pp-strong {
          color: #fff;
          font-weight: 700;
        }

        .pp-list {
          list-style: none;
          padding: 0;
          margin: 0 0 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .pp-list li {
          position: relative;
          padding-left: 20px;
          font-size: 0.9375rem;
          color: #9ca3af;
          line-height: 1.85;
          font-weight: 400;
          width: 100%;
          word-break: break-word;
        }
        .pp-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 12px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #7c3aed;
          flex-shrink: 0;
        }
        .pp-list li strong {
          color: #e5e7eb;
          font-weight: 700;
        }

        .pp-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin: 0;
        }

        .pp-email-link {
          color: #a78bfa;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }
        .pp-email-link:hover { color: #c4b5fd; text-decoration: underline; }

        /* ─ Responsive ─ */

        /* Desktop → two-column layout + sticky sidebar */
        @media (min-width: 1024px) {
          .pp-grid {
            grid-template-columns: 280px 1fr;
            gap: 56px;
            align-items: start;
          }
          .pp-sidebar {
            position: sticky;
            top: 120px;
          }
          .pp-nav-card {
            padding: 32px;
          }
        }

        @media (max-width: 640px) {
          .pp-wrapper {
            padding: 0 16px 80px;
            overflow-x: hidden;
          }
          .pp-utilbar {
            padding: 16px 16px;
          }
          .pp-hero {
            padding-top: 120px;
            padding-bottom: 40px;
          }
          .pp-section {
            padding: 32px 0;
          }
          .pp-section-heading {
            word-break: break-word;
          }
          .pp-grid {
            gap: 28px;
          }
        }
      `}</style>
    </div>
  );
}
