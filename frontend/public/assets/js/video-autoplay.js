/**
 * video-autoplay.js — PK Tech
 * Forces all background videos to play on mobile/iOS/Android.
 * Works around browser autoplay restrictions by retrying on
 * user interaction events (touch, click, scroll).
 */
(function () {
  'use strict';

  function playAll() {
    var videos = document.querySelectorAll(
      '.home-video-bg video, .pages-video-bg video, .admin-video-bg video'
    );
    videos.forEach(function (v) {
      if (v.paused) {
        v.muted = true;
        v.play().catch(function () {});
      }
    });
  }

  function initVideo(v) {
    v.muted        = true;
    v.loop         = true;
    v.playsInline  = true;
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    v.setAttribute('x5-playsinline', '');
    v.load();
    v.play().catch(function () {});

    v.addEventListener('canplay',       function () { v.play().catch(function(){}); });
    v.addEventListener('loadedmetadata',function () { v.play().catch(function(){}); });
    v.addEventListener('suspend',       function () { v.play().catch(function(){}); });
    v.addEventListener('stalled',       function () { v.load(); v.play().catch(function(){}); });
  }

  // Run on DOM ready
  function onReady() {
    var videos = document.querySelectorAll(
      '.home-video-bg video, .pages-video-bg video, .admin-video-bg video'
    );
    videos.forEach(initVideo);

    // Retry on any user interaction — bypasses autoplay block
    ['touchstart','touchend','click','scroll','keydown'].forEach(function (evt) {
      document.addEventListener(evt, playAll, { once: true, passive: true });
    });

    // Retry every 2s for first 10s in case of slow mobile connection
    var attempts = 0;
    var interval = setInterval(function () {
      playAll();
      attempts++;
      if (attempts >= 5) clearInterval(interval);
    }, 2000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();
