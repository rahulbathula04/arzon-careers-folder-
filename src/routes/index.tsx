import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { HealthcareDiscoveryHeader } from "@/components/landing/HealthcareDiscoveryHeader";
import { HealthcareHero } from "@/components/landing/HealthcareHero";
import { InteractiveCareerExplorer } from "@/components/career-explorer/InteractiveCareerExplorer";
import { CareerDetailInspector } from "@/components/landing/CareerDetailInspector";
import { CareerComparisonMatrix } from "@/components/landing/CareerComparisonMatrix";
import { CompanyRolesFeed } from "@/components/landing/CompanyRolesFeed";
import { SalaryInsightsBlock } from "@/components/landing/SalaryInsightsBlock";
import { IndustrySkillsToolsBlock } from "@/components/landing/IndustrySkillsToolsBlock";
import { CollegeVsIndustryGapBlock } from "@/components/landing/CollegeVsIndustryGapBlock";
import { LowFrictionProfileRegistration } from "@/components/landing/LowFrictionProfileRegistration";
import { ExpertGuidanceBookingSection } from "@/components/landing/ExpertGuidanceBookingSection";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { GlobalFloatingIntakeBar } from "@/components/landing/GlobalFloatingIntakeBar";
import { HealthcareDegree, HEALTHCARE_DEGREES } from "@/data/healthcareTaxonomy";
import { SITE, absUrl } from "@/components/landing/constants";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => {
    const og = absUrl(SITE.ogImage.inauguration);
    const title = "Arzon Healthcare Career Intelligence · B.Pharm, Pharm.D & Life Sciences Product";
    const desc =
      "Interactive healthcare career intelligence platform for B.Pharm, Pharm.D, D.Pharm, Biotechnology & Life Sciences students. Explore real career paths, current job requirements, companies, skills and salary ranges — then speak to an expert.";
    const s = seo("/");
    const homeUrl = `${SITE.origin}/`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        {
          name: "keywords",
          content:
            "bpharm career options, pharmacovigilance jobs, clinical data management salary, pharmd career path, biotechnology jobs, regulatory affairs freshers, argus safety tools, meddra coding, healthcare data analytics",
        },
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
                name: "What healthcare degrees are supported by Arzon Career Intelligence?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We support B.Pharm, Pharm.D, D.Pharm, B.Tech/B.Sc Biotechnology, B.Sc/M.Sc Life Sciences, Microbiology, Biochemistry, and Allied Healthcare degrees.",
                },
              },
              {
                "@type": "Question",
                name: "Is career exploration free on Arzon Healthcare?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Career exploration, role taxonomy inspection, salary insights, and tool breakdowns are 100% free and open. No course purchase is required.",
                },
              },
            ],
          }),
        },
      ],
    };
  },
  component: Index,
});

function Index() {
  const [selectedDegreeObj, setSelectedDegreeObj] = useState<HealthcareDegree | null>(HEALTHCARE_DEGREES[0]);
  const [inspectedCareer, setInspectedCareer] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const scrollToExplorer = () => {
    const el = document.getElementById("interactive-explorer");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToRegistration = () => {
    const el = document.getElementById("career-profile-registration");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-app overflow-x-clip bg-[#070D1B] text-slate-100 font-sans tone-dark">
      
      {/* 01. Top Navigation */}
      <HealthcareDiscoveryHeader
        onOpenAdvisorBooking={() => setIsBookingModalOpen(true)}
      />

      {/* 02. Hero Section with Embedded Interactive Application Entry */}
      <HealthcareHero
        selectedDegreeId={selectedDegreeObj?.id || "bpharm"}
        onSelectDegree={(deg) => setSelectedDegreeObj(deg)}
        onExploreClick={scrollToExplorer}
        onAdvisorClick={() => setIsBookingModalOpen(true)}
      />

      {/* 03. Interactive Career Intelligence Product Engine */}
      <div id="interactive-explorer">
        <InteractiveCareerExplorer
          selectedDegree={selectedDegreeObj}
          onSelectDegree={(deg) => setSelectedDegreeObj(deg)}
          onWhatsAppStepReached={scrollToRegistration}
        />
      </div>

      {/* 05 & 06. Standardized Career Detail Inspector */}
      <CareerDetailInspector
        careerName={inspectedCareer}
        onClose={() => setInspectedCareer(null)}
        onAdvisorClick={() => setIsBookingModalOpen(true)}
      />

      {/* 07. Career Comparison Matrix */}
      <CareerComparisonMatrix
        onAdvisorClick={() => setIsBookingModalOpen(true)}
      />

      {/* 08. Companies & Real Role Context Feed */}
      <CompanyRolesFeed
        onAdvisorClick={() => setIsBookingModalOpen(true)}
      />

      {/* 09. Normalized Salary Insights */}
      <SalaryInsightsBlock />

      {/* 10. Industry Skills & Software Tools */}
      <IndustrySkillsToolsBlock />

      {/* 11. College vs Industry Gap Analysis */}
      <CollegeVsIndustryGapBlock
        onCompareCurriculumClick={scrollToRegistration}
      />

      {/* 12. Instant WhatsApp Micro-Opt-In (2-Field Capture) */}
      <LowFrictionProfileRegistration
        selectedDegree={selectedDegreeObj?.shortName || "B.Pharm"}
      />

      {/* 16 & 17. Human Expert Guidance & 1-Click Slot Selector */}
      <ExpertGuidanceBookingSection
        isOpenModal={isBookingModalOpen}
        onCloseModal={() => setIsBookingModalOpen(false)}
      />

      {/* FAQ */}
      <FAQ limit={8} />

      {/* Footer */}
      <Footer />

      {/* Global Floating Lead Intake Bar */}
      <GlobalFloatingIntakeBar />

      <Toaster richColors position="top-center" theme="dark" />
    </main>
  );
}
