import { Section } from "@/components/ui/Section";
import { SectionHeader } from "./SectionHeader";
import { RECRUITER_OUTCOMES } from "@/data/recruiterOutcomes";
import { CheckCircle2 } from "lucide-react";

/**
 * "Day-1 readiness, recruiter's POV." Each row maps a concrete pain a
 * pharma/CRO hiring manager flags during screening to the artefact an
 * Arzon graduate already carries. Used on the homepage, internship
 * conversion page, and the Career Engine result.
 */
export function RecruiterOutcomes({ compact = false }: { compact?: boolean }) {
  return (
    <Section id="recruiter-outcomes" size={compact ? "sm" : "md"} tone="light">
      <SectionHeader
        eyebrow="Recruiter view · Day 1"
        title={
          <>
            What a hiring manager sees{" "}
            <span className="italic-accent">when our graduate applies.</span>
          </>
        }
        sub="No vague soft-skill claims. Every row is a real pain CRO/BPO recruiters flag, paired with the artefact our cohort ships at the end of week 12."
      />

      <div className="mt-5 overflow-hidden rounded-2xl card-light ring-1 ring-slate-200 sm:mt-7">
        {/* Header row — desktop only */}
        <div className="hidden grid-cols-[1.1fr_1.2fr_1fr] gap-4 border-b border-slate-200 bg-slate-50/80 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 md:grid">
          <span>Recruiter pain</span>
          <span>Arzon graduate delivers</span>
          <span>Verifiable artefact</span>
        </div>

        <ul>
          {RECRUITER_OUTCOMES.map((row, i) => (
            <li
              key={row.pain}
              className={`grid grid-cols-1 gap-2 px-4 py-2.5 sm:px-5 md:grid-cols-[1.1fr_1.2fr_1fr] md:items-start md:gap-4 ${
                i !== 0 ? "border-t border-slate-200" : ""
              }`}
            >
              <p className="text-[13px] font-semibold leading-snug text-ink">{row.pain}</p>
              <p className="flex items-start gap-2 text-[13px] leading-snug text-slate-700">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-600" aria-hidden />
                <span>{row.delivers}</span>
              </p>
              <p className="font-mono text-[10px] uppercase leading-snug tracking-[0.14em] text-[color:var(--teal-deep)]">
                {row.artifact}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-3 text-center text-[11px] text-slate-500">
        Every artefact above is verifiable on the public ledger — certificates, JD sources, refunds,
        methodology.
      </p>
    </Section>
  );
}
