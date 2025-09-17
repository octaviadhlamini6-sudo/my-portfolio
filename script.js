// Theme persistence
(function () {
  var root = document.documentElement;
  var stored = localStorage.getItem('theme');
  if (stored === 'light') {
    root.setAttribute('data-theme', 'light');
  }
})();

// Mobile nav toggle
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var list = document.getElementById('nav-list');
  if (!toggle || !list) return;
  toggle.addEventListener('click', function () {
    var isOpen = list.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  list.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { list.classList.remove('open'); });
  });
})();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var targetId = this.getAttribute('href');
    if (!targetId || targetId === '#' || targetId === '#0') return;
    var el = document.querySelector(targetId);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', targetId);
  });
});

// Back to top button
(function () {
  var btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) btn.classList.add('show'); else btn.classList.remove('show');
  });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// Theme toggle
(function () {
  var toggle = document.getElementById('themeToggle');
  if (!toggle) return;
  toggle.addEventListener('click', function () {
    var isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.removeItem('theme');
      toggle.textContent = '🌙';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      toggle.textContent = '🌑';
    }
  });
})();

// Year in footer
(function () {
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// Reveal on scroll
(function () {
  var observed = document.querySelectorAll('.section, .card, .profile-card, .headline, .chip-list');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.setAttribute('data-reveal', '');
        setTimeout(function () { entry.target.classList.add('visible'); }, 10);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  observed.forEach(function (el) { observer.observe(el); });
})();


