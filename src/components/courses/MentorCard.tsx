import type { RichCourseMeta } from "@/data/courseMeta";
import type { getTrackTheme } from "@/data/trackTheme";

type Theme = ReturnType<typeof getTrackTheme>;

export function MentorCard({ meta, theme }: { meta: RichCourseMeta; theme: Theme }) {
  return (
    <div
      className="flex flex-col gap-5 rounded-2xl border p-6 sm:flex-row sm:items-start sm:p-7"
      style={{ background: "rgba(17,26,46,1)", borderColor: "rgba(255,255,255,0.10)" }}
    >
      <div
        className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl font-display text-lg font-bold"
        style={{
          background: `linear-gradient(135deg, ${theme.hex.from}, ${theme.hex.to})`,
          color: "#FFFFFF",
        }}
      >
        {meta.instructor.initials}
      </div>
      <div>
        <p
          className={`font-mono text-micro font-semibold uppercase tracking-[0.22em] ${theme.accentText}`}
        >
          Your mentor
        </p>
        <p className="mt-1.5 font-display text-lg font-bold" style={{ color: "#F8FAFC" }}>
          {meta.instructor.name}
        </p>
        <p className={`mt-0.5 text-xs ${theme.accentText}`}>{meta.instructor.title}</p>
        <p className="mt-2 text-body-sm leading-relaxed" style={{ color: "#CBD5E1" }}>
          {meta.instructor.bio}
        </p>
      </div>
    </div>
  );
}
