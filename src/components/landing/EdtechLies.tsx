import { Section } from "@/components/ui/Section";
import { SectionHeader } from "./SectionHeader";
import { X, Check, AlertTriangle, ShieldCheck } from "lucide-react";

/**
 * "Three lies of edtech" teardown. Names the patterns most edtechs lean on
 * (fake placement averages, fake-live content, guaranteed-job promises)
 * and contrasts each with how Arzon operates. Risky but memorable; this
 * positioning earns trust the way no awards bar can.
 */
const LIES: { title: string; lie: string; truth: string; cite: string }[] = [
  {
    title: "Lie #1 · The placement average",
    lie: '"Average package ₹6.4 LPA". Quietly excludes anyone who didn\'t get placed, and counts the one outlier offer.',
    truth:
      "We publish role-band salaries with sample size and city. Median, not average. Every placement is verifiable by recruiter HR email.",
    cite: "ASCI guideline 12.4 · selective averaging is misleading",
  },
  {
    title: 'Lie #2 · The "live" class',
    lie: "Pre-recorded sessions sold as live cohorts. Mentor never sees you, never grades your file, never gets your name right.",
    truth:
      "Live mentor sessions capped at 15 students per breakout. Every assignment is hand-graded by a working industry mentor.",
    cite: "Class recordings + attendance log shared with every cohort",
  },
  {
    title: "Lie #3 · The job guarantee",
    lie: '"100% placement guarantee" with a 14-clause fine-print that voids it the moment you ask for a refund.', // copy-claims-ok: rhetorical
    truth:
      "We never promise jobs, ASCI rules forbid it. We promise interviews, mentor intros, and a refund if we don't deliver them. In writing.",
    cite: "Printed on your enrolment invoice · enforceable",
  },
];

export function EdtechLies() {
  return (
    <Section size="lg">
      <SectionHeader
        eyebrow="Plain talk"
        title={
          <>
            The <span className="text-[color:var(--teal-deep)]">three lies</span> Indian edtech
            keeps telling you.
          </>
        }
        sub={
          <>
            Anyone promising guaranteed placement is breaking the law (ASCI rules). We give skill,{" "}
            {/* copy-claims-ok */}
            proof and intros, never empty offers.
          </>
        }
      />

      <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3">
        {LIES.map((l) => (
          <article
            key={l.title}
            className="relative overflow-hidden rounded-2xl card-elev-3 card-hairline-gradient"
          >
            <div className="p-5 sm:p-6">
              <h3 className="font-display text-h4 leading-snug text-primary!">{l.title}</h3>

              {/* LIE row - red-rust tone */}
              <div className="mt-5 rounded-xl border border-[#c2654a]/25 bg-[#fdf2ee] p-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#c2654a]/15 ring-1 ring-[#c2654a]/30">
                    <X className="h-3.5 w-3.5 text-[#9b4423]" strokeWidth={3} />
                  </span>
                  <span className="font-mono text-micro font-bold uppercase tracking-[0.22em] text-[#9b4423]">
                    What they say
                  </span>
                </div>
                <p className="mt-2 text-caption leading-relaxed text-[#5c2018]/85">{l.lie}</p>
              </div>

              {/* TRUTH row - teal/navy tone */}
              <div className="mt-3 rounded-xl border border-[#0d7a5f]/25 bg-[#ecf6f1] p-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#0d7a5f]/15 ring-1 ring-[#0d7a5f]/30">
                    <Check className="h-3.5 w-3.5 text-[#0d7a5f]" strokeWidth={3} />
                  </span>
                  <span className="font-mono text-micro font-bold uppercase tracking-[0.22em] text-[#0d7a5f]">
                    What we do
                  </span>
                </div>
                <p className="mt-2 text-caption leading-relaxed text-primary/85">{l.truth}</p>
              </div>

              <p className="mt-4 flex items-start gap-1.5 text-micro text-[#1e3a5f]/60">
                <ShieldCheck className="mt-0.5 h-3 w-3 shrink-0" />
                <span>{l.cite}</span>
              </p>
            </div>
          </article>
        ))}
      </div>

      <p className="mx-auto mt-8 flex max-w-3xl items-center justify-center gap-2 rounded-full bg-primary/[0.04] px-4 py-2 text-center text-meta text-[#1e3a5f]/80 ring-1 ring-[#0f1b3d]/10">
        <AlertTriangle className="h-3.5 w-3.5 text-[#9b4423]" />
        Spot any of these patterns elsewhere? Walk away. Your career deserves better.
      </p>
    </Section>
  );
}
