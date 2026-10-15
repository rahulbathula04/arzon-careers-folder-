import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { Footer } from "@/components/landing/Footer";
import { BatchOutcomeStrip } from "@/components/tpos/BatchOutcomeStrip";
import { CounsellorLanes } from "@/components/tpos/CounsellorLanes";
import { BriefingPackForm } from "@/components/briefing/BriefingPackForm";
import { ArrowRight, FileText, CheckCircle2 } from "lucide-react";
import { WorkshopBrochureDownloadButton } from "@/components/workshop/WorkshopBrochureDownloadButton";
import { pageSeo } from "@/lib/seo";
import { absUrl } from "@/components/landing/constants";
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";

export const Route = createFileRoute("/tpos")({
  head: () => {
    const title = "For TPOs & placement officers · Arzon Global";
    const description =
      "College briefing for placement officers: programme scope, practical learning activities, public outcome reporting where available, and ways to contact the partnerships team.";
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
    <main className="arzon-v2-page min-h-app bg-white pb-24 text-[var(--arzon-ink)]">
      <ArzonV2PageHero
        eyebrow="FOR COLLEGES"
        title="Give your students a clearer path from degree to role readiness."
        description="Use role profiles, Career Assessment guidance and programme information to structure career exploration for pharmacy and life-sciences cohorts."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/contact" className="arzon-v2-button-primary">Request college briefing <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/healthcare-career-workshop" className="arzon-v2-button-secondary">View career session</Link>
        </div>
      </ArzonV2PageHero>

      <Section size="md">
        <BatchOutcomeStrip />
      </Section>

      <Section size="md">
        <SectionHeader
          eyebrow="The one-pager"
          title="Get the briefing pack in your inbox"
          sub="Request a concise programme overview, workshop topics and next steps. The team can confirm the current delivery details for your institution."
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
              <h2 className="mt-3 font-grotesk text-2xl font-bold tracking-tight text-[var(--arzon-ink)]">
                Webinar & Workshop Brochure for Principals, TPOs & Chairmen
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--arzon-ink)]-soft">
                A brochure for college leadership outlining workshop topic areas, software examples and a proposed delivery outline. Confirm the current duration, availability, fees and included support with the team before scheduling.
              </p>
              <div className="mt-4 flex flex-wrap gap-y-2 gap-x-4 text-xs font-medium text-[var(--arzon-ink)]-soft">
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
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-ink/20 bg-white px-4 py-2.5 text-xs font-semibold text-[var(--arzon-ink)] hover:bg-ink/5 transition-colors"
              >
                View Live Masterclass Page <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section size="md">
        <SectionHeader
          eyebrow="Partnerships"
          title="Three lanes to the same person"
          sub="Choose call, WhatsApp or email to reach the partnerships team. We will confirm availability and next steps for your request."
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

