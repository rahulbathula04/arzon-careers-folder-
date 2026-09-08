import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { Footer } from "@/components/landing/Footer";
import { BatchOutcomeStrip } from "@/components/tpos/BatchOutcomeStrip";
import { CounsellorLanes } from "@/components/tpos/CounsellorLanes";
import { GovtTrustBlock } from "@/components/landing/GovtTrustBlock";
import { BriefingPackForm } from "@/components/briefing/BriefingPackForm";
import { ArrowRight, ShieldCheck, GraduationCap, FileCheck2, FileText, CheckCircle2 } from "lucide-react";
import { WorkshopBrochureDownloadButton } from "@/components/workshop/WorkshopBrochureDownloadButton";
import { pageSeo } from "@/lib/seo";
import { absUrl } from "@/components/landing/constants";

export const Route = createFileRoute("/tpos")({
  head: () => {
    const title = "For TPOs & placement officers · Arzon Global";
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
        <div className="card-light tone-light relative overflow-hidden rounded-2xl border border-ink/10 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-teal-soft/40 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-teal-deep">
                <FileText className="h-3.5 w-3.5" />
                Institutional Masterclass Prospectus · 2026 Edition
              </div>
              <h2 className="mt-3 font-grotesk text-2xl font-bold tracking-tight text-ink">
                Webinar & Workshop Brochure for Principals, TPOs & Chairmen
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                A comprehensive 5-page publication-grade PDF covering our 75-minute live clinical safety masterclass (ICH-E2D &amp; MedDRA 27.0 triage), tier-1 MNC hiring benchmarks (₹3.2L–₹5.2L CTC), verified mentor credentials, and student credentialing protocol. Zero commercial fee under our Educational Access Charter.
              </p>
              <div className="mt-4 flex flex-wrap gap-y-2 gap-x-4 text-xs font-medium text-ink-soft">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-teal-deep" />
                  Print-ready 5-Page Dossier
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-teal-deep" />
                  Addressed to College Leadership
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-teal-deep" />
                  Curriculum &amp; Hands-on Software Breakdown
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <WorkshopBrochureDownloadButton variant="primary" label="Download TPO Prospectus (PDF)" />
              <Link
                to="/healthcare-career-workshop"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-ink/20 bg-white px-4 py-2.5 text-xs font-semibold text-ink hover:bg-ink/5 transition-colors"
              >
                View Live Masterclass Page <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
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
