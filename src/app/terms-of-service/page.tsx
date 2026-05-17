'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
      <title>Terms of Service | Ecotrustia Solutions</title>
      <meta name="description" content="Read the Terms of Service for Ecotrustia Solutions to understand the rules, guidelines, and agreements for using our tools and services." />

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
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Service</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
            "The foundational guidelines for accessing and utilizing the Ecotrustia Neural Workbench."
          </p>
          <div className="mt-8 text-[10px] uppercase font-black tracking-[0.3em] text-gray-600">
            Last Updated: May 2026
          </div>
        </div>
      </section>

      {/* ─── Content Section ─── */}
      <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
        <div className="max-w-4xl w-full mx-auto">
          <div className="glass-workbench shadow-2xl relative p-5 md:p-16 border border-white/[0.08] rounded-[24px] md:rounded-[40px] overflow-hidden break-words">

            <div className="space-y-12 md:space-y-16 text-gray-300 font-light text-[15px] md:text-[16px] leading-[1.8]">

              <div className="relative">
                <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 tracking-tight flex items-center gap-3">
                  <span className="w-6 md:w-8 h-[2px] bg-gradient-to-r from-purple-500 to-transparent"></span>
                  1. Acceptance of Terms
                </h2>
                <div className="">
                  <p>
                    By accessing and using the tools, applications, and services provided by Ecotrustia Solutions, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must discontinue your use of our platform immediately.
                  </p>
                </div>
              </div>

              <div className="relative">
                <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 tracking-tight flex items-center gap-3">
                  <span className="w-6 md:w-8 h-[2px] bg-gradient-to-r from-indigo-500 to-transparent"></span>
                  2. Use License & Intellectual Property
                </h2>
                <div className="space-y-4">
                  <p>
                    Ecotrustia Solutions grants you a personal, non-exclusive, non-transferable license to utilize the Neural Workbench suite. Under this license, you may not:
                  </p>
                  <ul className="list-disc pl-5 space-y-3 opacity-90 marker:text-indigo-500">
                    <li>Attempt to decompile or reverse engineer any software contained on the Ecotrustia network.</li>
                    <li>Remove any copyright or proprietary notations from the generated materials.</li>
                    <li>Transfer the materials to another person or "mirror" the materials on any other server without authorization.</li>
                  </ul>
                </div>
              </div>

              <div className="relative">
                <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 tracking-tight flex items-center gap-3">
                  <span className="w-6 md:w-8 h-[2px] bg-gradient-to-r from-purple-500 to-transparent"></span>
                  3. Service Availability & Modifications
                </h2>
                <div className="">
                  <p>
                    We strive to ensure 99.9% uptime, but Ecotrustia Solutions does not guarantee that the services will be uninterrupted or error-free. We reserve the right to modify, suspend, or discontinue any part of our service at any time without prior notice or liability.
                  </p>
                </div>
              </div>

              <div className="relative">
                <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 tracking-tight flex items-center gap-3">
                  <span className="w-6 md:w-8 h-[2px] bg-gradient-to-r from-indigo-500 to-transparent"></span>
                  4. Disclaimer of Warranties
                </h2>
                <div className="">
                  <p>
                    The materials and tools on Ecotrustia Solutions are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties of merchantability or fitness for a particular purpose.
                  </p>
                </div>
              </div>

              <div className="relative">
                <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 tracking-tight flex items-center gap-3">
                  <span className="w-6 md:w-8 h-[2px] bg-gradient-to-r from-purple-500 to-transparent"></span>
                  5. Governing Law
                </h2>
                <div className="">
                  <p>
                    These terms and conditions are governed by and construed in accordance with international digital commerce laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                  </p>
                </div>
              </div>

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
