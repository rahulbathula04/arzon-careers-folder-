import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Search,
  GraduationCap,
  BookOpen,
  Briefcase,
  Award,
  Layers,
  BarChart3,
  FileText,
} from "lucide-react";
import { ArzonLogo } from "../acri/ArzonLogo";
import { GlobalSearchModal } from "./GlobalSearchModal";

export function ArzonHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const location = useLocation();

  // Close mobile drawer and dropdowns on route transition
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setMobileExpandedSection(null);
  }, [location.pathname]);

  // Handle scroll shadow
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle outside click to close dropdowns
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMouseEnter = (key: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveDropdown(key);
  };

  const handleMouseLeave = (key: string) => {
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown((current) => (current === key ? null : current));
    }, 160);
  };

  const toggleDropdown = (key: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveDropdown((current) => (current === key ? null : key));
  };

  const toggleMobileSection = (key: string) => {
    setMobileExpandedSection((current) => (current === key ? null : key));
  };

    return (
    <>
      <header
        ref={headerRef}
        role="banner"
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-[#E4EAF2] shadow-xs"
            : "bg-white border-b border-[#E4EAF2]"
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[72px] items-center justify-between gap-4">
            {/* Brand Logo */}
            <div className="flex min-w-0 flex-1 items-center gap-5 2xl:gap-8">
              <Link
                to="/"
                className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#1557D6] rounded-sm"
              >
                <ArzonLogo variant="light" size="md" />
              </Link>

              {/* Desktop Navigation */}
              <nav
                aria-label="Main Navigation"
                className="hidden xl:flex min-w-0 items-center gap-0.5 2xl:gap-1 text-[13px] font-semibold text-[#3F4A60] whitespace-nowrap"
              >
                {/* 1. CAREERS DROPDOWN */}
                <div className="relative" onMouseEnter={() => handleMouseEnter("careers")} onMouseLeave={() => handleMouseLeave("careers")}>
                  <button type="button" onClick={() => toggleDropdown("careers")} className="px-3 py-1.5 rounded-md hover:text-[#071A4A] hover:bg-[#EEF6FF]/60 transition-colors flex items-center gap-1 cursor-pointer" aria-expanded={activeDropdown === "careers"} aria-haspopup="true">
                    <span>Careers</span>
                    <ChevronDown className="h-3.5 w-3.5 text-[#69758A]" />
                  </button>
                  <div className={`absolute left-0 top-full pt-2 w-[520px] z-50 transition-all duration-150 ${activeDropdown === "careers" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible pointer-events-none -translate-y-1.5"}`}>
                    <div className="bg-white tone-light card-light border border-[#E4EAF2] rounded-2xl shadow-xl p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 pb-2 border-b border-[#E4EAF2] mb-1">
                            <Briefcase className="h-3.5 w-3.5 text-[#1557D6]" />
                            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#071A4A]">Healthcare roles</span>
                          </div>
                          <Link to="/industry/pharmacovigilance" onClick={() => setActiveDropdown(null)} className="block p-2 rounded-xl hover:bg-[#EEF6FF]/50 transition-colors"><div className="text-xs font-bold text-[#071A4A]">Pharmacovigilance</div><div className="text-[11px] text-[#69758A]">Drug safety, ICSR and case processing</div></Link>
                          <Link to="/industry/medical-coding" onClick={() => setActiveDropdown(null)} className="block p-2 rounded-xl hover:bg-[#EEF6FF]/50 transition-colors"><div className="text-xs font-bold text-[#071A4A]">Medical Coding</div><div className="text-[11px] text-[#69758A]">ICD-10-CM, CPT and coding operations</div></Link>
                          <Link to="/industry/clinical-data-management" onClick={() => setActiveDropdown(null)} className="block p-2 rounded-xl hover:bg-[#EEF6FF]/50 transition-colors"><div className="text-xs font-bold text-[#071A4A]">Clinical Data Management</div><div className="text-[11px] text-[#69758A]">EDC, data cleaning and query management</div></Link>
                          <Link to="/industry/clinical-research" onClick={() => setActiveDropdown(null)} className="block p-2 rounded-xl hover:bg-[#EEF6FF]/50 transition-colors"><div className="text-xs font-bold text-[#071A4A]">Clinical Research</div><div className="text-[11px] text-[#69758A]">Trial operations, CRA and CTM pathways</div></Link>
                          <Link to="/industry/regulatory-affairs" onClick={() => setActiveDropdown(null)} className="block p-2 rounded-xl hover:bg-[#EEF6FF]/50 transition-colors"><div className="text-xs font-bold text-[#071A4A]">Regulatory Affairs</div><div className="text-[11px] text-[#69758A]">Submissions, dossiers and compliance</div></Link>
                          <Link to="/industry/medical-writing" onClick={() => setActiveDropdown(null)} className="block p-2 rounded-xl hover:bg-[#EEF6FF]/50 transition-colors"><div className="text-xs font-bold text-[#071A4A]">Medical Writing</div><div className="text-[11px] text-[#69758A]">Clinical and regulatory documentation</div></Link>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 pb-2 border-b border-[#E4EAF2] mb-1">
                            <GraduationCap className="h-3.5 w-3.5 text-[#1557D6]" />
                            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#071A4A]">By qualification</span>
                          </div>
                          <Link to="/degrees/bpharm" onClick={() => setActiveDropdown(null)} className="block p-2 rounded-xl hover:bg-[#EEF6FF]/50 transition-colors"><div className="text-xs font-semibold text-[#071A4A]">B.Pharm</div><div className="text-[11px] text-[#69758A]">Roles and career paths</div></Link>
                          <Link to="/degrees/pharmd" onClick={() => setActiveDropdown(null)} className="block p-2 rounded-xl hover:bg-[#EEF6FF]/50 transition-colors"><div className="text-xs font-semibold text-[#071A4A]">Pharm.D</div><div className="text-[11px] text-[#69758A]">Clinical and safety roles</div></Link>
                          <Link to="/degrees/mpharm" onClick={() => setActiveDropdown(null)} className="block p-2 rounded-xl hover:bg-[#EEF6FF]/50 transition-colors"><div className="text-xs font-semibold text-[#071A4A]">M.Pharm</div><div className="text-[11px] text-[#69758A]">Advanced pharma pathways</div></Link>
                          <Link to="/degrees/bsc-lifesciences" onClick={() => setActiveDropdown(null)} className="block p-2 rounded-xl hover:bg-[#EEF6FF]/50 transition-colors"><div className="text-xs font-semibold text-[#071A4A]">Life Sciences</div><div className="text-[11px] text-[#69758A]">B.Sc / M.Sc transition paths</div></Link>
                          <Link to="/healthcare-careers" onClick={() => setActiveDropdown(null)} className="mt-2 block rounded-xl bg-[#EEF6FF] p-3 text-xs font-bold text-[#1557D6]">See all healthcare career paths <ArrowRight className="ml-1 inline h-3.5 w-3.5" /></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 3. PROGRAMMES DROPDOWN */}
                <div className="relative" onMouseEnter={() => handleMouseEnter("programs")} onMouseLeave={() => handleMouseLeave("programs")}>
                  <button type="button" onClick={() => toggleDropdown("programs")} className="px-3 py-1.5 rounded-md hover:text-[#071A4A] hover:bg-[#EEF6FF]/60 transition-colors flex items-center gap-1 cursor-pointer" aria-expanded={activeDropdown === "programs"} aria-haspopup="true">
                    <span>Programmes</span><ChevronDown className="h-3.5 w-3.5 text-[#69758A]" />
                  </button>
                  <div className={`absolute left-0 top-full pt-2 w-80 z-50 transition-all duration-150 ${activeDropdown === "programs" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible pointer-events-none -translate-y-1.5"}`}>
                    <div className="bg-white tone-light card-light border border-[#E4EAF2] rounded-2xl shadow-xl p-3 space-y-1">
                      <Link to="/courses" onClick={() => setActiveDropdown(null)} className="block rounded-xl p-3 hover:bg-[#EEF6FF]/50 transition-colors"><div className="text-xs font-bold text-[#071A4A]">Role Readiness Programmes</div><div className="text-[11px] text-[#69758A]">Build skills, projects and readiness evidence</div></Link>
                      <Link to="/courses/compare" onClick={() => setActiveDropdown(null)} className="block rounded-xl p-3 hover:bg-[#EEF6FF]/50 transition-colors"><div className="text-xs font-bold text-[#071A4A]">Compare Programmes</div><div className="text-[11px] text-[#69758A]">Compare curriculum, duration and support</div></Link>
                      <Link to="/cohorts" onClick={() => setActiveDropdown(null)} className="block rounded-xl p-3 hover:bg-[#EEF6FF]/50 transition-colors"><div className="text-xs font-bold text-[#071A4A]">Upcoming Cohorts</div><div className="text-[11px] text-[#69758A]">Start dates, fees and application windows</div></Link>
                      <Link to="/career-engine" onClick={() => setActiveDropdown(null)} className="block rounded-xl p-3 hover:bg-[#EEF6FF]/50 transition-colors"><div className="text-xs font-bold text-[#071A4A]">Career Readiness Assessment</div><div className="text-[11px] text-[#69758A]">Check your role fit before choosing</div></Link>
                    </div>
                  </div>
                </div>
                {/* 4. FOR INSTITUTIONS */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("institutions")}
                  onMouseLeave={() => handleMouseLeave("institutions")}
                >
                  <button
                    type="button"
                    onClick={() => toggleDropdown("institutions")}
                    className="px-3 py-1.5 rounded-md hover:text-[#071A4A] hover:bg-[#EEF6FF]/60 transition-colors flex items-center gap-1 cursor-pointer"
                    aria-expanded={activeDropdown === "institutions"}
                    aria-haspopup="true"
                  >
                    <span>For Institutions</span>
                    <ChevronDown className={`h-3.5 w-3.5 text-[#69758A] transition-transform duration-200 ${activeDropdown === "institutions" ? "rotate-180 text-[#1557D6]" : ""}`} />
                  </button>
                  <div className={`absolute left-0 top-full pt-2 w-80 z-50 transition-all duration-150 ${activeDropdown === "institutions" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible pointer-events-none -translate-y-1.5"}`}>
                    <div className="bg-white tone-light card-light border border-[#E4EAF2] rounded-2xl shadow-xl p-3 space-y-1">
                      <Link to="/tpos" onClick={() => setActiveDropdown(null)} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#EEF6FF]/50 transition-colors">
                        <div className="h-8 w-8 rounded-lg bg-[#EEF6FF] flex items-center justify-center text-[#1557D6] shrink-0"><GraduationCap className="h-4 w-4" /></div>
                        <div><div className="text-xs font-bold text-[#071A4A]">For Colleges</div><div className="text-[11px] text-[#69758A]">Cohort readiness, workshops and placement support</div></div>
                      </Link>
                      <Link to="/recruiters" onClick={() => setActiveDropdown(null)} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#EEF6FF]/50 transition-colors">
                        <div className="h-8 w-8 rounded-lg bg-[#EEF6FF] flex items-center justify-center text-[#1557D6] shrink-0"><Briefcase className="h-4 w-4" /></div>
                        <div><div className="text-xs font-bold text-[#071A4A]">For Employers</div><div className="text-[11px] text-[#69758A]">Review candidate evidence and hiring programmes</div></div>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* 3. CAREER INTELLIGENCE DROPDOWN */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("insights")}
                  onMouseLeave={() => handleMouseLeave("insights")}
                >
                  <button
                    type="button"
                    onClick={() => toggleDropdown("insights")}
                    className={`px-3 py-1.5 rounded-md hover:text-[#071A4A] hover:bg-[#EEF6FF]/60 transition-colors flex items-center gap-1 cursor-pointer ${
                      location.pathname.startsWith("/research") ||
                      location.pathname.startsWith("/tools") ||
                      location.pathname.startsWith("/industry") ||
                      location.pathname.startsWith("/career-engine")
                        ? "text-[#1557D6] font-bold"
                        : ""
                    }`}
                    aria-expanded={activeDropdown === "insights"}
                    aria-haspopup="true"
                  >
                    <span>Career Intelligence</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-[#69758A] transition-transform duration-200 ${
                        activeDropdown === "insights" ? "rotate-180 text-[#1557D6]" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`absolute left-0 top-full pt-2 w-80 z-50 transition-all duration-150 ${
                      activeDropdown === "insights"
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible pointer-events-none -translate-y-1.5"
                    }`}
                  >
                    <div className="bg-white tone-light card-light border border-[#E4EAF2] rounded-2xl shadow-xl p-3 space-y-1">
                      <Link
                        to="/research"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#EEF6FF]/50 transition-colors"
                      >
                        <div className="h-8 w-8 rounded-lg bg-[#EEF6FF] flex items-center justify-center text-[#1557D6] shrink-0 mt-0.5">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#071A4A]">
                            Research &amp; Reports
                          </div>
                          <div className="text-[11px] text-[#69758A]">
                            Quarterly CRO hiring &amp; salary index
                          </div>
                        </div>
                      </Link>

                      <Link
                        to="/tools/skill-gap-analyzer"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#EEF6FF]/50 transition-colors"
                      >
                        <div className="h-8 w-8 rounded-lg bg-[#EEF6FF] flex items-center justify-center text-[#1557D6] shrink-0 mt-0.5">
                          <BarChart3 className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#071A4A]">
                            Skill Gap Analyzer
                          </div>
                          <div className="text-[11px] text-[#69758A]">
                            Benchmark technical competency
                          </div>
                        </div>
                      </Link>

                      <Link
                        to="/tools/role-matrix"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#EEF6FF]/50 transition-colors"
                      >
                        <div className="h-8 w-8 rounded-lg bg-[#EEF6FF] flex items-center justify-center text-[#1557D6] shrink-0 mt-0.5">
                          <Layers className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#071A4A]">
                            Role Competency Matrix
                          </div>
                          <div className="text-[11px] text-[#69758A]">
                            Compare clinical data career pathways
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* 6. WHY ARZON */}
                <Link
                  to="/why-arzon"
                  className={`px-3 py-1.5 rounded-md hover:text-[#071A4A] hover:bg-[#EEF6FF]/60 transition-colors ${
                    location.pathname === "/why-arzon" ? "text-[#1557D6] font-bold" : ""
                  }`}
                >
                  Why Arzon
                </Link>

                {/* 7. ABOUT */}
                <Link
                  to="/about"
                  className={`px-3 py-1.5 rounded-md hover:text-[#071A4A] hover:bg-[#EEF6FF]/60 transition-colors ${
                    location.pathname === "/about" ? "text-[#1557D6] font-bold" : ""
                  }`}
                >
                  About
                </Link>
              </nav>
            </div>

            {/* Right Action Cluster */}
            <div className="hidden xl:flex items-center gap-2">
              {/* Search Trigger Button */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="shrink-0 flex items-center gap-2 px-3 py-2 text-xs whitespace-nowrap text-[#69758A] bg-white tone-light card-light border border-[#E4EAF2] rounded-full hover:border-[#CBD5E1] hover:text-[#071A4A] transition-all cursor-pointer shadow-2xs"
                title="Search Arzon careers, programmes and intelligence (Ctrl+K or ⌘K)"
                aria-label="Search site"
              >
                <Search className="h-3.5 w-3.5 text-[#69758A]" />
                <span className="hidden xl:inline text-[#69758A] font-sans">Search...</span>
                <kbd className="hidden xl:inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-[#69758A]">
                  ⌘K
                </kbd>
              </button>

              {/* Sign In */}
              <Link
                to="/login"
                className="shrink-0 px-3.5 py-2 text-xs whitespace-nowrap font-mono font-bold uppercase tracking-wider text-[#3F4A60] hover:text-[#071A4A] border border-[#E4EAF2] rounded-full hover:border-[#CBD5E1] transition-colors bg-white tone-light card-light"
              >
                Sign In
              </Link>

              {/* Primary CTA: Get My Career Plan */}
              <Link
                to="/career-engine"
                className="shrink-0 arzon-v2-button-primary font-sans text-xs sm:text-sm whitespace-nowrap cursor-pointer group"
              >
                <span>Get My Career Plan</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile Action Controls */}
            <div className="flex xl:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg text-[#69758A] hover:bg-slate-100"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              <Link
                to="/career-engine"
                className="arzon-v2-button-primary px-3.5 py-1.5 text-xs"
              >
                <span>Career Plan</span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg text-[#071A4A] hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1557D6]"
                aria-label="Toggle Navigation Menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-b border-[#E4EAF2] bg-white tone-light px-4 pt-3 pb-6 space-y-3 max-h-[85vh] overflow-y-auto">
            {/* Quick Search inside Mobile Drawer */}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setSearchOpen(true);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-50 tone-light card-light border border-[#E4EAF2] rounded-xl text-[#69758A] text-xs shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-[#69758A]" />
                <span>Search careers, programmes, jobs...</span>
              </div>
              <span className="font-mono text-[10px] text-[#69758A]">FIND</span>
            </button>

            {/* Core Navigation Items */}
            <div className="space-y-1 font-medium text-[#071A4A] text-sm">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-xl hover:bg-[#EEF6FF] font-semibold"
              >
                Home
              </Link>

              {/* Careers Accordion */}
              <div className="border border-[#E4EAF2] rounded-xl overflow-hidden bg-slate-50/50">
                <button
                  type="button"
                  onClick={() => toggleMobileSection("careers")}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-[#071A4A]"
                >
                  <span>Careers</span>
                  <ChevronDown
                    className={`h-4 w-4 text-[#69758A] transition-transform ${
                      mobileExpandedSection === "careers" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileExpandedSection === "careers" && (
                  <div className="px-3 pb-2.5 space-y-1 text-xs text-[#3F4A60] border-t border-[#E4EAF2] pt-2">
                    <Link
                      to="/pv-associate"
                      onClick={() => setMobileOpen(false)}
                      className="block p-2 rounded-lg bg-[#EEF6FF] text-[#1557D6] font-semibold"
                    >
                      PV Associate (12-Week Program)
                    </Link>
                    <Link
                      to="/roles"
                      onClick={() => setMobileOpen(false)}
                      className="block p-2 rounded-lg hover:bg-slate-100"
                    >
                      Clinical Data Management (CDM)
                    </Link>
                    <Link
                      to="/roles"
                      onClick={() => setMobileOpen(false)}
                      className="block p-2 rounded-lg hover:bg-slate-100"
                    >
                      Medical Coding
                    </Link>
                    <Link
                      to="/degrees"
                      onClick={() => setMobileOpen(false)}
                      className="block p-2 rounded-lg hover:bg-slate-100"
                    >
                      Degrees &amp; Specializations
                    </Link>
                  </div>
                )}
              </div>

              {/* Programs Accordion */}
              <div className="border border-[#E4EAF2] rounded-xl overflow-hidden bg-slate-50/50">
                <button
                  type="button"
                  onClick={() => toggleMobileSection("programs")}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-[#071A4A]"
                >
                  <span>Programmes</span>
                  <ChevronDown
                    className={`h-4 w-4 text-[#69758A] transition-transform ${
                      mobileExpandedSection === "programs" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileExpandedSection === "programs" && (
                  <div className="px-3 pb-2.5 space-y-1 text-xs text-[#3F4A60] border-t border-[#E4EAF2] pt-2">
                    <Link
                      to="/pv-associate"
                      onClick={() => setMobileOpen(false)}
                      className="block p-2 rounded-lg hover:bg-slate-100 font-semibold"
                    >
                      12-Week Role Readiness Program
                    </Link>
                    <Link
                      to="/acri"
                      onClick={() => setMobileOpen(false)}
                      className="block p-2 rounded-lg hover:bg-slate-100"
                    >
                      ACRI Industry Certification
                    </Link>
                    <Link
                      to="/internships"
                      onClick={() => setMobileOpen(false)}
                      className="block p-2 rounded-lg hover:bg-slate-100"
                    >
                      Applied Clinical Internships
                    </Link>
                  </div>
                )}
              </div>

              {/* For Institutions */}
              <div className="border border-[#E4EAF2] rounded-xl overflow-hidden bg-slate-50/50">
                <button
                  type="button"
                  onClick={() => toggleMobileSection("institutions")}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-[#071A4A]"
                >
                  <span>For Institutions</span>
                  <ChevronDown className={`h-4 w-4 text-[#69758A] transition-transform ${mobileExpandedSection === "institutions" ? "rotate-180" : ""}`} />
                </button>
                {mobileExpandedSection === "institutions" && (
                  <div className="px-3 pb-2.5 space-y-1 text-xs text-[#3F4A60] border-t border-[#E4EAF2] pt-2">
                    <Link to="/tpos" onClick={() => setMobileOpen(false)} className="block p-2 rounded-lg hover:bg-slate-100 font-semibold">For Colleges</Link>
                    <Link to="/recruiters" onClick={() => setMobileOpen(false)} className="block p-2 rounded-lg hover:bg-slate-100">For Employers</Link>
                  </div>
                )}
              </div>

              {/* Resources Accordion */}
              <div className="border border-[#E4EAF2] rounded-xl overflow-hidden bg-slate-50/50">
                <button
                  type="button"
                  onClick={() => toggleMobileSection("intelligence")}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-[#071A4A]"
                >
                  <span>Career Intelligence</span>
                  <ChevronDown
                    className={`h-4 w-4 text-[#69758A] transition-transform ${
                      mobileExpandedSection === "intelligence" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileExpandedSection === "intelligence" && (
                  <div className="px-3 pb-2.5 space-y-1 text-xs text-[#3F4A60] border-t border-[#E4EAF2] pt-2">
                    <Link
                      to="/research"
                      onClick={() => setMobileOpen(false)}
                      className="block p-2 rounded-lg hover:bg-slate-100"
                    >
                      Research &amp; Quarterly Reports
                    </Link>
                    <Link
                      to="/tools/skill-gap-analyzer"
                      onClick={() => setMobileOpen(false)}
                      className="block p-2 rounded-lg hover:bg-slate-100"
                    >
                      Skill Gap Analyzer
                    </Link>
                    <Link
                      to="/tools/role-matrix"
                      onClick={() => setMobileOpen(false)}
                      className="block p-2 rounded-lg hover:bg-slate-100"
                    >
                      Role Competency Matrix
                    </Link>
                  </div>
                )}
              </div>

              {/* Why Arzon */}
              <Link
                to="/why-arzon"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-xl hover:bg-[#EEF6FF]"
              >
                Why Arzon
              </Link>

              {/* About */}
              <Link
                to="/about"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-xl hover:bg-[#EEF6FF]"
              >
                About
              </Link>
            </div>

            {/* Mobile Drawer Bottom Actions */}
            <div className="pt-3 border-t border-[#E4EAF2] flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full py-2.5 text-center text-xs font-mono font-bold uppercase tracking-wider text-[#071A4A] bg-white tone-light card-light border border-[#E4EAF2] rounded-full"
              >
                Sign In
              </Link>
              <Link
                to="/career-engine"
                onClick={() => setMobileOpen(false)}
                className="w-full arzon-v2-button-primary text-xs flex items-center justify-center gap-1.5"
              >
                <span>Get My Career Plan</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Command/Search Palette */}
      <GlobalSearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
