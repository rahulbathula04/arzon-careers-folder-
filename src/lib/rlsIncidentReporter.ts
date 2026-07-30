import { supabase } from "@/integrations/supabase/client";

/**
 * Client-side RLS incident reporter.
 *
 * Watches every browser fetch that hits the Supabase Data API and, when a
 * response body carries the Postgres "permission denied for function <fn>"
 * error, logs a single row into `public.rls_incidents`. A scheduled scanner
 * (`public.check_rls_incidents`) aggregates those rows into the existing
 * `analytics_alerts` feed, which the alert dispatcher already forwards to
 * Slack. This closes the gap between "Postgres logged permission denied"
 * and "on-call gets pinged" without needing external log tailing.
 *
 * Design:
 * - Fires from any session (anon or authenticated). RLS on rls_incidents
 *   allows INSERT for both roles; SELECT is staff-only.
 * - Debounced per-function in memory so a broken page doesn't spam the
 *   table on every re-render.
 * - Wrapped in a try/catch so a broken alerting pipeline never breaks the
 *   host page.
 */

const PERMISSION_DENIED_RE = /permission denied for function\s+"?([a-zA-Z_][a-zA-Z0-9_]*)"?/i;

// Cooldown per function_name so we don't hammer the table when the same
// broken query re-runs many times per second on the same page.
const COOLDOWN_MS = 30_000;
const lastLoggedAt = new Map<string, number>();

function shouldSkip(functionName: string): boolean {
  const now = Date.now();
  const prev = lastLoggedAt.get(functionName) ?? 0;
  if (now - prev < COOLDOWN_MS) return true;
  lastLoggedAt.set(functionName, now);
  return false;
}

export type RlsIncident = {
  functionName: string;
  message: string;
  path?: string;
  context?: Record<string, unknown>;
};

export async function reportRlsIncident(incident: RlsIncident): Promise<void> {
  try {
    if (shouldSkip(incident.functionName)) return;

    let userId: string | null = null;
    try {
      const { data } = await supabase.auth.getSession();
      userId = data.session?.user?.id ?? null;
    } catch {
      /* noop - never let auth lookup break the reporter */
    }

    const row = {
      function_name: incident.functionName.slice(0, 200),
      message: (incident.message ?? "").slice(0, 2000),
      path:
        (
          incident.path ??
          (typeof location !== "undefined" ? location.pathname + location.search : null)
        )?.slice(0, 500) ?? null,
      db_role: userId ? "authenticated" : "anon",
      user_id: userId,
      context: (incident.context ?? {}) as never,
    };

    const { error } = await supabase.from("rls_incidents").insert([row]);
    if (error && import.meta.env.DEV) {
      console.warn("[rls-alert] failed to log incident", error.message);
    }
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn("[rls-alert] unexpected reporter error", err);
    }
  }
}

/**
 * Try to extract a Supabase/Postgres "permission denied for function X"
 * error out of an arbitrary response body (usually JSON, sometimes text).
 * Returns the extracted function name and the raw message, or null when
 * the body doesn't match the pattern.
 */
export function extractPermissionDenied(
  body: unknown,
): { functionName: string; message: string } | null {
  const scan = (text: string) => {
    const m = text.match(PERMISSION_DENIED_RE);
    if (!m) return null;
    return { functionName: m[1], message: text.slice(0, 2000) };
  };
  if (typeof body === "string") return scan(body);
  if (body && typeof body === "object") {
    // PostgREST error shape: { message, code, hint, details }
    const b = body as { message?: unknown; details?: unknown; hint?: unknown };
    for (const candidate of [b.message, b.details, b.hint]) {
      if (typeof candidate === "string") {
        const hit = scan(candidate);
        if (hit) return hit;
      }
    }
  }
  return null;
}

/**
 * Install a global fetch interceptor that inspects Data-API responses for
 * "permission denied for function ..." errors. Safe to call multiple times
 * (idempotent). Must run in the browser only.
 */
export function installRlsIncidentInterceptor(): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { __rlsInterceptorInstalled?: boolean };
  if (w.__rlsInterceptorInstalled) return;
  w.__rlsInterceptorInstalled = true;

  const originalFetch = window.fetch.bind(window);
  const supabaseHost = (() => {
    try {
      return new URL(import.meta.env.VITE_SUPABASE_URL as string).host;
    } catch {
      return null;
    }
  })();

  const patchedFetch = async function patchedFetch(
    input: RequestInfo | URL,
    init?: RequestInit,
  ): Promise<Response> {
    const response = await originalFetch(input as never, init);
    try {
      if (response.ok) return response;
      if (response.status < 400) return response;

      const urlStr =
        typeof input === "string"
          ? input
          : input instanceof URL
            ? input.toString()
            : input instanceof Request
              ? input.url
              : "";
      // Only inspect Supabase Data API traffic to keep the perf cost negligible.
      if (!supabaseHost || !urlStr.includes(supabaseHost)) return response;
      if (!urlStr.includes("/rest/") && !urlStr.includes("/rpc/")) return response;

      const clone = response.clone();
      const text = await clone.text();
      let parsed: unknown = text;
      try {
        parsed = JSON.parse(text);
      } catch {
        /* text was not JSON - scan raw */
      }
      const hit = extractPermissionDenied(parsed);
      if (hit) {
        void reportRlsIncident({
          functionName: hit.functionName,
          message: hit.message,
          context: { status: response.status, url: urlStr },
        });
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn("[rls-alert] interceptor swallow", err);
      }
    }
    return response;
  };
  window.fetch = patchedFetch as unknown as typeof window.fetch;
}
