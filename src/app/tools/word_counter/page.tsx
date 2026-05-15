'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { FaFont, FaAlignLeft, FaParagraph, FaClock, FaRedo, FaCopy, FaCheck, FaRulerCombined, FaMicroscope, FaBrain } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';

const WordCounter: React.FC = () => {
    const [text, setText] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);

    const stats = useMemo(() => {
        const words = text.trim().split(/\s+/).filter(Boolean);
        const characters = text.length;
        const charactersNoSpaces = text.replace(/\s+/g, "").length;
        const sentences = text.split(/[.!?]+/).filter(Boolean).length;
        const paragraphs = text.split(/\n+/).filter(Boolean).length;
        const readingTime = Math.ceil(words.length / 200);
        const speakingTime = Math.ceil(words.length / 130);

        return {
            words: words.length,
            characters,
            charactersNoSpaces,
            sentences,
            paragraphs,
            readingTime,
            speakingTime,
        };
    }, [text]);

    const handleClear = () => setText('');
    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
            <title>Linguistic Core Protocol | Ecotrustia Solutions</title>
            <meta name="description" content="High-precision linguistic analysis for textual data streams. Real-time calculation of word density, character frequency, and reading velocity." />

            {/* ─── Hero Section ─── */}
            <section className="relative pt-40 pb-24 px-[5%] overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(168,85,247,0.1),transparent_70%)] pointer-events-none"></div>
                
                {/* Horizontal Navigation Boundary */}
                <div className="relative z-20 w-full max-w-6xl mx-auto mb-[10px]">
                    <Link href="/tools" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 hover:text-purple-400 transition-all group">
                        <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> Back to Workbench
                    </Link>
                </div>

                {/* Perfectly Centered Content Node */}
                <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-[-0.05em] leading-[0.9] text-white uppercase">
                        Linguistic <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 text-glow">Core</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Analyze structural complexity and information density within textual data streams."
                    </p>
                </div>
            </section>

            {/* ─── Workbench Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-[1400px] w-full mx-auto">
                    
                    <div className="glass-workbench shadow-2xl border border-white/10" style={{ borderRadius: '48px', marginBottom: '40px' }}>
                        <div className="flex flex-col">
                            
                            {/* Editor Area (Top) */}
                            <div className="border-b border-white/5">
                                <div style={{ padding: '80px 64px 40px 64px' }}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Linguistic Input Stream</span>
                                    </div>
                                </div>
                                
                                <div style={{ padding: '0 64px 64px 64px' }}>
                                    <div className="relative group h-[450px] bg-[#0c0c0c] rounded-[32px] border border-white/5 overflow-hidden" style={{ padding: '48px' }}>
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(147,51,234,0.05),transparent_40%)] pointer-events-none"></div>
                                        <textarea 
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            placeholder="Inject text stream for linguistic analysis..."
                                            className="w-full h-full bg-transparent border-none text-base md:text-lg leading-relaxed font-medium text-gray-200 outline-none focus:ring-0 transition-all resize-none scroll-thin"
                                            style={{ padding: '0 !important' }}
                                        />
                                        <div className="absolute bottom-10 right-10 flex gap-4">
                                            <button onClick={handleClear} className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/20 text-gray-500 hover:text-red-400 transition-all backdrop-blur-md">
                                                <FaRedo className="text-sm" />
                                            </button>
                                            <button 
                                                onClick={handleCopy} 
                                                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all backdrop-blur-md ${copySuccess ? 'bg-green-500 text-white' : 'bg-purple-600 text-white shadow-xl shadow-purple-500/20 hover:scale-105'}`}
                                            >
                                                {copySuccess ? <FaCheck className="text-lg" /> : <FaCopy className="text-lg" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Analytics Area (Bottom) */}
                            <div className="bg-white/[0.005]">
                                <div style={{ padding: '40px 64px 20px 64px' }}>
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Real-time Metrics</span>
                                </div>
                                
                                <div style={{ padding: '0 64px 64px 64px' }}>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                                        <div className="metric-panel group">
                                            <span className="label">Words</span>
                                            <span className="value text-3xl">{stats.words.toLocaleString()}</span>
                                            <div className="progress-bg"><div className="progress-bar purple" style={{ width: `${Math.min(100, stats.words / 10)}%` }}></div></div>
                                        </div>

                                        <div className="metric-panel">
                                            <span className="label">Chars</span>
                                            <span className="value text-3xl">{stats.characters.toLocaleString()}</span>
                                        </div>

                                        <div className="metric-panel">
                                            <span className="label">Pure Text</span>
                                            <span className="value text-3xl">{stats.charactersNoSpaces.toLocaleString()}</span>
                                        </div>

                                        <div className="metric-panel">
                                            <span className="label">Reading</span>
                                            <div className="flex items-baseline gap-1">
                                                <span className="value text-3xl">{stats.readingTime}</span>
                                                <span className="text-[8px] uppercase font-black text-gray-600 tracking-widest">m</span>
                                            </div>
                                        </div>

                                        <div className="metric-panel">
                                            <span className="label">Speaking</span>
                                            <div className="flex items-baseline gap-1">
                                                <span className="value text-3xl text-purple-400">{stats.speakingTime}</span>
                                                <span className="text-[8px] uppercase font-black text-purple-900 tracking-widest">m</span>
                                            </div>
                                        </div>

                                        <div className="metric-panel">
                                            <span className="label">Sentences</span>
                                            <span className="value text-3xl text-blue-400">{stats.sentences}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-[120px]"></div>

                    {/* Infrastructure Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '200px' }}>
                        <div className="mini-card group flex flex-col gap-6" style={{ borderRadius: '32px' }}>
                            <FaMicroscope className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">Granular Stats</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Detailed breakdown including character density with and without spatial buffers.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-6" style={{ borderRadius: '32px' }}>
                            <FaClock className="block text-blue-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">Velocity metrics</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Calculates both mental reading velocity and verbal speaking projections.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-6" style={{ borderRadius: '32px' }}>
                            <FaParagraph className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">Structure view</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Identifies logical paragraph breaks and structural sentence architectures.</p>
                        </div>
                    </div>

                    {/* Protocol Intelligence Section */}
                    <div className="about-workbench-section text-center" style={{ marginBottom: '120px' }}>
                        <h2 className="text-3xl font-black tracking-tight text-white font-sans text-center uppercase tracking-widest text-glow" style={{ marginBottom: '20px' }}>Linguistic Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans max-w-4xl mx-auto text-gray-500 border-t border-white/5 pt-12">
                            <div className="faq-item border-l border-white/10 pl-12 text-left">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest leading-loose mt-[2px] text-glow">How is reading time calculated?</h5>
                                <p className="text-sm leading-relaxed">The Core Protocol assumes an average mental reading velocity of <strong>200 words per minute</strong>. For speaking time, we calibrate the velocity to 130 words per minute, ideal for presentations or audio streams.</p>
                            </div>
                            <div className="faq-item border-l border-white/10 pl-12 text-left">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest leading-loose mt-[2px] text-glow">Does it count whitespace?</h5>
                                <p className="text-sm leading-relaxed">The protocol provides two separate metrics for character count: Absolute (including spaces) and Logical (excluding whitespace), allowing for precise content length verification according to specific criteria.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/word_counter" />
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
                    text-shadow: 0 0 30px rgba(147, 51, 234, 0.3);
                }
                .metric-panel {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 32px;
                    border-radius: 32px;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .metric-panel:hover {
                    background: rgba(255, 255, 255, 0.04);
                    border-color: rgba(147, 51, 234, 0.2);
                    transform: translateY(-2px);
                }
                .metric-panel .label {
                    text-transform: uppercase;
                    font-size: 9px;
                    font-weight: 900;
                    letter-spacing: 0.3em;
                    color: rgba(255, 255, 255, 0.3);
                }
                .metric-panel .value {
                    font-size: 42px;
                    font-weight: 900;
                    line-height: 1;
                    letter-spacing: -0.02em;
                    color: #fff;
                }
                .metric-panel .desc {
                    font-size: 10px;
                    font-weight: 600;
                    color: rgba(255, 255, 255, 0.2);
                    line-height: 1.6;
                }
                .progress-bg {
                    width: 100%;
                    height: 2px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 2px;
                    margin-top: 12px;
                }
                .progress-bar {
                    height: 100%;
                    border-radius: 2px;
                    transition: width 1.5s cubic-bezier(0.23, 1, 0.32, 1);
                }
                .progress-bar.purple {
                    background: #a855f7;
                    box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
                }
                .mini-card {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    padding: 40px;
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .mini-card:hover {
                    background: rgba(255, 255, 255, 0.04);
                    border-color: rgba(168, 85, 247, 0.2);
                    transform: translateY(-5px);
                }
                .scroll-thin::-webkit-scrollbar {
                    width: 4px;
                }
                .scroll-thin::-webkit-scrollbar-track {
                    background: transparent;
                }
                .scroll-thin::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
};

export default WordCounter;