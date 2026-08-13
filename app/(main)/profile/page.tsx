import Image from "next/image";
import Link from "next/link";
import { Pencil, Flame, Zap, Shield, Trophy } from "lucide-react";

import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { ProfileSidebarTabs } from "./profile-client";

const ProfilePage = async () => {
  const userProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        {userProgress && (
          <UserProgress
            activeCourse={userProgress.activeCourse}
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={isPro}
          />
        )}

        <ProfileSidebarTabs />

        {/* Footer links */}
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-[11px] font-bold uppercase tracking-wider text-[#52656d] px-2 text-center pt-6">
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
        <div className="space-y-8">
          {/* Main User Cover Card matching Photo 4 */}
          <div className="relative border-2 border-[#202f36] bg-[#18262d] rounded-3xl p-6 shadow-2xl">
            {/* Edit Pencil Icon */}
            <button className="absolute top-4 right-4 p-2.5 rounded-full bg-[#131f24] border-2 border-[#202f36] hover:bg-[#202f36] text-[#1cb0f6] transition">
              <Pencil className="h-4 w-4" />
            </button>

            {/* Avatar Dotted Circle Frame */}
            <div className="relative w-full h-44 bg-[#131f24] rounded-2xl border-2 border-dashed border-[#1899d6] flex items-center justify-center mb-6">
              <div className="h-28 w-28 rounded-full border-4 border-dashed border-[#1cb0f6] flex items-center justify-center bg-[#18262d]">
                <span className="text-4xl text-[#1cb0f6] font-light">+</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <h1 className="text-2xl font-black text-white">
                {userProgress?.userName || "Vishnuvardhan Donthoji"}
              </h1>
              <p className="text-sm text-[#8496a0] font-bold">
                @Vishnuvard52446
              </p>
              <p className="text-sm text-[#8496a0] font-medium pt-1">
                Joined August 2026
              </p>
              <div className="flex items-center justify-between pt-3 text-sm font-black text-[#1cb0f6]">
                <div className="flex gap-x-4">
                  <span>0 Following</span>
                  <span>0 Followers</span>
                </div>
                <span className="text-lg">🇺🇸</span>
              </div>
            </div>
          </div>

          {/* Statistics Grid matching Photo 4 */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-white">Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="border-2 border-[#202f36] bg-[#18262d] rounded-2xl p-4 flex items-center gap-x-4">
                <Flame className="h-8 w-8 text-[#52656d]" />
                <div>
                  <p className="text-lg font-black text-white">{userProgress?.streak || 0}</p>
                  <p className="text-xs text-[#8496a0] font-extrabold">Day streak</p>
                </div>
              </div>
              <div className="border-2 border-[#202f36] bg-[#18262d] rounded-2xl p-4 flex items-center gap-x-4">
                <Zap className="h-8 w-8 text-[#ffd900] fill-[#ffd900]" />
                <div>
                  <p className="text-lg font-black text-white">{userProgress?.points || 0}</p>
                  <p className="text-xs text-[#8496a0] font-extrabold">Total XP</p>
                </div>
              </div>
              <div className="border-2 border-[#202f36] bg-[#18262d] rounded-2xl p-4 flex items-center gap-x-4">
                <Shield className="h-8 w-8 text-[#52656d]" />
                <div>
                  <p className="text-lg font-black text-white">None</p>
                  <p className="text-xs text-[#8496a0] font-extrabold">Current league</p>
                </div>
              </div>
              <div className="border-2 border-[#202f36] bg-[#18262d] rounded-2xl p-4 flex items-center gap-x-4">
                <Trophy className="h-8 w-8 text-[#52656d]" />
                <div>
                  <p className="text-lg font-black text-white">0</p>
                  <p className="text-xs text-[#8496a0] font-extrabold">Top 3 finishes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements Section matching Photo 4 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-white">Achievements</h2>
              <button className="text-xs font-extrabold uppercase tracking-wide text-[#1cb0f6]">
                VIEW ALL
              </button>
            </div>
            <div className="border-2 border-[#202f36] bg-[#18262d] rounded-2xl p-4 flex items-center gap-x-4">
              <div className="h-12 w-12 bg-amber-500/20 border border-amber-500/40 rounded-2xl flex items-center justify-center shrink-0 text-xl">
                🔥
              </div>
              <div className="flex-1">
                <p className="text-white font-extrabold text-base">Wildfire</p>
                <div className="w-full bg-[#202f36] h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[#ffd900] h-full w-0" />
                </div>
              </div>
              <span className="text-xs font-black text-[#8496a0]">0/3</span>
            </div>
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default ProfilePage;
