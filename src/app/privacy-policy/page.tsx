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
  FaLaptopCode,
  FaChartLine,
  FaCookie,
  FaPrint,
  FaCheck,
  FaArrowLeft
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
      const offset = 140; // Perfect offset to clear the fixed Header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  // Precise scroll tracking hook
  useEffect(() => {
    const sections = ['section-1', 'section-2', 'section-3', 'section-4', 'section-5'];

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach(id => {
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
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans antialiased overflow-x-hidden relative">
      <title>Privacy Protocol | Ecotrustia Solutions</title>
      <meta name="description" content="Read the Privacy Policy of Ecotrustia Solutions to understand how we collect, use, and protect your data while using our digital products and services." />

      {/* ─── Glowing Ambient Background Layers (strictly z-0) ─── */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_15%,rgba(147,51,234,0.12),transparent_65%)] pointer-events-none z-0"></div>
      <div className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-purple-900/5 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/5 blur-[180px] rounded-full pointer-events-none z-0"></div>

      {/* ─── Main Content Container (Structured EXACTLY like the footer container) ─── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 10 }} className="policy-container">

        {/* Hero Segment */}
        <div style={{ paddingTop: '144px', paddingBottom: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

          {/* Navigation Breadcrumb Node */}
          <div style={{ width: '100%', textAlign: 'left', marginBottom: '40px' }}>
            <Link href="/" className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 hover:text-purple-400 transition-all duration-300 group">
              <FaArrowLeft className="group-hover:-translate-x-1.5 transition-transform duration-300" /> Back to Hub
            </Link>
          </div>

          <div className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-[0.45em] mb-8 min-w-[200px] shadow-sm select-none">
            Security Compliance
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-[-0.05em] leading-[0.9] text-white uppercase text-glow">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-indigo-500">Protocol</span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-medium italic px-4">
            &quot;Your digital sovereignty is absolute. Explore our architectural guidelines on data transmission and user safety.&quot;
          </p>
        </div>

        {/* Utility Action Menu */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '24px',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          background: 'rgba(255, 255, 255, 0.01)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          marginBottom: '48px'
        }} className="utility-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500 select-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Last Architecture Update: May 2026
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'flex-end' }} className="utility-buttons">
            <button
              id="btn-copy-link"
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 text-[10px] font-black uppercase tracking-widest text-gray-300 bg-white/[0.02] border border-white/10 rounded-xl hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300 cursor-pointer"
            >
              {copied ? (
                <>
                  <FaCheck className="text-[10px] text-emerald-400" /> Staged to Clipboard
                </>
              ) : (
                <>
                  <FaCopy className="text-[10px]" /> Copy Document URL
                </>
              )}
            </button>

            <button
              id="btn-print-doc"
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 text-[10px] font-black uppercase tracking-widest text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/20 cursor-pointer"
            >
              <FaPrint className="text-[10px]" /> Export to PDF
            </button>
          </div>
        </div>

        {/* Architectural Layout Split (Responsive Grid modeled exactly after Footer) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '40px',
          paddingBottom: '120px'
        }} className="policy-grid">

          {/* Sticky Table of Contents Sidebar */}
          <div className="policy-sidebar">
            <div className="glass-workbench p-5 xl:p-6 rounded-[32px] border border-white/[0.08] shadow-2xl flex flex-col gap-6">
              <div className="hidden lg:block border-b border-white/5 pb-4">
                <span className="text-[10px] font-black tracking-[0.4em] text-purple-400 uppercase">DOCUMENT ANCHORS</span>
                <h3 className="text-lg font-black text-white mt-1 uppercase tracking-tight">Navigation Matrix</h3>
              </div>

              {/* Categories - swipable ribbon on mobile, stacked button column on desktop */}
              <nav className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 scrollbar-none snap-x shrink-0 px-2 lg:px-0">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-3.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-[18px] text-[10px] xl:text-[11px] font-black tracking-widest uppercase transition-all duration-300 snap-center shrink-0 lg:w-full border cursor-pointer ${activeSection === item.id
                        ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-500/10'
                        : 'bg-white/[0.02] border-white/5 text-gray-500 hover:text-white hover:border-white/10'
                      }`}
                  >
                    <span className={`text-xs ${activeSection === item.id ? 'text-white' : 'text-purple-400/80'}`}>
                      {item.icon}
                    </span>
                    <span className="hidden sm:inline">{item.label}</span>
                    <span className="inline sm:hidden">{item.shortLabel}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Document Content Column */}
          <div className="policy-content flex flex-col gap-10">

            {/* Section 1: Information We Collect */}
            <article
              id="section-1"
              className={`glass-workbench p-6 sm:p-10 md:p-12 rounded-[32px] border transition-all duration-500 ${activeSection === 'section-1' ? 'border-purple-500/30 bg-purple-500/[0.01]' : 'border-white/[0.08]'
                }`}
            >
              <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/25 shrink-0 text-purple-400">
                  <FaUserCheck className="text-sm" />
                </div>
                <div>
                  <span className="text-[9px] font-black tracking-[0.3em] text-purple-400 uppercase">PROTOCOL NODE 01</span>
                  <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-0.5">1. Information We Collect</h2>
                </div>
              </div>

              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 font-medium">
                We collect information to provide better services to all our users. When you use Ecotrustia Solutions and the Neural Workbench suite, we may collect:
              </p>

              {/* Sub-cards Grid - Styled side-by-side list style to completely prevent vertical squishing */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '20px',
                marginTop: '32px'
              }} className="cards-grid">

                {/* Device Info Card */}
                <div className="flex gap-4 items-start p-5 rounded-[20px] bg-white/[0.01] border border-white/5 hover:border-purple-500/20 hover:bg-white/[0.02] transition-all duration-300">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400 shrink-0 mt-0.5">
                    <FaLaptopCode className="text-sm" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-white mb-1.5">Device Info</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed italic">Operating system versions, and hardware models to optimize performance.</p>
                  </div>
                </div>

                {/* Usage Data Card */}
                <div className="flex gap-4 items-start p-5 rounded-[20px] bg-white/[0.01] border border-white/5 hover:border-purple-500/20 hover:bg-white/[0.02] transition-all duration-300">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400 shrink-0 mt-0.5">
                    <FaChartLine className="text-sm" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-white mb-1.5">Usage Data</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed italic">Interactive metrics on how you communicate with our sandbox tools.</p>
                  </div>
                </div>

                {/* Cookies Card */}
                <div className="flex gap-4 items-start p-5 rounded-[20px] bg-white/[0.01] border border-white/5 hover:border-purple-500/20 hover:bg-white/[0.02] transition-all duration-300">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400 shrink-0 mt-0.5">
                    <FaCookie className="text-sm" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-white mb-1.5">Cookies</h4>
                    <p className="text-[11px] text-gray-500 leading-relaxed italic">Minimal persistent parameters strictly necessary to retain sessions.</p>
                  </div>
                </div>

              </div>
            </article>

            {/* Section 2: Client-Side Processing */}
            <article
              id="section-2"
              className={`glass-workbench p-6 sm:p-10 md:p-12 rounded-[32px] border transition-all duration-500 ${activeSection === 'section-2' ? 'border-purple-500/30 bg-purple-500/[0.01]' : 'border-white/[0.08]'
                }`}
            >
              <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/25 shrink-0 text-purple-400">
                  <FaDatabase className="text-sm" />
                </div>
                <div>
                  <span className="text-[9px] font-black tracking-[0.3em] text-purple-400 uppercase">PROTOCOL NODE 02</span>
                  <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-0.5">2. Client-Side Processing</h2>
                </div>
              </div>

              <div className="relative rounded-[24px] bg-[#0a0a0a] border border-white/5 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-inner overflow-hidden mb-8">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 blur-2xl rounded-full pointer-events-none z-0"></div>

                <div className="shrink-0 w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400 relative z-10">
                  <FaShieldAlt className="text-base" />
                </div>

                <div className="flex-1 relative z-10">
                  <div className="inline-flex items-center justify-center px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] font-black uppercase tracking-widest mb-3 select-none">
                    ZERO-SERVER INGESTION
                  </div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white mb-2">Absolute Architectural Sovereignty</h4>
                  <p className="text-[12px] text-gray-500 leading-relaxed italic">
                    Inputs, generated outputs, passwords, and converter stream buffers are restricted entirely to your local execution terminal.
                  </p>
                </div>
              </div>

              <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-medium">
                At Ecotrustia Solutions, we prioritize zero-server data transfer wherever possible. Tools such as the Lorem Ipsum Generator, Password Generator, and various converters operate entirely client-side. This means your text, passwords, and sensitive inputs are <strong className="text-white font-bold">never transmitted to or stored on our servers</strong>.
              </p>
            </article>

            {/* Section 3: How We Use Information */}
            <article
              id="section-3"
              className={`glass-workbench p-6 sm:p-10 md:p-12 rounded-[32px] border transition-all duration-500 ${activeSection === 'section-3' ? 'border-purple-500/30 bg-purple-500/[0.01]' : 'border-white/[0.08]'
                }`}
            >
              <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/25 shrink-0 text-purple-400">
                  <FaCogs className="text-sm" />
                </div>
                <div>
                  <span className="text-[9px] font-black tracking-[0.3em] text-purple-400 uppercase">PROTOCOL NODE 03</span>
                  <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-0.5">3. How We Use Information</h2>
                </div>
              </div>

              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 font-medium">
                The information we collect from all our services is used strictly for the following operational purposes:
              </p>

              {/* Styled Checkmarks List with Perfect Alignment */}
              <div className="flex flex-col gap-5 mt-6">
                <div className="flex gap-4 items-start pl-2">
                  <div className="w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 text-[8px] text-purple-400 mt-0.5">
                    <FaCheck />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 font-medium leading-relaxed">
                    To provide, maintain, optimize, and improve the user interface latency and algorithmic tools of Ecotrustia Solutions.
                  </p>
                </div>

                <div className="flex gap-4 items-start pl-2">
                  <div className="w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 text-[8px] text-purple-400 mt-0.5">
                    <FaCheck />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 font-medium leading-relaxed">
                    To engineer and design next-generation features, experimental layouts, and responsive components.
                  </p>
                </div>

                <div className="flex gap-4 items-start pl-2">
                  <div className="w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 text-[8px] text-purple-400 mt-0.5">
                    <FaCheck />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 font-medium leading-relaxed">
                    To safeguard Ecotrustia Solutions, our digital nodes, and users against malicious scripts, bots, or unauthorized operations.
                  </p>
                </div>
              </div>
            </article>

            {/* Section 4: Data Security */}
            <article
              id="section-4"
              className={`glass-workbench p-6 sm:p-10 md:p-12 rounded-[32px] border transition-all duration-500 ${activeSection === 'section-4' ? 'border-purple-500/30 bg-purple-500/[0.01]' : 'border-white/[0.08]'
                }`}
            >
              <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/25 shrink-0 text-purple-400">
                  <FaShieldAlt className="text-sm" />
                </div>
                <div>
                  <span className="text-[9px] font-black tracking-[0.3em] text-purple-400 uppercase">PROTOCOL NODE 04</span>
                  <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-0.5">4. Data Security</h2>
                </div>
              </div>

              <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-medium mb-8">
                We work hard to protect you from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold. We enforce end-to-end encryption protocols and regularly audit our infrastructure to ensure architectural-grade security compliance.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-[24px] border border-white/5 bg-white/[0.01] p-6 sm:p-8">
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-black uppercase tracking-wider text-purple-400">SECURE SHELL</span>
                  <h5 className="text-xs font-black uppercase text-white tracking-wide">End-to-End Cryptography</h5>
                  <p className="text-[11px] text-gray-500 leading-relaxed italic">
                    Every external digital transition is wrapped under rigid Transport Layer Security (TLS) envelopes for maximum node safety.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-black uppercase tracking-wider text-purple-400">AUDIT CADENCE</span>
                  <h5 className="text-xs font-black uppercase text-white tracking-wide">Infrastructure Inspections</h5>
                  <p className="text-[11px] text-gray-500 leading-relaxed italic">
                    Ecotrustia engineers conduct routine integrity checks and pentests on active hosting containers to prevent data breach vectors.
                  </p>
                </div>
              </div>
            </article>

            {/* Section 5: Contact Us */}
            <article
              id="section-5"
              className={`glass-workbench p-6 sm:p-10 md:p-12 rounded-[32px] border transition-all duration-500 ${activeSection === 'section-5' ? 'border-purple-500/30 bg-purple-500/[0.01]' : 'border-white/[0.08]'
                }`}
            >
              <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/25 shrink-0 text-purple-400">
                  <FaPaperPlane className="text-sm" />
                </div>
                <div>
                  <span className="text-[9px] font-black tracking-[0.3em] text-purple-400 uppercase">PROTOCOL NODE 05</span>
                  <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-0.5">5. Contact Us</h2>
                </div>
              </div>

              <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-medium mb-8">
                If you have any questions about this Privacy Policy, please contact our support and legal department. We respond to verified security or privacy questions within 24 operational hours.
              </p>

              {/* High-End Direct Contact Card */}
              <div className="rounded-[28px] border border-white/10 bg-[#0a0a0a] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-inner relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-0"></div>

                <div className="relative z-10 flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-[0.35em] text-purple-400 mb-1">Direct Secure Line</span>
                  <span className="text-base sm:text-xl lg:text-2xl font-black text-white font-mono tracking-tight select-all">privacy@ecotrustia.com</span>
                </div>

                <a
                  href="mailto:privacy@ecotrustia.com"
                  className="relative z-10 inline-flex items-center justify-center px-6 py-4 rounded-[16px] bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-md hover:scale-[1.03] active:scale-[0.97]"
                >
                  Email Node <FaPaperPlane className="ml-2.5 text-[9px]" />
                </a>
              </div>
            </article>

          </div>

        </div>

      </div>

      <style jsx>{`
        .glass-workbench {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .text-glow {
          text-shadow: 0 0 35px rgba(147, 51, 234, 0.35);
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* ─── Media Query Rules matching exactly the Footer containment model ─── */
        @media (max-width: 768px) {
          .policy-container {
            padding: 0 20px !important;
          }
        }

        @media (min-width: 768px) {
          .utility-bar {
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
            padding: 24px 40px !important;
          }
          .cards-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        @media (min-width: 1024px) {
          .policy-grid {
            grid-template-columns: 1fr 2.5fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </div>
  );
}
