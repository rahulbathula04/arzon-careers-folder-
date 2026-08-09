import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, BadgeCheck, Landmark, Building2, CheckCircle2, ExternalLink } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { GOOGLE_FORM_URL, GOOGLE_FORM_EMBED_URL } from "./constants";
import taskImg from "@/assets/proof/task-partnership.jpg";
import { trackEvent } from "@/lib/analytics";

const HERO_CONTENT = {
  en: {
    eyebrow: "🔥 65+ OPENINGS LIVE — HSBC & JPMORGAN HIRING NOW",
    headlineMain: "Your Profile Could Be",
    headlineAccent: "the Next One Shortlisted",
    subhead: "Top global companies are hiring tech talent through Arzon Careers — right now, this week. If you have skills in AI/ML, Python, or Data & Technology, don't wait for a \"perfect\" job posting to show up. Get your profile in front of live hiring requirements today.",
    primaryCta: "APPLY IN 2 MINUTES",
    ctaMicrocopy: "Free. No payment. No catch.",
    secondaryCta: "See How It Works",
    rolesTag: "65+ Roles. Open Now. · AI/ML • Python • Data & Technology",
    urgencyStrip: "Every day you wait, someone else's profile gets seen first. Submit yours in under 2 minutes.",
    registerNowCta: "REGISTER NOW",
    proofCaption: "DOCUMENTED INSTITUTIONAL PROOF · VMO ID: HSBC2621TAVM026",
    proofSubcaption: "Physical contract framed at Arzon Global Headquarters, Hyderabad",
  },
  hi: {
    eyebrow: "🔥 65+ ओपनिंग्स लाइव — एचएसबीसी और जेपीमॉर्गन में अभी भर्ती",
    headlineMain: "आपकी प्रोफ़ाइल",
    headlineAccent: "अगली शॉर्टलिस्ट हो सकती है",
    subhead: "शीर्ष वैश्विक कंपनियां अर्ज़ोन करियर के माध्यम से टेक टैलेंट की भर्ती कर रही हैं — अभी, इसी सप्ताह। यदि आपके पास AI/ML, पायथन, या डेटा और टेक्नोलॉजी का कौशल है, तो \"परफेक्ट\" जॉब पोस्टिंग का इंतजार न करें। आज ही अपनी प्रोफ़ाइल लाइव भर्ती आवश्यकताओं के सामने रखें।",
    primaryCta: "2 मिनट में आवेदन करें",
    ctaMicrocopy: "मुफ्त। कोई भुगतान नहीं। कोई शर्त नहीं।",
    secondaryCta: "यह कैसे काम करता है देखें",
    rolesTag: "65+ भूमिकाएं। अभी खुली हैं। · AI/ML • पायथन • डेटा और टेक्नोलॉजी",
    urgencyStrip: "हर दिन जो आप इंतजार करते हैं, किसी और की प्रोफ़ाइल पहले देखी जाती है। 2 मिनट से कम समय में अपनी सबमिट करें।",
    registerNowCta: "अभी रजिस्टर करें",
    proofCaption: "सत्यापित संस्थागत प्रमाण पत्र · VMO ID: HSBC2621TAVM026",
    proofSubcaption: "अर्ज़ोन ग्लोबल मुख्यालय, हैदराबाद में फ्रेम किया गया भौतिक अनुबंध",
  },
  te: {
    eyebrow: "🔥 65+ విభాగాలు లైవ్ — హెచ్‌ఎస్‌బిసి & జెపిమోర్గన్ ఇప్పుడు రిక్రూట్ చేస్తున్నాయి",
    headlineMain: "మీ ప్రొఫైల్",
    headlineAccent: "తదుపరి షార్ట్‌లిస్ట్ కావచ్చు",
    subhead: "టాప్ గ్లోబల్ కంపెనీలు అర్జోన్ కెరీర్స్ ద్వారా టెక్ ప్రతిభను ఎంపిక చేస్తున్నాయి — ఈ వారంలోనే. AI/ML, పైథాన్ లేదా డేటా & టెక్నాలజీ నైపుణ్యాలు ఉంటే, \"సరిగ్గా సరిపోయే\" జాబ్ పోస్టింగ్ కోసం వేచి ఉండకండి. ఈ రోజే మీ ప్రొఫైల్‌ను లైవ్ హైరింగ్ అవసరాల వద్దకు చేర్చండి.",
    primaryCta: "2 నిమిషాల్లో అప్లై చేయండి",
    ctaMicrocopy: "ఉచితం. ఏ చెల్లింపు లేదు. నియమాలు లేవు.",
    secondaryCta: "ఇది ఎలా పనిచేస్తుందో చూడండి",
    rolesTag: "65+ రోల్స్. ఇప్పుడు ఖాళీగా ఉన్నాయి. · AI/ML • పైథాన్ • డేటా & టెక్నాలజీ",
    urgencyStrip: "మీరు ఆలస్యం చేసే ప్రతి రోజు, మరొకరి ప్రొఫైల్ మొదట చూడబడుతుంది. 2 నిమిషాల్లోపు మీ వివరాలను సమర్పించండి.",
    registerNowCta: "ఇప్పుడే రిజిస్టర్ అవ్వండి",
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
                65+ LIVE OPENINGS · HIRING NOW
              </PremiumChip>
            </motion.div>

            {/* Small Label Above Headline */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-800">
              <span>{t.eyebrow}</span>
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

            {/* Subheadline Paragraph */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-stone-700 leading-relaxed font-sans max-w-2xl">
              {t.subhead}
            </motion.p>

            {/* Live Roles Badge Strip */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-xl bg-white border border-stone-300/80 px-3.5 py-2 text-xs font-mono font-bold text-stone-800 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t.rolesTag}</span>
            </motion.div>

            {/* Primary & Secondary CTA Buttons */}
            <motion.div variants={itemVariants} className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="flex flex-col items-stretch">
                <button
                  type="button"
                  aria-label="Check My Eligibility"
                  onClick={() => {
                    setIsFormModalOpen(true);
                    trackEvent("hero_primary_cta_click", { target: "embedded_google_form_modal", lang });
                  }}
                  style={{ color: "#ffffff" }}
                  className="h-13 px-7 inline-flex items-center justify-center gap-3 text-base font-bold text-slate-50 rounded-xl bg-[#1B3F8B] hover:bg-[#153270] shadow-md transition-colors cursor-pointer"
                >
                  <span style={{ color: "#ffffff" }}>Check My Eligibility →</span>
                  <ArrowRight className="h-5 w-4" style={{ color: "#ffffff" }} />
                </button>
                <span className="mt-1.5 text-center text-xs text-stone-600 font-sans font-medium">
                  {t.ctaMicrocopy}
                </span>
              </div>

              <motion.a
                href="#apply"
                onClick={() => trackEvent("hero_secondary_cta_click", { target: "embedded_form", lang })}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.01, y: -1 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
                className="h-13 px-6 inline-flex items-center justify-center gap-2 text-sm font-bold text-stone-800 bg-white hover:bg-stone-100 rounded-xl border border-stone-300 transition-colors"
              >
                <span>{t.secondaryCta}</span>
              </motion.a>
            </motion.div>

            {/* Urgency & Scarcity Banner Strip Below CTA */}
            <motion.div variants={itemVariants} className="pt-4 border-t border-stone-300/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-50/50 p-3.5 rounded-xl border border-amber-200/80">
              <p className="text-xs sm:text-sm font-sans font-semibold text-stone-800 leading-snug">
                ⚡ {t.urgencyStrip}
              </p>
              <button
                type="button"
                onClick={() => setIsFormModalOpen(true)}
                className="shrink-0 text-xs font-bold font-mono tracking-wider uppercase bg-amber-600 hover:bg-amber-700 text-slate-50 px-3.5 py-1.5 rounded-lg shadow-xs transition-colors text-center cursor-pointer"
              >
                {t.registerNowCta}
              </button>
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

      {/* Embedded Google Form Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[92vh] bg-white tone-light rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-stone-300">
            {/* Modal Header */}
            <div className="bg-[#1B3F8B] text-slate-50 p-4 flex items-center justify-between shadow-xs shrink-0">
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg">Check My Eligibility — Live Registration</h3>
                <p className="text-xs text-slate-200 font-sans">🔥 65+ Openings Live · HSBC &amp; JPMorgan Hiring Now</p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#1B3F8B] hover:bg-stone-100 rounded-lg text-xs font-bold font-mono transition-colors shadow-xs"
                >
                  <span>Open in New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#1B3F8B]" />
                </a>
                <button
                  onClick={() => setIsFormModalOpen(false)}
                  aria-label="Close modal"
                  className="p-1.5 rounded-lg text-slate-200 hover:text-slate-50 hover:bg-slate-100/10 transition-colors text-xl font-bold leading-none cursor-pointer"
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
          </div>
        </div>
      )}
    </section>
  );
}


