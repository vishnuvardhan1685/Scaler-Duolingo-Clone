"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, ChevronRight, UserPlus } from "lucide-react";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { useInviteModal } from "@/store/use-invite-modal";

export default function UserSearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { open } = useInviteModal();

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={{ id: 1, title: "Spanish", imageSrc: "/es.svg" }}
          hearts={5}
          points={150}
          hasActiveSubscription={false}
        />

        {/* Other ways to connect Right Sidebar Card matching Screenshot 2 */}
        <div className="space-y-3 mt-6">
          <h3 className="font-extrabold text-base text-white">Other ways to connect</h3>
          <div
            onClick={open}
            className="border-2 border-[#202f36] bg-[#18262d] hover:bg-[#202f36] rounded-3xl p-4 cursor-pointer transition flex items-center justify-between shadow-xl"
          >
            <div className="flex items-center gap-x-3">
              <div className="h-10 w-10 rounded-2xl bg-[#58cc02]/20 border border-[#58cc02] flex items-center justify-center shrink-0 text-xl">
                ✉️
              </div>
              <div>
                <p className="font-black text-sm text-white">Invite friends</p>
                <p className="text-[11px] text-[#8496a0] font-semibold leading-tight max-w-[180px]">
                  Tell your friends it&apos;s free and fun to learn a language on Duolingo!
                </p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-[#8496a0] shrink-0" />
          </div>
        </div>
      </StickyWrapper>

      <FeedWrapper>
        <div className="space-y-6 pt-2">
          <h1 className="text-2xl lg:text-3xl font-black text-white">
            Search for friends
          </h1>

          {/* Search Input Bar matching Screenshot 2 */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8496a0]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Name or username"
              className="w-full bg-[#18262d] border-2 border-[#202f36] focus:border-[#1cb0f6] rounded-2xl py-3.5 pl-12 pr-4 text-white font-bold text-sm outline-none transition placeholder:text-[#8496a0]"
            />
          </div>

          <div className="w-full h-0.5 bg-[#202f36] my-6" />

          {/* Center Characters Illustration matching Screenshot 2 */}
          <div className="flex flex-col items-center justify-center pt-8 text-center space-y-6">
            <div className="relative w-72 h-52 mx-auto">
              <Image src="/hero.svg" alt="Friends Characters" fill className="object-contain" />
            </div>
            <p className="text-white font-extrabold text-base max-w-sm leading-snug">
              Learning is more fun and effective when you connect with others.
            </p>
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
}
