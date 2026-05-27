import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

export default function Navbar() {
  const router = useRouter();
  const path = router.pathname;
  const navRef = useRef(null);

  const isActive = (href) => {
    if (href === '/' && path === '/') return true;
    if (href !== '/' && path.startsWith(href)) return true;
    return false;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      if (window.scrollY > 40) {
        navRef.current.style.background = 'rgba(255,255,255,0.92)';
        navRef.current.style.boxShadow = '0 8px 40px rgba(0,0,0,0.09)';
      } else {
        navRef.current.style.background = 'rgba(255,255,255,0.75)';
        navRef.current.style.boxShadow = '0 4px 32px rgba(0,0,0,0.06)';
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav ref={navRef} id="navbar">
      <Link href="/" className="nav-logo">ZILIST</Link>
      <div className="nav-links">
        <Link href="/" className={isActive('/') && path==='/' ? 'active' : ''}>Home</Link>
        <Link href="/features" className={isActive('/features') ? 'active' : ''}>Features</Link>
        <Link href="/solutions" className={isActive('/solutions') ? 'active' : ''}>Solutions</Link>
        <Link href="/projects" className={isActive('/projects') ? 'active' : ''}>Projects</Link>
        <Link href="/about" className={isActive('/about') ? 'active' : ''}>About</Link>
        <Link href="/resources" className={isActive('/resources') ? 'active' : ''}>Resources</Link>
        <Link href="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link>
        <Link href="/portfolio" className={isActive('/portfolio') ? 'active' : ''}>Portfolio</Link>
      </div>
      <div className="nav-right">
        <Link href="/contact" className="btn-nav btn-contact">Contact Me</Link>
        <Link href="/admin" className="btn-nav btn-admin">Admin Login</Link>
      </div>
    </nav>
  );
}
