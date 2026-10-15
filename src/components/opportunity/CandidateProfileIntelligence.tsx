import { FileText, MapPin, Search } from "lucide-react";

export function CandidateProfileIntelligence() {
  return (
    <section className="rounded-2xl border border-stone-300/80 bg-white p-5 text-stone-900 shadow-sm tone-light sm:p-6">
      <div className="flex items-start gap-3 border-b border-stone-200 pb-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#1B3F8B]/20 bg-[#1B3F8B]/10 text-[#1B3F8B]">
          <Search className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1B3F8B]">Role search guide</p>
          <h3 className="mt-1 font-serif text-lg font-bold text-stone-900">Compare the role requirements</h3>
          <p className="mt-1 text-xs leading-5 text-stone-600">Use each listing to decide whether the work, skills and location are relevant to you.</p>
        </div>
      </div>
      <div className="grid gap-3 pt-4 sm:grid-cols-3">
        <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
          <FileText className="h-4 w-4 text-[#1B3F8B]" />
          <p className="mt-2 text-xs font-bold text-stone-900">Responsibilities</p>
          <p className="mt-1 text-[11px] leading-4 text-stone-600">Read what the role asks you to do.</p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
          <Search className="h-4 w-4 text-[#1B3F8B]" />
          <p className="mt-2 text-xs font-bold text-stone-900">Skills and tools</p>
          <p className="mt-1 text-[11px] leading-4 text-stone-600">Compare listed requirements with your current experience.</p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
          <MapPin className="h-4 w-4 text-[#1B3F8B]" />
          <p className="mt-2 text-xs font-bold text-stone-900">Location and level</p>
          <p className="mt-1 text-[11px] leading-4 text-stone-600">Check location, seniority and eligibility details.</p>
        </div>
      </div>
      <p className="mt-4 text-[11px] leading-5 text-stone-500">
        This guide does not verify candidate skills, confirm that a vacancy is still open, or predict an employer’s hiring decision.
      </p>
    </section>
  );
}
