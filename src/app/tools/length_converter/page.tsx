'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaRuler, FaRoute, FaTape, FaCompass, FaCheck, FaShieldAlt, FaSyncAlt, FaLayerGroup } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';

const LengthConverter: React.FC = () => {
    const [inputValue, setInputValue] = useState('1');
    const [sourceUnit, setSourceUnit] = useState('meters');
    const [results, setResults] = useState<Record<string, number>>({});

    const units = [
        { id: 'meters', label: 'Meters', sym: 'm', toM: 1 },
        { id: 'feet', label: 'Feet', sym: 'ft', toM: 0.3048 },
        { id: 'inches', label: 'Inches', sym: 'in', toM: 0.0254 },
        { id: 'centimeters', label: 'Centimeters', sym: 'cm', toM: 0.01 },
        { id: 'yards', label: 'Yards', sym: 'yd', toM: 0.9144 },
        { id: 'kilometers', label: 'Kilometers', sym: 'km', toM: 1000 }
    ];

    const convert = () => {
        const val = parseFloat(inputValue);
        if (isNaN(val)) return;

        const currentUnit = units.find(u => u.id === sourceUnit);
        if (!currentUnit) return;

        const baseInMeters = val * currentUnit.toM;
        const newResults: Record<string, number> = {};

        units.forEach(u => {
            newResults[u.id] = baseInMeters / u.toM;
        });

        setResults(newResults);
    };

    useEffect(() => {
        convert();
    }, [inputValue, sourceUnit]);

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
            <title>Dimensional Matrix Protocol | Ecotrustia Solutions</title>
            <meta name="description" content="Professional dimensional unit conversion engine. Transpose length metrics between meters, feet, inches, and kilometers with high-fidelity mapping." />

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
                        Dimensional <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Matrix</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Transpose length coordinates across multi-standard dimensional grids with zero-latency mapping."
                    </p>
                </div>
            </section>

            {/* ─── Workbench Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-[1400px] w-full mx-auto">

                    <div className="glass-workbench shadow-2xl border border-white/[0.08] overflow-hidden" style={{ borderRadius: '32px', marginBottom: '80px' }}>
                        <div className="grid grid-cols-1 lg:grid-cols-12">

                            {/* Control Node (Left 7) */}
                            <div className="lg:col-span-7 flex flex-col border-b lg:border-b-0 lg:border-r border-white/[0.06]" style={{ padding: 'clamp(24px, 6vw, 64px) clamp(24px, 5vw, 56px)' }}>
                                <div className="flex flex-col flex-1 justify-center gap-16">
                                    <div className="space-y-8">
                                        <label className="text-[10px] uppercase font-black tracking-[0.4em] text-purple-400/60 ml-2">Source Induction Node</label>
                                        <div className="flex items-center gap-4 bg-[#0a0a0a] border border-white/10 rounded-[28px] transition-all focus-within:border-purple-500/50 shadow-inner" style={{ paddingLeft: '32px', paddingRight: '12px' }}>
                                            <input
                                                type="number"
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                className="flex-1 bg-transparent border-none outline-none py-8 text-4xl font-black text-purple-400 min-w-0"
                                                placeholder="1.0"
                                            />
                                            <select
                                                value={sourceUnit}
                                                onChange={(e) => setSourceUnit(e.target.value)}
                                                className="bg-white/5 border border-white/10 rounded-2xl py-3 px-6 text-[10px] font-black uppercase tracking-widest text-gray-300 outline-none cursor-pointer hover:bg-white/10 transition-all shrink-0"
                                            >
                                                {units.map(u => <option key={u.id} value={u.id} className="bg-[#0c0c0c]">{u.label}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="p-10 rounded-[40px] bg-white/[0.01] border border-white/5 flex flex-col gap-6 relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="relative z-10 flex items-center gap-4 text-purple-400">
                                            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                                <FaSyncAlt className="text-[10px] animate-spin-slow" />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Live Coordinate Mapping Active</span>
                                        </div>
                                        <p
                                            className="relative z-10 text-[14px] text-gray-500 italic leading-relaxed max-w-xl"
                                            style={{ paddingLeft: '14px' }}
                                        >
                                            "Engine utilizes a meter-baseline unified protocol for absolute dimensional fidelity across all nodes."
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Output Node (Right 5) */}
                            <div className="lg:col-span-5 flex flex-col" style={{ padding: 'clamp(24px, 4vw, 48px) clamp(16px, 3vw, 32px)' }}>
                                <div className="grid grid-cols-2 gap-4 h-full">
                                    {units.map(u => (
                                        <div key={u.id} className={`p-8 rounded-[32px] bg-[#0c0c0c] border border-white/10 flex flex-col items-center justify-center text-center transition-all duration-700 relative group overflow-hidden ${u.id === sourceUnit ? 'border-purple-500/40 bg-[#0e0e0e]' : 'hover:border-purple-500/30'}`}>
                                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-gray-500 mb-4 group-hover:text-purple-400/80 transition-colors">{u.label}</span>
                                            <div className="text-[clamp(20px,2.5vw,28px)] font-black text-white tracking-tighter truncate w-full mb-1">
                                                {results[u.id]?.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                                            </div>
                                            <span className="text-[9px] font-mono font-bold text-gray-600 uppercase tracking-widest group-hover:text-purple-400/40 transition-colors">{u.sym} node</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Infrastructure Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '120px' }}>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaRuler className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Precision Units</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Construct dimensional models utilizing architectural-grade metrics (m, ft, in, cm, yd, km).</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaRoute className="block text-blue-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Geospatial Scale</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Seamless mapping between micro-measurements and macro-geospatial distance coordinates.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaLayerGroup className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Baseline Logic</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">All transpositions are verified against a meters-standardized baseline node for 100% accuracy.</p>
                        </div>
                    </div>

                    {/* Matrix Intelligence */}
                    <div className="about-workbench-section text-center" style={{ marginBottom: '120px' }}>
                        <h2 className="text-3xl font-black tracking-tight text-white font-sans text-center uppercase tracking-widest" style={{ marginBottom: '20px' }}>Matrix Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans max-w-4xl mx-auto text-gray-500">
                            <div className="faq-item border-l border-white/5 pl-8 text-left">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest leading-loose">Metric vs Imperial Protcols?</h5>
                                <p className="text-sm leading-relaxed italic">The Matrix Protocol bridges the gap between the SI (Metric) system and the Imperial/US Customary systems. By using meters as the universal baseline, we ensure that architectural fidelity is maintained across all dimensional transpositions.</p>
                            </div>
                            <div className="faq-item border-l border-white/5 pl-8 text-left">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest leading-loose">Precision & Rounding?</h5>
                                <p className="text-sm leading-relaxed italic">Calculations are performed at 64-bit floating point precision. Results are mapped to 4 decimal places to balance scientific accuracy with operational legibility for engineering and design applications.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/length_converter" />
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
                    border-color: rgba(147, 51, 234, 0.2);
                }
                input[type=number]::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                }
            `}</style>
        </div>
    );
};

export default LengthConverter;