'use client';

import React, { useState, useRef } from 'react';
import QRCode from "react-qr-code";
import Link from 'next/link';
import { FaQrcode, FaDownload, FaTrash, FaPalette, FaVectorSquare, FaLink, FaMobileAlt, FaBolt, FaLock } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';

const QRCodeGenerator: React.FC = () => {
    const [text, setText] = useState('https://ecotrustiasolutions.com');
    const [color, setColor] = useState('#a855f7');
    const [size, setSize] = useState(256);
    const qrRef = useRef<HTMLDivElement>(null);

    const handleDownload = () => {
        if (!qrRef.current) return;
        const svg = qrRef.current.querySelector('svg');
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.download = "protocol-access-key.png";
            downloadLink.href = pngFile;
            downloadLink.click();
        };
        img.src = "data:image/svg+xml;base64," + btoa(svgData);
    };

    const handleClear = () => {
        setText('');
        setColor('#a855f7');
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
            <title>QR Access Protocol | Ecotrustia Solutions</title>
            <meta name="description" content="Generate high-performance, custom-encrypted QR access keys for URLs and secure data strings. Real-time encoding with premium visual controls." />

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
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-[-0.05em] leading-[0.9] text-white">
                        QR Access <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Protocol</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Encode complex digital endpoints into high-frequency, scannable visual matrices."
                    </p>
                </div>
            </section>

            {/* ─── Main Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-4xl w-full mx-auto">
                    
                    <div className="glass-workbench" style={{ padding: 'clamp(24px, 5vw, 48px)', marginBottom: '120px' }}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            
                            {/* Inputs Block */}
                            <div className="space-y-10">
                                <div className="flex flex-col gap-4">
                                    <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500">Data Payload</label>
                                    <textarea 
                                        placeholder="Enter URL or secure text payload..."
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        className="custom-textarea h-[160px]"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-4">
                                        <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500">Matrix Color</label>
                                        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-3">
                                            <input 
                                                type="color" 
                                                value={color}
                                                onChange={(e) => setColor(e.target.value)}
                                                className="w-10 h-10 rounded-lg bg-transparent cursor-pointer border-none"
                                            />
                                            <span className="text-xs font-mono font-bold uppercase">{color}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500">Dimensions</label>
                                        <select 
                                            value={size}
                                            onChange={(e) => setSize(parseInt(e.target.value))}
                                            className="custom-input appearance-none px-6"
                                        >
                                            <option value={256}>Standard (256px)</option>
                                            <option value={512}>High-Bit (512px)</option>
                                            <option value={1024}>Enterprise (1024px)</option>
                                        </select>
                                    </div>
                                </div>

                                <button onClick={handleClear} className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 hover:text-red-400 transition-all flex items-center gap-2">
                                    <FaTrash className="text-[8px]" /> Purge Buffer
                                </button>
                            </div>

                            {/* Preview Block */}
                            <div className="flex flex-col items-center justify-center gap-10">
                                <div 
                                    className="relative p-12 rounded-[40px] bg-white/5 border border-white/10 shadow-[0_40px_100px_-20px_rgba(168,85,247,0.3)] group flex items-center justify-center overflow-hidden" 
                                    ref={qrRef}
                                    style={{ minHeight: '400px', width: '100%' }}
                                >
                                    <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    {text ? (
                                        <div className="bg-white p-10 rounded-[32px] shadow-2xl transform transition-all duration-500 group-hover:scale-105">
                                            <QRCode 
                                                value={text} 
                                                size={256} 
                                                fgColor={color} 
                                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-[250px] h-[250px] flex flex-col items-center justify-center text-gray-300 gap-4 italic opacity-30">
                                            <FaQrcode className="text-6xl" />
                                            <span className="text-xs font-bold uppercase tracking-widest">Awaiting Payload</span>
                                        </div>
                                    )}
                                </div>

                                <button 
                                    onClick={handleDownload}
                                    disabled={!text}
                                    className="btn-primary-reveal w-full group"
                                >
                                    <FaDownload className="mr-3 group-hover:bounce transition-transform" /> 
                                    Export Access Key
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Infrastructure Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '120px' }}>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaBolt className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm uppercase tracking-widest text-white">Real-Time Encoding</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Matrix segments update in milliseconds as you modify the data payload.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaPalette className="block text-blue-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm uppercase tracking-widest text-white">Brand Alignment</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Fully customizable HEX matrix coloring for seamless brand identity integration.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaLock className="block text-blue-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm uppercase tracking-widest text-white">Zero Uplink</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Matrix generation is purely client-side. Your payload is never archived.</p>
                        </div>
                    </div>

                    {/* Protocol Intelligence */}
                    <div className="about-workbench-section text-center" style={{ marginBottom: '120px' }}>
                        <h2 className="text-3xl font-black tracking-tight" style={{ marginBottom: '20px' }}>QR Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="faq-item">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest mt-[2px]">How distance affects scannability?</h5>
                                <p className="text-sm text-gray-500 leading-relaxed">The ideal scan distance is approximately <strong>10 times</strong> the width of the QR code. For a standard 2cm printed code, the optimal scanning distance is 20cm. Always ensure high contrast between the matrix and the background.</p>
                            </div>
                            <div className="faq-item">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest mt-[2px]">Why are some QR codes more complex?</h5>
                                <p className="text-sm text-gray-500 leading-relaxed">The complexity of the matrix depends on the amount of data encoded. Longer URLs or extensive text payloads require more density. For mission-critical scans, we recommend utilizing shortened URLs.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/qr_code_generator" />
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
                .custom-textarea {
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 24px;
                    padding: 24px;
                    color: #fff;
                    font-size: 14px;
                    font-weight: 500;
                    outline: none;
                    transition: all 0.3s;
                    resize: none;
                }
                .custom-textarea:focus {
                    border-color: rgba(168, 85, 247, 0.4);
                    background: rgba(255, 255, 255, 0.06);
                }
                .custom-input {
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 16px;
                    padding: 14px;
                    color: #fff;
                    font-size: 13px;
                    font-weight: 700;
                    outline: none;
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
                    background: #a855f7;
                    color: #fff;
                    transform: scale(1.02);
                    box-shadow: 0 20px 50px -10px rgba(168, 85, 247, 0.4);
                }
                .mini-card {
                    display: flex;
                    flex-direction: column;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 50px 44px;
                    border-radius: 20px;
                    transition: all 0.3s;
                    margin-bottom: 10px;
                    overflow-wrap: anywhere;
                    word-break: break-word;
                    hyphens: auto;
                }
                .mini-card:hover {
                    background: rgba(255, 255, 255, 0.04);
                    border-color: rgba(168, 85, 247, 0.2);
                }
                .faq-item {
                    border-left: 2px solid rgba(168, 85, 247, 0.2);
                    padding-left: 24px;
                }
            `}</style>
        </div>
    );
};

export default QRCodeGenerator;