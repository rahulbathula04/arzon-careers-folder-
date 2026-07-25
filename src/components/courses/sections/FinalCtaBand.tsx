import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Clock3 } from "lucide-react";
import type { Course } from "@/data/courses";
import type { getTrackTheme } from "@/data/trackTheme";
import { NEXT_COHORT, SEAT_FEE, waLink } from "@/components/landing/constants";

type Theme = ReturnType<typeof getTrackTheme>;

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
      className="relative border-t py-20 sm:py-28 bg-[#0B0F19]"
      style={{
        borderColor: "rgba(255,255,255,0.10)",
      }}
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-6">
        <div className="text-center">
          <p
            className={`font-mono text-xs font-bold uppercase tracking-wider ${theme.accentText}`}
          >
            Ready when you are
          </p>
          <h2 className="mt-3 font-bold text-2xl sm:text-4xl text-white">
            Join the {cohort.label} cohort of {course.title.split(/\s*[—–-]\s*/)[0]}.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300 leading-relaxed">
            Starts {cohort.startsLabel}. {SEAT_FEE} seat fee · balance due 3 days before cohort.
          </p>
        </div>

        <div className="mx-auto mt-8 flex max-w-md flex-col gap-3.5" data-testid="final-cta-form">
          <Link
            to="/apply"
            search={{ programme: course.slug, source: "course-final" }}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
          >
            Apply for the {cohort.label} cohort
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
          <a
            href={waLink(pitchMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onWhatsApp}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-500/20 hover:bg-emerald-500/30 px-5 text-sm font-bold text-emerald-300 transition-colors"
          >
            <MessageCircle className="h-4 w-4 text-emerald-400" />
            WhatsApp a Counsellor
          </a>
          <p className="inline-flex items-center justify-center gap-1.5 text-center font-mono text-xs text-slate-400 font-medium">
            <Clock3 className="h-3.5 w-3.5 text-blue-400" /> Average reply time: 5 minutes
          </p>
        </div>
      </div>
    </section>
  );
}
