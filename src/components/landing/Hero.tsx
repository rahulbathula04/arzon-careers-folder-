import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, BadgeCheck, Landmark, Building2, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { PremiumChip } from "@/components/ui/PremiumChip";
import taskImg from "@/assets/proof/task-partnership.jpg";
import { trackEvent } from "@/lib/analytics";

const HERO_CONTENT = {
  en: {
    eyebrow: "CERTIFIED RECRUITMENT PARTNER · HSBC HOLDINGS & JPMORGAN CHASE & CO. · AUGUST 2026",
    headlineMain: "Stop sending resumes into a black hole.",
    headlineAccent: "Your profile deserves a recruiter.",
    subhead: "Most fresh graduates never get interviewed because their resumes get buried in automated tracking systems. Arzon Global is a certified recruitment partner for HSBC Holdings (VMO ID: HSBC2621TAVM026) and JPMorgan Chase. Our preparation system bypasses cold applying and presents your verified scorecard directly to hiring managers.",
    primaryCta: "Check My Eligibility",
    secondaryCta: "See How It Works",
    scarcity: "12,000+ LEARNERS · 60 SEATS ONLY · SAME-DAY ELIGIBILITY CALL · APPLICATIONS CLOSE WHEN SEATS FILL",
    proofCaption: "DOCUMENTED INSTITUTIONAL PROOF · VMO ID: HSBC2621TAVM026",
    proofSubcaption: "Physical contract framed at Arzon Global Headquarters, Hyderabad",
  },
  hi: {
    eyebrow: "प्रमाणित भर्ती भागीदार · एचएसबीसी होल्डिंग्स और जेपीमॉर्गन चेस एंड कंपनी · अगस्त 2026",
    headlineMain: "ब्लैक होल में रिज़्यूमे भेजना बंद करें।",
    headlineAccent: "आपकी प्रोफ़ाइल एक वास्तविक रिक्रूटर की हकदार है।",
    subhead: "अधिकांश फ्रेश ग्रेजुएट्स को कभी इंटरव्यू का मौका नहीं मिलता क्योंकि उनके रिज़्यूमे स्वचालित एटीएस सिस्टम में दब जाते हैं। अर्ज़ोन ग्लोबल एचएसबीसी होल्डिंग्स (VMO ID: HSBC2621TAVM026) और जेपीमॉर्गन चेस का आधिकारिक भर्ती भागीदार है। हमारा सिस्टम सीधे हायरिंग मैनेजर्स तक आपकी सत्यापित रिपोर्ट पहुंचाता है।",
    primaryCta: "मेरी पात्रता जांचें",
    secondaryCta: "यह कैसे काम करता है देखें",
    scarcity: "12,000+ छात्र · केवल 60 सीटें · उसी दिन पात्रता कॉल · सीटें भरने पर आवेदन बंद",
    proofCaption: "सत्यापित संस्थागत प्रमाण पत्र · VMO ID: HSBC2621TAVM026",
    proofSubcaption: "अर्ज़ोन ग्लोबल मुख्यालय, हैदराबाद में फ्रेम किया गया भौतिक अनुबंध",
  },
  te: {
    eyebrow: "ధృవీకరించబడిన రిక్రూట్‌మెంట్ భాగస్వామి · హెచ్‌ఎస్‌బిసి & జెపిమోర్గన్ చేస్ · ఆగస్టు 2026",
    headlineMain: "బ్లాక్ హోల్‌లోకి రెజ్యూమ్‌లు పంపడం ఆపండి.",
    headlineAccent: "మీ ప్రొఫైల్‌కు ఒక నిజమైన రిక్రూటర్ అవసరం.",
    subhead: "ఆటోమేటెడ్ ఎటిఎస్ సిస్టమ్‌లలో రెజ్యూమ్‌లు నిండిపోవడం వల్ల చాలామంది ఫ్రెష్ గ్రాడ్యుయేట్లకు ఇంటర్వ్యూలు రావు. అర్జోన్ గ్లోబల్ అనేది హెచ్‌ఎస్‌బిసి హోల్డింగ్స్ (VMO ID: HSBC2621TAVM026) మరియు జెపిమోర్గన్ చేస్ అధికారిక రిక్రూట్‌మెంట్ భాగస్వామి. మా విధానం మీ ధృవీకరించబడిన స్కోర్‌కార్డ్‌ను నేరుగా హైరింగ్ మేనేజర్లకు అందిస్తుంది.",
    primaryCta: "నా అర్హత తనిఖీ చేయండి",
    secondaryCta: "ఇది ఎలా పనిచేస్తుందో చూడండి",
    scarcity: "12,000+ విద్యార్థులు · 60 సీట్లు మాత్రమే · అదే రోజు అర్హత కాల్ · సీట్లు నిండిన వెంటనే అప్లికేషన్లు ముగుస్తాయి",
    proofCaption: "ధృవీకరించబడిన సంస్థాగత రుజువు · VMO ID: HSBC2621TAVM026",
    proofSubcaption: "హైదరాబాద్‌లోని అర్జోన్ గ్లోబల్ ప్రధాన కార్యాలయంలో ప్రదర్శించిన భౌతిక ఒప్పందం",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
} as const;

/**
 * Section One — The Certificate Hero (Multilingual EN, HI, TE)
 */
export function Hero() {
  const shouldReduceMotion = useReducedMotion();
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
      className="relative isolate overflow-hidden bg-[#F7F5F0] text-[#1A1A1A] px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20 border-b border-stone-200/80"
    >
      {/* Background ambient glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div 
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#1B3F8B]/15 to-[#059669]/15 opacity-60 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Column: Institutional Copy */}
          <motion.div 
            className="lg:col-span-7 space-y-6"
            variants={shouldReduceMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
          >
            
            {/* Utility Row: Language Selector & Live Status Beacon */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-1 rounded-full border border-stone-300 bg-stone-50/80 px-2.5 py-1 text-[11px] font-mono font-bold tracking-wider text-stone-700 shadow-xs">
                <span>LANG:</span>
                {(["en", "hi", "te"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => handleLangChange(l)}
                    className={`rounded px-1.5 py-0.5 text-[10px] uppercase font-bold transition-colors ${
                      lang === l
                        ? "bg-[#1B3F8B] text-slate-50"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              {/* Dynamic Live Status Badge */}
              <PremiumChip variant="emerald" pulse size="md">
                PARTNER VERIFIED · RECRUITER DESK OPEN
              </PremiumChip>
            </motion.div>

            {/* Small Label Above Headline */}
            <motion.p variants={itemVariants} className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#1B3F8B] leading-relaxed">
              {t.eyebrow}
            </motion.p>

            {/* Main Headline (Pain-first) */}
            <motion.h1
              variants={itemVariants}
              id="hero-heading"
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A] leading-[1.14]"
            >
              {t.headlineMain}<br />
              <span className="italic font-normal text-[#1B3F8B]">{t.headlineAccent}</span>
            </motion.h1>

            {/* Subheadline Paragraph */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-stone-700 leading-relaxed font-sans max-w-2xl">
              {t.subhead}
            </motion.p>

            {/* Primary & Secondary CTA Buttons */}
            <motion.div variants={itemVariants} className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <motion.a
                href="#apply"
                onClick={() => trackEvent("hero_primary_cta_click", { target: "apply", lang })}
                style={{ color: "#ffffff" }}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02, y: -1 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="h-12 px-7 inline-flex items-center justify-center gap-3 text-base font-bold text-slate-50 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md transition-colors"
              >
                <span style={{ color: "#ffffff" }}>{t.primaryCta}</span>
                <ArrowRight className="h-5 w-4" style={{ color: "#ffffff" }} />
              </motion.a>
              <motion.a
                href="#hiring-system"
                onClick={() => trackEvent("hero_secondary_cta_click", { target: "hiring-system", lang })}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.01, y: -1 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                className="h-12 px-6 inline-flex items-center justify-center gap-2 text-sm font-bold text-stone-800 bg-white hover:bg-stone-100 rounded-xl border border-stone-300 transition-colors"
              >
                <span>{t.secondaryCta}</span>
              </motion.a>
            </motion.div>

            {/* Scarcity & Trust Strip Below CTA */}
            <motion.div variants={itemVariants} className="pt-3 border-t border-stone-300/60">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-stone-600 leading-relaxed">
                {t.scarcity}
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Physical HSBC Certificate Photograph with Framer Motion Lift */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div 
              whileHover={shouldReduceMotion ? undefined : { y: -6, transition: { type: "spring", stiffness: 350 } }}
              className="relative rounded-2xl overflow-hidden border border-stone-300/90 shadow-xl bg-white p-2 transition-shadow hover:shadow-2xl"
            >
              {/* Subtle Verified Banner overlay */}
              <div className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-xs border border-emerald-300/90 text-emerald-900 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-mono text-[10px] font-bold tracking-wide uppercase">VMO ID: HSBC2621TAVM026</span>
              </div>

              <img
                src={taskImg}
                alt="Signed HSBC Recruitment Partnership Certificate displayed in front of Arzon Global office logo"
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
          </motion.div>

        </div>
      </div>
    </section>
  );
}


