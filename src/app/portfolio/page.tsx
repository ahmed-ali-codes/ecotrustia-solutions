"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const FlipbookSection = dynamic(() => import('./FlipbookSection'), { ssr: false });

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link?: string;
  metaDescription?: string;
  technologies?: string;
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/portfolio');
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Failed to load portfolio:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".fade-up, .hero-content").forEach((el) => {
      el.classList.add("fade-in-init");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [projects]);

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Hero Section */}
      <div className="relative overflow-hidden flex flex-col items-center justify-center min-h-[60vh] pt-32 pb-12">
        <div className="hero-grid opacity-30"></div>
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-primary/20 blur-[180px] rounded-full pointer-events-none -translate-y-1/3 translate-x-1/3"></div>
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-5 w-full relative z-10 text-center hero-content flex flex-col items-center justify-center">
          <div className="inline-flex items-center justify-center gap-4 px-10 py-4 rounded-full bg-white/5 border border-white/10 mb-12 backdrop-blur-md text-primary font-mono text-sm uppercase tracking-[0.3em] shadow-[0_0_40px_rgba(139,92,246,0.3)] min-w-[280px] whitespace-nowrap">
            <i className="fas fa-satellite-dish animate-pulse"></i> Global Operations
          </div>
          <h1 className="text-white mb-6 text-5xl md:text-7xl font-black max-w-5xl mx-auto leading-[1.1] tracking-tighter text-center">

            <span className="block tracking-[0.06em]">
              Featured
            </span>

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-400 to-primary drop-shadow-[0_0_30px_rgba(139,92,246,0.4)]">
              Projects.
            </span>

          </h1>
          <p className="text-lg md:text-xl text-muted mb-12 max-w-3xl mx-auto leading-relaxed text-balance">
            Explore a curated collection of high-performance digital products. Each platform engineered for maximum conversion, rapid scale, and better user experience.
          </p>
        </div>
      </div>

      {/* Portfolio Grid */}
      <section className="py-20 relative z-20 -mt-10">
        <div className="max-w-7xl mx-auto px-5">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-50">
              <i className="fas fa-circle-notch fa-spin text-4xl text-primary mb-4"></i>
              <p className="font-mono text-sm tracking-widest uppercase">Decyphering secure data...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-32 glass-card rounded-3xl border-dashed border-white/10">
              <i className="fas fa-ghost text-4xl text-muted/50 mb-4"></i>
              <h3 className="text-2xl text-white mb-2">No Deployments Found</h3>
              <p className="text-muted">Awaiting uplink from the admin framework.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {projects.map((project, idx) => (
                <div key={project.id} className="fade-up relative group">
                  <div className="glass-card h-full p-2 rounded-[2rem] border border-white/5 bg-black/40 shadow-xl backdrop-blur-xl transition-all duration-500 hover:border-primary/40 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.5)] overflow-hidden flex flex-col">

                    {/* Inner Details Container */}
                    <div className="p-6 md:p-10 flex flex-col flex-1 z-10 relative">
                      {/* Tags / Technologies */}
                      {project.technologies && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.split(',').map((tech, i) => (
                            <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-white/70">
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                      <h3 className="text-3xl font-black mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">{project.title}</h3>

                      <div className="relative mb-4">
                        <p className="text-muted/90 text-sm leading-relaxed max-h-[120px] overflow-y-auto pr-3 custom-scrollbar">
                          {project.description}
                        </p>
                      </div>

                      {/* Hidden SEO Meta Description for bots (plus subtle display) */}
                      {project.metaDescription && (
                        <p className="text-xs text-white/30 italic mb-8 border-l border-white/10 pl-3">
                          SEO / Meta: {project.metaDescription}
                        </p>
                      )}

                      <div className="mt-8 mb-6 flex items-center justify-between">
                        {project.link ? (
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary px-8 py-3 text-xs tracking-widest rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)]">
                            Launch Interface <i className="fas fa-external-link-alt ml-2"></i>
                          </a>
                        ) : (
                          <span className="px-6 py-3 border border-white/10 rounded-xl text-xs tracking-widest text-muted bg-white/5 cursor-not-allowed">
                            Node Offline
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Image Background Container fixed for responsive screen scaling */}
                    <div className="w-full shrink-0 relative aspect-[16/10] z-0 overflow-hidden rounded-b-[1.8rem] bg-black">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 z-10 pointer-events-none"></div>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full object-top opacity-70 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Interactive PDF Flipbooks */}
      <section className="py-20 relative z-20">
        <div className="max-w-7xl mx-auto px-5 w-full">
          <div className="flex flex-col items-center justify-center text-center mb-12 w-full">
            <span className="section-label">Enterprise Briefs</span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mt-4">Capability Decks</h2>
            <p className="text-muted mt-4 max-w-2xl text-center">
              Interact with our comprehensive capability and operations portfolios directly in the interface.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 justify-items-center mt-10 w-full">
            <FlipbookSection pdfUrl="/ai-portfolio.pdf" title="AI & Automation Intel" />
            <FlipbookSection pdfUrl="/web-portfolio.pdf" title="Web & App Engineering" />
          </div>
        </div>
      </section>
      {/* Initiation CTA */}
      <section className="py-32 relative overflow-hidden flex items-center justify-center bg-[#050505]">
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-5 w-full relative z-10 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-gradient tracking-tight">Need Similar Results?</h2>
          <p className="text-xl md:text-2xl text-muted mb-12 max-w-4xl mx-auto leading-relaxed">
            Connect with our core engineering module to draft a blueprint for your enterprise architecture.
          </p>
          <Link href="/#contact" className="btn btn-primary px-12 py-5 text-base tracking-widest rounded-2xl shadow-[0_0_20px_rgba(139,92,246,0.4)]">
            Initialize Contact <i className="fas fa-terminal ml-3"></i>
          </Link>
        </div>
      </section>

      <style jsx>{`
        .fade-in-init {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .reveal {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        /* Custom Scrollbar for Description */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(139, 92, 246, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.4);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.8);
        }
      `}</style>
    </div>
  );
}