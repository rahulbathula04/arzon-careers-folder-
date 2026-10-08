import { AlertCircle, MessageCircle, RefreshCw, ArrowLeft } from "lucide-react";
import { Link, useRouter } from "@tanstack/react-router";
import { waLink } from "@/components/landing/constants";

/**
 * User-friendly error UI shown by every enrolment route's `errorComponent`.
 * Guarantees the user never lands on a blank screen when a server function
 * throws - always renders a branded card with retry + WhatsApp fallback.
 */
export function EnrolErrorFallback({
  error,
  reset,
  where,
}: {
  error: Error;
  reset: () => void;
  /** short label for the failing step, e.g. "checkout" or "registration" */
  where?: string;
}) {
  const router = useRouter();
  const label = where ?? "enrolment";
  const rawMsg = error?.message ?? "";
  const friendly = friendlyEnrolError(rawMsg);
  const waMsg = `Hi Arzon, I'm stuck on the ${label} page (${friendly.title}). Can you help me complete enrolment manually?`;

  return (
    <div className="mx-auto max-w-xl">
      <div className="rounded-2xl border border-danger/30 bg-danger/5 p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-danger/15 p-2">
            <AlertCircle className="h-5 w-5 text-danger" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-h3 text-[color:var(--ink)]">{friendly.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-soft)]">
              {friendly.message}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-soft)]">
              <span className="font-semibold text-[color:var(--ink)]">What to do: </span>
              {friendly.retry}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  router.invalidate();
                  reset();
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Try again
              </button>
              <a
                href={waLink(waMsg)}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-medium text-[color:var(--ink)] transition hover:bg-ink/5"
              >
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp counsellor
              </a>
              <Link
                to="/enrol"
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-[color:var(--ink-soft)] hover:text-[color:var(--ink)]"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to enrolment
              </Link>
            </div>

            {import.meta.env.DEV && rawMsg && (
              <details className="mt-4 text-xs text-[color:var(--ink-soft)]">
                <summary className="cursor-pointer">Technical details</summary>
                <pre className="mt-2 whitespace-pre-wrap break-all rounded bg-ink/5 p-2 font-mono text-micro">
                  {rawMsg}
                </pre>
              </details>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface FriendlyIntentError {
  title: string;
  message: string;
  retry: string;
}

function friendlyEnrolError(raw: string): FriendlyIntentError {
  const m = raw.toLowerCase();
  if (m.includes("not found") || m.includes("intent not found")) {
    return {
      title: "We couldn't find your enrolment",
      message: "Your enrolment session may have expired or the link is incomplete.",
      retry: "Start a fresh enrolment. Your details are safe - no card was charged.",
    };
  }
  if (m.includes("invalid") && (m.includes("token") || m.includes("uuid"))) {
    return {
      title: "This enrolment link isn't valid",
      message: "The link you followed appears to be malformed or truncated.",
      retry: "Please start enrolment again from the pricing page.",
    };
  }
  if (m.includes("unauthorized") || m.includes("401")) {
    return {
      title: "Please sign in again",
      message: "Your session expired while thinking through this page.",
      retry: "Refresh the page or go back to enrolment to continue.",
    };
  }
  if (m.includes("network") || m.includes("fetch") || m.includes("failed to fetch")) {
    return {
      title: "Connection interrupted",
      message: "We couldn't reach our servers to process your enrolment.",
      retry: "Check your internet connection and tap Try again.",
    };
  }
  return {
    title: "Something went wrong",
    message:
      "We hit an unexpected issue while thinking through this page. No card was charged and your details are safe.",
    retry:
      "Tap Try again. If it keeps failing, message us on WhatsApp and we'll complete enrolment manually.",
  };
}
