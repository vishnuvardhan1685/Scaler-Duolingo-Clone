import { redirect } from "next/navigation";

import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { lessons, units as unitsSchema } from "@/db/schema";

import { Unit } from "./unit";
import { Header } from "./header";

const LearnPage = async () => {
  const {
    getCourseProgress,
    getLessonPercentage,
    getUnits,
    getUserProgress,
    getUserSubscription,
  } = await import("@/db/queries");

  const userProgressData = getUserProgress();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const unitsData = getUnits();
  const userSubscriptionData = getUserSubscription();

  const [
    userProgress,
    units,
    courseProgress,
    lessonPercentage,
    userSubscription,
  ] = await Promise.all([
    userProgressData,
    unitsData,
    courseProgressData,
    lessonPercentageData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  if (!courseProgress) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        {!isPro && (
          <Promo />
        )}
        <Quests points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        <div className="mb-6 rounded-3xl border-2 border-emerald-100 bg-emerald-50 p-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">Your Spanish journey</p>
              <h2 className="mt-1 text-xl font-black text-slate-800">Keep following the path</h2>
              <p className="mt-1 text-sm text-slate-600">Finish the glowing skill to unlock the next one.</p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3 text-center shadow-sm">
              <p className="text-2xl font-black text-emerald-600">{units.flatMap((unit: { lessons: { completed: boolean }[] }) => unit.lessons).filter((lesson: { completed: boolean }) => lesson.completed).length}</p>
              <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">Skills finished</p>
            </div>
          </div>
        </div>
        {units.map((unit: typeof unitsSchema.$inferSelect & {
          lessons: (typeof lessons.$inferSelect & { completed: boolean; unlocked?: boolean })[];
        }) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={courseProgress.activeLesson as typeof lessons.$inferSelect & {
                unit: typeof unitsSchema.$inferSelect;
              } | undefined}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};
 
export default LearnPage;
