import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { Button } from "@/components/ui/button";

const LearderboardPage = async () => {
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
        
        {/* WHAT ARE LEADERBOARDS? Right Sidebar Card matching Photo 2 */}
        <div className="border-2 border-[#202f36] bg-[#18262d] rounded-2xl p-5 space-y-3 relative overflow-hidden mt-6">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#8496a0]">
            WHAT ARE LEADERBOARDS?
          </p>
          <h3 className="font-extrabold text-lg text-white leading-tight">
            Do lessons. Earn XP. Compete.
          </h3>
          <p className="text-sm text-[#8496a0] font-medium leading-normal pr-16">
            Earn XP through lessons, then compete with players in a weekly leaderboard
          </p>
          <div className="absolute right-2 top-8 w-16 h-20">
            <Image src="/mascot.svg" alt="Duo Mascot" fill className="object-contain" />
          </div>
        </div>
      </StickyWrapper>

      <FeedWrapper>
        <div className="w-full flex flex-col items-center pt-4">
          {/* 3 Shields Graphic matching Photo 2 */}
          <div className="relative flex items-center justify-center gap-x-2 my-4">
            <div className="w-20 h-24 bg-[#8b5a2b] rounded-2xl border-2 border-[#5c3a19] flex items-center justify-center transform -rotate-12 opacity-80 shadow-md">
              <span className="text-2xl">🛡️</span>
            </div>
            <div className="w-24 h-28 bg-[#ffd900] rounded-2xl border-4 border-[#e6c200] flex items-center justify-center z-10 shadow-xl">
              <span className="text-4xl">👑</span>
            </div>
            <div className="w-20 h-24 bg-[#a0aab2] rounded-2xl border-2 border-[#76818a] flex items-center justify-center transform rotate-12 opacity-80 shadow-md">
              <span className="text-2xl">🛡️</span>
            </div>
          </div>

          <h1 className="text-center font-black text-white text-2xl mt-4">
            Unlock Leaderboards!
          </h1>
          <p className="text-[#8496a0] text-center text-sm font-bold mt-1.5 mb-6">
            Complete 3 more lessons to start competing
          </p>

          <Link href="/lesson">
            <Button
              variant="ghost"
              className="border-2 border-[#202f36] bg-[#131f24] hover:bg-[#18262d] text-[#1cb0f6] font-extrabold text-xs uppercase tracking-widest px-8 py-3 rounded-full mb-10"
            >
              START A LESSON
            </Button>
          </Link>

          {/* Locked Leaderboard Skeleton Rows matching Photo 2 */}
          <div className="w-full space-y-4 max-w-lg">
            {[1, 2, 3, 4, 5, 6].map((rank) => (
              <div 
                key={rank}
                className="flex items-center justify-between w-full p-3 px-4 rounded-2xl bg-[#131f24]/50 opacity-40 border border-[#202f36]"
              >
                <div className="flex items-center gap-x-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#37464f]" />
                  <div className="w-10 h-10 rounded-full bg-[#37464f]" />
                  <div className="h-3 w-28 bg-[#37464f] rounded-full" />
                </div>
                <div className="h-3 w-12 bg-[#37464f] rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
};
 
export default LearderboardPage;
