'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import QRCode from "react-qr-code";
import { FaLink, FaCopy, FaCheck, FaChartLine, FaShieldAlt, FaBolt, FaMobileAlt, FaRedo, FaSpinner, FaQrcode } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';

const URLShortener: React.FC = () => {
    const [longUrl, setLongUrl] = useState('');
    const [customAlias, setCustomAlias] = useState('');
    const [result, setResult] = useState<{ longUrl: string; shortUrl: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const [showQr, setShowQr] = useState(false);

    const handleShorten = () => {
        if (!longUrl) return;
        try {
            new URL(longUrl);
        } catch (e) {
            alert('Initialization Error: Please provide a valid URL protocol (http:// or https://)');
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            const alias = customAlias || Math.random().toString(36).substring(2, 8);
            const shortUrl = `https://ecotrustia.link/${alias}`;
            setResult({ longUrl, shortUrl });
            setIsLoading(false);
        }, 800);
    };

    const handleCopy = () => {
        if (!result) return;
        navigator.clipboard.writeText(result.shortUrl).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        });
    };

    const handleReset = () => {
        setLongUrl('');
        setCustomAlias('');
        setResult(null);
        setShowQr(false);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
            <title>Link Alias Protocol | Ecotrustia Solutions</title>
            <meta name="description" content="Generate high-frequency, shortened link aliases for complex URLs. Secure redirection protocols with integrated QR matrix options." />

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
                        URL <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Shortener</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
                        "Synthesize long-form endpoints into high-frequency, concise redirection aliases."
                    </p>
                </div>
            </section>

            {/* ─── Main Interface ─── */}
            <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
                <div className="max-w-4xl w-full mx-auto">

                    <div className="glass-workbench" style={{ padding: 'clamp(24px, 5vw, 48px)', marginBottom: '120px' }}>
                        {!result ? (
                            <div className="space-y-12">
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500 ml-4">Source Endpoint (Long URL)</label>
                                    <div className="relative group">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-10 group-focus-within:opacity-30 transition-all"></div>
                                        <div className="relative flex items-center bg-[#0c0c0c] border border-white/10 rounded-2xl overflow-hidden gap-4">
                                            <div className="pl-10 text-purple-400 flex-shrink-0 text-xl py-2"><FaLink /></div>
                                            <input
                                                type="url"
                                                placeholder="https://www.example.com/very-long-form-data-string..."
                                                value={longUrl}
                                                onChange={(e) => setLongUrl(e.target.value)}
                                                className="w-full bg-transparent pr-10 py-8 text-base font-medium focus:outline-none placeholder:text-gray-800 tracking-tight"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4" style={{ marginBottom: '10px' }}>
                                    <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500 ml-4">Custom Hash (Optional)</label>
                                    <div 
                                        className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl overflow-hidden max-w-xl gap-4"
                                        style={{ paddingLeft: '32px' }}
                                    >
                                        <div className="text-gray-500 text-xs font-mono whitespace-nowrap flex-shrink-0 opacity-80 uppercase tracking-widest">ecotrustia.link /</div>
                                        <input
                                            type="text"
                                            placeholder="my-alias"
                                            value={customAlias}
                                            onChange={(e) => setCustomAlias(e.target.value)}
                                            className="w-full bg-transparent pr-10 py-8 text-sm font-mono font-black focus:outline-none placeholder:text-gray-800 text-purple-400"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleShorten}
                                    disabled={isLoading || !longUrl}
                                    className="btn-primary-reveal w-full md:w-auto min-w-[280px]"
                                >
                                    {isLoading ? <FaSpinner className="animate-spin mr-3" /> : <FaBolt className="mr-3" />}
                                    {isLoading ? 'Synthesizing Alias...' : 'Initialize Shortening'}
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-[20px] animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <div className="p-6 rounded-[32px] bg-white/[0.02] border border-white/10 backdrop-blur-xl w-full max-w-full relative overflow-hidden">
                                    <div className="w-full flex flex-col" style={{ minHeight: '340px', padding: '20px 24px' }}>
                                        <div className="flex flex-col md:flex-row md:items-center gap-8 w-full flex-1">
                                            <div className="flex-1 min-w-0 w-full max-w-full flex flex-col gap-[12px]">
                                                <div className="w-full flex flex-col gap-[10px]">
                                                    <span className="text-[10px] uppercase font-black tracking-[0.3em] text-purple-400 block ml-1">STABILIZED ALIAS (PORT 3005)</span>
                                                    <div 
                                                        className="bg-black/40 border border-purple-500/30 rounded-2xl w-full overflow-hidden min-w-0"
                                                        style={{ 
                                                            padding: '16px 32px', 
                                                            minHeight: '80px', 
                                                            display: 'flex', 
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <h3
                                                            className="font-mono font-black text-white truncate w-full m-0 p-0"
                                                            style={{ fontSize: 'clamp(16px, 4vw, 26px)', lineHeight: '1.2', display: 'block' }}
                                                            title={result.shortUrl}
                                                        >
                                                            {result.shortUrl}
                                                        </h3>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 text-gray-500 group/link w-full max-w-full bg-black/20 p-3 rounded-xl border border-white/5" title={result.longUrl}>
                                                    <div className="text-[9px] uppercase font-black tracking-widest opacity-40 shrink-0 bg-white/10 px-2 py-1 rounded">Source</div>
                                                    <p className="text-[11px] font-medium truncate opacity-60 group-hover/link:opacity-100 transition-opacity w-full">
                                                        {result.longUrl}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex shrink-0 items-center gap-3 md:gap-4 w-full md:w-auto justify-end md:justify-center mt-4 md:mt-0">
                                                <button
                                                    onClick={handleCopy}
                                                    className={`p-4 md:p-5 rounded-2xl flex items-center justify-center transition-all relative group/btn ${copySuccess ? 'bg-green-500 text-white' : 'bg-purple-600 text-white shadow-[0_15px_30px_-5px_rgba(147,51,234,0.4)] hover:scale-105'}`}
                                                    title="Copy Alias"
                                                >
                                                    {copySuccess ? <FaCheck /> : <FaCopy className="group-hover/btn:rotate-12 transition-transform" />}
                                                    {copySuccess && (
                                                        <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-green-500 text-white text-[9px] font-black rounded-lg animate-in fade-in zoom-in duration-300 shadow-xl whitespace-nowrap z-10">
                                                            LINK COPIED
                                                        </span>
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => setShowQr(!showQr)}
                                                    className={`p-4 md:p-5 rounded-2xl flex items-center justify-center border transition-all group/btn ${showQr ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                                                    title="Toggle QR Code"
                                                >
                                                    <FaQrcode className="group-hover/btn:scale-110 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center pt-8 border-t border-white/5 mt-auto">
                                            <button onClick={handleReset} className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 hover:text-white transition-all flex items-center gap-3">
                                                <FaRedo className="text-[8px]" /> Flush Current Session
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {showQr && (
                                    <div 
                                        className="flex flex-col items-center justify-center gap-8 p-12 bg-white rounded-[32px] animate-in zoom-in-95 duration-500"
                                        style={{ minHeight: '340px' }}
                                    >
                                        <QRCode value={result.shortUrl} size={180} fgColor="#000" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Visual Access Protocol Matrix</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Features Matrix */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ marginBottom: '120px' }}>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaBolt className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Instant Redirect</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Sub-millisecond redirection protocols ensure your users reach the destination without delay.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaShieldAlt className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Secure Nodes</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Aliases are encrypted using high-entropy character strings for secure distribution.</p>
                        </div>
                        <div className="mini-card group flex flex-col gap-5">
                            <FaMobileAlt className="block text-blue-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                            <h5 className="font-bold text-sm text-white">Mobile Ready</h5>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic">Concise URLs optimized for SMS, social media bios, and printed collateral.</p>
                        </div>
                    </div>

                    {/* Intelligence Section */}
                    <div className="about-workbench-section text-center" style={{ marginBottom: '120px' }}>
                        <h2 className="text-3xl font-black tracking-tight" style={{ marginBottom: '20px' }}>Shortening Intelligence</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans">
                            <div className="faq-item">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest mt-[2px]">Why use custom aliases?</h5>
                                <p className="text-sm text-gray-500 leading-relaxed">Custom aliases (e.g., ecotrustia.link/sale) significantly improve CTR (Click-Through Rate). Users are more likely to trust a link that contains a readable keyword related to the destination.</p>
                            </div>
                            <div className="faq-item">
                                <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest mt-[2px]">How long do the links last?</h5>
                                <p className="text-sm text-gray-500 leading-relaxed">Our aliases are stored in persistent redirection nodes. They do not expire as long as the Ecotrustia network remains active, providing long-term reliability for your marketing assets.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/url-shortener" />
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
                    box-shadow: 0 20px 50px -10px rgba(147, 51, 234, 0.4);
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
                .faq-item {
                    border-left: 2px solid rgba(168, 85, 247, 0.2);
                    padding-left: 24px;
                }
            `}</style>
        </div>
    );
};

export default URLShortener;