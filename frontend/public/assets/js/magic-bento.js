/**
 * MagicBento – Advanced Card Interactive Effects
 * Ported faithfully from React Bits <MagicBento /> component.
 * Uses vanilla JS + GSAP to enhance all page card elements.
 */
(function () {
  'use strict';

  // Configuration
  var GLOW_COLOR = '139, 92, 246'; // Purple-indigo RGB
  var SPOTLIGHT_RADIUS = 300;
  var PARTICLE_COUNT = 10;
  var TILT_AMOUNT = 8; // degrees max tilt
  var MAGNET_AMOUNT = 0.08; // scale of magnetic pull
  
  var SELECTORS = [
    '.feature-card',
    '.solution-card',
    '.project-card',
    '.resource-card',
    '.metric-card',
    '.timeline-item',
    '.trust-card',
    '.glass-panel',
    '.magic-bento-card'
  ];

  /* ── Particle Helper ── */
  function createParticleElement(x, y) {
    var el = document.createElement('div');
    el.className = 'bento-particle';
    el.style.cssText = 'position:absolute;width:4px;height:4px;border-radius:50%;background:rgba(' + GLOW_COLOR + ',1);box-shadow:0 0 6px rgba(' + GLOW_COLOR + ',0.6);pointer-events:none;z-index:5;left:' + x + 'px;top:' + y + 'px;opacity:0;';
    return el;
  }

  /* ── Initialize Magic Bento on a card ── */
  function initCard(card) {
    if (card.getAttribute('data-bento-initialized')) return;
    card.setAttribute('data-bento-initialized', 'true');

    // Ensure relative positioning
    var style = window.getComputedStyle(card);
    if (style.position === 'static') {
      card.style.position = 'relative';
    }
    if (style.overflow !== 'hidden') {
      card.style.overflow = 'hidden';
    }

    // Set custom property variables
    card.style.setProperty('--glow-color', GLOW_COLOR);
    card.style.setProperty('--glow-radius', SPOTLIGHT_RADIUS + 'px');

    // Create border glow overlay
    var borderGlow = document.createElement('div');
    borderGlow.className = 'bento-border-glow';
    card.appendChild(borderGlow);

    var particles = [];
    var particleTimeouts = [];
    var isHovered = false;

    // Build memoized coordinates
    var memoizedParticles = [];
    var rect = card.getBoundingClientRect();
    for (var i = 0; i < PARTICLE_COUNT; i++) {
      memoizedParticles.push({
        x: Math.random() * (rect.width || 200),
        y: Math.random() * (rect.height || 150)
      });
    }

    function clearParticles() {
      particleTimeouts.forEach(clearTimeout);
      particleTimeouts = [];

      particles.forEach(function (p) {
        if (typeof gsap !== 'undefined') {
          gsap.to(p, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            ease: 'back.in(1.7)',
            onComplete: function () {
              if (p.parentNode) p.parentNode.removeChild(p);
            }
          });
        } else {
          if (p.parentNode) p.parentNode.removeChild(p);
        }
      });
      particles = [];
    }

    function animateParticles() {
      if (!isHovered) return;

      var currentRect = card.getBoundingClientRect();
      memoizedParticles.forEach(function (pData, index) {
        var timeoutId = setTimeout(function () {
          if (!isHovered) return;

          var p = createParticleElement(pData.x, pData.y);
          card.appendChild(p);
          particles.push(p);

          if (typeof gsap !== 'undefined') {
            gsap.fromTo(p, { scale: 0, opacity: 0 }, { scale: 1, opacity: 0.8, duration: 0.3, ease: 'back.out(1.7)' });

            gsap.to(p, {
              x: (Math.random() - 0.5) * 80,
              y: -50 - Math.random() * 50,
              duration: 2 + Math.random() * 2,
              ease: 'power1.out'
            });

            gsap.to(p, {
              opacity: 0,
              delay: 1.2,
              duration: 0.8,
              onComplete: function () {
                if (p.parentNode) p.parentNode.removeChild(p);
                var idx = particles.indexOf(p);
                if (idx > -1) particles.splice(idx, 1);
              }
            });
          } else {
            p.style.opacity = '0.8';
            setTimeout(function () {
              if (p.parentNode) p.parentNode.removeChild(p);
            }, 2000);
          }
        }, index * 120);

        particleTimeouts.push(timeoutId);
      });
    }

    /* ── Mouse Events ── */
    card.addEventListener('mouseenter', function () {
      isHovered = true;
      card.classList.add('bento-active');
      animateParticles();

      if (typeof gsap !== 'undefined') {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      }
    });

    card.addEventListener('mouseleave', function () {
      isHovered = false;
      card.classList.remove('bento-active');
      clearParticles();

      card.style.setProperty('--glow-intensity', '0');

      if (typeof gsap !== 'undefined') {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          x: 0,
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    });

    card.addEventListener('mousemove', function (e) {
      var cardRect = card.getBoundingClientRect();
      var x = e.clientX - cardRect.left;
      var y = e.clientY - cardRect.top;

      var relX = (x / cardRect.width) * 100;
      var relY = (y / cardRect.height) * 100;

      card.style.setProperty('--glow-x', relX + '%');
      card.style.setProperty('--glow-y', relY + '%');
      card.style.setProperty('--glow-intensity', '1');

      var centerX = cardRect.width / 2;
      var centerY = cardRect.height / 2;

      if (typeof gsap !== 'undefined') {
        // 3D Tilt
        var rotateX = ((y - centerY) / centerY) * -TILT_AMOUNT;
        var rotateY = ((x - centerX) / centerX) * TILT_AMOUNT;
        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.15,
          ease: 'power2.out',
          transformPerspective: 1000
        });

        // Magnetism
        var magnetX = (x - centerX) * MAGNET_AMOUNT;
        var magnetY = (y - centerY) * MAGNET_AMOUNT;
        gsap.to(card, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });

    // Ripple click effect
    card.addEventListener('click', function (e) {
      var cardRect = card.getBoundingClientRect();
      var x = e.clientX - cardRect.left;
      var y = e.clientY - cardRect.top;

      var maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - cardRect.width, y),
        Math.hypot(x, y - cardRect.height),
        Math.hypot(x - cardRect.width, y - cardRect.height)
      );

      var ripple = document.createElement('div');
      ripple.className = 'bento-ripple';
      ripple.style.cssText = 'position:absolute;width:' + (maxDistance * 2) + 'px;height:' + (maxDistance * 2) + 'px;border-radius:50%;background:radial-gradient(circle, rgba(' + GLOW_COLOR + ', 0.4) 0%, rgba(' + GLOW_COLOR + ', 0.15) 40%, transparent 70%);left:' + (x - maxDistance) + 'px;top:' + (y - maxDistance) + 'px;pointer-events:none;z-index:999;transform:scale(0);opacity:1;';
      card.appendChild(ripple);

      if (typeof gsap !== 'undefined') {
        gsap.fromTo(ripple, { scale: 0, opacity: 1 }, {
          scale: 1,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: function () {
            if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
          }
        });
      } else {
        ripple.style.transform = 'scale(1)';
        ripple.style.opacity = '0';
        ripple.style.transition = 'all 0.6s ease-out';
        setTimeout(function () {
          if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
        }, 600);
      }
    });
  }

  /* ── Scan and initialize page cards ── */
  function initializeAll() {
    var isMobile = window.innerWidth <= 768;
    if (isMobile) return; // Disable interactive bento animations on mobile for better scrolling performance

    SELECTORS.forEach(function (sel) {
      var elements = document.querySelectorAll(sel);
      elements.forEach(function (el) {
        initCard(el);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll);
  } else {
    initializeAll();
  }

  // Hook into project updates / AJAX loads if any
  window.addEventListener('bentoUpdate', initializeAll);
})();
