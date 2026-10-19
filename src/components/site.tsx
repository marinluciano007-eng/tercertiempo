import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X, Phone, Instagram, Facebook, MapPin } from "lucide-react";
import { RESTAURANT, HOURS_DISPLAY } from "@/data/restaurant";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <img src="/favicon.ico" alt="" className="h-8 w-8 sm:h-10 sm:w-10" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-2xl tracking-[0.12em] text-ivory sm:text-[1.7rem]">TERCER TIEMPO</span>
        {!compact && (
          <span className="mt-1 flex items-center gap-2 text-[0.58rem] font-semibold tracking-[0.42em] text-gold">
            <span className="h-px w-4 bg-ember" /> PARRILLA RESTAURANT
          </span>
        )}
      </span>
    </div>
  );
}

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/carta", label: "Carta" },
  { to: "/restaurante", label: "El restaurante" },
  { to: "/contacto", label: "Contacto" },
  { to: "/reservas", label: "Reservas" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} className="absolute top-0 h-24 w-px" aria-hidden />
      <div className="bg-deep py-2 text-center text-[0.65rem] tracking-[0.3em] text-stone uppercase">
        Parrilla argentina · Monte Castro · Buenos Aires
      </div>
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-500 ${
          scrolled ? "border-border bg-background/95 backdrop-blur" : "border-transparent bg-background/40 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 lg:flex lg:justify-between">
          <Link to="/" aria-label="Inicio, Tercer Tiempo" className="min-w-0">
            <Logo />
          </Link>
          <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-xs font-semibold tracking-[0.18em] text-cream/80 uppercase transition-colors hover:text-gold"
                activeProps={{ className: "text-gold" }}
                activeOptions={{ exact: true }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <Link to="/reservas" className="btn btn-primary px-4 py-2.5 text-[0.7rem] sm:px-6">
              Reservar mesa
            </Link>
            <button
              className="p-2 text-cream lg:hidden"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <nav aria-label="Móvil" className="border-t border-border bg-background px-5 pb-6 lg:hidden">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="block border-b border-border py-4 font-display text-2xl text-cream"
              >
                {n.label}
              </Link>
            ))}
            <a href={`tel:${RESTAURANT.phones[0].tel}`} className="btn btn-ghost mt-6 w-full">
              <Phone size={16} /> Llamar
            </a>
          </nav>
        )}
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-deep">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-5 text-sm text-muted-foreground">{RESTAURANT.name}</p>
          <div className="mt-6 flex gap-3">
            <a href={RESTAURANT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="btn-ghost rounded-full border p-2.5"><Instagram size={16} /></a>
            <a href={RESTAURANT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="btn-ghost rounded-full border p-2.5"><Facebook size={16} /></a>
          </div>
        </div>
        <div>
          <p className="eyebrow mb-4">Visitanos</p>
          <a href={RESTAURANT.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-2 text-sm text-cream/80 hover:text-gold">
            <MapPin size={16} className="mt-0.5 shrink-0" /> {RESTAURANT.address}
          </a>
          <div className="mt-4 space-y-2">
            {RESTAURANT.phones.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`} className="flex items-center gap-2 text-sm text-cream/80 hover:text-gold">
                <Phone size={14} /> {p.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow mb-4">Horarios</p>
          <ul className="space-y-1 text-sm text-cream/80">
            {HOURS_DISPLAY.map((d) => (
              <li key={d.day} className="flex justify-between gap-4">
                <span>{d.short}</span>
                <span className={d.shifts.length ? "" : "text-ember"}>
                  {d.shifts.length ? d.shifts.map((s) => `${s.open}–${s.close}`).join(" · ") : "Cerrado"}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-stone">Los horarios pueden variar. Confirmá antes de visitarnos.</p>
        </div>
        <div>
          <p className="eyebrow mb-4">Navegación</p>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.to}><Link to={n.to} className="text-cream/80 hover:text-gold">{n.label}</Link></li>
            ))}
            <li><Link to="/reservas" className="text-cream/80 hover:text-gold">Reservas</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-stone">
        © {new Date().getFullYear()} {RESTAURANT.name} · Monte Castro, Buenos Aires
      </div>
    </footer>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function HoursTable() {
  return (
    <div>
      <ul className="divide-y divide-border border-y border-border">
        {HOURS_DISPLAY.map((d) => (
          <li key={d.day} className="grid grid-cols-[7rem_1fr] items-center gap-4 py-4 sm:grid-cols-[9rem_1fr]">
            <span className="font-display text-xl text-ivory">{d.day}</span>
            {d.shifts.length ? (
              <span className="grid gap-1 text-sm text-cream/85 sm:grid-cols-2">
                <span><span className="mr-2 text-[0.65rem] tracking-widest text-stone uppercase">Almuerzo</span>{d.shifts[0].open} – {d.shifts[0].close}</span>
                <span><span className="mr-2 text-[0.65rem] tracking-widest text-stone uppercase">Cena</span>{d.shifts[1].open} – {d.shifts[1].close}</span>
              </span>
            ) : (
              <span className="text-sm font-semibold tracking-widest text-ember uppercase">✕ Cerrado</span>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-stone">Los horarios pueden variar. Te recomendamos confirmar antes de visitarnos.</p>
    </div>
  );
}

export function PageHero({ eyebrow, title, subtitle, image, alt }: { eyebrow: string; title: string; subtitle: string; image: string; alt: string }) {
  return (
    <section className="relative isolate overflow-hidden">
      <img src={image} alt={alt} className="animate-photo absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="bg-hero-overlay absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-5 py-28 md:py-40">
        <p className="eyebrow animate-rise">{eyebrow}</p>
        <h1 className="animate-rise mt-5 max-w-3xl text-5xl leading-[0.95] text-ivory md:text-7xl" style={{ animationDelay: "100ms" }}>{title}</h1>
        <p className="animate-rise mt-6 max-w-xl text-lg text-cream/80" style={{ animationDelay: "200ms" }}>{subtitle}</p>
      </div>
    </section>
  );
}

export function PhoneButtons({ variant = "ghost" }: { variant?: "ghost" | "light" }) {
  return (
    <div className="flex flex-wrap gap-3">
      {RESTAURANT.phones.map((p) => (
        <a key={p.tel} href={`tel:${p.tel}`} className={`btn ${variant === "light" ? "btn-light" : "btn-ghost"}`}>
          <Phone size={15} /> {p.label}
        </a>
      ))}
    </div>
  );
}
