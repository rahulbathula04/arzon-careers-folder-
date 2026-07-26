import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Award,
  Flame,
  Bookmark,
  MessageCircle,
} from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { useApplication } from "@/hooks/useApplication";
import { useProgress } from "@/hooks/useProgress";
import { COURSES, COURSES_BY_SLUG } from "@/data/courses";
import { COHORT_BY_ID, NEXT_COHORT, waLink } from "@/components/landing/constants";
import { getCourseLessonCount } from "@/lib/lessons";
import { LearningStreakCard } from "@/components/dashboard/LearningStreakCard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your dashboard. Arzon Global" },
      {
        name: "description",
        content:
          "Resume your programme, track progress, see your cohort schedule and download your certificates.",
      },
      { property: "og:title", content: "Your Arzon dashboard" },
      {
        property: "og:description",
        content: "Pick up where you left off and see your cohort milestones.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { state } = useApplication();
  const slug = state.programmeSlug ?? COURSES[0].slug;
  const course = COURSES_BY_SLUG[slug];
  const cohort = state.cohortId ? COHORT_BY_ID[state.cohortId] : NEXT_COHORT;
  const progress = useProgress(course.slug);
  const totalLessons = getCourseLessonCount(course);
  const pct = Math.round((progress.stats.completedCount / Math.max(1, totalLessons)) * 100);
  const lv = progress.state.lastVisited;
  const resumeM = lv?.moduleIndex !== undefined ? lv.moduleIndex + 1 : 1;
  const resumeL = lv?.lessonIndex !== undefined ? lv.lessonIndex + 1 : 1;
  const isApplicant = !!state.applicationId;
  const isPaid = state.depositPaid;

  return (
    <main className="tone-dark min-h-app bg-[#0A0F1E] text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
            {isPaid ? "Welcome back" : isApplicant ? "Application in progress" : "Preview mode"}
          </p>
          <h1 className="h-display mt-3">
            {state.profile.fullName
              ? `Hi ${state.profile.fullName.split(" ")[0]} 👋`
              : "Your learning home"}
          </h1>
          <p className="mt-3 max-w-xl text-sm text-white/65">
            {isPaid
              ? `Your seat in ${cohort.label} is locked. Cohort starts ${cohort.startsLabel}.`
              : isApplicant
                ? "Finish your application to lock your seat. You can keep previewing lessons in the meantime."
                : "You're previewing as a guest. Start your application any time, no payment required."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 space-y-8">
        <LearningStreakCard />

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Resume card */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#101A33] to-[#0B1224] p-7">
            <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
              Your programme
            </p>
            <h2 className="h-section mt-2">{course.title}</h2>
            <p className="mt-1 text-xs text-white/80">{course.category}</p>

            <div className="mt-5">
              <div className="flex items-center justify-between text-xs text-white/65">
                <span>Course progress</span>
                <span className="font-mono">
                  {progress.stats.completedCount}/{totalLessons} lessons · {pct}%
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Stat icon={Flame} label="Day streak" value={`${progress.stats.streak}`} />
              <Stat icon={Bookmark} label="Bookmarks" value={`${progress.stats.bookmarksCount}`} />
              <Stat
                icon={CheckCircle2}
                label="Assignments"
                value={`${progress.stats.assignmentsCount}`}
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/learn/$slug"
                params={{ slug: course.slug }}
                search={{ m: resumeM, l: resumeL }}
                className="inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                style={{ boxShadow: "var(--shadow-glow)" }}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                {progress.stats.completedCount > 0 ? "Resume learning" : "Start learning"}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
              <Link
                to="/courses/$slug"
                params={{ slug: course.slug }}
                className="inline-flex h-11 items-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white hover:bg-white/10"
              >
                See programme overview
              </Link>
            </div>
          </div>

          {/* Cohort + status */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary-glow">
                Cohort
              </p>
              <p className="mt-2 font-display text-h4 text-white">{cohort.label}</p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-white/65">
                <Calendar className="h-3.5 w-3.5" /> Starts {cohort.startsLabel}
              </p>
              <div className="mt-4 grid gap-2 text-xs text-white/70">
                <Milestone label="Application" done={!!state.applicationId} />
                <Milestone label="Seat reserved" done={isPaid} />
                <Milestone label="Welcome call" done={false} hint="within 24h of payment" />
                <Milestone label="Cohort starts" done={false} hint={cohort.startsLabel} />
              </div>
            </div>

            {!isPaid && (
              <Link
                to="/apply"
                className="block rounded-2xl border border-primary/40 bg-primary/10 p-5 transition hover:bg-primary/15"
              >
                <p className="font-semibold text-white">Finish your application</p>
                <p className="mt-1 text-xs text-white/65">
                  Refundable ₹999 deposit locks your seat in {cohort.label}.
                </p>
                <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-glow">
                  Continue application <ArrowRight className="h-3.5 w-3.5" />
                </p>
              </Link>
            )}

            <Link
              to="/certificates/sample/$slug"
              params={{ slug: course.slug }}
              className="block rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/25"
            >
              <Award className="h-5 w-5 text-gold" />
              <p className="mt-2 font-semibold text-white">See your certificate</p>
              <p className="mt-1 text-xs text-white/65">
                Type your name and preview the verifiable certificate you'll earn.
              </p>
            </Link>

            <a
              href={waLink(`Hi Arzon, quick question about my ${course.title} cohort.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl border border-accent-glow/20 bg-accent-glow/5 p-5 transition hover:bg-accent-glow/10"
            >
              <MessageCircle className="h-5 w-5 text-eyebrow" />
              <p className="mt-2 font-semibold text-white">Talk to your counsellor</p>
              <p className="mt-1 text-xs text-white/65">
                Replies on WhatsApp within an hour during cohort hours.
              </p>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Flame; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/5">
      <Icon className="h-4 w-4 text-primary-glow" />
      <p className="mt-1.5 font-mono text-h4 font-bold text-white">{value}</p>
      <p className="text-micro uppercase tracking-wider text-white/60">{label}</p>
    </div>
  );
}

function Milestone({ label, done, hint }: { label: string; done: boolean; hint?: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="inline-flex items-center gap-2">
        <span
          className={`flex h-4 w-4 items-center justify-center rounded-full ${
            done ? "bg-sky-500" : "bg-white/10"
          }`}
        >
          {done && <CheckCircle2 className="h-3 w-3 text-white" />}
        </span>
        <span className={done ? "text-white" : "text-white/65"}>{label}</span>
      </span>
      {hint && <span className="text-micro text-white/60">{hint}</span>}
    </div>
  );
}
