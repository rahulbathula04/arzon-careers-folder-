import { NEXT_COHORT } from "./constants";
import { WhatsAppLink } from "@/components/common/WhatsAppLink";
import { MessageCircle, Calendar } from "lucide-react";

export function LiveBar() {
  return (
    <div className="tone-dark relative z-30 border-b border-slate-200/5 bg-surface-raised/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-5 gap-y-1 px-4 py-2 text-meta font-medium text-slate-100/70 sm:px-6">
        <span className="inline-flex items-center gap-2">
          <Calendar className="h-3 w-3 text-primary-glow" />
          Next cohort: <span className="text-slate-50">{NEXT_COHORT.label}</span> · Starts{" "}
          {NEXT_COHORT.startsLabel}
        </span>
        <span className="hidden h-3 w-px bg-slate-50/15 sm:block" />
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-glow/10 px-2.5 py-0.5 text-eyebrow ring-1 ring-accent-glow/30">
          Applications open
        </span>
        <span className="hidden h-3 w-px bg-slate-50/15 sm:block" />
        <WhatsAppLink
          source="live_bar"
          message="Hi Arzon. I want to know more about the upcoming cohort."
          className="inline-flex items-center gap-1.5 rounded-full border border-accent-glow/30 bg-accent-glow/10 px-2.5 py-0.5 text-eyebrow hover:bg-accent-glow/15"
        >
          <MessageCircle className="h-3 w-3" /> WhatsApp counsellor
        </WhatsAppLink>
      </div>
    </div>
  );
}
