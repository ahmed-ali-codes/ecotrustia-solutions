'use client';

import React, { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import download from 'downloadjs';
import Link from 'next/link';
import { FaFilePdf, FaArrowUp, FaArrowDown, FaTimes, FaSpinner, FaObjectGroup, FaTrash, FaShieldAlt, FaBolt, FaLock, FaDownload } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';

const PDFMerger: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [mergedPdfBytes, setMergedPdfBytes] = useState<Uint8Array | null>(null);
    const [isMerging, setIsMerging] = useState(false);
    const [outputName, setOutputName] = useState('');
    const [pageOrder, setPageOrder] = useState('normal');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            handleFileSelect(event.target.files);
        }
    };

    const handleFileSelect = (selectedFiles: FileList) => {
        const newFiles = [...files];
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            if (file.type !== "application/pdf") continue;
            if (file.size > 50 * 1024 * 1024) continue;
            newFiles.push(file);
        }
        setFiles(newFiles);
    };

    const handleMerge = async () => {
        if (files.length < 2) return;
        setIsMerging(true);
        setMergedPdfBytes(null);

        try {
            const mergedPdf = await PDFDocument.create();
            let orderedFiles = [...files];
            if (pageOrder === 'reverse') orderedFiles.reverse();

            for (const file of orderedFiles) {
                const fileBytes = await file.arrayBuffer();
                let pdfDoc;
                try {
                    pdfDoc = await PDFDocument.load(fileBytes);
                } catch (loadError: any) {
                    if (loadError.message && loadError.message.toLowerCase().includes('encrypted')) {
                        alert(`Protocol Error: The document "${file.name}" is encrypted. Please unlock the file before merging.`);
                        return;
                    }
                    throw loadError;
                }
                const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
                pages.forEach((page) => mergedPdf.addPage(page));
            }

            const pdfBytes = await mergedPdf.save({ useObjectStreams: false });
            setMergedPdfBytes(pdfBytes);
        } catch (error: any) {
            console.error("Error merging PDFs:", error);
            alert(error.message || 'A critical error occurred during the merge sequence.');
        } finally {
            setIsMerging(false);
        }
    };

    const handleDownload = () => {
        if (!mergedPdfBytes) return;
        const filename = outputName || "merged-protocol-output.pdf";
        const blob = new Blob([mergedPdfBytes as any], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 1000);
    };

    const handleClear = () => {
        setFiles([]);
        setMergedPdfBytes(null);
        setOutputName('');
    };

    const removeFile = (index: number) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const moveFile = (index: number, direction: 'up' | 'down') => {
        const newFiles = [...files];
        if (direction === 'up' && index > 0) {
            [newFiles[index], newFiles[index - 1]] = [newFiles[index - 1], newFiles[index]];
        }
        if (direction === 'down' && index < newFiles.length - 1) {
            [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
        }
        setFiles(newFiles);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        else if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
        else return `${(bytes / 1048576).toFixed(1)} MB`;
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
            <title>PDF Merger Protocol | Ecotrustia Solutions</title>
            <meta name="description" content="Securely merge multiple PDF documents into a single high-performance file. Browser-side processing for maximum privacy and speed." />

            {/* ─── Hero Section ─── */}
            <section className="relative pt-40 pb-24 px-[5%] overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(147,51,234,0.15),transparent_70%)] pointer-events-none"></div>

                {/* Horizontal Navigation Boundary */}
                <div className="relative z-20 w-full max-w-6xl mx-auto mb-[10px]">
                    <Link href="/tools" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 hover:text-purple-400 transition-all group">
                        <span className="group-hover:-translate-x-2 transition-transform">&larr;</span> Back to Workbench
                    </Link>
                </div>

                {/* Perfectly Centered Content Node */}
                <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-[-0.05em] leading-[0.9] text-white uppercase text-glow">
                        PDF <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Merger</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Consolidate fragmented data streams into a single, unified architectural document."
                    </p>
                </div>
            </section>

            {/* ─── Main Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-4xl w-full mx-auto">

                    <div className="glass-workbench" style={{ padding: 'clamp(24px, 5vw, 48px)', marginBottom: '120px' }}>
                        {/* Upload Zone */}
                        <div
                            className="upload-zone group"
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('zone-active'); }}
                            onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('zone-active'); }}
                            onDrop={(e) => { e.preventDefault(); e.currentTarget.classList.remove('zone-active'); if (e.dataTransfer.files) handleFileSelect(e.dataTransfer.files); }}
                        >
                            <input type="file" ref={fileInputRef} accept=".pdf" multiple className="hidden" onChange={handleFileChange} />
                            <div className="w-20 h-20 rounded-3xl bg-purple-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-purple-500/20">
                                <FaFilePdf className="text-3xl text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Initialize Data Uplink</h3>
                            <p className="text-gray-500 text-sm font-medium mb-2">Drag & drop multiple PDFs or click to explore local drive</p>
                            <span className="mt-6 text-[9px] uppercase tracking-[0.2em] text-gray-600 font-bold">Max Density: 50MB per unit</span>
                        </div>

                        {/* File Sequence List */}
                        {files.length > 0 && (
                            <div className="mt-12 space-y-3">
                                <div className="flex items-center justify-between px-4 mb-4">
                                    <span className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500">Operation Sequence ({files.length})</span>
                                    <button onClick={handleClear} className="text-[9px] uppercase font-black text-red-500/60 hover:text-red-500 flex items-center gap-2 transition-colors">
                                        <FaTrash /> Purge All
                                    </button>
                                </div>
                                {files.map((file, idx) => (
                                    <div key={`${file.name}-${idx}`} className="file-strip group">
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-purple-400 border border-white/5 group-hover:bg-purple-500/10 transition-colors">
                                                <span className="text-[10px] font-black">{idx + 1}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-gray-300 truncate max-w-[200px] md:max-w-md">{file.name}</span>
                                                <span className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter">{formatFileSize(file.size)}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => moveFile(idx, 'up')} className="action-btn"><FaArrowUp /></button>
                                            <button onClick={() => moveFile(idx, 'down')} className="action-btn"><FaArrowDown /></button>
                                            <button onClick={() => removeFile(idx)} className="action-btn text-red-400 hover:bg-red-500/10"><FaTimes /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Controls */}
                        {files.length >= 2 && (
                            <div className="mt-12 pt-12 border-t border-white/5 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500">Output Signature</label>
                                        <input
                                            type="text"
                                            placeholder="merged-protocol.pdf"
                                            value={outputName}
                                            onChange={(e) => setOutputName(e.target.value)}
                                            className="custom-input"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500">Concatenation Mode</label>
                                        <select
                                            value={pageOrder}
                                            onChange={(e) => setPageOrder(e.target.value)}
                                            className="custom-input appearance-none"
                                        >
                                            <option value="normal">Standard (Low &rarr; High)</option>
                                            <option value="reverse">Inverse (High &rarr; Low)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center">
                                    {!mergedPdfBytes ? (
                                        <>
                                            <button
                                                onClick={handleMerge}
                                                disabled={isMerging}
                                                className="btn-primary-reveal w-full md:w-auto min-w-[280px] mb-[10px]"
                                            >
                                                {isMerging ? <FaSpinner className="animate-spin mr-3" /> : <FaObjectGroup className="mr-3" />}
                                                {isMerging ? 'Merging Clusters...' : 'Initialize Merge Sequence'}
                                            </button>
                                            <div className="h-[10px] w-full shrink-0"></div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-full flex flex-col md:flex-row gap-4 justify-center items-center">
                                                <button
                                                    onClick={handleDownload}
                                                    className="btn-success w-full md:w-auto min-w-[280px]"
                                                >
                                                    <FaDownload className="mr-3" /> Download Resultant File
                                                </button>
                                                <button onClick={handleClear} className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                                                    Start New Operation
                                                </button>
                                            </div>
                                            <div className="h-[10px] w-full shrink-0"></div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Content Section: Benefits & FAQ */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '120px' }}>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaShieldAlt className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Zero-Server Leakage</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Processing occurs exclusively within your local browser memory. Data never touches Ecotrustia nodes.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaBolt className="block text-blue-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Instant Concatenation</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">High-velocity algorithms merge thousands of pages in milliseconds via client-side PDF-lib integration.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaLock className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Integrity Preserved</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Fonts, vector graphics, and metadata schemas remain intact across all merged file architectures.</p>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="about-workbench-section" style={{ marginBottom: '120px' }}>
                        <h2 className="text-3xl font-black mb-[30px] tracking-tight text-white font-sans text-center uppercase tracking-widest" style={{ marginBottom: '30px' }}>FAQ's</h2>
                        <div className="space-y-14 max-w-4xl mx-auto text-left">
                            <div className="faq-item">
                                <h5 className="font-bold mb-3 text-white mt-[2px]">How secure is the Ecotrustia PDF Merger?</h5>
                                <p className="text-sm text-gray-500 leading-relaxed">Most online tools upload your sensitive documents to their servers. Our protocol is <strong>serverless</strong>; the merging is done directly on your browser using your hardware resources. Your files never leave your device.</p>
                            </div>
                            <div className="faq-item">
                                <h5 className="font-bold mb-3 text-white mt-[2px]">Is there a limit on the number of files?</h5>
                                <p className="text-sm text-gray-500 leading-relaxed">No numerical limit exists. However, for optimum workbench stability, we recommend merging up to 50 files or a total density of 1GB per operation.</p>
                            </div>
                            <div className="faq-item">
                                <h5 className="font-bold mb-3 text-white mt-[2px]">Will the output file be searchable?</h5>
                                <p className="text-sm text-gray-500 leading-relaxed">Yes. Our protocol maintains all original OCR layers and text formatting. If your source files were searchable, the merged output precisely inherits those qualities.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/pdf-merger" />
                    </div>
                </div>
            </section>

            <style jsx>{`
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
                .glass-workbench {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 24px;
                }
                .text-glow {
                    text-shadow: 0 0 30px rgba(147, 51, 234, 0.3);
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
                    margin-bottom: 10px;
                }
                .upload-zone:hover, .upload-zone.zone-active {
                    background: rgba(147, 51, 234, 0.03);
                    border-color: rgba(147, 51, 234, 0.3);
                }
                .file-strip {
                    display: flex;
                    align-items: center;
                    padding: 16px 20px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 20px;
                    transition: all 0.3s;
                    margin-bottom: 10px;
                }
                .file-strip:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(147, 51, 234, 0.2);
                }
                .action-btn {
                    padding: 10px;
                    border-radius: 12px;
                    background: rgba(255, 255, 255, 0.05);
                    color: #9ca3af;
                    transition: all 0.3s;
                }
                .action-btn:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: #fff;
                }
                .custom-input {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    padding: 18px 24px;
                    color: #fff;
                    font-size: 14px;
                    font-weight: 500;
                    outline: none;
                    transition: border 0.3s;
                    margin-bottom: 10px;
                }
                .custom-input:focus {
                    border-color: rgba(147, 51, 234, 0.5);
                }
                .btn-primary-reveal {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px 48px;
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
                    background: #9333ea;
                    color: #fff;
                    transform: scale(1.05);
                    box-shadow: 0 20px 60px -20px rgba(147, 51, 234, 0.5);
                }
                .btn-success {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px 48px;
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
                .feature-card {
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
                .feature-card:hover {
                    background: rgba(255, 255, 255, 0.04);
                    border-color: rgba(147, 51, 234, 0.2);
                }
                .faq-item {
                    border-left: 2px solid rgba(147, 51, 234, 0.2);
                    padding: 12px 0 12px 36px;
                    margin-bottom: 10px;
                }
            `}</style>
        </div>
    );
};

export default PDFMerger;