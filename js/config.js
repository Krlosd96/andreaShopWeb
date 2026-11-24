/* =====================================================================
   config.js — Andrea Shop
   ---------------------------------------------------------------------
   DATOS DE LA TIENDA. Todo lo que pueda cambiar va aquí, en un solo
   lugar, para no andar buscándolo por el código: teléfono, Instagram,
   dirección, horario y mensajes.

   ⚠️ IMPORTANTE: reemplaza los valores de EJEMPLO por los reales.
   ===================================================================== */

const CONFIG = {
  // Nombre de la tienda
  nombre: "Andrea Shop",

  // Ciudad donde está la tienda física (aparece en la franja superior)
  ciudad: "Caracas",

  // WhatsApp en formato internacional, SIN "+", espacios ni guiones.
  // Venezuela = 58 + el número. Ejemplo real: "584141234567"
  whatsapp: "573226749900", // ⚠️ número de ejemplo, cámbialo

  // Usuario de Instagram SIN @ y sin la URL completa
  instagram: "andreashopccs", // ⚠️ usuario de ejemplo, cámbialo

  // Mensaje que llega precargado al abrir el chat de WhatsApp
  mensajeWhatsApp: "Hola Andrea Shop 👋 Tengo una duda sobre un producto.",

  // Dirección visible en la web (texto libre, fácil de cambiar)
  direccion: "Av. Principal de Los Palos Grandes, Local 4, Caracas", // ⚠️ ejemplo

  // Enlace a Google Maps. Si lo dejas vacío (""), la web lo arma sola
  // con la dirección de arriba. Si tienes un enlace exacto de Maps,
  // pégalo aquí y ese será el que se use.
  enlaceMaps: "",

  // Horarios
  horario: "Lunes a sábado · 10:00 a.m. a 7:00 p.m.", // versión completa
  horarioCorto: "Lun a sáb · 10 am – 7 pm", // versión resumida (franja superior)
};
