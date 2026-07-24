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
  pendingComponent: () => (
    <div className="min-h-dvh animate-pulse bg-background p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="h-8 w-64 rounded bg-muted"></div>
        <div className="flex gap-4">
          <div className="h-[600px] flex-1 rounded-xl bg-muted"></div>
          <div className="h-[600px] w-80 rounded-xl bg-muted hidden lg:block"></div>
        </div>
      </div>
    </div>
  ),
});

function PlayerPage() {
  const course = Route.useLoaderData();
  const { m, l } = Route.useSearch();
  const mIdx = Math.min(Math.max(0, m - 1), course.syllabus.length - 1);
  const lIdx = Math.max(0, l - 1);
  return <PlayerLayout course={course} initialModuleIndex={mIdx} initialLessonIndex={lIdx} />;
}
