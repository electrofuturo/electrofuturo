/* ============================================================
   ELECTRO FUTURO — admin-init.js
   Se carga al final de admin.html.
   - Precrea 3 usuarios si no existen (Gerencia, Cajero, Asesor)
   - Carga los 624 productos de la tienda al inventario con stock=1
   - Agrega el perfil "asesor" al sistema
   - Reemplaza la pantalla de login con un diseño profesional
   ============================================================ */
(function () {
  'use strict';

  /* ---- 1. Agregar perfil "asesor" si no existe ---- */
  if (!PERFILES.asesor) {
    PERFILES.asesor = '💬 Asesor';
  }
  if (!MENU_PERFIL.asesor) {
    MENU_PERFIL.asesor = ['dashboard', 'pos', 'clientes', 'cobros', 'campanas', 'servicios', 'garantias'];
  }
  /* Permisos del asesor: puede vender y ver caja, pero no costos ni config */
  if (PERM.vender && !PERM.vender.includes('asesor')) PERM.vender.push('asesor');
  if (PERM.abrir_caja && !PERM.abrir_caja.includes('asesor')) PERM.abrir_caja.push('asesor');
  if (PERM.terceros && !PERM.terceros.includes('asesor')) PERM.terceros.push('asesor');

  /* ---- 2. Precreear usuarios si no existen ---- */
  function precreearUsuarios() {
    if (!S || !S.config) return;
    S.config.users = S.config.users || [];

    var defaults = [
      { nombre: 'Gerencia', perfil: 'gerencia', pin: 'G3r3nc1a' },
      { nombre: 'Cajero',   perfil: 'comercial', pin: 'C4j3r0' },
      { nombre: 'Asesor',   perfil: 'asesor',    pin: 'As3s0r' }
    ];

    var changed = false;
    defaults.forEach(function (d) {
      var existe = S.config.users.some(function (u) {
        return u.nombre.toLowerCase() === d.nombre.toLowerCase();
      });
      if (!existe) {
        S.config.users.push({
          id: uid('us'),
          nombre: d.nombre,
          perfil: d.perfil,
          pin: d.pin,
          creado: nowISO()
        });
        if (typeof addUnique === 'function') addUnique('responsables', d.nombre);
        changed = true;
      }
    });

    if (changed) {
      if (!S.config.user) { S.config.user = 'Gerencia'; S.config.role = 'Gerencia'; }
      save('config');
    }
  }

  /* ---- 3. Cargar 624 productos al inventario con stock=1 ---- */
  function cargarProductosAlInventario() {
    if (!S || !S.products) return;
    var web = window.EF_PRODUCTOS || [];
    if (!web.length) return;

    var codigos = {};
    S.products.forEach(function (p) { codigos[String(p.code || '').toUpperCase()] = true; });

    var CAT_MAP = {
      'Pantallas': 'Pantallas', 'Baterías': 'Baterías', 'Computación': 'Computación',
      'Cargadores y cables': 'Cargadores y cables', 'Audífonos y parlantes': 'Audífonos y parlantes',
      'Power bank y tomas': 'Power bank y tomas', 'Smartwatch': 'Smartwatch', 'Accesorios': 'Accesorios'
    };

    var marcas = new Set(S.config.marcas || []);
    var cats = new Set(S.config.categorias || []);
    var n = 0;

    web.forEach(function (w) {
      if (codigos[w.sku.toUpperCase()]) return;
      var cat = CAT_MAP[w.categoria] || w.categoria || 'General';
      S.products.push({
        id: uid('pr'),
        code: w.sku,
        name: w.nombre,
        category: cat,
        brand: w.marca || '',
        price: Number(w.precio) || 0,
        cost: 0,
        stock: 1,
        min: 0,
        sold: 0,
        img: false,
        createdAt: nowISO(),
        web: true,
        desc: [w.subcategoria, w.specs && w.specs['Compatibilidad']].filter(Boolean).join(' · ')
      });
      if (w.marca) marcas.add(w.marca);
      cats.add(cat);
      n++;
    });

    if (n) {
      S.config.marcas = Array.from(marcas);
      S.config.categorias = Array.from(cats);
      save('config', 'products');
    }
  }

  /* ---- 4. Login bonito (reemplaza loginScreen) ---- */
  var loginCSS = [
    '.ef-login-wrap{position:fixed;inset:0;z-index:99999;display:flex;font-family:Poppins,Inter,system-ui,sans-serif;color:#fff}',
    '.ef-login-left{flex:1;background:linear-gradient(145deg,#1B2126 0%,#0E3A42 40%,#0E93A5 100%);display:flex;flex-direction:column;justify-content:center;padding:60px 50px}',
    '.ef-login-left h1{font-size:clamp(28px,4vw,42px);font-weight:700;line-height:1.15;margin:0 0 18px}',
    '.ef-login-left p{font-size:15px;line-height:1.6;color:rgba(255,255,255,.75);max-width:440px;margin:0 0 30px}',
    '.ef-login-pills{display:flex;flex-wrap:wrap;gap:8px}',
    '.ef-login-pill{padding:8px 16px;border-radius:20px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);font-size:13px;font-weight:500;color:rgba(255,255,255,.85);backdrop-filter:blur(4px)}',
    '.ef-login-right{width:420px;background:#fff;display:flex;flex-direction:column;justify-content:center;padding:50px 40px;color:#1B2126}',
    '.ef-login-right h2{font-size:24px;font-weight:700;margin:0 0 6px}',
    '.ef-login-right .sub{font-size:14px;color:#7A8691;margin:0 0 28px}',
    '.ef-login-users{display:flex;flex-direction:column;gap:10px;margin:0 0 20px}',
    '.ef-login-user{display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:14px;border:1.5px solid #E3E8EB;background:#FAFBFC;cursor:pointer;transition:all .22s ease}',
    '.ef-login-user:hover{border-color:#19C1D6;background:rgba(25,193,214,.05);box-shadow:0 4px 16px rgba(14,147,165,.12);transform:translateY(-1px)}',
    '.ef-login-av{width:44px;height:44px;border-radius:12px;display:grid;place-items:center;font-size:18px;flex:none}',
    '.ef-login-av.ger{background:linear-gradient(135deg,#19C1D6,#0E93A5)}',
    '.ef-login-av.com{background:linear-gradient(135deg,#F59E0B,#D97706)}',
    '.ef-login-av.ase{background:linear-gradient(135deg,#8B5CF6,#6D28D9)}',
    '.ef-login-info{flex:1}',
    '.ef-login-info .name{font-weight:600;font-size:15px}',
    '.ef-login-info .role{font-size:12.5px;color:#7A8691}',
    '.ef-login-arrow{color:#B0B8C1;font-size:18px}',
    '.ef-login-foot{font-size:12px;color:#A8B3BC;text-align:center;margin-top:auto;padding-top:20px}',
    '.ef-login-foot b{color:#0E93A5}',
    '.ef-login-logo{width:48px;margin-bottom:30px;border-radius:12px}',
    '@media(max-width:860px){.ef-login-wrap{flex-direction:column}.ef-login-left{flex:none;padding:30px 24px 24px}.ef-login-left h1{font-size:22px;margin-bottom:10px}.ef-login-left p{font-size:13px;margin-bottom:16px}.ef-login-right{width:100%;flex:1;padding:28px 24px;border-radius:24px 24px 0 0;margin-top:-16px;box-shadow:0 -4px 24px rgba(0,0,0,.15)}}',
    /* PIN modal */
    '.ef-pin-overlay{position:fixed;inset:0;z-index:100000;background:rgba(27,33,38,.6);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);animation:efFadeIn .2s ease}',
    '.ef-pin-card{background:#fff;border-radius:20px;padding:32px 28px;width:340px;max-width:92vw;text-align:center;box-shadow:0 24px 50px rgba(0,0,0,.25);color:#1B2126}',
    '.ef-pin-card h3{font-size:18px;font-weight:700;margin:0 0 4px}',
    '.ef-pin-card .sub{font-size:13px;color:#7A8691;margin:0 0 20px}',
    '.ef-pin-card input{width:100%;padding:14px 16px;border:1.5px solid #E3E8EB;border-radius:12px;font-size:16px;text-align:center;letter-spacing:6px;font-family:Inter,monospace;outline:none;transition:border-color .2s}',
    '.ef-pin-card input:focus{border-color:#19C1D6}',
    '.ef-pin-card .btn-go{width:100%;margin-top:14px;padding:14px;border:none;border-radius:12px;background:linear-gradient(135deg,#19C1D6,#0E93A5);color:#fff;font:600 15px Poppins,sans-serif;cursor:pointer;transition:opacity .2s}',
    '.ef-pin-card .btn-go:hover{opacity:.9}',
    '.ef-pin-card .btn-back{margin-top:10px;background:none;border:none;color:#7A8691;font-size:13px;cursor:pointer}',
    '.ef-pin-card .err{color:#EF4444;font-size:13px;margin-top:8px;min-height:18px}',
    '@keyframes efFadeIn{from{opacity:0}to{opacity:1}}'
  ].join('\n');

  function inyectarCSS() {
    if (document.getElementById('ef-login-css')) return;
    var s = document.createElement('style');
    s.id = 'ef-login-css';
    s.textContent = loginCSS;
    document.head.appendChild(s);
  }

  var PERFIL_ESTILO = {
    gerencia: { cls: 'ger', ico: '👑' },
    comercial: { cls: 'com', ico: '🛒' },
    bodega: { cls: 'com', ico: '📦' },
    asesor: { cls: 'ase', ico: '💬' }
  };

  window._loginScreenOriginal = window.loginScreen;
  window.loginScreen = function () {
    inyectarCSS();
    var us = (S.config.users || []).filter(function (u) { return !u.inactivo; });

    if (!us.length) {
      /* Si no hay usuarios, usar la pantalla original para crear el primero */
      if (typeof _loginScreenOriginal === 'function') return _loginScreenOriginal();
      return;
    }

    var cards = us.map(function (u) {
      var est = PERFIL_ESTILO[u.perfil] || { cls: 'ger', ico: '🔑' };
      var rolNombre = PERFILES[u.perfil] ? PERFILES[u.perfil].slice(2) : u.perfil;
      return '<button class="ef-login-user" data-uid="' + u.id + '">' +
        '<div class="ef-login-av ' + est.cls + '">' + est.ico + '</div>' +
        '<div class="ef-login-info"><div class="name">' + esc(u.nombre) + '</div>' +
        '<div class="role">' + esc(rolNombre) + '</div></div>' +
        '<span class="ef-login-arrow">›</span></button>';
    }).join('');

    var wrap = document.createElement('div');
    wrap.className = 'ef-login-wrap';
    wrap.id = 'ef-login';
    wrap.innerHTML =
      '<div class="ef-login-left">' +
        '<img src="' + LOGO_B64 + '" class="ef-login-logo" alt="Logo">' +
        '<h1>Todo el negocio en un solo tablero</h1>' +
        '<p>Punto de venta, inventario de ' + (S.products ? S.products.length : 0) + ' productos, cartera, cobros, campañas WhatsApp y reportes para Electro Futuro.</p>' +
        '<div class="ef-login-pills">' +
          '<span class="ef-login-pill">Punto de venta</span>' +
          '<span class="ef-login-pill">Inventario</span>' +
          '<span class="ef-login-pill">Cobros</span>' +
          '<span class="ef-login-pill">Cartera</span>' +
          '<span class="ef-login-pill">Campañas</span>' +
        '</div>' +
      '</div>' +
      '<div class="ef-login-right">' +
        '<h2>Ingresa al portal</h2>' +
        '<div class="sub">Acceso exclusivo para el equipo de Electro Futuro.</div>' +
        '<div class="ef-login-users">' + cards + '</div>' +
        '<div class="ef-login-foot">Powered by <b>PubliFuturo</b> · Gestión</div>' +
      '</div>';

    /* Cerrar cualquier modal previo */
    var modals = document.getElementById('modals');
    if (modals) modals.innerHTML = '';
    var oldLogin = document.getElementById('ef-login');
    if (oldLogin) oldLogin.remove();

    document.body.appendChild(wrap);

    /* Eventos de click en cada usuario */
    wrap.querySelectorAll('.ef-login-user').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var uid2 = btn.dataset.uid;
        mostrarPIN(uid2);
      });
    });
  };

  function mostrarPIN(userId) {
    var u = S.config.users.find(function (x) { return x.id === userId; });
    if (!u) return;
    var est = PERFIL_ESTILO[u.perfil] || { cls: 'ger', ico: '🔑' };

    var overlay = document.createElement('div');
    overlay.className = 'ef-pin-overlay';
    overlay.innerHTML =
      '<div class="ef-pin-card">' +
        '<div class="ef-login-av ' + est.cls + '" style="margin:0 auto 14px;width:56px;height:56px;font-size:24px">' + est.ico + '</div>' +
        '<h3>' + esc(u.nombre) + '</h3>' +
        '<div class="sub">' + (PERFILES[u.perfil] ? PERFILES[u.perfil].slice(2) : '') + '</div>' +
        '<input type="password" id="ef-pin-input" placeholder="Contraseña" autocomplete="off">' +
        '<div class="err" id="ef-pin-err"></div>' +
        '<button class="btn-go" id="ef-pin-go">Ingresar</button>' +
        '<button class="btn-back" id="ef-pin-back">← Cambiar usuario</button>' +
      '</div>';

    document.body.appendChild(overlay);
    var inp = document.getElementById('ef-pin-input');
    setTimeout(function () { inp.focus(); }, 100);

    document.getElementById('ef-pin-go').addEventListener('click', function () { intentarLogin(u, inp, overlay); });
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') intentarLogin(u, inp, overlay); });
    document.getElementById('ef-pin-back').addEventListener('click', function () { overlay.remove(); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });
  }

  function intentarLogin(u, inp, overlay) {
    var val = inp.value;
    if (val !== u.pin) {
      document.getElementById('ef-pin-err').textContent = 'Contraseña incorrecta';
      inp.value = '';
      inp.focus();
      return;
    }
    SESSION = { userId: u.id };
    localStorage.setItem('ef_session', JSON.stringify(SESSION));
    S.config.user = u.nombre;
    S.config.role = PERFILES[u.perfil] ? PERFILES[u.perfil].slice(2) : u.perfil;
    save('config');
    if (typeof audit === 'function') audit('LOGIN', 'Ingreso al sistema');
    overlay.remove();
    var loginWrap = document.getElementById('ef-login');
    if (loginWrap) loginWrap.remove();
    if (typeof closeModal === 'function') closeModal();
    route = 'dashboard';
    if (typeof render === 'function') render();
  }

  /* ---- 5. Interceptar el logout para mostrar nuestro login ---- */
  var _logoutOriginal = window.logout;
  window.logout = function () {
    if (typeof audit === 'function') audit('LOGOUT', 'Salida');
    SESSION = null;
    localStorage.removeItem('ef_session');
    if (typeof render === 'function') render();
    loginScreen();
  };

  /* ---- 6. Ejecutar todo al cargar ---- */
  function init() {
    precreearUsuarios();
    cargarProductosAlInventario();
  }

  /* Esperar a que initStore haya corrido */
  var waitInterval = setInterval(function () {
    if (window.S && S.config) {
      clearInterval(waitInterval);
      init();
    }
  }, 100);

})();
