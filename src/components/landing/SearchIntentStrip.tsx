import { Link } from "@tanstack/react-router";
import { Search, ArrowRight } from "lucide-react";

const ITEMS = [
  {
    label: "Medical Coding programme",
    to: "/courses/$slug" as const,
    params: { slug: "medical-coding" },
  },
  {
    label: "Pharmacovigilance programme",
    to: "/courses/$slug" as const,
    params: { slug: "pharmacovigilance" },
  },
  {
    label: "Clinical Data Management",
    to: "/courses/$slug" as const,
    params: { slug: "clinical-data-management" },
  },
  { label: "All internships", to: "/internships" as const, params: undefined },
];

export function SearchIntentStrip() {
  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200/10 bg-white/[0.03] p-5 sm:p-6">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-primary-glow" />
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
            Searching for a specific internship?
          </p>
        </div>
        <h3 className="mt-3 font-grotesk text-h4 font-bold leading-tight text-slate-50 sm:text-h3">
          Jump straight to the one you want.
        </h3>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {ITEMS.map((it) => (
            <Link
              key={it.to + (it.params?.slug ?? "")}
              to={it.to}
              params={it.params}
              className="group flex items-center justify-between rounded-xl border border-slate-200/10 bg-white/[0.02] px-4 py-3 text-sm text-slate-100/85 transition hover:border-primary-glow/40 hover:bg-white/[0.06]"
            >
              <span>{it.label}</span>
              <ArrowRight className="h-4 w-4 text-slate-100/80 transition group-hover:translate-x-0.5 group-hover:text-primary-glow" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
