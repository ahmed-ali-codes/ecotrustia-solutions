import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const servicesData = {
  "mobile-app-development": {
    title: "Mobile App Development",
    subtitle: "Native & Cross-Platform Mobile Architectures",
    icon: "fa-mobile-screen-button",
    color: "primary",
    description: "High-performance mobile applications engineered for both iOS and Android. We build robust, scalable architectures with native-level performance and breathtaking user interfaces that engage and convert.",
    features: [
      "iOS & Android Native Development",
      "React Native & Flutter Cross-Platform",
      "Seamless API Integrations",
      "Offline Functionality Architecture",
      "Real-time Data Syncing Options"
    ]
  },
  "web-software-development": {
    title: "Web & Software Development",
    subtitle: "High-Scale Web Solutions & SaaS Architecture",
    icon: "fa-laptop-code",
    color: "secondary",
    description: "End-to-end software and web development services tailored specifically to your business logic. From intricate SaaS platforms to sleek corporate websites, we construct systems engineered for scale, speed, and security.",
    features: [
      "Full-Stack Web Architectures",
      "SaaS Platform Engineering",
      "Custom Enterprise Software",
      "Progressive Web Apps (PWAs)",
      "Serverless & Microservices Integration"
    ]
  },
  "ai-automation-integration": {
    title: "AI Automation & Integration",
    subtitle: "Intelligent Protocols to Supercharge Operations",
    icon: "fa-robot",
    color: "primary",
    description: "Liberate your workforce from repetitive tasks by integrating autonomous AI agents and intelligent workflows into your existing business architecture, skyrocketing efficiency and reducing operational friction.",
    features: [
      "Custom AI Chatbots & Support Agents",
      "Automated Marketing & Lead Nurturing",
      "Voice AI & Intelligent Call Routing",
      "Machine Learning Data Analytics",
      "API Bridges & Legacy System Integration"
    ]
  },
  "quality-assurance-testing": {
    title: "Quality Assurance & Testing",
    subtitle: "Rigorous Stress-Testing & Secure Deployment",
    icon: "fa-shield-halved",
    color: "secondary",
    description: "Our exhaustive testing protocols ensure that your digital ecosystem operates flawlessly under all conditions. We hunt down vulnerabilities and performance bottlenecks before your users ever see them.",
    features: [
      "Automated Testing Suites",
      "Penetration Testing & Security Audits",
      "Cross-Platform Compatibility Testing",
      "Load & Performance Stress Testing",
      "Continuous Integration QA"
    ]
  },
  "ecommerce-development": {
    title: "E-Commerce Development",
    subtitle: "Optimized Conversion Funnels & Retail Platforms",
    icon: "fa-cart-shopping",
    color: "primary",
    description: "Transform your retail operations with cutting-edge e-commerce platforms. We architect seamless shopping experiences, mobile-optimized checkout flows, and intelligent inventory integrations.",
    features: [
      "Shopify & WooCommerce Builds",
      "Custom Headless E-commerce Solutions",
      "Payment Gateway Integration",
      "Inventory & ERP System Syncing",
      "Conversion Rate Optimization (CRO)"
    ]
  },
  "ui-ux-design": {
    title: "UI/UX & Product Design",
    subtitle: "Aesthetic Excellence meets Strategic Functionality",
    icon: "fa-pen-nib",
    color: "secondary",
    description: "We don't just design interfaces; we craft intuitive user journeys that feel inevitable. Our design philosophy bridges the gap between striking neon aesthetics and friction-less usability.",
    features: [
      "Wireframing & Interactive Prototyping",
      "User Journey Mapping & Architecture",
      "High-Fidelity Interface Design",
      "Design Systems & Component Libraries",
      "Usability Testing & Iteration"
    ]
  }
};

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const service = servicesData[slug as keyof typeof servicesData];

  if (!service) {
    notFound();
  }

  return (
    <>
      <div className="pt-32 pb-20 relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background glows matching the theme */}
        <div className={`absolute top-0 right-1/4 w-[400px] h-[400px] bg-${service.color}/20 blur-[120px] rounded-full pointer-events-none`}></div>
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-white/5 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        <div className="hero-grid opacity-30 z-0"></div>

        <div className="max-w-4xl mx-auto px-5 relative z-10 text-center">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/5 border border-white/10 text-${service.color} mb-8 shadow-[0_0_30px_rgba(var(--${service.color}-glow),0.3)]`}>
                <i className={`fas ${service.icon} text-3xl`}></i>
            </div>
            <span className={`block text-[11px] uppercase tracking-[0.3em] font-bold text-${service.color} mb-4`}>
                Service Module
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                {service.title}
            </h1>
            <p className="text-xl text-muted font-light max-w-2xl mx-auto leading-relaxed">
                {service.subtitle}
            </p>
        </div>
      </div>

      <section className="py-20 relative bg-black/40">
        <div className="max-w-7xl mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="glass-card p-10 lg:p-14 border border-white/5 rounded-3xl relative overflow-hidden group">
                     {/* Inner ambient glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-${service.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-duration-700 pointer-events-none`}></div>
                    
                    <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                        <i className={`fas fa-microchip text-${service.color}`}></i>
                        Core Architecture
                    </h2>
                    <p className="text-muted leading-loose text-lg mb-8">
                        {service.description}
                    </p>

                    <div className="space-y-4">
                        {service.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/5 p-4 rounded-xl hover:border-white/10 transition-colors">
                                <i className={`fas fa-check-circle text-${service.color} text-sm`}></i>
                                <span className="text-gray-300 text-sm font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    <h3 className="text-3xl font-bold mb-2">Ready to initiate <br/><span className={`text-${service.color}`}>{service.title.split(' ')[0]}</span> operations?</h3>
                    <p className="text-muted text-lg mb-4">Our engineering teams are standing by to architect your next technological leap forward.</p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/#contact" className="btn btn-primary px-8 py-4">
                            Start Your Project <i className="fas fa-bolt ml-2"></i>
                        </Link>
                        <Link href="/portfolio" className="btn btn-outline px-8 py-4">
                            View Portfolio
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="glass-card p-6 flex flex-col gap-2 rounded-2xl border-white/10">
                            <i className={`fas fa-rocket text-2xl text-${service.color}`}></i>
                            <h4 className="font-bold">Fast Deployment</h4>
                            <p className="text-xs text-muted">Optimized sprint cycles</p>
                        </div>
                        <div className="glass-card p-6 flex flex-col gap-2 rounded-2xl border-white/10">
                            <i className="fas fa-lock text-2xl text-white"></i>
                            <h4 className="font-bold">Secure Infrastructure</h4>
                            <p className="text-xs text-muted">Enterprise-grade security</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </>
  );
}
