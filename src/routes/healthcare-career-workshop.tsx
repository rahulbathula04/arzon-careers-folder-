import { useState, useRef, useEffect, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { pageSeo } from "@/lib/seo";
import { submitWorkshopLead, getWorkshopSeatStats } from "@/lib/workshop.functions";
import { track } from "@/lib/track";
import { WORKSHOP_CONFIG } from "@/data/workshopConfig";
import { ExtremePremiumOnboardingView } from "@/components/workshop/ExtremePremiumOnboardingView";

// Rebuilt Arzon Global B.Pharm Career Intelligence Components
import { ArzonEventHeader } from "@/components/workshop/ArzonEventHeader";
import { ArzonEventHero } from "@/components/workshop/ArzonEventHero";
import { HeroFeatureCards } from "@/components/workshop/HeroFeatureCards";
import { EmployerLogoStrip } from "@/components/workshop/EmployerLogoStrip";
import { ResearchStatsBar } from "@/components/workshop/ResearchStatsBar";
import { ArzonProblemSection } from "@/components/workshop/ArzonProblemSection";
import { CareerDirectionsGrid } from "@/components/workshop/CareerDirectionsGrid";
import { CareerDecisionMatrix } from "@/components/workshop/CareerDecisionMatrix";
import { HiringMarketDiagram } from "@/components/workshop/HiringMarketDiagram";
import { EmployerSkillsSection } from "@/components/workshop/EmployerSkillsSection";
import { CertificationRealitySection } from "@/components/workshop/CertificationRealitySection";
import { InteractiveCareerSelector } from "@/components/workshop/InteractiveCareerSelector";
import { WhoShouldAttendSection } from "@/components/workshop/WhoShouldAttendSection";
import { ArzonEventFaq } from "@/components/workshop/ArzonEventFaq";
import { ArzonFinalCTA } from "@/components/workshop/ArzonFinalCTA";
import { ArzonEventFooter } from "@/components/workshop/ArzonEventFooter";
import { StickyMobileCTA } from "@/components/workshop/StickyMobileCTA";

const searchSchema = z
  .object({
    v: z.string().optional(),
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
    utm_content: z.string().optional(),
    utm_term: z.string().optional(),
    registered: z.any().optional(),
    onboarding: z.any().optional(),
  })
  .passthrough();

export const Route = createFileRoute("/healthcare-career-workshop")({
  validateSearch: (search: Record<string, unknown>) => {
    try {
      return searchSchema.parse(search);
    } catch {
      return {};
    }
  },
  head: () => {
    const title = "B.Pharm Career Intelligence 2026 · Live Session | Arzon Global";
    const description =
      "Join a live career intelligence session for B.Pharm, M.Pharm & Pharm.D candidates. Discover roles, companies, skills, technologies, certifications, and salary bands across Indian healthcare.";

    const ps = pageSeo({
      title,
      description,
      path: "/healthcare-career-workshop",
      image: "/og/og-inauguration.jpg",
      ogType: "website",
    });

    return {
      meta: [
        { title },
        ...ps.meta,
        {
          name: "keywords",
          content:
            "b.pharm career intelligence, b pharm fresher jobs, healthcare career map, pharmacovigilance freshers, medical coding jobs, clinical data management, regulatory affairs freshers, arzon global",
        },
        {
          name: "author",
          content: "Arzon Global Intelligence Unit",
        },
        {
          name: "robots",
          content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },
      ],
      links: ps.links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://arzoncareers.in/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Healthcare Careers",
                item: "https://arzoncareers.in/courses",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "B.Pharm Career Intelligence 2026",
                item: "https://arzoncareers.in/healthcare-career-workshop",
              },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationEvent",
            name: "B.Pharm Career Intelligence 2026: Live Market Decoding & Career Map",
            description,
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
            startDate: "2026-09-19T18:00:00+05:30",
            endDate: "2026-09-19T19:15:00+05:30",
            duration: "PT1H15M",
            isAccessibleForFree: true,
            inLanguage: "en-IN",
            maximumAttendeeCapacity: 500,
            image: "https://arzoncareers.in/og/og-inauguration.jpg",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
              url: "https://arzoncareers.in/healthcare-career-workshop",
              validFrom: "2026-08-01T00:00:00+05:30",
            },
            organizer: {
              "@type": "EducationalOrganization",
              name: "Arzon Global",
              url: "https://arzoncareers.in",
              logo: "https://arzoncareers.in/og/og-inauguration.jpg",
            },
          }),
        },
      ],
    };
  },
  component: HealthcareCareerWorkshopComponent,
});

function HealthcareCareerWorkshopComponent() {
  const search = Route.useSearch();
  const isVariantB = search.v === "b";
  const cfg = WORKSHOP_CONFIG;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [college, setCollege] = useState("");
  const [branch, setBranch] = useState("Pharmacology");
  const [degree, setDegree] = useState("B.Pharm");
  const [email, setEmail] = useState("");
  const [graduationYear, setGraduationYear] = useState("2026");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [copiedMeet, setCopiedMeet] = useState(false);
  const [postRegProblem, setPostRegProblem] = useState<string | null>(null);
  const [showStickyMobile, setShowStickyMobile] = useState(false);

  const [seatStats, setSeatStats] = useState(() => ({
    allocatedSeats: cfg.baselineAllocated,
    totalCapacity: cfg.totalCapacity,
    percentReserved: Math.min(100, Math.round((cfg.baselineAllocated / cfg.totalCapacity) * 100)),
  }));

  useEffect(() => {
    getWorkshopSeatStats().then((res) => {
      if (res && typeof res.allocatedSeats === "number") {
        setSeatStats({
          allocatedSeats: res.allocatedSeats,
          totalCapacity: res.totalCapacity || cfg.totalCapacity,
          percentReserved: res.percentReserved || 86,
        });
      }
    });
  }, [cfg.totalCapacity]);

  useEffect(() => {
    track("page_view", {
      props: {
        page: "bpharm_career_intelligence_2026",
        utm_source: search.utm_source,
        utm_medium: search.utm_medium,
        utm_campaign: search.utm_campaign,
      },
    });
  }, [search]);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyMobile(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    track("hero_cta_click", { props: { target: "registration_desk" } });
    const desk = document.getElementById("registration-desk");
    if (desk) {
      desk.scrollIntoView({ behavior: "smooth", block: "center" });
      const firstInput = desk.querySelector("input") as HTMLInputElement | null;
      if (firstInput) firstInput.focus();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCopyMeet = () => {
    navigator.clipboard.writeText(cfg.meetUrl);
    setCopiedMeet(true);
    setTimeout(() => setCopiedMeet(false), 2500);
    track("meet_link_copy", { props: { source: "onboarding_card" } });
  };

  const handleInputFocus = (fieldName?: string) => {
    track("form_start", { props: { field: fieldName || "input" } });
  };

  const handleFieldBlur = (fieldName: string) => {
    track("form_field_complete", { props: { field: fieldName } });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    setFieldErrors({});

    try {
      const result = await submitWorkshopLead({
        data: {
          name,
          phone,
          college,
          branch,
          degree,
          email,
          graduationYear,
          utmSource: search.utm_source,
          utmMedium: search.utm_medium,
          utmCampaign: search.utm_campaign,
          utmContent: search.utm_content,
          utmTerm: search.utm_term,
        },
      });

      if (result && result.ok) {
        setIsSuccess(true);
        track("registration_success", {
          props: { degree, graduationYear, college },
        });
      } else {
        setErrorMsg("Registration failed. Please verify your details.");
      }
    } catch (err: any) {
      const msg = String(err?.message || "");
      if (msg.toLowerCase().includes("already registered")) {
        // Candidate is already registered: smoothly confirm their access and display their admission pass
        setIsSuccess(true);
        track("registration_returning_access", {
          props: { degree, graduationYear, college },
        });
      } else {
        setErrorMsg(msg || "Unable to process registration. Please check your internet connection.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-warm-paper)] text-[var(--color-arzon-ink)] font-sans selection:bg-[var(--color-medical-navy)] selection:text-[var(--color-warm-white)] flex flex-col">
      {/* 1. Header */}
      <ArzonEventHeader onReserveClick={scrollToForm} isRegistered={isSuccess} />

      <main className={`flex-1 w-full${!isSuccess ? " pb-20 lg:pb-0" : ""}`}>
        {isSuccess ? (
          /* Post-Registration Success & Onboarding */
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
            <ExtremePremiumOnboardingView
              candidateName={name}
              candidateDegree={degree}
              candidateCollege={college}
              candidateBranch={branch}
              candidatePhone={phone}
              candidateEmail={email}
              cfg={cfg}
              isVariantB={isVariantB}
              copiedMeet={copiedMeet}
              onCopyMeet={handleCopyMeet}
              postRegProblem={postRegProblem}
              onSelectProblem={setPostRegProblem}
            />
          </div>
        ) : (
          /* Pre-Registration High-Intent Conversion Flow */
          <div className="w-full">
            {/* Section 2: Hero Section */}
            <div className="relative w-full">
              <ArzonEventHero onReserveClick={scrollToForm} isVariantB={isVariantB} />
            </div>

            {/* Section 3: Hero Feature Cards */}
            <HeroFeatureCards />

            {/* Section 4: Trusted Employer Logo Strip */}
            <EmployerLogoStrip />

            {/* Section 5: Research Dataset Metrics Bar */}
            <ResearchStatsBar />

            {/* Section 4: Problem Section */}
            <ArzonProblemSection onReserveClick={scrollToForm} />

            {/* Section 5: 15+ Healthcare Career Directions Grid */}
            <CareerDirectionsGrid onReserveClick={scrollToForm} />

            {/* Section 6: Interactive 60-Second Career Diagnostic */}
            <InteractiveCareerSelector onReserveClick={scrollToForm} />

            {/* Section 7: Career Decision Matrix & Registration Desk */}
            <CareerDecisionMatrix
              name={name}
              phone={phone}
              college={college}
              branch={branch}
              degree={degree}
              email={email}
              graduationYear={graduationYear}
              eligibleDegrees={cfg.eligibleDegrees}
              isSubmitting={isSubmitting}
              errorMsg={errorMsg}
              fieldErrors={fieldErrors}
              onNameChange={setName}
              onPhoneChange={setPhone}
              onCollegeChange={setCollege}
              onBranchChange={setBranch}
              onDegreeChange={setDegree}
              onEmailChange={setEmail}
              onGraduationYearChange={setGraduationYear}
              onInputFocus={handleInputFocus}
              onFieldBlur={handleFieldBlur}
              onSubmit={handleSubmit}
              allocatedSeats={seatStats.allocatedSeats}
              totalCapacity={seatStats.totalCapacity}
              percentReserved={seatStats.percentReserved}
              onReserveClick={scrollToForm}
            />

            {/* Section 8: Core Session Discoveries & 6-Step Reverse Hiring Flow */}
            <HiringMarketDiagram onReserveClick={scrollToForm} />

            {/* Section 9: Employer Skills Percentage Section */}
            <EmployerSkillsSection />

            {/* Section 9.5: Certification Reality Section */}
            <CertificationRealitySection onReserveClick={scrollToForm} />

            {/* Section 10: Who Should Attend vs Who Should NOT Attend */}
            <WhoShouldAttendSection onReserveClick={scrollToForm} />

            {/* Section 11: 11-Item FAQ Section */}
            <ArzonEventFaq />

            {/* Section 12: Pre-Footer Deep Navy Final CTA */}
            <ArzonFinalCTA onReserveClick={scrollToForm} />
          </div>
        )}
      </main>

      {/* Section 14: Footer */}
      <ArzonEventFooter />

      {/* Section 15: Sticky Bottom Mobile CTA Bar */}
      {!isSuccess && (
        <StickyMobileCTA onReserveClick={scrollToForm} isVisible={showStickyMobile} />
      )}
    </div>
  );
}
