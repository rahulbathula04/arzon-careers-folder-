import { CheckCircle2, Briefcase, TrendingUp, GraduationCap } from "lucide-react";
import type { Course } from "@/data/courses";
import type { RichCourseMeta } from "@/data/courseMeta";
import type { getTrackTheme } from "@/data/trackTheme";
import { ConversionSection } from "@/components/courses/ConversionSection";

type Theme = ReturnType<typeof getTrackTheme>;

/** Beat 08 - what you walk out with. Stats + shipped projects + outcome list. */
export function OutcomeBlock({
  course,
  meta,
  theme,
}: {
  course: Course;
  meta: RichCourseMeta;
  theme: Theme;
}) {
  return (
    <ConversionSection
      id="outcomes"
      step="08"
      eyebrow="By the end of week 12"
      title="You walk into interviews with three weapons most freshers don't have."
      subtitle="Concrete, role-aligned outputs - not vague promises."
      theme={theme}
    >
      {/* Stats wall */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat
          icon={Briefcase}
          label="Avg salary"
          value={course.jd.salary}
          hint="from real JDs"
          theme={theme}
        />
        <Stat
          icon={GraduationCap}
          label="Last cohort"
          value={`${meta.capstoneStats.shipped}/${meta.capstoneStats.total} shipped capstone`}
          hint={`Avg score ${meta.capstoneStats.avgScore}/100`}
          theme={theme}
        />
        <Stat
          icon={TrendingUp}
          label="Top employers"
          value={course.jd.sampleEmployers.slice(0, 3).join(" · ")}
          hint="hiring for these roles now"
          theme={theme}
        />
      </div>

      {/* Outcome list */}
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {meta.outcomes.map((o) => (
          <li
            key={o}
            className="flex items-start gap-3 rounded-2xl border p-4"
            style={{ background: "rgba(17,26,46,1)", borderColor: "rgba(255,255,255,0.10)" }}
          >
            <CheckCircle2 className={`mt-0.5 h-4 w-4 flex-shrink-0 ${theme.accentText}`} />
            <span className="text-body-sm leading-relaxed" style={{ color: "#E2E8F0" }}>
              {o}
            </span>
          </li>
        ))}
      </ul>

      {/* Shipped projects */}
      <div className="mt-12">
        <p
          className={`font-mono text-micro font-semibold uppercase tracking-[0.22em] ${theme.accentText}`}
        >
          Real projects you'll ship
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            { tag: "Minor 1", text: course.projects.minor[0] },
            { tag: "Minor 2", text: course.projects.minor[1] },
            { tag: "Major", text: course.projects.major },
          ].map((p) => (
            <div
              key={p.tag}
              className="rounded-2xl border p-5"
              style={{ background: "rgba(17,26,46,1)", borderColor: "rgba(255,255,255,0.10)" }}
            >
              <span
                className={`inline-flex rounded-full px-2.5 py-1 font-mono text-micro font-semibold uppercase tracking-[0.2em] ring-1 ${theme.chip} ${theme.ring}`}
              >
                {p.tag}
              </span>
              <p className="mt-4 text-body-sm leading-relaxed" style={{ color: "#E2E8F0" }}>
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ConversionSection>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  hint,
  theme,
}: {
  icon: typeof Briefcase;
  label: string;
  value: string;
  hint?: string;
  theme: Theme;
}) {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{ background: "rgba(17,26,46,1)", borderColor: "rgba(255,255,255,0.10)" }}
    >
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${theme.accentText}`} />
        <p
          className={`font-mono text-micro font-semibold uppercase tracking-[0.22em] ${theme.accentText}`}
        >
          {label}
        </p>
      </div>
      <p className="mt-2 font-display text-lg font-bold sm:text-h4" style={{ color: "#F8FAFC" }}>
        {value}
      </p>
      {hint && (
        <p className="mt-1 text-xs" style={{ color: "#94A3B8" }}>
          {hint}
        </p>
      )}
    </div>
  );
}
