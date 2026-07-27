import { memo, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, MessageCircle, ArrowRight } from "lucide-react";
import arzonIcon from "@/assets/arzon-icon.webp";
import { WhatsAppLink } from "@/components/common/WhatsAppLink";
import { ScrollProgress } from "./ScrollProgress";
import { AuthBadge } from "./AuthBadge";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { getScrollRoot } from "@/lib/scroll";
import { track } from "@/lib/track";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { FEATURE_FLAGS } from "@/config/featureFlags";

const links: Array<{ label: string; to: string; hash?: string }> = [
  { label: "Learn", to: "/courses" },
  ...(FEATURE_FLAGS.ENABLE_ASSESSMENT ? [{ label: "Assess", to: "/career-engine/start" }] : []),
  { label: "Why Arzon", to: "/why-arzon" },
];

function NavInner() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const root = getScrollRoot();
    const onScroll = () => setScrolled((root ? root.scrollTop : window.scrollY) > 8);
    onScroll();
    (root ?? window).addEventListener("scroll", onScroll, { passive: true });
    return () => (root ?? window).removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`relative z-40 w-full transition-all border-b border-slate-200/80 bg-white/95 backdrop-blur-md ${scrolled ? "shadow-md" : ""}`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          aria-label="Arzon Global — go to home"
          className="flex shrink-0 items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-[#0F172A] ring-1 ring-slate-200">
            <img
              src={arzonIcon}
              alt=""
              width={32}
              height={32}
              loading="eager"
              decoding="async"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="leading-none">
            <p className="font-mono text-xs font-extrabold tracking-[0.24em] text-[#0F172A]">
              ARZON
            </p>
            <p className="hidden xs:block font-mono text-[9px] font-bold tracking-[0.36em] text-[#64748B]">
              GLOBAL
            </p>
          </div>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 xl:flex xl:gap-8">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              hash={l.hash}
              preload="intent"
              activeOptions={{ exact: l.to === "/" && !l.hash }}
              activeProps={{
                className: "text-[#2563EB] font-extrabold after:scale-x-100",
              }}
              className="relative whitespace-nowrap text-sm font-bold text-[#334155] transition-colors duration-200 hover:text-[#2563EB] after:absolute after:inset-x-0 after:-bottom-1.5 after:h-[2px] after:origin-left after:scale-x-0 after:rounded-full after:bg-[#2563EB] after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3.5 xl:flex">
          <ThemeToggle />
          <Link
            to="/dashboard"
            preload="intent"
            activeProps={{ className: "text-[#2563EB] font-bold" }}
            className="whitespace-nowrap text-sm font-bold text-[#334155] hover:text-[#2563EB]"
          >
            Dashboard
          </Link>
          <AuthBadge />
          <WhatsAppLink
            source="nav_desktop"
            message="Hi Arzon, quick question about the programme."
            className="inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-xl border border-emerald-300 bg-emerald-50 px-4 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-colors"
          >
            <MessageCircle className="mr-2 h-4 w-4 text-emerald-700" /> WhatsApp Support
          </WhatsAppLink>
          <Link
            to="/apply"
            preload="intent"
            data-apply-surface="nav-desktop"
            data-testid="nav-apply-cta"
            className="inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] px-5 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02]"
          >
            <span className="text-white font-bold">Apply</span>
          </Link>
        </div>

        <Sheet
          open={open}
          onOpenChange={(next) => {
            setOpen(next);
            track(next ? "mobile_nav_opened" : "mobile_nav_closed", {
              props: { source: "hamburger" },
            });
          }}
        >
          <SheetTrigger asChild>
            <button
              type="button"
              className="inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-xl text-[#0F172A] hover:bg-slate-100 transition-colors xl:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-haspopup="dialog"
              aria-expanded={open}
              data-testid="nav-menu-button"
            >
              <Menu className="h-6 w-6 text-[#0F172A]" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-white w-[86vw] max-w-sm p-0 data-[state=open]:duration-200 data-[state=closed]:duration-150 border-l border-slate-200"
          >
            <SheetHeader className="border-b border-slate-200 px-5 py-4 text-left bg-slate-50">
              <div className="flex items-center justify-between gap-3">
                <SheetTitle className="font-mono text-xs font-extrabold tracking-[0.28em] text-[#0F172A]">
                  ARZON GLOBAL
                </SheetTitle>
                <ThemeToggle />
              </div>
            </SheetHeader>
            <nav className="flex flex-col px-3 py-3">
              <p className="px-3 pb-1 font-mono text-[10px] uppercase font-bold tracking-[0.18em] text-[#64748B]">
                Browse
              </p>
              {links.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  hash={l.hash}
                  preload="intent"
                  onClick={() => setOpen(false)}
                  activeProps={{ className: "bg-slate-100 text-[#2563EB] font-bold" }}
                  className="rounded-xl px-3 py-3 text-sm font-bold text-[#334155] hover:bg-slate-50 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/cohorts"
                preload="intent"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-bold text-[#334155] hover:bg-slate-50 transition-colors"
              >
                Cohorts
              </Link>
              <Link
                to="/contact"
                preload="intent"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-bold text-[#334155] hover:bg-slate-50 transition-colors"
              >
                Contact
              </Link>
              <Link
                to="/dashboard"
                preload="intent"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-bold text-[#334155] hover:bg-slate-50 transition-colors"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full text-left"
                aria-label="Close menu"
              >
                <AuthBadge variant="row" />
              </button>
            </nav>
            <div className="mt-1 flex flex-col gap-2 border-t border-slate-200 px-4 py-4">
              <Link
                to="/apply"
                preload="intent"
                data-apply-surface="nav-mobile-sheet"
                onClick={() => setOpen(false)}
                className="inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-xl bg-[#2563EB] px-5 text-sm font-bold text-white hover:bg-[#1d4ed8] shadow-md shadow-blue-600/20"
              >
                <span className="text-white font-bold">Start your application</span>
                <ArrowRight className="h-4 w-4 text-white" />
              </Link>
              <WhatsAppLink
                source="nav_mobile"
                message="Hi Arzon, quick question about the programme."
                onClick={() => setOpen(false)}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 text-sm font-bold text-emerald-800 hover:bg-emerald-100"
              >
                <MessageCircle className="h-4 w-4 text-emerald-700" /> Talk on WhatsApp
              </WhatsAppLink>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <ScrollProgress />
    </header>
  );
}

export const Nav = memo(NavInner);
