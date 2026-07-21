import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Target } from "lucide-react";
import type { SyllabusModule } from "@/data/courses";
import { getTrackTheme } from "@/data/trackTheme";

export function SyllabusAccordion({ modules, slug }: { modules: SyllabusModule[]; slug?: string }) {
  const theme = getTrackTheme(slug);
  return (
    <Accordion type="multiple" className="w-full" defaultValue={[`m-0`]}>
      {modules.map((m, i) => (
        <AccordionItem
          key={m.weeks}
          value={`m-${i}`}
          data-testid="track-module"
          data-track={slug ?? "neutral"}
          className="border-border"
        >
          <AccordionTrigger className="py-5 text-left hover:no-underline">
            <div className="flex w-full items-center gap-4">
              <span
                className={`flex h-8 min-w-[3.25rem] items-center justify-center rounded-full font-mono text-micro font-semibold tracking-wider ring-1 ${theme.chip} ${theme.ring}`}
              >
                {m.weeks}
              </span>
              <span className="font-display text-base font-semibold text-foreground sm:text-lg">
                {m.title}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="ml-[4.5rem] grid gap-5 sm:grid-cols-[1fr_auto]">
              <div>
                <p className="font-mono text-micro font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Topics
                </p>
                <ul className="mt-2 grid gap-1.5">
                  {m.topics.map((t) => (
                    <li key={t} className="flex items-start gap-2 text-sm text-foreground">
                      <span className={`mt-2 h-1 w-1 flex-shrink-0 rounded-full ${theme.accent}`} />
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">
                  <span
                    className={`font-mono font-semibold uppercase tracking-wider ${theme.accentText}`}
                  >
                    Deliverable
                  </span>
                  <span className="mx-2">·</span>
                  {m.deliverable}
                </p>
              </div>
              <div
                className={`rounded-xl border border-white/10 bg-gradient-to-br ${theme.grad} p-4 ring-1 ${theme.ring} sm:max-w-[220px]`}
              >
                <Target className={`h-4 w-4 ${theme.accentText}`} />
                <p
                  className={`mt-2 font-mono text-micro font-semibold uppercase tracking-[0.18em] ${theme.accentText}`}
                >
                  Satisfies JD skill
                </p>
                <p className="mt-1 text-xs text-[#0A0F1E]/80">{m.jdSkill}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
