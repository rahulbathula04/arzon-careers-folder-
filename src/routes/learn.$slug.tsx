import { createFileRoute, notFound } from "@tanstack/react-router";
import { z } from "zod";
import { COURSES_BY_SLUG } from "@/data/courses";
import { PlayerLayout } from "@/components/learn/PlayerLayout";

const search = z.object({
  m: z.coerce.number().min(1).default(1),
  l: z.coerce.number().min(1).default(1),
  lesson: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/learn/$slug")({
  validateSearch: search,
  loader: ({ params }) => {
    const c = COURSES_BY_SLUG[params.slug];
    if (!c) throw notFound();
    return c;
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `Player · ${loaderData.title}, Arzon Global` },
            {
              name: "description",
              content: `Module player for ${loaderData.title}. Watch lessons, download resources, submit assignments.`,
            },
          ],
        }
      : {},
  component: PlayerPage,
});

function PlayerPage() {
  const course = Route.useLoaderData();
  const { m, l } = Route.useSearch();
  const mIdx = Math.min(Math.max(0, m - 1), course.syllabus.length - 1);
  const lIdx = Math.max(0, l - 1);
  return <PlayerLayout course={course} initialModuleIndex={mIdx} initialLessonIndex={lIdx} />;
}
