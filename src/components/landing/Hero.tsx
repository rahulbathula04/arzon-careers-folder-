import { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, Briefcase, DollarSign, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { MotionModal } from "@/components/motion/MotionModal";
import { HoverCard } from "@/components/motion/HoverCard";
import { ParallaxVisual } from "@/components/motion/ParallaxVisual";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { GOOGLE_FORM_URL, GOOGLE_FORM_EMBED_URL } from "./constants";
import taskImg from "@/assets/proof/task-partnership.jpg";
import { trackEvent } from "@/lib/analytics";

const HERO_CONTENT = {
  en: {
    eyebrow: "LIVE TECHNOLOGY HIRING INTAKE · 30 AUGUST 2026 COHORT",
    headlineMain: "There Are Live Hiring Opportunities.",
    headlineAccent: "Not Everyone Qualifies.",
    subhead:
      "75 active technology openings across Tier-1 Tech Enterprises & Quant Fintechs. 64% of applicants fail our initial eligibility screen. Take the free 3-minute fit test to find out if your profile qualifies.",
    primaryCta: "Take Free 3-Minute Fit Test",
    ctaMicrocopy: "Free eligibility test · Takes under 3 minutes · Instant fit score",
    secondaryCta: "View Live Openings",
    proofCaption: "DOCUMENTED INSTITUTIONAL CONTRACT · VMO ID: ENT2026-GLOBAL-VMO026",
    proofSubcaption: "Physical partnership contract framed at Arzon Global HQ, Hyderabad",
  },
  hi: {
    eyebrow: "लाइव टेक्नोलॉजी भर्ती · 30 अगस्त 2026 बैच",
    headlineMain: "लाइव भर्ती के अवसर खुले हैं।",
    headlineAccent: "हर कोई पात्र नहीं होता।",
    subhead:
      "शीर्ष एंटरप्राइज टेक और क्वांट फिनटेक कंपनियों में 75 लाइव पद खुले हैं। 64% आवेदक प्रारंभिक पात्रता में बाहर हो जाते हैं। 3 मिनट में अपनी पात्रता जांचें।",
    primaryCta: "निःशुल्क 3-मिनट का फिट टेस्ट दें",
    ctaMicrocopy: "निःशुल्क पात्रता परीक्षा · 3 मिनट से कम · त्वरित परिणाम",
    secondaryCta: "लाइव रिक्तियां देखें",
    proofCaption: "सत्यापित संस्थागत प्रमाण पत्र · VMO ID: ENT2026-GLOBAL-VMO026",
    proofSubcaption: "अर्ज़ोन ग्लोबल मुख्यालय, हैदराबाद में फ्रेम किया गया भौतिक अनुबंध",
  },
  te: {
    eyebrow: "లైవ్ టెక్నాలజీ రిక్రూట్‌మెంట్ · 30 ఆగస్టు 2026 బ్యాచ్",
    headlineMain: "లైవ్ ఉద్యోగ అవకాశాలు ఉన్నాయి.",
    headlineAccent: "అందరూ అర్హులు కారు.",
    subhead:
      "టాయర్-1 ఎంటర్‌ప్రైజ్ టెక్ మరియు క్వాంట్ ఫిన్‌టెక్ సంస్థలలో 75 లైవ్ పోస్టులు ఉన్నాయి. 64% దరఖాస్తుదారులు ప్రాథమిక స్క్రీనింగ్‌లో ఎంపిక కాకపోవచ్చు. 3 నిమిషాల్లో మీ అర్హతను ఉచితంగా తనిఖీ చేయండి.",
    primaryCta: "ఉచిత 3-నిమిషాల ఫిట్ టెస్ట్ తీసుకోండి",
    ctaMicrocopy: "ఉచిత అర్హత పరీక్ష · 3 నిమిషాల్లోపు · తక్షణ ఫలం",
    secondaryCta: "లైవ్ ఉద్యోగాలను చూడండి",
    proofCaption: "ధృవీకరించబడిన సంస్థాగత రుజువు · VMO ID: ENT2026-GLOBAL-VMO026",
    proofSubcaption: "హైదరాబాద్‌లోని అర్జోన్ గ్లోబల్ ప్రధాన కార్యాలయంలో భౌతిక ఒప్పందం",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
} as const;

/**
 * Section One — Modern Hero Component (Startup UI/UX Overhaul)
 * High-contrast light executive theme with streamlined typography,
 * single-arrow primary CTA, clean language selector, and 3-column intake summary box.
 */
export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "hi" | "te">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("arzon_lang");
      if (saved === "hi" || saved === "te" || saved === "en") return saved;
    }
    return "en";
  });

  const handleLangChange = (l: "en" | "hi" | "te") => {
    setLang(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("arzon_lang", l);
    }
    trackEvent("hero_lang_change", { lang: l });
  };

  const t = HERO_CONTENT[lang];

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-[#F7F5F0] tone-light text-[#1A1A1A] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 border-b border-stone-200"
    >
      {/* Background ambient radial glow */}
      <ParallaxVisual
        className="pointer-events-none absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#1B3F8B]/15 to-emerald-500/15 opacity-60 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </ParallaxVisual>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          
          {/* Left Column: Core Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Row: Language Toggle & Live Ticker Pill */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-3 py-1 text-xs font-mono font-bold text-stone-700 shadow-xs">
                <span className="text-stone-400">LANG:</span>
                {(["en", "hi", "te"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => handleLangChange(l)}
                    className={`rounded px-1.5 py-0.5 text-[10px] uppercase font-extrabold transition-all cursor-pointer ${
                      lang === l
                        ? "bg-[#1B3F8B] text-white shadow-xs"
                        : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              {/* Ticker Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1 text-xs font-mono font-bold text-emerald-900 shadow-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
                <span>LIVE INTAKE: TIER-1 ENTERPRISE & QUANT FINTECH · 75 ROLES OPEN</span>
              </div>
            </motion.div>

            {/* Eyebrow Badge */}
            <motion.div variants={itemVariants}>
              <PremiumChip variant="navy" size="md" icon={ShieldCheck}>
                {t.eyebrow}
              </PremiumChip>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              id="hero-heading"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A] leading-[1.14]"
            >
              {t.headlineMain}<br />
              <span className="italic font-normal text-[#1B3F8B]">{t.headlineAccent}</span>
            </motion.h1>

            {/* Subheadline Copy */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-stone-700 leading-relaxed font-sans max-w-2xl">
              {t.subhead}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="flex flex-col items-stretch sm:items-start">
                <motion.button
                  type="button"
                  aria-label="Check My Eligibility"
                  onClick={() => {
                    const quizEl = document.getElementById("eligibility-quiz");
                    if (quizEl) {
                      quizEl.scrollIntoView({ behavior: "smooth" });
                    } else {
                      setIsFormModalOpen(true);
                    }
                    trackEvent("hero_primary_cta_click", { target: "eligibility_quiz", lang });
                  }}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -2 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98, y: 0 }}
                  className="h-13 px-8 inline-flex items-center justify-center gap-2.5 text-base font-bold text-white rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-lg shadow-[#1B3F8B]/20 transition-all cursor-pointer group"
                  style={{ color: "#FFFFFF", backgroundColor: "#1B3F8B" }}
                >
                  <span style={{ color: "#FFFFFF" }}>{t.primaryCta}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" style={{ color: "#FFFFFF" }} />
                </motion.button>
                <span className="mt-1.5 text-xs text-stone-500 font-sans font-medium text-center sm:text-left">
                  {t.ctaMicrocopy}
                </span>
              </div>

              <motion.a
                href="#hiring-system"
                onClick={() => trackEvent("hero_secondary_cta_click", { target: "hiring_system", lang })}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -1 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="h-13 px-6 inline-flex items-center justify-center gap-2 text-sm font-bold text-stone-800 bg-white hover:bg-stone-50 rounded-xl border border-stone-300 shadow-xs transition-all"
              >
                <span>{t.secondaryCta}</span>
              </motion.a>
            </motion.div>

            {/* Consolidated 3-Column Intake Summary Bar */}
            <motion.div
              variants={itemVariants}
              className="pt-4 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <HoverCard className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs">
                <div className="p-2 rounded-lg bg-[#1B3F8B]/10 text-[#1B3F8B] shrink-0">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] font-mono font-bold text-stone-500 uppercase">Intake Capacity</p>
                  <p className="text-xs font-bold text-[#1A1A1A]">75 Roles (AI/ML + Data)</p>
                </div>
              </HoverCard>

              <HoverCard className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-700 shrink-0">
                  <DollarSign className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] font-mono font-bold text-stone-500 uppercase">Package Range</p>
                  <p className="text-xs font-bold text-[#1A1A1A]">₹6.0 – ₹18.0 LPA CTC</p>
                </div>
              </HoverCard>

              <HoverCard className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs">
                <div className="p-2 rounded-lg bg-sky-500/10 text-[#1B3F8B] shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] font-mono font-bold text-stone-500 uppercase">Review SLA</p>
                  <p className="text-xs font-bold text-[#1A1A1A]">7-Day Recruiter SLA</p>
                </div>
              </HoverCard>
            </motion.div>
          </div>

          {/* Right Column: Physical Tier-1 Enterprise Certificate Photograph Frame */}
          <div className="lg:col-span-5 relative">
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -6, transition: { type: "spring", stiffness: 350 } }}
              className="relative rounded-2xl overflow-hidden border border-stone-300 shadow-xl bg-white p-2.5 transition-all hover:shadow-2xl"
            >
              {/* Verified VMO Floating Badge */}
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-xs border border-emerald-300 text-emerald-900 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-md"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-mono text-[10px] font-bold tracking-wide uppercase">VMO: ENT2026-GLOBAL-VMO026</span>
              </motion.div>

              <img
                src={taskImg}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== "/proof/task-partnership.jpg") {
                    target.src = "/proof/task-partnership.jpg";
                  }
                }}
                alt="Signed Tier-1 Enterprise Recruitment Partnership Certificate displayed in front of Arzon Global office logo"
                loading="eager"
                decoding="async"
                width={600}
                height={450}
                className="w-full h-auto object-cover rounded-xl border border-stone-200"
              />

              <div className="p-3 text-center bg-[#F7F5F0] rounded-b-xl border-t border-stone-200 mt-2">
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-700">
                  {t.proofCaption}
                </p>
                <p className="text-xs font-serif italic text-[#1B3F8B] mt-0.5">
                  {t.proofSubcaption}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Embedded Google Form Modal */}
      <MotionModal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)}>
        {/* Modal Header */}
        <div className="bg-[#1B3F8B] text-white p-3.5 sm:p-4 flex items-center justify-between gap-3 shadow-xs shrink-0">
          <div className="min-w-0 flex-1">
            <h3 className="font-serif font-bold text-sm sm:text-lg text-white truncate">Check My Eligibility — Live Registration</h3>
            <p className="text-[11px] sm:text-xs text-slate-200 font-sans truncate">🔥 75+ Openings Live · 3 Roles · Enterprise &amp; Quant Hiring Now</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-sans bg-white hover:bg-slate-100 text-slate-900 border border-white shadow-xs transition-all cursor-pointer shrink-0 whitespace-nowrap"
              style={{ color: "#0F172A", backgroundColor: "#FFFFFF", WebkitTextFillColor: "#0F172A" }}
            >
              <span className="font-extrabold text-slate-900" style={{ color: "#0F172A", WebkitTextFillColor: "#0F172A", fontWeight: 800 }}>Open in New Tab</span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-slate-900" style={{ color: "#0F172A" }} />
            </a>
            <button
              onClick={() => setIsFormModalOpen(false)}
              aria-label="Close modal"
              className="p-1.5 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors text-xl font-bold leading-none cursor-pointer shrink-0"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Embedded Form Body */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 bg-[#FAF8F5] tone-light">
          <iframe
            src={GOOGLE_FORM_EMBED_URL}
            title="Official Arzon Careers Google Registration Form"
            width="100%"
            height="800"
            className="w-full min-h-[700px] sm:min-h-[800px] border-0 rounded-xl bg-white tone-light shadow-xs"
            loading="lazy"
          />
        </div>
      </MotionModal>
    </section>
  );
}
