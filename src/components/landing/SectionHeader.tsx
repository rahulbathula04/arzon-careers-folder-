import { isValidElement, type ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  sub,
  align = "center",
  tone,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "center" | "left";
  /**
   * Optional explicit override. When omitted, the header inherits its tone
   * from the ancestor surface via the `.tone-dark` / `.tone-light` CSS rules
   * in `src/styles.css`. We deliberately do NOT read a default tone from
   * React context: doing so forced every section header to render white on
   * the light page background (the "invisible section heading" regression).
   */
  tone?: "light" | "dark";
}) {
  const a = align === "center" ? "text-center mx-auto" : "text-left";
  // Default to `.tone-light` so the header re-scopes `--ink` / `--ink-soft`
  // to solid navy ink even when the app renders under an html-level `.dark`
  // theme. Without this the display serif inherits near-white `--ink` from
  // `.dark` and the headline collapses into a ghost — the exact regression
  // the user flagged on Role-first tracks, One fee, Quick answers, etc.
  // Callers can still opt into a dark surface via `tone="dark"`.
  const toneClass = tone === "dark" ? "tone-dark" : "tone-light";
  // If the caller already supplied a heading element (e.g. <h2>...</h2>),
  // don't wrap it in another <h2> — that produces invalid nested headings
  // and on mobile collapses into an overlapping stack.
  const titleIsHeading =
    isValidElement(title) && typeof title.type === "string" && /^h[1-6]$/.test(title.type);
  return (
    <div className={`max-w-3xl ${a} ${toneClass}`.trim()}>
      {eyebrow && (
        <Reveal as="div" className="flex flex-col items-center gap-3">
          <p className="eyebrow">{eyebrow}</p>
          {/* Premium hairline: a short gold rule under every section eyebrow
              gives the whole page an editorial, chapter-marker rhythm. */}
          <span aria-hidden className="block h-px w-10 bg-[#8A6A14]/50" />
        </Reveal>
      )}
      {titleIsHeading ? (
        <Reveal as="div" className="h-section mt-4 sm:mt-5" delay={80}>
          {title}
        </Reveal>
      ) : (
        <Reveal as="h2" className="h-section mt-4 sm:mt-5" delay={80}>
          {title}
        </Reveal>
      )}
      {sub && (
        <Reveal as="p" className="body-lg mt-4 sm:mt-5 mx-auto max-w-[54ch]" delay={160}>
          {sub}
        </Reveal>
      )}
    </div>
  );
}
