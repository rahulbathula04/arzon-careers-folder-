import { createFileRoute } from "@tanstack/react-router";
import { EmptyMoments } from "./moments.index";

/**
 * Visual-regression harness for the Moments empty state.
 *
 * Renders the production `EmptyMoments` component in isolation inside
 * either the dark shell (`.tone-dark`) or the light shell (`.tone-light`),
 * so `tests/e2e/visual/moments-empty.spec.ts` can lock a pixel baseline
 * for both without depending on the live moments feed being empty.
 *
 * TanStack Router treats a `__` filename prefix like `_` — a pathless
 * group — so this file is served at:
 *
 *   /moments-empty?tone=dark   (default)
 *   /moments-empty?tone=light
 *
 * noindex + not referenced from the sitemap. Search parity is enforced by
 * scripts/check-noindex-allowlist.mjs / check-sitemap-parity.mjs.
 */
export const Route = createFileRoute("/__vr/moments-empty")({
  validateSearch: (search: Record<string, unknown>) => ({
    tone: search.tone === "light" ? ("light" as const) : ("dark" as const),
  }),
  head: () => ({
    meta: [{ title: "VR · Moments empty state" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: VrMomentsEmpty,
});

function VrMomentsEmpty() {
  const { tone } = Route.useSearch();
  const isLight = tone === "light";
  return (
    <div
      className={
        isLight
          ? "tone-light min-h-dvh bg-white px-4 py-16 text-slate-900"
          : "tone-dark min-h-dvh bg-[oklch(0.14_0.04_245)] px-4 py-16 text-white"
      }
    >
      <EmptyMoments tone={isLight ? "light" : "dark"} />
    </div>
  );
}
