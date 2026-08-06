import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

interface CTA {
  label: string;
  to: string;
  external?: boolean;
  search?: Record<string, string | number | undefined>;
}

export function PageCTA({
  eyebrow = "Next step",
  title,
  subtitle,
  primary,
  secondary,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primary: CTA;
  secondary?: CTA;
}) {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
      <div className="tone-dark relative overflow-hidden rounded-3xl border border-slate-200/15 bg-[#0F1B3A] bg-gradient-to-br from-[#0F1B3A] to-[#111A2E] p-8 text-center sm:p-12">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-glow)" }}
        />
        <p className="relative font-mono text-micro font-semibold uppercase tracking-[0.28em] text-[#9EC4FF]">
          {eyebrow}
        </p>
        <h2 className="h-section mt-3 text-slate-50">{title}</h2>
        {subtitle && (
          <p className="relative mx-auto mt-3 max-w-xl text-body-sm leading-relaxed text-slate-100/85">
            {subtitle}
          </p>
        )}
        <div className="relative mt-6 flex flex-wrap justify-center gap-3">
          {primary.external ? (
            <a
              href={primary.to}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex h-12 items-center rounded-md bg-[#0056D2] px-6 text-sm font-bold text-slate-50 shadow-sm transition-colors hover:bg-[#0046b0]"
            >
              {primary.label} <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          ) : (
            <Link
              to={primary.to as never}
              search={primary.search as never}
              className="inline-flex h-12 items-center rounded-md bg-[#0056D2] px-6 text-sm font-bold text-slate-50 shadow-sm transition-colors hover:bg-[#0046b0]"
            >
              {primary.label} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          )}
          {secondary &&
            (secondary.external ? (
              <a
                href={secondary.to}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex h-12 items-center rounded-md border border-slate-200/40 bg-slate-50/10 px-6 text-sm font-bold text-slate-50 transition-colors hover:border-slate-200/70 hover:bg-slate-50/20"
              >
                {secondary.label}
              </a>
            ) : (
              <Link
                to={secondary.to as never}
                search={secondary.search as never}
                className="inline-flex h-12 items-center rounded-md border border-slate-200/40 bg-slate-50/10 px-6 text-sm font-bold text-slate-50 transition-colors hover:border-slate-200/70 hover:bg-slate-50/20"
              >
                {secondary.label}
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
