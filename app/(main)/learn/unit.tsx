"use client";

import { lessons, units } from "@/db/schema";
import { useProgressStore } from "@/store/use-progress-store";
import { useLanguageStore } from "@/store/use-language-store";
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
  activeLessonPercentage,
}: Props) => {
  const { currentLanguage } = useLanguageStore();
  const { getCompletedCount } = useProgressStore();
  const completedCount = getCompletedCount(currentLanguage?.code || "es");

  // Define clean 7-node path per unit section
  const unitPathNodes = [
    { id: 101 + order * 10, title: "Greetings" },
    { id: 102 + order * 10, title: "Basics" },
    { id: 103 + order * 10, title: "Phrases" },
    { id: 104 + order * 10, title: "People" },
    { id: 105 + order * 10, title: "Travel" },
    { id: 106 + order * 10, title: "Food" },
    { id: 107 + order * 10, title: "Review" },
  ];

  return (
    <div className="mb-12">
      <UnitBanner title={title} description={description} order={order} />
      <div className="relative flex flex-col items-center overflow-hidden px-6 pb-12 pt-6 bg-[#131f24]">
        {unitPathNodes.map((node, index) => {
          // Dynamic language-wise step-by-step progress unlocking:
          // Unit 1: Nodes 0..completedCount-1 are Completed (✓), Node completedCount is Active (👑 START)
          let isCompleted = false;
          let isCurrent = false;

          if (order === 1) {
            isCompleted = index < completedCount;
            isCurrent = index === completedCount;
          } else if (order === 2) {
            const unit2Index = index + 7;
            isCompleted = unit2Index < completedCount;
            isCurrent = unit2Index === completedCount;
          }

          const isLocked = !isCompleted && !isCurrent;

          return (
            <LessonButton
              key={`${node.id}-${index}`}
              id={initialLessons[index]?.id || node.id}
              title={node.title}
              index={index}
              totalCount={unitPathNodes.length - 1}
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
