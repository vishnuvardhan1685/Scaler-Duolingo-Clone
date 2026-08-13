"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, UserPlus, ChevronRight } from "lucide-react";

import { useInviteModal } from "@/store/use-invite-modal";
import { InviteFriendsModal } from "@/components/modals/invite-friends-modal";

export const ProfileSidebarTabs = () => {
  const [activeTab, setActiveTab] = useState<"following" | "followers">(
    "following"
  );

  const { open } = useInviteModal();

  return (
    <>
      {/* Following / Followers */}
      <div className="border-2 border-[#202f36] bg-[#18262d] rounded-3xl p-5 space-y-4 shadow-xl">
        <div className="flex items-center border-b-2 border-[#202f36] text-xs font-black uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setActiveTab("following")}
            className={`pb-3 flex-1 text-center font-extrabold transition ${
              activeTab === "following"
                ? "text-[#1cb0f6] border-b-2 border-[#1cb0f6]"
                : "text-[#8496a0] hover:text-white"
            }`}
          >
            FOLLOWING
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("followers")}
            className={`pb-3 flex-1 text-center font-extrabold transition ${
              activeTab === "followers"
                ? "text-[#1cb0f6] border-b-2 border-[#1cb0f6]"
                : "text-[#8496a0] hover:text-white"
            }`}
          >
            FOLLOWERS
          </button>
        </div>

        {activeTab === "following" ? (
          <div className="py-4 text-center space-y-3">
            <div className="relative w-full h-32 mx-auto">
              <Image
                src="/hero.svg"
                alt="Friends Characters"
                fill
                className="object-contain"
              />
            </div>

            <p className="text-white text-sm font-bold leading-snug px-2">
              Learning is more fun and effective when you connect with others.
            </p>
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-white font-extrabold text-base">
              No followers yet
            </p>
          </div>
        )}
      </div>

      {/* Add Friends */}
      <div className="border-2 border-[#202f36] bg-[#18262d] rounded-3xl p-5 space-y-3 shadow-xl mt-6">
        <h3 className="font-extrabold text-base text-white">
          Add friends
        </h3>

        <div className="space-y-2 pt-1">
          {/* Find friends */}
          <Link href="/user-search" className="block">
            <div className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#131f24] border border-[#202f36] hover:bg-[#202f36] transition text-white text-sm font-extrabold cursor-pointer">
              <div className="flex items-center gap-x-3">
                <Search className="h-5 w-5 text-[#1cb0f6]" />
                <span>Find friends</span>
              </div>

              <ChevronRight className="h-5 w-5 text-[#8496a0]" />
            </div>
          </Link>

          {/* Invite friends */}
          <button
            type="button"
            onClick={open}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-[#131f24] border border-[#202f36] hover:bg-[#202f36] transition text-white text-sm font-extrabold cursor-pointer text-left"
          >
            <div className="flex items-center gap-x-3">
              <UserPlus className="h-5 w-5 text-[#58cc02]" />
              <span>Invite friends</span>
            </div>

            <ChevronRight className="h-5 w-5 text-[#8496a0]" />
          </button>
        </div>
      </div>

      {/* Invite Modal */}
      <InviteFriendsModal />
    </>
  );
};