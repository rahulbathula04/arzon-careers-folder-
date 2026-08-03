import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { SITE, absUrl } from "@/components/landing/constants";

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
    const ogImage = absUrl(SITE.ogImage);

    return {
      meta: [
        { title },
        { name: "description", content: description },

        // Open Graph
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: SITE.name },
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

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500 selection:text-white font-sans antialiased">
      {/* Header Navigation */}
      <Nav />

      <main className="relative">
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

        {/* 7. 5-Second Emotional Transformation Timeline */}
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HealthcareWorkshopPage;
