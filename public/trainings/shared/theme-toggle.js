/* ===========================================================================
   Trainings — shared theme toggle
   Unifies dark/light with the portfolio SPA via the SAME localStorage key.

   The SPA stores theme under `pkuppens_theme` as a JSON string ("dark"/"light")
   — prefix from src/infrastructure/storage.ts, semantics from themeStorage.ts
   (default: dark) — and applies it as data-theme on <html>. This script mirrors
   that exactly, so toggling in a lesson persists to the SPA and vice-versa.

   Load this as the FIRST element in each page's <head> (before the stylesheet):
   it sets data-theme synchronously to avoid a flash, then adds the toggle
   button once the DOM is ready.
   =========================================================================== */
(function () {
  var KEY = 'pkuppens_theme';
  var DEFAULT_THEME = 'dark';

  function readTheme() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw === null) return DEFAULT_THEME;
      var v = JSON.parse(raw); // SPA stores JSON-stringified value
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

  // 1) Apply immediately (script is in <head>, before the stylesheet paints).
  apply(readTheme());

  // 2) Add the toggle button once the body exists.
  function addButton() {
    if (document.querySelector('.theme-toggle')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'theme-toggle no-print';

    function label() {
      var t = document.documentElement.dataset.theme;
      btn.textContent = t === 'dark' ? 'Dark' : 'Light';
      btn.setAttribute(
        'aria-label',
        'Switch to ' + (t === 'dark' ? 'light' : 'dark') + ' theme'
      );
    }

    btn.addEventListener('click', function () {
      var next =
        document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(next);
      writeTheme(next);
      label();
    });

    label();
    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addButton);
  } else {
    addButton();
  }
})();
