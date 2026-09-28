import type { ReactNode } from "react";

export function ArzonV2PageHero({
  eyebrow,
  title,
  description,
  children,
  mobileImageSrc,
  mobileImageAlt,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
  mobileImageSrc?: string;
  mobileImageAlt?: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-[var(--arzon-border)] bg-gradient-to-br from-[#EEF6FF] via-white to-[#ECFFFA]">
      <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />
      <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-teal-300/15 blur-3xl" />
      <div className="arzon-v2-container relative py-10 sm:py-16">
        <div className={mobileImageSrc ? "grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr]" : "max-w-5xl"}>
          <div>
            <span className="arzon-v2-eyebrow">{eyebrow}</span>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.04] tracking-tight text-[var(--arzon-ink)] sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--arzon-ink-soft)] sm:text-lg">
              {description}
            </p>
            {children ? <div className="mt-6">{children}</div> : null}
          </div>
          {mobileImageSrc ? (
            <div className="relative overflow-hidden rounded-[28px] border-8 border-white bg-slate-100 shadow-2xl">
              <img
                src={mobileImageSrc}
                alt={mobileImageAlt ?? ""}
                className="h-[330px] w-full object-cover object-top"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A4A]/55 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/30 bg-white/90 p-3 backdrop-blur">
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[var(--arzon-blue-700)]">ARZON CAREER INTELLIGENCE</p>
                <p className="mt-1 text-xs font-semibold text-[var(--arzon-ink)]">Explore the work. Check the fit. Build the skills.</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
