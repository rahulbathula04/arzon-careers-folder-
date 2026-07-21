import { useEffect, useState } from "react";

export type Intent = "apply" | "career-engine" | "enrol";

const VALID: Intent[] = ["apply", "career-engine", "enrol"];
const KEY = "arzon_utm_intent";

export const INTENT_CTA: Record<
  Intent,
  { label: string; shortLabel: string; to: "/apply" | "/career-engine" | "/enrol" }
> = {
  apply: { label: "Apply now", shortLabel: "Apply now", to: "/apply" },
  "career-engine": {
    label: "Take the free career fit test",
    shortLabel: "Career fit test (3 min)",
    to: "/career-engine",
  },
  enrol: { label: "Pick my cohort & enrol", shortLabel: "Enrol now", to: "/enrol" },
};

/**
 * Returns the current visitor intent. Reads ?utm_intent= from URL on first
 * render, persists to sessionStorage, and survives client-side navigation.
 * Defaults to "career-engine" so the diagnostic remains the primary funnel.
 */
export function useIntent(): Intent {
  const [intent, setIntent] = useState<Intent>("career-engine");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const url = new URL(window.location.href);
      const fromUrl = url.searchParams.get("utm_intent");
      if (fromUrl && (VALID as string[]).includes(fromUrl)) {
        sessionStorage.setItem(KEY, fromUrl);
        setIntent(fromUrl as Intent);
        return;
      }
      const stored = sessionStorage.getItem(KEY);
      if (stored && (VALID as string[]).includes(stored)) {
        setIntent(stored as Intent);
      }
    } catch {
      // sessionStorage / URL not available, keep default
    }
  }, []);

  return intent;
}
