import { Clock, Play, HelpCircle, MapPin, CheckCircle2 } from "lucide-react";

export function ArzonWhatYouWillSee() {
  const agenda = [
    {
      num: "01",
      duration: "20 MIN",
      title: "THE REAL CASE PROCESSING",
      subtitle: "Live Intake & Triage Walkthrough",
      description:
        "Watch a real adverse-event report (Metformin ER acute metabolic acidosis) triaged live on screen. Learn how enterprise safety systems handle intake and duplicate verification.",
      tag: "PRACTICAL DEMONSTRATION",
    },
    {
      num: "02",
      duration: "25 MIN",
      title: "HOW SAFETY TEAMS THINK",
      subtitle: "4 Criteria, MedDRA Coding & Regulatory Timelines",
      description:
        "Deconstruct the four minimum validity pillars, seriousness determination (life-threatening vs hospitalization), MedDRA coding, and expedited 15-day reporting deadlines.",
      tag: "TECHNICAL CORE",
    },
    {
      num: "03",
      duration: "15 MIN",
      title: "THE CAREER MAP & SALARY BANDS",
      subtitle: "Roles, Employers & Promotion Trajectories",
      description:
        "Understand entry CTC bands (₹3.2L – ₹4.8L), 42 hiring CROs across Bangalore, Hyderabad, and Pune, and the 3-year path from associate to safety scientist.",
      tag: "INDUSTRY INTELLIGENCE",
    },
    {
      num: "04",
      duration: "15 MIN",
      title: "LIVE CANDIDATE Q&A",
      subtitle: "Direct Access to Mentor Kumail",
      description:
        "Ask questions about resume tailoring, campus placements, degree eligibility (Pharm.D vs B.Pharm vs Life Sciences), and what to say in technical interview rounds.",
      tag: "INTERACTIVE ACCESS",
    },
  ];

  return (
    <section id="what-you-will-see" className="w-full py-16 sm:py-20 bg-[var(--color-warm-white)] border-b border-[var(--color-border-warm)] text-left tone-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header with Arzon Signature */}
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4 bg-[var(--color-editorial-amber)] rounded-sm"></div>
            <span className="font-mono text-[11px] font-bold text-[var(--color-arzon-ink)] uppercase tracking-widest">
              SESSION AGENDA · 75 MINUTES
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--color-arzon-ink)] tracking-tight">
            What you'll actually see
          </h2>
          <p className="font-sans text-sm sm:text-base text-stone-700 leading-relaxed">
            A timed, structured working session designed to replace abstract speculation with demonstrable operations literacy.
          </p>
        </div>

        {/* Vertical Rail Timeline */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-[var(--color-border-warm)] space-y-10 max-w-4xl">
          {agenda.map((item) => (
            <div key={item.num} className="relative group">
              {/* Rail Node Marker with Large Number */}
              <div className="absolute -left-[37px] sm:-left-[53px] top-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[var(--color-warm-paper)] border-2 border-[var(--color-border-warm)] group-hover:border-[var(--color-medical-navy)] group-hover:bg-[var(--color-medical-navy)] text-[var(--color-arzon-ink)] group-hover:text-white flex items-center justify-center font-mono text-xs sm:text-sm font-bold shadow-xs transition-colors">
                {item.num}
              </div>

              {/* Agenda Content Box */}
              <div className="p-6 rounded-2xl bg-[var(--color-warm-paper)] border border-[var(--color-border-warm)] space-y-2 group-hover:border-[var(--color-medical-navy)]/40 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-[var(--color-border-warm)]/60">
                  <span className="font-mono text-[10px] font-bold text-[var(--color-editorial-amber)] uppercase tracking-wider">
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[var(--color-medical-navy)]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--color-arzon-ink)] pt-1">
                  {item.title}
                </h3>
                <p className="font-mono text-xs text-[var(--color-clinical-teal)] font-semibold uppercase tracking-wider">
                  {item.subtitle}
                </p>
                <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
