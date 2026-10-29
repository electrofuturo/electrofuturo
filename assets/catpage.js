/* ============================================================
   CATPAGE — Página individual por categoría (estilo Electronics BGA)
   Se integra con app.js (usa cardProducto, irAlCatalogo, EF.productos)
   ============================================================ */
(function () {
  'use strict';
  // Imágenes desde Google Drive (no requiere subir archivos a GitHub)
  var DRIVE_IMGS = {"cat-accesorios": "https://drive.google.com/thumbnail?id=1OYOf8yve_Wn3TXz5SJkeaYt6BugxcaXK&sz=w800", "cat-audifonos_y_parlantes": "https://drive.google.com/thumbnail?id=1b07oP0Dv0CPVoXd06PbfDyKDRibqIST2&sz=w800", "cat-baterias": "https://drive.google.com/thumbnail?id=1Nk0ggirU18MUnhPWz-1Wjf0ShGymj6uI&sz=w800", "cat-pantallas": "https://drive.google.com/thumbnail?id=1Oyg0ndpUYn6M7REp5r6FY-XD81PtlMNL&sz=w800", "cat-smartwatch": "https://drive.google.com/thumbnail?id=1tsVUhcz4e05X_9dHEQoO5urQmFGpzU3u&sz=w800", "sub-adaptadores_de_viaje": "https://drive.google.com/thumbnail?id=1mUM_w-eV-tie0CbmhC1dRv0ALE7bF3gg&sz=w400", "sub-almacenamiento": "https://drive.google.com/thumbnail?id=1LzQVY2IOWVdoYG0FlSBci6476bSEiW9j&sz=w400", "sub-audifonos_con_cable": "https://drive.google.com/thumbnail?id=1y4ADLZHFSm9e8unbevVmQWXHrEnA8AJF&sz=w400", "sub-audifonos_deportivos": "https://drive.google.com/thumbnail?id=10ZdNst5itEtcJ3OYnvEYKUS_2gK9AYOw&sz=w400", "sub-audifonos_inalambricos": "https://drive.google.com/thumbnail?id=1bg7vC0LJSFQ1rsr8_oFIGRnlj2c0Wimp&sz=w400", "sub-bases_y_proteccion": "https://drive.google.com/thumbnail?id=1CO3MF4GfozdPTuPrRlU5hxff7kG_Tvnt&sz=w400", "sub-bateria_iphone_premium": "https://drive.google.com/thumbnail?id=1yQNfZrSeZO3yt5amA8KZ8C77Q_tToYdk&sz=w400", "sub-cables_de_audio": "https://drive.google.com/thumbnail?id=1SERidYYIkKpqWZS9oTxoN-qw_GUl31wa&sz=w400", "sub-cables_de_datos": "https://drive.google.com/thumbnail?id=1na4IJy6l1ZRlWUgOmDtCRV8uTKeyfGWN&sz=w400", "sub-cables_pc": "https://drive.google.com/thumbnail?id=1l5SY_jVrOcJjgtLnfZQtopBomsRsYX8k&sz=w400", "sub-cargadores_de_carro": "https://drive.google.com/thumbnail?id=1ET71StqwAtwt4PtiHqPsLBLiKhnQubMR&sz=w400", "sub-cargadores_de_pared": "https://drive.google.com/thumbnail?id=1x9jgcCguT2YbmaZ5uJ4J1vopDtecmZRX&sz=w400", "sub-cargadores_inalambricos": "https://drive.google.com/thumbnail?id=1PngFka4Z3Ip_-FFC9cyDqKqNGoz-JFy8&sz=w400", "sub-celulares_basicos": "https://drive.google.com/thumbnail?id=1cqqlZa9LqJs1iZCte4gjTKr9LUhvFDs4&sz=w400", "sub-conectividad": "https://drive.google.com/thumbnail?id=1_pIzT_8RYvmveEYUJysnCykooLG0osns&sz=w400", "sub-conectividad_pc": "https://drive.google.com/thumbnail?id=1VONdp8GenptkjI8bAvB9uFoJSeQ0ye56&sz=w400", "sub-correas_y_pulsos": "https://drive.google.com/thumbnail?id=13VSWDFmeQhip3c9p6xEfiSXKV8kkf26U&sz=w400", "sub-diademas": "https://drive.google.com/thumbnail?id=1AUWgHDGwqiCdM0RDVnD8XFWMDDp3RFxS&sz=w400", "sub-fundas_y_cases": "https://drive.google.com/thumbnail?id=1zt22I0TcMFP3rVLW17gnOBg2HlA9kcQ5&sz=w400", "sub-gafas_bluetooth": "https://drive.google.com/thumbnail?id=18_pWmmO-wBxIWxRIKQS98Kdf_6rBMYyE&sz=w400", "sub-hogar_y_gadgets": "https://drive.google.com/thumbnail?id=1vqD5Ue5K9FXwhLak0OZL0uoSPWaxe30m&sz=w400", "sub-holders_y_soportes": "https://drive.google.com/thumbnail?id=1mLw7uB5xLlJcM31cGgvZ013n0qxZSWaq&sz=w400", "sub-honor_huawei": "https://drive.google.com/thumbnail?id=1mxvOQ_icgKc4YTSVbwS2ctUVbcg5mOU_&sz=w400", "sub-hubs_y_otg": "https://drive.google.com/thumbnail?id=1bJ4UCnKsXSjJaBZThhfjWZLyvRXSvwJT&sz=w400", "sub-iphone_pantallas": "https://drive.google.com/thumbnail?id=1JADx4cbXu6SajWwjyb7Z-8zjqBbez_OH&sz=w400", "sub-llaveros": "https://drive.google.com/thumbnail?id=18_rThj8xuswPncX-dFtyKrpU7RdCnPR3&sz=w400", "sub-maletines_para_pc": "https://drive.google.com/thumbnail?id=1zVahDJEDJruCsl8P2rzNCxGGV3aqFjDf&sz=w400", "sub-microfonos": "https://drive.google.com/thumbnail?id=1iYOp18PTGSbRfIRw-2njIhqAkX_LahZb&sz=w400", "sub-motorola": "https://drive.google.com/thumbnail?id=1xF6rOrHGUoh7qxD9lPDsu6coYuhD2QIV&sz=w400", "sub-mouse": "https://drive.google.com/thumbnail?id=1-SaQ6T2obxFKZTXYDuUKqriX7D9gygQ6&sz=w400", "sub-pad_mouse": "https://drive.google.com/thumbnail?id=14Tv4aL8Ir-dp_Ptn2saQ28U3mBPlNqq1&sz=w400", "sub-parlantes": "https://drive.google.com/thumbnail?id=1JBO2uDjEu01NHzw-9_q6MlLD2uSTB8zJ&sz=w400", "sub-pop_sockets": "https://drive.google.com/thumbnail?id=1Ab_QbfU7CWF_7vVu66Zb6rhN1tTm_Fda&sz=w400", "sub-power_banks": "https://drive.google.com/thumbnail?id=157UsPloFedWfzcPpS1-Q9FqGIxIM-2bT&sz=w400", "sub-power_banks_inalambricos": "https://drive.google.com/thumbnail?id=1TlG73_BWH_C-JJYTgWSBDFUIMSWz8ju5&sz=w400", "sub-proteccion_de_pantalla": "https://drive.google.com/thumbnail?id=1e3q6V8TStpEInvbTF2hgRRjcJgu3b2Vk&sz=w400", "sub-receptores_bluetooth": "https://drive.google.com/thumbnail?id=1KKydq8XZ9wsDT0iK2B0a8fKae5KhVUUN&sz=w400", "sub-samsung": "https://drive.google.com/thumbnail?id=1s7NlULYWPUjXAzBUCsBIHbIR2Hx87f8X&sz=w400", "sub-smartwatch_infantil": "https://drive.google.com/thumbnail?id=1z1EGp61A8gD55CjxOy9UhIx3h4RAdDOs&sz=w400", "sub-soportes_para_celular": "https://drive.google.com/thumbnail?id=1KB_312rvnpf5kMyTTGj7lD-A0xwFQXL3&sz=w400", "sub-soportes_para_tv": "https://drive.google.com/thumbnail?id=143umxxtrVw4hHahBPFtnFbaqYHRJ_Yy2&sz=w400", "sub-teclados": "https://drive.google.com/thumbnail?id=1mRXeU66Lu-HtcpCc0KHKejFjBVr3cb3u&sz=w400", "sub-tecno_infinix": "https://drive.google.com/thumbnail?id=15ZGlckgvu7xZ3uLFzFa46d_ikfduIONs&sz=w400", "sub-tv_y_streaming": "https://drive.google.com/thumbnail?id=1JBMEtiCVVIDZN_GVqDA1mJaMFzXTxeUD&sz=w400", "sub-xiaomi": "https://drive.google.com/thumbnail?id=1RPxkf3WS5ZSSj1U5wPmTlQrgJsPoA9UA&sz=w400"};


  var CAT_META = {
    'Cargadores y cables':    { desc: 'Cubos, cables de datos, cargadores de carro y adaptadores de carga rápida.', color: '#0E93A5' },
    'Audífonos y parlantes':  { desc: 'Audífonos inalámbricos, diademas, parlantes Bluetooth y más.',              color: '#7C3AED' },
    'Accesorios':             { desc: 'Fundas, soportes, trípodes, iluminación y gadgets para el día a día.',       color: '#E97316' },
    'Pantallas':              { desc: 'Módulos SM, CM, INCELL, OLED y AMOLED para reparación técnica.',             color: '#DC2626' },
    'Computación':            { desc: 'Mouse, teclados, hubs USB, cables HDMI, micrófonos y periféricos.',          color: '#2563EB' },
    'Smartwatch':             { desc: 'Relojes inteligentes con monitor de salud, notificaciones y GPS.',            color: '#059669' },
    'Power bank y tomas':     { desc: 'Baterías portátiles, power banks inalámbricos y tomacorrientes.',             color: '#CA8A04' },
    'Baterías':               { desc: 'Baterías de reemplazo para iPhone, línea Mecánico e Ilummen.',                color: '#6D28D9' }
  };

  function slug(s) {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase().replace(/[\s\/]+/g, '_').replace(/[^a-z0-9_]/g, '');
  }

  function getProds() {
    return (window.EF && Array.isArray(window.EF.productos)) ? window.EF.productos
      : (Array.isArray(window.EF_PRODUCTOS) ? window.EF_PRODUCTOS : []);
  }

  function money(n) {
    return n != null ? '$' + Number(n).toLocaleString('es-CO') : '';
  }

  var currentCat = null, currentSub = null;

  function openCatPage(catName) {
    currentCat = catName;
    currentSub = null;
    var meta = CAT_META[catName] || { desc: '', color: '#0E93A5' };
    var prods = getProds();

    // Contar subcategorías
    var subs = {};
    prods.forEach(function (p) {
      if (p.categoria === catName) {
        var s = p.subcategoria || 'Otros';
        subs[s] = (subs[s] || 0) + 1;
      }
    });
    var total = 0;
    Object.keys(subs).forEach(function (k) { total += subs[k]; });
    var claves = Object.keys(subs).sort();

    // Banner path
    var catSlug = slug(catName);
    var bannerPath = DRIVE_IMGS['cat-' + catSlug] || 'assets/img/cat-' + catSlug + '.webp';

    // Subcategoría chips con fotos
    var subsHTML = '<button class="catpage-sub on" data-sub-val="">'
      + '<div class="catpage-sub-img" style="background:' + meta.color + '">'
      + '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>'
      + '</div><span>Todo</span><small>' + total + '</small></button>';

    claves.forEach(function (sub) {
      var subSlug = slug(sub);
      var subImg = DRIVE_IMGS['sub-' + subSlug] || 'assets/img/sub-' + subSlug + '.webp';
      subsHTML += '<button class="catpage-sub" data-sub-val="' + sub.replace(/"/g, '&quot;') + '">'
        + '<div class="catpage-sub-img"><img src="' + subImg + '" alt="' + sub + '" onerror="this.style.display=\'none\'"></div>'
        + '<span>' + sub + '</span><small>' + subs[sub] + '</small></button>';
    });

    // Construir HTML
    var cp = document.getElementById('catpage');
    if (!cp) return;

    cp.innerHTML = '<div class="catpage-hero" style="background:linear-gradient(135deg,rgba(27,33,38,.8),' + meta.color + '33),url(\'' + bannerPath + '\') center/cover no-repeat">'
      + '<div class="wrap"><button class="catpage-back" id="catpage-back">‹ Todas las categorías</button>'
      + '<h2>' + catName + '</h2><p>' + meta.desc + '</p></div></div>'
      + '<div class="wrap"><div class="catpage-subs" id="catpage-subs">' + subsHTML + '</div>'
      + '<div class="resultados-bar" style="margin:14px 0 8px"><span id="catpage-conteo">' + total + ' productos</span></div>'
      + '<div class="grid-catalogo" id="catpage-grid"></div></div>';

    cp.style.display = 'block';

    // Ocultar el resto de la página
    var tabs = document.querySelectorAll('.ef-tab');
    tabs.forEach(function (t) { t.style.display = 'none'; });
    var nav = document.getElementById('nav-pills');
    if (nav) nav.style.display = 'none';

    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderCatGrid();

    // Event listeners
    document.getElementById('catpage-back').addEventListener('click', closeCatPage);
    document.getElementById('catpage-subs').addEventListener('click', function (e) {
      var btn = e.target.closest('.catpage-sub');
      if (!btn) return;
      currentSub = btn.dataset.subVal || null;
      document.querySelectorAll('.catpage-sub').forEach(function (b) {
        b.classList.toggle('on', b.dataset.subVal === (currentSub || ''));
      });
      renderCatGrid();
    });
  }

  function closeCatPage() {
    var cp = document.getElementById('catpage');
    if (cp) { cp.style.display = 'none'; cp.innerHTML = ''; }
    currentCat = null;
    currentSub = null;
    // Restaurar tabs
    var tabs = document.querySelectorAll('.ef-tab');
    tabs.forEach(function (t) { t.style.display = ''; });
    var nav = document.getElementById('nav-pills');
    if (nav) nav.style.display = '';
    // Mostrar tab inicio
    if (typeof window.irAlCatalogo === 'function') {
      // No hacer nada, dejar que la nav natural funcione
    }
  }

  function renderCatGrid() {
    if (!currentCat) return;
    var prods = getProds().filter(function (p) {
      if (p.categoria !== currentCat) return false;
      if (currentSub && p.subcategoria !== currentSub) return false;
      return true;
    });

    var grid = document.getElementById('catpage-grid');
    var cnt = document.getElementById('catpage-conteo');
    if (cnt) cnt.textContent = prods.length + ' producto' + (prods.length !== 1 ? 's' : '');

    if (!grid) return;

    // Usar cardProducto de app.js si existe
    if (typeof window.cardProducto === 'function') {
      grid.innerHTML = prods.length
        ? prods.map(window.cardProducto).join('')
        : '<div class="vacio" style="grid-column:1/-1"><h3>Sin productos en esta subcategoría</h3></div>';
    } else {
      // Fallback
      grid.innerHTML = prods.map(function (p) {
        var img = p.imagen
          ? '<img src="' + p.imagen + '" alt="' + (p.nombre || '') + '" loading="lazy" style="width:100%;height:100%;object-fit:contain;padding:8px;background:#fff">'
          : '<div style="display:grid;place-items:center;height:100%;background:rgba(255,255,255,.04);aspect-ratio:1"><svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/></svg></div>';
        return '<div style="background:var(--c-surface,#1e2a30);border-radius:14px;overflow:hidden">'
          + '<div style="aspect-ratio:1;overflow:hidden;background:#1a2228">' + img + '</div>'
          + '<div style="padding:12px"><div style="font-weight:600;font-size:.88rem;line-height:1.3;margin-bottom:6px">' + (p.nombre || '') + '</div>'
          + '<div style="font-weight:700;color:var(--cian,#19C1D6)">' + money(p.precio) + '</div>'
          + '<div style="font-size:.75rem;color:rgba(255,255,255,.4);margin-top:4px">' + (p.subcategoria || '') + '</div>'
          + '</div></div>';
      }).join('');
    }
  }

  // Exponer cardProducto desde app.js
  // app.js define cardProducto como function, no como window.cardProducto
  // Hay que exponerla. Lo hacemos esperando a que app.js cargue.

  // Interceptar clicks en cards de categoría (homepage) Y chips del catálogo
  document.addEventListener('click', function (e) {
    // Cards del homepage (data-ir-cat)
    var btn = e.target.closest('[data-ir-cat]');
    if (btn) {
      var cat = btn.getAttribute('data-ir-cat');
      if (cat && CAT_META[cat]) {
        e.preventDefault();
        e.stopPropagation();
        openCatPage(cat);
        return;
      }
    }
    // Chips del catálogo (data-cat-chip) — excepto "Todo" que es vacío
    var chip = e.target.closest('[data-cat-chip]');
    if (chip) {
      var cat = chip.getAttribute('data-cat-chip');
      if (cat && CAT_META[cat]) {
        e.preventDefault();
        e.stopPropagation();
        openCatPage(cat);
        return;
      }
    }
  }, true);  // useCapture=true para interceptar ANTES que chips-cat.js

  // Exponer para que chips-cat.js pueda usarlo
  window.openCatPage = openCatPage;
  window.closeCatPage = closeCatPage;
})();
