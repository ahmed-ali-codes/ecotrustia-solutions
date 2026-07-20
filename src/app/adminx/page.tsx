'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
// Keeping import if any structural css remains, though Tailwind will map the theme.
import './dashboard.css';

export default function AdminPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
      });

      if (res.ok) {
        router.push('/adminx/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred during logout', error);
    }
  };

  return (
    <div className="bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden" style={{ minHeight: '100vh', padding: '30px 20px' }}>
      
      {/* Background Cyber Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

      <div className="w-full relative z-10 glass-card border-white/5 rounded-[2rem] shadow-[0_0_50px_rgba(139,92,246,0.05)]" style={{ maxWidth: '800px', padding: '32px' }}>
        
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-md text-secondary font-mono text-[10px] uppercase tracking-[0.2em]">
             <i className="fas fa-shield-alt"></i> Root Access Granted
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary drop-shadow-[0_0_20px_rgba(139,92,246,0.3)] tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-muted mt-2 text-sm">Command center for Ecotrustia site deployment.</p>
        </header>

        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
          <Link href="/adminx/blog" className="glass-card flex items-center justify-center p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-primary/20 hover:border-primary/40 transition-all group font-medium tracking-wide text-sm">
            <span className="group-hover:text-white transition-colors">Manage Blog</span>
          </Link>
          <Link href="/adminx/portfolio" className="glass-card flex items-center justify-center p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-primary/20 hover:border-primary/40 transition-all group font-medium tracking-wide text-sm">
            <span className="group-hover:text-white transition-colors">Manage Portfolio</span>
          </Link>
          <Link href="/adminx/contact" className="glass-card flex items-center justify-center p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-secondary/20 hover:border-secondary/40 transition-all group font-medium tracking-wide sm:col-span-2 text-sm">
            <span className="group-hover:text-white transition-colors">Contact Submissions</span>
          </Link>
          <Link href="/adminx/settings" className="glass-card flex items-center justify-center p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all group font-medium tracking-wide sm:col-span-2 text-sm">
            <span className="group-hover:text-white transition-colors"><i className="fas fa-cog mr-2"></i> Settings</span>
          </Link>
        </nav>

        <div className="flex justify-center w-full" style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <button 
            onClick={handleLogout} 
            style={{ padding: '10px 24px', borderRadius: '10px' }}
            className="inline-flex items-center justify-center gap-2 border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all uppercase text-[11px] tracking-widest font-bold"
          >
            <i className="fas fa-power-off"></i> Logout
          </button>
        </div>

      </div>
    </div>
  );
}