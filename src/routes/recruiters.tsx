import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShieldCheck, Search, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { Footer } from "@/components/landing/Footer";
import { GradingRubricTable } from "@/components/recruiters/GradingRubricTable";
import { WorkSampleCard, WORK_SAMPLES } from "@/components/recruiters/WorkSampleCard";
import { GovtTrustBlock } from "@/components/landing/GovtTrustBlock";
import { CounterProof } from "@/components/landing/CounterProof";
import { BriefingPackForm } from "@/components/briefing/BriefingPackForm";
import { pageSeo } from "@/lib/seo";
import { absUrl } from "@/components/landing/constants";
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";

export const Route = createFileRoute("/recruiters")({
  head: () => {
    const title = "Hire from Arzon · Verify any candidate, see the rubric";
    const description =
      "Recruiters: verify any Arzon Global certificate, see the JD-task rubric behind every grade band, and preview de-identified work samples per track. No fluff, no PII.";
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

type VerifyState =
  | { state: "idle" }
  | { state: "valid"; id: string }
  | { state: "invalid"; id: string };

function RecruitersPage() {
  const [id, setId] = useState("");
  const [result, setResult] = useState<VerifyState>({ state: "idle" });

  useEffect(() => {
    // Pre-fill a sample id so recruiters can test immediately
    setId("AG-PV-2026-001");
  }, []);

  const onCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = id.trim().toUpperCase();
    if (!trimmed) return;
    if (/^AG-[A-Z0-9-]{6,}/.test(trimmed)) {
      setResult({ state: "valid", id: trimmed });
    } else {
      setResult({ state: "invalid", id: trimmed });
    }
  };

  return (
    <main className="min-h-app bg-[#F7F9FC] pb-24 text-ink">
      <section className="arzon-v2-container py-10 sm:py-14">
        <div className="arzon-v2-card p-6 sm:p-8">
          <div className="max-w-2xl">
            <p className="arzon-v2-data-label">CREDENTIAL CHECK</p>
            <h2 className="mt-2 text-2xl font-bold text-[var(--arzon-ink)]">Verify an Arzon candidate</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--arzon-ink-soft)]">Paste a certificate ID to open the public verification and candidate evidence flow.</p>
          </div>
          <form onSubmit={onCheck} className="mt-5 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Certificate ID, e.g. AG-PV-2026-001"
              className="h-12 flex-1 rounded-full border border-[var(--arzon-border)] bg-white px-5 text-sm text-[var(--arzon-ink)] outline-none ring-[var(--arzon-blue-600)]/30 placeholder:text-[var(--arzon-ink-muted)] focus:ring-2"
            />
            <button type="submit" className="arzon-v2-button-primary">
              <Search className="mr-2 h-4 w-4" /> Verify
            </button>
          </form>
          {result.state !== "idle" ? (
            <div className="mt-5">{result.state === "valid" ? <div className="rounded-2xl bg-[var(--arzon-teal-100)] p-4 text-sm text-[var(--arzon-teal-600)]"><CheckCircle2 className="inline h-4 w-4 mr-1" /> Format looks valid. <Link to="/verify" search={{ id: result.id }} className="font-semibold underline">Open verifier</Link>.</div> : <div className="rounded-2xl bg-[#FFF7ED] p-4 text-sm text-[var(--arzon-amber-600)]"><AlertCircle className="inline h-4 w-4 mr-1" /> Please check the certificate ID format.</div>}</div>
          ) : null}
        </div>
      </section>

      {/* Grading rubric */}
      <Section size="md">
        <SectionHeader
          eyebrow="Grade band → JD-task outcomes"
          title="What B+ vs A actually means on day 1"
          sub="Bands are performance-based, mapped to live JD requirements. Pick a track to see the rubric the auditor scored against."
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
          sub="Track-level previews; full artifacts (redacted PDF + auditor scoring sheet) sent on recruiter request with student consent."
          align="left"
        />
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {WORK_SAMPLES.map((s) => (
            <WorkSampleCard key={s.trackSlug} sample={s} />
          ))}
        </div>
      </Section>

      {/* Selectivity */}
      <CounterProof />

      {/* Registrations + ledger */}
      <GovtTrustBlock />

      <Section size="md">
        <SectionHeader
          eyebrow="Want it all in one PDF?"
          title="Get the de-identified recruiter pack"
          sub="The rubric, sample artifacts, and verification flow on one page. We email the link to your work address and a counsellor follows up within 4 working hours."
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
            Tell us the role + city, we send a shortlist with verified IDs and grade bands. We do
            not charge recruiters; placements go on the public ledger.
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
              Read the public ledger →
            </Link>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
