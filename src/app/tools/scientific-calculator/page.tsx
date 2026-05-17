'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaCalculator, FaShieldAlt, FaTerminal, FaDivide, FaPlus, FaMinus, FaTimes, FaUndo, FaBackspace, FaSuperscript, FaPercentage } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';
import { useCalculator } from './useCalculator';

const Calculator: React.FC = () => {
    const {
        calculator,
        inputDigit,
        inputDecimal,
        handleOperator,
        resetCalculator,
        handleEqual,
        handleScientific,
        handleBackspace,
    } = useCalculator();

    const [showScientific, setShowScientific] = useState(true);

    const handleButtonClick = (value: string) => {
        switch (value) {
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
            case '^':
                handleOperator(value);
                break;
            case '.':
                inputDecimal(value);
                break;
            case 'AC':
                resetCalculator();
                break;
            case '=':
                handleEqual();
                break;
            case 'DEL':
                handleBackspace();
                break;
            default:
                inputDigit(value);
                break;
        }
    };

    /* ── Scientific function buttons ── */
    const scientificKeys = [
        { val: 'sin', label: 'sin' },
        { val: 'cos', label: 'cos' },
        { val: 'tan', label: 'tan' },
        { val: 'log', label: 'log' },
        { val: 'ln', label: 'ln' },
        { val: 'sqrt', label: '√' },
        { val: 'x2', label: 'x²' },
        { val: 'x3', label: 'x³' },
        { val: 'cbrt', label: '³√' },
        { val: '1/x', label: '1/x' },
        { val: 'abs', label: '|x|' },
        { val: 'fact', label: 'n!' },
        { val: 'pi', label: 'π' },
        { val: 'e', label: 'e' },
        { val: '+-', label: '±' },
        { val: '%', label: '%' },
    ];

    /* ── Standard keypad ── */
    const standardKeys = [
        { val: 'AC', type: 'special' }, { val: 'DEL', type: 'special' }, { val: '^', type: 'operator', label: 'xⁿ' }, { val: '/', type: 'operator', icon: <FaDivide className="text-sm" /> },
        { val: '7', type: 'num' }, { val: '8', type: 'num' }, { val: '9', type: 'num' }, { val: '*', type: 'operator', icon: <FaTimes className="text-sm" /> },
        { val: '4', type: 'num' }, { val: '5', type: 'num' }, { val: '6', type: 'num' }, { val: '-', type: 'operator', icon: <FaMinus className="text-sm" /> },
        { val: '1', type: 'num' }, { val: '2', type: 'num' }, { val: '3', type: 'num' }, { val: '+', type: 'operator', icon: <FaPlus className="text-sm" /> },
        { val: '0', type: 'num', span: 2 }, { val: '.', type: 'num' }, { val: '=', type: 'equal' },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
            <title>Scientific Calculator | Ecotrustia Solutions</title>
            <meta name="description" content="High-precision arithmetic logic engine with scientific functions. Perform complex calculations with trigonometric, logarithmic, and algebraic operations." />

            {/* ─── Hero Section ─── */}
            <section className="relative pt-40 pb-24 px-[5%] overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none"></div>
                
                <div className="relative z-20 w-full max-w-[1400px] mx-auto mb-[10px]">
                    <Link href="/tools" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 hover:text-blue-400 transition-all group">
                        <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> Back to Workbench
                    </Link>
                </div>

                <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-[-0.05em] leading-[0.9] text-white uppercase text-glow">
                        Scientific <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Calculator</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Execute high-order operational logic via our synchronized arithmetic processing node."
                    </p>
                </div>
            </section>

            {/* ─── Workbench Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-[1400px] w-full mx-auto">
                    
                    <div className="glass-workbench shadow-2xl border border-white/[0.08] overflow-hidden" style={{ borderRadius: '32px', marginBottom: '40px' }}>
                        <div className="grid grid-cols-1 lg:grid-cols-12">
                            
                            {/* Scientific Functions Panel (Left 5) */}
                            <div className="lg:col-span-5 flex flex-col border-b lg:border-b-0 lg:border-r border-white/[0.06]" style={{ padding: 'clamp(40px, 6vw, 64px) clamp(32px, 5vw, 56px)' }}>
                                <div className="flex flex-col flex-1 gap-6">
                                    
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] uppercase font-black tracking-[0.35em] text-gray-500">Scientific Functions</label>
                                        <button 
                                            onClick={() => setShowScientific(!showScientific)}
                                            className="text-[9px] uppercase font-black tracking-[0.2em] text-blue-400/60 hover:text-blue-400 transition-all px-3 py-1 rounded-full border border-white/[0.06]"
                                        >
                                            {showScientific ? 'Collapse' : 'Expand'}
                                        </button>
                                    </div>

                                    {showScientific && (
                                        <div className="grid grid-cols-4 gap-2">
                                            {scientificKeys.map((key, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleScientific(key.val)}
                                                    className="sci-btn h-12 rounded-[14px] flex items-center justify-center font-black text-[11px] transition-all active:scale-90 bg-white/[0.03] text-gray-300 border border-white/[0.06] hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/20"
                                                >
                                                    {key.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Info Box */}
                                    <div className="mt-auto rounded-[20px] border border-white/[0.06] flex flex-col gap-3" style={{ background: 'rgba(255,255,255,0.015)', padding: '20px 24px' }}>
                                        <div className="flex items-center gap-3">
                                            <FaSuperscript className="text-blue-500/70 text-[10px]" />
                                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-500/80">Trig Mode: Degrees</span>
                                        </div>
                                        <p className="text-[11px] text-gray-500 italic leading-[1.7]">Trigonometric functions accept input in degrees. Use π and e constants for advanced calculations.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Calculator Display + Keypad (Right 7) */}
                            <div className="lg:col-span-7 flex flex-col" style={{ padding: 'clamp(40px, 6vw, 64px) clamp(32px, 5vw, 56px)' }}>
                                <div className="flex flex-col flex-1 gap-6">

                                    {/* Display Screen */}
                                    <div className="display-screen w-full rounded-[24px]" style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', boxSizing: 'border-box' }}>
                                        {/* Header bar */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px 8px 28px' }}>
                                            <div style={{ display: 'flex', gap: '6px' }}>
                                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(59,130,246,0.3)' }}></div>
                                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(147,51,234,0.3)' }}></div>
                                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                                            </div>
                                            <span style={{ fontSize: 9, fontWeight: 900, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Compute Stream</span>
                                        </div>
                                        {/* History line */}
                                        <div style={{ padding: '0 28px', textAlign: 'right', minHeight: 20 }}>
                                            <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em' }}>{calculator.history || '\u00A0'}</span>
                                        </div>
                                        {/* Main display value */}
                                        <div style={{ padding: '4px 28px 24px 28px', textAlign: 'right', overflow: 'hidden', boxSizing: 'border-box' }}>
                                            <span style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, fontFamily: 'monospace', color: 'white', letterSpacing: '-0.02em', lineHeight: 1, display: 'block', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {calculator.displayValue}
                                            </span>
                                        </div>
                                        {/* Bottom accent */}
                                        <div style={{ height: 2, background: 'linear-gradient(to right, #2563eb, #7c3aed)', opacity: 0.5 }}></div>
                                    </div>

                                    {/* Keypad Grid */}
                                    <div className="grid grid-cols-4 gap-3">
                                        {standardKeys.map((key, i) => (
                                            <button 
                                                key={i}
                                                onClick={() => handleButtonClick(key.val)}
                                                className={`
                                                    calc-key flex items-center justify-center font-black text-base md:text-lg transition-all active:scale-90
                                                    ${key.span === 2 ? 'col-span-2' : ''}
                                                    ${key.val === '=' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-900/20 hover:opacity-90' : ''}
                                                    ${key.type === 'num' ? 'bg-white/[0.04] text-gray-200 hover:bg-white/[0.08] hover:text-white border border-white/[0.06]' : ''}
                                                    ${key.type === 'operator' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/15 hover:bg-blue-500/20' : ''}
                                                    ${key.type === 'special' ? 'bg-white/[0.02] text-gray-400 border border-white/[0.06] hover:bg-white/[0.06] hover:text-white' : ''}
                                                `}
                                                style={{ height: 'clamp(52px, 6vw, 68px)', borderRadius: '18px' }}
                                            >
                                                {key.icon || key.label || key.val}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Infrastructure Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '200px' }}>
                        {[
                            { icon: FaCalculator, title: 'Precision Logic', text: 'Perform arithmetic operations with IEEE 754 floating-point coordinate accuracy.', color: 'text-blue-400' },
                            { icon: FaTerminal, title: 'Scientific Engine', text: 'Full trigonometric, logarithmic, and factorial function suite for advanced computation.', color: 'text-purple-400' },
                            { icon: FaUndo, title: 'Buffer Reset', text: 'Flush the operational buffer instantly to re-initialize all computation nodes.', color: 'text-blue-400' }
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
                        <h2 className="text-3xl font-black tracking-tight text-white font-sans text-center uppercase tracking-widest text-glow" style={{ marginBottom: '60px' }}>Arithmetic Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans max-w-5xl mx-auto text-left">
                            {[
                                { title: 'Floating Point Accuracy?', text: "The Arithmetic Core utilizes IEEE 754 standard for floating-point arithmetic. This ensures high-fidelity results for complex decimal operations while maintaining synchronization with JavaScript's V8 engine." },
                                { title: 'Keyboard support?', text: 'Yes. The terminal protocol is mapped to your physical keyboard input buffer. Use number keys for data injection and standard operators for operational commands.' }
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
                        <ExploreTools currentPath="/tools/scientific-calculator" />
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
            `}</style>
        </div>
    );
};

export default Calculator;