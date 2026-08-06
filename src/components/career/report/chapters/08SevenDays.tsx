import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle2, Circle, MessageCircle } from "lucide-react";
import type { ArchetypeId } from "@/data/careerEngineQuestions";
import { getSevenDayPlan } from "@/data/sevenDayPlans";
import { COUNSELLOR_PHONE } from "@/components/landing/constants";
import { track } from "@/lib/track";
import { useStreak } from "@/hooks/useStreak";
import { ReportCard } from "../ReportCard";
import { REPORT_TONES } from "../reportTones";

/**
 * ChapterSevenDays - Duolingo-style streak. Each day is checkable, state
 * persists per lead in localStorage. Small celebratory pop on first check.
 * Preserves the analytics events from the v2 SevenDayPlan.
 */
export function ChapterSevenDays({
  archetype,
  leadId,
  chapter,
}: {
  archetype: ArchetypeId;
  leadId: string | null;
  chapter: number;
}) {
  const plan = getSevenDayPlan(archetype);
  const { days, toggle: toggleDay, streak, doneCount, persistent } = useStreak(archetype, leadId);
  const [popDay, setPopDay] = useState<number | null>(null);
  const impressionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!impressionRef.current || typeof IntersectionObserver === "undefined") return;
    let fired = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !fired) {
            fired = true;
            track("ce_seven_day_plan_view", {
              lead_id: leadId,
              props: { archetype, role: plan.role },
            });
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(impressionRef.current);
    return () => io.disconnect();
  }, [archetype, leadId, plan.role]);

  const toggle = (day: number) => {
    const idx = day - 1;
    const willBeDone = !days[idx];
    toggleDay(idx);
    if (willBeDone) {
      setPopDay(day);
      window.setTimeout(() => setPopDay(null), 400);
    }
    track("report_plan_day_toggled", {
      lead_id: leadId,
      props: {
        archetype,
        day,
        checked: willBeDone,
        streak_after: willBeDone ? streak + 1 : Math.max(0, streak - 1),
        readiness_points_after: (willBeDone ? doneCount + 1 : Math.max(0, doneCount - 1)) * 15,
      },
    });
  };

  const isDayDone = (day: number) => !!days[day - 1];

  const waHref = `https://wa.me/${COUNSELLOR_PHONE}?text=${encodeURIComponent(
    `Hi, I finished the Arzon career test - recommended role: ${plan.role}. I'd like to book a 15-min counsellor call.`,
  )}`;

  return (
    <ReportCard
      id={`ch-${chapter}-streak`}
      chapter={chapter}
      eyebrow="Your next 7 days"
      tone="secondary"
      title={
        <>
          One small move per day toward{" "}
          <span className={REPORT_TONES.secondary.chipPillText}>{plan.role}</span>.
        </>
      }
      subtitle="Check off each step as you finish it. Recruiters notice these on your CV or LinkedIn within a week."
      whatThisMeans="Seven small, visible actions this week that turn 'thinking about it' into 'already started' on your profile."
    >
      <div ref={impressionRef}>
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
            {persistent ? `Streak · ${doneCount}/7 days` : `Progress · ${doneCount}/7 days`}
          </p>
          <div className="flex gap-1" aria-hidden>
            {Array.from({ length: 7 }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-6 rounded-full ${
                  days[i] ? REPORT_TONES.secondary.solidCtaBg : "bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>

        <ol className="grid gap-2 sm:grid-cols-2">
          {plan.steps.map((step) => {
            const isDone = isDayDone(step.day);
            const pop = popDay === step.day;
            return (
              <li key={step.day}>
                <div
                  className={`group flex items-start gap-3 rounded-2xl border px-4 py-3 transition ${
                    isDone
                      ? `${REPORT_TONES.secondary.softBorder} ${REPORT_TONES.secondary.softBg}`
                      : "border-white/8 bg-white/[0.02] hover:border-white/20"
                  } ${pop ? "motion-safe:animate-[pulse_0.4s_ease-out_1]" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(step.day)}
                    aria-pressed={isDone}
                    aria-label={`Mark day ${step.day} ${isDone ? "not done" : "done"}`}
                    className="mt-0.5 shrink-0"
                  >
                    {isDone ? (
                      <CheckCircle2 className={`h-5 w-5 ${REPORT_TONES.secondary.iconFill}`} />
                    ) : (
                      <Circle className="h-5 w-5 text-white/40 group-hover:text-white/70" />
                    )}
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                      Day {step.day}
                    </p>
                    <p className="mt-0.5 font-grotesk text-sm font-bold text-white">{step.title}</p>
                    <p className="mt-1 text-xs text-white/65">{step.detail}</p>
                    {step.link && (
                      <a
                        href={step.link.href}
                        target="_blank" rel="noopener noreferrer"
                        onClick={() =>
                          track("ce_seven_day_plan_link_click", {
                            lead_id: leadId,
                            props: { archetype, day: step.day, href: step.link!.href },
                          })
                        }
                        className={`mt-1.5 inline-flex items-center gap-1 text-xs ${REPORT_TONES.primary.chipPillText} ${REPORT_TONES.primary.hoverAccent} hover:underline`}
                      >
                        {step.link.label} <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <a
          href={waHref}
          target="_blank" rel="noopener noreferrer"
          onClick={() =>
            track("ce_seven_day_plan_wa_send", {
              lead_id: leadId,
              props: { archetype, role: plan.role },
            })
          }
          className={`mt-6 inline-flex items-center gap-2 rounded-full ${REPORT_TONES.secondary.solidCtaBg} px-4 py-2 font-grotesk text-sm font-bold text-slate-900 transition hover:brightness-110`}
        >
          <MessageCircle className="h-4 w-4" /> Send plan to my WhatsApp
        </a>
      </div>
    </ReportCard>
  );
}

export default ChapterSevenDays;
