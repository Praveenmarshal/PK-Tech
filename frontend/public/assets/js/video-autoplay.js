/**
 * video-autoplay.js — PK Tech
 * Forces background videos to play on all devices.
 * On mobile: switches to low-quality Cloudinary URL to prevent lag.
 */
(function () {
  'use strict';

  var IS_MOBILE = window.innerWidth <= 768 ||
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  /* Low-quality mobile URLs (q_30, smaller = faster) */
  var MOBILE_URLS = {
    'home-bg_qyi9ab':  'https://res.cloudinary.com/dtcws61gi/video/upload/q_30,w_720/v1781504803/home-bg_qyi9ab.mp4',
    'pages-bg_udgphy': 'https://res.cloudinary.com/dtcws61gi/video/upload/q_30,w_720/v1781504944/pages-bg_udgphy.mp4',
    'admin-bg_m5oitd': 'https://res.cloudinary.com/dtcws61gi/video/upload/q_30,w_720/v1781504938/admin-bg_m5oitd.mp4',
    'admin-bg_be2suq': 'https://res.cloudinary.com/dtcws61gi/video/upload/q_30,w_720/v1781519582/admin-bg_be2suq.mp4'
  };

  function getMobileUrl(currentSrc) {
    for (var key in MOBILE_URLS) {
      if (currentSrc && currentSrc.indexOf(key) !== -1) {
        return MOBILE_URLS[key];
      }
    }
    return null;
  }

  function setupVideo(v) {
    v.muted       = true;
    v.loop        = true;
    v.playsInline = true;
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');

    /* On mobile: swap to low-quality source */
    if (IS_MOBILE) {
      var source = v.querySelector('source');
      if (source) {
        var mobileUrl = getMobileUrl(source.src);
        if (mobileUrl) {
          source.src = mobileUrl;
        }
      }
      /* Reduce preload on mobile to save memory */
      v.preload = 'metadata';
    }

    v.load();

    function tryPlay() {
      v.play().catch(function () {});
    }

    tryPlay();
    v.addEventListener('canplay',        tryPlay);
    v.addEventListener('loadedmetadata', tryPlay);
    v.addEventListener('suspend',        tryPlay);
    v.addEventListener('stalled', function () { v.load(); tryPlay(); });
    v.addEventListener('visibilitychange', function () {
      if (!document.hidden) tryPlay();
    });
  }

  function playAll() {
    document.querySelectorAll(
      '.home-video-bg video, .pages-video-bg video, .admin-video-bg video'
    ).forEach(function (v) {
      if (v.paused) v.play().catch(function () {});
    });
  }

  function init() {
    document.querySelectorAll(
      '.home-video-bg video, .pages-video-bg video, .admin-video-bg video'
    ).forEach(setupVideo);

    /* Retry on any user interaction */
    ['touchstart', 'touchend', 'click', 'scroll'].forEach(function (evt) {
      document.addEventListener(evt, playAll, { once: true, passive: true });
    });

    /* Retry every 2s for first 10s */
    var attempts = 0;
    var iv = setInterval(function () {
      playAll();
      if (++attempts >= 5) clearInterval(iv);
    }, 2000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
