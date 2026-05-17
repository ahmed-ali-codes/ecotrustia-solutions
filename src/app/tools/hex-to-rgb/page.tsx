'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaExchangeAlt, FaCopy, FaCheck, FaAdjust, FaCode, FaPalette, FaShieldAlt, FaSyncAlt, FaLayerGroup } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';

const HexToRgb: React.FC = () => {
    const [hexColor, setHexColor] = useState<string>('#3b82f6');
    const [rgbColor, setRgbColor] = useState<{ r: number; g: number; b: number }>({ r: 59, g: 130, b: 246 });
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    const hexToRgbLogic = (hex: string): { r: number; g: number; b: number } | null => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        } : null;
    };

    const rgbToHexLogic = (r: number, g: number, b: number): string => {
        const toHex = (c: number) => `0${c.toString(16)}`.slice(-2);
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hex = e.target.value;
        setHexColor(hex);
        const rgb = hexToRgbLogic(hex);
        if (rgb) setRgbColor(rgb);
    };

    const handleRgbChange = (val: string, color: 'r' | 'g' | 'b') => {
        const num = Math.max(0, Math.min(255, parseInt(val) || 0));
        const newRgb = { ...rgbColor, [color]: num };
        setRgbColor(newRgb);
        setHexColor(rgbToHexLogic(newRgb.r, newRgb.g, newRgb.b));
    };

    const copyValue = (key: string, value: string) => {
        navigator.clipboard.writeText(value).then(() => {
            setCopiedKey(key);
            setTimeout(() => setCopiedKey(null), 2000);
        });
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans text-glow-none">
            <title>Color Space Transcoder | Ecotrustia Solutions</title>
            <meta name="description" content="High-precision color space transcoding engine. Convert HEX strings into RGB integer triplets with zero-latency synchronization." />

            {/* ─── Hero Section ─── */}
            <section className="relative pt-40 pb-24 px-[5%] overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(168,85,247,0.15),transparent_70%)] pointer-events-none"></div>
                
                {/* Horizontal Navigation Boundary */}
                <div className="relative z-20 w-full max-w-6xl mx-auto mb-[10px]">
                    <Link href="/tools" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 hover:text-purple-400 transition-all group">
                        <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> Back to Workbench
                    </Link>
                </div>

                {/* Perfectly Centered Content Node */}
                <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-[-0.05em] leading-[0.9] text-white uppercase text-glow">
                        HEX to RGB <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Converter</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Translate high-frequency HEX hashes into logical RGB coordinate triplets for standardized web deployment."
                    </p>
                </div>
            </section>

            {/* ─── Workbench Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-[1400px] w-full mx-auto">
                    
                    <div className="glass-workbench shadow-2xl border border-white/10 overflow-hidden flex flex-col lg:flex-row" style={{ borderRadius: '48px', marginBottom: '40px' }}>
                        
                        {/* HEX Hub (Left 5/12) */}
                        <div className="w-full lg:w-5/12 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col bg-white/[0.01]">
                            <div style={{ padding: 'clamp(40px, 8vw, 80px) clamp(24px, 5vw, 64px) clamp(20px, 4vw, 40px) clamp(24px, 5vw, 64px)' }}>
                                <div className="flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">HEX Protocol Hash</span>
                                </div>
                            </div>
                            
                            <div className="flex-1 flex flex-col gap-8 justify-center" style={{ padding: '0 clamp(24px, 5vw, 64px) clamp(40px, 8vw, 64px) clamp(24px, 5vw, 64px)' }}>
                                {/* HEX Input Row */}
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_60%)] opacity-0 group-focus-within:opacity-100 transition-all pointer-events-none rounded-[32px]"></div>
                                    <div 
                                        className="relative flex items-center gap-2 md:gap-4 bg-[#0c0c0c] border border-white/10 rounded-[32px] group-focus-within:border-purple-500/30 transition-all h-20 md:h-[88px]"
                                        style={{ padding: '0 clamp(16px, 3vw, 32px)' }}
                                    >
                                        <div className="text-purple-400 shrink-0 text-xl"><FaCode /></div>
                                        <input 
                                            type="text" 
                                            value={hexColor}
                                            onChange={handleHexChange}
                                            maxLength={7}
                                            className="w-full bg-transparent text-xl md:text-2xl font-mono font-black text-white outline-none min-w-0"
                                        />
                                        <button 
                                            onClick={() => copyValue('hex', hexColor)}
                                            className={`w-12 h-12 shrink-0 rounded-[20px] flex items-center justify-center transition-all ${copiedKey === 'hex' ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-white/5 text-gray-500 hover:text-purple-400 hover:bg-purple-500/10 border border-white/5'}`}
                                        >
                                            {copiedKey === 'hex' ? <FaCheck /> : <FaCopy />}
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Info Box */}
                                <div className="rounded-[24px] bg-purple-500/5 border border-purple-500/10 flex flex-col gap-2" style={{ padding: 'clamp(16px, 4vw, 24px) clamp(20px, 5vw, 32px)' }}>
                                    <div className="flex items-center gap-4 text-purple-400/60 mb-2">
                                        <FaSyncAlt className="text-xs animate-spin-slow shrink-0" />
                                        <span className="text-[9px] font-black uppercase tracking-widest truncate">Transcoding Active</span>
                                    </div>
                                    <p className="text-[11px] text-gray-400 italic leading-relaxed font-sans">Matrix automatically re-maps decimal triplets as hexadecimal hashes shift.</p>
                                </div>
                            </div>
                        </div>

                        {/* Center Preview (Middle 2/12) */}
                        <div className="w-full lg:w-2/12 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col items-center justify-center py-20 lg:py-0 bg-black/20">
                            <div 
                                className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border border-white/10 shadow-2xl transition-all duration-300 relative group"
                                style={{ backgroundColor: hexColor, boxShadow: `0 0 60px -10px ${hexColor}99` }}
                            >
                                <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20 pointer-events-none"></div>
                            </div>
                            <FaExchangeAlt className="mt-12 text-white/10 text-xl hidden lg:block transition-transform duration-1000 group-hover:rotate-180" />
                        </div>

                        {/* RGB Hub (Right 5/12) */}
                        <div className="w-full lg:w-5/12 flex flex-col">
                            <div style={{ padding: 'clamp(40px, 8vw, 80px) clamp(24px, 5vw, 64px) clamp(20px, 4vw, 40px) clamp(24px, 5vw, 64px)' }} className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <FaLayerGroup className="text-sm text-purple-400 shrink-0" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 truncate">RGB Coordinates</span>
                                </div>
                            </div>
                            
                            <div className="flex-1 flex flex-col gap-8 justify-center" style={{ padding: '0 clamp(24px, 5vw, 64px) clamp(40px, 8vw, 64px) clamp(24px, 5vw, 64px)' }}>
                                {/* RGB Triplet Grid */}
                                <div className="grid grid-cols-3 gap-4">
                                    {(['r', 'g', 'b'] as const).map(color => (
                                        <div key={color} className="relative group">
                                            <div className="absolute inset-0 bg-purple-500/5 rounded-[24px] blur opacity-0 group-focus-within:opacity-100 transition-all pointer-events-none"></div>
                                            <div 
                                                className="relative bg-[#0c0c0c] border border-white/10 rounded-[24px] flex flex-col gap-2 md:gap-3 items-center justify-center group-focus-within:border-purple-500/30 transition-all overflow-hidden"
                                                style={{ padding: 'clamp(16px, 4vw, 24px) clamp(8px, 2vw, 16px)' }}
                                            >
                                                <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">{color === 'r' ? 'Red' : color === 'g' ? 'Green' : 'Blue'}</span>
                                                <input 
                                                    type="text" 
                                                    value={rgbColor[color]}
                                                    onChange={(e) => handleRgbChange(e.target.value.replace(/[^0-9]/g, ''), color)}
                                                    maxLength={3}
                                                    className="w-full bg-transparent text-center font-mono font-black text-2xl md:text-3xl text-white outline-none min-w-0"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Export Action Button */}
                                <button 
                                    onClick={() => copyValue('rgb', `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`)}
                                    className="w-full h-20 md:h-[88px] rounded-[32px] bg-white text-black hover:bg-purple-500 hover:text-white shadow-xl hover:shadow-[0_20px_40px_-10px_rgba(168,85,247,0.4)] font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all px-8 overflow-hidden group"
                                >
                                    <FaCopy className="shrink-0 text-sm group-hover:scale-110 transition-transform" />
                                    <span className="truncate">{copiedKey === 'rgb' ? 'Triplet Copied' : 'Export RGB Triplet'}</span>
                                </button>
                            </div>
                        </div>

                    </div>

                    <div className="h-[120px]"></div>

                    {/* Pro Capability Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '200px' }}>
                        <div className="mini-card group flex flex-col gap-6" style={{ borderRadius: '32px', padding: '48px 40px 48px 48px' }}>
                            <FaLayerGroup className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">Dual Logic Core</h5>
                            <p className="text-[11px] text-gray-400 leading-relaxed italic font-sans">Switch seamlessly between base-16 and decimal base-10 coordinate systems.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-6" style={{ borderRadius: '32px', padding: '48px 40px 48px 48px' }}>
                            <FaPalette className="block text-indigo-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">Visual Sync</h5>
                            <p className="text-[11px] text-gray-400 leading-relaxed italic font-sans">Real-time spectral preview bubble provides immediate perceptual confirmation.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-6" style={{ borderRadius: '32px', padding: '48px 40px 48px 48px' }}>
                            <FaAdjust className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">Validation Hash</h5>
                            <p className="text-[11px] text-gray-400 leading-relaxed italic font-sans">Integrated regex validation ensures input integrity for all color protocol hashes.</p>
                        </div>
                    </div>

                    {/* Intelligence Section */}
                    <div className="about-workbench-section text-center" style={{ marginBottom: '120px' }}>
                        <h2 className="text-3xl font-black tracking-tight text-white font-sans text-center uppercase tracking-widest text-glow" style={{ marginBottom: '20px' }}>Transcoding Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans max-w-4xl mx-auto text-gray-500 border-t border-white/5 pt-12 text-left">
                            <div className="faq-item border-l border-white/10 pl-12">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest leading-loose mt-[2px] text-glow">HEX vs RGB Architecture?</h5>
                                <p className="text-sm leading-relaxed">HEX is a hexadecimal representation of color, compact and common in web development. RGB uses three separate channels (Red, Green, Blue) each with 256 levels of intensity, offering a more logical model for programatic color manipulation.</p>
                            </div>
                            <div className="faq-item border-l border-white/10 pl-12">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest leading-loose mt-[2px] text-glow">Support for 3-digit HEX?</h5>
                                <p className="text-sm leading-relaxed">The Transcoder protocol natively supports 6-digit hashes for maximum precision. For 3-digit inputs (#fff), it's recommended to expand to full 6-digit form (#ffffff) to ensure 24-bit color fidelity during transcoding.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/hex-to-rgb" />
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
                    text-shadow: 0 0 30px rgba(168, 85, 247, 0.3);
                }
                .mini-card {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .mini-card:hover {
                    background: rgba(255, 255, 255, 0.04);
                    border-color: rgba(168, 85, 247, 0.2);
                    transform: translateY(-5px);
                }
                .animate-spin-slow {
                    animation: spin 6s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default HexToRgb;