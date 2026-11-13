/* IVA25: franja de aviso fija arriba, se puede cerrar. No usa cookies; el cierre se recuerda solo durante la sesión (sessionStorage). */
(function () {
  var KEY = 'iva25-cerrado';
  try { if (sessionStorage.getItem(KEY)) return; } catch (e) {}
  var path = location.pathname;
  var en = (document.documentElement.lang || '').slice(0, 2) === 'en';
  var isCalc = path.indexOf('/calculadora') === 0;
  var t = en ? {
    msg: 'From 1 December, holiday rental apartments pay 10% VAT. Do you know how it affects your returns?',
    cta: 'Request your free review', href: '/calculadora/', close: 'Close notice', label: 'VAT notice'
  } : {
    msg: 'Desde el 1 de diciembre los pisos turísticos pagan un 10 % de IVA. ¿Sabes cómo afecta a tu rentabilidad?',
    cta: 'Pide tu análisis gratuito', href: isCalc ? '#valora' : '/calculadora/', close: 'Cerrar aviso', label: 'Aviso IVA'
  };
  var css = '#iva25{position:fixed;top:0;left:0;right:0;z-index:2000;background:#d4af37;color:#111;font:500 14px/1.4 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;box-shadow:0 2px 10px rgba(0,0,0,.25)}' +
    '#iva25 .iva25-in{max-width:1200px;margin:0 auto;padding:10px 48px 10px 16px;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:6px 14px;text-align:center}' +
    '#iva25 a.iva25-cta{display:inline-block;background:#111;color:#d4af37;text-decoration:none;font-weight:600;padding:6px 14px;border-radius:999px;white-space:nowrap}' +
    '#iva25 a.iva25-cta:hover,#iva25 a.iva25-cta:focus-visible{background:#000;color:#fff}' +
    '#iva25 button{position:absolute;top:50%;right:10px;transform:translateY(-50%);width:32px;height:32px;border:0;border-radius:50%;background:transparent;color:#111;font-size:22px;line-height:1;cursor:pointer}' +
    '#iva25 button:hover,#iva25 button:focus-visible{background:rgba(0,0,0,.12)}' +
    '@media (max-width:600px){#iva25{font-size:13px}#iva25 .iva25-in{padding:8px 44px 8px 12px}}';
  function init() {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var bar = document.createElement('div');
    bar.id = 'iva25'; bar.setAttribute('role', 'region'); bar.setAttribute('aria-label', t.label);
    bar.innerHTML = '<div class="iva25-in"><span></span><a class="iva25-cta"></a></div><button type="button">&times;</button>';
    bar.querySelector('span').textContent = t.msg;
    var a = bar.querySelector('a'); a.textContent = t.cta; a.href = t.href;
    var btn = bar.querySelector('button'); btn.setAttribute('aria-label', t.close); btn.title = t.close;
    document.body.insertBefore(bar, document.body.firstChild);
    var header = document.querySelector('header');
    var fixedHeader = header && getComputedStyle(header).position === 'fixed';
    function place() {
      var h = bar.offsetHeight;
      if (header) header.style.top = h + 'px';
      if (!fixedHeader) document.body.style.paddingTop = h + 'px';
    }
    place(); window.addEventListener('resize', place);
    btn.addEventListener('click', function () {
      window.removeEventListener('resize', place);
      bar.remove();
      if (header) header.style.top = '';
      document.body.style.paddingTop = '';
      try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
