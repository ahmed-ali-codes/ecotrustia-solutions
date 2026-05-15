'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaBroom, FaCopy, FaCheck, FaRedo, FaShieldAlt, FaAlignLeft, FaParagraph, FaSpaceShuttle, FaTerminal } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';

const RemoveSpaces: React.FC = () => {
    const [text, setText] = useState('');
    const [removalType, setRemovalType] = useState('all');
    const [copySuccess, setCopySuccess] = useState(false);

    const handleRemoveSpaces = (inputText: string, type: string) => {
        let cleanedText = inputText;
        switch (type) {
            case 'all':
                cleanedText = inputText.replace(/\s+/g, ' ').trim();
                break;
            case 'linebreaks':
                cleanedText = inputText.replace(/(\r\n|\n|\r)+/gm, '\n').trim();
                break;
            case 'leading-trailing':
                cleanedText = inputText.trim();
                break;
            default:
                cleanedText = inputText;
        }
        return cleanedText;
    };

    const onTextChange = (val: string) => {
        setText(val);
    };

    const onTypeChange = (type: string) => {
        setRemovalType(type);
        if (text) {
            const cleaned = handleRemoveSpaces(text, type);
            setText(cleaned);
        }
    };

    const handleClearText = () => setText('');
    const handleCopyText = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };

    const protocols = [
        { id: 'all', label: 'Consolidate All', desc: 'Merge multi-spaces to single' },
        { id: 'linebreaks', label: 'Collapse Breaks', desc: 'Remove redundant empty lines' },
        { id: 'leading-trailing', label: 'Edge Trim', desc: 'Remove start/end buffers' },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
            <title>Buffer Sanitizer Protocol | Ecotrustia Solutions</title>
            <meta name="description" content="Purify textual data streams by removing redundant spatial buffers and line breaks. High-speed regex-based buffer sanitization for professional publishing." />

            {/* ─── Hero Section ─── */}
            <section className="relative pt-40 pb-24 px-[5%] overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(168,85,247,0.1),transparent_70%)] pointer-events-none"></div>
                
                {/* Horizontal Navigation Boundary */}
                <div className="relative z-20 w-full max-w-6xl mx-auto mb-[10px]">
                    <Link href="/tools" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 hover:text-purple-400 transition-all group">
                        <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> Back to Workbench
                    </Link>
                </div>

                {/* Perfectly Centered Content Node */}
                <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-[-0.05em] leading-[0.9] text-white uppercase">
                        Buffer <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 text-glow">Sanitizer</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Neutralize excessive spatial entropy within textual buffers for streamlined data presentation."
                    </p>
                </div>
            </section>

            {/* ─── Workbench Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-[1400px] w-full mx-auto">
                    
                    <div className="glass-workbench shadow-2xl border border-white/10" style={{ borderRadius: '48px', marginBottom: '40px' }}>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                            
                            {/* Terminal Area (Left 7) */}
                            <div className="lg:col-span-7 flex flex-col border-r border-white/5">
                                <div style={{ padding: '80px 64px 40px 64px' }}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Sanitization Input Stream</span>
                                    </div>
                                </div>
                                
                                <div className="flex-1" style={{ padding: '0 64px 64px 64px' }}>
                                    <div className="relative group h-[500px] bg-[#0c0c0c] rounded-[32px] border border-white/5 overflow-hidden" style={{ padding: '48px' }}>
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(168,85,247,0.05),transparent_40%)] pointer-events-none"></div>
                                        <textarea 
                                            value={text}
                                            onChange={(e) => onTextChange(e.target.value)}
                                            placeholder="Inject raw text buffer for spatial sanitization..."
                                            className="w-full h-full bg-transparent border-none text-base md:text-lg leading-relaxed font-medium text-gray-200 outline-none focus:ring-0 transition-all resize-none scroll-thin"
                                            style={{ padding: '0 !important' }}
                                        />
                                        <div className="absolute bottom-10 right-10 flex gap-4">
                                            <button onClick={handleClearText} className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/20 text-gray-500 hover:text-red-400 transition-all backdrop-blur-md">
                                                <FaRedo className="text-sm" />
                                            </button>
                                            <button 
                                                onClick={handleCopyText} 
                                                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all backdrop-blur-md ${copySuccess ? 'bg-green-500 text-white' : 'bg-purple-600 text-white shadow-xl shadow-purple-500/20 hover:scale-105'}`}
                                            >
                                                {copySuccess ? <FaCheck className="text-lg" /> : <FaCopy className="text-lg" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Configuration Area (Right 5) */}
                            <div className="lg:col-span-5 bg-white/[0.01] flex flex-col">
                                <div style={{ padding: '80px 64px 40px 64px' }}>
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Sanitization Protocol</span>
                                </div>
                                
                                <div className="flex-1 overflow-y-auto" style={{ padding: '0 64px 64px 64px' }}>
                                    <div className="flex flex-col gap-6">
                                        {protocols.map(opt => (
                                            <button 
                                                key={opt.id}
                                                onClick={() => onTypeChange(opt.id)}
                                                className={`p-6 rounded-[28px] flex items-center justify-between group transition-all border ${removalType === opt.id ? 'bg-gradient-to-r from-purple-600 to-indigo-600 border-transparent shadow-[0_15px_40px_-10px_rgba(168,85,247,0.3)] scale-[1.02]' : 'bg-white/[0.03] border-white/5 hover:border-white/10'}`}
                                                style={{ paddingLeft: '40px' }}
                                            >
                                                <div className="flex flex-col text-left">
                                                    <span className={`text-sm font-black transition-colors ${removalType === opt.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{opt.label}</span>
                                                    <span className={`text-[9px] uppercase tracking-widest font-black ${removalType === opt.id ? 'text-purple-100/60' : 'text-gray-600'}`}>{opt.desc}</span>
                                                </div>
                                                <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${removalType === opt.id ? 'bg-white border-white text-purple-600 shadow-lg' : 'bg-transparent border-white/10 text-transparent group-hover:border-white/30'}`}>
                                                    <FaCheck className="text-[10px]" />
                                                </div>
                                            </button>
                                        ))}
                                        <div className="p-8 rounded-[32px] bg-purple-500/5 border border-purple-500/10" style={{ paddingLeft: '40px' }}>
                                            <div className="flex items-center gap-4 text-purple-400/60 mb-2">
                                                <FaTerminal className="text-xs animate-pulse" />
                                                <span className="text-[9px] font-black uppercase tracking-widest">Regex Engine Engaged</span>
                                            </div>
                                            <p className="text-[11px] text-gray-500 italic leading-relaxed">System automatically re-maps spatial buffers as stream evolves.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-[120px]"></div>

                    {/* Infrastructure Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '200px' }}>
                        <div className="mini-card group flex flex-col gap-6" style={{ borderRadius: '32px', paddingLeft: '48px' }}>
                            <FaSpaceShuttle className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">High-Speed Purge</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic font-sans">Instant spatial reduction across massive textual matrices using advanced regex pattern matching.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-6" style={{ borderRadius: '32px', paddingLeft: '48px' }}>
                            <FaAlignLeft className="block text-blue-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">Break Consolidation</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic font-sans">Aggressively collapse redundant line breaks to normalize document flow and structural density.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-6" style={{ borderRadius: '32px', paddingLeft: '48px' }}>
                            <FaParagraph className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">Edge Normalization</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic font-sans">Automatically identify and prune invisible leading/trailing character buffers for perfect formatting.</p>
                        </div>
                    </div>

                    {/* Protocol Intelligence Section */}
                    <div className="about-workbench-section text-center" style={{ marginBottom: '120px' }}>
                        <h2 className="text-3xl font-black tracking-tight text-white font-sans text-center uppercase tracking-widest text-glow" style={{ marginBottom: '20px' }}>Sanitization Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans max-w-4xl mx-auto text-gray-500 border-t border-white/5 pt-12">
                            <div className="faq-item border-l border-white/10 pl-12 text-left">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest leading-loose mt-[2px] text-glow">Does it affect alphanumeric data?</h5>
                                <p className="text-sm leading-relaxed">No. The sanitizer protocol targets exclusively non-printing whitespace characters. Your source alphanumeric values, punctuation, and markers remain entirely untouched.</p>
                            </div>
                            <div className="faq-item border-l border-white/10 pl-12 text-left">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest leading-loose mt-[2px] text-glow">When should I use Collapse Breaks?</h5>
                                <p className="text-sm leading-relaxed">Ideal when importing data from PDFs or legacy text documents where erratic line breaks often fragment sentences. This protocol restores the natural structural flow of the text stream.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/remove_spaces" />
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
                    padding: 40px;
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
                .animate-spin-slow {
                    animation: spin 3s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default RemoveSpaces;