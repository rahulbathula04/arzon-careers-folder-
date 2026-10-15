import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { Footer } from "@/components/landing/Footer";
import { GradingRubricTable } from "@/components/recruiters/GradingRubricTable";
import { WorkSampleCard, WORK_SAMPLES } from "@/components/recruiters/WorkSampleCard";
import { BriefingPackForm } from "@/components/briefing/BriefingPackForm";
import { pageSeo } from "@/lib/seo";
import { absUrl } from "@/components/landing/constants";
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";

export const Route = createFileRoute("/recruiters")({
  head: () => {
    const title = "Hire from Arzon · Verify any candidate, see the rubric";
    const description =
      "Recruiters can request information about programme scope, example work samples and the process for checking existing Arzon-issued credentials.";
    const ps = pageSeo({ path: "/recruiters", title, description });
    return {
      meta: [{ title }, ...ps.meta],
      links: ps.links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absUrl("/") },
              {
                "@type": "ListItem",
                position: 2,
                name: "For Recruiters",
                item: absUrl("/recruiters"),
              },
            ],
          }),
        },
      ],
    };
  },
  component: RecruitersPage,
});

function RecruitersPage() {
  return (
    <main className="min-h-app bg-[#F7F9FC] pb-24 text-ink">
      <section className="arzon-v2-container py-10 sm:py-14">
        <div className="arzon-v2-card p-6 sm:p-8">
          <div className="max-w-2xl">
            <p className="arzon-v2-data-label">CREDENTIAL CHECK</p>
            <h2 className="mt-2 text-2xl font-bold text-[var(--arzon-ink)]">Verify an existing credential</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--arzon-ink-soft)]">Use the credential verifier to check an existing record. This page does not determine whether a credential is valid.</p>
          </div>
          <div className="mt-5">
            <Link to="/verify" className="arzon-v2-button-primary inline-flex items-center">
              Open credential verifier <ShieldCheck className="ml-2 h-4 w-4" />
            </Link>
            <p className="mt-3 max-w-xl text-xs leading-5 text-[var(--arzon-ink-muted)]">
              A credential is verified only when its record is checked against the verification service. A correctly formatted ID alone is not proof of validity.
            </p>
          </div>
        </div>
      </section>

      {/* Grading rubric */}
      <Section size="md">
        <SectionHeader
          eyebrow="Practical work review"
          title="How role-related work can be reviewed"
          sub="Use this as a discussion guide, not a universal hiring benchmark. Ask for the source, scope and current version of any rubric before relying on it."
          align="left"
        />
        <div className="mt-7">
          <GradingRubricTable />
        </div>
      </Section>

      {/* Work samples */}
      <Section size="md">
        <SectionHeader
          eyebrow="The work, not the quote"
          title="De-identified work samples, one per active track"
          sub="Examples of the kinds of practical work a programme may include. Any learner artifact is shared only with consent and appropriate redaction."
          align="left"
        />
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {WORK_SAMPLES.map((s) => (
            <WorkSampleCard key={s.trackSlug} sample={s} />
          ))}
        </div>
      </Section>

      <Section size="md">
        <SectionHeader
          eyebrow="Want it all in one PDF?"
          title="Get the de-identified recruiter pack"
          sub="Request programme details and available sample artifacts. We will confirm what evidence is currently available before sharing it."
          align="left"
        />
        <div className="mt-6 max-w-2xl">
          <BriefingPackForm audience="recruiter" />
        </div>
      </Section>

      <Section size="md">
        <div className="rounded-2xl border border-[color:var(--teal-deep)]/20 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[color:var(--teal-deep)]" />
            <h2 className="font-grotesk text-h4 font-bold text-ink">
              Hire from the next Arzon cohort
            </h2>
          </div>
          <p className="mt-2 max-w-2xl text-body-sm leading-relaxed text-muted-foreground">
            Tell us the role and city. We can discuss whether relevant candidate profiles or work samples are available. Any introduction depends on current records and candidate consent; employers make their own hiring decisions.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex h-11 items-center rounded-full bg-[color:var(--teal-deep)] px-5 text-caption font-semibold text-white hover:bg-[color:var(--teal-ink)]"
            >
              Talk to partnerships
            </Link>
            <Link
              to="/why-arzon"
              className="inline-flex h-11 items-center text-caption font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline"
            >
              Read about Arzon
            </Link>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
