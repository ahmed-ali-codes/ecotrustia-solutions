'use client';
 
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaFileAlt, FaCode, FaBook, FaPencilAlt, FaCopy, FaTrash, FaSyncAlt, FaLayerGroup, FaTerminal, FaCog, FaChevronDown, FaShieldAlt, FaBolt, FaLock } from 'react-icons/fa';
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
                        Lorem Ipsum <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Generator</span>
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
                                
                                <div 
                                    className="flex flex-col flex-1 relative z-10"
                                    style={{ padding: 'clamp(32px, 5vw, 48px)' }}
                                >
                                    {/* Chrome Bar — generous vertical spacing from top border */}
                                    <div className="flex items-center justify-between mb-10" style={{ paddingTop: '8px' }}>
                                        <div className="flex gap-2.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-purple-500/40"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500/40"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                                        </div>
                                        <span className="text-[8px] font-black text-purple-400/40 tracking-[0.4em] uppercase truncate ml-4 max-w-[60%] text-right">Synthesized Buffer</span>
                                    </div>

                                    {/* Textarea — aligned with chrome bar, safe horizontal padding */}
                                    <div className="flex-1 relative mb-10 min-h-[280px]">
                                        <textarea
                                            ref={outputTextareaRef}
                                            readOnly
                                            value={generatedText}
                                            className="absolute inset-0 w-full h-full bg-transparent font-mono text-[13px] leading-relaxed text-gray-400 outline-none resize-none scroll-custom"
                                            placeholder="Awaiting parameters..."
                                            style={{ padding: '4px 8px' }}
                                        />
                                    </div>

                                    {/* Action Buttons — symmetrical gap, safe distance from bottom curve */}
                                    <div className="grid grid-cols-2 gap-6 mt-auto" style={{ paddingBottom: '8px', marginTop: '30px' }}>
                                        <button
                                            onClick={copyToClipboard}
                                            className="py-5 rounded-[20px] bg-white text-black font-black text-[9px] uppercase tracking-[0.25em] flex items-center justify-center gap-2.5 hover:bg-purple-100 transition-all active:scale-95 shadow-xl"
                                        >
                                            <FaCopy /> {copyStatus ? 'Locked' : 'Deploy'}
                                        </button>
                                        <button
                                            onClick={clearText}
                                            className="py-5 rounded-[20px] bg-white/5 border border-white/5 text-gray-500 hover:text-white font-black text-[9px] uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2.5 active:scale-95"
                                        >
                                            <FaTrash /> Purge
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Content Section: Benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '120px' }}>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaShieldAlt className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Zero-Server Processing</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">All text generation happens directly in your browser. No data ever leaves your device — complete privacy guaranteed.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaBolt className="block text-blue-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Instant Synthesis</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Generate paragraphs, sentences, or words in milliseconds. High-velocity algorithms produce content without any server latency.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaLock className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Structural Neutrality</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Latin-standard randomized arrays ensure semantically neutral output — perfect for unbiased UI/UX prototyping and layout testing.</p>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="about-workbench-section" style={{ marginBottom: '120px' }}>
                        <h2 className="text-3xl font-black mb-[30px] tracking-tight text-white font-sans text-center uppercase tracking-widest" style={{ marginBottom: '30px' }}>FAQ&apos;s</h2>
                        <div className="space-y-14 max-w-4xl mx-auto text-left">
                            <div className="faq-item">
                                <h5 className="font-bold mb-3 text-white mt-[2px]">What is Lorem Ipsum and why is it used?</h5>
                                <p className="text-sm text-gray-500 leading-relaxed">Lorem Ipsum is a standard placeholder text derived from classical Latin literature. It is used by designers and developers to fill layouts with <strong>semantically neutral content</strong>, allowing them to evaluate typography, spacing, and visual hierarchy without the distraction of meaningful text.</p>
                            </div>
                            <div className="faq-item">
                                <h5 className="font-bold mb-3 text-white mt-[2px]">Is the generated text truly random?</h5>
                                <p className="text-sm text-gray-500 leading-relaxed">Our synthesizer uses a curated array of classical Latin sentences. Each generation randomly selects and combines sentences from this pool, so every output is unique while maintaining the authentic Lorem Ipsum structure.</p>
                            </div>
                            <div className="faq-item">
                                <h5 className="font-bold mb-3 text-white mt-[2px]">Can I generate specific amounts of text?</h5>
                                <p className="text-sm text-gray-500 leading-relaxed">Yes. Use the Magnitude slider to control the volume — from 1 to 50 units. You can also choose between <strong>Paragraph Blocks</strong>, <strong>Sentence Streams</strong>, or <strong>Word Clusters</strong> to match your exact prototyping needs.</p>
                            </div>
                            <div className="faq-item">
                                <h5 className="font-bold mb-3 text-white mt-[2px]">Is my data safe when using this tool?</h5>
                                <p className="text-sm text-gray-500 leading-relaxed">Absolutely. The entire synthesis process runs <strong>client-side</strong> in your browser. No text is transmitted to any server. Your generated content stays entirely on your device.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/lorem-ipsum-generator" />
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
                    border-color: rgba(147, 51, 234, 0.2);
                }
                .faq-item {
                    border-left: 2px solid rgba(147, 51, 234, 0.2);
                    padding: 12px 0 12px 36px;
                    margin-bottom: 10px;
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