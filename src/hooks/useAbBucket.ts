import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Sticky A/B bucket. Assigns a 50/50 bucket per experiment key on first call,
 * persists it to localStorage, and fires a one-time `ab_exposure` GA4 event so
 * we can attribute downstream conversions in DebugView / reports.
 *
 * SSR-safe: returns `null` until hydrated so both buckets render identical
 * markup on the server.
 */
export function useAbBucket(
  experiment: string,
  variants: readonly string[] = ["A", "B"] as const,
): string | null {
  const [bucket, setBucket] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = `ab:${experiment}`;
    let v: string | null = null;
    try {
      v = localStorage.getItem(key);
    } catch {
      /* noop */
    }
    if (!v || !variants.includes(v)) {
      v = variants[Math.floor(Math.random() * variants.length)];
      try {
        localStorage.setItem(key, v);
      } catch {
        /* noop */
      }
      trackEvent("ab_exposure", { experiment, bucket: v });
    }
    setBucket(v);
  }, [experiment, variants]);

  return bucket;
}
