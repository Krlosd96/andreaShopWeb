# 🛠️ Modificaciones del proyecto — Andrea Shop

> Registro de decisiones donde me alejé de la letra de lo pedido (o completé algo que quedó abierto) **para mejorar la eficiencia o el acabado profesional**, tal como acordamos. Cada entrada dice: qué se hizo, el motivo, y en qué te beneficia.

---

## Fase 1 — Estructura y diseño

### M1. Una sola página con secciones (en vez de varias páginas HTML)
- **Qué:** todo vive en `index.html` como secciones (`#inicio`, `#catalogo`, `#contacto`). El menú y el logo apuntan a esas secciones, no a archivos separados.
- **Motivo:** con páginas separadas (`catalogo.html`, `contacto.html`) tendríamos que duplicar franja, menú y modal +18 en cada archivo. Peor aún: en la Fase 3 el carrito se perdería (o habría trucos) al saltar entre páginas.
- **Cómo te beneficia:** menos código repetido que mantener, navegación instantánea (clave en 3G), y el carrito de la Fase 3 funcionará sin dolor. Para una tienda de este tamaño es la elección estándar.

### M2. Logo optimizado (copia de 256 px)
- **Qué:** el original (`logoTienda.jpeg`) pesa 82.3 KB y mide 1280×1280 px, pero en pantalla se muestra a ~40 px. Creé `imagenes/logoTienda-chica.jpeg` (256 px, 14.5 KB, misma calidad a ese tamaño) y la web usa esa. **El original queda intacto** para futuros usos (portada, impresión).
- **Motivo:** enviar 82 KB para mostrar 40 px es gastar los datos del usuario (y la paciencia) sin ganancia visual.
- **Cómo te beneficia:** primera carga ~82% más ligera solo en el logo. Es exactamente la disciplina que pediste de "imágenes ligeras", aplicada desde ya.

### M3. Tipografía "Nunito" (Google Fonts) con respaldo del sistema
- **Qué:** la fuente redondeada Nunito desde Google Fonts, con `display=swap` y respaldo `Segoe UI/system-ui`.
- **Motivo:** la redondez transmite el tono cercano y suave de la marca; las fuentes del sistema (Arial, etc.) se ven frías. `preconnect` + `swap` evitan bloquear el renderizado, y si no hay internet, cae al respaldo sin romperse.
- **Cómo te beneficia:** identidad de marca real a costo de ~1 petición externa. Si prefieres quitarla: borra las 3 líneas de `<link>` en `index.html` y listo.

### M4. Zona superior "pegajosa" (sticky)
- **Qué:** franja del logo + barra de búsqueda quedan fijas arriba mientras se hace scroll.
- **Motivo:** en una tienda, que la búsqueda esté siempre a un toque de distancia es dinero: el usuario que decide buscar a mitad del catálogo no tiene que subir hasta arriba.
- **Cómo te beneficia:** más pedidos/consultas. Si te estorba (querés más pantalla limpia en móvil), se quita borrando `position: sticky` en `.zona-superior` — dejé el instructivo como comentario en el CSS.

### M5. Verificación de edad recordada (localStorage)
- **Qué:** al aceptar el +18, se recuerda en el dispositivo y no vuelve a preguntar en futuras visitas.
- **Motivo:** es una tienda con clientes que vuelven; preguntar en cada visita molesta y hace ver el sitio como un trámite. Es el estándar en retail +18.
- **Cómo te beneficia:** clientes recurrentes entran directo al catálogo. Para pruebas, se resetea en DevTools → Application → Local Storage (explicado en `APRENDIZAJE.md` §9).

### M6. Botón "No, todavía no" muestra mensaje amable (no redirige)
- **Qué:** ante un menor, en vez de mandarlo a otra web, la ventana muestra un cierre cordial.
- **Motivo:** redirigir a google.com es lo típico, pero se siente brusco y poco discreto. El mensaje mantiene el tono cercano de la marca y el sitio queda igualmente bloqueado.
- **Cómo te beneficia:** coherencia con el tono "cercano y discreto". Si prefieres la redirección, es un cambio de 2 líneas en `main.js`.

### M7. Íconos SVG integrados en el HTML (sin librerías)
- **Qué:** los íconos de WhatsApp, Instagram, lupa, hamburguesa y cerrar están escritos como SVG (gráficos vectoriales en texto) dentro del propio HTML.
- **Motivo:** una librería como Font Awesome añade archivos externos y peticiones extra para usar 5 íconos. El SVG integrado pesa bytes, se colorea con CSS (`currentColor`), se ve nítido en cualquier pantalla y funciona sin internet.
- **Cómo te beneficia:** cero dependencias, cero peticiones extra, nitidez perfecta. (Los emojis en tarjetas de información son la opción ligera y amigable para decoración puntual.)

### M8. Enlace de Google Maps automático
- **Qué:** en `config.js` el campo `enlaceMaps` puede quedar vacío; la web arma sola el enlace de búsqueda a partir de la `direccion`.
- **Motivo:** pediste que la dirección sea "texto libre y fácil de cambiar". Si cada cambio de dirección obligara a editar también la URL de Maps, sería un paso que se puede olvidar (y quedaría la ubicación vieja).
- **Cómo te beneficia:** cambias la dirección en un solo campo y Maps sigue funcionando. Si tu prima tiene un pin exacto de Google Maps, se pega en `enlaceMaps` y ese manda.

### M9. Botón flotante de WhatsApp con texto en escritorio
- **Qué:** en móvil es solo el círculo verde (no tapa contenido); en escritorio se expande con "¿Dudas? Escríbenos".
- **Motivo:** en pantallas grandes sobra espacio y el texto explícito invita más a escribir que un ícono anónimo.
- **Cómo te beneficia:** más conversaciones iniciadas = más pedidos, sin sacrificar espacio en móvil.

### M10. Tarjetas de producto y chips de filtro "de mentira" (marcados como BOCETO)
- **Qué:** el catálogo muestra 3 tarjetas de ejemplo y los filtros muestran 5 categorías de ejemplo, escritos a mano en el HTML.
- **Motivo:** pediste revisar la Fase 1 (estructura y diseño). Sin tarjetas visibles, no habría nada del catálogo que opinar.
- **Cómo te beneficia:** puedes aprobar o ajustar el diseño ahora, con la garantía de que la Fase 2 los reemplazará por contenido real generado desde `js/productos.js` (están marcados con comentarios para no olvidarlo).

### M11. Scripts clásicos con `defer` (en vez de módulos ES)
- **Qué:** usamos `<script src="..." defer>` en lugar de `type="module"`.
- **Motivo:** los módulos ES exigen que la página se sirva desde un servidor web; con doble clic en `index.html` (protocolo `file://`) dejan de funcionar. Quería que puedas probar el boceto sin montar nada.
- **Cómo te beneficia:** puedes revisar el proyecto con solo abrir el archivo. Cuando publiquemos la web, funciona igual en ambos modos.

### M12. Prefijo en las claves de localStorage (`andreaShop.`)
- **Qué:** la clave de edad es `andreaShop.edad` (y el carrito será `andreaShop.carrito`).
- **Motivo:** localStorage es memoria por dominio — no choca con otras webs, pero sí convive con TODAS las claves de nuestro propio proyecto. El prefijo ordena y evita colisiones con claves futuras nuestras.
- **Cómo te beneficia:** al depurar en DevTools verás tus claves agrupadas y reconocibles, y nunca pisaremos datos entre funciones por error.

### M13. Sidebar visible en escritorio (corrección del menú que desaparecía)
- **Qué:** en `@media (min-width: 900px)`, `.sidebar` pasó de `position: static` a `position: sticky` con `top: calc(var(--alto-superior) + 16px)`. Además su `z-index` bajó de 46 a 1.
- **Motivo:** con `static` el menú formaba parte del flujo normal y se iba hacia arriba al hacer scroll. El `z-index: 46` heredado del modo móvil —correcto ahí, porque el cajón debe tapar el overlay (45)— seguía activo en escritorio: como `.sidebar` es grid item, en Grid el `z-index` aplica aunque sea `static`, y el panel blanco se dibujaba encima de la franja y el buscador (`z-index: 40`).
- **Cómo te beneficia:** el menú permanece visible al recorrer la tienda y deja de tapar la búsqueda; la cabecera vuelve a recibir clics. El cajón móvil conserva su `z-index: 46` porque el cambio solo se aplica en escritorio.

### M14. Alineación de la sidebar con el borde izquierdo
- **Qué:** en `@media (min-width: 900px)`, quitar el centrado de `.layout` (`max-width: none` y `margin: 0`), usar `padding: 28px 24px 110px` —el mismo `24px` de `.cabecera` y `.buscador`— y limitar `main` a `max-width: 1100px`.
- **Motivo:** `max-width: 1180px` + `margin: 0 auto` centraban las dos columnas completas, así que en una pantalla de 1920 px la sidebar empezaba a ~398 px del borde mientras el logo lo hacía a 24 px. Dos contenedores con referencias de alineación distintas producían el efecto de menú "despegado".
- **Cómo te beneficia:** logo y menú comparten una sola línea vertical; el contenido mantiene una anchura cómoda de lectura en monitores grandes en vez de estirarse.
- **Estado:** guardado y verificado en `css/estilos.css` el 19/11.

---

## Fase 2 — Catálogo y búsqueda

### M15. El catálogo se sirve desde `js/productos.js`, no desde `productos.json`
- **Qué:** convertimos los 62 productos en una variable global `PRODUCTOS` dentro de `js/productos.js`, cargada con `defer` entre `config.js` y `main.js`. `productos.json` se conserva como fuente original del PDF, pero la web ya no lo lee.
- **Motivo:** `fetch()` de un JSON no funciona abriendo el HTML con doble clic (`file://`): el navegador lo bloquea por seguridad. Un script clásico sí comparte variables con los demás scripts y mantiene la regla de "sin servidor".
- **Cómo te beneficia:** la web sigue abriéndose con doble clic y funciona también en Live Server o al publicarla. El JSON queda como respaldo de la información extraída.

### M16. Campo `resumen` discreto en lugar de publicar las descripciones del PDF
- **Qué:** cada producto tiene un `resumen` de una o dos frases neutras (material, tamaño, presentación, "consultar tallas y colores"). La `descripcion` original queda solo en `productos.json`.
- **Motivo:** los textos del PDF son enciclopédicos, explícitos y están repetidos palabra por palabra en varios productos (los 3 kits, las 4 lencerías, los 2 dados). Publicarlos chocaría con la regla de contenido discreto y daría tarjetas iguales.
- **Cómo te beneficia:** tarjetas legibles en móvil, tono cuidado y sin textos explícitos. Los nombres de producto se conservan tal cual para que la clienta pueda pedirlos por WhatsApp.

### M17. Imágenes pendientes con hueco decorativo
- **Qué:** el campo `imagen` de los 62 productos está vacío. Mientras tanto, cada tarjeta muestra un recuadro rosa con un ícono. El código ya genera `<img loading="lazy" width="500" height="500">` en cuanto `imagen` tenga una ruta.
- **Motivo:** las rutas del JSON (`assets/img/productos/*.jpg`) son marcadores y la carpeta no existe; mostrarlas daría 62 imágenes rotas y además son JPG, no WebP.
- **Cómo te beneficia:** el catálogo se ve terminado hoy y mañana basta con guardar las fotos en `imagenes/productos/<id>.webp` y completar el campo `imagen`, sin tocar el CSS ni el HTML.

### M18. Tallas de lencería listas para bloquear por stock
- **Qué:** los 6 productos de la categoría "Lencería" incluyen `tallas: ["S", "M", "L", "XL"]` como botones radio. El código ya entiende un campo futuro `tallasAgotadas` y deshabilita esas opciones con `disabled` y un tachado. Hoy ese campo no existe, así que las 4 tallas están disponibles.
- **Motivo:** pediste las tallas como opciones seleccionables, sin definir disponibilidad hasta tener la información real. Preparar solo el mecanismo evita rehacer las tarjetas después.
- **Cómo te beneficia:** cuando me pases el stock, se agrega una línea por producto (por ejemplo `tallasAgotadas: ["M"]`) y la web las marca como agotadas sola. Las demás categorías no muestran este control.

### M19. "Consultar" por WhatsApp en vez de "Agregar", y contador de resultados
- **Qué:** cada tarjeta tiene un enlace "Consultar" que abre WhatsApp con el nombre del producto en el mensaje. También se muestra "Mostrando X de 62 productos" y un aviso cuando la búsqueda no da resultados. Se eliminaron los botones "Agregar" del boceto.
- **Motivo:** el carrito pertenece a la Fase 3; dejar botones "Agregar" que no hacen nada sería engañoso. "Consultar" es una acción de contacto con la información que ya existe en `config.js`, y el contador evita que una búsqueda sin resultados parezca una web rota.
- **Cómo te beneficia:** desde hoy se puede preguntar por un producto concreto con un clic; en la Fase 3 este enlace se reemplaza por "Agregar al carrito" sin tocar el resto de la tarjeta.
- **Nota:** si prefieres que en esta fase no haya ningún botón en las tarjetas, se quita en una línea y no afecta a búsqueda ni filtros.

### M20. Moneda y categorías
- **Qué:** todos los precios se muestran solo con el signo `$` (por ejemplo `$2.50`, `Desde $7`). Los chips se generan desde las 12 categorías del JSON; se eliminaron "Juguetes", "Lubricantes" y "Velas y aceites" del boceto.
- **Motivo:** pediste el signo sin letras para evitar confusión con la moneda local, y las categorías del boceto no coincidían con los datos reales ("Velas y aceites" no existe en el catálogo).
- **Cómo te beneficia:** filtros y precios siempre congruentes con `js/productos.js`; agregar una categoría nueva al archivo crea su chip automáticamente.

---

## Ajustes posteriores a la revisión de la Fase 2

### M21. Un solo menú hamburguesa, también en escritorio
- **Qué:** se eliminaron del bloque `@media (min-width: 2000px)` las reglas que ocultaban la hamburguesa y el overlay y convertían `.sidebar` en columna `sticky`. `.layout` pasó de grid de dos columnas a una sola columna centrada. `--alto-superior` bajó de 240px a 150px y los filtros siguen detrás del botón "Filtros" en cualquier ancho.
- **Motivo:** con 13 chips generados, la franja de filtros creció y el menú sticky volvió a solaparse parcialmente. Mantener dos comportamientos de menú (cajón en móvil, columna pegajosa en escritorio) duplicaba estados y reglas de `z-index` que se rompían al cambiar alturas. Además pediste una interfaz más limpia.
- **Cómo te beneficia:** un solo patrón que revisar: la hamburguesa abre el mismo cajón en móvil y PC, con overlay y botón de cerrar. Desaparece el riesgo de que el menú se despegue, se pierda con el scroll o tape la cabecera. La franja queda más baja porque los chips no se despliegan de entrada.
- **Nota:** se respetó el breakpoint de 2000px que ya estaba en el CSS. Los ajustes visuales de escritorio (promos, logo grande, WhatsApp con texto) siguen aplicando desde ese ancho.

### M22. Fotos de referencia convertidas a WebP
- **Qué:** de las 13 imágenes que agregaste en `imagenes/productos/`, 9 tienen nombre coincidente con un producto y se convirtieron a WebP de 600 px (calidad 82, entre 9 y 53 KB) con el nombre `<id>.webp`. Las 4 restantes se dejaron sin usar: dos son vistas extra de "Dados Posiciones" y dos son colores alternos de la succionadora.
- **Motivo:** querías usar esas fotos de referencia mientras llegan las definitivas, y las reglas del proyecto piden WebP ligero con carga diferida. La conversión se hizo con el navegador que ya tenemos en la máquina, sin instalar librerías ni agregar dependencias al proyecto.
- **Cómo te beneficia:** 9 tarjetas muestran foto real y las otras 53 conservan el hueco discreto, sin imágenes rotas. Cuando lleguen las fotos definitivas basta con reemplazar el WebP del mismo nombre; no hay que tocar HTML, CSS ni JS.

---

## Rediseño de la navegación y el catálogo

### M23. Inicio y Catálogo son vistas; Contacto siempre al final
- **Qué:** `#inicio` y `#catalogo` ahora son vistas con el atributo `hidden`. `mostrarVista()` muestra solo la elegida y el hash (`#inicio` / `#catalogo`) decide cuál se dibuja, también al recargar o usar el botón "atrás". `#contacto` quedó **fuera** de las dos vistas: siempre aparece debajo del contenido. El menú resalta la vista activa; "Contacto y dirección" sigue en el menú como ancla que baja hasta esa sección.
- **Motivo:** pediste que al seleccionar Inicio o Catálogo se dibuje solo esa opción, en vez de una página larga donde ambas se encadenan. Con la franja `sticky`, además, los anclas largos quedaban tapados y la página se sentía "infinita".
- **Cómo te beneficia:** la navegación se siente de app (una pantalla limpia por elección), pero sin dejar de ser un HTML estático. Contacto nunca se pierde y los enlaces con `#catalogo` son compartibles.
- **Nota:** el menú hamburguesa no cambió: sigue siendo cajón en móvil y escritorio (M21).

### M24. Buscador con sugerencias y envío explícito
- **Qué:** el input ahora vive en `<form id="formBuscar">` con un botón "Buscar". Fuera del catálogo, `actualizarSugerencias()` llena un `<datalist>` nativo con hasta 6 nombres que coinciden; escribir **no** cambia de vista. Al enviar (Enter o botón) se abre `#catalogo` con el filtro aplicado. Dentro del catálogo el filtro sigue siendo instantáneo, como antes. El chip de categoría también lleva al catálogo si se toca desde Inicio.
- **Motivo:** pediste sugerencias en texto fuera de Catálogo y que solo el envío final redirija; dentro de Catálogo debía conservarse el filtrado actual. Elegimos `<datalist>` porque es la lista desplegable del propio navegador: accesible, sin dependencias y con poquísimo código (la alternativa era un panel propio con más JS/CSS).
- **Cómo te beneficia:** no hay saltos de vista mientras escribes, y los nombres largos se pueden elegir con un clic. El botón "Buscar" hace visible el paso final que antes solo existía al presionar Enter.
- **Ajuste medido:** la franja pasó de 124px a 132.6px al agregar el botón, así que `--alto-superior` subió a **134px** para seguir calibrando los anclas. En 2000px+ se mantuvo 150px (la franja mide 152.6px).

### M25. Catálogo por tandas y tarjetas más grandes
- **Qué:** el catálogo dibuja 12 tarjetas (4 filas de 3) y muestra un botón **"Cargar más"** que suma otra tanda de 12; el botón desaparece al llegar a 62. La parrilla tiene 2 columnas en móvil y 3 desde 700px, con `gap: 28px` (antes 14px). `main` pasó de `max-width: 680px` a `1100px` desde 700px, así que las tarjetas miden ~165px en móvil, ~337px a 1440px y ~359px a 2200px. El botón va dentro de la vista Catálogo, por lo que Contacto queda justo debajo en ambas vistas.
- **Motivo:** pediste que no fuera una página infinita, que hubiera un botón "Cargar más", 3 tarjetas por línea con el doble de separación y mejor uso del espacio. Te pregunté por el móvil y elegiste 2 columnas ahí (a 390px, 3 columnas dejaban tarjetas de ~100px y las tallas se amontonaban).
- **Cómo te beneficia:** la primera carga muestra menos contenido y el botón hace explícito cuánto queda. En escritorio se aprovecha el ancho en vez de dejar grandes márgenes; en móvil las tarjetas siguen siendo legibles.
- **Notas:** (1) interpretamos "un botón que **no** indique cargar más" como error de tipeo, porque más adelante pediste que Contacto estuviera debajo del botón "cargar más"; el botón dice exactamente **"Cargar más"**. (2) En móvil, una tanda de 12 son 6 filas de 2; se mantuvo 12 para que la paginación sea igual en todos los anchos (cambiar a 8 sería una línea). (3) Se agregó un breakpoint nuevo de 700px además del de 2000px que ya existía.

### M26. Estándar de imágenes del catálogo
- **Qué:** fijamos **WebP con pérdida calidad 82, cuadradas 600×600 px, recortadas a 1:1 antes de exportar y 30–60 KB por foto**. La tarjeta mide 165px en móvil, ~337px a 1440px y ~359px a 2200px: 600px cubre móvil incluso a 3x y escritorio normal sin desperdiciar píxeles. Original de trabajo ≥1200px. No usamos AVIF ni `<picture>`: WebP directo basta en navegadores actuales y con doble clic.
- **Motivo:** pediste un tamaño y formato recomendables. Revisando lo que ya teníamos, las 9 WebP pesaban poco (9–53 KB, promedio 27 KB), pero **dos no eran cuadradas**: `dados-posiciones.webp` era 600×574 y `vibrador-microfono.webp` 402×600, y el CSS las recortaba con `object-fit: cover`. El problema real era el encuadre, no el peso.
- **Cómo te beneficia:** regla única para cuando lleguen las fotos definitivas (misma medida, mismo nombre, mismo peso) y menos riesgo de que un producto salga cortado. El hueco ya está reservado con `aspect-ratio: 1/1` y `width`/`height`, así que no hay saltos al cargar.
- **Nota:** no se sobreescribieron los WebP anteriores; los dos que quedaron sin usar se dejaron intactos a la espera de tu autorización para borrarlos.

### M27. Carrusel de fotos en las tarjetas
- **Qué:** agregamos el campo opcional `imagenes: [...]` en `productos.js` (foto principal sigue en `imagen`). `htmlImagen()` dibuja flechas, puntitos y contador `1/3` **solo si hay 2 o más fotos**; si hay una, se ve como antes. Un único escuchador en `#parrillaProductos` cambia la `src` del `<img>` con `closest()` y `%`, así que sobrevive a los redibujos de la búsqueda y de "Cargar más".
- **Motivo:** pediste varias fotos por producto con auto-avance o flechas; elegiste **flechas + puntitos sin auto-avance** y **3 fotos por producto** como estándar. Con 12 tarjetas en pantalla, girar solas distrae y la foto puede cambiar justo cuando alguien va a tocar "Consultar".
- **Cómo te beneficia:** el carrusel es controlable y accesible (`aria-label` en cada flecha), y como solo existe **un `<img>` por tarjeta**, las fotos 2 y 3 no se descargan hasta que se pulsa una flecha: el catálogo no se vuelve más pesado.
- **Material usado:** convertimos 6 JPG de referencia que ya estaban en la carpeta a WebP 600×600 cuadrado (14–29 KB): 3 encuadres de `dados-posiciones` y 3 colores de `vibrador-rosa-succionadora`. Son los dos primeros productos con carrusel; los demás se completarán con fotos reales. Generamos los WebP con el lienzo de Chrome porque no hay `cwebp` ni ImageMagick instalado.

### M28. Cajón del carrito y botón flotante izquierdo
- **Qué:** `#carrito` es un cajón derecho con lista de productos, total, "Enviar pedido por WhatsApp" y "Vaciar carrito". Se abre con un botón 🛒 flotante **abajo a la izquierda** (el WhatsApp sigue abajo a la derecha) o desde una entrada nueva en el menú. Comparte `#overlay` con el menú: abrir uno cierra el otro y `Escape` cierra ambos.
- **Motivo:** te pregunté cómo prefieres ver el carrito y elegiste cajón lateral con botón flotante. Poner el botón a la izquierda evita que tape el WhatsApp; reutilizar el overlay evita un segundo fondo oscuro y más CSS.
- **Cómo te beneficia:** el carrito está siempre a mano sin salir de la vista Inicio o Catálogo, y Contacto sigue al final de la página sin cambios.

### M29. Agregar al carrito sin quitar "Consultar"
- **Qué:** cada tarjeta tiene ahora **Agregar** y **Consultar**. En móvil quedan en dos columnas (59px y 72px, sin desbordar). Agregar repite la línea si ya estaba; si el producto tiene tallas, hay que elegir una o aparece el aviso "Elige una talla antes de agregar".
- **Motivo:** elegiste mantener ambos botones. "Consultar" es útil para preguntar antes de decidir; "Agregar" es el paso nuevo del pedido.
- **Cómo te beneficia:** la clienta puede preguntar y comprar desde la misma tarjeta. El aviso de talla evita pedidos ambiguos en lencería.

### M30. Datos guardados y mensaje del pedido
- **Qué:** `andreaShop.carrito` guarda un array JSON de `{ id, talla, cantidad }`. La talla forma parte de la clave, así que M y L del mismo producto son dos líneas. Al leer se valida con `Array.isArray` y se descartan productos que ya no existen. El mensaje de WhatsApp lista cada línea con cantidad y subtotal, y cierra con el total (con "Desde" si aplica).
- **Motivo:** hacía falta que el pedido sobreviviera a una recarga y que el mensaje llegara listo al WhatsApp, sin que la clienta tenga que copiar nada. La validación evita que un dato dañado rompa la web con doble clic.
- **Cómo te beneficia:** si se cierra el navegador, el carrito sigue ahí; y el mensaje sale con el detalle correcto. **Decisión elegida:** el carrito **no se borra al enviar**, solo con "Vaciar carrito" (así no se pierde si WhatsApp no abre).

### M31. Cantidades con delegación de eventos
- **Qué:** los botones +, − y ✕ usan un único escuchador en `#listaCarrito`, igual que el carrusel. Quitar la última unidad elimina la línea automáticamente.
- **Motivo:** la lista se redibuja completa en cada cambio; si los escuchadores estuvieran en cada botón, se perderían. Es el mismo patrón que ya funcionó en el carrusel.
- **Cómo te beneficia:** menos código y cero errores al sumar, restar o quitar productos.

---

## Cierre de la Fase 3

**Quedó implementado:** carrito persistente en `localStorage`, cajón lateral, botones Agregar/Consultar, tallas obligatorias en lencería, cantidades, total y pedido por `wa.me`.

**Verificado en Chrome (sin errores JS):**
- Estado inicial: badge `0`, carrito oculto, total `$0`, botones de envío/vaciar ocultos.
- Agregar dos veces `vibrador-rosa-lengua` → badge `2`, total `$30`, una línea con `cantidad: 2`; el `href` decodificado contiene `x2` y `Total: $30`.
- Sumar/restar → `3`/`$45` y `2`/`$30`; bajar a cero quita la línea y guarda `[]`.
- Lencería sin talla → no agrega y muestra el aviso; con M y L → 2 líneas y badge `2`.
- Recargar → badge y líneas persisten. "Vaciar carrito" → `[]`.
- Menú → carrito cierra el menú; el overlay cierra el carrito.
- Móvil 390px: tarjetas de 165px, botones de 59/72px sin desborde, cajón de 343px, flotantes sin solapamiento, Contacto visible.

**Estado:** Fase 3 lista para revisión. No se inició ninguna fase nueva.

---

*Las fases 1, 2 y 3 están cerradas. Si aparece una cuarta fase, sus decisiones se agregan al final de este archivo.*
