import { redirect, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { getLeadId, getProfile, hydrateCareerEngineSnapshot } from "@/lib/careerEngineApi";

/**
 * Session-based gate for Career Engine assessment routes.
 *
 * Entry sequence is:  /career-engine  →  /start (collects basic details)
 *   →  /test (only reachable with a profile)
 *   →  /result (only reachable with a leadId OR a cached ce_result)
 */

function hasCachedResult(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = sessionStorage.getItem("ce_result");
    const parsed = raw ? JSON.parse(raw) : null;
    return !!(parsed && parsed.archetypeId);
  } catch {
    return false;
  }
}

function hasAnswers(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = sessionStorage.getItem("ce_answers");
    const parsed = raw ? JSON.parse(raw) : null;
    return !!(parsed && Object.keys(parsed).length > 0);
  } catch {
    return false;
  }
}

export function requireCareerEngineSession(opts: { needsLead?: boolean } = {}) {
  if (typeof window === "undefined") return; // never block SSR
  hydrateCareerEngineSnapshot();

  if (opts.needsLead) {
    // /result, /path/$slug - needs either a saved lead OR a cached result.
    if (getLeadId() || hasCachedResult()) return;
    // If they have answers but no lead, finish the test.
    if (hasAnswers() && getProfile()) {
      throw redirect({ to: "/career-engine/test" });
    }
    throw redirect({ to: "/career-engine/start" });
  }

  // Default gate (e.g. /test): need basic profile.
  if (!getProfile()) {
    throw redirect({ to: "/career-engine/start" });
  }
}

/**
 * Client-side mirror of the above. SSR-safe.
 */
export function useCareerEngineGuard(opts: { needsLead?: boolean } = {}) {
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window === "undefined") return;
    hydrateCareerEngineSnapshot();

    const goto = (to: "/career-engine/start" | "/career-engine/test") => {
      navigate({ to }).catch(() => {
        window.location.href = to;
      });
    };

    if (opts.needsLead) {
      if (getLeadId() || hasCachedResult()) return;
      if (hasAnswers() && getProfile()) {
        goto("/career-engine/test");
        return;
      }
      goto("/career-engine/start");
      return;
    }

    if (!getProfile()) goto("/career-engine/start");
  }, [navigate, opts.needsLead]);
}
