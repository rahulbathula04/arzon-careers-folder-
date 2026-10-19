import { useState, useId, type HTMLAttributes, type ReactNode } from "react";
import { Download } from "lucide-react";
import { cx } from "@/utils/cx";

export interface ArzonDownloadButtonProps extends Omit<HTMLAttributes<HTMLDivElement>, "onClick"> {
  /** Label shown when button is idle (default: "Download") */
  label?: string;
  /** Label shown after download completes (default: "Downloaded") */
  completedLabel?: string;
  /** Async or sync callback invoked when the user taps download */
  onDownload?: () => void | Promise<void>;
  /** Direct link URL if functioning as a download link */
  href?: string;
  /** Suggested download filename */
  download?: string;
  /** Visual surface theme: "light" (dark text) or "dark" (white text) */
  theme?: "light" | "dark";
  /** Button style variant: "primary" (Arzon Blue) or "outline" (Crisp Navy / Light) */
  variant?: "primary" | "outline";
  /** Custom icon for the circular badge (defaults to Download icon) */
  icon?: ReactNode;
  /** Custom pixel width override for wide text */
  width?: number;
  /** Disabled state */
  disabled?: boolean;
}

export function ArzonDownloadButton({
  label = "Download",
  completedLabel = "Downloaded",
  onDownload,
  href,
  download,
  theme = "light",
  variant = "primary",
  icon,
  width,
  disabled = false,
  className,
  style,
  ...props
}: ArzonDownloadButtonProps) {
  const id = useId();
  const [isChecked, setIsChecked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Compute calculated width from text length if not explicitly provided
  const longestLabelLength = Math.max(label.length, completedLabel.length);
  const calculatedWidth = width || Math.max(172, Math.min(360, longestLabelLength * 8.5 + 68));

  const handleTrigger = async () => {
    if (disabled || isChecked || isProcessing) return;

    setIsProcessing(true);
    setIsChecked(true);

    try {
      if (onDownload) {
        await onDownload();
      }
      if (href) {
        const link = document.createElement("a");
        link.href = href;
        if (download) link.download = download;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error("[ArzonDownloadButton Error]", err);
    } finally {
      setIsProcessing(false);
      // Auto-reset state after 6.5s so user can download again if desired
      setTimeout(() => {
        setIsChecked(false);
      }, 6500);
    }
  };

  return (
    <div
      {...props}
      className={cx("arzon-dl-container select-none", className)}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={`${label} button`}
      aria-disabled={disabled}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !disabled) {
          e.preventDefault();
          handleTrigger();
        }
      }}
    >
      <label
        htmlFor={`arzon-dl-input-${id}`}
        className="arzon-dl-label"
        data-theme={theme}
        data-variant={variant}
        data-active={isChecked}
        style={{
          ...style,
          ...(calculatedWidth ? ({ "--dl-width": `${calculatedWidth}px` } as React.CSSProperties) : {}),
        }}
        onClick={(e) => {
          e.preventDefault();
          handleTrigger();
        }}
      >
        <input
          id={`arzon-dl-input-${id}`}
          type="checkbox"
          className="arzon-dl-input"
          checked={isChecked}
          disabled={disabled}
          readOnly
        />

        <div className="arzon-dl-circle" aria-hidden="true">
          {icon || <Download className="arzon-dl-icon" strokeWidth={2.5} />}
          <span className="arzon-dl-square" />
        </div>

        <span className="arzon-dl-title">{label}</span>
        <span className="arzon-dl-title">{completedLabel}</span>
      </label>
    </div>
  );
}

export const DownloadButton = ArzonDownloadButton;
