import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { FAQ } from "@/components/landing/FAQ";
import { SectionSkeleton } from "@/components/landing/SectionSkeleton";
import { pageSeo } from "@/lib/seo";
import { ArzonV2PageHero } from "@/components/system/ArzonV2PageHero";
import { ArzonDecisionHub } from "@/components/funnel/ArzonDecisionHub";

const StudentQuestionBank = lazy(() =>
  import("@/components/landing/StudentQuestionBank").then((m) => ({
    default: m.StudentQuestionBank,
  })),
);

export const Route = createFileRoute("/faq")({
  head: () => {
    const ps = pageSeo({
      path: "/faq",
      title: "Frequently asked questions · Arzon Global",
      description: "Answers about Arzon programmes, assessments, fees, refunds, cohorts, certificates and career support.",
    });
    return { meta: [{ title: "Frequently asked questions · Arzon Global" }, ...ps.meta], links: ps.links };
  },
  component: FaqPage,
});

function FaqPage() {
  return (
    <div className="arzon-v2-page min-h-screen bg-white tone-light text-[var(--arzon-ink)]">
      <ArzonV2PageHero
        eyebrow="HELP · FAQ"
        title="Get clear answers before you make a programme decision."
        description="Understand programme format, fees, assessment, certificates, refunds, cohorts and career support. Start with information, then choose your next step."
        mobileImageSrc="/images/bpharm-female-graduate-hero.jpg"
        mobileImageAlt="Indian healthcare graduate reviewing career information"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/career-engine" className="arzon-v2-button-primary">Get My Career Plan <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/courses" className="arzon-v2-button-secondary">Explore Programmes</Link>
        </div>
      </ArzonV2PageHero>

      <ArzonDecisionHub
        eyebrow="STILL DECIDING?"
        title="Get clarity before you commit."
        description="Use the free Career Engine to understand your likely role path, or browse the programme catalogue with the questions below in mind."
        primaryLabel="Get My Career Plan"
        primaryTo="/career-engine"
        secondaryLabel="Explore Programmes"
        secondaryTo="/courses"
      />

      <main className="arzon-v2-container pb-24 pt-12">
        <FAQ />
        <Suspense fallback={<SectionSkeleton variant="faq" minH={600} />}>
          <StudentQuestionBank />
        </Suspense>
      </main>
    </div>
  );
}
