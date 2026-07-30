import { useEffect, useRef, useState } from "react";
import { TrendingUp, ShieldCheck, Building2, Briefcase, Plane, Brain } from "lucide-react";
import { getForecast, fmtLpaRange, fmtLpa, projectPackage } from "@/lib/careerForecast";
import { ResultCard, Chip } from "@/components/career/cards/primitives";

interface Props {
  slug: string;
  course?: string;
}

const RISK_TONE: Record<string, { ring: string; label: string }> = {
  augmented: {
    ring: "bg-accent-sky-deep/10 text-accent-sky-deep ring-accent-sky-deep/20",
    label: "AI-augmented",
  },
  audit: { ring: "bg-amber-50 text-amber-700 ring-amber-200", label: "Audit-shifted" },
  resistant: { ring: "bg-primary/10 text-primary ring-primary/20", label: "AI-resistant" },
};

const STREAM_ARC_NOTE: Record<string, Partial<Record<string, string>>> = {
  "clinical-saas": {
    comm: "BBA / Commerce career arc: BDR (Year 0–1) → Account Executive (Y2–3) → Customer Success Manager (Y4–6) → RevOps / Sales Lead (Y7–10). Quota-carrying roles, not desk grind.",
    arts: "Arts / Humanities career arc: Customer Success Associate (Y0–1) → Implementation Lead (Y2–4) → Account Manager (Y5–7) → Customer Success Director (Y8–10).",
  },
  "regulatory-affairs": {
    comm: "Commerce career arc here: RA Coordinator → RA Submissions Lead → RA Project Manager. Heavy on documentation and process discipline - your B.Com / BBA training is an asset.",
  },
  "b2b-saas-sales": {
    comm: "BBA / Commerce career arc: BDR / Inside Sales (Y0–1, ₹5–7 LPA + variable) → Account Executive (Y2–3, ₹10–14) → Senior AE / CSM (Y4–6, ₹16–24) → Sales Manager / RevOps Lead (Y7–10, ₹28–55). Variable pay scales the fastest of any track here.",
    arts: "Arts / Humanities career arc: SDR / CSM Associate (Y0–1) → CSM (Y2–4) → Senior CSM / Account Manager (Y5–7) → Director of Customer Success (Y8–10).",
  },
  "business-analyst": {
    comm: "BBA / Commerce career arc: Junior Analyst (Y0–1, ₹5–7) → Analyst (Y2–3, ₹9–13) → Senior Analyst / Lead (Y4–6, ₹15–22) → Analytics Manager / BI Head (Y7–10, ₹30–55). Stack: SQL → Python → Tableau / PowerBI → stakeholder storytelling.",
    agri: "Agri career arc here: Field Analyst (Y0–1) → Category / Regional Analyst (Y2–4) → Insights Lead (Y5–7) → Head of Analytics (Y8–10). Your domain reading + dashboard work is a rare combo.",
    engg: "B.Tech career arc: Analyst (Y0–1) → Senior Analyst (Y2–3) → Analytics Lead (Y4–6) → Head of Data Science / BI (Y7–10).",
  },
  "software-engineer": {
    engg: "B.Tech career arc: SDE-1 (Y0–2, ₹8–14 at product co's) → SDE-2 (Y3–4, ₹18–28) → Senior / Staff SDE (Y5–7, ₹30–60) → Staff Engineer / Engineering Manager (Y8–10, ₹50–95+). Service-co arc lags by ~40% - aim for product co's from Day 1.",
  },
  "agri-tech-ops": {
    agri: "Agri career arc: Field Associate (Y0–1, ₹3.5–5) → Regional Ops Exec (Y2–3, ₹6–9) → Regional Manager / Category Lead (Y4–6, ₹11–17) → VP Ops / Supply Chain Head (Y7–10, ₹22–45). Your B.Sc / B.Tech Agri background is the qualifier - most peers can't talk to a farmer AND read a dashboard.",
  },
};

export function CareerForecast({ slug, course }: Props) {
  const f = getForecast(slug);
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!f) return null;

  const arcNote = course ? STREAM_ARC_NOTE[slug]?.[course] : undefined;

  const risk = RISK_TONE[f.aiRisk];
  const today = f.avgFresherLpa;
  const projected5 = projectPackage(today, 5, f.cagr);
  const projected10 = projectPackage(today, 10, f.cagr);
  const ladderMid5 = (f.y5LpaRange[0] + f.y5LpaRange[1]) / 2;
  const ladderMid10 = (f.y10LpaRange[0] + f.y10LpaRange[1]) / 2;
  const y5 = ladderMid5 > 0 ? ladderMid5 : projected5;
  const y10 = ladderMid10 > 0 ? ladderMid10 : projected10;

  const maxY = Math.max(y10, today, 1);
  const px = (yr: number, val: number) => {
    const x = 8 + (yr / 10) * 184;
    const y = 56 - (val / maxY) * 44;
    return `${x},${y}`;
  };
  const polyPoints = [px(0, today), px(5, y5), px(10, y10)].join(" ");

  return (
    <div ref={ref}>
      <ResultCard
        tone="primary"
        icon={<Brain className="h-3.5 w-3.5" />}
        eyebrow={`Career forecast · ${f.title}`}
        title="10-year compensation & AI outlook"
        trailing={
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-micro font-bold uppercase tracking-wide ring-1 ${risk.ring}`}
          >
            <ShieldCheck className="h-3 w-3" /> {risk.label}
          </span>
        }
      >
        {/* Today */}
        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="text-micro font-bold uppercase tracking-wide text-slate-500">
              Today · fresher avg
            </p>
            <p className="mt-1 font-grotesk text-h2 font-extrabold tabular-nums text-slate-900">
              {fmtLpa(today)}
            </p>
            <p className="mt-1 text-meta text-slate-600">
              Range {fmtLpaRange(f.fresherRange)} · {f.demand} demand · {f.openingsPerYearIN}
            </p>
          </div>
        </div>

        {/* Sparkline */}
        <div className="mt-5 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <p className="text-micro font-bold uppercase tracking-wide text-slate-500">
              Compensation trajectory
            </p>
            <p className="text-micro font-bold uppercase tracking-wide text-accent-sky-deep">
              +{Math.round(f.cagr * 100)}% CAGR
            </p>
          </div>
          <svg viewBox="0 0 200 60" className="mt-2 block h-16 w-full">
            <defs>
              <linearGradient id={`fc-grad-${slug}`} x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="currentColor"
                  stopOpacity="0.35"
                  className="text-primary"
                />
                <stop
                  offset="100%"
                  stopColor="currentColor"
                  stopOpacity="0"
                  className="text-primary"
                />
              </linearGradient>
            </defs>
            <polygon
              points={`${polyPoints} ${px(10, 0)} ${px(0, 0)}`}
              fill={`url(#fc-grad-${slug})`}
              className="transition-opacity duration-[900ms] ease-out motion-reduce:transition-none"
              style={{ opacity: shown ? 1 : 0 }}
            />
            <polyline
              points={polyPoints}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="text-primary transition-[stroke-dashoffset] duration-[1100ms] ease-out motion-reduce:transition-none"
              style={{ strokeDasharray: 280, strokeDashoffset: shown ? 0 : 280 }}
            />
            {[0, 5, 10].map((yr, i) => {
              const v = i === 0 ? today : i === 1 ? y5 : y10;
              const [cx, cy] = px(yr, v).split(",");
              return <circle key={yr} cx={cx} cy={cy} r="2.5" className="fill-primary" />;
            })}
          </svg>
          <div className="mt-1 flex justify-between font-mono text-micro font-semibold text-slate-500">
            <span>Y0</span>
            <span>Y5</span>
            <span>Y10</span>
          </div>
        </div>

        {/* Y5 + Y10 */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Trajectory
            year="Year 5"
            role={f.y5RoleTitle}
            range={fmtLpaRange(f.y5LpaRange)}
            projected={fmtLpa(projected5)}
          />
          <Trajectory
            year="Year 10"
            role={f.y10RoleTitle}
            range={fmtLpaRange(f.y10LpaRange)}
            projected={fmtLpa(projected10)}
            accent
          />
        </div>

        {/* Role expectations */}
        <div className="mt-5">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-slate-500" />
            <p className="text-micro font-bold uppercase tracking-wide text-slate-500">
              What you'll be doing
            </p>
          </div>
          <ul className="mt-2 grid gap-1.5">
            {f.roleExpectations.map((r) => (
              <li key={r} className="flex items-start gap-2 text-caption text-slate-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {r}
              </li>
            ))}
          </ul>
        </div>

        {arcNote && (
          <div
            data-testid="career-arc-note"
            className="mt-4 rounded-2xl bg-primary/5 p-3 ring-1 ring-primary/20"
          >
            <p className="text-micro font-bold uppercase tracking-wide text-primary">
              Your stream's career arc
            </p>
            <p className="mt-1.5 text-meta leading-relaxed text-slate-700">{arcNote}</p>
          </div>
        )}

        {/* AI risk + demand notes */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <NoteCard
            icon={<TrendingUp className="h-4 w-4 text-accent-sky-deep" />}
            label="Demand driver"
            body={f.demandDriver}
          />
          <NoteCard
            icon={<Brain className="h-4 w-4 text-primary" />}
            label="AI verdict"
            body={f.aiNote}
          />
        </div>

        {/* Abroad */}
        {f.abroad && (
          <div className="mt-4 flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 text-meta text-slate-700 ring-1 ring-slate-200">
            <Plane className="h-4 w-4 text-primary" />
            <span className="text-base">{f.abroad.flag}</span>
            <span>
              <span className="font-bold text-slate-900">{f.abroad.country}</span> ·{" "}
              {f.abroad.payInrEquiv}
            </span>
          </div>
        )}

        {/* Employers */}
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-slate-500" />
            <p className="text-micro font-bold uppercase tracking-wide text-slate-500">
              Top hiring employers
            </p>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {f.topEmployers.map((e) => (
              <Chip key={e} tone="slate">
                {e}
              </Chip>
            ))}
          </div>
        </div>

        <p className="mt-4 font-mono text-micro font-semibold uppercase tracking-wide text-slate-400">
          Source · Naukri + LinkedIn JDs + NASSCOM/IQVIA · refreshed {f.asOf}
        </p>
      </ResultCard>
    </div>
  );
}

function Trajectory({
  year,
  role,
  range,
  projected,
  accent,
}: {
  year: string;
  role: string;
  range: string;
  projected: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-4 ring-1 ${accent ? "bg-yellow-50 ring-yellow-200" : "bg-slate-50 ring-slate-200"}`}
    >
      <p
        className={`text-micro font-bold uppercase tracking-wide ${accent ? "text-yellow-700" : "text-slate-500"}`}
      >
        {year}
      </p>
      <p className="mt-1 font-grotesk text-body-sm font-extrabold text-slate-900">{role}</p>
      <p className="mt-1 text-caption font-bold text-accent-sky-deep">{range}</p>
      <p className="mt-0.5 font-mono text-micro text-slate-500">Projected avg · {projected}</p>
    </div>
  );
}

function NoteCard({ icon, label, body }: { icon: React.ReactNode; label: string; body: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
      <div className="flex items-center gap-1.5">
        {icon}
        <p className="text-micro font-bold uppercase tracking-wide text-slate-500">{label}</p>
      </div>
      <p className="mt-1.5 text-meta leading-relaxed text-slate-700">{body}</p>
    </div>
  );
}
