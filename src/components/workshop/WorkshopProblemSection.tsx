import { AlertCircle, FileX2, TrendingDown, Award } from "lucide-react";

export function WorkshopProblemSection() {
  const problems = [
    {
      icon: AlertCircle,
      title: "“B.Pharm done. But every interview ends the same way.”",
      desc: "They ask about ICSR, MedDRA, and case processing—specialized operational concepts your university syllabus never covered.",
    },
    {
      icon: FileX2,
      title: "“You've applied to 30+ jobs. The phone stays silent.”",
      desc: "Corporate applicant tracking systems filter your resume on technical keywords from enterprise job descriptions you were never taught.",
    },
    {
      icon: TrendingDown,
      title: "“Seniors with the same degree earn ₹12,000/month at retail counters.”",
      desc: "Your degree is not the problem. The practical gap between textbook theory and enterprise CRO workflows is.",
    },
    {
      icon: Award,
      title: "“You keep collecting certificates. Nothing changes.”",
      desc: "Employers don't hire attendance certificates. They hire candidates who demonstrate day-one workflow competence.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 border-b border-stone-200 bg-stone-50/70 tone-light">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 font-mono text-xs font-bold uppercase tracking-wider">
            THE FRESHER REALITY
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-serif font-bold text-stone-950 leading-[1.18]">
            Sound Familiar?
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            The traditional path promises campus placements. The real healthcare corporate market tests something completely different.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl border border-stone-200 bg-white tone-light shadow-2xs hover:border-[#1B3F8B]/30 hover:shadow-sm transition-all space-y-3"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 text-[#1B3F8B] flex items-center justify-center shrink-0 border border-stone-200">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 font-sans leading-snug">
                      {prob.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                      {prob.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-white tone-light border-2 border-dashed border-[#1B3F8B]/30 text-center max-w-3xl mx-auto shadow-xs">
          <p className="text-sm sm:text-base font-medium text-stone-800 font-sans leading-relaxed">
            <strong>None of this means you chose the wrong degree.</strong> It means nobody showed you what the job actually looks like. That's what this workshop fixes—100% free.
          </p>
        </div>
      </div>
    </section>
  );
}
