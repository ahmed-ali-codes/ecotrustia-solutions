import React from 'react';
import Link from 'next/link';
import { FaFilePdf, FaFileArchive, FaImage, FaQrcode, FaLock, FaRuler, FaFont, FaLink, FaArrowRight } from 'react-icons/fa';

interface Tool {
    name: string;
    icon: React.ReactNode;
    link: string;
    desc: string;
}

const allTools: Tool[] = [
    { name: "PDF Merger", icon: <FaFilePdf />, link: "/tools/pdf_merger", desc: "Combine multiple streams into a single architecture." },
    { name: "PDF Compressor", icon: <FaFileArchive />, link: "/tools/pdf_compressor", desc: "Reduce document density using high-fidelity stream pruning." },
    { name: "Image Converter", icon: <FaImage />, link: "/tools/image_converter", desc: "Transpile visual data between multi-format buffers." },
    { name: "QR Generator", icon: <FaQrcode />, link: "/tools/qr_code_generator", desc: "Generate encrypted physical-to-digital access keys." },
    { name: "Password Generator", icon: <FaLock />, link: "/tools/password_generator", desc: "Entropy-driven sequence generation for secure access." },
    { name: "Length Converter", icon: <FaRuler />, link: "/tools/length_converter", desc: "Mathematical conversion between dimensional metrics." },
    { name: "Word Counter", icon: <FaFont />, link: "/tools/word_counter", desc: "Quantify linguistic data streams and lexical density." },
    { name: "URL Shortener", icon: <FaLink />, link: "/tools/url_shortener", desc: "Alias long-form endpoints into high-frequency links." }
];

export default function ExploreTools({ currentPath }: { currentPath: string }) {
    // Filter out current tool and take the first 4
    const displayTools = allTools
        .filter(t => t.link !== currentPath)
        .slice(0, 4);

    return (
        <div className="mt-32 pt-32 border-t border-white/5 w-full max-w-7xl mx-auto px-[5%] relative z-10">
            <div className="flex flex-col items-center text-center" style={{ marginBottom: '20px' }}>
                <span className="text-[10px] font-black tracking-[0.4em] text-purple-500 uppercase mb-4">Continuum expansion</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">Explore Other Protocols</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayTools.map((tool, i) => (
                    <Link href={tool.link} key={i} className="tool-shortcut-card group">
                        <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-500/10 transition-all border border-white/5" style={{ marginBottom: '10px' }}>
                            <span className="text-3xl">{tool.icon}</span>
                        </div>
                        <h4 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors" style={{ marginBottom: '10px' }}>{tool.name}</h4>
                        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 italic" style={{ marginBottom: '15px' }}>{tool.desc}</p>
                        <div className="text-[11px] font-black tracking-widest text-gray-600 uppercase group-hover:text-white transition-colors flex items-center gap-2">
                            Initialize <FaArrowRight className="text-[9px] group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                ))}
            </div>

            <style jsx>{`
                .tool-shortcut-card {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 60px 48px;
                    border-radius: 48px;
                    transition: all 0.3s;
                    display: block;
                    text-align: left;
                }
                .tool-shortcut-card:hover {
                    background: rgba(255, 255, 255, 0.04);
                    border-color: rgba(147, 51, 234, 0.2);
                }
            `}</style>
        </div>
    );
}
