'use client';

import React from 'react';
import Link from 'next/link';
import { FaRoute, FaArrowRight, FaSyncAlt, FaShieldAlt, FaCalculator, FaExchangeAlt, FaUndo, FaRoad, FaMapMarkedAlt } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';
import { useMilesToKilometerConverter } from './useMilesToKilometerConverter';

const ConvertMilesToKilometer: React.FC = () => {
    const {
        miles,
        kilometers,
        handleMilesChange,
        handleKilometersChange,
        resetFields,
        switchUnits,
    } = useMilesToKilometerConverter();

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30 font-sans">
            <title>Inter-Geospatial Delta Transposer | Ecotrustia Solutions</title>
            <meta name="description" content="Professional distance transposition engine. Convert miles to kilometers with architectural-grade mapping and zero-latency synthesis." />

            {/* ─── Hero Section ─── */}
            <section className="relative pt-40 pb-24 px-[5%] overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(16,185,129,0.1),transparent_70%)] pointer-events-none"></div>
                
                {/* Horizontal Navigation Boundary */}
                <div className="relative z-20 w-full max-w-6xl mx-auto mb-[10px]">
                    <Link href="/tools" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 hover:text-emerald-400 transition-all group">
                        <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> Back to Workbench
                    </Link>
                </div>

                {/* Perfectly Centered Content Node */}
                <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-[-0.05em] leading-[0.9] text-white uppercase text-glow">
                        Geospatial <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Delta</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Transpose linear distance coordinates across international geospatial standards."
                    </p>
                </div>
            </section>

            {/* ─── Workbench Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-4xl w-full mx-auto">
                    
                    <div className="glass-workbench shadow-2xl relative" style={{ padding: 'clamp(24px, 5vw, 48px)', marginBottom: '120px' }}>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            
                            {/* Miles Node (Left 5) */}
                            <div className="lg:col-span-5 space-y-6">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-600 ml-4">Imperial Buffer (Miles)</label>
                                    <FaRoad className="text-emerald-500/20 text-xs" />
                                </div>
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-emerald-600/5 rounded-[32px] blur opacity-0 group-focus-within:opacity-20 transition-all"></div>
                                    <div className="relative bg-[#0c0c0c] border border-white/10 rounded-[32px] p-8 flex flex-col items-center">
                                        <input 
                                            type="text" 
                                            value={miles}
                                            onChange={handleMilesChange}
                                            className="w-full bg-transparent text-center font-black text-5xl md:text-7xl text-emerald-400 outline-none"
                                            placeholder="0.0"
                                        />
                                        <span className="mt-4 text-[10px] font-black uppercase tracking-widest text-gray-700">mi coordinate</span>
                                    </div>
                                </div>
                            </div>

                            {/* Switch Node (Center 2) */}
                            <div className="lg:col-span-2 flex flex-col items-center justify-center gap-6">
                                <button 
                                    onClick={switchUnits}
                                    className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all active:scale-90 shadow-xl group"
                                >
                                    <FaExchangeAlt className="text-lg group-hover:rotate-180 transition-transform duration-500" />
                                </button>
                                <div className="h-20 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block"></div>
                            </div>

                            {/* Kilometers Node (Right 5) */}
                            <div className="lg:col-span-5 space-y-6">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-600 ml-4">SI Buffer (Kilometers)</label>
                                    <FaMapMarkedAlt className="text-cyan-500/20 text-xs" />
                                </div>
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-cyan-600/5 rounded-[32px] blur opacity-0 group-focus-within:opacity-20 transition-all"></div>
                                    <div className="relative bg-[#0c0c0c] border border-white/10 rounded-[32px] p-8 flex flex-col items-center">
                                        <input 
                                            type="text" 
                                            value={kilometers}
                                            onChange={handleKilometersChange}
                                            className="w-full bg-transparent text-center font-black text-5xl md:text-7xl text-cyan-400 outline-none"
                                            placeholder="0.0"
                                        />
                                        <span className="mt-4 text-[10px] font-black uppercase tracking-widest text-gray-700">km coordinate</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-6">
                                <button 
                                    onClick={resetFields}
                                    className="px-8 py-4 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all flex items-center gap-3"
                                >
                                    <FaUndo /> Flush Buffer
                                </button>
                                <div className="p-4 px-6 rounded-2xl bg-white/[0.01] border border-white/5 backdrop-filter blur-sm">
                                    <code className="text-[10px] font-mono font-bold text-emerald-500/60">Logic Basis: 1mi = 1.609344km</code>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4 text-emerald-400/40">
                                <FaSyncAlt className="text-[10px] animate-spin-slow" />
                                <span className="text-[9px] font-black uppercase tracking-[0.2em]">Live Delta Resonance Active</span>
                            </div>
                        </div>
                    </div>

                    {/* Infrastructure Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '120px' }}>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaRoute className="block text-emerald-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Path Finding</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Map operational paths across international borders with precise distance transpositions.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaCalculator className="block text-cyan-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Constant Logic</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Utilizes architectural-grade constants for zero-latency bidirectional distance mapping.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaRoad className="block text-emerald-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Logistics Grid</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Synchronize supply chain vectors across diverse regional measurement standards.</p>
                        </div>
                    </div>

                    {/* Delta Intelligence */}
                    <div className="about-workbench-section text-center" style={{ marginBottom: '120px' }}>
                        <h2 className="text-3xl font-black tracking-tight text-white font-sans text-center uppercase tracking-widest text-glow" style={{ marginBottom: '20px' }}>Delta Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans max-w-4xl mx-auto text-gray-500">
                            <div className="faq-item border-l border-white/5 pl-8">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest">Imperial vs Metric Origin?</h5>
                                <p className="text-sm leading-relaxed">The Transposer bridges the gap between the Imperial system (Miles) and the International System of Units (Kilometers). While the US and UK primarily use Miles for distance, the majority of the global grid operates on Kilometer nodes.</p>
                            </div>
                            <div className="faq-item border-l border-white/5 pl-8">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest">Precision Calibration?</h5>
                                <p className="text-sm leading-relaxed">Transpositions are performed at 14-decimal precision before being mapped to the display buffer. This ensures accuracy for high-fidelity geospatial planning and logistics operations.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/convert_miles_to_kilometer" />
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
                    text-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
                }
                .mini-card {
                    display: flex;
                    flex-direction: column;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 50px 44px;
                    border-radius: 20px;
                    transition: all 0.3s;
                }
                .mini-card:hover {
                    background: rgba(255, 255, 255, 0.04);
                    border-color: rgba(16, 185, 129, 0.2);
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

export default ConvertMilesToKilometer;