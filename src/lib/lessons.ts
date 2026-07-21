import type { Course, Lesson, SyllabusModule } from "@/data/courses";

/**
 * Derive lessons from a module's topics if no explicit lessons are defined.
 * Lesson 1 of every module is treated as a free preview.
 */
export function getLessons(module: SyllabusModule): Lesson[] {
  if (module.lessons && module.lessons.length) return module.lessons;
  return module.topics.map((topic, i) => ({
    id: `l${i + 1}`,
    title: topic,
    type: i === module.topics.length - 1 ? "lab" : i % 3 === 1 ? "reading" : "video",
    durationMin: 18 + ((i * 7) % 22),
  }));
}

export function isFreePreview(_module: SyllabusModule, lessonIndex: number) {
  return lessonIndex === 0;
}

export function getCourseLessonCount(course: Course) {
  return course.syllabus.reduce((sum, m) => sum + getLessons(m).length, 0);
}

export function flattenLessons(course: Course) {
  return course.syllabus.flatMap((m, mi) =>
    getLessons(m).map((l, li) => ({
      moduleIndex: mi,
      moduleId: `m${mi + 1}`,
      lessonIndex: li,
      lessonId: l.id,
      module: m,
      lesson: l,
    })),
  );
}
