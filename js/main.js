/* =====================================================================
   main.js — Andrea Shop · Fases 1, 2 y 3
   ---------------------------------------------------------------------
   Este archivo maneja las interacciones de la página:

   1. Ventana de verificación de edad (+18)
   2. Menú lateral deslizable (móvil y escritorio)
   3. Vistas Inicio / Catálogo (solo se dibuja la elegida)
   4. Botón "Filtros" y buscador con sugerencias
   5. Rellena los datos de la tienda leyendo js/config.js
   6. Catálogo, paginación y filtros leyendo js/productos.js
   7. Carrito en localStorage y pedido por WhatsApp

   Regla mental: JavaScript "conecta" el HTML con los datos y con las
   acciones del usuario. Aquí no hay estilos (eso vive en el CSS) ni
   contenido fijo (eso vive en el HTML).
   ===================================================================== */

// Atajo muy usado en la industria: $ = buscar un elemento por su id.
// document.getElementById("menu") es lo mismo que $("menu")
const $ = (id) => document.getElementById(id);

/* ---------------------------------------------------------------------
   1) VERIFICACIÓN DE EDAD
   Guardamos un "sí" en localStorage para no molestar en cada visita.
   localStorage es una memoria del navegador que NO se borra al recargar
   ni al cerrar la pestaña (solo se borra si la persona limpia sus datos).
   ------------------------------------------------------------------- */
const CLAVE_EDAD = "andreaShop.edad";

const modalEdad = $("modalEdad");

function cerrarModalEdad() {
  modalEdad.classList.add("oculto"); // la clase .oculto aplica display:none (CSS)
  document.body.classList.remove("sin-scroll"); // devolvemos el scroll a la página
}

// ¿Ya había aceptado en visitas anteriores? Entonces ni lo mostramos
if (localStorage.getItem(CLAVE_EDAD) === "si") {
  cerrarModalEdad();
}

$("btnEdadSi").addEventListener("click", () => {
  localStorage.setItem(CLAVE_EDAD, "si"); // lo recordamos
  cerrarModalEdad();
});

$("btnEdadNo").addEventListener("click", () => {
  // Es menor de edad: ocultamos los botones y mostramos un mensaje amable
  $("modalEdadBotones").hidden = true;
  $("notaEdadMenor").hidden = false;
});

/* ---------------------------------------------------------------------
   2) MENÚ LATERAL (versión móvil: cajón deslizable)
   ------------------------------------------------------------------- */
const sidebar = $("sidebar");
const overlay = $("overlay");
const btnMenu = $("btnMenu");

function abrirMenu() {
  cerrarCarrito(); // nunca dos cajones abiertos a la vez
  sidebar.classList.add("sidebar--abierta"); // el CSS desliza el menú hacia adentro
  overlay.hidden = false; // mostramos el fondo oscuro
  btnMenu.setAttribute("aria-expanded", "true"); // avisamos a lectores de pantalla
}

function cerrarMenu() {
  sidebar.classList.remove("sidebar--abierta");
  overlay.hidden = true;
  btnMenu.setAttribute("aria-expanded", "false");
}

$("btnMenu").addEventListener("click", abrirMenu);
$("btnCerrarMenu").addEventListener("click", cerrarMenu);
overlay.addEventListener("click", () => {
  cerrarMenu();
  cerrarCarrito();
});

// Si tocan un enlace del menú, navegamos y cerramos el cajón
sidebar.querySelectorAll("a").forEach((enlace) => {
  enlace.addEventListener("click", cerrarMenu);
});

// La tecla Escape también cierra el menú (comodidad en computadoras)
document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape") {
    cerrarMenu();
    cerrarCarrito();
  }
});

/* ---------------------------------------------------------------------
    3) VISTAS: INICIO Y CATÁLOGO
    El hash (#inicio o #catalogo) decide qué vista se dibuja. Contacto
    vive fuera de las vistas, así que siempre queda al final de la página.
    ------------------------------------------------------------------- */
let vistaActual = "inicio";

function vistaDesdeHash() {
  return location.hash === "#catalogo" ? "catalogo" : "inicio";
}

function mostrarVista(nombre) {
  vistaActual = nombre;
  $("inicio").hidden = nombre !== "inicio";
  $("catalogo").hidden = nombre !== "catalogo";

  sidebar.querySelectorAll(".sidebar__enlace").forEach((enlace) => {
    const esLaVista = enlace.getAttribute("href") === "#" + nombre;
    enlace.classList.toggle("sidebar__enlace--activo", esLaVista);
    if (esLaVista) enlace.setAttribute("aria-current", "page");
    else enlace.removeAttribute("aria-current");
  });

  actualizarSugerencias();
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", () => {
  const hash = location.hash;
  if (hash === "#inicio" || hash === "#catalogo") {
    mostrarVista(vistaDesdeHash());
  }
  // "#contacto" no cambia la vista: el navegador solo baja hasta esa sección.
});

/* ---------------------------------------------------------------------
   4) FILTROS (botón que muestra/oculta los chips)
   classList.toggle devuelve true si agregó la clase y false si la quitó.
   ------------------------------------------------------------------- */
$("btnFiltros").addEventListener("click", () => {
  const quedaronAbiertos = $("filtros").classList.toggle("filtros--abierto");
  $("btnFiltros").setAttribute("aria-expanded", String(quedaronAbiertos));
});

/* ---------------------------------------------------------------------
   5) DATOS DE LA TIENDA (todo vive en js/config.js)
   Así cambias teléfono, Instagram o dirección en un solo lugar.
   ------------------------------------------------------------------- */

// Construye el enlace de WhatsApp con un mensaje precargado.
// encodeURIComponent convierte espacios, acentos y emojis a texto
// seguro para una URL.
function enlaceWhatsApp(mensaje) {
  return (
    "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(mensaje)
  );
}

// Botón flotante + tarjeta de contacto + menú lateral (mismo enlace)
const urlWhatsApp = enlaceWhatsApp(CONFIG.mensajeWhatsApp);
$("btnFlotanteWhatsApp").href = urlWhatsApp;
$("enlaceWhatsApp").href = urlWhatsApp;
$("enlaceWhatsAppMenu").href = urlWhatsApp;

// Instagram
const urlInstagram = "https://www.instagram.com/" + CONFIG.instagram + "/";
$("enlaceInstagram").href = urlInstagram;
$("enlaceInstagramMenu").href = urlInstagram;

// Dirección, horario y ciudad: los huecos "…" del HTML se llenan aquí
$("textoDireccion").textContent = CONFIG.direccion;
$("textoHorario").textContent = CONFIG.horario;
$("textoHorarioContacto").textContent = CONFIG.horario;
$("promoCiudad").textContent = "Tienda física en " + CONFIG.ciudad;
$("promoHorario").textContent = CONFIG.horarioCorto;

// Enlace a Google Maps: si en config.js "enlaceMaps" quedó vacío,
// lo armamos automáticamente a partir de la dirección.
$("enlaceMaps").href =
  CONFIG.enlaceMaps ||
  "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(CONFIG.direccion);

// Año actual del pie de página (así nunca queda desactualizado)
$("anioActual").textContent = new Date().getFullYear();

/* ---------------------------------------------------------------------
    6) CATÁLOGO, PAGINACIÓN, BÚSQUEDA Y FILTROS
    Los productos viven en js/productos.js. Aquí solo decidimos cuáles
    se muestran y armamos las tarjetas. Los datos son nuestros (no vienen
    de un formulario), por eso podemos usar plantillas de HTML.
    ------------------------------------------------------------------- */

// 4 filas de 3 tarjetas = 12 productos por tanda.
const POR_PAGINA = 12;

// "estado" = lo que la persona está viendo en este momento.
const estadoCatalogo = {
  categoria: "Todos",
  busqueda: "",
  cantidadVisible: POR_PAGINA,
};

// Quita acentos y mayúsculas: así "lenceria" también encuentra "Lencería".
function normalizar(texto) {
  return String(texto)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// Set = lista sin repetidos. De aquí salen los chips automáticamente.
const categorias = [
  ...new Set(PRODUCTOS.map((producto) => producto.categoria)),
].sort((a, b) => a.localeCompare(b, "es"));

function crearChips() {
  const contenedor = $("filtros");
  contenedor.innerHTML = ""; // limpiamos antes de volver a crearlos

  ["Todos", ...categorias].forEach((categoria) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "chip";
    boton.textContent = categoria;

    const activo = categoria === estadoCatalogo.categoria;
    if (activo) boton.classList.add("chip--activo");
    boton.setAttribute("aria-pressed", String(activo));

    boton.addEventListener("click", () => {
      estadoCatalogo.categoria = categoria;
      estadoCatalogo.cantidadVisible = POR_PAGINA;
      crearChips();
      renderizarCatalogo();

      // Si el chip se tocó desde Inicio, mostramos el catálogo filtrado.
      if (vistaActual !== "catalogo") {
        location.hash = "catalogo";
        if (vistaActual !== "catalogo") mostrarVista("catalogo");
      }
    });

    contenedor.appendChild(boton);
  });
}

// Devuelve solo los productos que pasan el filtro y la búsqueda.
function productosVisibles() {
  const texto = normalizar(estadoCatalogo.busqueda.trim());

  return PRODUCTOS.filter((producto) => {
    const porCategoria =
      estadoCatalogo.categoria === "Todos" ||
      producto.categoria === estadoCatalogo.categoria;

    const textoProducto = normalizar(
      producto.nombre + " " + producto.resumen + " " + producto.categoria,
    );

    return porCategoria && (texto === "" || textoProducto.includes(texto));
  });
}

// Precio con signo "$" nada más. Los decimales se muestran con dos cifras.
function textoPrecio(producto) {
  const numero = Number.isInteger(producto.precio)
    ? String(producto.precio)
    : producto.precio.toFixed(2);
  return (producto.precio_desde ? "Desde " : "") + "$" + numero;
}

// Fotos del producto: principal + extras del carrusel (si las hay).
function fotosDelProducto(producto) {
  return [producto.imagen, ...(producto.imagenes || [])].filter(Boolean);
}

// Si hay una sola foto, se ve sola. Si hay más, aparecen flechas y puntitos.
// En el <img> solo va la foto actual: las otras se cargan al usar las flechas.
function htmlImagen(producto) {
  const fotos = fotosDelProducto(producto);

  if (fotos.length === 0) {
    return `<div class="tarjeta-producto__imagen tarjeta-producto__imagen--vacia" aria-hidden="true">🌸</div>`;
  }

  if (fotos.length === 1) {
    return `<img class="tarjeta-producto__imagen" src="${fotos[0]}" alt="${producto.nombre}" loading="lazy" width="600" height="600" />`;
  }

  const puntos = fotos
    .map(
      (foto, i) =>
        `<span class="carrusel__punto${i === 0 ? " carrusel__punto--activo" : ""}"></span>`,
    )
    .join("");

  return `<div class="carrusel" data-id="${producto.id}" data-indice="0">
    <img class="tarjeta-producto__imagen" src="${fotos[0]}"
      alt="${producto.nombre}, foto 1 de ${fotos.length}"
      loading="lazy" width="600" height="600" />
    <button type="button" class="carrusel__flecha carrusel__flecha--anterior"
      data-direccion="anterior" aria-label="Foto anterior de ${producto.nombre}">‹</button>
    <button type="button" class="carrusel__flecha carrusel__flecha--siguiente"
      data-direccion="siguiente" aria-label="Foto siguiente de ${producto.nombre}">›</button>
    <span class="carrusel__contador">1/${fotos.length}</span>
    <div class="carrusel__puntos" aria-hidden="true">${puntos}</div>
  </div>`;
}

// Tallas de lencería. Cuando llegue el stock se agrega "tallasAgotadas"
// al producto y esas opciones salen deshabilitadas automáticamente.
function htmlTallas(producto) {
  if (!producto.tallas) return "";

  const agotadas = producto.tallasAgotadas || [];
  const opciones = producto.tallas
    .map((talla) => {
      const bloqueada = agotadas.includes(talla);
      return `<label class="talla">
        <input type="radio" name="talla-${producto.id}" value="${talla}" ${bloqueada ? "disabled" : ""} />
        <span>${talla}</span>
      </label>`;
    })
    .join("");

  return `<fieldset class="tallas">
    <legend>Talla</legend>
    <div class="tallas__opciones">${opciones}</div>
    <p class="tallas__aviso" data-aviso-talla="${producto.id}" hidden>
      Elige una talla antes de agregar.
    </p>
  </fieldset>`;
}

// Enlace de consulta por producto (contacto, todavía no es carrito).
function enlaceConsulta(producto) {
  const mensaje =
    "Hola Andrea Shop 👋 Quisiera información sobre " + producto.nombre + ".";
  return (
    "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(mensaje)
  );
}

function htmlTarjeta(producto) {
  return `<article class="tarjeta-producto">
    ${htmlImagen(producto)}
    <div class="tarjeta-producto__cuerpo">
      <p class="tarjeta-producto__categoria">${producto.categoria}</p>
      <h3 class="tarjeta-producto__nombre">${producto.nombre}</h3>
      <p class="tarjeta-producto__desc">${producto.resumen}</p>
      ${htmlTallas(producto)}
      <div class="tarjeta-producto__pie">
        <p class="tarjeta-producto__precio">${textoPrecio(producto)}</p>
        <div class="tarjeta-producto__acciones">
          <button type="button" class="boton boton--principal boton--agregar"
            data-id="${producto.id}"
            aria-label="Agregar ${producto.nombre} al carrito">Agregar</button>
          <a class="boton boton--fantasma tarjeta-producto__consultar"
             href="${enlaceConsulta(producto)}" target="_blank" rel="noopener"
             aria-label="Consultar ${producto.nombre} por WhatsApp">Consultar</a>
        </div>
      </div>
    </div>
  </article>`;
}

function renderizarCatalogo() {
  const visibles = productosVisibles();
  // slice(): solo dibujamos la tanda actual, no los 62 de golpe.
  const paraMostrar = visibles.slice(0, estadoCatalogo.cantidadVisible);

  $("parrillaProductos").innerHTML = paraMostrar.map(htmlTarjeta).join("");
  $("contadorProductos").textContent =
    "Mostrando " +
    paraMostrar.length +
    " de " +
    PRODUCTOS.length +
    " productos";

  $("sinResultados").hidden = visibles.length !== 0;
  $("terminoBuscado").textContent = estadoCatalogo.busqueda.trim();

  const quedan = visibles.length - paraMostrar.length;
  $("cargarMas").hidden = quedan <= 0;
  $("notaCargarMas").textContent =
    quedan > 0 ? "Quedan " + quedan + " productos por mostrar" : "";
}

// Un solo escuchador para TODAS las tarjetas: como está en la parrilla y no
// en cada botón, sigue funcionando aunque se redibuje el catálogo. Atiende
// las flechas del carrusel y el botón "Agregar" del carrito.
$("parrillaProductos").addEventListener("click", (evento) => {
  // El mismo escuchador atiende las flechas del carrusel y el botón Agregar.
  const agregar = evento.target.closest(".boton--agregar");
  if (agregar) {
    agregarAlCarrito(agregar.dataset.id);
    return;
  }

  const boton = evento.target.closest(".carrusel__flecha");
  if (!boton) return; // el clic fue en otra parte de la tarjeta

  const carrusel = boton.closest(".carrusel");
  const producto = PRODUCTOS.find((p) => p.id === carrusel.dataset.id);
  const fotos = fotosDelProducto(producto);
  const paso = boton.dataset.direccion === "siguiente" ? 1 : -1;
  // El módulo (%) hace que la última foto vuelva a la primera (y al revés).
  const indice =
    (Number(carrusel.dataset.indice) + paso + fotos.length) % fotos.length;

  const imagen = carrusel.querySelector(".tarjeta-producto__imagen");
  imagen.src = fotos[indice];
  imagen.alt =
    producto.nombre + ", foto " + (indice + 1) + " de " + fotos.length;
  carrusel.dataset.indice = indice;
  carrusel.querySelector(".carrusel__contador").textContent =
    indice + 1 + "/" + fotos.length;
  carrusel.querySelectorAll(".carrusel__punto").forEach((punto, i) => {
    punto.classList.toggle("carrusel__punto--activo", i === indice);
  });
});

// Sugerencias de texto: solo fuera del catálogo, porque dentro se filtra
// en vivo. El <datalist> es la lista que ya trae el navegador.
function actualizarSugerencias() {
  const lista = $("sugerenciasBuscar");
  lista.innerHTML = ""; // limpiamos antes de volver a llenar

  const texto = normalizar($("inputBuscar").value.trim());
  if (vistaActual === "catalogo" || texto === "") return;

  PRODUCTOS.filter((producto) => normalizar(producto.nombre).includes(texto))
    .slice(0, 6)
    .forEach((producto) => {
      const opcion = document.createElement("option");
      opcion.value = producto.nombre;
      opcion.label = producto.categoria;
      lista.appendChild(opcion);
    });
}

// "input" se dispara en cada letra. Dentro del catálogo filtra al instante;
// fuera, solo actualiza las sugerencias todavía no cambia de vista.
$("inputBuscar").addEventListener("input", (evento) => {
  estadoCatalogo.busqueda = evento.target.value;
  actualizarSugerencias();

  if (vistaActual === "catalogo") {
    estadoCatalogo.cantidadVisible = POR_PAGINA;
    renderizarCatalogo();
  }
});

// Enter o clic en "Buscar": termina la búsqueda y abre el catálogo.
$("formBuscar").addEventListener("submit", (evento) => {
  evento.preventDefault(); // el formulario no recarga la página

  estadoCatalogo.busqueda = $("inputBuscar").value;
  estadoCatalogo.cantidadVisible = POR_PAGINA;
  renderizarCatalogo();

  if (vistaActual !== "catalogo") {
    location.hash = "catalogo"; // el hashchange dibuja la vista
    if (vistaActual !== "catalogo") mostrarVista("catalogo");
  }
  window.scrollTo(0, 0);
});

// Cada clic añade otra tanda de 12 productos (4 filas de 3).
$("btnCargarMas").addEventListener("click", () => {
  estadoCatalogo.cantidadVisible += POR_PAGINA;
  renderizarCatalogo();
});

/* ---------------------------------------------------------------------
    7) CARRITO (Fase 3)
    Guardamos un array en localStorage con la clave "andreaShop.carrito".
    Cada item es { id, talla, cantidad }. La talla se guarda para que dos
    tallas del mismo producto sean dos líneas distintas en el pedido.
    ------------------------------------------------------------------- */
const CLAVE_CARRITO = "andreaShop.carrito";

// localStorage guarda TEXTO, por eso usamos JSON para convertir el array.
function leerCarrito() {
  try {
    const guardado = localStorage.getItem(CLAVE_CARRITO);
    if (!guardado) return [];
    const items = JSON.parse(guardado);
    // Si el dato está dañado o el producto ya no existe, empezamos limpio.
    return Array.isArray(items)
      ? items.filter(
          (item) =>
            PRODUCTOS.some((producto) => producto.id === item.id) &&
            Number(item.cantidad) > 0,
        )
      : [];
  } catch (error) {
    return [];
  }
}

let carrito = leerCarrito();

function guardarCarrito() {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

function textoDinero(numero) {
  return "$" + (Number.isInteger(numero) ? String(numero) : numero.toFixed(2));
}

function totalCarrito() {
  return carrito.reduce((suma, item) => {
    const producto = PRODUCTOS.find((p) => p.id === item.id);
    return suma + (producto ? producto.precio * item.cantidad : 0);
  }, 0);
}

// Algunos productos dicen "Desde $X": el total también debe decir "Desde".
function textoTotal() {
  const hayDesde = carrito.some((item) => {
    const producto = PRODUCTOS.find((p) => p.id === item.id);
    return producto && producto.precio_desde;
  });
  return (hayDesde ? "Desde " : "") + textoDinero(totalCarrito());
}

function agregarAlCarrito(id) {
  const producto = PRODUCTOS.find((p) => p.id === id);
  if (!producto) return;

  let talla = "";
  if (producto.tallas) {
    const seleccionada = document.querySelector(
      `input[name="talla-${id}"]:checked`,
    );
    if (!seleccionada) {
      const aviso = document.querySelector(`[data-aviso-talla="${id}"]`);
      if (aviso) aviso.hidden = false;
      return;
    }
    talla = seleccionada.value;
  }

  const existente = carrito.find(
    (item) => item.id === id && item.talla === talla,
  );
  if (existente) existente.cantidad += 1;
  else carrito.push({ id, talla, cantidad: 1 });

  guardarCarrito();
  renderizarCarrito();
}

// Texto que se abre en WhatsApp con el detalle del pedido.
function mensajePedido() {
  const lineas = carrito.map((item, indice) => {
    const producto = PRODUCTOS.find((p) => p.id === item.id);
    const talla = item.talla ? " · Talla " + item.talla : "";
    return (
      indice +
      1 +
      ". " +
      producto.nombre +
      talla +
      " x" +
      item.cantidad +
      " → " +
      textoDinero(producto.precio * item.cantidad)
    );
  });

  return (
    "Hola Andrea Shop 👋 Quisiera hacer este pedido:\n\n" +
    lineas.join("\n") +
    "\n\nTotal: " +
    textoTotal() +
    "\n\n¿Podrían confirmar disponibilidad? Gracias."
  );
}

function renderizarCarrito() {
  const unidades = carrito.reduce((suma, item) => suma + item.cantidad, 0);
  $("cantidadCarrito").textContent = String(unidades);
  $("cantidadCarritoMenu").textContent = String(unidades);
  $("btnCarrito").setAttribute(
    "aria-label",
    "Abrir mi carrito, " + unidades + " productos",
  );

  const vacio = carrito.length === 0;
  $("enviarPedido").hidden = vacio;
  $("btnVaciarCarrito").hidden = vacio;
  $("totalCarrito").textContent = textoTotal();

  if (vacio) {
    $("listaCarrito").innerHTML =
      `<p class="carrito__vacio">Tu carrito está vacío 🌸<br />Elige productos en el catálogo.</p>`;
    return;
  }

  $("listaCarrito").innerHTML = carrito
    .map((item, indice) => {
      const producto = PRODUCTOS.find((p) => p.id === item.id);
      const talla = item.talla ? " · Talla " + item.talla : "";
      return `<div class="carrito__item">
        <div class="carrito__item-datos">
          <p class="carrito__nombre">${producto.nombre}${talla}</p>
          <p class="carrito__precio">${textoDinero(producto.precio)} c/u</p>
        </div>
        <div class="carrito__controles">
          <button type="button" class="carrito__masmenos" data-accion="restar" data-indice="${indice}"
            aria-label="Quitar una unidad de ${producto.nombre}">−</button>
          <span class="carrito__unidades">${item.cantidad}</span>
          <button type="button" class="carrito__masmenos" data-accion="sumar" data-indice="${indice}"
            aria-label="Agregar una unidad de ${producto.nombre}">+</button>
          <button type="button" class="carrito__quitar" data-accion="quitar" data-indice="${indice}"
            aria-label="Quitar ${producto.nombre} del carrito">✕</button>
        </div>
      </div>`;
    })
    .join("");

  $("enviarPedido").href = enlaceWhatsApp(mensajePedido());
}

function abrirCarrito() {
  $("carrito").hidden = false;
  $("btnCarrito").setAttribute("aria-expanded", "true");
  cerrarMenu(); // si el menú estaba abierto, se cierra
  overlay.hidden = false;
}

function cerrarCarrito() {
  $("carrito").hidden = true;
  $("btnCarrito").setAttribute("aria-expanded", "false");
  overlay.hidden = true;
}

$("btnCarrito").addEventListener("click", abrirCarrito);
$("btnCarritoMenu").addEventListener("click", () => {
  cerrarMenu();
  abrirCarrito();
});
$("btnCerrarCarrito").addEventListener("click", cerrarCarrito);

$("btnVaciarCarrito").addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  renderizarCarrito();
});

// Delegación: la lista se redibuja entera, pero el escuchador sigue vivo.
$("listaCarrito").addEventListener("click", (evento) => {
  const boton = evento.target.closest("button[data-accion]");
  if (!boton) return;

  const indice = Number(boton.dataset.indice);
  const accion = boton.dataset.accion;

  if (accion === "sumar") carrito[indice].cantidad += 1;
  if (accion === "restar") {
    carrito[indice].cantidad -= 1;
    if (carrito[indice].cantidad === 0) carrito.splice(indice, 1);
  }
  if (accion === "quitar") carrito.splice(indice, 1);

  guardarCarrito();
  renderizarCarrito();
});

// Pintamos chips, catálogo, carrito y vista inicial la primera vez que abre.
crearChips();
renderizarCatalogo();
renderizarCarrito();
mostrarVista(vistaDesdeHash());
