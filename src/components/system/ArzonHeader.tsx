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

type DropdownKey = "careers" | "programs" | "insights";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1557D6]/50 focus-visible:ring-offset-2";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const menuButtonBase = cx(
  "inline-flex min-h-10 items-center gap-1.5 rounded-full px-3.5",
  "text-[13px] font-semibold text-[#465268] transition-colors",
  "hover:bg-[#F5F7FA] hover:text-[#071A4A]",
  focusRing,
);

const menuItemBase = cx(
  "group flex w-full items-start gap-3 rounded-xl px-3.5 py-3",
  "text-left transition-colors hover:bg-[#F6F9FD]",
  focusRing,
);

const mobileItemBase = cx(
  "block rounded-xl px-3.5 py-3 text-sm font-semibold text-[#071A4A]",
  "hover:bg-[#F6F9FD]",
  focusRing,
);

export function ArzonHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<DropdownKey | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const location = useLocation();

  const isActive = (prefix: string | string[]) => {
    const prefixes = Array.isArray(prefix) ? prefix : [prefix];
    return prefixes.some(
      (candidate) =>
        location.pathname === candidate || location.pathname.startsWith(candidate + "/"),
    );
  };

  const closeMenus = () => {
    setActiveDropdown(null);
    setMobileOpen(false);
    setMobileExpandedSection(null);
  };

  useEffect(() => {
    closeMenus();
  }, [location.pathname]);

  useEffect(() => {
    const scrollHost = document.getElementById("app-scroll-root");
    const target: Window | HTMLElement = scrollHost ?? window;

    const handleScroll = () => {
      const top = scrollHost ? scrollHost.scrollTop : window.scrollY;
      setScrolled(top > 12);
    };

    target.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => target.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setActiveDropdown(null);
      setMobileOpen(false);
      setMobileExpandedSection(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileOpen]);

  const toggleDropdown = (key: DropdownKey) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveDropdown((current) => (current === key ? null : key));
  };

  const handleMouseEnter = (key: DropdownKey) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const toggleMobileSection = (key: DropdownKey) => {
    setMobileExpandedSection((current) => (current === key ? null : key));
  };

  const handleCounsellorClick = () => {
    window.dispatchEvent(new CustomEvent("arzon:open-counsellor-modal"));
  };

  const dropdownVisibility = (key: DropdownKey) =>
    activeDropdown === key
      ? "visible opacity-100 translate-y-0"
      : "invisible pointer-events-none opacity-0 -translate-y-1.5";

  const dropdownData = {
    careers: [
      {
        to: "/roles",
        title: "Role Insights",
        description: "Explore healthcare roles, skills, employers, and salary intelligence.",
        icon: Briefcase,
        iconClass: "bg-[#EEF6FF] text-[#1557D6]",
      },
      {
        to: "/healthcare-careers",
        title: "Healthcare Careers",
        description: "Compare career families and understand where your degree can take you.",
        icon: Layers,
        iconClass: "bg-[#F2F8F5] text-[#005B4F]",
      },
      {
        to: "/pv-associate",
        title: "Pharmacovigilance Associate",
        description: "View the flagship PV role and its 12-week role-readiness path.",
        icon: Award,
        iconClass: "bg-[#FFF7ED] text-[#B45309]",
      },
      {
        to: "/degrees",
        title: "Degrees & Specializations",
        description: "See pathways for B.Pharm, M.Pharm, Pharm.D, and life sciences.",
        icon: GraduationCap,
        iconClass: "bg-[#F5F3FF] text-[#6D4AFF]",
      },
    ],
    programs: [
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
        description: "Learn about the formal readiness assessment and verification system.",
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
    insights: [
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
        description: "Compare the capabilities expected across healthcare roles.",
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
  } satisfies Record<
    DropdownKey,
    Array<{
      to: string;
      title: string;
      description: string;
      icon: typeof Briefcase;
      iconClass: string;
    }>
  >;

  const dropdownLabels: Record<DropdownKey, { title: string; eyebrow: string; description: string }> = {
    careers: {
      title: "Find your path",
      eyebrow: "Career discovery",
      description: "Start from a role, career family, or degree.",
    },
    programs: {
      title: "Build capability",
      eyebrow: "Programs",
      description: "Assess, train, and build evidence for the roles you want.",
    },
    insights: {
      title: "Career intelligence",
      eyebrow: "Evidence first",
      description: "Use research before choosing a role or programme.",
    },
  };

  return (
    <>
      <header
        ref={headerRef}
        role="banner"
        className={cx(
          "sticky top-0 z-50 w-full border-b transition-all duration-200",
          scrolled
            ? "border-[#E4EAF2] bg-white/90 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl"
            : "border-[#E4EAF2] bg-white",
        )}
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[74px] items-center gap-4 lg:gap-6">
            <Link
              to="/"
              aria-label="Arzon Global home"
              className={cx("shrink-0 rounded-lg", focusRing)}
            >
              <ArzonLogo variant="light" size="md" />
            </Link>

            <nav
              aria-label="Primary navigation"
              className="hidden min-w-0 flex-1 items-center gap-0.5 lg:flex"
            >
              {(["careers", "programs", "insights"] as DropdownKey[]).map((key) => {
                const active = isActive(
                  key === "careers"
                    ? ["/roles", "/pv-associate", "/degrees", "/healthcare-careers"]
                    : key === "programs"
                      ? ["/courses", "/acri", "/internships"]
                      : ["/research", "/tools", "/comparisons"],
                );

                return (
                  <div
                    key={key}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(key)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      className={cx(menuButtonBase, active && "bg-[#F0F6FF] text-[#1557D6]")}
                      aria-haspopup="true"
                      aria-expanded={activeDropdown === key}
                      aria-controls={"arzon-nav-" + key}
                      onClick={() => toggleDropdown(key)}
                    >
                      {key === "careers" ? "Careers" : key === "programs" ? "Programs" : "Insights"}
                      <ChevronDown
                        className={cx(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          activeDropdown === key && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    </button>

                    <div
                      id={"arzon-nav-" + key}
                      className={cx(
                        "absolute top-full left-0 w-[410px] pt-3 transition-all duration-150",
                        dropdownVisibility(key),
                      )}
                      onMouseEnter={() => handleMouseEnter(key)}
                    >
                      <div className="overflow-hidden rounded-2xl border border-[#E4EAF2] bg-white p-2 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
                        <div className="px-3.5 py-2.5">
                          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A95A6]">
                            {dropdownLabels[key].eyebrow}
                          </p>
                          <p className="mt-0.5 text-sm font-bold text-[#071A4A]">
                            {dropdownLabels[key].title}
                          </p>
                          <p className="mt-0.5 text-xs text-[#69758A]">
                            {dropdownLabels[key].description}
                          </p>
                        </div>

                        {dropdownData[key].map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.to}
                              to={item.to}
                              onClick={closeMenus}
                              className={menuItemBase}
                            >
                              <span
                                className={cx(
                                  "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                                  item.iconClass,
                                )}
                              >
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

              <Link
                to="/recruiters"
                className={cx(menuButtonBase, isActive("/recruiters") && "bg-[#F0F6FF] text-[#1557D6]")}
              >
                For Colleges
              </Link>

              <Link
                to="/about"
                className={cx(menuButtonBase, isActive("/about") && "bg-[#F0F6FF] text-[#1557D6]")}
              >
                About
              </Link>
            </nav>

            <div className="ml-auto hidden shrink-0 items-center gap-1.5 lg:flex">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className={cx(
                  "inline-flex h-10 items-center gap-2 rounded-full border border-[#E4EAF2] bg-white px-3.5",
                  "text-xs font-medium text-[#69758A] shadow-[0_2px_10px_rgba(15,23,42,0.03)]",
                  "transition-all hover:border-[#CBD5E1] hover:text-[#071A4A]",
                  focusRing,
                )}
                title="Search (Ctrl+K or ⌘K)"
                aria-label="Search Arzon"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                <span className="hidden xl:inline">Search</span>
                <kbd className="hidden xl:inline-flex rounded-md border border-[#E4EAF2] bg-[#F8FAFC] px-1.5 py-0.5 font-mono text-[10px] text-[#8A95A6]">
                  ⌘K
                </kbd>
              </button>

              <Link
                to="/login"
                className={cx(
                  "inline-flex h-10 items-center rounded-full px-3.5 text-xs font-semibold text-[#465268]",
                  "transition-colors hover:text-[#071A4A]",
                  focusRing,
                )}
              >
                Sign in
              </Link>

              <Link
                to="/career-engine/start"
                className={cx(
                  "inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#071A4A] px-4.5",
                  "text-xs font-bold text-white shadow-sm transition-all hover:-translate-y-px",
                  "hover:bg-[#1557D6] hover:shadow-md",
                  focusRing,
                )}
              >
                Check my fit
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="ml-auto flex items-center gap-1.5 lg:hidden">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className={cx(
                  "inline-flex h-10 w-10 items-center justify-center rounded-full text-[#465268]",
                  "transition-colors hover:bg-[#F5F7FA]",
                  focusRing,
                )}
                aria-label="Search Arzon"
              >
                <Search className="h-[18px] w-[18px]" aria-hidden="true" />
              </button>

              <Link
                to="/career-engine/start"
                className={cx(
                  "hidden h-10 items-center justify-center rounded-full bg-[#071A4A] px-3.5",
                  "text-xs font-bold text-white sm:inline-flex",
                  focusRing,
                )}
              >
                Check my fit
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                className={cx(
                  "inline-flex h-10 w-10 items-center justify-center rounded-full text-[#071A4A]",
                  "transition-colors hover:bg-[#F5F7FA]",
                  focusRing,
                )}
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
                aria-controls="arzon-mobile-navigation"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div
            id="arzon-mobile-navigation"
            className="lg:hidden max-h-[calc(100dvh-74px)] overflow-y-auto border-t border-[#E4EAF2] bg-white"
          >
            <nav aria-label="Mobile navigation" className="mx-auto max-w-[1440px] px-4 py-4 sm:px-6">
              <div className="mb-4 rounded-2xl border border-[#DDE5EE] bg-[#F7FAFD] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A95A6]">
                  Career first
                </p>
                <p className="mt-1 text-sm font-semibold text-[#071A4A]">
                  Start with the role you want to understand.
                </p>
                <Link
                  to="/career-engine/start"
                  onClick={closeMenus}
                  className={cx(
                    "mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl",
                    "bg-[#071A4A] px-4 text-xs font-bold text-white shadow-sm hover:bg-[#1557D6]",
                    focusRing,
                  )}
                >
                  Check my fit
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>

              <Link to="/" onClick={closeMenus} className={mobileItemBase}>
                Home
              </Link>

              {(["careers", "programs", "insights"] as DropdownKey[]).map((key) => (
                <div key={key} className="mt-2 overflow-hidden rounded-xl border border-[#E4EAF2]">
                  <button
                    type="button"
                    onClick={() => toggleMobileSection(key)}
                    className={cx(
                      "flex w-full items-center justify-between px-3.5 py-3 text-left",
                      focusRing,
                    )}
                    aria-expanded={mobileExpandedSection === key}
                    aria-controls={"mobile-" + key}
                  >
                    <span>
                      <span className="block text-sm font-semibold text-[#071A4A]">
                        {key === "careers" ? "Careers" : key === "programs" ? "Programs" : "Insights"}
                      </span>
                      <span className="mt-0.5 block text-[11px] text-[#8A95A6]">
                        {dropdownLabels[key].description}
                      </span>
                    </span>
                    <ChevronDown
                      className={cx(
                        "h-4 w-4 text-[#69758A] transition-transform",
                        mobileExpandedSection === key && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  {mobileExpandedSection === key && (
                    <div id={"mobile-" + key} className="border-t border-[#E4EAF2] bg-[#FAFCFE] p-2">
                      {dropdownData[key].map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={closeMenus}
                          className={cx(
                            "block rounded-lg px-3 py-2.5 text-sm text-[#465268]",
                            "hover:bg-white hover:text-[#071A4A]",
                            focusRing,
                          )}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link
                  to="/recruiters"
                  onClick={closeMenus}
                  className={cx(
                    "rounded-xl border border-[#E4EAF2] px-3.5 py-3 text-center text-sm font-semibold",
                    "text-[#071A4A] hover:bg-[#F6F9FD]",
                    focusRing,
                  )}
                >
                  For Colleges
                </Link>
                <Link
                  to="/about"
                  onClick={closeMenus}
                  className={cx(
                    "rounded-xl border border-[#E4EAF2] px-3.5 py-3 text-center text-sm font-semibold",
                    "text-[#071A4A] hover:bg-[#F6F9FD]",
                    focusRing,
                  )}
                >
                  About
                </Link>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[#E4EAF2] pt-4">
                <Link
                  to="/login"
                  onClick={closeMenus}
                  className={cx(
                    "inline-flex h-11 items-center justify-center rounded-xl border border-[#D7DFE8] px-4",
                    "text-xs font-bold text-[#071A4A] hover:bg-[#F6F9FD]",
                    focusRing,
                  )}
                >
                  Sign in
                </Link>
                <a
                  href="https://wa.me/918977626999?text=Hello%20Arzon%2C%20I%20would%20like%20to%20talk%20to%20a%20career%20counsellor"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    closeMenus();
                    handleCounsellorClick();
                  }}
                  className={cx(
                    "inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-[#071A4A] px-4",
                    "text-xs font-bold text-white hover:bg-[#1557D6]",
                    focusRing,
                  )}
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
