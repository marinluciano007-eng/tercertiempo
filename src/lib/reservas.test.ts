import { describe, it, expect } from "vitest";
import { validateReserva, isClosedDay, shiftOptions } from "./reservas";

const base = { nombre: "Ana", telefono: "11 4509 0502", fecha: "2026-10-21", turno: "Cena (19:30 – 23:30)", personas: "4", comentarios: "" };

describe("reservas", () => {
  it("martes figura cerrado", () => {
    expect(isClosedDay("2026-10-20")).toBe(true);
    expect(validateReserva({ ...base, fecha: "2026-10-20" }, "2026-10-17").fecha).toBeTruthy();
  });
  it("no acepta fechas pasadas", () => {
    expect(validateReserva({ ...base, fecha: "2026-10-16" }, "2026-10-17").fecha).toBeTruthy();
  });
  it("sábado ofrece almuerzo hasta 16:00", () => {
    expect(shiftOptions("2026-10-17")[0]).toContain("16:00");
  });
  it("domingo cena cierra 23:00", () => {
    expect(shiftOptions("2026-10-18")[1]).toContain("23:00");
  });
  it("datos válidos pasan", () => {
    expect(validateReserva(base, "2026-10-17")).toEqual({});
  });
});
