/**
 * Dev-only HMR probe for stylesheet updates.
 *
 * Vite emits a `vite:afterUpdate` event whenever it pushes an HMR payload
 * to the client. We filter for CSS updates (including `src/styles.css`,
 * which is imported as `?url` and patched via <link> tag swap) and log
 * a clearly-formatted line so you can confirm hot reload works without
 * a full page refresh.
 *
 * Production builds: `import.meta.hot` is undefined, so this is a no-op
 * and tree-shakes out entirely.
 */
if (import.meta.hot) {
  import.meta.hot.on(
    "vite:afterUpdate",
    (payload: {
      updates: Array<{ type: string; path: string; acceptedPath: string; timestamp: number }>;
    }) => {
      const cssUpdates = payload.updates.filter(
        (u) => u.type === "css-update" || u.path.endsWith(".css"),
      );
      if (cssUpdates.length === 0) return;
      for (const u of cssUpdates) {
        console.log(
          `%c[CSS HMR]%c ${u.path} updated (${new Date(u.timestamp).toLocaleTimeString()})`,
          "color:#0d9488;font-weight:bold;",
          "color:inherit;",
        );
      }
    },
  );

  console.log(
    "%c[CSS HMR]%c probe armed — edit src/styles.css to verify",
    "color:#0d9488;font-weight:bold;",
    "color:inherit;",
  );
}

export {};
