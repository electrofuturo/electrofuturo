/* ============================================================
   CHIPS CIRCULARES DE CATEGORÍA + SUBCATEGORÍAS DESPLEGABLES
   Conecta con el sistema de filtros de app.js (estado, pintarCatalogo, irAlCatalogo).
   ============================================================ */
(function () {
  'use strict';
  var prods = function () { return Array.isArray(window.EF_PRODUCTOS) ? window.EF_PRODUCTOS : (window.EF && EF.productos ? EF.productos : []); };

  /* --- Conteos --- */
  function contarPorCat() {
    var m = {};
    prods().forEach(function (p) {
      m[p.categoria] = (m[p.categoria] || 0) + 1;
    });
    return m;
  }
  function contarSubcats(cat) {
    var m = {};
    prods().forEach(function (p) {
      if (cat && p.categoria !== cat) return;
      m[p.subcategoria] = (m[p.subcategoria] || 0) + 1;
    });
    return m;
  }
  function llenarConteos() {
    var c = contarPorCat(), total = prods().length;
    var el = document.getElementById('cnt-todo');
    if (el) el.textContent = total;
    document.querySelectorAll('[data-cnt]').forEach(function (s) {
      var cat = s.dataset.cnt;
      s.textContent = c[cat] || 0;
    });
  }

  /* --- Subcategorías --- */
  var catActiva = '';
  var subActiva = '';

  function pintarSubcats(cat) {
    var cont = document.getElementById('ef-subcats');
    if (!cont) return;
    if (!cat) { cont.classList.remove('abierta'); cont.innerHTML = ''; subActiva = ''; return; }
    var subs = contarSubcats(cat);
    var claves = Object.keys(subs).sort(function (a, b) { return a.localeCompare(b, 'es'); });
    if (!claves.length) { cont.classList.remove('abierta'); cont.innerHTML = ''; return; }

    cont.innerHTML = claves.map(function (s) {
      var activa = s === subActiva ? ' ef-sub-chip--activa' : '';
      return '<button class="ef-sub-chip' + activa + '" data-sub-chip="' + s + '" type="button">'
        + s + '<span class="ef-sub-count">' + subs[s] + '</span></button>';
    }).join('');
    cont.classList.add('abierta');
  }

  /* --- Click en categoría --- */
  function clickCat(cat) {
    subActiva = '';
    if (cat === catActiva && cat !== '') {
      // Segundo clic en la misma: deselecciona
      catActiva = '';
    } else {
      catActiva = cat;
    }
    // Actualizar visual
    document.querySelectorAll('.ef-cat-chip').forEach(function (b) {
      var v = b.dataset.catChip;
      b.classList.toggle('ef-cat-chip--activa', v === catActiva);
    });
    pintarSubcats(catActiva);

    // Filtrar en el catálogo
    if (typeof window.irAlCatalogo === 'function') {
      if (catActiva) window.irAlCatalogo({ cat: catActiva });
      else window.irAlCatalogo({});
    } else if (window.estado) {
      window.estado.categorias = catActiva ? [catActiva] : [];
      window.estado.subcategorias = [];
      if (typeof window.pintarCatalogo === 'function') window.pintarCatalogo();
    }
  }

  /* --- Click en subcategoría --- */
  function clickSub(sub) {
    if (sub === subActiva) {
      subActiva = '';
    } else {
      subActiva = sub;
    }
    document.querySelectorAll('.ef-sub-chip').forEach(function (b) {
      b.classList.toggle('ef-sub-chip--activa', b.dataset.subChip === subActiva);
    });

    if (window.estado) {
      window.estado.subcategorias = subActiva ? [subActiva] : [];
      if (typeof window.pintarCatalogo === 'function') window.pintarCatalogo();
    }
  }

  /* --- Eventos --- */
  function init() {
    llenarConteos();
    var bar = document.getElementById('ef-cats-bar');
    if (bar) {
      bar.addEventListener('click', function (e) {
        var chip = e.target.closest('[data-cat-chip]');
        if (chip) { clickCat(chip.dataset.catChip); return; }
        var sub = e.target.closest('[data-sub-chip]');
        if (sub) clickSub(sub.dataset.subChip);
      });
    }

    /* Drag to scroll en desktop */
    var scroll = document.getElementById('ef-cats-scroll');
    if (scroll) {
      var down = false, startX, scrollL;
      scroll.addEventListener('mousedown', function (e) { down = true; startX = e.pageX - scroll.offsetLeft; scrollL = scroll.scrollLeft; scroll.style.cursor = 'grabbing'; });
      document.addEventListener('mouseup', function () { down = false; if (scroll) scroll.style.cursor = ''; });
      scroll.addEventListener('mousemove', function (e) { if (!down) return; e.preventDefault(); scroll.scrollLeft = scrollL - (e.pageX - scroll.offsetLeft - startX); });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else setTimeout(init, 50);
})();
