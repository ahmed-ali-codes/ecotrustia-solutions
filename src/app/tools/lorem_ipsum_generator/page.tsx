'use client';
 
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaFileAlt, FaCode, FaBook, FaPencilAlt, FaCopy, FaTrash, FaSyncAlt, FaLayerGroup, FaTerminal, FaCog, FaChevronDown } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';

const LoremIpsumGenerator: React.FC = () => {
    const [amount, setAmount] = useState(5);
    const [type, setType] = useState('paragraphs');
    const [startWith, setStartWith] = useState('lorem');
    const [generatedText, setGeneratedText] = useState('');
    const [copyStatus, setCopyStatus] = useState(false);
    const outputTextareaRef = useRef<HTMLTextAreaElement>(null);

    const loremText = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.",
        "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
        "Consectetur, adipisci velit, sed quia non numquam eius modi tempora.",
        "Ut labore et dolore magnam aliquam quaerat voluptatem.",
        "Quis autem vel eum iure reprehenderit qui in ea voluptate velit.",
    ];

    const generateLorem = () => {
        let result = "";

        if (startWith === "lorem") {
            result = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
        }

        if (type === "paragraphs") {
            for (let i = 0; i < amount; i++) {
                const paragraph = loremText[Math.floor(Math.random() * loremText.length)];
                result += paragraph + " ";
                const extraSentences = Math.floor(Math.random() * 3) + 2;
                for (let j = 0; j < extraSentences; j++) {
                    const extra = loremText[Math.floor(Math.random() * loremText.length)];
                    result += extra + " ";
                }
                result += "\n\n";
            }
        } else if (type === "sentences") {
            for (let i = 0; i < amount; i++) {
                const sentence = loremText[Math.floor(Math.random() * loremText.length)];
                result += sentence + " ";
            }
        } else if (type === "words") {
            const words = ["Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua"];
            for (let i = 0; i < amount; i++) {
                const word = words[Math.floor(Math.random() * words.length)];
                result += word + " ";
            }
        }

        setGeneratedText(result.trim());
    };

    useEffect(() => {
        generateLorem();
    }, []);

    const copyToClipboard = () => {
        if (outputTextareaRef.current && outputTextareaRef.current.value) {
            navigator.clipboard.writeText(outputTextareaRef.current.value);
            setCopyStatus(true);
            setTimeout(() => setCopyStatus(false), 2000);
        }
    };

    const clearText = () => {
        setGeneratedText('');
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans overflow-x-hidden">
            <title>Semantic Placeholder Synthesizer | Ecotrustia Solutions</title>
            <meta name="description" content="Generate professional semantic placeholder text. High-fidelity Lorem Ipsum synthesis for UI/UX prototyping and layout mapping." />

            {/* ─── Hero Section ─── */}
            <section className="relative pt-40 pb-24 px-[5%] overflow-hidden flex flex-col items-center justify-center min-h-[40vh]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(168,85,247,0.1),transparent_70%)] pointer-events-none"></div>

                <div className="relative z-20 w-full max-w-[1400px] mx-auto mb-[20px]">
                    <Link href="/tools" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-purple-400/40 hover:text-purple-400 transition-all group">
                        <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> Back to Workbench
                    </Link>
                </div>

                <div className="relative z-10 max-w-[1400px] w-full mx-auto flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-[-0.05em] leading-[0.9] text-white uppercase text-glow">
                        Placeholder <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Synthesizer</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic opacity-60">
                        "Construct neutral semantic buffers for structural UI/UX mapping and typographic evaluation."
                    </p>
                </div>
            </section>

            {/* ─── Workbench Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-[1400px] w-full mx-auto">

                    <div className="glass-workbench shadow-2xl border border-white/[0.08] overflow-hidden" style={{ borderRadius: '32px', marginBottom: '80px' }}>
                        <div className="grid grid-cols-1 lg:grid-cols-12">

                            {/* Parameters Induction Hub (Left 7) */}
                            <div className="lg:col-span-7 flex flex-col border-b lg:border-b-0 lg:border-r border-white/[0.06]" style={{ padding: 'clamp(24px, 6vw, 64px) clamp(16px, 4vw, 56px)' }}>
                                <div className="flex flex-col flex-1 justify-center gap-12">
                                    
                                    <div className="space-y-6">
                                        <label className="text-[10px] uppercase font-black tracking-[0.4em] text-purple-400/60 ml-2">Magnitude Node</label>
                                        <div 
                                            className="flex items-center gap-8 bg-[#0a0a0a] border border-white/10 rounded-[28px] transition-all focus-within:border-purple-500/50 shadow-inner"
                                            style={{ paddingRight: '40px', paddingLeft: '32px', minHeight: '88px' }}
                                        >
                                            <div className="flex-1 flex items-center gap-4">
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max="50"
                                                    value={amount}
                                                    onChange={(e) => setAmount(parseInt(e.target.value))}
                                                    className="flex-1 h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-purple-500"
                                                />
                                            </div>
                                            <div className="shrink-0 flex flex-col items-end">
                                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Units</span>
                                                <span className="text-2xl font-black text-purple-400">{amount}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <label className="text-[10px] uppercase font-black tracking-[0.4em] text-purple-400/60 ml-2">Vector Type</label>
                                            <div 
                                                className="flex items-center relative bg-[#0a0a0a] border border-white/10 rounded-[28px] transition-all focus-within:border-purple-500/50 shadow-inner"
                                                style={{ paddingRight: '48px', paddingLeft: '24px', height: '88px' }}
                                            >
                                                <select
                                                    value={type}
                                                    onChange={(e) => setType(e.target.value)}
                                                    className="w-full bg-transparent border-none outline-none text-[11px] font-black uppercase tracking-widest text-gray-300 cursor-pointer appearance-none"
                                                >
                                                    <option value="paragraphs" className="bg-[#0c0c0c]">Paragraph Blocks</option>
                                                    <option value="sentences" className="bg-[#0c0c0c]">Sentence Streams</option>
                                                    <option value="words" className="bg-[#0c0c0c]">Word Clusters</option>
                                                </select>
                                                <FaChevronDown className="absolute right-6 text-[10px] text-purple-400/40 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <label className="text-[10px] uppercase font-black tracking-[0.4em] text-purple-400/60 ml-2">Origin Logic</label>
                                            <div 
                                                className="flex items-center relative bg-[#0a0a0a] border border-white/10 rounded-[28px] transition-all focus-within:border-purple-500/50 shadow-inner"
                                                style={{ paddingRight: '48px', paddingLeft: '24px', height: '88px' }}
                                            >
                                                <select
                                                    value={startWith}
                                                    onChange={(e) => setStartWith(e.target.value)}
                                                    className="w-full bg-transparent border-none outline-none text-[11px] font-black uppercase tracking-widest text-gray-300 cursor-pointer appearance-none"
                                                >
                                                    <option value="lorem" className="bg-[#0c0c0c]">Standard Origin</option>
                                                    <option value="random" className="bg-[#0c0c0c]">Randomized Node</option>
                                                </select>
                                                <FaChevronDown className="absolute right-6 text-[10px] text-purple-400/40 pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={generateLorem}
                                        className="w-full py-8 rounded-[32px] bg-purple-600 text-white font-black text-xs uppercase tracking-[0.4em] shadow-2xl shadow-purple-900/40 hover:bg-purple-500 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-4 group mt-4"
                                    >
                                        <FaSyncAlt className="group-hover:rotate-180 transition-transform duration-500" /> 
                                        Re-Initialize Synthesis
                                    </button>
                                </div>
                            </div>

                            {/* Output Terminal Node (Right 5) */}
                            <div className="lg:col-span-5 bg-white/[0.01] flex flex-col relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none"></div>
                                
                                <div className="flex flex-col flex-1 p-8 sm:p-12 relative z-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full bg-purple-500/40"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500/40"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                                        </div>
                                        <span className="text-[9px] font-black text-purple-400/40 tracking-[0.5em] uppercase">Synthesized Buffer</span>
                                    </div>

                                    <div className="flex-1 relative mb-12 min-h-[300px]">
                                        <textarea
                                            ref={outputTextareaRef}
                                            readOnly
                                            value={generatedText}
                                            className="absolute inset-0 w-full h-full bg-transparent font-mono text-[13px] leading-relaxed text-gray-400 outline-none resize-none scroll-custom"
                                            placeholder="Awaiting parameters..."
                                            style={{ paddingLeft: '12px' }}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                                        <button
                                            onClick={copyToClipboard}
                                            className="py-5 rounded-[24px] bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-purple-100 transition-all active:scale-95 shadow-xl"
                                        >
                                            <FaCopy /> {copyStatus ? 'Buffer Locked' : 'Deploy Buffer'}
                                        </button>
                                        <button
                                            onClick={clearText}
                                            className="py-5 rounded-[24px] bg-white/5 border border-white/5 text-gray-500 hover:text-white font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 active:scale-95"
                                        >
                                            <FaTrash /> Purge Node
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Spectral Visualization Overlay */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                         {[
                            { icon: <FaFileAlt />, title: "Structural Mapping", desc: "Construct neutral text buffers for wireframes and prototype structural evaluation." },
                            { icon: <FaCode />, title: "Dev Extraction", desc: "Inject synthesized content into active dev environments before final content sync." },
                            { icon: <FaLayerGroup />, title: "Typographic Hierarchy", desc: "Evaluate container dynamics against varying word and paragraph magnitudes." }
                         ].map((item, i) => (
                            <div key={i} className="group p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-purple-500/20 transition-all">
                                <div className="text-purple-400 text-xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                                <h4 className="text-[10px] font-black uppercase text-white tracking-[0.3em] mb-4">{item.title}</h4>
                                <p className="text-xs text-gray-500 leading-relaxed italic opacity-60">{item.desc}</p>
                            </div>
                         ))}
                    </div>

                    <div className="about-workbench-section" style={{ marginBottom: '120px' }}>
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <h2 className="text-3xl font-black uppercase tracking-widest text-white text-glow mb-6">Synthesis Protocols</h2>
                            <p className="text-gray-500 italic text-sm">"Our synthesizer utilizes a latin-standard randomized array to ensure structural neutrality in the output buffer, preventing semantic bias during UI/UX evaluation."</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: 'Neutrality Node', icon: <FaBook />, desc: 'Ensure UI evaluation is focused strictly on visual structure and spacing.' },
                                { title: 'Phase Drafting', icon: <FaPencilAlt />, desc: 'Accelerate the design-to-dev transition via rapid placeholder mapping.' },
                                { title: 'Matrix Synthesis', icon: <FaCog />, desc: 'Test container dynamics against varying word and paragraph magnitudes.' }
                            ].map((tip, i) => (
                                <div key={i} className="flex flex-col gap-6 p-10 rounded-[40px] bg-[#0a0a0a] border border-white/5 group hover:border-purple-500/20 transition-all text-center">
                                    <div className="text-purple-500/40 text-2xl group-hover:text-purple-400 group-hover:scale-110 transition-all flex justify-center">{tip.icon}</div>
                                    <h4 className="text-[10px] font-black uppercase text-white tracking-[0.4em]">{tip.title}</h4>
                                    <p className="text-[11px] text-gray-500 leading-relaxed italic opacity-50">{tip.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/lorem_ipsum_generator" />
                    </div>
                </div>
            </section>

            <style jsx>{`
                .glass-workbench {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(24px);
                }
                .text-glow {
                    text-shadow: 0 0 30px rgba(168, 85, 247, 0.3);
                }
                .scroll-custom::-webkit-scrollbar {
                    width: 4px;
                }
                .scroll-custom::-webkit-scrollbar-track {
                    background: transparent;
                }
                .scroll-custom::-webkit-scrollbar-thumb {
                    background: rgba(168, 85, 247, 0.2);
                    border-radius: 2px;
                }
            `}</style>
        </div>
    );
};

export default LoremIpsumGenerator;