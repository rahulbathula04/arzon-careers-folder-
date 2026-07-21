import type { Course } from "@/data/courses";
import type { RichCourseMeta } from "@/data/courseMeta";
import type { getTrackTheme } from "@/data/trackTheme";
import { ConversionSection, ConvCard } from "@/components/courses/ConversionSection";
import { CheckCircle2 } from "lucide-react";

type Theme = ReturnType<typeof getTrackTheme>;

/** Beat 05 — the answer in 30 seconds + who it's for. */
export function SolutionBlock({
  course,
  meta,
  theme,
}: {
  course: Course;
  meta: RichCourseMeta;
  theme: Theme;
}) {
  const headline = course.title.split(/\s*[—–-]\s*/)[0];
  return (
    <ConversionSection
      id="solution"
      step="05"
      eyebrow="The 30-second version"
      title={
        <>
          A 12-week, JD-mirrored path engineered around{" "}
          <em className="not-italic" style={{ color: theme.hex.from }}>
            one specific role
          </em>
          .
        </>
      }
      subtitle={`Built for ${meta.bestFor.toLowerCase()}.`}
      theme={theme}
    >
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <ConvCard>
          <p className="text-body-sm leading-relaxed" style={{ color: "#E2E8F0" }}>
            In 12 weeks you'll work on real{" "}
            <span className="font-semibold" style={{ color: "#F8FAFC" }}>
              {headline.toLowerCase()}
            </span>{" "}
            tasks using{" "}
            <span className="font-semibold" style={{ color: "#F8FAFC" }}>
              {course.tools.slice(0, 2).join(" & ")}
            </span>
            , ship{" "}
            <span className="font-semibold" style={{ color: "#F8FAFC" }}>
              {course.projects.major.split(" ").slice(0, 8).join(" ")}…
            </span>{" "}
            and walk out with an ISO-certified internship certificate, a partner project letter and
            a performance-based LOR.
          </p>
          <p className="mt-4 text-body-sm" style={{ color: "#94A3B8" }}>
            Companies hiring our learners:{" "}
            <span className="font-semibold" style={{ color: "#CBD5E1" }}>
              {course.jd.sampleEmployers.slice(0, 4).join(" · ")}
            </span>
            .
          </p>
        </ConvCard>
        <ConvCard>
          <p
            className={`font-mono text-micro font-semibold uppercase tracking-[0.22em] ${theme.accentText}`}
          >
            Who this is for
          </p>
          <p className="mt-2 text-body-sm font-semibold" style={{ color: "#F8FAFC" }}>
            {meta.bestFor}
          </p>
          <ul className="mt-4 space-y-2">
            {meta.prerequisites.map((p) => (
              <li
                key={p}
                className="flex items-start gap-2 text-caption"
                style={{ color: "#CBD5E1" }}
              >
                <CheckCircle2 className={`mt-0.5 h-3.5 w-3.5 flex-shrink-0 ${theme.accentText}`} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </ConvCard>
      </div>
    </ConversionSection>
  );
}
