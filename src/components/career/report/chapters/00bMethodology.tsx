/**
 * ChapterMethodology — explains how sources, confidence, and salary
 * assumptions are computed. Collapsed by default; auto-expands on print.
 */
import { BookOpenCheck, ShieldCheck, Coins, AlertTriangle } from "lucide-react";
import { ReportCard } from "../ReportCard";
import { REPORT_TONES } from "../reportTones";
import { computeReportFreshness } from "@/data/industry/sources";

export function ChapterMethodology({ chapter = 0 }: { chapter?: number }) {
  const f = computeReportFreshness();
  return (
    <ReportCard
      id={`ch-${chapter}-methodology`}
      chapter={chapter}
      readMinutes={3}
      eyebrow="Methodology"
      tone="neutral"
      title="How this report is built"
      subtitle={`We publish our method so you can pressure-test every number. Source catalogue last verified ${f.label} across ${f.count} distinct sources.`}
      whatThisMeans="You can trust the score because every number here traces back to a public source you can open yourself."
      summary={
        <p>
          Every claim is backed by a live citation. Confidence badges reflect source count + JD
          volume + recency. Salary bands are interquartile ranges, not means. Expand for the full
          method.
        </p>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <MethodBlock icon={BookOpenCheck} tone="primary" title="1 · Where the data comes from">
          Monthly JD scrapes from Naukri + LinkedIn (n≥150 per role), salary aggregators
          (AmbitionBox, Glassdoor, Talent500), government statistics (MoSPI, CDSCO), industry
          reports (IQVIA, NASSCOM), and quarterly Arzon employer-desk briefings with hiring
          managers. Titles, tools, and cities are pulled <em>verbatim</em> from live requisitions —
          never paraphrased.
        </MethodBlock>

        <MethodBlock icon={ShieldCheck} tone="secondary" title="2 · How confidence is computed">
          <strong className="text-white/90">High:</strong> ≥3 sources or ≥50 JDs corroborate within
          90 days. <br />
          <strong className="text-white/90">Medium:</strong> 1–2 sources or 10–49 JDs. <br />
          <strong className="text-white/90">Directional:</strong> single reference or trend signal
          only. <br />
          Click any confidence chip to open the Evidence Explorer and see the exact snippets that
          back the claim.
        </MethodBlock>

        <MethodBlock icon={Coins} tone="warn" title="3 · How salary ranges are built">
          Y0 base = median of AmbitionBox + Glassdoor + Naukri for the exact L1 title, cross-checked
          against Talent500's GCC premium. Y1–Y5 progression uses observed 12–18% CAGR for the role
          family; Y6–Y10 dampens to 8–10% CAGR reflecting typical band saturation. City multipliers
          apply MoSPI CPI (Bengaluru = 1.00 baseline; Hyderabad 0.94; Chennai 0.92; Mumbai 1.12;
          Delhi 1.06).
          <br />
          <span className="mt-1 inline-block text-white/60">
            Low / Median / High = 25th / 50th / 75th percentile from the pooled distribution.
          </span>
        </MethodBlock>

        <MethodBlock icon={AlertTriangle} tone="ruled-out" title="4 · Known limitations">
          Self-reported salaries skew slightly high. LinkedIn is only used as a directional
          hiring-intent signal, never as a salary source. 10-year forecasts assume no structural
          regulatory shock (e.g. an India-wide AI mandate). If your target is a niche startup
          (&lt;50 employees), treat all ranges as directional.
        </MethodBlock>
      </div>
    </ReportCard>
  );
}

function MethodBlock({
  icon: Icon,
  tone,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tone: keyof typeof REPORT_TONES;
  title: string;
  children: React.ReactNode;
}) {
  const t = REPORT_TONES[tone];
  return (
    <div className={`rounded-2xl border p-4 ${t.chipBorder} ${t.chipBg}`}>
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${t.iconFill}`} />
        <p className={`font-mono text-caption uppercase tracking-[0.18em] ${t.chipText}`}>
          {title}
        </p>
      </div>
      <div className="mt-2 text-body-sm leading-relaxed text-white/80">{children}</div>
    </div>
  );
}

export default ChapterMethodology;
