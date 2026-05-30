/* Your Life Guard — site behaviour
   - injects the brand logo mark
   - sticky-header state, scroll reveals, mobile nav
   - contact form: audience segmented control (real submit to FormSubmit)
   - iframe helpers: height reporting + tel:/mailto: bubble-up for iOS Safari */

(function () {
  /* ---------- logo injection ---------- */
  function paintLogos() {
    var mark = (window.LogoLab && window.LogoLab.flagShield) ? window.LogoLab.flagShield('color') : '';
    document.querySelectorAll('[data-logo]').forEach(function (slot) { slot.innerHTML = mark; });
  }

  /* ---------- header: sticky border + (home) transparent-over-hero → solid ---------- */
  function initHeader() {
    var h = document.querySelector('.site-header');
    if (!h) return;
    var isHome = document.body.classList.contains('home');
    var hero = document.querySelector('.fbhero');
    var onScroll = function () {
      var y = window.scrollY;
      h.classList.toggle('scrolled', y > 12);
      if (isHome && hero) {
        h.classList.toggle('solid', y > (hero.offsetHeight - 70));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- mobile nav ---------- */
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

  /* ---------- scroll reveal (progressive enhancement, never hides content) ---------- */
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

  /* ---------- contact form (segmented control only — real POST to backend) ---------- */
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
    /* NOTE: no preventDefault — the form submits to its `action` (FormSubmit)
       and the user is redirected to thanks.html via the _next hidden field. */
  }

  /* ---------- iframe helpers (used when embedded via the Carrd snippet) ---------- */
  function initIframeBridge() {
    if (window.parent === window) return; // not embedded
    // 1) report document height so a non-fullscreen parent can size us
    function reportHeight() {
      var h = document.documentElement.scrollHeight;
      try { window.parent.postMessage({ ylg: 'height', value: h }, '*'); } catch (e) {}
    }
    window.addEventListener('load', reportHeight);
    window.addEventListener('resize', reportHeight);
    if (window.ResizeObserver) new ResizeObserver(reportHeight).observe(document.documentElement);
    setInterval(reportHeight, 1200);

    // 2) bubble tel:/mailto: clicks up to the top window (iOS Safari blocks them in-iframe)
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="tel:"],a[href^="mailto:"]');
      if (!a) return;
      e.preventDefault();
      try { window.parent.postMessage({ ylg: 'navigate', href: a.getAttribute('href') }, '*'); } catch (err) {}
    });
  }

  function start() {
    paintLogos();
    initHeader();
    initMobileNav();
    initReveal();
    initForm();
    initIframeBridge();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
