import { track } from "@/lib/track";

/**
 * One-line helper for explicit Apply CTA logging.
 * Prefer using the delegated listener in __root.tsx - only call this
 * when the CTA is not an <a href="/apply"> (e.g. button-then-navigate).
 */
export function trackApplyCta(
  surface: string,
  opts: { programmeSlug?: string | null; path?: string } = {},
) {
  track("apply_cta_click", {
    program_slug: opts.programmeSlug ?? null,
    props: {
      surface,
      path: opts.path ?? (typeof window !== "undefined" ? window.location.pathname : null),
    },
  });
}

/**
 * Derive a stable `surface` string for a clicked Apply link.
 * Walks up the DOM looking for `data-apply-surface`, then falls back
 * to the nearest landmark (`<section id>` / `<nav>` / `<footer>`)
 * and finally to "unknown".
 */
export function resolveApplySurface(el: HTMLElement | null): string {
  if (!el) return "unknown";
  const explicit = el.closest<HTMLElement>("[data-apply-surface]");
  if (explicit?.dataset.applySurface) return explicit.dataset.applySurface;
  const section = el.closest<HTMLElement>("section[id], nav, footer, header");
  if (!section) return "unknown";
  if (section.tagName === "NAV") return "nav";
  if (section.tagName === "FOOTER") return "footer";
  if (section.tagName === "HEADER") return "header";
  return section.id ? `section:${section.id}` : "section";
}

/**
 * Read a programme slug from common places near the clicked link:
 *   - explicit `data-programme-slug` attribute (preferred)
 *   - `?programme=<slug>` query in the link's href
 */
export function resolveApplyProgrammeSlug(anchor: HTMLAnchorElement): string | null {
  const explicit = anchor.closest<HTMLElement>("[data-programme-slug]");
  const fromAttr = explicit?.dataset.programmeSlug;
  if (fromAttr) return fromAttr;
  try {
    const u = new URL(anchor.href, window.location.origin);
    return u.searchParams.get("programme");
  } catch {
    return null;
  }
}
