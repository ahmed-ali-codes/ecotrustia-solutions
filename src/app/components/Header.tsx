"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const navItemClass = (path: string) => {
    return `transition-colors hover:text-white ${
      pathname === path ? "text-white active" : "text-gray-400"
    }`;
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/10 group-hover:border-primary/50 transition-all">
              <Image
                src="/images/logo.jpg"
                alt="Ecotrustia Solutions Logo"
                fill
                className="object-cover"
              />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Ecotrustia <span className="text-primary">Solutions</span>
            </h1>
          </Link>
        </div>

        <ul className={`nav-links-custom ${isOpen ? "mobile-open" : ""}`}>
          <li><Link href="/" className={navItemClass("/")} onClick={closeMenu}>Home</Link></li>
          <li><Link href="/what-we-do" className={navItemClass("/what-we-do")} onClick={closeMenu}>What We Do</Link></li>
          <li><Link href="/portfolio" className={navItemClass("/portfolio")} onClick={closeMenu}>Portfolio</Link></li>
          <li><Link href="/tools" className={navItemClass("/tools")} onClick={closeMenu}>Tools</Link></li>
          <li><Link href="/blogs" className={navItemClass("/blogs")} onClick={closeMenu}>Blog</Link></li>
        </ul>

        <div className="flex items-center gap-4 relative z-50">
          <Link href="/#contact" className="btn btn-neon hidden sm:flex py-2 px-6 text-xs uppercase tracking-widest font-bold">
            Start Project
          </Link>
          <button
            className="hamburger-btn"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <style jsx>{`
        .nav-links-custom {
          display: flex;
          gap: 2.5rem;
          list-style: none;
          align-items: center;
        }
        .nav-links-custom a {
          color: #9ca3af;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
        }
        .nav-links-custom a:hover,
        .nav-links-custom a.active {
          color: #fff;
        }
        .nav-links-custom a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          transition: width 0.3s ease;
        }
        .nav-links-custom a:hover::after {
          width: 100%;
        }
        .hamburger-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          z-index: 1002;
        }
        @media (max-width: 1023px) {
          .nav-links-custom {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(5, 5, 5, 0.97);
            backdrop-filter: blur(20px);
            padding: 2rem 5%;
            gap: 1.5rem;
            z-index: 1001;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
          .nav-links-custom.mobile-open {
            display: flex !important;
          }
          .hamburger-btn {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
};

export default Header;