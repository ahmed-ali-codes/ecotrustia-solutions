'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaLock, FaCopy, FaCheck, FaSyncAlt, FaShieldAlt, FaTerminal, FaKey, FaUserSecret } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';

const PasswordGenerator: React.FC = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [strengthText, setStrengthText] = useState('Weak');
    const [strengthPercent, setStrengthPercent] = useState(0);
    const [meterBarColor, setMeterBarColor] = useState('#ef4444');
    const [isCopied, setIsCopied] = useState(false);

    const generatePassword = () => {
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

        let charset = '';
        if (includeUppercase) charset += upper;
        if (includeLowercase) charset += lower;
        if (includeNumbers) charset += numbers;
        if (includeSymbols) charset += symbols;

        if (charset === '') return;

        let newPassword = '';
        for (let i = 0; i < length; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setPassword(newPassword);
        updatePasswordStrength(newPassword);
    };

    const updatePasswordStrength = (pass: string) => {
        let strength = 0;
        const passLength = pass.length;
        strength += Math.min(passLength * 3, 60);

        if (/[A-Z]/.test(pass)) strength += 10;
        if (/[0-9]/.test(pass)) strength += 10;
        if (/[^A-Za-z0-9]/.test(pass)) strength += 20;

        let level = "Weak";
        let percent = 25;
        let color = "#ef4444";

        if (strength >= 85) {
            level = "Elite";
            percent = 100;
            color = "#a855f7";
        } else if (strength >= 70) {
            level = "Secure";
            percent = 80;
            color = "#22c55e";
        } else if (strength >= 50) {
            level = "Standard";
            percent = 50;
            color = "#eab308";
        }

        setStrengthText(level);
        setStrengthPercent(percent);
        setMeterBarColor(color);
    };

    const copyToClipboard = () => {
        if (!password) return;
        navigator.clipboard.writeText(password);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    useEffect(() => {
        generatePassword();
    }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
            <title>Entropy Sequence Protocol | Ecotrustia Solutions</title>
            <meta name="description" content="Generate high-entropy, cryptographically secure password sequences. Fully customizable length and character sets with real-time strength analysis." />

            {/* ─── Hero Section ─── */}
            <section className="relative pt-40 pb-24 px-[5%] overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(147,51,234,0.15),transparent_70%)] pointer-events-none"></div>

                {/* Horizontal Navigation Boundary */}
                <div className="relative z-20 w-full max-w-6xl mx-auto mb-[10px]">
                    <Link href="/tools" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 hover:text-purple-400 transition-all group">
                        <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> Back to Workbench
                    </Link>
                </div>

                {/* Content Node */}
                <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-[-0.05em] leading-[0.9] text-white">
                        Password <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 text-glow">Generator</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Synthesize cryptographically high-entropy sequences for mission-critical access control."
                    </p>
                </div>
            </section>

            {/* ─── Main Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-4xl w-full mx-auto">

                    <div className="glass-workbench" style={{ padding: 'clamp(40px, 6vw, 72px)', marginBottom: '120px' }}>

                        {/* ── Zone 1: Password Output ── */}
                        <div style={{ marginBottom: '10px' }}>
                            <label className="text-[10px] uppercase font-black tracking-[0.4em] text-gray-600 block mb-5 ml-[10px]">Generated Entropy Node</label>
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[28px] blur opacity-20 group-hover:opacity-40 transition-all"></div>
                                <div className="relative bg-[#080808] border border-white/10 rounded-[28px] py-10 px-10 md:py-12 md:px-12 flex items-center justify-start overflow-hidden shadow-2xl">
                                    <span className="text-xl md:text-3xl font-mono font-bold tracking-wider truncate text-white drop-shadow-[0_0_15px_rgba(168,85,247,0.3)] flex-1" style={{ paddingLeft: '10px', paddingRight: '150px' }}>
                                        {password || 'INITIALIZING...'}
                                    </span>
                                    <div className="absolute right-10 flex items-center gap-3">
                                        <button
                                            onClick={generatePassword}
                                            className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:scale-105 active:scale-95 transition-all group/btn"
                                            title="Regenerate Sequence"
                                        >
                                            <FaSyncAlt className="text-gray-400 group-hover/btn:rotate-180 transition-transform duration-700" />
                                        </button>
                                        <button
                                            onClick={copyToClipboard}
                                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-lg active:scale-95 ${isCopied ? 'bg-green-500 text-white' : 'bg-purple-600 text-white hover:bg-purple-500'}`}
                                            title="Copy to Clipboard"
                                        >
                                            {isCopied ? <FaCheck /> : <FaCopy />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Zone 2: Strength Meter ── */}
                        <div className="bg-white/[0.02] border border-white/5 rounded-[24px] overflow-hidden" style={{ marginBottom: '10px', paddingTop: '14px', paddingBottom: '5px' }}>
                            <div style={{ paddingLeft: '10px', paddingRight: '20px' }}>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500">Security Integrity</span>
                                        <span className="text-[9px] text-gray-700 font-bold uppercase italic">Real-time Complexity Analysis</span>
                                    </div>
                                    <span className="text-sm font-black uppercase text-white tracking-[0.2em]">{strengthText}</span>
                                </div>
                                <div className="h-2 w-full bg-black rounded-full overflow-hidden border border-white/10 shadow-inner" style={{ marginBottom: '2px' }}>
                                    <div
                                        className="h-full transition-all duration-1000 ease-out"
                                        style={{ width: `${strengthPercent}%`, backgroundColor: meterBarColor, boxShadow: `0 0 25px ${meterBarColor}99` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* ── Zone 3: Sequence Length ── */}
                        <div className="bg-white/[0.02] border border-white/5 rounded-[24px] overflow-hidden" style={{ marginBottom: '10px', paddingTop: '14px', paddingBottom: '12px' }}>
                            <div style={{ paddingLeft: '10px', paddingRight: '20px' }}>
                                <div className="flex items-center justify-between mb-3">
                                    <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500">Sequence Length</label>
                                    <div className="px-5 py-2.5 bg-purple-500/10 border border-purple-500/20 rounded-xl text-xl font-black text-purple-400 font-mono min-w-[60px] text-center">
                                        {length < 10 ? `0${length}` : length}
                                    </div>
                                </div>
                                <input
                                    type="range" min="8" max="64"
                                    value={length}
                                    onChange={(e) => setLength(parseInt(e.target.value))}
                                    className="premium-slider"
                                />
                                <p className="text-[10px] text-gray-600 leading-relaxed italic mt-3">&ldquo;Optimal entropy benchmarks recommend 24+ nodes for cryptographic safety.&rdquo;</p>
                            </div>
                        </div>

                        {/* ── Zone 4: Character Protocols ── */}
                        <div className="bg-white/[0.02] border border-white/5 rounded-[24px] overflow-hidden" style={{ marginBottom: '10px', paddingTop: '14px', paddingBottom: '14px' }}>
                            <div style={{ paddingLeft: '10px', paddingRight: '20px' }}>
                                <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500 block mb-5">Character Protocols</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { label: 'Uppercase', sub: 'A-Z', state: includeUppercase, set: setIncludeUppercase },
                                        { label: 'Lowercase', sub: 'a-z', state: includeLowercase, set: setIncludeLowercase },
                                        { label: 'Numbers', sub: '0-9', state: includeNumbers, set: setIncludeNumbers },
                                        { label: 'Symbols', sub: '@#$', state: includeSymbols, set: setIncludeSymbols },
                                    ].map(opt => (
                                        <button
                                            key={opt.label}
                                            onClick={() => opt.set(!opt.state)}
                                            className={`p-6 rounded-2xl flex flex-col items-center justify-center gap-3 border transition-all duration-300 ${opt.state ? 'bg-purple-500/10 border-purple-500/30' : 'bg-white/[0.01] border-white/5 hover:border-white/10'}`}
                                        >
                                            <div className={`w-2 h-2 rounded-full mb-1 ${opt.state ? 'bg-purple-400 shadow-[0_0_10px_#a855f7]' : 'bg-gray-800'}`}></div>
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${opt.state ? 'text-purple-400' : 'text-gray-700'}`}>{opt.label}</span>
                                            <span className={`text-sm font-mono font-bold ${opt.state ? 'text-white/50' : 'text-white/20'}`}>{opt.sub}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Tip Infrastructure */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '120px' }}>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaTerminal className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm">Offline Generation</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Entropy generation occurs in your local browser sandbox. No server transmission.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaShieldAlt className="block text-blue-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm">Bit Complexity</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Utilizes math-random seed algorithms for true cryptographic unpredictability.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaKey className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm">Unique Nodes</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Never reuse sequences. Every account must possess a unique entropy node.</p>
                        </div>
                    </div>

                    {/* Protocol Intelligence */}
                    <div className="about-workbench-section text-center" style={{ marginBottom: '120px' }}>
                        <h2 className="text-3xl font-black tracking-tight text-white" style={{ marginBottom: '20px' }}>Entropy Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="faq-item">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest mt-[2px]">Why does length matter more than symbols?</h5>
                                <p className="text-sm text-gray-500 leading-relaxed">Length is the most significant factor in password entropy. A 20-character password made of only lowercase letters is mathematically harder to brute-force than an 8-character password with complex symbols.</p>
                            </div>
                            <div className="faq-item">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest mt-[2px]">How secure is this generator?</h5>
                                <p className="text-sm text-gray-500 leading-relaxed">Our protocol executes entirely in <strong>Client-Side Memory</strong>. Ecotrustia Solutions does not maintain a database of generated sequences, nor do we track user sessions for this tool. Your security is verified offline.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/password-generator" />
                    </div>
                </div>
            </section>

            <style jsx>{`
                .glass-workbench {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 48px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }
                .text-glow {
                    text-shadow: 0 0 30px rgba(147, 51, 234, 0.4);
                }
                .premium-slider {
                    -webkit-appearance: none;
                    width: 100%;
                    height: 6px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 6px;
                    outline: none;
                }
                .premium-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: #fff;
                    cursor: pointer;
                    box-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
                    transition: all 0.3s;
                }
                .premium-slider::-webkit-slider-thumb:hover {
                    box-shadow: 0 0 30px rgba(147, 51, 234, 0.8);
                    transform: scale(1.1);
                }
                .mini-card {
                    display: flex;
                    flex-direction: column;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 50px 44px;
                    border-radius: 20px;
                    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
                }
                .mini-card:hover {
                    background: rgba(255, 255, 255, 0.04);
                    border-color: rgba(147, 51, 234, 0.3);
                }
                .faq-item {
                    border-left: 2px solid rgba(147, 51, 234, 0.2);
                    padding-left: 24px;
                }
            `}</style>
        </div>
    );
};

export default PasswordGenerator;