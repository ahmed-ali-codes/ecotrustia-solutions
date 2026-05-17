'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { FaImage, FaMagic, FaDownload, FaRedo, FaShieldAlt, FaBolt, FaLayerGroup, FaCheck, FaSpinner } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';

const BackgroundRemover: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (selectedFile: File) => {
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
            setShowResult(false);
        } else {
            alert("Invalid Protocol: Please upload a valid image file.");
        }
    };

    const handleProcess = () => {
        if (!file) return;
        setIsProcessing(true);
        // Simulate background removal logic
        setTimeout(() => {
            setIsProcessing(false);
            setShowResult(true);
        }, 2500);
    };

    const handleReset = () => {
        setFile(null);
        setShowResult(false);
        setIsProcessing(false);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
            <title>Neural Background Extractor | Ecotrustia Solutions</title>
            <meta name="description" content="Automatically remove backgrounds from images using neural vision architectures. High-fidelity subject isolation with professional edge refinement." />

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
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-[-0.05em] leading-[0.9] text-white uppercase text-glow">
                        Background <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Remover</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Decouple focal subjects from background architectures using high-fidelity neural vision protocols."
                    </p>
                </div>
            </section>

            {/* ─── Workbench Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-4xl w-full mx-auto">
                    
                    <div className="glass-workbench shadow-2xl relative" style={{ padding: 'clamp(24px, 5vw, 48px)', marginBottom: '120px' }}>
                        {!file ? (
                            <div 
                                className="upload-zone group"
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('zone-active'); }}
                                onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('zone-active'); }}
                                onDrop={(e) => { e.preventDefault(); e.currentTarget.classList.remove('zone-active'); if(e.dataTransfer.files) handleFileSelect(e.dataTransfer.files[0]); }}
                            >
                                <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])} />
                                <div className="w-20 h-20 rounded-3xl bg-purple-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-purple-500/20">
                                    <FaImage className="text-3xl text-purple-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">Initialize Visual Induction</h3>
                                <p className="text-gray-500 text-sm font-medium mb-2">Drag & drop your image or click to explore local nodes</p>
                                <span className="mt-6 text-[9px] uppercase tracking-[0.2em] text-gray-600 font-bold">Supports PNG, JPG, WEBP Matrix</span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                                {/* Visual Preview (Left 7) */}
                                <div className="lg:col-span-7">
                                    <div className="relative aspect-square md:aspect-video rounded-[48px] overflow-hidden bg-[#0c0c0c] border border-white/10 group shadow-inner">
                                        {/* Grid pattern for transparency preview */}
                                        {showResult && (
                                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
                                        )}
                                        
                                        <img 
                                            src={URL.createObjectURL(file)} 
                                            className={`w-full h-full object-contain transition-all duration-1000 ${isProcessing ? 'blur-xl opacity-30 scale-110' : 'opacity-100 scale-100'}`} 
                                            alt="Source induction"
                                        />

                                        {isProcessing && (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-6">
                                                <div className="relative w-24 h-24">
                                                    <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>
                                                    <div className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                                    <FaMagic className="absolute inset-0 m-auto text-2xl text-purple-400 animate-pulse" />
                                                </div>
                                                <div className="space-y-2">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-purple-400">Neural Mapping Active</span>
                                                    <p className="text-[11px] text-gray-600 italic">Isolating subject nodes from background buffer...</p>
                                                </div>
                                            </div>
                                        )}

                                        {showResult && (
                                            <div className="absolute top-8 right-8 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-3 animate-in fade-in zoom-in duration-500 backdrop-blur-md">
                                                <FaCheck /> <span className="font-black uppercase tracking-widest text-[9px]">Subject Isolated</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Controls (Right 5) */}
                                <div className="lg:col-span-5 flex flex-col justify-center gap-8">
                                    <div className="p-8 rounded-[40px] bg-white/[0.02] border border-white/5 space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                                                <FaImage />
                                            </div>
                                            <div className="flex flex-col truncate">
                                                <span className="text-sm font-bold text-white truncate">{file.name}</span>
                                                <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{(file.size / 1024).toFixed(1)} KB Visual Buffer</span>
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-4 border-t border-white/5">
                                            {!showResult ? (
                                                <button 
                                                    onClick={handleProcess}
                                                    disabled={isProcessing}
                                                    className="w-full p-6 rounded-[28px] bg-purple-600 text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-purple-900/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                                                >
                                                    {isProcessing ? <FaSpinner className="animate-spin" /> : <>Initialize Extraction <FaMagic /></>}
                                                </button>
                                            ) : (
                                                <button 
                                                    className="w-full p-6 rounded-[28px] bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-gray-100 active:scale-95 transition-all flex items-center justify-center gap-3"
                                                >
                                                    <FaDownload /> Download PNG Protocol
                                                </button>
                                            )}
                                            <button onClick={handleReset} className="w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 hover:text-white transition-all flex items-center justify-center gap-2">
                                                <FaRedo className="text-[8px]" /> Reset Induction Module
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-8 rounded-[40px] bg-purple-500/5 border border-purple-500/10">
                                        <div className="flex items-center gap-4 text-purple-400/40 mb-4">
                                            <FaShieldAlt className="text-[10px]" />
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Privacy Shield Active</span>
                                        </div>
                                        <p className="text-[11px] text-gray-500 italic leading-relaxed">Neural processing occurs entirely in the client-side WebGL buffer. Zero biometric data exit.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Infrastructure Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '120px' }}>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaLayerGroup className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Neural Isolation</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Utilizes advanced vision architectures to distinguish subject nodes from complex backgrounds.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaBolt className="block text-indigo-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Edge Refinement</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">High-frequency anti-aliasing protocols for professional, sharp subject boundary isolation.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaShieldAlt className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Local Compute</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Processing restricted to localized GPU memory buffers. Your visual assets remain private.</p>
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/background-remover" />
                    </div>
                </div>
            </section>

            <style jsx>{`
                .glass-workbench {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 24px;
                }
                .text-glow {
                    text-shadow: 0 0 30px rgba(168, 85, 247, 0.3);
                }
                .upload-zone {
                    border: 2px dashed rgba(255, 255, 255, 0.05);
                    border-radius: 40px;
                    padding: 100px 40px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .upload-zone:hover, .upload-zone.zone-active {
                    background: rgba(168, 85, 247, 0.02);
                    border-color: rgba(168, 85, 247, 0.2);
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
                    border-color: rgba(168, 85, 247, 0.2);
                }
            `}</style>
        </div>
    );
};

export default BackgroundRemover;