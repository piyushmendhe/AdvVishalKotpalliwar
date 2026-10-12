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
  }
  if (gate && agree) {
    agree.addEventListener('click', closeGate);
    if (reopen) { reopen.addEventListener('click', function () { openGate(reopen); }); }
    gate.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') { e.preventDefault(); agree.focus(); }
    });
    if (!agreedBefore()) { openGate(null); }
  }
})();
