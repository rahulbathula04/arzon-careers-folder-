import { useState, useEffect, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { pageSeo } from "@/lib/seo";
import { submitWorkshopLead } from "@/lib/workshop.functions";
import { track } from "@/lib/track";
import { useFunnelTracking } from "@/hooks/useFunnelTracking";

// Apple-Grade Minimalist Masterclass Components
import { ArzonEventHeader } from "@/components/workshop/ArzonEventHeader";
import { MasterclassHero } from "@/components/workshop/MasterclassHero";
import { MasterclassWalkaway } from "@/components/workshop/MasterclassWalkaway";
import { MasterclassMentor } from "@/components/workshop/MasterclassMentor";
import { MasterclassAudience } from "@/components/workshop/MasterclassAudience";
import { MasterclassWhyArzon } from "@/components/workshop/MasterclassWhyArzon";
import { MasterclassRegisterDesk } from "@/components/workshop/MasterclassRegisterDesk";
import { MasterclassFaq } from "@/components/workshop/MasterclassFaq";
import { ArzonFinalCTA } from "@/components/workshop/ArzonFinalCTA";
import { MasterclassPassView } from "@/components/workshop/MasterclassPassView";
import { ArzonEventFooter } from "@/components/workshop/ArzonEventFooter";

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
    const title = "Pharmacovigilance Masterclass | Arzon Careers";
    const description =
      "Join the free live Pharmacovigilance Masterclass. Understand drug safety roles, ICSR workflows, and entry-level career requirements before deciding.";

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
            "pharmacovigilance masterclass, drug safety associate, icsr case processing, b.pharm pharmacovigilance, m.pharm drug safety, pharm.d pharmacovigilance, arzon careers",
        },
        {
          name: "author",
          content: "Arzon Careers",
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
                name: "Pharmacovigilance Masterclass",
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
            name: "Pharmacovigilance Masterclass: Understand the Role, See the Work",
            description,
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
            startDate: "2026-10-20T18:00:00+05:30",
            endDate: "2026-10-20T19:00:00+05:30",
            duration: "PT1H",
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
              name: "Arzon Careers",
              url: "https://arzoncareers.in",
              logo: "https://arzoncareers.in/og/og-inauguration.jpg",
            },
            performer: {
              "@type": "Person",
              name: "Mohamed Kumail Abbas",
              jobTitle: "Industry Professional in Pharmacovigilance",
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

  const funnel = useFunnelTracking({
    pageName: "healthcare-career-workshop",
    category: "pv-masterclass",
  });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [qualificationStatus, setQualificationStatus] = useState("B.Pharm graduate");
  const [pvStage, setPvStage] = useState("Exploring it as a career");
  const [learningGoal, setLearningGoal] = useState("What a drug safety professional does");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    track("page_view", {
      props: {
        page: "pharmacovigilance_masterclass",
        utm_source: search.utm_source,
        utm_medium: search.utm_medium,
        utm_campaign: search.utm_campaign,
      },
    });
  }, [search]);

  const scrollToForm = () => {
    funnel.trackHeroCtaClick("registration_flow", "reserve_seat");
    const desk = document.getElementById("reserve-seat");
    if (desk) {
      desk.scrollIntoView({ behavior: "smooth", block: "start" });
      const firstInput = desk.querySelector("input") as HTMLInputElement | null;
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 400);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit WhatsApp number.");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await submitWorkshopLead({
        data: {
          name,
          phone: cleanPhone,
          qualificationStatus,
          pvStage,
          learningGoal,
          utmSource: search.utm_source,
          utmMedium: search.utm_medium,
          utmCampaign: search.utm_campaign,
          utmContent: search.utm_content,
          utmTerm: search.utm_term,
        },
      });

      if (result && result.ok) {
        setIsSuccess(true);
        funnel.trackLeadFormComplete({ qualificationStatus, pvStage, learningGoal });
        track("registration_success", {
          props: { qualificationStatus, pvStage, learningGoal },
        });
      } else {
        setErrorMsg("Registration could not be completed. Please verify your details.");
      }
    } catch (err: any) {
      const msg = String(err?.message || "");
      if (msg.toLowerCase().includes("already registered")) {
        setIsSuccess(true);
        funnel.trackLeadFormComplete({ qualificationStatus, pvStage, learningGoal, status: "returning" });
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

      <main className="flex-1 w-full">
        {isSuccess ? (
          /* Post-Registration Success View */
          <MasterclassPassView
            name={name}
            phone={phone}
            qualificationStatus={qualificationStatus}
          />
        ) : (
          /* 8-Section Masterclass Journey */
          <div className="w-full">
            {/* 01. HERO */}
            <MasterclassHero onReserveClick={scrollToForm} />

            {/* 02. WHAT YOU'LL WALK AWAY WITH */}
            <MasterclassWalkaway />

            {/* 03. YOUR MENTOR */}
            <MasterclassMentor />

            {/* 04. IS THIS MASTERCLASS FOR YOU? */}
            <MasterclassAudience />

            {/* 05. WHY ARZON CAREERS */}
            <MasterclassWhyArzon />

            {/* 06. RESERVE YOUR SEAT */}
            <MasterclassRegisterDesk
              name={name}
              phone={phone}
              qualificationStatus={qualificationStatus}
              pvStage={pvStage}
              learningGoal={learningGoal}
              isSubmitting={isSubmitting}
              errorMsg={errorMsg}
              onNameChange={setName}
              onPhoneChange={setPhone}
              onQualificationChange={setQualificationStatus}
              onPvStageChange={setPvStage}
              onLearningGoalChange={setLearningGoal}
              onSubmit={handleSubmit}
            />

            {/* 07. FREQUENTLY ASKED QUESTIONS */}
            <MasterclassFaq />

            {/* 08. FINAL CTA */}
            <ArzonFinalCTA onReserveClick={scrollToForm} />
          </div>
        )}
      </main>

      {/* Footer */}
      <ArzonEventFooter />
    </div>
  );
}
