import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Users, Home, MapPin, Phone } from "lucide-react";
import hero from "@/assets/hero-brasas.jpg";
import provoleta from "@/assets/provoleta.jpg";
import matambre from "@/assets/matambre.jpg";
import milanesa from "@/assets/milanesa.jpg";
import entrana from "@/assets/entrana.jpg";
import sorrentinos from "@/assets/sorrentinos.jpg";
import { Reveal, HoursTable } from "@/components/site";
import { RESTAURANT, FEATURED_DISHES, DISH_IMAGES } from "@/data/restaurant";

const IMAGE_MAP: Record<string, string> = {
  provoleta,
  "hero-brasas": hero,
  matambre,
  milanesa,
  entrana,
  sorrentinos,
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tercer Tiempo — Parrilla argentina en Monte Castro, Buenos Aires" },
      { name: "description", content: "Carnes a la brasa, parrilladas para compartir y clásicos argentinos en Bermúdez 1995, Monte Castro. Reservá tu mesa o llamanos." },
      { property: "og:title", content: "Tercer Tiempo — Parrilla argentina en Monte Castro" },
      { property: "og:description", content: "Carnes a la brasa, platos generosos y ambiente familiar en Monte Castro, Buenos Aires." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate -mt-[73px] flex min-h-[92vh] items-end overflow-hidden pt-[73px]">
        <img src={hero} alt="Carnes a la brasa sobre la parrilla" width={1920} height={1088} className="animate-photo absolute inset-0 -z-10 h-full w-full object-cover object-right" />
        <div className="bg-hero-overlay absolute inset-0 -z-10" />
        <div className="bg-fade absolute inset-x-0 bottom-0 -z-10 h-40" />
        <div className="mx-auto w-full max-w-7xl px-5 pb-24 md:pb-32">
          <p className="eyebrow animate-rise">Parrilla argentina · Monte Castro</p>
          <h1 className="animate-rise mt-6 max-w-4xl text-6xl leading-[0.9] text-ivory md:text-8xl" style={{ animationDelay: "120ms" }}>
            El sabor de la parrilla.<br /><em className="text-gold">La mesa argentina.</em>
          </h1>
          <p className="animate-rise mt-8 max-w-lg text-lg text-cream/80" style={{ animationDelay: "240ms" }}>
            Carnes a la brasa, platos abundantes y la tradición de comer bien en Monte Castro.
          </p>
          <div className="animate-rise mt-10 flex flex-wrap gap-3" style={{ animationDelay: "360ms" }}>
            <Link to="/reservas" className="btn btn-primary">Reservar mesa</Link>
            <Link to="/carta" className="btn btn-ghost">Descubrir la carta</Link>
          </div>
          <p className="animate-rise mt-10 flex items-center gap-2 text-xs tracking-[0.2em] text-stone uppercase" style={{ animationDelay: "480ms" }}>
            <MapPin size={14} /> {RESTAURANT.addressShort}
          </p>
        </div>
        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex" aria-hidden>
          <span className="text-[0.6rem] tracking-[0.3em] text-stone uppercase">Scroll</span>
          <span className="animate-ember h-10 w-px bg-gold" />
        </div>
      </section>

      {/* ATRIBUTOS */}
      <section className="border-y border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          {[
            [Flame, "Parrilla argentina"],
            [Users, "Platos para compartir"],
            [Home, "Ambiente familiar"],
            [MapPin, "Monte Castro, Buenos Aires"],
          ].map(([Icon, label], i) => {
            const I = Icon as typeof Flame;
            return (
              <div key={i} className="flex items-center gap-3 border-border px-5 py-7 odd:border-r md:border-r md:last:border-r-0">
                <I size={18} className="shrink-0 text-ember" strokeWidth={1.5} />
                <span className="text-xs font-semibold tracking-[0.16em] text-cream/85 uppercase">{label as string}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* IDENTIDAD */}
      <section className="mx-auto grid max-w-7xl items-center gap-16 px-5 py-28 md:grid-cols-12">
        <Reveal className="relative md:col-span-6">
          <img src={hero} alt="Carnes a la brasa sobre la parrilla" loading="lazy" className="photo-frame aspect-[4/3] w-full object-cover" />
          <img src={provoleta} alt="Provoleta servida" loading="lazy" className="photo-frame absolute -right-4 -bottom-12 hidden aspect-square w-44 object-cover md:block" />
        </Reveal>
        <Reveal className="md:col-span-5 md:col-start-8" delay={150}>
          <p className="eyebrow">Nuestra propuesta</p>
          <div className="rule-gold my-6" />
          <h2 className="text-5xl leading-none text-ivory md:text-6xl">Una mesa para comer bien.</h2>
          <p className="mt-8 text-lg leading-relaxed text-cream/75">
            Tercer Tiempo es una parrilla de barrio donde sirven platos abundantes, carnes a la brasa y los clásicos de siempre. Un lugar para comer tranquilo, sin apuros.
          </p>
          <Link to="/restaurante" className="btn btn-ghost mt-10">Conocé el restaurante</Link>
        </Reveal>
      </section>

      {/* PARRILLA Y CLÁSICOS */}
      <section className="bg-deep py-28">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal>
            <p className="eyebrow">Clásicos destacados</p>
            <h2 className="mt-5 text-5xl leading-none text-ivory md:text-7xl">La parrilla, lo nuestro</h2>
            <p className="mt-8 text-lg text-cream/80">En Tercer Tiempo, la parrilla es protagonista: cortes de carne a la brasa, parrilladas para compartir, acompañamientos caseros y esos sabores clásicos que nunca fallan. Pero nuestra cocina va mucho más allá del fuego: también vas a encontrar pizzas, pastas y una variedad de platos para todos los gustos. Porque siempre hay una buena opción para disfrutar, ya sea en familia, con amigos o simplemente para darse un gusto.</p>
          </Reveal>

          <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_DISHES.map((d, i) => (
              <Reveal key={d.name} delay={(i % 3) * 120} className={i % 3 === 1 ? "lg:mt-12" : ""}>
                <Link to="/carta" className="group block">
                  <div className="overflow-hidden">
                    <img
                      src={IMAGE_MAP[DISH_IMAGES[d.name]]}
                      alt={d.name}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-5 text-[0.65rem] tracking-[0.25em] text-stone uppercase">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-2xl leading-tight text-ivory transition-colors group-hover:text-gold">{d.name}</h3>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/carta" className="btn btn-primary">Ver carta completa</Link>
          </div>
        </div>
      </section>

      {/* HORARIOS */}
      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-28 md:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Horarios</p>
          <h2 className="mt-4 text-5xl leading-none text-ivory md:text-6xl">Encontranos en Monte Castro</h2>
          <p className="mt-6 text-cream/75">{RESTAURANT.address}</p>
          <div className="mt-8 min-h-[300px]">
            <iframe
              title="Mapa: Bermúdez 1995, Monte Castro"
              src={RESTAURANT.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="photo-frame h-full min-h-[300px] w-full grayscale-[60%]"
            />
          </div>
        </Reveal>
        <Reveal delay={150}>
          <HoursTable />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contacto" className="btn btn-primary">Contacto</Link>
            <a href={RESTAURANT.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">Cómo llegar</a>
          </div>
        </Reveal>
      </section>

      {/* CTA FINAL */}
      <section className="bg-bordo-gradient grain">
        <div className="mx-auto max-w-4xl px-5 py-28 text-center">
          <Reveal>
            <p className="eyebrow">Reservas</p>
            <h2 className="mt-5 text-5xl text-ivory md:text-7xl">Tu próxima mesa te espera</h2>
            <p className="mx-auto mt-6 max-w-md text-lg text-cream/85">Reservá tu mesa por teléfono y preparate para disfrutar de una buena comida en Tercer Tiempo.</p>
            <div className="mt-10 flex justify-center">
              <a href={`tel:${RESTAURANT.phones[0].tel}`} className="btn btn-ghost"><Phone size={15} /> Llamar al restaurante</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
