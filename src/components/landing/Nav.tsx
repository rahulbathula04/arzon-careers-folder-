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

const links: Array<{ label: string; to: string; hash?: string }> = [
  { label: "Learn", to: "/courses" },
  { label: "Assess", to: "/career-engine/start" },
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
      className={`nav-shell tone-light relative z-40 w-full transition-colors ${scrolled ? "is-scrolled" : ""}`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Arzon Global — go to home" className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-[#070B17] ring-1 ring-ink/10">
            {/* @allow-raw-palette */}
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
            <p className="font-mono text-caption font-semibold tracking-[0.22em] text-[color:var(--ink)] sm:tracking-[0.28em]">
              ARZON
            </p>
            {/* @allow-raw-palette */}
            <p className="hidden xs:block font-mono text-micro font-medium tracking-[0.32em] text-ink-soft sm:block sm:tracking-[0.42em]">
              GLOBAL
            </p>
            {/* @allow-raw-palette */}
          </div>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 xl:flex xl:gap-7">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              hash={l.hash}
              preload="intent"
              activeOptions={{ exact: l.to === "/" && !l.hash }}
              activeProps={{
                className: "text-[color:var(--ink)] after:scale-x-100", // @allow-raw-palette
              }}
              className="relative whitespace-nowrap text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-[color:var(--ink)] after:absolute after:inset-x-0 after:-bottom-1.5 after:h-[2px] after:origin-left after:scale-x-0 after:rounded-full after:bg-teal-deep after:transition-transform after:duration-300 hover:after:scale-x-100" // @allow-raw-palette
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <ThemeToggle />
          <Link
            to="/dashboard"
            preload="intent"
            activeProps={{ className: "text-[color:var(--ink)]" }}
            className="whitespace-nowrap text-sm font-medium text-ink-soft hover:text-[color:var(--ink)]"
          >
            Dashboard
          </Link>
          <AuthBadge />
          {/* BHARAT UX: Explicit WhatsApp Support for Desktop Users */}
          <WhatsAppLink
            source="nav_desktop"
            message="Hi Arzon, quick question about the programme."
            className="inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full border border-teal-deep/25 bg-teal-soft px-4 text-sm font-semibold text-teal-deep hover:bg-teal-soft/80"
          >
            <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Support
          </WhatsAppLink>
          <Link
            to="/apply"
            preload="intent"
            data-apply-surface="nav-desktop"
            data-testid="nav-apply-cta"
            className="inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full bg-teal-deep px-4 text-sm font-semibold text-slate-50 hover:bg-teal-ink"
          >
            Apply
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
              className="inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-md text-[color:var(--ink)] transition-colors active:bg-ink/5 xl:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-haspopup="dialog"
              aria-expanded={open}
              data-testid="nav-menu-button"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="surface-card w-[86vw] max-w-sm p-0 data-[state=open]:duration-200 data-[state=closed]:duration-150"
          >
            <SheetHeader className="border-b border-ink/10 px-5 py-4 text-left">
              <div className="flex items-center justify-between gap-3">
                <SheetTitle className="font-mono text-caption font-semibold tracking-[0.28em] text-[color:var(--ink)]">
                  ARZON GLOBAL
                </SheetTitle>
                <ThemeToggle />
              </div>
            </SheetHeader>
            <nav className="flex flex-col px-3 py-3">
              <p className="px-3 pb-1 font-mono text-micro uppercase tracking-[0.18em] text-ink-mute">
                Browse
              </p>
              {links.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  hash={l.hash}
                  preload="intent"
                  onClick={() => setOpen(false)}
                  activeProps={{ className: "bg-ink/5 text-[color:var(--ink)]" }}
                  className="rounded-lg px-3 py-3 text-body-sm font-medium text-ink-soft hover:bg-ink/5"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/cohorts"
                preload="intent"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-body-sm font-medium text-ink-soft hover:bg-ink/5"
              >
                Cohorts
              </Link>
              <Link
                to="/contact"
                preload="intent"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-body-sm font-medium text-ink-soft hover:bg-ink/5"
              >
                Contact
              </Link>
              <Link
                to="/dashboard"
                preload="intent"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-body-sm font-medium text-ink-soft hover:bg-ink/5"
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
            <div className="mt-1 flex flex-col gap-2 border-t border-ink/10 px-4 py-4">
              <Link
                to="/apply"
                preload="intent"
                data-apply-surface="nav-mobile-sheet"
                onClick={() => setOpen(false)}
                className="inline-flex h-12 w-full items-center justify-center gap-1.5 rounded-full bg-teal-deep px-5 text-sm font-bold text-slate-50 hover:bg-teal-ink"
              >
                Start your application <ArrowRight className="h-4 w-4" />
              </Link>
              <WhatsAppLink
                source="nav_mobile"
                message="Hi Arzon, quick question about the programme."
                onClick={() => setOpen(false)}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-teal-deep/25 bg-teal-soft text-sm font-semibold text-teal-deep hover:bg-teal-soft/80"
              >
                <MessageCircle className="h-4 w-4" /> Talk on WhatsApp
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
