import { forwardRef, type AnchorHTMLAttributes } from "react";
import { LINKS } from "@/components/landing/constants";
import { track } from "@/lib/track";

export interface ArzonInstagramButtonProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** Optional override for Instagram URL. Defaults to official Arzon Global Instagram. */
  href?: string;
  /** Analytics attribution source (e.g. "footer", "results_card", "share_modal"). */
  source?: string;
  /** Size variant: "sm" (34px), "md" (default 45px Uiverse), "lg" (52px). */
  size?: "sm" | "md" | "lg";
  /** Whether to show a text pill label alongside the button (e.g. "@arzon.global"). */
  showLabel?: boolean;
  label?: string;
}

/**
 * Animated Instagram Button from Uiverse.io by vinodjangid07.
 * Features a 45-degree multi-stop Instagram gradient that rotates 35deg
 * on hover from the bottom origin behind a frosted glass SVG container.
 *
 * Linked directly to official Arzon Global Instagram: https://www.instagram.com/arzon.global
 */
export const ArzonInstagramButton = forwardRef<HTMLAnchorElement, ArzonInstagramButtonProps>(
  function ArzonInstagramButton(
    {
      href = LINKS.instagram,
      source = "arzon_social",
      size = "md",
      showLabel = false,
      label = "@arzon.global",
      className = "",
      onClick,
      target = "_blank",
      rel = "noopener noreferrer",
      ...props
    },
    ref,
  ) {
    const sizeClass = size === "sm" ? "Btn--sm" : size === "lg" ? "Btn--lg" : "";
    const iconDimension = size === "sm" ? "16" : size === "lg" ? "24" : "20";

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      try {
        track("social_click", { props: { channel: "instagram", source } });
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
        aria-label="Follow Arzon Global on Instagram (@arzon.global)"
        title="Follow Arzon Global on Instagram"
        onClick={handleClick}
        className={`Btn ${sizeClass} ${className}`.trim()}
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
              d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 225.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
            />
          </svg>
        </span>
        <span className="BG" />
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
