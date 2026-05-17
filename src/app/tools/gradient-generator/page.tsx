'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaPalette, FaCopy, FaCheck, FaSlidersH, FaCode, FaSyncAlt, FaLayerGroup, FaShieldAlt, FaCompass, FaCircle } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';

const GradientGenerator: React.FC = () => {
    const [color1, setColor1] = useState('#3b82f6');
    const [color2, setColor2] = useState('#8b5cf6');
    const [gradientType, setGradientType] = useState('linear');
    const [gradientDirection, setGradientDirection] = useState('90deg');
    const [cssCode, setCssCode] = useState('');
    const [copied, setCopied] = useState(false);

    const updateGradient = () => {
        let gradientCSS;
        if (gradientType === 'linear') {
            gradientCSS = `linear-gradient(${gradientDirection}, ${color1}, ${color2})`;
        } else {
            gradientCSS = `radial-gradient(circle, ${color1}, ${color2})`;
        }
        setCssCode(`background: ${gradientCSS};`);
    };

    useEffect(() => {
        updateGradient();
    }, [color1, color2, gradientType, gradientDirection]);

    const handleCopy = () => {
        navigator.clipboard.writeText(cssCode).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans text-glow-none">
            <title>Luminance Transition Architect | Ecotrustia Solutions</title>
            <meta name="description" content="Professional CSS gradient synthesis engine. Construct high-fidelity luminance transitions and spectral backgrounds for modern UI architectures." />

            {/* ─── Hero Section ─── */}
            <section className="relative pt-40 pb-24 px-[5%] overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(139,92,246,0.1),transparent_70%)] pointer-events-none"></div>

                {/* Horizontal Navigation Boundary */}
                <div className="relative z-20 w-full max-w-[1400px] mx-auto mb-[10px]">
                    <Link href="/tools" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 hover:text-purple-400 transition-all group">
                        <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> Back to Workbench
                    </Link>
                </div>

                {/* Perfectly Centered Content Node */}
                <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-[-0.05em] leading-[0.9] text-white uppercase text-glow">
                        Gradient <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Generator</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Construct complex chromatic vectors and spectral transitions for professional-grade visual systems."
                    </p>
                </div>
            </section>

            {/* ─── Workbench Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-[1400px] w-full mx-auto">

                    <div className="glass-workbench shadow-2xl border border-white/10 overflow-hidden" style={{ borderRadius: '48px', marginBottom: '40px' }}>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

                            {/* Preview Hub (Left 7) */}
                            <div className="lg:col-span-7 flex flex-col border-b lg:border-b-0 lg:border-r border-white/5">
                                <div style={{ padding: 'clamp(40px, 8vw, 80px) clamp(24px, 5vw, 64px) clamp(20px, 4vw, 40px) clamp(24px, 5vw, 64px)' }}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Spectral Output Buffer</span>
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col" style={{ padding: '0 clamp(24px, 5vw, 64px) clamp(40px, 8vw, 64px) clamp(24px, 5vw, 64px)' }}>
                                    <div
                                        className="relative flex-1 rounded-[32px] md:rounded-[48px] overflow-hidden border border-white/10 min-h-[400px] shadow-2xl transition-all duration-700 group"
                                        style={{ background: cssCode.replace('background: ', '').slice(0, -1) }}
                                    >
                                        <div className="absolute top-8 left-8 px-6 py-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/90 z-20">Live Render</div>
                                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Configuration Hub (Right 5) */}
                            <div className="lg:col-span-5 flex flex-col bg-white/[0.01]">
                                <div style={{ padding: 'clamp(40px, 8vw, 80px) clamp(24px, 5vw, 64px) clamp(20px, 4vw, 40px) clamp(24px, 5vw, 64px)' }}>
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Logic Core</span>
                                </div>

                                <div className="flex-1 flex flex-col gap-10" style={{ padding: '0 clamp(24px, 5vw, 64px) clamp(40px, 8vw, 64px) clamp(24px, 5vw, 64px)' }}>

                                    {/* Vector Nodes */}
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-1 gap-6">
                                            {[
                                                { label: 'Subject Origin Node', val: color1, set: setColor1 },
                                                { label: 'Spectral Terminus Node', val: color2, set: setColor2 }
                                            ].map((node, i) => (
                                                <div key={i} className="flex flex-col gap-3">
                                                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.4em] ml-2">{node.label}</label>
                                                    <div
                                                        className="rounded-[24px] bg-[#0c0c0c] border border-white/10 flex items-center justify-between group hover:border-purple-500/30 transition-all"
                                                        style={{ padding: '16px 24px' }}
                                                    >
                                                        <span className="text-xl font-mono font-black text-white uppercase tracking-tight">{node.val}</span>
                                                        <div className="relative w-12 h-12 shrink-0">
                                                            <input
                                                                type="color"
                                                                value={node.val}
                                                                onChange={(e) => node.set(e.target.value)}
                                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                            />
                                                            <div
                                                                className="w-full h-full rounded-[14px] border border-white/20 shadow-lg transition-transform group-hover:scale-110"
                                                                style={{ backgroundColor: node.val }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Orientation Logic */}
                                    <div className="space-y-8">
                                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.4em] ml-2">Spectral Transition Mode</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                onClick={() => setGradientType('linear')}
                                                className={`h-16 rounded-[24px] flex items-center justify-center gap-3 transition-all border font-black text-[10px] uppercase tracking-widest ${gradientType === 'linear' ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-[#0c0c0c] border-white/5 text-gray-600 hover:text-white hover:border-white/10'}`}
                                            >
                                                <FaCompass className="text-sm" />
                                                <span>Linear</span>
                                            </button>
                                            <button
                                                onClick={() => setGradientType('radial')}
                                                className={`h-16 rounded-[24px] flex items-center justify-center gap-3 transition-all border font-black text-[10px] uppercase tracking-widest ${gradientType === 'radial' ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-500/20' : 'bg-[#0c0c0c] border-white/5 text-gray-600 hover:text-white hover:border-white/10'}`}
                                            >
                                                <FaCircle className="text-sm" />
                                                <span>Radial</span>
                                            </button>
                                        </div>

                                        {gradientType === 'linear' && (
                                            <div className="pt-4 space-y-6 animate-in fade-in slide-in-from-top-2 duration-500">
                                                <div className="flex justify-between items-end px-2">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Vector Direction</label>
                                                    <span className="text-sm font-mono font-black text-blue-400">{gradientDirection}</span>
                                                </div>
                                                <div className="px-2">
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="360"
                                                        step="45"
                                                        value={parseInt(gradientDirection)}
                                                        onChange={(e) => setGradientDirection(`${e.target.value}deg`)}
                                                        className="premium-slider"
                                                    />
                                                    <div className="flex justify-between mt-6 text-[8px] font-black uppercase text-gray-800 tracking-tighter">
                                                        <span>0°</span><span>90°</span><span>180°</span><span>270°</span><span>360°</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Status Report Bar */}
                                    <div className="mt-auto rounded-[24px] bg-[#0c0c0c] border border-white/5 flex items-center justify-between group overflow-hidden" style={{ padding: '12px 20px' }}>
                                        <div className="flex items-center gap-5">
                                            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-600/20">
                                                <FaSyncAlt className="text-white text-xs animate-spin-slow" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-purple-400">Status Report</span>
                                                <span className="text-[11px] font-black text-white uppercase tracking-tight">Spectral Synthesis Verified</span>
                                            </div>
                                        </div>
                                        <FaCheck className="text-green-500 text-sm opacity-80" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Export Section */}
                        <div className="border-t border-white/5 flex flex-col" style={{ padding: 'clamp(40px, 8vw, 64px) clamp(24px, 5vw, 64px)' }}>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                    <FaCode className="text-purple-400 text-xs" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">CSS Architecture</span>
                            </div>

                            <div className="relative group" style={{ marginTop: '10px' }}>
                                <div className="absolute inset-0 bg-purple-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                <div className="relative bg-[#0c0c0c] border border-white/10 rounded-[32px] overflow-hidden group-focus-within:border-purple-500/30 transition-all">
                                    <code className="block text-xs md:text-sm font-mono font-black text-gray-400 break-all leading-relaxed" style={{ padding: '40px 100px 40px 48px' }}>
                                        {cssCode}
                                    </code>
                                    <button
                                        onClick={handleCopy}
                                        className={`absolute bottom-8 right-8 w-14 h-14 rounded-2xl flex items-center justify-center transition-all backdrop-blur-md ${copied ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-purple-600 text-white shadow-xl shadow-purple-500/20 hover:scale-105'}`}
                                    >
                                        {copied ? <FaCheck className="text-lg" /> : <FaCopy className="text-lg" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pro Capability Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '200px' }}>
                        {[
                            { icon: FaLayerGroup, title: 'Visual Depth', text: 'Construct spectral hierarchies that add spatial depth to flat UI components.', color: 'text-purple-400' },
                            { icon: FaPalette, title: 'Spectrum Nodes', text: 'Precisely define origin and terminus chromatic nodes for brand-compliant designs.', color: 'text-indigo-400' },
                            { icon: FaSlidersH, title: 'Logic Presets', text: 'Quickly toggle between linear vector and radial focal-point transition logics.', color: 'text-purple-400' }
                        ].map((item, i) => (
                            <div key={i} className="mini-card group flex flex-col gap-8" style={{ borderRadius: '32px', padding: '48px 40px 48px 48px' }}>
                                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:border-purple-500/30 transition-all">
                                    <item.icon className={`text-xl ${item.color} group-hover:scale-110 transition-transform`} />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h5 className="font-black text-xs uppercase tracking-[0.3em] text-white">{item.title}</h5>
                                    <p className="text-[11px] text-gray-500 leading-relaxed italic font-sans">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Intelligence Section */}
                    <div className="about-workbench-section text-center" style={{ marginBottom: '120px' }}>
                        <h2 className="text-3xl font-black tracking-tight text-white font-sans text-center uppercase tracking-widest text-glow" style={{ marginBottom: '60px' }}>Transition Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans max-w-5xl mx-auto text-left">
                            {[
                                { title: 'Linear vs Radial Logic?', text: 'Linear gradients Construct color paths along a single straight vector, making them ideal for hero backgrounds and buttons. Radial gradients radiate from a central focal node, creating a spotlight effect.' },
                                { title: 'What are chromatic nodes?', text: 'In the Luminance Architect, chromatic nodes define the specific coordinates where a transition begins and ends. Our engine calculates the mathematical midpoints to ensure a perfectly smooth spectral blend.' }
                            ].map((item, i) => (
                                <div key={i} className="rounded-[32px] bg-white/[0.01] border border-white/5 flex flex-col gap-6" style={{ padding: '40px 48px' }}>
                                    <div className="flex items-center gap-4">
                                        <FaShieldAlt className="text-purple-500 text-xs" />
                                        <h5 className="font-black text-[10px] uppercase tracking-[0.4em] text-white">{item.title}</h5>
                                    </div>
                                    <p className="text-sm leading-relaxed text-gray-500">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/gradient-generator" />
                    </div>
                </div>
            </section>

            <style jsx>{`
                .glass-workbench {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(40px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                }
                .text-glow {
                    text-shadow: 0 0 30px rgba(139, 92, 246, 0.3);
                }
                .mini-card {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .mini-card:hover {
                    background: rgba(255, 255, 255, 0.04);
                    border-color: rgba(139, 92, 246, 0.2);
                    transform: translateY(-5px);
                }
                .animate-spin-slow {
                    animation: spin 6s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .premium-slider {
                    -webkit-appearance: none;
                    width: 100%;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 2px;
                    outline: none;
                }
                .premium-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #3b82f6;
                    cursor: pointer;
                    box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
                    border: 2px solid white;
                    transition: all 0.3s;
                }
                .premium-slider::-webkit-slider-thumb:hover {
                    transform: scale(1.2);
                }
            `}</style>
        </div>
    );
};

export default GradientGenerator;