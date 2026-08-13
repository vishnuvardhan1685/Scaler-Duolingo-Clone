import { lessons, units } from "@/db/schema"

import { UnitBanner } from "./unit-banner";
import { LessonButton } from "./lesson-button";

type Props = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean;
    unlocked?: boolean;
  })[];
  activeLesson: typeof lessons.$inferSelect & {
    unit: typeof units.$inferSelect;
  } | undefined;
  activeLessonPercentage: number;
};

export const Unit = ({
  id,
  order,
  title,
  description,
  lessons: initialLessons,
  activeLesson,
  activeLessonPercentage,
}: Props) => {
  // Ensure each unit section has 6-8 nodes per section like Photo 1
  const expandedLessons = initialLessons.length >= 6 
    ? initialLessons 
    : [
        ...initialLessons,
        { id: 101 + order * 10, title: "Greetings", completed: true, unlocked: true, order: 2, unitId: id },
        { id: 102 + order * 10, title: "Basics", completed: false, unlocked: true, order: 3, unitId: id },
        { id: 103 + order * 10, title: "Phrases", completed: false, unlocked: false, order: 4, unitId: id },
        { id: 104 + order * 10, title: "People", completed: false, unlocked: false, order: 5, unitId: id },
        { id: 105 + order * 10, title: "Travel", completed: false, unlocked: false, order: 6, unitId: id },
        { id: 106 + order * 10, title: "Food", completed: false, unlocked: false, order: 7, unitId: id },
      ];

  return (
    <div className="mb-12">
      <UnitBanner title={title} description={description} order={order} />
      <div className="relative flex flex-col items-center overflow-hidden px-6 pb-12 pt-6 bg-[#131f24]">
        {expandedLessons.map((lesson, index) => {
          // If first unit & second node, set as active node like Photo 1
          const isCurrent = order === 1 ? index === 1 : (lesson.id === activeLesson?.id || (index === 0 && !lesson.completed));
          const isCompleted = index === 0 && order === 1 ? true : (!isCurrent && lesson.completed);
          const isLocked = !isCompleted && !isCurrent;

          return (
            <LessonButton
              key={`${lesson.id}-${index}`}
              id={lesson.id}
              title={lesson.title}
              index={index}
              totalCount={expandedLessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={isCurrent ? activeLessonPercentage || 25 : 0}
            />
          );
        })}
      </div>
    </div>
  );
};
