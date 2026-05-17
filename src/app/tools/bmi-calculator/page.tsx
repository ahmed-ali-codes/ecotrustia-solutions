'use client';

import React from 'react';
import Link from 'next/link';
import { FaWeight, FaRulerVertical, FaHeartbeat, FaCheck, FaRunning, FaUtensils, FaGlassWhiskey } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';
import { useBmiCalculator } from './useBmiCalculator';

const BMICalculator: React.FC = () => {
    const {
        heightCm,
        handleHeightCmChange,
        weightKg,
        handleWeightKgChange,
        heightFt,
        heightIn,
        handleHeightImperialChange,
        weightLb,
        handleWeightLbChange,
        bmi,
        bmiCategory,
        bmiMessage,
        bmiColor,
        indicatorPosition,
        calculateBmi,
    } = useBmiCalculator();

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
            <title>Biometric Mass Index Analyzer | Ecotrustia Solutions</title>
            <meta name="description" content="Calculate professional biometric mass index (BMI). Advanced health screening and weight status analysis using clinical-grade Quetelet formulas." />

            {/* ─── Hero Section ─── */}
            <section className="relative pt-40 pb-24 px-[5%] overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(147,51,234,0.1),transparent_70%)] pointer-events-none"></div>
                
                {/* Horizontal Navigation Boundary */}
                <div className="relative z-20 w-full max-w-[1400px] mx-auto mb-[10px]">
                    <Link href="/tools" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 hover:text-purple-400 transition-all group">
                        <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> Back to Workbench
                    </Link>
                </div>

                {/* Perfectly Centered Content Node */}
                <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-[-0.05em] leading-[0.9] text-white uppercase text-glow">
                        BMI <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Calculator</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Screen biological mass coordinates against global health protocols for precise status diagnostics."
                    </p>
                </div>
            </section>

            {/* ─── Workbench Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-[1400px] w-full mx-auto">
                    
                    <div className="glass-workbench shadow-2xl border border-white/[0.08] overflow-hidden" style={{ borderRadius: '32px', marginBottom: '40px' }}>
                        <div className="grid grid-cols-1 lg:grid-cols-12">
                            
                            {/* Control Node (Left 7) */}
                            <div className="lg:col-span-7 flex flex-col border-b lg:border-b-0 lg:border-r border-white/[0.06]" style={{ padding: 'clamp(24px, 4vw, 48px) clamp(16px, 3vw, 32px)' }}>
                                <div className="flex flex-col flex-1 gap-12">
                                    <div className="flex-1 space-y-10 min-h-[300px]">
                                        <div className="space-y-4">
                                            <label className="text-[10px] uppercase font-black tracking-[0.3em] text-purple-400/80">Height Coordinate</label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="flex items-center gap-3 bg-[#0c0c0c] border border-white/10 rounded-[24px] transition-all focus-within:border-purple-500/50" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                                                    <input type="number" value={heightCm} onChange={(e) => handleHeightCmChange(e.target.value)} className="flex-1 bg-transparent border-none outline-none py-5 text-2xl font-mono font-bold text-purple-400 min-w-0" placeholder="175" />
                                                    <span className="text-[10px] font-black tracking-widest text-white/20 shrink-0">CM</span>
                                                </div>
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                    <div className="flex items-center gap-2 bg-[#0c0c0c] border border-white/10 rounded-[24px] transition-all focus-within:border-purple-500/50" style={{ paddingLeft: '12px', paddingRight: '12px' }}>
                                                        <input type="number" value={heightFt} onChange={(e) => handleHeightImperialChange(e.target.value, heightIn)} className="flex-1 bg-transparent border-none outline-none py-5 text-lg font-mono font-bold text-purple-400 min-w-0" placeholder="5" />
                                                        <span className="text-[10px] font-black tracking-widest text-white/20 shrink-0">FT</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 bg-[#0c0c0c] border border-white/10 rounded-[24px] transition-all focus-within:border-purple-500/50" style={{ paddingLeft: '12px', paddingRight: '12px' }}>
                                                        <input type="number" value={heightIn} onChange={(e) => handleHeightImperialChange(heightFt, e.target.value)} className="flex-1 bg-transparent border-none outline-none py-5 text-lg font-mono font-bold text-purple-400 min-w-0" placeholder="9" />
                                                        <span className="text-[10px] font-black tracking-widest text-white/20 shrink-0">IN</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] uppercase font-black tracking-[0.3em] text-blue-400/80">Mass Coordinate</label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="flex items-center gap-3 bg-[#0c0c0c] border border-white/10 rounded-[24px] transition-all focus-within:border-blue-500/50" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                                                    <input type="number" value={weightKg} onChange={(e) => handleWeightKgChange(e.target.value)} className="flex-1 bg-transparent border-none outline-none py-5 text-2xl font-mono font-bold text-white min-w-0" placeholder="70" />
                                                    <span className="text-[10px] font-black tracking-widest text-white/20 shrink-0">KG</span>
                                                </div>
                                                <div className="flex items-center gap-3 bg-[#0c0c0c] border border-white/10 rounded-[24px] transition-all focus-within:border-blue-500/50" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                                                    <input type="number" value={weightLb} onChange={(e) => handleWeightLbChange(e.target.value)} className="flex-1 bg-transparent border-none outline-none py-5 text-2xl font-mono font-bold text-white min-w-0" placeholder="154" />
                                                    <span className="text-[10px] font-black tracking-widest text-white/20 shrink-0">LB</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={calculateBmi}
                                        className="w-full p-6 rounded-[28px] bg-purple-600 hover:bg-purple-500 text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-purple-900/20 active:scale-95 transition-all"
                                    >
                                        Initialize Diagnostic
                                    </button>
                                </div>
                            </div>

                            {/* Output Node (Right 5) */}
                            <div className="lg:col-span-5 flex flex-col" style={{ padding: 'clamp(24px, 4vw, 64px) clamp(16px, 4vw, 56px)' }}>
                                <div className="flex flex-col flex-1 gap-6">
                                    <div className="relative flex flex-col flex-1 items-center justify-center text-center rounded-[40px] group overflow-hidden shadow-inner min-h-[500px]" style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(24px, 6vw, 48px)' }}>
                                        {/* Background Glow */}
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.05),transparent_70%)] pointer-events-none"></div>
                                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none"></div>

                                        <div className="relative z-10 flex flex-col items-center w-full">
                                            {bmi !== null ? (
                                                <div className="space-y-12 animate-in fade-in zoom-in duration-700 w-full flex flex-col items-center">
                                                    <div className="flex flex-col items-center text-center gap-4 w-full">
                                                        <div className="text-[80px] sm:text-[110px] lg:text-[90px] xl:text-[120px] font-black tracking-tighter transition-colors duration-500 leading-none w-full" style={{ color: bmiColor, textShadow: `0 0 40px ${bmiColor}33` }}>
                                                            {bmi.toFixed(1)}
                                                        </div>
                                                        <div className="px-6 py-2 mt-4 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Subject Index Outcome</div>
                                                        <h3 className="text-2xl font-black uppercase tracking-tight mt-2" style={{ color: bmiColor }}>{bmiCategory}</h3>
                                                        <p className="max-w-xs text-gray-500 text-sm italic leading-relaxed">"{bmiMessage}"</p>
                                                    </div>

                                                    <div className="relative h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 mt-4 max-w-sm">
                                                        <div className="absolute inset-0 grid grid-cols-4 h-full pointer-events-none">
                                                            <div className="border-r border-white/10 bg-blue-500/10"></div>
                                                            <div className="border-r border-white/10 bg-green-500/10"></div>
                                                            <div className="border-r border-white/10 bg-yellow-500/10"></div>
                                                            <div className="bg-red-500/10"></div>
                                                        </div>
                                                        <div 
                                                            className="absolute top-0 h-full w-2 shadow-[0_0_15px_white] z-10 transition-all duration-1000 ease-out" 
                                                            style={{ left: `${indicatorPosition}%`, backgroundColor: bmiColor }}
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-4 gap-2 w-full max-w-sm mt-4">
                                                        {[
                                                            { label: 'Under', range: '<18.5', color: 'text-blue-400' },
                                                            { label: 'Healthy', range: '18.5-25', color: 'text-green-400' },
                                                            { label: 'Over', range: '25-30', color: 'text-yellow-400' },
                                                            { label: 'Obese', range: '>30', color: 'text-red-400' }
                                                        ].map((cat, i) => (
                                                            <div key={i} className="flex flex-col items-center gap-1 group">
                                                                <span className={`text-[8px] font-black uppercase tracking-widest ${cat.color}`}>{cat.label}</span>
                                                                <span className="text-[9px] font-mono font-bold text-gray-800 group-hover:text-gray-400 transition-colors">{cat.range}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center text-center opacity-20 group">
                                                    <FaHeartbeat className="text-[clamp(60px,8vw,100px)] mb-8 group-hover:scale-110 transition-transform duration-1000" />
                                                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">Awaiting Signal Induction</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Scanline Effect */}
                                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/[0.02] to-transparent h-4 animate-scanline"></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Infrastructure Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '120px' }}>
                        <div className="mini-card group flex flex-col gap-8">
                            <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:border-purple-500/30 transition-all">
                                <FaWeight className="text-xl text-purple-400 group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h5 className="font-black text-xs uppercase tracking-[0.3em] text-white">Mass Tracking</h5>
                                <p className="text-[11px] text-gray-500 leading-relaxed italic font-sans">Monitor mass coordinates relative to height vectors for long-term health mapping.</p>
                            </div>
                        </div>
                        <div className="mini-card group flex flex-col gap-8">
                            <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:border-blue-500/30 transition-all">
                                <FaRulerVertical className="text-xl text-blue-400 group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h5 className="font-black text-xs uppercase tracking-[0.3em] text-white">Scale Sync</h5>
                                <p className="text-[11px] text-gray-500 leading-relaxed italic font-sans">Seamless conversion between Metric and Imperial protocols for global compatibility.</p>
                            </div>
                        </div>
                        <div className="mini-card group flex flex-col gap-8">
                            <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:border-purple-500/30 transition-all">
                                <FaHeartbeat className="text-xl text-purple-400 group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h5 className="font-black text-xs uppercase tracking-[0.3em] text-white">Clinical Logic</h5>
                                <p className="text-[11px] text-gray-500 leading-relaxed italic font-sans">Utilizes WHO-standardized categorization logic for result synthesis.</p>
                            </div>
                        </div>
                    </div>

                    {/* Wellness Intelligence */}
                    <div className="about-workbench-section text-center" style={{ marginBottom: '120px' }}>
                        <h2 className="text-3xl font-black tracking-tight text-white font-sans text-center uppercase tracking-widest text-glow" style={{ marginBottom: '60px' }}>Wellness Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                            {[
                                { title: 'Balanced Fuel', icon: <FaUtensils />, desc: 'Maintain mass via diverse nutrient uptake across plant and protein buffers.' },
                                { title: 'Kinetic Drive', icon: <FaRunning />, desc: 'Sustain 150min weekly aerobic cycles to optimize cardiovascular throughput.' },
                                { title: 'Hydration Cycle', icon: <FaGlassWhiskey />, desc: 'High-frequency water intake for optimal metabolic processing and data flow.' },
                            ].map((tip, i) => (
                                <div key={i} className="flex flex-col gap-5 p-[40px_48px] rounded-[32px] bg-white/[0.01] border border-white/5 group hover:border-purple-500/20 transition-all">
                                    <div className="block text-purple-500 text-lg group-hover:scale-125 group-hover:-translate-y-1 transition-transform">{tip.icon}</div>
                                    <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-white">{tip.title}</h4>
                                    <p className="text-sm leading-relaxed text-gray-500">{tip.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/bmi-calculator" />
                    </div>
                </div>
            </section>

            <style jsx>{`
                .glass-workbench {
                    background: rgba(10, 10, 10, 0.95);
                    backdrop-filter: blur(40px);
                }
                .text-glow {
                    text-shadow: 0 0 30px rgba(147, 51, 234, 0.3);
                }
                .mini-card {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    border-radius: 32px;
                    padding: 48px 40px 48px 48px;
                }
                .mini-card:hover {
                    background: rgba(255, 255, 255, 0.04);
                    border-color: rgba(147, 51, 234, 0.2);
                    transform: translateY(-5px);
                }
                input[type=number]::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                }
                @keyframes scanline {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(1000%); }
                }
                .animate-scanline {
                    animation: scanline 8s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default BMICalculator;