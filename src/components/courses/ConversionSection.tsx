import type { ReactNode } from "react";
import type { getTrackTheme } from "@/data/trackTheme";

type Theme = ReturnType<typeof getTrackTheme>;

interface Props {
  id?: string;
  step: string; // "01" .. "11"
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  theme: Theme;
  children: ReactNode;
  /** Optional full-bleed band — drops the inner max-width and adds a top border. */
  bleed?: boolean;
  /** Optional centered alignment for hero-like bands. */
  center?: boolean;
}

/**
 * The single primitive every conversion-page band uses. Locks vertical
 * rhythm, eyebrow tracking, heading scale and body copy so the page
 * reads as one document instead of five.
 */
export function ConversionSection({
  id,
  step,
  eyebrow,
  title,
  subtitle,
  theme,
  children,
  bleed,
  center,
}: Props) {
  return (
    <section
      id={id}
      data-testid="conv-section"
      data-step={step}
      className={`scroll-mt-24 py-16 sm:py-20 lg:py-24 ${bleed ? "border-t border-white/10" : ""}`}
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:max-w-6xl">
        <div
          className={`grid gap-3 ${center ? "text-center" : ""} lg:grid-cols-[64px_minmax(0,1fr)] lg:gap-8`}
        >
          <div className={`flex items-center gap-3 ${center ? "justify-center" : ""} lg:block`}>
            <span
              aria-hidden
              className="font-mono text-micro font-semibold tracking-[0.22em]"
              style={{ color: "#475569" }}
            >
              {step}
            </span>
            <span aria-hidden className={`h-px w-10 lg:mt-3 lg:w-12 ${theme.accent}`} />
          </div>
          <div className="min-w-0">
            <p
              data-testid="section-eyebrow"
              className={`font-mono text-micro font-semibold uppercase tracking-[0.22em] ${theme.accentText}`}
            >
              {eyebrow}
            </p>
            <h2
              className="mt-2 font-display text-h2 font-bold tracking-tight sm:text-h1 lg:text-[44px]"
              style={{ color: "#F8FAFC", textWrap: "balance" }}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className={`mt-3 text-body-sm leading-relaxed ${center ? "mx-auto" : ""} max-w-2xl`}
                style={{ color: "#CBD5E1", textWrap: "pretty" }}
              >
                {subtitle}
              </p>
            )}
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Shared card token reused across every section body. */
export function ConvCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 ${className}`}
      style={{ background: "rgba(15,23,42,0.6)", borderColor: "rgba(255,255,255,0.10)" }}
    >
      {children}
    </div>
  );
}
