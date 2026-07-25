import { ShieldCheck, Target, ArrowRight, BookOpen, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface SkillDimension {
  domain: string;
  score: number;
  maxScore: number;
  status: "strong" | "adequate" | "needs_work";
  remediationModule: string;
}

interface SkillRadarChartProps {
  skills?: SkillDimension[];
  overallFitScore?: number;
}

const DEFAULT_SKILLS: SkillDimension[] = [
  {
    domain: "GCP & Regulatory Compliance",
    score: 88,
    maxScore: 100,
    status: "strong",
    remediationModule: "ICH-GCP E6(R2) Guidelines Refresher",
  },
  {
    domain: "MedDRA & Safety Coding",
    score: 74,
    maxScore: 100,
    status: "adequate",
    remediationModule: "MedDRA Terminology & Adverse Event Coding",
  },
  {
    domain: "Pharmacovigilance Signal Detection",
    score: 58,
    maxScore: 100,
    status: "needs_work",
    remediationModule: "15-Min Signal Detection & Case Safety Masterclass",
  },
  {
    domain: "Clinical Data Management (EDC)",
    score: 82,
    maxScore: 100,
    status: "strong",
    remediationModule: "eCRF Design & Query Resolution Basics",
  },
  {
    domain: "Clinical Trial Protocol Analysis",
    score: 69,
    maxScore: 100,
    status: "adequate",
    remediationModule: "Protocol Deviation & Monitoring Logs",
  },
];

export function SkillRadarChart({ skills = DEFAULT_SKILLS, overallFitScore = 78 }: SkillRadarChartProps) {
  return (
    <div className="rounded-3xl border border-sky-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/20 p-6 sm:p-8 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-400 border border-sky-500/20 mb-2">
            <Target className="h-3.5 w-3.5" /> ACRI Adaptive Skill Diagnostic Radar
          </div>
          <h2 className="font-grotesk text-2xl font-bold text-white">
            Skill Competency Matrix
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Real-time evaluation across 5 core healthcare career pillars.
          </p>
        </div>

        <div className="bg-slate-950/80 px-5 py-3 rounded-2xl border border-slate-800 text-center sm:text-right">
          <p className="text-micro font-semibold text-slate-400 uppercase tracking-widest">Overall ACRI Score</p>
          <p className="font-grotesk text-3xl font-black text-sky-400">{overallFitScore}%</p>
        </div>
      </div>

      {/* Skills Bars & Remediation Recommendations */}
      <div className="mt-6 space-y-4">
        {skills.map((skill) => {
          const isStrong = skill.status === "strong";
          const isAdequate = skill.status === "adequate";
          const isNeedsWork = skill.status === "needs_work";

          return (
            <div
              key={skill.domain}
              className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 sm:p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-white">{skill.domain}</span>
                  {isStrong && (
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-micro font-bold text-emerald-400">
                      Strong Match
                    </span>
                  )}
                  {isAdequate && (
                    <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-micro font-bold text-amber-400">
                      Good Foundation
                    </span>
                  )}
                  {isNeedsWork && (
                    <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-micro font-bold text-red-400 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" /> Focus Required
                    </span>
                  )}
                </div>
                <span className="font-mono text-xs font-bold text-slate-300">
                  {skill.score} / {skill.maxScore}
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    isStrong
                      ? "bg-emerald-400"
                      : isAdequate
                      ? "bg-amber-400"
                      : "bg-red-400"
                  }`}
                  style={{ width: `${skill.score}%` }}
                />
              </div>

              {/* Targeted Remediation Nudge if needs work or adequate */}
              {!isStrong && (
                <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl bg-slate-900/80 px-3.5 py-2.5 border border-slate-800/80 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <BookOpen className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                    <span>Recommended 15-Min Fix: <strong>{skill.remediationModule}</strong></span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs text-sky-400 hover:text-white hover:bg-sky-500/20 font-semibold shrink-0"
                    onClick={() => window.location.href = "/curriculum"}
                  >
                    Review Lesson <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
