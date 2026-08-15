import * as React from "react";
import { Sparkles, Brain, Award, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DimensionMetric {
  name: string;
  score: number;
  color: string;
}

export interface SkillConstellationMapProps {
  currentScore?: number;
  targetScore?: number;
  dimensions?: DimensionMetric[];
  className?: string;
}

const DEFAULT_DIMENSIONS: DimensionMetric[] = [
  { name: "Domain Depth", score: 85, color: "#14B8A6 text-teal-400 border-teal-500/30" },
  { name: "Problem Solving", score: 74, color: "#3B82F6 text-blue-400 border-blue-500/30" },
  { name: "Communication & Pitch", score: 80, color: "#F59E0B text-amber-400 border-amber-500/30" },
  { name: "Execution Speed", score: 68, color: "#A855F7 text-purple-400 border-purple-500/30" },
  { name: "Role Compliance", score: 92, color: "#10B981 text-emerald-400 border-emerald-500/30" },
];

export function SkillConstellationMap({
  currentScore = 78,
  targetScore = 88,
  dimensions = DEFAULT_DIMENSIONS,
  className,
}: SkillConstellationMapProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-6 shadow-xl transition-all hover:border-primary/40",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Neural ACRI Readiness Constellation
            </h3>
            <p className="text-xs text-muted-foreground">
              Real-time 5-dimension competency neural graph
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-teal-500/10 px-3 py-1 font-mono text-xs font-bold text-teal-400 border border-teal-500/30">
            Current: {currentScore} / {targetScore} ACRI
          </span>
        </div>
      </div>

      {/* Visual Neural Node Grid */}
      <div className="grid gap-4 md:grid-cols-5">
        {dimensions.map((dim) => (
          <div
            key={dim.name}
            className="flex flex-col items-center justify-center rounded-xl border border-border/80 bg-muted/20 p-3.5 text-center transition-all hover:border-primary/30"
          >
            <div className="relative mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border shadow-xs">
              <span className="font-mono text-xs font-bold">{dim.score}%</span>
            </div>
            <span className="text-xs font-medium text-foreground line-clamp-1">{dim.name}</span>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${dim.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl bg-teal-500/10 border border-teal-500/20 p-3.5 text-xs text-teal-300">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 shrink-0 text-teal-400" />
          <span>
            <strong>AI Insight:</strong> You are <strong>10 ACRI points</strong> away from recruiter priority matching eligibility. Complete your next module to boost Domain Depth!
          </span>
        </div>
      </div>
    </div>
  );
}
