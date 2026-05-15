'use client';

import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import Link from 'next/link';
import { FaImage, FaCopy, FaCheck, FaRedo, FaShieldAlt, FaTerminal, FaCode, FaExchangeAlt, FaDatabase } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';

const ImageToBase64: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [base64, setBase64] = useState<string>('');
    const [imageInfo, setImageInfo] = useState({
        name: '-',
        size: '-',
        dimensions: '-',
        mimeType: '-',
        overhead: '0%',
    });
    const [copySuccess, setCopySuccess] = useState(false);
    const base64OutputRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const selectedFile = acceptedFiles[0];
        if (selectedFile && selectedFile.type.match('image.*')) {
            if (selectedFile.size > 5 * 1024 * 1024) {
                alert('Buffer Limit Reached: File exceeds 5MB threshold.');
                return;
            }
            handleFileSelect(selectedFile);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: true });

    const handleFileSelect = (selectedFile: File) => {
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                setImageInfo({
                    name: selectedFile.name,
                    size: formatFileSize(selectedFile.size),
                    dimensions: `${img.width} × ${img.height}px`,
                    mimeType: selectedFile.type,
                    overhead: '+33.3%',
                });
            };
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleConvert = () => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => setBase64(e.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handleCopy = () => {
        if (!base64) return;
        navigator.clipboard.writeText(base64).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };

    const handleReset = () => {
        setFile(null);
        setBase64('');
        setImageInfo({ name: '-', size: '-', dimensions: '-', mimeType: '-', overhead: '0%' });
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / 1048576).toFixed(1)} MB`;
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans text-glow-none">
            <title>Binary Asset Encoder | Ecotrustia Solutions</title>
            <meta name="description" content="Synthesize binary visual assets into high-performance Base64 encoded strings. Professional encoding protocol for inline CSS/HTML integration." />

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
                        Binary <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Encoder</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Enforce high-precision Base64 mapping for visual data streams and architectural asset embedding."
                    </p>
                </div>
            </section>

            {/* ─── Workbench Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-[1400px] w-full mx-auto">
                    
                    <div className="glass-workbench shadow-2xl border border-white/10 overflow-hidden flex flex-col lg:flex-row" style={{ borderRadius: '48px', marginBottom: '40px' }}>
                        
                        {/* Input Phase (Left 5) */}
                        <div className="w-full lg:w-5/12 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col bg-white/[0.01]">
                            <div style={{ padding: '80px 64px 40px 64px' }}>
                                <div className="flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Source Induction</span>
                                </div>
                            </div>
                            
                            <div className="flex-1 flex flex-col gap-8" style={{ padding: '0 64px 64px 64px' }}>
                                <div 
                                    {...getRootProps()}
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`upload-zone relative group bg-[#0c0c0c] border border-white/10 rounded-[32px] overflow-hidden ${isDragActive ? 'zone-active' : ''}`}
                                >
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.05),transparent_60%)] pointer-events-none"></div>
                                    <input {...getInputProps()} ref={fileInputRef} onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])} className="hidden" />
                                    <div className="flex flex-col items-center justify-center p-12 text-center h-[280px] relative z-10">
                                        <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                                            <FaImage className="text-2xl text-purple-400" />
                                        </div>
                                        <h4 className="text-lg font-black uppercase tracking-widest text-white mb-2">Inject Matrix</h4>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-loose">Drop asset for mapping</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { label: 'Density', val: imageInfo.size },
                                        { label: 'Dimension', val: imageInfo.dimensions },
                                        { label: 'Protocol', val: imageInfo.mimeType.split('/')[1] || '-' },
                                        { label: 'Overhead', val: imageInfo.overhead, color: 'text-purple-400' }
                                    ].map((m, i) => (
                                        <div key={i} className="rounded-[24px] bg-purple-500/5 border border-purple-500/10 flex flex-col gap-2" style={{ padding: '24px 24px 24px 32px' }}>
                                            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-500">{m.label}</span>
                                            <span className={`text-xs font-black uppercase tracking-widest truncate ${m.color || 'text-white'}`}>{m.val}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto pt-6 border-t border-white/5 flex gap-4">
                                    <button onClick={handleReset} className="w-16 h-16 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/20 text-gray-500 hover:text-red-400 transition-all backdrop-blur-md">
                                        <FaRedo className="text-sm" />
                                    </button>
                                    <button 
                                        onClick={handleConvert}
                                        disabled={!file}
                                        className="flex-1 h-16 rounded-[24px] bg-white text-black hover:bg-purple-500 hover:text-white transition-all font-black text-[9px] uppercase tracking-wider flex items-center justify-center gap-2 group shadow-xl hover:shadow-[0_20px_40px_-10px_rgba(168,85,247,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black px-4 overflow-hidden"
                                    >
                                        <FaExchangeAlt className="text-sm shrink-0 group-hover:rotate-180 transition-transform duration-700" />
                                        <span className="truncate">Synthesize Encoding</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Output Phase (Right 7) */}
                        <div className="w-full lg:w-7/12 flex flex-col">
                            <div style={{ padding: '80px 64px 40px 64px' }} className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <FaDatabase className="text-sm text-purple-400" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Binary Stream (Base64)</span>
                                </div>
                                <button 
                                    onClick={handleCopy}
                                    className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 ${copySuccess ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-white/5 text-purple-400 hover:bg-white/10 border border-white/5'}`}
                                >
                                    {copySuccess ? <FaCheck className="text-[10px]" /> : <FaCopy className="text-[10px]" />}
                                    {copySuccess ? 'Locked' : 'Copy Hash'}
                                </button>
                            </div>

                            <div className="flex-1" style={{ padding: '0 64px 64px 64px' }}>
                                <div className="relative h-full min-h-[500px] bg-[#0c0c0c] border border-white/10 rounded-[32px] overflow-hidden flex flex-col group">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.03),transparent_70%)] pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-50"></div>
                                    <div className="relative z-10 flex-1 w-full h-full flex flex-col" style={{ padding: '48px 32px 48px 48px' }}>
                                        <textarea 
                                            ref={base64OutputRef}
                                            value={base64}
                                            readOnly
                                            placeholder="Awaiting asset synthesis..."
                                            className="w-full flex-1 bg-transparent text-[11px] md:text-xs font-mono leading-relaxed text-gray-400 outline-none resize-none scroll-thin overflow-y-auto break-all selection:bg-purple-500/30 pr-4"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="h-[120px]"></div>

                    {/* Pro Capability Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '200px' }}>
                        <div className="mini-card group flex flex-col gap-6" style={{ borderRadius: '32px', paddingLeft: '48px' }}>
                            <FaCode className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">Full CSS Sync</h5>
                            <p className="text-[11px] text-gray-400 leading-relaxed italic font-sans">Embed visual assets directly into CSS background-image properties for zero-request loading.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-6" style={{ borderRadius: '32px', paddingLeft: '48px' }}>
                            <FaTerminal className="block text-indigo-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">Logic Protocol</h5>
                            <p className="text-[11px] text-gray-400 leading-relaxed italic font-sans">Synthesize complex binary blocks into strings compatible with JSON and NoSQL database logic.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-6" style={{ borderRadius: '32px', paddingLeft: '48px' }}>
                            <FaDatabase className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">Offline Ready</h5>
                            <p className="text-[11px] text-gray-400 leading-relaxed italic font-sans">Store entire visual systems within localized cache streams for high-speed offline access.</p>
                        </div>
                    </div>

                    {/* Encoder Intelligence Section */}
                    <div className="about-workbench-section text-center" style={{ marginBottom: '120px' }}>
                        <h2 className="text-3xl font-black tracking-tight text-white font-sans text-center uppercase tracking-widest text-glow" style={{ marginBottom: '20px' }}>Encoding Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans max-w-4xl mx-auto text-gray-500 border-t border-white/5 pt-12 text-left">
                            <div className="faq-item border-l border-white/10 pl-12">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest leading-loose mt-[2px] text-glow">What is 33% overhead?</h5>
                                <p className="text-sm leading-relaxed">Base64 encoding maps 3 bytes of binary data into 4 ASCII characters. This results in an approximate <strong>33.3% increase</strong> in file size compared to the raw binary asset. Ideal for small icons and essential UI markers.</p>
                            </div>
                            <div className="faq-item border-l border-white/10 pl-12">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest leading-loose mt-[2px] text-glow">Why use Base64?</h5>
                                <p className="text-sm leading-relaxed">By embedding assets inline, you eliminate additional HTTP requests (Round Trip Time). For a high-performance repository, consolidating small assets into the core bundle reduces initial architectural latency.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/image_to_base64" />
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
                .upload-zone {
                    cursor: pointer;
                    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
                }
                .upload-zone:hover, .upload-zone.zone-active {
                    background: rgba(168, 85, 247, 0.03) !important;
                    border-color: rgba(168, 85, 247, 0.3) !important;
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
                /* Custom Scrollbar for Textarea */
                .scroll-thin::-webkit-scrollbar {
                    width: 6px;
                }
                .scroll-thin::-webkit-scrollbar-track {
                    background: transparent;
                }
                .scroll-thin::-webkit-scrollbar-thumb {
                    background: rgba(168, 85, 247, 0.2);
                    border-radius: 10px;
                }
                .scroll-thin::-webkit-scrollbar-thumb:hover {
                    background: rgba(168, 85, 247, 0.4);
                }
            `}</style>
        </div>
    );
};

export default ImageToBase64;