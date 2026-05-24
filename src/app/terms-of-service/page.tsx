'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FaFileSignature,
  FaGavel,
  FaServer,
  FaExclamationTriangle,
  FaBalanceScale,
  FaCopy,
  FaCheck,
  FaArrowLeft,
  FaPrint,
} from 'react-icons/fa';

export default function TermsOfService() {
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
    { id: 'section-1', label: '1. Acceptance of Terms',           shortLabel: 'Acceptance',  icon: <FaFileSignature /> },
    { id: 'section-2', label: '2. Use License & IP',              shortLabel: 'License',     icon: <FaGavel /> },
    { id: 'section-3', label: '3. Service Availability',          shortLabel: 'Availability', icon: <FaServer /> },
    { id: 'section-4', label: '4. Disclaimer of Warranties',      shortLabel: 'Disclaimer',  icon: <FaExclamationTriangle /> },
    { id: 'section-5', label: '5. Governing Law',                 shortLabel: 'Governing',   icon: <FaBalanceScale /> },
  ];

  return (
    <div className="tos-root">
      <title>Terms of Service | Ecotrustia Solutions</title>
      <meta
        name="description"
        content="Read the Terms of Service for Ecotrustia Solutions to understand the rules, guidelines, and agreements for using our tools and services."
      />

      {/* ── Ambient glows (wrapped to prevent overflow) ── */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div className="tos-glow tos-glow-top"   />
        <div className="tos-glow tos-glow-left"  />
        <div className="tos-glow tos-glow-right" />
      </div>

      {/* ── Page wrapper ── */}
      <div className="tos-wrapper">

        {/* ══ Hero ══ */}
        <header className="tos-hero">
          <div className="tos-breadcrumb">
            <Link href="/" className="tos-back-link">
              <FaArrowLeft className="tos-back-icon" />
              Back to Hub
            </Link>
          </div>

          <div className="tos-badge">Legal Agreement</div>

          <h1 className="tos-title">
            Terms of <span className="tos-title-accent">Service</span>
          </h1>

          <p className="tos-subtitle">
            &quot;The foundational guidelines for accessing and utilizing the Ecotrustia Neural Workbench.&quot;
          </p>
        </header>

        {/* ══ Utility bar ══ */}
        <div className="tos-utilbar">
          <div className="tos-util-meta">
            <span className="tos-util-dot" />
            Last Architecture Update: May 2026
          </div>
          <div className="tos-util-actions">
            <button id="btn-copy-tos" onClick={handleCopy} className="tos-btn tos-btn-ghost">
              {copied ? (
                <><FaCheck className="tos-btn-icon tos-btn-icon--green" /> Staged to Clipboard</>
              ) : (
                <><FaCopy className="tos-btn-icon" /> Copy Document URL</>
              )}
            </button>
            <button id="btn-print-tos" onClick={handlePrint} className="tos-btn tos-btn-solid">
              <FaPrint className="tos-btn-icon" /> Export to PDF
            </button>
          </div>
        </div>

        {/* ══ Two-column grid ══ */}
        <div className="tos-grid">

          {/* ── Sidebar ── */}
          <aside className="tos-sidebar">
            <div className="tos-nav-card">
              <div className="tos-nav-header">
                <span className="tos-nav-eyebrow">Document Anchors</span>
                <h3 className="tos-nav-title">Navigation Matrix</h3>
              </div>
              <nav className="tos-nav-list">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`tos-nav-btn${activeSection === item.id ? ' tos-nav-btn--active' : ''}`}
                  >
                    <span className="tos-nav-icon">{item.icon}</span>
                    <span className="tos-nav-label-full">{item.label}</span>
                    <span className="tos-nav-label-short">{item.shortLabel}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* ── Blog-style content ── */}
          <div className="tos-content">

            {/* Section 1 */}
            <section id="section-1" className="tos-section">
              <span className="tos-section-eyebrow">Clause Node 01</span>
              <h2 className="tos-section-heading">1. Acceptance of Terms</h2>
              <p className="tos-para">
                By accessing and using the tools, applications, and services provided by Ecotrustia Solutions, you
                agree to be bound by these Terms of Service. These terms constitute a legally binding agreement
                between you and Ecotrustia Solutions governing your use of our platform and Neural Workbench suite.
              </p>
              <p className="tos-para">
                If you do not agree with any part of these terms, you must discontinue your use of our platform
                immediately. Continued use of any Ecotrustia service constitutes acceptance of these terms in full.
              </p>
            </section>

            <hr className="tos-divider" />

            {/* Section 2 */}
            <section id="section-2" className="tos-section">
              <span className="tos-section-eyebrow">Clause Node 02</span>
              <h2 className="tos-section-heading">2. Use License &amp; Intellectual Property</h2>
              <p className="tos-para">
                Ecotrustia Solutions grants you a personal, non-exclusive, non-transferable license to utilize the
                Neural Workbench suite for lawful purposes. All intellectual property rights in the platform,
                its content, and generated outputs remain the exclusive property of Ecotrustia Solutions.
              </p>
              <p className="tos-para">Under this license, you may not:</p>
              <ul className="tos-list">
                <li>
                  Attempt to decompile, disassemble, or reverse engineer any software or system contained within
                  the Ecotrustia network.
                </li>
                <li>
                  Remove, alter, or obscure any copyright, trademark, or other proprietary notations from the
                  platform or generated materials.
                </li>
                <li>
                  Transfer, sublicense, or assign the materials to another party, or mirror them on any other
                  server or platform without express written authorization from Ecotrustia Solutions.
                </li>
              </ul>
            </section>

            <hr className="tos-divider" />

            {/* Section 3 */}
            <section id="section-3" className="tos-section">
              <span className="tos-section-eyebrow">Clause Node 03</span>
              <h2 className="tos-section-heading">3. Service Availability &amp; Modifications</h2>
              <p className="tos-para">
                We strive to ensure 99.9% uptime across all Ecotrustia services, but we do not guarantee that
                the platform will be uninterrupted, error-free, or free from latency at all times. Scheduled
                maintenance windows and force majeure events are excluded from this commitment.
              </p>
              <p className="tos-para">
                Ecotrustia Solutions reserves the right to modify, suspend, or permanently discontinue any part
                of our service at any time without prior notice or liability. We may also update these Terms of
                Service periodically — continued use of the platform after any changes constitutes your acceptance
                of the revised terms.
              </p>
            </section>

            <hr className="tos-divider" />

            {/* Section 4 */}
            <section id="section-4" className="tos-section">
              <span className="tos-section-eyebrow">Clause Node 04</span>
              <h2 className="tos-section-heading">4. Disclaimer of Warranties</h2>
              <p className="tos-para">
                The materials, tools, and services provided by Ecotrustia Solutions are offered on an{' '}
                <strong className="tos-strong">&apos;as is&apos;</strong> and{' '}
                <strong className="tos-strong">&apos;as available&apos;</strong> basis without warranties of
                any kind, either expressed or implied.
              </p>
              <p className="tos-para">
                We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties
                including, without limitation, implied warranties of merchantability, fitness for a particular
                purpose, or non-infringement of intellectual property. Ecotrustia Solutions shall not be liable
                for any damages arising out of the use or inability to use the materials or services on our
                platform.
              </p>
            </section>

            <hr className="tos-divider" />

            {/* Section 5 */}
            <section id="section-5" className="tos-section">
              <span className="tos-section-eyebrow">Clause Node 05</span>
              <h2 className="tos-section-heading">5. Governing Law</h2>
              <p className="tos-para">
                These Terms of Service are governed by and construed in accordance with international digital
                commerce laws and regulations applicable to online service providers. You irrevocably submit to
                the exclusive jurisdiction of the relevant courts for the resolution of any disputes arising
                from or related to these terms.
              </p>
              <p className="tos-para">
                For any legal inquiries or concerns regarding these Terms of Service, please contact our legal
                department at{' '}
                <a href="mailto:ecotrustiasolutions@gmail.com" className="tos-email-link">
                  ecotrustiasolutions@gmail.com
                </a>
                . We aim to respond to all legal correspondence within 48 operational hours.
              </p>
            </section>

          </div>
        </div>
      </div>

      {/* ══ Scoped styles ══ */}
      <style jsx>{`

        /* ─ Universal box-sizing ─ */
        .tos-root *, .tos-root *::before, .tos-root *::after {
          box-sizing: border-box;
        }

        /* ─ Root / Background ─ */
        .tos-root {
          min-height: 100vh;
          background: #050505;
          color: #fff;
          font-family: 'Inter', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          overflow: hidden;
          position: relative;
          width: 100%;
        }

        /* ─ Ambient glows ─ */
        .tos-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          filter: blur(140px);
        }
        .tos-glow-top   { top: 0; left: 50%; transform: translateX(-50%); width: min(800px, 120%); height: 400px; background: radial-gradient(circle, rgba(147,51,234,0.10) 0%, transparent 70%); }
        .tos-glow-left  { top: 30%; left: -8%; width: min(480px, 80%); height: min(480px, 80%); background: rgba(109,40,217,0.05); }
        .tos-glow-right { bottom: 20%; right: -8%; width: min(560px, 80%); height: min(560px, 80%); background: rgba(67,56,202,0.05); }

        /* ─ Page Wrapper ─ */
        .tos-wrapper {
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
        .tos-hero {
          padding-top: 148px;
          padding-bottom: 64px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .tos-breadcrumb {
          width: 100%;
          text-align: left;
          margin-bottom: 40px;
        }
        .tos-back-link {
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
        .tos-back-link:hover { color: #a78bfa; }
        .tos-back-icon { transition: transform 0.25s; }
        .tos-back-link:hover .tos-back-icon { transform: translateX(-4px); }

        .tos-badge {
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

        .tos-title {
          font-size: clamp(3rem, 10vw, 6.5rem);
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: -0.05em;
          text-transform: uppercase;
          color: #fff;
          text-shadow: 0 0 40px rgba(147,51,234,0.30);
          margin-bottom: 28px;
        }
        .tos-title-accent {
          background: linear-gradient(135deg, #a78bfa, #818cf8, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .tos-subtitle {
          color: #9ca3af;
          font-size: clamp(0.875rem, 2vw, 1.0625rem);
          line-height: 1.75;
          max-width: min(640px, 100%);
          font-style: italic;
          font-weight: 500;
          overflow-wrap: break-word;
          word-break: break-word;
        }

        /* ─ Utility Bar ─ */
        .tos-utilbar {
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
        .tos-util-meta {
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
        .tos-util-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          animation: tos-pulse 2s infinite;
          flex-shrink: 0;
        }
        @keyframes tos-pulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.4; }
        }
        .tos-util-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .tos-btn {
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
        .tos-btn-ghost {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.10);
          color: #d1d5db;
        }
        .tos-btn-ghost:hover { background: #7c3aed; color: #fff; border-color: #7c3aed; }
        .tos-btn-solid {
          background: #7c3aed;
          color: #fff;
          box-shadow: 0 4px 20px rgba(124,58,237,0.25);
        }
        .tos-btn-solid:hover { background: #6d28d9; }
        .tos-btn-icon { font-size: 10px; flex-shrink: 0; }
        .tos-btn-icon--green { color: #34d399; }

        /* ─ Two-column Grid ─ */
        .tos-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          width: 100%;
          min-width: 0;
          overflow-x: hidden;
        }

        /* ─ Sidebar (Navigation Matrix Card) ─ */
        .tos-nav-card {
          background: rgba(255,255,255,0.02);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 28px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .tos-nav-header {
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .tos-nav-eyebrow {
          display: block;
          font-size: 9px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          color: #a78bfa;
          margin-bottom: 6px;
        }
        .tos-nav-title {
          font-size: 1.0625rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          color: #fff;
        }
        .tos-nav-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .tos-nav-btn {
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
        .tos-nav-btn:hover { color: #fff; border-color: rgba(255,255,255,0.12); }
        .tos-nav-btn--active {
          background: #7c3aed;
          border-color: #7c3aed;
          color: #fff;
          box-shadow: 0 4px 16px rgba(124,58,237,0.20);
        }
        .tos-nav-icon {
          font-size: 11px;
          flex-shrink: 0;
          color: #a78bfa;
        }
        .tos-nav-btn--active .tos-nav-icon { color: #fff; }
        /* Always show full labels — vertical column layout on all screen sizes */
        .tos-nav-label-full  { display: inline; }
        .tos-nav-label-short { display: none; }

        /* ─ Blog Content ─ */
        .tos-content {
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow-x: hidden;
          width: 100%;
        }

        .tos-section {
          padding: 48px 0;
          width: 100%;
          overflow-x: hidden;
        }
        .tos-section:first-child { padding-top: 8px; }

        .tos-section-eyebrow {
          display: inline-block;
          font-size: 9px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          color: #a78bfa;
          margin-bottom: 12px;
        }

        .tos-section-heading {
          font-size: clamp(1.25rem, 3vw, 1.75rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          color: #fff;
          margin-bottom: 24px;
          line-height: 1.1;
          word-break: break-word;
        }

        .tos-para {
          font-size: 0.9375rem;
          color: #9ca3af;
          line-height: 1.85;
          font-weight: 400;
          margin-bottom: 20px;
          width: 100%;
          overflow-wrap: break-word;
          word-break: break-word;
        }
        .tos-para:last-child { margin-bottom: 0; }

        .tos-strong {
          color: #fff;
          font-weight: 700;
        }

        .tos-list {
          list-style: none;
          padding: 0;
          margin: 0 0 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .tos-list li {
          position: relative;
          padding-left: 20px;
          font-size: 0.9375rem;
          color: #9ca3af;
          line-height: 1.85;
          font-weight: 400;
          width: 100%;
          overflow-wrap: break-word;
          word-break: break-word;
        }
        .tos-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 12px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #7c3aed;
        }

        .tos-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin: 0;
        }

        .tos-email-link {
          color: #a78bfa;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }
        .tos-email-link:hover { color: #c4b5fd; text-decoration: underline; }

        /* ─ Desktop → two-column layout + sticky sidebar ─ */
        @media (min-width: 1024px) {
          .tos-grid {
            grid-template-columns: 280px 1fr;
            gap: 56px;
            align-items: start;
          }
          .tos-sidebar {
            position: sticky;
            top: 120px;
          }
          .tos-nav-card {
            padding: 32px;
          }
        }

        /* ─ Mobile ─ */
        @media (max-width: 640px) {
          .tos-wrapper {
            padding: 0 16px 80px;
            overflow-x: hidden;
          }
          .tos-utilbar {
            padding: 16px;
          }
          .tos-hero {
            padding-top: 120px;
            padding-bottom: 40px;
          }
          .tos-section {
            padding: 32px 0;
          }
          .tos-grid {
            gap: 28px;
          }
        }
      `}</style>
    </div>
  );
}
