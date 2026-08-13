"use client";

import { useLanguageStore } from "@/store/use-language-store";
import { lessons, units as unitsSchema } from "@/db/schema";
import { Unit } from "./unit";
import { Header } from "./header";

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
    <>
      <Header title={currentLanguage?.name || "Spanish"} />
      <div className="mb-6 rounded-3xl border-2 border-[#202f36] bg-[#18262d] p-5 shadow-lg">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#58cc02]">
              Your {currentLanguage?.name || "Spanish"} journey
            </p>
            <h2 className="mt-1 text-xl font-black text-white">
              {currentLanguage?.title || "Keep following the path"}
            </h2>
            <p className="mt-1 text-sm text-[#8496a0]">Finish the glowing skill to unlock the next one.</p>
          </div>
          <div className="rounded-2xl bg-[#131f24] border border-[#202f36] px-4 py-3 text-center shadow-sm">
            <p className="text-2xl font-black text-[#58cc02]">
              {units.flatMap((unit) => unit.lessons).filter((l) => l.completed).length + 1}
            </p>
            <p className="text-[10px] font-extrabold uppercase tracking-wide text-[#8496a0]">Skills finished</p>
          </div>
        </div>
      </div>
      {units.map((unit) => (
        <div key={unit.id} className="mb-10">
          <Unit
            id={unit.id}
            order={unit.order}
            description={unit.order === 2 ? "Build simple phrases" : (currentLanguage?.title || unit.description || "Learn the basics")}
            title={unit.title}
            lessons={unit.lessons}
            activeLesson={activeLesson}
            activeLessonPercentage={activeLessonPercentage}
          />
        </div>
      ))}
    </>
  );
};
