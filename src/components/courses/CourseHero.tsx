import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Briefcase,
  CalendarClock,
  Clock3,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { thumbFor } from "@/data/courseThumbs";
import { getJdProvenance } from "@/data/jdProvenance";
import type { Course } from "@/data/courses";
import type { RichCourseMeta } from "@/data/courseMeta";
import type { getTrackTheme } from "@/data/trackTheme";

type Theme = ReturnType<typeof getTrackTheme>;
type Cohort = { label: string; startsLabel: string };

interface Props {
  course: Course;
  theme: Theme;
  meta: RichCourseMeta;
  cohort: Cohort;
  isFlagship: boolean;
  titleBlock?: ReactNode;
  pitchMessage: string;
  onPrimaryCta: () => void;
  onWhatsApp: () => void;
  waHref: string;
  /** Desktop-only right-column slot (e.g. EnrolmentRail). Hidden < lg. */
  rightSlot?: ReactNode;
}

function formatNumberINR(n: number) {
  return n.toLocaleString("en-IN");
}
function formatRefresh(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

/**
 * Split a JD-style title like
 *   "Fresher Medical Coder Track - ICD-10-CM + CPT + 3M Encoder"
 * into a clean H1 headline + a mono-caps supporting spec line, so the
 * em-dash never breaks the headline mid-word on narrow screens.
 */
export function splitCourseTitle(title: string): { headline: string; spec: string | null } {
  // Split on em-dash, en-dash, or " - " (with surrounding spaces).
  const m = title.match(/^(.*?)\s*[-–-]\s*(.+)$/);
  if (!m) return { headline: title, spec: null };
  return { headline: m[1].trim(), spec: m[2].trim() };
}

/** Replace the first standalone " - " (em-dash) in body copy with ": " for readability on narrow screens. */
function softenDashes(text: string) {
  return text.replace(/\s+-\s+/g, ": ");
}

/**
 * Shared, systematic hero for /courses/$slug and the internship pages.
 * Mobile-first vertical rhythm. No wrap-roulette. All color tokens explicit
 * for the no-raw-white prebuild guard.
 */
export function CourseHero({
  course,
  theme,
  meta,
  cohort,
  isFlagship,
  titleBlock,
  pitchMessage: _pitchMessage,
  onPrimaryCta,
  onWhatsApp,
  waHref,
  rightSlot,
}: Props) {
  const { Icon } = course;
  const { headline, spec } = splitCourseTitle(course.title);
  const lede = softenDashes(course.heroTagline);
  const heroThumb = thumbFor(course.slug, course.category);
  const jd = getJdProvenance(course.slug);

  return (
    <section className="relative overflow-hidden" data-testid="course-hero" data-slug={course.slug}>
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <img
          src={heroThumb}
          alt=""
          className="h-full w-full object-cover opacity-0 sm:opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E]/70 via-[#0A0F1E]/85 to-[#0A0F1E]" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-10 pt-5 sm:px-6 sm:pt-10 lg:grid lg:grid-cols-[1fr_360px] lg:gap-10 lg:pb-16">
        <div>
          {/* Row 1: back link + Built-in-India chip */}
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
            <Link
              to="/courses"
              className="inline-flex items-center gap-1 font-mono text-micro font-semibold uppercase tracking-[0.22em] transition-colors"
              style={{ color: "#94A3B8" }}
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All programmes
            </Link>
            <span
              className="justify-self-end inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-micro font-semibold uppercase tracking-[0.18em]"
              style={{
                background: "#0F172A",
                borderColor: "rgba(255,255,255,0.12)",
                color: "#E2E8F0",
              }}
            >
              <span aria-hidden>🇮🇳</span>
              <span className="truncate">
                {isFlagship ? "Flagship · Built in India" : "Built in India"}
              </span>
            </span>
          </div>

          {/* Row 2: category chip + icon (inline, same height) */}
          <div className="mt-6 flex items-center gap-2">
            <span
              className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 ${theme.ring}`}
              style={{
                background: `linear-gradient(135deg, ${theme.hex.from}, ${theme.hex.to})`,
                boxShadow: `0 10px 28px -10px ${theme.hex.from}99`,
                color: "#FFFFFF",
              }}
              aria-hidden
            >
              <Icon className="h-4 w-4" />
            </span>
            <span
              className={`inline-flex min-w-0 items-center rounded-full px-3 py-1.5 font-mono text-micro font-semibold uppercase tracking-[0.22em] ring-1 ${theme.ring}`}
              style={{ background: "rgba(15,23,42,0.7)", color: "#F1F5F9" }}
            >
              <span className="truncate">{course.category}</span>
            </span>
          </div>

          {/* H1 + spec supporting line */}
          {titleBlock ?? (
            <>
              <h1 className="h-section mt-4" style={{ color: "#F8FAFC", textWrap: "balance" }}>
                {headline}
              </h1>
              {spec && (
                <p
                  className="mt-2 font-mono text-micro font-semibold uppercase tracking-[0.22em] sm:text-xs"
                  style={{ color: "#A5B4FC" }}
                >
                  {spec}
                </p>
              )}
            </>
          )}

          {/* Lede */}
          <p
            className="mt-4 text-body-sm leading-relaxed sm:text-lg"
            style={{ color: "#CBD5E1", textWrap: "pretty" }}
          >
            {lede}
          </p>

          {/* JD provenance - full-width block on mobile so nothing clips */}
          {jd && (
            <div
              className="mt-5 flex w-full items-start gap-2 rounded-2xl border px-4 py-3"
              style={{
                background: "rgba(15,23,42,0.6)",
                borderColor: "rgba(56,189,248,0.25)",
                color: "#E0F2FE",
              }}
            >
              <ShieldCheck
                className="mt-0.5 h-4 w-4 shrink-0"
                style={{ color: "#7DD3FC" }}
                aria-hidden
              />
              <div className="min-w-0 text-caption leading-snug">
                <p className="font-semibold" style={{ color: "#F1F5F9" }}>
                  Built from {formatNumberINR(jd.jdCount)} live {jd.roleTitle} JDs
                </p>
                <p
                  className="mt-0.5 font-mono text-micro font-semibold uppercase tracking-[0.18em]"
                  style={{ color: "#7DD3FC" }}
                >
                  Refreshed {formatRefresh(jd.refreshedOn)}
                </p>
              </div>
            </div>
          )}

          {/* Stat grid - predictable 2-col on mobile, flex-wrap on sm+ */}
          <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-2">
            <StatChip icon={TrendingUp} theme={theme} label={`${course.jd.demand} demand`} />
            <StatChip icon={Briefcase} theme={theme} label={course.jd.salary} />
            <StatChip
              icon={Clock3}
              theme={theme}
              label={`${meta.weeklyHours}h/wk · ${meta.totalHours}h total`}
            />
            <StatChip icon={Users} theme={theme} label={`Cohort of ${meta.cohortSize}`} />
          </div>

          {/* Cohort badge - full-width on mobile */}
          <div className="mt-3">
            <span
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-2 text-meta font-semibold sm:w-auto"
              style={{ background: "#F5C451", color: "#1A1300" }}
            >
              <CalendarClock className="h-3.5 w-3.5" />
              {cohort.label} cohort · starts {cohort.startsLabel}
            </span>
          </div>

          {/* CTAs - mobile only (desktop CTAs live in EnrolmentRail) */}
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3 lg:hidden">
            <Button
              size="lg"
              variant="premium"
              onClick={onPrimaryCta}
              data-testid="hero-cta"
              className="h-12 w-full justify-center rounded-full px-6 text-base font-semibold sm:w-auto"
            >
              Talk to a counsellor <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <a
              href={waHref}
              target="_blank" rel="noopener noreferrer"
              onClick={onWhatsApp}
              className="inline-flex h-12 w-full items-center justify-center rounded-full border px-5 text-sm font-semibold sm:w-auto"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderColor: "rgba(255,255,255,0.15)",
                color: "#F8FAFC",
              }}
            >
              WhatsApp counsellor
            </a>
          </div>
        </div>

        <div className="mt-10 hidden lg:mt-0 lg:block">{rightSlot}</div>
      </div>
    </section>
  );
}

function StatChip({
  icon: Icon,
  theme,
  label,
}: {
  icon: typeof TrendingUp;
  theme: Theme;
  label: string;
}) {
  return (
    <span
      className={`inline-flex min-w-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-micro font-semibold ring-1 ${theme.ring}`}
      style={{ background: "rgba(15,23,42,0.7)", color: "#F1F5F9" }}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: theme.hex.from }} />
      <span className="truncate">{label}</span>
    </span>
  );
}
