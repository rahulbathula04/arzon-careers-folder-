import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { Section } from "@/components/ui/Section";
import { Check } from "lucide-react";

const tracks = [
  {
    id: "mc",
    label: "Medical Coding",
    weeks: [
      "Anatomy refresher · ICD-10-CM rules",
      "CPT & HCPCS surgery sections",
      "E/M coding · documentation gaps",
      "Modifiers, NCCI edits, denials",
      "Specialty coding: cardiology, ortho, OB-GYN",
      "Risk adjustment · HCC mapping",
      "Audit workflows · 95%+ accuracy lab",
      "Capstone: 200-chart audit + report",
    ],
  },
  {
    id: "pv",
    label: "Pharmacovigilance",
    weeks: [
      "Drug safety foundations · ICH-GVP",
      "ICSR processing E2B(R3)",
      "MedDRA coding workshop",
      "Argus / ARISg simulation",
      "Aggregate reports. PSUR/PBRER",
      "Signal detection & risk minimisation",
      "Audit & regulator inspections",
      "Capstone: end-to-end ICSR set",
    ],
  },
  {
    id: "cdm",
    label: "Clinical Data Management",
    weeks: [
      "GCP, CDISC SDTM intro",
      "EDC build (Medidata-style)",
      "CRF design & annotation",
      "Edit checks, query lifecycle",
      "Data validation, reconciliation",
      "Database lock simulation",
      "SAS basics for CDM",
      "Capstone: study lock dossier",
    ],
  },
  {
    id: "ra",
    label: "Regulatory Affairs",
    weeks: [
      "Global regulators map · ICH",
      "CTD modules 1–5 deep dive",
      "eCTD lifecycle & publishing",
      "FDA INDs / NDAs walkthrough",
      "CDSCO India submissions",
      "Labelling, variations, renewals",
      "Health authority correspondence",
      "Capstone: dossier package",
    ],
  },
];

export function LiveCurriculum() {
  const [active, setActive] = useState(tracks[0].id);
  const cur = tracks.find((t) => t.id === active)!;

  return (
    <Section id="curriculum" size="lg">
      <SectionHeader
        eyebrow="Live curriculum"
        title={
          <>
            The exact <em className="italic-accent not-italic">12 weeks</em> we ship.
          </>
        }
        sub="Each programme is 8 graded weeks + 4-week capstone internship. Tap a track to preview."
      />

      <div className="mt-8 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:mt-10 sm:flex-wrap sm:justify-center sm:overflow-visible">
        {tracks.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              active === t.id
                ? "border-primary bg-primary text-slate-50 shadow-[0_8px_22px_-10px_oklch(0.62_0.20_258/0.6)]"
                : "border-slate-200/15 bg-slate-50/5 text-slate-100/75 hover:bg-slate-50/10"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
        {cur.weeks.map((w, i) => (
          <div key={i} className="card-light rounded-xl p-5 transition-all hover:-translate-y-0.5">
            <p className="font-mono text-micro uppercase tracking-[0.22em] text-primary">
              Week {i + 1}
            </p>
            <p className="mt-2 font-grotesk text-base font-bold text-ink">{w}</p>
            <ul className="mt-3 space-y-1.5">
              <li className="flex items-start gap-1.5 text-xs text-muted-foreground">
                <Check className="mt-0.5 h-3 w-3 text-mint" /> Live mentor session
              </li>
              <li className="flex items-start gap-1.5 text-xs text-muted-foreground">
                <Check className="mt-0.5 h-3 w-3 text-mint" /> Graded assignment
              </li>
              <li className="flex items-start gap-1.5 text-xs text-muted-foreground">
                <Check className="mt-0.5 h-3 w-3 text-mint" /> Real-data lab
              </li>
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
