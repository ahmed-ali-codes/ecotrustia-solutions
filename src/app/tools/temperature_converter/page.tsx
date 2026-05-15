'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaThermometerHalf, FaThermometerFull, FaThermometerEmpty, FaWind, FaSnowflake, FaFire, FaShieldAlt, FaSyncAlt, FaChartBar, FaGlobeAmericas } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';

const TemperatureConverter: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('20');
    const [sourceUnit, setSourceUnit] = useState<string>('celsius');
    const [targetUnit, setTargetUnit] = useState<string>('fahrenheit');

    const val = parseFloat(inputValue);

    // Calculate intermediate Celsius value for color logic and background effects
    const cVal = (() => {
        if (isNaN(val)) return 0;
        if (sourceUnit === 'celsius') return val;
        if (sourceUnit === 'fahrenheit') return (val - 32) * 5 / 9;
        if (sourceUnit === 'kelvin') return val - 273.15;
        return 0;
    })();

    // Calculate Final Target Value
    const convertedValue = (() => {
        if (isNaN(val)) return '--';
        let result = 0;
        if (targetUnit === 'celsius') result = cVal;
        if (targetUnit === 'fahrenheit') result = (cVal * 9 / 5) + 32;
        if (targetUnit === 'kelvin') result = cVal + 273.15;
        return result.toFixed(2);
    })();

    const getTempColor = (c: number) => {
        if (c <= 0) return 'text-blue-400';
        if (c <= 25) return 'text-cyan-400';
        if (c <= 40) return 'text-purple-400';
        return 'text-red-500';
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
            <title>Thermal Equilibrium Engine | Ecotrustia Solutions</title>
            <meta name="description" content="Calculate high-fidelity temperature transpositions. Convert between Celsius, Fahrenheit, and Kelvin using professional thermodynamics mapping." />

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
                    <h1 className="text-[clamp(2.5rem,8vw,9rem)] font-black mb-8 tracking-[-0.05em] leading-[0.9] text-white uppercase text-glow">
                        Thermal <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 block sm:inline">Equilibrium</span>
                    </h1>
                    <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium italic px-4">
                        "Transpose molecular kinetic energy across multi-standard thermal grids with absolute fidelity."
                    </p>
                </div>
            </section>

            {/* ─── Workbench Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-[1400px] w-full mx-auto">

                    <div className="glass-workbench shadow-2xl border border-white/[0.08] overflow-hidden" style={{ borderRadius: '32px', marginBottom: '80px' }}>
                        <div className="grid grid-cols-1 lg:grid-cols-12">

                            {/* Induction Hub (Left 7) */}
                            <div className="lg:col-span-7 flex flex-col border-b lg:border-b-0 lg:border-r border-white/[0.06]" style={{ padding: 'clamp(24px, 6vw, 64px) clamp(16px, 4vw, 56px)' }}>
                                <div className="flex flex-col flex-1 justify-center gap-12">
                                    <div className="space-y-6">
                                        <label className="text-[10px] uppercase font-black tracking-[0.4em] text-purple-400/60 ml-2">Source Thermal Node</label>
                                        <div
                                            className="flex items-center gap-4 bg-[#0a0a0a] border border-white/10 rounded-[28px] transition-all focus-within:border-purple-500/50 shadow-inner"
                                            style={{ paddingRight: '14px', paddingLeft: '12px' }}
                                        >
                                            <input
                                                type="number"
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                className="flex-1 bg-transparent border-none outline-none py-8 text-2xl sm:text-3xl font-black text-purple-400 min-w-0 text-left"
                                                style={{ paddingLeft: '12px' }}
                                                placeholder="0.0"
                                            />
                                            <select
                                                value={sourceUnit}
                                                onChange={(e) => setSourceUnit(e.target.value)}
                                                className="bg-white/5 border border-white/10 rounded-2xl py-3 px-6 text-[10px] font-black uppercase tracking-widest text-gray-300 outline-none cursor-pointer hover:bg-white/10 transition-all shrink-0"
                                                style={{ paddingRight: '12px' }}
                                            >
                                                <option value="celsius" className="bg-[#0c0c0c]">Celsius (°C)</option>
                                                <option value="fahrenheit" className="bg-[#0c0c0c]">Fahrenheit (°F)</option>
                                                <option value="kelvin" className="bg-[#0c0c0c]">Kelvin (K)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <label className="text-[10px] uppercase font-black tracking-[0.4em] text-purple-400/60 ml-2">Target Thermal Node</label>
                                        <div
                                            className="flex items-center gap-4 bg-[#0a0a0a] border border-white/10 rounded-[28px] transition-all focus-within:border-purple-500/50 shadow-inner"
                                            style={{ paddingRight: '14px', paddingLeft: '12px' }}
                                        >
                                            <div
                                                className="flex-1 py-8 text-2xl sm:text-3xl font-black text-gray-700 min-w-0 select-none uppercase tracking-widest opacity-50 text-left"
                                                style={{ paddingLeft: '12px' }}
                                            >
                                                Transposing
                                            </div>
                                            <select
                                                value={targetUnit}
                                                onChange={(e) => setTargetUnit(e.target.value)}
                                                className="bg-white/5 border border-white/10 rounded-2xl py-3 px-6 text-[10px] font-black uppercase tracking-widest text-gray-300 outline-none cursor-pointer hover:bg-white/10 transition-all shrink-0"
                                                style={{ paddingRight: '12px' }}
                                            >
                                                <option value="celsius" className="bg-[#0c0c0c]">Celsius (°C)</option>
                                                <option value="fahrenheit" className="bg-[#0c0c0c]">Fahrenheit (°F)</option>
                                                <option value="kelvin" className="bg-[#0c0c0c]">Kelvin (K)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="rounded-[48px] bg-white/[0.01] border border-white/5 flex flex-col gap-6 relative overflow-hidden group mt-6" style={{ padding: 'clamp(24px, 4vw, 40px) clamp(24px, 4vw, 56px)' }}>
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="relative z-10 flex items-center gap-6 text-purple-400">
                                            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shrink-0">
                                                <FaSyncAlt className="text-[10px] animate-spin-slow" />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.5em] leading-relaxed">Live Mapping Active</span>
                                        </div>
                                        <p className="relative z-10 text-[13px] text-gray-500 italic leading-relaxed max-w-xl sm:pl-16">
                                            "Engine utilizes a kelvin-origin unified protocol for absolute thermal mapping across the spectral grid."
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Spectral Visualization (Right 5) */}
                            <div className="lg:col-span-5 flex flex-col items-center justify-center relative overflow-hidden" style={{ padding: 'clamp(32px, 5vw, 64px)' }}>
                                <div className={`absolute inset-0 opacity-[0.15] blur-[100px] transition-colors duration-1000 ${cVal <= 0 ? 'bg-blue-600' : cVal <= 25 ? 'bg-cyan-600' : 'bg-purple-600'}`}></div>

                                <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.6em] text-gray-600 mb-12 text-center">Kinetic Magnitude Output</span>

                                <div className="relative z-10 flex flex-col items-center w-full justify-center flex-1">
                                    <div className={`text-[clamp(3.5rem,6vw,7rem)] font-black tracking-tighter leading-none mb-6 transition-colors duration-500 truncate w-full text-center px-4 ${getTempColor(cVal)}`}>
                                        {convertedValue}
                                    </div>
                                    <span className={`text-2xl md:text-4xl font-bold uppercase tracking-widest opacity-40 transition-colors duration-500 ${getTempColor(cVal)}`}>
                                        {targetUnit === 'celsius' ? '°C' : targetUnit === 'fahrenheit' ? '°F' : 'K'}
                                    </span>
                                </div>

                                <div className={`mt-16 relative z-10 flex flex-col sm:flex-row items-center gap-4 px-8 py-4 rounded-[24px] sm:rounded-full border border-white/10 bg-[#0a0a0a] shadow-inner transition-all duration-500 text-center ${cVal > 50 ? 'border-red-500/30 shadow-[inset_0_0_20px_rgba(239,68,68,0.1)]' : ''}`}>
                                    {cVal <= 0 ? <FaSnowflake className="text-blue-400 text-sm shrink-0" /> : cVal >= 100 ? <FaFire className="text-red-500 text-sm animate-pulse shrink-0" /> : <FaWind className="text-gray-500 text-sm shrink-0" />}
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                                        {cVal <= 0 ? 'Cryogenic Domain' : cVal >= 100 ? 'Combustion Domain' : 'Temperate Equilibrium'}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Infrastructure Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '120px' }}>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaThermometerHalf className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white uppercase tracking-widest">Absolute Precision</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Construct high-fidelity thermal models using scientific-grade transposition logic (C, F, K).</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaChartBar className="block text-indigo-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white uppercase tracking-widest">Key Markers</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Monitor molecular phase shifts relative to Absolute Zero and water phase-transition nodes.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaGlobeAmericas className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white uppercase tracking-widest">Universal Mapping</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Seamless transposition between global regional standards and peer-reviewed scientific baselines.</p>
                        </div>
                    </div>

                    {/* Thermal Intelligence */}
                    <div className="about-workbench-section w-full flex flex-col items-center" style={{ marginBottom: '120px' }}>
                        <h2 className="text-[clamp(1.5rem,4vw,2rem)] font-black tracking-tight text-white font-sans text-center uppercase tracking-[0.4em]" style={{ marginBottom: '60px' }}>Thermal Intelligence</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16 max-w-5xl w-full px-4 sm:px-0">
                            <div className="intel-node flex flex-col items-start text-left border-l border-purple-500/20 pl-6 sm:pl-8">
                                <h5 className="font-bold mb-4 text-white uppercase text-[10px] sm:text-xs tracking-[0.3em] leading-loose">Absolute Zero Node?</h5>
                                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed italic">Absolute Zero (0 Kelvin or -273.15°C) is the theoretical lower limit of the thermodynamic scale where all molecular motion terminates. Our engine utilizes this baseline for all Kelvin-standardized transpositions.</p>
                            </div>
                            <div className="intel-node flex flex-col items-start text-left border-l border-purple-500/20 pl-6 sm:pl-8">
                                <h5 className="font-bold mb-4 text-white uppercase text-[10px] sm:text-xs tracking-[0.3em] leading-loose">Scientific Kelvin Scale?</h5>
                                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed italic">The Kelvin scale is primarily utilized in scientific and industrial sectors to measure thermodynamic temperature. Unlike Celsius or Fahrenheit, it does not use 'degrees' but represents absolute magnitude coordinates.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/temperature_converter" />
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
                    padding: clamp(32px, 4vw, 50px) clamp(24px, 3vw, 44px);
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

export default TemperatureConverter;