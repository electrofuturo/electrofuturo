# Electrofuturo — electrofuturo.co

Catálogo mayorista en línea de pantallas, baterías, accesorios, computación y más.  
Desplegado en **Vercel** · Backend opcional en **Supabase**.

---

## Estructura del proyecto

```
electrofuturo/
├── index.html                  ← Página pública (catálogo + cotizador)
├── admin.html                  ← Portal administrativo (ERP)
├── cuenta.html                 ← Portal del cliente (seguimiento)
├── vercel.json                 ← Config de deploy Vercel
├── .gitignore
│
├── assets/
│   ├── css/
│   │   ├── estilos.css         ← Estilos principales del sitio
│   │   ├── chips-cat.css       ← Chips circulares de categoría
│   │   └── portales.css        ← Estilos de admin y cuenta
│   │
│   ├── js/
│   │   ├── config.js           ← WhatsApp, Supabase, URLs (ÚNICO archivo a editar)
│   │   ├── productos.js        ← Catálogo completo (624 refs, carga local)
│   │   ├── app.js              ← Motor del catálogo público
│   │   ├── chips-cat.js        ← Lógica de chips circulares de categoría
│   │   ├── datos.js            ← Marcas, cursos y datos estáticos
│   │   ├── extras.js           ← Carrito, modal, animaciones
│   │   ├── nube.js             ← Sync con Supabase (público)
│   │   ├── asistente-ia.js     ← Asistente IA del catálogo
│   │   ├── cuenta.js           ← Lógica de cuenta.html
│   │   ├── cobros-base.js      ← Base de cobros compartida
│   │   ├── admin-init.js       ← Inicialización del admin
│   │   ├── admin-cobros.js     ← Módulo de cobros del admin
│   │   ├── admin-nube.js       ← Sync con Supabase (admin)
│   │   └── admin-puente.js     ← Puente de datos admin
│   │
│   ├── data/
│   │   └── productos.json      ← Mismo catálogo en JSON (para Supabase)
│   │
│   └── img/
│       ├── marca/              ← Logos (logo-nav, logo-footer, logo-academy)
│       └── productos/          ← Fotos de productos (175 archivos .webp)
│
├── api/
│   └── asistente.js            ← Serverless function del asistente IA (Vercel)
│
└── supabase/
    ├── schema.sql              ← Esquema de la base de datos
    └── puente.sql              ← Funciones SQL del puente de datos
```

## Configuración rápida

1. Clona el repo
2. Edita `assets/js/config.js` con tu número de WhatsApp y credenciales de Supabase
3. Sube a Vercel con `vercel --prod` o conecta el repo en vercel.com

## Catálogo

- **624 referencias** en `assets/js/productos.js`
- Categorías: Pantallas, Baterías, Computación, Cargadores y cables, Audífonos y parlantes, Power bank y tomas, Smartwatch, Accesorios
- Prefijo SKU: `EF-`

## Contacto

- **WhatsApp:** 3134135751
- **Dirección:** Cra. 6 #18-49 Local 3, Edificio Belvedere, Ibagué
- **Web:** electrofuturo.co
