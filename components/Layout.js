import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from './Chatbot';
import { useEffect, useRef } from 'react';

export default function Layout({ children, title = 'PK_Tech_Warrior — Build Smarter. Automate Everything.', noFooter = false }) {
  const cursorRef = useRef(null);
  const cursorRingRef = useRef(null);

  useEffect(() => {
    // Cursor
    const cursor = cursorRef.current;
    const ring = cursorRingRef.current;
    let mx = 0, my = 0, rx = 0, ry = 0;
    const moveCursor = (e) => {
      mx = e.clientX; my = e.clientY;
      if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
    };
    const animRing = () => {
      rx += (mx - rx) * 0.14; ry += (my - ry) * 0.14;
      if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
      requestAnimationFrame(animRing);
    };
    window.addEventListener('mousemove', moveCursor);
    animRing();

    // Hover effect
    const links = document.querySelectorAll('a,button');
    links.forEach(el => {
      el.addEventListener('mouseenter', () => { if(cursor){cursor.style.width='24px';cursor.style.height='24px';} });
      el.addEventListener('mouseleave', () => { if(cursor){cursor.style.width='12px';cursor.style.height='12px';} });
    });

    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.glass-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });
    return () => observer.disconnect();
  });

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="PK_Tech_Warrior by Praveen Kannan builds futuristic AI systems, AI chatbots, automation platforms, dashboards, and premium full-stack digital experiences." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

      </Head>

      <div id="cursor" ref={cursorRef}></div>
      <div id="cursor-ring" ref={cursorRingRef}></div>

      {/* Fullscreen background video — replaces Three.js canvas */}
      <video
        autoPlay
        muted
        loop
        playsInline
        id="bg-video"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4"
          type="video/mp4"
        />
      </video>

      {/* Semi-transparent overlay so existing content stays readable */}
      <div id="bg-video-overlay" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(240, 238, 235, 0.55)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </main>
      {!noFooter && <Footer />}
      <Chatbot />
    </>
  );
}
