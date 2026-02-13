(function () {
  'use strict';

  // ----- Config -----
  const LOVE_DATE = new Date('2025-12-30T00:00:00');
  const BIRTHDAY_DATE = new Date('2026-02-17T00:00:00');

  // ----- Custom heart cursor -----
  const cursor = document.getElementById('heart-cursor');
  if (cursor) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    const ease = 0.15;

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
      document.body.classList.add('no-custom-cursor');
      cursor.style.display = 'none';
    } else {
      document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });
      function animateCursor() {
        cursorX += (mouseX - cursorX) * ease;
        cursorY += (mouseY - cursorY) * ease;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
      }
      animateCursor();
    }
  }

  // ----- Falling heart particles -----
  const particlesContainer = document.getElementById('particles-js');
  if (particlesContainer) {
    const heartChars = ['♥', '❤', '💕'];
    const count = 28;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.className = 'particle-heart';
      el.textContent = heartChars[i % heartChars.length];
      el.style.cssText = [
        'position:absolute',
        'left:' + Math.random() * 100 + 'vw',
        'top:-20px',
        'font-size:' + (12 + Math.random() * 14) + 'px',
        'color:rgba(201,169,98,' + (0.25 + Math.random() * 0.4) + ')',
        'pointer-events:none',
        'animation:fall ' + (8 + Math.random() * 8) + 's linear infinite',
        'animation-delay:' + Math.random() * -16 + 's',
      ].join(';');
      fragment.appendChild(el);
    }
    particlesContainer.appendChild(fragment);
  }

  // Add keyframes for falling hearts
  const fallStyle = document.createElement('style');
  fallStyle.textContent = `
    @keyframes fall {
      to { transform: translateY(100vh) rotate(360deg); }
    }
  `;
  document.head.appendChild(fallStyle);

  // ----- Day counter (since 30 Dec 2025) -----
  function updateLoveCounter() {
    const now = new Date();
    const diff = now - LOVE_DATE;
    if (diff < 0) return;
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const elDays = document.getElementById('days');
    const elHours = document.getElementById('hours');
    const elMinutes = document.getElementById('minutes');
    if (elDays) elDays.textContent = days;
    if (elHours) elHours.textContent = hours;
    if (elMinutes) elMinutes.textContent = minutes;
  }
  updateLoveCounter();
  setInterval(updateLoveCounter, 60000);

  // ----- Birthday countdown (17 Feb 2026) -----
  function updateBirthdayCountdown() {
    const now = new Date();
    let target = new Date(BIRTHDAY_DATE);
    if (now >= target) {
      target = new Date(now.getFullYear() + 1, 1, 17);
    }
    const diff = target - now;
    if (diff <= 0) {
      document.getElementById('bday-days').textContent = '0';
      document.getElementById('bday-hours').textContent = '0';
      document.getElementById('bday-minutes').textContent = '0';
      document.getElementById('bday-seconds').textContent = '0';
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    const d = document.getElementById('bday-days');
    const h = document.getElementById('bday-hours');
    const m = document.getElementById('bday-minutes');
    const s = document.getElementById('bday-seconds');
    if (d) d.textContent = days;
    if (h) h.textContent = hours;
    if (m) m.textContent = minutes;
    if (s) s.textContent = seconds;
  }
  updateBirthdayCountdown();
  setInterval(updateBirthdayCountdown, 1000);

  // ----- Gallery lightbox -----
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = lightbox && lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('.gallery-item').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const src = btn.getAttribute('data-src');
      if (!lightbox || !lightboxImg || !src) return;
      lightboxImg.src = src;
      lightbox.removeAttribute('hidden');
      lightbox.setAttribute('data-open', 'true');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.setAttribute('data-open', 'false');
    lightbox.setAttribute('hidden', '');
    if (lightboxImg) lightboxImg.removeAttribute('src');
    document.body.style.overflow = '';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.getAttribute('data-open') === 'true') closeLightbox();
    });
  }

  // ----- Love letter modal -----
  const openLetterBtn = document.getElementById('open-letter');
  const letterModal = document.getElementById('letter-modal');
  const letterBackdrop = letterModal && letterModal.querySelector('.modal-backdrop');
  const letterClose = letterModal && letterModal.querySelector('.modal-close');

  function openLetter() {
    if (!letterModal) return;
    letterModal.removeAttribute('hidden');
    letterModal.setAttribute('data-open', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeLetter() {
    if (!letterModal) return;
    letterModal.setAttribute('data-open', 'false');
    letterModal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  if (openLetterBtn) openLetterBtn.addEventListener('click', openLetter);
  if (letterClose) letterClose.addEventListener('click', closeLetter);
  if (letterBackdrop) letterBackdrop.addEventListener('click', closeLetter);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && letterModal && letterModal.getAttribute('data-open') === 'true') closeLetter();
  });

  // ----- Music toggle (YouTube: https://youtu.be/OSH8xhp19VU) -----
  const musicToggle = document.getElementById('music-toggle');
  const youtubeWrap = document.getElementById('youtube-player-wrap');
  const YOUTUBE_VIDEO_ID = 'OSH8xhp19VU';
  let ytPlayer = null;
  let ytReady = false;

  function onYouTubeIframeAPIReady() {
    ytReady = true;
  }
  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

  function initYouTubePlayer() {
    if (ytPlayer || !youtubeWrap) return;
    var inner = document.createElement('div');
    inner.id = 'yt-player-inner';
    youtubeWrap.appendChild(inner);
    ytPlayer = new YT.Player('yt-player-inner', {
      height: '1',
      width: '1',
      videoId: YOUTUBE_VIDEO_ID,
      playerVars: {
        autoplay: 1,
        loop: 1,
        playlist: YOUTUBE_VIDEO_ID,
        playsinline: 1,
        modestbranding: 1
      },
      events: {
        onReady: function (e) {
          e.target.playVideo();
          if (musicToggle) musicToggle.classList.add('playing');
        }
      }
    });
  }

  function toggleYouTubeMusic() {
    if (!ytReady || typeof YT === 'undefined' || !YT.Player) {
      if (youtubeWrap && !youtubeWrap.querySelector('iframe')) {
        youtubeWrap.id = 'youtube-player-wrap';
        var iframe = document.createElement('div');
        iframe.id = 'yt-player-inner';
        youtubeWrap.appendChild(iframe);
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(tag, firstScript);
        window.onYouTubeIframeAPIReady = function () {
          ytReady = true;
          initYouTubePlayer();
        };
        if (window.YT && window.YT.Player) {
          ytReady = true;
          initYouTubePlayer();
        }
      }
      return;
    }
    if (!ytPlayer) {
      initYouTubePlayer();
      return;
    }
    var state = ytPlayer.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
      ytPlayer.pauseVideo();
      if (musicToggle) musicToggle.classList.remove('playing');
    } else {
      ytPlayer.playVideo();
      if (musicToggle) musicToggle.classList.add('playing');
    }
  }

  if (musicToggle) {
    musicToggle.addEventListener('click', function () {
      if (window.YT && window.YT.Player) {
        toggleYouTubeMusic();
        return;
      }
      if (!youtubeWrap.querySelector('iframe')) {
        initYouTubePlayer();
        return;
      }
      toggleYouTubeMusic();
    });
  }

  // ----- Scroll reveal -----
  const revealEls = document.querySelectorAll('.section-title, .day-counter, .gallery, .split-layout, .btn-heart, .birthday-countdown');
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach(function (el) {
    el.classList.add('reveal');
    observer.observe(el);
  });
})();
