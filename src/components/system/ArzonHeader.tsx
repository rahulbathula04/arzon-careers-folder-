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
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

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
      <header className="arzon-site-header sticky top-0 z-50 border-b border-[var(--arzon-border)] bg-white tone-light">
        <div className="arzon-site-container">
          <div className="flex min-w-0 h-16 items-center justify-between gap-2 lg:h-[4.25rem]">
            <Link
              to="/"
              aria-label="Arzon Global home"
              data-testid="arzon-global-logo"
              className="flex min-w-[150px] shrink-0 items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <ArzonLogo variant="light" size="md" className="!flex" />
            </Link>

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
                      "rounded-md px-2.5 py-1.5 text-xs font-bold transition-colors whitespace-nowrap",
                      active
                        ? "text-[var(--arzon-blue-700)] bg-blue-50/50"
                        : "text-slate-600 hover:bg-slate-50 hover:text-[var(--arzon-ink-strong)]",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              <Link
                to="/login"
                className="inline-flex h-9 items-center rounded-full px-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Login
              </Link>
              <Link
                to="/career-assessment"
                data-testid="primary-career-cta"
                className="arzon-button-primary h-9 rounded-full px-3.5 text-xs font-bold shadow-xs whitespace-nowrap"
              >
                Free Assessment <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </div>

            <div className="flex items-center gap-1 lg:hidden">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="grid h-10 w-10 place-items-center rounded-full text-slate-600 hover:bg-slate-50"
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

        {mobileOpen ? (
          <div className="arzon-site-mobile border-t border-[var(--arzon-border)] bg-white tone-light lg:hidden">
            <nav aria-label="Mobile navigation" className="arzon-site-container py-4">
              <div className="mb-3 px-3 pb-2 border-b border-slate-100">
                <span className="font-serif text-sm font-bold text-[#071A4A]">ARZON GLOBAL</span>
                <span className="block text-[11px] text-slate-500">Healthcare career intelligence</span>
              </div>

              <div className="grid gap-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to as any}
                    onClick={() => setMobileOpen(false)}
                    className="flex flex-col gap-0.5 rounded-xl px-3 py-2 transition-colors hover:bg-slate-50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[var(--arzon-ink-strong)]">{item.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                    </div>
                    <span className="text-[11px] text-slate-500 leading-normal">{item.description}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-3 border-t border-slate-100 pt-3">
                <p className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Explore Arzon
                </p>
                <div className="grid gap-1 sm:grid-cols-2">
                  {SECONDARY_ITEMS.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className="flex min-h-9 items-center rounded-xl px-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-3 grid gap-2 border-t border-slate-100 pt-3 sm:grid-cols-2">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="flex min-h-10 items-center justify-center rounded-xl bg-slate-100 px-4 text-xs font-bold text-slate-700 hover:bg-slate-200 w-full">
                  Login
                </Link>
                <Link to="/career-assessment" onClick={() => setMobileOpen(false)} className="ap-btn ap-btn-primary w-full justify-center text-xs">
                  Free Career Assessment <ArrowRight className="h-3.5 w-3.5 ml-1" />
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
