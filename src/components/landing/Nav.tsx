import { memo, useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { 
  Menu, 
  X, 
  MessageCircle, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  GraduationCap, 
  Compass, 
  BookOpen, 
  Calculator, 
  ChevronDown,
  Calendar,
  Star,
  Users,
  Award,
  TrendingUp,
  Radio,
  Briefcase,
  Layers,
  Zap
} from "lucide-react";
import arzonIcon from "@/assets/arzon-icon.webp";
import { getScrollRoot } from "@/lib/scroll";
import { waLink } from "./constants";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export interface NavChildItem {
  to: string;
  label: string;
  desc?: string;
  badge?: string;
  icon?: any;
  highlight?: boolean;
}

export interface NavLinkItem {
  to: string;
  label: string;
  badge?: string;
  isEvent?: boolean;
  children?: NavChildItem[];
}

const NAV_NAVIGATION_STRUCTURE: NavLinkItem[] = [
  { to: "/", label: "Home" },
  {
    to: "/students/4th-year",
    label: "Students",
    children: [
      { 
        to: "/students/1st-2nd-year", 
        label: "1st & 2nd Year", 
        desc: "Zero-pressure career exploration & foundational guidance",
        icon: GraduationCap,
      },
      { 
        to: "/students/3rd-year", 
        label: "3rd Year", 
        desc: "12-month advance preparation & skill mapping",
        icon: TrendingUp,
      },
      { 
        to: "/students/4th-year", 
        label: "4th / Final Year", 
        desc: "Pre-graduation role readiness & direct hiring target",
        icon: Award,
      },
      { 
        to: "/students/graduates", 
        label: "Recent Graduates", 
        desc: "Fast-track gap elimination & job placement target",
        icon: Users,
      },
    ],
  },
  {
    to: "/healthcare-career-workshop",
    label: "Industry Connect Event",
    badge: "LIVE",
    isEvent: true,
    children: [
      {
        to: "/healthcare-career-workshop",
        label: "B.Pharm Career Intelligence 2026",
        desc: "Live 75-minute healthcare hiring & role breakdown for pharmacy candidates",
        badge: "FREE SEAT",
        icon: Radio,
        highlight: true,
      },
      {
        to: "/healthcare-career-workshop#career-paths",
        label: "15+ Healthcare Career Pathways",
        desc: "Compare Pharmacovigilance, CDM, Medical Coding, RA & Healthcare Analytics",
        icon: Compass,
      },
      {
        to: "/healthcare-career-workshop#reviews",
        label: "Verified Candidate Reviews",
        desc: "440+ Google Business Profile candidate reviews and outcomes",
        badge: "4.9★",
        icon: Star,
      },
      {
        to: "/career-engine/start",
        label: "60-Second Career Role Diagnostic",
        desc: "Evaluate candidate role compatibility based on degree and skills",
        badge: "DIAGNOSTIC",
        icon: Sparkles,
      },
    ],
  },
  { to: "/roles", label: "Roles" },
  { to: "/degrees", label: "Degrees" },
  { to: "/training", label: "Training" },
  { to: "/internships", label: "Internships" },
  {
    to: "/tools/cost-calculator",
    label: "Tools & Research",
    children: [
      {
        to: "/tools/cost-calculator",
        label: "Cost Calculator",
        desc: "Calculate training costs and entry-level salary benchmarks",
        icon: Calculator,
      },
      {
        to: "/research",
        label: "Research Hub",
        desc: "Healthcare hiring market data and research reports",
        icon: BookOpen,
      },
      {
        to: "/blog",
        label: "Industry Blog",
        desc: "Role guides and healthcare industry updates",
        icon: BookOpen,
      },
    ],
  },
];

function pathIsActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

function NavInner() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const root = getScrollRoot();
    const onScroll = () => {
      const top = root ? root.scrollTop : window.scrollY;
      setScrolled(top > 10);
    };
    onScroll();
    (root ?? window).addEventListener("scroll", onScroll, { passive: true });
    return () => (root ?? window).removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  return (
    <>
      {/* Top Micro Announcement Strip for Healthcare Industry Connect Event */}
      <div className="bg-[#070D1B] border-b border-teal-500/20 py-1 px-4 text-center text-xs font-sans text-stone-300 hidden md:flex items-center justify-center gap-2 z-50 relative">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 font-mono text-[10px] font-bold uppercase tracking-wide">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 motion-safe:animate-ping" />
          LIVE EVENT
        </span>
        <span className="font-medium text-stone-200">
          Healthcare Industry Connect: B.Pharm Career Intelligence 2026
        </span>
        <span className="text-stone-400 font-mono text-[11px]">· Live Working Session</span>
        <Link
          to="/healthcare-career-workshop"
          className="font-bold text-amber-300 hover:text-amber-200 underline decoration-amber-500/50 hover:decoration-amber-300 transition-colors ml-1 inline-flex items-center gap-1"
        >
          <span>Reserve Free Seat</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <motion.header
        initial={false}
        className={`fixed top-0 inset-x-0 z-50 border-b backdrop-blur-xl transition-colors ${
          scrolled
            ? "bg-[#0B1325]/95 border-slate-800/80 shadow-2xl"
            : "bg-[#0B1325]/90 border-slate-800/50 shadow-lg"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          {/* Arzon Brand Identity */}
          <Link
            to="/"
            aria-label="Arzon Global - go to home"
            className="flex shrink-0 items-center gap-2.5 group cursor-pointer"
          >
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { scale: 1.05, rotate: 2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
              className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl bg-slate-900 ring-1 ring-teal-500/40 group-hover:ring-teal-400 transition-all"
            >
              <img
                src={arzonIcon}
                alt="Arzon Global Icon"
                width={28}
                height={28}
                loading="eager"
                decoding="async"
                className="h-full w-full object-contain"
              />
            </motion.div>
            <div className="leading-none">
              <p className="font-mono text-xs font-bold tracking-[0.24em] text-slate-50" style={{ color: "#F8FAFC" }}>ARZON</p>
              <p className="hidden xs:block font-mono text-[8px] font-bold tracking-[0.32em] text-teal-400" style={{ color: "#2DD4BF" }}>
                GLOBAL
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main navigation" className="hidden items-center gap-3 lg:gap-4 md:flex">
            {NAV_NAVIGATION_STRUCTURE.map((link) => {
              const active = pathIsActive(location.pathname, link.to);
              const hasChildren = Boolean(link.children && link.children.length > 0);

              if (hasChildren) {
                return (
                  <div
                    key={link.to}
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      type="button"
                      className={`text-xs font-mono font-semibold transition-colors relative py-1 inline-flex items-center gap-1 cursor-pointer ${
                        link.isEvent
                          ? "text-amber-300 hover:text-amber-200"
                          : ""
                      }`}
                      style={{ color: active ? "#5EEAD4" : link.isEvent ? "#FCD34D" : "#F8FAFC" }}
                    >
                      <span className="group-hover:!text-teal-300 transition-colors flex items-center gap-1.5">
                        {link.isEvent && (
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 motion-safe:animate-pulse" />
                        )}
                        {link.label}
                      </span>
                      {link.badge && (
                        <span className="px-1.5 py-0.2 rounded-full bg-amber-400/20 text-amber-300 text-[9px] font-extrabold tracking-wider uppercase border border-amber-400/30">
                          {link.badge}
                        </span>
                      )}
                      <ChevronDown className="h-3 w-3 text-stone-400 group-hover:text-teal-300 transition-transform group-hover:rotate-180" />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.15 }}
                          className={`absolute left-0 top-full pt-2 z-50 ${
                            link.isEvent ? "w-80 sm:w-96" : "w-72 sm:w-80"
                          }`}
                        >
                          <div className="rounded-2xl border border-slate-800 bg-[#0B1325]/98 backdrop-blur-2xl p-3 shadow-2xl space-y-1.5">
                            {/* Rich Event Banner Card inside Event Dropdown */}
                            {link.isEvent && (
                              <div className="mb-2 p-3 rounded-xl bg-gradient-to-br from-amber-500/15 via-teal-500/10 to-slate-950 border border-amber-400/30">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider">
                                    <Radio className="w-3 h-3 text-amber-400 motion-safe:animate-pulse" />
                                    Live Session
                                  </span>
                                  <span className="text-[10px] font-mono text-slate-400">75 Mins</span>
                                </div>
                                <p className="font-sans text-xs font-extrabold text-slate-100 leading-snug">
                                  Healthcare Industry Connect 2026
                                </p>
                                <p className="font-sans text-[11px] text-slate-400 mt-0.5">
                                  Live market analysis & 6-step hiring roadmap for pharmacy candidates.
                                </p>
                              </div>
                            )}

                            {link.children?.map((child) => {
                              const IconComponent = child.icon || Compass;
                              return (
                                <Link
                                  key={child.to}
                                  to={child.to}
                                  className={`flex items-start gap-3 p-2.5 rounded-xl transition-all group/item ${
                                    child.highlight
                                      ? "bg-teal-950/40 border border-teal-500/30 hover:bg-teal-900/50"
                                      : "hover:bg-slate-800/80"
                                  }`}
                                >
                                  <div className={`p-1.5 rounded-lg shrink-0 ${
                                    child.highlight
                                      ? "bg-teal-500/20 text-teal-300"
                                      : "bg-slate-800 text-slate-400 group-hover/item:text-teal-300 group-hover/item:bg-slate-700"
                                  }`}>
                                    <IconComponent className="w-4 h-4" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-1">
                                      <span
                                        className="font-sans text-xs font-bold text-slate-100 group-hover/item:text-teal-300"
                                        style={{ color: "#F8FAFC" }}
                                      >
                                        {child.label}
                                      </span>
                                      {child.badge && (
                                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-extrabold uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 shrink-0">
                                          {child.badge}
                                        </span>
                                      )}
                                    </div>
                                    {child.desc && (
                                      <p className="text-[10px] text-stone-400 font-sans leading-tight mt-0.5 line-clamp-2">
                                        {child.desc}
                                      </p>
                                    )}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={active ? "page" : undefined}
                  className="text-xs font-mono font-semibold transition-colors relative py-1 group inline-flex items-center gap-1.5"
                  style={{ color: active ? "#5EEAD4" : "#F8FAFC" }}
                >
                  <span className="group-hover:!text-teal-300 transition-colors">{link.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 rounded-full transition-transform origin-left ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/healthcare-career-workshop"
              className="hidden sm:inline-flex h-9 items-center justify-center rounded-xl border border-amber-400/40 bg-gradient-to-r from-amber-400/15 via-teal-500/10 to-amber-400/15 px-3.5 text-xs font-mono font-bold text-amber-300 hover:bg-amber-400/25 hover:border-amber-300 transition-all shadow-xs group/btn cursor-pointer"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 mr-1.5 motion-safe:animate-pulse" />
              <Sparkles className="h-3 w-3 mr-1 text-amber-400 group-hover/btn:rotate-12 transition-transform" />
              <span>Free Workshop</span>
            </Link>

            <Link
              to="/career-engine/start"
              className="inline-flex h-9 items-center justify-center rounded-xl bg-gradient-to-r from-teal-500 to-sky-500 px-3.5 sm:px-4 text-xs font-bold text-slate-950 hover:from-teal-400 hover:to-sky-400 transition-all shadow-md cursor-pointer"
            >
              <span>Diagnose Path</span>
              <ArrowRight className="ml-1 h-3.5 w-3.5 text-slate-950" />
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 hover:text-slate-50 transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-slate-200" />
              ) : (
                <Menu className="h-5 w-5 text-slate-200" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[60] md:hidden flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={shouldReduceMotion ? { opacity: 1 } : { y: "100%" }}
              animate={{ y: 0, opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full bg-[#0B1325] border-t border-slate-800 rounded-t-3xl p-5 sm:p-6 space-y-5 shadow-2xl z-10 max-h-[88vh] overflow-y-auto touch-pan-y"
              style={{ paddingBottom: "max(1.5rem, calc(1.25rem + env(safe-area-inset-bottom)))" }}
            >
              {/* Top Swipe Handle */}
              <div className="absolute top-3 inset-x-0 flex justify-center pointer-events-none">
                <div className="h-1 w-10 rounded-full bg-slate-600" />
              </div>

              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 pt-1">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-teal-400 motion-safe:animate-pulse" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal-400">
                    ARZON CAREER NAVIGATION
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Featured Event Card Banner inside Mobile Drawer */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/20 via-teal-900/30 to-slate-950 border border-amber-400/40">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 font-mono text-[10px] font-bold uppercase">
                    <Radio className="w-3 h-3 text-amber-400 motion-safe:animate-pulse" />
                    LIVE SESSION
                  </span>
                  <span className="text-[11px] font-mono text-teal-300 font-bold">Free Workshop</span>
                </div>
                <h4 className="font-sans text-sm font-extrabold text-slate-100" style={{ color: "#F8FAFC" }}>
                  Healthcare Industry Connect 2026
                </h4>
                <p className="font-sans text-xs text-slate-300 mt-1">
                  B.Pharm, M.Pharm & Pharm.D live market analysis, hiring roles, and career roadmap.
                </p>
                <Link
                  to="/healthcare-career-workshop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-3 w-full h-10 inline-flex items-center justify-center gap-2 text-xs font-mono font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm"
                >
                  <span>Reserve Free Seat</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Mobile Links List */}
              <div className="space-y-2">
                {NAV_NAVIGATION_STRUCTURE.map((link) => {
                  const active = pathIsActive(location.pathname, link.to);
                  const hasChildren = Boolean(link.children && link.children.length > 0);

                  if (hasChildren) {
                    return (
                      <div key={link.to} className="space-y-1 bg-slate-900/40 p-2.5 rounded-2xl border border-slate-800/80">
                        <div className="px-2 pt-1 pb-1.5 font-mono text-[11px] font-bold text-teal-400 uppercase tracking-wider flex items-center justify-between">
                          <span>{link.label}</span>
                          {link.badge && (
                            <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[9px]">
                              {link.badge}
                            </span>
                          )}
                        </div>
                        {link.children?.map((child) => {
                          const IconComponent = child.icon || Compass;
                          return (
                            <Link
                              key={child.to}
                              to={child.to}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center justify-between p-2.5 rounded-xl text-xs font-bold text-slate-200 hover:text-teal-300 hover:bg-slate-800/70 transition-colors"
                              style={{ color: "#F8FAFC" }}
                            >
                              <div className="flex items-center gap-2.5">
                                <IconComponent className="w-4 h-4 text-teal-400 shrink-0" />
                                <span>{child.label}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                {child.badge && (
                                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-extrabold uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30">
                                    {child.badge}
                                  </span>
                                )}
                                <ArrowRight className="h-3.5 w-3.5 text-stone-500" />
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between h-12 px-4 rounded-xl text-sm font-bold transition-colors ${
                        active
                          ? "bg-teal-950/50 !text-teal-300 border border-teal-500/30"
                          : "!text-slate-100 hover:!text-teal-300 hover:bg-slate-800/60"
                      }`}
                      style={{ color: active ? "#5EEAD4" : "#F8FAFC" }}
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="h-4 w-4 text-slate-400" />
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Action CTAs */}
              <div className="space-y-3 pt-3 border-t border-slate-800/80">
                <Link
                  to="/healthcare-career-workshop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="h-12 w-full inline-flex items-center justify-center gap-2 text-sm font-bold text-stone-950 rounded-xl bg-amber-400 hover:bg-amber-300 transition-all shadow-md"
                >
                  <Sparkles className="h-4 w-4 text-stone-950" />
                  <span>Join Free Workshop</span>
                </Link>

                <Link
                  to="/career-engine/start"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="h-11 w-full inline-flex items-center justify-center gap-2 text-xs font-bold text-teal-300 rounded-xl border border-teal-700/50 bg-teal-950/30 hover:bg-teal-950/50 transition-all"
                >
                  <Compass className="h-4 w-4 text-teal-400" />
                  <span>Diagnose Career Fit (90 sec)</span>
                </Link>

                <a
                  href={waLink(
                    "Hi Arzon Global Team, I would like guidance on matching my healthcare degree to a career role.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="h-11 w-full inline-flex items-center justify-center gap-2 text-xs font-bold text-emerald-300 rounded-xl bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-950/60 transition-all"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 pt-1 text-[11px] font-mono text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5 text-teal-400" />
                <span>ISO 9001:2015 · MSME Registered · Verifiable Credentials</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export const Nav = memo(NavInner);
