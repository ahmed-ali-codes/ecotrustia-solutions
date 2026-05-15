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
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden py-24 px-5">
      
      {/* Background Cyber Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

      <div className="max-w-4xl w-full relative z-10 glass-card p-12 md:p-16 border-white/5 rounded-[2rem] shadow-[0_0_50px_rgba(139,92,246,0.05)]">
        
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md text-secondary font-mono text-xs uppercase tracking-[0.2em]">
             <i className="fas fa-shield-alt"></i> Root Access Granted
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary drop-shadow-[0_0_20px_rgba(139,92,246,0.3)] tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-muted mt-4">Command center for Ecotrustia site deployment.</p>
        </header>

        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <Link href="/adminx/blog" className="glass-card flex items-center justify-center p-5 rounded-xl border border-white/5 bg-white/5 hover:bg-primary/20 hover:border-primary/40 transition-all group font-medium tracking-wide">
            <span className="group-hover:text-white transition-colors">Manage Blog</span>
          </Link>
          <Link href="/adminx/portfolio" className="glass-card flex items-center justify-center p-5 rounded-xl border border-white/5 bg-white/5 hover:bg-primary/20 hover:border-primary/40 transition-all group font-medium tracking-wide">
            <span className="group-hover:text-white transition-colors">Manage Portfolio</span>
          </Link>
          <Link href="/adminx/contact" className="glass-card flex items-center justify-center p-5 rounded-xl border border-white/5 bg-white/5 hover:bg-secondary/20 hover:border-secondary/40 transition-all group font-medium tracking-wide sm:col-span-2">
            <span className="group-hover:text-white transition-colors">Contact Submissions</span>
          </Link>
          <Link href="/adminx/settings" className="glass-card flex items-center justify-center p-5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all group font-medium tracking-wide sm:col-span-2">
            <span className="group-hover:text-white transition-colors"><i className="fas fa-cog mr-2"></i> Settings</span>
          </Link>
        </nav>

        <div className="mt-12 pt-10 border-t border-white/10 flex justify-center">
          <button 
            onClick={handleLogout} 
            className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-red-500/30 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all uppercase text-xs tracking-widest font-bold"
          >
            <i className="fas fa-power-off"></i> Logout Sequence
          </button>
        </div>

      </div>
    </div>
  );
}