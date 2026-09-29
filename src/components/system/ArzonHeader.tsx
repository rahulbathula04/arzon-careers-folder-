import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight, Menu, Search, X } from "lucide-react";
import { ArzonLogo } from "../acri/ArzonLogo";
import { GlobalSearchModal } from "./GlobalSearchModal";

const NAV_ITEMS = [
  { label: "Careers", to: "/healthcare-careers" },
  { label: "Degrees", to: "/degrees" },
  { label: "Career Engine", to: "/career-engine" },
  { label: "Resources", to: "/research" },
  { label: "Reviews", to: "/reviews" },
] as const;

const SECONDARY_ITEMS: Array<{ label: string; to: any }> = [
  { label: "Roles", to: "/roles" },
  { label: "Programmes", to: "/courses" },
  { label: "For Employers", to: "/recruiters" },
  { label: "For Colleges", to: "/tpos" },
  { label: "About Arzon", to: "/about" },
  { label: "Why Arzon", to: "/why-arzon" },
  { label: "Reviews & Feedback", to: "/reviews" },
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
      <header className="arzon-site-header sticky top-0 z-50 border-b border-[var(--arzon-border)] bg-white tone-light/90 backdrop-blur-md">
        <div className="arzon-site-container">
          <div className="flex h-16 items-center justify-between gap-5 lg:h-[4.5rem]">
            <Link
              to="/"
              aria-label="Arzon Global home"
              className="shrink-0 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <ArzonLogo variant="light" size="sm" />
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
                      "rounded-md px-3 py-2 text-xs font-bold transition-colors",
                      active
                        ? "text-[var(--arzon-blue-700)]"
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
                className="inline-flex h-10 items-center rounded-full px-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Login
              </Link>
              <Link to="/career-engine" data-testid="primary-career-cta" className="arzon-button-primary h-10 rounded-full px-4 text-xs">
                Get My Career Plan <ArrowRight className="h-3.5 w-3.5" />
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
            <nav aria-label="Mobile navigation" className="arzon-site-container py-5">
              <div className="grid gap-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to as any}
                    onClick={() => setMobileOpen(false)}
                    className="flex min-h-11 items-center justify-between rounded-xl px-3 text-sm font-bold text-[var(--arzon-ink-strong)] hover:bg-slate-50"
                  >
                    {item.label}
                    <ArrowRight className="h-4 w-4 text-slate-400" />
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
                      className="flex min-h-10 items-center rounded-xl px-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-3 grid gap-2 border-t border-slate-100 pt-3 sm:grid-cols-2">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="arzon-button-secondary w-full">
                  Login
                </Link>
                <Link to="/career-engine" onClick={() => setMobileOpen(false)} className="arzon-button-primary w-full">
                  Get My Career Plan <ArrowRight className="h-4 w-4" />
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
