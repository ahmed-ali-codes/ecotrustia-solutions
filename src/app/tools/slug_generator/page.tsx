'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaLink, FaCopy, FaCheck, FaRedo, FaSlidersH, FaClipboard, FaMobileAlt, FaMagic } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';

const SlugGenerator: React.FC = () => {
    const [text, setText] = useState('');
    const [slug, setSlug] = useState('your-generated-slug-will-appear-here');
    const [lowercase, setLowercase] = useState(true);
    const [removeStopwords, setRemoveStopwords] = useState(false);
    const [trimSpecial, setTrimSpecial] = useState(true);
    const [copySuccess, setCopySuccess] = useState(false);

    const stopWords = new Set([
        "a", "an", "the", "and", "or", "but", "of", "to", "in", "on", "at",
        "for", "by", "with", "as", "is", "are", "was", "were", "be", "been", "being"
    ]);

    const generateSlug = () => {
        let currentText = text.trim();
        if (!currentText) {
            setSlug("your-generated-slug-will-appear-here");
            return;
        }

        if (lowercase) currentText = currentText.toLowerCase();

        if (trimSpecial) {
            currentText = currentText.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            currentText = currentText.replace(/[^\w\s-]/g, "");
        }

        let generatedSlug = currentText.replace(/_/g, "-").replace(/\s+/g, "-");

        if (removeStopwords) {
            generatedSlug = generatedSlug
                .split("-")
                .filter((word) => !stopWords.has(word))
                .join("-");
        }

        generatedSlug = generatedSlug.replace(/-+/g, "-").replace(/^-+|-+$/g, "");
        setSlug(generatedSlug || "empty-slug");
    };

    useEffect(() => {
        const timer = setTimeout(() => generateSlug(), 200);
        return () => clearTimeout(timer);
    }, [text, lowercase, removeStopwords, trimSpecial]);

    const clearText = () => {
        setText('');
        setSlug("your-generated-slug-will-appear-here");
    };

    const copySlug = () => {
        if (slug !== "your-generated-slug-will-appear-here" && slug !== "empty-slug") {
            navigator.clipboard.writeText(slug).then(() => {
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans text-glow-none">
            <title>Text to Slug Generator | Ecotrustia Solutions</title>
            <meta name="description" content="Convert your text into SEO-friendly URL slugs with our free online tool. Perfect for websites, blogs, and content management systems." />

            {/* ─── Hero Section ─── */}
            <section className="relative pt-40 pb-24 px-[5%] overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(168,85,247,0.15),transparent_70%)] pointer-events-none"></div>

                {/* Horizontal Navigation Boundary */}
                <div className="relative z-20 w-full max-w-6xl mx-auto mb-[10px]">
                    <Link href="/tools" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 hover:text-purple-400 transition-all group">
                        <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> Back to Workbench
                    </Link>
                </div>

                {/* Perfectly Centered Content Node */}
                <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-[-0.05em] leading-[0.9] text-white uppercase text-glow">
                        Slug <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Generator</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Convert your text into SEO-friendly URL slugs. Perfect for websites, blogs, and content management systems."
                    </p>
                </div>
            </section>

            {/* ─── Workbench Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-4xl w-full mx-auto">

                    <div className="glass-workbench shadow-2xl relative" style={{ padding: 'clamp(24px, 5vw, 64px)', marginBottom: '120px', borderRadius: '48px' }}>
                        
                        <div className="flex flex-col gap-10">
                            {/* Input Area */}
                            <div className="flex flex-col gap-4">
                                <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500 ml-8">Source Text</label>
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-[32px] blur opacity-0 group-focus-within:opacity-20 transition-all pointer-events-none"></div>
                                    <div className="relative bg-[#0c0c0c] border border-white/10 rounded-[32px] overflow-hidden group-focus-within:border-purple-500/30 transition-all flex flex-col">
                                        <textarea
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            placeholder="Type or paste your text here to convert to slug..."
                                            className="w-full h-[200px] bg-transparent text-xl leading-relaxed font-medium text-white outline-none resize-none scroll-thin"
                                            style={{ padding: '40px 48px' }}
                                        />
                                        <div className="bg-white/[0.02] border-t border-white/5 flex justify-end items-center" style={{ padding: '16px 32px' }}>
                                            <button 
                                                onClick={clearText} 
                                                className="px-6 py-3 rounded-[16px] bg-white/5 hover:bg-red-500/10 text-gray-500 hover:text-red-400 border border-transparent hover:border-red-500/20 transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shrink-0"
                                            >
                                                <FaRedo /> Clear Text
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Configuration Modules */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <button 
                                    onClick={() => setLowercase(!lowercase)} 
                                    className={`rounded-[32px] border transition-all flex flex-col justify-between items-start gap-6 text-left group overflow-hidden ${lowercase ? 'bg-purple-500/10 border-purple-500/30' : 'bg-[#0c0c0c] border-white/5 hover:border-white/10'}`}
                                    style={{ padding: '32px 32px 32px 40px', minHeight: '140px' }}
                                >
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all shrink-0 ${lowercase ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'bg-white/5 text-transparent'}`}>
                                        <FaCheck className="text-[12px]" />
                                    </div>
                                    <span className={`text-base font-black tracking-wide ${lowercase ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>Convert to lowercase</span>
                                </button>
                                
                                <button 
                                    onClick={() => setRemoveStopwords(!removeStopwords)} 
                                    className={`rounded-[32px] border transition-all flex flex-col justify-between items-start gap-6 text-left group overflow-hidden ${removeStopwords ? 'bg-purple-500/10 border-purple-500/30' : 'bg-[#0c0c0c] border-white/5 hover:border-white/10'}`}
                                    style={{ padding: '32px 32px 32px 40px', minHeight: '140px' }}
                                >
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all shrink-0 ${removeStopwords ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'bg-white/5 text-transparent'}`}>
                                        <FaCheck className="text-[12px]" />
                                    </div>
                                    <span className={`text-base font-black tracking-wide ${removeStopwords ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>Remove stopwords</span>
                                </button>

                                <button 
                                    onClick={() => setTrimSpecial(!trimSpecial)} 
                                    className={`rounded-[32px] border transition-all flex flex-col justify-between items-start gap-6 text-left group overflow-hidden ${trimSpecial ? 'bg-purple-500/10 border-purple-500/30' : 'bg-[#0c0c0c] border-white/5 hover:border-white/10'}`}
                                    style={{ padding: '32px 32px 32px 40px', minHeight: '140px' }}
                                >
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all shrink-0 ${trimSpecial ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'bg-white/5 text-transparent'}`}>
                                        <FaCheck className="text-[12px]" />
                                    </div>
                                    <span className={`text-base font-black tracking-wide ${trimSpecial ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>Remove special chars</span>
                                </button>
                            </div>

                            {/* Output Area */}
                            <div className="flex flex-col gap-4 mt-8">
                                <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500 ml-8">Generated URL Slug</label>
                                <div 
                                    className="relative rounded-[32px] bg-purple-500/5 border border-purple-500/20 flex flex-col md:flex-row items-center justify-between gap-6 group transition-all hover:bg-purple-500/10 hover:border-purple-500/40"
                                    style={{ padding: '24px 24px 24px 48px' }}
                                >
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(168,85,247,0.1),transparent_50%)] pointer-events-none rounded-[32px]"></div>
                                    
                                    <div className="text-xl md:text-2xl font-mono font-black text-white truncate relative z-10 w-full overflow-hidden leading-loose">
                                        {slug}
                                    </div>
                                    
                                    <button 
                                        onClick={copySlug} 
                                        className={`shrink-0 h-20 rounded-[24px] flex items-center justify-center gap-3 transition-all relative z-10 font-black text-[10px] uppercase tracking-widest ${copySuccess ? 'bg-green-500 text-white shadow-[0_0_30px_rgba(34,197,94,0.4)]' : 'bg-white text-black hover:bg-purple-500 hover:text-white shadow-xl hover:shadow-[0_20px_40px_-10px_rgba(168,85,247,0.4)]'}`}
                                        style={{ padding: '0 40px' }}
                                    >
                                        {copySuccess ? <FaCheck className="text-sm shrink-0" /> : <FaCopy className="text-sm shrink-0" />}
                                        <span className="shrink-0">{copySuccess ? 'Slug Copied' : 'Copy Slug'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Infrastructure Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ marginBottom: '120px' }}>
                        <div className="mini-card group flex flex-col gap-6" style={{ borderRadius: '32px', padding: '40px' }}>
                            <FaLink className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">SEO-Friendly</h5>
                            <p className="text-[11px] text-gray-400 leading-relaxed italic font-sans">Create clean, readable URLs that improve search engine rankings and UX.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-6" style={{ borderRadius: '32px', padding: '40px' }}>
                            <FaSlidersH className="block text-indigo-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">Customizable</h5>
                            <p className="text-[11px] text-gray-400 leading-relaxed italic font-sans">Control how your slugs are generated with various real-time formatting options.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-6" style={{ borderRadius: '32px', padding: '40px' }}>
                            <FaClipboard className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">Easy Copy</h5>
                            <p className="text-[11px] text-gray-400 leading-relaxed italic font-sans">Copy generated slugs with one click for rapid deployment in your projects.</p>
                        </div>
                    </div>
                    
                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/slug_generator" />
                    </div>
                </div>
            </section>

            <style jsx>{`
                .glass-workbench {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(40px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
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
                .scroll-thin::-webkit-scrollbar {
                    width: 4px;
                }
                .scroll-thin::-webkit-scrollbar-track {
                    background: transparent;
                }
                .scroll-thin::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
};

export default SlugGenerator;