/**
 * AccentButton — the single reusable button primitive for the Career Fit
 * Report V3. Every accent class is sourced from `REPORT_TONES` (or the
 * shared gradient constant) so the report tone-token gate stays green and
 * the palette can be re-themed by editing `reportTones.ts` alone.
 *
 * Renders as a <button> by default, or an <a> when `href` is set — matches
 * the mix of CTAs and outbound links used across chapters.
 */
import { forwardRef } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { REPORT_PRIMARY_CTA_GRADIENT, REPORT_TONES, type ReportTone } from "./reportTones";

export type AccentButtonVariant = "solid" | "soft" | "outline" | "gradient";
export type AccentButtonSize = "sm" | "md" | "lg";

interface CommonProps {
  tone?: ReportTone;
  variant?: AccentButtonVariant;
  size?: AccentButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps | "href"> & {
    href?: undefined;
  };

type AnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export type AccentButtonProps = ButtonProps | AnchorProps;

const SIZE_CLASSES: Record<AccentButtonSize, string> = {
  sm: "h-8 gap-1.5 rounded-full px-3 text-xs",
  md: "h-11 gap-2 rounded-full px-5 font-grotesk text-sm font-bold",
  lg: "h-14 gap-2.5 rounded-full px-7 font-grotesk text-base font-bold",
};

/**
 * Composes tone + variant into a class string. Only reads from
 * `REPORT_TONES` and the shared gradient constant so no raw palette class
 * ever leaks into a report file.
 */
function variantClasses(tone: ReportTone, variant: AccentButtonVariant): string {
  const t = REPORT_TONES[tone];
  switch (variant) {
    case "gradient":
      // Gradient variant is primary-only by design (report's hero CTA).
      return `${REPORT_PRIMARY_CTA_GRADIENT} text-slate-900 transition`;
    case "solid":
      return `${t.solidCtaBg} text-slate-900 transition hover:brightness-110`;
    case "soft":
      return `border ${t.softBorder} ${t.softBg} ${t.chipPillText} transition hover:brightness-110`;
    case "outline":
      return `border ${t.chipBorder} ${t.chipBg} ${t.chipText} transition hover:brightness-110`;
  }
}

export const AccentButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, AccentButtonProps>(
  function AccentButton(
    {
      tone = "primary",
      variant = "solid",
      size = "md",
      leadingIcon,
      trailingIcon,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const composed = cn(
      "report-focus-ring inline-flex shrink-0 items-center justify-center whitespace-nowrap disabled:opacity-60 disabled:pointer-events-none",
      SIZE_CLASSES[size],
      variantClasses(tone, variant),
      className,
    );

    const content = (
      <>
        {leadingIcon}
        {children}
        {trailingIcon}
      </>
    );

    if (typeof (rest as AnchorProps).href === "string") {
      const { href, ...anchorRest } = rest as AnchorProps;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={composed}
          {...anchorRest}
        >
          {content}
        </a>
      );
    }

    const buttonRest = rest as ButtonProps;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={buttonRest.type ?? "button"}
        className={composed}
        {...buttonRest}
      >
        {content}
      </button>
    );
  },
);

export default AccentButton;
