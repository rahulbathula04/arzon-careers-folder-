import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { Footer } from "@/components/landing/Footer";
import { BatchOutcomeStrip } from "@/components/tpos/BatchOutcomeStrip";
import { CounsellorLanes } from "@/components/tpos/CounsellorLanes";
import { GovtTrustBlock } from "@/components/landing/GovtTrustBlock";
import { BriefingPackForm } from "@/components/briefing/BriefingPackForm";
import { ArrowRight, ShieldCheck, GraduationCap, FileCheck2 } from "lucide-react";
import { pageSeo } from "@/lib/seo";
import { absUrl } from "@/components/landing/constants";

export const Route = createFileRoute("/tpos")({
  head: () => {
    const title = "For TPOs & placement officers · Arzon Careers";
    const description =
      "Partner-college briefing for placement officers: live batch outcomes from the public ledger, ACRI methodology, registrations, and three ways to reach the partnerships counsellor.";
    const ps = pageSeo({ path: "/tpos", title, description });
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
              { "@type": "ListItem", position: 2, name: "For TPOs", item: absUrl("/tpos") },
            ],
          }),
        },
      ],
    };
  },
  component: TposPage,
});

function TposPage() {
  return (
    <main className="min-h-app bg-[#F7F9FC] pb-24 text-ink">
      <Section size="lg" className="pt-14 sm:pt-20">
        <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-[color:var(--teal-deep)]">
          For training & placement officers
        </p>
        <h1 className="mt-3 font-grotesk text-h1 font-bold text-ink">
          What your batch gets,
          <br className="hidden sm:block" /> in writing. Updated live.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-600">
          A placement officer sending 60 students has asymmetric risk: one bad cohort and it's the
          principal's office. This page is built to remove that risk - registrations, complaints
          log, assessment methodology, and the partnerships counsellor's three contact lanes, all on
          one screen.
        </p>
      </Section>

      <Section size="md">
        <BatchOutcomeStrip />
      </Section>

      <Section size="md">
        <SectionHeader
          eyebrow="The one-pager"
          title="Get the briefing pack in your inbox"
          sub="A 1-page PDF: ACRI methodology, batch outcome reporting cadence, and your counsellor next steps. We send the link to your work email."
          align="left"
        />
        <div className="mt-6 max-w-2xl">
          <BriefingPackForm audience="tpo" />
        </div>
      </Section>

      <Section size="md">
        <SectionHeader
          eyebrow="Assessment methodology"
          title="ACRI - published, not proprietary"
          sub="The Career Engine score uses a public 5-dimension rubric. Recruiters and TPOs can audit the same matrix the result page uses."
          align="left"
        />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Tile
            icon={ShieldCheck}
            title="ACRI in 1 minute"
            body="5 dimensions, 13 traits, 40 questions. The trait → dimension matrix is the actual code, not a marketing diagram."
          />
          <Tile
            icon={GraduationCap}
            title="What each band means"
            body="Industry-ready (≥70), Developing (45–69), Foundation (<45). Bands map to cohort-entry guidance, not pass/fail."
          />
          <Tile
            icon={FileCheck2}
            title="What we DON'T claim"
            body="Not yet ASSAY-validated. Reliability (Cronbach α) will be published once N ≥ 500 completions. We say so on the page."
          />
        </div>
        <Link
          to="/acri"
          preload="intent"
          className="mt-5 inline-flex items-center gap-1.5 text-caption font-semibold text-[color:var(--teal-deep)] underline-offset-4 hover:underline"
        >
          Read the full ACRI methodology page <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Section>

      <GovtTrustBlock />

      <Section size="md">
        <SectionHeader
          eyebrow="Partnerships"
          title="Three lanes to the same person"
          sub="Call, WhatsApp or email - same partnerships counsellor answers all three. Average response: under 4 working hours."
          align="left"
        />
        <div className="mt-7">
          <CounsellorLanes />
        </div>
      </Section>

      <Footer />
    </main>
  );
}

function Tile({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof ShieldCheck;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm">
      <Icon className="h-5 w-5 text-[color:var(--teal-deep)]" />
      <h3 className="mt-3 font-grotesk text-body-sm font-bold text-ink">{title}</h3>
      <p className="mt-1 text-caption leading-relaxed text-slate-600">{body}</p>
    </div>
  );
}
