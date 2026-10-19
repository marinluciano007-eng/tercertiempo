import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteHeader, SiteFooter } from "@/components/site";
import { RESTAURANT, HOURS } from "@/data/restaurant";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 text-5xl text-ivory">Esta mesa no existe</h1>
        <p className="mt-4 text-muted-foreground">La página que buscás no está disponible o cambió de lugar.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-primary">Volver al inicio</Link>
          <Link to="/carta" className="btn btn-ghost">Ver la carta</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl text-ivory">La página no cargó</h1>
        <p className="mt-2 text-sm text-muted-foreground">Algo salió mal. Probá recargar o volvé al inicio.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn btn-primary">Reintentar</button>
          <a href="/" className="btn btn-ghost">Inicio</a>
        </div>
      </div>
    </div>
  );
}

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: RESTAURANT.name,
  servesCuisine: "Parrilla argentina",
  telephone: RESTAURANT.phones.map((p) => p.tel),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bermúdez 1995-1999",
    postalCode: "C1417",
    addressLocality: "Ciudad Autónoma de Buenos Aires",
    addressCountry: "AR",
  },
  acceptsReservations: true,
  sameAs: [RESTAURANT.instagram, RESTAURANT.facebook],
  openingHoursSpecification: HOURS.flatMap((d, i) =>
    d.shifts.map((s) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: dayNames[i], opens: s.open, closes: s.close })),
  ),
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Tercer Tiempo — Parrilla argentina en Monte Castro" },
      { name: "description", content: "Parrilla Restaurant Tercer Tiempo: carnes a la brasa y platos para compartir en Monte Castro, Buenos Aires." },
      { property: "og:site_name", content: "Tercer Tiempo" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#111110" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Manrope:wght@400;500;600;700&display=swap" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico?v=2", type: "image/x-icon" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es-AR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-ivory focus:p-3 focus:text-ink">Ir al contenido</a>
      <SiteHeader />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
    </QueryClientProvider>
  );
}
