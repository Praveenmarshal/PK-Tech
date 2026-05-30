/**
 * ZILIST — Scroll-driven animations
 * Elements align (slide in) scrolling down, unalign (slide out) scrolling back up.
 * Uses GSAP ScrollTrigger scrub for smooth bidirectional scroll tracking.
 */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  function waitForGSAP(cb, tries) {
    tries = tries || 0;
    if (window.gsap && window.ScrollTrigger) { cb(); return; }
    if (tries > 40) { initFallback(); return; }
    setTimeout(function () { waitForGSAP(cb, tries + 1); }, 100);
  }

  function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    /* ── 1. Headings: slide in from left, unalign back left on reverse ── */
    gsap.utils.toArray('.display-title, .page-title, .section-title').forEach(function (el) {
      gsap.fromTo(el,
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'top 55%',
            scrub: 0.6
          }
        }
      );
    });

    /* ── 2. Eyebrows: slide in from right ── */
    gsap.utils.toArray('.eyebrow').forEach(function (el) {
      gsap.fromTo(el,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            end: 'top 60%',
            scrub: 0.5
          }
        }
      );
    });

    /* ── 3. Body copy / hero copy: fade + slide up ── */
    gsap.utils.toArray('.hero-copy, .section-copy, .body-copy').forEach(function (el) {
      gsap.fromTo(el,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            end: 'top 60%',
            scrub: 0.6
          }
        }
      );
    });

    /* ── 4. Cards: stagger each card individually, slide up from below ── */
    gsap.utils.toArray(
      '.feature-card, .solution-card, .project-card, .resource-card, .metric-card, .timeline-item'
    ).forEach(function (el, i) {
      gsap.fromTo(el,
        { y: 70, opacity: 0 },
        {
          y: 0, opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            end: 'top 58%',
            scrub: 0.7
          }
        }
      );
    });

    /* ── 5. Glass panels / form panels: scale + fade ── */
    gsap.utils.toArray('.glass-panel, .form-panel').forEach(function (el) {
      if (el.closest('.feature-card, .solution-card, .project-card, .resource-card')) return;
      gsap.fromTo(el,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1, opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            end: 'top 58%',
            scrub: 0.7
          }
        }
      );
    });

    /* ── 6. Stats: slide up ── */
    gsap.utils.toArray('.stat').forEach(function (el) {
      gsap.fromTo(el,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'top 60%',
            scrub: 0.5
          }
        }
      );
    });

    /* ── 7. Button rows: slide up ── */
    gsap.utils.toArray('.button-row').forEach(function (el) {
      gsap.fromTo(el,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 93%',
            end: 'top 65%',
            scrub: 0.5
          }
        }
      );
    });

    /* ── 8. Icon badges: slide in from left ── */
    gsap.utils.toArray('.icon-badge').forEach(function (el) {
      gsap.fromTo(el,
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            end: 'top 65%',
            scrub: 0.5
          }
        }
      );
    });

    /* ── 9. Tags + filter pills: stagger slide up ── */
    gsap.utils.toArray('.tag-row, .filter-row').forEach(function (row) {
      var pills = row.querySelectorAll('.tag, .filter-pill');
      pills.forEach(function (pill, i) {
        gsap.fromTo(pill,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: row,
              start: 'top 93%',
              end: 'top 68%',
              scrub: 0.4 + i * 0.05
            }
          }
        );
      });
    });

    /* ── 10. Footer: slide up ── */
    var footer = document.querySelector('.site-footer');
    if (footer) {
      gsap.fromTo(footer,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: footer,
            start: 'top 98%',
            end: 'top 70%',
            scrub: 0.8
          }
        }
      );
    }
  }

  /* ── Fallback: IntersectionObserver if GSAP not available ── */
  function initFallback() {
    var sel = '.display-title, .page-title, .section-title, .eyebrow, ' +
              '.hero-copy, .section-copy, .body-copy, ' +
              '.feature-card, .solution-card, .project-card, .resource-card, ' +
              '.metric-card, .glass-panel, .stat, .button-row, .icon-badge';

    document.querySelectorAll(sel).forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(32px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        e.target.style.opacity = e.isIntersecting ? '' : '0';
        e.target.style.transform = e.isIntersecting ? '' : 'translateY(32px)';
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(sel).forEach(function (el) { io.observe(el); });
  }

  /* ── Boot ── */
  document.addEventListener('DOMContentLoaded', function () {
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
