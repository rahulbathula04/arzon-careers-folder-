import { useState, useId, type HTMLAttributes } from "react";
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
  disabled = false,
  className,
  ...props
}: ArzonDownloadButtonProps) {
  const id = useId();
  const [isChecked, setIsChecked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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
        data-active={isChecked}
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
          <Download className="arzon-dl-icon" strokeWidth={2.5} />
          <span className="arzon-dl-square" />
        </div>

        <span className="arzon-dl-title">{label}</span>
        <span className="arzon-dl-title">{completedLabel}</span>
      </label>
    </div>
  );
}

export const DownloadButton = ArzonDownloadButton;
