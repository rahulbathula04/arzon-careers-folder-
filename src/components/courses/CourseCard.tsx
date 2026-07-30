import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { ArrowUpRight, Clock3, Users, Briefcase, Sparkles } from "lucide-react";
import type { Course } from "@/data/courses";
import { getAIRisk, aiRiskMeta, getSalaryBand, getLastBatch } from "@/data/courseExtras";
import { getCourseMeta } from "@/data/courseMeta";
import { thumbFor } from "@/data/courseThumbs";
import { getTrackTheme } from "@/data/trackTheme";

/**
 * Editorial card, single-column composition, no thumbnail.
 * Reads like a programme datasheet: role, salary band, time, AI posture, top skills.
 */
export function CourseCard({ course }: { course: Course }) {
  const { Icon } = course;
  const risk = getAIRisk(course);
  const riskMeta = aiRiskMeta(risk);
  const salary = getSalaryBand(course);
  const batch = getLastBatch(course);
  const meta = getCourseMeta(course);
  const thumb = thumbFor(course.slug, course.category);
  const theme = getTrackTheme(course.slug);

  return (
    <Link
      to="/courses/$slug"
      params={{ slug: course.slug }}
      data-track={course.slug}
      style={{ "--track-from": theme.hex.from, "--track-to": theme.hex.to } as CSSProperties}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06] hover:shadow-[0_0_0_1px_var(--track-from),0_18px_38px_-22px_var(--track-from)]"
    >
      {/* Locked track accent strip - single source of identity color on the card */}
      <span aria-hidden className={`absolute inset-x-0 top-0 z-10 h-[3px] ${theme.accent}`} />
      {/* Cover image, universal 16:9 with algorithmic gradient mesh */}
      <div
        className="relative aspect-[16/9] w-full overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at 10% 20%, color-mix(in srgb, var(--track-from) 40%, transparent) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, color-mix(in srgb, var(--track-to) 40%, transparent) 0%, transparent 50%),
            #0a0c10
          `,
        }}
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        {thumb && (
          <img
            src={thumb}
            alt={`${course.title} programme cover`}
            loading="lazy"
            className="relative z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0 z-20 bg-gradient-to-t from-[#0a0c10]/80 via-transparent to-transparent"
        />
        <div
          className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-[#0a0c10]/80 px-2.5 py-1 shadow-sm ring-1 backdrop-blur ${theme.ring}`}
        >
          <Icon className={`h-3.5 w-3.5 ${theme.accentText}`} />
          <span className="font-mono text-micro font-bold uppercase tracking-[0.18em] text-white">
            {course.category.split(" ")[0]}
          </span>
        </div>
        <ArrowUpRight className="absolute right-3 top-3 h-5 w-5 text-white/70 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
      </div>

      <div className="flex flex-col gap-5 p-5 sm:p-6">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div>
              <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-white/55">
                {course.category}
              </p>
              <p className="mt-0.5 font-mono text-micro text-white/60">
                {course.jd.demand} demand · Difficulty {meta.difficulty}/5
              </p>
            </div>
          </div>
        </div>

        {/* Title & blurb */}
        <div>
          <h3 className="h-card text-white">{course.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/65">{course.blurb}</p>
        </div>

        {/* Salary + AI posture */}
        <div className="grid grid-cols-2 gap-3 rounded-xl border border-white/10 bg-[#0a0c10]/40 backdrop-blur-md shadow-xl ring-1 ring-black/20 p-4">
          <div>
            <p className="font-mono text-micro uppercase tracking-[0.2em] text-white/60">
              Salary band
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              {salary.y1} <span className="text-white/30">→</span> {salary.y3}
            </p>
            <p className="mt-0.5 font-mono text-micro text-white/60">Y1 → Y3</p>
          </div>
          <div>
            <p className="font-mono text-micro uppercase tracking-[0.2em] text-white/60">
              AI posture
            </p>
            <span
              className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-micro font-semibold ${riskMeta.tone}`}
            >
              {riskMeta.label}
            </span>
            <p className="mt-1 font-mono text-micro text-white/60">
              Last batch · {batch.placed}/{batch.total}
            </p>
          </div>
        </div>

        {/* Tools */}
        <div className="flex flex-wrap gap-1.5">
          {course.tools.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-micro text-white/75"
            >
              {t}
            </span>
          ))}
          {course.tools.length > 4 && (
            <span className="rounded-full px-2 py-0.5 font-mono text-micro text-white/60">
              +{course.tools.length - 4}
            </span>
          )}
        </div>

        {/* Footer meta */}
        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 text-micro text-white/55">
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" /> 12 wk
          </span>

          {/* BHARAT UX / GrowthSchool Strategy: Cohort Scarcity */}
          <span className="inline-flex items-center gap-1 text-rose-400 font-semibold bg-rose-400/10 px-2 py-0.5 rounded-full">
            <Users className="h-3 w-3" /> Only 8 seats left
          </span>

          <span
            className={`inline-flex items-center gap-1.5 font-semibold ${theme.accentText} truncate max-w-[120px]`}
          >
            <Briefcase className="h-3.5 w-3.5 shrink-0" />{" "}
            <span className="truncate">{course.jd.hiringRoles[0]?.split("(")[0].trim()}</span>
          </span>
        </div>

        {/* Subtle hover sparkle */}
        <Sparkles
          className={`pointer-events-none absolute right-4 top-4 h-3 w-3 opacity-0 transition-opacity group-hover:opacity-60 ${theme.accentText}`}
        />
      </div>
    </Link>
  );
}
