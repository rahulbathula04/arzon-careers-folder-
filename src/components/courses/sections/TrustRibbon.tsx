import { ShieldCheck, BadgeCheck, Landmark, Building2, GraduationCap, Users } from "lucide-react";
import { PRE_REGISTERED_LABEL } from "@/components/landing/constants";
import { TaskLogo } from "@/components/common/TaskLogo";

const ITEMS: { icon: typeof ShieldCheck | "task"; label: string }[] = [
  { icon: "task", label: "TASK · Govt of Telangana" },
  { icon: ShieldCheck, label: "ISO 9001 certified" },
  { icon: BadgeCheck, label: "MSME · Govt of India" },
  { icon: Building2, label: "MCA registered Pvt Ltd" },
  { icon: GraduationCap, label: "ETV partner programme" },
  { icon: Users, label: `${PRE_REGISTERED_LABEL} learners pre-registered` },
];

/**
 * Beat 02 — credibility ribbon. Single horizontal row on lg, snap-scroll on mobile.
 * Sits flush after the hero so the first scroll-stop is recruiter-grade proof.
 */
export function TrustRibbon() {
  return (
    <div
      data-testid="course-trust-ribbon"
      className="border-y"
      style={{ background: "rgba(15,23,42,0.55)", borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <ul
          className="flex snap-x snap-mandatory gap-2 overflow-x-auto py-3 sm:gap-3 lg:justify-between lg:overflow-visible"
          style={{ scrollbarWidth: "none" }}
        >
          {ITEMS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex shrink-0 snap-start items-center gap-2 rounded-full border px-3 py-1.5"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderColor: "rgba(255,255,255,0.10)",
              }}
            >
              {Icon === "task" ? (
                <TaskLogo size="sm" className="shrink-0" />
              ) : (
                <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: "#F5C451" }} aria-hidden />
              )}
              <span
                className="whitespace-nowrap font-mono text-micro font-semibold uppercase tracking-[0.16em]"
                style={{ color: "#E2E8F0" }}
              >
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
