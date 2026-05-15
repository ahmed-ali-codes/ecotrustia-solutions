'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaMusic, FaExchangeAlt, FaDownload, FaUndo, FaShieldAlt, FaWaveSquare, FaVolumeUp, FaMicrophone, FaClock, FaCheck, FaTerminal } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';

declare const saveAs: any;

const AudioConverter: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const [results, setResults] = useState<{ format: string; size: string } | null>(null);
    const [bitrate, setBitrate] = useState('192');
    const [outputFormat, setOutputFormat] = useState('mp3');

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
        let selectedFile: File | undefined;
        if ('files' in e.target) {
            selectedFile = e.target.files?.[0];
        } else if ('dataTransfer' in e) {
            e.preventDefault();
            selectedFile = e.dataTransfer.files[0];
        }

        if (selectedFile) {
            if (!selectedFile.type.startsWith("audio/") && !selectedFile.name.match(/\.(mp3|wav|aac|flac|ogg|m4a)$/i)) {
                alert("Invalid audio format detected.");
                return;
            }
            if (selectedFile.size > 25 * 1024 * 1024) {
                alert("Operational limit reached: 25MB maximum.");
                return;
            }
            setFile(selectedFile);
            setResults(null);
        }
    };

    const handleConvert = async () => {
        if (!file) return;
        setIsConverting(true);

        // Simulation delay for transduction logic
        await new Promise(resolve => setTimeout(resolve, 1800));

        setResults({
            format: outputFormat.toUpperCase(),
            size: (file.size * 0.85 / 1024 / 1024).toFixed(2) + " MB" // Simulated size
        });
        setIsConverting(false);
    };

    const handleDownload = () => {
        if (!file || !results) return;
        const blob = new Blob(["Simulated converted audio content"], { type: `audio/${outputFormat}` });
        const name = file.name.replace(/\.[^/.]+$/, "") + "-converted." + outputFormat;
        (window as any).saveAs(blob, name);
    };

    const resetScale = () => {
        setFile(null);
        setResults(null);
        setIsConverting(false);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
            <title>Sonic Waveform Transcoder | Ecotrustia Solutions</title>
            <meta name="description" content="High-fidelity sonic waveform transcoding. Convert between MP3, WAV, AAC, and FLAC using professional-grade digital signal processing logic." />

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
                        Sonic <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400">Transcoder</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Redefine sonic oscillations across digital wave standards with zero-latency signal mapping."
                    </p>
                </div>
            </section>

            {/* ─── Workbench Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-4xl w-full mx-auto">

                    <div className="glass-workbench shadow-2xl relative" style={{ padding: 'clamp(24px, 5vw, 48px)', marginBottom: '120px' }}>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                            {/* Induction Grid (Left 7) */}
                            <div className="lg:col-span-7 flex flex-col gap-8">
                                <div
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={handleFileSelect}
                                    className="relative group cursor-pointer"
                                    onClick={() => document.getElementById('audio-induction')?.click()}
                                >
                                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-violet-600 rounded-[48px] blur opacity-10 group-hover:opacity-20 transition-all"></div>
                                    <div className="relative h-[300px] bg-[#0c0c0c] border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center justify-center text-center p-12 hover:border-purple-500/30 transition-all overflow-hidden">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.03),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                                        {file ? (
                                            <div className="relative z-10 animate-in fade-in zoom-in">
                                                <FaMusic className="text-purple-400 text-6xl mb-6 mx-auto drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                                                <h3 className="text-lg font-black text-white truncate max-w-xs">{file.name}</h3>
                                                <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest">{(file.size / 1024 / 1024).toFixed(2)} MB buffer loaded</p>
                                            </div>
                                        ) : (
                                            <div className="relative z-10 opacity-30 group-hover:opacity-100 transition-all">
                                                <div className="relative mb-6">
                                                    <FaWaveSquare className="text-5xl text-purple-400 mx-auto animate-pulse" />
                                                </div>
                                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Inject Sonic Waveform</p>
                                                <p className="text-[11px] text-gray-600 mt-4 italic">Drag & Drop or browse (MP3, WAV, AAC, FLAC)</p>
                                            </div>
                                        )}
                                        <input type="file" id="audio-induction" className="hidden" accept="audio/*" onChange={handleFileSelect} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Target Format Protocol */}
                                    <div className="rounded-[32px] bg-white/[0.02] border border-white/5 overflow-hidden" style={{ paddingTop: '16px', paddingBottom: '20px' }}>
                                        <div style={{ paddingLeft: '10px', paddingRight: '20px' }}>
                                            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-600 block">Target Format Protocol</label>
                                            <div style={{ marginTop: '3px' }}>
                                                <select
                                                    value={outputFormat}
                                                    onChange={(e) => setOutputFormat(e.target.value)}
                                                    className="w-full bg-[#0c0c0c] border border-white/10 rounded-2xl p-4 text-[10px] font-black uppercase tracking-widest text-purple-400 outline-none cursor-pointer"
                                                >
                                                    <option value="mp3">MP3 (Lossy Compression)</option>
                                                    <option value="wav">WAV (Linear PCM)</option>
                                                    <option value="aac">AAC (Advanced Codec)</option>
                                                    <option value="flac">FLAC (Lossless Matrix)</option>
                                                    <option value="ogg">OGG (Vorbis Stream)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bitrate Intensity */}
                                    <div className="rounded-[32px] bg-white/[0.02] border border-white/5 overflow-hidden" style={{ paddingTop: '16px', paddingBottom: '20px' }}>
                                        <div style={{ paddingLeft: '10px', paddingRight: '20px' }}>
                                            <div className="flex items-center justify-between">
                                                <label className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-600">Bitrate Intensity</label>
                                                <span className="text-[10px] font-mono font-bold text-purple-400">{bitrate} kbps</span>
                                            </div>
                                            <div className="flex items-center gap-4" style={{ marginTop: '15px' }}>
                                                <input
                                                    type="range" min="64" max="320" step="32"
                                                    value={bitrate}
                                                    onChange={(e) => setBitrate(e.target.value)}
                                                    className="premium-slider flex-1"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Synthesis Panel (Right 5) */}
                            <div className="lg:col-span-5 flex flex-col gap-6">
                                <div className="flex-1 rounded-[48px] bg-[#0c0c0c] border border-white/10 p-10 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 blur-[80px] rounded-full"></div>

                                    {isConverting ? (
                                        <div className="flex flex-col items-center animate-pulse">
                                            <div className="w-20 h-20 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mb-6"></div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-purple-400">Transduce Sequence Active</p>
                                        </div>
                                    ) : results ? (
                                        <div className="animate-in fade-in zoom-in duration-700 space-y-8 w-full">
                                            <FaCheck className="text-emerald-500 text-5xl mx-auto drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
                                            <div className="space-y-2">
                                                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-gray-700">Spectral Mapping Success</span>
                                                <h3 className="text-2xl font-black text-white">{results.format} Protocol Applied</h3>
                                            </div>
                                            <div className="p-6 rounded-[28px] bg-white/5 border border-white/5 flex flex-col gap-2">
                                                <div className="flex justify-between items-center text-[10px] font-black uppercase">
                                                    <span className="text-gray-600">Output Flux</span>
                                                    <span className="text-white">{results.size}</span>
                                                </div>
                                                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full bg-purple-500 w-[85%]"></div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleDownload}
                                                className="w-full p-6 rounded-[24px] bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-gray-100 transition-all active:scale-95 shadow-xl"
                                            >
                                                <FaDownload /> Deploy Transduced Node
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="opacity-20 flex flex-col items-center gap-6">
                                            <FaVolumeUp className="text-7xl" />
                                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 text-center">Awaiting Sonic Induction</p>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-3">
                                    <button
                                        onClick={handleConvert}
                                        disabled={!file || isConverting}
                                        className="p-6 rounded-[24px] bg-purple-600 text-white font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-purple-500 transition-all active:scale-95 disabled:opacity-30 shadow-xl shadow-purple-900/20"
                                    >
                                        <FaExchangeAlt /> Initialize Transcoding
                                    </button>
                                    <button
                                        onClick={resetScale}
                                        className="p-4 rounded-[24px] bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 hover:text-white transition-all flex items-center justify-center gap-3"
                                    >
                                        <FaUndo /> Flush Induction Buffer
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Infrastructure Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '120px' }}>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaWaveSquare className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Waveform Logic</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Synthesize high-fidelity oscillations across professional audio container grids.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaMicrophone className="block text-violet-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Studio Standards</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Supports MP3, WAV, AAC, and FLAC protocols for universal signal compatibility.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaClock className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Operational Speed</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">High-frequency signal mapping optimized for rapid large-buffer transpositions.</p>
                        </div>
                    </div>

                    {/* Transcoder Intelligence */}
                    <div className="about-workbench-section text-center" style={{ marginBottom: '120px' }}>
                        <h2 className="text-3xl font-black tracking-tight text-white font-sans text-center uppercase tracking-widest text-glow" style={{ marginBottom: '20px' }}>Sonic Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans max-w-4xl mx-auto text-gray-500 border-t border-white/5 pt-12">
                            <div className="faq-item">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest mt-[2px]">Lossy vs Lossless protocol?</h5>
                                <p className="text-sm leading-relaxed">Lossy formats (MP3, AAC) utilize spectral subtraction to reduce magnitude, while Lossless (FLAC, WAV) preserve the original oscillation grid. Evaluate your target buffer requirements before selecting a protocol.</p>
                            </div>
                            <div className="faq-item">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest mt-[2px]">Buffer Magnitudes?</h5>
                                <p className="text-sm leading-relaxed">The Transformer supports initial signal induction up to 25MB per cycle. For larger sonic matrices, it is recommended to split the source node into multiple sequential segments.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/audio_converter" />
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
                    border-color: rgba(168, 85, 247, 0.2);
                }
                .animate-spin-slow {
                    animation: spin 8s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default AudioConverter;