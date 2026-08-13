"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { InfinityIcon, Plus, Check } from "lucide-react";

import { courses } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { useLanguageStore, LANGUAGES } from "@/store/use-language-store";
import { useProgressStore } from "@/store/use-progress-store";

type Props = {
  activeCourse: typeof courses.$inferSelect;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

export const UserProgress = ({ 
  activeCourse, 
  points, 
  hearts, 
  hasActiveSubscription
}: Props) => {
  const { currentLanguage, setLanguage } = useLanguageStore();
  const { xp } = useProgressStore();
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <div className="flex items-center justify-between gap-x-2 w-full pt-1 pb-4 relative z-30">
      {/* Flag Button with Popover matching latest screenshot */}
      <div className="relative">
        <button
          onClick={() => setPopoverOpen(!popoverOpen)}
          className="p-1 hover:bg-[#202f36] rounded-2xl transition flex items-center justify-center border-2 border-[#202f36] bg-[#18262d] w-12 h-10 shadow-md"
        >
          <div className="w-8 h-6 flex items-center justify-center rounded overflow-hidden">
            {currentLanguage?.flagEmoji ? (
              <span className="text-lg">{currentLanguage.flagEmoji}</span>
            ) : (
              <span className="text-lg">🇪🇸</span>
            )}
          </div>
        </button>

        {popoverOpen && (
          <div className="absolute top-12 left-0 w-64 bg-[#18262d] border-2 border-[#202f36] rounded-3xl p-3 shadow-2xl z-50 flex flex-col gap-y-2">
            <div className="px-2 pt-1 pb-0.5 text-[10px] font-black uppercase text-[#8496a0] tracking-wider">
              MY COURSES
            </div>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang);
                  setPopoverOpen(false);
                }}
                className={`flex items-center justify-between p-2.5 rounded-2xl text-sm font-extrabold border-2 transition ${
                  currentLanguage.code === lang.code
                    ? "bg-[#18313d] border-[#1899d6] text-[#1cb0f6]"
                    : "bg-[#131f24] border-[#202f36] text-white hover:bg-[#202f36]"
                }`}
              >
                <div className="flex items-center gap-x-3">
                  <span className="text-xl">{lang.flagEmoji}</span>
                  <span>{lang.name}</span>
                </div>
                {currentLanguage.code === lang.code && (
                  <Check className="h-4 w-4 text-[#1cb0f6] stroke-[3]" />
                )}
              </button>
            ))}
            <Link
              href="/courses"
              onClick={() => setPopoverOpen(false)}
              className="flex items-center gap-x-3 p-2.5 rounded-2xl border-2 border-[#202f36] bg-[#131f24] hover:bg-[#202f36] text-white font-extrabold text-sm transition mt-1"
            >
              <div className="h-6 w-6 rounded-lg border-2 border-[#202f36] flex items-center justify-center text-[#8496a0]">
                <Plus className="h-4 w-4" />
              </div>
              <span>Add a new course</span>
            </Link>
          </div>
        )}
      </div>

      <Link href="/shop">
        <Button variant="ghost" className="text-[#52656d] hover:bg-[#202f36] font-bold text-sm px-2 gap-x-2">
          <Image src="/points.svg" height={22} width={22} alt="Streak" className="grayscale opacity-60" />
          <span>0</span>
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-[#1cb0f6] hover:bg-[#202f36] font-bold text-sm px-2 gap-x-2">
          <Image src="/points.svg" height={22} width={22} alt="Gems" className="hue-rotate-180" />
          <span>{xp || points || 150}</span>
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-[#ff4b4b] hover:bg-[#202f36] font-bold text-sm px-2 gap-x-2">
          <Image src="/heart.svg" height={22} width={22} alt="Hearts" />
          <span>
            {hasActiveSubscription 
              ? <InfinityIcon className="h-4 w-4 stroke-[3]" /> 
              : hearts
            }
          </span>
        </Button>
      </Link>
    </div>
  );
};
