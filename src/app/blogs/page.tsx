'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Blog } from '../adminx/lib/db';

export default function BlogsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center"><div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div></div>}>
      <BlogsContent />
    </Suspense>
  );
}

function BlogsContent() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [activeTab, setActiveTab] = useState('All');
  const searchParams = useSearchParams();
  const tagParam = searchParams.get('tag');
  const catParam = searchParams.get('category');

  useEffect(() => {
    if (tagParam) setActiveTab(tagParam);
    if (catParam) setActiveTab(catParam);
  }, [tagParam, catParam]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('/api/blog');
      const data = await res.json();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  const featuredBlog = blogs.length > 0 ? blogs[0] : null;
  const latestBlogs = blogs.length > 1 ? blogs.slice(1) : [];

  const filteredBlogs = activeTab === 'All' 
    ? latestBlogs 
    : latestBlogs.filter(b => 
        b.categories?.some(c => c.toLowerCase() === activeTab.toLowerCase()) || 
        b.tags?.some(t => t.toLowerCase().replace('#', '') === activeTab.toLowerCase().replace('#', ''))
      );

  const popularTags = ['#AI', '#Web3', '#DesignSystems', '#Engineering', '#Blockchain', '#Automation'];
  const tabs = ['All', 'AI', 'Engineering', 'Design'];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden" style={{ paddingTop: '110px', paddingBottom: '80px' }}>
      {/* 
        Container: 5% horizontal padding on ALL sides guarantees 
        nothing ever touches any screen edge on any device.
      */}
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', paddingLeft: '5%', paddingRight: '5%', boxSizing: 'border-box' }}>

        {/* ─── FEATURED ARTICLE ─── */}
        {featuredBlog && (
          <section style={{ marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.15em', marginBottom: '16px', color: '#a855f7', fontWeight: 600, textTransform: 'uppercase' }}>
              Featured Article
            </p>

            <Link href={`/blogs/${featuredBlog.slug}`} className="group block">
              <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.02)',
                transition: 'all 0.4s ease',
              }}>
                {/* Full-width image on top — fills the entire card width */}
                <div style={{ position: 'relative', width: '100%', aspectRatio: '2.2 / 1' }}>
                  <img
                    src={featuredBlog.imageUrl || 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2000'}
                    alt={featuredBlog.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
                    className="group-hover:scale-105"
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0a0f 0%, transparent 60%)' }}></div>
                  {featuredBlog.categories?.[0] && (
                    <span style={{
                      position: 'absolute', top: '16px', left: '16px',
                      background: 'rgba(168,85,247,0.85)', color: '#fff',
                      borderRadius: '999px', fontSize: '10px', fontWeight: 700,
                      padding: '5px 14px', textTransform: 'uppercase', letterSpacing: '0.1em',
                    }}>
                      {featuredBlog.categories[0]}
                    </span>
                  )}
                </div>

                {/* Text content below image */}
                <div style={{ padding: '24px 28px 28px' }}>
                  <h2 style={{
                    fontSize: 'clamp(20px, 2.8vw, 32px)',
                    fontWeight: 800, lineHeight: 1.2,
                    marginBottom: '10px', color: '#fff',
                    transition: 'color 0.3s',
                  }} className="group-hover:!text-purple-300">
                    {featuredBlog.title}
                  </h2>
                  <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: 1.6, marginBottom: '18px', maxWidth: '600px' }}>
                    {featuredBlog.short_description}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '10px', fontWeight: 700, color: '#fff',
                      }}>ES</div>
                      <div>
                        <p style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>Ecotrustia Solutions</p>
                        <p style={{ fontSize: '10px', color: '#6b7280' }}>
                          {new Date(featuredBlog.date || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <span style={{ fontSize: '11px', color: '#6b7280' }}>5 min read</span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* ─── LATEST INSIGHTS HEADER ─── */}
        <section style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, marginBottom: '20px' }}>
            Latest Insights
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  fontSize: '10px', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.12em', padding: '7px 18px', borderRadius: '999px',
                  border: activeTab === tab ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  background: activeTab === tab ? '#9333ea' : 'rgba(255,255,255,0.03)',
                  color: activeTab === tab ? '#fff' : '#9ca3af',
                  cursor: 'pointer', transition: 'all 0.3s',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* ─── MAIN GRID ─── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }} className="lg:!grid-cols-[2fr_1fr]">
          
          {/* Feed */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }} className="sm-grid">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <Link href={`/blogs/${blog.slug}`} key={blog.id} className="group block">
                  <div style={{
                    borderRadius: '16px', overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(255,255,255,0.02)',
                    transition: 'all 0.4s ease', height: '100%',
                    display: 'flex', flexDirection: 'column',
                  }} className="hover:!border-purple-500/30 hover:!-translate-y-1">
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', overflow: 'hidden' }}>
                      <img
                        src={blog.imageUrl || 'https://images.unsplash.com/photo-1639762681485-074b7f4ec651?q=80&w=1000'}
                        alt={blog.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
                        className="group-hover:scale-110"
                      />
                      {blog.categories?.[0] && (
                        <span style={{
                          position: 'absolute', top: '10px', right: '10px',
                          background: 'rgba(10,10,15,0.8)', color: '#c4b5fd',
                          borderRadius: '999px', fontSize: '9px', fontWeight: 700,
                          padding: '4px 10px', textTransform: 'uppercase', letterSpacing: '0.08em',
                          border: '1px solid rgba(139,92,246,0.2)',
                        }}>
                          {blog.categories[0]}
                        </span>
                      )}
                    </div>
                    <div style={{ padding: '18px 18px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{
                        fontSize: '16px', fontWeight: 700, lineHeight: 1.3,
                        marginBottom: '8px', color: '#fff', transition: 'color 0.3s',
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                      }} className="group-hover:!text-purple-300">
                        {blog.title}
                      </h3>
                      <p style={{
                        fontSize: '13px', color: '#6b7280', lineHeight: 1.6,
                        marginBottom: '16px',
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                      }}>
                        {blog.short_description}
                      </p>
                      <div style={{
                        marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '12px',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{
                            width: '22px', height: '22px', borderRadius: '50%',
                            background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '7px', fontWeight: 800, color: '#fff'
                          }}>ES</div>
                          <span style={{ fontSize: '10px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ecotrustia Solutions</span>
                        </div>
                        <span style={{ fontSize: '10px', color: '#4b5563' }}>5 min</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div style={{
                gridColumn: '1 / -1', padding: '48px 20px', textAlign: 'center',
                borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
              }}>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>No articles found for this category.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="lg:sticky lg:top-[120px]">
            
            {/* Newsletter */}
            <div style={{
              borderRadius: '16px', padding: '28px 24px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.02)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(168,85,247,0.1)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px', position: 'relative', zIndex: 1 }}>Newsletter</h3>
              <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '18px', lineHeight: 1.5, position: 'relative', zIndex: 1 }}>
                Get the latest insights delivered to your inbox.
              </p>
              <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative', zIndex: 1 }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={{
                    width: '100%', padding: '10px 14px', fontSize: '13px',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '10px', color: '#fff', outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    width: '100%', padding: '10px', fontSize: '12px', fontWeight: 700,
                    background: 'linear-gradient(135deg, #9333ea, #3b82f6)',
                    color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer',
                    letterSpacing: '0.05em',
                  }}
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Tags */}
            <div style={{
              borderRadius: '16px', padding: '24px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.02)',
            }}>
              <h3 style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)', marginBottom: '14px' }}>
                Popular Tags
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {popularTags.map(tag => (
                  <Link href={`/blogs?tag=${tag.replace('#', '')}`} key={tag}>
                    <span style={{
                      display: 'inline-block', fontSize: '11px', fontWeight: 500,
                      padding: '5px 12px', borderRadius: '999px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      color: '#9ca3af', cursor: 'pointer', transition: 'all 0.3s',
                    }}>
                      {tag}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 640px) {
          .sm-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}