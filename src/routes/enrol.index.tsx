import { createFileRoute, Link } from "@tanstack/react-router";
import { TIER_META, formatInr, type TierId } from "@/data/enrolmentTiers";
import { ArrowRight, CheckCircle2, Tag, Clock, Sparkles, ShieldCheck } from "lucide-react";
import { ResumeBanner } from "@/components/enrol/ResumeBanner";

export const Route = createFileRoute("/enrol/")({
  head: () => ({
    meta: [
      { title: "Select Programme Tier · Arzon Global" },
      {
        name: "description",
        content: "Choose your Arzon Global workforce readiness tier and reserve your seat.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: EnrolIndex,
});

function EnrolIndex() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <ResumeBanner />

        {/* Header & Stepper */}
        <header className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-sky-500/10 border border-sky-500/20 px-3 py-1 text-xs font-mono font-medium text-sky-400">
              <Sparkles className="h-3.5 w-3.5" /> Step 1 of 3 — Select Programme Tier
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Select Your Workforce Readiness Path
          </h1>
          <p className="max-w-2xl text-sm text-slate-400 leading-relaxed">
            Standard programme fees shown below. Apply promotional code{" "}
            <span className="font-mono font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              ARZONPRIME60
            </span>{" "}
            at checkout for launch tier savings.
          </p>
        </header>

        {/* Tier Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-3 items-stretch">
          {(Object.keys(TIER_META) as TierId[]).map((id) => {
            const t = TIER_META[id];
            const featured = id === "career";
            const isElite = id === "elite";

            return (
              <div
                key={id}
                className={`relative flex flex-col justify-between rounded-xl border p-6 transition-colors ${
                  featured
                    ? "bg-[#0f172a] border-sky-500/40 ring-1 ring-sky-500/20"
                    : isElite
                    ? "bg-[#0f172a] border-emerald-500/40"
                    : "bg-[#0c1322] border-white/10"
                }`}
              >
                <div>
                  {/* Badge Header */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <h2 className="text-xl font-semibold text-white">{t.name}</h2>
                    {featured && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-sky-500/10 border border-sky-500/20 text-sky-400">
                        Most Popular
                      </span>
                    )}
                    {isElite && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        Interview Guarantee
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed min-h-[36px]">
                    {t.sub}
                  </p>

                  {/* Price Specification */}
                  <div className="mt-6 rounded-lg bg-slate-900/60 border border-white/10 p-4 space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold font-mono text-white tabular-nums">
                        {formatInr(t.mrpInr)}
                      </span>
                      <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                        standard
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                      <Tag className="h-3.5 w-3.5 shrink-0" />
                      <span>Drops to <strong className="font-mono text-white">{formatInr(t.offerPriceInr)}</strong> with ARZONPRIME60</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock className="h-3.5 w-3.5 shrink-0 text-slate-500" />
                      <span>Split pay option: <strong className="text-slate-300">₹1,000 today</strong></span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="mt-6 space-y-3">
                    <p className="text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">Included Features</p>
                    <ul className="space-y-2.5 text-xs text-slate-300">
                      {t.perks.map((p) => (
                        <li key={p} className="flex items-start gap-2.5">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                          <span className="leading-normal">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Primary CTA Button */}
                <Link
                  to="/enrol/$tier"
                  params={{ tier: id }}
                  className="mt-8 flex items-center justify-center gap-2 rounded-lg bg-[#0284c7] hover:bg-[#0369a1] text-white text-sm font-medium h-11 px-4 transition-colors"
                >
                  <span>Select {t.name} Tier</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Enterprise Assistance Banner */}
        <div className="rounded-xl border border-white/10 bg-[#0f172a] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-white text-base">Need guidance selecting your programme track?</h3>
            <p className="text-xs text-slate-400 mt-0.5">Our admissions counsellors provide profile evaluations and domain mapping.</p>
          </div>
          <Link
            to="/apply"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-slate-800 hover:bg-slate-700 px-4 py-2.5 text-xs font-medium text-white transition-colors shrink-0"
          >
            <span>Take 3-Min Assessment</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
