import { FileText, Lock, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

/**
 * De-identified work-sample card. Shows what the artifact IS without
 * shipping the full asset (which would need formal consent + redaction
 * review). The "request the full sample" CTA routes recruiters to the
 * contact form where Arzon's partnerships team sends a signed link.
 */
export interface WorkSample {
  trackSlug: string;
  track: string;
  artifact: string;
  excerpt: string;
  bullets: string[];
}

export const WORK_SAMPLES: WorkSample[] = [
  {
    trackSlug: "pharmacovigilance",
    track: "Pharmacovigilance",
    artifact: "ICSR case file (de-identified)",
    excerpt: "Spontaneous report · 64F · suspected SAE post-anticoagulant initiation",
    bullets: [
      "Full E2B(R3) intake — primary source, reporter, dates",
      "MedDRA LLT coding with PT roll-up + WHO-DD product mapping",
      "Mentor-reviewed narrative; 3 graded passes before sign-off",
    ],
  },
  {
    trackSlug: "medical-coding",
    track: "Medical Coding",
    artifact: "Multi-specialty chart (de-identified)",
    excerpt: "Outpatient cardiology consult · ICD-10 + CPT + E/M level 4",
    bullets: [
      "ICD-10-CM primary + 4 comorbidities, NCCI edits checked",
      "CPT with modifiers; E/M leveled with MDM justification",
      "Mock CPC audit form attached — accuracy 96%",
    ],
  },
  {
    trackSlug: "clinical-data-management",
    track: "Clinical Data Management",
    artifact: "eCRF + edit-check spec (Rave study)",
    excerpt: "Phase II oncology · Demographics, AE, ConMed forms",
    bullets: [
      "CDASH-aligned CRF build in Medidata Rave (study build screenshot)",
      "Edit-check spec written + executed; query log attached",
      "SAE reconciliation report from mock database lock",
    ],
  },
];

export function WorkSampleCard({ sample }: { sample: WorkSample }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-[color:var(--teal-deep)]" />
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.2em] text-[color:var(--teal-deep)]">
          {sample.track}
        </p>
      </div>
      <h3 className="mt-2 font-grotesk text-body font-bold text-ink">{sample.artifact}</h3>
      <p className="mt-1 font-mono text-micro text-slate-500">{sample.excerpt}</p>

      <ul className="mt-3 space-y-1.5 text-caption leading-relaxed text-slate-700">
        {sample.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[color:var(--teal-deep)]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center gap-2 rounded-lg border border-ink/10 bg-slate-50 p-3">
        <Lock className="h-3.5 w-3.5 text-slate-500" />
        <p className="text-micro leading-snug text-slate-600">
          Full artifact (redacted PDF + auditor scoring sheet) sent on recruiter request — student
          consent recorded.
        </p>
      </div>

      <Link
        to="/contact"
        className="mt-4 inline-flex items-center gap-1.5 self-start text-caption font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline"
      >
        Request the full sample <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
