/* =====================================================================
   productos.js — Andrea Shop · Fase 2 (catálogo y búsqueda)
   ---------------------------------------------------------------------
   CATÁLOGO DE LA TIENDA. La web lee ESTE archivo (no productos.json).
   Está escrito como variable global para que funcione con doble clic:
   los scripts clásicos con defer comparten las variables entre sí.

   Campos de cada producto:
   - id: identificador único (slug). No cambiar una vez usado.
   - categoria: grupo para los chips de filtro.
   - nombre: nombre del catálogo (es lo que la clienta menciona al pedir).
   - resumen: texto DISCRETO que se muestra en la tarjeta. El texto
     original del PDF quedó en productos.json y no se publica.
   - precio: número en dólares.
   - precio_desde: true → la tarjeta dice "Desde $X".
   - tallas: solo en lencería. Opciones seleccionables.
   - tallasAgotadas: se agregará cuando haya información real de stock.
     Hoy no existe: el código ya sabe dejarlas deshabilitadas si aparece.
   - imagen: foto principal (ruta WebP cuadrada de 600 px).
   - imagenes: fotos EXTRA del carrusel. Es opcional: si no existe, la tarjeta
     muestra una sola foto sin flechas. Hoy 2 productos tienen 3 fotos.
     Estándar acordado: 1 a 3 fotos por producto. El resto sigue vacío.
   ===================================================================== */

const PRODUCTOS = [
  {
    id: "vibrador-rosa-lengua",
    categoria: "Vibradores",
    nombre: "Vibrador Rosa Lengua",
    resumen: "Vibrador con forma de rosa y lengüeta de silicona flexible. Recargable y de uso externo.",
    precio: 15,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "vibrador-rosa-succionadora",
    categoria: "Vibradores",
    nombre: "Vibrador Rosa Succionadora",
    resumen: "Diseño de rosa en silicona suave, recargable por USB y sumergible. Varios modos de intensidad.",
    precio: 18,
    precio_desde: false,
    imagen: "imagenes/productos/vibrador-rosa-succionadora-1.webp",
    imagenes: [
      "imagenes/productos/vibrador-rosa-succionadora-2.webp",
      "imagenes/productos/vibrador-rosa-succionadora-3.webp"
    ]
  },
  {
    id: "plug-anal-con-luces",
    categoria: "Plugs anales",
    nombre: "Plug Anal con Luces",
    resumen: "Accesorio de metal con luces LED y control para cambiar el color. Base ancha y diseño cónico.",
    precio: 20,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "vibrador-microfono",
    categoria: "Vibradores",
    nombre: "Vibrador Micrófono",
    resumen: "Diseño de micrófono con mango ergonómico y cabezal redondo. Varias frecuencias de vibración.",
    precio: 12,
    precio_desde: false,
    imagen: "imagenes/productos/vibrador-microfono.webp"
  },
  {
    id: "dildo-con-ventosa",
    categoria: "Dildos",
    nombre: "Dildo con Ventosa",
    resumen: "Silicona suave con base de succión para superficies lisas. Aproximadamente 18 cm útiles, talla M.",
    precio: 20,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "vibrador-sex-angel",
    categoria: "Vibradores",
    nombre: "Vibrador Sex Angel",
    resumen: "Silicona ultra suave y ABS, motor potente y varias velocidades. Carga por USB.",
    precio: 20,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "rosa-succion-doble",
    categoria: "Vibradores",
    nombre: "Rosa Succión Doble",
    resumen: "Diseño de rosa con doble función y ondas de pulso. Silicona suave y recargable.",
    precio: 35,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "vibrador-bam-bam",
    categoria: "Vibradores",
    nombre: "Vibrador Bam Bam",
    resumen: "Modelo de gran tamaño (aprox. 21 cm) con funcionamiento a pila. Fabricado en silicona.",
    precio: 16,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "vibrador-realista",
    categoria: "Vibradores",
    nombre: "Vibrador Realista",
    resumen: "Forma anatómica, 10 modos de vibración, silicona médica y control. Recargable por USB.",
    precio: 50,
    precio_desde: false,
    imagen: "imagenes/productos/vibrador-realista.webp"
  },
  {
    id: "vibrador-realista-con-lengua",
    categoria: "Vibradores",
    nombre: "Vibrador Realista con Lengua",
    resumen: "Silicona médica texturizada con punta flexible y motor interno. Varios ritmos de movimiento.",
    precio: 50,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "vibrador-con-aleteo",
    categoria: "Vibradores",
    nombre: "Vibrador con Aleteo",
    resumen: "Punta de silicona flexible con movimiento independiente. Varios ritmos y carga por USB.",
    precio: 55,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "dildo-fotoluminiscente",
    categoria: "Dildos",
    nombre: "Dildo Fotoluminiscente",
    resumen: "Silicona con pigmentos que brillan en la oscuridad. Carga la luz ambiental y es fácil de limpiar.",
    precio: 12,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "vibrador-con-estimulador-de-clitoris",
    categoria: "Vibradores",
    nombre: "Vibrador con Estimulador de Clítoris",
    resumen: "Doble función con eje y cabezal externo. Silicona suave y recargable.",
    precio: 18,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "vibrador-lapiz-labial",
    categoria: "Vibradores",
    nombre: "Vibrador Lápiz Labial",
    resumen: "Diseño compacto de 8 a 12 cm que imita un cosmético. Cabe en la cartera o cosmetiquera.",
    precio: 18,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "huevo-vibrador-con-succionador",
    categoria: "Vibradores",
    nombre: "Huevo Vibrador con Succionador",
    resumen: "Conjunto de dos piezas con control remoto. Silicona suave y recargable.",
    precio: 18,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "vibrador-anal-con-luz",
    categoria: "Plugs anales",
    nombre: "Vibrador Anal con Luz",
    resumen: "Silicona ergonómica con luces LED y control remoto. Base ancha de seguridad.",
    precio: 25,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "vagina-realista",
    categoria: "Accesorios masculinos",
    nombre: "Vagina Realista",
    resumen: "Accesorio de textura suave y temperatura agradable. Consultar presentación.",
    precio: 8,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "masturbador-melocoton-masculino",
    categoria: "Accesorios masculinos",
    nombre: "Masturbador Melocotón Masculino",
    resumen: "Accesorio compacto con textura interna suave y diseño discreto. Consultar presentación.",
    precio: 10,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "vibrador-pais-a-pais",
    categoria: "Vibradores",
    nombre: "Vibrador País a País",
    resumen: "Control remoto por aplicación móvil, sin importar la distancia. Recargable.",
    precio: 18,
    precio_desde: false,
    imagen: "imagenes/productos/vibrador-pais-a-pais.webp"
  },
  {
    id: "anillo-retardante",
    categoria: "Accesorios masculinos",
    nombre: "Anillo Retardante",
    resumen: "Anillo de silicona elástica para colocar en la base. Consultar presentación.",
    precio: 6,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "cubiertas-de-pezones",
    categoria: "Accesorios",
    nombre: "Cubiertas de Pezones",
    resumen: "Adhesivos que dejan un acabado liso bajo la ropa. Brillan en la oscuridad.",
    precio: 2,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "juego-jenga-posiciones-sexuales",
    categoria: "Juegos",
    nombre: "Juego Jenga Posiciones Sexuales",
    resumen: "Juego de torre con bloques de madera y retos impresos. Para dos personas.",
    precio: 30,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "anestesia-anal",
    categoria: "Lubricantes y geles",
    nombre: "Anestesia Anal",
    resumen: "Gel con efecto frío o calor y presentación neutra. Consultar presentación y modo de uso.",
    precio: 2.5,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "lenceria-comestible",
    categoria: "Comestibles",
    nombre: "Lencería Comestible",
    resumen: "Lencería de confitería con forma de prenda. Consultar sabores y presentación.",
    precio: 15,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "gomitas-viking",
    categoria: "Suplementos",
    nombre: "Gomitas Viking",
    resumen: "Gomitas con extractos naturales. Presentación de 24 unidades. Consultar prospecto.",
    precio: 8,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "power-sex-vi-king",
    categoria: "Suplementos",
    nombre: "Power Sex Vi King",
    resumen: "Presentación de 6 sobres con 4 tabletas cada uno. Consultar prospecto.",
    precio: 8,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "perfume-feromonas-caballero",
    categoria: "Perfumes",
    nombre: "Perfume con Feromonas Caballero",
    resumen: "Fragancia masculina de 40 ml. Aplicar en puntos de pulso.",
    precio: 20,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "perfume-feromonas-dama",
    categoria: "Perfumes",
    nombre: "Perfume con Feromonas Dama",
    resumen: "Fragancia femenina de 40 ml. Aplicar en puntos de pulso.",
    precio: 20,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "spray-oral-garganta-profunda",
    categoria: "Lubricantes y geles",
    nombre: "Spray Oral Garganta Profunda",
    resumen: "Spray desensibilizante de uso tópico. Consultar presentación y modo de uso.",
    precio: 23,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "lubricante-sexo-oral",
    categoria: "Lubricantes y geles",
    nombre: "Lubricante Sexo Oral",
    resumen: "Gel comestible a base de agua con sabores frutales. Sin azúcar.",
    precio: 4,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "anillo-vibrador-con-estimulador",
    categoria: "Accesorios masculinos",
    nombre: "Anillo Vibrador con Estimulador",
    resumen: "Anillo flexible con vibración y doble uso. Silicona suave y recargable.",
    precio: 7,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "plug-anal-iniciador",
    categoria: "Plugs anales",
    nombre: "Plug Anal Iniciador",
    resumen: "Silicona talla S, punta cónica y base segura. Aproximadamente 6 a 7 cm.",
    precio: 7,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "plug-anal-talla-m",
    categoria: "Plugs anales",
    nombre: "Plug Anal Talla M",
    resumen: "Silicona talla M con base ergonómica. Aproximadamente 8 a 9,5 cm útiles.",
    precio: 8,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "plug-anal-con-abertura-dedo",
    categoria: "Plugs anales",
    nombre: "Plug Anal con Abertura Dedo",
    resumen: "Silicona con canal central abierto y diseño cónico. Base segura.",
    precio: 7,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "plug-anal-colita-de-gato-talla-s",
    categoria: "Plugs anales",
    nombre: "Plug Anal Colita de Gato Talla S",
    resumen: "Silicona talla S con accesorio de felpa intercambiable. Base desenroscable.",
    precio: 10,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "plug-anal-colita-de-zorrillo-talla-s",
    categoria: "Plugs anales",
    nombre: "Plug Anal Colita de Zorrillo Talla S",
    resumen: "Base metálica con accesorio de felpa sintética. Talla S.",
    precio: 9,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "lubricante-kailin-fresa",
    categoria: "Lubricantes y geles",
    nombre: "Lubricante Kailin Fresa",
    resumen: "Gel comestible a base de agua, sabor fresa, 30 ml. Compatible con preservativos.",
    precio: 7,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "lubricante-kailin-chicle",
    categoria: "Lubricantes y geles",
    nombre: "Lubricante Kailin Chicle",
    resumen: "Gel comestible a base de agua, sabor chicle, 30 ml. No mancha la ropa.",
    precio: 7,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "lubricante-kailin-limon",
    categoria: "Lubricantes y geles",
    nombre: "Lubricante Kailin Limón",
    resumen: "Gel comestible a base de agua, sabor limón, 30 ml. Textura densa y aroma fresco.",
    precio: 7,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "lubricante-cokelife",
    categoria: "Lubricantes y geles",
    nombre: "Lubricante Cokelife",
    resumen: "Gel a base de agua, soluble y de fácil lavado. Ideal para jacuzzi.",
    precio: 1.5,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "lubricante-imitacion-del-semen",
    categoria: "Lubricantes y geles",
    nombre: "Lubricante Imitación del Semen",
    resumen: "Gel de textura densa y tono blanco semitransparente. Presentación pequeña.",
    precio: 1.5,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "estrechante-vaginal",
    categoria: "Lubricantes y geles",
    nombre: "Estrechante Vaginal",
    resumen: "Gel de uso íntimo de efecto temporal. Consultar presentación y modo de uso.",
    precio: 6,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "multiorgasmico-sobre",
    categoria: "Lubricantes y geles",
    nombre: "Multiorgásmico Sobre",
    resumen: "Gel hidratante de uso tópico. Sobre de 8 g. Consultar modo de uso.",
    precio: 1.5,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "lubricantes-con-olor",
    categoria: "Lubricantes y geles",
    nombre: "Lubricantes con Olor",
    resumen: "Gel a base de agua, seguro con preservativos y fácil de limpiar.",
    precio: 1,
    precio_desde: false,
    imagen: "imagenes/productos/lubricantes-con-olor.webp"
  },
  {
    id: "anillo-de-gomitas-para-pene",
    categoria: "Comestibles",
    nombre: "Anillo de Gomitas para Pene",
    resumen: "Anillos de caramelo elástico saborizado. Consultar sabores.",
    precio: 12,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "caramelos-explosivos",
    categoria: "Comestibles",
    nombre: "Caramelos Explosivos",
    resumen: "Cristales de azúcar efervescentes con efecto burbujeante. Consultar sabores.",
    precio: 2,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "lubricante-comestible",
    categoria: "Lubricantes y geles",
    nombre: "Lubricante Comestible",
    resumen: "Gel saborizado a base de agua, sin azúcares ni parabenos. Compatible con látex.",
    precio: 8,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "retardante",
    categoria: "Lubricantes y geles",
    nombre: "Retardante",
    resumen: "Spray tópico de 12 ml. Consultar modo de uso y tiempo de espera.",
    precio: 15,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "multiorgasmico-cokelife",
    categoria: "Lubricantes y geles",
    nombre: "Multiorgásmico Cokelife",
    resumen: "Gel tópico con efecto calor y fresco. Consultar presentación.",
    precio: 10,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "esposas",
    categoria: "Bondage y BDSM",
    nombre: "Esposas",
    resumen: "Accesorio de felpa con estructura interna. Cierre ajustable, ideal para principiantes.",
    precio: 8,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "kit-sado-animal-print",
    categoria: "Bondage y BDSM",
    nombre: "Kit Sado Animal Print",
    resumen: "Conjunto de accesorios con estampado animal. Incluye varias piezas; consultar contenido.",
    precio: 25,
    precio_desde: false,
    imagen: "imagenes/productos/kit-sado-animal-print.webp"
  },
  {
    id: "kit-sado-rojo-y-rosado",
    categoria: "Bondage y BDSM",
    nombre: "Kit Sado Rojo y Rosado",
    resumen: "Conjunto de accesorios en rojo y rosado. Consultar piezas incluidas.",
    precio: 15,
    precio_desde: false,
    imagen: "imagenes/productos/kit-sado-rojo-y-rosado.webp"
  },
  {
    id: "kit-sado-negro-con-colores",
    categoria: "Bondage y BDSM",
    nombre: "Kit Sado Negro con Colores",
    resumen: "Conjunto de accesorios negros con detalles de color. Consultar piezas incluidas.",
    precio: 10,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "columpio",
    categoria: "Bondage y BDSM",
    nombre: "Columpio",
    resumen: "Columpio de puerta con correas acolchadas. No requiere perforaciones.",
    precio: 30,
    precio_desde: false,
    imagen: ""
  },
  {
    id: "dados-rojos",
    categoria: "Juegos",
    nombre: "Dados Rojos",
    resumen: "Par de dados para juegos de pareja. Consultar contenido.",
    precio: 6,
    precio_desde: false,
    imagen: "imagenes/productos/dados-rojos.webp"
  },
  {
    id: "dados-posiciones",
    categoria: "Juegos",
    nombre: "Dados Posiciones",
    resumen: "Par de dados para juegos de pareja. Consultar contenido.",
    precio: 5,
    precio_desde: false,
    imagen: "imagenes/productos/dados-posiciones-1.webp",
    imagenes: [
      "imagenes/productos/dados-posiciones-2.webp",
      "imagenes/productos/dados-posiciones-3.webp"
    ]
  },
  {
    id: "lenceria-boddys",
    categoria: "Lencería",
    nombre: "Lencería Boddys",
    resumen: "Body de lencería. Consultar tallas y colores disponibles.",
    precio: 10,
    precio_desde: false,
    tallas: ["S", "M", "L", "XL"],
    imagen: ""
  },
  {
    id: "lenceria-baby-dolls",
    categoria: "Lencería",
    nombre: "Lencería Baby Dolls",
    resumen: "Baby doll de lencería. Consultar tallas y colores disponibles.",
    precio: 10,
    precio_desde: false,
    tallas: ["S", "M", "L", "XL"],
    imagen: ""
  },
  {
    id: "lenceria-trikinis",
    categoria: "Lencería",
    nombre: "Lencería Trikinis",
    resumen: "Trikini de lencería. Consultar tallas y colores disponibles.",
    precio: 7,
    precio_desde: true,
    tallas: ["S", "M", "L", "XL"],
    imagen: ""
  },
  {
    id: "lenceria-dos-piezas",
    categoria: "Lencería",
    nombre: "Lencería Dos Piezas",
    resumen: "Conjunto de dos piezas. Consultar tallas y colores disponibles.",
    precio: 10,
    precio_desde: false,
    tallas: ["S", "M", "L", "XL"],
    imagen: ""
  },
  {
    id: "lenceria-tematica",
    categoria: "Lencería",
    nombre: "Lencería Temática",
    resumen: "Lencería temática. Consultar tallas, colores y diseño disponible.",
    precio: 12,
    precio_desde: true,
    tallas: ["S", "M", "L", "XL"],
    imagen: ""
  },
  {
    id: "pijamas-sexys",
    categoria: "Lencería",
    nombre: "Pijamas Sexys",
    resumen: "Pijama de satén con detalles de encaje. Consultar tallas y colores disponibles.",
    precio: 4,
    precio_desde: false,
    tallas: ["S", "M", "L", "XL"],
    imagen: ""
  }
];
