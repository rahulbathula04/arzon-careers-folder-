import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
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
} from "lucide-react";
import { ArzonLogo } from "../acri/ArzonLogo";

export function ArzonHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  // Close mobile drawer on route transition
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
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
            <Link to="/" className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#1B3F8B] rounded-sm">
              <ArzonLogo variant="light" size="md" />
            </Link>

            {/* Desktop Navigation */}
            <nav
              aria-label="Main Navigation"
              className="hidden lg:flex items-center gap-1 xl:gap-2 text-[13px] font-semibold text-stone-700"
            >
              <Link
                to="/"
                className="px-3 py-1.5 rounded-md hover:text-[#0B1325] hover:bg-stone-100 transition-colors"
              >
                Home
              </Link>

              {/* 1. CAREER DISCOVERY (Mega Dropdown) */}
              <div
                className="relative group/discovery"
                onMouseEnter={() => setActiveDropdown("discovery")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className={`px-3 py-1.5 rounded-md hover:text-[#0B1325] hover:bg-stone-100 transition-colors flex items-center gap-1 cursor-pointer ${
                    location.pathname.startsWith("/students") ||
                    location.pathname.startsWith("/degrees") ||
                    location.pathname.startsWith("/roles") ||
                    location.pathname.startsWith("/pv-associate")
                      ? "text-[#1B3F8B] font-bold"
                      : ""
                  }`}
                  aria-expanded={activeDropdown === "discovery"}
                >
                  <span>Career Discovery</span>
                  <ChevronDown className="h-3.5 w-3.5 text-stone-500 transition-transform group-hover/discovery:rotate-180" />
                </button>

                <div className="absolute left-0 top-full hidden group-hover/discovery:block w-[640px] bg-white tone-light border border-stone-200 rounded-xl shadow-xl p-5 z-50">
                  <div className="grid grid-cols-3 gap-5">
                    {/* Col A: Students by Stage */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 pb-1 border-b border-stone-100">
                        <GraduationCap className="h-3.5 w-3.5 text-[#1B3F8B]" />
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-900">
                          By Stage
                        </span>
                      </div>
                      <div className="space-y-1">
                        <Link
                          to="/students/4th-year"
                          className="block p-1.5 rounded hover:bg-stone-50 transition-colors"
                        >
                          <div className="text-xs font-semibold text-stone-900">4th-Year Students</div>
                          <div className="text-[11px] text-stone-500">Graduate career-ready</div>
                        </Link>
                        <Link
                          to="/students/3rd-year"
                          className="block p-1.5 rounded hover:bg-stone-50 transition-colors"
                        >
                          <div className="text-xs font-semibold text-stone-900">3rd-Year Students</div>
                          <div className="text-[11px] text-stone-500">Trajectory planning</div>
                        </Link>
                        <Link
                          to="/students/1st-2nd-year"
                          className="block p-1.5 rounded hover:bg-stone-50 transition-colors"
                        >
                          <div className="text-xs font-semibold text-stone-900">1st & 2nd Year</div>
                          <div className="text-[11px] text-stone-500">Foundational literacy</div>
                        </Link>
                        <Link
                          to="/students/graduates"
                          className="block p-1.5 rounded hover:bg-stone-50 transition-colors"
                        >
                          <div className="text-xs font-semibold text-stone-900">Graduates</div>
                          <div className="text-[11px] text-stone-500">Rapid career pivot</div>
                        </Link>
                      </div>
                    </div>

                    {/* Col B: By Degree */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 pb-1 border-b border-stone-100">
                        <BookOpen className="h-3.5 w-3.5 text-[#1B3F8B]" />
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-900">
                          By Degree
                        </span>
                      </div>
                      <div className="space-y-1">
                        <Link
                          to="/degrees"
                          className="block p-1.5 rounded hover:bg-stone-50 transition-colors"
                        >
                          <div className="text-xs font-semibold text-stone-900">B.Pharm Pathway</div>
                          <div className="text-[11px] text-stone-500">Clinical data transition</div>
                        </Link>
                        <Link
                          to="/degrees"
                          className="block p-1.5 rounded hover:bg-stone-50 transition-colors"
                        >
                          <div className="text-xs font-semibold text-stone-900">Pharm.D Specialization</div>
                          <div className="text-[11px] text-stone-500">Drug safety leadership</div>
                        </Link>
                        <Link
                          to="/degrees"
                          className="block p-1.5 rounded hover:bg-stone-50 transition-colors"
                        >
                          <div className="text-xs font-semibold text-stone-900">M.Pharm Roles</div>
                          <div className="text-[11px] text-stone-500">Pharmacology & Regulatory</div>
                        </Link>
                        <Link
                          to="/degrees"
                          className="block p-1.5 rounded hover:bg-stone-50 transition-colors"
                        >
                          <div className="text-xs font-semibold text-stone-900">Life Sciences (BSc/MSc)</div>
                          <div className="text-[11px] text-stone-500">Biotech & Biochem entry</div>
                        </Link>
                      </div>
                    </div>

                    {/* Col C: By Role */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 pb-1 border-b border-stone-100">
                        <Briefcase className="h-3.5 w-3.5 text-[#1B3F8B]" />
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-900">
                          Target Roles
                        </span>
                      </div>
                      <div className="space-y-1">
                        <Link
                          to="/pv-associate"
                          className="block p-1.5 rounded hover:bg-stone-50 transition-colors"
                        >
                          <div className="text-xs font-semibold text-stone-900">PV Associate</div>
                          <div className="text-[11px] text-stone-500">ICSR, MedDRA & triage</div>
                        </Link>
                        <Link
                          to="/roles"
                          className="block p-1.5 rounded hover:bg-stone-50 transition-colors"
                        >
                          <div className="text-xs font-semibold text-stone-900">CDM Specialist</div>
                          <div className="text-[11px] text-stone-500">eCRF & RAVE EDC</div>
                        </Link>
                        <Link
                          to="/roles"
                          className="block p-1.5 rounded hover:bg-stone-50 transition-colors"
                        >
                          <div className="text-xs font-semibold text-stone-900">Medical Coder</div>
                          <div className="text-[11px] text-stone-500">ICD-10-CM & CPT</div>
                        </Link>
                        <Link
                          to="/roles"
                          className="block p-1.5 rounded hover:bg-stone-50 transition-colors"
                        >
                          <div className="text-xs font-semibold text-stone-900">Regulatory Affairs</div>
                          <div className="text-[11px] text-stone-500">eCTD dossiers & CMC</div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. CAREER READINESS */}
              <div
                className="relative group/readiness"
                onMouseEnter={() => setActiveDropdown("readiness")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className={`px-3 py-1.5 rounded-md hover:text-[#0B1325] hover:bg-stone-100 transition-colors flex items-center gap-1 cursor-pointer ${
                    location.pathname.startsWith("/acri") ||
                    location.pathname.startsWith("/courses") ||
                    location.pathname.startsWith("/training") ||
                    location.pathname.startsWith("/internships")
                      ? "text-[#1B3F8B] font-bold"
                      : ""
                  }`}
                  aria-expanded={activeDropdown === "readiness"}
                >
                  <span>Career Readiness</span>
                  <ChevronDown className="h-3.5 w-3.5 text-stone-500 transition-transform group-hover/readiness:rotate-180" />
                </button>

                <div className="absolute left-0 top-full hidden group-hover/readiness:block w-72 bg-white tone-light border border-stone-200 rounded-xl shadow-xl p-3 z-50">
                  <div className="space-y-1">
                    <Link
                      to="/acri"
                      className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-stone-50 transition-colors"
                    >
                      <Award className="h-4 w-4 text-[#1B3F8B] mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                          <span>ACRI Standard</span>
                          <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                            NEW
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-500">9-Dimension readiness index</div>
                      </div>
                    </Link>

                    <Link
                      to="/career-engine/test"
                      className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-stone-50 transition-colors"
                    >
                      <Activity className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-stone-900">Work Simulation</div>
                        <div className="text-[11px] text-stone-500">Authentic PV associate terminal</div>
                      </div>
                    </Link>

                    <Link
                      to="/courses"
                      className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-stone-50 transition-colors"
                    >
                      <BookOpen className="h-4 w-4 text-stone-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-stone-900">12-Week Role Training</div>
                        <div className="text-[11px] text-stone-500">Oracle Argus, MedDRA, RAVE, SAS</div>
                      </div>
                    </Link>

                    <Link
                      to="/internships"
                      className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-stone-50 transition-colors"
                    >
                      <Layers className="h-4 w-4 text-stone-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-stone-900">Applied Internships</div>
                        <div className="text-[11px] text-stone-500">Verified proof-of-work capstone</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* 3. TOOLS & RESEARCH */}
              <div
                className="relative group/tools"
                onMouseEnter={() => setActiveDropdown("tools")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className={`px-3 py-1.5 rounded-md hover:text-[#0B1325] hover:bg-stone-100 transition-colors flex items-center gap-1 cursor-pointer ${
                    location.pathname.startsWith("/tools") ||
                    location.pathname.startsWith("/research")
                      ? "text-[#1B3F8B] font-bold"
                      : ""
                  }`}
                  aria-expanded={activeDropdown === "tools"}
                >
                  <span>Tools &amp; Research</span>
                  <ChevronDown className="h-3.5 w-3.5 text-stone-500 transition-transform group-hover/tools:rotate-180" />
                </button>

                <div className="absolute left-0 top-full hidden group-hover/tools:block w-72 bg-white tone-light border border-stone-200 rounded-xl shadow-xl p-3 z-50">
                  <div className="space-y-1">
                    <Link
                      to="/research"
                      className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-stone-50 transition-colors"
                    >
                      <FileText className="h-4 w-4 text-[#1B3F8B] mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-stone-900">Research &amp; Reports</div>
                        <div className="text-[11px] text-stone-500">Quarterly employment index</div>
                      </div>
                    </Link>

                    <Link
                      to="/tools/skill-gap-analyzer"
                      className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-stone-50 transition-colors"
                    >
                      <BarChart3 className="h-4 w-4 text-stone-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-stone-900">Skill Gap Analyzer</div>
                        <div className="text-[11px] text-stone-500">Benchmark your technical gaps</div>
                      </div>
                    </Link>

                    <Link
                      to="/tools/role-matrix"
                      className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-stone-50 transition-colors"
                    >
                      <Layers className="h-4 w-4 text-stone-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-stone-900">Role Competency Matrix</div>
                        <div className="text-[11px] text-stone-500">Compare clinical career tracks</div>
                      </div>
                    </Link>

                    <Link
                      to="/tools/cost-calculator"
                      className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-stone-50 transition-colors"
                    >
                      <Calculator className="h-4 w-4 text-stone-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-stone-900">Career ROI Calculator</div>
                        <div className="text-[11px] text-stone-500">Investment vs. starting salary</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* 4. EMPLOYERS */}
              <Link
                to="/recruiters"
                className="px-3 py-1.5 rounded-md hover:text-[#0B1325] hover:bg-stone-100 transition-colors"
              >
                Employers
              </Link>
            </nav>
          </div>

          {/* Right Action Cluster */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-stone-700 hover:text-[#0B1325] border border-stone-200 rounded-lg hover:border-stone-300 transition-colors"
            >
              Sign In
            </Link>

            <Link
              to="/career-engine/test"
              className="inline-flex items-center gap-1.5 bg-[#0B1325] hover:bg-[#1B3F8B] text-slate-50 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
            >
              <span>Take Assessment</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/career-engine/test"
              className="inline-flex items-center bg-[#0B1325] text-slate-50 px-3 py-1.5 rounded-md font-mono text-[11px] font-bold uppercase tracking-wider"
            >
              <span>Assess</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-stone-700 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-[#1B3F8B]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-b border-stone-200 bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Main Links */}
          <div className="space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-sm font-semibold text-stone-900 rounded-md hover:bg-stone-100"
            >
              Home
            </Link>

            {/* Discovery Group */}
            <div className="pt-2 pb-1 border-t border-stone-200/60">
              <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">
                Career Discovery
              </p>
              <div className="mt-1 space-y-0.5">
                <Link
                  to="/students/4th-year"
                  className="block px-3 py-1.5 text-xs text-stone-700 rounded-md hover:bg-stone-100"
                >
                  4th-Year Students
                </Link>
                <Link
                  to="/students/3rd-year"
                  className="block px-3 py-1.5 text-xs text-stone-700 rounded-md hover:bg-stone-100"
                >
                  3rd-Year Students
                </Link>
                <Link
                  to="/students/graduates"
                  className="block px-3 py-1.5 text-xs text-stone-700 rounded-md hover:bg-stone-100"
                >
                  Graduates
                </Link>
                <Link
                  to="/degrees"
                  className="block px-3 py-1.5 text-xs text-stone-700 rounded-md hover:bg-stone-100"
                >
                  Degrees &amp; Pathways
                </Link>
                <Link
                  to="/pv-associate"
                  className="block px-3 py-1.5 text-xs text-stone-700 rounded-md hover:bg-stone-100"
                >
                  Roles: PV Associate
                </Link>
              </div>
            </div>

            {/* Readiness Group */}
            <div className="pt-2 pb-1 border-t border-stone-200/60">
              <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">
                Career Readiness
              </p>
              <div className="mt-1 space-y-0.5">
                <Link
                  to="/acri"
                  className="block px-3 py-1.5 text-xs text-stone-700 rounded-md hover:bg-stone-100"
                >
                  ACRI Methodology
                </Link>
                <Link
                  to="/career-engine/test"
                  className="block px-3 py-1.5 text-xs font-semibold text-[#1B3F8B] rounded-md hover:bg-stone-100"
                >
                  Work Simulation Terminal
                </Link>
                <Link
                  to="/courses"
                  className="block px-3 py-1.5 text-xs text-stone-700 rounded-md hover:bg-stone-100"
                >
                  12-Week Role Training
                </Link>
                <Link
                  to="/internships"
                  className="block px-3 py-1.5 text-xs text-stone-700 rounded-md hover:bg-stone-100"
                >
                  Applied Internships
                </Link>
              </div>
            </div>

            {/* Tools & Research Group */}
            <div className="pt-2 pb-1 border-t border-stone-200/60">
              <p className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">
                Tools &amp; Research
              </p>
              <div className="mt-1 space-y-0.5">
                <Link
                  to="/research"
                  className="block px-3 py-1.5 text-xs text-stone-700 rounded-md hover:bg-stone-100"
                >
                  Research Reports
                </Link>
                <Link
                  to="/tools/skill-gap-analyzer"
                  className="block px-3 py-1.5 text-xs text-stone-700 rounded-md hover:bg-stone-100"
                >
                  Skill Gap Analyzer
                </Link>
                <Link
                  to="/tools/role-matrix"
                  className="block px-3 py-1.5 text-xs text-stone-700 rounded-md hover:bg-stone-100"
                >
                  Role Matrix
                </Link>
                <Link
                  to="/tools/cost-calculator"
                  className="block px-3 py-1.5 text-xs text-stone-700 rounded-md hover:bg-stone-100"
                >
                  Cost Calculator
                </Link>
              </div>
            </div>

            {/* Employers Link */}
            <div className="pt-2 border-t border-stone-200/60">
              <Link
                to="/recruiters"
                className="block px-3 py-1.5 text-xs font-semibold text-stone-900 rounded-md hover:bg-stone-100"
              >
                Employer Console &amp; Hiring
              </Link>
            </div>
          </div>

          {/* Mobile Bottom Actions */}
          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            <Link
              to="/login"
              className="w-full py-2.5 text-center text-xs font-mono font-bold uppercase tracking-wider text-stone-800 bg-white tone-light border border-stone-300 rounded-lg"
            >
              Sign In
            </Link>
            <Link
              to="/career-engine/test"
              className="w-full py-2.5 text-center text-xs font-mono font-bold uppercase tracking-wider text-slate-50 bg-[#0B1325] rounded-lg"
            >
              Take Assessment →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
