import type { Course } from "@/data/courses";
import type { getTrackTheme } from "@/data/trackTheme";
import { ConversionSection } from "@/components/courses/ConversionSection";

type Theme = ReturnType<typeof getTrackTheme>;

/** Beat 06 — week-by-week visual timeline derived from course.syllabus. */
export function HowItWorksTimeline({ course, theme }: { course: Course; theme: Theme }) {
  return (
    <ConversionSection
      id="how-it-works"
      step="06"
      eyebrow="How the 12 weeks unfold"
      title="Six modules. Every module ships a JD-aligned deliverable."
      subtitle="No padding. Each milestone maps to a specific line on a real Drug Safety / Coder / CDM JD so you can point recruiters at the proof."
      theme={theme}
    >
      <ol className="relative space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-4">
        {course.syllabus.map((m, i) => (
          <li
            key={m.title}
            className="relative rounded-2xl border p-5"
            style={{ background: "rgba(15,23,42,0.6)", borderColor: "rgba(255,255,255,0.10)" }}
          >
            <div className="flex items-center gap-2">
              <span
                className="inline-flex h-7 w-7 items-center justify-center rounded-full font-mono text-micro font-bold"
                style={{
                  background: `linear-gradient(135deg, ${theme.hex.from}, ${theme.hex.to})`,
                  color: "#FFFFFF",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`font-mono text-micro font-semibold uppercase tracking-[0.22em] ${theme.accentText}`}
              >
                {m.weeks}
              </span>
            </div>
            <p
              className="mt-3 font-display text-body font-bold leading-snug"
              style={{ color: "#F8FAFC" }}
            >
              {m.title}
            </p>
            <p className="mt-2 text-caption leading-relaxed" style={{ color: "#CBD5E1" }}>
              Ships:{" "}
              <span className="font-semibold" style={{ color: "#E2E8F0" }}>
                {m.deliverable}
              </span>
            </p>
            <p
              className="mt-3 font-mono text-micro font-semibold uppercase tracking-[0.18em]"
              style={{ color: "#94A3B8" }}
            >
              Maps to JD: {m.jdSkill}
            </p>
          </li>
        ))}
      </ol>
    </ConversionSection>
  );
}
