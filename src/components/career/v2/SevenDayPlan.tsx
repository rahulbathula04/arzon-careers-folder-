import { useEffect, useRef } from "react";
import { ArrowUpRight, MessageCircle, CheckCircle2 } from "lucide-react";
import type { ArchetypeId } from "@/data/careerEngineQuestions";
import { getSevenDayPlan } from "@/data/sevenDayPlans";
import { COUNSELLOR_PHONE } from "@/components/landing/constants";
import { track } from "@/lib/track";
import { IconTile } from "@/components/ui/IconTile";

/**
 * SevenDayPlan - added to the result page so students leave with a concrete
 * 7-day action plan, not just a verdict + CTA. Each step is verifiable,
 * tied to the recommended archetype, and links out to a free industry
 * resource where one exists. Also offers a one-tap WhatsApp send so the
 * plan goes onto the student's phone for later.
 *
 * Analytics:
 *   - ce_seven_day_plan_view (impression, ≥40% visible)
 *   - ce_seven_day_plan_link_click (per outbound resource)
 *   - ce_seven_day_plan_wa_send (counsellor handoff with plan text)
 */
export function SevenDayPlan({
  archetype,
  leadId,
}: {
  archetype: ArchetypeId;
  leadId: string | null;
}) {
  const plan = getSevenDayPlan(archetype);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === "undefined") return;
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
    io.observe(ref.current);
    return () => io.disconnect();
  }, [archetype, leadId, plan.role]);

  const waText = buildWhatsAppMessage(plan.role, plan.steps);
  const waHref = `https://wa.me/${COUNSELLOR_PHONE}?text=${encodeURIComponent(waText)}`;

  return (
    <section
      ref={ref}
      aria-labelledby="seven-day-plan-heading"
      className="tone-dark mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#06080d] p-5 text-white sm:p-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <p className="font-mono text-micro uppercase tracking-[0.24em] text-eyebrow/85">
            Your next 7 days
          </p>
          <h2
            id="seven-day-plan-heading"
            className="mt-2 font-display text-h3 font-bold leading-tight text-white sm:text-h2"
          >
            One small move per day toward <span className="text-eyebrow">{plan.role}</span>.
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            Verifiable steps. No fluff. Each one a recruiter would notice on your CV or LinkedIn
            within the week.
          </p>
        </div>
      </div>

      <ol className="mt-6 grid gap-3 sm:grid-cols-2">
        {plan.steps.map((s) => (
          <li
            key={s.day}
            className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/25"
          >
            <div className="flex items-start gap-3">
              <IconTile intent="accent" size="md">
                <CheckCircle2 strokeWidth={2.25} />
              </IconTile>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-micro uppercase tracking-[0.2em] text-white/45">
                    Day {s.day}
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold leading-tight text-white">{s.title}</p>
                <p className="mt-1.5 text-sm text-white/70">{s.detail}</p>
                {s.link ? (
                  <a
                    href={s.link.href}
                    target="_blank" rel="noopener noreferrer"
                    onClick={() =>
                      track("ce_seven_day_plan_link_click", {
                        lead_id: leadId,
                        props: {
                          archetype,
                          day: s.day,
                          label: s.link!.label,
                          href: s.link!.href,
                        },
                      })
                    }
                    className="mt-3 inline-flex items-center gap-1 font-mono text-micro uppercase tracking-[0.16em] text-eyebrow hover:text-eyebrow-strong"
                  >
                    {s.link.label}
                    <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-col items-stretch gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/70">
          Want this on your phone? We'll send the full 7-day plan to your WhatsApp and a counsellor
          will reply if you have questions.
        </p>
        <a
          href={waHref}
          target="_blank" rel="noopener noreferrer"
          onClick={() =>
            track("ce_seven_day_plan_wa_send", {
              lead_id: leadId,
              props: { archetype, role: plan.role },
            })
          }
          className="inline-flex items-center justify-center gap-2 rounded-full border border-accent-glow/30 bg-accent-glow/10 px-5 py-3 text-sm font-semibold text-eyebrow-strong transition-colors hover:bg-accent-glow/15"
        >
          <MessageCircle aria-hidden className="h-4 w-4" />
          Send my 7-day plan to WhatsApp
        </a>
      </div>
    </section>
  );
}

function buildWhatsAppMessage(
  role: string,
  steps: { day: number; title: string; detail: string }[],
): string {
  const lines = steps.map((s) => `Day ${s.day} - ${s.title}\n${s.detail}`);
  return [
    `Hi Arzon - here's my 7-day plan toward ${role}.`,
    "",
    ...lines,
    "",
    "Can a counsellor help me start on Day 1?",
  ].join("\n");
}
