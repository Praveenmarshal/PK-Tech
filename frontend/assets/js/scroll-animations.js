/**
 * ZILIST — Scroll-driven 3D animations
 * Uses GSAP + ScrollTrigger for all scroll animations.
 * Falls back gracefully to IntersectionObserver if GSAP is unavailable.
 */
(function () {
  'use strict';

  /* ── Respect reduced-motion preference ── */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  /* ── Wait for GSAP + ScrollTrigger then init ── */
  function waitForGSAP(cb, tries) {
    tries = tries || 0;
    if (window.gsap && window.ScrollTrigger) { cb(); return; }
    if (tries > 40) { initFallback(); return; }
    setTimeout(function () { waitForGSAP(cb, tries + 1); }, 100);
  }

  /* ══════════════════════════════════════════
     GSAP + ScrollTrigger path
  ══════════════════════════════════════════ */
  function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    /* ── 1. Section headings: slide + fade from left ── */
    gsap.utils.toArray('.section-title, .page-title, .display-title').forEach(function (el) {
      gsap.fromTo(el,
        { x: -60, opacity: 0, rotateY: 18 },
        {
          x: 0, opacity: 1, rotateY: 0,
          duration: 0.9, ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    /* ── 2. Eyebrow labels: pop up with slight 3D tilt ── */
    gsap.utils.toArray('.eyebrow').forEach(function (el) {
      gsap.fromTo(el,
        { y: 20, opacity: 0, rotateX: -30, transformOrigin: 'bottom center' },
        {
          y: 0, opacity: 1, rotateX: 0,
          duration: 0.6, ease: 'back.out(1.6)',
          clearProps: 'all',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    /* ── 3. Cards: staggered 3D lift from below ── */
    gsap.utils.toArray(
      '.feature-card, .solution-card, .project-card, .resource-card, .metric-card, .timeline-item'
    ).forEach(function (el) {
      gsap.fromTo(el,
        { y: 60, opacity: 0, rotateX: 20, scale: 0.94, transformOrigin: 'top center' },
        {
          y: 0, opacity: 1, rotateX: 0, scale: 1,
          duration: 0.75, ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    /* ── 4. Glass panels: scale + fade ── */
    gsap.utils.toArray('.glass-panel, .form-panel').forEach(function (el) {
      // skip if it's a card (already handled)
      if (el.closest('.feature-card, .solution-card, .project-card, .resource-card')) return;
      gsap.fromTo(el,
        { scale: 0.92, opacity: 0, rotateY: -8, transformOrigin: 'center center' },
        {
          scale: 1, opacity: 1, rotateY: 0,
          duration: 0.85, ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    /* ── 5. Hero copy paragraphs: stagger slide up ── */
    gsap.utils.toArray('.hero-copy, .section-copy, .body-copy').forEach(function (el, i) {
      gsap.fromTo(el,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.7, ease: 'power2.out',
          delay: i * 0.05,
          clearProps: 'all',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    /* ── 6. Stat numbers: count up with 3D flip ── */
    gsap.utils.toArray('.stat').forEach(function (el) {
      gsap.fromTo(el,
        { rotateX: 90, opacity: 0, transformOrigin: 'bottom center' },
        {
          rotateX: 0, opacity: 1,
          duration: 0.7, ease: 'back.out(1.4)',
          clearProps: 'all',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    /* ── 7. Buttons: pop in from below ── */
    gsap.utils.toArray('.button-row').forEach(function (el) {
      gsap.fromTo(el,
        { y: 24, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.6, ease: 'back.out(1.5)',
          clearProps: 'all',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    /* ── 8. Icon badges: spin-flip in ── */
    gsap.utils.toArray('.icon-badge').forEach(function (el) {
      gsap.fromTo(el,
        { rotateY: 180, opacity: 0, scale: 0.5 },
        {
          rotateY: 0, opacity: 1, scale: 1,
          duration: 0.6, ease: 'back.out(1.7)',
          clearProps: 'all',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    /* ── 9. Tags / filter pills: scatter-in ── */
    gsap.utils.toArray('.tag-row, .filter-row').forEach(function (row) {
      gsap.fromTo(row.querySelectorAll('.tag, .filter-pill'),
        { y: 16, opacity: 0, scale: 0.8 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.45, stagger: 0.05, ease: 'back.out(1.6)',
          clearProps: 'all',
          scrollTrigger: {
            trigger: row,
            start: 'top 92%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    /* ── 10. Footer: rise up as a whole ── */
    var footer = document.querySelector('.site-footer');
    if (footer) {
      gsap.fromTo(footer,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.9, ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: footer,
            start: 'top 95%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    /* ── 11. Parallax depth on section backgrounds ── */
    gsap.utils.toArray('.section').forEach(function (el) {
      gsap.to(el, {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    });

    /* ── 12. Nav: shrink + glass deepen on scroll ── */
    var navWrap = document.querySelector('.site-nav-wrap');
    if (navWrap) {
      ScrollTrigger.create({
        start: 80,
        onEnter: function () { navWrap.classList.add('nav-scrolled'); },
        onLeaveBack: function () { navWrap.classList.remove('nav-scrolled'); }
      });
    }
  }

  /* ══════════════════════════════════════════
     IntersectionObserver fallback
  ══════════════════════════════════════════ */
  function initFallback() {
    var targets = document.querySelectorAll(
      '.section-title, .page-title, .display-title, .eyebrow, ' +
      '.feature-card, .solution-card, .project-card, .resource-card, ' +
      '.metric-card, .glass-panel, .hero-copy, .stat, .button-row, .icon-badge'
    );

    targets.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(32px)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '';
          entry.target.style.transform = '';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ── Boot ── */
  document.addEventListener('DOMContentLoaded', function () {
    // Load ScrollTrigger if not already present
    if (window.gsap && !window.ScrollTrigger) {
      var s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
      s.onload = function () { waitForGSAP(initGSAP); };
      document.head.appendChild(s);
    } else {
      waitForGSAP(initGSAP);
    }
  });
})();
