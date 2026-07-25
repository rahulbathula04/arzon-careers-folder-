import { createFileRoute, Link } from "@tanstack/react-router";
import { TIER_META, formatInr, type TierId } from "@/data/enrolmentTiers";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
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
    <div className="min-h-screen editorial-page-bg px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-12">
        <ResumeBanner />

        {/* Header & Editorial Headline */}
        <header className="space-y-4 text-center sm:text-left">
          <p className="text-xs font-medium uppercase tracking-widest text-[#707C90]">
            Step 1 of 3 — Programme Selection
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#151C2E] tracking-tight leading-tight">
            Select your <span className="italic text-[#8A6D1F]">workforce readiness path</span>
          </h1>
          <p className="max-w-2xl text-sm text-[#5B6472] leading-relaxed">
            Select your preferred learning structure. All programme fees are transparent with zero hidden charges.
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
                className={`relative flex flex-col justify-between editorial-card p-6 transition-all duration-200 ${
                  featured ? "ring-2 ring-[#1D4ED8]" : ""
                }`}
              >
                <div>
                  {/* Badge Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h2 className="font-serif text-2xl font-bold text-[#151C2E]">{t.name}</h2>
                    {featured && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#1D4ED8]/10 text-[#1D4ED8]">
                        Most Popular
                      </span>
                    )}
                    {isElite && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Interview Guarantee
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#5B6472] leading-relaxed min-h-[36px]">
                    {t.sub}
                  </p>

                  {/* Inset Stat Tile for Pricing */}
                  <div className="mt-6 editorial-stat-tile p-4 space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-3xl font-bold text-[#151C2E] tabular-nums">
                        {formatInr(t.mrpInr)}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#707C90]">
                        programme fee
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#5B6472]">
                      <Clock className="h-3.5 w-3.5 shrink-0 text-[#707C90]" />
                      <span>Split-pay option: <strong className="text-[#151C2E]">₹1,000 to lock seat</strong></span>
                    </div>
                  </div>

                  {/* Included Features */}
                  <div className="mt-6 space-y-3">
                    <p className="text-xs font-medium uppercase tracking-widest text-[#707C90]">Included Features</p>
                    <ul className="space-y-2.5 text-xs text-[#5B6472]">
                      {t.perks.map((p) => (
                        <li key={p} className="flex items-start gap-2.5">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1D4ED8]" />
                          <span className="leading-snug text-[#151C2E]">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Primary Royal Blue CTA */}
                <Link
                  to="/enrol/$tier"
                  params={{ tier: id }}
                  className="mt-8 flex items-center justify-center gap-2 editorial-btn-blue text-sm h-11 px-4 w-full"
                >
                  <span>Select {t.name} Tier</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Admissions Assistance Banner */}
        <div className="editorial-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#151C2E]">
              Need help deciding which path fits your <span className="italic text-[#8A6D1F]">career goal</span>?
            </h3>
            <p className="text-xs text-[#5B6472] mt-1">Our admissions team provides candidate evaluation and domain guidance.</p>
          </div>
          <Link
            to="/apply"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 px-4 py-2.5 text-xs font-semibold text-[#151C2E] transition-colors shrink-0"
          >
            <span>Take 3-Min Fit Test</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
