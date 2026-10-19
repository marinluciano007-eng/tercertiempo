import { createFileRoute, Link } from "@tanstack/react-router";
import { Utensils, ShoppingBag, Truck, Sun, Wifi, Accessibility } from "lucide-react";
import heroBrasas from "@/assets/hero-brasas.jpg";
import matambre from "@/assets/matambre.jpg";
import provoleta from "@/assets/provoleta.jpg";
import { CRITICAL_REVIEW, REVIEWS, RESTAURANT, SERVICES } from "@/data/restaurant";
import { PageHero, Reveal } from "@/components/site";

export const Route = createFileRoute("/restaurante")({
  head: () => ({
    meta: [
      { title: "El restaurante — Tercer Tiempo, Monte Castro" },
      { name: "description", content: "Conocé Tercer Tiempo: parrilla argentina de ambiente familiar en Bermúdez y Lascano, Monte Castro. Salón, mesas afuera y servicios." },
      { property: "og:title", content: "El restaurante — Tercer Tiempo" },
      { property: "og:description", content: "Una parrilla de barrio para reunirse y compartir en Monte Castro." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/restaurante" },
    ],
    links: [{ rel: "canonical", href: "/restaurante" }],
  }),
  component: Restaurante,
});

const GALLERY = [
  { src: heroBrasas, alt: "Carnes a la brasa sobre la parrilla", cls: "row-span-2" },
  { src: matambre, alt: "Matambre a la pizza", cls: "col-span-2" },
  { src: provoleta, alt: "Provoleta", cls: "" },
  { src: matambre, alt: "Matambre", cls: "" },
  { src: provoleta, alt: "Provoleta servida", cls: "" },
  { src: heroBrasas, alt: "Parrilla encendida", cls: "col-span-2" },
];

function Restaurante() {
  return (
    <>
      <PageHero eyebrow="El restaurante" title="Una parrilla de barrio para compartir" subtitle="En la esquina de Bermúdez, en Monte Castro, te esperamos con la parrilla encendida." image={heroBrasas} alt="Carnes a la brasa sobre la parrilla" />

      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-28 md:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Nuestra manera</p>
          <h2 className="mt-4 text-5xl leading-none text-ivory">Buena comida, buena atención y tiempo para la sobremesa.</h2>
        </Reveal>
        <Reveal delay={150} className="space-y-6 text-lg leading-relaxed text-cream/75">
          <p>En Tercer Tiempo la parrilla está encendida todos los días: cortes al punto, parrilladas para compartir y acompañamientos caseros. Servimos porciones abundantes, con los clásicos que siempre se piden en una parrilla argentina.</p>
          <p>La atención es cercana y sin apuros. Queremos que te sientes, comas tranquilo y tengas tiempo para la sobremesa. Esa es la mesa que conocemos: la de siempre, la de barrio.</p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-28">
        <div className="grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4">
          {GALLERY.map((g) => (
            <Reveal key={g.alt} className={`overflow-hidden ${g.cls}`}>
              <img src={g.src} alt={g.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-xs text-stone">Fotos del restaurante y sus platos.</p>
      </section>

      <section className="bg-deep py-24">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal>
            <p className="eyebrow">La experiencia</p>
            <h2 className="mt-4 text-5xl text-ivory">Como te quede mejor</h2>
          </Reveal>
          <div className="mt-14 grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => {
              const SERVICE_ICONS = [Utensils, ShoppingBag, Truck, Sun, Wifi, Accessibility];
              const I = SERVICE_ICONS[i];
              return (
                <Reveal key={s.title} delay={(i % 3) * 100} className="border-r border-b border-border p-8 transition-colors hover:bg-card">
                  <I size={22} strokeWidth={1.4} className="text-gold" />
                  <h3 className="mt-6 text-2xl text-ivory">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-6 text-xs text-stone">Consultá disponibilidad, condiciones y detalles directamente con el restaurante.</p>
        </div>
      </section>

      <section id="opiniones" className="mx-auto max-w-5xl scroll-mt-28 px-5 py-28">
        <p className="eyebrow">Opiniones</p>
        <h2 className="mt-4 text-5xl text-ivory">Lo que cuentan quienes vinieron</h2>
        <p className="mt-4 text-sm text-cream/70">Calificación informada: {RESTAURANT.rating.value}/5 en {RESTAURANT.rating.count} reseñas (dato histórico, puede variar).</p>
        <div className="mt-10 space-y-6">
          {REVIEWS.map((r, i) => (
            <figure key={i} className="border-l-2 border-gold py-2 pl-6">
              <blockquote className="font-display text-2xl text-ivory">"{r}"</blockquote>
              <figcaption className="mt-2 text-xs tracking-[0.2em] text-stone uppercase">Fuente: Restaurant Guru</figcaption>
            </figure>
          ))}
          <figure className="border-l-2 border-stone py-2 pl-6">
            <blockquote className="font-display text-2xl text-cream/80">"{CRITICAL_REVIEW}"</blockquote>
            <figcaption className="mt-2 text-xs tracking-[0.2em] text-stone uppercase">Fuente: Restaurant Guru (crítica)</figcaption>
          </figure>
        </div>
        <p className="mt-6 text-sm text-stone">Podés leer todas las reseñas, incluidas las críticas, en Restaurant Guru.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/reservas" className="btn btn-primary">Reservar mesa</Link>
          <Link to="/carta" className="btn btn-ghost">Ver la carta</Link>
        </div>
      </section>
    </>
  );
}
