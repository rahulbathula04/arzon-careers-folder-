import { useState, useRef, useEffect, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import mentorKumailImg from "@/assets/mentor-kumail.jpg";
import {
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Check,
  Phone,
  Mail,
  Video,
  FileText,
  AlertCircle,
  Briefcase,
  ChevronDown,
  Activity,
  Terminal,
  FileCheck,
  Award,
  Sparkles,
  ExternalLink,
  HelpCircle,
  X,
  Send,
  User,
} from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { pageSeo } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonLd";
import { submitWorkshopLead } from "@/lib/workshop.functions";
import { track } from "@/lib/track";
import { WORKSHOP_CONFIG, buildGoogleCalendarUrl } from "@/data/workshopConfig";
import { z } from "zod";

const searchSchema = z.object({
  v: z.enum(["a", "b"]).optional().default("a"),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  utm_term: z.string().optional(),
});

export const Route = createFileRoute("/healthcare-career-workshop")({
  validateSearch: (search: Record<string, unknown>) => searchSchema.parse(search),
  head: () => {
    const title = "Free Pharmacovigilance Career Workshop | Arzon Global";
    const description =
      "Join Arzon Global's free live Pharmacovigilance career workshop. Explore real PV case processing, employer expectations, career paths and entry-level healthcare roles.";

    return {
      title,
      meta: pageSeo({
        title,
        description,
        path: "/healthcare-career-workshop",
        structuredData: [
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Healthcare Career Workshop", path: "/healthcare-career-workshop" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "EducationEvent",
            name: "Free Live Pharmacovigilance & Healthcare Career Workshop",
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
          },
        ],
      }),
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
  const [showEmailField, setShowEmailField] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Field Completion & Focus Tracking (prevents Android keyboard fight with sticky bottom bar)
  const [trackedFields, setTrackedFields] = useState<Set<string>>(new Set());
  const [isInputFocused, setIsInputFocused] = useState(false);
  const registrationStartTracked = useRef(false);

  // FAQ Accordion State
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Sticky Mobile Bottom Bar Visibility
  const [isFormInView, setIsFormInView] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const caseRef = useRef<HTMLDivElement>(null);
  const mentorRef = useRef<HTMLDivElement>(null);

  // Smooth scroll helper
  const scrollToForm = () => {
    track("hero_cta_click", {
      props: {
        variant: isVariantB ? "b" : "a",
        source: "cta_button",
      },
    });
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      const firstInput = formRef.current.querySelector("input");
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 400);
      }
    }
  };

  // 1. Initial Page View Tracking
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

  // 2. Scroll Depth Tracking & Form Visibility Observer
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

    // Intersection observer for sticky mobile CTA and section view tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === formRef.current) {
            setIsFormInView(entry.isIntersecting);
          }
          if (entry.isIntersecting) {
            if (entry.target === caseRef.current) {
              track("case_section_view", { props: { variant: isVariantB ? "b" : "a" } });
            } else if (entry.target === mentorRef.current) {
              track("mentor_section_view", { props: { variant: isVariantB ? "b" : "a" } });
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    if (formRef.current) observer.observe(formRef.current);
    if (caseRef.current) observer.observe(caseRef.current);
    if (mentorRef.current) observer.observe(mentorRef.current);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [isVariantB]);

  // Handle Input Focus (tracks start once, hides sticky bottom CTA when keyboard opens)
  const handleInputFocus = () => {
    setIsInputFocused(true);
    if (!registrationStartTracked.current) {
      registrationStartTracked.current = true;
      track("registration_start", { props: { variant: isVariantB ? "b" : "a" } });
    }
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  // Handle Field Completion Tracking (ZERO PII: field name only)
  const markFieldCompleted = (fieldName: string) => {
    if (!trackedFields.has(fieldName)) {
      setTrackedFields((prev) => new Set(prev).add(fieldName));
      track("registration_field_completed", {
        props: { field: fieldName, variant: isVariantB ? "b" : "a" },
      });
    }
  };

  // Handle Registration Submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setErrorMsg(null);

    // Validation
    const cleanName = name.trim();
    const cleanPhone = phone.trim().replace(/\D/g, "");

    if (cleanName.length < 2) {
      setErrorMsg("Please enter your full name.");
      return;
    }

    if (cleanPhone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit WhatsApp number.");
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
          email: email.trim() || undefined,
          source: "workshop-landing-page",
          utmSource: search.utm_source ?? undefined,
          utmMedium: search.utm_medium ?? undefined,
          utmCampaign: search.utm_campaign ?? undefined,
          utmContent: search.utm_content ?? undefined,
          utmTerm: search.utm_term ?? undefined,
          variant: isVariantB ? "b" : "a",
        },
      });

      setIsSuccess(true);
      track("registration_success", {
        props: {
          variant: isVariantB ? "b" : "a",
          degree,
        },
      });
    } catch (err: unknown) {
      console.error("[Workshop Registration Error]", err);
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("Already registered") || msg.includes("already registered")) {
        setErrorMsg("You are already registered for this workshop. Session details will be sent via WhatsApp.");
      } else {
        setErrorMsg("Something went wrong. Your details are preserved. Please tap submit again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-[#1B3F8B]/15 selection:text-[#0B1325]">
      {/* ─────────────────────────────────────────────────────────────
          00 · MINIMAL FOCUSED NAVIGATION
         ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 h-16 bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl h-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="font-serif font-black text-xl tracking-wider text-[#0B1325] uppercase">
                ARZON
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-stone-600">
              <a href="#real-case" className="hover:text-[#1B3F8B] transition-colors">
                Real Case
              </a>
              <a href="#job-intelligence" className="hover:text-[#1B3F8B] transition-colors">
                What Employers Ask
              </a>
              <a href="#mentor" className="hover:text-[#1B3F8B] transition-colors">
                Mentor
              </a>
              <a href="#faq" className="hover:text-[#1B3F8B] transition-colors">
                FAQ
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-stone-600 bg-stone-100/90 border border-stone-200 px-3 py-1.5 rounded-full">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Sunday, 6 Sept · 6:00 PM IST</span>
            </div>
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex h-9 items-center justify-center rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] px-4 text-xs font-bold text-white transition-all shadow-xs cursor-pointer"
            >
              Reserve Free Seat
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* ─────────────────────────────────────────────────────────────
            01 · HERO SECTION: PROBLEM + PROMISE + EVENT + MENTOR + CTA
           ───────────────────────────────────────────────────────────── */}
        <section className="relative border-b border-stone-200/90 pt-10 sm:pt-14 pb-14 sm:pb-18 overflow-hidden bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Problem, Event Context & Action */}
              <div className="lg:col-span-7 space-y-6 text-left">
                {/* Clean Eyebrow Badge */}
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-200/90 text-stone-800 font-mono text-[11px] font-bold tracking-wider uppercase">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    FREE LIVE WORKSHOP
                  </span>
                  <span className="font-mono text-xs text-stone-500">
                    75 Minutes · Live on Google Meet
                  </span>
                </div>

                {/* Primary Headline (Dynamic Version A / Version B) */}
                <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-serif font-bold tracking-tight text-stone-950 leading-[1.15]">
                  {isVariantB ? (
                    <>
                      What does a Pharmacovigilance Associate{" "}
                      <span className="text-[#1B3F8B]">actually do?</span>
                    </>
                  ) : (
                    <>
                      You finished your healthcare degree.{" "}
                      <span className="text-[#1B3F8B]">Now what?</span>
                    </>
                  )}
                </h1>

                {/* Subheadline: Clear, value-first, relatable */}
                <p className="text-base sm:text-lg text-stone-700 font-sans leading-relaxed max-w-2xl">
                  Explore what Pharmacovigilance and Clinical Data employers actually expect from freshers before you spend money on another course or send another unanswered application.
                </p>

                {/* Event Logistics Metadata Strip */}
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-stone-700 bg-stone-50 border border-stone-200 p-3 rounded-xl">
                  <div className="flex items-center gap-1.5 text-stone-900 font-bold">
                    <Calendar className="w-4 h-4 text-[#1B3F8B]" />
                    <span>Sunday · 6 September 2026</span>
                  </div>
                  <span className="text-stone-300">·</span>
                  <div className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-4 h-4 text-stone-500" />
                    <span>6:00 PM IST</span>
                  </div>
                  <span className="text-stone-300">·</span>
                  <div className="flex items-center gap-1.5 font-medium text-emerald-800">
                    <Video className="w-4 h-4 text-emerald-600" />
                    <span>Live on Google Meet</span>
                  </div>
                </div>

                {/* Action CTA + Microcopy */}
                <div className="pt-2 space-y-3">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      type="button"
                      onClick={scrollToForm}
                      className="px-7 py-3.5 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-sm font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Reserve My Free Seat →</span>
                    </button>
                    <a
                      href="#real-case"
                      className="px-5 py-3 rounded-xl border border-stone-300 hover:border-stone-400 bg-white text-stone-800 font-mono text-xs font-semibold transition-all text-center"
                    >
                      See The Real Case ↓
                    </a>
                  </div>
                  <p className="text-xs text-stone-500 font-sans">
                    Free live working session · No prior PV experience required · No payment details
                  </p>
                </div>
              </div>

              {/* Right Column: Authentic Human Mentor Presentation */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white shadow-lg overflow-hidden">
                  <div className="p-4 bg-stone-50 border-b border-stone-200 text-left flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-stone-500 font-bold uppercase tracking-wider block">
                        SESSION FACULTY
                      </span>
                      <span className="font-serif font-bold text-stone-900 text-sm">
                        Mohamed Kumail Abbas
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#1B3F8B] font-mono text-[10px] font-bold">
                      M.Pharm
                    </span>
                  </div>

                  <div className="relative bg-stone-100 overflow-hidden flex items-center justify-center p-3">
                    <img
                      src={mentorKumailImg}
                      alt="Mohamed Kumail Abbas - Manager, Pharmacovigilance"
                      className="w-full h-auto object-contain rounded-xl shadow-xs"
                    />
                  </div>

                  <div className="p-4 text-left space-y-2.5 bg-white">
                    <div>
                      <p className="font-bold text-stone-900 text-sm font-sans">
                        Manager, Pharmacovigilance
                      </p>
                      <p className="text-xs text-stone-600 font-sans">
                        Global CRO &amp; Pharmaceutical Safety Operations
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-100 text-[11px] font-mono text-stone-500 flex items-center justify-between">
                      <span>Career across Quintiles, Accenture, Cognizant, Novaspire</span>
                      <a href="#mentor" className="text-[#1B3F8B] font-semibold hover:underline">
                        View full career journey →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            02 · THE SIMULATED PV CASE (EDUCATIONAL TRAINING EXERCISE)
           ───────────────────────────────────────────────────────────── */}
        <section id="real-case" ref={caseRef} className="py-14 sm:py-20 border-b border-stone-200 bg-stone-50/60">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-[#1B3F8B] font-mono text-xs font-bold uppercase tracking-wider border border-blue-200/80">
                <FileText className="w-3.5 h-3.5" />
                SIMULATED CASE STUDY
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-serif font-bold text-stone-900 leading-[1.18]">
                What does a real PV case actually look like?
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
                In the live session, you won't sit through abstract theory slides. Mohamed Kumail Abbas will walk through a representative simulated training case to show the forensic triage steps corporate safety teams perform when an adverse drug reaction is reported.
              </p>
            </div>

            {/* Representative Training Document Visual · Clinical Dossier Style */}
            <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-xl max-w-4xl mx-auto text-left">
              {/* Document Educational Compliance Banner */}
              <div className="px-5 py-2.5 bg-amber-50 border-b border-amber-200/80 text-[11px] font-mono text-amber-900 flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-700" />
                <span>SIMULATED TRAINING CASE · FOR EDUCATIONAL DEMONSTRATION · Modeled after standard CIOMS-I / MedDRA reporting structures</span>
              </div>

              {/* Document Header Bar */}
              <div className="px-6 py-4 bg-stone-50/90 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="space-y-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <FileText className="w-4 h-4 text-[#1B3F8B]" />
                    <span className="font-bold text-stone-900 tracking-wide font-mono">
                      INDIVIDUAL CASE SAFETY REPORT (ICSR)
                    </span>
                    <span className="text-[10px] text-amber-800 font-bold bg-amber-100/90 px-2 py-0.5 rounded border border-amber-300/80 font-mono">
                      Training ID: SIM-PV-METFORMIN-01
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-500 font-sans">
                    Educational mock safety report · Modeled on standard CIOMS-I structure
                  </div>
                </div>
                <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-300 font-mono">
                  ICH-E2D TRAINING FORMAT
                </span>
              </div>

              {/* Working Document Body */}
              <div className="p-6 sm:p-8 space-y-6 font-mono text-xs sm:text-sm bg-white">
                {/* Intake Information */}
                <div className="p-4.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                  <div className="text-[10px] text-stone-500 uppercase tracking-wider font-bold font-mono">
                    Primary Suspect Drug &amp; Reported Reaction
                  </div>
                  <div className="text-stone-900 text-base font-bold font-sans">
                    Metformin ER 500 mg · Daily Oral Administration
                  </div>
                  <div className="text-rose-700 text-xs sm:text-sm font-sans font-semibold">
                    Reported Event: Acute Lactic Acidosis with Renal Distress
                  </div>
                </div>

                {/* The 4 Validity Criteria Check */}
                <div className="space-y-3 border-t border-stone-200 pt-5">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-900 font-bold text-xs uppercase tracking-wider font-mono">
                        The 4 Mandatory Validity Criteria Check (ICH-E2D)
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono">
                        4 / 4 SATISFIED
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 font-sans">
                      The four key elements used to establish a valid individual case safety report.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-stone-50/70 border border-stone-200 flex items-start gap-2.5 text-stone-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-stone-900 block font-sans">01 · Identifiable Patient</span>
                        <span className="text-stone-500 text-[11px] font-sans">Female, 48 Years (Hospital Inpatient, India)</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-stone-50/70 border border-stone-200 flex items-start gap-2.5 text-stone-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-stone-900 block font-sans">02 · Identifiable Reporter</span>
                        <span className="text-stone-500 text-[11px] font-sans">Hospital Clinical Pharmacist &amp; Attending Physician</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-stone-50/70 border border-stone-200 flex items-start gap-2.5 text-stone-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-stone-900 block font-sans">03 · Suspect Product</span>
                        <span className="text-stone-500 text-[11px] font-sans">Metformin Hydrochloride Extended-Release 500mg</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-stone-50/70 border border-stone-200 flex items-start gap-2.5 text-stone-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-stone-900 block font-sans">04 · Adverse Event</span>
                        <span className="text-stone-500 text-[11px] font-sans">Severe Metabolic Acidosis with Elevated Serum Lactate</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Seriousness & Regulatory Clock */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-stone-200 pt-5">
                  <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80 space-y-1">
                    <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider block font-mono">
                      Seriousness Determination
                    </span>
                    <span className="text-stone-900 font-bold text-xs sm:text-sm block font-sans">
                      SERIOUS · Inpatient Hospitalization
                    </span>
                    <span className="text-stone-600 text-[11px] block font-sans">
                      Criteria defined by health authorities (death, hospitalization, disability) that trigger faster reporting.
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200/80 space-y-1">
                    <span className="text-[10px] text-rose-800 font-bold uppercase tracking-wider block font-mono">
                      Regulatory Clock Evaluation
                    </span>
                    <span className="text-stone-900 font-bold text-xs sm:text-sm block font-sans">
                      Serious case → expedited reporting may apply
                    </span>
                    <span className="text-stone-600 text-[11px] block font-sans">
                      The session explains how safety teams evaluate seriousness criteria and determine the applicable regulatory timeline.
                    </span>
                  </div>
                </div>

                {/* Workflow Pipeline Progression */}
                <div className="border-t border-stone-200 pt-5 space-y-2">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-mono font-bold">
                      Case Lifecycle Progression
                    </span>
                    <p className="text-[11px] text-stone-500 font-sans mt-0.5">
                      How colloquial patient phrases convert into standardized international regulatory terms and move through safety review.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-200 text-stone-700 font-medium">01 Case Intake</span>
                    <span className="text-stone-400">→</span>
                    <span className="px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-200 text-stone-700 font-medium">02 Medical Review</span>
                    <span className="text-stone-400">→</span>
                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-[#1B3F8B] font-bold">03 MedDRA Coding</span>
                    <span className="text-stone-400">→</span>
                    <span className="px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-200 text-stone-700 font-medium">04 Narrative</span>
                    <span className="text-stone-400">→</span>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">05 Regulatory Submission</span>
                  </div>
                </div>
              </div>

              {/* Case Callout Bar */}
              <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <p className="text-stone-600 font-sans">
                  In the live working session, Mohamed Kumail Abbas will walk through the causality narrative and coding decisions behind this simulated case.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    track("case_cta_click", {
                      props: { variant: isVariantB ? "b" : "a", location: "case_callout_bar" },
                    });
                    scrollToForm();
                  }}
                  className="w-full sm:w-auto shrink-0 px-5 py-2.5 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono font-bold transition-all cursor-pointer shadow-xs"
                >
                  Join Case Walkthrough →
                </button>
              </div>
            </div>

            {/* Conversion Bridge Immediately Below Case Section */}
            <div className="mt-8 text-center pt-2">
              <p className="text-stone-600 text-xs sm:text-sm font-sans mb-3">
                Want to see how the rest of this case is triaged live?
              </p>
              <button
                type="button"
                onClick={() => {
                  track("case_cta_click", {
                    props: { variant: isVariantB ? "b" : "a", location: "case_conversion_bridge" },
                  });
                  scrollToForm();
                }}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                Reserve Your Free Seat →
              </button>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            03 · EMPLOYER REQUIREMENTS ANALYSIS (CORE COMPETENCIES)
           ───────────────────────────────────────────────────────────── */}
        <section id="job-intelligence" className="py-14 sm:py-18 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-left max-w-3xl space-y-2">
              <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                EMPLOYER REQUIREMENTS ANALYSIS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-serif font-bold text-stone-900 leading-tight">
                We looked at the jobs. Here's what keeps appearing.
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-sans">
                A structured synthesis of baseline entry-level Pharmacovigilance competency expectations across major Indian clinical research hubs (Hyderabad, Bengaluru, Pune).
              </p>
            </div>

            {/* Standard Competency Profiles Container */}
            <div className="space-y-4">
              <div className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider">
                CORE ENTRY-LEVEL SCREENING CRITERIA
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {/* Competency 1 */}
                <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/60 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <span className="font-mono text-[11px] font-bold text-stone-700">
                      COMPETENCY 01 · INTAKE &amp; TRIAGE
                    </span>
                    <span className="font-mono text-[10px] text-stone-500">CRO Standard</span>
                  </div>
                  <div className="text-[11px] font-mono text-stone-500">
                    ENTRY-LEVEL PV ROLE · HYDERABAD / BENGALURU
                  </div>
                  <div className="font-mono text-xs text-stone-700 leading-relaxed bg-white p-3.5 rounded-xl border border-stone-200/80">
                    "Responsible for initial review and triage of Individual Case Safety Reports (ICSRs). Must verify minimum 4-element validity per ICH-E2D and document reporter details."
                  </div>
                  <p className="text-xs text-stone-600 font-sans">
                    <strong>Why it matters in interviews:</strong> Interviewers test whether you understand how an adverse drug reaction enters a database, rather than memorizing isolated pharmacology definitions.
                  </p>
                </div>

                {/* Competency 2 */}
                <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/60 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <span className="font-mono text-[11px] font-bold text-stone-700">
                      COMPETENCY 02 · MEDICAL CODING
                    </span>
                    <span className="font-mono text-[10px] text-stone-500">Pharma IT Standard</span>
                  </div>
                  <div className="text-[11px] font-mono text-stone-500">
                    ENTRY-LEVEL PV ROLE · PUNE / BENGALURU
                  </div>
                  <div className="font-mono text-xs text-stone-700 leading-relaxed bg-white p-3.5 rounded-xl border border-stone-200/80">
                    "Accurate coding of adverse event verbatim terms and concomitant medications using MedDRA hierarchy (SOC, HLGT, HLT, PT, LLT) and WHO-Drug dictionaries."
                  </div>
                  <p className="text-xs text-stone-600 font-sans">
                    <strong>Why it matters in interviews:</strong> Tests whether you know how patient descriptions (e.g. "severe skin peeling") map to standard regulatory Preferred Terms.
                  </p>
                </div>

                {/* Competency 3 */}
                <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/60 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <span className="font-mono text-[11px] font-bold text-stone-700">
                      COMPETENCY 03 · REGULATORY TIMELINES
                    </span>
                    <span className="font-mono text-[10px] text-stone-500">Sponsor Standard</span>
                  </div>
                  <div className="text-[11px] font-mono text-stone-500">
                    ENTRY-LEVEL PV ROLE · HYDERABAD / CHENNAI
                  </div>
                  <div className="font-mono text-xs text-stone-700 leading-relaxed bg-white p-3.5 rounded-xl border border-stone-200/80">
                    "Knowledge of global regulatory reporting timelines (expedited 7/15-day reporting vs periodic aggregate updates) and seriousness triage."
                  </div>
                  <p className="text-xs text-stone-600 font-sans">
                    <strong>Why it matters in interviews:</strong> Safety reporting is legally binding. Missing an expedited reporting clock causes regulatory non-compliance, so hiring managers probe your timeline discipline.
                  </p>
                </div>
              </div>
            </div>

            {/* Insight Callout */}
            <div className="p-5 rounded-xl bg-stone-100/80 border border-stone-200 text-xs sm:text-sm text-stone-700 font-sans text-left max-w-4xl mx-auto space-y-1">
              <p className="font-bold text-stone-900">
                The difference between academic exams and employer interviews:
              </p>
              <p className="text-stone-600 leading-relaxed">
                University curricula focus primarily on pharmacology, synthesis, and medicinal chemistry. Recruiter technical rounds test ICSR triage, MedDRA coding hierarchy, and compliance clocks. That operational gap is what this workshop addresses.
              </p>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            04 · THE EMPLOYMENT GAP (SCIENCE VS WORKFLOW)
           ───────────────────────────────────────────────────────────── */}
        <section className="py-14 sm:py-18 border-b border-stone-200 bg-stone-50/70">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-left max-w-3xl space-y-3">
              <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                THE EMPLOYMENT GAP
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-serif font-bold text-stone-900 leading-tight">
                Your degree teaches the science. Interviews test the workflow.
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
                If you have sent dozens of applications and received silent rejections, the problem is almost never your academic capability. It is the mismatch between university study and corporate job descriptions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {/* Gap 01 */}
              <div className="p-6 rounded-2xl border border-stone-200 bg-white shadow-2xs space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1B3F8B] flex items-center justify-center font-bold font-mono text-xs border border-blue-200">
                      01
                    </div>
                    <span className="font-mono text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      RESUME FILTER
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900 font-sans">
                    Keyword scan rejection
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                    Corporate hiring portals automatically scan CVs for operational keywords. Without verified workflow terms, human recruiters never even see your application.
                  </p>
                </div>
                <div className="pt-2 border-t border-stone-100 flex flex-wrap gap-1.5 text-[10px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-700 font-semibold">ICSR ✖</span>
                  <span className="px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-700 font-semibold">MedDRA ✖</span>
                  <span className="px-2 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-700 font-semibold">Argus ✖</span>
                </div>
              </div>

              {/* Gap 02 */}
              <div className="p-6 rounded-2xl border border-stone-200 bg-white shadow-2xs space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1B3F8B] flex items-center justify-center font-bold font-mono text-xs border border-blue-200">
                      02
                    </div>
                    <span className="font-mono text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      TECHNICAL ROUND
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900 font-sans">
                    Triage scenario freeze
                  </h3>
                  <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/80 text-[11px] font-sans italic text-amber-950 leading-snug">
                    “A physician reports a rash 4 days after prescribing a drug. How would you triage the case?”
                  </div>
                  <p className="text-xs text-stone-600 font-sans leading-relaxed">
                    Freshers freeze because academic exams test pharmacology definitions, not 4-point validity checks or seriousness escalation rules.
                  </p>
                </div>
              </div>

              {/* Gap 03 */}
              <div className="p-6 rounded-2xl border border-stone-200 bg-white shadow-2xs space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1B3F8B] flex items-center justify-center font-bold font-mono text-xs border border-blue-200">
                      03
                    </div>
                    <span className="font-mono text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      ROLE DIRECTION
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900 font-sans">
                    Career pathway confusion
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                    Students understand pharmacology, but may not know what a Drug Safety Associate actually does every day compared to Clinical Data Management or Medical Coding.
                  </p>
                </div>
                <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-stone-600">
                  <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200 font-semibold text-stone-800">PV (Safety)</span>
                  <span>vs</span>
                  <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200 font-semibold text-stone-800">CDM (Data)</span>
                  <span>vs</span>
                  <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200 font-semibold text-stone-800">Coding</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            05 · THE MENTOR: AUTHENTIC PRACTITIONER OVER BADGE WALL
           ───────────────────────────────────────────────────────────── */}
        <section id="mentor" ref={mentorRef} className="py-11 sm:py-15 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Photograph */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-xl">
                  <img
                    src={mentorKumailImg}
                    alt="Mohamed Kumail Abbas - Manager, Pharmacovigilance"
                    className="w-full h-auto object-contain block"
                  />
                  <div className="p-4 bg-stone-950 text-white text-left">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block">
                      SESSION FACULTY
                    </span>
                    <span className="font-serif font-bold text-base text-white block">
                      Mohamed Kumail Abbas
                    </span>
                    <span className="text-xs text-stone-300 font-sans block">
                      Manager, Pharmacovigilance · M.Pharm
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Verified Background & What He'll Cover */}
              <div className="lg:col-span-7 space-y-5 text-left">
                <div className="space-y-2">
                  <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                    SESSION FACULTY
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-serif font-bold text-stone-950 leading-tight">
                    Learn from someone who has actually worked inside the function.
                  </h2>
                  <p className="text-sm sm:text-base text-stone-700 font-sans leading-relaxed">
                    Mohamed Kumail Abbas has directed Pharmacovigilance, Aggregate Safety Reporting, and Clinical Safety Operations for global clinical research organizations and pharmaceutical sponsors.
                  </p>
                </div>

                {/* Verified Career Progression Track */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider font-bold block">
                      Industry Career Progression
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">
                      6 Industry Milestones
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
                    {cfg.speaker.careerTimeline.map((item, idx) => (
                      <div
                        key={item.company}
                        className="p-3 rounded-xl bg-stone-50/80 border border-stone-200 text-left relative group hover:border-[#1B3F8B]/30 transition-colors"
                      >
                        <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono mb-1">
                          <span>0{idx + 1}</span>
                          {idx < cfg.speaker.careerTimeline.length - 1 ? (
                            <span className="text-stone-300">→</span>
                          ) : (
                            <span className="text-emerald-600 font-bold">CURRENT</span>
                          )}
                        </div>
                        <span className="font-bold text-stone-900 block">{item.company}</span>
                        <span className="text-stone-500 text-[11px] font-sans block leading-tight mt-0.5">{item.role}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What He'll Bring Into The Session */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider font-bold block">
                    What Mohamed Will Walk Through Live
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-stone-700">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Real case-processing logic</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Regulatory timeline clocks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Safety operations perspective</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>CRO fresher interview screens</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="px-6 py-3 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                  >
                    Reserve Free Seat to Attend →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            06 · 75-MINUTE AGENDA (WHAT HAPPENS INSIDE)
           ───────────────────────────────────────────────────────────── */}
        <section className="py-11 sm:py-15 border-b border-stone-200 bg-stone-50/70">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                SESSION STRUCTURE
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-serif font-bold text-stone-950 leading-tight">
                What happens in 75 minutes?
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-sans">
                A focused, four-chapter working session with zero endless theory slides.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {cfg.agenda.map((item) => (
                <div key={item.title} className="p-5 sm:p-5.5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1.5">
                  <span className="font-mono text-xs font-bold text-[#1B3F8B] block">
                    {item.timeRange}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-stone-950">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            07 · WHAT YOU LEAVE WITH (OUTCOMES OVER SALES DECKS)
           ───────────────────────────────────────────────────────────── */}
        <section className="py-11 sm:py-15 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                CLEAR VALUE
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-serif font-bold text-stone-950 leading-tight">
                Leave with a clearer picture of the work.
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-sans">
                Four practical takeaways from the live working session:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50/70 space-y-2">
                <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase block">
                  01 · UNDERSTAND
                </span>
                <h3 className="font-bold text-stone-900 text-sm font-sans">
                  Entry-level PV role
                </h3>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  Understand what a Drug Safety Associate actually does every day at CROs and sponsor hubs.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50/70 space-y-2">
                <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase block">
                  02 · RECOGNIZE
                </span>
                <h3 className="font-bold text-stone-900 text-sm font-sans">
                  Hiring manager tests
                </h3>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  Recognize the operational questions interviewers ask freshers during technical interview screens.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50/70 space-y-2">
                <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase block">
                  03 · PRACTICE
                </span>
                <h3 className="font-bold text-stone-900 text-sm font-sans">
                  Real case logic
                </h3>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  Practice the 4-point validity checks and regulatory clock evaluation logic live on screen.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50/70 space-y-2">
                <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase block">
                  04 · DECIDE
                </span>
                <h3 className="font-bold text-stone-900 text-sm font-sans">
                  Your career fit
                </h3>
                <p className="text-xs text-stone-600 font-sans leading-relaxed">
                  Decide whether Pharmacovigilance, CDM, or Medical Coding is the right direction for your degree.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            08 · WHO THIS IS FOR (AND WHO IT IS NOT FOR)
           ───────────────────────────────────────────────────────────── */}
        <section className="py-14 sm:py-18 border-b border-stone-200 bg-stone-50/70">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                QUALIFICATION &amp; FIT
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950">
                Is this workshop for you?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {/* Who It Is For */}
              <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-3">
                <div className="font-mono text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  ✓ THIS WORKSHOP IS FOR YOU IF:
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-stone-800 font-sans">
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>You recently completed or are pursuing B.Pharm, M.Pharm, or Pharm.D</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>You are a Life Sciences, Biotech, or Allied Health graduate exploring careers</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>You have applied for entry-level healthcare jobs without hearing back</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>You want to see actual PV case work before spending money on any course</span>
                  </div>
                </div>
              </div>

              {/* Who It Is Not For */}
              <div className="p-6 rounded-2xl border border-stone-200 bg-white space-y-3">
                <div className="font-mono text-xs font-bold text-stone-500 uppercase tracking-wider">
                  ✗ PROBABLY NOT FOR YOU IF:
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-stone-600 font-sans">
                  <div className="flex items-start gap-2">
                    <span className="text-stone-400 font-bold">✗</span>
                    <span>Experienced PV professionals seeking advanced specialist training</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-stone-400 font-bold">✗</span>
                    <span>Candidates expecting a guaranteed job outcome</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            09 · REGISTRATION SECTION: FRICTIONLESS 3-FIELD FORM
           ───────────────────────────────────────────────────────────── */}
        <section className="py-14 sm:py-20 border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                FREE RESERVATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950">
                Reserve your free seat.
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans">
                Tell us a little about yourself so we can make the session relevant to you.
              </p>
            </div>

            {/* Registration Card Form */}
            <div
              ref={formRef}
              id="registration-card"
              className="rounded-2xl border border-stone-300/90 bg-stone-50/50 p-6 sm:p-7 shadow-md text-left"
            >
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Error Notification */}
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Field 1: Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-name" className="text-xs font-bold text-stone-800 font-mono flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-stone-500" />
                      FULL NAME <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onFocus={handleInputFocus}
                      onBlur={() => {
                        handleInputBlur();
                        if (name.trim().length >= 2) markFieldCompleted("name");
                      }}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ananya Sharma"
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1325]/15 focus:border-[#0B1325] font-sans transition-all"
                    />
                  </div>

                  {/* Field 2: WhatsApp Number */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-phone" className="text-xs font-bold text-stone-800 font-mono flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-stone-500" />
                      WHATSAPP NUMBER <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <span className="inline-flex items-center px-3 rounded-xl border border-stone-300 bg-stone-100 text-xs font-mono font-bold text-stone-700">
                        IN +91
                      </span>
                      <input
                        id="form-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                        value={phone}
                        onFocus={handleInputFocus}
                        onBlur={() => {
                          handleInputBlur();
                          if (phone.trim().length >= 10) markFieldCompleted("phone");
                        }}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="98765 43210"
                        className="flex-1 px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1325]/15 focus:border-[#0B1325] font-sans transition-all"
                      />
                    </div>
                  </div>

                  {/* Field 3: Degree Qualification */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-degree" className="text-xs font-bold text-stone-800 font-mono flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-stone-500" />
                      YOUR DEGREE / QUALIFICATION <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="form-degree"
                      value={degree}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      onChange={(e) => {
                        setDegree(e.target.value);
                        markFieldCompleted("degree");
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1325]/15 focus:border-[#0B1325] font-sans cursor-pointer transition-all"
                    >
                      {cfg.eligibleDegrees.map((deg) => (
                        <option key={deg} value={deg}>
                          {deg}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Optional Email Toggle */}
                  <div>
                    {!showEmailField ? (
                      <button
                        type="button"
                        onClick={() => setShowEmailField(true)}
                        className="text-xs text-[#1B3F8B] hover:text-[#0B1325] font-mono flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        + Add Email Address (Optional)
                      </button>
                    ) : (
                      <div className="space-y-1.5 pt-1">
                        <label htmlFor="form-email" className="text-xs font-bold text-stone-800 font-mono flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-stone-500" />
                          EMAIL ADDRESS (OPTIONAL)
                        </label>
                        <input
                          id="form-email"
                          type="email"
                          autoComplete="email"
                          value={email}
                          onFocus={handleInputFocus}
                          onBlur={handleInputBlur}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="ananya.sharma@example.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1325]/15 focus:border-[#0B1325] font-sans transition-all"
                        />
                        <p className="text-[11px] text-stone-500 font-sans">
                          Used only for your calendar invite. Workshop access details are sent via WhatsApp.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Primary Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Reserving Your Seat...</span>
                    ) : (
                      <span>Reserve My Free Seat →</span>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-stone-500 font-sans">
                    Workshop joining details will be sent directly to your WhatsApp · Zero spam
                  </p>
                </form>
              ) : (
                /* Instant Registration Success View */
                <div className="space-y-5 text-center py-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-stone-950 font-sans">
                      You're registered!
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 font-sans">
                      Your free workshop seat is confirmed. We will share your Google Meet link and session notes on WhatsApp prior to Sunday 6:00 PM IST.
                    </p>
                  </div>

                  <div className="rounded-xl bg-white border border-stone-200 p-4 space-y-2 font-mono text-xs text-left">
                    <div className="flex justify-between border-b border-stone-100 pb-2">
                      <span className="text-stone-500">ATTENDEE</span>
                      <span className="font-bold text-stone-900">{name.trim() || "Confirmed Guest"}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-100 pb-2">
                      <span className="text-stone-500">EVENT</span>
                      <span className="font-bold text-stone-900">Healthcare Career Workshop</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-100 pb-2">
                      <span className="text-stone-500">DATE</span>
                      <span className="font-bold text-stone-900">Sunday, 6 September 2026</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-100 pb-2">
                      <span className="text-stone-500">TIME</span>
                      <span className="font-bold text-stone-900">6:00 PM – 7:15 PM IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">PLATFORM</span>
                      <span className="font-bold text-emerald-700">Google Meet</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    {/* Direct Google Meet Join Link */}
                    <a
                      href={cfg.meetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                    >
                      <Video className="w-4 h-4" />
                      <span>Join Google Meet</span>
                    </a>

                    <a
                      href="https://wa.me/919121283638?text=Hi%20Arzon%20Team%2C%20I%20just%20registered%20for%20the%20Sunday%20PV%20Workshop."
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        track("whatsapp_click", {
                          props: { variant: isVariantB ? "b" : "a", source: "success_screen" },
                        })
                      }
                      className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Join Workshop WhatsApp Updates</span>
                    </a>

                    <a
                      href={buildGoogleCalendarUrl(cfg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl border border-stone-300 hover:border-stone-400 bg-white text-stone-900 font-mono text-xs font-bold transition-all shadow-xs"
                    >
                      <Calendar className="w-4 h-4 text-[#1B3F8B]" />
                      <span>Add to Google Calendar</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            10 · TRANSPARENT FAQ: HONEST ANSWERS TO STUDENT FEARS
           ───────────────────────────────────────────────────────────── */}
        <section id="faq" className="py-14 sm:py-18 border-b border-stone-200 bg-stone-50/70">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-left space-y-2">
              <span className="font-mono text-xs font-bold text-[#1B3F8B] uppercase tracking-wider">
                COMMON QUESTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3 text-left">
              {[
                {
                  q: "Is the workshop really free?",
                  a: "Yes. There is no payment required to reserve a seat. This is an open educational working session to help healthcare graduates understand industry expectations before spending money on training.",
                },
                {
                  q: "Do I need prior Pharmacovigilance experience?",
                  a: "No. The session is designed specifically for freshers, students, and graduates who have clinical or pharmacy knowledge but have never worked inside a corporate safety team.",
                },
                {
                  q: "Is this only for B.Pharm students?",
                  a: "No. While B.Pharm is a common background, the session is equally relevant to M.Pharm, Pharm.D, B.Sc/M.Sc Life Sciences, and Biotechnology graduates exploring entry-level roles.",
                },
                {
                  q: "Will there be an aggressive sales pitch?",
                  a: "No. The session is focused entirely on practical learning, case triage, and open Q&A. For attendees who want to explore Arzon's structured role-training programs, those options are shared separately after the working session.",
                },
                {
                  q: "What happens if I cannot attend live?",
                  a: "We strongly recommend attending live for the interactive Q&A with Mohamed Kumail Abbas. Session takeaways and case reference notes are shared with registered attendees on WhatsApp.",
                },
                {
                  q: "Where will I receive the Google Meet joining link?",
                  a: "We send the room link and pre-session briefing directly to your registered WhatsApp number on Sunday before 6:00 PM IST.",
                },
              ].map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={faq.q}
                    className="rounded-2xl border border-stone-200 bg-white overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        const next = isOpen ? null : idx;
                        setOpenFaqIdx(next);
                        if (next !== null) {
                          track("faq_open", {
                            props: { question: faq.q, variant: isVariantB ? "b" : "a" },
                          });
                        }
                      }}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-stone-900 text-sm sm:text-base font-sans cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#1B3F8B]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-stone-600 font-sans leading-relaxed border-t border-stone-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            11 · FINAL CTA: DECISIVE VALUE STATEMENT
           ───────────────────────────────────────────────────────────── */}
        <section className="py-14 sm:py-20 bg-white text-center">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-serif font-bold text-stone-950 leading-tight">
              See a real case processed. Understand what employers actually test.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-sans max-w-xl mx-auto">
              Join the live working session this Sunday with Mohamed Kumail Abbas. It's completely free.
            </p>
            <div className="font-mono text-xs text-stone-500">
              Sunday · 6 September 2026 · 6:00 PM IST · Google Meet
            </div>
            <div>
              <button
                type="button"
                onClick={scrollToForm}
                className="px-8 py-4 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-sm font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                Reserve My Free Seat →
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ─────────────────────────────────────────────────────────────
          12 · STICKY MOBILE BOTTOM CTA BAR
         ───────────────────────────────────────────────────────────── */}
      {!isFormInView && !isInputFocused && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/98 border-t border-stone-200/90 p-3 px-4 backdrop-blur-md shadow-lg flex items-center justify-between gap-3">
          <div className="text-left">
            <span className="font-mono text-[10px] text-[#1B3F8B] font-bold block uppercase tracking-wider">
              FREE LIVE SESSION
            </span>
            <span className="font-mono text-xs font-bold text-stone-900 block">
              Sun 6 Sept · 6:00 PM IST
            </span>
          </div>
          <button
            type="button"
            onClick={scrollToForm}
            className="px-5 py-2.5 rounded-xl bg-[#0B1325] hover:bg-[#1B3F8B] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer shrink-0"
          >
            Reserve Free Seat →
          </button>
        </div>
      )}

      {/* Footer with calm workshop-aligned CTA */}
      <Footer
        customCta={
          <div className="rounded-2xl border border-sky-400/30 bg-[#162648] p-6 sm:p-8 space-y-4 text-center max-w-3xl mx-auto shadow-xl">
            <div className="space-y-2 max-w-xl mx-auto">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-50 leading-tight">
                Still deciding?
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                You don't need to choose a career track today. Start by understanding what the work actually looks like.
              </p>
            </div>
            <div className="pt-1">
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center justify-center px-7 py-3 rounded-xl bg-white hover:bg-stone-100 font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer text-stone-900"
                style={{ color: "#0B1325" }}
              >
                Reserve your free workshop seat →
              </button>
            </div>
          </div>
        }
      />
    </div>
  );
}
