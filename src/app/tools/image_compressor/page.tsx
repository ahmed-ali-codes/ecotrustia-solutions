'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaImage, FaCompressAlt, FaDownload, FaRedo, FaSpinner, FaShieldAlt, FaBolt, FaWeightHanging, FaChartLine } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';
import { useImageCompressor } from './useImageCompressor';

const ImageCompressor: React.FC = () => {
    const {
        currentFile,
        previewUrl,
        compressionInfo,
        isCompressing,
        outputFormat,
        quality,
        fileInputRef,
        handleFileSelect,
        handleCompress,
        handleDownload,
        handleReset,
        setOutputFormat,
        setQuality,
        compressedBlob,
    } = useImageCompressor();

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
            <title>Visual Density Protocol | Ecotrustia Solutions</title>
            <meta name="description" content="Optimize visual assets with advanced compression algorithms. Reduce image density without compromising visual fidelity. Real-time browser-side processing." />

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
                        Image <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Compressor</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Decrease visual asset density while maintaining perceptual fidelity for rapid network delivery."
                    </p>
                </div>
            </section>

            {/* ─── Main Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-4xl w-full mx-auto">
                    
                    <div className="glass-workbench" style={{ padding: 'clamp(24px, 5vw, 48px)', marginBottom: '120px' }}>
                        {!currentFile ? (
                            <div 
                                className="upload-zone group"
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('zone-active'); }}
                                onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('zone-active'); }}
                                onDrop={(e) => { e.preventDefault(); e.currentTarget.classList.remove('zone-active'); if(e.dataTransfer.files) handleFileSelect(e.dataTransfer.files[0]); }}
                            >
                                <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])} />
                                <div className="w-20 h-20 rounded-3xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-blue-500/20">
                                    <FaImage className="text-3xl text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Initialize Visual Uplink</h3>
                                <p className="text-gray-500 text-sm font-medium">Drag & drop your source asset or click to browse</p>
                                <span className="mt-4 text-[9px] uppercase tracking-[0.2em] text-gray-600 font-bold">Supported: PNG, JPG, WEBP (Max 15MB)</span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                {/* Preview Block */}
                                <div className="flex flex-col gap-[10px]">
                                    <div className="relative rounded-[32px] overflow-hidden border border-white/10 aspect-square bg-[#0a0a0a] flex items-center justify-center p-4">
                                        {previewUrl ? (
                                            <img src={previewUrl} alt="Source Preview" className="max-w-full max-h-full object-contain rounded-xl" />
                                        ) : (
                                            <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                                        )}
                                        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-widest leading-none">Source Asset View</div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="stat-box">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5 block">Source Size</span>
                                            <span className="text-xl font-black text-white">{compressionInfo.originalSize || 'TBD'}</span>
                                        </div>
                                        {compressedBlob && (
                                            <div className="stat-box animate-pulse" style={{ background: 'rgba(59,130,246,0.06)', borderColor: 'rgba(59,130,246,0.15)' }}>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400/70 mb-1.5 block">Output Size</span>
                                                <span className="text-xl font-black text-blue-400">{compressionInfo.compressedSize}</span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {compressedBlob && (
                                        <div className="stat-box mt-4" style={{ 
                                            background: compressionInfo.isLarger ? 'rgba(239,68,68,0.06)' : 'rgba(34,197,94,0.06)', 
                                            borderColor: compressionInfo.isLarger ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)' 
                                        }}>
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${compressionInfo.isLarger ? 'text-red-500/70' : 'text-green-500/70'} mb-1 block`}>
                                                {compressionInfo.isLarger ? 'Size Increase' : 'Total Shrinkage'}
                                            </span>
                                            <span className={`text-2xl font-black break-words leading-tight ${compressionInfo.isLarger ? 'text-red-400' : 'text-green-400'}`}>
                                                {compressionInfo.savings}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Configuration Block */}
                                <div className="flex flex-col justify-between">
                                    <div className="space-y-10">
                                        <div className="flex flex-col gap-4">
                                            <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500">Output Protocol</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {['auto', 'jpg', 'png', 'webp'].map(fmt => (
                                                    <button 
                                                        key={fmt}
                                                        onClick={() => setOutputFormat(fmt)}
                                                        className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${outputFormat === fmt ? 'bg-blue-600 border-blue-600 text-white shadow-[0_10px_25px_-5px_rgba(37,99,235,0.4)]' : 'bg-white/5 border border-white/10 text-gray-500 hover:border-white/20'}`}
                                                    >
                                                        {fmt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-6">
                                            <div className="flex items-center justify-between">
                                                <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500">Compression Quality</label>
                                                <span className="text-lg font-black text-blue-400">{quality}%</span>
                                            </div>
                                            <input 
                                                type="range" 
                                                min="10" max="100" 
                                                value={quality} 
                                                onChange={(e) => setQuality(parseInt(e.target.value))}
                                                className="premium-slider"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-10 flex flex-col gap-[10px]">
                                        {!compressedBlob ? (
                                            <button 
                                                onClick={handleCompress}
                                                disabled={isCompressing}
                                                className="btn-primary-reveal w-full group"
                                            >
                                                {isCompressing ? <FaSpinner className="animate-spin mr-3" /> : <FaCompressAlt className="mr-3 group-hover:scale-75 transition-transform duration-500" />}
                                                {isCompressing ? 'Calculating Density...' : 'Initialize Compression'}
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={handleDownload}
                                                className="btn-success w-full"
                                            >
                                                <FaDownload className="mr-3" /> Download Resultant Asset
                                            </button>
                                        )}
                                        <button onClick={handleReset} className="w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 hover:text-white transition-all flex items-center justify-center gap-2">
                                            <FaRedo className="text-[8px]" /> Reset Asset Buffer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Infrastructure Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '120px' }}>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaShieldAlt className="block text-blue-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Browser Encapsulation</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Asset processing executes in a localized memory sandbox. Visual sensitive data never transmits to outside nodes.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaChartLine className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Perceptual Integrity</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Intelligent algorithms downsample non-essential visual markers while preserving high-frequency edges.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaBolt className="block text-blue-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Web Performance</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Significantly reduce LCP (Largest Contentful Paint) times for ultra-fast architectural load speeds.</p>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="about-workbench-section text-center" style={{ marginBottom: '120px' }}>
                        <h2 className="text-3xl font-black tracking-tight text-center font-sans" style={{ marginBottom: '20px' }}>Compression Intelligence</h2>
                        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 font-sans">
                            <div className="faq-item">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest mt-[2px]">Does compression affect SEO?</h5>
                                <p className="text-sm text-gray-500 leading-relaxed">Yes, positively. Search engines favor fast-loading repositories. Reducing image density significantly lowers page weight, which directly correlates to higher search rankings and improved user retention.</p>
                            </div>
                            <div className="faq-item">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest mt-[2px]">Why use Auto Format?</h5>
                                <p className="text-sm text-gray-500 leading-relaxed">The Auto-Format protocol preserves your original file extension (e.g., PNG for transparent assets) while aggressively shrinking the internal data density. This ensures maximum compatibility with your existing web architecture.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/image_compressor" />
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
                    border-color: rgba(59, 130, 246, 0.2);
                    background: rgba(255, 255, 255, 0.04);
                }
                .faq-item {
                    border-left: 2px solid rgba(59, 130, 246, 0.2);
                    padding-left: 30px;
                }
                .btn-primary-reveal {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 24px 48px;
                    background: #fff;
                    color: #000;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    transition: all 0.5s;
                    cursor: pointer;
                }
                .btn-primary-reveal:hover:not(:disabled) {
                    background: #3b82f6;
                    color: #fff;
                    transform: scale(1.02);
                    box-shadow: 0 20px 40px -10px rgba(59, 130, 246, 0.4);
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
                .premium-slider::-webkit-slider-thumb:hover {
                    transform: scale(1.2);
                }
            `}</style>
        </div>
    );
};

export default ImageCompressor;