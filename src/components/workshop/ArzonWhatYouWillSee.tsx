import { 
  Briefcase, 
  Building2, 
  CheckCircle2, 
  Cpu, 
  Award, 
  Target, 
  TrendingUp, 
  Layers 
} from "lucide-react";

export function ArzonWhatYouWillSee() {
  const outcomes = [
    {
      step: "01",
      icon: Briefcase,
      title: "WHAT ROLES EXIST",
      desc: "Understand what different healthcare professionals actually do daily at work—demystifying real day-to-day operations."
    },
    {
      step: "02",
      icon: Building2,
      title: "WHO HIRES",
      desc: "Discover the types of pharma multinationals, CROs, healthcare companies, GCCs, health-tech startups, and service organizations that hire."
    },
    {
      step: "03",
      icon: CheckCircle2,
      title: "WHAT EMPLOYERS WANT",
      desc: "See the exact skills, competencies, and requirements that repeatedly appear across thousands of real healthcare job descriptions."
    },
    {
      step: "04",
      icon: Cpu,
      title: "WHAT TECHNOLOGY MATTERS",
      desc: "Understand the industry tools, software platforms (Argus, MedDRA, Medidata RAVE, SAS), and technical skills relevant to each path."
    },
    {
      step: "05",
      icon: Award,
      title: "WHAT CERTIFICATIONS HELP",
      desc: "Learn where certifications add genuine hiring value and where they are optional or unnecessary."
    },
    {
      step: "06",
      icon: Target,
      title: "WHAT FRESHERS CAN TARGET",
      desc: "Understand which career paths are directly accessible to fresh graduates versus those requiring prior specialization."
    },
    {
      step: "07",
      icon: TrendingUp,
      title: "WHAT YOU CAN EARN",
      desc: "Gain transparent clarity on realistic starting salary bands and how compensation scales with skills, roles, and employers."
    },
    {
      step: "08",
      icon: Layers,
      title: "HOW CAREERS GROW",
      desc: "See the 3-to-5 year trajectory of how entry-level roles evolve into senior specialists, team leads, or global leadership."
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-stone-200 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B3F8B] bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block">
            SESSION CURRICULUM &amp; DECODING FRAMEWORK
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            What You Will Learn in the Session
          </h2>
          <p className="text-sm sm:text-base text-stone-700 font-sans leading-relaxed">
            This session is built around actionable career intelligence derived from real healthcare hiring market data.
          </p>
        </div>

        {/* 8-Point Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {outcomes.map((item, i) => {
            const IconComp = item.icon;
            return (
              <div
                key={i}
                className="rounded-2xl border border-stone-300 bg-white tone-light p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-10 rounded-xl bg-stone-100 flex items-center justify-center text-[#1B3F8B]">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-stone-400">{item.step}</span>
                  </div>

                  <h3 className="font-mono text-xs font-bold text-[#1B3F8B] tracking-wider uppercase">
                    {item.title}
                  </h3>

                  <p className="text-xs text-stone-700 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
