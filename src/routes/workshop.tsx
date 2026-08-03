import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { SITE, absUrl } from "@/components/landing/constants";

import { WorkshopHero } from "@/components/workshop/WorkshopHero";
import { CareerGuessworkEnemy } from "@/components/workshop/CareerGuessworkEnemy";
import { IndustryRealitySection } from "@/components/workshop/IndustryRealitySection";
import { CostOfGuessingCalculator } from "@/components/workshop/CostOfGuessingCalculator";
import { InteractiveCareerExplorer } from "@/components/workshop/InteractiveCareerExplorer";
import { CareerDecisionEngine } from "@/components/workshop/CareerDecisionEngine";
import { InteractiveIndustryMap } from "@/components/workshop/InteractiveIndustryMap";
import { LiveMarketFeed } from "@/components/workshop/LiveMarketFeed";
import { FutureTimeline } from "@/components/workshop/FutureTimeline";
import { WorkshopRegistrationCard } from "@/components/workshop/WorkshopRegistrationCard";

export const Route = createFileRoute("/workshop")({
  head: () => {
    const title = "Healthcare Career Intelligence Workshop · Arzon Careers";
    const desc =
      "Data-driven career intelligence experience for B.Pharm, Pharm.D, MBBS, BDS & Life Sciences graduates in India. Eliminate career guesswork across Pharmacovigilance, CDM, Regulatory Affairs & Health Analytics.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${SITE.origin}/workshop` },
        { property: "og:image", content: absUrl(SITE.ogImage.inauguration) },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `${SITE.origin}/workshop` }],
    };
  },
  component: WorkshopPage,
});

function WorkshopPage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased selection:bg-blue-500 selection:text-white">
      {/* Shared Main Nav Header */}
      <Nav />

      {/* Main Content Sections */}
      <main id="main-content">
        <WorkshopHero onOpenRegister={() => setIsRegisterOpen(true)} />
        <CareerGuessworkEnemy />
        <IndustryRealitySection />
        <CostOfGuessingCalculator />
        <InteractiveCareerExplorer />
        <CareerDecisionEngine onOpenRegister={() => setIsRegisterOpen(true)} />
        <InteractiveIndustryMap />
        <LiveMarketFeed />
        <FutureTimeline />
        <WorkshopRegistrationCard
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          onOpen={() => setIsRegisterOpen(true)}
        />
      </main>

      {/* Shared Main Footer */}
      <Footer />
    </div>
  );
}
