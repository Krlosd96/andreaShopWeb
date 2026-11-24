# 📚 APRENDIZAJE — Andrea Shop · Fases 1 y 2: diseño y catálogo

> Notas del tutor. Este archivo explica los **conceptos** detrás del código para que no solo copies, sino que entiendas. Léelo con el proyecto abierto al lado. En cada fase lo iremos ampliando.

---

## 1. Mapa mental: qué hace cada archivo

| Archivo | Rol | Analogía |
|---|---|---|
| `index.html` | Estructura: qué contenido existe | El esqueleto |
| `css/estilos.css` | Presentación: cómo se ve | La ropa y el maquillaje |
| `js/config.js` | Datos de la tienda (teléfono, dirección…) | La ficha del negocio |
| `js/productos.js` | Catálogo: los 62 productos | La lista de precios |
| `js/main.js` | Comportamiento: qué pasa al hacer clic | Los reflejos |

**Regla de oro de la web:** estructura (HTML), presentación (CSS) y comportamiento (JS) viven separados. Cuando quieras cambiar un color → CSS. Un teléfono → `config.js`. Qué pasa al hacer clic → `main.js`. Esta disciplina es lo que distingue un proyecto mantenible de una bola de espagueti.

---

## 2. HTML semántico

No usamos `<div>` para todo: usamos etiquetas **con significado**:

| Etiqueta | Significado | Dónde la usamos |
|---|---|---|
| `<header>` | Cabecera de la página | La franja del logo |
| `<nav>` | Bloque de navegación | El menú lateral |
| `<main>` | Contenido principal (solo uno por página) | Inicio + catálogo + contacto |
| `<section>` | Sección temática con su encabezado | Cada sección con su `id` |
| `<aside>` | Contenido secundario/complementario | El menú lateral |
| `<footer>` | Pie de página | Los créditos |
| `<article>` | Pieza autocontenida | Cada tarjeta de producto |

**Por qué importa:**
1. **Accesibilidad:** lectores de pantalla (personas ciegas) navegan por "regiones", no leyendo todo.
2. **SEO:** Google entiende mejor qué es importante en tu página.
3. **Tu futuro yo:** en 3 meses entenderás tu propio código sin releerlo entero.

Los `id` (`id="catalogo"`) sirven de *destinos* para los enlaces del menú (`href="#catalogo"`). Con `id` único por elemento.

---

## 3. CSS a variables (custom properties)

```css
:root {
  --rosa-fuerte: #b94d7c;   /* se define UNA vez */
}
.boton--principal { background: var(--rosa-fuerte); }  /* se usa mil veces */
```

**Por qué:** la marca tiene ~12 colores y medidas que se repiten. Si mañana tu prima quiere un rosa más intenso, cambias **una línea** y toda la web (botones, títulos, enlaces) se actualiza. Sin variables, tendrías que cazar 40 valores hexadecimales a mano, y siempre olvidas uno.

> 🔬 **Experimento:** abre `estilos.css`, cambia `--rosa-fuerte` y guarda. Refresca el navegador. Todo cambia junto.

**Detalle profesional — contraste:** notarás que los rosas *decorativos* son claros, pero el rosa de *botones con texto blanco* (`#b94d7c`) es más oscuro de lo que esperarías. Es a propósito: texto pequeño sobre color necesita contraste ≥ 4.5:1 (norma WCAG AA). Con rosa pastel + texto blanco no se lee bien con luz de sol. Decoración pastel, acción intensa.

---

## 4. Mobile-first (móvil primero)

En `estilos.css` el CSS "base" (fuera de toda media query) **es el diseño móvil**. Al final hay dos bloques:

```css
@media (min-width: 700px)  { /* catálogo a 3 columnas, contenido más ancho */ }
@media (min-width: 2000px) { /* solo detalles grandes: promos, logo, WhatsApp */ }
```

**Por qué así y no al revés:** en Venezuela la mayoría entrará desde el celular. Diseñar primero lo difícil (pantalla chica) y luego *agregar* comodidades para pantallas grandes es más fácil que diseñar una web de escritorio y luego apretarla. Cada punto de corte se llama **breakpoint**: `700px` cambia la parrilla y `2000px` solo agranda detalles (el menú sigue siendo hamburguesa a cualquier ancho).

**Test mental:** si algo se ve bien a 360px de ancho, a 1200px solo hay que darle aire.

> 📌 Antes había un solo bloque de `900px` que convertía el menú en columna fija; luego pasó a `2000px` (ver §21). Ahora agregamos `700px` porque necesitamos 3 columnas en escritorio y 2 en móvil sin que las tarjetas se vuelvan diminutas.

---

## 5. Flexbox vs Grid (cuál usar cuándo)

- **Flexbox** = una dimensión: una fila o una columna. Lo usamos en la franja (logo + datos), en el buscador (input + botón), en el pie de cada tarjeta (precio + botón).
- **Grid** = dos dimensiones: filas Y columnas. Lo usamos en la parrilla de productos y en las tarjetas de contacto. (Antes también dividía el layout en "menú + contenido"; hoy el contenido es una sola columna centrada.)

**El truco estrella** (memorízalo, lo reutilizas toda la vida):

```css
grid-template-columns: repeat(auto-fill, minmax(min(46vw, 160px), 1fr));
```

Traducción: "columnas de mínimo 160px (máx. 46% del ancho en móvil); crea tantas como quepan". **La parrilla se adapta sola** — 2 columnas en móvil, 4–5 en escritorio — **sin escribir una sola media query**. Ese es el poder de Grid.

---

## 6. Unidades: px, rem, %, vw, clamp

| Unidad | Qué es | Cuándo |
|---|---|---|
| `px` | Píxeles fijos | Bordes, radios, íconos |
| `rem` | Relativo al tamaño base del usuario | Tipografía (respeta si alguien agranda la letra del navegador) |
| `%` | Porcentaje del padre | Anchos fluidos |
| `vw` | 1% del ancho de la pantalla | Tipografía fluida |
| `clamp(min, ideal, max)` | Valor fluido con piso y techo | El título del hero: `clamp(2rem, 6vw, 2.8rem)` crece con la pantalla pero nunca pasa de 2.8rem |

Y `aspect-ratio: 1/1` en la imagen del producto: reserva el espacio cuadrado **antes** de que llegue la foto → la página no "brinca" al cargar (se llama *layout shift* y Google lo penaliza).

---

## 7. Posicionamiento: sticky, fixed y z-index

- **`position: sticky`** (la zona del logo + buscador): el elemento se desplaza normal, pero al tocar el borde superior **se pega** ahí. Coste: una línea. Beneficio: búsqueda siempre a mano.
- **`position: fixed`** (botón de WhatsApp, menú cajón en móvil y escritorio, modal de edad): siempre en el mismo punto de la **ventana**, aunque hagas scroll.
- **`z-index`**: el orden de las "capas". Nuestra escala: contenido (0) < WhatsApp flotante (30) < zona superior (40) < fondo del menú (45) < menú (46) < modal de edad (100). Solo funciona en elementos posicionados (fixed/sticky/relative).

> ⚠️ Detalle fino: al fijar la zona superior, los saltos de ancla (`href="#catalogo"`) aterrizan *debajo* de ella. Lo arreglamos con `scroll-margin-top` en cada `.seccion`. Esos detallitos son los que separan una web "casi lista" de una terminada.

---

## 8. JavaScript y el DOM

El **DOM** (Document Object Model) es la copia "viva" de tu HTML que el navegador mantiene en memoria. JS la manipula:

- `document.getElementById("btnMenu")` → busca el elemento con ese `id` (lo abreviamos como `$`).
- `addEventListener("click", funcion)` → "cuando hagan clic, ejecuta esto".
- `classList.add / remove / toggle` → encender/apagar clases de CSS. **El JS no pinta colores: solo prende interruptores que el CSS ya definió.** Ese patrón (JS cambia clases, CSS hace el resto) mantiene las responsabilidades limpias.
- `textContent` → cambia el texto de un elemento. Es seguro: si el dato contiene `<b>`, se muestra literal (a diferencia de `innerHTML`, que interpretaría HTML y es puerta a inyección de código — evítalo con datos de usuario).
- `element.hidden = true` → oculta (atributo HTML estándar, sin necesidad de clases).

**Los tres elementos de toda interacción:** 1) un elemento (`$("btnMenu")`), 2) un evento (`"click"`), 3) una reacción (`abrirMenu()`). Todo lo que verás en las próximas fases son variaciones de esto.

---

## 9. localStorage: la memoria del navegador

```js
localStorage.setItem("andreaShop.edad", "si");   // guardar
localStorage.getItem("andreaShop.edad");          // leer → "si" o null
localStorage.removeItem("andreaShop.edad");      // borrar
```

- **`localStorage`**: sobrevive recargas y cierre del navegador. Aquí guardamos la edad verificada y (Fase 3) el carrito.
- **`sessionStorage`**: igual, pero se borra al cerrar la pestaña. Sirve para datos de "esta visita".

Solo guarda **texto**. Para guardar objetos (el carrito) necesitaremos `JSON.stringify()` al guardar y `JSON.parse()` al leer — lo veremos en la Fase 3.

**Para probar el modal otra vez:** DevTools (F12) → pestaña **Application** (o Aplicación) → **Local Storage** → clic derecho sobre la clave `andreaShop.edad` → Delete. O simplemente abre una ventana de incógnito.

> Nota honesta: la verificación de edad en localStorage **no es un control legal** (un menor puede borrarla). Es una cortesía legal de la industria. El verdadero control ocurre al despachar/pagar el pedido.

---

## 10. Orden de carga: el atributo `defer`

```html
<script src="js/config.js" defer></script>
<script src="js/productos.js" defer></script>
<script src="js/main.js" defer></script>
```

Sin `defer`, el navegador ejecuta cada script **en el punto donde lo encuentra**, y como van al final… o al inicio sin los elementos listos, fallaría. Con `defer`: 1) termina de leer el HTML completo, 2) ejecuta los scripts **en el orden escrito**. Por eso `config.js` (datos de la tienda) y `productos.js` (catálogo) van antes que `main.js` (los usa).

Decidimos **no** usar `type="module"` (la alternativa moderna) porque los módulos requieren un servidor web para funcionar, y quiero que puedas abrir el proyecto con doble clic mientras aprendes. Clásico + `defer` funciona igual de bien a esta escala.

---

## 11. Datos separados de la lógica (`config.js`)

Todo dato que pueda cambiar (teléfono, Instagram, dirección, horario, mensajes) vive en un solo archivo. Esto se llama **fuente única de verdad** (*single source of truth*). Beneficios:

- Tu prima cambia de número → tú editas **una línea** en `config.js` y se actualiza en los 5 lugares donde aparece WhatsApp (flotante, contacto, menú…).
- Cero riesgo de que "algunas" páginas queden con el teléfono viejo (riesgo clásico al copiar/pegar).
- En la Fase 2 aplicamos la misma idea a los productos con `js/productos.js`.

---

## 12. Accesibilidad (a11y) = más clientes, no burocracia

Lo que aplicamos y por qué:

- **`aria-label`** en botones que solo tienen ícono (WhatsApp flotante, hamburguesa): un lector de pantalla anuncia "Chatear con nosotros por WhatsApp" en vez de "botón".
- **`aria-expanded`** (verdadero/falso) en hamburguesa y Filtros: anuncia "menú abierto/cerrado".
- **`aria-controls`**: vincula el botón con el elemento que controla.
- **`role="dialog"` y `aria-modal`** en la ventana de edad: "esto es una ventana que bloquea el resto".
- **`:focus-visible`**: al navegar con teclado (Tab), se ve dónde está el foco. Sin esto, usuarios de teclado navegan a ciegas.
- **`alt`** en imágenes: describe el logo. En íconos decorativos usamos `aria-hidden="true"` para que el lector no los anuncie como ruido.
- **Contraste ≥ 4.5:1** en texto pequeño (por eso el rosa de los botones es intenso).
- **`prefers-reduced-motion`**: si el usuario configuró su sistema para menos animaciones, las desactivamos. Costó 3 líneas.

---

## 13. DevTools: tu taller de pruebas (F12)

1. **Elements/Elementos:** inspecciona y **edita en vivo** colores y textos sin tocar archivos. Ideal para decidir el rosa exacto antes de guardarlo.
2. **Modo móvil (Ctrl + Shift + M):** emula teléfonos. Verifica la hamburguesa, el cajón y que nada se desborde a 360px.
3. **Console/Consola:** errores de JS en rojo. Si algo "no pasa", mira aquí primero.
4. **Application → Local Storage:** para resetear la verificación de edad y volver a ver el modal.

**Método de trabajo recomendado:** edita en DevTools → cuando te guste, copia el valor al archivo → refresca para confirmar. Nunca al revés.

---

## 14. Glosario rápido

| Término | Significado |
|---|---|
| **Viewport** | El área visible de la pantalla |
| **Breakpoint** | Ancho donde el diseño cambia (aquí: 700px y 2000px) |
| **Cajón / drawer** | Menú que se desliza desde un borde |
| **Chip** | Botón pequeño tipo "etiqueta" (los filtros) |
| **Sticky** | Se pega al borde al hacer scroll |
| **Hero** | Bloque de bienvenida principal |
| **CTA** | *Call to action*: botón que invita a la acción ("Ver catálogo") |
| **DOM** | Copia viva del HTML en memoria, manipulable con JS |
| **localStorage** | Memoria del navegador persistente |
| **Favicon** | Ícono de la pestaña del navegador |
| **wa.me** | Enlace oficial que abre un chat de WhatsApp |
| **encodeURIComponent** | Convierte texto en contenido seguro para URL (acentos, emojis, espacios) |
| **Responsive** | Que se adapta a cualquier pantalla |
| **Boceto / placeholder** | Contenido provisional para revisar diseño |
| **Plantilla literal** | Texto entre comillas invertidas `` ` `` que permite meter variables con `${...}` |
| **Set** | Lista que no admite repetidos |
| **Estado** | Variables que recuerdan lo que la persona está viendo ahora |
| **Carga diferida** | La imagen se descarga solo cuando está por entrar en pantalla |

---

## 15. Mini-retos para practicar (sin romper nada)

1. **Cambia la paleta:** en `:root`, cambia `--rosa-fuerte` y `--dorado`. Observa cómo toda la web sigue el cambio.
2. **Rompe el `defer`:** quítalo de las etiquetas `<script>` y mira la consola (F12). ¿Qué error aparece? Vuelve a ponerlo. *Aprender a leer errores es una superpotencia.*
3. **Reaparece el modal:** borra la clave en Application → Local Storage y recarga.
4. **Agrega un producto:** copia un objeto en `js/productos.js`, cambia `id`, `nombre` y `precio`. Verás aparecer su chip de categoría si es nueva.
5. **Agota una talla:** agrega `tallasAgotadas: ["M"]` a un producto de lencería y recarga. La M sale tachada y no se puede elegir.

---

## 16. De HTML fijo a tarjetas generadas

En la Fase 1 las 3 tarjetas estaban escritas a mano en el HTML. Hoy el HTML tiene solo un contenedor vacío:

```html
<div class="parrilla-productos" id="parrillaProductos"></div>
```

y JS lo llena:

```js
function htmlTarjeta(producto) {
  return `<article class="tarjeta-producto">
    <h3>${producto.nombre}</h3>
    <p>${producto.resumen}</p>
  </article>`;
}

$("parrillaProductos").innerHTML = PRODUCTOS.map(htmlTarjeta).join("");
```

- Las **comillas invertidas** (`` ` ``) permiten cortar el texto con `${...}` y meter variables. Eso es una *plantilla literal*.
- `.map(htmlTarjeta)` convierte cada objeto en texto HTML y `.join("")` lo pega sin comas. Hoy se aplica a un `slice` de 12 tarjetas, no a las 62 (ver §24).
- **Regla de seguridad:** `innerHTML` interpreta el texto como HTML. Está bien aquí porque los datos son **nuestros**, de un archivo local. Si vinieran de un formulario o de internet, habría que usar `textContent` para no abrir la puerta a inyección de código.

> 🧠 Cambió el flujo: antes "HTML → navegador". Ahora "datos → JS → HTML → navegador". El HTML es el molde, los datos son el relleno.

---

## 17. Tres métodos de arrays que verás siempre

```js
const categorias = [...new Set(PRODUCTOS.map((p) => p.categoria))];
const visibles = PRODUCTOS.filter((p) => p.categoria === "Lencería");
```

| Método | Qué hace | Analogía |
|---|---|---|
| `map()` | Transforma cada elemento y devuelve otro array igual de largo | Meter 62 ingredientes en 62 recipientes |
| `filter()` | Se queda solo con los que cumplen una condición | El portero de la discoteca |
| `new Set()` | Elimina repetidos | El que apunta nombres en un papel sin repetir |

Los tres **no modifican** el array original: devuelven uno nuevo. Por eso podemos filtrar y volver a filtrar sin estropear los datos.

El `...` que precede al `Set` se llama *spread*: "abre esta lista y pon sus elementos aquí". Necesario porque un `Set` no es un array y `sort()` solo existe en arrays.

---

## 18. Búsqueda que ignora acentos y mayúsculas

Si la clienta escribe `lenceria` y el dato dice `Lencería`, una comparación directa falla. La solución es **normalizar ambos lados** antes de comparar:

```js
function normalizar(texto) {
  return String(texto)
    .normalize("NFD")                  // separa la letra de su acento: é → e + ´
    .replace(/[\u0300-\u036f]/g, "")   // borra esos acentos sueltos
    .toLowerCase();                    // todo a minúsculas
}
```

Después basta con `textoProducto.includes(texto)`. Buscamos en `nombre + resumen + categoria`, así que "fresa" encuentra el lubricante aunque no esté en el título.

Desde Inicio **no filtramos todavía**: mostramos sugerencias y esperamos al envío del formulario para abrir el catálogo. Dentro del catálogo sí filtramos en cada letra (ver §25).

> 🔬 Prueba en consola: `normalizar("Lencería")` → `"lenceria"`. El truco es quitar el acento en vez de intentar adivinar todas las formas en que la persona puede escribirlo.

---

## 19. Tallas: radio buttons accesibles

Un `<input type="radio">` con el mismo `name` dentro de un grupo permite elegir **una sola** opción. Lo escondemos con `opacity: 0` y lo que se ve es un `<span>` hermano:

```css
.talla input:checked + span { /* se marcó: resaltar */ }
.talla input:focus-visible + span { /* navegando con teclado */ }
.talla input:disabled + span { /* sin stock: tachar */ }
```

El selector `+` significa "el elemento que viene justo después". Así el CSS reacciona al estado del input sin que JS pinte colores: otra vez la regla de **JS cambia atributos, CSS decide la apariencia**.

`<fieldset>` + `<legend>` le dicen al lector de pantalla que esas opciones forman un grupo llamado "Talla".

---

## 20. Imágenes ligeras (ya hay 9 de referencia)

Cuando `producto.imagen` tiene ruta, la tarjeta genera:

```html
<img class="tarjeta-producto__imagen" src="..." loading="lazy" width="500" height="500" />
```

- **WebP:** formato moderno; pesa menos que JPG con la misma calidad. Crucial en 3G.
- **`loading="lazy"`:** el navegador no descarga todas las fotos de golpe, solo las que se acercan a la pantalla.
- **`width` y `height`:** reservan el espacio cuadrado antes de cargar. Si falta esto, la página "brinca" al llegar la foto (*layout shift*).
- **`aspect-ratio: 1/1` + `object-fit: cover`** en CSS: foto cuadrada y recortada parejo, sin deformar (incluso si la original es alta, como el micrófono).

Hoy 9 productos tienen foto: tomamos las referencias que pusiste en `imagenes/productos/`, las convertimos a WebP de 600 px y las guardamos como `<id>.webp`. Los otros 53 siguen con `imagen: ""` y muestran un recuadro decorativo. Mejor eso que 53 imágenes rotas. Cuando lleguen las fotos definitivas, se reemplaza el archivo con el mismo nombre y no hay que tocar código.

---

## 21. Un solo menú: por qué menos estados es mejor

Antes había **dos comportamientos**: cajón deslizable en móvil y columna pegajosa en escritorio. Cada comportamiento tiene sus propias reglas de `display`, `transform`, `position`, `z-index` y `scroll-margin-top`. Dos comportamientos = el doble de cosas que pueden desincronizarse, y justo pasó: al crecer la franja de filtros, el menú pegajoso volvía a tapar parte del contenido.

La solución fue quedarse con **uno**: la hamburguesa abre el mismo cajón con el mismo overlay en móvil y en escritorio. El CSS de escritorio ya no toca `.sidebar`, `.overlay` ni `.layout` en modo grid; solo agranda logos y muestra las promos. La regla práctica:

> Si dos soluciones hacen lo mismo, elige una. El código que no existe no se rompe.

En el `@media (min-width: 2000px)` tampoco ocultamos la hamburguesa ni mostramos los chips de entrada. Los filtros siguen detrás del botón "Filtros" para que la franja `sticky` no crezca y vuelva a tapar el ancla de `#catalogo`. Por eso `--alto-superior` pudo bajar de 240px a 150px: mide ~152px en pantallas grandes.

---

## 22. Convertir imágenes sin instalar nada

Las fotos llegaron en JPG. El proyecto no tiene librerías ni `package.json`, así que usamos lo que ya estaba: el propio navegador.

```js
const lienzo = document.createElement("canvas");
lienzo.width = ancho;
lienzo.height = alto;
lienzo.getContext("2d").drawImage(imagen, 0, 0, ancho, alto);
const webp = lienzo.toDataURL("image/webp", 0.82);
```

- `<canvas>` es un "lienzo" donde dibujamos la imagen ya escalada.
- `toDataURL("image/webp", 0.82)` devuelve la imagen codificada en WebP con calidad 82. Ese texto `data:image/webp;base64,...` se decodifica y se guarda como archivo `.webp`.
- El resultado pesó entre 9 y 53 KB por foto, contra 37–224 KB de los JPG originales.

No agregamos dependencias al proyecto: la conversión fue una herramienta de trabajo, no parte de la web.

---

## 23. Vistas con `hidden` y el hash de la URL

`hidden` es un atributo booleano del HTML: si está, el elemento no se ve. No necesitamos una clase nueva:

```js
function mostrarVista(nombre) {
  $("inicio").hidden = nombre !== "inicio";
  $("catalogo").hidden = nombre !== "catalogo";
}
```

- Si `nombre` es `"inicio"`, la primera queda `hidden = false` y la segunda `true`.
- En el CSS agregamos `[hidden] { display: none !important; }` para que ninguna otra regla lo contradiga.
- El **hash** es la parte de la URL que va después de `#`. `location.hash = "#catalogo"` permite recargar la página o usar el botón "atrás" del navegador y seguir en la misma vista. `hashchange` es el evento que avisa de ese cambio.

Contacto quedó **fuera** de las dos vistas. Por eso aparece al final tanto en Inicio como en Catálogo, sin duplicar código.

> 🧠 Antes todo estaba en una sola columna y el usuario bajaba con scroll. Ahora el scroll está dentro de cada vista, pero el HTML sigue siendo un solo archivo: no hay servidor ni rutas nuevas.

---

## 24. Paginación con `slice()`

Dibujar 62 tarjetas de golpe es mucho HTML. Mostramos 12 y esperamos a que la persona pida más:

```js
const POR_PAGINA = 12; // 4 filas de 3

const paraMostrar = visibles.slice(0, estadoCatalogo.cantidadVisible);
$("parrillaProductos").innerHTML = paraMostrar.map(htmlTarjeta).join("");
```

- `slice(inicio, fin)` **corta** un array sin modificarlo. `slice(0, 12)` da las 12 primeras tarjetas.
- Cada clic en "Cargar más" suma 12 a `cantidadVisible` y volvemos a dibujar. Al llegar al final, el bloque del botón se oculta con `hidden`.
- El contador dice "Mostrando 12 de 62": separa lo que ves ahora del total disponible.

> 💡 Volver a dibujar las 12 + 12 tarjetas es más simple que ir agregando de a una, y a esta escala no se nota. Si fueran miles, sí convendría `appendChild`.

---

## 25. Formularios, `submit` y `<datalist>`

El buscador ahora es un `<form>`. Eso hace que **Enter** dispare el evento `submit`, igual que el botón "Buscar":

```js
$("formBuscar").addEventListener("submit", (evento) => {
  evento.preventDefault(); // evita que la página se recargue
  // aplicar búsqueda y abrir #catalogo
});
```

`preventDefault()` es muy usado: "no hagas lo que harías normalmente (recargar), yo lo manejo con JS".

Las sugerencias salen de un `<datalist>` nativo:

```html
<input type="search" id="inputBuscar" list="sugerenciasBuscar" />
<datalist id="sugerenciasBuscar"></datalist>
```

JS solo crea `<option>` con nombres que coinciden. El navegador se encarga de dibujar el desplegable y de que funcione con teclado.

La regla que pediste se resume así:

| Dónde estás | Al escribir | Al enviar |
|---|---|---|
| Inicio | Solo aparecen sugerencias | Se abre Catálogo con los resultados |
| Catálogo | Se filtra en vivo, como antes | Se mantiene el filtro, sin saltos |

> 🔍 El `<datalist>` se ve un poco distinto en Chrome, Edge o Firefox. Esa es la contrapartida de no escribir un desplegable propio: menos código y cero dependencias.

---

## 26. Elegir tamaño y formato de las fotos

La foto de cada tarjeta es un **cuadrado** (`aspect-ratio: 1/1`). Medimos la tarjeta en pantallas reales: 165px en móvil, 337px a 1440px y 359px a 2200px.

¿Por qué 600×600 y no 1200×1200? Porque una pantalla 2x pide el doble de píxeles: en móvil serían 330px y en escritorio grande ~718px. Con 600px ya se ve bien casi siempre, y el archivo pesa una décima parte que un JPG grande. Subir a 800px solo tendría sentido si las tarjetas crecieran.

Tres reglas que aplicamos:

1. **Recortar a cuadrado antes de exportar.** Si la foto original es 402×600 y el CSS la mete en un cuadrado con `object-fit: cover`, el navegador descarga píxeles que luego tira y puede cortar el producto.
2. **WebP con pérdida, calidad 82.** Comprime mejor que JPG y lo soportan los navegadores actuales. AVIF comprime un poco más, pero necesita más herramientas y una copia JPEG de respaldo: aquí no compensa.
3. **Objetivo 30–60 KB por foto.** Si una foto pesa 200 KB, casi siempre sobra resolución o falta compresión.

> 📐 Trabaja siempre desde una foto original grande (≥1200px) y genera el WebP de 600px como *salida*. Nunca reescribas el original.

---

## 27. Carrusel con un solo `<img>` y delegación de eventos

Podríamos poner las 3 fotos en el HTML y esconder 2. Pero eso descarga 3 imágenes por tarjeta aunque nadie las vea. Mejor: **un solo `<img>`** y cambiar su `src` cuando tocan una flecha.

Los datos están guardados en el propio elemento:

```html
<div class="carrusel" data-id="dados-posiciones" data-indice="0">
  <img src="...-1.webp" ... />
  <button data-direccion="siguiente">›</button>
</div>
```

`dataset.indice` es el número de foto actual. En JS lo leemos con `Number(carrusel.dataset.indice)` y lo guardamos de vuelta después de avanzar.

La parte más importante es el **escuchador único**:

```js
$("parrillaProductos").addEventListener("click", (evento) => {
  const boton = evento.target.closest(".carrusel__flecha");
  if (!boton) return;
  // ...buscar el producto y cambiar la foto
});
```

- `renderizarCatalogo()` reemplaza todo el `innerHTML` de la parrilla. Si pusiéramos un `addEventListener` en cada flecha al crearla, los escuchadores se perderían al redibujar.
- En cambio, la parrilla **nunca se reemplaza**: solo cambia su contenido. El escuchador sigue ahí. A esto se le dice **delegación de eventos**.
- `closest()` sube desde lo que tocaste (puede ser el texto `‹`) hasta el botón que tiene la clase que nos interesa.
- Para volver a la primera foto usamos `%`:

```js
const indice = (actual + 1 + fotos.length) % fotos.length;
```

Si `actual` es 2 y hay 3 fotos: `(2 + 1 + 3) % 3 = 0`. Sumar `fotos.length` evita un número negativo cuando vas hacia atrás desde la foto 1.

> ▶️ Decidimos **no** poner auto-avance: con 12 tarjetas a la vez, que todas cambien solas distrae. Si algún día se agrega, debe pausarse al pasar el ratón y respetar `prefers-reduced-motion`.

---

## 28. `localStorage`: memoria que sobrevive al recargar

`localStorage` es como una libreta del navegador: guarda **texto** con una clave y sigue ahí aunque recargues o cierres la pestaña.

```js
localStorage.setItem("andreaShop.edad", "si");
const valor = localStorage.getItem("andreaShop.edad");
```

Como solo guarda texto, para guardar un array necesitamos JSON:

```js
localStorage.setItem("andreaShop.carrito", JSON.stringify(carrito));
const items = JSON.parse(localStorage.getItem("andreaShop.carrito"));
```

- `JSON.stringify()` convierte el array en texto: `[{"id":"...","cantidad":2}]`.
- `JSON.parse()` hace lo contrario: texto → array otra vez.
- `try / catch` evita que la página se rompa si alguien dejó un texto inválido: si falla, empezamos con `[]`.
- También filtramos los productos que ya no existen: si mañana quitamos un producto de `productos.js`, un carrito viejo no debería mostrarlo.

> 🧹 Para borrar la libreta: F12 → Application → Local Storage → borrar la clave. O abrir en incógnito.

---

## 29. La clave compuesta: `id + talla`

Si guardáramos solo el `id`, dos tallas del mismo producto se mezclarían. Por eso cada línea guarda tres datos:

```js
{ id: "lenceria-boddys", talla: "M", cantidad: 1 }
```

Y para saber si ya está usamos **dos condiciones**:

```js
const existente = carrito.find(
  (item) => item.id === id && item.talla === talla
);
```

`&&` significa "y": deben coincidir las dos cosas. Si hay suerte, sumamos 1 a `cantidad`; si no, creamos una línea nueva. Para productos sin tallas, `talla` queda como texto vacío `""` y funciona igual.

> 🧠 Esto es una **clave compuesta**: dos datos juntos identifican una línea. Es lo mismo que pasar "M" y "L" como pedidos distintos en una tienda física.

---

## 30. Armar el mensaje del pedido

El botón "Enviar pedido" no abre un WhatsApp vacío: arma un texto con `map()` y lo metemos en la URL con `encodeURIComponent()`.

```js
const url = "https://wa.me/" + CONFIG.whatsapp + "?text=" +
  encodeURIComponent(mensaje);
```

`encodeURIComponent()` convierte espacios, acentos, emojis y saltos de línea en caracteres seguros para una URL. Dentro del mensaje usamos `\n` para bajar de línea:

```
Hola Andrea Shop 👋 Quisiera hacer este pedido:

1. Vibrador Rosa Lengua x2 → $30

Total: $30
```

Si un producto dice "Desde $7", el total también se escribe "Desde $X" para no prometer un precio fijo.

> 📤 El carrito **no se borra** al abrir WhatsApp: si la app no abre, la clienta puede volver a intentarlo. Se limpia solo con "Vaciar carrito".

---

*Si aparece una cuarta fase, sus conceptos se agregan al final de este archivo.*
