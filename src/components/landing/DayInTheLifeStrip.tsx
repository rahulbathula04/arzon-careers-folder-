import { Section } from "@/components/ui/Section";
import { SectionHeader } from "./SectionHeader";
import { Inbox, FileSignature, ShieldCheck, Clock3 } from "lucide-react";

/**
 * "A day in the life" - three real time-blocks a deployed PV associate runs,
 * styled to match the rest of the homepage (light surface, Section/SectionHeader,
 * card-light tiles) and lift the curriculum page's JD-mapped, module-card feel:
 * mono eyebrow, time chip, role outcome, and a JD-phrase footnote per block.
 */
type Block = {
  time: string;
  duration: string;
  icon: typeof Inbox;
  title: string;
  body: string;
  tools: string[];
  jdPhrase: string;
};

const BLOCKS: Block[] = [
  {
    time: "09:30",
    duration: "Block 1 · Morning",
    icon: Inbox,
    title: "Triage the overnight ICSR queue",
    body: "Open Argus, pick up the cases that landed from the call centre overnight, check seriousness and expectedness before the 24-hour clock runs out.",
    tools: ["Argus Safety", "ICSR", "E2B(R3)"],
    jdPhrase: "Perform case triage and seriousness assessment within regulatory timelines.",
  },
  {
    time: "13:00",
    duration: "Block 2 · Afternoon",
    icon: FileSignature,
    title: "Narrative writing + MedDRA coding",
    body: "Write the case narrative in plain English, code the events with MedDRA LLT, and route the case to the medical reviewer.",
    tools: ["MedDRA LLT", "Narrative writing", "WHODrug"],
    jdPhrase: "Author ICSR narratives and code adverse events using MedDRA.",
  },
  {
    time: "17:00",
    duration: "Block 3 · End of day",
    icon: ShieldCheck,
    title: "QC the day's submissions",
    body: "Quality-check a peer's cases against the SDEA, log queries, hand over the open follow-ups before sign-off.",
    tools: ["QC checklist", "SDEA", "Follow-up log"],
    jdPhrase: "Perform peer QC and ensure SDEA-compliant submissions.",
  },
];

export function DayInTheLifeStrip() {
  return (
    <Section id="day-in-the-life" size="lg">
      <SectionHeader
        tone="dark"
        eyebrow="A day in the life"
        title={
          <>
            What you'll <em className="italic-accent not-italic">actually do</em> on day 30 of the
            job.
          </>
        }
        sub={
          <>
            Pharmacovigilance Associate · mid-size CRO · Hyderabad. No theory, the same three blocks
            every day, taken straight from live Indian JDs.
          </>
        }
      />

      <ol className="mx-auto mt-10 grid max-w-6xl gap-4 sm:gap-5 md:grid-cols-3">
        {BLOCKS.map((b, i) => (
          <li
            key={b.time}
            className="card-light card-hairline-gradient card-accent-strip relative flex flex-col rounded-2xl p-5 sm:p-6"
            data-accent="navy"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[#1E40AF] text-slate-50 ring-1 ring-white/40 shadow-[0_4px_14px_-6px_rgba(30,64,175,0.55)]">
                <b.icon className="h-5 w-5" strokeWidth={2.25} />
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 font-mono text-micro font-semibold uppercase tracking-[0.16em] text-primary">
                <Clock3 className="h-3 w-3" /> {b.time} IST
              </span>
            </div>

            <p className="mt-4 font-mono text-micro font-semibold uppercase tracking-[0.2em] text-[#7fb0d8]">
              {b.duration} · Step {i + 1} of 3
            </p>
            <h3 className="mt-1 h-card text-ink">{b.title}</h3>
            <p className="mt-3 text-caption leading-relaxed text-slate-600">{b.body}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {b.tools.map((tl) => (
                <span
                  key={tl}
                  className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-micro font-semibold text-slate-700"
                >
                  {tl}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-5">
              <p className="rounded-xl border border-slate-200/70 bg-slate-50 p-3 text-meta leading-relaxed text-slate-600">
                <span className="font-mono text-micro uppercase tracking-[0.14em] text-primary">
                  Maps to JD requirement
                </span>
                <br />
                <span className="text-slate-700">"{b.jdPhrase}"</span>
              </p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mx-auto mt-6 max-w-3xl text-center font-mono text-micro uppercase tracking-[0.2em] text-slate-500">
        Sourced from 142 live PV Associate JDs · Refreshed monthly
      </p>
    </Section>
  );
}
