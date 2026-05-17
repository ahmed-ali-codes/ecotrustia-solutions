'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaPercentage, FaChartLine, FaArrowUp, FaArrowDown, FaCheck, FaShieldAlt, FaTerminal, FaUndo, FaCalculator, FaCopy } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';

const PercentageCalculator: React.FC = () => {
    const [activeTab, setActiveTab] = useState('percentage');
    const [copied, setCopied] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Calculations logic
    const [inputs, setInputs] = useState({
        pX: '15', pY: '200',
        iX: '200', iY: '15',
        dX: '200', dY: '15',
        dfX: '100', dfY: '150'
    });

    const handleInput = (key: string, val: string) => {
        setInputs(prev => ({ ...prev, [key]: val }));
    };

    const getPercentage = () => {
        const x = parseFloat(inputs.pX), y = parseFloat(inputs.pY);
        if (isNaN(x) || isNaN(y)) return { val: '0.00', f: '... wait' };
        const res = (x / 100) * y;
        return { val: res.toFixed(2), f: `${x}% × ${y} = ${res.toFixed(2)}` };
    };

    const getIncrease = () => {
        const x = parseFloat(inputs.iX), y = parseFloat(inputs.iY);
        if (isNaN(x) || isNaN(y)) return { val: '0.00', f: '... wait' };
        const res = x + x * (y / 100);
        return { val: res.toFixed(2), f: `${x} + (${y}% × ${x}) = ${res.toFixed(2)}` };
    };

    const getDecrease = () => {
        const x = parseFloat(inputs.dX), y = parseFloat(inputs.dY);
        if (isNaN(x) || isNaN(y)) return { val: '0.00', f: '... wait' };
        const res = x - x * (y / 100);
        return { val: res.toFixed(2), f: `${x} - (${y}% × ${x}) = ${res.toFixed(2)}` };
    };

    const getDifference = () => {
        const x = parseFloat(inputs.dfX), y = parseFloat(inputs.dfY);
        if (isNaN(x) || isNaN(y) || x === 0) return { val: '0.00%', f: '... wait' };
        const res = ((y - x) / x) * 100;
        return { val: `${Math.abs(res).toFixed(2)}%`, label: res >= 0 ? 'Increase' : 'Decrease', f: `(${y} - ${x}) ÷ ${x} × 100 = ${res.toFixed(2)}%` };
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
            <title>Proportional Delta Engine | Ecotrustia Solutions</title>
            <meta name="description" content="Calculate professional percentage deltas and proportional shifts. High-fidelity arithmetic engine for financial and analytical modeling." />

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
                        Percentage <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Calculator</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Map relative shifts and proportional magnitudes across complex data sets."
                    </p>
                </div>
            </section>

            {/* ─── Workbench Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-[1400px] w-full mx-auto">

                    <div className="glass-workbench shadow-2xl border border-white/[0.08] overflow-hidden" style={{ borderRadius: '32px', marginBottom: '40px' }}>
                        <div className="flex flex-col">

                            {/* Output Node (Top) */}
                            <div className="relative border-b border-white/[0.06] p-8 md:p-16 flex flex-col items-center justify-center text-center overflow-hidden min-h-[350px] bg-[#0c0c0c] group">
                                {/* Background Glow */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.05),transparent_70%)] pointer-events-none"></div>
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none"></div>

                                <div className="relative z-10 w-full flex flex-col items-center">
                                    <div className="flex items-center justify-between w-full max-w-4xl mb-8">
                                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-700">Subject Hash Output</span>

                                        <button
                                            onClick={() => {
                                                const val = activeTab === 'percentage' ? getPercentage().val :
                                                            activeTab === 'increase' ? getIncrease().val :
                                                            activeTab === 'decrease' ? getDecrease().val :
                                                            getDifference().val;
                                                handleCopy(val);
                                            }}
                                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-500/40 transition-all text-purple-400"
                                        >
                                            {copied ? <FaCheck className="text-sm" /> : <FaCopy className="text-sm" />}
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em]">{copied ? 'Copied' : 'Copy'}</span>
                                        </button>
                                    </div>

                                    <div className="flex flex-col items-center gap-2 mb-8 w-full">
                                        <div className="text-[clamp(48px,8vw,120px)] font-black text-white tracking-tighter text-glow animate-in zoom-in duration-700 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                                            {activeTab === 'percentage' && getPercentage().val}
                                            {activeTab === 'increase' && getIncrease().val}
                                            {activeTab === 'decrease' && getDecrease().val}
                                            {activeTab === 'difference' && getDifference().val}
                                        </div>
                                        {activeTab === 'difference' && (
                                            <span className="text-[12px] font-black uppercase tracking-[0.3em] text-purple-400 mt-2">
                                                {getDifference().label}
                                            </span>
                                        )}
                                    </div>

                                    <div className="px-8 py-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
                                        <code className="text-[12px] font-mono font-bold text-purple-400/80">
                                            {activeTab === 'percentage' && getPercentage().f}
                                            {activeTab === 'increase' && getIncrease().f}
                                            {activeTab === 'decrease' && getDecrease().f}
                                            {activeTab === 'difference' && getDifference().f}
                                        </code>
                                    </div>
                                </div>

                                {/* Scanline Effect */}
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/[0.02] to-transparent h-4 animate-scanline"></div>
                            </div>

                            {/* Control Node (Bottom) */}
                            <div className="flex flex-col items-center p-8 md:p-16">
                                <div className="w-full max-w-4xl flex flex-col gap-12">

                                    {/* Tabs */}
                                    <div className="flex flex-wrap justify-center gap-3">
                                        {[
                                            { id: 'percentage', label: 'Basic Ratio', icon: <FaPercentage /> },
                                            { id: 'increase', label: 'Positive Growth', icon: <FaArrowUp /> },
                                            { id: 'decrease', label: 'Negative Delta', icon: <FaArrowDown /> },
                                            { id: 'difference', label: 'Shift Analysis', icon: <FaChartLine /> }
                                        ].map(tab => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`px-8 py-5 rounded-[20px] flex items-center gap-3 transition-all border text-[11px] font-black uppercase tracking-widest ${activeTab === tab.id ? 'bg-purple-600 border-purple-500 text-white shadow-xl shadow-purple-900/20 transform scale-105' : 'bg-white/5 border-white/5 text-gray-500 hover:text-white hover:bg-white/10'}`}
                                            >
                                                <span className="text-lg">{tab.icon}</span>
                                                <span>{tab.label}</span>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Inputs */}
                                    <div className="flex-1 flex justify-center py-8">
                                        {activeTab === 'percentage' && (
                                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center gap-6 text-center">
                                                <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500">Ratio Analysis Protocol</label>
                                                <div className="flex flex-wrap justify-center items-center gap-6 text-3xl md:text-5xl font-black text-white uppercase">
                                                    <span className="text-gray-600 text-xl md:text-2xl mt-2">CALCULATE</span>
                                                    <input type="number" value={inputs.pX} onChange={(e) => handleInput('pX', e.target.value)} className="w-40 bg-[#0c0c0c] border border-white/10 rounded-[24px] p-6 text-center text-purple-400 outline-none focus:border-purple-500/50 transition-all font-mono" />
                                                    <span className="text-gray-600 text-xl md:text-2xl mt-2">% OF</span>
                                                    <input type="number" value={inputs.pY} onChange={(e) => handleInput('pY', e.target.value)} className="w-48 bg-[#0c0c0c] border border-white/10 rounded-[24px] p-6 text-center text-white outline-none focus:border-purple-500/50 transition-all font-mono" />
                                                </div>
                                            </div>
                                        )}
                                        {activeTab === 'increase' && (
                                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center gap-6 text-center">
                                                <label className="text-[10px] uppercase font-black tracking-[0.3em] text-purple-500/60">Expansion Protocol</label>
                                                <div className="flex flex-wrap justify-center items-center gap-6 text-3xl md:text-5xl font-black text-white uppercase">
                                                    <span className="text-gray-600 text-xl md:text-2xl mt-2">SHIFT</span>
                                                    <input type="number" value={inputs.iX} onChange={(e) => handleInput('iX', e.target.value)} className="w-48 bg-[#0c0c0c] border border-white/10 rounded-[24px] p-6 text-center text-white outline-none focus:border-purple-500/50 transition-all font-mono" />
                                                    <span className="text-gray-600 text-xl md:text-2xl mt-2">UP BY</span>
                                                    <input type="number" value={inputs.iY} onChange={(e) => handleInput('iY', e.target.value)} className="w-40 bg-[#0c0c0c] border border-white/10 rounded-[24px] p-6 text-center text-purple-400 outline-none focus:border-purple-500/50 transition-all font-mono" />
                                                    <span className="text-gray-600 text-xl md:text-2xl mt-2">%</span>
                                                </div>
                                            </div>
                                        )}
                                        {activeTab === 'decrease' && (
                                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center gap-6 text-center">
                                                <label className="text-[10px] uppercase font-black tracking-[0.3em] text-blue-500/60">Contraction Protocol</label>
                                                <div className="flex flex-wrap justify-center items-center gap-6 text-3xl md:text-5xl font-black text-white uppercase">
                                                    <span className="text-gray-600 text-xl md:text-2xl mt-2">SHIFT</span>
                                                    <input type="number" value={inputs.dX} onChange={(e) => handleInput('dX', e.target.value)} className="w-48 bg-[#0c0c0c] border border-white/10 rounded-[24px] p-6 text-center text-white outline-none focus:border-purple-500/50 transition-all font-mono" />
                                                    <span className="text-gray-600 text-xl md:text-2xl mt-2">DOWN BY</span>
                                                    <input type="number" value={inputs.dY} onChange={(e) => handleInput('dY', e.target.value)} className="w-40 bg-[#0c0c0c] border border-white/10 rounded-[24px] p-6 text-center text-purple-400 outline-none focus:border-purple-500/50 transition-all font-mono" />
                                                    <span className="text-gray-600 text-xl md:text-2xl mt-2">%</span>
                                                </div>
                                            </div>
                                        )}
                                        {activeTab === 'difference' && (
                                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center gap-6 text-center">
                                                <label className="text-[10px] uppercase font-black tracking-[0.3em] text-purple-500/60">Comparative Delta Protocol</label>
                                                <div className="flex flex-wrap justify-center items-center gap-6 text-3xl md:text-5xl font-black text-white uppercase">
                                                    <span className="text-gray-600 text-xl md:text-2xl mt-2">DELTA FROM</span>
                                                    <input type="number" value={inputs.dfX} onChange={(e) => handleInput('dfX', e.target.value)} className="w-48 bg-[#0c0c0c] border border-white/10 rounded-[24px] p-6 text-center text-white outline-none focus:border-purple-500/50 transition-all font-mono" />
                                                    <span className="text-gray-600 text-xl md:text-2xl mt-2">TO</span>
                                                    <input type="number" value={inputs.dfY} onChange={(e) => handleInput('dfY', e.target.value)} className="w-48 bg-[#0c0c0c] border border-white/10 rounded-[24px] p-6 text-center text-purple-400 outline-none focus:border-purple-500/50 transition-all font-mono" />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Info Box */}
                                    <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center justify-center md:justify-start gap-4 text-purple-400/40">
                                                <FaTerminal className="text-[10px]" />
                                                <span className="text-[9px] font-black uppercase tracking-[0.2em]">Live Arithmetic Sync Active</span>
                                            </div>
                                            <p className="text-[11px] text-gray-500 italic leading-relaxed">Engine automatically re-maps proportional deltas as frequency nodes shift in the input buffer.</p>
                                        </div>
                                        <div className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/[0.08] bg-black/50 whitespace-nowrap">
                                            <FaCheck className="text-purple-500/40 text-xs" />
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 mt-px">Protocol Passed</span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Infrastructure Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '120px' }}>
                        <div className="mini-card group flex flex-col gap-8">
                            <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:border-purple-500/30 transition-all">
                                <FaCalculator className="text-xl text-purple-400 group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h5 className="font-black text-xs uppercase tracking-[0.3em] text-white">Delta Precision</h5>
                                <p className="text-[11px] text-gray-500 leading-relaxed italic font-sans">Utilizes 64-bit floating point arithmetic for sub-percentage coordinate accuracy.</p>
                            </div>
                        </div>
                        <div className="mini-card group flex flex-col gap-8">
                            <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:border-blue-500/30 transition-all">
                                <FaChartLine className="text-xl text-blue-400 group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h5 className="font-black text-xs uppercase tracking-[0.3em] text-white">Growth Modeling</h5>
                                <p className="text-[11px] text-gray-500 leading-relaxed italic font-sans">Construct complex expansion or contraction models for financial asset analysis.</p>
                            </div>
                        </div>
                        <div className="mini-card group flex flex-col gap-8">
                            <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:border-purple-500/30 transition-all">
                                <FaUndo className="text-xl text-purple-400 group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <h5 className="font-black text-xs uppercase tracking-[0.3em] text-white">Live Synthesis</h5>
                                <p className="text-[11px] text-gray-500 leading-relaxed italic font-sans">Immediate re-calculation of the proportional matrix as input buffers are modified.</p>
                            </div>
                        </div>
                    </div>

                    {/* Intelligence Section */}
                    <div className="about-workbench-section text-center" style={{ marginBottom: '120px' }}>
                        <h2 className="text-3xl font-black tracking-tight text-white font-sans text-center uppercase tracking-widest text-glow" style={{ marginBottom: '60px' }}>Delta Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans max-w-5xl mx-auto text-left">
                            <div className="rounded-[32px] bg-white/[0.01] border border-white/5 flex flex-col gap-6" style={{ padding: '40px 48px' }}>
                                <div className="flex items-center gap-4">
                                    <FaShieldAlt className="text-purple-500 text-xs" />
                                    <h5 className="font-black text-[10px] uppercase tracking-[0.4em] text-white">Percentage Increase vs Decrease?</h5>
                                </div>
                                <p className="text-sm leading-relaxed text-gray-500">Percentage Increase adds a relative portion to a base magnitude, while Decrease subtracts it. The Proportional Delta Engine handles both by calculating the relative shift base-10 and applying it to the origin coordinate.</p>
                            </div>
                            <div className="rounded-[32px] bg-white/[0.01] border border-white/5 flex flex-col gap-6" style={{ padding: '40px 48px' }}>
                                <div className="flex items-center gap-4">
                                    <FaShieldAlt className="text-purple-500 text-xs" />
                                    <h5 className="font-black text-[10px] uppercase tracking-[0.4em] text-white">What is Shift Analysis?</h5>
                                </div>
                                <p className="text-sm leading-relaxed text-gray-500">Shift analysis identifies the relative magnitude difference between two separate numerical nodes. It represents the percentage change relative to the initial origin node, commonly used in market analytics.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/percentage-calculator" />
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

export default PercentageCalculator;