import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight, Menu, Search, X } from "lucide-react";
import { ArzonLogo } from "../acri/ArzonLogo";
import { GlobalSearchModal } from "./GlobalSearchModal";

const NAV_ITEMS = [
  { label: "Careers", to: "/careers", description: "Explore healthcare roles and job paths" },
  { label: "Degrees", to: "/degrees", description: "Explore career paths by qualification" },
  { label: "Career Assessment", to: "/career-assessment", description: "Discover which roles fit you" },
  { label: "ACRI Certification", to: "/acri", description: "Demonstrate Pharmacovigilance readiness" },
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
  { label: "Verify a Credential", to: "/verify" },
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
            <div className="flex items-center gap-1 lg:hidden">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="grid h-9 w-9 place-items-center rounded-full text-slate-600 hover:bg-slate-50"
                aria-label="Search Arzon"
              >
                <Search className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                className="grid h-9 w-9 place-items-center rounded-md text-slate-700 hover:bg-slate-50"
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen ? (
          <div className="arzon-site-mobile border-t border-[#E4EAF2] bg-white/98 backdrop-blur-md tone-light lg:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain pb-8 shadow-[0_18px_40px_rgba(15,23,42,0.1)]">
            <nav aria-label="Mobile navigation" className="arzon-site-container py-4">
              {/* Brand strip */}
              <div className="mb-3 pb-3 border-b border-[#E4EAF2]">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#1557D6] motion-safe:animate-pulse" />
                  <span className="ap-kicker">Healthcare Career Intelligence</span>
                </div>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  Explore roles, build skills, create career proof.
                </p>
              </div>

              {/* Primary nav */}
              <div className="grid gap-0.5">
                {NAV_ITEMS.map((item) => {
                  const active =
                    location.pathname === item.to ||
                    location.pathname.startsWith(item.to + "/");
                  return (
                    <Link
                      key={item.to}
                      to={item.to as any}
                      onClick={() => setMobileOpen(false)}
                      className={[
                        "flex flex-col gap-0.5 rounded-xl px-3 py-2.5 transition-colors min-h-[44px] justify-center",
                        active
                          ? "bg-[#EEF6FF] border border-[#D0E1FD]"
                          : "hover:bg-slate-50",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${active ? "text-[#071A4A]" : "text-slate-800"}`}>
                          {item.label}
                        </span>
                        <ArrowRight className={`h-3.5 w-3.5 ${active ? "text-[#1557D6]" : "text-slate-400"}`} />
                      </div>
                      <span className="text-[11px] text-slate-500 leading-normal">{item.description}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Secondary nav */}
              <div className="mt-3 border-t border-[#E4EAF2] pt-3">
                <p className="px-3 pb-2 ap-kicker-muted">Explore Arzon</p>
                <div className="grid gap-0.5 sm:grid-cols-2">
                  {SECONDARY_ITEMS.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className="flex min-h-[40px] items-center rounded-xl px-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile CTAs */}
              <div className="mt-4 grid gap-2 border-t border-[#E4EAF2] pt-3 sm:grid-cols-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="ap-btn-secondary w-full justify-center text-xs min-h-[44px]"
                >
                  Sign In
                </Link>
                <Link
                  to="/career-assessment"
                  onClick={() => setMobileOpen(false)}
                  className="ap-btn-primary w-full justify-center text-xs min-h-[44px]"
                >
                  Find My Career Path <ArrowRight className="h-3.5 w-3.5 ml-1" />
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
