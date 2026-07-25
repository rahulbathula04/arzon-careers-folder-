import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, ShieldCheck, Clock, Users, Calendar } from "lucide-react";
import { NEXT_COHORT, PRICE_CAREER, COUNSELLOR_NAME } from "@/components/landing/constants";
import { WhatsAppLink } from "@/components/common/WhatsAppLink";
import type { Course } from "@/data/courses";

export function EnrolmentRail({ course }: { course: Course }) {
  const message = `Hi, I'm interested in the ${course.title} programme. Can you walk me through the syllabus and next batch?`;
  return (
    <aside className="lg:sticky lg:top-20">
      <div
        className="overflow-hidden rounded-3xl border border-border bg-card"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="bg-[var(--color-mint)] px-6 py-5">
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-primary">
            Programme fee
          </p>
          <div className="mt-1 flex items-end gap-2">
            <span className="font-display text-h2 font-bold text-foreground">{PRICE_CAREER}</span>
            <span className="pb-1 text-xs text-muted-foreground">incl. taxes · transparent pricing</span>
          </div>
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-background px-2.5 py-1 text-micro font-semibold text-foreground">
            <Calendar className="h-3 w-3 text-primary" />
            {NEXT_COHORT.label} cohort · Starts {NEXT_COHORT.startsLabel}
          </p>
        </div>

        <div className="space-y-3 px-6 py-5">
          <Link
            to="/career-engine"
            className="flex h-12 w-full items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            Take the 3-min fit test <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
          <WhatsAppLink
            source="course_enrolment_rail"
            program_slug={course.slug}
            message={message}
            trackProps={{ course_slug: course.slug, course_title: course.title }}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border bg-background text-sm font-semibold text-foreground hover:bg-muted"
          >
            <MessageCircle className="h-4 w-4 text-primary" />
            WhatsApp counsellor
          </WhatsAppLink>
          <p className="text-center text-micro text-muted-foreground">
            Talk to {COUNSELLOR_NAME} · usually replies in 5 min
          </p>
        </div>

        <ul className="space-y-2 border-t border-border px-6 py-5 text-sm text-foreground">
          <li className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            12 weeks · live + recorded
          </li>
          <li className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            {course.jd.demand} demand · {course.jd.salary}
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            ISO-certified internship certificate + project letter
          </li>
        </ul>
      </div>

      <p className="mt-3 text-center text-micro text-muted-foreground">
        Seat-confirmation step is shown after your fit-test result
      </p>
    </aside>
  );
}

export function MobileEnrolmentBar({ course }: { course: Course }) {
  void course;
  return (
    <>
      {/* Spacer to keep page content from hiding under the fixed bar on mobile. */}
      <div aria-hidden className="h-20 w-full lg:hidden" />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 pb-[env(safe-area-inset-bottom)] lg:hidden">
        <div className="pointer-events-auto mx-3 mb-3 flex items-center gap-2 rounded-full border border-white/15 bg-[#0A0F1E]/95 px-2 py-2 backdrop-blur-lg shadow-[0_-12px_40px_-10px_rgba(0,0,0,0.6)] sm:mx-auto sm:max-w-md">
          <Link
            to="/career-engine"
            className="flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-gold px-4 text-caption font-semibold text-[#1A1300] hover:bg-gold/90"
          >
            Take the 3-min fit test
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </>
  );
}
