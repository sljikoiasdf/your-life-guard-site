/* Your Life Guard — site behaviour
   - injects the brand logo mark
   - sticky-header state, scroll reveals, mobile nav
   - contact form: audience segmented control (real submit to FormSubmit)
   - iframe helpers: height reporting + tel:/mailto: bubble-up for iOS Safari */

(function () {
  function paintLogos() {
    var mark = (window.LogoLab && window.LogoLab.flagShield) ? window.LogoLab.flagShield('color') : '';
    document.querySelectorAll('[data-logo]').forEach(function (slot) { slot.innerHTML = mark; });
  }

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
  }

  function initIframeBridge() {
    if (window.parent === window) return;
    function reportHeight() {
      var h = document.documentElement.scrollHeight;
      try { window.parent.postMessage({ ylg: 'height', value: h }, '*'); } catch (e) {}
    }
    window.addEventListener('load', reportHeight);
    window.addEventListener('resize', reportHeight);
    if (window.ResizeObserver) new ResizeObserver(reportHeight).observe(document.documentElement);
    setInterval(reportHeight, 1200);

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
