import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { TRANSITION_PRESETS } from "./motion-tokens";

export interface MotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  overlayClassName?: string;
  containerClassName?: string;
}

export function MotionModal({
  isOpen,
  onClose,
  children,
  overlayClassName = "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-xs",
  containerClassName = "relative w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-stone-300",
}: MotionModalProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={TRANSITION_PRESETS.fast}
          onClick={onClose}
          className={overlayClassName}
        >
          <motion.div
            key="modal-container"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 16 }}
            transition={TRANSITION_PRESETS.medium}
            onClick={(e) => e.stopPropagation()}
            className={containerClassName}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
