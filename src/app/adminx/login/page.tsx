'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/adminx');
      } else {
        const data = await res.json();
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-5 relative overflow-hidden bg-black">
        <div className="hero-grid"></div>

        {/* Abstract Background Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className={`max-w-md w-full relative z-10 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10">
            <Link href="/" className="flex flex-col items-center gap-4 mb-4 group block">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(139,92,246,0.3)] group-hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] transition-all duration-500">
                <Image src="/images/logo.jpg" alt="Logo" fill className="object-cover" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white group-hover:text-glow transition-all">
                Ecotrustia <span className="text-primary" style={{ color: 'var(--primary)' }}>Solutions</span>
              </h1>
            </Link>
            <p className="text-primary text-[11px] font-bold uppercase tracking-[0.3em]" style={{ marginBottom: '15px' }}>Admin Control Protocol</p>
          </div>

          <div className="glass-card p-10 border-white/10 bg-[#0a0a0f]/80 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
            {/* Card Inner Glow Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <h2 className="text-xl font-bold mb-8 text-center text-gradient">Identity Verification</h2>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-xl text-center flex items-center justify-center gap-2">
                  <i className="fas fa-exclamation-triangle"></i>
                  {error}
                </div>
              )}

              <div className="form-group mb-6">
                <label className="text-[10px] uppercase tracking-widest text-muted mb-3 block font-semibold flex items-center gap-2">
                  <i className="fas fa-user text-primary/70"></i> Operator ID
                </label>
                <input
                  type="text"
                  className="form-control bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 py-3 px-4 text-sm rounded-xl outline-none w-full text-white transition-all shadow-inner"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-8">
                <label className="text-[10px] uppercase tracking-widest text-muted mb-3 block font-semibold flex items-center gap-2">
                  <i className="fas fa-fingerprint text-secondary/70"></i> Access Cipher
                </label>
                <input
                  type="password"
                  className="form-control bg-white/5 border-white/10 focus:border-secondary/50 focus:bg-white/10 py-3 px-4 text-sm rounded-xl outline-none w-full text-white transition-all shadow-inner"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-full py-4 uppercase tracking-[0.2em] text-[11px] rounded-xl hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] border border-primary/50">
                Authorize Access <i className="fas fa-key ml-2 opacity-80"></i>
              </button>
            </form>
          </div>

          <div className="mt-10 text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase font-semibold tracking-widest text-muted hover:text-white transition-colors group">
              <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
              Return to Public Interface
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .text-glow {
          text-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
        }
      `}</style>
    </>
  );
}