import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { RESTAURANT } from "@/data/restaurant";

export const Route = createFileRoute("/reservas")({
  head: () => ({
    meta: [
      { title: "Reservas — Tercer Tiempo, parrilla en Monte Castro" },
      { name: "description", content: "Reservá tu mesa en Tercer Tiempo por teléfono." },
      { property: "og:title", content: "Reservá tu mesa — Tercer Tiempo" },
      { property: "og:description", content: "Llamanos para consultar disponibilidad y reservar tu mesa." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/reservas" },
    ],
    links: [{ rel: "canonical", href: "/reservas" }],
  }),
  component: Reservas,
});

function Reservas() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-24 text-center">
      <p className="eyebrow">Reservas</p>
      <h1 className="mt-5 text-6xl leading-none text-ivory md:text-7xl">Reservá tu mesa</h1>
      <p className="mx-auto mt-6 max-w-lg text-lg text-cream/75">
        Llamanos para consultar disponibilidad y reservar tu mesa. Estamos listos para atenderte.
      </p>

      <div className="mx-auto mt-16 max-w-lg">
        <div className="border border-border bg-card p-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/20">
              <Phone size={32} className="text-gold" />
            </div>
          </div>
          <h2 className="text-2xl text-ivory">Llamada telefónica</h2>
          <p className="mt-3 text-sm text-cream/70">
            Llamanos directamente para consultar disponibilidad y reservar tu mesa.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            {RESTAURANT.phones.map((p) => (
              <a
                key={p.tel}
                href={`tel:${p.tel}`}
                className="btn btn-primary w-full justify-center gap-2"
              >
                <Phone size={16} /> {p.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
