import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { List } from "../courses/list";
import { Button } from "@/components/ui/button";

const SoundsPage = async () => {
  const userProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/learn");
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
        {!isPro && <Promo />}

        <div className="border-2 border-[#202f36] bg-[#18262d] rounded-3xl p-5 space-y-3 shadow-xl mt-4">
          <h3 className="font-extrabold text-white text-sm">Unlock Leaderboards!</h3>
          <div className="flex items-center gap-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#131f24] border border-[#202f36] flex items-center justify-center text-xl">
              🛡️
            </div>
            <p className="text-xs text-[#8496a0] font-semibold flex-1">
              Complete 3 more lessons to start competing
            </p>
          </div>
        </div>

        <Quests points={userProgress.points} />

        <div className="rounded-3xl bg-gradient-to-b from-[#18313d] via-[#1d1b4b] to-[#4a1d6d] border-2 border-[#202f36] p-6 text-white text-center space-y-3 shadow-2xl relative overflow-hidden mt-6">
          <div className="relative w-24 h-20 mx-auto">
            <Image src="/mascot.svg" alt="Mascot" fill className="object-contain filter drop-shadow-lg" />
          </div>
          <h3 className="text-lg font-black tracking-tight">Using an ad blocker?</h3>
          <p className="text-xs text-[#8496a0] font-semibold leading-relaxed">
            Support education with Super Duolingo and we&apos;ll remove ads for you
          </p>
          <Button className="w-full bg-white text-black font-black uppercase text-xs tracking-wider rounded-2xl py-3 hover:bg-slate-200">
            TRY SUPER FOR FREE
          </Button>
        </div>
      </StickyWrapper>

      <FeedWrapper>
        <List />
      </FeedWrapper>
    </div>
  );
};

export default SoundsPage;
