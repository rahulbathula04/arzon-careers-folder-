import type { RichCourseMeta } from "@/data/courseMeta";
import type { getTrackTheme } from "@/data/trackTheme";
import { ConversionSection } from "@/components/courses/ConversionSection";

type Theme = ReturnType<typeof getTrackTheme>;

/** Objection-handling FAQ. Lives after the final CTA so it catches stragglers. */
export function FaqBlock({ meta, theme }: { meta: RichCourseMeta; theme: Theme }) {
  return (
    <ConversionSection
      id="faq"
      step="12"
      eyebrow="Still on the fence?"
      title="Quick answers to the questions everyone asks."
      theme={theme}
    >
      <div className="grid gap-3">
        {meta.faq.map((q) => (
          <details
            key={q.q}
            className="group rounded-2xl border p-5 [&_summary::-webkit-details-marker]:hidden"
            style={{ background: "rgba(17,26,46,1)", borderColor: "rgba(255,255,255,0.10)" }}
          >
            <summary
              className="flex cursor-pointer items-center justify-between gap-3 text-body-sm font-semibold"
              style={{ color: "#F8FAFC" }}
            >
              {q.q}
              <span
                className={`text-h4 leading-none transition-transform group-open:rotate-45 ${theme.accentText}`}
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-body-sm leading-relaxed" style={{ color: "#CBD5E1" }}>
              {q.a}
            </p>
          </details>
        ))}
      </div>
    </ConversionSection>
  );
}
