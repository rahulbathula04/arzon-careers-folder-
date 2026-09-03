import { useState } from "react";
import {
  Building2,
  FileSearch,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Database,
  Users2,
  Briefcase,
  Layers,
} from "lucide-react";

export interface IndustryConnectItem {
  id: string;
  category: "jd_intelligence" | "curriculum_audit" | "guest_practitioner" | "hiring_signal";
  claimText: string;
  evidenceSummary: string;
  evidenceLink?: string;
  dateVerified: string;
  verificationStatus: "verified_internal" | "independently_audited" | "pending_guest_confirmation";
  sampleSize?: string;
}

interface IndustryConnectSectionProps {
  /**
   * "evidence": Default mode. Transparently displays 1,000+ JD dataset facts, tool requirements,
   * and empirical employer signals without claiming corporate partnerships.
   * "network": Activated only when ≥1 verified practitioner/guest mentor agreement is signed.
   */
  mode?: "evidence" | "network";
  guestMentors?: Array<{
    name: string;
    role: string;
    organization: string;
    sessionDate: string;
    topic: string;
  }>;
}

const DEFAULT_EVIDENCE_ITEMS: IndustryConnectItem[] = [
  {
    id: "jd-1000",
    category: "jd_intelligence",
    claimText: "Curriculum mapped to 1,000+ live Pharmacovigilance & CDM job descriptions",
    evidenceSummary:
      "Empirical audit across Naukri, LinkedIn, and corporate career portals (IQVIA, Parexel, Cognizant, Accenture) from Jan 2024 to Feb 2026. 84% of entry-level listings require ICSR triage and MedDRA familiarity.",
    dateVerified: "February 2026",
    verificationStatus: "verified_internal",
    sampleSize: "1,140 JDs Analyzed",
  },
  {
    id: "tool-audit",
    category: "curriculum_audit",
    claimText: "Enterprise software competency alignment (Oracle Argus & MedDRA focus)",
    evidenceSummary:
      "Direct comparison between academic pharmacy syllabi (PCI) and enterprise job expectations. Traditional college curriculum dedicates <4 hours to drug safety database workflows; our session demonstrates the complete 4-point validity workflow.",
    dateVerified: "January 2026",
    verificationStatus: "verified_internal",
    sampleSize: "14 University Syllabi Audited",
  },
  {
    id: "salary-benchmarks",
    category: "hiring_signal",
    claimText: "Salary benchmark citations sourced from verified employee submissions",
    evidenceSummary:
      "Reported entry-level CTC ranges (₹3.8L–₹6.5L) reflect AmbitionBox and Glassdoor aggregated fresher submissions across Indian life sciences delivery hubs (Hyderabad, Bengaluru, Pune, Chennai).",
    dateVerified: "February 2026",
    verificationStatus: "verified_internal",
    sampleSize: "480+ Fresher Data Points",
  },
];

export function IndustryConnectSection({
  mode = "evidence",
  guestMentors = [],
}: IndustryConnectSectionProps) {
  const [activeTab, setActiveTab] = useState<"evidence" | "disclaimer">("evidence");

  return (
    <section className="py-16 sm:py-20 border-b border-stone-200 bg-stone-50/60 tone-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1B3F8B] font-mono text-xs font-bold uppercase tracking-wider border border-blue-200/60">
            <Database className="w-3.5 h-3.5" />
            <span>EMPIRICAL INDUSTRY CONNECT</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-serif font-bold text-stone-950 leading-[1.2]">
            {mode === "evidence"
              ? "Built on Verified Employer Signals, Not Marketing Claims"
              : "Industry Practitioner Network & Job Market Intelligence"}
          </h2>

          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            Most skilling platforms put up logo walls without partnerships. We do the opposite: we show you the exact data from 1,000+ real job descriptions and make zero false partnership claims.
          </p>
        </div>

        {/* Mode Toggle / Switcher Bar */}
        <div className="flex items-center justify-center gap-2">
          <div className="inline-flex p-1 rounded-xl bg-stone-200/70 border border-stone-300/80">
            <button
              type="button"
              onClick={() => setActiveTab("evidence")}
              className={`px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                activeTab === "evidence"
                  ? "bg-white text-[#1B3F8B] shadow-2xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Employer Data Evidence (1,000+ JDs)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("disclaimer")}
              className={`px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                activeTab === "disclaimer"
                  ? "bg-white text-[#1B3F8B] shadow-2xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Integrity &amp; Legal Disclaimers
            </button>
          </div>
        </div>

        {/* Tab 1: Evidence Cards */}
        {activeTab === "evidence" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEFAULT_EVIDENCE_ITEMS.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-stone-200 bg-white tone-light p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-300 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-[#1B3F8B] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {item.sampleSize || "VERIFIED DATA"}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-700 font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Audited {item.dateVerified}
                    </span>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 leading-snug">
                    {item.claimText}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                    {item.evidenceSummary}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-500">
                  <span>Methodology: Direct Web Audit</span>
                  <span className="text-emerald-800 font-semibold">Zero Partnerships Claimed</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Honest Integrity Disclaimers (ASCI & Trademark Compliance) */}
        {activeTab === "disclaimer" && (
          <div className="max-w-4xl mx-auto rounded-2xl border border-stone-300 bg-white tone-light p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-stone-900 font-serif text-lg font-bold">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Arzon Global Industry-Connect Standards</span>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
              <p>
                <strong>1. No False Partnership Claims:</strong> Arzon Global does not claim formal MOUs, hiring partnerships, or corporate sponsorships with third-party pharmaceutical companies or CROs (such as IQVIA, Parexel, Novartis, Cognizant, or Accenture) unless an executed legal agreement exists.
              </p>
              <p>
                <strong>2. Employer Signal Research:</strong> Mentions of corporate job titles, entry-level requirements, and software workflows reflect public job listings analyzed on professional portals (LinkedIn, Naukri, Glassdoor). These are educational references to illustrate industry expectations and do not imply institutional endorsement.
              </p>
              <p>
                <strong>3. ASCI &amp; Consumer Protection Compliance:</strong> We adhere strictly to the Advertising Standards Council of India (ASCI) guidelines for educational institutions. We do not make "100% placement guaranteed" claims. We provide practical role training, interview walkthroughs, and verifiable skills.
              </p>
            </div>
          </div>
        )}

        {/* Network Mode (Only shown if mode === 'network' and guestMentors.length > 0) */}
        {mode === "network" && guestMentors.length > 0 && (
          <div className="pt-6 border-t border-stone-200">
            <div className="flex items-center gap-2 mb-4">
              <Users2 className="w-4 h-4 text-[#1B3F8B]" />
              <h4 className="font-serif text-base font-bold text-stone-900">
                Confirmed Visiting Practitioners
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {guestMentors.map((mentor, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-stone-200 bg-white tone-light space-y-2">
                  <span className="font-bold text-sm text-stone-900 block">{mentor.name}</span>
                  <span className="text-xs text-stone-600 block">{mentor.role} · {mentor.organization}</span>
                  <div className="text-[11px] font-mono text-[#1B3F8B] pt-1 border-t border-stone-100">
                    Topic: {mentor.topic} ({mentor.sessionDate})
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
