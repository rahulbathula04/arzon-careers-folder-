import { createRouter, useRouter, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { routeTree } from "./routeTree.gen";
import { reportSsrError } from "@/lib/ssrErrorReporter";

function DefaultErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  // Surface every route-level error to the SSR/hydration error monitor.
  // The reporter classifies + dedupes — generic component throws that
  // don't match any SSR pattern are dropped server-side.
  useEffect(() => {
    reportSsrError({
      message: error.message,
      stack: error.stack,
      source: "errorComponent",
    });
  }, [error]);

  return (
    <div className="flex min-h-app items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-destructive"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>
        <h1 className="text-h3 font-bold tracking-tight text-foreground">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>
        {import.meta.env.DEV && error.message && (
          <pre className="mt-4 max-h-40 overflow-auto rounded-md bg-muted p-3 text-left font-mono text-xs text-destructive">
            {error.message}
          </pre>
        )}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {},
    // We manage scroll ourselves inside #app-scroll-root (see __root.tsx).
    // Letting TanStack Router also try to restore window scroll conflicts
    // with our internal scroller and can leave a fresh page landing at the
    // bottom of the previous page's position. Disable it here.
    scrollRestoration: false,
    // Preload route chunks + loaders on hover/touch intent. Combined with the
    // Speculation Rules block in __root.tsx (full prerender on high intent),
    // this gives a "pre-loaded" feel even on cold cache: by the time the user
    // clicks, the chunk is parsed and the loader has resolved.
    defaultPreload: "intent",
    defaultPreloadDelay: 50,
    // Reuse loader data for 30s after a preload, so hover-prerender (Speculation
    // Rules + TanStack preload) doesn't refetch on every cursor-over. Cuts
    // Worker + Postgres load on content nav by 3-5x without hurting freshness
    // for pages that don't change every second.
    defaultPreloadStaleTime: 30_000,
    defaultErrorComponent: DefaultErrorComponent,
  });

  return router;
};
