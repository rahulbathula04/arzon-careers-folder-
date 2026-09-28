import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Menu, Search, X } from "lucide-react";
import { ArzonLogo } from "../acri/ArzonLogo";
import { GlobalSearchModal } from "./GlobalSearchModal";

const PRIMARY = [
  { label: "Careers", to: "/roles" },
  { label: "Degrees", to: "/degrees" },
  { label: "Career Engine", to: "/career-engine" },
] as const;

const RESOURCES = [
  { label: "Role intelligence", to: "/roles" },
  { label: "Career research", to: "/research" },
  { label: "Compare careers", to: "/industry/compare" },
  { label: "Programmes", to: "/courses" },
  { label: "For employers", to: "/recruiters" },
  { label: "For colleges", to: "/tpos" },
] as const;

export function ArzonHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setResourcesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen && !resourcesOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setResourcesOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, resourcesOpen]);

  const isActive = (to: string) =>
    location.pathname === to || location.pathname.startsWith(to + "/");

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#07152F]/10 bg-[#F7F3EC]/95 text-[#07152F] backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[68px] items-center justify-between gap-4 lg:min-h-[76px]">
            <Link to="/" aria-label="Arzon Global home" className="shrink-0">
              <ArzonLogo variant="light" size="sm" />
            </Link>

            <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
              {PRIMARY.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={[
                    "rounded-full px-4 py-2.5 text-xs font-bold transition",
                    isActive(item.to)
                      ? "bg-[#07152F] text-white"
                      : "text-[#07152F]/65 hover:bg-white hover:text-[#07152F]",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              ))}

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setResourcesOpen((value) => !value)}
                  aria-expanded={resourcesOpen}
                  className={[
                    "inline-flex items-center gap-1 rounded-full px-4 py-2.5 text-xs font-bold transition",
                    resourcesOpen ? "bg-white text-[#07152F]" : "text-[#07152F]/65 hover:bg-white hover:text-[#07152F]",
                  ].join(" ")}
                >
                  Resources
                  <ChevronDown className={"h-3.5 w-3.5 transition " + (resourcesOpen ? "rotate-180" : "")} />
                </button>

                {resourcesOpen ? (
                  <div className="absolute right-0 top-[calc(100%+10px)] w-64 overflow-hidden rounded-2xl border border-[#07152F]/10 bg-white p-2 shadow-[0_25px_70px_-35px_rgba(7,21,47,0.45)]">
                    {RESOURCES.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-[#07152F]/70 hover:bg-[#F7F3EC] hover:text-[#07152F]"
                      >
                        {item.label}
                        <ArrowRight className="h-3.5 w-3.5 text-[#07152F]/30" />
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="grid h-10 w-10 place-items-center rounded-full text-[#07152F]/55 hover:bg-white hover:text-[#07152F]"
                aria-label="Search Arzon"
              >
                <Search className="h-4 w-4" />
              </button>
              <Link to="/login" className="rounded-full px-3 py-2 text-xs font-semibold text-[#07152F]/60 hover:bg-white">
                Login
              </Link>
              <Link
                to="/career-engine"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#2563EB] px-5 text-xs font-bold text-white shadow-[0_10px_30px_-15px_rgba(37,99,235,0.8)] transition hover:-translate-y-0.5 hover:bg-[#1D4ED8]"
              >
                Get My Career Plan <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="flex items-center gap-1 lg:hidden">
              <button type="button" onClick={() => setSearchOpen(true)} className="grid h-10 w-10 place-items-center rounded-full text-[#07152F]/60 hover:bg-white" aria-label="Search Arzon">
                <Search className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen((value) => !value)}
                className="grid h-10 w-10 place-items-center rounded-full text-[#07152F]"
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen ? (
          <div className="border-t border-[#07152F]/10 bg-[#F7F3EC] lg:hidden">
            <nav aria-label="Mobile navigation" className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
              <div className="grid gap-1">
                {PRIMARY.map((item) => (
                  <Link key={item.to} to={item.to} className="flex min-h-12 items-center justify-between rounded-xl px-3 text-base font-bold hover:bg-white">
                    {item.label}
                    <ArrowRight className="h-4 w-4 text-[#07152F]/30" />
                  </Link>
                ))}
              </div>
              <div className="mt-4 border-t border-[#07152F]/10 pt-4">
                <p className="px-3 pb-2 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#07152F]/40">Resources</p>
                <div className="grid gap-1 sm:grid-cols-2">
                  {RESOURCES.map((item) => (
                    <Link key={item.to} to={item.to} className="rounded-xl px-3 py-3 text-sm font-semibold text-[#07152F]/65 hover:bg-white">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="mt-4 grid gap-2 border-t border-[#07152F]/10 pt-4 sm:grid-cols-2">
                <Link to="/login" className="inline-flex h-12 items-center justify-center rounded-full border border-[#07152F]/15 bg-white text-sm font-bold">Login</Link>
                <Link to="/career-engine" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#07152F] text-sm font-bold text-white">Get My Career Plan <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </nav>
          </div>
        ) : null}
      </header>
      <GlobalSearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
