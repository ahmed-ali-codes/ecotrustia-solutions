'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
      <title>Privacy Policy | Ecotrustia Solutions</title>
      <meta name="description" content="Read the Privacy Policy of Ecotrustia Solutions to understand how we collect, use, and protect your data while using our digital products and services." />

      {/* ─── Hero Section ─── */}
      <section className="relative pt-40 pb-24 px-[5%] overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(147,51,234,0.1),transparent_70%)] pointer-events-none"></div>

        {/* Horizontal Navigation Boundary */}
        <div className="relative z-20 w-full max-w-6xl mx-auto mb-[10px]">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 hover:text-purple-400 transition-all group">
            <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> Back to Hub
          </Link>
        </div>

        {/* Perfectly Centered Content Node */}
        <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-[-0.05em] leading-[0.9] text-white uppercase text-glow">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Policy</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
            "Your privacy is our priority. Discover how we protect your digital footprint."
          </p>
          <div className="mt-8 text-[10px] uppercase font-black tracking-[0.3em] text-gray-600">
            Last Updated: May 2026
          </div>
        </div>
      </section>

      {/* ─── Content Section ─── */}
      <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
        <div className="max-w-4xl w-full mx-auto">
          <div className="glass-workbench shadow-2xl relative" style={{ padding: 'clamp(32px, 5vw, 64px)' }}>

            <div className="space-y-12 text-gray-300 leading-relaxed font-light">

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 tracking-tight flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  1. Information We Collect
                </h2>
                <p className="mb-4">
                  We collect information to provide better services to all our users. When you use Ecotrustia Solutions and the Neural Workbench suite, we may collect:
                </p>
                <ul className="list-disc pl-6 space-y-2 opacity-80">
                  <li><strong>Device Information:</strong> We collect device-specific information such as operating system versions, and hardware models to optimize performance.</li>
                  <li><strong>Usage Data:</strong> Information on how you interact with our tools and interfaces.</li>
                  <li><strong>Cookies:</strong> We use minimal cookies essential for maintaining session integrity.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 tracking-tight flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  2. Client-Side Processing
                </h2>
                <p>
                  At Ecotrustia Solutions, we prioritize zero-server data transfer wherever possible. Tools such as the Lorem Ipsum Generator, Password Generator, and various converters operate entirely client-side. This means your text, passwords, and sensitive inputs are <strong>never transmitted to or stored on our servers</strong>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 tracking-tight flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  3. How We Use Information
                </h2>
                <p className="mb-4">
                  The information we collect from all our services is used for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 opacity-80">
                  <li>To provide, maintain, and improve our services.</li>
                  <li>To develop new tools, features, and functionalities.</li>
                  <li>To protect Ecotrustia and our users from malicious activity.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 tracking-tight flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  4. Data Security
                </h2>
                <p>
                  We work hard to protect you from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold. We enforce end-to-end encryption protocols and regularly audit our infrastructure to ensure architectural-grade security compliance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 tracking-tight flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  5. Contact Us
                </h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact our support and legal department at <strong>privacy@ecotrustia.com</strong>.
                </p>
              </section>

            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .glass-workbench {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
        }
        .text-glow {
          text-shadow: 0 0 30px rgba(147, 51, 234, 0.3);
        }
      `}</style>
    </div>
  );
}
