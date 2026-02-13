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

  function playLetterChime() {
    try {
      var C = window.AudioContext || window.webkitAudioContext;
      if (!C) return;
      var ctx = new C();
      var notes = [523.25, 659.25, 783.99];
      var startTime = ctx.currentTime;
      notes.forEach(function (freq, i) {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.2, startTime + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + i * 0.08 + 0.35);
        osc.start(startTime + i * 0.12);
        osc.stop(startTime + i * 0.12 + 0.4);
      });
    } catch (e) {}
  }

  function heartBurst(container, count) {
    if (!container) return;
    var hearts = ['♥', '❤', '💕'];
    for (var i = 0; i < count; i++) {
      var el = document.createElement('span');
      el.className = 'burst-heart';
      el.textContent = hearts[i % 3];
      var angle = (i / count) * Math.PI * 2 + Math.random();
      var dist = 80 + Math.random() * 60;
      el.style.setProperty('--bx', Math.cos(angle) * dist + 'px');
      el.style.setProperty('--by', Math.sin(angle) * dist - 40 + 'px');
      container.appendChild(el);
      setTimeout(function (node) {
        if (node.parentNode) node.parentNode.removeChild(node);
      }, 1000, el);
    }
  }

  function openLetter() {
    if (!letterModal) return;
    playLetterChime();
    var burst = document.getElementById('letter-burst');
    if (burst) {
      burst.innerHTML = '';
      heartBurst(burst, 18);
      setTimeout(function () {
        heartBurst(burst, 10);
      }, 150);
    }
    var glow = document.getElementById('letter-glow');
    if (glow) glow.style.animation = 'none';
    var box = document.getElementById('letter-modal-box');
    if (box) {
      box.classList.remove('letter-open');
      void box.offsetWidth;
      box.classList.add('letter-open');
    }
    letterModal.removeAttribute('hidden');
    letterModal.setAttribute('data-open', 'true');
    document.body.style.overflow = 'hidden';
    if (glow) {
      glow.offsetHeight;
      glow.style.animation = '';
    }
  }

  function closeLetter() {
    if (!letterModal) return;
    var box = document.getElementById('letter-modal-box');
    if (box) box.classList.remove('letter-open');
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

  // ----- Tap hearts (hero / heart frame) -----
  var tapHeartsEl = document.getElementById('tap-hearts');
  var heroHeart = document.getElementById('hero-heart');
  function spawnTapHearts(x, y) {
    if (!tapHeartsEl) return;
    var hearts = ['♥', '❤', '💕'];
    for (var i = 0; i < 5; i++) {
      var el = document.createElement('span');
      el.className = 'tap-heart';
      el.textContent = hearts[i % 3];
      el.style.left = (x + (Math.random() - 0.5) * 40) + 'px';
      el.style.top = y + 'px';
      tapHeartsEl.appendChild(el);
      setTimeout(function (node) {
        if (node.parentNode) node.parentNode.removeChild(node);
      }, 1200, el);
    }
  }
  function onHeroTap(e) {
    var x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    var y = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    spawnTapHearts(x, y);
  }
  if (heroHeart) {
    heroHeart.addEventListener('click', onHeroTap);
    heroHeart.addEventListener('touchend', function (e) {
      if (e.changedTouches && e.changedTouches[0]) {
        spawnTapHearts(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
      }
    });
  }

  // ----- Corner "Made with love" -----
  setTimeout(function () {
    var corner = document.getElementById('corner-love');
    if (corner) corner.classList.add('visible');
  }, 3000);

  // ----- Music: YouTube song (https://youtu.be/OSH8xhp19VU) – autoplay muted, tap for sound -----
  const musicToggle = document.getElementById('music-toggle');
  const ytContainer = document.getElementById('yt-music');
  const YT_VIDEO_ID = 'OSH8xhp19VU';
  var ytPlayer = null;
  var soundOn = false;
  var pendingUnmute = false;

  function updateHint() {
    var h = document.getElementById('music-hint');
    if (h) h.textContent = soundOn ? '' : 'Tap for sound';
  }

  function createYTPlayer() {
    if (ytPlayer || !ytContainer) return;
    ytPlayer = new YT.Player('yt-music', {
      height: '1',
      width: '1',
      videoId: YT_VIDEO_ID,
      playerVars: {
        autoplay: 1,
        mute: 1,
        loop: 1,
        playlist: YT_VIDEO_ID,
        playsinline: 1
      },
      events: {
        onReady: function () {
          if (musicToggle) musicToggle.classList.remove('playing');
          updateHint();
          if (pendingUnmute) {
            pendingUnmute = false;
            unmuteMusic();
          }
        }
      }
    });
  }

  var didCelebrateMusic = false;
  function musicCelebration() {
    if (didCelebrateMusic) return;
    didCelebrateMusic = true;
    var wrap = document.getElementById('music-celebration-wrap');
    if (!wrap) return;
    var symbols = ['♥', '♪', '❤'];
    for (var i = 0; i < 3; i++) {
      var el = document.createElement('span');
      el.className = 'music-celebration';
      el.textContent = symbols[i];
      el.style.left = (15 + i * 14) + 'px';
      el.style.bottom = '0';
      el.style.position = 'absolute';
      el.style.animationDelay = (i * 0.1) + 's';
      wrap.appendChild(el);
      setTimeout(function (node) {
        if (node.parentNode) node.parentNode.removeChild(node);
      }, 800, el);
    }
  }

  function unmuteMusic() {
    if (!ytPlayer || !ytPlayer.unMute) return;
    ytPlayer.unMute();
    ytPlayer.playVideo();
    soundOn = true;
    if (musicToggle) musicToggle.classList.add('playing');
    updateHint();
    musicCelebration();
  }

  function toggleMute() {
    if (!ytPlayer) return;
    soundOn = !soundOn;
    if (soundOn) {
      ytPlayer.unMute();
      ytPlayer.playVideo();
      if (musicToggle) musicToggle.classList.add('playing');
    } else {
      ytPlayer.mute();
      if (musicToggle) musicToggle.classList.remove('playing');
    }
    updateHint();
  }

  function handleMusicTap(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!ytPlayer) {
      pendingUnmute = true;
      return;
    }
    if (!soundOn) {
      unmuteMusic();
    } else {
      toggleMute();
    }
  }

  function unlockSound() {
    if (soundOn) return;
    if (ytPlayer) {
      unmuteMusic();
    } else {
      pendingUnmute = true;
    }
  }

  if (musicToggle) {
    musicToggle.addEventListener('click', handleMusicTap);
    musicToggle.addEventListener('touchend', function (e) {
      e.preventDefault();
      handleMusicTap(e);
    }, { passive: false });
  }
  document.addEventListener('click', unlockSound, { once: true });
  document.addEventListener('touchend', unlockSound, { once: true, passive: true });

  window.onYouTubeIframeAPIReady = function () {
    createYTPlayer();
  };
  if (window.YT && window.YT.Player) {
    createYTPlayer();
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
