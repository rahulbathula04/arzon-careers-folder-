import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Compass, ShieldCheck, Sparkles, BookOpen, Briefcase } from "lucide-react";

export function FindYourTrainingWidget() {
  const [degree, setDegree] = useState("bpharm");
  const [status, setStatus] = useState("graduate");
  const [interest, setInterest] = useState("pv");
  const [goal, setGoal] = useState("both");

  const TRACK_RECOMMENDATIONS: Record<string, {
    title: string;
    slug: string;
    description: string;
    tools: string[];
    duration: string;
    internshipScope: string;
  }> = {
    pv: {
      title: "Pharmacovigilance & Drug Safety Track",
      slug: "pharmacovigilance",
      description: "Triage adverse events, code medical terms with MedDRA v27.0, and process ICSR cases in Oracle Argus Safety v8.4+ for Tier-1 GCCs.",
      tools: ["Oracle Argus Safety", "MedDRA", "E2B(R3) XML", "PBRER / PSUR"],
      duration: "12 Weeks (Interactive Live & Labs)",
      internshipScope: "Real-world anonymized ICSR case processing & aggregate safety narrative audits.",
    },
    cdm: {
      title: "Clinical Data Management (CDM) & EDC Track",
      slug: "clinical-data-management",
      description: "Design electronic CRFs, write data validation specs, manage query resolutions, and structure CDISC SDTM/CDASH datasets.",
      tools: ["Medidata Rave EDC", "Veeva Vault", "CDISC SDTM/CDASH", "Clinical SQL"],
      duration: "12 Weeks (Cloud EDC Labs)",
      internshipScope: "eCRF study build, edit check validation, and database lock execution.",
    },
    coding: {
      title: "Medical Coding & CPC Certification Track",
      slug: "medical-coding",
      description: "Master ICD-10-CM, CPT surgical packages, HCPCS Level II, and NCCI edits to pass AAPC CPC exam and audit US RCM claims.",
      tools: ["ICD-10-CM", "CPT Manual", "HCPCS Level II", "EncoderPro"],
      duration: "10 Weeks (AAPC CPC Exam Prep)",
      internshipScope: "Live chart auditing & claims denial management simulations.",
    },
    ra: {
      title: "Pharmaceutical Regulatory Affairs Track",
      slug: "regulatory-affairs",
      description: "Compile eCTD Module 1-5 XML dossiers, navigate FDA 510(k) / ANDA filings, and CDSCO Sugam portal licensing.",
      tools: ["eCTD Express", "ESG Gateway", "Sugam Portal", "ICH Q/M/E Guidelines"],
      duration: "10 Weeks (Dossier Compilation)",
      internshipScope: "Mock eCTD dossier structure assembly and regulatory gap analysis.",
    },
    sas: {
      title: "SAS Clinical Programming & Biostatistics Track",
      slug: "sas-clinical",
      description: "Transform EDC data into CDISC SDTM and ADaM datasets to generate validated Tables, Listings, and Figures (TLFs).",
      tools: ["Base/Advanced SAS", "PROC SQL", "CDISC SDTM/ADaM", "TLF Macros"],
      duration: "14 Weeks (Biostatistics Labs)",
      internshipScope: "ADSL/ADAE macro programming & FDA eSUB submission package verification.",
    },
  };

  const currentTrack = TRACK_RECOMMENDATIONS[interest] || TRACK_RECOMMENDATIONS.pv;

  return (
    <div className="bg-white tone-light card-light border border-stone-300 rounded-2xl p-6 sm:p-10 shadow-lg my-12">
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#1B3F8B] motion-safe:animate-pulse" />
        <span className="font-mono text-[10px] font-bold tracking-widest text-[#1B3F8B] uppercase">
          ARZON CAREER ENGINE · FIND YOUR TRAINING
        </span>
      </div>

      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1325]">
        Find Your Role-Specific Training &amp; Internship Track
      </h2>
      <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
        Map your degree and career goals to exact industry skill requirements. Train for specific roles, not generic courses.
      </p>

      {/* Decision Wizard Form */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {/* Step 1: Degree */}
        <div>
          <label className="block font-mono font-bold text-stone-700 uppercase tracking-wider mb-2 text-[11px]">
            1. Your Academic Degree
          </label>
          <select
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            className="w-full bg-[#FAF9F6] border border-stone-300 rounded p-2.5 font-sans text-stone-900 focus:ring-1 focus:ring-[#1B3F8B] focus:border-[#1B3F8B]"
          >
            <option value="bpharm">B.Pharm / M.Pharm</option>
            <option value="pharmd">Pharm.D</option>
            <option value="lifesci">B.Sc / M.Sc Life Sciences</option>
            <option value="biotech">Biotechnology / B.Tech</option>
            <option value="mbbs">MBBS / BDS / BAMS / BPT</option>
            <option value="business">BBA / MBA / B.Com</option>
          </select>
        </div>

        {/* Step 2: Status */}
        <div>
          <label className="block font-mono font-bold text-stone-700 uppercase tracking-wider mb-2 text-[11px]">
            2. Your Current Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-[#FAF9F6] border border-stone-300 rounded p-2.5 font-sans text-stone-900 focus:ring-1 focus:ring-[#1B3F8B] focus:border-[#1B3F8B]"
          >
            <option value="graduate">Recent Graduate (Degree Complete)</option>
            <option value="finalyear">Final-Year College Student</option>
            <option value="switcher">Career Switcher (Transitioning Domain)</option>
            <option value="working">Working Professional (Up-Skilling)</option>
          </select>
        </div>

        {/* Step 3: Domain Interest */}
        <div>
          <label className="block font-mono font-bold text-stone-700 uppercase tracking-wider mb-2 text-[11px]">
            3. Target Domain Interest
          </label>
          <select
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="w-full bg-[#FAF9F6] border border-stone-300 rounded p-2.5 font-sans text-stone-900 focus:ring-1 focus:ring-[#1B3F8B] focus:border-[#1B3F8B]"
          >
            <option value="pv">Drug Safety &amp; Pharmacovigilance</option>
            <option value="cdm">Clinical Data Management (EDC)</option>
            <option value="coding">Medical Coding &amp; CPC Certification</option>
            <option value="ra">Regulatory Affairs &amp; eCTD Dossiers</option>
            <option value="sas">Clinical SAS &amp; Biostatistics</option>
          </select>
        </div>

        {/* Step 4: Primary Goal */}
        <div>
          <label className="block font-mono font-bold text-stone-700 uppercase tracking-wider mb-2 text-[11px]">
            4. Your Primary Goal
          </label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full bg-[#FAF9F6] border border-stone-300 rounded p-2.5 font-sans text-stone-900 focus:ring-1 focus:ring-[#1B3F8B] focus:border-[#1B3F8B]"
          >
            <option value="both">Training + Internship Experience</option>
            <option value="training">Role Skills Training Only</option>
            <option value="internship">Practical Internship Exposure Only</option>
          </select>
        </div>
      </div>

      {/* Output Recommendation Panel */}
      <div className="mt-8 bg-[#FAF9F6] border border-stone-300 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded">
                RECOMMENDED MATCH
              </span>
              <span className="font-mono text-[10px] text-stone-500">
                BASED ON YOUR DEGREE &amp; SELECTION
              </span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0B1325]">
              {currentTrack.title}
            </h3>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {currentTrack.description}
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
              <span className="text-stone-500 font-bold">Tools You Will Master:</span>
              {currentTrack.tools.map((tool) => (
                <span key={tool} className="bg-white border border-stone-300 text-stone-800 text-[10px] px-2 py-0.5 rounded">
                  {tool}
                </span>
              ))}
            </div>

            <div className="pt-2 text-xs font-mono text-stone-600 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-stone-200">
              <div>
                <span className="text-stone-500 block text-[10px]">PROGRAM DURATION:</span>
                <strong className="text-[#0B1325]">{currentTrack.duration}</strong>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">INTERNSHIP EXPOSURE:</span>
                <strong className="text-[#0B1325]">{currentTrack.internshipScope}</strong>
              </div>
            </div>
          </div>

          <div className="shrink-0 space-y-3 w-full lg:w-auto">
            <Link
              to="/courses/$slug"
              params={{ slug: currentTrack.slug }}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#0B1325] hover:bg-[#1B3F8B] text-white px-6 py-3 rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              EXPLORE TRAINING CURRICULUM <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/career-engine/start"
              className="w-full inline-flex items-center justify-center gap-2 bg-white tone-light hover:bg-stone-100 text-stone-900 border border-stone-300 px-6 py-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors"
            >
              TAKE 90-SEC FIT DIAGNOSTIC
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
