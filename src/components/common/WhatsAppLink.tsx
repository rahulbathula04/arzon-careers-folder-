import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { waLink } from "@/components/landing/constants";
import { track } from "@/lib/track";
import { toast } from "sonner";

type WhatsAppLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  /** Prefilled WhatsApp message body. */
  message: string;
  /** Funnel source tag - e.g. "hero_counsellor", "pricing_launch_code". */
  source: string;
  /** Optional program slug for funnel filtering. */
  program_slug?: string | null;
  /** Optional extra props captured in analytics_events.props. */
  trackProps?: Record<string, unknown>;
  children?: ReactNode;
};

/**
 * Drop-in replacement for `<a href={waLink(...)}>` that fires a
 * `whatsapp_click` analytics event on every tap. Keeps any existing
 * onClick handlers intact.
 */
export const WhatsAppLink = forwardRef<HTMLAnchorElement, WhatsAppLinkProps>(function WhatsAppLink(
  { message, source, program_slug, trackProps, onClick, target, rel, ...rest },
  ref,
) {
  // Precompute the URL so a bad payload (rare - surrogate-pair /
  // encodeURIComponent failures) surfaces as a toast instead of a
  // broken href. Falls back to the counsellor page so the tap still
  // does something useful.
  let href = "";
  let generationFailed = false;
  try {
    href = waLink(message);
  } catch {
    generationFailed = true;
  }
  return (
    <a
      {...rest}
      ref={ref}
      href={generationFailed ? "#" : href}
      data-wa-source={source}
      target={target ?? "_blank"}
      rel={rel ?? "noreferrer"}
      onClick={(e) => {
        if (generationFailed) {
          e.preventDefault();
          toast.error("Couldn't open WhatsApp. Copy the message and paste it in chat.", {
            action: {
              label: "Copy message",
              onClick: () => {
                try {
                  navigator.clipboard?.writeText(message);
                  toast.success("Message copied");
                } catch {
                  toast.error("Copy failed - long-press to select the message.");
                }
              },
            },
          });
          try {
            track("whatsapp_link_error", {
              program_slug: program_slug ?? null,
              props: { source, reason: "generation_failed", ...(trackProps ?? {}) },
            });
          } catch {
            /* noop */
          }
          return;
        }
        // Mark so the global delegated tracker in __root skips it.
        e.currentTarget.dataset.waTracked = "1";
        try {
          track("whatsapp_click", {
            program_slug: program_slug ?? null,
            props: { source, ...(trackProps ?? {}) },
          });
        } catch {
          /* never break the link */
        }
        onClick?.(e);
      }}
    />
  );
});

/** Imperative tracker for non-anchor (button-style) WhatsApp triggers. */
export function trackWhatsAppClick(
  source: string,
  extra: { program_slug?: string | null; props?: Record<string, unknown> } = {},
) {
  try {
    track("whatsapp_click", {
      program_slug: extra.program_slug ?? null,
      props: { source, ...(extra.props ?? {}) },
    });
  } catch {
    /* noop */
  }
}
