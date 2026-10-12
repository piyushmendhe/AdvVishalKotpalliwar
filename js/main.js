(function () {
  // Mobile menu
  var toggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('site-nav');

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(!nav.classList.contains('is-open'));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { setMenu(false); }
    });
  }

  // Underline the nav link for the section in view
  var links = document.querySelectorAll('#site-nav li a[href^="#"]');
  if (links.length && 'IntersectionObserver' in window) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        links.forEach(function (a) { a.removeAttribute('aria-current'); });
        byId[entry.target.id].setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) { observer.observe(section); }
    });
  }

  // Bar Council disclaimer: shown until the visitor agrees, remembered per browser
  var KEY = 'vk-disclaimer';
  var gate = document.getElementById('gate');
  var agree = document.getElementById('gate-agree');
  var reopen = document.getElementById('gate-open');
  var returnTo = null;

  function agreedBefore() {
    try { return localStorage.getItem(KEY) === 'agreed'; } catch (e) { return false; }
  }
  function openGate(from) {
    returnTo = from || null;
    gate.hidden = false;
    document.documentElement.classList.add('gated');
    agree.focus();
  }
  function closeGate() {
    gate.hidden = true;
    document.documentElement.classList.remove('gated');
    try { localStorage.setItem(KEY, 'agreed'); } catch (e) {}
    if (returnTo) { returnTo.focus(); }
    document.dispatchEvent(new Event('vk:ungated'));
  }
  if (gate && agree) {
    agree.addEventListener('click', closeGate);
    if (reopen) { reopen.addEventListener('click', function () { openGate(reopen); }); }
    gate.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') { e.preventDefault(); agree.focus(); }
    });
    if (!agreedBefore()) { openGate(null); }
  }

  // Count the headline figures up from zero the first time they scroll into view
  var counters = document.querySelectorAll('[data-count]');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1600;
    var started = null;
    function frame(now) {
      if (started === null) { started = now; }
      var t = Math.min(1, (now - started) / duration);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (t < 1) { requestAnimationFrame(frame); }
    }
    el.textContent = '0' + suffix;
    requestAnimationFrame(frame);
  }
  function watchCounters() {
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        seen.unobserve(entry.target);
        countUp(entry.target);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { seen.observe(el); });
  }
  if (counters.length && !reduceMotion && 'IntersectionObserver' in window) {
    // wait for the disclaimer to be dismissed, so the count is not hidden behind it
    if (document.documentElement.classList.contains('gated')) {
      document.addEventListener('vk:ungated', watchCounters, { once: true });
    } else {
      watchCounters();
    }
  }
})();
