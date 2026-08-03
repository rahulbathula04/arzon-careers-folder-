import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/landing/Footer";
import { SITE, absUrl } from "@/components/landing/constants";
import { ArrowRight, Sparkles } from "lucide-react";
import { getScrollRoot } from "@/lib/scroll";

// Healthcare Career Intelligence Platform (V1) Component Suite
import { WorkshopHero } from "@/components/workshop/WorkshopHero";
import { CareerSearchAI } from "@/components/workshop/CareerSearchAI";
import { InteractiveCareerExplorer } from "@/components/workshop/InteractiveCareerExplorer";
import { HiringCompanyExplorer } from "@/components/workshop/HiringCompanyExplorer";
import { IndustryRealitySection } from "@/components/workshop/IndustryRealitySection";
import { CostOfGuessingCalculator } from "@/components/workshop/CostOfGuessingCalculator";
import { CareerGuessworkEnemy } from "@/components/workshop/CareerGuessworkEnemy";
import { ArzonTrustAnchor } from "@/components/workshop/ArzonTrustAnchor";
import { WorkshopRegistrationCard } from "@/components/workshop/WorkshopRegistrationCard";

export const Route = createFileRoute("/workshop")({
  head: () => {
    const title = "Healthcare Career Intelligence Platform & Workshop | Arzon";
    const description = "Discover your best-fit healthcare career with data-backed intelligence. Explore Pharmacovigilance, CDM, Regulatory Affairs, Medical Coding & SAS Analytics.";
    const canonical = absUrl("/workshop");
    const ogImage = absUrl(SITE.ogImage.inauguration);

    return {
      meta: [
        { title },
        { name: "description", content: description },

        // Open Graph
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Arzon Careers" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: canonical },
        { property: "og:image", content: ogImage },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },

        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: ogImage },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  component: HealthcareWorkshopPage,
});

function HealthcareWorkshopPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    const root = getScrollRoot();
    const onScroll = () => {
      const currentScroll = root ? root.scrollTop : window.scrollY;
      setShowStickyCta(currentScroll > 550);
    };
    onScroll();
    (root ?? window).addEventListener("scroll", onScroll, { passive: true });
    return () => (root ?? window).removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="tone-dark min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white font-sans antialiased">
      <main className="relative pb-16">
        {/* 1. Hero with Perplexity-style Live Product Preview */}
        <WorkshopHero onOpenRegister={handleOpenModal} />

        {/* 2. Perplexity-Style Career Search & Ask AI Accordion */}
        <CareerSearchAI onOpenRegister={handleOpenModal} />

        {/* 3. Notion/Linear Style Master Workspace Explorer */}
        <InteractiveCareerExplorer onOpenRegister={handleOpenModal} />

        {/* 4. Interactive Employer & Recruiter Directory */}
        <HiringCompanyExplorer onOpenRegister={handleOpenModal} />

        {/* 5. GitHub Diff Visual: College vs Corporate Reality */}
        <IndustryRealitySection onOpenRegister={handleOpenModal} />

        {/* 6. Animated Opportunity Cost Calculator */}
        <CostOfGuessingCalculator onOpenRegister={handleOpenModal} />

        {/* 7. Vertical Emotional Transformation Timeline */}
        <CareerGuessworkEnemy onOpenRegister={handleOpenModal} />

        {/* 8. Institutional Trust & Credibility (ISO, TASK, JDs) */}
        <ArzonTrustAnchor onOpenRegister={handleOpenModal} />

        {/* 9. Transformation-First Workshop Registration */}
        <WorkshopRegistrationCard
          isOpenModal={isModalOpen}
          onCloseModal={handleCloseModal}
          onOpenModal={handleOpenModal}
        />
      </main>

      {/* Desktop Sticky Floating Bottom CTA Bar - Only shows after scrolling past hero */}
      {showStickyCta && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 hidden sm:flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/95 px-5 py-3 shadow-2xl backdrop-blur-xl transition-all duration-300">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span className="text-xs font-bold text-white">Find Your Healthcare Career Match</span>
            <span className="text-[11px] font-mono text-slate-400">· 90 Mins Live</span>
          </div>
          <button
            type="button"
            onClick={handleOpenModal}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Find My Career Path</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HealthcareWorkshopPage;
