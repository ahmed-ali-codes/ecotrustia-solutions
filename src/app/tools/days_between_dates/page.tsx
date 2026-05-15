'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaCalendarAlt, FaHistory, FaClock, FaCheck, FaShieldAlt, FaRocket, FaArrowRight, FaHourglassEnd, FaChartBar, FaCalendarDay } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';

const DaysBetweenDates: React.FC = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [daysResult, setDaysResult] = useState(0);
    const [hasCalculated, setHasCalculated] = useState(false);

    useEffect(() => {
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);
        setStartDate(today.toISOString().split('T')[0]);
        setEndDate(nextWeek.toISOString().split('T')[0]);
    }, []);

    const calculateDelta = () => {
        if (!startDate || !endDate) return;
        const date1 = new Date(startDate);
        const date2 = new Date(endDate);
        const diffTime = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysResult(diffDays);
        setHasCalculated(true);
    };

    useEffect(() => {
        if (startDate && endDate) calculateDelta();
    }, [startDate, endDate]);

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 font-sans text-glow-none">
            <title>Inter-Temporal Delta Calculator | Ecotrustia Solutions</title>
            <meta name="description" content="Calculate professional temporal deltas between date-nodes. High-precision magnitude analysis for project planning and historical tracking." />

            {/* ─── Hero Section ─── */}
            <section className="relative pt-40 pb-24 px-[5%] overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none"></div>
                
                {/* Horizontal Navigation Boundary */}
                <div className="relative z-20 w-full max-w-[1400px] mx-auto mb-[10px]">
                    <Link href="/tools" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 hover:text-blue-400 transition-all group">
                        <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> Back to Workbench
                    </Link>
                </div>

                {/* Perfectly Centered Content Node */}
                <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-[-0.05em] leading-[0.9] text-white uppercase text-glow">
                        Temporal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Delta</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Measure the chronological magnitude between two disparate temporal coordinates with precision."
                    </p>
                </div>
            </section>

            {/* ─── Workbench Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-[1400px] w-full mx-auto">
                    
                    <div className="glass-workbench shadow-2xl border border-white/[0.08] overflow-hidden" style={{ borderRadius: '32px', marginBottom: '40px' }}>
                        <div className="grid grid-cols-1 lg:grid-cols-12">
                            
                            {/* Input Hub (Left 5) */}
                            <div className="lg:col-span-5 flex flex-col border-b lg:border-b-0 lg:border-r border-white/[0.06]" style={{ padding: 'clamp(40px, 6vw, 64px) clamp(32px, 5vw, 56px)' }}>
                                <div className="flex flex-col flex-1 gap-8">
                                    
                                    {/* Date Input: Subject Origin */}
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.35em]">Alpha Coordinate (Start)</label>
                                        <div className="relative">
                                            <input 
                                                type="date" 
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                className="input-node w-full bg-[#111111] border border-white/10 rounded-[18px] px-6 py-5 text-xl font-black text-blue-400 outline-none focus:border-blue-500/40 transition-all"
                                                style={{ letterSpacing: '0.05em' }}
                                            />
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <FaCalendarDay className="text-gray-500 text-sm" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Date Input: Focal Point */}
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.35em]">Omega Coordinate (End)</label>
                                        <div className="relative">
                                            <input 
                                                type="date" 
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                className="input-node w-full bg-[#111111] border border-white/10 rounded-[18px] px-6 py-5 text-xl font-black text-purple-400 outline-none focus:border-white/20 transition-all"
                                                style={{ letterSpacing: '0.05em' }}
                                            />
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <FaClock className="text-gray-500 text-sm" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Temporal Matrix Box — pushes to bottom */}
                                    <div className="mt-auto rounded-[20px] border border-white/[0.06] flex flex-col gap-3" style={{ background: 'rgba(255,255,255,0.015)', padding: '20px 24px' }}>
                                        <div className="flex items-center gap-3">
                                            <FaClock className="text-blue-500/70 text-[10px] animate-spin-slow" />
                                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-500/80">Delta Logic Initialized</span>
                                        </div>
                                        <p className="text-[11px] text-gray-500 italic leading-[1.7]">Magnitude calculation employs high-precision Unix timestamp offsets to ensure total day-count fidelity.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Result Dashboard (Right 7) */}
                            <div className="lg:col-span-7 flex flex-col" style={{ padding: 'clamp(40px, 6vw, 64px) clamp(32px, 5vw, 56px)' }}>
                                <div className="flex flex-col flex-1 gap-6">

                                    <div className={`flex flex-col flex-1 items-center justify-center text-center rounded-[28px] group transition-all duration-1000 ${hasCalculated ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-10 blur-lg'}`} style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)', padding: 'clamp(32px, 5vw, 48px)', minHeight: '300px' }}>
                                        <div className="w-12 h-12 rounded-[16px] bg-blue-500/10 flex items-center justify-center text-blue-400 text-sm mb-6 group-hover:scale-110 transition-transform">
                                            <FaHourglassEnd />
                                        </div>
                                        <span className="text-[clamp(60px,8vw,120px)] font-black tracking-[-0.04em] text-white leading-none mb-4">{daysResult}</span>
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Calculated Delta Magnitude (Days)</span>
                                        
                                        <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-sm mx-auto">
                                            <div className="px-6 py-4 rounded-[16px] bg-white/[0.02] border border-white/5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex flex-col gap-1 hover:border-blue-500/20 transition-all">
                                                <span className="text-white text-lg">{Math.floor(daysResult / 7)}</span>
                                                <span className="text-gray-500 text-[8px] tracking-[0.3em]">Weeks</span>
                                            </div>
                                            <div className="px-6 py-4 rounded-[16px] bg-white/[0.02] border border-white/5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex flex-col gap-1 hover:border-blue-500/20 transition-all">
                                                <span className="text-white text-lg">{daysResult * 24}</span>
                                                <span className="text-gray-500 text-[8px] tracking-[0.3em]">Hours</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status Report Bar */}
                                    <div
                                        className={`rounded-[20px] flex items-center justify-between transition-all duration-700 ${hasCalculated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                                        style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)', padding: '16px 24px' }}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(59,130,246,0.85)', boxShadow: '0 0 24px rgba(59,130,246,0.3)' }}>
                                                <FaChartBar className="text-white text-sm" />
                                            </div>
                                            <div className="flex flex-col gap-[2px]">
                                                <span className="text-[9px] font-black uppercase tracking-[0.35em] text-blue-400">Magnitude Report</span>
                                                <span className="text-[13px] font-black text-white">Temporal Disparity Measured</span>
                                            </div>
                                        </div>
                                        <FaCheck className="text-green-400 text-base flex-shrink-0" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Infrastructure Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '200px' }}>
                        {[
                            { icon: FaHistory, title: 'Event Archeology', text: 'Measure precise temporal distances between historical event nodes and modern coordinates.', color: 'text-blue-400' },
                            { icon: FaCalendarAlt, title: 'Multi-Multiplex', text: 'System automatically synthesizes the delta into weeks, hours, and days for comprehensive analysis.', color: 'text-purple-400' },
                            { icon: FaArrowRight, title: 'Logical Offset', text: 'Calculates absolute magnitude, ignoring temporal direction (past vs future) for pure measurement.', color: 'text-blue-400' }
                        ].map((item, i) => (
                            <div key={i} className="mini-card group flex flex-col gap-8" style={{ borderRadius: '32px', padding: '48px 40px 48px 48px' }}>
                                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:border-blue-500/30 transition-all">
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
                        <h2 className="text-3xl font-black tracking-tight text-white font-sans text-center uppercase tracking-widest text-glow" style={{ marginBottom: '60px' }}>Delta Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans max-w-5xl mx-auto text-left">
                            {[
                                { title: 'Is the end-date included?', text: 'The Delta Calculator measures the magnitude *between* dates. Standard protocol counts the intervening 24-hour periods. If you require inclusive counting (start + end), typically increment the result by 1 Node.' },
                                { title: 'Unix Timestamp Fidelity?', text: 'Our engine utilizes 64-bit Unix timestamps (milliseconds since Epoch) to perform delta logic. This bypasses daylight savings complexity and ensures absolute mathematical precision across centuries.' }
                            ].map((item, i) => (
                                <div key={i} className="rounded-[32px] bg-white/[0.01] border border-white/5 flex flex-col gap-6" style={{ padding: '40px 48px' }}>
                                    <div className="flex items-center gap-4">
                                        <FaShieldAlt className="text-blue-500 text-xs" />
                                        <h5 className="font-black text-[10px] uppercase tracking-[0.4em] text-white">{item.title}</h5>
                                    </div>
                                    <p className="text-sm leading-relaxed text-gray-500">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/days_between_dates" />
                    </div>
                </div>
            </section>

            <style jsx>{`
                .glass-workbench {
                    background: rgba(10, 10, 10, 0.95);
                    backdrop-filter: blur(40px);
                }
                .text-glow {
                    text-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
                }
                .mini-card {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .mini-card:hover {
                    background: rgba(255, 255, 255, 0.04);
                    border-color: rgba(59, 130, 246, 0.2);
                    transform: translateY(-5px);
                }
                .animate-spin-slow {
                    animation: spin 6s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                /* Hide native date picker chrome — use custom icon instead */
                .input-node {
                    color-scheme: dark;
                }
                .input-node::-webkit-calendar-picker-indicator {
                    opacity: 0;
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
};

export default DaysBetweenDates;