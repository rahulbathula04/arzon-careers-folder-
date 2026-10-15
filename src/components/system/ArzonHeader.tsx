import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight, Menu, Search, X } from "lucide-react";
import { ArzonLogo } from "../acri/ArzonLogo";
import { GlobalSearchModal } from "./GlobalSearchModal";

const NAV_ITEMS = [
  { label: "Careers", to: "/careers", description: "Explore healthcare roles and job paths" },
  { label: "Degrees", to: "/degrees", description: "Explore career paths by qualification" },
  { label: "Career Assessment", to: "/career-assessment", description: "Discover which roles fit you" },
  { label: "Resources", to: "/resources", description: "Role guides, research and career insights" },
  { label: "Reviews", to: "/reviews", description: "Real experiences from learners" },
] as const;

const SECONDARY_ITEMS: Array<{ label: string; to: any }> = [
  { label: "Roles", to: "/roles" },
  { label: "Programmes", to: "/courses" },
  { label: "For Employers", to: "/recruiters" },
  { label: "For Colleges", to: "/tpos" },
  { label: "About Arzon", to: "/about" },
  { label: "Why Arzon", to: "/why-arzon" },
] as const;

export function ArzonHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const root = document.getElementById("app-scroll-root");
    if (!root) return;
    const onScroll = () => setScrolled(root.scrollTop > 40);
    root.addEventListener("scroll", onScroll, { passive: true });
    return () => root.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <header
        className={[
          "arzon-site-header sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-all duration-200 tone-light",
          scrolled
            ? "border-[#E4EAF2] shadow-[0_2px_16px_rgba(7,26,74,0.07)]"
            : "border-[#E4EAF2]/60",
        ].join(" ")}
      >
        <div className="arzon-site-container">
          <div className="flex min-w-0 h-16 items-center justify-between gap-2 lg:h-[4.25rem]">
            {/* Logo */}
            <Link
              to="/"
              aria-label="Arzon Global home"
              data-testid="arzon-global-logo"
              className="flex min-w-0 sm:min-w-[150px] shrink-0 items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1557D6] focus-visible:ring-offset-2"
            >
              <ArzonLogo variant="light" size="md" className="!flex" />
            </Link>

            {/* Desktop Nav */}
            <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => {
                const active =
                  location.pathname === item.to ||
                  location.pathname.startsWith(item.to + "/");
                return (
                  <Link
                    key={item.to}
                    to={item.to as any}
                    className={[
                      "relative rounded-md px-2.5 py-1.5 text-xs transition-colors whitespace-nowrap font-bold",
                      active
                        ? "text-[#071A4A]"
                        : "text-slate-500 hover:text-[#071A4A]",
                    ].join(" ")}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute inset-x-2 -bottom-[1px] h-[2px] rounded-full bg-[#1557D6]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Search */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="inline-flex h-8 items-center gap-2 rounded-full border border-[#E4EAF2] bg-[#F7F9FE] px-3 text-xs font-medium text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 transition-all cursor-pointer"
                aria-label="Search Arzon (Cmd+K)"
              >
                <Search className="h-3.5 w-3.5 text-slate-400" />
                <span>Search</span>
                <kbd className="rounded bg-white px-1 py-0.5 text-[10px] font-mono text-slate-400 border border-[#E4EAF2] tone-light">
                  ⌘K
                </kbd>
              </button>

              {/* Divider */}
              <div className="h-5 w-px bg-[#E4EAF2]" />

              {/* Sign in */}
              <Link
                to="/login"
                className="inline-flex h-8 items-center rounded-full px-3 text-xs font-semibold text-slate-500 hover:bg-slate-50 hover:text-[#071A4A] transition-colors"
              >
                Sign in
              </Link>

              {/* Primary CTA */}
              <Link
                to="/career-assessment"
                data-testid="primary-career-cta"
                className="ap-btn-primary text-xs px-4 py-2 min-h-0 h-8 shadow-none"
              >
                <span>Find My Career Path</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="grid h-9 w-9 place-items-center rounded-full border border-slate-200/80 bg-[#F8FAFC] text-slate-600 hover:bg-slate-100 active:scale-95 transition-transform"
                aria-label="Search Arzon"
              >
                <Search className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-slate-200/80 bg-[#F8FAFC] px-3 text-xs font-bold text-[#071A4A] hover:bg-slate-100 active:scale-95 transition-transform"
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <>
                    <X className="h-4 w-4 text-[#1557D6]" />
                    <span>Close</span>
                  </>
                ) : (
                  <>
                    <Menu className="h-4 w-4 text-[#071A4A]" />
                    <span>Menu</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Full-Screen iOS Sheet Modal */}
        {mobileOpen ? (
          <div className="arzon-site-mobile fixed inset-x-0 top-16 bottom-0 z-50 bg-white/96 backdrop-blur-2xl tone-light card-light lg:hidden overflow-y-auto overscroll-contain pb-12 shadow-2xl motion-safe:animate-in motion-safe:fade-in duration-200 flex flex-col justify-between">
            <nav aria-label="Mobile navigation" className="arzon-site-container py-4 space-y-4">
              {/* Apple-style iOS Spotlight Search Bar */}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setSearchOpen(true);
                }}
                className="w-full flex items-center justify-between rounded-2xl border border-slate-200/80 bg-[#F8FAFC] px-4 py-3 text-left transition-all active:scale-[0.99] shadow-2xs"
              >
                <div className="flex items-center gap-2.5 text-xs text-slate-500">
                  <Search className="h-4 w-4 text-[#1557D6]" />
                  <span>Search roles, degrees, tools, JDs...</span>
                </div>
                <kbd className="rounded-md bg-white border border-slate-200 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 tone-light">
                  ⌘K
                </kbd>
              </button>

              {/* Group 1: Core Healthcare Career Intelligence */}
              <div>
                <div className="px-2 pb-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  CAREER INTELLIGENCE & PATHS
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-white divide-y divide-slate-100 overflow-hidden shadow-xs tone-light card-light">
                  {NAV_ITEMS.map((item) => {
                    const active =
                      location.pathname === item.to ||
                      location.pathname.startsWith(item.to + "/");
                    return (
                      <Link
                        key={item.to}
                        to={item.to as any}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between p-3.5 transition-colors active:bg-slate-50 min-h-[48px] ${
                          active ? "bg-[#EEF6FF]/60" : ""
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className={`text-sm font-bold ${active ? "text-[#1557D6]" : "text-[#071A4A]"}`}>
                            {item.label}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate mt-0.5">
                            {item.description}
                          </div>
                        </div>
                        <ArrowRight className={`h-4 w-4 shrink-0 ${active ? "text-[#1557D6]" : "text-slate-300"}`} />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Group 2: Institutional & Verification */}
              <div>
                <div className="px-2 pb-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  PROGRAMMES & INSTITUTIONAL
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {SECONDARY_ITEMS.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-white p-3 text-xs font-semibold text-[#071A4A] hover:bg-slate-50 active:scale-[0.98] transition-all tone-light card-light shadow-2xs"
                    >
                      <span className="truncate">{item.label}</span>
                      <ArrowRight className="h-3 w-3 text-slate-400 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Pinned Bottom Actions */}
              <div className="pt-2 space-y-2.5">
                <Link
                  to="/career-assessment"
                  onClick={() => setMobileOpen(false)}
                  className="w-full h-12 rounded-full bg-[#1557D6] hover:bg-[#1044A5] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all"
                >
                  <span>Find My Career Path</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full h-11 rounded-full border border-slate-200 bg-[#F8FAFC] text-slate-700 font-semibold text-xs flex items-center justify-center active:scale-[0.98] transition-all tone-light card-light"
                >
                  Candidate Portal Sign In
                </Link>
              </div>
            </nav>
          </div>
        ) : null}
      </header>

      <GlobalSearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
