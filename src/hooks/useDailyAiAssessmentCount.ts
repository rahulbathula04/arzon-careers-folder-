import { useState, useEffect } from "react";
import { isReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Calculates a dynamic, deterministic daily social proof count of AI assessment test takers.
 * - Changes automatically every day based on the day of the year.
 * - Organically increments throughout the day based on current time.
 */
export function useDailyAiAssessmentCount() {
  const [count, setCount] = useState<number>(() => calculateCount());

  function calculateCount(): number {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Deterministic daily base number between 48 and 82
    const baseDailyCount = 48 + ((dayOfYear * 17 + 7) % 35);

    // Current hour fraction (0.0 to 1.0)
    const minutesPassed = now.getHours() * 60 + now.getMinutes();
    const dayFraction = Math.min(1, minutesPassed / (1440 - 180)); // caps near 9 PM

    // Intraday accumulation (starts with ~15% at midnight, reaches 100% by evening)
    const currentCount = Math.floor(baseDailyCount * (0.15 + 0.85 * Math.min(1, dayFraction)));
    return Math.max(12, currentCount);
  }

  useEffect(() => {
    if (typeof window !== "undefined" && isReducedMotion()) {
      return;
    }

    const interval = setInterval(() => {
      setCount(calculateCount());
    }, 60_000); // refresh every minute

    return () => clearInterval(interval);
  }, []);

  return {
    count,
    formattedLabel: `${count} candidates assessed today`,
    aiEngineBadge: "AI-Powered Industry Fit Engine",
  };
}
