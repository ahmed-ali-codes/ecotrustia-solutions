'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaHourglassHalf, FaCalendarDay, FaBirthdayCake, FaHistory, FaCheck, FaShieldAlt, FaRocket, FaClock } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';

const AgeCalculator: React.FC = () => {
    const [birthDate, setBirthDate] = useState('');
    const [asOfDate, setAsOfDate] = useState(new Date().toISOString().split('T')[0]);
    const [result, setResult] = useState({ years: 0, months: 0, days: 0 });
    const [hasCalculated, setHasCalculated] = useState(false);

    const calculateAge = () => {
        if (!birthDate) return;

        const birth = new Date(birthDate);
        const asOf = new Date(asOfDate);

        if (birth > asOf) {
            alert("Subject origin cannot exceed the focal date vector.");
            return;
        }

        let years = asOf.getFullYear() - birth.getFullYear();
        let months = asOf.getMonth() - birth.getMonth();
        let days = asOf.getDate() - birth.getDate();

        if (days < 0) {
            months--;
            const lastDayOfMonth = new Date(asOf.getFullYear(), asOf.getMonth(), 0).getDate();
            days += lastDayOfMonth;
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        setResult({ years, months, days });
        setHasCalculated(true);
    };

    useEffect(() => {
        if (birthDate) calculateAge();
    }, [birthDate, asOfDate]);

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans text-glow-none">
            <title>Chronometric Life-Cycle Tracker | Ecotrustia Solutions</title>
            <meta name="description" content="Advanced temporal life-cycle tracking. Calculate precise age matrices in years, months, and days with Gregorgian offset synchronization." />

            {/* ─── Hero Section ─── */}
            <section className="relative pt-40 pb-24 px-[5%] overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(168,85,247,0.1),transparent_70%)] pointer-events-none"></div>
                
                {/* Horizontal Navigation Boundary */}
                <div className="relative z-20 w-full max-w-[1400px] mx-auto mb-[10px]">
                    <Link href="/tools" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 hover:text-purple-400 transition-all group">
                        <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> Back to Workbench
                    </Link>
                </div>

                {/* Perfectly Centered Content Node */}
                <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-[-0.05em] leading-[0.9] text-white uppercase text-glow">
                        Chronometric <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Tracker</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Map precise temporal coordinates across the Gregorian timeline with mathematical accuracy."
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
                                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.35em]">Subject Origin Date</label>
                                        <div className="relative">
                                            <input 
                                                type="date" 
                                                value={birthDate}
                                                onChange={(e) => setBirthDate(e.target.value)}
                                                className="input-node w-full bg-[#111111] border border-white/10 rounded-[18px] px-6 py-5 text-xl font-black text-purple-400 outline-none focus:border-purple-500/40 transition-all"
                                                style={{ letterSpacing: '0.05em' }}
                                            />
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center pointer-events-none">
                                                <FaCalendarDay className="text-gray-500 text-xs" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Date Input: Focal Point */}
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.35em]">Focal Velocity Point</label>
                                        <div className="relative">
                                            <input 
                                                type="date" 
                                                value={asOfDate}
                                                onChange={(e) => setAsOfDate(e.target.value)}
                                                className="input-node w-full bg-[#111111] border border-white/10 rounded-[18px] px-6 py-5 text-xl font-black text-gray-300 outline-none focus:border-white/20 transition-all"
                                                style={{ letterSpacing: '0.05em' }}
                                            />
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center pointer-events-none">
                                                <FaClock className="text-gray-500 text-xs" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Temporal Matrix Box — pushes to bottom */}
                                    <div className="mt-auto rounded-[20px] border border-white/[0.06] flex flex-col gap-3" style={{ background: 'rgba(255,255,255,0.015)', padding: '20px 24px' }}>
                                        <div className="flex items-center gap-3">
                                            <FaHourglassHalf className="text-purple-500/70 text-[10px] animate-spin-slow" />
                                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-purple-500/80">Temporal Matrix Locked</span>
                                        </div>
                                        <p className="text-[11px] text-gray-500 italic leading-[1.7]">System automatically accounts for leap year deviations and varying monthly day-counts in the Gregorian buffer.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Result Dashboard (Right 7) */}
                            <div className="lg:col-span-7 flex flex-col" style={{ padding: 'clamp(40px, 6vw, 64px) clamp(32px, 5vw, 56px)' }}>
                                <div className="flex flex-col flex-1 gap-6">

                                    {/* Result Cards — 3 tall rounded-rect nodes */}
                                    <div className={`grid grid-cols-3 gap-4 flex-1 transition-all duration-1000 ${hasCalculated ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-10 blur-lg'}`}>
                                        {[
                                            { label: 'Years',  val: result.years,  icon: <FaHistory /> },
                                            { label: 'Months', val: result.months, icon: <FaCalendarDay /> },
                                            { label: 'Days',   val: result.days,   icon: <FaClock /> }
                                        ].map((pod, i) => (
                                            <div
                                                key={i}
                                                className="rounded-[28px] flex flex-col items-center justify-center text-center group hover:border-purple-500/20 transition-all"
                                                style={{
                                                    background: '#111111',
                                                    border: '1px solid rgba(255,255,255,0.07)',
                                                    padding: 'clamp(28px,4vw,48px) 12px',
                                                    minHeight: '200px'
                                                }}
                                            >
                                                <div className="w-12 h-12 rounded-[16px] bg-purple-500/10 flex items-center justify-center text-purple-400 text-sm mb-5 group-hover:scale-110 transition-transform">
                                                    {pod.icon}
                                                </div>
                                                <span className="text-[clamp(40px,5vw,64px)] font-black tracking-[-0.04em] text-white leading-none mb-3">{pod.val}</span>
                                                <span className="text-[9px] font-black uppercase tracking-[0.35em] text-gray-500">{pod.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Status Report Bar */}
                                    <div
                                        className={`rounded-[20px] flex items-center justify-between transition-all duration-700 ${hasCalculated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                                        style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)', padding: '16px 24px' }}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(147,51,234,0.85)', boxShadow: '0 0 24px rgba(147,51,234,0.3)' }}>
                                                <FaBirthdayCake className="text-white text-sm" />
                                            </div>
                                            <div className="flex flex-col gap-[2px]">
                                                <span className="text-[9px] font-black uppercase tracking-[0.35em] text-purple-400">Status Report</span>
                                                <span className="text-[13px] font-black text-white">Precise Subject Age Synthesized</span>
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
                            { icon: FaBirthdayCake, title: 'Anniversary Sync', text: 'Calculate upcoming temporal milestones and anniversary vectors with high-fidelity accuracy.', color: 'text-purple-400' },
                            { icon: FaCalendarDay, title: 'Gregorian Logic', text: 'Automatically resolves leap year deviations and varying monthly day-counts for precise results.', color: 'text-blue-400' },
                            { icon: FaRocket, title: 'Focal Pointers', text: 'Input past, present, or future focal points to calculate temporal distance across any vector.', color: 'text-purple-400' }
                        ].map((item, i) => (
                            <div key={i} className="mini-card group flex flex-col gap-8" style={{ borderRadius: '32px', padding: '48px 40px 48px 48px' }}>
                                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:border-purple-500/30 transition-all">
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
                        <h2 className="text-3xl font-black tracking-tight text-white font-sans text-center uppercase tracking-widest text-glow" style={{ marginBottom: '60px' }}>Chronometric Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans max-w-5xl mx-auto text-left">
                            {[
                                { title: 'How are months calculated?', text: 'The Tracker uses the calendar-month convention. If the subject origin date exceeds the focal date\'s monthly day-count, the system borrows days from the preceding month-buffer.' },
                                { title: 'Does it handle Leap Years?', text: 'Yes. Our logic engine accounts for the additional 24-hour buffer in February during leap years, ensuring your life-cycle matrix is perfectly aligned with astronomical reality.' }
                            ].map((item, i) => (
                                <div key={i} className="rounded-[32px] bg-white/[0.01] border border-white/5 flex flex-col gap-6" style={{ padding: '40px 48px' }}>
                                    <div className="flex items-center gap-4">
                                        <FaShieldAlt className="text-purple-500 text-xs" />
                                        <h5 className="font-black text-[10px] uppercase tracking-[0.4em] text-white">{item.title}</h5>
                                    </div>
                                    <p className="text-sm leading-relaxed text-gray-500">{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/age_calculator" />
                    </div>
                </div>
            </section>

            <style jsx>{`
                .glass-workbench {
                    background: rgba(10, 10, 10, 0.95);
                    backdrop-filter: blur(40px);
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

export default AgeCalculator;