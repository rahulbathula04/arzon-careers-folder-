import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight, Menu, Search, X } from "lucide-react";
import { ArzonLogo } from "../acri/ArzonLogo";
import { GlobalSearchModal } from "./GlobalSearchModal";

const NAV_ITEMS = [
  { label: "Careers", to: "/healthcare-careers" },
  { label: "Roles", to: "/roles" },
  { label: "Programmes", to: "/courses" },
  { label: "Research", to: "/research" },
  { label: "For Employers", to: "/recruiters" },
] as const;

const SECONDARY_ITEMS = [
  { label: "About Arzon", to: "/about" },
  { label: "Why Arzon", to: "/why-arzon" },
  { label: "For Colleges", to: "/tpos" },
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
      <header className="sticky top-0 z-50 border-b border-[var(--arzon-border)] bg-white/95 backdrop-blur-md">
        <div className="arzon-v2-container">
          <div className="flex h-16 items-center justify-between gap-4 lg:h-[68px]">
            <Link
              to="/"
              aria-label="Arzon Global home"
              className="shrink-0 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--arzon-blue-600)] focus-visible:ring-offset-2"
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
                    to={item.to}
                    className={[
                      "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                      active
                        ? "bg-[var(--arzon-blue-100)] text-[var(--arzon-blue-700)]"
                        : "text-[var(--arzon-ink-soft)] hover:bg-[var(--arzon-surface-blue)] hover:text-[var(--arzon-ink-strong)]",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-[var(--arzon-border)] bg-white px-3 text-sm font-medium text-[var(--arzon-ink-muted)] transition hover:border-[var(--arzon-border-strong)] hover:text-[var(--arzon-ink-strong)]"
                aria-label="Search Arzon"
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
                <kbd className="hidden xl:inline-flex rounded border border-[var(--arzon-border)] bg-[var(--arzon-surface)] px-1.5 py-0.5 font-mono text-[10px]">
                  ⌘K
                </kbd>
              </button>
              <Link
                to="/login"
                className="inline-flex h-10 items-center rounded-lg px-3 text-sm font-semibold text-[var(--arzon-ink-soft)] hover:bg-[var(--arzon-surface-blue)] hover:text-[var(--arzon-ink-strong)]"
              >
                Sign in
              </Link>
              <Link to="/career-engine" className="arzon-button-primary h-10 px-4 text-sm">
                Find my career path
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex items-center gap-1 lg:hidden">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="grid h-10 w-10 place-items-center rounded-lg text-[var(--arzon-ink-soft)] hover:bg-[var(--arzon-surface-blue)]"
                aria-label="Search Arzon"
              >
                <Search className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                className="grid h-10 w-10 place-items-center rounded-lg text-[var(--arzon-ink-strong)] hover:bg-[var(--arzon-surface-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--arzon-blue-600)]"
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-[var(--arzon-border)] bg-white lg:hidden">
            <nav aria-label="Mobile navigation" className="arzon-v2-container py-4">
              <div className="grid gap-1">
                {NAV_ITEMS.map((item) => {
                  const active =
                    location.pathname === item.to ||
                    location.pathname.startsWith(item.to + "/");
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={[
                        "flex min-h-12 items-center justify-between rounded-lg px-3 text-base font-semibold",
                        active
                          ? "bg-[var(--arzon-blue-100)] text-[var(--arzon-blue-700)]"
                          : "text-[var(--arzon-ink-strong)] hover:bg-[var(--arzon-surface)]",
                      ].join(" ")}
                    >
                      {item.label}
                      <ArrowRight className="h-4 w-4 text-[var(--arzon-ink-muted)]" />
                    </Link>
                  );
                })}
              </div>

              <div className="mt-4 border-t border-[var(--arzon-border)] pt-4">
                <p className="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-[var(--arzon-ink-muted)]">
                  More from Arzon
                </p>
                <div className="grid gap-1 sm:grid-cols-2">
                  {SECONDARY_ITEMS.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-[var(--arzon-ink-soft)] hover:bg-[var(--arzon-surface)] hover:text-[var(--arzon-ink-strong)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid gap-2 border-t border-[var(--arzon-border)] pt-4 sm:grid-cols-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="arzon-button-secondary w-full"
                >
                  Sign in
                </Link>
                <Link
                  to="/career-engine"
                  onClick={() => setMobileOpen(false)}
                  className="arzon-button-primary w-full"
                >
                  Find my career path
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <GlobalSearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
