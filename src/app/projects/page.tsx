'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  link?: string;
  metaDescription?: string;
  technologies?: string;
  type?: string;
};

const ProjectCard = ({ project }: { project: Project }) => (
  <div key={project.id} className="fade-up relative group">
    <div className="glass-card h-full p-2 rounded-[2rem] border border-white/5 bg-black/40 shadow-xl backdrop-blur-xl transition-all duration-500 hover:border-primary/40 hover:shadow-[0_20px_40px_-15px_rgba(139,92,246,0.5)] overflow-hidden flex flex-col">
      <div className="p-6 md:p-10 flex flex-col flex-1 z-10 relative">
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
);

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'web' | 'automation'>('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/portfolio');
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    document.querySelectorAll(".fade-up").forEach((el) => {
      el.classList.add("fade-in-init");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [projects]);

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-primary/30 selection:text-white overflow-x-hidden" style={{ paddingTop: '180px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
        <div className="flex flex-col items-center justify-center w-full" style={{ marginBottom: '80px', textAlign: 'center' }}>
          <span className="inline-flex items-center justify-center gap-4 px-8 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-primary font-mono text-xs uppercase tracking-[0.3em] shadow-[0_0_40px_rgba(139,92,246,0.3)]" style={{ marginBottom: '30px' }}>Complete Archive</span>
          
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-400 to-primary drop-shadow-[0_0_30px_rgba(139,92,246,0.4)] font-black tracking-tighter" style={{ fontSize: '4rem', marginBottom: '30px', lineHeight: '1.2' }}>All Projects</h1>
          
          <p className="text-muted leading-relaxed" style={{ maxWidth: '42rem', margin: '0 auto', fontSize: '1.125rem', textAlign: 'center' }}>
            A comprehensive showcase of our digital solutions, web platforms, and automated intelligence.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-4 fade-up" style={{ marginBottom: '60px' }}>
              <button 
                onClick={() => setFilter('all')} 
                style={{ padding: '12px 32px', borderRadius: '8px', fontSize: '1.125rem', fontWeight: '500' }}
                className={`transition-all duration-300 border ${filter === 'all' ? 'bg-[#8B5CF6] text-white border-[#8B5CF6]' : 'bg-[#1a1a1a] text-white/80 border-white/10 hover:bg-[#2a2a2a]'}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('web')} 
                style={{ padding: '12px 32px', borderRadius: '8px', fontSize: '1.125rem', fontWeight: '500' }}
                className={`transition-all duration-300 border ${filter === 'web' ? 'bg-[#8B5CF6] text-white border-[#8B5CF6]' : 'bg-[#1a1a1a] text-white/80 border-white/10 hover:bg-[#2a2a2a]'}`}
              >
                Web
              </button>
              <button 
                onClick={() => setFilter('automation')} 
                style={{ padding: '12px 32px', borderRadius: '8px', fontSize: '1.125rem', fontWeight: '500' }}
                className={`transition-all duration-300 border ${filter === 'automation' ? 'bg-[#8B5CF6] text-white border-[#8B5CF6]' : 'bg-[#1a1a1a] text-white/80 border-white/10 hover:bg-[#2a2a2a]'}`}
              >
                Automation
              </button>
            </div>
            
            {projects.length === 0 ? (
              <div className="text-center py-20 fade-up w-full">
                <i className="fas fa-ghost text-4xl text-muted/50 mb-4"></i>
                <h3 className="text-2xl text-white mb-2">No Projects Found</h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {projects.filter(p => filter === 'all' ? true : filter === 'web' ? (!p.type || p.type === 'web') : p.type === 'automation').map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      
      <style jsx global>{`
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
    </div>
  );
}
