import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from './Chatbot';
import { useEffect, useRef } from 'react';

export default function Layout({ children, title = 'ZILIST — Build Smarter. Automate Everything.', noFooter = false }) {
  const canvasRef = useRef(null);
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

  useEffect(() => {
    // Three.js background
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;
    if (!window.THREE) return;
    const THREE = window.THREE;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;
    const particles = [];
    const geo = new THREE.SphereGeometry(0.04, 8, 8);
    for (let i = 0; i < 80; i++) {
      const mat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: Math.random() * 0.4 + 0.1 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set((Math.random() - 0.5) * 16, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6);
      mesh.userData = { vx: (Math.random() - 0.5) * 0.002, vy: (Math.random() - 0.5) * 0.002 };
      scene.add(mesh);
      particles.push(mesh);
    }
    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      particles.forEach(p => {
        p.position.x += p.userData.vx;
        p.position.y += p.userData.vy;
        if (Math.abs(p.position.x) > 8) p.userData.vx *= -1;
        if (Math.abs(p.position.y) > 5) p.userData.vy *= -1;
      });
      renderer.render(scene, camera);
    };
    animate();
    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); renderer.dispose(); };
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
        <meta name="description" content="ZILIST by Praveen Kannan builds futuristic AI systems, AI chatbots, automation platforms, dashboards, and premium full-stack digital experiences." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

      </Head>

      <div id="cursor" ref={cursorRef}></div>
      <div id="cursor-ring" ref={cursorRingRef}></div>
      <canvas id="bg-canvas" ref={canvasRef}></canvas>

      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </main>
      {!noFooter && <Footer />}
      <Chatbot />
    </>
  );
}
