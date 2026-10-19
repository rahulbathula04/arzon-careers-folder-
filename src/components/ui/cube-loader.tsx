import { type HTMLAttributes } from "react";
import { cx } from "@/utils/cx";
import { isReducedMotion } from "@/hooks/useReducedMotion";

export interface CubeLoaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Size preset: sm (scale 0.5), md (scale 0.75), lg (scale 1.0) */
  size?: "sm" | "md" | "lg";
  /** Theme: "light" (masks with white/light) or "dark" (masks with deep navy #081F38) */
  theme?: "light" | "dark";
  /** Custom background color for the isometric floor masks (defaults to theme) */
  maskColor?: string;
  /** Optional status text displayed below the loader */
  label?: string;
}

export function CubeLoader({
  size = "md",
  theme = "dark",
  maskColor,
  label,
  className,
  style,
  ...props
}: CubeLoaderProps) {
  const reduced = typeof window !== "undefined" ? isReducedMotion() : false;

  const scale = size === "sm" ? 0.48 : size === "md" ? 0.72 : 1;
  const heightPx = Math.round(320 * scale);
  const widthPx = Math.round(200 * scale);

  const customStyle: React.CSSProperties = {
    ...style,
    ...(maskColor ? ({ "--cube-mask": maskColor } as React.CSSProperties) : {}),
  };

  if (reduced) {
    return (
      <div
        {...props}
        className={cx("flex flex-col items-center justify-center p-4 select-none", className)}
        role="status"
        aria-live="polite"
        aria-label={label || "Loading"}
      >
        <div className="relative flex items-center justify-center size-12 rounded-full border-2 border-primary/30">
          <div className="size-8 rounded-full bg-primary/40 motion-safe:animate-pulse" />
        </div>
        {label && (
          <p
            className={cx(
              "mt-3 text-xs font-mono font-bold uppercase tracking-wider",
              theme === "light" ? "text-ink" : "text-slate-300"
            )}
          >
            {label}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      {...props}
      className={cx("arzon-cube-loader-wrapper select-none", className)}
      role="status"
      aria-live="polite"
      aria-label={label || "Loading"}
      style={{ minHeight: heightPx, width: "100%" }}
    >
      <div
        style={{
          width: widthPx,
          height: heightPx,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "visible",
        }}
      >
        <div
          className="arzon-cube-loader"
          data-theme={theme}
          style={{
            ...customStyle,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
          aria-hidden="true"
        >
          <div className="arzon-cube-ground">
            <div />
          </div>
          <div className="arzon-cube-box box0">
            <div />
          </div>
          <div className="arzon-cube-box box1">
            <div />
          </div>
          <div className="arzon-cube-box box2">
            <div />
          </div>
          <div className="arzon-cube-box box3">
            <div />
          </div>
          <div className="arzon-cube-box box4">
            <div />
          </div>
          <div className="arzon-cube-box box5">
            <div />
          </div>
          <div className="arzon-cube-box box6">
            <div />
          </div>
          <div className="arzon-cube-box box7">
            <div />
          </div>
        </div>
      </div>

      {label && (
        <p
          className={cx(
            "mt-2 text-xs font-mono font-bold uppercase tracking-widest text-center",
            theme === "light" ? "text-ink" : "text-slate-200"
          )}
        >
          {label}
        </p>
      )}
    </div>
  );
}
