import mentorKumailImg from "@/assets/mentor-kumail.jpg";
import { Award, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export function ArzonMentorDossier() {
  const timeline = [
    {
      period: "2022 – Present",
      role: "Manager, Pharmacovigilance Operations",
      company: "Novaspire",
      description:
        "Directing global safety operations teams. Overseeing ICSR processing, regulatory inspection audits, and client sponsor safety compliance.",
    },
    {
      period: "2019 – 2022",
      role: "Lead Drug Safety Specialist & Aggregate Reporting",
      company: "Cognizant / Accenture Life Sciences",
      description:
        "Led complex case processing and aggregate safety evaluations (PSUR / PBRER) for international pharmaceutical marketing authorisation holders.",
    },
    {
      period: "2016 – 2019",
      role: "Senior Drug Safety Associate",
      company: "Indegene / Norwich Clinical",
      description:
        "Handled thousands of spontaneous and clinical trial ICSRs, MedDRA hierarchy coding, and Day 0 regulatory clock management.",
    },
    {
      period: "2014 – 2016",
      role: "Pharmacovigilance Triage Associate",
      company: "Quintiles (now IQVIA)",
      description:
        "Started career on the triage line following M.Pharm graduation. Evaluated adverse event validity criteria and duplicate search protocols.",
    },
  ];

  const expertise = [
    "ICSR Intake & Triage (ICH E2A / E2D)",
    "MedDRA Standardization (LLT, PT, SOC)",
    "Aggregate Safety Reports (PSUR / PBRER)",
    "Regulatory Compliance (FDA 21 CFR 314.80)",
    "Audit Readiness & Inspection CAPA",
    "Candidate Technical Interview Screening",
  ];

  return (
    <section id="mentor" className="w-full py-16 sm:py-20 bg-[var(--color-warm-paper)] border-b border-[var(--color-border-warm)] text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header with Arzon Signature */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 bg-[var(--color-editorial-amber)] rounded-sm"></div>
            <span className="font-mono text-[11px] font-bold text-[var(--color-arzon-ink)] uppercase tracking-widest">
              PRACTITIONER AUTHORITY · LIVE SESSION INSTRUCTOR
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--color-arzon-ink)] tracking-tight">
            Learn from someone who does the actual work
          </h2>
          <p className="font-sans text-sm sm:text-base text-stone-700 leading-relaxed">
            The difference between textbook theory and passing technical interviews is having guidance from an active industry manager.
          </p>
        </div>

        {/* Master Mentor Presentation: Asymmetric Two-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Large Unboxed Portrait & Identity (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden bg-stone-200 border border-[var(--color-border-warm)] shadow-xl max-w-sm sm:max-w-md mx-auto lg:mx-0">
              <img
                src={mentorKumailImg}
                alt="Mohamed Kumail Abbas"
                className="w-full h-auto aspect-4/5 object-cover object-top filter contrast-[1.02]"
              />

              {/* Identity Overlay Card */}
              <div className="p-5 bg-[var(--color-warm-white)] border-t border-[var(--color-border-warm)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--color-warm-paper)] text-[var(--color-medical-navy)] border border-[var(--color-border-warm)]">
                    VERIFIED PRACTITIONER
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-[#0A66C2] font-semibold">
                    <span className="w-4 h-4 bg-[#0A66C2] text-white rounded flex items-center justify-center text-[9px] font-bold">in</span>
                    <span>Verified Profile</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-[var(--color-arzon-ink)]">
                    Mohamed Kumail Abbas
                  </h3>
                  <p className="font-sans text-xs sm:text-sm font-semibold text-[var(--color-medical-navy)]">
                    Manager, Pharmacovigilance Operations · M.Pharm
                  </p>
                  <p className="font-mono text-[11px] text-stone-500 mt-0.5">
                    Novaspire · Ex-Cognizant, Accenture, Quintiles
                  </p>
                </div>
              </div>
            </div>

            {/* Functional Expertise Tags */}
            <div className="p-5 rounded-2xl bg-[var(--color-warm-white)] border border-[var(--color-border-warm)] space-y-3">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                CORE TECHNICAL COMPETENCIES
              </span>
              <div className="flex flex-wrap gap-2">
                {expertise.map((skill, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs px-2.5 py-1 rounded-md bg-[var(--color-warm-paper)] border border-[var(--color-border-warm)] text-[var(--color-arzon-ink)] font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Large Quote & Single Navy Vertical Timeline (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Dominant Editorial Quote */}
            <blockquote className="p-6 sm:p-8 rounded-2xl bg-[var(--color-warm-white)] border-l-4 border-[var(--color-editorial-amber)] border-y border-r border-[var(--color-border-warm)] shadow-sm space-y-3">
              <p className="font-serif italic text-lg sm:text-xl text-[var(--color-arzon-ink)] leading-relaxed">
                "Healthcare graduates often spend six months memorizing pharmacology mechanisms for job interviews.
                Meanwhile, hiring managers in technical rounds are evaluating whether you know how to validate the four minimum criteria of an ICSR on day one."
              </p>
              <footer className="font-mono text-xs text-stone-600 font-semibold uppercase tracking-wider">
                — Mohamed Kumail Abbas, Workshop Mentor
              </footer>
            </blockquote>

            {/* Single Navy Vertical Timeline */}
            <div className="space-y-6">
              <span className="font-mono text-xs font-bold text-stone-600 uppercase tracking-widest block">
                INDUSTRY OPERATIONS PROGRESSION
              </span>

              <div className="relative pl-6 sm:pl-8 border-l-2 border-[var(--color-medical-navy)]/30 space-y-8">
                {timeline.map((item, idx) => (
                  <div key={idx} className="relative group">
                    {/* Clinical Teal Node */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-3.5 h-3.5 rounded-full bg-[var(--color-clinical-teal)] border-2 border-[var(--color-warm-paper)] shadow-xs"></div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[var(--color-medical-navy)]">
                          {item.period}
                        </span>
                        <span className="text-stone-300">·</span>
                        <span className="font-mono text-xs font-semibold text-stone-600">
                          {item.company}
                        </span>
                      </div>

                      <h4 className="font-serif text-base sm:text-lg font-bold text-[var(--color-arzon-ink)]">
                        {item.role}
                      </h4>

                      <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed pt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
