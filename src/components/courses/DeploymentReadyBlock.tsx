import { BookOpen, GitBranch, MonitorSmartphone, Users2, CheckCircle2 } from "lucide-react";
import type { DeploymentReadiness, DeploymentPillarId } from "@/data/deploymentReadiness";

const PILLAR_ICON: Record<DeploymentPillarId, typeof BookOpen> = {
  domain: BookOpen,
  process: GitBranch,
  tools: MonitorSmartphone,
  workplace: Users2,
};

const PILLAR_ACCENT: Record<DeploymentPillarId, string> = {
  domain: "from-[#3B82F6] to-[#1E40AF]",
  process: "from-[#14B8A6] to-[#0E7490]",
  tools: "from-[#A855F7] to-[#6D28D9]",
  workplace: "from-[#F59E0B] to-[#B45309]",
};

/**
 * Course-page block that renders the Arzon 40/30/20/10 Deployment-Ready
 * framework plus the four-part "I Know / I Understand / I Have Practiced /
 * I Have Exposure To" outcome promise. Dark surface to match the course
 * page's DarkBackdrop.
 */
export function DeploymentReadyBlock({
  data,
  accentText = "text-white/70",
}: {
  data: DeploymentReadiness;
  accentText?: string;
}) {
  return (
    <div className="space-y-10">
      {/* Lede */}
      <div className="max-w-3xl">
        <p
          className={`font-mono text-micro font-semibold uppercase tracking-[0.28em] ${accentText}`}
        >
          Deployment-Ready Outcome
        </p>
        <h3 className="mt-2 font-display text-h3 font-bold text-white sm:text-h2">
          {data.promise}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          Every Arzon track is engineered around the same four-pillar formula so recruiters get the
          only answer that matters:{" "}
          <em className="not-italic text-white/90">
            “Yes, they can contribute with minimal training.”
          </em>
        </p>
      </div>

      {/* 40/30/20/10 bar */}
      <div>
        <div
          className="flex h-3 w-full overflow-hidden rounded-full border border-white/10"
          role="img"
          aria-label="Training mix: 40% Domain, 30% Process, 20% Tools, 10% Workplace"
        >
          {data.pillars.map((p) => (
            <div
              key={p.id}
              className={`h-full bg-gradient-to-r ${PILLAR_ACCENT[p.id]}`}
              style={{ width: `${p.weight}%` }}
            />
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-mono text-micro uppercase tracking-[0.18em] text-white/60">
          {data.pillars.map((p) => (
            <span key={p.id}>
              <span className="text-white/90">{p.weight}%</span> {p.label}
            </span>
          ))}
        </div>
      </div>

      {/* Four pillar cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {data.pillars.map((p) => {
          const Icon = PILLAR_ICON[p.id];
          return (
            <div key={p.id} className="rounded-2xl border border-white/10 bg-[#0F1A33] p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${PILLAR_ACCENT[p.id]} text-white`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p
                      className={`font-mono text-micro font-semibold uppercase tracking-[0.22em] ${accentText}`}
                    >
                      {p.weight}% · Pillar
                    </p>
                    <p className="mt-0.5 font-display text-lg font-bold text-white">{p.label}</p>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs italic leading-relaxed text-white/60">
                Recruiter ask: “{p.recruiterAsk}”
              </p>
              <ul className="mt-4 space-y-2">
                {p.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-start gap-2 text-sm leading-relaxed text-white/85"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#34D399]" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Outcome grid */}
      <div className="rounded-2xl border border-white/10 bg-[#0F1A33] p-6 sm:p-8">
        <p
          className={`font-mono text-micro font-semibold uppercase tracking-[0.28em] ${accentText}`}
        >
          When you finish, you can say…
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              { key: "know", label: "I Know", items: data.outcome.know, accent: accentText },
              {
                key: "understand",
                label: "I Understand",
                items: data.outcome.understand,
                accent: "text-[#34D399]",
              },
              {
                key: "practiced",
                label: "I Have Practiced",
                items: data.outcome.practiced,
                accent: "text-[#F59E0B]",
              },
              {
                key: "exposureTo",
                label: "I Have Exposure To",
                items: data.outcome.exposureTo,
                accent: "text-[#A855F7]",
              },
            ] as const
          ).map((col) => (
            <div key={col.key} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p
                className={`font-mono text-micro font-semibold uppercase tracking-[0.22em] ${col.accent}`}
              >
                {col.label}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-white/85">
                {col.items.map((i) => (
                  <li key={i} className="leading-snug">
                    · {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
