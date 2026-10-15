import { ArrowRight, BookOpen, Compass, GraduationCap } from "lucide-react";
import { Link } from "@tanstack/react-router";

const pathways = [
  {
    icon: BookOpen,
    title: "Explore healthcare roles",
    description: "Review role responsibilities, skills and tools before choosing a direction.",
    link: "/roles",
    linkLabel: "Browse roles",
  },
  {
    icon: Compass,
    title: "Understand your fit",
    description: "Use career-fit guidance to identify role families worth exploring.",
    link: "/career-assessment",
    linkLabel: "Take the assessment",
  },
  {
    icon: GraduationCap,
    title: "Compare programmes",
    description: "Review programme structure and learning activities before you enrol.",
    link: "/courses",
    linkLabel: "View programmes",
  },
];

export function HomeStatsStrip() {
  return (
    <section className="border-b border-[#E4EAF2] bg-[#F8FAFC] py-8 sm:py-10 tone-light">
      <div className="ap-shell">
        <div className="grid gap-3 md:grid-cols-3">
          {pathways.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-xl border border-[#E2E8F0] bg-white p-5">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#EEF6FF] text-[#1557D6]">
                  <Icon className="h-4 w-4" />
                </div>
                <h2 className="mt-4 text-base font-bold text-[#071A4A]">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                <Link to={item.link} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1557D6] hover:underline">
                  {item.linkLabel} <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
