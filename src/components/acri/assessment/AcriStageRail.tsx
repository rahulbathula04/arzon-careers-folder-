/**
 * AcriStageRail — Left dark sidebar
 *
 * Reference: Image 4 — left nav with deep green (#07241A) background,
 * logo at top, section items with completion states, bottom decorative area.
 *
 * Desktop: fixed-width sidebar (var(--sidebar-width))
 * Mobile: hidden (toggled as drawer via AcriAssessmentShell)
 */
import { CheckCircle2, Circle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ArzonLogo } from "@/components/acri/ArzonLogo";
import { cn } from "@/lib/utils";

export interface StageInfo {
  name: string;
  category: string;
  isComplete: boolean;
  isActive: boolean;
  questionCount?: number;
  completedCount?: number;
}

interface AcriStageRailProps {
  stages: StageInfo[];
  currentCategory: string;
  mode: "practice" | "certified";
  onSelectCategory?: (category: string) => void;
  className?: string;
}

const NAV_ITEMS = [
  { label: "Overview", icon: "◈", href: "#" },
  { label: "Assessment", icon: "◉", href: "#", active: true },
  { label: "Instructions", icon: "◎", href: "#" },
  { label: "Live Support", icon: "◐", href: "#" },
];

export function AcriStageRail({
  stages,
  currentCategory,
  mode,
  onSelectCategory,
  className,
}: AcriStageRailProps) {
  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col shrink-0",
        "bg-[var(--color-bg-assessment)]",
        "border-r border-[rgba(255,255,255,0.06)]",
        "shadow-[var(--shadow-assessment-sidebar)]",
        className,
      )}
      style={{ width: "var(--sidebar-width)" }}
    >
      {/* ── Logo ─────────────────────────────────────────────────── */}
      <div className="px-4 py-4 border-b border-[rgba(255,255,255,0.06)]">
        <Link to="/" className="block hover:opacity-80 transition-opacity">
          <ArzonLogo variant="dark" size="sm" />
        </Link>
        <div className="mt-2 flex items-center gap-1.5">
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest border",
              mode === "certified"
                ? "bg-emerald-950 text-emerald-300 border-emerald-700/40"
                : "bg-blue-950 text-blue-300 border-blue-700/40",
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse shrink-0" />
            {mode === "certified" ? "Certified" : "Practice"}
          </span>
        </div>
      </div>

      {/* ── Top-Level Nav ─────────────────────────────────────────── */}
      <div className="px-3 py-3 border-b border-[rgba(255,255,255,0.06)]">
        {NAV_ITEMS.map((item) => (
          <div
            key={item.label}
            className={cn(
              "flex items-center gap-2.5 px-2.5 py-1.5 rounded-[var(--radius-sm)] text-[11px] font-medium cursor-default select-none",
              item.active
                ? "text-white bg-[var(--color-bg-assessment-item)]"
                : "text-[rgba(255,255,255,0.45)] hover:text-[rgba(255,255,255,0.65)]",
            )}
          >
            <span className="text-[10px] font-mono shrink-0 w-3 text-center opacity-70">
              {item.icon}
            </span>
            {item.label}
          </div>
        ))}
      </div>

      {/* ── Section Navigator ─────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        <div className="font-mono text-[9px] text-[rgba(255,255,255,0.35)] uppercase tracking-[0.22em] mb-2 px-2">
          Sections
        </div>
        <nav className="space-y-0.5" aria-label="Assessment sections">
          {stages.map((stage, idx) => {
            const isActive = stage.category === currentCategory;
            const done = stage.isComplete;

            return (
              <button
                key={stage.category}
                type="button"
                onClick={() => onSelectCategory?.(stage.category)}
                disabled={!onSelectCategory}
                className={cn(
                  "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[var(--radius-sm)]",
                  "text-left text-[11px] transition-colors duration-[var(--duration-fast)]",
                  "disabled:cursor-default focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500/40",
                  isActive
                    ? "bg-[rgba(22,163,74,0.18)] text-white"
                    : done
                    ? "text-[rgba(255,255,255,0.55)] hover:bg-[rgba(255,255,255,0.05)]"
                    : "text-[rgba(255,255,255,0.35)] hover:bg-[rgba(255,255,255,0.04)]",
                )}
                aria-current={isActive ? "step" : undefined}
              >
                {/* Status icon */}
                <span className="shrink-0">
                  {done ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  ) : isActive ? (
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  ) : (
                    <Circle className="h-3 w-3 text-[rgba(255,255,255,0.2)]" />
                  )}
                </span>

                {/* Label */}
                <span className={cn("flex-1 truncate font-medium", isActive && "font-semibold")}>
                  {stage.name}
                </span>

                {/* Progress count */}
                {stage.questionCount != null && (
                  <span className="font-mono text-[9px] text-[rgba(255,255,255,0.3)] shrink-0">
                    {stage.completedCount ?? 0}/{stage.questionCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ── Bottom decorative + standard strip ───────────────────── */}
      <div className="px-4 py-4 border-t border-[rgba(255,255,255,0.06)]">
        {/* Motivational quote — matches reference image composition */}
        <div className="mb-3 p-3 rounded-[var(--radius-md)] bg-[rgba(22,163,74,0.08)] border border-[rgba(22,163,74,0.15)]">
          <p className="font-mono text-[10px] text-[rgba(255,255,255,0.5)] leading-relaxed italic">
            "Every expert was once a candidate who kept going."
          </p>
        </div>

        {/* Standard version */}
        <div className="text-[9px] font-mono text-[rgba(255,255,255,0.25)] space-y-0.5">
          <div className="font-bold text-[rgba(255,255,255,0.35)]">ACRI-PV v1.0</div>
          <div>EMA GVP VI · ICH E2B(R3)</div>
        </div>
      </div>
    </aside>
  );
}
