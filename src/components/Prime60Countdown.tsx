import { Timer } from "lucide-react";
import { usePrime60Availability } from "@/lib/arzonPrime60";
import { formatHMS } from "@/hooks/useCountdown";

type Props = {
  /** Visual variant: dark for dark surfaces (e.g. result offer, mobile pricing
   * card), light for light surfaces (desktop pricing cards). */
  variant?: "dark" | "light";
  className?: string;
};

/**
 * Live "Offer expires in HH:MM:SS" countdown for the ARZONPRIME60 window.
 * Renders nothing until the 60-minute timer has actually started (i.e. the
 * user has visited the pay page and `recordPrime60Window` was called).
 * Polled every 1s via `usePrime60Availability`.
 */
export function Prime60Countdown({ variant = "dark", className = "" }: Props) {
  const { available, expiresAt, remainingMs } = usePrime60Availability();
  if (!available || !expiresAt || remainingMs <= 0) return null;

  const lowTime = remainingMs < 10 * 60 * 1000;
  const baseDark = lowTime
    ? "border-red-400/50 bg-red-500/15 text-red-100"
    : "border-yellow-400/40 bg-yellow-400/10 text-yellow-200";
  const baseLight = lowTime
    ? "border-red-300 bg-red-50 text-red-700"
    : "border-amber-300 bg-amber-50 text-amber-800";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`ARZONPRIME60 offer expires in ${formatHMS(remainingMs)}`}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-full border px-3 py-1.5 font-mono text-micro font-bold uppercase tracking-[0.16em] ${
        variant === "dark" ? baseDark : baseLight
      } ${lowTime ? "motion-safe:animate-pulse" : ""} ${className}`}
    >
      <Timer className="h-3 w-3" />
      <span>Offer expires in</span>
      <span className="font-mono text-caption tabular-nums tracking-normal">
        {formatHMS(remainingMs)}
      </span>
    </div>
  );
}
