'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Blog } from '../../adminx/lib/db';
import { FaTwitter, FaLinkedin, FaFacebook, FaLink } from 'react-icons/fa';
import './blog-post.css';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const blogRes = await fetch(`/api/blog/${slug}`);
        const blogData = await blogRes.json();
        setBlog(blogData);

        const recentRes = await fetch('/api/blog');
        const recentData: Blog[] = await recentRes.json();
        setRecentBlogs(recentData.filter(b => b.slug !== slug).slice(0, 3));
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-4 italic">404: INSIGHT NOT FOUND</h1>
        <Link href="/blogs" className="text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-widest text-xs font-bold">
          &larr; Return to Central Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30">
      
      {/* ─── Hero Section ─── */}
      <section className="relative pt-40 pb-24 px-[5%]">
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 hover:text-purple-400 transition-all mb-10 group">
            <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back to Central Hub
          </Link>
          
          <div className="flex gap-2 mb-8">
            {blog.categories?.slice(0, 2).map(cat => (
              <span key={cat} className="px-5 py-1.5 rounded-full bg-purple-500/5 border border-purple-500/20 text-purple-400 text-[9px] uppercase font-bold tracking-[0.1em]">
                {cat}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-7xl font-black leading-[1.1] mb-10 text-white tracking-tighter">
            {blog.title}
          </h1>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 text-gray-500">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-[8px] font-black text-white">ES</div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-300">Ecotrustia Solutions</span>
             </div>
             <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/10"></span>
             <span className="text-[11px] font-medium uppercase tracking-widest">
               {new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
             </span>
             <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/10"></span>
             <span className="text-[11px] font-medium uppercase tracking-widest">5 MIN READ</span>
          </div>
        </div>

        {/* Cinematic Background Blur */}
        <div className="absolute top-0 right-0 w-full h-[100%] bg-gradient-to-b from-purple-500/10 to-transparent blur-[120px] -z-0 pointer-events-none"></div>
      </section>

      {/* ─── Featured Image ─── */}
      <section className="px-[5%] mb-24">
        <div className="max-w-6xl mx-auto rounded-[40px] overflow-hidden border border-white/5 shadow-[0_0_80px_-20px_rgba(139,92,246,0.3)]">
          <img 
            src={blog.imageUrl || 'https://images.unsplash.com/photo-1639762681485-074b7f4ec651?q=80&w=2000'} 
            alt={blog.title}
            className="w-full aspect-[21/10] object-cover hover:scale-105 transition-transform duration-[2s] ease-out"
          />
        </div>
      </section>

      {/* ─── Content & Sidebar ─── */}
      <section className="px-[5%] pb-32">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 xl:gap-24">
          
          {/* Share Sidebar (Sticky) */}
          <aside className="lg:w-16 hidden lg:block">
            <div className="sticky top-40 flex flex-col items-center gap-6">
              <span className="text-[9px] font-bold uppercase vertical-text tracking-[0.3em] text-gray-600 mb-4 whitespace-nowrap">Share Insight</span>
              <button className="w-11 h-11 border border-white/5 bg-white/5 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                <FaTwitter size={16} />
              </button>
              <button className="w-11 h-11 border border-white/5 bg-white/5 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                <FaLinkedin size={16} />
              </button>
              <button 
                onClick={copyToClipboard}
                className="w-11 h-11 border border-white/5 bg-white/5 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all relative"
              >
                <FaLink size={14} />
                {copied && <span className="absolute -top-10 bg-purple-600 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">Copied!</span>}
              </button>
            </div>
          </aside>

          {/* Article Main Body */}
          <div className="flex-1 max-w-4xl">
            <div 
              className="blog-content-rich"
              dangerouslySetInnerHTML={{ __html: blog.content }} 
            />
            
            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-24 pt-12 border-t border-white/5">
                <p className="text-[10px] uppercase font-bold tracking-widest text-gray-600 mb-6">Classified Under</p>
                <div className="flex flex-wrap gap-4">
                  {blog.tags.map(tag => (
                    <span key={tag} className="text-xs text-gray-400 hover:text-purple-400 font-bold transition-colors">
                      #{tag.replace('#', '')}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Content Summary / About Card */}
          <aside className="lg:w-[450px] hidden xl:block">
            <div className="sticky top-40 about-card-glass">
               <h4 className="card-label">About this Insight</h4>
               <p className="card-description">
                 "{blog.short_description}"
               </p>
               <div className="guarantee-box">
                 <p className="guarantee-title">Ecotrustia Guarantee</p>
                 <p className="guarantee-text">
                   Verified digital architecture and strategic intelligence for visionary partners worldwide.
                 </p>
               </div>
            </div>
          </aside>
        </div>
      </section>

      <style jsx>{`
        .about-card-glass {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 40px;
          padding: 50px 45px;
          box-sizing: border-box;
          width: 100%;
        }
        .card-label {
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 30px;
          display: block;
        }
        .card-description {
          font-size: 18px;
          line-height: 1.7;
          color: #d1d5db;
          font-style: italic;
          font-weight: 300;
          margin-bottom: 40px;
        }
        .guarantee-box {
          background: rgba(147, 51, 234, 0.05);
          border-left: 4px solid rgba(147, 51, 234, 0.5);
          border-radius: 20px;
          padding: 30px 35px;
          box-sizing: border-box;
          transition: all 0.3s ease;
        }
        .guarantee-box:hover {
          border-left-color: #9333ea;
          background: rgba(147, 51, 234, 0.08);
        }
        .guarantee-title {
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: #a78bfa;
          margin-bottom: 12px;
        }
        .guarantee-text {
          font-size: 13px;
          line-height: 1.8;
          color: #9ca3af;
          font-weight: 500;
        }
      `}</style>

      {/* ─── Recent Blogs Section ─── */}
      {recentBlogs.length > 0 && (
        <section className="px-[5%] py-32 bg-[#080808] border-t border-white/5 overflow-visible">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
              <div>
                <span className="text-purple-500 text-[10px] uppercase font-black tracking-[0.4em] block mb-4">Neural Network Expands</span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">Recent Archives</h2>
              </div>
              <Link href="/blogs" className="group flex items-center gap-3 text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 hover:text-white transition-all">
                Access Central Hub <span className="group-hover:translate-x-2 transition-transform">&rarr;</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {recentBlogs.map((item) => (
                <Link href={`/blogs/${item.slug}`} key={item.id} className="archive-card-link group">
                  <div className="archive-card">
                    <div className="archive-card-image">
                      <img 
                        src={item.imageUrl || 'https://images.unsplash.com/photo-1639762681485-074b7f4ec651?q=80&w=1000'} 
                        alt={item.title}
                      />
                    </div>
                    <div className="archive-card-content">
                      <span className="archive-card-category">
                        {item.categories?.[0] || 'Archives'}
                      </span>
                      <h3 className="archive-card-title">
                        {item.title}
                      </h3>
                      <p className="archive-card-excerpt">
                        {item.short_description}
                      </p>
                      <div className="archive-card-footer">
                         <div className="active-indicator">
                            <span className="dot"></span>
                            <span>Active Insight</span>
                         </div>
                         <span className="arrow">&rarr;</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA Section ─── */}
      <section className="px-[5%] py-40 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col items-center text-center">
           <div className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[11px] font-black uppercase tracking-[0.3em] mb-14 min-w-[240px]">
             Strategic Partnership
           </div>
           <h2 className="text-4xl md:text-7xl lg:text-[100px] font-black mb-12 tracking-[-0.04em] leading-[0.95] text-white max-w-5xl">
             Ready to Deploy<span className="text-purple-500">?</span>
           </h2>
           <p className="text-gray-400 mb-16 text-lg md:text-xl max-w-2xl leading-relaxed font-medium">
             Join a select network of global innovators leveraging high-scale AI and Web3 ecosystems to define the next digital frontier.
           </p>
           <div className="relative group">
             <div className="absolute inset-0 bg-purple-600 blur-2xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
             <Link href="/#contact" className="relative inline-flex items-center justify-center px-16 py-9 bg-white text-black font-black uppercase tracking-[0.2em] text-[13px] rounded-full hover:bg-purple-600 hover:text-white transition-all transform hover:scale-105 duration-500 min-w-[340px]">
               Initiate Project Sequence
             </Link>
           </div>
        </div>
        
        {/* Background Ambience */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      </section>

      <style jsx global>{`
        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
        .blog-content-rich {
          font-family: 'Inter', system-ui, sans-serif;
          color: #9ca3af;
          font-size: 1.125rem;
          line-height: 1.9;
        }
        .blog-content-rich h2 {
          font-size: 2.5rem;
          font-weight: 900;
          color: #fff;
          margin-top: 5rem;
          margin-bottom: 2rem;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        .blog-content-rich h3 {
          font-size: 1.75rem;
          font-weight: 800;
          color: #fff;
          margin-top: 4rem;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }
        .blog-content-rich p {
          margin-bottom: 2rem;
        }
        .blog-content-rich ul, .blog-content-rich ol {
          margin-bottom: 3rem;
          padding-left: 1.5rem;
          border-left: 1px solid rgba(255,255,255,0.05);
        }
        .blog-content-rich li {
          margin-bottom: 1rem;
          position: relative;
          padding-left: 1.5rem;
        }
        .blog-content-rich ul li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.8em;
          width: 0.5rem;
          height: 1px;
          background: #9333ea;
        }
        .blog-content-rich blockquote {
          border-left: 2px solid #9333ea;
          padding: 2.5rem 3.5rem;
          background: rgba(147, 51, 234, 0.03);
          margin: 5rem 0;
          font-style: italic;
          border-radius: 0 40px 40px 0;
          color: #d1d5db;
          font-size: 1.5rem;
          line-height: 1.6;
          font-weight: 300;
        }
        .blog-content-rich img {
          border-radius: 40px;
          margin: 6rem 0;
          border: 1px solid rgba(255,255,255,0.05);
          width: 100%;
        }
        .blog-content-rich strong {
          color: #fff;
          font-weight: 800;
        }
        .blog-content-rich a {
           color: #a78bfa;
           text-decoration: underline;
           text-underline-offset: 4px;
           text-decoration-thickness: 1px;
           transition: all 0.3s;
        }
        .blog-content-rich a:hover {
           color: #fff;
           text-decoration-thickness: 2px;
        }

        .archive-card-link {
          text-decoration: none;
          display: block;
          height: 100%;
          padding: 15px 0; /* Add vertical space for the hover lift */
        }
        .archive-card {
          background: #0c0c0c;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 32px;
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
          transition: all 0.7s cubic-bezier(0.23, 1, 0.32, 1);
          box-sizing: border-box;
          position: relative;
        }
        .archive-card-link:hover .archive-card {
          border-color: rgba(147, 51, 234, 0.4);
          transform: translateY(-8px);
          box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.9);
        }
        .archive-card-image {
          aspect-ratio: 16 / 10;
          overflow: hidden;
          filter: grayscale(1);
          transition: filter 1s ease;
        }
        .archive-card-link:hover .archive-card-image {
          filter: grayscale(0);
        }
        .archive-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 3s ease;
        }
        .archive-card-link:hover .archive-card-image img {
          transform: scale(1.1);
        }
        .archive-card-content {
          padding: 35px 35px 45px 35px; /* Significant bottom padding for hover safety */
          display: flex;
          flex-direction: column;
          flex: 1;
          box-sizing: border-box;
        }
        .archive-card-category {
          font-size: 9px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #a78bfa;
          margin-bottom: 20px;
          display: block;
        }
        .archive-card-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #fff;
          line-height: 1.4;
          margin-bottom: 20px;
          transition: color 0.3s;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .archive-card-link:hover .archive-card-title {
          color: #c4b5fd;
        }
        .archive-card-excerpt {
          font-size: 14px;
          line-height: 1.8;
          color: #6b7280;
          margin-bottom: 30px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .archive-card-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 25px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .active-indicator {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #4b5563;
        }
        .dot {
          width: 6px;
          height: 6px;
          background: #9333ea;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        .arrow {
          color: #fff;
          font-weight: 900;
          transition: color 0.3s, transform 0.3s;
        }
        .archive-card-link:hover .arrow {
          color: #a78bfa;
          transform: translateX(4px);
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}