import { Link, useRouter } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowRight, Landmark, ShieldCheck, BadgeCheck, Tv, Loader2, Globe } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { LINKS } from "./constants";
import { trackEvent } from "@/lib/analytics";
import { markReadinessStarted, getReadinessSessionId } from "@/lib/readinessJourney";
import taskImg from "@/assets/proof/task-partnership.jpg";

/**
 * Hero — Premium UI Rebuild with Framer Motion and Glassmorphism.
 * Locked palette: Obsidian #0a0c10, sky-300 accent, brand gold CTA, white/10 chrome.
 */
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
    // Mint session id + mark "started" in the journey table. Fire-and-forget.
    void markReadinessStarted();
    trackEvent("hero_primary_cta_click", {
      surface: "home-hero",
      target: "career-engine-test",
    });
    trackEvent("readiness_cta_click", {
      surface: "home-hero",
      session_id: getReadinessSessionId(),
    });
    // Re-enable after navigation settles or after a short timeout fallback.
    const unsub = router.subscribe("onResolved", () => {
      setCtaPending(false);
      unsub();
    });
    window.setTimeout(() => setCtaPending(false), 4000);
  };

  const trustChips: { icon: typeof Landmark; label: string }[] = [
    { icon: Landmark, label: "TASK · Govt of Telangana" },
    { icon: ShieldCheck, label: "ISO 9001" },
    { icon: BadgeCheck, label: "MCA Registered" },
  ];

  const translations = {
    en: {
      h1_1: "Become",
      h1_2: "industry ready",
      h1_3: "for India's next decade.",
      p: "Land your first industry role in 12 weeks. Take the free 3-minute test to see which programme fits you.",
      cta: "Get my industry-fit score"
    },
    hi: {
      h1_1: "भारत के अगले दशक के लिए",
      h1_2: "इंडस्ट्री-रेडी",
      h1_3: "बनें।",
      p: "12 हफ्तों में अपनी पहली जॉब पाएं। यह जानने के लिए कि कौन सा प्रोग्राम आपके लिए सही है, 3 मिनट का फ्री टेस्ट लें।",
      cta: "अपना इंडस्ट्री-फिट स्कोर प्राप्त करें"
    },
    te: {
      h1_1: "భారతదేశ తదుపరి దశాబ్దానికి",
      h1_2: "ఇండస్ట్రీ-రెడీ",
      h1_3: "అవ్వండి.",
      p: "12 వారాల్లో మీ మొదటి జాబ్ పొందండి. మీకు ఏ ప్రోగ్రామ్ సరిపోతుందో తెలుసుకోవడానికి 3 నిమిషాల ఉచిత పరీక్ష రాయండి.",
      cta: "నా ఇండస్ట్రీ-ఫిట్ స్కోర్ పొందండి"
    }
  };

  const t = translations[lang];
  
  // Animation variants
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };
  const itemFadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="tone-dark relative isolate min-h-[90vh] overflow-hidden bg-[#0a0c10] text-slate-50 flex flex-col justify-center"
    >
      {/* Immersive animated background mesh - Algorithmic feel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <motion.div 
          animate={{ 
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 -top-40 h-[1000px] w-full motion-reduce:animate-none"
          style={{
            background: "radial-gradient(100% 100% at 50% 0%, rgba(125,211,252,0.15) 0%, rgba(59,130,246,0.05) 50%, transparent 100%)",
            filter: "blur(60px)"
          }}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[url('/noise.png')] opacity-25 mix-blend-overlay" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:pb-28 lg:pt-24">
        {/* Left — content */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="lg:col-span-7 lg:pr-12"
        >
          
          {/* BHARAT UX: Language Toggle - Glassmorphism */}
          <motion.div variants={itemFadeUp} className="mb-8 inline-flex items-center gap-2 rounded-full glass-panel px-2 py-1.5">
            <Globe className="ml-2 h-4 w-4 text-white/50" />
            {(["en", "hi", "te"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`relative rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  lang === l
                    ? "text-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {lang === l && (
                  <motion.div 
                    layoutId="active-lang" 
                    className="absolute inset-0 rounded-full bg-white" 
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{l === "en" ? "ENG" : l === "hi" ? "हिंदी" : "తెలుగు"}</span>
              </button>
            ))}
          </motion.div>

          {/* Trust chip row - Glassmorphism */}
          <motion.ul variants={itemFadeUp} className="flex flex-wrap gap-3">
            {trustChips.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-2 font-mono text-micro uppercase tracking-[0.18em] text-slate-100/90 shadow-sm hover-glass-glow cursor-default"
              >
                <Icon aria-hidden className="h-4 w-4 text-accent-glow" />
                <span>{label}</span>
              </li>
            ))}
          </motion.ul>

          <motion.h1
            variants={itemFadeUp}
            id="hero-heading"
            className="mt-8 text-slate-50 drop-shadow-xl"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              lineHeight: 1.05,
              textWrap: "balance" as any,
              overflowWrap: "anywhere",
              hyphens: "auto",
            }}
          >
            {t.h1_1}{" "}
            <span
              className="text-[color:var(--brand-gold,#d4b76a)] italic inline-block"
              style={{ fontFamily: "var(--font-serif, var(--font-display))" }}
            >
              {t.h1_2}
            </span>{" "}
            {t.h1_3}
          </motion.h1>

          <motion.p
            variants={itemFadeUp}
            className="mt-6 max-w-2xl text-slate-100/80 drop-shadow-sm"
            style={{
              fontSize: "clamp(1.1rem, 1.5vw, 1.25rem)",
              lineHeight: 1.6,
              textWrap: "pretty" as any,
            }}
          >
            {t.p}
          </motion.p>

          <motion.div variants={itemFadeUp} className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            {/* Magnetic Button Wrapper */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/career-engine/start"
                className="btn btn-gold btn-xl flex w-full items-center justify-center gap-3 shadow-[0_0_40px_-10px_rgba(212,183,106,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-focus-accent aria-disabled:cursor-wait aria-disabled:opacity-80 sm:w-auto px-8"
                aria-label="Take the 3-minute Arzon readiness assessment"
                data-testid="hero-primary-cta"
                onClick={onPrimaryCta}
                aria-disabled={ctaPending || undefined}
                tabIndex={ctaPending ? -1 : undefined}
                aria-busy={ctaPending || undefined}
              >
                <span className="text-[1.05rem]">{ctaPending ? "Opening…" : t.cta}</span>
                <span data-arrow aria-hidden>
                  {ctaPending ? (
                    <Loader2
                      focusable="false"
                      className="h-5 w-5 motion-safe:animate-spin"
                      strokeWidth={2.5}
                    />
                  ) : (
                    <ArrowRight focusable="false" className="h-5 w-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                  )}
                </span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={itemFadeUp} className="mt-8 flex flex-col gap-3">
            <p className="font-mono text-micro font-medium uppercase tracking-[0.16em] text-slate-100/60 flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400 motion-safe:animate-pulse" />
              3 min · free · no login · instant score
            </p>
            <p className="font-mono text-micro font-medium uppercase tracking-[0.16em] text-accent-glow/90">
              ✓ Available in English, Hindi & Telugu
            </p>
          </motion.div>
        </motion.div>

        {/* Right — live status card (Glassmorphism Rebuild) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
          className="hidden lg:block lg:col-span-5"
        >
          <div className="relative group">
            {/* Glowing orb behind the card */}
            <div className="absolute -inset-1 rounded-[2.2rem] bg-gradient-to-r from-accent-glow/30 to-brand-gold/30 blur-2xl opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 motion-safe:animate-tilt" />
            
            <div className="relative overflow-hidden rounded-[2rem] glass-panel-deep p-8 shadow-2xl transition-all duration-300 group-hover:border-white/20">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
              />
              
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-bl-[100px] pointer-events-none" />

              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                </span>
                <span className="font-mono text-micro font-semibold uppercase tracking-[0.18em] text-white/70">
                  Admissions Open
                </span>
              </div>
              <p className="mt-6 font-display text-h2 text-white">August Intake</p>
              <p className="mt-3 text-base text-white/70 leading-relaxed">
                Seats are filling fast. Register your intent now to secure a spot before batch limit
                is reached.
              </p>
              
              <div className="mt-8 flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/5 backdrop-blur-md">
                 <div className="flex flex-col">
                    <span className="text-xs text-white/50 uppercase tracking-wider font-mono">Next Cohort</span>
                    <span className="text-base text-white font-semibold mt-1">12 Aug 2026</span>
                 </div>
                 <BadgeCheck className="h-8 w-8 text-brand-gold opacity-80" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Proof rail — glassmorphism upgrade */}
      <div className="relative z-10 border-t border-white/10 glass-panel py-5 rounded-t-[2.5rem] mt-auto mx-4 sm:mx-8 mb-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-5 opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:px-6 lg:px-8">
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.18em] text-white/80">
            Partners in readiness
          </p>
          <img src={taskImg} alt="TASK" className="h-7 w-auto mix-blend-screen" />
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-teal-300" />
            <span className="font-mono text-micro font-medium uppercase tracking-wider text-teal-100">
              ISO 9001:2015
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Landmark className="h-5 w-5 text-slate-300" />
            <span className="font-mono text-micro font-medium uppercase tracking-wider text-slate-200">
              MSME Regd.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
