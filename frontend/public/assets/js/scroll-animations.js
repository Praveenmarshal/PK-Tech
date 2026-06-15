/**
 * scroll-animations.js — PK Tech
 * DESKTOP : GSAP ScrollTrigger scrub (smooth bidirectional)
 * MOBILE  : Lightweight IntersectionObserver + CSS transitions
 *           (no GSAP on mobile — avoids lag/jank)
 */
(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var IS_MOBILE = window.innerWidth <= 768 ||
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  /* ── Selectors that animate on BOTH desktop + mobile ── */
  var TARGETS = [
    '.display-title',
    '.page-title',
    '.admin-title',
    '.section-title',
    '.eyebrow',
    '.hero-copy',
    '.section-copy',
    '.body-copy',
    '.card-copy',
    '.card-title',
    '.feature-card',
    '.solution-card',
    '.project-card',
    '.resource-card',
    '.metric-card',
    '.fb-card',
    '.glass-panel',
    '.form-panel',
    '.stat',
    '.timeline-item',
    '.icon-badge',
    '.floating-chip',
    '.button-row',
    '.contact-method',
    '.tag',
    '.filter-pill',
    '.form-field',
    '.hero-media',
    '.orbital-stage',
    '.card-img',
    '.project-screen-img',
    '.site-footer'
  ];

  /* ── GSAP animation config (desktop only) ── */
  var GSAP_ANIMS = [
    { sel: '.display-title, .page-title, .admin-title', from: { x: -90, opacity: 0, skewX: 3 }, scrub: 0.8, start: 'top 92%', end: 'top 48%' },
    { sel: '.section-title',                            from: { x: -60, opacity: 0, skewX: 2 }, scrub: 0.7, start: 'top 90%', end: 'top 52%' },
    { sel: '.eyebrow',                                  from: { x: 50,  opacity: 0 },           scrub: 0.5, start: 'top 92%', end: 'top 62%' },
    { sel: '.hero-copy, .section-copy, .body-copy, .card-copy', from: { y: 55, opacity: 0 },   scrub: 0.7, start: 'top 92%', end: 'top 58%' },
    { sel: '.card-title',                               from: { y: 30,  opacity: 0 },           scrub: 0.6, start: 'top 93%', end: 'top 60%' },
    { sel: '.feature-card, .solution-card',             from: { y: 75,  opacity: 0, scale: 0.94 }, scrub: 0.8, start: 'top 96%', end: 'top 56%' },
    { sel: '.project-card, .resource-card',             from: { y: 65,  opacity: 0, scale: 0.96 }, scrub: 0.8, start: 'top 96%', end: 'top 58%' },
    { sel: '.metric-card',                              from: { y: 50,  opacity: 0, scale: 0.88 }, scrub: 0.7, start: 'top 94%', end: 'top 60%' },
    { sel: '.fb-card',                                  from: { y: 45,  opacity: 0 },           scrub: 0.7, start: 'top 94%', end: 'top 60%' },
    { sel: '.glass-panel, .form-panel',                 from: { scale: 0.92, opacity: 0 },      scrub: 0.7, start: 'top 93%', end: 'top 55%', skip: '.feature-card,.solution-card,.project-card,.resource-card' },
    { sel: '.stat',                                     from: { y: 40,  opacity: 0, scale: 0.85 }, scrub: 0.6, start: 'top 90%', end: 'top 58%' },
    { sel: '.timeline-item:nth-child(odd)',             from: { x: -50, opacity: 0 },           scrub: 0.7, start: 'top 93%', end: 'top 58%' },
    { sel: '.timeline-item:nth-child(even)',            from: { x: 50,  opacity: 0 },           scrub: 0.7, start: 'top 93%', end: 'top 58%' },
    { sel: '.icon-badge',                               from: { x: -35, opacity: 0, rotate: -6 }, scrub: 0.5, start: 'top 92%', end: 'top 65%' },
    { sel: '.floating-chip',                            from: { y: 20,  opacity: 0, scale: 0.85 }, scrub: 0.5, start: 'top 85%', end: 'top 50%' },
    { sel: '.button-row',                               from: { y: 35,  opacity: 0 },           scrub: 0.5, start: 'top 94%', end: 'top 68%' },
    { sel: '.contact-method',                           from: { x: -40, opacity: 0 },           scrub: 0.6, start: 'top 93%', end: 'top 62%' },
    { sel: '.tag, .filter-pill',                        from: { y: 20,  opacity: 0, scale: 0.85 }, scrub: 0.4, start: 'top 94%', end: 'top 70%' },
    { sel: '.form-field',                               from: { y: 25,  opacity: 0 },           scrub: 0.5, start: 'top 95%', end: 'top 72%' },
    { sel: '.hero-media, .orbital-stage',               from: { scale: 0.88, opacity: 0 },      scrub: 1.0, start: 'top 85%', end: 'top 35%' },
    { sel: '.card-img, .project-screen-img',            from: { scale: 0.9,  opacity: 0, y: 20 }, scrub: 0.7, start: 'top 94%', end: 'top 58%' },
    { sel: '.site-footer',                              from: { y: 50,  opacity: 0 },           scrub: 0.8, start: 'top 100%', end: 'top 72%' }
  ];

  /* ══════════════════════════════════════════
     MOBILE — pure CSS + IntersectionObserver
  ══════════════════════════════════════════ */
  function initMobile() {
    var sel = TARGETS.join(', ');
    var els = document.querySelectorAll(sel);

    /* inject CSS transitions once */
    var style = document.createElement('style');
    style.textContent = [
      sel + ' { opacity: 0; transform: translateY(28px); ',
      'transition: opacity 0.45s ease, transform 0.45s ease; will-change: opacity, transform; }'
    ].join('');
    document.head.appendChild(style);

    /* skip elements already in viewport at load */
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'none';
        }
        /* NOTE: we do NOT reset on leave — once visible, stay visible.
           This avoids layout thrash and lag on low-end mobile CPUs. */
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    els.forEach(function (el) {
      /* skip nav / sidebar — always visible */
      if (el.closest('[data-navbar],[data-admin-sidebar],.admin-topbar')) {
        return;
      }
      /* already in viewport at load → show immediately */
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.style.opacity   = '1';
        el.style.transform = 'none';
      } else {
        io.observe(el);
      }
    });
  }

  /* ══════════════════════════════════════════
     DESKTOP — GSAP ScrollTrigger scrub
  ══════════════════════════════════════════ */
  function initDesktop() {
    gsap.registerPlugin(ScrollTrigger);

    GSAP_ANIMS.forEach(function (anim) {
      gsap.utils.toArray(anim.sel).forEach(function (el) {
        if (anim.skip && el.closest(anim.skip)) return;
        if (el.closest('[data-navbar],[data-admin-sidebar],.admin-topbar')) return;

        gsap.fromTo(el,
          Object.assign({}, anim.from),
          {
            x: 0, y: 0, opacity: 1, scale: 1, skewX: 0, rotate: 0,
            immediateRender: false,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start:  anim.start,
              end:    anim.end,
              scrub:  anim.scrub
            }
          }
        );
      });
    });

    /* show elements already in viewport on load */
    requestAnimationFrame(function () {
      setTimeout(function () {
        ScrollTrigger.getAll().forEach(function (st) {
          if (!st.trigger) return;
          var r = st.trigger.getBoundingClientRect();
          if (r.top < window.innerHeight * 0.85 && r.bottom > 0) {
            gsap.set(st.trigger, { clearProps: 'all' });
            st.kill();
          }
        });
      }, 100);
    });
  }

  /* ══════════════════════════════════════════
     Fallback if GSAP never loads on desktop
  ══════════════════════════════════════════ */
  function desktopFallback() {
    /* same as mobile but with bidirectional reset */
    var sel = TARGETS.join(', ');
    var style = document.createElement('style');
    style.textContent = sel + ' { opacity:0; transform:translateY(28px); transition:opacity .5s ease,transform .5s ease; }';
    document.head.appendChild(style);

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        e.target.style.opacity   = e.isIntersecting ? '1' : '0';
        e.target.style.transform = e.isIntersecting ? 'none' : 'translateY(28px)';
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(sel).forEach(function (el) { io.observe(el); });
  }

  /* ══════════════════════════════════════════
     Wait for GSAP + ScrollTrigger
  ══════════════════════════════════════════ */
  function waitForGSAP(cb, tries) {
    tries = tries || 0;
    if (window.gsap && window.ScrollTrigger) { cb(); return; }
    if (tries > 40) { desktopFallback(); return; }
    setTimeout(function () { waitForGSAP(cb, tries + 1); }, 100);
  }

  /* ══════════════════════════════════════════
     Boot
  ══════════════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', function () {
    if (IS_MOBILE) {
      /* Mobile: skip GSAP entirely — no lag */
      initMobile();
    } else {
      /* Desktop: use GSAP scrub */
      if (window.gsap) {
        waitForGSAP(initDesktop);
      } else {
        desktopFallback();
      }
    }
  });

})();
