'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaImage, FaExchangeAlt, FaDownload, FaRedo, FaSpinner, FaBolt, FaLock, FaExpand } from 'react-icons/fa';
import ExploreTools from '@/components/ExploreTools';

const ImageConverter: React.FC = () => {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState('-');
  const [fileSize, setFileSize] = useState('-');
  const [dimensions, setDimensions] = useState('-');
  const [currentFormat, setCurrentFormat] = useState('-');
  const [outputFormat, setOutputFormat] = useState('jpg');
  const [quality, setQuality] = useState(85);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedImageUrl, setConvertedImageUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.match('image.*')) return;
    if (file.size > 20 * 1024 * 1024) return;
    
    setCurrentFile(file);
    setFileName(file.name);
    setFileSize(formatFileSize(file.size));
    const format = file.name.split('.').pop()?.toLowerCase() || '';
    setCurrentFormat(format.toUpperCase());

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setDimensions(`${img.width} × ${img.height}px`);
        setPreviewImage(e.target?.result as string);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleConvert = () => {
    if (!currentFile) return;
    setIsConverting(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          if (outputFormat === 'jpg' || outputFormat === 'jpeg') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          
          ctx.drawImage(img, 0, 0);
          let mimeType = `image/${outputFormat}`;
          if (outputFormat === 'jpg') mimeType = 'image/jpeg';
          
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const url = URL.createObjectURL(blob);
                setConvertedImageUrl(url);
              }
              setIsConverting(false);
            },
            mimeType,
            quality / 100
          );
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(currentFile);
  };

  const handleDownload = () => {
    if (!convertedImageUrl) return;
    const a = document.createElement('a');
    a.href = convertedImageUrl;
    a.download = `${fileName.split('.').shift()}-converted.${outputFormat}`;
    a.click();
  };

  const handleReset = () => {
    setCurrentFile(null);
    setPreviewImage(null);
    setFileName('-');
    setFileSize('-');
    setDimensions('-');
    setCurrentFormat('-');
    setConvertedImageUrl(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    else if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    else return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans">
      <title>Image Transpiler Protocol | Ecotrustia Solutions</title>
      <meta name="description" content="Convert and optimize visual data between high-performance formats including WebP, PNG, and JPEG. Real-time client-side transpilation." />

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
                        Image <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Converter</span>
                    </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed font-medium italic">
            "Re-encode visual data streams for multi-platform compatibility and architectural efficiency."
          </p>
        </div>
      </section>

      {/* ─── Main Interface ─── */}
      <section className="px-[5%] pb-48 relative z-10 flex flex-col items-center">
        <div className="max-w-4xl w-full mx-auto">
          
          <div className="glass-workbench" style={{ padding: 'clamp(24px, 5vw, 48px)', marginBottom: '120px' }}>
            {!previewImage ? (
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
                    <span className="mt-4 text-[9px] uppercase tracking-[0.2em] text-gray-600 font-bold">Supported: PNG, JPG, WEBP, GIF (Max 20MB)</span>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Preview Block */}
                    <div className="flex flex-col gap-[10px]">
                        <div className="relative rounded-[32px] overflow-hidden border border-white/10 aspect-square bg-[#0a0a0a] flex items-center justify-center p-4">
                            <img src={previewImage} alt="Source Preview" className="max-w-full max-h-full object-contain rounded-xl" />
                            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-black uppercase tracking-widest">Source Asset</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center">
                                <span className="text-[9px] uppercase tracking-widest text-gray-600 mb-1">Density</span>
                                <span className="text-sm font-bold">{fileSize}</span>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center">
                                <span className="text-[9px] uppercase tracking-widest text-gray-600 mb-1">Cores</span>
                                <span className="text-sm font-bold">{dimensions}</span>
                            </div>
                        </div>
                    </div>

                    {/* Controls Block */}
                    <div className="flex flex-col justify-between">
                        <div className="space-y-10">
                            <div className="flex flex-col gap-4">
                                <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500">Output Protocol</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['jpg', 'png', 'webp'].map(fmt => (
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

                            {(outputFormat === 'jpg' || outputFormat === 'webp') && (
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500">Compression Strength</label>
                                        <span className="text-lg font-black text-blue-400">{quality}%</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="1" max="100" 
                                        value={quality} 
                                        onChange={(e) => setQuality(parseInt(e.target.value))}
                                        className="premium-slider"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="pt-10 flex flex-col gap-[10px]">
                            {!convertedImageUrl ? (
                                <button 
                                    onClick={handleConvert}
                                    disabled={isConverting}
                                    className="btn-primary-reveal w-full group"
                                >
                                    {isConverting ? <FaSpinner className="animate-spin mr-3" /> : <FaExchangeAlt className="mr-3 group-hover:rotate-180 transition-transform duration-500" />}
                                    {isConverting ? 'Processing Buffer...' : 'Initialize Transpilation'}
                                </button>
                            ) : (
                                <button 
                                    onClick={handleDownload}
                                    className="btn-success w-full"
                                >
                                    <FaDownload className="mr-3" /> Download Encoded Asset
                                </button>
                            )}
                            <button onClick={handleReset} className="w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 hover:text-white transition-all flex items-center justify-center gap-2">
                                <FaRedo className="text-[8px]" /> Flush Data Workbench
                            </button>
                        </div>
                    </div>
                </div>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-sans" style={{ marginBottom: '120px' }}>
              <div className="mini-card group flex flex-col gap-5">
                  <FaBolt className="block text-blue-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                  <h4 className="text-lg font-bold tracking-tight text-white">Lossless Entropy</h4>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium italic">Advanced canvas-render protocols ensure zero metadata degradation during format transpilation.</p>
              </div>
              <div className="mini-card group flex flex-col gap-5">
                  <FaLock className="block text-purple-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                  <h4 className="text-lg font-bold tracking-tight text-white">Local Sandbox</h4>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium italic">Asset processing executes in a localized browser shell. Visual data never transmits to Ecotrustia nodes.</p>
              </div>
              <div className="mini-card group flex flex-col gap-5">
                  <FaExpand className="block text-blue-400 text-xl group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
                  <h4 className="text-lg font-bold tracking-tight text-white">Multi-Alpha Support</h4>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium italic">Full transparency channel (Alpha) preservation across PNG and WebP high-performance exports.</p>
              </div>
          </div>

          {/* Intelligence Section */}
          <div className="about-workbench-section font-sans" style={{ marginBottom: '120px' }}>
              <h2 className="text-3xl font-black tracking-tight text-center" style={{ marginBottom: '20px' }}>Transpilation Intelligence</h2>
              <div className="space-y-12 max-w-4xl mx-auto text-left">
                            <div className="faq-item">
                      <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest mt-[2px]">Why use WebP over standard formats?</h5>
                      <p className="text-sm text-gray-500 leading-relaxed max-w-3xl">WebP provides superior lossless and lossy compression for images on the web. Using our Transpiler, you can reduce visual density by up to <strong>34%</strong> compared to traditional formats while maintaining identical clarity.</p>
                  </div>
                  <div className="faq-item">
                      <h5 className="font-bold mb-4 text-white uppercase text-xs tracking-widest mt-[2px]">Is my privacy protected?</h5>
                      <p className="text-sm text-gray-500 leading-relaxed max-w-3xl">Absolutely. Unlike traditional online converters, we do not upload your images. All mathematical re-encoding happens in your <strong>browser RAM</strong> using JavaScript canvas APIs.</p>
                  </div>
              </div>
          </div>

          <div style={{ marginBottom: '120px' }}>
                        <ExploreTools currentPath="/tools/image-converter" />
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

export default ImageConverter;