'use client';

import React from 'react';
import Link from 'next/link';
import { FaClock, FaPlay, FaPause, FaRedo, FaShieldAlt, FaRocket, FaBell, FaTachometerAlt, FaHourglassHalf } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';
import { useCountdownTimer } from './useCountdownTimer';

const CountdownTimer: React.FC = () => {
    const {
        remainingSeconds,
        isRunning,
        startTimer,
        pauseTimer,
        resetTimer,
        formatTime,
        handleInputChange,
    } = useCountdownTimer();

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 font-sans text-glow-none">
            <title>Temporal Decay Terminal | Ecotrustia Solutions</title>
            <meta name="description" content="Precision temporal decay terminal for high-frequency time management. Synchronized countdown protocols for operational excellence." />

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
                        Temporal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Decay</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Synchronize operational windows with high-precision temporal decay protocols."
                    </p>
                </div>
            </section>

            {/* ─── Workbench Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-[1400px] w-full mx-auto">
                    
                    <div className="glass-workbench shadow-2xl border border-white/[0.08] overflow-hidden" style={{ borderRadius: '32px', marginBottom: '40px' }}>
                        <div className="grid grid-cols-1 lg:grid-cols-12">
                            
                            {/* Control Node (Left 5) */}
                            <div className="lg:col-span-5 flex flex-col border-b lg:border-b-0 lg:border-r border-white/[0.06]" style={{ padding: 'clamp(40px, 6vw, 64px) clamp(32px, 5vw, 56px)' }}>
                                <div className="flex flex-col flex-1 gap-8">
                                    <div className="flex flex-col gap-4">
                                        <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500">Initialize Duration</label>
                                        <div className="grid grid-cols-3 gap-4">
                                            {[
                                                { id: 'hours', label: 'HR', max: 99 },
                                                { id: 'minutes', label: 'MIN', max: 59 },
                                                { id: 'seconds', label: 'SEC', max: 59 }
                                            ].map(unit => (
                                                <div key={unit.id} className="relative bg-[#0c0c0c] border border-white/10 rounded-[20px] p-4 flex flex-col items-center justify-center gap-1 transition-all hover:border-blue-500/30">
                                                    <span className="text-[8px] font-black tracking-[0.3em] text-gray-500 uppercase">{unit.label}</span>
                                                    <input 
                                                        type="number" 
                                                        id={unit.id}
                                                        min="0"
                                                        max={unit.max}
                                                        defaultValue={unit.id === 'minutes' ? '10' : '0'}
                                                        onChange={handleInputChange}
                                                        disabled={isRunning}
                                                        className="w-full bg-transparent text-center font-mono font-black text-2xl md:text-3xl text-blue-400 outline-none disabled:opacity-30"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <button 
                                            onClick={isRunning ? pauseTimer : startTimer}
                                            className={`w-full py-4 px-6 rounded-full font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all ${isRunning ? 'bg-white text-black' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:opacity-90 hover:scale-[1.02]'}`}
                                        >
                                            {isRunning ? <FaPause className="text-[10px]" /> : <FaPlay className="text-[10px]" />}
                                            {isRunning ? 'Halt Sequence' : 'Ignite Sequence'}
                                        </button>
                                        <button 
                                            onClick={resetTimer}
                                            className="w-full py-4 px-6 rounded-full bg-[#111111] border border-white/5 font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white/[0.05] transition-all text-gray-400"
                                        >
                                            <FaRedo className="text-[10px]" /> Re-Initialize Buffer
                                        </button>
                                    </div>

                                    <div className="mt-auto py-4 px-6 rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center gap-4">
                                        <FaHourglassHalf className={`text-blue-500/60 text-[10px] ${isRunning ? 'animate-spin-slow' : ''}`} />
                                        <p className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em] leading-none mt-px">Temporal flow localized in client memory</p>
                                    </div>
                                </div>
                            </div>

                            {/* Display Node (Right 7) */}
                            <div className="lg:col-span-7 flex flex-col" style={{ padding: 'clamp(40px, 6vw, 64px) clamp(32px, 5vw, 56px)' }}>
                                <div className="flex flex-col flex-1 gap-6 h-full min-h-[300px]">
                                    <div className="relative flex flex-col flex-1 items-center justify-center text-center rounded-[40px] group overflow-hidden shadow-inner w-full" style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(32px, 5vw, 48px)' }}>
                                        {/* Background Glow */}
                                        <div className={`absolute inset-0 transition-opacity duration-1000 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none ${isRunning ? 'opacity-100' : 'opacity-0'}`}></div>
                                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none"></div>

                                        <div className={`relative z-10 flex flex-col items-center w-full px-4 transition-all duration-700 ${isRunning ? 'scale-105' : 'scale-100'}`}>
                                            <div className={`w-full max-w-full overflow-hidden text-center text-[clamp(40px,6vw,120px)] font-black font-mono tracking-[-0.02em] leading-none ${remainingSeconds <= 0 ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-glow'}`}>
                                                {remainingSeconds <= 0 ? "EXP-00" : formatTime(remainingSeconds)}
                                            </div>
                                            
                                            <div className="mt-8 flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/[0.08] bg-black/50 backdrop-blur-md">
                                                <span className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-blue-500 animate-pulse' : 'bg-blue-500/50'}`}></span>
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mt-px">
                                                    {remainingSeconds <= 0 ? 'Temporal Buffer Exhausted' : isRunning ? 'Decay In Progress' : 'Sequence On Hold'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Scanline Effect */}
                                        <div className={`absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/[0.02] to-transparent h-4 ${isRunning ? 'animate-scanline' : 'hidden'}`}></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Infrastructure Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '200px' }}>
                        {[
                            { icon: FaClock, title: 'Precision Sync', text: 'Utilizes sub-second operational interrupts for high-fidelity temporal tracking.', color: 'text-blue-400' },
                            { icon: FaBell, title: 'Audio Beacon', text: 'Synthesized digital alarm protocol triggers upon buffer exhaustion (00:00:00).', color: 'text-purple-400' },
                            { icon: FaTachometerAlt, title: 'Visual Feedback', text: 'Real-time luminous scale shifts and pulsing indicators provide immediate status clarity.', color: 'text-blue-400' }
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
                        <h2 className="text-3xl font-black tracking-tight text-white font-sans text-center uppercase tracking-widest text-glow" style={{ marginBottom: '60px' }}>Temporal Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans max-w-5xl mx-auto text-left">
                            {[
                                { title: 'Does it run in the background?', text: "Yes. The terminal utilizes the browser's high-precision timing API. While background tabs may face minor throttling, the decay sequence compensates for lost cycles to maintain absolute accuracy." },
                                { title: 'What is buffer exhaustion?', text: "When the temporal counter reaches 00:00:00, the 'Exhaustion' state is triggered. This terminates the decay protocol and initiates the digital notification sequence." }
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
                        <ExploreTools currentPath="/tools/countdown_timer" />
                    </div>
                </div>
            </section>

            <style jsx>{`
                .glass-workbench {
                    background: rgba(10, 10, 10, 0.95);
                    backdrop-filter: blur(40px);
                }
                .text-glow {
                    text-shadow: 0 0 40px rgba(59, 130, 246, 0.3);
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
                .animate-scanline {
                    animation: scanline 8s linear infinite;
                }
                @keyframes scanline {
                    0% { top: 0%; }
                    100% { top: 100%; }
                }
                input[type=number]::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                }
            `}</style>
        </div>
    );
};

export default CountdownTimer;