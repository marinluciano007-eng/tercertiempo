import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Navigation } from "lucide-react";
import heroBrasas from "@/assets/hero-brasas.jpg";
import { RESTAURANT } from "@/data/restaurant";
import { HoursTable, PageHero, PhoneButtons } from "@/components/site";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto y ubicación — Tercer Tiempo, Monte Castro" },
      { name: "description", content: "Bermúdez 1995-1999, Monte Castro, CABA. Teléfonos 011 4509-0502 y 011 4648-3573. Horarios y cómo llegar." },
      { property: "og:title", content: "Estamos en Monte Castro — Tercer Tiempo" },
      { property: "og:description", content: "Dirección, teléfonos, horarios y mapa de Parrilla Tercer Tiempo." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contacto" },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: Contacto,
});

function Contacto() {
  return (
    <>
      <PageHero eyebrow="Contacto" title="Estamos en Monte Castro" subtitle="Encontranos en Bermúdez, Ciudad de Buenos Aires." image={heroBrasas} alt="Carnes a la brasa sobre la parrilla" />
      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-24 md:grid-cols-2">
        <div className="space-y-12">
          <div>
            <p className="eyebrow">Dirección</p>
            <p className="mt-3 font-display text-3xl text-ivory">{RESTAURANT.address}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={RESTAURANT.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><Navigation size={15} /> Cómo llegar</a>
              <a href={RESTAURANT.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><MapPin size={15} /> Ver en Google Maps</a>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-4">Teléfonos</p>
            <PhoneButtons />
          </div>
          <div>
            <p className="eyebrow mb-4">Redes</p>
            <div className="flex flex-wrap gap-3">
              <a href={RESTAURANT.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><Instagram size={15} /> @tercertiempo.ok</a>
              <a href={RESTAURANT.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><Facebook size={15} /> Facebook</a>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-4">Horarios</p>
            <HoursTable />
          </div>
        </div>
        <div className="min-h-[420px]">
          <iframe
            title="Mapa: Bermúdez 1995, Monte Castro"
            src={RESTAURANT.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="photo-frame h-full min-h-[420px] w-full grayscale-[60%]"
          />
          <p className="mt-4 text-xs text-stone">El mapa muestra la ubicación según la dirección informada.</p>
        </div>
      </section>
    </>
  );
}
