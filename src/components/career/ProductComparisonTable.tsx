import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass, ShieldCheck, CheckCircle2 } from "lucide-react";

interface ProductComparisonTableProps {
  onApplyAcri?: () => void;
  activeProduct?: "assessment" | "acri";
}

export function ProductComparisonTable({ onApplyAcri, activeProduct }: ProductComparisonTableProps) {
  return (
    <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white tone-light card-light p-5 sm:p-7 shadow-xs">
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700">
          Clarity First · Product Comparison
        </span>
        <h2 className="mt-2 text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#071A4A]">
          Two distinct products for two different questions
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Career Assessment helps you decide where to go. ACRI evaluates how ready you are for a specific role.
        </p>
      </div>

      {/* Mobile Swipe Indicator Badge */}
      <div className="sm:hidden flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-500 mb-2">
        <span>← Swipe horizontally to compare →</span>
      </div>

      <div className="overflow-x-auto -mx-3 sm:mx-0 pb-2">
        <table className="w-full min-w-[560px] text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-3 px-3 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 w-1/4">
                Dimension
              </th>
              <th className={`py-3 px-3 rounded-t-xl w-[37.5%] ${activeProduct === "assessment" ? "bg-blue-50/70 text-[#071A4A]" : "text-[#071A4A]"}`}>
                <div className="flex items-center gap-1.5 font-bold">
                  <Compass className="h-4 w-4 text-[#1557D6]" />
                  <span>Career Assessment</span>
                </div>
              </th>
              <th className={`py-3 px-3 rounded-t-xl w-[37.5%] ${activeProduct === "acri" ? "bg-emerald-50/70 text-[#071A4A]" : "text-[#071A4A]"}`}>
                <div className="flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>ACRI Certification</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-3 px-3 font-semibold text-slate-500 text-xs">Main question</td>
              <td className={`py-3 px-3 font-medium text-slate-800 ${activeProduct === "assessment" ? "bg-blue-50/30" : ""}`}>
                "Which healthcare career fits me?"
              </td>
              <td className={`py-3 px-3 font-medium text-slate-800 ${activeProduct === "acri" ? "bg-emerald-50/30" : ""}`}>
                "Can I demonstrate practical role readiness?"
              </td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-semibold text-slate-500 text-xs">Purpose</td>
              <td className={`py-3 px-3 text-slate-700 ${activeProduct === "assessment" ? "bg-blue-50/30" : ""}`}>
                Career exploration & direction
              </td>
              <td className={`py-3 px-3 text-slate-700 ${activeProduct === "acri" ? "bg-emerald-50/30" : ""}`}>
                Occupational-readiness assessment
              </td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-semibold text-slate-500 text-xs">Scope</td>
              <td className={`py-3 px-3 text-slate-700 ${activeProduct === "assessment" ? "bg-blue-50/30" : ""}`}>
                Multiple healthcare role families
              </td>
              <td className={`py-3 px-3 text-slate-700 ${activeProduct === "acri" ? "bg-emerald-50/30" : ""}`}>
                Pharmacovigilance (role-specific)
              </td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-semibold text-slate-500 text-xs">Output</td>
              <td className={`py-3 px-3 text-slate-700 ${activeProduct === "assessment" ? "bg-blue-50/30" : ""}`}>
                Career-fit report, strengths & gaps
              </td>
              <td className={`py-3 px-3 text-slate-700 ${activeProduct === "acri" ? "bg-emerald-50/30" : ""}`}>
                ACRI score, competency profile & credential
              </td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-semibold text-slate-500 text-xs">Access</td>
              <td className={`py-3 px-3 text-slate-700 ${activeProduct === "assessment" ? "bg-blue-50/30" : ""}`}>
                Free instant assessment (42 questions)
              </td>
              <td className={`py-3 px-3 text-slate-700 ${activeProduct === "acri" ? "bg-emerald-50/30" : ""}`}>
                Approved invite required (25-min simulation)
              </td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-semibold text-slate-500 text-xs">Best for</td>
              <td className={`py-3 px-3 text-slate-700 ${activeProduct === "assessment" ? "bg-blue-50/30" : ""}`}>
                Graduates choosing a career direction
              </td>
              <td className={`py-3 px-3 text-slate-700 ${activeProduct === "acri" ? "bg-emerald-50/30" : ""}`}>
                Candidates proving PV case handling capability
              </td>
            </tr>
            <tr>
              <td className="py-3 px-3 font-semibold text-slate-500 text-xs">Primary action</td>
              <td className={`py-3 px-3 ${activeProduct === "assessment" ? "bg-blue-50/30" : ""}`}>
                <Link
                  to="/career-engine/start"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1557D6] hover:underline"
                >
                  Take Free Assessment <ArrowRight className="h-3 w-3" />
                </Link>
              </td>
              <td className={`py-3 px-3 ${activeProduct === "acri" ? "bg-emerald-50/30" : ""}`}>
                {onApplyAcri ? (
                  <button
                    type="button"
                    onClick={onApplyAcri}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline"
                  >
                    Apply for an Invite <ArrowRight className="h-3 w-3" />
                  </button>
                ) : (
                  <Link
                    to="/acri"
                    search={{ apply: "true" }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline"
                  >
                    Apply for an Invite <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200/80 p-3 text-center text-xs text-slate-700">
        <span className="font-semibold text-[#071A4A]">Not sure which to choose?</span> Start with{" "}
        <strong className="text-[#1557D6]">Career Assessment</strong> if you're deciding where to go. Choose{" "}
        <strong className="text-emerald-700">ACRI</strong> if you specifically want to assess your Pharmacovigilance readiness.
      </div>
    </div>
  );
}
