'use client';

import React from 'react';
import Link from 'next/link';
import { FaImage, FaExpandArrowsAlt, FaDownload, FaRedo, FaLink, FaUnlink, FaInfoCircle, FaShieldAlt, FaRocket, FaExchangeAlt, FaRulerCombined } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';
import useImageResizer from './useImageResizer';

const ImageResizer: React.FC = () => {
    const {
        originalFile,
        resizedBlob,
        previewUrl,
        originalSize,
        originalDimensions,
        newDimensions,
        format,
        width,
        height,
        aspectRatio,
        outputFormat,
        isResizing,
        fileInputRef,
        handleFileSelect,
        handleWidthChange,
        handleHeightChange,
        handleAspectRatioChange,
        handleFormatChange,
        resizeImage,
        downloadImage,
        reset,
    } = useImageResizer();

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
            <title>Dimensional Matrix Protocol | Ecotrustia Solutions</title>
            <meta name="description" content="High-precision dimensional scaling for visual assets. Rescale image matrices with mathematical accuracy while preserving perceptual fidelity." />

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
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-[-0.05em] leading-[0.9] text-white uppercase">
                        Dimensional <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 text-glow">Matrix</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Re-calculate visual pixel grids with high-fidelity interpolation algorithms."
                    </p>
                </div>
            </section>

            {/* ─── Workbench Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-[1400px] w-full mx-auto">
                    
                    <div className="glass-workbench shadow-2xl border border-white/10 overflow-hidden" style={{ borderRadius: '48px', marginBottom: '40px' }}>
                        {!originalFile ? (
                            <div 
                                className="upload-zone group"
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('zone-active'); }}
                                onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('zone-active'); }}
                                onDrop={(e) => { e.preventDefault(); e.currentTarget.classList.remove('zone-active'); if(e.dataTransfer.files.length) handleFileSelect(e.dataTransfer.files[0]); }}
                            >
                                <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={(e) => e.target.files?.length && handleFileSelect(e.target.files[0])} />
                                <div className="w-24 h-24 rounded-[32px] bg-purple-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
                                    <FaImage className="text-4xl text-purple-400" />
                                </div>
                                <h3 className="text-3xl font-black mb-4 text-white tracking-tight">Initialize Matrix Stream</h3>
                                <p className="text-gray-500 text-base font-medium italic">Inject visual data or scan local drive</p>
                                <span className="mt-8 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-gray-400 font-black">Supported: PNG, JPG, WEBP | Max 10MB</span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                                
                                {/* Metrics & Preview (Left 7) */}
                                <div className="lg:col-span-7 flex flex-col border-r border-white/5">
                                    <div style={{ padding: '80px 64px 40px 64px' }}>
                                        <div className="flex items-center gap-4">
                                            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Projection Viewport</span>
                                        </div>
                                    </div>

                                    <div className="flex-1" style={{ padding: '0 64px 40px 64px' }}>
                                        <div className="relative rounded-[32px] overflow-hidden border border-white/5 bg-[#0c0c0c] flex items-center justify-center group h-[400px]">
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(168,85,247,0.05),transparent_40%)] pointer-events-none"></div>
                                            {previewUrl ? (
                                                <img src={previewUrl} alt="Matrix Projection" className="max-w-full max-h-full object-contain transition-all duration-700 group-hover:scale-[1.02] p-8 relative z-10" />
                                            ) : (
                                                <div className="animate-pulse text-purple-400/60 text-xs font-black uppercase tracking-[0.3em]">Synthesizing...</div>
                                            )}
                                        </div>
                                    </div>

                                    <div style={{ padding: '0 64px 64px 64px' }}>
                                        <div className="p-8 rounded-[32px] bg-purple-500/5 border border-purple-500/10 grid grid-cols-2 md:grid-cols-4 gap-6" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
                                            <div className="metric-box">
                                                <span className="label">Source Dimensions</span>
                                                <span className="value text-white">{originalDimensions}</span>
                                            </div>
                                            <div className="metric-box">
                                                <span className="label">Output Projection</span>
                                                <span className="value text-purple-400">{newDimensions !== '-' ? newDimensions : 'TBD'}</span>
                                            </div>
                                            <div className="metric-box">
                                                <span className="label">Data Density</span>
                                                <span className="value text-white">{originalSize}</span>
                                            </div>
                                            <div className="metric-box">
                                                <span className="label">Source Format</span>
                                                <span className="value lowercase text-gray-400">{format}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Controls (Right 5) */}
                                <div className="lg:col-span-5 bg-white/[0.01] flex flex-col">
                                    <div style={{ padding: '80px 64px 40px 64px' }}>
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Scaling Parameters</span>
                                    </div>

                                    <div className="flex-1 overflow-y-auto" style={{ padding: '0 64px 64px 64px' }}>
                                        <div className="flex flex-col gap-12">
                                            {/* Dimension Grid */}
                                            <div className="space-y-6">
                                                <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-end">
                                                    <div className="space-y-3">
                                                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-4 block">Width (px)</label>
                                                        <input 
                                                            type="number" 
                                                            value={width} 
                                                            onChange={handleWidthChange}
                                                            className="w-full bg-[#0c0c0c] border border-white/10 rounded-2xl h-16 px-4 font-mono font-black text-2xl text-purple-400 outline-none focus:border-purple-500/30 transition-all text-center"
                                                        />
                                                    </div>
                                                    
                                                    <div className="h-16 flex items-center justify-center">
                                                        <button 
                                                            onClick={() => handleAspectRatioChange({ target: { value: aspectRatio === 'yes' ? 'no' : 'yes' } } as any)}
                                                            className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${aspectRatio === 'yes' ? 'bg-purple-600/10 border-purple-500 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'bg-[#050505] border-white/10 text-gray-700 hover:text-white hover:border-white/20'}`}
                                                        >
                                                            {aspectRatio === 'yes' ? <FaLink className="text-sm" /> : <FaUnlink className="text-sm" />}
                                                        </button>
                                                    </div>
                                                    
                                                    <div className="space-y-3">
                                                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-4 block">Height (px)</label>
                                                        <input 
                                                            type="number" 
                                                            value={height} 
                                                            onChange={handleHeightChange}
                                                            className="w-full bg-[#0c0c0c] border border-white/10 rounded-2xl h-16 px-4 font-mono font-black text-2xl text-purple-400 outline-none focus:border-purple-500/30 transition-all text-center"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Format Select */}
                                            <div className="space-y-4">
                                                <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-600 ml-2">Export Protocol</label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {['auto', 'jpeg', 'png', 'webp'].map(fmt => (
                                                        <button 
                                                            key={fmt}
                                                            onClick={() => handleFormatChange({ target: { value: fmt } } as any)}
                                                            className={`p-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all ${outputFormat === fmt ? 'bg-gradient-to-r from-purple-600 to-indigo-600 border-transparent text-white shadow-[0_10px_20px_-5px_rgba(147,51,234,0.3)] scale-[1.02]' : 'bg-white/5 border border-white/5 text-gray-500 hover:border-white/20'}`}
                                                        >
                                                            {fmt}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="pt-8 border-t border-white/5 flex flex-col gap-4 mt-auto">
                                                {resizedBlob ? (
                                                    <div className="flex gap-4">
                                                        <button onClick={reset} className="w-16 h-16 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/20 text-gray-500 hover:text-red-400 transition-all backdrop-blur-md">
                                                            <FaRedo className="text-sm" />
                                                        </button>
                                                        <button 
                                                            onClick={downloadImage}
                                                            className="flex-1 h-16 rounded-2xl flex items-center justify-center gap-3 transition-all backdrop-blur-md bg-green-500 text-white shadow-xl shadow-green-500/20 hover:scale-[1.02] font-black text-[11px] uppercase tracking-widest whitespace-nowrap px-4"
                                                        >
                                                            <FaDownload className="text-sm shrink-0" /> Export Matrix
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button 
                                                        onClick={resizeImage}
                                                        disabled={isResizing}
                                                        className="w-full p-6 rounded-[28px] bg-white text-black hover:bg-purple-500 hover:text-white transition-all font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 group shadow-xl hover:shadow-[0_20px_40px_-10px_rgba(168,85,247,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black"
                                                    >
                                                        {isResizing ? <FaRocket className="animate-bounce mr-3" /> : <FaExpandArrowsAlt className="text-sm group-hover:scale-125 transition-transform duration-500" />}
                                                        {isResizing ? 'Calculating Matrix...' : 'Initialize Rescale'}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="h-[120px]"></div>

                    {/* Pro Capability Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '200px' }}>
                        <div className="mini-card group flex flex-col gap-6" style={{ borderRadius: '32px', paddingLeft: '48px' }}>
                            <FaRulerCombined className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">Exact Scaling</h5>
                            <p className="text-[11px] text-gray-400 leading-relaxed italic font-sans">Input precise pixel coordinates for professional-grade document alignment.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-6" style={{ borderRadius: '32px', paddingLeft: '48px' }}>
                            <FaExchangeAlt className="block text-indigo-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">Aspect Lock</h5>
                            <p className="text-[11px] text-gray-400 leading-relaxed italic font-sans">Maintain structural integrity by automatically locking vertical and horizontal ratios.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-6" style={{ borderRadius: '32px', paddingLeft: '48px' }}>
                            <FaRocket className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">High Fidelity</h5>
                            <p className="text-[11px] text-gray-400 leading-relaxed italic font-sans">Utilizes sub-pixel interpolation to ensure sharpness across all scaling deltas.</p>
                        </div>
                    </div>

                    {/* Protocol Intelligence Section */}
                    <div className="about-workbench-section text-center" style={{ marginBottom: '120px' }}>
                        <h2 className="text-3xl font-black tracking-tight text-white font-sans text-center uppercase tracking-widest text-glow" style={{ marginBottom: '20px' }}>Scaling Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans max-w-4xl mx-auto text-gray-500 border-t border-white/5 pt-12">
                            <div className="faq-item border-l border-white/10 pl-12 text-left">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest leading-loose mt-[2px] text-glow">Does resizing impact quality?</h5>
                                <p className="text-sm leading-relaxed">Downscaling (shrinking) preserves quality by consolidating pixel data. Upscaling (stretching) can introduce interpolation artifacts if the source density is too low. We recommend using 'Auto' format for the best results.</p>
                            </div>
                            <div className="faq-item border-l border-white/10 pl-12 text-left">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest leading-loose mt-[2px] text-glow">What is high-smoothing quality?</h5>
                                <p className="text-sm leading-relaxed">The Dimensional Matrix Protocol uses 'High' smoothing quality in the canvas context, which applies advanced bi-linear or lanczos-like algorithms to ensure crisp edges during the scaling process.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/image_resizer" />
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
                    padding: 160px 40px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    cursor: pointer;
                    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
                }
                .upload-zone:hover, .upload-zone.zone-active {
                    background: rgba(168, 85, 247, 0.03);
                }
                .metric-box {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    overflow-wrap: anywhere;
                    word-break: break-word;
                    hyphens: auto;
                }
                .metric-box .label {
                    text-transform: uppercase;
                    font-size: 8px;
                    font-weight: 900;
                    letter-spacing: 0.2em;
                    color: rgba(255, 255, 255, 0.3);
                }
                .metric-box .value {
                    font-size: 13px;
                    font-weight: 800;
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
            `}</style>
        </div>
    );
};

export default ImageResizer;