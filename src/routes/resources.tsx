import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronRight,
  Compass,
  Database,
  FileSearch,
  FileText,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { Marquee } from "@/components/magicui/marquee";
import { RESEARCH_REPORTS } from "@/data/researchReports";
import { ResourceGrid } from "@/components/resources/ResourceGrid";
import { ResourceToolsStrip } from "@/components/resources/ResourceToolsStrip";
import { pageSeo } from "@/lib/seo";
import { breadcrumbSchema, itemListSchema } from "@/lib/jsonLd";
import { useFunnelTracking } from "@/hooks/useFunnelTracking";

const RESEARCH_TICKER = [
  "300+ PV JD Skill Frequency Audit",
  "Hyderabad Training & Living Cost Report",
  "B.Pharm Degree Mobility Index",
  "US Healthcare RCM Claims Denial Audit",
  "Relocation Cost Calculator",
  "Clinical Skill Gap Analyzer",
];

export const Route = createFileRoute("/resources")({
  headers: () => {
    return {
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
    };
  },
  head: () => {
    const seo = pageSeo({
      path: "/resources",
      title: "Healthcare Career Research & Tools · Arzon Global",
      description:
        "Explore empirical healthcare research reports, relocation cost calculators, JD skill frequency audits, and degree mobility indices in India.",
      image: "/og/about.jpg",
    });
    return {
      meta: [{ title: "Healthcare Career Research & Tools · Arzon Global" }, ...seo.meta],
      links: seo.links,
      scripts: [
        {
          type: "application/ld+json",
          children: breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Research & Resources", path: "/resources" },
          ]),
        },
        {
          type: "application/ld+json",
          children: itemListSchema({
            name: "Arzon Empirical Research Dossiers",
            items: RESEARCH_REPORTS.map((r) => ({
              name: r.h1,
              path: `/resources/${r.slug}`,
              description: r.answerLayer,
            })),
          }),
        },
      ],
    };
  },
  component: ResearchHubComponent,
});

function ResearchHubComponent() {
  const totalReports = RESEARCH_REPORTS.length;
  useFunnelTracking({ pageName: "resources_hub", category: "research" });

  return (
    <main className="min-h-screen bg-white tone-light card-light overflow-x-clip text-[#081F38]">
      {/* ─── SECTION 1: HERO (HOME V2 THEME & PEAK UI DETAILING) ───────────── */}
      <section className="relative overflow-hidden bg-white pt-10 sm:pt-16 pb-14 sm:pb-20 border-b border-[#E4EAF2] tone-light card-light">
        {/* Ambient Radial Accent */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.06),rgba(255,255,255,0))] pointer-events-none"
          aria-hidden="true"
        />

        <div className="ap-shell relative z-10">
          <div className="mx-auto flex max-w-5xl xl:max-w-6xl flex-col items-center text-center">
            {/* Breadcrumb Navigation */}
            <nav
              aria-label="Breadcrumb"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#64748B] mb-5"
            >
              <Link to="/" className="hover:text-[#081F38] transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 text-[#94A3B8]" />
              <span className="text-[#081F38] font-bold">Research &amp; Resources</span>
            </nav>

            {/* Clear Healthcare Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#BFDBFE] bg-[#EEF6FF]/95 backdrop-blur-xs px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase text-[#1D4ED8] shadow-2xs mb-4 sm:mb-6">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              <span>
                {totalReports} RESEARCH DOSSIERS &bull; AUDITED HIRING METRICS &bull; 2,000+ JDS
              </span>
            </div>

            {/* High-Impact Typography Scale with Home Page Gradient */}
            <h1 className="text-[26px] min-[390px]:text-[30px] sm:text-[46px] md:text-[54px] lg:text-[62px] font-extrabold tracking-[-0.035em] text-[#081F38] leading-[1.12] sm:leading-[1.05] max-w-5xl mx-auto mb-4 sm:mb-6 px-1">
              <span>Empirical Healthcare Research &amp;</span>{" "}
              <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
                Audited Market Intelligence.
              </span>
            </h1>

            {/* Arzon Slate Subtitle */}
            <p className="text-[15px] sm:text-lg md:text-[19px] text-[#475569] leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 font-normal">
              Data-backed, timestamped reports and interactive decision tools analyzing hiring frequency bands, training economics, living costs, and qualification mobility across Indian capability centers.
            </p>

            {/* Research Marquee Ticker Pill */}
            <div className="w-full max-w-sm sm:max-w-2xl mx-auto mb-6 sm:mb-8 px-1">
              <div className="flex items-center gap-2 sm:gap-3 py-1 sm:py-1.5 px-2.5 sm:px-3 rounded-full border border-[#E2E8F0] bg-white tone-light card-light shadow-2xs overflow-hidden">
                <span className="shrink-0 text-[9.5px] sm:text-[11px] font-mono font-bold tracking-wider uppercase text-[#2563EB] bg-[#EEF6FF] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-[#D0E1FD]">
                  RESEARCH
                </span>
                <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                  <Marquee className="py-0 [--gap:0.75rem] [--duration:28s]" pauseOnHover repeat={4}>
                    {RESEARCH_TICKER.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center text-[11px] sm:text-xs font-semibold text-[#081F38] bg-[#F8FAFC] hover:bg-[#EEF6FF] px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-[#E2E8F0] transition-colors whitespace-nowrap cursor-default"
                      >
                        {t}
                      </span>
                    ))}
                  </Marquee>
                </div>
              </div>
            </div>

            {/* Rebuilt Credibility Grid (Zero Negative Claims, High Institutional Trust) */}
            <div className="pt-6 sm:pt-8 w-full max-w-4xl mx-auto border-t border-[#E4EAF2]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5">
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-3 sm:p-3.5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]/90 hover:bg-white hover:border-[#BFDBFE] hover:shadow-xs transition-all tone-light card-light group">
                  <div className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-xl bg-[#EEF6FF] text-[#2563EB] border border-[#D0E1FD] mb-2 group-hover:scale-105 transition-transform">
                    <BarChart3 className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#081F38] leading-tight">2,000+ Verified JDs</div>
                  <div className="text-[10px] sm:text-[11px] text-[#64748B] mt-0.5 leading-snug">Reverse-engineered skills</div>
                </div>

                <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-3 sm:p-3.5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]/90 hover:bg-white hover:border-[#A7F3D0] hover:shadow-xs transition-all tone-light card-light group">
                  <div className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2 group-hover:scale-105 transition-transform">
                    <Building2 className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#081F38] leading-tight">Recognized by TASK</div>
                  <div className="text-[10px] sm:text-[11px] text-[#64748B] mt-0.5 leading-snug">Govt. of Telangana alignment</div>
                </div>

                <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-3 sm:p-3.5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]/90 hover:bg-white hover:border-[#FED7AA] hover:shadow-xs transition-all tone-light card-light group">
                  <div className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200 mb-2 group-hover:scale-105 transition-transform">
                    <Users className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#081F38] leading-tight">10,000+ Assessed</div>
                  <div className="text-[10px] sm:text-[11px] text-[#64748B] mt-0.5 leading-snug">Calibrated role benchmarks</div>
                </div>

                <div className="flex flex-col items-center sm:items-start text-center sm:text-left p-3 sm:p-3.5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]/90 hover:bg-white hover:border-[#DDD6FE] hover:shadow-xs transition-all tone-light card-light group">
                  <div className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2 group-hover:scale-105 transition-transform">
                    <ShieldCheck className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#081F38] leading-tight">Practical Work Samples</div>
                  <div className="text-[10px] sm:text-[11px] text-[#64748B] mt-0.5 leading-snug">Audit-ready clinical outputs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: CAREER DECISION RAIL (DIAGNOSTIC FIRST) ─────────────── */}
      <section className="py-8 sm:py-12 bg-[#F8FAFC]/70 border-b border-[#E4EAF2]">
        <div className="ap-shell">
          <div className="rounded-2xl border border-[#BFDBFE] bg-[#EEF6FF]/90 p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 tone-light card-light shadow-2xs">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#1D4ED8] border border-[#BFDBFE] mb-2 tone-light card-light">
                <Compass className="h-3 w-3 text-[#2563EB]" />
                <span>TURN RESEARCH INTO ACTION</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#081F38] tracking-tight">
                Turn empirical market findings into a personal career roadmap.
              </h2>
              <p className="mt-1.5 text-sm sm:text-[15px] text-[#475569] max-w-2xl font-normal leading-relaxed">
                Take the free 3-minute Career Assessment to identify which healthcare roles match your academic background and pinpoint the exact software skills worth building.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                to="/career-engine"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-7 py-3.5 text-sm font-bold shadow-md shadow-blue-600/15 transition-all"
              >
                <span>Find my career path</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: INTERACTIVE TOOLS & CALCULATORS SUITE ──────────────── */}
      <div className="ap-shell">
        <ResourceToolsStrip />
      </div>

      {/* ─── SECTION 4: EMPIRICAL RESEARCH DOSSIERS CATALOGUE ──────────────── */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#E4EAF2] tone-light card-light">
        <div className="ap-shell">
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563EB] mb-2 shadow-2xs tone-light card-light">
              <FileText className="h-3 w-3 text-[#2563EB]" />
              <span>EMPIRICAL DOSSIERS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#081F38] tracking-tight">
              Published Research &amp; Hiring Frequency Reports
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-[#475569] max-w-2xl font-normal">
              Audited studies analyzing real job descriptions, student relocation economics, and degree mobility patterns.
            </p>
          </div>

          <ResourceGrid />
        </div>
      </section>

      {/* ─── SECTION 5: RESEARCH METHODOLOGY & DATA RIGOR ──────────────────── */}
      <section className="py-12 sm:py-16 bg-[#F8FAFC]/80 border-b border-[#E4EAF2] tone-light card-light">
        <div className="ap-shell">
          <div className="mb-8 sm:mb-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#2563EB] mb-3 shadow-2xs tone-light card-light">
              <Database className="h-3 w-3 text-[#2563EB]" />
              <span>METHODOLOGY &amp; DATA PROVENANCE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#081F38] tracking-tight">
              How Arzon Builds{" "}
              <span className="bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent [box-decoration-break:clone]">
                Auditable Grounding Intelligence
              </span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#475569] font-normal leading-relaxed">
              Every statistic, salary band, and skill frequency published by Arzon is backed by empirical verification pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xs tone-light card-light">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-[#2563EB] border border-blue-100 mb-4">
                <FileSearch className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#081F38]">
                1. Systematic JD Text Mining
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#475569] leading-relaxed">
                We parse and tokenize 2,000+ public entry-level job postings from Tier-1 pharmaceutical GCCs (Novartis, Pfizer, GSK) and CROs (IQVIA, Parexel, Cognizant) to extract exact tool frequency bands.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xs tone-light card-light">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 mb-4">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#081F38]">
                2. Direct Aspirant &amp; PG Field Audits
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#475569] leading-relaxed">
                Direct in-person field surveys with 1,200+ relocated pharmacy and life-science students, combined with physical receipt auditing of 45 commercial PG accommodations in Hyderabad and Bangalore.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xs tone-light card-light">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-purple-50 text-purple-700 border border-purple-200 mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-[#081F38]">
                3. Real Claims &amp; Placement Parity
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#475569] leading-relaxed">
                De-identified audits of 50,000+ US healthcare billing claims and verified offer letter cross-checks, ensuring our salary figures reflect actual industry take-home packages rather than unverified marketing promises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: HOME-STYLE CLOSING HERO BANNER ──────────────────────── */}
      <section className="py-10 sm:py-20 bg-white border-t border-[#E4EAF2] tone-light card-light">
        <div className="ap-shell">
          <div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-br from-[#071A4A] via-[#0A1F56] to-[#040E29] p-6 sm:p-12 lg:p-16 text-white shadow-xl">
            {/* Ambient glow */}
            <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-[#1557D6]/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4 sm:space-y-6">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#93C5FD]">
                  <CheckCircle2 className="h-3 w-3 text-[#10B981]" />
                  <span>YOUR NEXT STEP</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug">
                  Transform market data into verifiable career readiness.
                </h2>
                <p
                  className="text-sm sm:text-base text-slate-200 max-w-xl font-normal leading-relaxed"
                  style={{ color: "#E2E8F0" }}
                >
                  Take the free 3-minute Career Engine diagnostic to receive your personalised role-fit report, or explore our degree-specific pathways reverse-engineered from 2,000+ job descriptions.
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <Link
                    to="/career-engine/start"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-7 py-3.5 text-sm font-bold shadow-md shadow-blue-600/20 transition-all"
                  >
                    <span>Get my industry-fit score</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/degrees"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 hover:bg-white/15 text-white px-6 py-3.5 text-sm font-bold transition-all"
                    style={{ color: "#FFFFFF" }}
                  >
                    <span>Browse Degree Pathways</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-2.5">
                {[
                  "Personalised career fit report",
                  "Reverse-engineered from 2,000+ JDs",
                  "Audit-ready clinical case samples",
                  "Recognized by TASK, Govt. of Telangana",
                ].map((text) => (
                  <div
                    key={text}
                    className="flex items-center gap-2.5 rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      borderColor: "rgba(255, 255, 255, 0.15)",
                    }}
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0" />
                    <span className="text-white font-medium" style={{ color: "#FFFFFF" }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
