import { ArrowRight, CheckCircle2, Clock3 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { CareerEngineResult } from "@/data/careerEngineScoring";

type Props = { result: CareerEngineResult; leadId: string | null };

type Roadmap = {
  title: string;
  skills: string[];
  weeks: { week: number; focus: string; output: string }[];
  project: string;
  roleSlug: string;
  programmeSlug?: string;
};

const ROADMAPS: Record<string, Roadmap> = {
  "medical-coding": {
    title: "Medical Coding Specialist",
    skills: ["Medical terminology", "ICD-10-CM", "CPT / HCPCS", "Chart abstraction", "Accuracy & QA"],
    weeks: [
      { week: 1, focus: "Medical terminology", output: "Terminology reference sheet + anatomy drills" },
      { week: 2, focus: "Coding foundations", output: "Diagnosis-to-code exercises" },
      { week: 3, focus: "ICD-10-CM", output: "20 coded cases with rationale" },
      { week: 4, focus: "CPT / HCPCS", output: "Procedure coding set" },
      { week: 5, focus: "Chart abstraction", output: "Complete outpatient charts" },
      { week: 6, focus: "Modifiers & guidelines", output: "Guideline decision log" },
      { week: 7, focus: "Accuracy & QA", output: "Self-audit and error taxonomy" },
      { week: 8, focus: "Production simulation", output: "Timed coding batch" },
      { week: 9, focus: "Specialty cases", output: "Multi-specialty case set" },
      { week: 10, focus: "Portfolio project", output: "Coded case portfolio" },
      { week: 11, focus: "Interview readiness", output: "Role-specific mock interview" },
      { week: 12, focus: "Deployment readiness", output: "Final assessment + application pack" },
    ],
    project: "Build and QA a 50-chart outpatient coding portfolio.",
    roleSlug: "outpatient-coder", programmeSlug: "medical-coding",
  },
  pharmacovigilance: {
    title: "Drug Safety / PV Associate",
    skills: ["Case processing", "MedDRA", "Causality", "Seriousness / expectedness", "Safety writing"],
    weeks: [
      { week: 1, focus: "PV foundations", output: "Safety terminology map" },
      { week: 2, focus: "ICSR workflow", output: "Case intake checklist" },
      { week: 3, focus: "Case processing", output: "5 processed sample cases" },
      { week: 4, focus: "MedDRA", output: "Coding exercise set" },
      { week: 5, focus: "Seriousness & expectedness", output: "Assessment decision log" },
      { week: 6, focus: "Causality assessment", output: "WHO-UMC / Naranjo cases" },
      { week: 7, focus: "Narrative writing", output: "Safety narratives" },
      { week: 8, focus: "QC", output: "Case quality review" },
      { week: 9, focus: "Signal concepts", output: "Signal-detection exercise" },
      { week: 10, focus: "Portfolio project", output: "End-to-end PV case set" },
      { week: 11, focus: "Interview readiness", output: "PV mock interview" },
      { week: 12, focus: "Deployment readiness", output: "Final assessment + application pack" },
    ],
    project: "Process a realistic ICSR batch from intake through QC and narrative.",
    roleSlug: "pv-associate", programmeSlug: "pharmacovigilance",
  },
  "clinical-data-management": {
    title: "Clinical Data Associate",
    skills: ["EDC", "Data cleaning", "Query management", "Clinical standards", "Database lock"],
    weeks: [
      { week: 1, focus: "Clinical trial data flow", output: "Data lifecycle map" },
      { week: 2, focus: "EDC concepts", output: "Mock CRF and edit checks" },
      { week: 3, focus: "Data cleaning", output: "Cleaning log" },
      { week: 4, focus: "Query management", output: "Query lifecycle exercise" },
      { week: 5, focus: "Reconciliation", output: "External data reconciliation" },
      { week: 6, focus: "Coding & standards", output: "Standards mapping exercise" },
      { week: 7, focus: "Data review", output: "Listing review pack" },
      { week: 8, focus: "Quality control", output: "QC checklist + findings" },
      { week: 9, focus: "Database lock", output: "Lock readiness checklist" },
      { week: 10, focus: "Portfolio project", output: "Clean clinical dataset" },
      { week: 11, focus: "Interview readiness", output: "CDM mock interview" },
      { week: 12, focus: "Deployment readiness", output: "Final assessment + application pack" },
    ],
    project: "Clean, query and prepare a sample clinical dataset for database lock.",
    roleSlug: "cda", programmeSlug: "clinical-data-management",
  },
  "sas-clinical": {
    title: "Clinical SAS Programmer",
    skills: ["SAS", "SQL", "Data steps", "CDISC / SDTM", "Clinical reporting"],
    weeks: [
      { week: 1, focus: "SAS foundations", output: "Data step exercises" },
      { week: 2, focus: "SQL", output: "Query exercise set" },
      { week: 3, focus: "Data transformation", output: "Reusable transformation scripts" },
      { week: 4, focus: "Clinical datasets", output: "Domain mapping exercise" },
      { week: 5, focus: "SDTM", output: "SDTM mini-dataset" },
      { week: 6, focus: "ADaM concepts", output: "Analysis dataset design" },
      { week: 7, focus: "Tables & listings", output: "Clinical TLFs" },
      { week: 8, focus: "Validation", output: "Program QC log" },
      { week: 9, focus: "Submission workflow", output: "Submission-ready package" },
      { week: 10, focus: "Portfolio project", output: "End-to-end SAS analysis" },
      { week: 11, focus: "Interview readiness", output: "SAS technical mock" },
      { week: 12, focus: "Deployment readiness", output: "Final assessment + application pack" },
    ],
    project: "Build an end-to-end clinical analysis pipeline from raw data to TLFs.",
    roleSlug: "sas-programmer", programmeSlug: "sas-clinical",
  },
  "regulatory-affairs": {
    title: "Regulatory Affairs Associate",
    skills: ["Regulatory writing", "Submission structure", "Labeling", "Guidelines", "Document control"],
    weeks: [
      { week: 1, focus: "Regulatory ecosystem", output: "Agency and pathway map" },
      { week: 2, focus: "Guideline reading", output: "Guideline extraction notes" },
      { week: 3, focus: "Regulatory writing", output: "Controlled writing exercise" },
      { week: 4, focus: "Submission structure", output: "Dossier skeleton" },
      { week: 5, focus: "Labeling", output: "Label review exercise" },
      { week: 6, focus: "Compliance", output: "Compliance checklist" },
      { week: 7, focus: "Document control", output: "Version-control workflow" },
      { week: 8, focus: "Response writing", output: "Regulatory response draft" },
      { week: 9, focus: "Quality review", output: "Submission QC pack" },
      { week: 10, focus: "Portfolio project", output: "Mini submission dossier" },
      { week: 11, focus: "Interview readiness", output: "RA mock interview" },
      { week: 12, focus: "Deployment readiness", output: "Final assessment + application pack" },
    ],
    project: "Assemble and QC a miniature regulatory submission package.",
    roleSlug: "ra-associate", programmeSlug: "regulatory-affairs",
  },
  "ai-intelligence": {
    title: "AI / ML Engineer in Healthcare",
    skills: ["Python", "Data handling", "ML fundamentals", "Evaluation", "Healthcare problem framing"],
    weeks: [
      { week: 1, focus: "Python foundations", output: "Reusable Python exercises" },
      { week: 2, focus: "Data handling", output: "Clean healthcare dataset" },
      { week: 3, focus: "Statistics", output: "Exploratory analysis notebook" },
      { week: 4, focus: "ML foundations", output: "Baseline model" },
      { week: 5, focus: "Feature engineering", output: "Feature pipeline" },
      { week: 6, focus: "Model evaluation", output: "Evaluation report" },
      { week: 7, focus: "Healthcare workflows", output: "Problem-to-model brief" },
      { week: 8, focus: "Deployment basics", output: "Simple inference API" },
      { week: 9, focus: "Responsible AI", output: "Risk and validation checklist" },
      { week: 10, focus: "Portfolio project", output: "Healthcare ML application" },
      { week: 11, focus: "Interview readiness", output: "ML technical mock" },
      { week: 12, focus: "Deployment readiness", output: "Final assessment + portfolio" },
    ],
    project: "Ship and evaluate a small healthcare ML workflow with documented limitations.",
    roleSlug: "ml-engineer-health", programmeSlug: "ai-intelligence",
  },
};

export function CareerRoadmapCard({ result }: Props) {
  const path = result.archetype?.topPaths?.[0]?.slug ?? "";
  const roadmap = ROADMAPS[path];
  if (!roadmap) return null;

  const lowSignals = result.evidence?.watchOuts?.slice(0, 3) ?? [];
  return (
    <section className="arzon-v2-card p-5 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="arzon-v2-eyebrow">12-WEEK DEPLOYMENT PLAN</span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[var(--arzon-ink-strong)] sm:text-3xl">{roadmap.title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--arzon-ink-soft)]">
            This is a preparation roadmap, not a placement promise. Your assessment identifies a direction; the work below is what you need to prove.
          </p>
        </div>
        <Clock3 className="hidden h-6 w-6 shrink-0 text-[var(--arzon-blue-700)] sm:block" />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {roadmap.skills.map((skill) => <span key={skill} className="rounded-full border border-[var(--arzon-border)] bg-[var(--arzon-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--arzon-ink-soft)]">{skill}</span>)}
      </div>

      {lowSignals.length > 0 ? (
        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-bold text-[var(--arzon-ink)]">Start with these watch-outs</p>
          <ul className="mt-2 grid gap-2 sm:grid-cols-3">
            {lowSignals.map((item) => <li key={item.questionId} className="text-xs leading-5 text-[var(--arzon-ink-soft)]">{item.note ?? item.chosenLabel}</li>)}
          </ul>
        </div>
      ) : null}

      <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {roadmap.weeks.map((item) => (
          <div key={item.week} className="rounded-xl border border-[var(--arzon-border)] bg-white p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--arzon-blue-700)]">Week {item.week}</span>
              <CheckCircle2 className="h-4 w-4 text-[var(--arzon-success)]" />
            </div>
            <p className="mt-2 text-sm font-bold text-[var(--arzon-ink)]">{item.focus}</p>
            <p className="mt-1 text-xs leading-5 text-[var(--arzon-ink-soft)]">Proof: {item.output}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-[var(--arzon-border)] bg-[var(--arzon-surface-blue)] p-5 tone-light">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--arzon-ink-muted)]">Capstone</p>
        <p className="mt-2 text-sm leading-6 text-[var(--arzon-ink-soft)]">{roadmap.project}</p>
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <Link to="/roles/$slug" params={{ slug: roadmap.roleSlug }} className="arzon-button-secondary">Inspect target role <ArrowRight className="h-4 w-4" /></Link>
        {roadmap.programmeSlug ? <Link to="/courses/$slug" params={{ slug: roadmap.programmeSlug }} className="arzon-button-primary">See preparation programme <ArrowRight className="h-4 w-4" /></Link> : null}
      </div>
    </section>
  );
}
