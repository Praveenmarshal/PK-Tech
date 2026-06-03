/**
 * ZILIST Feedback Page
 * - Stores feedback in localStorage (client-side, no backend needed)
 * - Shows first 6 cards immediately
 * - "Show More" reveals rest in a scrollable panel
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'zilist_feedbacks';
  var INITIAL_SHOW = 6;
  var rating = 0;
  var expanded = false;

  /* ── Helpers ── */
  function getFeedbacks() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch (_) { return []; }
  }

  function saveFeedback(entry) {
    var list = getFeedbacks();
    list.unshift(entry); // newest first
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function maskEmail(email) {
    var parts = email.split('@');
    if (parts.length < 2) return email;
    var name = parts[0];
    var domain = parts[1];
    var visible = name.slice(0, 2);
    var masked = visible + '***@' + domain;
    return masked;
  }

  function initials(email) {
    return email.slice(0, 2).toUpperCase();
  }

  function stars(n) {
    return '★'.repeat(n) + '☆'.repeat(5 - n);
  }

  function formatDate(iso) {
    var d = new Date(iso);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function buildCard(entry, animate) {
    var card = document.createElement('article');
    card.className = 'fb-card glass-panel' + (animate ? ' fb-card-animate' : '');
    card.innerHTML =
      '<div class="fb-card-head">' +
        '<div class="fb-avatar">' + initials(entry.email) + '</div>' +
        '<div class="fb-card-meta">' +
          '<span class="fb-card-email">' + maskEmail(entry.email) + '</span>' +
          '<span class="fb-card-date">' + formatDate(entry.date) + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="fb-card-stars">' + stars(entry.rating) + '</div>' +
      '<p class="fb-card-body">' + escapeHtml(entry.experience) + '</p>';
    return card;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── Render wall ── */
  function renderWall(animate) {
    var list = getFeedbacks();
    var cardsWrap = document.getElementById('fb-cards-wrap');
    var empty = document.getElementById('fb-empty');
    var totalBadge = document.getElementById('fb-total-badge');
    var avgWrap = document.getElementById('fb-avg-wrap');
    var avgStars = document.getElementById('fb-avg-stars');
    var avgNum = document.getElementById('fb-avg-num');
    var showMoreWrap = document.getElementById('fb-show-more-wrap');
    var showMoreBtn = document.getElementById('fb-show-more-btn');

    // Clear previous cards (keep empty placeholder)
    var existing = cardsWrap.querySelectorAll('.fb-card');
    existing.forEach(function (c) { c.remove(); });

    // Also remove expanded wrap if it exists
    var oldExpanded = document.getElementById('fb-expanded-wrap');
    if (oldExpanded) oldExpanded.remove();

    expanded = false;
    showMoreBtn.textContent = 'Show More Reviews';

    // Update badge
    totalBadge.textContent = list.length + (list.length === 1 ? ' review' : ' reviews');

    // Empty state
    if (list.length === 0) {
      empty.style.display = '';
      showMoreWrap.style.display = 'none';
      avgWrap.style.display = 'none';
      return;
    }

    empty.style.display = 'none';

    // Average rating
    var avg = list.reduce(function (sum, e) { return sum + e.rating; }, 0) / list.length;
    avgWrap.style.display = '';
    avgStars.textContent = stars(Math.round(avg));
    avgNum.textContent = avg.toFixed(1) + ' / 5';

    // Initial cards (first INITIAL_SHOW)
    var initial = list.slice(0, INITIAL_SHOW);
    initial.forEach(function (entry, i) {
      var delay = animate && i === 0 ? 0 : 0;
      var card = buildCard(entry, animate && i === 0);
      cardsWrap.appendChild(card);
    });

    // Show More button
    if (list.length > INITIAL_SHOW) {
      showMoreWrap.style.display = '';
    } else {
      showMoreWrap.style.display = 'none';
    }
  }

  /* ── Show More ── */
  function handleShowMore() {
    var list = getFeedbacks();
    var showMoreWrap = document.getElementById('fb-show-more-wrap');
    var showMoreBtn = document.getElementById('fb-show-more-btn');

    if (!expanded) {
      // Create scrollable expanded section
      var rest = list.slice(INITIAL_SHOW);
      var expandedWrap = document.createElement('div');
      expandedWrap.id = 'fb-expanded-wrap';
      expandedWrap.className = 'fb-expanded-wrap';

      rest.forEach(function (entry, i) {
        var card = buildCard(entry, true);
        // Stagger animation delay via style
        card.style.animationDelay = (i * 0.06) + 's';
        card.style.opacity = '0';
        card.addEventListener('animationend', function () {
          card.style.opacity = '';
        });
        expandedWrap.appendChild(card);
      });

      showMoreWrap.parentNode.insertBefore(expandedWrap, showMoreWrap);

      // Scroll to expanded section smoothly
      setTimeout(function () {
        expandedWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

      showMoreBtn.textContent = 'Show Less';
      expanded = true;
    } else {
      // Collapse
      var existing = document.getElementById('fb-expanded-wrap');
      if (existing) existing.remove();
      showMoreBtn.textContent = 'Show More Reviews';
      expanded = false;

      // Scroll back to wall
      document.getElementById('fb-wall').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /* ── Star interaction ── */
  function initStars() {
    var starBtns = document.querySelectorAll('.fb-star');
    starBtns.forEach(function (btn) {
      btn.addEventListener('mouseenter', function () {
        var val = parseInt(btn.dataset.val);
        starBtns.forEach(function (s) {
          s.classList.toggle('fb-star-active', parseInt(s.dataset.val) <= val);
        });
      });

      btn.addEventListener('mouseleave', function () {
        starBtns.forEach(function (s) {
          s.classList.toggle('fb-star-active', parseInt(s.dataset.val) <= rating);
        });
      });

      btn.addEventListener('click', function () {
        rating = parseInt(btn.dataset.val);
        starBtns.forEach(function (s) {
          s.classList.toggle('fb-star-active', parseInt(s.dataset.val) <= rating);
        });
        document.getElementById('fb-rating-err').textContent = '';
      });
    });
  }

  /* ── Character counter ── */
  function initCharCounter() {
    var textarea = document.getElementById('fb-experience');
    var counter = document.getElementById('fb-char-count');
    var MAX = 600;
    textarea.maxLength = MAX;
    textarea.addEventListener('input', function () {
      counter.textContent = textarea.value.length + ' / ' + MAX;
    });
  }

  /* ── Form submit ── */
  function initForm() {
    var form = document.getElementById('fb-form');
    var emailInput = document.getElementById('fb-email');
    var expInput = document.getElementById('fb-experience');
    var emailErr = document.getElementById('fb-email-err');
    var expErr = document.getElementById('fb-exp-err');
    var ratingErr = document.getElementById('fb-rating-err');
    var successMsg = document.getElementById('fb-success');
    var submitBtn = document.getElementById('fb-submit');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var valid = true;

      // Validate email
      var emailVal = emailInput.value.trim();
      if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        emailErr.textContent = 'Please enter a valid email address.';
        emailInput.classList.add('fb-invalid');
        valid = false;
      } else {
        emailErr.textContent = '';
        emailInput.classList.remove('fb-invalid');
      }

      // Validate experience
      var expVal = expInput.value.trim();
      if (expVal.length < 10) {
        expErr.textContent = 'Please share at least 10 characters about your experience.';
        expInput.classList.add('fb-invalid');
        valid = false;
      } else {
        expErr.textContent = '';
        expInput.classList.remove('fb-invalid');
      }

      // Validate rating
      if (rating === 0) {
        ratingErr.textContent = 'Please select a rating.';
        valid = false;
      } else {
        ratingErr.textContent = '';
      }

      if (!valid) return;

      // Save
      saveFeedback({
        email: emailVal,
        experience: expVal,
        rating: rating,
        date: new Date().toISOString()
      });

      // Reset form
      form.reset();
      rating = 0;
      document.querySelectorAll('.fb-star').forEach(function (s) {
        s.classList.remove('fb-star-active');
      });
      document.getElementById('fb-char-count').textContent = '0 / 600';

      // Show success
      successMsg.style.display = 'flex';
      submitBtn.disabled = true;
      setTimeout(function () {
        successMsg.style.display = 'none';
        submitBtn.disabled = false;
      }, 4000);

      // Re-render wall with animation on new card
      renderWall(true);

      // Scroll to wall
      setTimeout(function () {
        document.getElementById('fb-wall').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    });
  }

  /* ── Boot ── */
  document.addEventListener('DOMContentLoaded', function () {
    initStars();
    initCharCounter();
    initForm();
    renderWall(false);

    document.getElementById('fb-show-more-btn').addEventListener('click', handleShowMore);
  });

})();
