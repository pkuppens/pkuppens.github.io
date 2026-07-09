/* ===========================================================================
   Trainings — shared site chrome (navigation + theme)
   Standalone training pages are not part of the React SPA, so they would
   otherwise have no site navigation. This script injects a header that mirrors
   the portfolio's (brand + the same links + theme toggle) so a reader can get
   back to the rest of the site, and keeps dark/light in sync with the SPA via
   the shared `pkuppens_theme` localStorage key.

   Load it as the FIRST element in each page's <head> (before the stylesheet):
   it applies the theme synchronously to avoid a flash, then injects the header
   once the DOM is ready. Links are absolute paths into the SPA.
   =========================================================================== */
(function () {
  var KEY = 'pkuppens_theme';
  var DEFAULT_THEME = 'dark';

  // Mirrors the portfolio header nav (src/components/layout/Header.tsx).
  var LINKS = [
    { href: '/', label: 'Home' },
    { href: '/profile', label: 'Profile' },
    { href: '/projects', label: 'Projects' },
    { href: '/trainings', label: 'Trainings', current: true },
    { href: '/evaluator', label: 'Evaluator', cta: true },
  ];

  function readTheme() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw === null) return DEFAULT_THEME;
      var v = JSON.parse(raw); // SPA stores a JSON-stringified value
      return v === 'light' || v === 'dark' ? v : DEFAULT_THEME;
    } catch (e) {
      return DEFAULT_THEME;
    }
  }

  function writeTheme(theme) {
    try {
      localStorage.setItem(KEY, JSON.stringify(theme));
    } catch (e) {
      /* storage may be unavailable (private mode / quota) */
    }
  }

  function apply(theme) {
    document.documentElement.dataset.theme = theme;
  }

  // 1) Apply theme immediately (script is in <head>, before the stylesheet paints).
  apply(readTheme());

  // 2) Inject the header once the body exists.
  function buildHeader() {
    if (document.querySelector('.site-nav')) return;

    var header = document.createElement('header');
    header.className = 'site-nav no-print';

    var inner = document.createElement('div');
    inner.className = 'site-nav-inner';

    var brand = document.createElement('a');
    brand.className = 'site-nav-brand';
    brand.href = '/';
    brand.innerHTML =
      '<span class="site-nav-mono">&lt;</span>Pieter Kuppens<span class="site-nav-mono">/&gt;</span>';
    inner.appendChild(brand);

    var nav = document.createElement('nav');
    nav.className = 'site-nav-links';

    LINKS.forEach(function (item) {
      var a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label;
      a.className =
        'site-nav-link' + (item.cta ? ' site-nav-cta' : '') + (item.current ? ' site-nav-current' : '');
      if (item.current) a.setAttribute('aria-current', 'page');
      nav.appendChild(a);
    });

    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'site-nav-toggle';

    function relabel() {
      var t = document.documentElement.dataset.theme;
      toggle.textContent = t === 'dark' ? 'Dark' : 'Light';
      toggle.setAttribute('aria-label', 'Switch to ' + (t === 'dark' ? 'light' : 'dark') + ' theme');
    }

    toggle.addEventListener('click', function () {
      var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(next);
      writeTheme(next);
      relabel();
    });

    relabel();
    nav.appendChild(toggle);
    inner.appendChild(nav);
    header.appendChild(inner);
    document.body.insertBefore(header, document.body.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildHeader);
  } else {
    buildHeader();
  }
})();
