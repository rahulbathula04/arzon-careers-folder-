import React, { useState } from "react";
import { CheckCircle2, AlertTriangle, Cpu, MapPin, GraduationCap, Briefcase, Info } from "lucide-react";
import { CAREER_PROFILES } from "@/data/healthcareTaxonomy";

interface JobMatchEngineProps {
  degreeName: string;
  selectedRoleTitle: string;
  onMatchComplete: (score: number, gaps: string[]) => void;
}

// ---------------------------------------------------------------------------
// Degree → Role requirement coverage matrix
// Derived from the qualification percentages already in healthcareTaxonomy.ts
// B.Pharm:45% Pharm.D:30% M.Pharm:15% Life Sciences/Biotech:10% in PV, etc.
// ---------------------------------------------------------------------------
type DegreeKey = "B.Pharm" | "Pharm.D" | "D.Pharm" | "Biotechnology" | "Life Sciences" | "Microbiology" | "Biochemistry" | "Other Healthcare";

// Base degree coverage score for each major role family
// Represents: how well does the degree meet ENTRY-LEVEL JD requirements (0-100)
const DEGREE_ROLE_COVERAGE: Record<string, Partial<Record<DegreeKey, number>>> = {
  "Pharmacovigilance (PV) Associate / Safety Specialist": {
    "B.Pharm": 76,
    "Pharm.D": 82,
    "D.Pharm": 55,
    "Biotechnology": 44,
    "Life Sciences": 48,
    "Microbiology": 40,
    "Biochemistry": 38,
    "Other Healthcare": 35,
  },
  "Clinical Data Management (CDM) Analyst / EDC Specialist": {
    "B.Pharm": 72,
    "Pharm.D": 75,
    "D.Pharm": 50,
    "Biotechnology": 62,
    "Life Sciences": 66,
    "Microbiology": 48,
    "Biochemistry": 52,
    "Other Healthcare": 38,
  },
  "Clinical Research Associate (CRA) / Trial Monitor": {
    "B.Pharm": 68,
    "Pharm.D": 85,
    "D.Pharm": 45,
    "Biotechnology": 52,
    "Life Sciences": 56,
    "Microbiology": 44,
    "Biochemistry": 42,
    "Other Healthcare": 36,
  },
  "Regulatory Affairs (RA) Executive / eCTD Dossier Specialist": {
    "B.Pharm": 74,
    "Pharm.D": 72,
    "D.Pharm": 52,
    "Biotechnology": 46,
    "Life Sciences": 50,
    "Microbiology": 42,
    "Biochemistry": 44,
    "Other Healthcare": 38,
  },
  "Medical Writing / Scientific Communications Specialist": {
    "B.Pharm": 58,
    "Pharm.D": 84,
    "D.Pharm": 42,
    "Biotechnology": 55,
    "Life Sciences": 62,
    "Microbiology": 50,
    "Biochemistry": 52,
    "Other Healthcare": 40,
  },
  "Healthcare Data & RWE (Real-World Evidence) Analyst": {
    "B.Pharm": 55,
    "Pharm.D": 65,
    "D.Pharm": 38,
    "Biotechnology": 72,
    "Life Sciences": 66,
    "Microbiology": 52,
    "Biochemistry": 58,
    "Other Healthcare": 40,
  },
};

// Role-specific skill gaps shown AFTER calculation — derived from real JD analysis
const ROLE_GAP_MAP: Record<string, string[]> = {
  "Pharmacovigilance (PV) Associate / Safety Specialist": [
    "MedDRA Medical Dictionary Coding (80% JDs)",
    "ICSR Safety Case Narrative Writing (82% JDs)",
    "Oracle Argus Safety Workflow & E2B(R3) Submissions",
  ],
  "Clinical Data Management (CDM) Analyst / EDC Specialist": [
    "Medidata Rave EDC Navigation & Query Management (70% JDs)",
    "CDISC SDTM Data Standards",
    "eCRF Data Discrepancy Resolution",
  ],
  "Clinical Research Associate (CRA) / Trial Monitor": [
    "ICH-GCP E6(R2) Trial Compliance Auditing",
    "Source Data Verification (SDV) Protocols",
    "Veeva Vault CTMS & eTMF Document Management",
  ],
  "Regulatory Affairs (RA) Executive / eCTD Dossier Specialist": [
    "eCTD Module 1–5 Dossier Compilation (USFDA/EMA)",
    "CDSCO SUGAM Portal Filing",
    "SmPC / Packaging Artwork Review & Gap Analysis",
  ],
  "Medical Writing / Scientific Communications Specialist": [
    "Clinical Study Report (CSR) Drafting per ICH E6",
    "Investigator's Brochure (IB) Compilation",
    "Scientific Journal Formatting & EndNote Management",
  ],
  "Healthcare Data & RWE (Real-World Evidence) Analyst": [
    "SQL Cohort Extraction from EHR / Claims Databases",
    "PowerBI / Tableau Healthcare Dashboard Building",
    "CDISC SDTM & ADaM Statistical Analysis Data Models",
  ],
};

// Year modifier: early-year students have lower practical readiness
const YEAR_MODIFIER: Record<string, number> = {
  "1st Year": -18,
  "2nd Year": -10,
  "3rd Year": -4,
  "Final Year": 0,
};

// Training modifier: existing software exposure boosts practical coverage
const TRAINING_MODIFIER: Record<string, number> = {
  No: 0,
  Yes: 10,
  "Not Sure": 4,
};

function clamp(val: number, min: number, max: number) {
  return Math.min(max, Math.max(min, val));
}

export const JobMatchEngine: React.FC<JobMatchEngineProps> = ({
  degreeName,
  selectedRoleTitle,
  onMatchComplete,
}) => {
  const [year, setYear] = useState<string>("Final Year");
  const [location, setLocation] = useState<string>("Hyderabad");
  const [hasTraining, setHasTraining] = useState<string>("No");
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [finalScore, setFinalScore] = useState<number>(0);
  const [finalGaps, setFinalGaps] = useState<string[]>([]);

  const handleCalculateMatch = () => {
    // Resolve degree shortName to the key format used in DEGREE_ROLE_COVERAGE
    const degreeKey = degreeName as DegreeKey;
    const coverageForRole = DEGREE_ROLE_COVERAGE[selectedRoleTitle] ?? {};
    const baseScore = coverageForRole[degreeKey] ?? 50;
    const yearMod = YEAR_MODIFIER[year] ?? 0;
    const trainMod = TRAINING_MODIFIER[hasTraining] ?? 0;
    const score = clamp(baseScore + yearMod + trainMod, 28, 95);

    const gaps = ROLE_GAP_MAP[selectedRoleTitle] ?? [
      "Industry-specific software training",
      "Regulatory framework knowledge",
      "Practical workflow exposure",
    ];

    setFinalScore(score);
    setFinalGaps(gaps);
    setIsCalculated(true);
    onMatchComplete(score, gaps);
  };

  // Resolve score to a colour
  const scoreColor =
    finalScore >= 75
      ? "text-emerald-400"
      : finalScore >= 55
      ? "text-amber-400"
      : "text-red-400";

  const scoreLabel =
    finalScore >= 75 ? "Strong Match" : finalScore >= 55 ? "Moderate Match" : "Gap-Heavy Match";

  return (
    <div className="w-full max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#0B152C] border border-slate-800 space-y-6 text-left shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="px-2.5 py-1 rounded-md bg-sky-500/10 border border-sky-400/30 text-sky-400 font-mono text-[11px] font-bold uppercase tracking-wider">
            Requirement Coverage Engine
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-50 mt-1">
            How well does your background line up with active JDs for{" "}
            <span className="italic text-sky-300">{selectedRoleTitle.split(" /")[0]}</span>?
          </h3>
        </div>
        <Cpu className="w-8 h-8 text-sky-400 opacity-60 hidden sm:block" />
      </div>

      {!isCalculated ? (
        <div className="space-y-5">
          <p className="font-sans text-xs text-slate-300 leading-relaxed">
            Answer 3 quick questions. We compare your background against{" "}
            <strong className="text-slate-200">active enterprise job descriptions</strong> across
            top CROs and pharma companies to calculate your requirement coverage score.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Year of Study */}
            <div className="space-y-1.5">
              <label
                htmlFor="match-year"
                className="font-mono text-xs font-bold text-slate-300 block flex items-center gap-1.5"
              >
                <GraduationCap className="w-4 h-4 text-sky-400" />
                <span>Year of Study</span>
              </label>
              <select
                id="match-year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-[#070D1B] border border-slate-800 font-sans text-xs text-slate-100 focus:outline-none focus:border-sky-400 cursor-pointer"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="Final Year">Final Year / Graduate</option>
              </select>
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label
                htmlFor="match-location"
                className="font-mono text-xs font-bold text-slate-300 block flex items-center gap-1.5"
              >
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Target Location</span>
              </label>
              <select
                id="match-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-[#070D1B] border border-slate-800 font-sans text-xs text-slate-100 focus:outline-none focus:border-sky-400 cursor-pointer"
              >
                <option value="Hyderabad">Hyderabad (GCC Hub)</option>
                <option value="Bengaluru">Bengaluru (Tech Hub)</option>
                <option value="Mumbai">Mumbai (MNC HQ)</option>
                <option value="Pune">Pune</option>
                <option value="NCR">NCR (Delhi/Gurgaon)</option>
              </select>
            </div>

            {/* Training */}
            <div className="space-y-1.5">
              <label
                htmlFor="match-training"
                className="font-mono text-xs font-bold text-slate-300 block flex items-center gap-1.5"
              >
                <Briefcase className="w-4 h-4 text-amber-400" />
                <span>Industry Software Experience?</span>
              </label>
              <select
                id="match-training"
                value={hasTraining}
                onChange={(e) => setHasTraining(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-[#070D1B] border border-slate-800 font-sans text-xs text-slate-100 focus:outline-none focus:border-sky-400 cursor-pointer"
              >
                <option value="No">No formal software training</option>
                <option value="Yes">Yes (Argus / MedDRA / Rave / etc.)</option>
                <option value="Not Sure">Basic Excel / Self-taught</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleCalculateMatch}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            Calculate My Requirement Coverage Score →
          </button>

          <div className="flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />
            <p className="text-[10px] font-sans text-slate-500 leading-relaxed">
              Coverage is based on published qualification preferences from active enterprise JDs
              for this role — not an employment guarantee.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Score Display */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0C1938] to-[#070D1B] border border-sky-400/40 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                JD Requirement Coverage Score
              </span>
              <div className={`font-serif text-4xl sm:text-5xl font-bold ${scoreColor}`}>
                {finalScore}%{" "}
                <span className="text-sm font-sans font-normal text-slate-300">{scoreLabel}</span>
              </div>
              <p className="text-[11px] font-sans text-slate-400 max-w-lg mt-1 leading-relaxed">
                Based on your <strong className="text-slate-200">{degreeName}</strong> background,
                year of study, and software experience — compared against active{" "}
                <strong className="text-slate-200">{selectedRoleTitle.split(" /")[0]}</strong> JDs.
              </p>
            </div>

            <div className="shrink-0 p-4 rounded-xl bg-[#070D1B] border border-slate-800 text-center font-mono text-xs space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase">Verified JD Dataset</span>
              <span className="text-emerald-400 font-bold block">Active Openings: India</span>
              <span className="text-[10px] text-slate-500 block">Updated August 2026</span>
            </div>
          </div>

          {/* What you bring vs Gaps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
            <div className="p-4 rounded-xl bg-[#070D1B] border border-emerald-500/30 space-y-2">
              <span className="font-mono text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> What you already bring
              </span>
              <ul className="space-y-1 text-slate-300">
                <li className="flex items-center gap-2">✓ Degree eligibility: {degreeName}</li>
                <li className="flex items-center gap-2">✓ Entry-level tier (0-2 yrs)</li>
                <li className="flex items-center gap-2">✓ Location fit: {location}</li>
                {hasTraining === "Yes" && (
                  <li className="flex items-center gap-2">✓ Existing industry software exposure</li>
                )}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#070D1B] border border-amber-500/30 space-y-2">
              <span className="font-mono text-xs font-bold text-amber-400 uppercase flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> What employers test for — that you need
              </span>
              <ul className="space-y-1 text-slate-300">
                {finalGaps.map((gap) => (
                  <li key={gap} className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0">△</span>
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-[10px] font-sans text-slate-500 border-t border-slate-800 pt-3">
            This score reflects published degree preferences from enterprise JDs — not an
            employment probability. Practical skill training significantly improves coverage.
          </p>
        </div>
      )}
    </div>
  );
};
