import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Users,
  Crown,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { ResumeBanner } from "@/components/enrol/ResumeBanner";
import { PremiumChip } from "@/components/ui/PremiumChip";
import { TIER_META, formatInr, type TierId } from "@/data/enrolmentTiers";
import { COUNSELLOR_PHONE } from "@/components/landing/constants";

export const Route = createFileRoute("/enrol/")({
  validateSearch: (search: Record<string, unknown>) =>
    z
      .object({
        programme: z.string().trim().max(80).optional(),
        source: z.string().trim().max(80).optional(),
      })
      .parse(search),
  head: () => ({
    meta: [
      { title: "Choose Your Programme · Arzon Global" },
      {
        name: "description",
        content:
          "Compare Arzon Global programme tracks and choose Essential, Recruiter Track, or Elite One-on-One support.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: EnrolIndex,
});

type TierPresentation = {
  eyebrow: string;
  title: string;
  description: string;
  icon: typeof BookOpen;
  accent: string;
  soft: string;
  border: string;
  button: string;
  features: string[];
};

const PRESENTATION: Record<TierId, TierPresentation> = {
  essential: {
    eyebrow: "ESSENTIAL",
    title: "Self-Paced Career Track",
    description:
      "A structured learning path for candidates who want to build role-ready knowledge independently.",
    icon: BookOpen,
    accent: "text-[#334155]",
    soft: "bg-[#F1F5F9]",
    border: "border-[#CBD5E1]",
    button: "bg-[#071A4A] hover:bg-[#0F438B]",
    features: [
      "Full role-focused curriculum",
      "Recorded lessons and practical exercises",
      "Reference resources and guided practice",
      "Completion certificate",
      "Community and learner support",
    ],
  },
  career: {
    eyebrow: "CAREER",
    title: "Recruiter Track",
    description:
      "For candidates who want live mentor support, practical projects and structured recruiter preparation.",
    icon: Users,
    accent: "text-[#1557B0]",
    soft: "bg-[#EFF6FF]",
    border: "border-[#93C5FD]",
    button: "bg-[#1557B0] hover:bg-[#0F438B]",
    features: [
      "Everything in Essential",
      "Live mentor-led sessions",
      "Practical projects and case work",
      "Resume and interview preparation",
      "Recruiter and hiring support",
    ],
  },
  elite: {
    eyebrow: "ELITE",
    title: "Elite One-on-One",
    description:
      "Personalised guidance with top industry mentors with 15–20 years of professional experience.",
    icon: Crown,
    accent: "text-[#047857]",
    soft: "bg-[#ECFDF5]",
    border: "border-[#86EFAC]",
    button: "bg-[#047857] hover:bg-[#065F46]",
    features: [
      "Everything in Recruiter Track",
      "Dedicated one-on-one mentor guidance",
      "Weekly personalised career reviews",
      "Senior mentor feedback on projects",
      "Focused interview and career preparation",
    ],
  },
};

const MATRIX = [
  ["Role-focused curriculum", "✓", "✓", "✓"],
  ["Recorded learning", "✓", "✓", "✓"],
  ["Live mentor sessions", "—", "✓", "✓"],
  ["Practical projects", "Guided", "✓", "✓"],
  ["Recruiter preparation", "—", "✓", "✓"],
  ["One-on-one mentor", "—", "—", "✓"],
  ["Senior mentor guidance", "—", "—", "15–20 yrs experience"],
];

function EnrolIndex() {
  const { programme, source } = Route.useSearch();
  const [selectedFilter, setSelectedFilter] = useState<"all" | TierId>("all");
  const [showMatrix, setShowMatrix] = useState(false);

  const visibleTiers = (Object.keys(PRESENTATION) as TierId[]).filter(
    (id) => selectedFilter === "all" || selectedFilter === id,
  );

  return (
    <div className="enrol-page tone-light arzon-page-surface min-h-screen bg-[#F7F9FC] text-[#071A4A] antialiased">
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-8 sm:px-6 lg:px-10 lg:pb-24">
        <ResumeBanner />

        <header className="mx-auto max-w-4xl text-center">
          <PremiumChip variant="navy" size="md">
            STEP 1 OF 3 · PROGRAMME SELECTION
          </PremiumChip>

          <h1
            className="mt-6 font-serif text-4xl font-bold leading-[1.05] tracking-tight text-[#071A4A] sm:text-5xl lg:text-6xl"
            style={{ color: "#071A4A" }}
          >
            Choose the programme that fits your career plan.
          </h1>

          <p
            className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#475569] sm:text-lg"
            style={{ color: "#475569" }}
          >
            Three clear support levels. The fee shown is the programme fee. No crossed-out
            price, artificial discount or hidden charge.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {(
              [
                ["all", "All 3 tracks"],
                ["essential", "Essential · Self-Paced"],
                ["career", "Career · Recruiter Track"],
                ["elite", "Elite · One-on-One"],
              ] as const
            ).map(([id, label]) => {
              const active = selectedFilter === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelectedFilter(id)}
                  className={
                    active
                      ? "inline-flex min-h-10 items-center rounded-full bg-[#071A4A] px-4 text-xs font-bold text-white shadow-sm"
                      : "inline-flex min-h-10 items-center rounded-full border border-[#CBD5E1] bg-white px-4 text-xs font-bold text-[#334155] hover:border-[#94A3B8] hover:bg-[#F8FAFC]"
                  }
                  style={{
                    backgroundColor: active ? "#071A4A" : "#FFFFFF",
                    color: active ? "#FFFFFF" : "#334155",
                    borderColor: active ? "#071A4A" : "#CBD5E1",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </header>

        <section aria-labelledby="tracks-heading" className="mt-12">
          <h2 id="tracks-heading" className="sr-only">
            Programme tracks and pricing
          </h2>

          <div
            className={
              visibleTiers.length === 1
                ? "mx-auto grid max-w-xl"
                : "grid items-stretch gap-5 lg:grid-cols-3"
            }
          >
            {visibleTiers.map((id) => {
              const meta = TIER_META[id];
              const view = PRESENTATION[id];
              const Icon = view.icon;

              return (
                <article
                  key={id}
                  className={
                    "flex min-w-0 flex-col overflow-hidden rounded-[28px] border bg-white shadow-[0_12px_40px_rgba(7,26,74,0.08)] " +
                    view.border
                  }
                  style={{ backgroundColor: "#FFFFFF" }}
                >
                  <div className={`border-b px-6 pb-6 pt-6 sm:px-7 ${view.soft} `}>
                    <div className="flex items-center justify-between gap-4">
                      <span className={`text-[11px] font-extrabold tracking-[0.16em] ${view.accent}`}>
                        {view.eyebrow}
                      </span>
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border bg-white ${view.border}`}
                      >
                        <Icon className={`h-5 w-5 ${view.accent}`} aria-hidden="true" />
                      </span>
                    </div>

                    <h3
                      className="mt-5 min-h-[3.5rem] font-serif text-2xl font-bold leading-tight text-[#071A4A]"
                      style={{ color: "#071A4A" }}
                    >
                      {view.title}
                    </h3>

                    <p
                      className="mt-3 min-h-[5.25rem] text-sm leading-6 text-[#475569]"
                      style={{ color: "#475569" }}
                    >
                      {view.description}
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col px-6 pb-6 pt-6 sm:px-7" style={{ backgroundColor: "#FFFFFF" }}>
                    <div className="rounded-2xl border border-[#D9E2EC] bg-[#F8FAFC] p-5">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#64748B]" style={{ color: "#64748B" }}>
                        Programme fee
                      </p>
                      <p
                        className="mt-2 font-serif text-4xl font-bold tracking-tight text-[#071A4A]"
                        style={{ color: "#071A4A" }}
                      >
                        {formatInr(meta.mrpInr)}
                      </p>
                      <p className="mt-1 text-xs font-medium text-[#64748B]" style={{ color: "#64748B" }}>
                        Full programme price
                      </p>
                    </div>

                    <div className="mt-6">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#64748B]" style={{ color: "#64748B" }}>
                        What is included
                      </p>
                      <ul className="mt-4 space-y-3">
                        {view.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${view.soft}`}>
                              <Check className={`h-3.5 w-3.5 ${view.accent}`} strokeWidth={3} />
                            </span>
                            <span className="text-sm font-medium leading-5 text-[#334155]" style={{ color: "#334155" }}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-8">
                      <Link
                        to="/enrol/$tier"
                        params={{ tier: id }}
                        search={programme || source ? { programme, source } : undefined}
                        className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 ${view.button}`}
                        style={{ color: "#FFFFFF" }}
                      >
                        Continue with {view.eyebrow.charAt(0) + view.eyebrow.slice(1).toLowerCase()}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-10 rounded-[24px] border border-[#D9E2EC] bg-white p-5 shadow-sm sm:p-7" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#64748B]" style={{ color: "#64748B" }}>
                Need help deciding?
              </p>
              <h2 className="mt-2 font-serif text-2xl font-bold text-[#071A4A]" style={{ color: "#071A4A" }}>
                Compare the tracks before you continue.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#475569]" style={{ color: "#475569" }}>
                The three tracks use the same core career direction. The difference is the amount
                of live support, recruiter preparation and one-on-one mentor time.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowMatrix((value) => !value)}
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-5 text-sm font-bold text-[#071A4A] hover:bg-[#F8FAFC]"
              style={{ color: "#071A4A", backgroundColor: "#FFFFFF" }}
            >
              {showMatrix ? "Hide comparison" : "Show comparison"}
              {showMatrix ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>

          {showMatrix && (
            <div className="mt-7 overflow-x-auto rounded-2xl border border-[#E2E8F0]" style={{ backgroundColor: "#FFFFFF" }}>
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr className="bg-[#F8FAFC]">
                    <th className="px-4 py-4 text-xs font-extrabold uppercase tracking-wider text-[#64748B]">
                      Feature
                    </th>
                    <th className="px-4 py-4 text-sm font-bold text-[#334155]">Essential</th>
                    <th className="px-4 py-4 text-sm font-bold text-[#1557B0]">Recruiter Track</th>
                    <th className="px-4 py-4 text-sm font-bold text-[#047857]">Elite One-on-One</th>
                  </tr>
                </thead>
                <tbody>
                  {MATRIX.map(([feature, essential, career, elite]) => (
                    <tr key={feature} className="border-t border-[#E2E8F0]">
                      <td className="px-4 py-4 text-sm font-semibold text-[#334155]" style={{ color: "#334155" }}>{feature}</td>
                      <td className="px-4 py-4 text-sm text-[#475569]" style={{ color: "#475569" }}>{essential}</td>
                      <td className="px-4 py-4 text-sm font-semibold text-[#1557B0]" style={{ color: "#1557B0" }}>{career}</td>
                      <td className="px-4 py-4 text-sm font-semibold text-[#047857]" style={{ color: "#047857" }}>{elite}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[#D9E2EC] bg-white p-5" style={{ backgroundColor: "#FFFFFF" }}>
            <ShieldCheck className="h-5 w-5 text-[#1557B0]" />
            <h3 className="mt-3 text-sm font-bold text-[#071A4A]" style={{ color: "#071A4A" }}>Clear pricing</h3>
            <p className="mt-1 text-xs leading-5 text-[#64748B]" style={{ color: "#64748B" }}>
              The fee displayed on each card is the programme fee you are choosing.
            </p>
          </div>
          <div className="rounded-2xl border border-[#D9E2EC] bg-white p-5" style={{ backgroundColor: "#FFFFFF" }}>
            <BookOpen className="h-5 w-5 text-[#1557B0]" />
            <h3 className="mt-3 text-sm font-bold text-[#071A4A]" style={{ color: "#071A4A" }}>Role-focused learning</h3>
            <p className="mt-1 text-xs leading-5 text-[#64748B]" style={{ color: "#64748B" }}>
              Training, practical work and career preparation are organised around target roles.
            </p>
          </div>
          <div className="rounded-2xl border border-[#D9E2EC] bg-white p-5" style={{ backgroundColor: "#FFFFFF" }}>
            <Users className="h-5 w-5 text-[#047857]" />
            <h3 className="mt-3 text-sm font-bold text-[#071A4A]" style={{ color: "#071A4A" }}>Human support</h3>
            <p className="mt-1 text-xs leading-5 text-[#64748B]" style={{ color: "#64748B" }}>
              Higher tracks add live guidance and one-on-one mentor support.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-[24px] bg-[#071A4A] p-6 text-white shadow-lg sm:p-8" style={{ backgroundColor: "#071A4A" }}>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#93C5FD]">
                Still deciding?
              </p>
              <h2 className="mt-2 font-serif text-2xl font-bold text-white">
                Talk to an Arzon programme counsellor.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#CBD5E1]">
                Get help comparing the tracks before you make a payment decision.
              </p>
            </div>
            <a
              href={`https://wa.me/${COUNSELLOR_PHONE}?text=Hi%2C%20I%27d%20like%20help%20choosing%20an%20Arzon%20programme%20track.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-[#071A4A] hover:bg-[#EFF6FF] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#071A4A]"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Counsellor
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
