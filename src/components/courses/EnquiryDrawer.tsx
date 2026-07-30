import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { EnquiryForm } from "./EnquiryForm";
import type { TrackTheme } from "@/data/trackTheme";

type Placement = "hero" | "mid" | "final";

export function EnquiryDrawer({
  open,
  onOpenChange,
  courseSlug,
  courseTitle,
  placement,
  theme,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  courseSlug: string;
  courseTitle: string;
  placement: Placement;
  theme: TrackTheme;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full border-l border-white/10 bg-[#0A0F1E] p-0 text-white sm:max-w-md"
      >
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${theme.hex.from}, ${theme.hex.to}, transparent)`,
          }}
        />
        <div className="flex h-full flex-col overflow-y-auto p-6 sm:p-7">
          <SheetHeader className="text-left">
            <p
              className={`font-mono text-micro font-semibold uppercase tracking-[0.28em] ${theme.accentText}`}
            >
              Talk to a counsellor
            </p>
            <SheetTitle className="mt-2 font-display text-h4 font-bold text-white sm:text-h3">
              {courseTitle}
            </SheetTitle>
            <SheetDescription className="text-sm text-white/65">
              Share your details - we'll walk you through the syllabus, fees and the next cohort.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <EnquiryForm
              courseSlug={courseSlug}
              courseTitle={courseTitle}
              placement={placement}
              theme={theme}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
