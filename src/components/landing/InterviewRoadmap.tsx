import { BookOpen, FlaskConical, Award, Mic, Briefcase } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "./SectionHeader";

const STEPS = [
  {
    icon: BookOpen,
    window: "Weeks 1–8",
    title: "Learn from industry mentors",
    body: "Live, recorded sessions on PV, coding, CDM or RA fundamentals - taught by people who do the job today.",
  },
  {
    icon: FlaskConical,
    window: "Weeks 9–12",
    title: "Work on real project files",
    body: "Real de-identified ICSR cases, MedDRA coding, eCRF entries - the exact work a fresher does in week one of the job.",
  },
  {
    icon: Award,
    window: "End of 12",
    title: "Get a verifiable certificate",
    body: "Performance-graded, ISO-aligned, with a public verification URL recruiters can scan.",
  },
  {
    icon: Mic,
    window: "+2 weeks",
    title: "Mock interviews + CV rewrite",
    body: "Recorded mock interviews, JD-tuned resume, and answers to the 20 questions recruiters actually ask.",
  },
  {
    icon: Briefcase,
    window: "Ongoing",
    title: "Apply with referral support",
    body: "Warm intros into our hiring-partner pool.",
  },
] as const;

export function InterviewRoadmap() {
  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-heading"
      className="tone-dark bg-[#0a1430] py-16 sm:py-20 text-slate-50"
    >
      <Section size="md">
        <SectionHeader
          eyebrow="How Arzon gets you interview-ready"
          title={
            <h2 id="roadmap-heading">
              Five steps. <em className="italic-accent not-italic">No jargon.</em>
            </h2>
          }
          sub="Every step ships something you can show a recruiter - not just lecture notes."
        />

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <li
                key={s.title}
                className="relative flex h-full flex-col rounded-2xl border border-slate-700/60 bg-slate-900/40 p-5 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-800 text-slate-50">
                    <Icon aria-hidden className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-micro font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Step {String(i + 1).padStart(2, "0")} · {s.window}
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-[1.1rem] font-semibold leading-snug text-slate-50">
                  {s.title}
                </h3>
                <p className="mt-2 text-body-sm leading-relaxed text-slate-300">{s.body}</p>
              </li>
            );
          })}
        </ol>
      </Section>
    </section>
  );
}
