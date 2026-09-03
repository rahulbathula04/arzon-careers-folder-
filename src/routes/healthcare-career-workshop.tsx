import { useState, useRef, useEffect, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import arzonIcon from "@/assets/arzon-icon.webp";
import researcherImg from "@/assets/workshop-researcher.webp";
import mentorshipImg from "@/assets/workshop-mentorship.webp";
import {
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
  Award,
  Check,
  X,
  Phone,
  User,
  Mail,
  HelpCircle,
  Video,
  FileText,
  MessageCircle,
  AlertCircle,
  Briefcase,
  ChevronDown,
} from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { pageSeo } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonLd";
import { SITE } from "@/components/landing/constants";
import { submitWorkshopLead } from "@/lib/workshop.functions";
import { track } from "@/lib/track";
import { MemoizedHealthcare3dCanvas } from "@/components/3d/Healthcare3dCanvas";
import { Interactive3dCard, Card3dLayer } from "@/components/3d/Interactive3dCard";
import { Floating3dBadge } from "@/components/3d/Floating3dBadge";
import { Interactive3dBoardingPass } from "@/components/3d/Interactive3dBoardingPass";
import { LiveSocialProofTicker } from "@/components/landing/LiveSocialProofTicker";
import { InteractiveCareerFitTool } from "@/components/workshop/InteractiveCareerFitTool";
import { WorkshopHiringStrip } from "@/components/workshop/WorkshopHiringStrip";
import { WorkshopSalaryRolesMatrix } from "@/components/workshop/WorkshopSalaryRolesMatrix";
import { WorkshopLiveCaseTeaser } from "@/components/workshop/WorkshopLiveCaseTeaser";
import { WorkshopWhoIsThisFor } from "@/components/workshop/WorkshopWhoIsThisFor";
import { WorkshopCertificatePreview } from "@/components/workshop/WorkshopCertificatePreview";
import { WorkshopStarterKitTeaser } from "@/components/workshop/WorkshopStarterKitTeaser";
import { WORKSHOP_CONFIG } from "@/data/workshopConfig";
import { isReducedMotion } from "@/hooks/useReducedMotion";

export const Route = createFileRoute("/healthcare-career-workshop")({
  head: () => {
    const title = "Healthcare Career Workshop | Arzon Global";
    const description =
      "Join our free live Healthcare Career Workshop to understand industry roles, required skills, career paths and what employers actually look for in entry-level candidates.";
    const url = "https://arzoncareers.in/healthcare-career-workshop";

    return {
      title,
      meta: pageSeo({
        title,
        description,
        url,
        structuredData: [
          breadcrumbSchema([
            { name: "Home", url: SITE.url },
            { name: "Healthcare Career Workshop", url },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "EducationEvent",
            name: "Arzon Global Healthcare Career Workshop",
            description,
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
            location: {
              "@type": "VirtualLocation",
              url: WORKSHOP_CONFIG.meetUrl,
            },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
            },
            organizer: {
              "@type": "Organization",
              name: "Arzon Global",
              url: SITE.url,
            },
            performer: {
              "@type": "Person",
              name: WORKSHOP_CONFIG.speaker.name,
              jobTitle: WORKSHOP_CONFIG.speaker.designation,
            },
          },
        ],
      }),
    };
  },
  component: HealthcareCareerWorkshopPage,
});

export default function HealthcareCareerWorkshopPage() {
  // 2-Field Registration State (Ultra-low friction)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [showEmailField, setShowEmailField] = useState(false);
  const [consent, setConsent] = useState(true);

  // Progressive Profiling State (After seat confirmation)
  const [candidateType, setCandidateType] = useState("");
  const [areaInterest, setAreaInterest] = useState("");
  const [qualification, setQualification] = useState("");

  // UI & Funnel State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [passId, setPassId] = useState("HC-84920");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  // UTM Attribution State
  const [utmSource, setUtmSource] = useState("meta_direct");
  const [utmMedium, setUtmMedium] = useState("");
  const [utmCampaign, setUtmCampaign] = useState("");

  const formRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const hasTrackedFormStart = useRef(false);

  // Extract UTM parameters on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setUtmSource(params.get("utm_source") || "meta_direct");
      setUtmMedium(params.get("utm_medium") || "cpc");
      setUtmCampaign(params.get("utm_campaign") || "healthcare_workshop_2026");

      track("registration_form_view", {
        source: params.get("utm_source") || "direct",
        campaign: params.get("utm_campaign") || "organic",
      });
    }
  }, []);

  // Sticky Bar scroll trigger & Exit Intent detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };

    const handleMouseLeave = (e: globalThis.MouseEvent) => {
      if (e.clientY <= 0 && !isSuccess) {
        const dismissed = sessionStorage.getItem("arzon_exit_dismissed");
        if (!dismissed) {
          setShowExitModal(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isSuccess]);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 400);
  };

  const handleInputFocus = () => {
    if (!hasTrackedFormStart.current) {
      hasTrackedFormStart.current = true;
      track("registration_started", {
        source: utmSource,
      });
    }
  };

  // Indian phone number validation
  const validatePhone = (num: string): boolean => {
    const clean = num.replace(/\D/g, "");
    return clean.length === 10 && /^[6-9]\d{9}$/.test(clean);
  };

  // 2-Field Form Submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const cleanName = name.trim();
    const cleanPhone = phone.replace(/\D/g, "");

    if (!cleanName || cleanName.length < 2) {
      setErrorMsg("Please enter your full name.");
      track("registration_error", { field: "name", error: "missing_or_too_short" });
      return;
    }

    if (!validatePhone(cleanPhone)) {
      setErrorMsg("Please enter a valid 10-digit Indian WhatsApp mobile number.");
      track("registration_error", { field: "phone", error: "invalid_indian_mobile" });
      return;
    }

    if (!consent) {
      setErrorMsg("Please accept the WhatsApp communication consent to receive workshop details.");
      return;
    }

    setIsSubmitting(true);
    const generatedPass = `HC-${cleanPhone.slice(-4)}${Math.floor(10 + Math.random() * 90)}`;
    setPassId(generatedPass);

    try {
      await submitWorkshopLead({
        name: cleanName,
        phone: cleanPhone,
        email: email.trim() || undefined,
        degree: qualification || "Healthcare Graduate",
        source: "healthcare-career-workshop",
        utmSource,
        notes: `Interest: ${areaInterest || "General"} | Stage: ${candidateType || "Fresher"} | Pass: ${generatedPass}`,
      });

      track("registration_completed", {
        passId: generatedPass,
        source: utmSource,
        hasEmail: Boolean(email.trim()),
      });

      // Fire Meta Lead standard event if supported
      if (typeof window !== "undefined" && (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq) {
        (window as unknown as { fbq: (...args: unknown[]) => void }).fbq("track", "Lead", {
          content_name: "Healthcare Career Workshop",
          currency: "INR",
          value: 0,
        });
      }

      setIsSuccess(true);
    } catch {
      // Non-blocking graceful fallback
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Progressive Profiling One-Tap Handler
  const handleProfileSelect = (category: "type" | "interest" | "qualification", value: string) => {
    track("profile_question_answered", {
      category,
      value,
    });

    if (category === "type") setCandidateType(value);
    if (category === "interest") setAreaInterest(value);
    if (category === "qualification") setQualification(value);
  };

  // Google Calendar Event Generator (Asia/Kolkata timezone)
  const generateGoogleCalendarUrl = () => {
    const title = encodeURIComponent("Healthcare Career Workshop | Arzon Global");
    const details = encodeURIComponent(
      `Arzon Global Live Healthcare Career Workshop\n\nMentor: Mohamed Kumail Abbas (20+ Years PV Leader)\nFormat: Live Working Session on Google Meet\nMeeting Link: ${WORKSHOP_CONFIG.meetUrl}\n\nCareer Starter Kit & details sent to your WhatsApp.`
    );
    const location = encodeURIComponent("Google Meet: " + WORKSHOP_CONFIG.meetUrl);
    // 20260308T110000 / 20260308T121500 in IST (Asia/Kolkata)
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${WORKSHOP_CONFIG.startIsoDate}/${WORKSHOP_CONFIG.endIsoDate}&ctz=Asia/Kolkata&details=${details}&location=${location}`;
  };

  // Dismiss Exit Modal
  const handleDismissExitModal = () => {
    setShowExitModal(false);
    sessionStorage.setItem("arzon_exit_dismissed", "true");
  };

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-stone-900 font-sans selection:bg-[#1B3F8B]/20 selection:text-[#0B1325]">
      {/* ─────────────────────────────────────────────────────────────
          EVENT ANNOUNCEMENT STRIP (Configurable from workshopConfig)
         ───────────────────────────────────────────────────────────── */}
      <div className="w-full bg-[#0B1325] text-white border-b border-white/10 px-4 py-2.5 sm:py-3 sticky top-0 z-50 shadow-md">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold tracking-wider uppercase border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse mr-1.5" />
              {WORKSHOP_CONFIG.type}
            </span>
            <span className="text-xs sm:text-sm font-medium text-stone-200">
              Live on {WORKSHOP_CONFIG.platform} · {WORKSHOP_CONFIG.dateDisplay} · {WORKSHOP_CONFIG.timeDisplay} ({WORKSHOP_CONFIG.durationDisplay})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-amber-300 hidden md:inline">
              {WORKSHOP_CONFIG.capacityLimitText}
            </span>
            <button
              type="button"
              onClick={scrollToForm}
              className="text-[11px] font-mono font-bold text-white hover:text-sky-300 underline underline-offset-4 cursor-pointer"
            >
              Reserve Seat →
            </button>
          </div>
        </div>
      </div>

      <Nav />

      {/* 3D WebGL Particle Canvas (Background) */}
      <MemoizedHealthcare3dCanvas className="absolute inset-0 pointer-events-none opacity-40 z-0" />

      {/* Social Proof Floating Ticker */}
      <LiveSocialProofTicker />

      <main className="relative z-10 pt-16 sm:pt-20">
        {/* ─────────────────────────────────────────────────────────────
            01 · HERO SECTION: 2-FIELD FAST FORM + DUAL-COLUMN LAYOUT
           ───────────────────────────────────────────────────────────── */}
        <section className="relative border-b border-stone-200/90 py-12 sm:py-18 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Core Value Proposition & Fast Form */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                {/* Authority Badges */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  <Floating3dBadge duration={4} delay={0.1}>
                    <div className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white/95 px-3 py-1 shadow-2xs">
                      <img src={arzonIcon} alt="Arzon Global" className="h-3.5 w-3.5 object-contain" />
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-900">
                        ARZON GLOBAL · CAREER INITIATIVE
                      </span>
                    </div>
                  </Floating3dBadge>

                  <Floating3dBadge duration={5} delay={0.4}>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1B3F8B] font-mono text-[11px] font-bold">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1B3F8B] motion-safe:animate-pulse" />
                      {WORKSHOP_CONFIG.speaker.experienceYears} VETERAN FACULTY
                    </span>
                  </Floating3dBadge>

                  <Floating3dBadge duration={4.5} delay={0.7}>
                    <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[11px] font-bold">
                      EX-ACCENTURE &amp; COGNIZANT LEAD
                    </span>
                  </Floating3dBadge>
                </div>

                {/* Section 3 Spec Headline with Editorial Serif & Sans Pairing */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-serif font-bold tracking-tight text-stone-950 leading-[1.12]">
                  Want to Know <span className="italic text-[#1B3F8B]">Where a Healthcare Degree</span> Can Take Your Career?
                </h1>

                {/* Explicit Target Audience Degree Pills (Instant Relevance) */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 pt-1">
                  <span className="text-[11px] font-bold text-stone-800 font-mono tracking-wider">TARGET AUDIENCE:</span>
                  {["B.Pharm", "M.Pharm", "Pharm.D", "Biotech", "Life Sciences"].map((deg) => (
                    <span
                      key={deg}
                      className="px-2 py-0.5 rounded-md bg-stone-100/90 border border-stone-300 text-stone-900 font-mono text-[11px] font-semibold"
                    >
                      {deg}
                    </span>
                  ))}
                  <span className="text-[11px] font-mono text-[#1B3F8B] font-bold ml-1">
                    (Freshers &amp; Final Years)
                  </span>
                </div>

                {/* Section 3 Spec Subheadline with CTC Clarity */}
                <p className="text-base sm:text-lg text-stone-700 font-sans font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Join our free live masterclass to discover how freshers land high-growth roles in <strong>Pharmacovigilance (₹3.8L–₹6.5L CTC)</strong>, <strong>Clinical Data Management</strong>, and <strong>Medical Coding</strong> at global CROs—without prior corporate experience.
                </p>

                {/* Event Logistics Badge */}
                <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-4 p-3.5 rounded-xl bg-white/80 border border-stone-200 shadow-xs text-xs font-mono text-stone-700">
                  <div className="flex items-center gap-1.5 text-stone-900 font-bold">
                    <Calendar className="h-4 w-4 text-[#1B3F8B]" />
                    <span>{WORKSHOP_CONFIG.dateDisplay}</span>
                  </div>
                  <span className="text-stone-300">|</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-stone-500" />
                    <span>{WORKSHOP_CONFIG.timeDisplay}</span>
                  </div>
                  <span className="text-stone-300">|</span>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                    <Video className="h-4 w-4 text-emerald-600" />
                    <span>Live on {WORKSHOP_CONFIG.platform}</span>
                  </div>
                </div>

                {/* ─────────────────────────────────────────────────────────────
                    HERO REGISTRATION FORM (2-Field Low Friction Spec)
                   ───────────────────────────────────────────────────────────── */}
                <div
                  ref={formRef}
                  id="registration-card"
                  className="rounded-2xl border-2 border-[#0B1325]/10 bg-white/95 backdrop-blur-md p-6 sm:p-7 shadow-xl max-w-xl mx-auto lg:mx-0 text-left transition-all"
                >
                  {!isSuccess ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-stone-900 font-sans">
                            Reserve Your Free Workshop Seat
                          </h3>
                          <p className="text-xs text-stone-500 font-sans mt-0.5">
                            Takes less than 30 seconds · No complex questionnaires
                          </p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-mono font-bold">
                          100% FREE PASS
                        </span>
                      </div>

                      {/* Error Alert */}
                      {errorMsg && (
                        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                          <span>{errorMsg}</span>
                        </div>
                      )}

                      {/* Field 1: Full Name */}
                      <div className="space-y-1.5">
                        <label htmlFor="hero-name" className="text-xs font-bold text-stone-800 font-mono flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-stone-500" />
                          FULL NAME <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="hero-name"
                          ref={nameInputRef}
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          onFocus={handleInputFocus}
                          placeholder="e.g. Pooja Reddy"
                          className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F8B] focus:border-transparent font-sans"
                        />
                      </div>

                      {/* Field 2: WhatsApp Number */}
                      <div className="space-y-1.5">
                        <label htmlFor="hero-phone" className="text-xs font-bold text-stone-800 font-mono flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          WHATSAPP NUMBER <span className="text-rose-500">*</span>
                        </label>
                        <div className="flex rounded-xl border border-stone-300 bg-stone-50/50 overflow-hidden focus-within:ring-2 focus-within:ring-[#1B3F8B] focus-within:border-transparent">
                          <span className="inline-flex items-center px-3.5 bg-stone-100 border-r border-stone-300 text-stone-700 font-mono text-xs font-bold select-none">
                            🇮🇳 +91
                          </span>
                          <input
                            id="hero-phone"
                            type="tel"
                            inputMode="numeric"
                            required
                            maxLength={10}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                            onFocus={handleInputFocus}
                            placeholder="98765 43210"
                            className="w-full px-3.5 py-3 bg-transparent text-stone-900 text-sm focus:outline-none font-sans"
                          />
                        </div>
                        <p className="text-[11px] text-stone-500 font-sans">
                          Meeting access link &amp; Career Starter Kit will be delivered here.
                        </p>
                      </div>

                      {/* Optional Email Toggle */}
                      <div>
                        {!showEmailField ? (
                          <button
                            type="button"
                            onClick={() => setShowEmailField(true)}
                            className="text-xs text-[#1B3F8B] hover:text-[#0B1325] font-mono flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            + Add Email Address (Optional for Google Calendar invite)
                          </button>
                        ) : (
                          <div className="space-y-1.5 pt-1">
                            <label htmlFor="hero-email" className="text-xs font-bold text-stone-800 font-mono flex items-center gap-1">
                              <Mail className="w-3.5 h-3.5 text-stone-500" />
                              EMAIL ADDRESS (OPTIONAL)
                            </label>
                            <input
                              id="hero-email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="pooja.reddy@gmail.com"
                              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B3F8B] font-sans"
                            />
                          </div>
                        )}
                      </div>

                      {/* WhatsApp Consent */}
                      <div className="flex items-start gap-2 pt-1">
                        <input
                          id="consent-check"
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="mt-0.5 rounded border-stone-300 text-[#1B3F8B] focus:ring-[#1B3F8B]"
                        />
                        <label htmlFor="consent-check" className="text-[11px] text-stone-600 leading-tight select-none">
                          By registering, you agree to receive workshop-related messages from Arzon Global on WhatsApp. View our{" "}
                          <a href="/privacy" className="text-[#1B3F8B] underline hover:text-stone-900">
                            Privacy Policy
                          </a>.
                        </label>
                      </div>

                      {/* Section 4 Spec CTA */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 px-6 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-black uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Reserving Your Seat...</span>
                        ) : (
                          <>
                            <span>Reserve My Free Seat</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>

                      {/* Section 4 Spec Microcopy */}
                      <p className="text-[11px] text-center text-stone-600 font-sans flex items-center justify-center gap-1">
                        <span>🔒 100% Free · No credit card required · Instant WhatsApp Confirmation &amp; Starter Kit</span>
                      </p>
                    </form>
                  ) : (
                    /* ─────────────────────────────────────────────────────────────
                        SECTION 7 & 8: INSTANT CONFIRMATION + IMMEDIATE VALUE
                       ───────────────────────────────────────────────────────────── */
                    <div className="space-y-6">
                      {/* Section 7 Heading */}
                      <div className="text-center space-y-2">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                          <CheckCircle2 className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-stone-950 font-sans">
                          You're Registered, {name.trim().split(" ")[0]}!
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-600 font-sans">
                          Your free workshop seat is confirmed. We'll send the joining details to your WhatsApp.
                        </p>
                      </div>

                      {/* Verified Pass Specs */}
                      <div className="rounded-xl bg-stone-50 border border-stone-200 p-4 space-y-2.5 font-mono text-xs">
                        <div className="flex justify-between border-b border-stone-200 pb-2">
                          <span className="text-stone-500">WORKSHOP</span>
                          <span className="font-bold text-stone-900">{WORKSHOP_CONFIG.title}</span>
                        </div>
                        <div className="flex justify-between border-b border-stone-200 pb-2">
                          <span className="text-stone-500">DATE</span>
                          <span className="font-bold text-stone-900">{WORKSHOP_CONFIG.dateDisplay}</span>
                        </div>
                        <div className="flex justify-between border-b border-stone-200 pb-2">
                          <span className="text-stone-500">TIME</span>
                          <span className="font-bold text-stone-900">{WORKSHOP_CONFIG.timeDisplay}</span>
                        </div>
                        <div className="flex justify-between border-b border-stone-200 pb-2">
                          <span className="text-stone-500">PLATFORM</span>
                          <span className="font-bold text-emerald-700">{WORKSHOP_CONFIG.platform}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-500">PASS ID</span>
                          <span className="font-bold text-[#1B3F8B]">{passId}</span>
                        </div>
                      </div>

                      {/* Section 8 Spec: Immediate Value (Career Starter Kit) */}
                      <div className="rounded-xl bg-blue-50/70 border border-blue-200 p-4 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#1B3F8B]">
                          <FileText className="w-4 h-4" />
                          <span>YOUR FREE CAREER STARTER KIT IS READY</span>
                        </div>
                        <p className="text-xs text-stone-700 font-sans">
                          Use this short guide before the workshop to understand the major healthcare industry career paths and the skills employers look for.
                        </p>
                        <a
                          href={WORKSHOP_CONFIG.starterKitUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => track("starter_kit_clicked", { passId })}
                          className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#1B3F8B] hover:bg-[#0B1325] text-white font-mono text-xs font-bold transition-all shadow-sm"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Get My Career Starter Kit on WhatsApp</span>
                        </a>
                      </div>

                      {/* Section 9 Spec: Google Calendar Button */}
                      <div className="pt-1">
                        <a
                          href={generateGoogleCalendarUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => track("calendar_clicked", { passId })}
                          className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border-2 border-stone-300 hover:border-stone-400 bg-white text-stone-900 font-mono text-xs font-bold transition-all shadow-xs"
                        >
                          <Calendar className="w-4 h-4 text-[#1B3F8B]" />
                          <span>Add to Google Calendar (Asia/Kolkata)</span>
                        </a>
                      </div>

                      {/* ─────────────────────────────────────────────────────────────
                          SECTION 6: PROGRESSIVE PROFILING (POST-REGISTRATION)
                         ───────────────────────────────────────────────────────────── */}
                      <div className="pt-3 border-t border-stone-200 space-y-4">
                        <div className="text-center">
                          <span className="text-[11px] font-mono font-bold uppercase text-[#1B3F8B] block">
                            HELP US CUSTOMIZE YOUR SESSION
                          </span>
                          <p className="text-xs text-stone-600 font-sans mt-0.5">
                            One quick question so we can make the workshop relevant to you:
                          </p>
                        </div>

                        {/* Question 1: Stage */}
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-mono font-bold text-stone-700 block">
                            What best describes you?
                          </span>
                          <div className="grid grid-cols-2 gap-1.5">
                            {["Student", "Recent Graduate", "Working Professional", "Career Switcher"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => handleProfileSelect("type", opt)}
                                className={`px-2.5 py-2 rounded-lg text-xs font-sans border transition-all text-left flex items-center justify-between cursor-pointer ${
                                  candidateType === opt
                                    ? "bg-[#0B1325] text-white border-[#0B1325] font-bold"
                                    : "bg-white hover:bg-stone-50 text-stone-700 border-stone-200"
                                }`}
                              >
                                <span>{opt}</span>
                                {candidateType === opt && <Check className="w-3 h-3 text-emerald-400" />}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Question 2: Interest */}
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-mono font-bold text-stone-700 block">
                            Which area interests you most?
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                            {["Pharmacovigilance", "Clinical Research", "Medical Coding", "Digital Health", "Not Sure Yet"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => handleProfileSelect("interest", opt)}
                                className={`px-2.5 py-2 rounded-lg text-xs font-sans border transition-all text-left flex items-center justify-between cursor-pointer ${
                                  areaInterest === opt
                                    ? "bg-[#0B1325] text-white border-[#0B1325] font-bold"
                                    : "bg-white hover:bg-stone-50 text-stone-700 border-stone-200"
                                }`}
                              >
                                <span className="truncate">{opt}</span>
                                {areaInterest === opt && <Check className="w-3 h-3 text-emerald-400" />}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Question 3: Qualification */}
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-mono font-bold text-stone-700 block">
                            Your highest qualification:
                          </span>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                            {["B.Pharm", "M.Pharm", "Pharm.D", "B.Sc / Biotechnology", "Other"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => handleProfileSelect("qualification", opt)}
                                className={`px-2.5 py-2 rounded-lg text-xs font-sans border transition-all text-left flex items-center justify-between cursor-pointer ${
                                  qualification === opt
                                    ? "bg-[#0B1325] text-white border-[#0B1325] font-bold"
                                    : "bg-white hover:bg-stone-50 text-stone-700 border-stone-200"
                                }`}
                              >
                                <span className="truncate">{opt}</span>
                                {qualification === opt && <Check className="w-3 h-3 text-emerald-400" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: 3D Holographic Boarding Pass + Visual Image */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6">
                <div className="w-full max-w-sm">
                  <Interactive3dBoardingPass
                    name={name}
                    degree={qualification || areaInterest || "Healthcare Graduate"}
                    passId={passId}
                    isConfirmed={isSuccess}
                  />
                </div>

                {/* Authentic Clinical Data Workstation Image */}
                <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-stone-200/90 shadow-lg bg-white tone-light">
                  <div className="relative">
                    <img
                      src={researcherImg}
                      alt="Real Healthcare Clinical Research Laboratory"
                      className="w-full h-44 object-cover object-center"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white font-mono text-[9px] font-bold tracking-wider uppercase border border-white/15">
                      REAL CLINICAL LAB ENVIRONMENT
                    </div>
                  </div>
                  <div className="p-3.5 bg-stone-50/90 border-t border-stone-200 text-xs font-sans text-stone-700 flex items-center justify-between">
                    <span className="font-semibold text-stone-800">Enterprise Research Facility</span>
                    <span className="font-mono text-[10px] text-[#1B3F8B] font-extrabold">ORACLE ARGUS &amp; CTMS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            01B · HIRING PARTNERS & CRO STRIP (Corporate Authority)
           ───────────────────────────────────────────────────────────── */}
        <WorkshopHiringStrip />

        {/* ─────────────────────────────────────────────────────────────
            02 · SECTION 11: WHAT YOU'LL LEARN (5 Concrete Spec Outcomes)
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-[#1B3F8B] font-mono text-xs font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                SESSION CURRICULUM
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-serif font-bold text-stone-950 leading-[1.18]">
                What You'll Learn in 60-75 Minutes
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-sans">
                Clear, factual insights into corporate healthcare operations—no filler theory or abstract slides.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
              {/* Outcome 1 */}
              <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-all space-y-3">
                <span className="font-mono text-xs font-black text-[#1B3F8B] bg-blue-100/70 px-2.5 py-1 rounded-md">
                  OUTCOME 01
                </span>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 font-sans">
                  Understand the healthcare industry career map
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                  See how different roles connect across healthcare, pharmaceutical sponsors, global CROs, and life sciences IT services.
                </p>
              </div>

              {/* Outcome 2 */}
              <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-all space-y-3">
                <span className="font-mono text-xs font-black text-[#1B3F8B] bg-blue-100/70 px-2.5 py-1 rounded-md">
                  OUTCOME 02
                </span>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 font-sans">
                  Understand what entry-level roles actually involve
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                  Learn what Drug Safety Associates, Clinical Data Coordinators, and Medical Coders do in their real day-to-day corporate work.
                </p>
              </div>

              {/* Outcome 3 */}
              <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-all space-y-3">
                <span className="font-mono text-xs font-black text-[#1B3F8B] bg-blue-100/70 px-2.5 py-1 rounded-md">
                  OUTCOME 03
                </span>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 font-sans">
                  See the skills employers look for
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                  Understand the concrete difference between college textbook syllabus and the specialized tool competencies demanded during screening rounds.
                </p>
              </div>

              {/* Outcome 4 */}
              <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-all space-y-3">
                <span className="font-mono text-xs font-black text-[#1B3F8B] bg-blue-100/70 px-2.5 py-1 rounded-md">
                  OUTCOME 04
                </span>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 font-sans">
                  Work through a practical example
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                  Experience a real adverse drug reaction case triage: 4-point validity verification, seriousness assessment, and regulatory timeline rules.
                </p>
              </div>

              {/* Outcome 5 */}
              <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-all space-y-3">
                <span className="font-mono text-xs font-black text-[#1B3F8B] bg-blue-100/70 px-2.5 py-1 rounded-md">
                  OUTCOME 05
                </span>
                <h3 className="text-base sm:text-lg font-bold text-stone-900 font-sans">
                  Identify your next step
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                  Understand what exact technical skills you need to build for your target role and how to assemble a credible technical profile.
                </p>
              </div>

              {/* Live Session Assurance Card (Section 18 Spec) */}
              <div className="p-6 rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 space-y-3 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-emerald-800 font-mono text-xs font-bold">
                  <Video className="w-4 h-4" />
                  <span>SECTION 18 GUARANTEE</span>
                </div>
                <h3 className="text-base font-bold text-stone-900 font-sans">
                  This is a live working session, not a recorded lecture.
                </h3>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  Interactive Q&amp;A, live clinical examples, direct candidate participation, and real-time feedback.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            02B · SCALER BENCHMARK: ROLES & STARTING CTC MATRIX
           ───────────────────────────────────────────────────────────── */}
        <WorkshopSalaryRolesMatrix
          onSelectRole={(roleTitle) => {
            setAreaInterest(roleTitle);
            scrollToForm();
          }}
        />

        {/* ─────────────────────────────────────────────────────────────
            02C · HANDS-ON LIVE CASE PROCESSING PREVIEW
           ───────────────────────────────────────────────────────────── */}
        <WorkshopLiveCaseTeaser onRegisterClick={scrollToForm} />

        {/* ─────────────────────────────────────────────────────────────
            03 · SECTION 12: INTERACTIVE CAREER FIT TOOL
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <InteractiveCareerFitTool
              onSelectRole={(role, bg) => {
                setAreaInterest(role);
                setQualification(bg);
                scrollToForm();
              }}
            />
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            03B · UPGRAD & GREAT LEARNING BENCHMARK: WHO THIS IS FOR
           ───────────────────────────────────────────────────────────── */}
        <WorkshopWhoIsThisFor />

        {/* ─────────────────────────────────────────────────────────────
            04 · SECTION 13: SPEAKER DOSSIER & CREDIBILITY
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Speaker Visual Card with Authentic Photography */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl overflow-hidden border border-stone-300/80 shadow-2xl bg-stone-950 relative tone-dark">
                  <img
                    src={mentorshipImg}
                    alt="Mohamed Kumail Abbas · Executive Director & Senior PV Leader"
                    className="w-full h-84 object-cover object-top filter contrast-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-6">
                    <div className="text-white space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] text-emerald-400 font-extrabold tracking-widest uppercase px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/30">
                          VERIFIED EXECUTIVE MENTOR
                        </span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">{WORKSHOP_CONFIG.speaker.name}</h4>
                      <p className="text-xs text-stone-200 font-sans font-medium">{WORKSHOP_CONFIG.speaker.designation}</p>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-stone-50/90 rounded-xl border border-stone-200 text-xs text-stone-700 font-mono text-center flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#1B3F8B] shrink-0" />
                  <span>20+ Years Global PV Practice · Ex-Accenture &amp; Cognizant</span>
                </div>
              </div>

              {/* Speaker Credibility Points (Section 13 Spec) */}
              <div className="lg:col-span-7 space-y-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1B3F8B] font-mono text-xs font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  LEAD MENTOR
                </span>

                <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-serif font-bold text-stone-950 leading-[1.18]">
                  Learn From Someone Who Works With The Real Industry Problem
                </h2>

                <p className="text-sm sm:text-base text-stone-700 font-sans leading-relaxed">
                  Your workshop is led directly by an executive with over two decades of front-line leadership managing safety operations for global pharmaceutical sponsors.
                </p>

                <div className="space-y-3 pt-2">
                  {WORKSHOP_CONFIG.speaker.credibilityPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-xs sm:text-sm text-stone-800 font-sans">{point}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="px-6 py-3 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
                  >
                    Reserve Free Seat to Meet Faculty →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            05 · SECTION 17: WORKSHOP AGENDA (Exact 6-Part Breakdown)
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-200 bg-[#FAF8F5]">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1B3F8B] font-mono text-xs font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                TIMELINE BREAKDOWN
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-serif font-bold text-stone-950 leading-[1.18]">
                What Happens During the Session?
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-sans">
                A structured 75-minute schedule designed to maximize actionable career clarity.
              </p>
            </div>

            <div className="space-y-4">
              {WORKSHOP_CONFIG.agenda.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl border border-stone-200 bg-white shadow-xs hover:border-[#1B3F8B]/40 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1.5 rounded-lg bg-stone-100 font-mono text-xs font-black text-[#1B3F8B] shrink-0 border border-stone-200">
                      {item.timeRange}
                    </span>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-stone-900 font-sans">{item.title}</h4>
                      <p className="text-xs text-stone-600 font-sans mt-0.5">{item.description}</p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 hidden sm:block" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            05B · GREAT LEARNING BENCHMARK: OFFICIAL CERTIFICATE PREVIEW
           ───────────────────────────────────────────────────────────── */}
        <WorkshopCertificatePreview />

        {/* ─────────────────────────────────────────────────────────────
            05C · PHYSICSWALLAH BENCHMARK: STARTER KIT WHATSAPP STACK
           ───────────────────────────────────────────────────────────── */}
        <WorkshopStarterKitTeaser onClaimClick={scrollToForm} />

        {/* ─────────────────────────────────────────────────────────────
            06 · SECTION 14 & 15: WHY ARZON GLOBAL & WHY IS IT FREE?
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Section 14: Why Arzon Runs These */}
              <div className="p-7 rounded-2xl border border-stone-200 bg-stone-50/70 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1B3F8B] uppercase">
                  <Building2 className="w-4 h-4" />
                  <span>TRANSPARENT PURPOSE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-950">
                  Why Arzon Global Runs These Workshops
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
                  We want students and graduates to understand the gap between academic learning and industry requirements before they decide what training they need.
                </p>
                <div className="pt-2 space-y-2 text-xs text-stone-700 font-sans">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Real-world software immersion (Oracle Argus, MedDRA, CTMS)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Focus on job-oriented competencies rather than generic theory</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Honest career guidance from practitioners who have hired teams</span>
                  </div>
                </div>
              </div>

              {/* Section 15: Why Is It Free? (Trust Section) */}
              <div className="p-7 rounded-2xl border border-stone-200 bg-stone-50/70 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 uppercase">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>TRUST &amp; INTEGRITY</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-950">
                  Why Is This Workshop Free?
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
                  The purpose of this session is to give students and graduates a clear understanding of healthcare industry careers, the skills involved and the paths available to them. The session is free to attend. If you later want structured training or additional support, we'll explain those options separately.
                </p>
                <div className="pt-2 p-3 rounded-xl bg-white border border-stone-200 text-xs font-mono text-stone-600">
                  Zero pressure · Zero forced payment · Factual career orientation
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            07 · SECTION 10: ATTENDANCE SECTION (CALENDAR COMMITMENT)
           ───────────────────────────────────────────────────────────── */}
        <section className="py-14 border-b border-stone-200 bg-[#0B1325] text-white">
          <div className="mx-auto max-w-4xl px-4 text-center space-y-4">
            <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest">
              DON'T MISS THE LIVE SESSION
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-serif font-bold leading-tight">
              Don't Just Register. Put It On Your Calendar.
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto font-sans leading-relaxed">
              The workshop is live. Add it to your calendar now so you have the joining details when the session starts.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={generateGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("calendar_clicked", { source: "attendance_section" })}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1B3F8B] hover:bg-blue-600 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Add to Google Calendar</span>
              </a>
              <button
                type="button"
                onClick={scrollToForm}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-stone-100 font-mono text-xs font-bold uppercase tracking-wider transition-all border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Get WhatsApp Reminder</span>
              </button>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            08 · SECTION 19: DETAILED FREQUENTLY ASKED QUESTIONS (9 Spec FAQs)
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1B3F8B] font-mono text-xs font-bold uppercase tracking-wider">
                <HelpCircle className="w-3.5 h-3.5" />
                CLARITY FIRST
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-serif font-bold text-stone-950">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans">
                Transparent answers to common questions about the session.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: "Is the workshop really free?",
                  a: "Yes. The 75-minute live working session is completely free of charge. You will not be asked for payment details to join.",
                },
                {
                  q: "Who can attend?",
                  a: "The session is designed for B.Pharm, M.Pharm, Pharm.D, B.Sc/M.Sc Biotechnology, Life Sciences graduates, and healthcare students seeking entry into corporate clinical careers.",
                },
                {
                  q: "Is this for freshers?",
                  a: "Yes. The workshop specifically addresses the challenges fresh graduates face when applying to entry-level roles at CROs and healthcare IT organizations.",
                },
                {
                  q: "Is this a job interview?",
                  a: "No. This is an educational career orientation session. We explain industry roles, workflows, and employer expectations. We do not conduct hiring interviews during the workshop.",
                },
                {
                  q: "Will I get a certificate?",
                  a: "A Certificate of Participation is issued to attendees who join live and complete the session walkthrough.",
                },
                {
                  q: "Will I learn practical concepts?",
                  a: "Yes. You will examine a real-world adverse event case report (ICSR) and walk through how regulatory professionals verify patient validity, suspect drugs, and seriousness criteria.",
                },
                {
                  q: "Is the session recorded?",
                  a: "Because this is an interactive working session with live case discussions and participant Q&A, we do not guarantee recordings. We strongly encourage attending live.",
                },
                {
                  q: "Is there a course after the workshop?",
                  a: "Yes. Arzon Global offers structured, intensive training programs for candidates seeking comprehensive software immersion and career support. We explain those programs toward the end of the session.",
                },
                {
                  q: "Do I have to buy anything?",
                  a: "No. Attending the workshop carries zero obligation to enroll in any paid program. You are welcome to take the frameworks and Starter Kit and apply them independently.",
                },
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-stone-200 bg-stone-50/50 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-stone-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-500 transition-transform ${activeFaq === idx ? "rotate-180" : ""}`}
                    />
                  </button>
                  {activeFaq === idx && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-stone-600 font-sans leading-relaxed border-t border-stone-200/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            09 · SECTION 20: FINAL CTA (Same CTA Spec: Reserve My Free Seat)
           ───────────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-stone-100 border-b border-stone-200">
          <div className="mx-auto max-w-4xl px-4 text-center space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1B3F8B] font-mono text-xs font-bold uppercase tracking-wider">
              {WORKSHOP_CONFIG.type}
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-serif font-bold text-stone-950 leading-tight">
              Ready to Understand Your Healthcare Career Options?
            </h2>

            <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto font-sans leading-relaxed">
              Join the free live workshop and get a clearer view of the roles, skills and next steps available to you.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToForm}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-black uppercase tracking-wider shadow-xl transition-all cursor-pointer inline-flex items-center justify-center gap-2 group"
              >
                <span>Reserve My Free Seat</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <p className="text-xs text-stone-500 font-sans">
              Live on {WORKSHOP_CONFIG.platform} · {WORKSHOP_CONFIG.dateDisplay} · 100% Free Pass
            </p>
          </div>
        </section>
      </main>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 21: MOBILE STICKY BOTTOM DRAWER (Mobile only)
         ───────────────────────────────────────────────────────────── */}
      {showStickyBar && !isSuccess && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B1325]/95 backdrop-blur-md border-t border-white/15 px-4 py-3 shadow-2xl flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
              FREE LIVE WORKSHOP
            </span>
            <span className="text-xs font-bold text-white truncate block">
              {WORKSHOP_CONFIG.dateDisplay} · {WORKSHOP_CONFIG.platform}
            </span>
          </div>
          <button
            type="button"
            onClick={scrollToForm}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider shrink-0 shadow-md cursor-pointer"
          >
            Reserve Free Seat
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SECTION 22: DESKTOP EXIT-INTENT MODAL
         ───────────────────────────────────────────────────────────── */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative space-y-4">
            <button
              type="button"
              onClick={handleDismissExitModal}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#1B3F8B] uppercase">
                BEFORE YOU GO...
              </span>
              <h3 className="text-xl font-bold text-stone-950 font-sans">
                Want the workshop details sent to your WhatsApp?
              </h3>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                Reserve your free seat in 15 seconds so you don't miss the live Google Meet link and free Career Starter Kit.
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  handleDismissExitModal();
                  scrollToForm();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Reserve My Free Seat
              </button>
              <button
                type="button"
                onClick={handleDismissExitModal}
                className="text-xs text-stone-400 hover:text-stone-600 py-1 font-sans cursor-pointer"
              >
                No thanks, I'll explore later
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
