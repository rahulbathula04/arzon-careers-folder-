import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Course } from "@/data/courses";
import { getSalaryBand } from "@/data/courseExtras";
import { thumbFor } from "@/data/courseThumbs";

/**
 * Programme Card Blueprint aligned with Arzon Home Page Guidelines (v1.0 • 2026)
 * Matches HomePriorityTracks visual grammar:
 * - 16:9 thumbnail cover with floating duration pill
 * - Deep navy header (#071A4A), slate summary (#64748B)
 * - Standardized tool chips (#F1F5F9 with slate-200 border)
 * - Dual direct actions: 'View details' + 'Apply'
 */
export function CourseCard({ course }: { course: Course }) {
  const { Icon } = course;
  const salary = getSalaryBand(course);
  const thumb = thumbFor(course.slug, course.category);

  return (
    <article
      data-track={course.slug}
      className="flex flex-col justify-between rounded-2xl border border-[#E4EAF2] bg-white overflow-hidden shadow-xs hover:border-[#1557D6]/40 hover:shadow-lg transition-all group tone-light card-light"
    >
      <div>
        {/* 16:9 Image Thumbnail with Duration Badge & Category Pill */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
          {thumb ? (
            <img
              src={thumb}
              alt={course.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#081F38] to-[#1E3A8A]">
              <Icon className="h-10 w-10 text-white/40" />
            </div>
          )}

          {/* Floating Duration Badge (Bottom-Right) */}
          <div className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-white/95 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#1557D6] border border-white/80 shadow-xs tone-light card-light">
            <span>12 Weeks</span>
          </div>

          {/* Floating Category Pill (Top-Left) */}
          <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-full bg-[#081F38]/85 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-mono font-bold text-white border border-white/20">
            <span>{course.category}</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 space-y-2.5 sm:space-y-3">
          {/* Demand & Salary Header */}
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E6F7F1] border border-[#10B981]/25 px-2 py-0.5 font-mono text-[10px] font-bold text-[#081F38]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
              {course.jd.demand} Demand
            </span>
            <span className="font-mono text-[11px] font-semibold text-[#1557D6]">
              {salary.y1} &rarr; {salary.y3}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-sans text-base font-bold text-[#071A4A] leading-snug group-hover:text-[#1557D6] transition-colors line-clamp-2">
            <Link to="/courses/$slug" params={{ slug: course.slug }}>
              {course.title}
            </Link>
          </h3>

          {/* 1-Line Outcome Summary */}
          <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
            {course.blurb}
          </p>

          {/* Standardized Tool Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {course.tools.slice(0, 3).map((tool) => (
              <span
                key={tool}
                className="inline-flex items-center rounded-md bg-[#F1F5F9] px-2 py-0.5 text-[10px] font-mono font-semibold text-[#475569] border border-slate-200/70"
              >
                {tool}
              </span>
            ))}
            {course.tools.length > 3 && (
              <span className="inline-flex items-center rounded-md bg-white px-2 py-0.5 text-[10px] font-mono font-semibold text-[#64748B] border border-slate-200/70 tone-light card-light">
                +{course.tools.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-3 flex items-center justify-between border-t border-[#F1F5F9] bg-[#FAFCFF]">
        <Link
          to="/courses/$slug"
          params={{ slug: course.slug }}
          aria-label={`See full programme - ${course.title}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1557D6] hover:text-[#071A4A] transition-colors"
        >
          <span>View details</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
        <Link
          to="/apply"
          search={{ programme: course.slug, source: "courses_catalog_grid" }}
          aria-label={`Apply for this internship - ${course.title}`}
          className="inline-flex items-center gap-1 rounded-full bg-[#EEF6FF] hover:bg-[#1557D6] hover:text-white px-3 py-1 text-xs font-bold text-[#1557D6] transition-colors"
        >
          <span>Apply</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
