import type * as React from "react";
import { BookOpen, Wrench, Gauge, Briefcase, Handshake } from "lucide-react";
import { RichCard, type RichCardTone } from "@/components/ui/RichCard";

const PHASES = [
  {
    id: "foundations",
    icon: BookOpen,
    label: "Foundations",
    tone: "blue" as RichCardTone,
    window: "Weeks 1–2",
    body: "ICSR, MedDRA, drug safety workflows, terminology, regulatory awareness.",
    deliverables: ["Vocabulary fluency", "Regulatory map", "Workflow briefing"],
  },
  {
    id: "operational",
    icon: Wrench,
    label: "Operational Readiness",
    tone: "orange" as RichCardTone,
    window: "Weeks 3–6",
    body: "Case processing simulations, narrative writing, seriousness logic, triage.",
    deliverables: ["10+ case simulations", "Triage rubric", "Narrative drafts"],
  },
  {
    id: "assay",
    icon: Gauge,
    label: "ASSAY Evaluation",
    tone: "violet" as RichCardTone,
    window: "Week 7",
    body: "Workflow simulation, communication checks, PV reasoning evaluation. Generates ACRI.",
    deliverables: ["ACRI score card", "Gap report", "Targeted drills"],
  },
  {
    id: "industry",
    icon: Briefcase,
    label: "Industry Readiness",
    tone: "emerald" as RichCardTone,
    window: "Weeks 8–11",
    body: "Mock production workflows, interview readiness, professional communication.",
    deliverables: ["Mock interviews", "Resume rewrite", "Comms drills"],
  },
  {
    id: "referral",
    icon: Handshake,
    label: "Referral Support",
    tone: "navy" as RichCardTone,
    window: "Week 12+",
    body: "Recruiter introductions, hiring visibility, interview readiness coaching.",
    deliverables: ["Recruiter intros", "Profile push", "Interview coaching"],
  },
] as const;

/**
 * Five-phase visual timeline for the workforce-readiness journey.
 * Mobile = vertical stack, desktop = horizontal rail with index pills.
 */
export function ReadinessTimeline() {
  return (
    <section
      aria-labelledby="readiness-timeline-heading"
      className="mx-auto mt-20 max-w-6xl px-4 sm:px-6"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-[var(--teal-deep)]">
          The 12-week readiness system
        </p>
        <h2 id="readiness-timeline-heading" className="h-section mt-3">
          Five phases. One outcome: <span className="text-primary-glow">operationally ready.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-body-sm leading-relaxed text-[var(--ink-soft)]">
          Each phase ships a tangible deliverable you can show a recruiter, not just lecture notes.
        </p>
      </div>

      <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {PHASES.map((p, i) => {
          const Icon = p.icon;
          return (
            <RichCard as="li" key={p.id} tone={p.tone} elevation="lifted" className="h-full">
              <RichCard.Header
                compact
                art={
                  <Icon aria-hidden className="h-full w-full text-slate-200/35" strokeWidth={1.4} />
                }
              >
                <RichCard.EyebrowRow>
                  <RichCard.Chip>
                    <Icon aria-hidden />
                    Step {String(i + 1).padStart(2, "0")}
                  </RichCard.Chip>
                  <RichCard.Chip>{p.window}</RichCard.Chip>
                </RichCard.EyebrowRow>
                <RichCard.Title as="h3" className="text-h4 sm:text-h4">
                  {p.label}
                </RichCard.Title>
              </RichCard.Header>
              <RichCard.Body compact>
                <p className="text-caption leading-relaxed">{p.body}</p>
                <RichCard.CheckList
                  items={p.deliverables as unknown as React.ReactNode[]}
                  className="text-caption"
                />
              </RichCard.Body>
            </RichCard>
          );
        })}
      </ol>
    </section>
  );
}
