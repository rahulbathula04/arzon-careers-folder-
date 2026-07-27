import { useEffect } from "react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { toast } from "sonner";
import { FEATURE_FLAGS } from "@/config/featureFlags";
import {
  hydrateCareerEngineSnapshot,
  consumeExpiredNotice,
  isAttemptExpired,
  resetCareerEngineState,
  persistCareerEngineSnapshot,
} from "@/lib/careerEngineApi";

export const Route = createFileRoute("/career-engine")({
  beforeLoad: () => {
    if (!FEATURE_FLAGS.ENABLE_ASSESSMENT) {
      throw redirect({ to: "/courses" });
    }
  },
  head: () => ({
    meta: [
      { title: "Arzon Career Engine" },
      {
        name: "description",
        content:
          "Free 3-minute healthcare career diagnostic. Find the role that fits your stream, strengths and goals.",
      },
    ],
  }),
  component: CareerEngineLayout,
});

function CareerEngineLayout() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Restore any in-flight attempt persisted in localStorage from a previous
    // tab/refresh (no-op if this tab already has one or none was saved).
    hydrateCareerEngineSnapshot();
    // If an expired snapshot was just discarded, let the user know once.
    if (consumeExpiredNotice()) {
      toast.message("Your previous attempt expired", {
        description:
          "It's been a while since you started, we've reset the test so you can begin fresh.",
      });
    }
    // If somehow we restored an expired in-flight attempt (e.g. tab was open
    // for hours), reset it on the way in.
    if (isAttemptExpired()) {
      resetCareerEngineState();
      toast.message("Your previous attempt expired", {
        description: "Please start fresh, your progress was over 2 hours old.",
      });
    }
    // Re-persist whenever the user leaves so any unsaved sessionStorage state
    // makes it into localStorage even if they close the tab.
    const onHide = () => persistCareerEngineSnapshot();
    window.addEventListener("pagehide", onHide);
    window.addEventListener("beforeunload", onHide);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      window.removeEventListener("pagehide", onHide);
      window.removeEventListener("beforeunload", onHide);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, []);

  return <Outlet />;
}
