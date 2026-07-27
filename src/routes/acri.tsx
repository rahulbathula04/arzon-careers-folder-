import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { FEATURE_FLAGS } from "@/config/featureFlags";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { Footer } from "@/components/landing/Footer";
import { TraitDimensionMap } from "@/components/acri/TraitDimensionMap";
import { BandLadder } from "@/components/acri/BandLadder";
import { fetchAcriStats } from "@/lib/acri-stats.functions";
import { JD_PROVENANCE, RESEARCH_REFRESH_QUARTER } from "@/data/jdProvenance";
import { ACRI_DIMENSIONS, ACRI_FULL, absUrl } from "@/components/landing/constants";
import { pageSeo } from "@/lib/seo";
import { ArrowRight, AlertTriangle, FileText, FlaskConical } from "lucide-react";

export const Route = createFileRoute("/acri")({
  beforeLoad: () => {
    if (!FEATURE_FLAGS.ENABLE_ASSESSMENT) {
      throw redirect({ to: "/courses" });
    }
  },
  head: () => {
    const title = "ACRI methodology · How the Career Engine score is built";
    const description =
      "Public, auditable methodology for the Arzon Career Engine score. 5 dimensions, 13 traits, 40 questions, calibration sources, current sample size, and what we don't yet claim.";
    const ps = pageSeo({ path: "/acri", title, description });
    return {
      meta: [{ title }, ...ps.meta],
      links: ps.links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: title,
            description,
            url: absUrl("/acri"),
            publisher: { "@type": "Organization", name: "Arzon Global" },
          }),
        },
      ],
    };
  },
  component: AcriPage,
});

function AcriPage() {
  const fetch = useServerFn(fetchAcriStats);
  const { data } = useQuery({
    queryKey: ["acri-stats"],
    queryFn: () => fetch(),
    staleTime: 10 * 60 * 1000,
  });

  return (
    <main className="min-h-app bg-[#F7F9FC] pb-24 text-ink">
      <Section size="lg" className="pt-14 sm:pt-20">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-[color:var(--teal-deep)]">
          Methodology · v1 preview rubric
        </p>
        <h1 className="mt-3 font-grotesk text-h1 font-bold text-ink">
          ACRI: the Career Engine score, in public.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground">
          <strong>{ACRI_FULL}</strong> is the readiness score every Career Engine result page shows.
          It is not a hiring tool and it is not a placement predictor. This page documents exactly
          how it is built so recruiters, TPOs and students can audit the same code the result page
          uses.
        </p>
      </Section>

      <Section size="md">
        <SectionHeader
          eyebrow="1 · What ACRI measures"
          title="Five dimensions, one composite score"
          sub="Every ACRI score is the average of five 0–100 dimension scores. Definitions below match the labels students see on their result page."
          align="left"
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {ACRI_DIMENSIONS.map((d) => (
            <div key={d.id} className="rounded-xl border border-ink/10 bg-white p-4">
              <p className="font-mono text-micro font-semibold uppercase tracking-[0.18em] text-[color:var(--teal-deep)]">
                Dimension
              </p>
              <p className="mt-1 font-grotesk text-body-sm font-bold text-ink">{d.label}</p>
              <p className="mt-2 text-meta leading-relaxed text-muted-foreground">
                {dimensionBlurb(d.id)}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section size="md">
        <SectionHeader
          eyebrow="2 · How the score is computed"
          title="Trait → dimension weighting matrix"
          sub="The table below is rendered live from the same scoring matrix the result page runs. We can't show you one thing here and ship something else."
          align="left"
        />
        <div className="mt-6">
          <TraitDimensionMap />
        </div>
        <p className="mt-3 text-meta leading-relaxed text-muted-foreground">
          Each row's weights sum to 1.0. The final dimension scores are normalised against the
          strongest trait-driven dimension so bars remain readable even when traits are sparse.
        </p>
      </Section>

      <Section size="md">
        <SectionHeader
          eyebrow="3 · The 40 questions"
          title="13 traits, scenario + behaviour + profile"
          sub="The question bank covers 13 traits (attention, logic, language, screen, patient, data, writing, sales, compliance, tech, lab, empathy, pressure). 40 items per attempt, mixed across scenario, behaviour and profile kinds."
          align="left"
        />
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/career-engine"
            preload="intent"
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[color:var(--teal-deep)] px-4 text-caption font-semibold text-white hover:bg-[color:var(--teal-ink)]"
          >
            Take the assessment <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <a
            href="mailto:info@arzonglobal.com?subject=ACRI%20question%20bank%20request"
            className="inline-flex h-10 items-center text-caption font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline"
          >
            Request the question bank for review →
          </a>
        </div>
      </Section>

      <Section size="md">
        <SectionHeader
          eyebrow="4 · Bands & what they mean"
          title="Three readiness bands, not a pass/fail"
          sub="Bands map a candidate to the right cohort entry point. They are not a hiring decision and they are not a placement guarantee."
          align="left"
        />
        <div className="mt-6">
          <BandLadder />
        </div>
      </Section>

      <Section size="md">
        <SectionHeader
          eyebrow="5 · Calibration & sample size"
          title="What we DO and DON'T claim"
          sub="Honest accounting of the v1 evidence base. We will not publish a reliability coefficient until the dataset can support a stable estimate."
          align="left"
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card icon={FlaskConical} title="Calibration source" tone="ok">
            <p>
              Trait → dimension weights are derived from current Indian JDs across{" "}
              {JD_PROVENANCE.length} role tracks, last refreshed {RESEARCH_REFRESH_QUARTER}. Sources
              are public listings (Naukri, LinkedIn India, Foundit, company careers pages).
            </p>
            <Link
              to="/jd-mirror"
              className="mt-2 inline-flex text-caption font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline"
            >
              See the JD Mirror →
            </Link>
          </Card>
          <Card icon={FileText} title="Current sample size" tone="ok">
            <p>
              Completed Career Engine attempts to date:{" "}
              <strong>{(data?.completedAttempts ?? 0).toLocaleString("en-IN")}</strong>. Leads
              captured (subset who chose to share contact):{" "}
              <strong>{(data?.leadsCount ?? 0).toLocaleString("en-IN")}</strong>. Count is live from
              the public sessions table.
            </p>
          </Card>
          <Card icon={AlertTriangle} title="Reliability (Cronbach α / test-retest)" tone="warn">
            <p>
              <strong>Not yet published.</strong> A stable α estimate needs N ≥{" "}
              {data?.reliabilityThreshold ?? 500} completions and a within-7-day re-test subset. We
              will publish the numbers here when both conditions are met. Today:{" "}
              <strong>{data?.reliabilityReady ? "ready to compute" : "below threshold"}</strong>.
            </p>
          </Card>
          <Card icon={AlertTriangle} title="v1 preview rubric" tone="warn">
            <p>
              The trait → dimension weighting is the v1 preview rubric — derived from JD
              aggregation, not yet validated against the full ASSAY (Arzon Science and Skill
              Assessment for Industry Readiness) instrument. ASSAY will replace this map without
              changing the result page contract.
            </p>
          </Card>
        </div>
      </Section>

      <Section size="md">
        <SectionHeader
          eyebrow="6 · Limits & non-claims"
          title="What ACRI is not"
          sub="The score answers one question: which cohort entry point fits this candidate today. It deliberately does not try to answer the others."
          align="left"
        />
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          <NonClaim title="Not a hiring decision">
            ACRI is a cohort-entry signal, not an offer signal. Recruiters should rely on the{" "}
            <Link
              to="/recruiters"
              className="font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline"
            >
              grading rubric
            </Link>{" "}
            + verified work samples instead.
          </NonClaim>
          <NonClaim title="Not a placement predictor">
            We will not correlate ACRI to offer outcomes until the placements ledger is large enough
            to be statistically meaningful. The{" "}
            <Link
              to="/trust-report"
              className="font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline"
            >
              public ledger
            </Link>{" "}
            is the only outcome surface.
          </NonClaim>
          <NonClaim title="Not psychometric ASSAY">
            ASSAY is the full Arzon assessment instrument; ACRI v1 is a JD-derived preview. The
            naming reflects the difference.
          </NonClaim>
          <NonClaim title="Not an IQ / personality test">
            ACRI does not score intelligence, personality, or behavioural archetypes outside the 5
            published dimensions.
          </NonClaim>
        </ul>
      </Section>

      <Section size="md">
        <div className="rounded-2xl border border-ink/10 bg-white p-5 sm:p-6">
          <p className="font-grotesk text-body-sm font-bold text-ink">
            Spotted an error in this methodology?
          </p>
          <p className="mt-1 text-caption leading-relaxed text-muted-foreground">
            Email{" "}
            <a
              className="font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline"
              href="mailto:info@arzonglobal.com?subject=ACRI%20methodology%20issue"
            >
              info@arzonglobal.com
            </a>{" "}
            with the dimension or trait in question. Every reported issue is logged on the public{" "}
            <Link
              to="/trust-report"
              className="font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline"
            >
              trust ledger
            </Link>
            , resolved or not.
          </p>
        </div>
      </Section>

      <Footer />
    </main>
  );
}

function dimensionBlurb(id: string): string {
  switch (id) {
    case "operational":
      return "Translating ambiguous tasks into ordered, executable steps under realistic constraints.";
    case "communication":
      return "Clear written + spoken explanation to clinicians, reviewers and non-specialists.";
    case "documentation":
      return "Accurate, audit-ready written artefacts: case files, narratives, edit-checks, SOPs.";
    case "workflow":
      return "Comfort with software, tickets, queues and structured pipelines that healthcare ops runs on.";
    case "domain":
      return "Working medical / clinical vocabulary, regulatory landscape and patient-system context.";
    default:
      return "";
  }
}

function Card({
  icon: Icon,
  title,
  tone,
  children,
}: {
  icon: typeof FileText;
  title: string;
  tone: "ok" | "warn";
  children: React.ReactNode;
}) {
  const ring = tone === "warn" ? "border-amber-300/40 bg-gold-soft/50" : "border-ink/10 bg-white";
  const iconTone = tone === "warn" ? "text-warning" : "text-[color:var(--teal-deep)]";
  return (
    <div className={`rounded-2xl border p-5 ${ring}`}>
      <Icon className={`h-5 w-5 ${iconTone}`} />
      <h3 className="mt-3 font-grotesk text-body-sm font-bold text-ink">{title}</h3>
      <div className="mt-2 space-y-2 text-caption leading-relaxed text-ink">{children}</div>
    </div>
  );
}

function NonClaim({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <li className="rounded-xl border border-ink/10 bg-white p-4">
      <p className="font-grotesk text-body-sm font-bold text-ink">{title}</p>
      <p className="mt-1 text-caption leading-relaxed text-muted-foreground">{children}</p>
    </li>
  );
}
