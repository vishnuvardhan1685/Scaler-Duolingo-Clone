import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Lock, Clock, Zap } from "lucide-react";

import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { Button } from "@/components/ui/button";

const QuestsPage = async () => {
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

        {/* Monthly challenges unlock soon! Card matching Screenshot 2 */}
        <div className="border-2 border-[#202f36] bg-[#18262d] rounded-3xl p-5 space-y-4 shadow-xl mt-4 relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="space-y-2 max-w-[200px]">
              <h3 className="font-extrabold text-white text-base leading-tight">
                Monthly challenges unlock soon!
              </h3>
              <p className="text-xs text-[#8496a0] font-semibold leading-relaxed">
                Complete each month&apos;s challenge to earn exclusive badges
              </p>
            </div>
            <div className="h-16 w-16 rounded-full bg-[#ffd900]/20 border-2 border-[#ffd900] flex items-center justify-center text-3xl shadow-lg shrink-0">
              ⚡️
            </div>
          </div>
          <Link href="/lesson">
            <Button className="w-full border-2 border-[#202f36] bg-[#131f24] hover:bg-[#202f36] text-[#1cb0f6] font-extrabold text-xs uppercase tracking-wider rounded-2xl py-3">
              START A LESSON
            </Button>
          </Link>
        </div>

        {/* Footer Links matching Screenshot 2 with valid working routes */}
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-[10px] font-bold uppercase tracking-wider text-[#52656d] px-2 text-center pt-8">
          <Link href="/learn" className="hover:text-white transition">ABOUT</Link>
          <Link href="/learn" className="hover:text-white transition">BLOG</Link>
          <Link href="/shop" className="hover:text-white transition">STORE</Link>
          <Link href="/learn" className="hover:text-white transition">EFFICACY</Link>
          <Link href="/learn" className="hover:text-white transition">CAREERS</Link>
          <Link href="/learn" className="hover:text-white transition">INVESTORS</Link>
          <Link href="/settings" className="hover:text-white transition">TERMS</Link>
          <Link href="/settings" className="hover:text-white transition">PRIVACY</Link>
        </div>
      </StickyWrapper>

      <FeedWrapper>
        <div className="w-full space-y-6 pt-2">
          {/* Welcome purple banner matching Screenshot 2 */}
          <div className="relative w-full rounded-3xl bg-[#ce82ff] border-b-4 border-[#be52f2] p-6 text-white flex items-center justify-between shadow-xl overflow-hidden min-h-[140px]">
            <div className="space-y-1.5 max-w-[340px] z-10">
              <h1 className="text-2xl lg:text-3xl font-black tracking-wide">Welcome!</h1>
              <p className="text-sm font-bold text-white/90 leading-snug">
                Complete quests to earn rewards! Quests refresh every day.
              </p>
            </div>
            <div className="relative w-28 h-28 z-10">
              <Image src="/hero.svg" alt="Treasure Chest Duo" fill className="object-contain" />
            </div>
          </div>

          {/* Daily Quests Section matching Screenshot 2 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-white">Daily Quests</h2>
              <div className="flex items-center gap-x-1 text-xs font-black uppercase tracking-wider text-[#ffd900]">
                <Clock className="h-4 w-4" />
                <span>1 HOUR</span>
              </div>
            </div>

            {/* Quest 1: Earn 10 XP matching Screenshot 2 */}
            <div className="border-2 border-[#202f36] bg-[#18262d] rounded-2xl p-5 flex items-center gap-x-5 shadow-md">
              <div className="h-12 w-12 rounded-2xl bg-[#ffd900]/20 border border-[#ffd900] flex items-center justify-center shrink-0">
                <Zap className="h-7 w-7 text-[#ffd900] fill-[#ffd900]" />
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-white font-extrabold text-base">Earn 10 XP</p>
                <div className="relative w-full bg-[#131f24] h-3.5 rounded-full overflow-hidden border border-[#202f36]">
                  <div className="bg-[#ffd900] h-full w-0 transition-all duration-300" />
                </div>
              </div>
              <div className="h-10 w-10 rounded-xl bg-[#202f36] flex items-center justify-center text-xl shrink-0">
                📦
              </div>
            </div>

            {/* Quest 2: More quests unlock soon matching Screenshot 2 */}
            <div className="border-2 border-[#202f36] bg-[#18262d]/60 rounded-2xl p-6 flex items-center gap-x-4 opacity-70">
              <div className="h-10 w-10 rounded-xl bg-[#131f24] border border-[#202f36] flex items-center justify-center text-[#8496a0] shrink-0">
                <Lock className="h-5 w-5" />
              </div>
              <p className="text-[#8496a0] font-extrabold text-sm">
                More quests unlock soon
              </p>
            </div>
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
};
 
export default QuestsPage;
