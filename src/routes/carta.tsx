import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import provoleta from "@/assets/provoleta.jpg";
import empanadas from "@/assets/empanadas.jpg";
import matambre from "@/assets/matambre.jpg";
import milanesa from "@/assets/milanesa.jpg";
import entrana from "@/assets/entrana.jpg";
import sorrentinos from "@/assets/sorrentinos.jpg";
import heroBrasas from "@/assets/hero-brasas.jpg";
import { MENU, RESTAURANT, FEATURED_DISHES, DISH_IMAGES } from "@/data/restaurant";
import { PageHero, PhoneButtons, Reveal } from "@/components/site";

const IMAGE_MAP: Record<string, string> = {
  provoleta,
  "hero-brasas": heroBrasas,
  matambre,
  milanesa,
  entrana,
  sorrentinos,
};

export const Route = createFileRoute("/carta")({
  head: () => ({
    meta: [
      { title: "Carta — Tercer Tiempo, parrilla en Monte Castro" },
      { name: "description", content: "Parrilladas, matambre a la pizza, milanesas, pastas y postres caseros. Conocé la carta de Tercer Tiempo en Monte Castro." },
      { property: "og:title", content: "Nuestra carta — Tercer Tiempo" },
      { property: "og:description", content: "Parrilla argentina, clásicos de siempre y platos para compartir." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/carta" },
    ],
    links: [{ rel: "canonical", href: "/carta" }],
  }),
  component: Carta,
});

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function Carta() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("todas");

  const filtered = useMemo(
    () =>
      MENU.filter((c) => cat === "todas" || cat === "destacados" || cat === c.id)
        .map((c) => {
          if (cat === "destacados") {
            const featuredInCategory = FEATURED_DISHES.filter((f) => f.category === c.id);
            return { ...c, items: featuredInCategory.map((f) => f.name).filter((i) => norm(i).includes(norm(q.trim()))) };
          }
          return { ...c, items: c.items.filter((i) => norm(i).includes(norm(q.trim()))) };
        })
        .filter((c) => c.items.length),
    [q, cat],
  );

  const showFeatured = cat === "todas" || cat === "destacados";
  const filteredFeatured = FEATURED_DISHES.filter((f) => norm(f.name).includes(norm(q.trim())));

  return (
    <>
      <PageHero eyebrow="La carta" title="Nuestra carta" subtitle="Parrilla argentina, clásicos de siempre y platos para compartir." image={heroBrasas} alt="Carnes a la brasa sobre la parrilla" />

      <div className="sticky top-[73px] z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div role="tablist" aria-label="Categorías" className="-mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
            {[{ id: "todas", title: "Todo" }, { id: "destacados", title: "Destacados" }, ...MENU].map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={cat === c.id}
                onClick={() => setCat(c.id)}
                className={`shrink-0 border px-4 py-2 text-xs font-semibold tracking-[0.14em] uppercase transition-colors ${
                  cat === c.id ? "border-gold bg-gold text-ink" : "border-border text-cream/80 hover:border-gold"
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 border border-border px-3 py-2 md:w-72">
            <Search size={15} className="text-stone" />
            <span className="sr-only">Buscar plato</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar un plato…" className="w-full bg-transparent text-sm text-cream placeholder:text-stone focus:outline-none" />
          </label>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-20">
        {filtered.length === 0 && filteredFeatured.length === 0 && (
          <div className="py-20 text-center" role="status">
            <p className="font-display text-3xl text-ivory">No encontramos platos con "{q}".</p>
            <button onClick={() => { setQ(""); setCat("todas"); }} className="btn btn-ghost mt-6">Ver toda la carta</button>
          </div>
        )}

        {showFeatured && filteredFeatured.length > 0 && (
          <>
            <p className="mb-6 text-sm font-semibold tracking-[0.2em] text-gold uppercase">Clásicos destacados</p>
            <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredFeatured.map((f) => (
                <Reveal key={f.name}>
                  <article className="group">
                    <div className="relative overflow-hidden">
                      <img
                        src={IMAGE_MAP[DISH_IMAGES[f.name]]}
                        alt={f.name}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="mt-3 text-xl leading-tight text-ivory">{f.name}</h3>
                  </article>
                </Reveal>
              ))}
            </div>
          </>
        )}

        {cat !== "destacados" && filtered.length > 0 && (
          <>
            <p className="mb-6 text-sm font-semibold tracking-[0.2em] text-stone uppercase">Carta completa</p>
            {filtered.map((c) => (
              <section key={c.id} id={c.id} className="mb-16 scroll-mt-40">
                <div className="mb-8 flex items-baseline gap-6">
                  <h2 className="text-5xl text-ivory">{c.title}</h2>
                  <span className="h-px flex-1 bg-border" />
                  <span className="text-xs tracking-widest text-stone">{c.items.length} platos</span>
                </div>
                <ul className="grid gap-x-12 gap-y-4 md:grid-cols-2">
                  {c.items.map((i) => (
                    <li key={i} className="flex items-baseline gap-3 border-b border-border py-4">
                      <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-ember" aria-hidden />
                      <span className="font-display text-xl text-cream">{i}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </>
        )}

        <div className="border-t border-border pt-8 text-xs text-stone">
          <p>Precio orientativo: {RESTAURANT.priceRange}. Sujeto a cambios; consultá precios vigentes en el restaurante.</p>
        </div>
      </div>

      <section className="bg-bordo-gradient grain">
        <div className="mx-auto max-w-7xl px-5 py-20 md:flex md:items-center md:justify-between md:gap-10">
          <div>
            <p className="eyebrow">Pedidos</p>
            <h2 className="mt-4 text-4xl text-ivory md:text-5xl">¿Querés pedir para disfrutar en casa?</h2>
            <p className="mt-4 max-w-lg text-cream/85">Retiro en la puerta y entrega sin contacto. Llamanos para consultar disponibilidad, zonas de entrega y modalidades vigentes.</p>
          </div>
          <div className="mt-8 md:mt-0"><PhoneButtons variant="light" /></div>
        </div>
      </section>
      <div className="py-10 text-center">
        <Link to="/reservas" className="btn btn-ghost">Prefiero reservar mesa</Link>
      </div>
    </>
  );
}
