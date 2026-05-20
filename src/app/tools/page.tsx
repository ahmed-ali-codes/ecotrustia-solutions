'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const tools = [
    { name: "PDF Merger", icon: "fa-file-pdf", link: "/tools/pdf-merger", desc: "Combine multiple streams into a single architecture.", cat: "DOC" },
    { name: "PDF Compressor", icon: "fa-file-archive", link: "/tools/pdf-compressor", desc: "Reduce document density using high-fidelity stream pruning.", cat: "DOC" },
    { name: "Image Converter", icon: "fa-image", link: "/tools/image-converter", desc: "Transpile visual data between multi-format buffers.", cat: "VISUAL" },
    { name: "Image Compressor", icon: "fa-compress-arrows-alt", link: "/tools/image-compressor", desc: "Optimize visual entropy for bandwidth-constrained nodes.", cat: "VISUAL" },
    { name: "URL Shortener", icon: "fa-link", link: "/tools/url-shortener", desc: "Alias long-form endpoints into high-frequency links.", cat: "NET" },
    { name: "QR Generator", icon: "fa-qrcode", link: "/tools/qr-code-generator", desc: "Generate encrypted physical-to-digital access keys.", cat: "ACCESS" },
    { name: "Password Generator", icon: "fa-lock", link: "/tools/password-generator", desc: "Entropy-driven sequence generation for secure access.", cat: "SEC" },
    { name: "Audio Converter", icon: "fa-file-audio", link: "/tools/audio-converter", desc: "Transcode acoustic signals between digital containers.", cat: "VISUAL" },
    { name: "Video Converter", icon: "fa-file-video", link: "/tools/video-converter", desc: "Manipulate temporal visual streams across multi-codecs.", cat: "VISUAL" },
    { name: "File Compressor", icon: "fa-file-zipper", link: "/tools/file-compressor", desc: "Encapsulate data matrices into high-density archives.", cat: "DOC" },
    { name: "Code Tester", icon: "fa-terminal", link: "/tools/live-code-tester", desc: "Real-time sandbox for logic validation and debugging.", cat: "DEV" },
    { name: "Word Counter", icon: "fa-font", link: "/tools/word-counter", desc: "Quantify linguistic data streams and lexical density.", cat: "DATA" },
    { name: "Case Converter", icon: "fa-exchange-alt", link: "/tools/case-converter", desc: "Transform string casing between standard protocols.", cat: "DATA" },
    { name: "Remove Spaces", icon: "fa-broom", link: "/tools/remove-spaces", desc: "Sanitize buffers by purging excessive spatial entropy.", cat: "DATA" },
    { name: "Slug Generator", icon: "fa-link", link: "/tools/slug-generator", desc: "SEO permalink architecture for content nodes.", cat: "DATA" },
    { name: "Pro Compressor", icon: "fa-bolt", link: "/tools/client-image-compressor", desc: "Enterprise-grade asset transpiler with advanced metrics.", cat: "VISUAL" },
    { name: "Image Resizer", icon: "fa-expand-arrows-alt", link: "/tools/image-resizer", desc: "Redefine dimensional matrix grids with high-fidelity scaling.", cat: "VISUAL" },
    { name: "Image to Base64", icon: "fa-code", link: "/tools/image-to-base64", desc: "Synthesize binary visual assets into inline code hashes.", cat: "DEV" },
    { name: "Color Picker", icon: "fa-eye-dropper", link: "/tools/color-picker", desc: "Extract spectral values from your visual environment.", cat: "VISUAL" },
    { name: "HEX to RGB", icon: "fa-adjust", link: "/tools/hex-to-rgb", desc: "Transcode color space coordinates between architectures.", cat: "VISUAL" },
    { name: "Gradient Gen", icon: "fa-palette", link: "/tools/gradient-generator", desc: "Construct multi-node chromatic transitions for UI.", cat: "VISUAL" },
    { name: "Age Calculator", icon: "fa-birthday-cake", link: "/tools/age-calculator", desc: "Temporal delta calculation since initialization.", cat: "MATH" },
    { name: "Date Delta", icon: "fa-calendar-alt", link: "/tools/days-between-dates", desc: "Measure inter-temporal magnitude between two nodes.", cat: "MATH" },
    { name: "Countdown Timer", icon: "fa-clock", link: "/tools/countdown-timer", desc: "Synchronized temporal decay for event terminal.", cat: "MATH" },
    { name: "Scientific Calculator", icon: "fa-calculator", link: "/tools/scientific-calculator", desc: "Advanced arithmetic logic engine with trigonometric and logarithmic functions.", cat: "MATH" },
    { name: "Percent Calc", icon: "fa-percentage", link: "/tools/percentage-calculator", desc: "Calculate relative magnitude and proportional deltas.", cat: "MATH" },
    { name: "BMI Calculator", icon: "fa-weight", link: "/tools/bmi-calculator", desc: "Biometric mass index calculation and diagnostic.", cat: "BIO" },
    { name: "Length Converter", icon: "fa-ruler", link: "/tools/length-converter", desc: "Mathematical conversion between dimensional metrics.", cat: "MATH" },
    { name: "Weight Converter", icon: "fa-balance-scale", link: "/tools/weight-converter", desc: "Convert mass metrics across global standard protocols.", cat: "MATH" },
    { name: "Calorie Calc", icon: "fa-utensils", link: "/tools/calories-calculator", desc: "Metabolic energy expenditure projection node.", cat: "BIO" },
    { name: "Temp Converter", icon: "fa-thermometer-half", link: "/tools/temperature-converter", desc: "Thermal kinetic energy mapping across scales.", cat: "MATH" },
    { name: "Lorem Ipsum", icon: "fa-align-left", link: "/tools/lorem-ipsum-generator", desc: "Synthesize pseudo-latin linguistic filler streams.", cat: "DATA" },
    { name: "Miles to KM", icon: "fa-road", link: "/tools/miles-to-kilometer", desc: "Radial distance mapping between imperial and metric.", cat: "MATH" },
  ];

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30">
      <section className="relative min-h-[75vh] flex flex-col items-center justify-center text-center px-[5%] overflow-hidden">
        {/* Cinematic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_70%)] pointer-events-none"></div>
        <div className="hero-grid-subtle opacity-20 absolute inset-0 pointer-events-none"></div>
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">
          <div className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[11px] font-black uppercase tracking-[0.4em] mb-12 min-w-[220px]">
            Utility Protocols
          </div>

          <h1 className="text-5xl md:text-8xl lg:text-[110px] font-black mb-10 tracking-[-0.05em] leading-[0.9] text-white">
            Tools <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400">Nest</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-2xl mb-16 max-w-3xl mx-auto leading-relaxed font-light italic">
            "A high-frequency suite for digital optimization, secure data transpilation, and precision testing protocols."
          </p>

          <div className="relative w-full max-w-2xl mx-auto group mt-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex items-center">
              <div className="absolute left-6 flex items-center pointer-events-none z-20">
                <svg className="w-5 h-5 text-purple-400 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0c0c0c] border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all backdrop-blur-3xl placeholder:text-gray-600 font-medium z-10"
                placeholder="Query utility protocols..."
                style={{ padding: '16px 20px 16px 60px', height: '56px' }}
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 hover:opacity-80 transition-opacity">
          <span className="text-[8px] uppercase font-black tracking-[0.2em] vertical-text mb-2">Explore Units</span>
          <div className="w-[2px] h-10 bg-gradient-to-b from-purple-500 to-transparent"></div>
        </div>
      </section>

      <section className="px-5 py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredTools.map((tool) => (
              <div className="tool-item glass-card group hover:border-purple-500/40 transition-all flex flex-col" key={tool.name}>
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-500/10 transition-all border border-white/5">
                    <i className={`fas ${tool.icon} text-xl`}></i>
                  </div>
                  <span className="text-[10px] font-black tracking-[0.3em] text-gray-600 uppercase bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                    {tool.cat}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors tracking-tight">{tool.name}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-10 flex-1 font-medium">
                  {tool.desc}
                </p>
                <Link
                  href={tool.link}
                  className="inline-flex items-center justify-center py-4 text-[10px] font-black tracking-[0.2em] w-full text-white border border-white/10 rounded-xl group-hover:bg-purple-600 group-hover:border-purple-600 transition-all uppercase"
                >
                  Apply Protocol <i className="fas fa-arrow-right ml-3 text-[9px] group-hover:translate-x-1 transition-transform"></i>
                </Link>
              </div>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-gray-600 font-bold uppercase tracking-[0.4em] text-xs">Zero results for "{searchTerm}"</p>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .tool-item {
          min-height: 240px;
        }
        .hero-grid-subtle {
          background-image: 
          linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          padding: 30px;
        }
      `}</style>
    </div>
  );
}