import { XCircle, CheckCircle2 } from "lucide-react";
import type { Course } from "@/data/courses";
import type { getTrackTheme } from "@/data/trackTheme";
import { ConversionSection } from "@/components/courses/ConversionSection";
import { COMMON_GAPS_BY_CATEGORY } from "@/data/internshipFallbacks";

type Theme = ReturnType<typeof getTrackTheme>;

/** Beat 03 - name the problem in the recruiter's voice. */
export function ProblemBlock({ course, theme }: { course: Course; theme: Theme }) {
  const gaps = COMMON_GAPS_BY_CATEGORY[course.category];
  const role = course.jd.hiringRoles[0] ?? "fresher";
  return (
    <ConversionSection
      id="problem"
      step="03"
      eyebrow="Why most freshers stay unemployed"
      title={
        <>
          The gap isn't your degree. It's the{" "}
          <em className="not-italic" style={{ color: theme.hex.from }}>
            vocabulary recruiters listen for
          </em>
          .
        </>
      }
      subtitle={`Recruiters screening ${role} resumes spend 7 seconds per CV. Here's the exact line that gets you binned vs. shortlisted.`}
      theme={theme}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div
          className="rounded-2xl border p-5 sm:p-6"
          style={{ background: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.25)" }}
        >
          <p
            className="font-mono text-micro font-semibold uppercase tracking-[0.22em]"
            style={{ color: "#FCA5A5" }}
          >
            What gets you rejected
          </p>
          <ul className="mt-4 space-y-4">
            {gaps.map((g) => (
              <li key={g.rejected} className="flex items-start gap-3">
                <XCircle
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: "#F87171" }}
                  aria-hidden
                />
                <span className="text-body-sm leading-relaxed" style={{ color: "#FECACA" }}>
                  {g.rejected}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="rounded-2xl border p-5 sm:p-6"
          style={{ background: "rgba(16,185,129,0.06)", borderColor: "rgba(16,185,129,0.25)" }}
        >
          <p
            className="font-mono text-micro font-semibold uppercase tracking-[0.22em]"
            style={{ color: "#6EE7B7" }}
          >
            What gets you hired
          </p>
          <ul className="mt-4 space-y-4">
            {gaps.map((g) => (
              <li key={g.hired} className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: "#34D399" }}
                  aria-hidden
                />
                <span className="text-body-sm leading-relaxed" style={{ color: "#D1FAE5" }}>
                  {g.hired}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ConversionSection>
  );
}
