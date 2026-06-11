/**
 * feedback.js — PK Tech Feedback Page
 * Feedbacks are stored in MongoDB via /api/feedback (shared across all devices).
 */
(function () {
  'use strict';

  var INITIAL_SHOW = 6;
  var rating = 0;
  var expanded = false;
  var allFeedbacks = [];

  /* ── API helpers ── */
  var BASE = window.location.origin;

  function apiFetch(path, options) {
    return fetch(BASE + path, options).then(function (res) {
      return res.json().then(function (data) {
        if (!res.ok) throw new Error(data.error || 'Request failed');
        return data;
      });
    });
  }

  function loadFeedbacks() {
    return apiFetch('/api/feedback').then(function (data) {
      allFeedbacks = data.feedbacks || [];
      return allFeedbacks;
    });
  }

  function postFeedback(payload) {
    return apiFetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }

  /* ── UI helpers ── */
  function maskEmail(email) {
    var parts = email.split('@');
    if (parts.length < 2) return email;
    return parts[0].slice(0, 2) + '***@' + parts[1];
  }

  function initials(email) {
    return email.slice(0, 2).toUpperCase();
  }

  function stars(n) {
    return '★'.repeat(n) + '☆'.repeat(5 - n);
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function buildCard(entry, animate) {
    var card = document.createElement('article');
    card.className = 'fb-card glass-panel' + (animate ? ' fb-card-animate' : '');
    card.innerHTML =
      '<div class="fb-card-head">' +
        '<div class="fb-avatar">' + initials(entry.email) + '</div>' +
        '<div class="fb-card-meta">' +
          '<span class="fb-card-email">' + maskEmail(entry.email) + '</span>' +
          '<span class="fb-card-date">' + formatDate(entry.createdAt) + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="fb-card-stars">' + stars(entry.rating) + '</div>' +
      '<p class="fb-card-body">' + escapeHtml(entry.experience) + '</p>';
    return card;
  }

  /* ── Render wall ── */
  function renderWall(animate) {
    var list = allFeedbacks;
    var cardsWrap   = document.getElementById('fb-cards-wrap');
    var empty       = document.getElementById('fb-empty');
    var totalBadge  = document.getElementById('fb-total-badge');
    var avgWrap     = document.getElementById('fb-avg-wrap');
    var avgStars    = document.getElementById('fb-avg-stars');
    var avgNum      = document.getElementById('fb-avg-num');
    var showMoreWrap = document.getElementById('fb-show-more-wrap');
    var showMoreBtn  = document.getElementById('fb-show-more-btn');

    // Clear existing cards
    cardsWrap.querySelectorAll('.fb-card').forEach(function (c) { c.remove(); });
    var oldExp = document.getElementById('fb-expanded-wrap');
    if (oldExp) oldExp.remove();
    expanded = false;
    showMoreBtn.textContent = 'Show More Reviews';

    totalBadge.textContent = list.length + (list.length === 1 ? ' review' : ' reviews');

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

    // First INITIAL_SHOW cards
    list.slice(0, INITIAL_SHOW).forEach(function (entry, i) {
      cardsWrap.appendChild(buildCard(entry, animate && i === 0));
    });

    showMoreWrap.style.display = list.length > INITIAL_SHOW ? '' : 'none';
  }

  /* ── Show More ── */
  function handleShowMore() {
    var showMoreWrap = document.getElementById('fb-show-more-wrap');
    var showMoreBtn  = document.getElementById('fb-show-more-btn');

    if (!expanded) {
      var rest = allFeedbacks.slice(INITIAL_SHOW);
      var expandedWrap = document.createElement('div');
      expandedWrap.id = 'fb-expanded-wrap';
      expandedWrap.className = 'fb-expanded-wrap';
      rest.forEach(function (entry, i) {
        var card = buildCard(entry, true);
        card.style.animationDelay = (i * 0.06) + 's';
        card.style.opacity = '0';
        card.addEventListener('animationend', function () { card.style.opacity = ''; });
        expandedWrap.appendChild(card);
      });
      showMoreWrap.parentNode.insertBefore(expandedWrap, showMoreWrap);
      setTimeout(function () {
        expandedWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      showMoreBtn.textContent = 'Show Less';
      expanded = true;
    } else {
      var ex = document.getElementById('fb-expanded-wrap');
      if (ex) ex.remove();
      showMoreBtn.textContent = 'Show More Reviews';
      expanded = false;
      document.getElementById('fb-wall').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /* ── Stars interaction ── */
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

  /* ── Char counter ── */
  function initCharCounter() {
    var textarea = document.getElementById('fb-experience');
    var counter  = document.getElementById('fb-char-count');
    var MAX = 600;
    textarea.maxLength = MAX;
    textarea.addEventListener('input', function () {
      counter.textContent = textarea.value.length + ' / ' + MAX;
    });
  }

  /* ── Form submit ── */
  function initForm() {
    var form       = document.getElementById('fb-form');
    var emailInput = document.getElementById('fb-email');
    var expInput   = document.getElementById('fb-experience');
    var emailErr   = document.getElementById('fb-email-err');
    var expErr     = document.getElementById('fb-exp-err');
    var ratingErr  = document.getElementById('fb-rating-err');
    var successMsg = document.getElementById('fb-success');
    var submitBtn  = document.getElementById('fb-submit');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      var emailVal = emailInput.value.trim();
      if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        emailErr.textContent = 'Please enter a valid email address.';
        emailInput.classList.add('fb-invalid');
        valid = false;
      } else {
        emailErr.textContent = '';
        emailInput.classList.remove('fb-invalid');
      }

      var expVal = expInput.value.trim();
      if (expVal.length < 10) {
        expErr.textContent = 'Please share at least 10 characters about your experience.';
        expInput.classList.add('fb-invalid');
        valid = false;
      } else {
        expErr.textContent = '';
        expInput.classList.remove('fb-invalid');
      }

      if (rating === 0) {
        ratingErr.textContent = 'Please select a rating.';
        valid = false;
      } else {
        ratingErr.textContent = '';
      }

      if (!valid) return;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting…';

      postFeedback({ email: emailVal, experience: expVal, rating: rating })
        .then(function (data) {
          // Prepend new feedback to local list and re-render
          allFeedbacks.unshift(data.feedback);
          renderWall(true);

          form.reset();
          rating = 0;
          document.querySelectorAll('.fb-star').forEach(function (s) {
            s.classList.remove('fb-star-active');
          });
          document.getElementById('fb-char-count').textContent = '0 / 600';

          successMsg.style.display = 'flex';
          setTimeout(function () { successMsg.style.display = 'none'; }, 4000);

          setTimeout(function () {
            document.getElementById('fb-wall').scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 300);
        })
        .catch(function (err) {
          expErr.textContent = err.message || 'Failed to submit. Please try again.';
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Feedback';
        });
    });
  }

  /* ── Boot ── */
  document.addEventListener('DOMContentLoaded', function () {
    initStars();
    initCharCounter();
    initForm();

    // Load from backend on page load
    loadFeedbacks()
      .then(function () { renderWall(false); })
      .catch(function () {
        document.getElementById('fb-empty').style.display = '';
        document.getElementById('fb-empty').textContent = 'Could not load feedbacks. Please refresh.';
      });

    document.getElementById('fb-show-more-btn').addEventListener('click', handleShowMore);
  });

})();
