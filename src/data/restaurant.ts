// Fuente central de datos del restaurante. Editar acá actualiza toda la web.
export const RESTAURANT = {
  name: "Parrilla Restaurant Tercer Tiempo",
  shortName: "Tercer Tiempo",
  address: "Bermúdez 1995-1999, C1417, Ciudad Autónoma de Buenos Aires, Argentina",
  addressShort: "Bermúdez 1995-1999 · Buenos Aires",
  neighborhood: "Monte Castro",
  phones: [
    { label: "011 4509-0502", tel: "+541145090502" },
    { label: "011 4648-3573", tel: "+541146483573" },
  ],
  whatsapp: "541145090502",
  instagram: "https://www.instagram.com/tercertiempo.ok/",
  facebook: "https://www.facebook.com/parrillatercertiempo/",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Parrilla Tercer Tiempo, Bermúdez 1995, C1417 CABA, Argentina"),
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent("Bermúdez 1995, C1417 CABA, Argentina"),
  mapEmbed:
    "https://www.google.com/maps?q=" +
    encodeURIComponent("Bermúdez 1995, C1417 CABA, Argentina") +
    "&output=embed",
  rating: { value: "4,3", count: "más de 3.300" },
  priceRange: "ARS 20.000 – 30.000 por persona",
};

// Clásicos destacados - 6 platos seleccionados (misma presentación en Inicio y Carta)
export const FEATURED_DISHES = [
  { name: "Provoleta", category: "entradas" },
  { name: "Parrillada Mixta para 3 personas", category: "parrilla" },
  { name: "Matambre a la Pizza", category: "parrilla" },
  { name: "Milanesa Napolitana con Papas Fritas", category: "platos-cocina" },
  { name: "Entraña Gratinada con Papas Rústicas", category: "parrilla" },
  { name: "Sorrentinos de Jamón y Mozzarella con Salsa Cuatro Quesos", category: "platos-cocina" },
];

// Mapeo de imágenes para destacados (usar en Inicio y Carta)
export const DISH_IMAGES: Record<string, string> = {
  "Provoleta": "provoleta",
  "Parrillada Mixta para 3 personas": "hero-brasas",
  "Parrillada Mixta para 4 personas": "hero-brasas",
  "Matambre a la Pizza": "matambre",
  "Milanesa Napolitana con Papas Fritas": "milanesa",
  "Entraña Gratinada con Papas Rústicas": "entrana",
  "Sorrentinos de Jamón y Mozzarella con Salsa Cuatro Quesos": "sorrentinos",
};

export type Shift = { open: string; close: string };
export type DayHours = { day: string; short: string; shifts: Shift[] };

// Índice según Date.getDay(): 0 = domingo
export const HOURS: DayHours[] = [
  { day: "Domingo", short: "Dom", shifts: [{ open: "12:00", close: "16:00" }, { open: "19:30", close: "23:00" }] },
  { day: "Lunes", short: "Lun", shifts: [{ open: "12:00", close: "15:30" }, { open: "19:30", close: "23:30" }] },
  { day: "Martes", short: "Mar", shifts: [] },
  { day: "Miércoles", short: "Mié", shifts: [{ open: "12:00", close: "15:30" }, { open: "19:30", close: "23:30" }] },
  { day: "Jueves", short: "Jue", shifts: [{ open: "12:00", close: "15:30" }, { open: "19:30", close: "23:30" }] },
  { day: "Viernes", short: "Vie", shifts: [{ open: "12:00", close: "15:30" }, { open: "19:30", close: "23:30" }] },
  { day: "Sábado", short: "Sáb", shifts: [{ open: "12:00", close: "16:00" }, { open: "19:30", close: "23:30" }] },
];

// Orden de lunes a domingo para mostrar
export const HOURS_DISPLAY = [1, 2, 3, 4, 5, 6, 0].map((i) => HOURS[i]);

export const SERVICES = [
  { title: "Comer en el restaurante", text: "Salón para disfrutar la mesa sin apuro." },
  { title: "Retiro en la puerta", text: "Consultá por teléfono para retirar tu pedido." },
  { title: "Entrega sin contacto", text: "Preguntá disponibilidad y modalidad vigente." },
  { title: "Mesas al aire libre", text: "Con calefacción en invierno." },
  { title: "Wi-Fi disponible", text: "Para quienes lo necesiten durante la visita." },
  { title: "Accesible en silla de ruedas", text: "Acceso adaptado según lo informado." },
];

export const REVIEWS = [
  "Excelente lugar. Muy ameno. Atención muy profesional y amable y el dueño, un fenómeno.",
  "Buena comida. Lindo ambiente. Excelente atención.",
];
export const CRITICAL_REVIEW =
  "Publicidad engañosa dicen que es con efectivo transferencia y débito y acá las promociones no las hacen valer, solo te aceptan efectivo, aún mostrándole las fotos que publican ellos en Instagram.";

export type MenuCategory = { id: string; title: string; items: string[] };

export const MENU: MenuCategory[] = [
  { id: "entradas", title: "Entradas", items: ["Provoleta", "Empanadas", "Berenjenas al escabeche"] },
  {
    id: "parrilla",
    title: "Parrilla",
    items: [
      "Parrillada Mixta para 3 personas",
      "Parrillada Mixta para 4 personas",
      "Matambre a la Pizza",
      "Sándwich de Bondiola Completo",
      "Entraña Gratinada con Papas Rústicas",
    ],
  },
  {
    id: "platos-cocina",
    title: "Platos de cocina",
    items: [
      "Pechito de Pollo a la Pizzaiola con Papas al Grill",
      "Omelette Mixto con Ensalada",
      "Milanesitas Rellenas con Salsa Blanca y Papas al Grill",
      "Brochette de Pollo con Puré de Papas Aromatizado con Hierbas",
      "Milanesa Napolitana con Papas Fritas",
      "Filete de Merluza con Salsa de Puerros y Papas",
      "Canelones de Verdura y Pollo con Salsa Rossini",
      "Sorrentinos de Jamón y Mozzarella con Salsa Cuatro Quesos",
    ],
  },
  { id: "acompanamientos", title: "Acompañamientos", items: ["Papas Fritas", "Ensaladas", "Puré de Papas", "Papas al Grill"] },
  {
    id: "postres",
    title: "Postres",
    items: ["Flan Casero Mixto", "Panqueque de Manzana al Rhum con Helado", "Helados Artesanales"],
  },
  {
    id: "bebidas",
    title: "Bebidas e infusiones",
    items: ["Café Cortado", "Coca-Cola", "Agua mineral", "Aquarius"],
    // NOTA: Coca-Cola, Agua mineral y Aquarius son provisionales para demo.
    // Pendiente de confirmación con el restaurante antes de publicación comercial definitiva.
  },
];
