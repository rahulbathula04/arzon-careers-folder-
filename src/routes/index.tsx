import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { useNavSections } from "@/components/landing/NavSectionsContext";
import { Hero } from "@/components/landing/Hero";
import { TaskPartnershipBlock } from "@/components/landing/TaskPartnershipBlock";
import { ProblemBlock } from "@/components/landing/ProblemBlock";
import { HiringSystemBlock } from "@/components/landing/HiringSystemBlock";
import { SelectivityBlock } from "@/components/landing/SelectivityBlock";
import { HSBCCurriculumStrip } from "@/components/landing/HSBCCurriculumStrip";
import { ClinicalTracksBlock } from "@/components/landing/ClinicalTracksBlock";
import { TransformationBlock } from "@/components/landing/TransformationBlock";
import { ProofWallBlock } from "@/components/landing/ProofWallBlock";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { ApplicationForm } from "@/components/landing/ApplicationForm";
import { Footer } from "@/components/landing/Footer";
import { SITE, LINKS, absUrl } from "@/components/landing/constants";
import { seo } from "@/lib/seo";
import { useHomeSearchSignals } from "@/hooks/useHomeSearchSignals";
import { COURSES } from "@/data/courses";

const HOME_SECTIONS = [
  { id: "top", label: "Home" },
  { id: "partnership-proof", label: "Partnerships" },
  { id: "the-problem", label: "The Problem" },
  { id: "hiring-system", label: "Hiring System" },
  { id: "selectivity", label: "Suitability" },
  { id: "curriculum", label: "Programme" },
  { id: "clinical-tracks", label: "Clinical Tracks" },
  { id: "transformation", label: "Transformation" },
  { id: "proof-wall", label: "Proof" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
  { id: "apply", label: "Apply" },
];

export const Route = createFileRoute("/")({
  head: () => {
    const og = absUrl(SITE.ogImage.inauguration);
    const title = "HSBC & JPMorgan Chase Certified Recruitment Partner · Arzon Global";
    const desc =
      "Arzon Global is an official Certified Recruitment Partner of HSBC Holdings (VMO ID: HSBC2621TAVM026) and JPMorgan Chase & Co. 60-seat AI/ML & Clinical Engineering cohort. Starts 30 August 2026. Pan India. Direct partner-desk review.";
    const s = seo("/");
    const homeUrl = `${SITE.origin}/`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        // Open Graph
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: homeUrl },
        { property: "og:locale", content: "en_IN" },
        { property: "og:site_name", content: "Arzon Global" },
        { property: "og:image", content: og },
        { property: "og:image:secure_url", content: og },
        { property: "og:image:type", content: "image/jpeg" },
        { property: "og:image:width", content: String(SITE.ogImage.width) },
        { property: "og:image:height", content: String(SITE.ogImage.height) },
        { property: "og:image:alt", content: SITE.ogImage.alt },
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: og },
        { name: "twitter:image:alt", content: SITE.ogImage.alt },
      ],
      links: [...s.links],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is this a real internship or another online course?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Both parts are real and distinct. Weeks 1–8 are live instructor-led classes with graded weekly homework on actual data files. Weeks 9–12 are an applied internship where you work on bank-domain and healthcare capstone projects.",
                },
              },
              {
                "@type": "Question",
                name: "What exactly does the HSBC and JPMorgan partnership mean for me?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "When you complete the programme and clear our internal mock assessment threshold of 75 out of 100, your application is submitted through the Arzon certified partner desk directly to the HSBC or JPMorgan recruitment team.",
                },
              },
              {
                "@type": "Question",
                name: "Do you guarantee a job?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. What we guarantee is documented and specific: certified partner-desk submission to HSBC and JPMorgan, 7-day fast-track review, and for Elite tier, 3 confirmed hiring manager introduction calls.",
                },
              },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Arzon Global",
            url: SITE.origin,
            logo: absUrl(SITE.ogImage.inauguration),
            sameAs: [LINKS.linkedin, LINKS.instagram, LINKS.website],
          }),
        },
      ],
    };
  },
  component: Index,
});

function Index() {
  useNavSections(HOME_SECTIONS);
  useHomeSearchSignals({ path: "/" });

  return (
    <main className="min-h-app overflow-x-clip bg-[#F7F5F0]">
      {/* 1 · Section One — The Certificate Hero (Pain-first) */}
      <div data-apply-surface="home-hero">
        <Hero />
      </div>

      {/* 2 · Section Two — The Partnership Proof */}
      <TaskPartnershipBlock />

      {/* 3 · Section Three — The Problem (Black Hole vs Arzon Pipeline) */}
      <ProblemBlock />

      {/* 4 · Section Four — The Recruiter's Desk (5-Stage Hiring System) */}
      <HiringSystemBlock />

      {/* 5 · Section Five — Suitability & Exclusivity Filter */}
      <SelectivityBlock />

      {/* 6 · Section Six — The Programme */}
      <HSBCCurriculumStrip />

      {/* 7 · Section Seven — Clinical Tracks */}
      <ClinicalTracksBlock />

      {/* 8 · Section Eight — Student Transformation Matrix */}
      <TransformationBlock />

      {/* 9 · Section Nine — The Proof Wall */}
      <ProofWallBlock />

      {/* 10 · Section Ten — Pricing & Guarantee (Outcome-Based) */}
      <Pricing />

      {/* 11 · Section Eleven — FAQ */}
      <FAQ limit={7} />

      {/* 12 · Section Twelve — Multi-Step Application Form & SLA Timeline */}
      <ApplicationForm />

      {/* 13 · Section Thirteen — Institutional Footer & Emotional Finale */}
      <Footer />

      <Toaster richColors position="top-center" theme="dark" />
    </main>
  );
}

