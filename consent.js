/* Holirentals · Consentimiento de cookies (Google Consent Mode v2)
   - Por defecto todo denegado: no se carga Google Analytics.
   - Solo si la persona pulsa "Aceptar" se carga gtag.js (GA4) y se actualiza el consentimiento a "granted".
   - La elección se guarda en localStorage ("hr_cookie_consent": "granted" | "denied").
   - Cualquier elemento con [data-cookie-settings] vuelve a abrir el banner. */
(function () {
  var GA_ID = 'G-MFDEXBBM13';
  var KEY = 'hr_cookie_consent';
  var gaLoaded = false;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  // Consent Mode v2: valores por defecto denegados antes de cualquier etiqueta de Google.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted'
  });

  function getChoice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setChoice(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  function loadGA() {
    if (gaLoaded) return;
    gaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function grant() {
    gtag('consent', 'update', { analytics_storage: 'granted' });
    loadGA();
  }

  function clearGACookies() {
    var host = location.hostname.replace(/^www\./, '');
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (/^_ga/.test(name) || name === '_gid') {
        ['', '; domain=' + host, '; domain=.' + host].forEach(function (d) {
          document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + d;
        });
      }
    });
  }

  function deny() {
    gtag('consent', 'update', { analytics_storage: 'denied' });
    clearGACookies();
  }

  if (getChoice() === 'granted') grant();

  function buildBanner() {
    if (document.getElementById('hr-cookie-banner')) return document.getElementById('hr-cookie-banner');
    var css = document.createElement('style');
    css.textContent =
      '#hr-cookie-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:5000;max-width:720px;margin:0 auto;' +
      'background:rgba(13,13,13,0.97);border:1px solid rgba(212,175,55,0.45);border-radius:8px;padding:18px 20px;' +
      'box-shadow:0 8px 30px rgba(0,0,0,0.5);font-family:Inter,system-ui,sans-serif;color:#ddd;font-size:14px;line-height:1.55;' +
      'display:none;gap:16px;align-items:center;flex-wrap:wrap}' +
      '#hr-cookie-banner.show{display:flex}' +
      '#hr-cookie-banner p{flex:1 1 320px;margin:0;color:#ddd;font-size:14px}' +
      '#hr-cookie-banner a{color:#D4AF37;text-decoration:underline}' +
      '#hr-cookie-banner .hr-cb-btns{display:flex;gap:10px;flex-wrap:wrap}' +
      '#hr-cookie-banner button{font-family:inherit;font-size:14px;font-weight:600;padding:9px 20px;border-radius:3px;cursor:pointer;' +
      'border:1.5px solid #D4AF37;transition:all .2s}' +
      '#hr-cookie-banner .hr-cb-accept{background:#D4AF37;color:#0d0d0d}' +
      '#hr-cookie-banner .hr-cb-accept:hover{background:#c9a227}' +
      '#hr-cookie-banner .hr-cb-reject{background:transparent;color:#D4AF37}' +
      '#hr-cookie-banner .hr-cb-reject:hover{background:#D4AF37;color:#0d0d0d}';
    document.head.appendChild(css);

    var b = document.createElement('div');
    b.id = 'hr-cookie-banner';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-live', 'polite');
    var en = (document.documentElement.lang || '').toLowerCase().indexOf('en') === 0;
    b.setAttribute('aria-label', en ? 'Cookie notice' : 'Aviso de cookies');
    b.innerHTML = en ?
      '<p>We use necessary first-party cookies and, only if you accept, analytics cookies (Google Analytics) to understand how the website is used. ' +
      'You can change your choice at any time. <a href="/en/cookies/">More information</a>.</p>' +
      '<div class="hr-cb-btns"><button type="button" class="hr-cb-reject">Reject</button>' +
      '<button type="button" class="hr-cb-accept">Accept</button></div>' :
      '<p>Usamos cookies propias necesarias y, solo si lo aceptas, cookies de analítica (Google Analytics) para saber cómo se usa la web. ' +
      'Puedes cambiar tu elección cuando quieras. <a href="/cookies/">Más información</a>.</p>' +
      '<div class="hr-cb-btns"><button type="button" class="hr-cb-reject">Rechazar</button>' +
      '<button type="button" class="hr-cb-accept">Aceptar</button></div>';
    document.body.appendChild(b);

    b.querySelector('.hr-cb-accept').addEventListener('click', function () {
      setChoice('granted'); grant(); b.classList.remove('show');
    });
    b.querySelector('.hr-cb-reject').addEventListener('click', function () {
      setChoice('denied'); deny(); b.classList.remove('show');
    });
    return b;
  }

  function init() {
    var b = buildBanner();
    if (!getChoice()) b.classList.add('show');
    document.querySelectorAll('[data-cookie-settings]').forEach(function (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); buildBanner().classList.add('show'); });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
