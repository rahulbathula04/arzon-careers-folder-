import { useRouterState } from "@tanstack/react-router";

export type PrimaryCTA = {
  label: string;
  to: string;
  hint?: string;
  /** When true, MobileStickyCTA should not render on this route. */
  hidden?: boolean;
};

/**
 * Single source of truth for the primary action on every page.
 * Drives `<MobileStickyCTA />` and any in-page "next step" CTAs that need
 * to mirror the route's conversion goal.
 *
 * Rule: one primary action per scroll. WhatsApp is always secondary.
 */
export function getPrimaryCTAForPath(pathname: string): PrimaryCTA {
  // Funnel routes - let the form finish, no sticky.
  if (pathname.startsWith("/apply") || pathname.startsWith("/enrol")) {
    return { label: "Continue application", to: pathname, hidden: true };
  }

  if (pathname.startsWith("/career-engine")) {
    // Inside the test flow - sticky competes with the in-page CTA.
    return { label: "Continue test", to: "/career-engine/test", hint: "3 min", hidden: true };
  }

  if (pathname.startsWith("/recruiters") || pathname.startsWith("/tpos")) {
    return { label: "Request briefing pack", to: "/recruiters", hint: "Free" };
  }

  if (pathname.startsWith("/industry")) {
    return { label: "Take the test", to: "/career-engine/test", hint: "3 min" };
  }

  if (pathname.startsWith("/courses")) {
    return { label: "Take the test", to: "/career-engine/test", hint: "3 min" };
  }

  // Default - homepage, proof, refund, faq, etc.
  // Hidden on `/` because the hero CTA is the primary action above the fold.
  if (pathname === "/") {
    return { label: "Take the test", to: "/career-engine/test", hint: "3 min", hidden: true };
  }
  return { label: "Take the test", to: "/career-engine/test", hint: "3 min" };
}

export function usePagePrimaryCTA(): PrimaryCTA {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return getPrimaryCTAForPath(pathname);
}
