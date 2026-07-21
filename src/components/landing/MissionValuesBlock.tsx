import { Section } from "@/components/ui/Section";
import { SectionHeader } from "./SectionHeader";
import { Target, Network, Compass, Handshake } from "lucide-react";
import valuesImg from "@/assets/proof/values-diagram.webp";

/**
 * Image #3, "Driven by purpose, grounded in impact" values diagram.
 * Slot: just before Urgency (FinalCTA), soft mission close.
 */
const pillars = [
  {
    icon: Target,
    title: "Students come first",
    body: "We build every batch around what gets you hired, not what looks good on a brochure.",
  },
  {
    icon: Network,
    title: "Real industry input",
    body: "Hiring managers help us update the syllabus every cohort. You learn what they're hiring for.",
  },
  {
    icon: Compass,
    title: "Open to every student",
    body: "Tier-3 college, B.Pharm 2nd year, gap year, none of it stops you here.",
  },
  {
    icon: Handshake,
    title: "We grow with colleges",
    body: "We don't compete with your college. We add the practical layer your degree leaves out.",
  },
];

export function MissionValuesBlock() {
  return (
    <Section id="mission" size="lg" tone="muted">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <SectionHeader
            align="left"
            eyebrow="What we believe"
            title={<>Four things we will not compromise on.</>}
            sub="If any of these slip, we pull the batch. It's why students trust us."
          />

          <ul className="mt-8 space-y-4">
            {pillars.map(({ icon: Icon, title, body }, i) => (
              <li key={title} className="flex items-start gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary-glow ring-1 ring-primary/30">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-50">
                    <span className="font-mono text-micro text-slate-100/60">0{i + 1} ·</span>{" "}
                    {title}
                  </p>
                  <p className="mt-1 text-sm text-slate-100/65">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop-only illustration */}
        <figure className="hidden overflow-hidden rounded-2xl border border-slate-200/10 bg-white/[0.03] ring-1 ring-white/5 md:block">
          <img
            src={valuesImg}
            alt="Arzon Global mission diagram. Student-First, Industry Integration, Equal Access, Collaboration Over Competition"
            loading="lazy"
            decoding="async"
            className="h-auto w-full"
          />
        </figure>
      </div>
    </Section>
  );
}
