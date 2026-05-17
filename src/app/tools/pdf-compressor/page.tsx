'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaFilePdf, FaCompressAlt, FaDownload, FaRedo, FaSpinner, FaShieldAlt, FaBolt, FaWeightHanging, FaChartLine } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';
import usePdfCompressor from './usePdfCompressor';

const PDFCompressor: React.FC = () => {
    const {
        fileName,
        originalSize,
        pageCount,
        compressedSize,
        savings,
        isCompressing,
        showPreview,
        showResult,
        showDownload,
        compressionValue,
        fileInputRef,
        handleFileSelect,
        handleCompress,
        handleDownload,
        handleReset,
        setCompressionValue,
    } = usePdfCompressor();

    const [compressionMethod, setCompressionMethod] = useState('balanced');

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
            <title>PDF Density Protocol | Ecotrustia Solutions</title>
            <meta name="description" content="Reduce PDF file density with high-performance compression algorithms. Optimized for email attachments and rapid data transmission." />

            {/* ─── Hero Section ─── */}
            <section className="relative pt-40 pb-24 px-[5%] overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none"></div>
                
                {/* Horizontal Navigation Boundary */}
                <div className="relative z-20 w-full max-w-6xl mx-auto mb-[10px]">
                    <Link href="/tools" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 hover:text-blue-400 transition-all group">
                        <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> Back to Workbench
                    </Link>
                </div>

                {/* Perfectly Centered Content Node */}
                <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-[-0.05em] leading-[0.9] text-white">
                        PDF <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Compressor</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Reduce document density while maintaining structural integrity for high-speed transmission."
                    </p>
                </div>
            </section>

            {/* ─── Main Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-4xl w-full mx-auto">
                    
                    {!showPreview && !showResult ? (
                        <div className="glass-workbench" style={{ padding: 'clamp(24px, 5vw, 48px)', marginBottom: '120px' }}>
                            <div 
                                className="upload-zone group"
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('zone-active'); }}
                                onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('zone-active'); }}
                                onDrop={(e) => { e.preventDefault(); e.currentTarget.classList.remove('zone-active'); if(e.dataTransfer.files) handleFileSelect(e.dataTransfer.files[0]); }}
                            >
                                <input type="file" ref={fileInputRef} accept=".pdf" className="hidden" onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])} />
                                <div className="w-20 h-20 rounded-3xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-blue-500/20">
                                    <FaFilePdf className="text-3xl text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Initialize Density Uplink</h3>
                                <p className="text-gray-500 text-sm font-medium">Drag & drop your PDF file or click to explore internal storage</p>
                                <span className="mt-4 text-[9px] uppercase tracking-[0.2em] text-gray-600 font-bold">Max Density: 25MB per unit</span>
                            </div>
                        </div>
                    ) : (
                        <div className="glass-workbench" style={{ marginBottom: '120px', padding: 0, borderRadius: '24px' }}>
                            <div style={{ padding: 'clamp(24px, 5vw, 48px)' }}>
                                <div className="flex flex-col gap-10">
                                    {/* ─── File Info Row ─── */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 shrink-0">
                                            <FaFilePdf className="text-xl" />
                                        </div>
                                        <div className="flex flex-col min-w-0 flex-1">
                                            <span className="text-sm font-bold text-gray-200 leading-snug" style={{ wordBreak: 'break-all', overflowWrap: 'anywhere' }}>{fileName}</span>
                                            <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.15em] mt-1">{pageCount} Pages Distributed</span>
                                        </div>
                                    </div>

                                    {/* ─── Stats Row ─── */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="stat-box">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5 block">Source Size</span>
                                            <span className="text-xl font-black text-white">{originalSize}</span>
                                        </div>
                                        <div className="stat-box" style={{ background: 'rgba(59,130,246,0.06)', borderColor: 'rgba(59,130,246,0.15)' }}>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400/70 mb-1.5 block">Target Reduction</span>
                                            <span className="text-xl font-black text-blue-400">-{compressionValue}%</span>
                                        </div>
                                    </div>

                                    {/* ─── Compression Result (conditional) ─── */}
                                    {showResult && (
                                        <div className="stat-box mt-4" style={{ background: 'rgba(34,197,94,0.06)', borderColor: 'rgba(34,197,94,0.15)' }}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-green-500/70 block">Compressed Output</span>
                                                <span className="px-3 py-1 rounded-full text-green-400 font-black text-[9px] uppercase tracking-widest leading-none shrink-0" style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.25)' }}>
                                                    {savings} Shrinkage
                                                </span>
                                            </div>
                                            <span className="text-2xl font-black text-white break-words leading-tight">{compressedSize}</span>
                                        </div>
                                    )}

                                    {/* ─── Divider ─── */}
                                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }}></div>

                                    {/* ─── Compression Mode ─── */}
                                    <div className="flex flex-col gap-4">
                                        <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500 block">Compression Mode</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['balanced', 'aggressive'].map(mode => (
                                                <button 
                                                    key={mode}
                                                    id="compression-method"
                                                    value={mode}
                                                    onClick={() => setCompressionMethod(mode)}
                                                    className={`py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${compressionMethod === mode ? 'bg-blue-600 text-white shadow-[0_10px_25px_-5px_rgba(37,99,235,0.4)] border border-blue-500/50' : 'bg-white/5 border border-white/10 text-gray-500 hover:text-gray-300'}`}
                                                >
                                                    {mode}
                                                </button>
                                            ))}
                                            <select id="compression-method" className="hidden"><option value={compressionMethod}>{compressionMethod}</option></select>
                                        </div>
                                    </div>

                                    {/* ─── Shrinkage Slider ─── */}
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500">Shrinkage Strength</label>
                                            <span className="text-lg font-black text-blue-400">{compressionValue}%</span>
                                        </div>
                                        <input 
                                            type="range" 
                                            min="10" max="90" 
                                            value={compressionValue} 
                                            onChange={(e) => setCompressionValue(parseInt(e.target.value))}
                                            className="premium-slider"
                                        />
                                    </div>

                                    {/* ─── Action Buttons ─── */}
                                    <div className="flex flex-col gap-4 pt-2">
                                        {!showDownload ? (
                                            <button 
                                                onClick={handleCompress}
                                                disabled={isCompressing}
                                                className="btn-primary-reveal w-full group"
                                            >
                                                {isCompressing ? <FaSpinner className="animate-spin mr-3" /> : <FaCompressAlt className="mr-3 group-hover:scale-75 transition-transform duration-500" />}
                                                {isCompressing ? 'Compressing...' : 'Initialize Compression'}
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={handleDownload}
                                                className="btn-success w-full group"
                                            >
                                                <FaDownload className="mr-3" /> 
                                                Download File
                                            </button>
                                        )}
                                        <button 
                                            onClick={handleReset}
                                            className="w-full py-3 text-center text-[10px] uppercase tracking-[0.2em] font-bold text-gray-600 hover:text-white transition-colors flex items-center justify-center gap-2"
                                        >
                                            <FaRedo className="text-[8px]" /> Reset Module
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Technical Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '120px' }}>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaBolt className="block text-blue-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Privacy Sandbox</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Document re-encoding happens in your local RAM buffer. No data transmission to Ecotrustia servers.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaChartLine className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Ratio Optimized</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Intelligent stream parsing identifies redundant object paths to maximize shrinkage without clarity loss.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaWeightHanging className="block text-blue-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Email Compatible</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Shrink enterprise-grade PDFs to meet strict SMTP and platform attachment density limits.</p>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="about-workbench-section text-center" style={{ marginBottom: '120px' }}>
                        <h2 className="text-3xl font-black tracking-tight text-white font-sans" style={{ marginBottom: '20px' }}>Density Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans">
                            <div className="faq-item">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest mt-[2px]">Will I lose visual quality?</h5>
                                <p className="text-sm text-gray-500 leading-relaxed">Most PDFs contain high-resolution assets that exceed human eye perception at standard sizes. Our protocol intelligently reduces these while preserving the <strong>font vectors</strong> and layout schemas.</p>
                            </div>
                            <div className="faq-item">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest mt-[2px]">Can I compress encrypted files?</h5>
                                <p className="text-sm text-gray-500 leading-relaxed">No. For security reasons, encrypted or password-protected PDF structures cannot be accessed by our compression engine. Please decrypt the file before running the protocol.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/pdf-compressor" />
                    </div>
                </div>
            </section>

            <style jsx>{`

                .glass-workbench {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 24px;
                }
                .upload-zone {
                    border: 1px dashed rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    padding: clamp(40px, 8vw, 100px) clamp(20px, 5vw, 50px);
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    cursor: pointer;
                    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
                }
                .upload-zone:hover, .upload-zone.zone-active {
                    background: rgba(59, 130, 246, 0.03);
                    border-color: rgba(59, 130, 246, 0.3);
                }
                .stat-box {
                    padding: 16px;
                    border-radius: 16px;
                    background: rgba(0, 0, 0, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    flex-direction: column;
                    overflow-wrap: anywhere;
                    word-break: break-word;
                    hyphens: auto;
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
                    border-color: rgba(59, 130, 246, 0.2);
                }
                .faq-item {
                    border-left: 2px solid rgba(59, 130, 246, 0.2);
                    padding-left: 30px;
                }
                .btn-primary-reveal {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px 24px;
                    background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
                    color: #000;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 0.3em;
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                }
                .btn-primary-reveal:hover:not(:disabled) {
                    background: #3b82f6;
                    color: #fff;
                    transform: translateY(-2px);
                    box-shadow: 0 20px 40px -10px rgba(59, 130, 246, 0.5);
                }
                .btn-success {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px 48px;
                    background: #2ecc71;
                    color: #fff;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    transition: all 0.5s;
                    cursor: pointer;
                }
                .premium-slider {
                    -webkit-appearance: none;
                    width: 100%;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 2px;
                    outline: none;
                }
                .premium-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #3b82f6;
                    cursor: pointer;
                    box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
                    transition: all 0.3s;
                }
            `}</style>
        </div>
    );
};

export default PDFCompressor;