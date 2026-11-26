import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, MessageCircle, Search } from "lucide-react";
import { GlobalSearchModal } from "./GlobalSearchModal";
import { openCounsellorModal } from "./CounsellorLeadModal";

interface NavFlyoutCategory {
  title: string;
  to: string;
  description: string;
  sublinks: Array<{ label: string; to: string }>;
}

interface NavFlyoutSpecializations {
  title: string;
  items: Array<{ label: string; to: string }>;
}

interface NavFlyoutSpotlight {
  badge: string;
  title: string;
  description: string;
  ctaText: string;
  to: string;
}

interface NavItemConfig {
  key: string;
  label: string;
  to: string;
  description: string;
  flyout: {
    category: NavFlyoutCategory;
    specializations: NavFlyoutSpecializations;
    spotlight: NavFlyoutSpotlight;
  };
}

/**
 * Curated Minimal 5-Pillar Navigation Hierarchy
 * Designed for instant clarity, zero awkward word-breaks, and Apple-grade restraint.
 */
const NAV_ITEMS: readonly NavItemConfig[] = [
  {
    key: "platform",
    label: "Platform",
    to: "/",
    description: "Understand the Arzon Talent Intelligence Engine",
    flyout: {
      category: {
        title: "Arzon Talent Intelligence Engine",
        to: "/",
        description: "Connect industry requirements, candidate profiles and practical assessment evidence.",
        sublinks: [
          { label: "How Arzon Works", to: "/#how-it-works" },
          { label: "Clinical Simulation Engine", to: "/#clinical-simulation" },
          { label: "Candidate Capability Dossier", to: "/#candidate-report" },
        ],
      },
      specializations: {
        title: "Platform capabilities",
        items: [
          { label: "Industry Intelligence", to: "/#industry-intelligence" },
          { label: "Candidate Profiling", to: "/career-engine/start" },
          { label: "Practical Assessment", to: "/career-assessment" },
          { label: "Capability Development", to: "/courses" },
        ],
      },
      spotlight: {
        badge: "Explore the platform",
        title: "See how the workflow connects",
        description: "Start with a role, build a profile and understand the evidence behind your next step.",
        ctaText: "Explore the platform",
        to: "/#how-it-works",
      },
    },
  },
  {
    key: "candidates",
    label: "For Candidates",
    to: "/career-engine/start",
    description: "Explore healthcare careers and understand your role alignment",
    flyout: {
      category: {
        title: "Start with your profile",
        to: "/career-engine/start",
        description: "Share your education, experience and the career areas you want to explore.",
        sublinks: [
          { label: "Build My Profile", to: "/career-engine/start" },
          { label: "Career Assessment", to: "/career-assessment" },
          { label: "Healthcare Careers", to: "/careers" },
        ],
      },
      specializations: {
        title: "Candidate resources",
        items: [
          { label: "Degree and Role Exploration", to: "/#degree-alignment" },
          { label: "Candidate Report", to: "/#candidate-report" },
          { label: "Healthcare Jobs for Freshers", to: "/healthcare-jobs-for-freshers" },
          { label: "Learning Programmes", to: "/courses" },
        ],
      },
      spotlight: {
        badge: "Start here",
        title: "Understand your next step",
        description: "Create a profile before deciding which skills or programmes may be relevant.",
        ctaText: "Build My Profile",
        to: "/career-engine/start",
      },
    },
  },
  {
    key: "career-paths",
    label: "Career Paths",
    to: "/careers",
    description: "Explore healthcare and life-sciences role families",
    flyout: {
      category: {
        title: "Explore healthcare roles",
        to: "/careers",
        description: "Review role responsibilities and the requirements employers publish.",
        sublinks: [
          { label: "Pharmacovigilance", to: "/pv-associate" },
          { label: "Clinical Data Management", to: "/courses/clinical-data-management" },
          { label: "Medical Coding", to: "/courses/medical-coding" },
        ],
      },
      specializations: {
        title: "More role areas",
        items: [
          { label: "Regulatory Affairs", to: "/courses/regulatory-affairs" },
          { label: "Clinical SAS", to: "/courses/sas-clinical" },
          { label: "Clinical Research", to: "/careers" },
          { label: "All Healthcare Careers", to: "/careers" },
        ],
      },
      spotlight: {
        badge: "Initial assessment focus",
        title: "Pharmacovigilance",
        description: "Explore the first role family covered by Arzon's clinical simulation work.",
        ctaText: "Explore Pharmacovigilance",
        to: "/pv-associate",
      },
    },
  },
  {
    key: "industry",
    label: "Industry Research",
    to: "/resources",
    description: "Understand how Arzon researches role requirements",
    flyout: {
      category: {
        title: "Research and methodology",
        to: "/resources",
        description: "Read about job-description research, employer input and role competency frameworks.",
        sublinks: [
          { label: "Research & Insights", to: "/resources" },
          { label: "Role Profiles", to: "/roles" },
          { label: "Industry Employers", to: "/industry/employers" },
        ],
      },
      specializations: {
        title: "What research covers",
        items: [
          { label: "Qualifications and Experience", to: "/resources" },
          { label: "Skills and Responsibilities", to: "/resources" },
          { label: "Role-specific Competencies", to: "/resources" },
          { label: "Research Limitations", to: "/resources" },
        ],
      },
      spotlight: {
        badge: "Transparent evidence",
        title: "How role benchmarks are formed",
        description: "Published findings should identify the research window, source coverage and limitations.",
        ctaText: "Read the methodology",
        to: "/resources",
      },
    },
  },
  {
    key: "employers",
    label: "For Employers",
    to: "/recruiters",
    description: "Assess early-career capabilities with structured evidence",
    flyout: {
      category: {
        title: "Employer overview",
        to: "/recruiters",
        description: "Explore candidate assessment, practical work samples and employer review.",
        sublinks: [
          { label: "Employer Overview", to: "/recruiters" },
          { label: "Candidate Dossiers", to: "/recruiters" },
          { label: "Talk to Arzon", to: "/contact" },
        ],
      },
      specializations: {
        title: "Ways to engage",
        items: [
          { label: "Role Requirement Review", to: "/recruiters" },
          { label: "Candidate Assessment", to: "/recruiters" },
          { label: "College and TPO Engagement", to: "/tpos" },
          { label: "Industry Network", to: "/industry-network" },
        ],
      },
      spotlight: {
        badge: "For hiring teams",
        title: "Review the assessment approach",
        description: "See how practical tasks and candidate evidence can support your evaluation process.",
        ctaText: "Explore employer access",
        to: "/recruiters",
      },
    },
  },
] as const;

const SECONDARY_ITEMS: Array<{ label: string; to: any }> = [
  { label: "About Arzon", to: "/about" },
  { label: "Programmes", to: "/courses" },
  { label: "Student Reviews", to: "/reviews" },
  { label: "Workshops", to: "/workshop" },
  { label: "Credential Verification", to: "/verify" },
  { label: "Contact", to: "/contact" },
] as const;



export function ArzonHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  const handleMouseEnter = (key: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMenu(key);
  };

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const handleNavClose = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setActiveMenu(null);
  };

  useEffect(() => {
    setMobileOpen(false);
    handleNavClose();
  }, [location.pathname]);

  useEffect(() => {
    const root = document.getElementById("app-scroll-root");
    if (!root) return;
    const onScroll = () => setScrolled(root.scrollTop > 15);
    root.addEventListener("scroll", onScroll, { passive: true });
    return () => root.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        handleNavClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const scrollRoot = document.getElementById("app-scroll-root");
    const originalRootOverflow = scrollRoot ? scrollRoot.style.overflow : "";
    if (scrollRoot) scrollRoot.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      if (scrollRoot) scrollRoot.style.overflow = originalRootOverflow;
    };
  }, [mobileOpen]);

  const activeItem = NAV_ITEMS.find((item) => item.key === activeMenu);

  return (
    <>
      <header
        onMouseLeave={handleMouseLeave}
        className={[
          "arzon-site-header nav-shell sticky top-0 z-50 h-[48px] border-b transition-all duration-200 tone-light",
          scrolled
            ? "bg-white/90 backdrop-blur-xl backdrop-saturate-150 border-black/[0.08] shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
            : "bg-white/80 backdrop-blur-xl backdrop-saturate-150 border-black/[0.05]",
        ].join(" ")}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
          {/* Apple-style Brand Mark */}
          <Link
            to="/"
            aria-label="Arzon Global home"
            data-testid="arzon-global-logo"
            onClick={handleNavClose}
            className="flex items-center gap-2 shrink-0 py-1 rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-arzon-teal transition-opacity hover:opacity-75 select-none"
          >
            <img
              src="/brand/arzon-icon.webp"
              alt="Arzon Global"
              width={20}
              height={20}
              className="h-5 w-5 rounded-[4px] object-contain select-none shrink-0"
              loading="eager"
              draggable={false}
            />
            <span className="text-[11px] font-semibold tracking-[0.14em] text-arzon-deep-teal whitespace-nowrap">
              ARZON GLOBAL
            </span>
          </Link>

          {/* Desktop Nav Links (Clean, Minimal, Curated SF Pro Style) */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2"
          >
            {NAV_ITEMS.map((item) => {
              const isCurrentRoute =
                location.pathname === item.to ||
                location.pathname.startsWith(item.to + "/");
              const isOpen = activeMenu === item.key;
              return (
                <div
                  key={item.key}
                  className="relative shrink-0"
                  onMouseEnter={() => handleMouseEnter(item.key)}
                >
                  <Link
                    to={item.to as any}
                    className={[
                      "inline-flex items-center px-3 py-1.5 text-[13px] tracking-[-0.01em] transition-all duration-150 cursor-pointer select-none rounded-full whitespace-nowrap",
                      isOpen
                        ? "text-arzon-deep-teal bg-black/[0.05] font-medium"
                        : isCurrentRoute
                        ? "text-arzon-deep-teal font-semibold bg-black/[0.03]"
                        : "text-slate-600 hover:text-slate-900 hover:bg-black/[0.03] font-normal",
                    ].join(" ")}
                    onClick={handleNavClose}
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Desktop Utility Controls (Apple Minimalist Style) */}
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 shrink-0">
            {/* Apple Spotlight Search Trigger */}
            <button
              type="button"
              onClick={() => {
                handleNavClose();
                setSearchOpen(true);
              }}
              className="inline-flex h-7 items-center gap-1.5 rounded-full bg-black/[0.03] hover:bg-black/[0.06] px-2.5 text-[11px] font-normal text-slate-500 hover:text-slate-900 transition-colors cursor-pointer select-none whitespace-nowrap"
              aria-label="Search Arzon (Cmd+K)"
            >
              <Search className="h-3 w-3 text-slate-400" />
              <span className="hidden xl:inline">Search</span>
              <kbd className="text-[10px] text-slate-400 font-sans tracking-tight">⌘K</kbd>
            </button>

            {/* Hairline Divider */}
            <div className="h-3.5 w-px bg-black/[0.08]" />

            {/* Sign in */}
            <Link
              to="/login"
              onClick={handleNavClose}
              className="inline-flex h-7 items-center px-1 text-[12px] font-normal text-slate-600 hover:text-slate-900 transition-colors whitespace-nowrap select-none"
            >
              Sign in
            </Link>

            {/* Primary CTA (Apple Blue Minimal Pill) */}
            <button
              type="button"
              onClick={() => {
                handleNavClose();
                openCounsellorModal({ source: "header_desktop" });
              }}
              data-testid="primary-career-cta"
              className="inline-flex h-[28px] items-center gap-1 rounded-full bg-arzon-teal hover:bg-arzon-deep-teal active:scale-[0.98] text-white text-[12px] font-medium px-3.5 transition-all cursor-pointer shadow-none whitespace-nowrap shrink-0 select-none"
            >
              <span>Talk to Experts</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-1 lg:hidden">
            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="grid h-8 w-8 place-items-center rounded-full text-slate-600 hover:text-arzon-deep-teal hover:bg-black/[0.04] active:scale-95 transition-transform"
              aria-label="Search Arzon"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Apple 2-Line Animated Menu Button */}
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="relative flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/[0.04] active:scale-95 transition-transform"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
            >
              <div className="relative w-4 h-3 flex items-center justify-center">
                <span
                  className={`absolute h-[1.5px] w-4 bg-[#1d1d1f] rounded-full transition-all duration-300 ease-in-out ${
                    mobileOpen ? "rotate-45 translate-y-0" : "-translate-y-[3.5px]"
                  }`}
                />
                <span
                  className={`absolute h-[1.5px] w-4 bg-[#1d1d1f] rounded-full transition-all duration-300 ease-in-out ${
                    mobileOpen ? "-rotate-45 translate-y-0" : "translate-y-[3.5px]"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Desktop Flyout Dropdown Panel */}
        {activeItem && (
          <div
            onMouseEnter={() => {
              if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
                closeTimeoutRef.current = null;
              }
            }}
            onMouseLeave={handleMouseLeave}
            className="hidden lg:block absolute top-[48px] inset-x-0 z-50 bg-white/95 backdrop-blur-2xl border-b border-black/[0.08] shadow-[0_24px_48px_rgba(0,0,0,0.06)] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-1 duration-150"
          >
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-7 grid grid-cols-12 gap-8 text-[#1d1d1f]">
              {/* Column 1: Category Overview & Sublinks */}
              <div className="col-span-4">
                <div className="text-[10px] font-bold text-slate-400 tracking-[0.08em] uppercase mb-2">
                  {activeItem.label} Overview
                </div>
                <Link
                  to={activeItem.flyout.category.to as any}
                  onClick={handleNavClose}
                  className="text-[19px] font-semibold text-arzon-deep-teal hover:text-arzon-teal tracking-tight leading-snug transition-colors block mb-1.5 group"
                >
                  <span>{activeItem.flyout.category.title}</span>
                  <ArrowRight className="h-4 w-4 inline-block ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {activeItem.flyout.category.description}
                </p>
                <div className="space-y-1 pt-2 border-t border-black/[0.06]">
                  {activeItem.flyout.category.sublinks.map((sub) => (
                    <Link
                      key={sub.to}
                      to={sub.to as any}
                      onClick={handleNavClose}
                      className="text-[12.5px] text-slate-600 hover:text-arzon-teal transition-colors py-1 flex items-center justify-between group"
                    >
                      <span>{sub.label}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-arzon-teal group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 2: Specializations & Domains */}
              <div className="col-span-4">
                <div className="text-[10px] font-bold text-slate-400 tracking-[0.08em] uppercase mb-2">
                  {activeItem.flyout.specializations.title}
                </div>
                <div className="space-y-1">
                  {activeItem.flyout.specializations.items.map((spec) => (
                    <Link
                      key={spec.label}
                      to={spec.to as any}
                      onClick={handleNavClose}
                      className="text-[12.5px] text-slate-700 hover:text-arzon-teal transition-colors py-1.5 flex items-center justify-between rounded-lg px-2.5 -mx-2.5 hover:bg-black/[0.02]"
                    >
                      <span>{spec.label}</span>
                      <ChevronRight className="h-3 w-3 text-slate-300" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 3: Apple Spotlight Card */}
              <div className="col-span-4">
                <div className="text-[10px] font-bold text-slate-400 tracking-[0.08em] uppercase mb-2">
                  Featured Focus
                </div>
                <Link
                  to={activeItem.flyout.spotlight.to as any}
                  onClick={handleNavClose}
                  className="block rounded-2xl bg-black/[0.02] border border-black/[0.05] p-5 hover:bg-black/[0.04] transition-all group"
                >
                  <span className="text-[10px] font-bold text-arzon-teal bg-blue-50 px-2 py-0.5 rounded-full inline-block mb-2.5 border border-blue-100">
                    {activeItem.flyout.spotlight.badge}
                  </span>
                  <div className="text-sm font-semibold text-arzon-deep-teal mb-1.5 group-hover:text-arzon-teal transition-colors">
                    {activeItem.flyout.spotlight.title}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {activeItem.flyout.spotlight.description}
                  </p>
                  <div className="text-xs font-semibold text-arzon-teal inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                    <span>{activeItem.flyout.spotlight.ctaText}</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop Blur Overlay */}
      {activeItem && (
        <div
          className="hidden lg:block fixed inset-0 top-[48px] bg-black/10 backdrop-blur-[1px] z-40 transition-opacity duration-200 pointer-events-auto"
          onClick={handleNavClose}
          aria-hidden="true"
        />
      )}

      {/* Apple Mobile Sheet Drawer */}
      {typeof document !== "undefined" && mobileOpen
        ? createPortal(
            <div
              className="arzon-site-mobile fixed inset-0 top-[48px] z-[100] bg-white/98 backdrop-blur-2xl lg:hidden flex flex-col motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-4 duration-300"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Menu"
            >
              <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-6">
                {/* Spotlight Search Bar */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setSearchOpen(true);
                  }}
                  className="w-full h-10 flex items-center justify-between rounded-xl bg-black/[0.04] border border-black/[0.05] px-3.5 text-left text-xs text-slate-500 active:scale-[0.99] transition-transform"
                >
                  <div className="flex items-center gap-2">
                    <Search className="h-3.5 w-3.5 text-slate-400" />
                    <span>Search roles, degrees, programmes...</span>
                  </div>
                  <kbd className="text-[10px] text-slate-400 font-sans">⌘K</kbd>
                </button>

                {/* Primary Nav Links */}
                <div className="divide-y divide-black/[0.04]">
                  {NAV_ITEMS.map((item) => {
                    const active =
                      location.pathname === item.to ||
                      location.pathname.startsWith(item.to + "/");
                    return (
                      <Link
                        key={item.to}
                        to={item.to as any}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between py-3.5 text-[18px] font-medium tracking-tight text-[#1d1d1f] hover:text-arzon-teal transition-colors"
                      >
                        <span className={active ? "text-arzon-teal font-semibold" : ""}>
                          {item.label}
                        </span>
                        <ChevronRight className="h-4 w-4 text-slate-300" />
                      </Link>
                    );
                  })}
                </div>

                {/* Secondary Institutional Links */}
                <div className="pt-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Institutional &amp; Outcomes
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {SECONDARY_ITEMS.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between rounded-xl bg-black/[0.02] border border-black/[0.04] p-3 text-xs font-normal text-[#1d1d1f] hover:bg-black/[0.04] transition-colors"
                      >
                        <span className="truncate">{item.label}</span>
                        <ChevronRight className="h-3 w-3 text-slate-300 shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Pinned Bottom Actions */}
                <div className="pt-3 pb-[calc(env(safe-area-inset-bottom,0px)+2rem)] space-y-2.5">
                  <Link
                    to="/career-assessment"
                    onClick={() => setMobileOpen(false)}
                    className="w-full h-11 rounded-full bg-arzon-teal hover:bg-arzon-deep-teal text-white font-medium text-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all shadow-none"
                  >
                    <span>Start Clinical Diagnostic</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <a
                    href="https://wa.me/919121283638?text=Hi%20Arzon%20Team%2C%20I%20want%20to%20know%20which%20healthcare%20career%20fits%20my%20degree."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="w-full h-10 rounded-full bg-[#10B981] hover:bg-[#059669] text-white font-medium text-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all shadow-none"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Talk to Experts on WhatsApp</span>
                  </a>

                  <div className="flex items-center justify-center pt-2">
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="text-xs text-slate-500 hover:text-arzon-deep-teal transition-colors"
                    >
                      Sign in to Candidate Portal
                    </Link>
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}

      <GlobalSearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
