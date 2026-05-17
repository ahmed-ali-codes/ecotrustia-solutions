'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaEyeDropper, FaCopy, FaCheck, FaPalette, FaAdjust, FaDatabase, FaSyncAlt } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';

const ColorPicker: React.FC = () => {
    const [isPicking, setIsPicking] = useState(false);
    const [currentColor, setCurrentColor] = useState({
        hex: '#a855f7',
        rgb: 'rgb(168, 85, 247)',
        hsl: 'hsl(271, 91%, 65%)',
    });
    const [copiedKey, setCopiedKey] = useState<string | null>(null);
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pickerAreaRef = useRef<HTMLDivElement>(null);

    const rgbToHsl = (r: number, g: number, b: number) => {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, s, l = (max + min) / 2;
        if (max === min) { h = s = 0; } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
    };

    const updateColorDisplay = (r: number, g: number, b: number) => {
        const toHex = (c: number) => {
            const hex = c.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
        const hsl = rgbToHsl(r, g, b);
        setCurrentColor({
            hex,
            rgb: `rgb(${r}, ${g}, ${b})`,
            hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
        });
    };

    const drawSpectrum = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;

        // Create Spectrum
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, '#ff0000');
        gradient.addColorStop(0.17, '#ffff00');
        gradient.addColorStop(0.33, '#00ff00');
        gradient.addColorStop(0.5, '#00ffff');
        gradient.addColorStop(0.67, '#0000ff');
        gradient.addColorStop(0.83, '#ff00ff');
        gradient.addColorStop(1, '#ff0000');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Create Saturation/Brightness overlay
        const whiteGradient = ctx.createLinearGradient(0, 0, 0, height);
        whiteGradient.addColorStop(0, 'rgba(255,255,255,1)');
        whiteGradient.addColorStop(0.2, 'rgba(255,255,255,0)');
        whiteGradient.addColorStop(0.8, 'rgba(0,0,0,0)');
        whiteGradient.addColorStop(1, 'rgba(0,0,0,1)');
        ctx.fillStyle = whiteGradient;
        ctx.fillRect(0, 0, width, height);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas && pickerAreaRef.current) {
            canvas.width = pickerAreaRef.current.offsetWidth;
            canvas.height = 400;
            drawSpectrum();
        }
        
        const handleResize = () => {
            if (canvas && pickerAreaRef.current) {
                canvas.width = pickerAreaRef.current.offsetWidth;
                drawSpectrum();
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePointer = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isPicking && e.type === 'mousemove') return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        
        let x, y;
        if ('touches' in e) {
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        } else {
            x = (e as React.MouseEvent).clientX - rect.left;
            y = (e as React.MouseEvent).clientY - rect.top;
        }

        const ctx = canvas.getContext('2d');
        if (ctx) {
            const pixel = ctx.getImageData(Math.max(0, Math.min(x, canvas.width - 1)), Math.max(0, Math.min(y, canvas.height - 1)), 1, 1).data;
            updateColorDisplay(pixel[0], pixel[1], pixel[2]);
        }
    };

    const copyValue = (key: string, value: string) => {
        navigator.clipboard.writeText(value).then(() => {
            setCopiedKey(key);
            setTimeout(() => setCopiedKey(null), 2000);
        });
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans text-glow-none">
            <title>Chromatic Spectrum Engine | Ecotrustia Solutions</title>
            <meta name="description" content="Professional color extraction and spectrum analysis engine. Sample visual markers and synthesize HEX, RGB, and HSL color data." />

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
                        Color <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Picker</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Extract frequency-specific color data from the visual spectrum with pixel-perfect precision."
                    </p>
                </div>
            </section>

            {/* ─── Workbench Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-[1400px] w-full mx-auto">
                    
                    <div className="glass-workbench shadow-2xl border border-white/10 overflow-hidden flex flex-col lg:flex-row" style={{ borderRadius: '48px', marginBottom: '40px' }}>
                        
                        {/* Spectrum Area (Left 7) */}
                        <div className="w-full lg:w-7/12 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col bg-white/[0.01]">
                            <div style={{ padding: '80px 64px 40px 64px' }}>
                                <div className="flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Spectral Core</span>
                                </div>
                            </div>
                            
                            <div className="flex-1 flex flex-col gap-8" style={{ padding: '0 64px 64px 64px' }}>
                                <div 
                                    ref={pickerAreaRef}
                                    className="relative rounded-[32px] overflow-hidden border border-white/10 h-[400px] cursor-crosshair group shadow-[0_0_50px_rgba(168,85,247,0.1)]"
                                    onMouseDown={() => setIsPicking(true)}
                                    onMouseUp={() => setIsPicking(false)}
                                    onMouseLeave={() => setIsPicking(false)}
                                    onMouseMove={handlePointer}
                                    onClick={handlePointer}
                                    onTouchStart={() => setIsPicking(true)}
                                    onTouchEnd={() => setIsPicking(false)}
                                    onTouchMove={handlePointer}
                                >
                                    <canvas ref={canvasRef} className="w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-90" />
                                    <div className="absolute top-6 left-6 px-5 py-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-widest text-purple-400">Analysis Matrix</div>
                                </div>
                                
                                <div className="flex items-center gap-4 p-6 rounded-[24px] bg-purple-500/5 border border-purple-500/10">
                                    <FaSyncAlt className="text-purple-400/60 text-xs animate-spin-slow" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 italic">Live Chromatic Sync Active</span>
                                </div>
                            </div>
                        </div>

                        {/* Data Area (Right 5) */}
                        <div className="w-full lg:w-5/12 flex flex-col">
                            <div style={{ padding: '80px 64px 40px 64px' }} className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <FaDatabase className="text-sm text-purple-400" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Matrix Outputs</span>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col gap-10 justify-center" style={{ padding: '0 64px 64px 64px' }}>
                                
                                <div className="flex flex-col items-center gap-8 mb-2">
                                    <div 
                                        className="w-32 h-32 rounded-[32px] border-4 border-white/10 shadow-2xl transition-all duration-300" 
                                        style={{ backgroundColor: currentColor.hex, boxShadow: `0 20px 40px -10px ${currentColor.hex}66` }}
                                    />
                                    <div className="text-center">
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 block mb-3">Subject Hash</span>
                                        <h3 className="text-4xl font-black font-mono tracking-tighter text-white uppercase">{currentColor.hex}</h3>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        { id: 'hex', label: 'Hex Code', val: currentColor.hex },
                                        { id: 'rgb', label: 'RGB Matrix', val: currentColor.rgb },
                                        { id: 'hsl', label: 'HSL Cylinder', val: currentColor.hsl }
                                    ].map(opt => (
                                        <button 
                                            key={opt.id}
                                            onClick={() => copyValue(opt.id, opt.val)}
                                            className="rounded-[28px] bg-white/5 border border-white/5 hover:border-purple-500/30 group flex items-center justify-between transition-all"
                                            style={{ padding: '24px 24px 24px 32px' }}
                                        >
                                            <div className="flex flex-col text-left">
                                                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">{opt.label}</span>
                                                <span className="text-sm md:text-base font-mono font-black uppercase tracking-widest group-hover:text-purple-400 transition-colors">{opt.val}</span>
                                            </div>
                                            <div className={`w-14 h-14 rounded-[20px] flex shrink-0 items-center justify-center transition-all ${copiedKey === opt.id ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-[#0c0c0c] border border-white/5 text-gray-500 group-hover:text-purple-400 group-hover:bg-purple-500/10'}`}>
                                                {copiedKey === opt.id ? <FaCheck className="text-[12px]" /> : <FaCopy className="text-[12px]" />}
                                            </div>
                                        </button>
                                    ))}
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className="h-[120px]"></div>

                    {/* Pro Capability Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '200px' }}>
                        <div className="mini-card group flex flex-col gap-6" style={{ borderRadius: '32px', padding: '48px 40px 48px 48px' }}>
                            <FaEyeDropper className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">Pixel Precision</h5>
                            <p className="text-[11px] text-gray-400 leading-relaxed italic font-sans">Sample specific color markers from the spectral array with sub-pixel arithmetic.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-6" style={{ borderRadius: '32px', padding: '48px 40px 48px 48px' }}>
                            <FaPalette className="block text-indigo-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">Dynamic Formats</h5>
                            <p className="text-[11px] text-gray-400 leading-relaxed italic font-sans">Immediate synthesis of subject data into HEX, RGB, and HSL architectural models.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-6" style={{ borderRadius: '32px', padding: '48px 40px 48px 48px' }}>
                            <FaAdjust className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">Luminance Sync</h5>
                            <p className="text-[11px] text-gray-400 leading-relaxed italic font-sans">Automatically calculates luminance and saturation values across the spectral core.</p>
                        </div>
                    </div>

                    {/* Intelligence Section */}
                    <div className="about-workbench-section text-center" style={{ marginBottom: '120px' }}>
                        <h2 className="text-3xl font-black tracking-tight text-white font-sans text-center uppercase tracking-widest text-glow" style={{ marginBottom: '20px' }}>Chromatic Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans max-w-4xl mx-auto text-gray-500 border-t border-white/5 pt-12 text-left">
                            <div className="faq-item border-l border-white/10 pl-12">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest leading-loose mt-[2px] text-glow">What is HSL Cylinder?</h5>
                                <p className="text-sm leading-relaxed">Unlike the 8-bit RGB model, HSL (Hue, Saturation, Lightness) describes color as it relates to human perception. This makes it ideal for creating accessible UI themes and dynamic color variables.</p>
                            </div>
                            <div className="faq-item border-l border-white/10 pl-12">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest leading-loose mt-[2px] text-glow">Is the conversion accurate?</h5>
                                <p className="text-sm leading-relaxed">Yes. The engine uses high-precision floating-point arithmetic to map spectral coordinates into hexadecimal hashes, ensuring 100% fidelity between the pick and the output.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/color-picker" />
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

export default ColorPicker;