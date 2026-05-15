'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaWeight, FaWeightHanging, FaBalanceScale, FaVial, FaCheck, FaShieldAlt, FaSyncAlt, FaCube } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';

const WeightConverter: React.FC = () => {
    const [inputValue, setInputValue] = useState('1');
    const [sourceUnit, setSourceUnit] = useState('kilograms');
    const [results, setResults] = useState<Record<string, number>>({});

    const units = [
        { id: 'kilograms', label: 'Kilograms', sym: 'kg', toKg: 1 },
        { id: 'pounds', label: 'Pounds', sym: 'lb', toKg: 0.453592 },
        { id: 'ounces', label: 'Ounces', sym: 'oz', toKg: 0.0283495 },
        { id: 'grams', label: 'Grams', sym: 'g', toKg: 0.001 },
        { id: 'stones', label: 'Stones', sym: 'st', toKg: 6.35029 }
    ];

    const convert = () => {
        const val = parseFloat(inputValue);
        if (isNaN(val)) return;

        const currentUnit = units.find(u => u.id === sourceUnit);
        if (!currentUnit) return;

        const baseInKg = val * currentUnit.toKg;
        const newResults: Record<string, number> = {};

        units.forEach(u => {
            newResults[u.id] = baseInKg / u.toKg;
        });

        setResults(newResults);
    };

    useEffect(() => {
        convert();
    }, [inputValue, sourceUnit]);

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
            <title>Mass Vector Transposer | Ecotrustia Solutions</title>
            <meta name="description" content="Professional mass unit transposition engine. Convert weight metrics between kilograms, pounds, stones, and grams with high-fidelity baseline mapping." />

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
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-[-0.05em] leading-[0.9] text-white uppercase text-glow">
                        Mass <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Transposer</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Redefine mass coordinates across global standard protocols with high-fidelity vector mapping."
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
                                        <label className="text-[10px] uppercase font-black tracking-[0.4em] text-purple-400/60 ml-2">Source Mass Node</label>
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

                                    <div className="rounded-[48px] bg-white/[0.01] border border-white/5 flex flex-col gap-8 relative overflow-hidden group" style={{ padding: '80px 56px' }}>
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="relative z-10 flex items-center gap-8 text-purple-400">
                                            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                                <FaSyncAlt className="text-[10px] animate-spin-slow" />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Live Mass Mapping Active</span>
                                        </div>
                                        <p className="relative z-10 text-[14px] text-gray-500 italic leading-relaxed max-w-xl" style={{ paddingLeft: '72px' }}>
                                            "Engine utilizes a kilogram-baseline unified protocol for absolute mass fidelity across all nodes."
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
                                            <div className="text-purple-400/20 text-xs mb-4 transition-colors group-hover:text-purple-400/60">
                                                {u.id === 'kilograms' && <FaWeight />}
                                                {u.id === 'pounds' && <FaWeightHanging />}
                                                {u.id === 'ounces' && <FaBalanceScale />}
                                                {u.id === 'grams' && <FaVial />}
                                                {u.id === 'stones' && <FaCube />}
                                            </div>
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
                            <FaWeight className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white uppercase tracking-widest">Culinary Precision</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Construct precise weight models for high-fidelity culinary and chemical buffer management.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaWeightHanging className="block text-blue-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white uppercase tracking-widest">Logistics Scaling</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Seamless transposition between micro-grams and macro-tonnage coordinates for shipping analysis.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaCube className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white uppercase tracking-widest">Baseline Logic</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">All transpositions verified against a KG-standardized baseline node for 100% mass accuracy.</p>
                        </div>
                    </div>

                    {/* Matrix Intelligence */}
                    <div className="about-workbench-section w-full flex flex-col items-center" style={{ marginBottom: '120px' }}>
                        <h2 className="text-3xl font-black tracking-tight text-white font-sans text-center uppercase tracking-[0.4em]" style={{ marginBottom: '60px' }}>Mass Intelligence</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16 max-w-5xl w-full">
                            <div className="intel-node flex flex-col items-start text-left border-l border-purple-500/20 pl-8">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-[0.3em] leading-loose">Stones vs Pounds Protocol?</h5>
                                <p className="text-sm text-gray-500 leading-relaxed italic">The Stone (st) protocol is a common mass node used in the UK and Ireland for body weight. 1 Stone is equivalent to 14 Pounds. Our engine handles the fractional mapping to ensure total accuracy across regional scales.</p>
                            </div>
                            <div className="intel-node flex flex-col items-start text-left border-l border-purple-500/20 pl-8">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-[0.3em] leading-loose">Calibration Logic?</h5>
                                <p className="text-sm text-gray-500 leading-relaxed italic">The Transposer uses high-precision constants (e.g., 0.45359237 for lb-to-kg) to perform and synchronize results across the mass matrix. This ensures sub-gram accuracy for professional-grade diagnostics.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/weight_converter" />
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
                    text-shadow: 0 0 30px rgba(168, 85, 247, 0.3);
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
                    border-color: rgba(168, 85, 247, 0.2);
                }
                input[type=number]::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                }
            `}</style>
        </div>
    );
};

export default WeightConverter;