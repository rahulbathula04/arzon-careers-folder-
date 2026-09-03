import { ShieldCheck, FileSearch, MapPin } from "lucide-react";
import {
  getJdProvenance,
  RESEARCH_REFRESH_QUARTER,
  refreshQuarter,
  coverageBand,
} from "@/data/jdProvenance";

/**
 * Compact inline pill - use in course cards / hero strip.
 * "Built from 1,247 live Drug Safety Associate JDs · refreshed Oct 2026"
 */
export function JDProvenancePill({ slug, className }: { slug: string; className?: string }) {
  const data = getJdProvenance(slug);
  if (!data) return null;
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 rounded-full border border-accent-glow/30 bg-accent-glow/10 px-3 py-1.5 text-xs font-semibold text-eyebrow-strong " +
        (className ?? "")
      }
    >
      <ShieldCheck className="h-3.5 w-3.5" />
      Built from current {data.roleTitle} JDs
      <span className="text-eyebrow/70">· refreshed {refreshQuarter(data.refreshedOn)}</span>
    </span>
  );
}

/**
 * Module chip - sits next to a syllabus week.
 * "Satisfies JD line: 'ICSR end-to-end processing' - seen in 91% of JDs"
 */
export function JDProvenanceModuleChip({
  phrase,
  coverage,
  className,
}: {
  phrase: string;
  coverage: number;
  className?: string;
}) {
  return (
    <span
      className={
        "inline-flex items-start gap-1.5 rounded-md border border-accent-glow/25 bg-accent-glow/[0.06] px-2 py-1 text-micro font-medium text-eyebrow-strong/90 " +
        (className ?? "")
      }
    >
      <FileSearch className="mt-0.5 h-3 w-3 flex-shrink-0 text-eyebrow" />
      <span>
        Satisfies JD line: <span className="italic">&ldquo;{phrase}&rdquo;</span>{" "}
        <span className="text-eyebrow/80">· {coverageBand(coverage)}</span>
      </span>
    </span>
  );
}

/**
 * Full trust block - methodology + sources + sample size + cadence.
 * Use on /about, /proof, /jd-mirror, and home page credibility section.
 */
export function JDProvenanceBlock({ className }: { className?: string }) {
  const SOURCES = ["Naukri", "LinkedIn India", "Foundit", "Company careers pages"];
  return (
    <div
      className={"rounded-3xl border border-slate-800 bg-[#0B1426] p-6 sm:p-8 " + (className ?? "")}
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-accent-glow/30 bg-accent-glow/10 px-3 py-1">
        <ShieldCheck className="h-3.5 w-3.5" style={{ color: "#7DD3FC" }} />
        <p
          className="font-mono text-micro font-bold uppercase tracking-[0.22em]"
          style={{ color: "#7DD3FC" }}
        >
          JD-derived syllabus methodology
        </p>
      </div>
      <h3 className="mt-4 text-h4 font-bold leading-tight sm:text-h3" style={{ color: "#F8FAFC" }}>
        We don't teach subjects. We train people into specific Indian fresher job roles.
      </h3>
      <p
        className="mt-3 max-w-2xl text-sm leading-relaxed sm:text-base"
        style={{ color: "#CBD5E1" }}
      >
        Every Arzon Global track is reverse-engineered from current Indian job descriptions. We
        read the fresher openings posted on Naukri, LinkedIn India, Foundit and company careers
        pages, extract the recurring skills, tools and deliverables, and only then design the
        12-week syllabus and capstone. We refresh this market read every quarter.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p
            className="font-mono text-micro font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#7DD3FC" }}
          >
            Last refresh
          </p>
          <p
            className="mt-1 font-display text-h2 font-bold tabular-nums"
            style={{ color: "#F8FAFC" }}
          >
            {RESEARCH_REFRESH_QUARTER}
          </p>
          <p className="mt-1 text-xs" style={{ color: "#94A3B8" }}>
            re-read once every quarter, by hand
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p
            className="font-mono text-micro font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#7DD3FC" }}
          >
            Tracks
          </p>
          <p className="mt-1 font-display text-h2 font-bold" style={{ color: "#F8FAFC" }}>
            6 role tracks
          </p>
          <p className="mt-1 text-xs" style={{ color: "#94A3B8" }}>
            PV · Coding · CDM · SAS · RA · Med Writing
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p
            className="font-mono text-micro font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#7DD3FC" }}
          >
            Sources
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {SOURCES.map((s) => (
              <li
                key={s}
                className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-xs font-medium"
                style={{ color: "#F1F5F9" }}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        className="mt-5 inline-flex items-center gap-2 rounded-md border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs"
        style={{ color: "#CBD5E1" }}
      >
        <MapPin className="h-3.5 w-3.5" style={{ color: "#7DD3FC" }} />
        Indian fresher market only - roles, salaries and tools that actually hire here.
      </div>
    </div>
  );
}
