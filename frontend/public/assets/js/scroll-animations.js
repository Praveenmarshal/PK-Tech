/**
 * scroll-animations.js — PK Tech
 * Bidirectional scrub animations on every page.
 * Elements slide/fade OUT of position while scrolling,
 * and snap BACK into position when you stop to read.
 * Uses GSAP + ScrollTrigger (scrub) for smooth tracking.
 */
(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* ═══════════════════════════════════════════════════════
     Animation catalogue — each entry defines:
       sel    : CSS selector(s)
       from   : GSAP "from" state (out of position)
       scrub  : scrub tightness (lower = tighter)
       start  : when animation begins (% viewport)
       end    : when animation completes (% viewport)
       skip   : optional selector of parent to skip
  ═══════════════════════════════════════════════════════ */
  var ANIMATIONS = [

    /* ── Headings: sweep in from left ── */
    {
      sel: '.display-title, .page-title, .admin-title',
      from: { x: -90, opacity: 0, skewX: 3 },
      scrub: 0.8, start: 'top 92%', end: 'top 48%'
    },

    /* ── Section titles: sweep in from left, smaller offset ── */
    {
      sel: '.section-title',
      from: { x: -60, opacity: 0, skewX: 2 },
      scrub: 0.7, start: 'top 90%', end: 'top 52%'
    },

    /* ── Eyebrows / labels: slide from right ── */
    {
      sel: '.eyebrow, .form-label',
      from: { x: 50, opacity: 0 },
      scrub: 0.5, start: 'top 92%', end: 'top 62%'
    },

    /* ── Body / hero copy: rise up ── */
    {
      sel: '.hero-copy, .section-copy, .body-copy, .card-copy',
      from: { y: 55, opacity: 0 },
      scrub: 0.7, start: 'top 92%', end: 'top 58%'
    },

    /* ── Card titles ── */
    {
      sel: '.card-title',
      from: { y: 30, opacity: 0 },
      scrub: 0.6, start: 'top 93%', end: 'top 60%'
    },

    /* ── Feature / solution cards: rise with slight scale ── */
    {
      sel: '.feature-card, .solution-card',
      from: { y: 75, opacity: 0, scale: 0.94 },
      scrub: 0.8, start: 'top 96%', end: 'top 56%'
    },

    /* ── Project / resource cards: rise ── */
    {
      sel: '.project-card, .resource-card',
      from: { y: 65, opacity: 0, scale: 0.96 },
      scrub: 0.8, start: 'top 96%', end: 'top 58%'
    },

    /* ── Metric / stats cards: pop up with scale ── */
    {
      sel: '.metric-card',
      from: { y: 50, opacity: 0, scale: 0.88 },
      scrub: 0.7, start: 'top 94%', end: 'top 60%'
    },

    /* ── Feedback / admin cards: rise ── */
    {
      sel: '.fb-card, .admin-card',
      from: { y: 45, opacity: 0 },
      scrub: 0.7, start: 'top 94%', end: 'top 60%',
      skipParent: '.feature-card, .solution-card, .project-card'
    },

    /* ── Glass panels: scale + fade ── */
    {
      sel: '.glass-panel, .form-panel',
      from: { scale: 0.92, opacity: 0 },
      scrub: 0.7, start: 'top 93%', end: 'top 55%',
      skipParent: '.feature-card, .solution-card, .project-card, .resource-card'
    },

    /* ── Stat numbers: rise ── */
    {
      sel: '.stat',
      from: { y: 40, opacity: 0, scale: 0.85 },
      scrub: 0.6, start: 'top 90%', end: 'top 58%'
    },

    /* ── Timeline items: alternate left/right ── */
    {
      sel: '.timeline-item:nth-child(odd)',
      from: { x: -50, opacity: 0 },
      scrub: 0.7, start: 'top 93%', end: 'top 58%'
    },
    {
      sel: '.timeline-item:nth-child(even)',
      from: { x: 50, opacity: 0 },
      scrub: 0.7, start: 'top 93%', end: 'top 58%'
    },

    /* ── Icon badges: slide in from left ── */
    {
      sel: '.icon-badge',
      from: { x: -35, opacity: 0, rotate: -6 },
      scrub: 0.5, start: 'top 92%', end: 'top 65%'
    },

    /* ── Floating chips / labels on 3D model ── */
    {
      sel: '.floating-chip',
      from: { y: 20, opacity: 0, scale: 0.85 },
      scrub: 0.5, start: 'top 85%', end: 'top 50%'
    },

    /* ── Button rows ── */
    {
      sel: '.button-row',
      from: { y: 35, opacity: 0 },
      scrub: 0.5, start: 'top 94%', end: 'top 68%'
    },

    /* ── Contact method blocks ── */
    {
      sel: '.contact-method',
      from: { x: -40, opacity: 0 },
      scrub: 0.6, start: 'top 93%', end: 'top 62%'
    },

    /* ── Tags / filter pills ── */
    {
      sel: '.tag, .filter-pill',
      from: { y: 20, opacity: 0, scale: 0.85 },
      scrub: 0.4, start: 'top 94%', end: 'top 70%'
    },

    /* ── Form fields: slide up ── */
    {
      sel: '.form-field',
      from: { y: 25, opacity: 0 },
      scrub: 0.5, start: 'top 95%', end: 'top 72%'
    },

    /* ── Hero media / 3D canvas wrapper ── */
    {
      sel: '.hero-media, .orbital-stage',
      from: { scale: 0.88, opacity: 0 },
      scrub: 1.0, start: 'top 85%', end: 'top 35%'
    },

    /* ── Admin table rows ── */
    {
      sel: '.admin-table tr',
      from: { x: -30, opacity: 0 },
      scrub: 0.5, start: 'top 95%', end: 'top 70%'
    },

    /* ── Portfolio / project screenshots ── */
    {
      sel: '.project-screen-img, .card-img',
      from: { scale: 0.9, opacity: 0, y: 20 },
      scrub: 0.7, start: 'top 94%', end: 'top 58%'
    },

    /* ── Footer ── */
    {
      sel: '.site-footer',
      from: { y: 50, opacity: 0 },
      scrub: 0.8, start: 'top 100%', end: 'top 72%'
    }
  ];

  /* ═══════════════════════════════════════════
     GSAP init
  ═══════════════════════════════════════════ */
  function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    ANIMATIONS.forEach(function (anim) {
      gsap.utils.toArray(anim.sel).forEach(function (el) {

        // Skip if inside an excluded parent
        if (anim.skipParent && el.closest(anim.skipParent)) return;

        // Skip if element is inside admin sidebar/topbar (always visible)
        if (el.closest('[data-admin-sidebar], .admin-topbar, [data-navbar]')) return;

        gsap.fromTo(el,
          Object.assign({}, anim.from),
          {
            x: 0, y: 0, opacity: 1, scale: 1,
            skewX: 0, rotate: 0,
            immediateRender: false,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: anim.start,
              end: anim.end,
              scrub: anim.scrub
            }
          }
        );
      });
    });

    // After all triggers set — show elements already in viewport
    requestAnimationFrame(function () {
      setTimeout(showInViewport, 80);
    });
  }

  /* Elements already visible when page loads → show immediately */
  function showInViewport() {
    ScrollTrigger.getAll().forEach(function (st) {
      var el = st.trigger;
      if (!el) return;
      var rect = el.getBoundingClientRect();
      var inView = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
      if (inView) {
        gsap.set(el, { clearProps: 'all' });
        st.kill();
      }
    });
  }

  /* ═══════════════════════════════════════════
     Fallback: IntersectionObserver if GSAP fails
  ═══════════════════════════════════════════ */
  function initFallback() {
    var allSel = ANIMATIONS.map(function (a) { return a.sel; }).join(', ');
    var els = document.querySelectorAll(allSel);

    els.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
        } else {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(30px)';
        }
      });
    }, { threshold: 0.1 });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ═══════════════════════════════════════════
     Wait for GSAP + ScrollTrigger to load
  ═══════════════════════════════════════════ */
  function waitForGSAP(cb, tries) {
    tries = tries || 0;
    if (window.gsap && window.ScrollTrigger) { cb(); return; }
    if (tries > 50) { initFallback(); return; }
    setTimeout(function () { waitForGSAP(cb, tries + 1); }, 100);
  }

  function loadScrollTrigger(cb) {
    if (window.ScrollTrigger) { cb(); return; }
    var s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
    s.onload = cb;
    s.onerror = initFallback;
    document.head.appendChild(s);
  }

  /* ── Boot ── */
  document.addEventListener('DOMContentLoaded', function () {
    if (!window.gsap) { initFallback(); return; }
    loadScrollTrigger(function () {
      waitForGSAP(initGSAP);
    });
  });

})();
