import { CheckCircle2, Bookmark, ShieldCheck, Compass } from "lucide-react";

export function HeroFeatureCards() {
  const cards = [
    {
      icon: CheckCircle2,
      iconBg: "bg-emerald-100 text-emerald-700",
      title: "Data-Backed Insights",
      subtext: "Based on 2,180+ verified job descriptions",
    },
    {
      icon: Bookmark,
      iconBg: "bg-indigo-100 text-indigo-700",
      title: "Role-by-Role Guidance",
      subtext: "Understand what you'll actually do in each career",
    },
    {
      icon: ShieldCheck,
      iconBg: "bg-amber-100 text-amber-700",
      title: "Skills & Tools",
      subtext: "Know what employers really look for",
    },
    {
      icon: Compass,
      iconBg: "bg-sky-100 text-sky-700",
      title: "Personalized Next Steps",
      subtext: "Find the right path based on your profile and goals",
    },
  ];

  return (
    <div className="w-full bg-[var(--color-warm-paper)] py-6 sm:py-8 border-b border-[var(--color-border-warm)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {cards.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <div
                key={idx}
                className="bg-white tone-light rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-sm flex items-start gap-4 hover:border-emerald-400 transition-colors"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg}`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-[var(--color-arzon-ink)] tracking-tight">
                    {card.title}
                  </h4>
                  <p className="font-sans text-xs text-stone-500 mt-1 leading-snug">
                    {card.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
