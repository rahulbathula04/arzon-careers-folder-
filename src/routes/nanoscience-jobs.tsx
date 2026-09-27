import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Atom, CheckCircle2 } from "lucide-react";
import { ArzonDecisionHub } from "@/components/funnel/ArzonDecisionHub";
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";
import { pageSeo } from "@/lib/seo";

const AREAS = [
  "Nanomaterials and nanoparticle synthesis",
  "Characterisation: SEM, TEM, AFM and FTIR",
  "Drug delivery and nano-formulation",
  "Surface and materials analysis",
  "Laboratory documentation and research reporting",
  "Research methods and experimental design",
];

export const Route = createFileRoute("/nanoscience-jobs")({
  head: () => {
    const seo = pageSeo({
      path: "/nanoscience-jobs",
      title: "Nanoscience Jobs in India | Career Intelligence",
      description: "Understand nanoscience and nanotechnology career paths, laboratory capabilities and preparation requirements before choosing training.",
      image: "/og/about.jpg",
    });
    return {
      meta: [{ title: "Nanoscience Jobs in India | Arzon Global" }, ...seo.meta],
      links: seo.links,
    };
  },
  component: NanoscienceJobsPage,
});

function NanoscienceJobsPage() {
  return (
    <div className="arzon-v2-page min-h-screen pb-24">
      <ArzonV2PageHero
        eyebrow="CAREER INTELLIGENCE · NANOSCIENCE"
        title="Nanoscience careers: understand the work, capability requirements and preparation path."
        description="Nanoscience has a different evidence model from Arzon's current job-role taxonomy. Start with the laboratory and research capabilities employers and research teams expect, then choose preparation."
        mobileImageSrc="/images/bpharm-male-graduate.jpg"
        mobileImageAlt="Life-sciences graduate researching a nanoscience career"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/career-engine/start" className="arzon-v2-button-primary">
            Get My Career Plan <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/courses/$slug" params={{ slug: "nanoscience" }} className="arzon-v2-button-secondary">
            View Nanoscience Programme
          </Link>
        </div>
      </ArzonV2PageHero>

      <ArzonDecisionHub
        eyebrow="RESEARCH → ASSESS → PREPARE"
        title="Understand the capability stack before choosing a nanoscience programme."
        description="This route does not invent job-count evidence. It separates the programme curriculum from the labour-market role taxonomy and sends you to the Career Engine for a personalised next step."
        primaryLabel="Get My Career Plan"
        primaryTo="/career-engine/start"
        secondaryLabel="View Programme"
        secondaryTo="/courses/nanoscience"
      />

      <main className="arzon-v2-container space-y-8 py-10 sm:py-14">
        <section className="arzon-v2-card p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <Atom className="mt-1 h-5 w-5 shrink-0 text-[var(--arzon-blue-700)]" />
            <div>
              <span className="arzon-v2-eyebrow">CAPABILITY MODEL</span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--arzon-ink)] sm:text-3xl">
                Capabilities to build for laboratory and applied nanotech work
              </h2>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {AREAS.map((area) => (
                  <div key={area} className="flex items-start gap-2 rounded-xl border border-[var(--arzon-border)] bg-[var(--arzon-surface-subtle)] p-4 text-sm text-[var(--arzon-ink-soft)]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--arzon-green-600)]" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[var(--arzon-radius-xl)] border border-[var(--arzon-navy-950)] bg-[var(--arzon-navy-950)] p-8 text-white sm:p-10">
          <span className="arzon-v2-eyebrow !text-[var(--arzon-blue-100)]">NEXT DECISION</span>
          <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl">
            Check your current fit before committing to preparation.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Use the Career Engine to identify a target direction, then review the nanoscience programme against the capabilities you actually need.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link to="/career-engine" className="arzon-v2-button-secondary bg-white tone-light text-[var(--arzon-ink)]">
              Check My Fit <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/courses/$slug" params={{ slug: "nanoscience" }} className="inline-flex items-center justify-center gap-2 rounded-[var(--arzon-radius-md)] border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
              View Programme <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
