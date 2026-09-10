import { useState, useRef, useEffect, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { pageSeo } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonLd";
import { submitWorkshopLead, getWorkshopSeatStats } from "@/lib/workshop.functions";
import { track } from "@/lib/track";
import { WORKSHOP_CONFIG } from "@/data/workshopConfig";
import { ExtremePremiumOnboardingView } from "@/components/workshop/ExtremePremiumOnboardingView";
import { isReducedMotion } from "@/hooks/useReducedMotion";

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
import { ArzonInstitutionalSection } from "@/components/workshop/ArzonInstitutionalSection";
import { ArzonEventFaq } from "@/components/workshop/ArzonEventFaq";
import { ArzonInstitutionalGateway } from "@/components/workshop/ArzonInstitutionalGateway";
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
      ? "What Does a PV Associate Do? Free Workshop | Arzon Global"
      : "Free Pharmacovigilance Career Workshop | Arzon Global";
    const description =
      "Free live 75-min Pharmacovigilance case study workshop for B.Pharm, M.Pharm & Pharm.D freshers. Learn ICH E2D triage & MedDRA coding with mentor Kumail Abbas.";

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
            "pharmacovigilance workshop, drug safety associate, pv case triage, meddra coding, ich e2d, b pharm fresher jobs, m pharm careers, pharm d jobs hyderabad, clinical research freshers, arzon global",
        },
        {
          name: "author",
          content: "Arzon Global Intelligence Unit",
        },
        {
          name: "robots",
          content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },
        {
          name: "twitter:creator",
          content: "@arzonglobal",
        },
        {
          name: "twitter:site",
          content: "@arzonglobal",
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
                name: "Free Pharmacovigilance Career Workshop",
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
            name: "Arzon Free Pharmacovigilance Career Workshop: Live Case Triage & MedDRA Simulation",
            description,
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
            startDate: "2026-09-11T18:00:00+05:30",
            endDate: "2026-09-11T19:15:00+05:30",
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
            performer: {
              "@type": "Person",
              name: "Mohamed Kumail Abbas",
              jobTitle: "Manager, Pharmacovigilance Operations",
              worksFor: {
                "@type": "Organization",
                name: "Novaspire (Ex-Cognizant, Accenture, Quintiles)",
              },
            },
            location: {
              "@type": "VirtualLocation",
              url: "https://meet.google.com/pyc-qvxs-quz",
            },
            educationalLevel: "Fresh Graduate / Entry-Level",
            audience: {
              "@type": "Audience",
              audienceType: "B.Pharm, M.Pharm, Pharm.D, BDS & Life Sciences Graduates",
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Is the workshop really free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. The 75-minute live working session on Friday, 11 September 2026 is completely free of charge. There are no hidden fees or paywalls required to join the Google Meet room or download the Field Guide.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need prior Pharmacovigilance experience?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No prior experience is necessary. The session is specifically designed for healthcare freshers and life sciences graduates to help you understand how adverse event intake, triage, and coding are conducted in enterprise environments.",
                },
              },
              {
                "@type": "Question",
                name: "Is this only for B.Pharm?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. While B.Pharm graduates are a core audience, this working session is equally valuable for M.Pharm, Pharm.D, MBBS, BDS, and Life Sciences graduates (B.Sc / M.Sc Biotechnology, Biochemistry, Microbiology, and Bioinformatics).",
                },
              },
              {
                "@type": "Question",
                name: "What happens during the session?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Mohamed Kumail Abbas will share his screen and walk through a simulated adverse event report (Metformin ER 500 mg). You will see the 4 ICH-E2D validity checks, seriousness evaluation, MedDRA SOC/PT coding, and regulatory reporting timeline calculation in real-time, followed by open Q&A.",
                },
              },
              {
                "@type": "Question",
                name: "Will there be a sales pitch?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The vast majority of the 75 minutes is dedicated entirely to live operational training: processing the Metformin ICSR case, walking through MedDRA coding, analyzing regulatory timelines, and answering candidate questions. At the very end, we briefly explain our role-readiness program for candidates who want guided mentorship.",
                },
              },
              {
                "@type": "Question",
                name: "What if I cannot attend live?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Because this is an interactive simulation with live Q&A and screen-sharing of enterprise workflows, we strongly encourage attending live. However, all registered candidates will receive operational follow-ups and the 2026 Career Field Guide dossier directly via WhatsApp and email.",
                },
              },
              {
                "@type": "Question",
                name: "Where will I receive the joining details?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Immediately upon submitting your registration, you will see your direct Google Meet room access link. Additionally, we send a calendar confirmation and an operational reminder with the direct link to your registered WhatsApp number before the session starts.",
                },
              },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "Pharmacovigilance Adverse Event Case Triage & MedDRA Coding Masterclass",
            description:
              "75-minute live practical masterclass for healthcare graduates on ICSR intake, ICH E2D validity criteria, seriousness evaluation, and MedDRA terminology.",
            provider: {
              "@type": "Organization",
              name: "Arzon Global",
              url: "https://arzoncareers.in",
            },
            isAccessibleForFree: true,
            educationalCredentialAwarded: "Arzon Workshop Participation Certificate",
            occupationalCategory: "29-9099.00 - Healthcare Practitioners and Technical Workers",
            timeRequired: "PT1H15M",
            inLanguage: "en-IN",
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "Online",
              courseWorkload: "PT1H15M",
              startDate: "2026-09-11T18:00:00+05:30",
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
  const [college, setCollege] = useState("");
  const [branch, setBranch] = useState("Pharmacology");
  const [degree, setDegree] = useState(cfg.eligibleDegrees[0]);
  const [email, setEmail] = useState("");
  const [graduationYear, setGraduationYear] = useState("2025");
  const [currentStatus] = useState("Recently graduated");
  const [interestTrack] = useState("Pharmacovigilance");
  const [appliedBefore] = useState("No");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const isRegisteredParam = Boolean(search.registered || search.onboarding);
  const [isSuccess, setIsSuccess] = useState(isRegisteredParam);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
    college?: string;
    branch?: string;
  }>({});
  const [copiedMeet, setCopiedMeet] = useState(false);
  const [postRegProblem, setPostRegProblem] = useState<string | null>(null);

  // Dynamic Seat Allocation State (Baseline + live applications received)
  const [seatStats, setSeatStats] = useState({
    allocatedSeats: cfg.baselineAllocated ?? 432,
    totalCapacity: cfg.totalCapacity ?? 500,
    percentReserved: Math.min(
      100,
      Math.round(((cfg.baselineAllocated ?? 432) / (cfg.totalCapacity ?? 500)) * 100)
    ),
  });

  // Fetch live seat statistics from database with 30s background sync
  useEffect(() => {
    let isMounted = true;

    const fetchStats = () => {
      getWorkshopSeatStats()
        .then((stats) => {
          if (isMounted && stats) {
            setSeatStats({
              allocatedSeats: stats.allocatedSeats,
              totalCapacity: stats.totalCapacity,
              percentReserved: stats.percentReserved,
            });
          }
        })
        .catch(() => {
          // Fallback to baseline default
        });
    };

    fetchStats();
    if (typeof window !== "undefined" && isReducedMotion()) return;

    const interval = setInterval(fetchStats, 30000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Field tracking and focus states
  const [trackedFields, setTrackedFields] = useState<Set<string>>(new Set());
  const registrationStartTracked = useRef(false);
  const [isFormFocused, setIsFormFocused] = useState(false);

  // Restore registered candidate session if exists (cross-tab & reload safe)
  useEffect(() => {
    try {
      let saved = sessionStorage.getItem("arzon_registered_candidate");
      if (!saved && typeof localStorage !== "undefined") {
        saved = localStorage.getItem("arzon_registered_candidate");
      }

      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) setName(parsed.name);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.college) setCollege(parsed.college);
        if (parsed.branch) setBranch(parsed.branch);
        if (parsed.degree) setDegree(parsed.degree);
        if (parsed.graduationYear) setGraduationYear(parsed.graduationYear);
        if (parsed.email) setEmail(parsed.email);
        setIsSuccess(true);
      } else if (isRegisteredParam) {
        setName("Dr. Ananya Sharma");
        setPhone("9876543210");
        setCollege("Sultan-ul-Uloom College of Pharmacy");
        setBranch("Pharmacology");
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

    const cleanCollege = college.trim();
    if (cleanCollege.length < 2) {
      setErrorMsg("Please enter your college / university name.");
      setFieldErrors({ college: "College name is required." });
      document.getElementById("floating-form-college")?.focus();
      return;
    }

    const cleanBranch = branch.trim();
    if (cleanBranch.length < 2) {
      setErrorMsg("Please enter your branch / stream.");
      setFieldErrors({ branch: "Branch / stream is required." });
      document.getElementById("floating-form-branch")?.focus();
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
        college: cleanCollege,
        branch: cleanBranch,
      },
    });

    try {
      await submitWorkshopLead({
        data: {
          name: cleanName,
          phone: cleanPhone,
          college: cleanCollege,
          branch: cleanBranch,
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

      const candidatePayload = JSON.stringify({
        name: cleanName,
        phone: cleanPhone,
        college: cleanCollege,
        branch: cleanBranch,
        degree,
        graduationYear,
        email: cleanEmail || undefined,
      });

      sessionStorage.setItem("arzon_registered_candidate", candidatePayload);
      try {
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("arzon_registered_candidate", candidatePayload);
        }
      } catch {
        // ignore quota errors
      }

      // Optimistically increment live allocated seat counter
      setSeatStats((prev) => {
        const nextAllocated = Math.min(prev.totalCapacity, prev.allocatedSeats + 1);
        return {
          ...prev,
          allocatedSeats: nextAllocated,
          percentReserved: Math.min(100, Math.round((nextAllocated / prev.totalCapacity) * 100)),
        };
      });

      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      track("registration_success", {
        props: {
          variant: isVariantB ? "b" : "a",
          degree,
          college: cleanCollege,
          branch: cleanBranch,
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

      <main className={`flex-1 w-full${!isSuccess ? " pb-20 lg:pb-0" : ""}`}>
        {isSuccess ? (
          /* Post-Registration: 5-Zone Arzon Career Intelligence Access (Section 33) */
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
                    isVariantB={isVariantB}
                    allocatedSeats={seatStats.allocatedSeats}
                    totalCapacity={seatStats.totalCapacity}
                    percentReserved={seatStats.percentReserved}
                  />
                </div>
              </div>

              {/* Event Meta Strip: Single Editorial Record (Navy Anchor + Amber Rule + Teal Marker) */}
              <div className="pt-8">
                <ArzonEventMetaStrip
                  allocatedSeats={seatStats.allocatedSeats}
                  totalCapacity={seatStats.totalCapacity}
                />
              </div>
            </div>

            {/* ── INSTITUTIONAL GATEWAY ── High-authority signal for TPOs, Principals, HODs, Chairmen.
                Placed immediately after the hero so institutional visitors get served
                without scrolling through student-centric content. */}
            <ArzonInstitutionalGateway />

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

      {/* ── Mobile Sticky Reserve CTA (visible only on small screens, pre-registration) ── */}
      {!isSuccess && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-warm-white)]/95 backdrop-blur-md border-t border-[var(--color-border-warm)] px-4 py-3 flex items-center justify-between gap-3 shadow-2xl">
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-wider">
              Free · 75 Min Live Session
            </p>
            <p className="font-serif text-sm font-bold text-[var(--color-arzon-ink)] truncate">
              Fri 11 Sep · 6:00 PM IST
            </p>
          </div>
          <button
            type="button"
            id="mobile-sticky-reserve-btn"
            onClick={scrollToForm}
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[var(--color-arzon-ink)] hover:bg-[var(--color-medical-navy)] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md transition-colors cursor-pointer"
            style={{ color: '#FFFFFF' }}
          >
            Reserve Seat
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
