import { Link } from "@tanstack/react-router";
import { Building2, ArrowRight, Download, Phone, GraduationCap, ShieldCheck, BarChart3, Users } from "lucide-react";
import { WorkshopBrochureDownloadButton } from "@/components/workshop/WorkshopBrochureDownloadButton";
import { track } from "@/lib/track";

/**
 * ArzonInstitutionalGateway
 *
 * A high-authority, compact institutional signal shown near the top of the
 * workshop page. Primary audience: TPOs, Principals, HODs, Chairmen who
 * land on this page and need to immediately identify Arzon as a
 * credible academic partner — not a student webinar funnel.
 *
 * Placement: Between the hero/registration section and the main content
 * sections (ArzonWorkshopOverview). Visible early without scrolling on
 * mobile when the institutional visitor lands.
 */

const TPO_WHATSAPP =
  "https://wa.me/919121283638?text=Hi%20Arzon%20Team%2C%20I%20am%20a%20Placement%20Officer%20%2F%20Principal%20interested%20in%20the%20Healthcare%20Career%20Masterclass%20for%20our%20batch.%20Please%20share%20the%20institutional%20prospectus.";

const OUTCOMES = [
  { metric: "₹3.2L – ₹5.2L", label: "Entry CTC at Tier-1 CROs" },
  { metric: "42+", label: "Hiring CROs across 6 cities" },
  { metric: "100%", label: "Zero commercial cost to institution" },
  { metric: "PAN-India", label: "B.Pharm · M.Pharm · Pharm.D · Life Sci" },
];

export function ArzonInstitutionalGateway() {
  const handleProspectusClick = () => {
    track("institutional_prospectus_click", { props: { source: "gateway_banner" } });
  };
  const handleWhatsAppClick = () => {
    track("tpo_whatsapp_click", { props: { source: "gateway_banner" } });
  };

  return (
    <section
      id="for-institutions"
      className="w-full border-t border-b border-[var(--color-border-warm)] bg-white tone-light text-left"
    >
      {/* ── Institutional Identity Header Strip ── */}
      <div className="bg-[var(--color-medical-navy)] px-4 sm:px-6 lg:px-8 py-3">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-4 h-4 text-[var(--color-editorial-amber)] shrink-0" />
            <span className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-[var(--color-warm-paper)]">
              FOR TPOS · PRINCIPALS · HODs · CHAIRMEN · DEANS
            </span>
          </div>
          <Link
            to="/tpos"
            className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold text-[var(--color-editorial-amber)] hover:text-white transition-colors uppercase tracking-wider"
          >
            Full Institutional Partnership Page
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* ── Main Institutional Content ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left: Institutional Positioning */}
          <div className="lg:col-span-7 space-y-5">
            {/* Eyebrow */}
            <div className="space-y-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-stone-400 block">
                Arzon Global · Healthcare Career Intelligence Unit
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--color-arzon-ink)] leading-tight tracking-tight">
                Send your batch — not one student at a time.
              </h2>
            </div>

            {/* Institutional positioning paragraph */}
            <p className="font-sans text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl">
              Arzon Global is India's Healthcare Career Intelligence Unit — a specialized placement-readiness
              provider for pharmacy, life sciences, and healthcare faculties. This 75-minute live clinical safety
              session operates under our{" "}
              <strong className="text-[var(--color-arzon-ink)]">Educational Access Charter</strong> — zero commercial
              cost to your institution, zero sales pressure on your students.
            </p>

            {/* What institutional visitors get — 3 clear deliverables */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {[
                {
                  icon: GraduationCap,
                  title: "Student Credentialing",
                  body: "Every attendee receives a verified Arzon Workshop Credential with online certificate verification — citable on CV and LinkedIn.",
                  color: "text-[var(--color-medical-navy)]",
                  bg: "bg-blue-50",
                },
                {
                  icon: BarChart3,
                  title: "Batch Placement Report",
                  body: "Post-session: your TPO cell receives an aggregated report mapping your batch strengths against live CRO hiring benchmarks.",
                  color: "text-emerald-700",
                  bg: "bg-emerald-50",
                },
                {
                  icon: ShieldCheck,
                  title: "Zero Commercial Pressure",
                  body: "No pay-wall, no up-sell during the session. A pure technical masterclass on ICH-E2D and MedDRA 27.0 adverse event triage.",
                  color: "text-amber-700",
                  bg: "bg-amber-50",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2"
                  >
                    <div className={`w-7 h-7 rounded-lg ${item.bg} flex items-center justify-center ${item.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif text-sm font-bold text-[var(--color-arzon-ink)]">
                      {item.title}
                    </h3>
                    <p className="font-sans text-[11px] text-stone-600 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Placement outcome metrics — authoritative data, not marketing numbers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {OUTCOMES.map((item) => (
                <div key={item.label} className="space-y-0.5">
                  <p className="font-serif text-lg sm:text-xl font-black text-[var(--color-arzon-ink)] leading-none">
                    {item.metric}
                  </p>
                  <p className="font-mono text-[9.5px] font-semibold text-stone-500 uppercase tracking-wide leading-snug">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Action Panel — the TPO's primary decisions */}
          <div className="lg:col-span-5 space-y-3">
            {/* Prospectus download — the most important single action */}
            <div className="rounded-2xl border-2 border-[var(--color-medical-navy)] bg-gradient-to-br from-blue-50/60 to-white p-5 sm:p-6 space-y-4 tone-light">
              <div className="space-y-1.5">
                <span className="font-mono text-[9.5px] font-bold uppercase tracking-widest text-[var(--color-medical-navy)] block">
                  Official Institutional Prospectus · 2026 Edition
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--color-arzon-ink)] leading-tight">
                  Download the Masterclass Brochure for Principals & TPOs
                </h3>
                <p className="font-sans text-xs text-stone-600 leading-relaxed">
                  5-page publication-grade PDF. Full technical syllabus, faculty credentials, 
                  CRO hiring benchmarks, institutional onboarding protocol, and student credentialing guidelines.
                  Addressed to college leadership.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-[10px] font-mono font-semibold text-stone-500">
                {["Print-Ready 5 Pages", "Faculty Credentials", "CRO Salary Bands", "Zero Commercial"].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded border border-stone-200 bg-stone-100 uppercase tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Tier 1: Primary action for institutional visitors */}
              <WorkshopBrochureDownloadButton
                variant="primary"
                label="Download Institutional Prospectus (PDF)"
              />
            </div>

            {/* Batch enrollment + contact block */}
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-3 tone-light">
              <div className="space-y-1">
                <span className="font-mono text-[9.5px] font-bold uppercase tracking-widest text-stone-400 block">
                  Batch Enrollment
                </span>
                <p className="font-sans text-sm font-semibold text-[var(--color-arzon-ink)]">
                  Reserve 30–200 priority seats for your college batch
                </p>
                <p className="font-sans text-[11px] text-stone-600 leading-relaxed">
                  Or request a dedicated campus webinar aligned to your department timetable.
                  Contact our Institutional Partnerships Desk directly.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                {/* Tier 2: WhatsApp TPO line */}
                <a
                  href={TPO_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="tpo-whatsapp-btn"
                  onClick={handleWhatsAppClick}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-stone-300 bg-white tone-light hover:bg-stone-50 text-stone-900 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  WhatsApp Partnership Desk
                </a>
              </div>
            </div>

            {/* Full TPO page link — Tier 3 */}
            <Link
              to="/tpos"
              className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-stone-500 hover:text-[var(--color-medical-navy)] transition-colors"
            >
              <Users className="w-3.5 h-3.5" />
              See full Institutional Partnership page with batch outcomes
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
