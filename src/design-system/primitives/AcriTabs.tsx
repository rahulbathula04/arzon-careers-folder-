/**
 * ACRI Design System — Tabs Primitive
 *
 * Accessible keyboard-navigable tab system used in:
 * - AcriResultTabs (Overview, Competency Breakdown, Strengths, Career, Learning, About)
 * - AcriAiAssistantPanel (AI Guidance, Concept Help, Standards, My Notes)
 *
 * Follows WAI-ARIA Tabs pattern.
 */
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type KeyboardEvent,
  useRef,
} from "react";
import { cn } from "@/lib/utils";

// ─── Context ──────────────────────────────────────────────────────────────────

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("useTabsContext: must be inside <AcriTabs>");
  return ctx;
}

// ─── Root ─────────────────────────────────────────────────────────────────────

interface AcriTabsProps {
  defaultTab: string;
  children: ReactNode;
  className?: string;
  onChange?: (tabId: string) => void;
}

export function AcriTabs({ defaultTab, children, className, onChange }: AcriTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleSetActiveTab = (id: string) => {
    setActiveTab(id);
    onChange?.(id);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleSetActiveTab }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

// ─── Tab List ─────────────────────────────────────────────────────────────────

interface AcriTabListProps {
  children: ReactNode;
  className?: string;
  /** "underline" = line under active tab (result page); "pill" = filled pill (AI panel) */
  variant?: "underline" | "pill";
  scrollable?: boolean;
}

export function AcriTabList({
  children,
  className,
  variant = "underline",
  scrollable = false,
}: AcriTabListProps) {
  return (
    <div
      role="tablist"
      className={cn(
        variant === "underline"
          ? "flex border-b border-[var(--color-border)] gap-0"
          : "flex gap-1 p-1 rounded-[var(--radius-lg)] bg-[var(--color-divider)]",
        scrollable && "overflow-x-auto scrollbar-none",
        className,
      )}
    >
      {children}
    </div>
  );
}

// ─── Tab Trigger ──────────────────────────────────────────────────────────────

interface AcriTabTriggerProps {
  id: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  variant?: "underline" | "pill";
}

export function AcriTabTrigger({
  id,
  children,
  icon,
  className,
  variant = "underline",
}: AcriTabTriggerProps) {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === id;

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveTab(id);
    }
  };

  if (variant === "pill") {
    return (
      <button
        role="tab"
        aria-selected={isActive}
        aria-controls={`panel-${id}`}
        id={`tab-${id}`}
        type="button"
        onClick={() => setActiveTab(id)}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] text-xs font-medium transition-[background-color,color] duration-[var(--duration-fast)]",
          "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-brand-navy)]",
          isActive
            ? "bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] shadow-[var(--shadow-xs)]"
            : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]",
          className,
        )}
      >
        {icon && <span className="shrink-0 opacity-70">{icon}</span>}
        {children}
      </button>
    );
  }

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${id}`}
      id={`tab-${id}`}
      type="button"
      onClick={() => setActiveTab(id)}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative flex items-center gap-1.5 px-4 py-3 text-xs font-semibold whitespace-nowrap",
        "border-b-2 -mb-px transition-[color,border-color] duration-[var(--duration-fast)]",
        "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-brand-navy)]",
        isActive
          ? "border-[var(--color-brand-ink)] text-[var(--color-text-primary)]"
          : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:border-[var(--color-border)]",
        className,
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}

// ─── Tab Panel ────────────────────────────────────────────────────────────────

interface AcriTabPanelProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function AcriTabPanel({ id, children, className }: AcriTabPanelProps) {
  const { activeTab } = useTabsContext();
  const isActive = activeTab === id;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
      tabIndex={0}
      className={cn(
        "motion-safe:acri-animate-fade-in focus-visible:outline-none",
        className,
      )}
    >
      {children}
    </div>
  );
}
