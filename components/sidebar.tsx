"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ClerkLoading,
  ClerkLoaded,
  UserButton,
} from "@clerk/nextjs";
import { Loader, MoreHorizontal, Settings, HelpCircle, LogOut, Globe } from "lucide-react";

import { cn } from "@/lib/utils";
import { SidebarItem } from "./sidebar-item";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  const [moreOpen, setMoreOpen] = useState(false);

  const clerkConfigured =
    Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) &&
    Boolean(process.env.CLERK_SECRET_KEY);

  return (
    <div className={cn(
      "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 border-[#202f36] bg-[#131f24] flex-col z-40",
      className,
    )}>
      <Link href="/learn">
        <div className="pt-7 pl-4 pb-6 flex items-center gap-x-3">
          <h1 className="text-3xl font-black text-[#58cc02] tracking-tighter lowercase">
            duolingo
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1 relative">
        <SidebarItem 
          label="LEARN" 
          href="/learn"
          iconSrc="/learn.svg"
        />
        <SidebarItem 
          label="SOUNDS" 
          href="/courses"
          iconSrc="/learn.svg"
        />
        <SidebarItem 
          label="LEADERBOARDS" 
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
        />
        <SidebarItem 
          label="QUESTS" 
          href="/quests"
          iconSrc="/quests.svg"
        />
        <SidebarItem 
          label="SHOP" 
          href="/shop"
          iconSrc="/shop.svg"
        />
        <SidebarItem 
          label="PROFILE" 
          href="/profile"
          iconSrc="/mascot.svg"
        />

        {/* MORE Button with Popover Popup matching Screenshot 5 */}
        <div className="relative">
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className="w-full flex items-center justify-start h-[52px] px-4 rounded-2xl font-black text-sm uppercase tracking-wide text-[#8496a0] border-2 border-transparent hover:bg-[#202f36]/60 hover:text-white transition"
          >
            <div className="h-8 w-8 rounded-full bg-[#ce82ff] flex items-center justify-center mr-5 text-white shrink-0">
              <MoreHorizontal className="h-5 w-5" />
            </div>
            MORE
          </button>

          {moreOpen && (
            <div className="absolute left-0 bottom-14 w-64 bg-[#18262d] border-2 border-[#202f36] rounded-3xl p-3 shadow-2xl z-50 flex flex-col gap-y-1">
              <Link
                href="/settings"
                onClick={() => setMoreOpen(false)}
                className="flex items-center gap-x-3 p-3 rounded-2xl hover:bg-[#202f36] text-white font-extrabold text-xs uppercase tracking-wider"
              >
                <div className="h-7 w-7 rounded-lg bg-[#58cc02] flex items-center justify-center text-white">
                  🦉
                </div>
                DUOLINGO ENGLISH TEST
              </Link>
              <Link
                href="/settings"
                onClick={() => setMoreOpen(false)}
                className="flex items-center gap-x-3 p-3 rounded-2xl hover:bg-[#202f36] text-white font-extrabold text-xs uppercase tracking-wider"
              >
                <div className="h-7 w-7 rounded-lg bg-[#1cb0f6] flex items-center justify-center text-white">
                  <Globe className="h-4 w-4" />
                </div>
                SCHOOLS
              </Link>
              <div className="w-full h-0.5 bg-[#202f36] my-1" />
              <Link
                href="/settings"
                onClick={() => setMoreOpen(false)}
                className="flex items-center gap-x-3 p-3 rounded-2xl hover:bg-[#202f36] text-[#8496a0] hover:text-white font-extrabold text-xs uppercase tracking-wider"
              >
                <Settings className="h-4 w-4 text-[#8496a0]" />
                SETTINGS
              </Link>
              <Link
                href="/settings"
                onClick={() => setMoreOpen(false)}
                className="flex items-center gap-x-3 p-3 rounded-2xl hover:bg-[#202f36] text-[#8496a0] hover:text-white font-extrabold text-xs uppercase tracking-wider"
              >
                <HelpCircle className="h-4 w-4 text-[#8496a0]" />
                HELP
              </Link>
              <Link
                href="/learn"
                onClick={() => setMoreOpen(false)}
                className="flex items-center gap-x-3 p-3 rounded-2xl hover:bg-[#202f36] text-[#1cb0f6] font-extrabold text-xs uppercase tracking-wider"
              >
                <LogOut className="h-4 w-4 text-[#1cb0f6]" />
                LOG OUT
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        {clerkConfigured ? (
          <>
            <ClerkLoading>
              <Loader className="h-5 w-5 text-[#8496a0] animate-spin" />
            </ClerkLoading>
            <ClerkLoaded>
              <UserButton afterSignOutUrl="/" />
            </ClerkLoaded>
          </>
        ) : (
          <Link href="/" className="text-sm font-bold text-[#1cb0f6] uppercase tracking-wide">
            Home
          </Link>
        )}
      </div>
    </div>
  );
};
