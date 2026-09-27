import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  ChevronDown,
  FileText,
  GraduationCap,
  Layers,
  Menu,
  Search,
  X,
} from "lucide-react";
import { ArzonLogo } from "../acri/ArzonLogo";
import { GlobalSearchModal } from "./GlobalSearchModal";

type DropdownKey = "careers" | "programs" | "resources";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1557D6]/50 focus-visible:ring-offset-2";

const pillButton =
  "inline-flex h-10 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-semibold text-[#465268] transition-colors hover:bg-[#F5F7FA] hover:text-[#071A4A]";

const dropdownItem =
  "group flex items-start gap-3 rounded-xl px-3.5 py-3 text-left transition-colors hover:bg-[#F6F9FD]";

export function ArzonHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<DropdownKey | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const location = useLocation();

  const isActive = (paths: string[]) =>
    paths.some((path) => location.pathname === path || location.pathname.startsWith(path + "/"));

  const closeAll = () => {
    setActiveDropdown(null);
    setMobileExpanded(null);
    setMobileOpen(false);
  };

  useEffect(() => {
    closeAll();
  }, [location.pathname]);

  useEffect(() => {
    const scrollHost = document.getElementById("app-scroll-root");
    const target: HTMLElement | Window = scrollHost ?? window;

    const onScroll = () => {
      setScrolled((scrollHost?.scrollTop ?? window.scrollY) > 12);
    };

    target.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => target.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setActiveDropdown(null);
      setMobileExpanded(null);
      setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const openDropdown = (key: DropdownKey) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActiveDropdown(key);
  };

  const scheduleClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setActiveDropdown(null), 130);
  };

  const dropdownData = {
    careers: {
      label: "Careers",
      paths: ["/roles", "/degrees", "/healthcare-careers", "/pv-associate"],
      width: "w-[390px]",
      eyebrow: "Career discovery",
      title: "Find your path",
      description: "Start from a role, career family, or degree.",
      items: [
        {
          to: "/roles",
          title: "Role Insights",
          description: "Healthcare roles, skills, employers, and salary intelligence.",
          icon: Briefcase,
          iconClass: "bg-[#EEF6FF] text-[#1557D6]",
        },
        {
          to: "/healthcare-careers",
          title: "Healthcare Careers",
          description: "Compare career families and see where your degree can lead.",
          icon: Layers,
          iconClass: "bg-[#F2F8F5] text-[#005B4F]",
        },
        {
          to: "/pv-associate",
          title: "Pharmacovigilance Associate",
          description: "Explore the flagship PV role and 12-week readiness path.",
          icon: Award,
          iconClass: "bg-[#FFF7ED] text-[#B45309]",
        },
        {
          to: "/degrees",
          title: "Degrees & Specializations",
          description: "Pathways for B.Pharm, M.Pharm, Pharm.D, and life sciences.",
          icon: GraduationCap,
          iconClass: "bg-[#F5F3FF] text-[#6D4AFF]",
        },
      ],
    },
    programs: {
      label: "Programs",
      paths: ["/courses", "/acri", "/internships"],
      width: "w-[370px]",
      eyebrow: "Build capability",
      title: "Programs that connect to roles",
      description: "Assess, train, and build evidence for the career you want.",
      items: [
        {
          to: "/courses",
          title: "Training Programs",
          description: "Role-first programmes, projects, and practical learning paths.",
          icon: BookOpen,
          iconClass: "bg-[#EEF6FF] text-[#1557D6]",
        },
        {
          to: "/acri",
          title: "ACRI Readiness Assessment",
          description: "Formal occupational readiness assessment and verification.",
          icon: Award,
          iconClass: "bg-[#F2F8F5] text-[#005B4F]",
        },
        {
          to: "/internships",
          title: "Applied Internships",
          description: "Build real work evidence through structured internship experiences.",
          icon: Layers,
          iconClass: "bg-[#FFF7ED] text-[#B45309]",
        },
      ],
    },
    resources: {
      label: "Resources",
      paths: ["/research", "/tools", "/comparisons", "/blog", "/starter-kit"],
      width: "w-[400px]",
      eyebrow: "Career intelligence",
      title: "Use evidence before you decide",
      description: "Research, tools, comparisons, and practical career resources.",
      items: [
        {
          to: "/research",
          title: "Research & Reports",
          description: "Hiring, salary, skill, and healthcare career intelligence.",
          icon: FileText,
          iconClass: "bg-[#EEF6FF] text-[#1557D6]",
        },
        {
          to: "/tools/role-matrix",
          title: "Role Competency Matrix",
          description: "Compare capabilities expected across healthcare roles.",
          icon: BarChart3,
          iconClass: "bg-[#F5F3FF] text-[#6D4AFF]",
        },
        {
          to: "/tools/skill-gap-analyzer",
          title: "Skill Gap Analyzer",
          description: "Benchmark your current capabilities against role requirements.",
          icon: BarChart3,
          iconClass: "bg-[#F2F8F5] text-[#005B4F]",
        },
        {
          to: "/comparisons",
          title: "Career Comparisons",
          description: "Compare adjacent career paths side by side.",
          icon: Layers,
          iconClass: "bg-[#FFF7ED] text-[#B45309]",
        },
      ],
    },
  } satisfies Record<DropdownKey, {
    label: string;
    paths: string[];
    width: string;
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      to: string;
      title: string;
      description: string;
      icon: typeof Briefcase;
      iconClass: string;
    }>;
  }>;

  const directLinks = [
    { to: "/tpos", label: "For Colleges", paths: ["/tpos"] },
    { to: "/about", label: "About", paths: ["/about"] },
  ];

  return (
    <>
      <header
        ref={headerRef}
        role="banner"
        className={`sticky top-0 z-50 w-full border-b border-[#E4EAF2] transition-[background-color,box-shadow,backdrop-filter] duration-200 ${
          scrolled
            ? "bg-white/90 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl"
            : "bg-white"
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[74px] items-center gap-4 lg:gap-6">
            <Link
              to="/"
              aria-label="Arzon Global home"
              className={`shrink-0 rounded-lg ${focusRing}`}
            >
              <ArzonLogo variant="light" size="md" />
            </Link>

            <nav
              aria-label="Primary navigation"
              className="hidden min-w-0 flex-1 items-center gap-0.5 xl:gap-1 lg:flex"
            >
              {(Object.keys(dropdownData) as DropdownKey[]).map((key) => {
                const data = dropdownData[key];
                const active = isActive(data.paths);

                return (
                  <div
                    key={key}
                    className="relative"
                    onMouseEnter={() => openDropdown(key)}
                    onMouseLeave={scheduleClose}
                  >
                    <button
                      type="button"
                      className={`${pillButton} ${active || activeDropdown === key ? "bg-[#F0F6FF] text-[#1557D6]" : ""} ${focusRing}`}
                      aria-haspopup="true"
                      aria-expanded={activeDropdown === key}
                      aria-controls={`arzon-menu-${key}`}
                      onClick={() => {
                        if (activeDropdown === key) setActiveDropdown(null);
                        else openDropdown(key);
                      }}
                    >
                      {data.label}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform ${activeDropdown === key ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>

                    <div
                      id={`arzon-menu-${key}`}
                      className={`absolute left-0 top-full pt-3 ${data.width} transition-all duration-150 ${
                        activeDropdown === key
                          ? "visible translate-y-0 opacity-100"
                          : "pointer-events-none invisible -translate-y-1 opacity-0"
                      }`}
                      onMouseEnter={() => openDropdown(key)}
                    >
                      <div className="overflow-hidden rounded-2xl border border-[#E4EAF2] bg-white p-2 shadow-[0_24px_70px_rgba(15,23,42,0.13)]">
                        <div className="px-3.5 py-3">
                          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A95A6]">
                            {data.eyebrow}
                          </div>
                          <div className="mt-1 text-sm font-bold text-[#071A4A]">{data.title}</div>
                          <div className="mt-0.5 text-xs leading-5 text-[#69758A]">{data.description}</div>
                        </div>

                        {data.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.to}
                              to={item.to}
                              onClick={closeAll}
                              className={`${dropdownItem} ${focusRing}`}
                            >
                              <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.iconClass}`}>
                                <Icon className="h-4 w-4" aria-hidden="true" />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-bold text-[#071A4A] group-hover:text-[#1557D6]">
                                  {item.title}
                                </span>
                                <span className="mt-0.5 block text-xs leading-5 text-[#69758A]">
                                  {item.description}
                                </span>
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}

              {directLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`${pillButton} ${isActive(item.paths) ? "bg-[#F0F6FF] text-[#1557D6]" : ""} ${focusRing}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="ml-auto hidden shrink-0 items-center gap-1.5 lg:flex">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className={`inline-flex h-10 items-center gap-2 rounded-full border border-[#E4EAF2] bg-white px-3.5 text-xs font-medium text-[#69758A] transition-all hover:border-[#CBD5E1] hover:text-[#071A4A] ${focusRing}`}
                aria-label="Search Arzon"
                title="Search (Ctrl+K or ⌘K)"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                <span className="hidden xl:inline">Search</span>
                <kbd className="hidden 2xl:inline-flex rounded-md border border-[#E4EAF2] bg-[#F8FAFC] px-1.5 py-0.5 font-mono text-[10px] text-[#8A95A6]">
                  ⌘K
                </kbd>
              </button>

              <Link
                to="/login"
                className={`inline-flex h-10 items-center rounded-full px-3.5 text-xs font-semibold text-[#465268] hover:text-[#071A4A] ${focusRing}`}
              >
                Sign in
              </Link>

              <Link
                to="/career-engine/start"
                className={`inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#071A4A] px-4 text-xs font-bold text-white shadow-sm transition-all hover:-translate-y-px hover:bg-[#1557D6] hover:shadow-md ${focusRing}`}
              >
                Check my fit
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="ml-auto flex items-center gap-1.5 lg:hidden">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-[#465268] hover:bg-[#F5F7FA] ${focusRing}`}
                aria-label="Search Arzon"
              >
                <Search className="h-[18px] w-[18px]" aria-hidden="true" />
              </button>

              <Link
                to="/career-engine/start"
                className={`hidden h-10 items-center justify-center rounded-full bg-[#071A4A] px-3.5 text-xs font-bold text-white sm:inline-flex ${focusRing}`}
              >
                Fit test
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-[#071A4A] hover:bg-[#F5F7FA] ${focusRing}`}
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
                aria-controls="arzon-mobile-navigation"
              >
                {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div id="arzon-mobile-navigation" className="lg:hidden max-h-[calc(100dvh-74px)] overflow-y-auto border-t border-[#E4EAF2] bg-white">
            <nav aria-label="Mobile navigation" className="mx-auto max-w-[1440px] px-4 py-4 sm:px-6">
              <div className="mb-4 rounded-2xl border border-[#DDE5EE] bg-[#F7FAFD] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A95A6]">Career first</p>
                <p className="mt-1 text-sm font-semibold text-[#071A4A]">Start with the role you want to understand.</p>
                <Link
                  to="/career-engine/start"
                  onClick={closeAll}
                  className={`mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#071A4A] px-4 text-xs font-bold text-white hover:bg-[#1557D6] ${focusRing}`}
                >
                  Check my fit
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>

              <Link to="/" onClick={closeAll} className={`block rounded-xl px-3.5 py-3 text-sm font-semibold text-[#071A4A] hover:bg-[#F6F9FD] ${focusRing}`}>
                Home
              </Link>

              {(Object.keys(dropdownData) as DropdownKey[]).map((key) => {
                const data = dropdownData[key];
                return (
                  <div key={key} className="mt-2 overflow-hidden rounded-xl border border-[#E4EAF2]">
                    <button
                      type="button"
                      onClick={() => setMobileExpanded((current) => (current === key ? null : key))}
                      className={`flex w-full items-center justify-between px-3.5 py-3 text-left ${focusRing}`}
                      aria-expanded={mobileExpanded === key}
                      aria-controls={`mobile-${key}`}
                    >
                      <span>
                        <span className="block text-sm font-semibold text-[#071A4A]">{data.label}</span>
                        <span className="mt-0.5 block text-[11px] text-[#8A95A6]">{data.description}</span>
                      </span>
                      <ChevronDown className={`h-4 w-4 text-[#69758A] transition-transform ${mobileExpanded === key ? "rotate-180" : ""}`} aria-hidden="true" />
                    </button>

                    {mobileExpanded === key && (
                      <div id={`mobile-${key}`} className="border-t border-[#E4EAF2] bg-[#FAFCFE] p-2">
                        {data.items.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={closeAll}
                            className={`block rounded-lg px-3 py-2.5 text-sm text-[#465268] hover:bg-white hover:text-[#071A4A] ${focusRing}`}
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {directLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeAll}
                  className={`mt-2 block rounded-xl border border-[#E4EAF2] px-3.5 py-3 text-sm font-semibold text-[#071A4A] hover:bg-[#F6F9FD] ${focusRing}`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[#E4EAF2] pt-4">
                <Link
                  to="/login"
                  onClick={closeAll}
                  className={`inline-flex h-11 items-center justify-center rounded-xl border border-[#D7DFE8] px-4 text-xs font-bold text-[#071A4A] hover:bg-[#F6F9FD] ${focusRing}`}
                >
                  Sign in
                </Link>
                <a
                  href="https://wa.me/918977626999?text=Hello%20Arzon%2C%20I%20would%20like%20to%20talk%20to%20a%20career%20counsellor"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeAll}
                  className={`inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-[#071A4A] px-4 text-xs font-bold text-white hover:bg-[#1557D6] ${focusRing}`}
                >
                  Talk to counsellor
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      <GlobalSearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
