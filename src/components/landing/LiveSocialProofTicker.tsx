import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket, X } from "lucide-react";
import { isReducedMotion } from "@/hooks/useReducedMotion";

const RECENT_REGISTRATIONS = [
  { name: "Priya S.", degree: "B.Pharm", city: "Hyderabad", timeAgo: "3m ago" },
  { name: "Rahul M.", degree: "Pharm.D", city: "Bangalore", timeAgo: "7m ago" },
  { name: "Sneha K.", degree: "M.Pharm", city: "Pune", timeAgo: "12m ago" },
  { name: "Ananya R.", degree: "Biotech", city: "Chennai", timeAgo: "18m ago" },
  { name: "Amit V.", degree: "B.Pharm", city: "Mumbai", timeAgo: "24m ago" },
  { name: "Karthik N.", degree: "Pharm.D", city: "Warangal", timeAgo: "31m ago" },
  { name: "Divya T.", degree: "B.Sc Biotech", city: "Delhi", timeAgo: "39m ago" },
];

export function LiveSocialProofTicker() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed || isReducedMotion()) return;

    // Show initial toast after 4 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    // Loop through notifications every 16 seconds
    const loopInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % RECENT_REGISTRATIONS.length);
        setIsVisible(true);
      }, 800);
    }, 16000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(loopInterval);
    };
  }, [isDismissed]);

  // Auto-hide each toast after 6 seconds
  useEffect(() => {
    if (!isVisible) return;
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 6000);
    return () => clearTimeout(hideTimer);
  }, [isVisible, currentIdx]);

  if (isDismissed) return null;

  const current = RECENT_REGISTRATIONS[currentIdx];

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 z-40 max-w-[340px] pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="pointer-events-auto flex items-center gap-3 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-xl"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[#1B3F8B] border border-sky-200/80">
              <Ticket className="h-4 w-4" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-sans text-xs font-bold text-stone-900 truncate">
                  {current.name} ({current.degree})
                </span>
              </div>
              <p className="font-sans text-[11px] text-stone-600 truncate">
                Reserved VIP Pass · {current.city} · <span className="font-mono text-[10px] text-emerald-600 font-bold">{current.timeAgo}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="p-1 text-stone-400 hover:text-stone-600 transition-colors shrink-0 cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
