import { Check, X, Users, UserCheck, UserX } from "lucide-react";

export function ArzonWhoShouldAttend() {
  const goodFit = [
    "B.Pharm, M.Pharm, and Pharm.D graduates and final-year students.",
    "Life Sciences graduates (B.Sc / M.Sc, Biotechnology, Biochemistry, Microbiology).",
    "Freshers actively submitting applications to CROs and healthcare IT firms.",
    "Candidates seeking genuine role clarity before spending money on paid courses.",
    "Professionals transitioning into clinical research from adjacent laboratory or hospital roles.",
  ];

  const notFit = [
    "Experienced Pharmacovigilance specialists seeking advanced aggregate reporting or signal management.",
    "Candidates looking for passive webinar lectures with no interactive case processing.",
    "Individuals expecting false guarantees of 100% immediate job placement without skill verification.",
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-stone-200/90 text-left tone-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3F8B]/10 border border-[#1B3F8B]/20 text-[#1B3F8B] font-mono text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>AUDIENCE CRITERIA</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-950 tracking-tight">
            Who should attend?
          </h2>
          <p className="font-sans text-sm sm:text-base text-stone-700 leading-relaxed">
            We keep our cohorts focused on candidates who will derive direct, immediate career value from
            the operational workflows demonstrated in this working session.
          </p>
        </div>

        {/* 2-Column Comparison Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: GOOD FIT */}
          <div className="p-6 sm:p-7 rounded-2xl bg-emerald-50/40 border border-emerald-200/80 shadow-2xs space-y-4 tone-light">
            <div className="flex items-center gap-2 text-emerald-800">
              <UserCheck className="w-5 h-5 text-emerald-700 shrink-0" />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-950">
                Strong Alignment (Good Fit)
              </h3>
            </div>
            <ul className="space-y-3 font-sans text-xs sm:text-sm text-stone-700">
              {goodFit.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-emerald-800" />
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: NOT THE MAIN AUDIENCE */}
          <div className="p-6 sm:p-7 rounded-2xl bg-stone-50 border border-stone-200 shadow-2xs space-y-4 tone-light">
            <div className="flex items-center gap-2 text-stone-700">
              <UserX className="w-5 h-5 text-stone-500 shrink-0" />
              <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-950">
                Not the Main Audience
              </h3>
            </div>
            <ul className="space-y-3 font-sans text-xs sm:text-sm text-stone-600">
              {notFit.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-stone-200 border border-stone-300 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-stone-500" />
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
