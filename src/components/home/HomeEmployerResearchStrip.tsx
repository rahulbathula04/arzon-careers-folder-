import { Marquee } from "@/components/magicui/marquee";
import { motion, useReducedMotion } from "framer-motion";

export function HomeEmployerResearchStrip() {
  const shouldReduceMotion = useReducedMotion();

  const activeRoles = [
    {
      title: "Drug Safety Associate",
      hub: "Hyderabad GCC",
      salary: "₹4.20 – ₹6.00 LPA",
      domain: "Safety",
    },
    {
      title: "Clinical Data Coordinator",
      hub: "Bengaluru",
      salary: "₹4.00 – ₹5.80 LPA",
      domain: "CDM",
    },
    {
      title: "Clinical SAS Programmer",
      hub: "Pune & Chennai",
      salary: "₹5.50 – ₹8.50 LPA",
      domain: "Biostats",
    },
    {
      title: "Medical Coder (Inpatient/ED)",
      hub: "Mumbai",
      salary: "₹3.50 – ₹5.20 LPA",
      domain: "Coding",
    },
    {
      title: "Regulatory Affairs Specialist",
      hub: "Gurugram",
      salary: "₹4.50 – ₹6.50 LPA",
      domain: "Regulatory",
    },
    {
      title: "Aggregate Safety Scientist",
      hub: "Hyderabad",
      salary: "₹5.00 – ₹7.50 LPA",
      domain: "PBRER",
    },
    {
      title: "Biostatistics Data Analyst",
      hub: "Bengaluru",
      salary: "₹5.20 – ₹8.00 LPA",
      domain: "Analytics",
    },
    {
      title: "eCTD Publishing Associate",
      hub: "Hyderabad & Mumbai",
      salary: "₹4.20 – ₹6.20 LPA",
      domain: "eCTD",
    },
    {
      title: "Clinical Trial QA Auditor",
      hub: "Ahmedabad & Chennai",
      salary: "₹4.80 – ₹6.80 LPA",
      domain: "GCP QA",
    },
  ];

  const mandatorySkills = [
    { tool: "Enterprise Safety Database", tag: "E2B(R3) XML" },
    { tool: "Standardized Medical Coding", tag: "LLT / PT Hierarchy" },
    { tool: "CDISC SDTM v3.3", tag: "FDA Submission" },
    { tool: "CDISC ADaM v1.1", tag: "BDS / ADSL Datasets" },
    { tool: "Electronic Data Capture (EDC)", tag: "eCRF & Discrepancies" },
    { tool: "ICD-10-CM & CPT-4", tag: "Operative Coding" },
    { tool: "CIOMS I Narrative Drafting", tag: "Day-0 Triage" },
    { tool: "ICH-GCP E6(R2)", tag: "Clinical Compliance" },
    { tool: "FDA 21 CFR Part 11", tag: "Electronic Audit Trails" },
    { tool: "WHO-UMC Algorithm", tag: "Causality Analysis" },
    { tool: "PBRER & PSUR Reporting", tag: "Periodic Risk Safety" },
  ];

  return (
    <section className="border-b border-[#E4EAF2] bg-[#FAFBFD] py-6 sm:py-7 tone-light card-light overflow-hidden relative">
      {/* Edge fade gradients for seamless visual scrolling */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 z-10 bg-gradient-to-r from-[#FAFBFD] via-[#FAFBFD]/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 z-10 bg-gradient-to-l from-[#FAFBFD] via-[#FAFBFD]/80 to-transparent" />

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="ap-shell mb-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-[#081F38]">
              LIVE JOB DESCRIPTION INTELLIGENCE · 2,000+ HEALTHCARE JDs MONITORED
            </span>
          </div>
          <div className="text-[10.5px] text-[#69758A] italic">
            Empirical skills, tools, and salary bands extracted from active Indian healthcare and CRO job postings.
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-2.5"
      >
        {/* Row 1 — Active Roles, Salary Bands & Hubs */}
        <Marquee pauseOnHover repeat={4} className="[--duration:52s] py-0.5">
          {activeRoles.map((role) => (
            <div
              key={role.title}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs hover:shadow-sm hover:border-[#2563EB]/40 hover:bg-slate-50/80 transition-all duration-200 cursor-default select-none mx-2 group tone-light card-light"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] shrink-0" />
              <span className="text-xs font-bold text-[#081F38] group-hover:text-[#2563EB] transition-colors whitespace-nowrap">
                {role.title}
              </span>
              <span className="text-[10px] font-mono text-[#64748B] bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">
                {role.hub}
              </span>
              <span className="text-[10.5px] font-mono font-bold text-[#2563EB] bg-[#EEF6FF] px-2 py-0.2 rounded border border-[#D0E1FD]">
                {role.salary}
              </span>
            </div>
          ))}
        </Marquee>

        {/* Row 2 — Mandatory Tools, Protocol Standards & Regulations */}
        <Marquee reverse pauseOnHover repeat={4} className="[--duration:46s] py-0.5">
          {mandatorySkills.map((skill) => (
            <div
              key={skill.tool}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs hover:shadow-sm hover:border-emerald-500/40 hover:bg-slate-50/80 transition-all duration-200 cursor-default select-none mx-2 group tone-light card-light"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 shrink-0" />
              <span className="text-xs font-semibold text-[#081F38] group-hover:text-emerald-700 transition-colors whitespace-nowrap">
                {skill.tool}
              </span>
              <span className="text-[9.5px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase">
                {skill.tag}
              </span>
            </div>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
