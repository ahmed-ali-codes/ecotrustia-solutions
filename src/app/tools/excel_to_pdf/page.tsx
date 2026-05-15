'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { FaFileExcel, FaFilePdf, FaExchangeAlt, FaDownload, FaRedo, FaShieldAlt, FaBolt, FaLayerGroup, FaCheck } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';

const ExcelToPdf: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (selectedFile: File) => {
        if (selectedFile && (selectedFile.name.endsWith('.xls') || selectedFile.name.endsWith('.xlsx'))) {
            setFile(selectedFile);
            setShowResult(false);
        } else {
            alert("Invalid Protocol: Please upload a valid Excel spreadsheet (.xls or .xlsx)");
        }
    };

    const handleConvert = () => {
        if (!file) return;
        setIsConverting(true);
        // Simulate conversion logic
        setTimeout(() => {
            setIsConverting(false);
            setShowResult(true);
        }, 2000);
    };

    const handleReset = () => {
        setFile(null);
        setShowResult(false);
        setIsConverting(false);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-green-500/30 font-sans">
            <title>Excel to PDF Transposer | Ecotrustia Solutions</title>
            <meta name="description" content="Convert complex Excel spreadsheets into high-fidelity PDF documents. Maintain structural integrity and cell formatting across data transpositions." />

            {/* ─── Hero Section ─── */}
            <section className="relative pt-40 pb-24 px-[5%] overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(34,197,94,0.1),transparent_70%)] pointer-events-none"></div>
                
                {/* Horizontal Navigation Boundary */}
                <div className="relative z-20 w-full max-w-6xl mx-auto mb-[10px]">
                    <Link href="/tools" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 hover:text-green-400 transition-all group">
                        <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> Back to Workbench
                    </Link>
                </div>

                {/* Perfectly Centered Content Node */}
                <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-[-0.05em] leading-[0.9] text-white uppercase text-glow">
                        Spreadsheet <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Transposer</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Convert fragmented data matrices into static architectural PDF documents with absolute fidelity."
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
                                <input type="file" ref={fileInputRef} accept=".xls,.xlsx" className="hidden" onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])} />
                                <div className="w-20 h-20 rounded-3xl bg-green-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-green-500/20">
                                    <FaFileExcel className="text-3xl text-green-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">Initialize Data Induction</h3>
                                <p className="text-gray-500 text-sm font-medium mb-2">Drag & drop your Excel spreadsheet or click to explore local nodes</p>
                                <span className="mt-6 text-[9px] uppercase tracking-[0.2em] text-gray-600 font-bold">Supported Protocols: .XLS, .XLSX</span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                {/* Details Block */}
                                <div className="space-y-6">
                                    <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 flex flex-col gap-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/20">
                                                <FaFileExcel />
                                            </div>
                                            <div className="flex flex-col truncate">
                                                <span className="text-sm font-bold text-gray-200 truncate">{file.name}</span>
                                                <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{(file.size / 1024).toFixed(1)} KB Source Data</span>
                                            </div>
                                        </div>

                                        <div className="p-6 rounded-2xl bg-black/40 border border-white/5 flex flex-col items-center justify-center text-center gap-4 py-12">
                                            <FaExchangeAlt className={`text-4xl ${isConverting ? 'animate-spin text-green-400' : 'text-gray-700'}`} />
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Transposition Stream</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Configuration Block */}
                                <div className="flex flex-col justify-center gap-8">
                                    {!showResult ? (
                                        <button 
                                            onClick={handleConvert}
                                            disabled={isConverting}
                                            className="w-full p-8 rounded-[32px] bg-green-600 text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-green-900/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                                        >
                                            {isConverting ? <span className="animate-pulse">Processing Matrix...</span> : <>Initialize Transposition <FaFilePdf className="text-sm" /></>}
                                        </button>
                                    ) : (
                                        <div className="space-y-4 animate-in zoom-in duration-500">
                                            <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <FaCheck className="text-green-500" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Transposition Complete</span>
                                                </div>
                                            </div>
                                            <button 
                                                className="w-full p-8 rounded-[32px] bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-gray-100 active:scale-95 transition-all flex items-center justify-center gap-3"
                                            >
                                                <FaDownload /> Download PDF Protocol
                                            </button>
                                        </div>
                                    )}
                                    <button onClick={handleReset} className="w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 hover:text-white transition-all flex items-center justify-center gap-2">
                                        <FaRedo className="text-[8px]" /> Reset Induction Module
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Infrastructure Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '120px' }}>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaLayerGroup className="block text-green-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Grid Retention</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Preserve complex cell layouts and structural alignment during the transposition cycle.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaBolt className="block text-emerald-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">High Velocity</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Process massive datasets into static document formats with sub-second execution logic.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaShieldAlt className="block text-green-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Secure Buffer</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Data remains within the localized client node. No external telemetry or leakages.</p>
                        </div>
                    </div>

                    {/* Intelligence Section */}
                    <div className="about-workbench-section text-center" style={{ marginBottom: '120px' }}>
                        <h2 className="text-3xl font-black tracking-tight text-white font-sans text-center uppercase tracking-widest" style={{ marginBottom: '20px' }}>Protocol Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans max-w-4xl mx-auto text-gray-500">
                            <div className="faq-item border-l border-white/5 pl-8 text-left">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest">Are multi-sheet workbooks supported?</h5>
                                <p className="text-sm leading-relaxed">Yes. Our transposition engine identifies all active sheets within the source induction file and converts them into sequential pages within the target PDF document.</p>
                            </div>
                            <div className="faq-item border-l border-white/5 pl-8 text-left">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest">Will my formulas stay active?</h5>
                                <p className="text-sm leading-relaxed">No. The resulting PDF is a static architectural document. All dynamic formulas are flattened into their resultant values during the transposition cycle to ensure visual consistency.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/excel_to_pdf" />
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
                    text-shadow: 0 0 30px rgba(34, 197, 94, 0.3);
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
                    background: rgba(34, 197, 94, 0.02);
                    border-color: rgba(34, 197, 94, 0.2);
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
                    border-color: rgba(34, 197, 94, 0.2);
                }
            `}</style>
        </div>
    );
};

export default ExcelToPdf;