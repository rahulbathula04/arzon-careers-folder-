import { useState, useRef, useEffect, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { pageSeo } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonLd";
import { submitWorkshopLead } from "@/lib/workshop.functions";
import { track } from "@/lib/track";
import { WORKSHOP_CONFIG, buildGoogleCalendarUrl } from "@/data/workshopConfig";
import { ExtremePremiumOnboardingView } from "@/components/workshop/ExtremePremiumOnboardingView";

// Rebuilt Scaler-Architected Arzon Components
import { ArzonEventHeader } from "@/components/workshop/ArzonEventHeader";
import { ArzonEventHero } from "@/components/workshop/ArzonEventHero";
import { ArzonFloatingRegisterCard } from "@/components/workshop/ArzonFloatingRegisterCard";
import { ArzonEventMetaStrip } from "@/components/workshop/ArzonEventMetaStrip";
import { ArzonWorkshopOverview } from "@/components/workshop/ArzonWorkshopOverview";
import { ArzonAudience } from "@/components/workshop/ArzonAudience";
import { ArzonWhatYouWillSee } from "@/components/workshop/ArzonWhatYouWillSee";
import { ArzonLearningOutcomes } from "@/components/workshop/ArzonLearningOutcomes";
import { ArzonEventCaseStudy } from "@/components/workshop/ArzonEventCaseStudy";
import { ArzonEmployerEvidence } from "@/components/workshop/ArzonEmployerEvidence";
import { ArzonMentorDossier } from "@/components/workshop/ArzonMentorDossier";
import { ArzonFieldGuideSection } from "@/components/workshop/ArzonFieldGuideSection";
import { ArzonProgramBridge } from "@/components/workshop/ArzonProgramBridge";
import { ArzonEventFaq } from "@/components/workshop/ArzonEventFaq";
import { ArzonFinalCTA } from "@/components/workshop/ArzonFinalCTA";
import { ArzonEventFooter } from "@/components/workshop/ArzonEventFooter";
import { ArrowRight } from "lucide-react";

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
  head: ({ match }) => {
    const isVariantB = (match?.search as any)?.v === "b";
    const title = isVariantB
      ? "FREE LIVE PHARMACOVIGILANCE CAREER WORKSHOP | What does a Pharmacovigilance Associate actually do?"
      : "FREE LIVE PHARMACOVIGILANCE CAREER WORKSHOP | You finished your healthcare degree. Now what?";
    const description =
      "Explore what Pharmacovigilance and Clinical Data employers actually expect from freshers before you spend money on another course. Live 75-minute simulated case triage with Mohamed Kumail Abbas.";

    const ps = pageSeo({
      title,
      description,
      path: "/healthcare-career-workshop",
    });

    return {
      meta: [{ title }, ...ps.meta],
      links: ps.links,
      scripts: [
        {
          type: "application/ld+json",
          children: breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Healthcare Hiring Lab", path: "/healthcare-career-workshop" },
          ]),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationEvent",
            name: "Arzon Healthcare Hiring Lab: Live Case & Interview Simulation",
            description,
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
            startDate: "2026-09-06T18:00:00+05:30",
            endDate: "2026-09-06T19:15:00+05:30",
            isAccessibleForFree: true,
            organizer: {
              "@type": "Organization",
              name: "Arzon Global",
              url: "https://arzoncareers.in",
            },
            performer: {
              "@type": "Person",
              name: "Mohamed Kumail Abbas",
              jobTitle: "Manager, Pharmacovigilance",
            },
            location: {
              "@type": "VirtualLocation",
              url: "https://meet.google.com/pyc-qvxs-quz",
            },
          }),
        },
      ],
    };
  },
  component: HealthcareCareerWorkshopPage,
});

export function HealthcareCareerWorkshopPage() {
  const search = Route.useSearch();
  const cfg = WORKSHOP_CONFIG;
  const isVariantB = search.v === "b";

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [degree, setDegree] = useState(cfg.eligibleDegrees[0]);
  const [email, setEmail] = useState("");
  const [graduationYear] = useState("2025");
  const [currentStatus] = useState("Recently graduated");
  const [interestTrack] = useState("Pharmacovigilance");
  const [appliedBefore] = useState("No");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const isRegisteredParam = Boolean(search.registered || search.onboarding);
  const [isSuccess, setIsSuccess] = useState(isRegisteredParam);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; phone?: string; email?: string }>({});
  const [copiedMeet, setCopiedMeet] = useState(false);
  const [postRegProblem, setPostRegProblem] = useState<string | null>(null);

  // Field tracking and focus states
  const [trackedFields, setTrackedFields] = useState<Set<string>>(new Set());
  const registrationStartTracked = useRef(false);
  const [isFormFocused, setIsFormFocused] = useState(false);
  const [isFormInView, setIsFormInView] = useState(false);

  // Restore registered candidate session if exists
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("arzon_registered_candidate");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) setName(parsed.name);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.degree) setDegree(parsed.degree);
        if (parsed.email) setEmail(parsed.email);
        setIsSuccess(true);
      } else if (isRegisteredParam) {
        setName("Dr. Ananya Sharma");
        setPhone("9876543210");
        setDegree("Pharm.D");
        setIsSuccess(true);
      }
    } catch {
      // ignore
    }
  }, [isRegisteredParam]);

  // Telemetry: Page View
  useEffect(() => {
    track("page_view", {
      props: {
        path: "/healthcare-career-workshop",
        variant: isVariantB ? "b" : "a",
        utm_source: search.utm_source,
        utm_medium: search.utm_medium,
        utm_campaign: search.utm_campaign,
        utm_content: search.utm_content,
        utm_term: search.utm_term,
      },
    });
  }, [isVariantB, search]);

  // Telemetry: Scroll Depths
  useEffect(() => {
    const trackedDepths = new Set<number>();

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const progress = Math.round((window.scrollY / scrollHeight) * 100);

      [25, 50, 75, 90].forEach((depth) => {
        if (progress >= depth && !trackedDepths.has(depth)) {
          trackedDepths.add(depth);
          track(`scroll_${depth}` as any, {
            props: { variant: isVariantB ? "b" : "a" },
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVariantB]);

  // IntersectionObserver to track if registration form is currently on screen
  useEffect(() => {
    const formCard = document.getElementById("registration-card");
    if (!formCard) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFormInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(formCard);
    return () => observer.disconnect();
  }, [isSuccess]);

  const scrollToForm = () => {
    track("hero_cta_click", {
      props: {
        variant: isVariantB ? "b" : "a",
        source: "cta_button",
      },
    });
    const card = document.getElementById("registration-card");
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      const firstInput = card.querySelector("input");
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 400);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleInputFocus = () => {
    setIsFormFocused(true);
    if (!registrationStartTracked.current) {
      registrationStartTracked.current = true;
      track("registration_start", { props: { variant: isVariantB ? "b" : "a" } });
    }
  };

  const handleFieldBlur = (fieldName: string) => {
    setIsFormFocused(false);
    if (!trackedFields.has(fieldName)) {
      setTrackedFields((prev) => new Set(prev).add(fieldName));
      track("registration_field_completed", {
        props: { field: fieldName, variant: isVariantB ? "b" : "a" },
      });
    }
  };

  const handleCopyMeet = () => {
    navigator.clipboard.writeText(cfg.meetUrl);
    setCopiedMeet(true);
    setTimeout(() => setCopiedMeet(false), 2500);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setErrorMsg(null);
    setFieldErrors({});

    const cleanName = name.trim();
    let cleanPhone = phone.trim().replace(/\D/g, "");

    // Normalize country code / leading zeros
    if (cleanPhone.length === 12 && cleanPhone.startsWith("91")) {
      cleanPhone = cleanPhone.slice(2);
    } else if (cleanPhone.length === 11 && cleanPhone.startsWith("0")) {
      cleanPhone = cleanPhone.slice(1);
    }

    if (cleanName.length < 2) {
      setErrorMsg("Please enter your full name (minimum 2 characters).");
      setFieldErrors({ name: "Please enter your full name." });
      document.getElementById("floating-form-name")?.focus();
      return;
    }

    if (cleanPhone.length !== 10) {
      setErrorMsg("Please enter a valid 10-digit WhatsApp number.");
      setFieldErrors({ phone: "Enter a valid 10-digit WhatsApp number." });
      document.getElementById("floating-form-phone")?.focus();
      return;
    }

    const cleanEmail = email.trim();
    if (cleanEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErrorMsg("Please enter a valid email address.");
      setFieldErrors({ email: "Enter a valid email address." });
      document.getElementById("floating-form-email")?.focus();
      return;
    }

    setIsSubmitting(true);
    track("registration_submit", {
      props: {
        variant: isVariantB ? "b" : "a",
        degree,
      },
    });

    try {
      await submitWorkshopLead({
        data: {
          name: cleanName,
          phone: cleanPhone,
          degree,
          email: cleanEmail || undefined,
          graduationYear,
          currentStatus,
          interestTrack,
          appliedBefore,
          source: "workshop-landing-page",
          utmSource: search.utm_source ?? undefined,
          utmMedium: search.utm_medium ?? undefined,
          utmCampaign: search.utm_campaign ?? undefined,
          utmContent: search.utm_content ?? undefined,
          utmTerm: search.utm_term ?? undefined,
          variant: isVariantB ? "b" : "a",
        },
      });

      sessionStorage.setItem(
        "arzon_registered_candidate",
        JSON.stringify({
          name: cleanName,
          phone: cleanPhone,
          degree,
          email: cleanEmail || undefined,
        })
      );

      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      track("registration_success", {
        props: {
          variant: isVariantB ? "b" : "a",
          degree,
        },
      });
    } catch (err: any) {
      console.error("[Workshop Registration Error]", err);
      const msg = err?.message || "Failed to reserve seat. Please check your connection and try again.";
      setErrorMsg(msg);
      if (msg.includes("Already registered")) {
        setIsSuccess(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-warm-paper)] text-[var(--color-arzon-ink)] font-sans selection:bg-[var(--color-medical-navy)] selection:text-[var(--color-warm-white)] flex flex-col">
      {/* 1. Event Header */}
      <ArzonEventHeader onReserveClick={scrollToForm} isRegistered={isSuccess} />

      <main className="flex-1 w-full">
        {isSuccess ? (
          /* Post-Registration: 5-Zone Arzon Career Intelligence Access (Section 33) */
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
            <ExtremePremiumOnboardingView
              candidateName={name}
              candidateDegree={degree}
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
          /* Pre-Registration Event Architecture (Disciplined Visual Rhythm & Viewport Focal Points) */
          <div className="w-full">
            {/* Viewport 1: High-Contrast Hero + Deep Medical Navy Registration Desk */}
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left: Hero Narrative & Breakout Mentor Entry (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <ArzonEventHero onReserveClick={scrollToForm} isVariantB={isVariantB} />
                </div>

                {/* Right: Registration Desk (5 cols on desktop; placed right after hero on mobile) */}
                <div className="lg:col-span-5">
                  <ArzonFloatingRegisterCard
                    name={name}
                    phone={phone}
                    degree={degree}
                    email={email}
                    eligibleDegrees={cfg.eligibleDegrees}
                    isSubmitting={isSubmitting}
                    errorMsg={errorMsg}
                    fieldErrors={fieldErrors}
                    onNameChange={setName}
                    onPhoneChange={setPhone}
                    onDegreeChange={setDegree}
                    onEmailChange={setEmail}
                    onInputFocus={handleInputFocus}
                    onFieldBlur={handleFieldBlur}
                    onSubmit={handleSubmit}
                    isVariantB={isVariantB}
                  />
                </div>
              </div>

              {/* Event Meta Strip: Single Editorial Record (Navy Anchor + Amber Rule + Teal Marker) */}
              <div className="pt-8">
                <ArzonEventMetaStrip />
              </div>
            </div>

            {/* Viewport 2: Target Profile & Agenda */}
            <ArzonAudience />
            <ArzonWhatYouWillSee />

            {/* Viewport 3: Flagship Demonstration (Full-Bleed Dark Case Study #071223) */}
            <ArzonEventCaseStudy
              onReserveClick={() => {
                track("case_cta_click", { props: { variant: isVariantB ? "b" : "a" } });
                scrollToForm();
              }}
              isRegistered={isSuccess}
            />

            {/* Viewport 4: Employer Intelligence & Degree-to-Job Gap Visualizer */}
            <ArzonEmployerEvidence />

            {/* Viewport 5: Strong Human Mentor Moment */}
            <ArzonMentorDossier />

            {/* Viewport 6: Career Field Guide Publication Artifact */}
            <ArzonFieldGuideSection
              onOpenGuide={scrollToForm}
              candidateName={name}
              candidateDegree={degree}
            />

            {/* Operational Bridge & FAQ */}
            <ArzonProgramBridge />
            <ArzonEventFaq />

            {/* Viewport 7: Deep Medical Navy Final CTA */}
            <ArzonFinalCTA onReserveClick={scrollToForm} />
          </div>
        )}
      </main>

      {/* 14. Footer & WhatsApp Support (Sections 21 & 22) */}
      <ArzonEventFooter />

      {/* 15. Mobile Sticky Bottom CTA (Section 20) */}
      {!isSuccess && !isFormInView && !isFormFocused && (
        <div className="fixed bottom-0 inset-x-0 z-50 p-3 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-lg sm:hidden flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom duration-200 tone-light">
          <div className="space-y-0.5 text-left">
            <span className="font-serif font-bold text-xs text-stone-950 block">
              Free Live PV Workshop
            </span>
            <span className="font-mono text-[10px] text-stone-500 block">
              Sun 6 Sep · 6:00 PM IST
            </span>
          </div>
          <button
            type="button"
            onClick={scrollToForm}
            className="inline-flex items-center gap-1.5 py-2.5 px-4 rounded-lg bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm transition-colors cursor-pointer shrink-0"
          >
            <span>Reserve Free Seat</span>
            <ArrowRight className="w-3 h-3 text-sky-400" />
          </button>
        </div>
      )}
    </div>
  );
}
