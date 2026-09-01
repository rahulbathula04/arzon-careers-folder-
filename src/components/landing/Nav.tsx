import { memo, useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ExternalLink, Menu, X, MessageCircle, ArrowRight, ShieldCheck } from "lucide-react";
import arzonIcon from "@/assets/arzon-icon.webp";
import { getScrollRoot } from "@/lib/scroll";
import { GOOGLE_FORM_URL, waLink } from "./constants";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { TRANSITION_PRESETS } from "../motion/motion-tokens";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/healthcare-careers", label: "Careers" },
  { to: "/healthcare-jobs-for-freshers", label: "Jobs" },
  { to: "/courses", label: "Programs" },
  { to: "/pricing", label: "Pricing" },
  { to: "/healthcare-career-workshop", label: "Free Workshop", badge: "Live" },
  { to: "/why-arzon", label: "300+ JDs" },
] as const;

function pathIsActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

function NavInner() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
  }, [location.pathname]);

  return (
    <>
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
                alt=""
                width={28}
                height={28}
                loading="eager"
                decoding="async"
                className="h-full w-full object-contain"
              />
            </motion.div>
            <div className="leading-none">
              <p className="font-mono text-xs font-bold tracking-[0.24em] text-slate-50">ARZON</p>
              <p className="hidden xs:block font-mono text-[8px] font-bold tracking-[0.32em] text-teal-400">
                GLOBAL
              </p>
            </div>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-5 lg:gap-6 md:flex">
            {NAV_LINKS.map((link) => {
              const active = pathIsActive(location.pathname, link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={active ? "page" : undefined}
                  className="text-xs font-mono font-semibold transition-colors relative py-1 group inline-flex items-center gap-1.5"
                  style={{ color: active ? "#5EEAD4" : "#F8FAFC" }}
                >
                  <span className="group-hover:!text-teal-300 transition-colors">{link.label}</span>
                  {"badge" in link && link.badge && (
                    <span
                      className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider"
                      style={{
                        color: "#5EEAD4",
                        backgroundColor: "rgba(20, 184, 166, 0.2)",
                        border: "1px solid rgba(45, 212, 191, 0.4)",
                      }}
                    >
                      {link.badge}
                    </span>
                  )}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400 rounded-full transition-transform origin-left ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <motion.a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={shouldReduceMotion ? undefined : { scale: 1.03, y: -1 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              className="inline-flex h-9 items-center justify-center rounded-xl bg-gradient-to-r from-teal-500 to-sky-500 px-3.5 sm:px-4 text-xs font-bold text-slate-950 hover:from-teal-400 hover:to-sky-400 shadow-lg shadow-teal-500/20 transition-all cursor-pointer shrink-0"
            >
              <span>Apply Now</span>
              <ExternalLink className="ml-1 h-3 w-3 text-slate-950" />
            </motion.a>

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
              className="relative w-full bg-[#0B1325] border-t border-slate-800 rounded-t-3xl p-6 space-y-6 shadow-2xl z-10 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-teal-400 motion-safe:animate-pulse" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal-400">
                    Navigation Menu
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-1.5">
                {NAV_LINKS.map((link) => {
                  const active = pathIsActive(location.pathname, link.to);
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between h-12 px-4 rounded-xl text-sm font-bold transition-colors ${
                        active
                          ? "bg-teal-950/50 !text-teal-300"
                          : "!text-slate-100 hover:!text-teal-300 hover:bg-slate-800/60"
                      }`}
                      style={{ color: active ? "#5EEAD4" : "#F8FAFC" }}
                    >
                      <span className="flex items-center gap-2">
                        <span>{link.label}</span>
                        {"badge" in link && link.badge && (
                          <span
                            className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase"
                            style={{
                              color: "#5EEAD4",
                              backgroundColor: "rgba(20, 184, 166, 0.2)",
                              border: "1px solid rgba(45, 212, 191, 0.4)",
                            }}
                          >
                            {link.badge}
                          </span>
                        )}
                      </span>
                      <ArrowRight className="h-4 w-4 text-slate-400" />
                    </Link>
                  );
                })}
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-800/80">
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="h-12 w-full inline-flex items-center justify-center gap-2 text-sm font-extrabold text-slate-950 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 hover:from-teal-300 hover:to-sky-300 shadow-lg shadow-teal-500/25 transition-all"
                >
                  <span>Apply for Next Cohort</span>
                  <ExternalLink className="h-4 w-4" />
                </a>

                <a
                  href={waLink(
                    "Hi Arzon Team, I would like guidance on matching my healthcare degree to a career role.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="h-12 w-full inline-flex items-center justify-center gap-2 text-sm font-bold text-emerald-300 rounded-xl bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/40 transition-all"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 pt-1 text-[11px] font-mono text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5 text-teal-400" />
                <span>ISO 9001:2015 · MSME Registered · Govt. Aligned</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export const Nav = memo(NavInner);
