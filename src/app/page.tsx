"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".glass-card, .section-title, .hero-content").forEach((el) => {
      el.classList.add("fade-in-init");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'AI Automated Call Service',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.interest,
          message: formData.message,
          services: [formData.interest]
        })
      });
      
      if (res.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', interest: 'AI Automated Call Service', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
      }
    } catch (err) {
      setFormStatus('error');
    }
  };

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
      <Header />

      {/* Hero Section */}
      <section className="hero relative overflow-hidden" id="home">
        <div className="hero-grid"></div>

        {/* Abstract Background Glows */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-secondary/20 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-5 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="hero-content text-center lg:text-left">
              <h1 className="text-gradient mb-12">
                Build the <span className="text-neon-purple">Digital</span> <br />
                <span className="text-neon-blue">Future.</span>
              </h1>
              <p className="hero-subtitle mb-12 text-lg text-muted leading-relaxed max-w-xl mx-auto lg:mx-0">
                EcoTrustia bridges the gap between vision and reality with advanced AI automation
                and high-performance digital solutions. Scale your business with the tools of tomorrow.
              </p>
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start mt-32">
                <a href="#contact" className="btn btn-primary px-10">
                  Initiate Project <i className="fas fa-bolt"></i>
                </a>
                <a href="#services" className="btn btn-outline px-10">
                  Explore Capabilities
                </a>
              </div>
            </div>

            {/* Visual Element */}
            <div className="hidden lg:block relative">
              <div className="relative z-10 animate-float">
                <div className="glass-card p-2 border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.2)]">
                  <Image
                    src="/images/hero-ai.png"
                    alt="Neural Architecture"
                    width={600}
                    height={600}
                    priority
                    className="rounded-[1.8rem] opacity-90 hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 border-t-2 border-r-2 border-primary/30 rounded-tr-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 border-b-2 border-l-2 border-secondary/30 rounded-bl-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Automation Section */}
      <section className="bg-blur relative" id="services">
        <div className="section-title flex flex-col items-center text-center mb-16">
          <span className="section-label">Intelligence</span>
          <h2 className="text-gradient">AI Automation Protocols</h2>
          <p className="text-muted max-w-2xl mx-auto" style={{ textAlign: 'center' }}>
            Autonomous systems designed to liberate your workflow and scale efficiency.
          </p>
        </div>

        <div className="services-grid">
          {aiServices.map((service, idx) => (
            <div className="glass-card hover:border-primary/50" key={idx}>
              <div className="service-icon text-primary">
                <i className={`fas ${service.icon}`}></i>
              </div>
              <h3 className="mb-4 text-xl font-bold">{service.title}</h3>
              <p className="text-muted text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Digital & Creative Section */}
      <section className="bg-black/20" id="creative">
        <div className="section-title flex flex-col items-center text-center mb-16">
          <span className="section-label">Engineering</span>
          <h2 className="text-gradient">Digital & Creative Ecosystems</h2>
          <p className="text-muted max-w-2xl mx-auto" style={{ textAlign: 'center' }}>
            End-to-end digital craft, from high-scale web architectures to compelling brand narratives.
          </p>
        </div>

        <div className="services-grid">
          {creativeServices.map((service, idx) => (
            <div className="glass-card hover:border-secondary/50" key={idx}>
              <div className="service-icon text-secondary">
                <i className={`fas ${service.icon}`}></i>
              </div>
              <h3 className="mb-4 text-xl font-bold">{service.title}</h3>
              <p className="text-muted text-sm leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Process Section */}
      <section className="relative overflow-hidden" id="process">
        {/* Decorative Background for Process */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent hidden lg:block"></div>

        <div className="section-title flex flex-col items-center text-center mb-24">
          <span className="section-label">Execution Framework</span>
          <h2 className="text-gradient">Our Process</h2>
          <p className="text-muted max-w-2xl mx-auto mt-4 text-center" style={{ textAlign: 'center' }}>
            A systematic, high-frequency methodology for architecting
            extraordinary digital solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 relative z-10">
          {[
            {
              step: "01",
              title: "Consultation",
              subtitle: "& Discovery",
              icon: "fa-comments",
              desc: "Deep analysis of your technical landscape and business objectives.",
              color: "primary"
            },
            {
              step: "02",
              title: "Strategy",
              subtitle: "& Planning",
              icon: "fa-project-diagram",
              desc: "Blueprint architecture and technological stack selection.",
              color: "secondary"
            },
            {
              step: "03",
              title: "Design",
              subtitle: "& Prototyping",
              icon: "fa-pen-ruler",
              desc: "UX/UI wireframes designed for maximum engagement.",
              color: "primary"
            },
            {
              step: "04",
              title: "Development",
              subtitle: "& QA",
              icon: "fa-laptop-code",
              desc: "Iterative building and rigorous stress-testing of all protocols.",
              color: "secondary"
            },
            {
              step: "05",
              title: "Launch",
              subtitle: "& Support",
              icon: "fa-rocket",
              desc: "Deployment to live production and continuous maintenance.",
              color: "accent"
            }
          ].map((item, idx) => (
            <div className="relative group h-full" key={idx}>
              <div className={`glass-card h-full flex flex-col items-center text-center p-8 lg:p-6 hover:border-${item.color}/50 border-white/5 transition-all duration-500`}>
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-white group-hover:bg-${item.color}/20 group-hover:text-${item.color} group-hover:border-${item.color}/50 transition-all duration-500`} style={{ marginBottom: '10px' }}>
                  <i className={`fas ${item.icon} text-xl`}></i>
                </div>

                <div className="flex flex-col items-center flex-grow">
                  <span className={`text-[9px] font-bold tracking-[0.3em] text-${item.color} opacity-60 uppercase`} style={{ marginBottom: '5px' }}>Phase {item.step}</span>
                  <h4 className="text-base font-bold mb-4 group-hover:text-white transition-colors leading-tight">
                    {item.title} <br />
                    <span className="opacity-70 group-hover:opacity-100">{item.subtitle}</span>
                  </h4>
                  <p className="text-xs text-muted leading-relaxed opacity-60 group-hover:opacity-90 transition-opacity">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Connector dots for large screens - only show between items in the same row */}
              {idx < 4 && (
                <div className="hidden xl:block absolute top-[45px] -right-[15px] w-8 h-[1px] bg-gradient-to-r from-white/10 to-transparent z-20 pointer-events-none"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative" id="faq">
        <div className="section-title flex flex-col items-center text-center mb-16">
          <span className="section-label">Knowledge Base</span>
          <h2 className="text-gradient">Project Intelligence FAQ</h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              q: "How does AI development integrate with my existing business?",
              a: "Our AI protocols focus on seamless integration. We build custom agents that connect to your legacy data streams through secure APIs, enabling intelligent automation without disrupting your architecture."
            },
            {
              q: "What are the benefits of Web3 solutions for enterprise?",
              a: "Web3 protocols offer decentralized security, transparent supply chain tracking, and automated governance through smart contracts, reducing operational friction and intermediary costs."
            },
            {
              q: "Do you offer cross-platform mobile development?",
              a: "Yes, we specialize in high-performance cross-platform ecosystems using React Native and Flutter, ensuring a unified code base that delivers native-level experiences on both iOS and Android."
            },
            {
              q: "What is the typical timeline for an automation project?",
              a: "Timelines vary by complexity, but most initial automation workframes are deployed within 4-8 weeks. This includes architectural planning, neural training, and system integration."
            },
            {
              q: "Do you provide long-term maintenance for deployed AI?",
              a: "Absolutely. We offer comprehensive support protocols, including continuous model retraining and system optimization to ensure your AI agents evolve with your business growth."
            },
            {
              q: "Can you assist with complete digital rebranding?",
              a: "Yes. Our creative engineering teams specialize in full-spectrum brand narratives, including logo architecture, visual identity, and strategic content production to dominate your market."
            }
          ].map((item, index) => (
            <div className="glass-card flex flex-col p-10 border-white/5 hover:border-primary/30 transition-all duration-300" key={index}>
              <h4 className="text-lg font-bold mb-6 text-primary leading-tight">{item.q}</h4>
              <p className="text-sm text-muted leading-relaxed opacity-80">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative overflow-hidden" id="contact">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-label">Contact Protocol</span>
            <h2 className="text-gradient text-5xl mb-10" style={{ marginBottom: '10px' }}>Let's build the future together.</h2>
            <p className="text-muted mb-16 text-lg" style={{ marginBottom: '10px' }}>
              Describe your project architecture and our lead strategists will respond within 24 hours.
              We are currently accepting high-impact projects globally.
            </p>

            <div className="space-y-0">
              <div className="flex items-center gap-8" style={{ marginBottom: '25px' }}>
                <a href="mailto:ecotrustiasolutions@gmail.com" className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)] flex-shrink-0 hover:bg-primary/30 transition-all duration-300 group/icon">
                  <i className="fas fa-envelope text-primary text-xl group-hover/icon:scale-110 transition-transform"></i>
                </a>
                <div>
                  <span className="text-[10px] uppercase text-primary tracking-[0.4em] font-extrabold mb-2 block opacity-80">Email</span>
                  <p className="font-semibold text-xl text-white tracking-wide hover:text-primary transition-colors">
                    <a href="mailto:ecotrustiasolutions@gmail.com">ecotrustiasolutions@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8" style={{ marginBottom: '25px' }}>
                <a href="tel:+971557888645" className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)] flex-shrink-0 hover:bg-primary/30 transition-all duration-300 group/icon">
                  <i className="fas fa-phone text-primary text-xl group-hover/icon:scale-110 transition-transform"></i>
                </a>
                <div>
                  <span className="text-[10px] uppercase text-primary tracking-[0.4em] font-extrabold mb-2 block opacity-80">Phone</span>
                  <p className="font-semibold text-xl hover:text-primary transition-colors cursor-pointer text-white tracking-wide">
                    <a href="tel:+971557888645">+971 55 788 8645</a>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8" style={{ marginBottom: '25px' }}>
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/50 shadow-[0_0_15px_rgba(139,92,246,0.3)] flex-shrink-0 hover:bg-primary/30 transition-all duration-300 group/icon">
                  <i className="fas fa-map-marker-alt text-primary text-xl group-hover/icon:scale-110 transition-transform"></i>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-primary tracking-[0.4em] font-extrabold mb-2 block opacity-80">Location</span>
                  <p className="font-semibold text-xl text-white tracking-wide">United Arab Emirates</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4 relative z-20">
              {[
                { icon: "fa-facebook-f", link: "https://www.facebook.com/profile.php?id=61571744234287" },
                { icon: "fa-linkedin-in", link: "https://www.linkedin.com/company/ecotrustia-solutions/" },
                { icon: "fa-instagram", link: "https://www.instagram.com/ecotrustia_solutions/" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.link} 
                  target="_blank" 
                  className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-muted border border-white/10 transition-all duration-300 hover:bg-primary/20 hover:text-primary hover:border-primary/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:-translate-y-1"
                >
                  <i className={`fab ${social.icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="glass-card p-0 overflow-hidden">
            <div className="p-8 lg:p-12">
              <form id="contactForm" className="space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label>Inquirer Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. Julian Thorne" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="julian@future.io" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Primary Interest</label>
                  <select 
                    className="form-control appearance-none"
                    value={formData.interest}
                    onChange={(e) => setFormData({...formData, interest: e.target.value})}
                  >
                    <optgroup label="AI Automation">
                      {aiServices.map(s => <option key={s.title}>{s.title}</option>)}
                    </optgroup>
                    <optgroup label="Digital & Creative">
                      {creativeServices.map(s => <option key={s.title}>{s.title}</option>)}
                    </optgroup>
                  </select>
                </div>
                <div className="form-group">
                  <label>Project Blueprint (Message)</label>
                  <textarea 
                    className="form-control min-h-[120px]" 
                    placeholder="Briefly describe your vision..."
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                {formStatus === 'success' && (
                  <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-400 text-sm text-center">
                    Message received successfully. Our team will contact you shortly.
                  </div>
                )}
                
                {formStatus === 'error' && (
                  <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 text-sm text-center">
                    An error occurred. Please try again or email us directly.
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-primary w-full py-4 text-lg"
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting' ? 'Transmitting...' : (
                    <>Initiate Project <i className="fas fa-bolt ml-2"></i></>
                  )}
                </button>
              </form>
            </div>
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
