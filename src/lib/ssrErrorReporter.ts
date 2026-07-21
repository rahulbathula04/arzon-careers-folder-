import { track } from "@/lib/track";

/**
 * Patterns that identify SSR hydration / dehydration / serialization
 * failures. We deliberately keep this list narrow so we don't drown the
 * admin dashboard in unrelated runtime errors.
 */
const SSR_ERROR_PATTERNS: Array<{ kind: string; rx: RegExp }> = [
  // The signature error we just hit: loader returned a non-serializable
  // value (e.g. a React component reference) so TanStack's dehydration
  // never wrote $_TSR.router and hydration aborted.
  { kind: "hydration_invariant", rx: /Invariant failed/i },
  { kind: "missing_dehydration", rx: /\$_TSR\.router|dehydrated data/i },
  { kind: "hydration_mismatch", rx: /Hydration failed|did not match|Text content does not match/i },
  // Server-side dehydration choke (Seroval cannot serialize a value).
  { kind: "seroval_serialization", rx: /Seroval Error|forward_ref|react\.forward_ref/i },
];

function classify(message: string | undefined): string | null {
  if (!message) return null;
  for (const { kind, rx } of SSR_ERROR_PATTERNS) {
    if (rx.test(message)) return kind;
  }
  return null;
}

// In-memory de-dup so a single failed hydration doesn't spam the table —
// the same error often surfaces 2-3 times (errorComponent + unhandledrejection
// + window.onerror) within the same tick.
const seen = new Set<string>();
function dedupKey(kind: string, path: string, message: string): string {
  return `${kind}|${path}|${message.slice(0, 120)}`;
}

export interface SsrErrorReport {
  message?: string;
  stack?: string;
  /** Where the error was caught: 'errorComponent' | 'window_error' | 'unhandledrejection'. */
  source: string;
  /** Optional route slug (e.g. course slug) for grouping. */
  programSlug?: string;
}

export function reportSsrError(report: SsrErrorReport): void {
  if (typeof window === "undefined") return;
  const message = (report.message ?? "").trim();
  const kind = classify(message);
  if (!kind) return;
  const path = window.location.pathname + window.location.search;
  const key = dedupKey(kind, path, message);
  if (seen.has(key)) return;
  seen.add(key);
  // Drop the dedupe entry after 10s so genuinely recurring problems still log.
  window.setTimeout(() => seen.delete(key), 10_000);
  try {
    track("ssr_hydration_error", {
      program_slug: report.programSlug ?? null,
      props: {
        kind,
        source: report.source,
        message: message.slice(0, 500),
        stack: (report.stack ?? "").slice(0, 1200),
        user_agent: navigator.userAgent.slice(0, 200),
      },
    });
  } catch {
    /* never break UX for telemetry */
  }
}

/**
 * Install global listeners for unhandled errors / promise rejections that
 * match SSR hydration patterns. Safe to call multiple times — guarded by a
 * module-level flag. No-op on the server.
 */
let installed = false;
export function installSsrErrorListeners(): void {
  if (installed) return;
  if (typeof window === "undefined") return;
  installed = true;
  window.addEventListener("error", (event) => {
    reportSsrError({
      message: event.message ?? (event.error as Error | undefined)?.message,
      stack: (event.error as Error | undefined)?.stack,
      source: "window_error",
    });
  });
  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason as Error | string | undefined;
    const message = typeof reason === "string" ? reason : (reason?.message ?? String(reason ?? ""));
    reportSsrError({
      message,
      stack: typeof reason === "object" ? reason?.stack : undefined,
      source: "unhandledrejection",
    });
  });
}
