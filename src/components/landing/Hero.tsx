import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Briefcase,
  Award,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { MotionModal } from "@/components/motion/MotionModal";
import { HoverCard } from "@/components/motion/HoverCard";
import { ParallaxVisual } from "@/components/motion/ParallaxVisual";
import { GOOGLE_FORM_URL, GOOGLE_FORM_EMBED_URL } from "./constants";
import taskImg from "@/assets/proof/task-partnership.jpg";
import { trackEvent } from "@/lib/analytics";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { Meteors } from "@/components/magicui/meteors";

const HERO_CONTENT = {
  en: {
    ticker: "HEALTHCARE CAREER MATCH ENGINE · B.PHARM, B.SC, PHARM.D & BIOTECH",
    eyebrow: "12-WEEK FRESHER ROLE TRACKS · REAL JD INTELLIGENCE",
    headlineMain: "Match your degree to a healthcare career role.",
    headlineAccent: "Train for what employers actually hire for.",
    subhead:
      "Don't apply blindly. We analyze live Indian job descriptions in Pharmacovigilance, Medical Coding, Clinical Data & Regulatory Affairs to train you for specific entry-level roles.",
    primaryCta: "Match My Degree in 3 Minutes",
    ctaMicrocopy: "Free role-fit diagnostic · 100% free · Matches B.Pharm, Pharm.D, B.Sc & Biotech",
    secondaryCta: "View 12-Week Role Tracks",
    proofCaption: "INAUGURATION CHIEF GUEST · DR. SRIKANTH SINHA",
    proofSubcaption: "CEO, Telangana Academy for Skill and Knowledge (TASK) · Dept of ITE&C",
    card1Title: "Role-First Tracks",
    card1Desc: "Fresher PV, Coder, CDM, CRA & RA",
    card2Title: "Empirical JD Mapping",
    card2Desc: "Skills Frequency-Mapped from Real JDs",
    card3Title: "Fast-Track Partner Desk",
    card3Desc: "7-Day Manager Profile Review SLA",
  },
  hi: {
    ticker: "हेल्थकेयर करियर मैच इंजन · B.PHARM, B.SC, PHARM.D और बायोटेक",
    eyebrow: "12-सप्ताह के रोल ट्रैक · वास्तविक जॉब इंटेलिजेंस",
    headlineMain: "अपनी डिग्री को सही हेल्थकेयर रोल से जोड़ें।",
    headlineAccent: "वही सीखें जो कंपनियां इंटरव्यू में पूछती हैं।",
    subhead:
      "फार्माकोविजिलेंस, मेडिकल कोडिंग, क्लिनिकल डेटा और रेगुलेटरी अफेयर्स के लाइव जॉब डिस्क्रिप्शन पर आधारित प्रशिक्षण। 3 मिनट में अपना रोल मैच स्कोर जांचें।",
    primaryCta: "3 मिनट में अपनी डिग्री मैच करें",
    ctaMicrocopy: "निःशुल्क रोल-फिट टेस्ट · 100% मुफ़्त · त्वरित परिणाम",
    secondaryCta: "रोल ट्रैक देखें",
    proofCaption: "उद्घाटन मुख्य अतिथि · डॉ. श्रीकांत सिन्हा",
    proofSubcaption: "सीईओ, तेलंगाना एकेडमी फॉर स्किल एंड नॉलेज (TASK)",
    card1Title: "रोल-फर्स्ट ट्रैक्स",
    card1Desc: "6 विशिष्ट हेल्थकेयर रोल",
    card2Title: "व्यावहारिक प्रशिक्षण",
    card2Desc: "12 सप्ताह · लाइव सॉफ्टवेयर प्रोजेक्ट्स",
    card3Title: "सत्यापनीय प्रमाण पत्र",
    card3Desc: "ISO 9001:2015 और उद्योग संरेखित",
  },
  te: {
    ticker: "హెల్త్‌కేర్ కెరీర్ మ్యాచ్ ఇంజిన్ · B.PHARM, B.SC, PHARM.D & బయోటెక్",
    eyebrow: "12-వారాల రోల్ ట్రాక్స్ · రియల్ JD ఇంటెలిజెన్స్",
    headlineMain: "మీ డిగ్రీకి సరిపోయే హెల్త్‌కేర్ రోల్‌ను ఎంచుకోండి.",
    headlineAccent: "ఇంటర్వ్యూలలో కంపెనీలు అడిగే నైపుణ్యాలను నేర్చుకోండి.",
    subhead:
      "ఫార్మాకోవిజిలెన్స్, మెడికల్ కోడింగ్, క్లినికల్ డేటా & రెగ్యులేటరీ ఎఫైర్స్‌లో రియల్ జాబ్ డిస్క్రిప్షన్‌ ఆధారంగా శిక్షణ. 3 నిమిషాల్లో మీ సూటబుల్ రోల్‌ను చెక్ చేయండి.",
    primaryCta: "3 నిమిషాల్లో మీ డిగ్రీని మ్యాచ్ చేయండి",
    ctaMicrocopy: "ఉచిత రోల్-ఫిట్ టెస్ట్ · 100% ఉచితం · తక్షణ ఫలితం",
    secondaryCta: "రోల్ ట్రాక్‌లను చూడండి",
    proofCaption: "ప్రారంభోత్సవ విశిష్ట అతిథి · డాక్టర్ శ్రీకాంత్ సిన్హా",
    proofSubcaption: "సీఈఓ, తెలంగాణ అకాడమీ ఫర్ స్కిల్ అండ్ నాలెడ్జ్ (TASK)",
    card1Title: "రోల్-ఫర్స్ట్ ట్రాక్స్",
    card1Desc: "6 ప్రత్యేక హెల్త్‌కేర్ విభాగాలు",
    card2Title: "ప్రాక్టికల్ శిక్షణ",
    card2Desc: "12 వారాలు · లైవ్ ప్రాజెక్ట్‌లు & ఇంటర్న్‌షిప్",
    card3Title: "ధృవీకరించదగిన సర్టిఫికేషన్",
    card3Desc: "ISO 9001:2015 & ఇండస్ట్రీ ప్రమాణాలు",
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
} as const;

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
      className="relative isolate overflow-hidden bg-[#F7F5F0] tone-light text-[#1A1A1A] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14 border-b border-stone-200"
    >
      {/* Background ambient radial glow */}
      <ParallaxVisual className="pointer-events-none absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#1B3F8B]/15 to-[#8A6D1F]/15 opacity-60 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </ParallaxVisual>

      {/* Magic UI Meteor particles */}
      <Meteors number={14} className="-z-10 opacity-70" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Core Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Row: Language Toggle & Live Ticker Pill */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-2 sm:gap-3"
            >
              <div className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-2.5 py-1 text-xs font-mono font-bold text-stone-700 shadow-xs">
                <span className="text-stone-400 text-[11px]">LANG:</span>
                {(["en", "hi", "te"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => handleLangChange(l)}
                    className={`rounded px-2 py-1 text-[11px] uppercase font-extrabold transition-all cursor-pointer min-h-[28px] min-w-[28px] flex items-center justify-center ${
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
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-300 bg-sky-50 px-3 py-1 text-[11px] sm:text-xs font-mono font-bold text-[#1B3F8B] shadow-xs max-w-full truncate">
                <span className="h-2 w-2 rounded-full bg-[#1B3F8B] animate-pulse shrink-0" />
                <span className="truncate">{t.ticker}</span>
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
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A] leading-[1.15]"
            >
              {t.headlineMain}
              <br className="hidden sm:inline" />{" "}
              <AnimatedGradientText
                className="italic font-normal font-serif"
                colorFrom="#8A6D1F"
                colorVia="#1B3F8B"
                colorTo="#8A6D1F"
              >
                {t.headlineAccent}
              </AnimatedGradientText>
            </motion.h1>

            {/* Subheadline Copy */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-lg text-stone-700 leading-relaxed font-sans max-w-2xl"
            >
              {t.subhead}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="pt-2 space-y-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <ShimmerButton
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
                  background="#1B3F8B"
                  className="h-12 sm:h-13 px-6 sm:px-8 w-full sm:w-auto text-sm sm:text-base group whitespace-nowrap"
                >
                  <span style={{ color: "#FFFFFF" }}>{t.primaryCta}</span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1.5"
                    style={{ color: "#FFFFFF" }}
                  />
                </ShimmerButton>

                <motion.a
                  href="#tracks"
                  onClick={() => trackEvent("hero_secondary_cta_click", { target: "tracks", lang })}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -1 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  className="h-12 sm:h-13 px-6 sm:px-7 w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-bold text-stone-800 bg-white hover:bg-stone-50 rounded-xl border border-stone-300 shadow-sm transition-all whitespace-nowrap cursor-pointer"
                >
                  <span>{t.secondaryCta}</span>
                </motion.a>
              </div>

              <p className="text-xs text-stone-500 font-sans font-medium text-center sm:text-left pt-0.5">
                {t.ctaMicrocopy}
              </p>
            </motion.div>

            {/* Consolidated 3-Column Intake Summary Bar */}
            <motion.div
              variants={itemVariants}
              className="pt-4 border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3"
            >
              <HoverCard className="flex items-center gap-3 glass-card-light p-3.5 rounded-xl border border-stone-200 shadow-xs transition-all hover:border-stone-300">
                <div className="p-2 rounded-lg bg-[#1B3F8B]/10 text-[#1B3F8B] shrink-0">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] font-mono font-bold text-stone-500 uppercase">
                    {t.card1Title}
                  </p>
                  <p className="text-xs font-bold text-[#1A1A1A]">{t.card1Desc}</p>
                </div>
              </HoverCard>

              <HoverCard className="flex items-center gap-3 glass-card-light p-3.5 rounded-xl border border-stone-200 shadow-xs transition-all hover:border-stone-300">
                <div className="p-2 rounded-lg bg-[#8A6D1F]/10 text-[#8A6D1F] shrink-0">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] font-mono font-bold text-stone-500 uppercase">
                    {t.card2Title}
                  </p>
                  <p className="text-xs font-bold text-[#1A1A1A]">{t.card2Desc}</p>
                </div>
              </HoverCard>

              <HoverCard className="flex items-center gap-3 glass-card-light p-3.5 rounded-xl border border-stone-200 shadow-xs transition-all hover:border-stone-300">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-700 shrink-0">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] font-mono font-bold text-stone-500 uppercase">
                    {t.card3Title}
                  </p>
                  <p className="text-xs font-bold text-[#1A1A1A]">{t.card3Desc}</p>
                </div>
              </HoverCard>
            </motion.div>
          </div>

          {/* Right Column: Physical Inauguration Photograph Frame */}
          <div className="lg:col-span-5 relative">
            <motion.div
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { y: -6, transition: { type: "spring", stiffness: 350 } }
              }
              className="relative rounded-2xl overflow-hidden border border-stone-300 shadow-xl bg-white p-2.5 transition-all hover:shadow-2xl"
            >
              {/* Verified TASK Floating Badge */}
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-xs border border-sky-300 text-[#1B3F8B] rounded-full px-3 py-1 flex items-center gap-1.5 shadow-md"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1B3F8B]" />
                <span className="font-mono text-[10px] font-bold tracking-wide uppercase">
                  GOVT ALIGNED · TASK
                </span>
              </motion.div>

              <img
                src={taskImg}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== "/proof/task-partnership.jpg") {
                    target.src = "/proof/task-partnership.jpg";
                  }
                }}
                alt="Arzon Global inauguration by TASK CEO Dr. Srikanth Sinha"
                loading="eager"
                decoding="async"
                width={600}
                height={450}
                className="w-full h-auto object-cover rounded-xl border border-stone-200"
              />

              <div className="p-3 text-center bg-[#F7F5F0] rounded-b-xl border-t border-stone-200 mt-2">
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-800">
                  {t.proofCaption}
                </p>
                <p className="text-xs font-serif italic text-[#8A6D1F] mt-0.5">
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
            <h3 className="font-serif font-bold text-sm sm:text-lg text-white truncate">
              Check My Eligibility — Live Registration
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-200 font-sans truncate">
              Arzon Global · Role-First Workforce Readiness
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-sans bg-white hover:bg-slate-100 text-slate-900 border border-white shadow-xs transition-all cursor-pointer shrink-0 whitespace-nowrap"
              style={{
                color: "#0F172A",
                backgroundColor: "#FFFFFF",
                WebkitTextFillColor: "#0F172A",
              }}
            >
              <span
                className="font-extrabold text-slate-900"
                style={{ color: "#0F172A", WebkitTextFillColor: "#0F172A", fontWeight: 800 }}
              >
                Open in New Tab
              </span>
              <ExternalLink
                className="h-3.5 w-3.5 shrink-0 text-slate-900"
                style={{ color: "#0F172A" }}
              />
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
