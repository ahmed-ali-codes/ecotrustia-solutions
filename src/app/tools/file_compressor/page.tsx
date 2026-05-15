'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaFileArchive, FaCompressAlt, FaDownload, FaUndo, FaShieldAlt, FaLayerGroup, FaCheck, FaServer, FaChartBar, FaMicrochip } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';
import { useFileCompressor } from './useFileCompressor';

const FileCompressor: React.FC = () => {
    const {
        originalFile,
        fileName,
        originalFileSize,
        fileType,
        fileContents,
        isCompressing,
        compressionResult,
        fileInputRef,
        uploadAreaRef,
        handleCompress,
        handleDownload,
        handleReset,
    } = useFileCompressor();

    const [intensity, setIntensity] = useState(5);
    const [method, setMethod] = useState('deflate');
    const [format, setFormat] = useState('zip');

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
            <title>Archive Magnitude Condenser | Ecotrustia Solutions</title>
            <meta name="description" content="Professional archive magnitude condensation. Optimize ZIP, RAR, and 7Z archives using advanced redundancy reduction protocols." />

            {/* ─── Hero Section ─── */}
            <section className="relative pt-40 pb-24 px-[5%] overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(147,51,234,0.1),transparent_70%)] pointer-events-none"></div>
                
                {/* Horizontal Navigation Boundary */}
                <div className="relative z-20 w-full max-w-6xl mx-auto mb-[10px]">
                    <Link href="/tools" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 hover:text-purple-400 transition-all group">
                        <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> Back to Workbench
                    </Link>
                </div>

                {/* Perfectly Centered Content Node */}
                <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-[-0.05em] leading-[0.9] text-white uppercase text-glow">
                        Archive <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Condenser</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Condense archive magnitude via deep-layer redundancy reduction and multi-standard vector mapping."
                    </p>
                </div>
            </section>

            {/* ─── Workbench Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-4xl w-full mx-auto">
                    
                    <div className="glass-workbench shadow-2xl relative" style={{ padding: 'clamp(24px, 5vw, 48px)', marginBottom: '120px' }}>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            
                            {/* Archive Induction (Left 7) */}
                            <div className="lg:col-span-7 flex flex-col gap-8">
                                <div 
                                    ref={uploadAreaRef}
                                    onClick={() => fileInputRef.current?.click()}
                                    className="relative group cursor-pointer h-[350px] bg-[#0c0c0c] border-2 border-dashed border-white/5 rounded-[48px] flex flex-col items-center justify-center text-center p-12 hover:border-purple-500/30 transition-all"
                                >
                                    <input type="file" ref={fileInputRef} className="hidden" accept=".zip,.rar,.7z,.tar,.gz" />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.03),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                    
                                    {originalFile ? (
                                        <div className="relative z-10 animate-in fade-in zoom-in">
                                            <FaFileArchive className="text-purple-400 text-6xl mb-6 mx-auto drop-shadow-[0_0_15px_rgba(147,51,234,0.4)]" />
                                            <h3 className="text-lg font-black text-white truncate max-w-sm">{fileName}</h3>
                                            <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest">{originalFileSize} buffer induction ready</p>
                                        </div>
                                    ) : (
                                        <div className="relative z-10 opacity-30 group-hover:opacity-100 transition-all">
                                            <FaFileArchive className="text-6xl text-purple-400 mx-auto mb-6" />
                                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Inject Archive Node</p>
                                            <p className="text-[11px] text-gray-600 mt-4 italic">Supports ZIP, RAR, 7Z, TAR, GZ (Max: 100MB)</p>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="rounded-[32px] bg-white/[0.02] border border-white/5 overflow-hidden" style={{ paddingTop: '16px', paddingBottom: '20px' }}>
                                        <div style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                                            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-600 block">Format</label>
                                            <div style={{ marginTop: '15px' }}>
                                                <select 
                                                    value={format}
                                                    onChange={(e) => setFormat(e.target.value)}
                                                    className="w-full appearance-none bg-[#0c0c0c] border border-white/10 rounded-2xl py-4 text-[9px] font-black uppercase tracking-tighter text-purple-400 outline-none cursor-pointer"
                                                    style={{ paddingLeft: '10px', paddingRight: '35px' }}
                                                >
                                                    <option value="zip">ZIP</option>
                                                    <option value="zipx">ZIPX</option>
                                                    <option value="7z">7Z</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-[32px] bg-white/[0.02] border border-white/5 overflow-hidden" style={{ paddingTop: '16px', paddingBottom: '20px' }}>
                                        <div style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                                            <div className="flex items-center justify-between">
                                                <label className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-600">Intensity</label>
                                                <span className="text-[10px] font-mono font-bold text-purple-400">{intensity}</span>
                                            </div>
                                            <div style={{ marginTop: '15px', paddingLeft: '5px', paddingRight: '5px' }}>
                                                <input 
                                                    type="range" min="1" max="9" 
                                                    value={intensity} 
                                                    onChange={(e) => setIntensity(parseInt(e.target.value))}
                                                    className="premium-slider"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-[32px] bg-white/[0.02] border border-white/5 overflow-hidden" style={{ paddingTop: '16px', paddingBottom: '20px' }}>
                                        <div style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                                            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-600 block">Method</label>
                                            <div style={{ marginTop: '15px' }}>
                                                <select 
                                                    value={method}
                                                    onChange={(e) => setMethod(e.target.value)}
                                                    className="w-full appearance-none bg-[#0c0c0c] border border-white/10 rounded-2xl py-4 text-[9px] font-black uppercase tracking-tighter text-gray-500 outline-none cursor-pointer"
                                                    style={{ paddingLeft: '10px', paddingRight: '35px' }}
                                                >
                                                    <option value="deflate">Standard</option>
                                                    <option value="lzma">Ultra</option>
                                                    <option value="ppmd">Text</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Condensation Station (Right 5) */}
                            <div className="lg:col-span-5 flex flex-col gap-6">
                                <div className="flex-1 rounded-[48px] bg-[#0c0c0c] border border-white/10 p-12 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(147,51,234,0.05),transparent_70%)]"></div>
                                    
                                    {isCompressing ? (
                                        <div className="flex flex-col items-center animate-pulse">
                                            <div className="w-20 h-20 border-t-4 border-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-8"></div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-purple-400">Compression Active</p>
                                        </div>
                                    ) : compressionResult ? (
                                        <div className="w-full space-y-12 animate-in fade-in zoom-in duration-700">
                                            <div className="flex flex-col items-center gap-6">
                                                <div className="relative">
                                                    <div className="absolute -inset-8 bg-emerald-500/10 blur-3xl rounded-full"></div>
                                                    <FaCheck className="text-emerald-500 text-6xl relative z-10" />
                                                </div>
                                                <div className="space-y-2">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-gray-700 block">Compression Successful</span>
                                                    <h4 className="text-2xl font-black text-white">{compressionResult.savings} Saved</h4>
                                                </div>
                                            </div>

                                            <div className="p-8 rounded-[36px] bg-white/[0.02] border border-white/5 space-y-4">
                                                <div className="flex justify-between items-center text-[10px] font-black uppercase">
                                                    <span className="text-gray-600 text-glow-purple">Final File Size</span>
                                                    <span className="text-white">{compressionResult.compressedSize}</span>
                                                </div>
                                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 w-1/2"></div>
                                                </div>
                                            </div>

                                            <button 
                                                onClick={handleDownload}
                                                className="w-full p-6 rounded-[28px] bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-gray-100 transition-all active:scale-95 shadow-xl"
                                            >
                                                <FaDownload /> Download Archive
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="opacity-10 flex flex-col items-center gap-8 group-hover:opacity-20 transition-all">
                                            <FaServer className="text-8xl" />
                                            <p className="text-[10px] font-black uppercase tracking-[0.6em]">Awaiting File Upload</p>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-3">
                                    <button 
                                        onClick={handleCompress}
                                        disabled={!originalFile || isCompressing}
                                        className="p-6 rounded-[24px] bg-purple-600 text-white font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-purple-500 transition-all active:scale-95 disabled:opacity-30 shadow-xl shadow-purple-900/20"
                                    >
                                        <FaCompressAlt /> Start Compression
                                    </button>
                                    <button 
                                        onClick={handleReset}
                                        className="p-4 rounded-[24px] bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-gray-700 hover:text-white transition-all flex items-center justify-center gap-3"
                                    >
                                        <FaUndo /> Clear Workspace
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Infrastructure Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '120px' }}>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaLayerGroup className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Multi-Protocol</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Supports ZIP, RAR, 7Z, and TAR archives for universal magnitude management across platforms.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaMicrochip className="block text-indigo-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Logic Hybrid</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Utilizes advanced Deflate and LZMA condensation protocols for maximum redundancy reduction.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaChartBar className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Efficiency Mapping</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Real-time reporting on magnitude condensation percentages and sectoral savings metrics.</p>
                        </div>
                    </div>

                    {/* Condenser Intelligence */}
                    <div className="about-workbench-section text-center" style={{ marginBottom: '120px' }}>
                        <h2 className="text-3xl font-black tracking-tight text-white font-sans text-center uppercase tracking-widest text-glow" style={{ marginBottom: '20px' }}>Condenser Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans max-w-4xl mx-auto text-gray-500 border-t border-white/5 pt-12">
                            <div className="faq-item">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest leading-loose text-glow mt-[2px]">7Z vs ZIP Architecture?</h5>
                                <p className="text-sm leading-relaxed">The 7Z protocol utilize LZMA compression grids which typically offer 30-70% better condensation than standard ZIP ZIP-deflate protocols. Use 7Z for high-intensity archives and ZIP for universal cross-platform compatibility.</p>
                            </div>
                            <div className="faq-item">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest leading-loose mt-[2px]">Redundancy Constraints?</h5>
                                <p className="text-sm leading-relaxed">Files already compressed (e.g. JPG, MP4) contain minimal logical redundancy and may show near-zero condensation results. The engine is optimized for structural text, code, and raw project assets.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/file_compressor" />
                    </div>
                </div>
            </section>

            <style jsx>{`
                .glass-workbench {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 48px;
                }
                .text-glow {
                    text-shadow: 0 0 30px rgba(147, 51, 234, 0.3);
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
                select {
                    -webkit-appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a855f7' %3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 0.75rem center;
                    background-size: 1rem;
                }
                .premium-slider {
                    -webkit-appearance: none;
                    width: 100%;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 4px;
                    outline: none;
                }
                .premium-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #a855f7;
                    cursor: pointer;
                    box-shadow: 0 0 15px rgba(168, 85, 247, 0.5);
                    transition: all 0.3s;
                }
                .premium-slider::-webkit-slider-thumb:hover {
                    box-shadow: 0 0 25px rgba(168, 85, 247, 0.8);
                    transform: scale(1.1);
                }
            `}</style>
        </div>
    );
};

export default FileCompressor;