(function () {
  'use strict';

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Sticky header shadow ---------- */
  var header = document.getElementById('header');
  function onScroll() {
    header.classList.toggle('is-stuck', window.scrollY > 4);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById('menuToggle');
  var nav = document.getElementById('mainNav');

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  menuBtn.addEventListener('click', function () {
    setMenu(!nav.classList.contains('is-open'));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      setMenu(false);
      closeChat();
    }
  });

  /* ---------- Wishlist hearts ---------- */
  document.querySelectorAll('.wish').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-pressed') === 'true';
      btn.setAttribute('aria-pressed', String(!on));
      btn.setAttribute('aria-label', on ? 'Add to wishlist' : 'Remove from wishlist');
    });
  });

  /* ---------- Colour swatches ---------- */
  document.querySelectorAll('.swatches').forEach(function (group) {
    var swatches = group.querySelectorAll('.swatch');
    swatches.forEach(function (sw) {
      sw.addEventListener('click', function () {
        swatches.forEach(function (s) {
          s.classList.remove('is-active');
          s.setAttribute('aria-checked', 'false');
        });
        sw.classList.add('is-active');
        sw.setAttribute('aria-checked', 'true');
      });
    });
  });

  /* ---------- Carousels (swipe on mobile, dots follow scroll) ---------- */
  document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
    var track = carousel.querySelector('.carousel__track');
    var dotsWrap = carousel.querySelector('.dots');
    var cards = track.children;
    var dots = [];
    var total = 4; // matches the 4-dot indicator in the design

    for (var i = 0; i < total; i++) {
      var d = document.createElement('span');
      dotsWrap.appendChild(d);
      dots.push(d);
    }

    function update() {
      var max = track.scrollWidth - track.clientWidth;
      var ratio = max > 0 ? track.scrollLeft / max : 0;
      var active = Math.round(ratio * (total - 1));
      dots.forEach(function (d, idx) {
        d.classList.toggle('is-active', idx === active);
      });
    }
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });

  /* ---------- Chat box ---------- */
  var chatBtn = document.getElementById('chatBtn');
  var chatPanel = document.getElementById('chatPanel');
  var chatClose = document.getElementById('chatClose');
  var chatForm = document.getElementById('chatForm');
  var chatInput = document.getElementById('chatInput');
  var chatBody = chatPanel.querySelector('.chat-panel__body');

  function openChat() {
    chatPanel.hidden = false;
    chatBtn.setAttribute('aria-expanded', 'true');
    chatInput.focus();
  }
  function closeChat() {
    if (chatPanel.hidden) return;
    chatPanel.hidden = true;
    chatBtn.setAttribute('aria-expanded', 'false');
    chatBtn.focus();
  }
  chatBtn.addEventListener('click', function () {
    chatPanel.hidden ? openChat() : closeChat();
  });
  chatClose.addEventListener('click', closeChat);
  chatForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = chatInput.value.trim();
    if (!text) return;
    var p = document.createElement('p');
    p.className = 'me';
    p.textContent = text; // textContent keeps user input safe
    chatBody.appendChild(p);
    chatInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;
  });
})();
