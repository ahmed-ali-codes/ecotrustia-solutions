'use client';

import React from 'react';
import Link from 'next/link';
import { FaImage, FaCompressAlt, FaDownload, FaRedo, FaExpand, FaSearchPlus, FaBolt, FaLock, FaMicrochip } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';
import { useClientImageCompressor } from './useClientImageCompressor';

const ClientImageCompressor: React.FC = () => {
    const {
        originalFile,
        compressedBlob,
        quality,
        setQuality,
        width,
        setWidth,
        format,
        setFormat,
        previewUrl,
        originalSize,
        compressedSize,
        reduction,
        dimensions,
        originalFormat,
        fileInputRef,
        compressImage,
        downloadImage,
        reset,
        onFileChange,
        onDragOver,
        onDrop,
        handleFileSelect,
    } = useClientImageCompressor();

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
            <title>Pro Asset Transpiler | Ecotrustia Solutions</title>
            <meta name="description" content="Professional client-side image compression and dimensional scaling. Optimize visual assets for high-performance web deployment without server transmission." />

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
                        Pro Asset <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 text-glow">Transpiler</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "High-precision dimensional scaling and entropy reduction for visual data streams."
                    </p>
                </div>
            </section>

            {/* ─── Main Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-[1400px] w-full mx-auto">
                    
                    <div className="glass-workbench shadow-2xl border border-white/10 overflow-hidden" style={{ borderRadius: '48px', marginBottom: '40px' }}>
                        {!originalFile ? (
                            <div 
                                className="upload-zone group"
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={onDragOver}
                                onDrop={onDrop}
                                onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('zone-active'); }}
                            >
                                <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={onFileChange} />
                                <div className="w-24 h-24 rounded-[32px] bg-purple-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
                                    <FaImage className="text-4xl text-purple-400" />
                                </div>
                                <h3 className="text-3xl font-black mb-4 text-white tracking-tight">Initialize Pro Asset Stream</h3>
                                <p className="text-gray-500 text-base font-medium italic">Inject high-resolution asset or click to scan drive</p>
                                <span className="mt-8 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-gray-400 font-black">Max Density: 10MB | PNG, JPG, WEBP</span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                                
                                {/* Metrics & Preview (Left 7) */}
                                <div className="lg:col-span-7 flex flex-col border-r border-white/5">
                                    <div style={{ padding: '80px 64px 40px 64px' }}>
                                        <div className="flex items-center gap-4">
                                            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Transpiler Viewport</span>
                                        </div>
                                    </div>

                                    <div className="flex-1" style={{ padding: '0 64px 40px 64px' }}>
                                        <div className="relative rounded-[32px] overflow-hidden border border-white/5 bg-[#0c0c0c] flex items-center justify-center group h-[400px]">
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(168,85,247,0.05),transparent_40%)] pointer-events-none"></div>
                                            {previewUrl ? (
                                                <img src={previewUrl} alt="Asset Preview" className="max-w-full max-h-full object-contain transition-all duration-700 group-hover:scale-[1.02] p-8 relative z-10" />
                                            ) : (
                                                <div className="animate-pulse text-purple-400/60 text-xs font-black uppercase tracking-[0.3em]">Calculating Matrix...</div>
                                            )}
                                        </div>
                                    </div>

                                    <div style={{ padding: '0 64px 64px 64px' }}>
                                        <div className="p-8 rounded-[32px] bg-purple-500/5 border border-purple-500/10 grid grid-cols-2 md:grid-cols-4 gap-6" style={{ paddingLeft: '48px', paddingRight: '48px' }}>
                                            <div className="metric-box">
                                                <span className="label">Source Density</span>
                                                <span className="value text-white">{originalSize}</span>
                                            </div>
                                            <div className="metric-box">
                                                <span className="label">Output Projection</span>
                                                <span className="value text-purple-400">{compressedSize !== '-' ? compressedSize : 'Awaiting...'}</span>
                                            </div>
                                            <div className="metric-box">
                                                <span className="label">Dimensional Core</span>
                                                <span className="value text-white">{dimensions}</span>
                                            </div>
                                            <div className="metric-box">
                                                <span className="label">Total Shrinkage</span>
                                                <span className="value text-green-400">{reduction !== '-' ? reduction : '0%'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Controls (Right 5) */}
                                <div className="lg:col-span-5 bg-white/[0.01] flex flex-col">
                                    <div style={{ padding: '80px 64px 40px 64px' }}>
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Compression Parameters</span>
                                    </div>

                                    <div className="flex-1 overflow-y-auto" style={{ padding: '0 64px 64px 64px' }}>
                                        <div className="flex flex-col gap-12">
                                            {/* Quality Slider */}
                                            <div className="space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-400">Entropy Strength</label>
                                                    <span className="text-xl font-black text-purple-400">{quality}%</span>
                                                </div>
                                                <input 
                                                    type="range" min="10" max="100" 
                                                    value={quality} onChange={(e) => setQuality(parseInt(e.target.value))}
                                                    className="premium-slider purple"
                                                />
                                            </div>

                                            {/* Resize Slider */}
                                            <div className="space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-400">Dimensional Scaling</label>
                                                    <span className="text-xl font-black text-indigo-400">{width}px</span>
                                                </div>
                                                <input 
                                                    type="range" min="200" max="2500" 
                                                    value={width} onChange={(e) => setWidth(parseInt(e.target.value))}
                                                    className="premium-slider purple"
                                                />
                                            </div>

                                            {/* Format Select */}
                                            <div className="space-y-4">
                                                <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500 ml-2">Output Encryptor</label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {['auto', 'jpeg', 'png', 'webp'].map(fmt => (
                                                        <button 
                                                            key={fmt}
                                                            onClick={() => setFormat(fmt)}
                                                            className={`p-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all ${format === fmt ? 'bg-gradient-to-r from-purple-600 to-indigo-600 border-transparent text-white shadow-[0_10px_20px_-5px_rgba(147,51,234,0.3)] scale-[1.02]' : 'bg-white/5 border border-white/5 text-gray-500 hover:border-white/20'}`}
                                                        >
                                                            {fmt}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="pt-8 border-t border-white/5 flex flex-col gap-4 mt-auto">
                                                {compressedBlob ? (
                                                    <div className="flex gap-4">
                                                        <button onClick={reset} className="w-14 h-14 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/20 text-gray-500 hover:text-red-400 transition-all backdrop-blur-md">
                                                            <FaRedo className="text-sm" />
                                                        </button>
                                                        <button 
                                                            onClick={downloadImage}
                                                            className="flex-1 h-14 rounded-2xl flex items-center justify-center gap-3 transition-all backdrop-blur-md bg-green-500 text-white shadow-xl shadow-green-500/20 hover:scale-[1.02] font-black text-[10px] uppercase tracking-widest"
                                                        >
                                                            <FaDownload className="text-sm" /> Export Pro Asset
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button 
                                                        onClick={compressImage}
                                                        className="w-full p-6 rounded-[28px] bg-white text-black hover:bg-purple-500 hover:text-white transition-all font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 group shadow-xl hover:shadow-[0_20px_40px_-10px_rgba(168,85,247,0.4)]"
                                                    >
                                                        <FaCompressAlt className="text-sm group-hover:rotate-90 transition-transform duration-500" />
                                                        Initialize Transpilation
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
                            <FaMicrochip className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">Client-Side Core</h5>
                            <p className="text-[11px] text-gray-400 leading-relaxed italic font-sans">Execution is handled exclusively by your hardware. Zero bandwidth loss, zero privacy leakage.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-6" style={{ borderRadius: '32px', paddingLeft: '48px' }}>
                            <FaExpand className="block text-indigo-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">Dynamic Scaling</h5>
                            <p className="text-[11px] text-gray-400 leading-relaxed italic font-sans">Adjust asset dimensions on-the-fly to fit specific responsive breakpoints or UI containers.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-6" style={{ borderRadius: '32px', paddingLeft: '48px' }}>
                            <FaLock className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-black text-xs uppercase tracking-widest text-white">Alpha Channel Sync</h5>
                            <p className="text-[11px] text-gray-400 leading-relaxed italic font-sans">Support for transparent layers in WebP and PNG formats during high-entropy compression.</p>
                        </div>
                    </div>

                    {/* Pro Intelligence Section */}
                    <div className="about-workbench-section text-center" style={{ marginBottom: '120px' }}>
                        <h2 className="text-3xl font-black tracking-tight text-white font-sans text-center uppercase tracking-widest text-glow" style={{ marginBottom: '20px' }}>Transpiler Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans max-w-4xl mx-auto text-gray-500 border-t border-white/5 pt-12">
                            <div className="faq-item border-l border-white/10 pl-12 text-left">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest leading-loose mt-[2px] text-glow">Resizing vs. Compression?</h5>
                                <p className="text-sm leading-relaxed">Resizing changes the actual <strong>pixel count</strong> (Dimensions), while compression reduces the <strong>bit depth</strong> (file weight) of those pixels. For maximum performance, we recommend both.</p>
                            </div>
                            <div className="faq-item border-l border-white/10 pl-12 text-left">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest leading-loose mt-[2px] text-glow">What is high-entropy bit depth?</h5>
                                <p className="text-sm leading-relaxed">It refers to the complexity of the data within the image. High-entropy images (lots of color variation) require more precise compression to avoid "blocking" artifacts.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/client_image_compressor" />
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
                .upload-zone:hover {
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
                .premium-slider.purple {
                    -webkit-appearance: none;
                    width: 100%;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 2px;
                    outline: none;
                }
                .premium-slider.purple::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #a855f7;
                    cursor: pointer;
                    box-shadow: 0 0 15px rgba(168, 85, 247, 0.5);
                    transition: all 0.2s;
                }
                .premium-slider.purple::-webkit-slider-thumb:hover {
                    transform: scale(1.2);
                    box-shadow: 0 0 20px rgba(168, 85, 247, 0.8);
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

export default ClientImageCompressor;