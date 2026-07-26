import { Link, useRouter } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowRight, Landmark, ShieldCheck, BadgeCheck, Loader2, Globe } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import { markReadinessStarted, getReadinessSessionId } from "@/lib/readinessJourney";
import taskImg from "@/assets/proof/task-partnership.jpg";

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

  const trustChips: { icon: typeof Landmark; label: string }[] = [
    { icon: Landmark, label: "TASK · Govt of Telangana" },
    { icon: ShieldCheck, label: "ISO 9001:2015" },
    { icon: BadgeCheck, label: "MCA Registered" },
  ];

  const translations = {
    en: {
      h1_1: "Become",
      h1_2: "industry ready",
      h1_3: "for India's next decade.",
      p: "Land your first domain role in 12 weeks. Take the free 3-minute assessment to see which programme fits your background.",
      cta: "Get my industry-fit score",
    },
    hi: {
      h1_1: "भारत के अगले दशक के लिए",
      h1_2: "इंडस्ट्री-रेडी",
      h1_3: "बनें।",
      p: "12 हफ्तों में अपनी पहली जॉब पाएं। यह जानने के लिए कि कौन सा प्रोग्राम आपके लिए सही है, 3 मिनट का फ्री टेस्ट लें।",
      cta: "अपना इंडस्ट्री-फिट स्कोर प्राप्त करें",
    },
    te: {
      h1_1: "భారతదేశ తదుపరి దశాబ్దానికి",
      h1_2: "ఇండస్ట్రీ-రెడీ",
      h1_3: "అవ్వండి.",
      p: "12 వారాల్లో మీ మొదటి జాబ్ పొందండి. మీకు ఏ ప్రోగ్రామ్ సరిపోతుందో తెలుసుకోవడానికి 3 నిమిషాల ఉచిత పరీక్ష రాయండి.",
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
          {/* High-Contrast Language Selector */}
          <motion.div
            variants={itemFadeUp}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white p-1 shadow-sm"
          >
            <div className="flex items-center gap-1 px-2.5 text-[#475569]">
              <Globe className="h-4 w-4 text-[#2563EB]" />
            </div>
            {(["en", "hi", "te"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider transition-all ${
                  lang === l
                    ? "bg-[#0F172A] text-white shadow-md font-extrabold"
                    : "text-[#334155] hover:bg-slate-100 hover:text-[#0F172A]"
                }`}
              >
                {l === "en" ? "ENG" : l === "hi" ? "हिंदी" : "తెలుగు"}
              </button>
            ))}
          </motion.div>

          {/* Daily AI Assessment Dynamic Social Proof Badge */}
          <motion.div variants={itemFadeUp}>
            <DailyAiProofBadge />
          </motion.div>

          {/* Trust Chips Row */}
          <motion.ul variants={itemFadeUp} className="flex flex-wrap gap-2.5">
            {trustChips.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-bold text-[#0F172A] shadow-sm"
              >
                <Icon className="h-3.5 w-3.5 text-[#2563EB]" />
                <span className="text-[#0F172A]">{label}</span>
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
            <span className="italic font-normal bg-gradient-to-r from-[#9A7B2C] via-[#B5943B] to-[#785E1A] bg-clip-text text-transparent">
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

          {/* Primary Royal Blue CTA */}
          <motion.div
            variants={itemFadeUp}
            className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <Link
              to="/career-engine/start"
              className="text-sm h-12 px-8 flex items-center justify-center gap-3 text-white font-bold rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02]"
              aria-label="Take the 3-minute Arzon readiness assessment"
              onClick={onPrimaryCta}
            >
              <span className="text-white font-bold">{ctaPending ? "Opening…" : t.cta}</span>
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
              ✓ 3 minutes · Free · No login · Instant fit score
            </p>
            <p className="text-xs text-[#64748B] font-medium">
              Available in English, Hindi & Telugu
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-300 bg-amber-50 text-[#78350F] text-xs font-bold">
              <span className="h-2 w-2 rounded-full bg-amber-600 animate-pulse" />
              <span className="text-[#78350F] font-bold">Admissions Open — Closing Soon</span>
            </div>

            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Next Intake
              </p>
              <h2 className="font-serif text-3xl font-bold text-[#0F172A] mt-1">August Cohort</h2>
            </div>

            <p className="text-xs text-[#475569] leading-relaxed font-medium">
              Cohort capacity is capped to maintain live mentor-to-student ratios. Reserve your seat
              early to secure current pricing.
            </p>

            <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  Cohort Starts
                </span>
                <span className="font-serif italic text-base font-bold text-[#8A6D1F]">
                  12 August 2026
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-[#64748B]">Status</span>
                <span className="font-bold text-emerald-700">Seat Reservation Active</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Proof Partners Banner */}
      <div className="mt-16 border-t border-slate-200 pt-6">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-center gap-8 text-xs text-[#64748B]">
          <span className="font-mono font-bold uppercase tracking-wider text-[#475569]">
            Partners in Workforce Readiness
          </span>
          <img src={taskImg} alt="TASK" className="h-6 w-auto opacity-90" />
          <div className="flex items-center gap-1.5 font-bold text-[#0F172A]">
            <BadgeCheck className="h-4 w-4 text-[#2563EB]" />
            <span className="text-[#0F172A]">ISO 9001:2015</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-[#0F172A]">
            <Landmark className="h-4 w-4 text-[#2563EB]" />
            <span className="text-[#0F172A]">MSME Registered</span>
          </div>
        </div>
      </div>
    </section>
  );
}
