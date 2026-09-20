import type { ReactNode } from "react";

export interface FooterProps {
  hideCtaBox?: boolean;
  customCta?: ReactNode;
}

/**
 * Legacy Footer component — now superseded by global ArzonFooter in __root.tsx.
 * Rendered as null to avoid double-footer injection across existing routes.
 */
export function Footer(_props?: FooterProps) {
  return null;
}
