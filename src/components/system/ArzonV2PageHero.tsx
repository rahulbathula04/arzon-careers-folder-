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
    <header className="border-b border-[var(--arzon-border)] bg-white">
      <div className="arzon-v2-container py-9 sm:py-14 lg:py-16">
        <span className="arzon-v2-eyebrow">{eyebrow}</span>
        <h1 className="mt-4 max-w-4xl text-[clamp(2rem,6vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.035em] text-[var(--arzon-ink-strong)]">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--arzon-ink-soft)] sm:text-lg sm:leading-8">
          {description}
        </p>
        {children ? <div className="mt-6">{children}</div> : null}
        {mobileImageSrc ? (
          <div className="mt-8 overflow-hidden rounded-[var(--arzon-radius-xl)] border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] shadow-[var(--arzon-shadow-card)] md:hidden">
            <img
              src={mobileImageSrc}
              alt={mobileImageAlt ?? ""}
              className="h-48 w-full object-cover object-top sm:h-56"
              loading="eager"
              decoding="async"
            />
          </div>
        ) : null}
      </div>
    </header>
  );
}
