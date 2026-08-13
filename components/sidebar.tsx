import Link from "next/link";
import Image from "next/image";
import {
  ClerkLoading,
  ClerkLoaded,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { Settings } from "lucide-react";

import { cn } from "@/lib/utils";

import { SidebarItem } from "./sidebar-item";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  const clerkConfigured =
    Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) &&
    Boolean(process.env.CLERK_SECRET_KEY);

  return (
    <div className={cn(
      "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
      className,
    )}>
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/mascot.svg" height={40} width={40} alt="Mascot" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Lingo
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem 
          label="Learn" 
          href="/learn"
          iconSrc="/learn.svg"
        />
        <SidebarItem 
          label="Leaderboard" 
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
        />
        <SidebarItem 
          label="quests" 
          href="/quests"
          iconSrc="/quests.svg"
        />
        <SidebarItem 
          label="shop" 
          href="/shop"
          iconSrc="/shop.svg"
        />
        <SidebarItem 
          label="Profile" 
          href="/profile"
          iconSrc="/mascot.svg"
        />
        <Link href="/settings" className="mt-2 flex items-center gap-5 rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wide text-slate-500 hover:bg-slate-100">
          <Settings className="h-7 w-7" /> Settings
        </Link>
      </div>
      <div className="p-4">
        {clerkConfigured ? (
          <>
            <ClerkLoading>
              <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
            </ClerkLoading>
            <ClerkLoaded>
              <UserButton afterSignOutUrl="/" />
            </ClerkLoaded>
          </>
        ) : (
          <Link href="/" className="text-sm font-semibold text-green-600">
            Home
          </Link>
        )}
      </div>
    </div>
  );
};
