'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';
import { useDropzone } from 'react-dropzone';
import { saveAs } from 'file-saver';
import Link from 'next/link';
import { FaVideo, FaExchangeAlt, FaDownload, FaUndo, FaShieldAlt, FaPlay, FaFilm, FaLayerGroup, FaCheck, FaChartLine, FaVectorSquare } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';

const VideoConverter: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [outputUrl, setOutputUrl] = useState<string>('');
    const [convertedVideoBlob, setConvertedVideoBlob] = useState<Blob | null>(null);
    const ffmpegRef = useRef<FFmpeg | null>(null);

    useEffect(() => {
        const initFFmpeg = async () => {
            const { FFmpeg } = await import('@ffmpeg/ffmpeg');
            ffmpegRef.current = new FFmpeg();
        };
        initFFmpeg();
    }, []);

    const onDrop = (acceptedFiles: File[]) => {
        const selectedFile = acceptedFiles[0];
        if (selectedFile) {
            if (selectedFile.size > 100 * 1024 * 1024) {
                alert("Operational limit reached: 100MB maximum.");
                return;
            }
            setFile(selectedFile);
            setOutputUrl('');
            setConvertedVideoBlob(null);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'video/*': ['.mp4', '.avi', '.mov', '.mkv', '.wmv', '.flv'] },
    });

    const loadFFmpeg = async () => {
        const ffmpeg = ffmpegRef.current;
        if (!ffmpeg) return;
        if (!ffmpeg.loaded) {
            ffmpeg.on('progress', ({ progress }) => {
                setProgress(Math.round(progress * 100));
            });
            await ffmpeg.load({
                coreURL: await toBlobURL('/ffmpeg/ffmpeg-core.js', 'text/javascript'),
                wasmURL: await toBlobURL('/ffmpeg/ffmpeg-core.wasm', 'application/wasm'),
            });
        }
    };

    const handleConvert = async () => {
        if (!file || !ffmpegRef.current) return;

        setIsConverting(true);
        setProgress(0);
        setOutputUrl('');
        setConvertedVideoBlob(null);

        try {
            await loadFFmpeg();
            const ffmpeg = ffmpegRef.current;
            if (!ffmpeg) throw new Error("FFmpeg mission failure");

            await ffmpeg.writeFile('input.mp4', new Uint8Array(await file.arrayBuffer()));

            const outputFormat = (document.getElementById('output-format') as HTMLSelectElement).value;
            await ffmpeg.exec(['-i', 'input.mp4', `output.${outputFormat}`]);

            const data = await ffmpeg.readFile(`output.${outputFormat}`);
            const blob = new Blob([(data as any).buffer], { type: `video/${outputFormat}` });
            const url = URL.createObjectURL(blob);
            setOutputUrl(url);
            setConvertedVideoBlob(blob);
        } catch (error) {
            console.error(error);
            alert('Signal interruption during frame transposition.');
        } finally {
            setIsConverting(false);
        }
    };

    const handleDownload = () => {
        if (convertedVideoBlob && file) {
            const outputFormat = (document.getElementById('output-format') as HTMLSelectElement).value;
            const name = file.name.replace(/\.[^/.]+$/, "") + "-converted." + outputFormat;
            saveAs(convertedVideoBlob, name);
        }
    };

    const handleReset = () => {
        setFile(null);
        setOutputUrl('');
        setConvertedVideoBlob(null);
        setProgress(0);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
            <title>Cinematic Frame Transcoder | Ecotrustia Solutions</title>
            <meta name="description" content="Professional cinematic frame transcoding. Transpose video formats between MP4, MOV, and AVI using high-fidelity browser-side FFmpeg protocols." />

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
                        Video <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400">Converter</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Transpose cinematic frame architectures across multi-standard visual grids with high-fidelity mapping."
                    </p>
                </div>
            </section>

            {/* ─── Workbench Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-4xl w-full mx-auto">

                    <div className="glass-workbench shadow-2xl relative" style={{ padding: 'clamp(24px, 5vw, 48px)', marginBottom: '120px' }}>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                            {/* Frame Induction Area (Left 7) */}
                            <div className="lg:col-span-7 flex flex-col gap-8">
                                <div
                                    {...getRootProps()}
                                    className={`relative group cursor-pointer h-[400px] bg-[#0c0c0c] border-2 border-dashed rounded-[48px] flex flex-col items-center justify-center text-center p-12 transition-all ${isDragActive ? 'border-purple-500 bg-purple-500/5' : 'border-white/5 hover:border-purple-500/30'}`}
                                >
                                    <input {...getInputProps()} />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                                    {file ? (
                                        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center animate-in fade-in zoom-in">
                                            <div className="relative w-full aspect-video max-h-[250px] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/5 group-hover:border-purple-500/20 transition-all">
                                                <video src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                                                    <FaPlay className="text-white/60 text-4xl group-hover:scale-125 transition-transform" />
                                                </div>
                                            </div>
                                            <div className="mt-8 space-y-2">
                                                <h3 className="text-sm font-black text-white truncate max-w-sm">{file.name}</h3>
                                                <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest italic">{(file.size / 1024 / 1024).toFixed(2)} MB Matrix Detected</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative z-10 opacity-30 group-hover:opacity-100 transition-all flex flex-col items-center">
                                            <div className="relative mb-6">
                                                <FaFilm className="text-6xl text-purple-400" />
                                                <div className="absolute -inset-4 border border-purple-500/20 rounded-full animate-ping"></div>
                                            </div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">Inject Frame Matrix</p>
                                            <p className="text-[11px] text-gray-600 mt-4 italic">Supports MP4, AVI, MOV, MKV (Max: 100MB)</p>
                                        </div>
                                    )}
                                </div>

                                <div className="rounded-[32px] bg-white/[0.02] border border-white/5 overflow-hidden" style={{ paddingTop: '20px', paddingBottom: '30px' }}>
                                    <div style={{ paddingLeft: '25px', paddingRight: '30px' }}>
                                        <label className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-600 block">Transcoding Protocol</label>
                                        <div style={{ marginTop: '15px' }}>
                                            <select
                                                id="output-format"
                                                className="w-full appearance-none bg-[#0c0c0c] border border-white/10 rounded-2xl py-5 text-[10px] font-black uppercase tracking-widest text-purple-400 outline-none cursor-pointer"
                                                style={{ paddingLeft: '20px' }}
                                            >
                                                <option value="mp4">MP4 (MPEG-4 Part 14)</option>
                                                <option value="webm">WebM (VP9 Protocol)</option>
                                                <option value="mov">MOV (QuickTime Matrix)</option>
                                                <option value="avi">AVI (Universal Interleave)</option>
                                                <option value="mkv">MKV (Matroska Layer)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Synthesis Station (Right 5) */}
                            <div className="lg:col-span-5 flex flex-col gap-6">
                                <div className="flex-1 rounded-[56px] bg-[#0c0c0c] border border-white/10 p-12 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.05),transparent_70%)]"></div>

                                    {isConverting ? (
                                        <div className="w-full space-y-10 animate-in fade-in">
                                            <div className="relative w-32 h-32 mx-auto">
                                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                                    <circle className="text-white/5" strokeWidth="4" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                                                    <circle className="text-purple-500 transition-all duration-300" strokeWidth="4" strokeDasharray={283} strokeDashoffset={283 - (283 * progress) / 100} strokeLinecap="round" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-purple-400">{progress}%</div>
                                            </div>
                                            <div className="space-y-3">
                                                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-purple-400/60 leading-relaxed">Frame Transposition in Depth</p>
                                                <p className="text-[11px] text-gray-700 italic">Mapping cinematic vectors to target container grid...</p>
                                            </div>
                                        </div>
                                    ) : outputUrl ? (
                                        <div className="w-full space-y-10 animate-in zoom-in duration-700">
                                            <div className="flex flex-col items-center gap-6">
                                                <FaCheck className="text-emerald-500 text-6xl drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
                                                <div className="space-y-2">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-gray-700 block">Synthesis Successful</span>
                                                    <h3 className="text-2xl font-black text-white">Grid Re-Mapped</h3>
                                                </div>
                                            </div>
                                            <div className="aspect-video w-full rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                                                <video src={outputUrl} controls className="w-full h-full object-cover" />
                                            </div>
                                            <button
                                                onClick={handleDownload}
                                                className="w-full p-6 rounded-[28px] bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-gray-100 transition-all active:scale-95 shadow-xl"
                                            >
                                                <FaDownload /> Deploy Transduced Frame
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="opacity-10 group-hover:opacity-20 transition-opacity flex flex-col items-center gap-8">
                                            <FaChartLine className="text-8xl" />
                                            <p className="text-[10px] font-black uppercase tracking-[0.6em]">Awaiting Matrix Induction</p>
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
                                        onClick={handleReset}
                                        className="p-4 rounded-[24px] bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-gray-700 hover:text-white transition-all flex items-center justify-center gap-3"
                                    >
                                        <FaUndo /> Flush Frame Buffer
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Infrastructure Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '120px' }}>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaVectorSquare className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Vector Synthesis</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Synthesize cinematic frames across professional-grade visual grid orientations.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaLayerGroup className="block text-violet-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Protocol Switch</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Seamless transposition between MP4, WebM, MOV, and AVI standard architectures.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaFilm className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Frame Logic</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">High-fidelity frame re-mapping utilizing browser-side FFmpeg.wasm processing cores.</p>
                        </div>
                    </div>

                    {/* Transcoder Intelligence */}
                    <div className="about-workbench-section text-center" style={{ marginBottom: '120px' }}>
                        <h2 className="text-3xl font-black tracking-tight text-white font-sans text-center uppercase tracking-widest text-glow" style={{ marginBottom: '20px' }}>Cinematic Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans max-w-4xl mx-auto text-gray-500 border-t border-white/5 pt-12">
                            <div className="faq-item">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest leading-loose text-glow mt-[2px]">Why browser-side transcoding?</h5>
                                <p className="text-sm leading-relaxed">By utilizing WASM technology, we perform the entire frame transposition locally in your browser logic memory. This ensures absolute privacy and zero latency from network upload/download cycles which are standard in legacy platforms.</p>
                            </div>
                            <div className="faq-item">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest leading-loose mt-[2px]">Magnitude Constraints?</h5>
                                <p className="text-sm leading-relaxed">The Transcoder current supports frame matrices up to 100MB. For larger feature-length transpositions, it is recommended to utilize a dedicated local terminal environment.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/video-converter" />
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
                select {
                    -webkit-appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a855f7' %3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 1.5rem center;
                    background-size: 1rem;
                }
            `}</style>
        </div>
    );
};

export default VideoConverter;