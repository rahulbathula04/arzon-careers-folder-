import { Link } from "@tanstack/react-router";
import { BookOpen, GitBranch, MonitorSmartphone, Users2, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "./SectionHeader";

const PILLARS = [
  {
    id: "domain",
    weight: 40,
    label: "Domain Knowledge",
    Icon: BookOpen,
    desc: "Why the work exists. Terminology. Regulations.",
    accent: "from-[#3B82F6] to-[#1E40AF]",
  },
  {
    id: "process",
    weight: 30,
    label: "Process Training",
    Icon: GitBranch,
    desc: "Workflow. Escalation. SOP culture.",
    accent: "from-[#14B8A6] to-[#0E7490]",
  },
  {
    id: "tools",
    weight: 20,
    label: "Tool Exposure",
    Icon: MonitorSmartphone,
    desc: "Screens, navigation, real industry workflow.",
    accent: "from-[#A855F7] to-[#6D28D9]",
  },
  {
    id: "workplace",
    weight: 10,
    label: "Workplace Readiness",
    Icon: Users2,
    desc: "Email, reporting, meetings, stakeholders.",
    accent: "from-[#F59E0B] to-[#B45309]",
  },
] as const;

/**
 * Compact homepage strip introducing the Arzon 40/30/20/10
 * Deployment-Ready model. Links out to the full /deployment-model page.
 */
export function DeploymentReadyStrip() {
  return (
    <Section id="deployment-model" size="lg">
      <SectionHeader
        eyebrow="The Arzon model"
        title={<>" Deployment-ready "</>}
        sub={
          <>
            Every track is engineered around one recruiter question !<br />
            "Can this candidate contribute with minimal training?"
          </>
        }
      />

      {/* 40/30/20/10 bar */}
      <div className="mx-auto mt-10 max-w-4xl">
        <div
          className="flex h-3 w-full overflow-hidden rounded-full border border-black/10"
          role="img"
          aria-label="Training mix: 40% Domain, 30% Process, 20% Tools, 10% Workplace"
        >
          {PILLARS.map((p) => (
            <div
              key={p.id}
              className={`h-full bg-gradient-to-r ${p.accent}`}
              style={{ width: `${p.weight}%` }}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map((p) => (
          <div
            key={p.id}
            className="card-light rounded-2xl p-5 transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${p.accent} text-slate-50`}
              >
                <p.Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="font-display text-h3 font-bold text-ink leading-none">{p.weight}%</p>
                <p className="mt-0.5 font-mono text-micro uppercase tracking-[0.18em] text-primary">
                  {p.label}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          to="/deployment-model"
          className="inline-flex h-11 items-center rounded-full border border-primary/30 bg-primary/5 px-5 text-sm font-semibold text-primary transition hover:bg-primary/10"
        >
          See the full Deployment-Ready model <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
