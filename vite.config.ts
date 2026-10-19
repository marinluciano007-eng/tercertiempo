// @lovable.dev/vite-tanstack-config includes TanStack-specific Vite configuration.
// This package provides: TanStack devtools, tanstackStart, viteReact, tailwindcss,
// tsConfigPaths, nitro, VITE_* env injection, @ path alias, React/TanStack dedupe,
// error logger plugins, and sandbox detection.
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
