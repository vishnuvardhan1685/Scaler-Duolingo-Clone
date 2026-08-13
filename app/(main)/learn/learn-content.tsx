"use client";

import { useLanguageStore } from "@/store/use-language-store";
import { lessons, units as unitsSchema } from "@/db/schema";
import { Unit } from "./unit";

type Props = {
  units: (typeof unitsSchema.$inferSelect & {
    lessons: (typeof lessons.$inferSelect & { completed: boolean; unlocked?: boolean })[];
  })[];
  activeLesson: typeof lessons.$inferSelect & {
    unit: typeof unitsSchema.$inferSelect;
  } | undefined;
  activeLessonPercentage: number;
};

export const LearnContent = ({ units, activeLesson, activeLessonPercentage }: Props) => {
  const { currentLanguage } = useLanguageStore();

  return (
    <div className="pt-2 space-y-8">
      {units.map((unit) => (
        <div key={unit.id} className="mb-10">
          <Unit
            id={unit.id}
            order={unit.order}
            description={unit.order === 2 ? "Build simple phrases" : (currentLanguage?.title || "Solo trip: Compare travel experiences")}
            title={unit.title}
            lessons={unit.lessons}
            activeLesson={activeLesson}
            activeLessonPercentage={activeLessonPercentage}
          />
        </div>
      ))}
    </div>
  );
};
