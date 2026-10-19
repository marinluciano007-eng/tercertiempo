import { HOURS, RESTAURANT } from "@/data/restaurant";

export type ReservaInput = {
  nombre: string;
  telefono: string;
  fecha: string; // YYYY-MM-DD
  turno: string;
  personas: string;
  comentarios: string;
};

export type ReservaErrors = Partial<Record<keyof ReservaInput, string>>;

export function dayOfWeek(fecha: string): number {
  const [y, m, d] = fecha.split("-").map(Number);
  return new Date(y, m - 1, d).getDay();
}

export function isClosedDay(fecha: string): boolean {
  if (!fecha) return false;
  return HOURS[dayOfWeek(fecha)].shifts.length === 0;
}

export function shiftOptions(fecha: string): string[] {
  if (!fecha) return [];
  return HOURS[dayOfWeek(fecha)].shifts.map(
    (s, i) => `${i === 0 ? "Almuerzo" : "Cena"} (${s.open} – ${s.close})`,
  );
}

export function todayISO(now = new Date()): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}`;
}

export function validateReserva(v: ReservaInput, today = todayISO()): ReservaErrors {
  const e: ReservaErrors = {};
  if (!v.nombre.trim()) e.nombre = "Ingresá tu nombre.";
  const digits = v.telefono.replace(/\D/g, "");
  if (!v.telefono.trim()) e.telefono = "Ingresá un teléfono de contacto.";
  else if (digits.length < 8 || digits.length > 15) e.telefono = "Revisá el teléfono: debe tener entre 8 y 15 números.";
  if (!v.fecha) e.fecha = "Elegí una fecha.";
  else if (v.fecha < today) e.fecha = "La fecha no puede ser anterior a hoy.";
  else if (isClosedDay(v.fecha)) e.fecha = "Ese día el restaurante figura como cerrado (martes). Elegí otra fecha.";
  if (v.fecha && !isClosedDay(v.fecha) && !v.turno) e.turno = "Elegí un turno.";
  const n = Number(v.personas);
  if (!v.personas) e.personas = "Indicá cuántas personas vienen.";
  else if (!Number.isInteger(n) || n < 1 || n > 40) e.personas = "Indicá una cantidad entre 1 y 40.";
  return e;
}

export function buildSummary(v: ReservaInput): string {
  const [y, m, d] = v.fecha.split("-");
  const lines = [
    `Solicitud de reserva — ${RESTAURANT.shortName}`,
    `Nombre: ${v.nombre.trim()}`,
    `Teléfono: ${v.telefono.trim()}`,
    `Fecha: ${HOURS[dayOfWeek(v.fecha)].day} ${d}/${m}/${y}`,
    `Turno: ${v.turno}`,
    `Personas: ${v.personas}`,
  ];
  if (v.comentarios.trim()) lines.push(`Comentarios: ${v.comentarios.trim()}`);
  return lines.join("\n");
}

export function buildWhatsAppMessage(v: ReservaInput): string {
  const [y, m, d] = v.fecha.split("-");
  const lines = [
    `Hola, quiero consultar disponibilidad para una reserva en ${RESTAURANT.shortName}`,
    ``,
    `📅 Fecha: ${HOURS[dayOfWeek(v.fecha)].day} ${d}/${m}/${y}`,
    `🕐 Turno: ${v.turno}`,
    `👥 Personas: ${v.personas}`,
    `👤 Nombre: ${v.nombre.trim()}`,
    `📞 Teléfono: ${v.telefono.trim()}`,
  ];
  if (v.comentarios.trim()) lines.push(`📝 Comentarios: ${v.comentarios.trim()}`);
  return encodeURIComponent(lines.join("\n"));
}
