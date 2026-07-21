/**
 * Sentry client shim — env-gated and dependency-optional.
 *
 * Activation:
 *   1. `bun add @sentry/react`
 *   2. Set `VITE_SENTRY_DSN` in the deployment env.
 *   3. Optional: `SENTRY_AUTH_TOKEN` at build time to upload source maps.
 *
 * When either the DSN or the package is missing this module is a full
 * no-op — no runtime cost and no build error. That keeps preview and
 * local dev clean and matches the pattern already used for GA4.
 */

const DSN = (import.meta.env.VITE_SENTRY_DSN as string | undefined) ?? "";
const ENV =
  (import.meta.env.VITE_SENTRY_ENV as string | undefined) ?? import.meta.env.MODE ?? "development";

let initialised = false;
let sentryRef: any = null;

export function isSentryEnabled(): boolean {
  return Boolean(DSN);
}

/** Fire-and-forget init. Safe to call from every render — dedupes internally. */
export async function initSentry(): Promise<void> {
  if (initialised || !DSN || typeof window === "undefined") return;
  initialised = true;
  try {
    // Dynamic import so builds still work before `@sentry/react` is added.
    // Use a runtime-computed specifier so TS/Vite don't try to resolve
    // `@sentry/react` at build time. Install the dep to activate.
    const specifier = "@sentry/react";
    const mod = await import(/* @vite-ignore */ specifier).catch(() => null);
    if (!mod) return;
    sentryRef = mod;
    mod.init({
      dsn: DSN,
      environment: ENV,
      tracesSampleRate: 0.1,
      replaysSessionSampleRate: 0,
      replaysOnErrorSampleRate: 1.0,
      // Drop known third-party / infra noise so alerting stays actionable.
      beforeSend(event: any) {
        const msg = String(event?.message ?? event?.exception?.values?.[0]?.value ?? "");
        if (/favicon|gtag|ga\?|Failed to load resource/i.test(msg)) return null;
        return event;
      },
    });
  } catch {
    /* never break the app for telemetry */
  }
}

/** Tag the current scope with the route path — used for alert routing. */
export function setSentryRoute(path: string): void {
  if (!sentryRef) return;
  try {
    sentryRef.getCurrentScope?.().setTag("route", path);
  } catch {
    /* noop */
  }
}

/** Manual capture — funnels errors from `beforeSend`-style hooks. */
export function captureSentry(err: unknown, ctx?: Record<string, unknown>): void {
  if (!sentryRef) return;
  try {
    sentryRef.captureException(err, ctx ? { extra: ctx } : undefined);
  } catch {
    /* noop */
  }
}
