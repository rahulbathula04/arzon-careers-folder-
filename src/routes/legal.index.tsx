import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer } from "@/components/landing/Footer";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  FileText,
  Landmark,
  Lock,
  Scale,
  ShieldCheck,
  ExternalLink,
  Mail,
  AlertTriangle,
} from "lucide-react";
import { pageSeo } from "@/lib/seo";
import { ADDRESS_ONE_LINE, SITE, LINKS } from "@/components/landing/constants";

export const Route = createFileRoute("/legal/")({
  head: () => {
    const ps = pageSeo({
      path: "/legal",
      title: "Legal, Regulatory & Compliance Hub · Arzon Global",
      description:
        "Official legal and regulatory portal of Arzon Global. Enterprise registrations, UDYAM MSME, ISO 9001:2015, terms of service, privacy policy, and grievance redressal officer details.",
      image: SITE.ogImages.legal,
    });
    return {
      meta: [{ title: "Legal, Regulatory & Compliance Hub · Arzon Global" }, ...ps.meta],
      links: ps.links,
    };
  },
  component: LegalHubPage,
});

function LegalHubPage() {
  const policies = [
    {
      title: "Terms of Service",
      description: "Statutory learner agreement governing platform use, intellectual property, fee structures, and dispute resolution.",
      link: "/legal/terms",
      tag: "Statutory Agreement",
      icon: Scale,
    },
    {
      title: "Privacy Policy (DPDP Act 2023)",
      description: "Our data fiduciary obligations, personal data collection boundaries, encryption protocols, and candidate data rights.",
      link: "/legal/privacy",
      tag: "Data Protection",
      icon: Lock,
    },
    {
      title: "No-Refund & Enrolment Policy",
      description: "Transparent commercial terms regarding our strict no-refund policy, the ₹1,000 seat reservation fee, and cohort rollovers.",
      link: "/refund",
      tag: "Consumer Protection",
      icon: FileText,
    },
  ];

  const statutoryCredentials = [
    {
      icon: Landmark,
      label: "Ministry of Corporate Affairs (MCA)",
      regNumber: "CIN: U85500TG2024PTC178942",
      authority: "Govt. of India · ROC Hyderabad",
      note: "Legally incorporated private limited corporate entity under the Companies Act, 2013.",
    },
    {
      icon: Building2,
      label: "Ministry of MSME (Govt. of India)",
      regNumber: "UDYAM-TS-02-0145892",
      authority: "National MSME Portal",
      note: "Officially registered enterprise with open-ledger verifiable institutional standing.",
    },
    {
      icon: ShieldCheck,
      label: "ISO 9001:2015 Certified",
      regNumber: "Certificate: QMS/2025/ARZ-092",
      authority: "Independent Audit Board",
      note: "Standardized quality management systems across workforce readiness and assessment delivery.",
    },
    {
      icon: BadgeCheck,
      label: "Telangana Academy for Skill (TASK)",
      regNumber: "Dept of ITE&C Alignment",
      authority: "Govt. of Telangana",
      note: "Public launch inaugurated in collaboration with TASK leadership to strengthen state graduate readiness.",
    },
  ];

  return (
    <main className="tone-dark min-h-app bg-[image:var(--gradient-navy-01)] text-white">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
        {/* Header Tag */}
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-sky-300">
          <ShieldCheck className="h-3.5 w-3.5 text-sky-400" />
          <span>Statutory Governance & Compliance</span>
        </div>

        <h1 className="h-display mt-4">
          Legal & Regulatory Compliance Hub
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          Arzon Global operates under a strict doctrine of legal accountability, consumer transparency, and regulatory compliance under Indian Law. Review our corporate registrations, core policies, disclaimers, and grievance redressal mechanism below.
        </p>

        {/* ─── SECTION 1: STATUTORY CREDENTIALS & ENTITY RECORDS ───────── */}
        <div className="mt-12">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight flex items-center gap-2.5 border-b border-slate-800 pb-3">
            <Landmark className="h-5 w-5 text-sky-400" />
            <span>Corporate Identity & Statutory Registrations</span>
          </h2>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {statutoryCredentials.map((cred) => {
              const Icon = cred.icon;
              return (
                <div
                  key={cred.label}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-[10.5px] font-mono text-slate-400 uppercase">
                        {cred.authority}
                      </span>
                    </div>

                    <h3 className="mt-3 text-base font-bold text-white">
                      {cred.label}
                    </h3>
                    <p className="mt-1 text-xs font-mono font-bold text-teal-300">
                      {cred.regNumber}
                    </p>
                    <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                      {cred.note}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-xs font-mono text-slate-300 flex items-center justify-between flex-wrap gap-2">
            <span><strong>Registered Office:</strong> {ADDRESS_ONE_LINE}</span>
            <span className="text-teal-400">Jurisdiction: Courts of Hyderabad, Telangana</span>
          </div>
        </div>

        {/* ─── SECTION 2: CORE LEGAL POLICIES ───────────────────────────── */}
        <div className="mt-14">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight flex items-center gap-2.5 border-b border-slate-800 pb-3">
            <Scale className="h-5 w-5 text-sky-400" />
            <span>Governing Legal Policies</span>
          </h2>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            {policies.map((policy) => {
              const Icon = policy.icon;
              return (
                <Link
                  key={policy.title}
                  to={policy.link}
                  className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all hover:border-sky-500/40 hover:bg-slate-900 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 group-hover:bg-sky-500 group-hover:text-white transition-all">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                        {policy.tag}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                      {policy.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                      {policy.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center text-xs font-semibold text-sky-400 group-hover:text-sky-300">
                    <span>Read full document</span>
                    <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ─── SECTION 3: MANDATORY STATUTORY DISCLAIMERS ───────────────── */}
        <div className="mt-14 space-y-6">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight flex items-center gap-2.5 border-b border-slate-800 pb-3">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            <span>Statutory Disclaimers & Consumer Notices</span>
          </h2>

          <div className="space-y-4">
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 text-sm">
              <h3 className="font-bold text-amber-300 flex items-center gap-2">
                1. ASCI Advertising Code: Strictly No Employment Guarantee
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                In compliance with the Advertising Standards Council of India (ASCI) Guidelines for Educational Services, Arzon Global does NOT guarantee jobs, interviews, offers, or compensation packages. Hiring decisions are made entirely by external corporate employers based on candidate performance and market requirements. We commit strictly to mentoring, practical project assignments, and verifiable credential verification.
              </p>
            </div>

            <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-5 text-sm">
              <h3 className="font-bold text-sky-300 flex items-center gap-2">
                2. Academic Status Notice: Vocational & Skill Development Framework
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Arzon Global is an independent career preparation and workforce intelligence platform. Programmes and credentials issued by Arzon Global (including ACRI™ and ASSAY™) are continuing professional development and capability certifications; they do NOT constitute formal statutory university degrees or diplomas governed by the University Grants Commission (UGC) or All India Council for Technical Education (AICTE).
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-sm">
              <h3 className="font-bold text-white flex items-center gap-2">
                3. Third-Party Trademarks & Nominative Fair Use Notice
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                All third-party trademarks, service marks, software names, and corporate identities cited on this website—including Standardized Medical Coding® (IFPMA), Enterprise Safety Database® (Oracle Corporation), SAS® (SAS Institute Inc.), Life Sciences Cloud Platforms® (Enterprise Life Sciences Cloud Providers), ICD-10® (WHO), and company names (IQVIA, Parexel, Novartis, Pfizer, TCS, Cognizant, etc.)—remain the property of their respective trademark holders. Nominative references on this site are made strictly pursuant to Section 30 of the Indian Trade Marks Act, 1999, for purposes of identification and curriculum context, and do not imply any affiliation, sponsorship, endorsement, or commercial association.
              </p>
            </div>

            <div className="rounded-2xl border border-teal-500/20 bg-teal-500/5 p-5 text-sm" id="institutional-alignment">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-bold text-teal-300 flex items-center gap-2">
                  <Landmark className="h-4 w-4 text-teal-400 shrink-0" />
                  <span>4. Institutional Alignment &amp; Inauguration Record (TASK, Govt of Telangana)</span>
                </h3>
                <a
                  href={LINKS.mediaInauguration.watch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs font-semibold text-teal-300 hover:text-teal-200 underline flex items-center gap-1 shrink-0"
                >
                  Watch Telecast (HYBIZ TV HD) ↗
                </a>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Arzon Global operates in collaboration with the Telangana Academy for Skill and Knowledge (TASK, Department of Information Technology, Electronics &amp; Communications, Government of Telangana). The Hyderabad facility was formally inaugurated with TASK CEO Dr. Srikanth Sinha as Chief Guest, broadcasted by regional news networks (HYBIZ TV HD, ETV Telangana, TV5 News). This alignment reflects workforce skilling initiatives and does not constitute statutory government accreditation or civil service recruitment.
              </p>
            </div>
          </div>
        </div>

        {/* ─── SECTION 4: GRIEVANCE REDRESSAL MECHANISM ─────────────────── */}
        <div className="mt-14 rounded-2xl border border-slate-700 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Building2 className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
                Statutory Grievance Redressal Mechanism
              </h2>
              <p className="text-xs text-slate-400">
                Rule 4 Consumer Protection (E-Commerce) Rules, 2020 &amp; Rule 3(2) IT Intermediary Rules, 2021
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            In accordance with Indian statutory requirements, any user, candidate, or prospective learner seeking to register a formal inquiry or consumer grievance may contact our designated Nodal Grievance Officer:
          </p>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-1.5">
              <div className="text-slate-400 uppercase text-[10px]">Officer in Charge</div>
              <div className="text-white font-bold text-sm">Nodal Grievance Officer</div>
              <div className="text-slate-400 text-xs">Legal &amp; Compliance Cell</div>
              <div className="text-teal-300 font-semibold pt-1">Arzon Global</div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-1.5">
              <div className="text-slate-400 uppercase text-[10px]">Contact &amp; Escalation</div>
              <div className="text-white font-bold flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-teal-400" />
                <span>grievance@arzonglobal.com</span>
              </div>
              <div className="text-slate-400 text-xs">Secondary: legal@arzonglobal.com</div>
              <div className="text-slate-400 text-xs pt-1">
                SLA: Acknowledgment within <strong>48 hours</strong>; Resolution within <strong>15 working days</strong>.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
