/* Your Life Guard — site behaviour */
(function () {
  var root = document.documentElement;
  function markFor(dir, opts) {
    var L = window.LogoLab || {};
    return L.flagShield ? L.flagShield('color') : '';
  }
  function paintLogos(dir) {
    document.querySelectorAll('[data-logo]').forEach(function (slot) {
      var onDark = slot.getAttribute('data-logo') === 'dark';
      slot.innerHTML = markFor(dir, { onDark: onDark });
    });
  }
  var DIRS = ['a', 'b', 'c'];
  function applyDirection(dir) {
    if (DIRS.indexOf(dir) === -1) dir = 'a';
    root.setAttribute('data-direction', dir);
    paintLogos(dir);
  }
  function initSwitcher() { applyDirection('c'); }
  function initHeader() {
    var h = document.querySelector('.site-header');
    if (!h) return;
    var onScroll = function () { h.classList.toggle('scrolled', window.scrollY > 12); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      links.style.display = open ? 'flex' : '';
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (window.innerWidth <= 680) { links.classList.remove('open'); links.style.display = ''; }
      });
    });
  }
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    function show(e) { e.classList.add('in'); }
    if (!('IntersectionObserver' in window)) { els.forEach(show); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { show(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px -5% 0px' });
    els.forEach(function (e) { io.observe(e); });
    requestAnimationFrame(function () {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      els.forEach(function (e) {
        var r = e.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) show(e);
      });
    });
    setTimeout(function () { els.forEach(show); }, 1600);
  }
  function initForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    var seg = form.querySelectorAll('.segmented button');
    var who = form.querySelector('#who-input');
    seg.forEach(function (b) {
      b.addEventListener('click', function () {
        seg.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true');
        if (who) who.value = b.getAttribute('data-who');
      });
    });
    form.addEventListener('submit', function () {
      try {
        var btn = form.querySelector('button[type="submit"]');
        if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      } catch (e) {}
    });
  }
  function start() { initSwitcher(); initHeader(); initMobileNav(); initReveal(); initForm(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
