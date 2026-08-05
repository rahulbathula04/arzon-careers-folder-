import { Link, useRouter } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowRight, Landmark, ShieldCheck, BadgeCheck, Loader2, Globe, Building2 } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import { markReadinessStarted, getReadinessSessionId } from "@/lib/readinessJourney";
import taskImg from "@/assets/proof/task-partnership.jpg";
import { FEATURE_FLAGS } from "@/config/featureFlags";
import {
  HSBC_SALARY_RANGE,
  JPMORGAN_SALARY_RANGE,
  AIML_COHORT_CAP,
  HSBC_PARTNER_SINCE,
} from "./constants";

import { DailyAiProofBadge } from "@/components/proof/DailyAiProofBadge";

export function Hero() {
  const [ctaPending, setCtaPending] = useState(false);
  const [lang, setLang] = useState<"en" | "hi" | "te">("en");
  const ctaLockRef = useRef<number>(0);
  const router = useRouter();

  const onPrimaryCta = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const now = Date.now();
    if (ctaPending || now - ctaLockRef.current < 1500) {
      e.preventDefault();
      return;
    }
    ctaLockRef.current = now;
    setCtaPending(true);
    void markReadinessStarted();
    trackEvent("hero_primary_cta_click", {
      surface: "home-hero",
      target: "career-engine-test",
    });
    trackEvent("readiness_cta_click", {
      surface: "home-hero",
      session_id: getReadinessSessionId(),
    });
    const unsub = router.subscribe("onResolved", () => {
      setCtaPending(false);
      unsub();
    });
    window.setTimeout(() => setCtaPending(false), 4000);
  };

  const trustChips: { icon: typeof Landmark; label: string; highlight?: boolean }[] = [
    { icon: Building2, label: "HSBC Certified Partner", highlight: true },
    { icon: Building2, label: "JPMorgan Chase Partner", highlight: true },
    { icon: Landmark, label: "TASK · Govt of Telangana" },
    { icon: ShieldCheck, label: "ISO 9001:2015" },
    { icon: BadgeCheck, label: "MCA Registered" },
  ];

  const translations = {
    en: {
      h1_1: "Where do you rank against",
      h1_2: "HSBC & JPMorgan's Day-1 hiring standard?",
      h1_3: `${AIML_COHORT_CAP} seats. Take the 3-min assessment.`,
      p: `Arzon Global is India's only workforce platform holding official Recruitment Partnership Certificates from HSBC Holdings and JPMorgan Chase (July 2026). Measure your candidate readiness score (ACRI) in 3 minutes before applying for the August 2026 cohort. Starting floor: ${HSBC_SALARY_RANGE} at HSBC, ${JPMORGAN_SALARY_RANGE} at JPMorgan.`,
      cta: "Get my industry-fit score",
    },
    hi: {
      h1_1: "HSBC और JPMorgan के डे-1 हाइरिंग स्टैंडर्ड के सामने",
      h1_2: "आपकी रैंक क्या है?",
      h1_3: `${AIML_COHORT_CAP} सीटें। 3 मिनट का टेस्ट लें।`,
      p: `Arzon Global भारत का इकलौता प्लेटफॉर्म है जिसके पास HSBC और JPMorgan Chase का ऑफिशियल जुलाई 2026 रिक्रूटमेंट सर्टिफिकेट है। 3 मिनट में अपना ACRI स्कोर जांचें।`,
      cta: "अपना इंडस्ट्री-फिट स्कोर प्राप्त करें",
    },
    te: {
      h1_1: "HSBC & JPMorgan డే-1 హైరింగ్ స్టాండర్డ్ తో",
      h1_2: "మీ ర్యాంక్ ఎక్కడ ఉంది?",
      h1_3: `${AIML_COHORT_CAP} సీట్లు. 3 నిమిషాల టెస్ట్ రాయండి.`,
      p: `Arzon Global భారతదేశంలో HSBC & JPMorgan యొక్క ఆఫీషియల్ రిక్రూట్మెంట్ పార్ట్నర్ (జూలై 2026). 3 నిమిషాల్లో మీ ACRI స్కోర్ తెలుసుకోండి.`,
      cta: "నా ఇండస్ట్రీ-ఫిట్ స్కోర్ పొందండి",
    },
  };

  const t = translations[lang];


  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };
  const itemFadeUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left Editorial Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="lg:col-span-7 space-y-6"
        >
          {/* Eyebrow Utility Row: Language Selector & Live Proof */}
          <motion.div variants={itemFadeUp} className="flex flex-wrap items-center gap-3">
            {/* Language Selector */}
            <div className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white p-1 shadow-sm">
              <div className="flex items-center gap-1 px-2 text-[#475569]">
                <Globe className="h-3.5 w-3.5 text-[#2563EB]" />
              </div>
              {(["en", "hi", "te"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
                    lang === l
                      ? "bg-[#0F172A] text-white shadow-sm font-extrabold"
                      : "text-[#334155] hover:bg-slate-100 hover:text-[#0F172A]"
                  }`}
                >
                  {l === "en" ? "ENG" : l === "hi" ? "हिंदी" : "తెలుగు"}
                </button>
              ))}
            </div>

            {/* Daily AI Assessment Dynamic Social Proof Badge */}
            <DailyAiProofBadge />
          </motion.div>

          {/* Trust Chips Ribbon */}
          <motion.ul variants={itemFadeUp} className="flex flex-wrap gap-2.5">
            {trustChips.map(({ icon: Icon, label, highlight }) => (
              <li
                key={label}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold shadow-sm transition-colors ${
                  highlight
                    ? "border-red-300 bg-red-50 text-red-900 hover:border-red-400"
                    : "border-slate-200/90 bg-white text-[#0F172A] hover:border-slate-300"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${highlight ? "text-red-600" : "text-[#2563EB]"}`} />
                <span className="font-bold">{label}</span>
              </li>
            ))}
          </motion.ul>

          {/* Headline */}
          <motion.h1
            variants={itemFadeUp}
            id="hero-heading"
            className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#020617] tracking-tight leading-[1.08] drop-shadow-sm"
          >
            {t.h1_1}{" "}
            <span className="italic font-normal bg-gradient-to-r from-[#CC0000] via-[#EF4444] to-[#991B1B] bg-clip-text text-transparent">
              {t.h1_2}
            </span>{" "}
            {t.h1_3}
          </motion.h1>

          <motion.p
            variants={itemFadeUp}
            className="text-base sm:text-lg lg:text-xl text-[#334155] max-w-2xl leading-relaxed font-medium tracking-normal"
          >
            {t.p}
          </motion.p>

          {/* Primary Royal Blue CTA (to="/career-engine/start" when ENABLE_ASSESSMENT is true) */}
          <motion.div
            variants={itemFadeUp}
            className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <Link
              to={FEATURE_FLAGS.ENABLE_ASSESSMENT ? "/career-engine/start" : "/courses"}
              className="text-sm h-13 px-8 flex items-center justify-center gap-3 text-white font-bold rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              aria-label={FEATURE_FLAGS.ENABLE_ASSESSMENT ? "Take the 3-minute Arzon readiness assessment" : "Explore Arzon career programmes"}
              onClick={FEATURE_FLAGS.ENABLE_ASSESSMENT ? onPrimaryCta : undefined}
            >
              <span className="text-white font-bold">
                {ctaPending ? "Opening…" : (FEATURE_FLAGS.ENABLE_ASSESSMENT ? t.cta : "Explore Programmes")}
              </span>
              {ctaPending ? (
                <Loader2 className="h-4 w-4 animate-spin text-white" />
              ) : (
                <ArrowRight className="h-4 w-4 text-white" />
              )}
            </Link>
          </motion.div>

          {/* Micro Assurance Labels */}
          <motion.div variants={itemFadeUp} className="space-y-1 pt-2">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#475569]">
              ✓ {AIML_COHORT_CAP} seats · HSBC Certified · Starts 30 Aug 2026
            </p>
            <p className="text-xs text-[#64748B] font-medium">
              English · Hindi · Telugu · Pan India placement (7 cities)
            </p>
          </motion.div>
        </motion.div>

        {/* Right Intake Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden lg:block lg:col-span-5"
        >
          <div className="rounded-3xl border border-slate-200/90 bg-white p-8 space-y-6 shadow-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-300 bg-red-50 text-red-900 text-xs font-bold">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
              <span className="font-bold">HSBC Drive Open — {AIML_COHORT_CAP} Seats Only</span>
            </div>

            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#64748B]">
                HSBC AI/ML Cohort · Next Intake
              </p>
              <h2 className="font-serif text-3xl font-bold text-[#0F172A] mt-1">30 August 2026</h2>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  Starting Salary
                </span>
                <span className="font-serif italic text-base font-bold text-red-700">
                  {HSBC_SALARY_RANGE} · HSBC
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  JPMorgan Track
                </span>
                <span className="font-serif italic text-base font-bold text-blue-700">
                  {JPMORGAN_SALARY_RANGE}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-[#64748B]">Status</span>
                <span className="font-bold text-emerald-700">Certified Partner — Seat Reservation Active</span>
              </div>
            </div>

            <p className="text-xs text-[#475569] leading-relaxed font-medium">
              Cohort capped at {AIML_COHORT_CAP} seats. HSBC conducts a structured
              intake — we prepare every candidate for their exact assessment process.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Proof Partners Banner */}
      <div className="mt-16 border-t border-slate-200 pt-6">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-center gap-8 text-xs text-[#64748B]">
          <span className="font-mono font-bold uppercase tracking-wider text-[#475569]">
            Official Recruitment Partners
          </span>
          <div className="flex items-center gap-1.5 font-bold text-[#CC0000]">
            <Building2 className="h-4 w-4 text-[#CC0000]" />
            <span>HSBC Holdings</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-[#0F172A]">
            <Building2 className="h-4 w-4 text-[#2563EB]" />
            <span>JPMorgan Chase & Co.</span>
          </div>
          <img src={taskImg} alt="TASK" className="h-6 w-auto opacity-90" />
          <div className="flex items-center gap-1.5 font-bold text-[#0F172A]">
            <BadgeCheck className="h-4 w-4 text-[#2563EB]" />
            <span className="text-[#0F172A]">ISO 9001:2015</span>
          </div>
        </div>
      </div>
    </section>
  );
}
