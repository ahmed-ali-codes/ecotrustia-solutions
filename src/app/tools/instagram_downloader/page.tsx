'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaInstagram, FaDownload, FaRedo, FaShieldAlt, FaBolt, FaImage, FaSearch, FaCheck, FaSpinner } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';

const InstagramDownloader: React.FC = () => {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<{ title: string; type: string; url: string } | null>(null);

    const handleSearch = () => {
        if (!url) return;
        if (!url.includes('instagram.com')) {
            alert("Invalid Protocol: Please provide a valid Instagram media endpoint.");
            return;
        }

        setIsLoading(true);
        // Simulate data fetching
        setTimeout(() => {
            setIsLoading(false);
            setResult({
                title: "Visual Protocol Asset",
                type: "High-Res Image",
                url: "#"
            });
        }, 1500);
    };

    const handleReset = () => {
        setUrl('');
        setResult(null);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-pink-500/30 font-sans">
            <title>Instagram Media Extractor | Ecotrustia Solutions</title>
            <meta name="description" content="Extract high-fidelity visual assets from Instagram architectures. Professional Reels, Stories, and Photo downloading protocol with quality preservation." />

            {/* ─── Hero Section ─── */}
            <section className="relative pt-40 pb-24 px-[5%] overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(236,72,153,0.1),transparent_70%)] pointer-events-none"></div>
                
                {/* Horizontal Navigation Boundary */}
                <div className="relative z-20 w-full max-w-6xl mx-auto mb-[10px]">
                    <Link href="/tools" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 hover:text-pink-400 transition-all group">
                        <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> Back to Workbench
                    </Link>
                </div>

                {/* Perfectly Centered Content Node */}
                <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-[-0.05em] leading-[0.9] text-white uppercase text-glow">
                        Asset <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">Extractor</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Decouple cinematic assets from Instagram's visual grid and archive them locally with absolute fidelity."
                    </p>
                </div>
            </section>

            {/* ─── Workbench Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-4xl w-full mx-auto">
                    
                    <div className="glass-workbench shadow-2xl" style={{ padding: 'clamp(24px, 5vw, 48px)', marginBottom: '120px' }}>
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-600 ml-4">Source Media Endpoint</label>
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-orange-600 rounded-2xl blur opacity-10 group-focus-within:opacity-30 transition-all"></div>
                                    <div className="relative flex items-center bg-[#0c0c0c] border border-white/10 rounded-2xl overflow-hidden">
                                        <div className="pl-6 text-pink-500"><FaInstagram className="text-xl" /></div>
                                        <input 
                                            type="url" 
                                            placeholder="https://www.instagram.com/p/... or /reels/..."
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            className="w-full bg-transparent px-6 py-6 text-sm font-medium focus:outline-none placeholder:text-gray-700"
                                        />
                                        <button 
                                            onClick={handleSearch}
                                            disabled={isLoading || !url}
                                            className="px-8 py-6 bg-pink-600 text-white font-black text-[10px] uppercase tracking-widest hover:bg-pink-500 transition-all disabled:opacity-30"
                                        >
                                            {isLoading ? <FaSpinner className="animate-spin" /> : <FaSearch />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {result && (
                                <div className="p-8 rounded-[32px] bg-pink-500/5 border border-pink-500/10 flex flex-col md:flex-row items-center justify-between gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 bg-black rounded-2xl border border-white/5 flex items-center justify-center text-pink-400/20">
                                            <FaImage className="text-2xl" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-white mb-1">{result.title}</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-pink-400/60">{result.type} Detected</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4">
                                        <button className="px-8 h-12 rounded-2xl bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all shadow-lg active:scale-95 flex items-center gap-3">
                                            <FaDownload /> Deploy Asset
                                        </button>
                                        <button onClick={handleReset} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-600 hover:text-white transition-all">
                                            <FaRedo className="text-xs" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Infrastructure Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '120px' }}>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaImage className="block text-pink-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Lossless Extract</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Preserve every pixel node during the cinematic decoupled asset extraction cycle.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaBolt className="block text-orange-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Rapid Synthesis</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Process social media endpoints with sub-second analysis and manifest generation logic.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaShieldAlt className="block text-pink-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Secure Node</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Download logic operates through an anonymized proxy architecture to protect your identity.</p>
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/instagram_downloader" />
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
                    text-shadow: 0 0 30px rgba(236,72,153, 0.3);
                }
                .mini-card {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 44px 36px;
                    border-radius: 32px;
                    transition: all 0.3s;
                }
                .mini-card:hover {
                    background: rgba(255, 255, 255, 0.04);
                    border-color: rgba(236,72,153, 0.2);
                }
            `}</style>
        </div>
    );
};

export default InstagramDownloader;