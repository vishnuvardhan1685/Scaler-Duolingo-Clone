import Image from "next/image";
import { redirect } from "next/navigation";

import { Promo } from "@/components/promo";
import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { getUserProgress, getUserSubscription } from "@/db/queries";

import { Items } from "./items";
import { Quests } from "@/components/quests";
import { Button } from "@/components/ui/button";

const ShopPage = async () => {
  const userProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();

  if (!userProgress || !userProgress.activeCourse) {
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

        {/* Using an ad blocker? Card matching Photo 3 */}
        <div className="rounded-3xl bg-gradient-to-b from-[#18313d] via-[#1d1b4b] to-[#4a1d6d] border-2 border-[#202f36] p-6 text-white text-center space-y-4 shadow-2xl relative overflow-hidden mt-6">
          <div className="relative w-28 h-24 mx-auto">
            <Image src="/mascot.svg" alt="Super Owl Mascot" fill className="object-contain filter drop-shadow-lg" />
          </div>
          <h3 className="text-xl font-black tracking-tight">Using an ad blocker?</h3>
          <p className="text-xs text-[#8496a0] font-semibold leading-relaxed px-2">
            Support education with Super Duolingo and we&apos;ll remove ads for you
          </p>
          <div className="space-y-2 pt-2">
            <Button className="w-full bg-white text-black font-black uppercase text-xs tracking-wider rounded-2xl py-3 hover:bg-slate-200">
              TRY SUPER FOR FREE
            </Button>
            <button className="text-xs font-black uppercase tracking-wider text-[#ce82ff] hover:underline pt-1 w-full">
              DISABLE AD BLOCKER
            </button>
          </div>
        </div>

        <Quests points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Items
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={isPro}
          />
        </div>
      </FeedWrapper>
    </div>
  );
};
 
export default ShopPage;
