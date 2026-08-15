import React from "react";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  ShieldCheck,
  Award,
  Landmark,
  Lock,
  Star,
  Users,
  ExternalLink,
  CheckCircle2,
  BadgeCheck,
  Search,
} from "lucide-react";
import { PROOF } from "./constants";
import { BlurReveal } from "@/components/motion/BlurReveal";
import { HoverCard } from "@/components/motion/HoverCard";

/**
 * LegalRegistrationsBlock Component
 * Replicates and elevates the authoritative Google Knowledge & Institutional Verification card
 * extracted directly from public indexing signals.
 */
export function LegalRegistrationsBlock() {
  return (
    <section
      id="legal-registrations"
      aria-labelledby="legal-registrations-heading"
      className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0B1325] text-slate-100 border-y border-slate-200/10"
    >
      <BlurReveal className="mx-auto max-w-7xl">
        {/* Header Tag */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-widest text-sky-300">
            <Search className="h-3.5 w-3.5 text-sky-400" />
            <span>Public Knowledge & Institutional Overview</span>
          </div>
          <span className="hidden sm:inline-block h-px flex-1 bg-gradient-to-r from-sky-400/20 to-transparent" />
        </div>

        {/* Main Content Layout: Left 2 Columns = Knowledge Panel, Right Column = Search Verification Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Knowledge Column (Lg: 7 cols) */}
          <div className="lg:col-span-7 space-y-8 rounded-3xl border border-slate-700/50 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
            {/* Section 1: Legal Registrations & Accreditations */}
            <div>
              <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4 mb-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 ring-1 ring-teal-500/30">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <h2
                    id="legal-registrations-heading"
                    className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight"
                  >
                    Legal Registrations & Accreditations
                  </h2>
                  <p className="text-xs text-slate-400 font-sans">
                    Independently verifiable across Ministry & Government portals
                  </p>
                </div>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-2 w-2 rounded-full bg-teal-400 shrink-0" />
                  <div className="text-sm leading-relaxed">
                    <strong className="text-white font-semibold">Corporate Identification:</strong>{" "}
                    <span className="text-slate-300">
                      Legally incorporated under the Ministry of Corporate Affairs (MCA).
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-2 w-2 rounded-full bg-teal-400 shrink-0" />
                  <div className="text-sm leading-relaxed">
                    <strong className="text-white font-semibold">Quality Management:</strong>{" "}
                    <span className="text-slate-300">
                      Certified with <strong className="text-teal-300 font-semibold">ISO 9001</strong> standards for its educational quality framework.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-2 w-2 rounded-full bg-teal-400 shrink-0" />
                  <div className="text-sm leading-relaxed">
                    <strong className="text-white font-semibold">Enterprise Standing:</strong>{" "}
                    <span className="text-slate-300">
                      Officially registered as an <strong className="text-teal-300 font-semibold">MSME under UDYAM</strong> with the Government of India.
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Section 2: Institutional Verification */}
            <div>
              <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4 mb-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/30">
                  <Landmark className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Institutional Verification
                  </h3>
                  <p className="text-xs text-slate-400 font-sans">
                    Government alignment and strict open-ledger transparency standards
                  </p>
                </div>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-2 w-2 rounded-full bg-sky-400 shrink-0" />
                  <div className="text-sm leading-relaxed">
                    <strong className="text-white font-semibold">Government Alignment:</strong>{" "}
                    <span className="text-slate-300">
                      Collaborates directly with the{" "}
                      <strong className="text-sky-300 font-semibold">
                        Telangana Academy for Skill and Knowledge (TASK)
                      </strong>
                      , a government initiative under the Department of ITE&C, whose CEO <strong className="text-sky-300 font-semibold">Dr. Srikanth Sinha</strong> inaugurated their public launch in Hyderabad.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-2 w-2 rounded-full bg-sky-400 shrink-0" />
                  <div className="text-sm leading-relaxed">
                    <strong className="text-white font-semibold">Transparency Policy:</strong>{" "}
                    <span className="text-slate-300">
                      The platform maintains an <strong className="text-sky-300 font-semibold">open-ledger system</strong>, ensuring that student enrollments, certifications, and refunds remain independently verifiable. They structurally prohibit the use of unverified aggregate ratings or fake student photos on marketing platforms.
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Cards Column: Verified Search Index Snippets (Lg: 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-mono uppercase tracking-wider text-slate-400 px-1 font-semibold flex items-center justify-between">
              <span>Third-Party Verification Index</span>
              <BadgeCheck className="h-4 w-4 text-teal-400" />
            </p>

            {/* Card 1: Learners Scale */}
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/80 p-5 transition-all hover:border-teal-500/40 hover:bg-slate-900 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-teal-400 font-semibold">Arzon Careers</span>
                <Users className="h-4 w-4 text-teal-400" />
              </div>
              <h4 className="mt-2 text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                Trusted by 12,000+ learners - Arzon Careers
              </h4>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                Everything on this platform is independently verifiable. 12,000+ learners trained across clinical and AI/ML tracks with public credential verifiers.
              </p>
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-teal-400 font-mono text-[11px]">arzoncareers.in</span>
                <Link
                  to="/why-arzon"
                  className="inline-flex items-center gap-1 font-medium text-slate-300 hover:text-white"
                >
                  <span>Verify records</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Card 2: AmbitionBox Employee Reviews */}
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/80 p-5 transition-all hover:border-amber-500/40 hover:bg-slate-900 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-amber-400 font-semibold">AmbitionBox</span>
                <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30 text-amber-300 font-bold">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span>4.8 / 5</span>
                </div>
              </div>
              <h4 className="mt-2 text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                Arzon Global Reviews by 30+ Employees | Rated 4.8/5
              </h4>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                Verified work environment & institutional rating: Overall Rating 4.6 ★ (Salary: 4.4, Job Security: 4.5, Work-Life Balance: 4.4).
              </p>
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">30+ Independent Reviews</span>
                <span className="inline-flex items-center gap-1 font-medium text-amber-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />
                  <span>Verified Entity</span>
                </span>
              </div>
            </div>

            {/* Card 3: LinkedIn Presence */}
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/80 p-5 transition-all hover:border-sky-500/40 hover:bg-slate-900 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-sky-400 font-semibold">LinkedIn India</span>
                <Building2 className="h-4 w-4 text-sky-400" />
              </div>
              <h4 className="mt-2 text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                Arzon Global - Official Corporate Page
              </h4>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                Next-gen Career Lab on a mission to redefine how India learns, builds, and ships enterprise healthcare and AI engineering talent.
              </p>
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-sky-400 font-mono text-[11px]">linkedin.com/company/arzon-global</span>
                <a
                  href="https://www.linkedin.com/company/arzon-global/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-slate-300 hover:text-white"
                >
                  <span>Visit Page</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </BlurReveal>
    </section>
  );
}
