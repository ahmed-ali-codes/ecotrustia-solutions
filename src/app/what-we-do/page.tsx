"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function WhatWeDoPage() {
  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".glass-card, .section-title, .hero-content, .fade-up").forEach((el) => {
      el.classList.add("fade-in-init");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const corePillars = [
    { title: "Mobile App Development", slug: "mobile-app-development", icon: "fa-mobile-screen-button", color: "primary", desc: "Native & Cross-Platform iOS/Android architectures engineered for massive scale." },
    { title: "Web & Software Development", slug: "web-software-development", icon: "fa-laptop-code", color: "secondary", desc: "High-performance web apps, SaaS platforms, and enterprise software." },
    { title: "AI Automation & Integration", slug: "ai-automation-integration", icon: "fa-robot", color: "primary", desc: "Intelligent autonomous workflows and custom AI agent deployments." },
    { title: "Quality Assurance & Testing", slug: "quality-assurance-testing", icon: "fa-shield-halved", color: "secondary", desc: "Rigorous stress-testing, automated suites, and security protocols." },
    { title: "E-Commerce Development", slug: "ecommerce-development", icon: "fa-cart-shopping", color: "primary", desc: "High-conversion retail platforms and headless E-commerce builds." },
    { title: "UI/UX & Product Design", slug: "ui-ux-design", icon: "fa-pen-nib", color: "secondary", desc: "Aesthetic excellence merging neo-cyberpunk design with flawless usability." }
  ];

  const aiServices = [
    { title: "AI Automated Call Service", icon: "fa-phone-volume", desc: "Intelligent voice recognition and smart call routing with 24/7 autonomous availability." },
    { title: "WhatsApp Automation", icon: "fa-whatsapp", desc: "Instant replies, personalized engagement, and seamless workflow integration for customer inquiries." },
    { title: "AI Email Automation", icon: "fa-envelope-open-text", desc: "Intelligent response systems with continuous learning for maximum automated efficiency." },
    { title: "AI Chatbots", icon: "fa-robot", desc: "24/7 instant support with seamless integration into your existing business architecture." },
    { title: "AI Marketing Automation", icon: "fa-bullhorn", desc: "Streamlined campaign scheduling and multi-platform posting via intelligent automation." },
    { title: "Lead Generation & Targeting", icon: "fa-crosshairs", desc: "Data-driven strategies for high-precision segmenting and efficient lead capture protocols." },
    { title: "AI Sales Agent", icon: "fa-user-tie", desc: "Autonomous lead conversion and customer interaction management operating 24/7." },
    { title: "AI Content Creation", icon: "fa-magic", desc: "High-quality production of marketing materials optimized for various digital platforms." },
  ];

  const creativeServices = [
    { title: "Web Development", icon: "fa-code", desc: "Tailored business sites and modern user interfaces engineered for high performance." },
    { title: "E-Commerce Solutions", icon: "fa-shopping-bag", desc: "Shopify design, mobile optimization, and streamlined checkout flows for modern retail." },
    { title: "SEO Optimization", icon: "fa-chart-line", desc: "Strategic protocols to boost organic traffic and dominate search engine rankings." },
    { title: "Social Media Marketing", icon: "fa-share-alt", desc: "Comprehensive management and strategies for Facebook, Instagram, and LinkedIn." },
    { title: "Graphic & Logo Design", icon: "fa-bezier-curve", desc: "Unique brand identity creation including logos, posters, and creative illustrations." },
    { title: "Content Writing", icon: "fa-pen-nib", desc: "SEO-optimized, high-quality content crafted to achieve specific business objectives." },
    { title: "Video Editing", icon: "fa-video", desc: "Professional production for marketing, training, and social media presentations." },
    { title: "Email Marketing", icon: "fa-paper-plane", desc: "Targeted campaigns designed to build deep connections with your primary audience." },
    { title: "Domain & Hosting", icon: "fa-server", desc: "Secure, reliable infrastructure and domain management for your digital enterprise." },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden flex flex-col items-center justify-center min-h-[85vh] pt-24 pb-12">
        <div className="hero-grid opacity-40"></div>
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-primary/20 blur-[180px] rounded-full pointer-events-none -translate-y-1/3 translate-x-1/3"></div>
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-5 w-full relative z-10 text-center hero-content flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md text-primary font-mono text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(139,92,246,0.2)]">
             <i className="fas fa-microchip animate-pulse"></i> Systems Active
          </div>
          <h1 className="text-white mb-8 text-6xl md:text-8xl font-black max-w-5xl mx-auto leading-[1.1] tracking-tighter">
            We Engineer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary drop-shadow-[0_0_30px_rgba(139,92,246,0.4)]">
              Digital Dominance.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted/80 font-light max-w-3xl mx-auto leading-relaxed text-balance">
            From autonomous AI ecosystems to high-performance cross-platform software. Explore our complete arsenal of technological capabilities.
          </p>
        </div>
      </div>

      {/* Core Macro-Pillars (The Top 6) */}
      <section className="py-16 relative z-20 -mt-20">
        <div className="max-w-7xl mx-auto px-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
                {corePillars.map((pillar, idx) => (
                    <Link href={`/services/${pillar.slug}`} key={idx} className="block group fade-up">
                        <div className={`glass-card h-full p-8 rounded-3xl border border-white/5 bg-black/60 shadow-xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-4 hover:border-${pillar.color}/40 hover:shadow-[0_20px_40px_-15px_rgba(var(--${pillar.color}-glow),0.5)] overflow-hidden relative`}>
                            {/* Inner ambient glow */}
                            <div className={`absolute -right-20 -top-20 w-40 h-40 bg-${pillar.color}/20 blur-[50px] rounded-full group-hover:bg-${pillar.color}/40 transition-colors duration-500`}></div>
                            
                            <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-${pillar.color}/10 border border-${pillar.color}/20 text-${pillar.color} text-2xl mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                <i className={`fas ${pillar.icon}`}></i>
                            </div>
                            
                            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">{pillar.title}</h3>
                            <p className="text-muted/80 text-sm leading-relaxed mb-6">
                                {pillar.desc}
                            </p>
                            
                            <div className={`text-${pillar.color} text-xs font-bold uppercase tracking-widest flex items-center gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500`}>
                                View Specifications <i className="fas fa-arrow-right"></i>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-10 max-w-7xl mx-auto"></div>

      {/* Comprehensive Protocols (AI) */}
      <section className="py-24 relative" id="ai-automation">
        <div className="absolute left-0 top-1/2 w-[400px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto px-5">
            <div className="flex flex-col lg:flex-row gap-16">
                
                {/* Sticky Left Sidebar for AI Category */}
                <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit mb-10 lg:mb-0 section-title pb-0">
                    <span className="section-label mb-4 inline-block text-primary">Neural Execution</span>
                    <h2 className="text-gradient text-4xl lg:text-5xl mb-6">AI Protocols</h2>
                    <p className="text-muted text-lg leading-relaxed border-l-2 border-primary/30 pl-4">
                        Intelligent, autonomous systems architected to systematically eliminate operational friction and orchestrate 24/7 business scaling without human intervention.
                    </p>
                </div>

                {/* Right Side Grid */}
                <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                {aiServices.map((service, idx) => (
                    <div className="glass-card p-6 border-white/5 hover:border-primary/30 group transition-all duration-300" key={idx}>
                        <div className="flex items-start gap-5">
                            <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                                <i className={`fas ${service.icon} text-lg`}></i>
                            </div>
                            <div>
                                <h3 className="mb-2 text-lg font-bold text-white leading-tight">{service.title}</h3>
                                <p className="text-muted text-sm leading-relaxed">
                                    {service.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-10 max-w-7xl mx-auto"></div>

      {/* Comprehensive Protocols (Creative) */}
      <section className="py-24 relative" id="creative-digital">
        <div className="absolute right-0 top-1/2 w-[400px] h-[400px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto px-5">
            <div className="flex flex-col lg:flex-row-reverse gap-16">
                
                {/* Sticky Right Sidebar for Creative Category */}
                <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit mb-10 lg:mb-0 section-title pb-0">
                    <span className="section-label mb-4 inline-block text-secondary">Aesthetic Engine</span>
                    <h2 className="text-gradient text-4xl lg:text-5xl mb-6">Creative Stack</h2>
                    <p className="text-muted text-lg leading-relaxed border-l-2 border-secondary/30 pl-4">
                        End-to-end digital craft. We fuse bleeding-edge web architecture with compelling, conversion-focused brand narratives that dominate the digital ecosystem.
                    </p>
                </div>

                {/* Left Side Grid */}
                <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                {creativeServices.map((service, idx) => (
                    <div className="glass-card p-6 border-white/5 hover:border-secondary/30 group transition-all duration-300" key={idx}>
                        <div className="flex items-start gap-5">
                            <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary group-hover:bg-secondary/10 transition-colors">
                                <i className={`fas ${service.icon} text-lg`}></i>
                            </div>
                            <div>
                                <h3 className="mb-2 text-lg font-bold text-white leading-tight">{service.title}</h3>
                                <p className="text-muted text-sm leading-relaxed">
                                    {service.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
      </section>

      {/* Initiation CTA Section */}
      <section className="py-32 relative overflow-hidden flex items-center justify-center bg-[#050505]">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-5 mix-blend-overlay pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-5 w-full relative z-10 p-12 md:p-16 flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gradient tracking-tight">Deploy Your Vision.</h2>
            <p className="text-xl md:text-2xl text-muted mb-12 max-w-4xl mx-auto leading-relaxed">
                Select your required protocol above to view detailed specifications, or contact our elite engineering team to architect a custom, full-scale digital solution tailored precisely to your operational needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/#contact" className="btn btn-primary px-12 py-5 text-base tracking-widest rounded-2xl shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                    Initiate Sequence <i className="fas fa-bolt ml-3"></i>
                </Link>
            </div>
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
      `}</style>
    </>
  );
}
