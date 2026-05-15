'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaCode, FaCss3Alt, FaJsSquare, FaPlay, FaSyncAlt, FaExpand, FaBug, FaFileCode, FaShieldAlt } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';

const LiveCodeTester: React.FC = () => {
    const [html, setHtml] = useState(`<div class="neural-module">
  <h1>Neural Sandbox Ready</h1>
  <p>Input your code streams to begin real-time rendering.</p>
  <button id="trigger">Initialize Engine</button>
</div>`);

    const [css, setCss] = useState(`/* Neutral Workspace Protocol */
.neural-module {
  background: #0a0a0a;
  padding: 40px;
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,0.05);
  text-align: center;
}

h1 { 
  color: white; 
  margin-bottom: 16px; 
  font-family: sans-serif;
}

p { 
  color: #888; 
  margin-bottom: 24px; 
  font-family: sans-serif;
}

button {
  background: #1e293b;
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
} `);

    const [js, setJs] = useState(`// Logic Protocol
document.getElementById('trigger').addEventListener('click', () => {
  alert('Neural Pulse Initialized');
});`);

    const [activeTab, setActiveTab] = useState('html');
    const previewFrame = useRef<HTMLIFrameElement>(null);

    const [srcDoc, setSrcDoc] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
                <html>
                    <head>
                        <style>
                            body { 
                                margin: 0; 
                                min-height: 100vh;
                            }
                            ${css}
                        </style>
                    </head>
                    <body>
                        ${html}
                        <script>${js}<\/script>
                    </body>
                </html>
            `);
        }, 500);
        return () => clearTimeout(timeout);
    }, [html, css, js]);

    const updatePreview = () => {
        // Fallback for manual sync button
        setSrcDoc(`
            <html>
                <head>
                    <style>
                        body { 
                            margin: 0; 
                            min-height: 100vh;
                        }
                        ${css}
                    </style>
                </head>
                <body>
                    ${html}
                    <script>${js}<\/script>
                </body>
            </html>
        `);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
            <title>Neural Code Sandbox | Ecotrustia Solutions</title>
            <meta name="description" content="A high-performance live code testing environment for HTML, CSS, and JavaScript. Real-time rendering with isolated sandbox execution." />

            {/* ─── Hero Section ─── */}
            <section className="relative pt-40 pb-24 px-[5%] overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(147,51,234,0.1),transparent_70%)] pointer-events-none"></div>

                {/* Horizontal Navigation Boundary */}
                <div className="relative z-20 w-full max-w-6xl mx-auto mb-[10px]">
                    <Link href="/tools" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 hover:text-purple-400 transition-all group">
                        <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> Back to Workbench
                    </Link>
                </div>

                {/* Perfectly Centered Content Node */}
                <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-[-0.05em] leading-[0.9] text-white uppercase text-glow">
                        Neural Code <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Sandbox</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Execute isolated front-end code streams with real-time architectural synchronization."
                    </p>
                </div>
            </section>

            {/* ─── Workbench Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-[1400px] w-full mx-auto">

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 min-h-[850px]" style={{ marginBottom: '40px' }}>

                        {/* Editor Block */}
                        <div className="glass-workbench h-full flex flex-col border border-white/10 shadow-2xl overflow-hidden" style={{ borderRadius: '48px' }}>
                            <div className="flex items-center justify-between" style={{ padding: '80px 64px 40px 64px' }}>
                                <div className="flex gap-3 p-2 bg-white/[0.03] border border-white/5 rounded-[24px]">
                                    <button
                                        onClick={() => setActiveTab('html')}
                                        className={`px-8 py-4 rounded-[20px] text-[11px] font-black tracking-[0.2em] uppercase transition-all flex items-center gap-3 ${activeTab === 'html' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                                    >
                                        <FaCode className="text-sm" /> HTML
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('css')}
                                        className={`px-8 py-4 rounded-[20px] text-[11px] font-black tracking-[0.2em] uppercase transition-all flex items-center gap-3 ${activeTab === 'css' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                                    >
                                        <FaCss3Alt className="text-sm" /> CSS
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('js')}
                                        className={`px-8 py-4 rounded-[20px] text-[11px] font-black tracking-[0.2em] uppercase transition-all flex items-center gap-3 ${activeTab === 'js' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                                    >
                                        <FaJsSquare className="text-sm" /> JS
                                    </button>
                                </div>
                                <button onClick={updatePreview} className="w-14 h-14 rounded-[20px] bg-white/[0.03] border border-white/5 flex items-center justify-center hover:bg-purple-500 transition-all group text-purple-400 hover:text-white" title="Manual Sync">
                                    <FaSyncAlt className="text-base group-active:rotate-180 transition-transform duration-500" />
                                </button>
                            </div>

                            <div className="flex-1" style={{ padding: '0 64px 64px 64px' }}>
                                <div className="h-[500px] bg-[#0c0c0c] rounded-[32px] border border-white/5 relative group overflow-hidden" style={{ padding: '48px' }}>
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(147,51,234,0.05),transparent_40%)] pointer-events-none"></div>

                                    <div className={`h-full ${activeTab === 'html' ? 'block' : 'hidden'}`}>
                                        <textarea
                                            value={html}
                                            onChange={(e) => setHtml(e.target.value)}
                                            className="code-editor"
                                            spellCheck="false"
                                        />
                                    </div>
                                    <div className={`h-full ${activeTab === 'css' ? 'block' : 'hidden'}`}>
                                        <textarea
                                            value={css}
                                            onChange={(e) => setCss(e.target.value)}
                                            className="code-editor"
                                            spellCheck="false"
                                        />
                                    </div>
                                    <div className={`h-full ${activeTab === 'js' ? 'block' : 'hidden'}`}>
                                        <textarea
                                            value={js}
                                            onChange={(e) => setJs(e.target.value)}
                                            className="code-editor"
                                            spellCheck="false"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Preview Block */}
                        <div className="glass-workbench h-full flex flex-col border border-white/10 shadow-2xl bg-[#000] overflow-hidden" style={{ borderRadius: '48px' }}>
                            <div className="flex items-center justify-center border-b border-white/5 bg-white/[0.01]" style={{ padding: '80px 64px 40px 64px' }}>
                                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-gray-600">Architectural Viewport</span>
                            </div>
                            <div className="flex-1 bg-white relative overflow-hidden" style={{ minHeight: '600px' }}>
                                <iframe
                                    srcDoc={srcDoc}
                                    className="w-full h-full border-none"
                                    title="Protocol Preview"
                                    sandbox="allow-scripts allow-modals"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="h-[120px]"></div>

                    {/* Capability Infrastructure */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '200px' }}>
                        <div className="mini-card group flex flex-col gap-6">
                            <FaPlay className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">Live Execution</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Real-time compilation of visual assets with zero-refresh architectural sync.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-6">
                            <FaShieldAlt className="block text-indigo-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">Isolated Sandbox</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Code executes in a restricted iframe shell for maximum host infrastructure safety.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-6">
                            <FaBug className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">Logic Debugging</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Iterate through complex JS functions and CSS animations with instant feedback.</p>
                        </div>
                    </div>

                    {/* Protocol Intelligence */}
                    <div className="about-workbench-section text-center" style={{ marginBottom: '120px' }}>
                        <h2 className="text-3xl font-black tracking-tight text-white font-sans text-center uppercase tracking-widest text-glow" style={{ marginBottom: '20px' }}>Sandbox Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans max-w-4xl mx-auto text-gray-500 border-t border-white/5 pt-12">
                            <div className="faq-item">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest leading-loose text-glow mt-[2px]">External CDN Integration?</h5>
                                <p className="text-sm leading-relaxed">Yes. You can link external CSS or JS libraries by adding <code>&lt;link&gt;</code> or <code>&lt;script&gt;</code> tags directly into the HTML editor block for rapid prototyping.</p>
                            </div>
                            <div className="faq-item">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest leading-loose mt-[2px]">Architectural Safety?</h5>
                                <p className="text-sm leading-relaxed">The Neural Sandbox uses strict <code>sandbox</code> protocols on the rendering frame, preventing isolated scripts from accessing cookies, storage, or parent window architecture.</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/livetester" />
                    </div>
                </div>
            </section>

            <style jsx>{`
                .glass-workbench {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                }
                .text-glow {
                    text-shadow: 0 0 30px rgba(147, 51, 234, 0.3);
                }
                .code-editor {
                    width: 100%;
                    height: 100%;
                    background: transparent;
                    border: none;
                    color: rgba(255, 255, 255, 0.8);
                    font-family: 'JetBrains Mono', 'Fira Code', monospace;
                    font-size: 13px;
                    line-height: 1.8;
                    outline: none;
                    resize: none;
                    padding: 0 !important;
                    scrollbar-width: thin;
                    scrollbar-color: rgba(147, 51, 234, 0.2) transparent;
                }
                .mini-card {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 50px 44px;
                    border-radius: 20px;
                    transition: all 0.3s;
                }
                .mini-card:hover {
                    background: rgba(255, 255, 255, 0.04);
                    border-color: rgba(147, 51, 234, 0.2);
                }
                .faq-item {
                    border-left: 2px solid rgba(147, 51, 234, 0.1);
                    padding-left: 32px;
                    text-align: left;
                }
            `}</style>
        </div>
    );
};

export default LiveCodeTester;