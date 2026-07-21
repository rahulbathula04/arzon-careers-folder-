import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Clock3 } from "lucide-react";
import type { Course } from "@/data/courses";
import type { getTrackTheme } from "@/data/trackTheme";
import { NEXT_COHORT, SEAT_FEE, waLink } from "@/components/landing/constants";

type Theme = ReturnType<typeof getTrackTheme>;

/** Beat 11 — final, full-bleed CTA band. One primary path + WhatsApp fallback + inline form. */
export function FinalCtaBand({
  course,
  theme,
  pitchMessage,
  onWhatsApp,
}: {
  course: Course;
  theme: Theme;
  pitchMessage: string;
  onWhatsApp: () => void;
}) {
  const cohort = NEXT_COHORT;
  return (
    <section
      data-testid="course-final-cta"
      data-slug={course.slug}
      data-step="11"
      className="relative border-t py-20 sm:py-28"
      style={{
        borderColor: "rgba(255,255,255,0.10)",
        background: `radial-gradient(120% 60% at 50% 0%, ${theme.hex.from}26, rgba(10,15,30,0)), #0A0F1E`,
      }}
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-6">
        <div className="text-center">
          <p
            className={`font-mono text-micro font-semibold uppercase tracking-[0.28em] ${theme.accentText}`}
          >
            Ready when you are
          </p>
          <h2
            className="mt-3 font-display text-h2 font-bold tracking-tight sm:text-h1 lg:text-[44px]"
            style={{ color: "#F8FAFC", textWrap: "balance" }}
          >
            Join the {cohort.label} cohort of {course.title.split(/\s*[—–-]\s*/)[0]}.
          </h2>
          <p
            className="mx-auto mt-3 max-w-xl text-body-sm leading-relaxed"
            style={{ color: "#CBD5E1" }}
          >
            Starts {cohort.startsLabel}. {SEAT_FEE} seat fee · 0% EMI on the balance.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-md flex-col gap-3" data-testid="final-cta-form">
          <Link
            to="/apply"
            search={{ programme: course.slug, source: "course-final" }}
            className="tone-light inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-body-sm font-bold text-[#0A0F1E] shadow-[0_18px_40px_-18px_rgba(127,176,216,0.7)] transition hover:bg-slate-100"
          >
            Apply for the {cohort.label} cohort
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
          <a
            href={waLink(pitchMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onWhatsApp}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/10 px-5 text-body-sm font-semibold text-sky-200 transition hover:border-sky-300/70 hover:bg-sky-400/15 hover:text-sky-100"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp a counsellor
          </a>
          <p
            className="inline-flex items-center justify-center gap-1.5 text-center font-mono text-micro font-semibold uppercase tracking-[0.18em]"
            style={{ color: "#94A3B8" }}
          >
            <Clock3 className="h-3 w-3" /> Average reply time: 5 minutes
          </p>
        </div>
      </div>
    </section>
  );
}
