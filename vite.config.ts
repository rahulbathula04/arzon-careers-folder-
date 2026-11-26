// @lovable.dev/vite-tanstack-config already includes the following - do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import path from "node:path";

// Enable source maps in production builds so retry/backoff and other
// client-side errors surface real file paths and line numbers in browser
// devtools and error-monitoring backends.
export default defineConfig({
  vite: {
    server: {
      port: 3006,
      strictPort: true,
      host: "127.0.0.1",
    },
    resolve: {
      alias: {
        "entities/lib/decode.js": path.resolve(__dirname, "node_modules/entities/lib/decode.js"),
        "entities/lib/encode.js": path.resolve(__dirname, "node_modules/entities/lib/encode.js"),
        entities: path.resolve(__dirname, "node_modules/entities"),
      },
    },
    build: {
      sourcemap: false,
      chunkSizeWarningLimit: 3000,
      rollupOptions: {
        onwarn(warning, defaultHandler) {
          if (
            warning.code === "MODULE_LEVEL_DIRECTIVE" ||
            warning.code === "DYNAMIC_IMPORT_WILL_NOT_MOVE" ||
            warning.message?.includes("Module level directives cause errors when bundled") ||
            warning.message?.includes("dynamic import will not move module into another chunk")
          ) {
            return;
          }
          defaultHandler(warning);
        },
      },
    },
  },
});
