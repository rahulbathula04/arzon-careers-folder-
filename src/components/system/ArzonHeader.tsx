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
  Activity,
  Award,
  Layers,
  BarChart3,
  FileText,
  Calculator,
  ShieldCheck,
  Users,
  Sparkles,
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

  const handleApplyClick = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.location.pathname === "/acri/pharmacovigilance-certification") {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("arzon:open-acri-modal"));
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        role="banner"
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          scrolled
            ? "bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200 shadow-xs"
            : "bg-[#FAF8F5] border-b border-stone-200/70"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Brand Logo */}
            <div className="flex items-center gap-6 xl:gap-8">
              <Link
                to="/"
                className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#1B3F8B] rounded-sm"
              >
                <ArzonLogo variant="light" size="md" />
              </Link>

              {/* Desktop Navigation */}
              <nav
                aria-label="Main Navigation"
                className="hidden lg:flex items-center gap-1 xl:gap-2 text-[13px] font-semibold text-stone-700"
              >
                {/* 1. HOME */}
                <Link
                  to="/"
                  className={`px-3 py-1.5 rounded-md hover:text-[#0B1325] hover:bg-stone-100 transition-colors ${
                    location.pathname === "/" ? "text-[#005B4F] font-bold" : ""
                  }`}
                >
                  Home
                </Link>

                {/* 2. ASSESS (ACRI) DROPDOWN */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("assess")}
                  onMouseLeave={() => handleMouseLeave("assess")}
                >
                  <button
                    type="button"
                    onClick={() => toggleDropdown("assess")}
                    className={`px-3 py-1.5 rounded-md hover:text-[#0B1325] hover:bg-stone-100 transition-colors flex items-center gap-1 cursor-pointer ${
                      location.pathname.startsWith("/acri") ||
                      location.pathname.startsWith("/career-engine") ||
                      location.pathname.startsWith("/verify")
                        ? "text-[#005B4F] font-bold"
                        : ""
                    }`}
                    aria-expanded={activeDropdown === "assess"}
                    aria-haspopup="true"
                  >
                    <span>Assess</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#005B4F]" />
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-stone-500 transition-transform duration-200 ${
                        activeDropdown === "assess" ? "rotate-180 text-[#005B4F]" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`absolute left-0 top-full pt-2 w-80 z-50 transition-all duration-150 ${
                      activeDropdown === "assess"
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible pointer-events-none -translate-y-1.5"
                    }`}
                  >
                    <div className="bg-white tone-light card-light border border-stone-200 rounded-xl shadow-xl p-3 space-y-1">
                      <Link
                        to="/acri/pharmacovigilance-certification"
                        search={{ apply: "true" }}
                        onClick={(e) => {
                          setActiveDropdown(null);
                          handleApplyClick(e);
                        }}
                        className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-stone-50 transition-colors group"
                      >
                        <div className="h-8 w-8 rounded-lg bg-[#E8F7F1] flex items-center justify-center text-[#005B4F] shrink-0 mt-0.5">
                          <Award className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                            <span>ACRI PV Certification</span>
                            <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                              LIVE
                            </span>
                          </div>
                          <div className="text-[11px] text-stone-500">
                            100-Point Industry Readiness Benchmark
                          </div>
                        </div>
                      </Link>

                      <Link
                        to="/acri/methodology"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-stone-50 transition-colors"
                      >
                        <div className="h-8 w-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 shrink-0 mt-0.5">
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-stone-900">
                            ACRI Methodology
                          </div>
                          <div className="text-[11px] text-stone-500">
                            Psychometric validity &amp; clinical standards
                          </div>
                        </div>
                      </Link>

                      <Link
                        to="/acri/competencies"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-stone-50 transition-colors"
                      >
                        <div className="h-8 w-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 shrink-0 mt-0.5">
                          <Layers className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-stone-900">
                            9 Core Competencies
                          </div>
                          <div className="text-[11px] text-stone-500">
                            ICH E2B(R3), MedDRA, &amp; WHO-UMC rubric
                          </div>
                        </div>
                      </Link>

                      <Link
                        to="/acri/leaderboard"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-stone-50 transition-colors"
                      >
                        <div className="h-8 w-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 shrink-0 mt-0.5">
                          <Activity className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-stone-900">
                            Weekly Leaders
                          </div>
                          <div className="text-[11px] text-stone-500">
                            Recognising top institutional performers
                          </div>
                        </div>
                      </Link>

                      <Link
                        to="/verify"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-stone-50 transition-colors"
                      >
                        <div className="h-8 w-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 shrink-0 mt-0.5">
                          <ShieldCheck className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-stone-900">
                            Verify Credential
                          </div>
                          <div className="text-[11px] text-stone-500">
                            Instant candidate certification verification
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* 3. TRAINING DROPDOWN */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("training")}
                  onMouseLeave={() => handleMouseLeave("training")}
                >
                  <button
                    type="button"
                    onClick={() => toggleDropdown("training")}
                    className={`px-3 py-1.5 rounded-md hover:text-[#0B1325] hover:bg-stone-100 transition-colors flex items-center gap-1 cursor-pointer ${
                      location.pathname.startsWith("/courses") ||
                      location.pathname.startsWith("/internships")
                        ? "text-[#005B4F] font-bold"
                        : ""
                    }`}
                    aria-expanded={activeDropdown === "training"}
                    aria-haspopup="true"
                  >
                    <span>Training</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-stone-500 transition-transform duration-200 ${
                        activeDropdown === "training" ? "rotate-180 text-[#005B4F]" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`absolute left-0 top-full pt-2 w-80 z-50 transition-all duration-150 ${
                      activeDropdown === "training"
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible pointer-events-none -translate-y-1.5"
                    }`}
                  >
                    <div className="bg-white tone-light card-light border border-stone-200 rounded-xl shadow-xl p-3 space-y-1">
                      <Link
                        to="/courses"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-stone-50 transition-colors"
                      >
                        <div className="h-8 w-8 rounded-lg bg-[#E8F7F1] flex items-center justify-center text-[#005B4F] shrink-0 mt-0.5">
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-stone-900">
                            12-Week PV Cohort
                          </div>
                          <div className="text-[11px] text-stone-500">
                            Oracle Argus, MedDRA, ICSR, Signal Detection
                          </div>
                        </div>
                      </Link>

                      <Link
                        to="/internships"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-stone-50 transition-colors"
                      >
                        <div className="h-8 w-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 shrink-0 mt-0.5">
                          <Layers className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-stone-900">
                            Applied Internships
                          </div>
                          <div className="text-[11px] text-stone-500">
                            Verified proof-of-work capstone dossiers
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* 4. ROLES & PATHWAYS DROPDOWN */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("roles")}
                  onMouseLeave={() => handleMouseLeave("roles")}
                >
                  <button
                    type="button"
                    onClick={() => toggleDropdown("roles")}
                    className={`px-3 py-1.5 rounded-md hover:text-[#0B1325] hover:bg-stone-100 transition-colors flex items-center gap-1 cursor-pointer ${
                      location.pathname.startsWith("/roles") ||
                      location.pathname.startsWith("/pv-associate") ||
                      location.pathname.startsWith("/students") ||
                      location.pathname.startsWith("/degrees")
                        ? "text-[#005B4F] font-bold"
                        : ""
                    }`}
                    aria-expanded={activeDropdown === "roles"}
                    aria-haspopup="true"
                  >
                    <span>Roles</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-stone-500 transition-transform duration-200 ${
                        activeDropdown === "roles" ? "rotate-180 text-[#005B4F]" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`absolute left-0 top-full pt-2 w-[520px] z-50 transition-all duration-150 ${
                      activeDropdown === "roles"
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible pointer-events-none -translate-y-1.5"
                    }`}
                  >
                    <div className="bg-white tone-light card-light border border-stone-200 rounded-xl shadow-xl p-4">
                      <div className="grid grid-cols-2 gap-4">
                        {/* Col 1: Core Clinical Roles */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 pb-1 border-b border-stone-100 mb-2">
                            <Briefcase className="h-3.5 w-3.5 text-[#005B4F]" />
                            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-900">
                              Clinical Career Tracks
                            </span>
                          </div>

                          <Link
                            to="/pv-associate"
                            onClick={() => setActiveDropdown(null)}
                            className="block p-1.5 rounded hover:bg-stone-50 transition-colors"
                          >
                            <div className="text-xs font-semibold text-stone-900">
                              PV Associate
                            </div>
                            <div className="text-[11px] text-stone-500">
                              ICSR, MedDRA triage &amp; safety cases
                            </div>
                          </Link>

                          <Link
                            to="/roles"
                            onClick={() => setActiveDropdown(null)}
                            className="block p-1.5 rounded hover:bg-stone-50 transition-colors"
                          >
                            <div className="text-xs font-semibold text-stone-900">
                              CDM Specialist
                            </div>
                            <div className="text-[11px] text-stone-500">
                              eCRF design, EDC &amp; data validation
                            </div>
                          </Link>

                          <Link
                            to="/roles"
                            onClick={() => setActiveDropdown(null)}
                            className="block p-1.5 rounded hover:bg-stone-50 transition-colors"
                          >
                            <div className="text-xs font-semibold text-stone-900">
                              Medical Coder
                            </div>
                            <div className="text-[11px] text-stone-500">
                              ICD-10-CM &amp; CPT terminology
                            </div>
                          </Link>

                          <Link
                            to="/roles"
                            onClick={() => setActiveDropdown(null)}
                            className="block p-1.5 rounded hover:bg-stone-50 transition-colors"
                          >
                            <div className="text-xs font-semibold text-stone-900">
                              Regulatory Affairs
                            </div>
                            <div className="text-[11px] text-stone-500">
                              eCTD dossiers &amp; CMC compliance
                            </div>
                          </Link>
                        </div>

                        {/* Col 2: Student Pathways */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 pb-1 border-b border-stone-100 mb-2">
                            <GraduationCap className="h-3.5 w-3.5 text-[#1B3F8B]" />
                            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-900">
                              Student Pathways
                            </span>
                          </div>

                          <Link
                            to="/students/4th-year"
                            onClick={() => setActiveDropdown(null)}
                            className="block p-1.5 rounded hover:bg-stone-50 transition-colors"
                          >
                            <div className="text-xs font-semibold text-stone-900">
                              4th-Year Students
                            </div>
                            <div className="text-[11px] text-stone-500">
                              Graduate campus-to-corporate ready
                            </div>
                          </Link>

                          <Link
                            to="/students/3rd-year"
                            onClick={() => setActiveDropdown(null)}
                            className="block p-1.5 rounded hover:bg-stone-50 transition-colors"
                          >
                            <div className="text-xs font-semibold text-stone-900">
                              3rd-Year Students
                            </div>
                            <div className="text-[11px] text-stone-500">
                              Early trajectory planning &amp; skills
                            </div>
                          </Link>

                          <Link
                            to="/students/graduates"
                            onClick={() => setActiveDropdown(null)}
                            className="block p-1.5 rounded hover:bg-stone-50 transition-colors"
                          >
                            <div className="text-xs font-semibold text-stone-900">
                              Graduates
                            </div>
                            <div className="text-[11px] text-stone-500">
                              Rapid career pivot into clinical data
                            </div>
                          </Link>

                          <Link
                            to="/degrees"
                            onClick={() => setActiveDropdown(null)}
                            className="block p-1.5 rounded hover:bg-stone-50 transition-colors"
                          >
                            <div className="text-xs font-semibold text-stone-900">
                              Degrees &amp; Specializations
                            </div>
                            <div className="text-[11px] text-stone-500">
                              B.Pharm, Pharm.D, M.Pharm, Life Sciences
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. RESOURCES DROPDOWN */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("resources")}
                  onMouseLeave={() => handleMouseLeave("resources")}
                >
                  <button
                    type="button"
                    onClick={() => toggleDropdown("resources")}
                    className={`px-3 py-1.5 rounded-md hover:text-[#0B1325] hover:bg-stone-100 transition-colors flex items-center gap-1 cursor-pointer ${
                      location.pathname.startsWith("/research") ||
                      location.pathname.startsWith("/tools")
                        ? "text-[#005B4F] font-bold"
                        : ""
                    }`}
                    aria-expanded={activeDropdown === "resources"}
                    aria-haspopup="true"
                  >
                    <span>Resources</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-stone-500 transition-transform duration-200 ${
                        activeDropdown === "resources" ? "rotate-180 text-[#005B4F]" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`absolute left-0 top-full pt-2 w-80 z-50 transition-all duration-150 ${
                      activeDropdown === "resources"
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible pointer-events-none -translate-y-1.5"
                    }`}
                  >
                    <div className="bg-white tone-light card-light border border-stone-200 rounded-xl shadow-xl p-3 space-y-1">
                      <Link
                        to="/research"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-stone-50 transition-colors"
                      >
                        <div className="h-8 w-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 shrink-0 mt-0.5">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-stone-900">
                            Research &amp; Reports
                          </div>
                          <div className="text-[11px] text-stone-500">
                            Quarterly CRO hiring &amp; salary index
                          </div>
                        </div>
                      </Link>

                      <Link
                        to="/tools/skill-gap-analyzer"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-stone-50 transition-colors"
                      >
                        <div className="h-8 w-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 shrink-0 mt-0.5">
                          <BarChart3 className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-stone-900">
                            Skill Gap Analyzer
                          </div>
                          <div className="text-[11px] text-stone-500">
                            Benchmark your technical competency
                          </div>
                        </div>
                      </Link>

                      <Link
                        to="/tools/role-matrix"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-stone-50 transition-colors"
                      >
                        <div className="h-8 w-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 shrink-0 mt-0.5">
                          <Layers className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-stone-900">
                            Role Competency Matrix
                          </div>
                          <div className="text-[11px] text-stone-500">
                            Compare clinical data career pathways
                          </div>
                        </div>
                      </Link>

                      <Link
                        to="/tools/cost-calculator"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-stone-50 transition-colors"
                      >
                        <div className="h-8 w-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 shrink-0 mt-0.5">
                          <Calculator className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-stone-900">
                            Career ROI Calculator
                          </div>
                          <div className="text-[11px] text-stone-500">
                            Starting salary multiple vs. investment
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* 6. EMPLOYERS */}
                <Link
                  to="/recruiters"
                  className={`px-3 py-1.5 rounded-md hover:text-[#0B1325] hover:bg-stone-100 transition-colors ${
                    location.pathname.startsWith("/recruiters") ? "text-[#005B4F] font-bold" : ""
                  }`}
                >
                  Employers
                </Link>
              </nav>
            </div>

            {/* Right Action Cluster */}
            <div className="hidden lg:flex items-center gap-2.5 xl:gap-3">
              {/* Search Trigger Button */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-stone-500 bg-white tone-light card-light border border-stone-200 rounded-lg hover:border-stone-300 hover:text-stone-800 transition-all cursor-pointer shadow-2xs"
                title="Search (Ctrl+K or ⌘K)"
                aria-label="Search site"
              >
                <Search className="h-3.5 w-3.5 text-stone-400" />
                <span className="hidden xl:inline text-stone-500 font-sans">Search...</span>
                <kbd className="hidden xl:inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-500">
                  ⌘K
                </kbd>
              </button>

              {/* Sign In */}
              <Link
                to="/login"
                className="px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-stone-700 hover:text-[#0B1325] border border-stone-200 rounded-lg hover:border-stone-300 transition-colors bg-white tone-light card-light"
              >
                Sign In
              </Link>

              {/* Primary CTA: Apply for an Invite */}
              <Link
                to="/acri/pharmacovigilance-certification"
                search={{ apply: "true" }}
                onClick={handleApplyClick}
                className="inline-flex items-center gap-1.5 bg-[#005B4F] hover:bg-[#00473E] text-white px-4 py-2 rounded-xl font-sans text-xs font-semibold tracking-wide transition-all shadow-xs hover:shadow-md cursor-pointer group"
              >
                <span>Apply for an Invite</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform text-emerald-300" />
              </Link>
            </div>

            {/* Mobile Action Controls */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg text-stone-600 hover:bg-stone-100"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              <Link
                to="/acri/pharmacovigilance-certification"
                search={{ apply: "true" }}
                onClick={handleApplyClick}
                className="inline-flex items-center bg-[#005B4F] text-white px-3 py-1.5 rounded-lg text-xs font-semibold"
              >
                <span>Apply</span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg text-stone-700 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-[#005B4F]"
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
          <div className="lg:hidden border-b border-stone-200 bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-3 max-h-[85vh] overflow-y-auto">
            {/* Quick Search inside Mobile Drawer */}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setSearchOpen(true);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white tone-light card-light border border-stone-200 rounded-xl text-stone-500 text-xs shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-stone-400" />
                <span>Search certifications, roles, tools...</span>
              </div>
              <span className="font-mono text-[10px] text-stone-400">FIND</span>
            </button>

            {/* Core Navigation Items */}
            <div className="space-y-1 font-medium text-stone-800 text-sm">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-stone-100 font-semibold"
              >
                Home
              </Link>

              {/* Assess Accordion */}
              <div className="border border-stone-200/80 rounded-xl overflow-hidden bg-white/50">
                <button
                  type="button"
                  onClick={() => toggleMobileSection("assess")}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-800"
                >
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#005B4F]" />
                    <span>Assess</span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-stone-500 transition-transform ${
                      mobileExpandedSection === "assess" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileExpandedSection === "assess" && (
                  <div className="px-3 pb-2.5 space-y-1 text-xs text-stone-600 border-t border-stone-100 pt-2">
                    <Link
                      to="/acri/pharmacovigilance-certification"
                      search={{ apply: "true" }}
                      onClick={(e) => {
                        setMobileOpen(false);
                        handleApplyClick(e);
                      }}
                      className="block p-2 rounded-lg bg-[#E8F7F1] text-[#005B4F] font-semibold"
                    >
                      ACRI PV Certification (Standard)
                    </Link>
                    <Link
                      to="/career-engine/test"
                      onClick={() => setMobileOpen(false)}
                      className="block p-2 rounded-lg hover:bg-stone-100"
                    >
                      Work Simulation Terminal
                    </Link>
                    <Link
                      to="/acri"
                      onClick={() => setMobileOpen(false)}
                      className="block p-2 rounded-lg hover:bg-stone-100"
                    >
                      ACRI Scoring Methodology
                    </Link>
                    <Link
                      to="/verify"
                      onClick={() => setMobileOpen(false)}
                      className="block p-2 rounded-lg hover:bg-stone-100"
                    >
                      Verify Credential
                    </Link>
                  </div>
                )}
              </div>

              {/* Training Accordion */}
              <div className="border border-stone-200/80 rounded-xl overflow-hidden bg-white/50">
                <button
                  type="button"
                  onClick={() => toggleMobileSection("training")}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-800"
                >
                  <span>Training</span>
                  <ChevronDown
                    className={`h-4 w-4 text-stone-500 transition-transform ${
                      mobileExpandedSection === "training" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileExpandedSection === "training" && (
                  <div className="px-3 pb-2.5 space-y-1 text-xs text-stone-600 border-t border-stone-100 pt-2">
                    <Link
                      to="/courses"
                      onClick={() => setMobileOpen(false)}
                      className="block p-2 rounded-lg hover:bg-stone-100 font-semibold"
                    >
                      12-Week Pharmacovigilance Program
                    </Link>
                    <Link
                      to="/internships"
                      onClick={() => setMobileOpen(false)}
                      className="block p-2 rounded-lg hover:bg-stone-100"
                    >
                      Applied Clinical Internships
                    </Link>
                  </div>
                )}
              </div>

              {/* Roles & Pathways Accordion */}
              <div className="border border-stone-200/80 rounded-xl overflow-hidden bg-white/50">
                <button
                  type="button"
                  onClick={() => toggleMobileSection("roles")}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-800"
                >
                  <span>Roles &amp; Pathways</span>
                  <ChevronDown
                    className={`h-4 w-4 text-stone-500 transition-transform ${
                      mobileExpandedSection === "roles" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileExpandedSection === "roles" && (
                  <div className="px-3 pb-2.5 space-y-1 text-xs text-stone-600 border-t border-stone-100 pt-2">
                    <Link
                      to="/pv-associate"
                      onClick={() => setMobileOpen(false)}
                      className="block p-2 rounded-lg hover:bg-stone-100 font-semibold"
                    >
                      PV Associate Role Guide
                    </Link>
                    <Link
                      to="/roles"
                      onClick={() => setMobileOpen(false)}
                      className="block p-2 rounded-lg hover:bg-stone-100"
                    >
                      Clinical Data Management (CDM)
                    </Link>
                    <Link
                      to="/roles"
                      onClick={() => setMobileOpen(false)}
                      className="block p-2 rounded-lg hover:bg-stone-100"
                    >
                      Medical Coding
                    </Link>
                    <Link
                      to="/students/4th-year"
                      onClick={() => setMobileOpen(false)}
                      className="block p-2 rounded-lg hover:bg-stone-100"
                    >
                      4th-Year Students
                    </Link>
                    <Link
                      to="/degrees"
                      onClick={() => setMobileOpen(false)}
                      className="block p-2 rounded-lg hover:bg-stone-100"
                    >
                      Degrees &amp; Specializations
                    </Link>
                  </div>
                )}
              </div>

              {/* Resources Accordion */}
              <div className="border border-stone-200/80 rounded-xl overflow-hidden bg-white/50">
                <button
                  type="button"
                  onClick={() => toggleMobileSection("resources")}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-800"
                >
                  <span>Resources &amp; Tools</span>
                  <ChevronDown
                    className={`h-4 w-4 text-stone-500 transition-transform ${
                      mobileExpandedSection === "resources" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileExpandedSection === "resources" && (
                  <div className="px-3 pb-2.5 space-y-1 text-xs text-stone-600 border-t border-stone-100 pt-2">
                    <Link
                      to="/research"
                      onClick={() => setMobileOpen(false)}
                      className="block p-2 rounded-lg hover:bg-stone-100"
                    >
                      Research &amp; Quarterly Reports
                    </Link>
                    <Link
                      to="/tools/skill-gap-analyzer"
                      onClick={() => setMobileOpen(false)}
                      className="block p-2 rounded-lg hover:bg-stone-100"
                    >
                      Skill Gap Analyzer
                    </Link>
                    <Link
                      to="/tools/role-matrix"
                      onClick={() => setMobileOpen(false)}
                      className="block p-2 rounded-lg hover:bg-stone-100"
                    >
                      Role Competency Matrix
                    </Link>
                    <Link
                      to="/tools/cost-calculator"
                      onClick={() => setMobileOpen(false)}
                      className="block p-2 rounded-lg hover:bg-stone-100"
                    >
                      Career ROI Calculator
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/recruiters"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-stone-100"
              >
                Employer Console &amp; Hiring
              </Link>
            </div>

            {/* Mobile Drawer Bottom Actions */}
            <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full py-2.5 text-center text-xs font-mono font-bold uppercase tracking-wider text-stone-800 bg-white tone-light card-light border border-stone-300 rounded-xl"
              >
                Sign In
              </Link>
              <Link
                to="/acri/pharmacovigilance-certification"
                search={{ apply: "true" }}
                onClick={(e) => {
                  setMobileOpen(false);
                  handleApplyClick(e);
                }}
                className="w-full py-2.5 text-center text-xs font-semibold tracking-wide text-white bg-[#005B4F] rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Apply for an ACRI Invite</span>
                <ArrowRight className="h-4 w-4 text-emerald-300" />
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
