import { forwardRef, type AnchorHTMLAttributes } from "react";
import { LINKS } from "@/components/landing/constants";
import { track } from "@/lib/track";

export interface ArzonLinkedInButtonProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** Optional custom URL (defaults to LINKS.linkedin). */
  href?: string;
  /** Attribution source for analytics. */
  source?: string;
  /** Size variant: "sm" (36px), "md" (default 45px Uiverse), "lg" (52px). */
  size?: "sm" | "md" | "lg";
  /** Whether to show a text label next to the button. */
  showLabel?: boolean;
  label?: string;
}

/**
 * Animated LinkedIn Button from Uiverse.io by mRcOol7.
 * Features an authentic LinkedIn blue #0077b5 background that rotates 35deg
 * on hover from the bottom origin behind a frosted glass SVG container.
 */
export const ArzonLinkedInButton = forwardRef<HTMLAnchorElement, ArzonLinkedInButtonProps>(
  function ArzonLinkedInButton(
    {
      href = LINKS.linkedin,
      source = "linkedin_social",
      size = "md",
      showLabel = false,
      label = "LinkedIn",
      className = "",
      onClick,
      target = "_blank",
      rel = "noopener noreferrer",
      ...props
    },
    ref,
  ) {
    const sizeClass = size === "sm" ? "LinkedinBtn--sm" : size === "lg" ? "LinkedinBtn--lg" : "";
    const iconDimension = size === "sm" ? "16" : size === "lg" ? "22" : "18";

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      try {
        track("social_click", { props: { channel: "linkedin", source } });
      } catch {
        // Analytics error must never block outbound link
      }
      onClick?.(e);
    };

    const buttonElement = (
      <a
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        aria-label="Connect with Arzon Global on LinkedIn"
        title="Connect on LinkedIn"
        onClick={handleClick}
        className={`LinkedinBtn ${sizeClass} ${className}`.trim()}
        {...props}
      >
        <span className="svgContainer">
          <svg
            viewBox="0 0 448 512"
            width={iconDimension}
            height={iconDimension}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fill="#ffffff"
              d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"
            />
          </svg>
        </span>
        <span className="BG BG--linkedin" />
      </a>
    );

    if (showLabel) {
      return (
        <div className="inline-flex items-center gap-2.5">
          {buttonElement}
          <a
            href={href}
            target={target}
            rel={rel}
            className="arzon-insta-label"
          >
            {label}
          </a>
        </div>
      );
    }

    return buttonElement;
  },
);
