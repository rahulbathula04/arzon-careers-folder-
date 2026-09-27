import type { ReactNode } from "react";

export function ArzonV2PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-[var(--arzon-border)] bg-white">
      <div className="arzon-v2-container py-12 sm:py-16">
        <span className="arzon-v2-eyebrow">{eyebrow}</span>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.06] tracking-tight text-[var(--arzon-ink)] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--arzon-ink-soft)] sm:text-lg">
          {description}
        </p>
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </header>
  );
}
