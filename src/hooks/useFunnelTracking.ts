import { useEffect, useRef } from "react";
import { track } from "@/lib/track";
import { trackEvent } from "@/lib/analytics";

interface UseFunnelTrackingOptions {
  pageName: string;
  category?: string;
  autoScrollDepth?: boolean;
}

/**
 * High-precision funnel tracking hook.
 * Instruments:
 * - Landing Page View (with device, viewport dimensions, referrer, UTM source)
 * - Scroll Depth Milestones: 25%, 50%, 75%
 * - Hero CTA Click
 * - Program / Course View
 * - Lead Form Start & Complete
 * - WhatsApp / Direct Contact Click
 */
export function useFunnelTracking({
  pageName,
  category = "marketing",
  autoScrollDepth = true,
}: UseFunnelTrackingOptions) {
  const scroll25Fired = useRef(false);
  const scroll50Fired = useRef(false);
  const scroll75Fired = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.innerWidth < 768;
    const deviceType = isMobile ? "mobile" : "desktop";

    // 1. Fire landing_page_view
    track("landing_page_view", {
      props: {
        page_name: pageName,
        category,
        device: deviceType,
        viewport_w: window.innerWidth,
        viewport_h: window.innerHeight,
        path: window.location.pathname,
      },
    });

    trackEvent("landing_page_view", {
      page: pageName,
      device: deviceType,
    });

    if (!autoScrollDepth) return;

    // 2. Scroll Depth Milestones (25%, 50%, 75%)
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (docH <= 0) return;

      const progress = (scrollY / docH) * 100;

      if (progress >= 25 && !scroll25Fired.current) {
        scroll25Fired.current = true;
        track("scroll_25", {
          props: { page_name: pageName, device: deviceType },
        });
        trackEvent("scroll_25", { page: pageName, device: deviceType });
      }

      if (progress >= 50 && !scroll50Fired.current) {
        scroll50Fired.current = true;
        track("scroll_50", {
          props: { page_name: pageName, device: deviceType },
        });
        trackEvent("scroll_50", { page: pageName, device: deviceType });
      }

      if (progress >= 75 && !scroll75Fired.current) {
        scroll75Fired.current = true;
        track("scroll_75", {
          props: { page_name: pageName, device: deviceType },
        });
        trackEvent("scroll_75", { page: pageName, device: deviceType });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageName, category, autoScrollDepth]);

  const trackHeroCtaClick = (target: string, label?: string) => {
    track("hero_cta_click", {
      props: { page_name: pageName, target, label },
    });
    trackEvent("hero_cta_click", { page: pageName, target });
  };

  const trackCourseProgramView = (programSlug: string, source?: string) => {
    track("course_program_view", {
      program_slug: programSlug,
      props: { page_name: pageName, source },
    });
    trackEvent("course_program_view", { program: programSlug });
  };

  const trackCtaClick = (actionName: string, sectionId?: string) => {
    track("cta_click", {
      props: { page_name: pageName, action: actionName, section: sectionId },
    });
    trackEvent("cta_click", { action: actionName, section: sectionId });
  };

  const trackLeadFormStart = (field?: string) => {
    track("lead_form_start", {
      props: { page_name: pageName, field: field || "first_input" },
    });
    trackEvent("lead_form_start", { page: pageName });
  };

  const trackLeadFormComplete = (leadMetadata?: Record<string, unknown>) => {
    track("lead_form_complete", {
      props: { page_name: pageName, ...(leadMetadata || {}) },
    });
    trackEvent("lead_form_complete", { page: pageName });
  };

  const trackWhatsAppClick = (source: string) => {
    track("whatsapp_click", {
      props: { page_name: pageName, source },
    });
    trackEvent("whatsapp_click", { page: pageName, source });
  };

  const trackApplicationSubmitted = (programSlug?: string) => {
    track("application_submitted", {
      program_slug: programSlug,
      props: { page_name: pageName },
    });
    trackEvent("application_submitted", { program: programSlug });
  };

  return {
    trackHeroCtaClick,
    trackCourseProgramView,
    trackCtaClick,
    trackLeadFormStart,
    trackLeadFormComplete,
    trackWhatsAppClick,
    trackApplicationSubmitted,
  };
}
