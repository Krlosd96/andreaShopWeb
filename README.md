# 🌸 Andrea Shop — Boceto de tienda virtual (+18)

Web boceto para la tienda de artículos para adultos de Caracas.
Tono cercano y discreto · Optimizada para móvil · Pedidos por WhatsApp.

## Estado del proyecto

- [x] **Fase 1 — Estructura y diseño**
- [x] **Fase 2 — Catálogo y búsqueda** (`js/productos.js`)
- [x] **Fase 3 — Carrito y pedido por WhatsApp** (`localStorage` + `wa.me`)

## Estructura

```
andreaShopWeb/
├── index.html                 ← esqueleto (vistas Inicio y Catálogo + Contacto fijo al final)
├── css/estilos.css            ← diseño: paleta rosa/blanco/dorado, móvil primero
├── js/config.js               ← ⚠️ DATOS DE LA TIENDA (teléfono, dirección, horarios)
├── js/productos.js            ← CATÁLOGO que lee la web (62 productos + resúmenes)
├── js/main.js                 ← interacciones (modal +18, menú, vistas, catálogo, carrito)
├── productos.json             ← fuente original del PDF (referencia; la web NO lo lee)
├── imagenes/                  ← logo + fotos de producto en WebP (9 de referencia)
├── APRENDIZAJE.md             ← teoría y conceptos (tutor)
└── Modificaciones_del_proyecto.md ← registro de decisiones y porqués
```

## Antes de mostrar: cambia los datos de ejemplo

Abre `js/config.js` y reemplaza:

1. `whatsapp` → número real, formato internacional sin `+` (Venezuela: `58...`)
2. `instagram` → usuario real, sin `@`
3. `direccion` → dirección real (el enlace de Google Maps se arma solo)
4. `horario` / `horarioCorto` → horario real de atención

## Fotos de producto

Estándar acordado: **WebP cuadradas de 600×600 px**, calidad 82, 30–60 KB, recortadas a 1:1 antes de exportar (trabaja desde un original de ≥1200 px). Guárdalas en `imagenes/productos/` como `<id>-1.webp`, `<id>-2.webp`, `<id>-3.webp`.

En `js/productos.js`: `imagen` es la foto principal y `imagenes: [...]` son las extra del carrusel (3 por producto está bien, mínimo 1). Si no pones `imagenes`, la tarjeta muestra una sola foto sin flechas. Sin auto-avance: lo decide la clienta con las flechas.

## Cómo probar

**Opción 1 (rápida):** doble clic en `index.html`.

**Opción 2 (recomendada para desarrollo):** instala VS Code + la extensión
**Live Server** → clic derecho en `index.html` → "Open with Live Server".
Abre automáticamente en el navegador y recarga al guardar cambios.

**Pruebas clave:**

- Ventana +18 al entrar (para volver a verla: F12 → Application → Local Storage →
  borrar la clave `andreaShop.edad`, o abrir en modo incógnito)
- Menú hamburguesa en móvil (F12 → Ctrl+Shift+M) **y también en escritorio**: abre el mismo cajón
- Al elegir **Inicio** o **Catálogo** se dibuja solo esa vista. Contacto y dirección
  siempre aparece al final de ambas, debajo del botón "Cargar más" en el catálogo
- Botón "Filtros" en ambos tamaños (los chips salen en su propia línea al abrirlo)
- Buscar desde Inicio: al escribir aparecen sugerencias; solo con **Enter** o el
  botón **Buscar** se abre el catálogo con los resultados
- Buscar dentro del catálogo filtra en vivo; "lenceria" sin acento también
  encuentra "Lencería"; combinar con un chip filtra ambos a la vez
- Catálogo: 12 tarjetas por tanda (4 filas de 3) y botón "Cargar más" hasta 62
- 3 columnas en escritorio y 2 en móvil, con 28px de separación
- 9 tarjetas con foto WebP cuadrada (600×600); las demás muestran un hueco discreto
- En "Vibrador Rosa Succionadora" y "Dados Posiciones": flechas ‹ ›, puntitos y
  contador `1/3` para pasar las fotos. Al filtrar o cargar más siguen funcionando
- Tallas S / M / L / XL seleccionables solo en lencería: hay que elegir una
  antes de agregar; M y L se cuentan como líneas distintas
- Botón 🛒 abajo a la izquierda: abre el cajón del carrito (WhatsApp queda a la derecha)
- En cada tarjeta: **Agregar** al carrito y **Consultar** por WhatsApp
- En el carrito: + y − para cantidades, ✕ para quitar, total, **Enviar pedido**
  (abre WhatsApp con el detalle) y **Vaciar carrito**
- El carrito se guarda en `localStorage` (`andreaShop.carrito`) y sobrevive al recargar
- Para empezar de cero: F12 → Application → Local Storage → borrar `andreaShop.carrito`
- Botón flotante de WhatsApp y enlace "Consultar" apuntan al número de ejemplo
  hasta que cambies `config.js`

## Cómo publicar gratis (cuando esté lista)

1. **Netlify Drop** (lo más simple, sin cuenta de GitHub): entra a
   `https://app.netlify.com/drop`, arrastra la carpeta del proyecto y te da
   una URL pública al instante. Gratis para sitios estáticos.
2. **GitHub Pages** (recomendada a largo plazo): crea una cuenta en GitHub,
   un repositorio, sube los archivos, y activa Pages en Settings → Pages.
   Sirve gratis desde el repositorio y te da un historial de cambios (control
   de versiones).

> Consejo: publica cuando termines la Fase 3 (con carrito). Así la primera
> impresión de tu prima es la tienda completa funcionando.
