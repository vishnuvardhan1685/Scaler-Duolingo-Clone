"use client";

import { toast } from "sonner";
import Image from "next/image";
import { useTransition } from "react";
import { Snowflake, InfinityIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { POINTS_TO_REFILL } from "@/constants";
import { refillHearts } from "@/actions/user-progress";

type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

export const Items = ({
  hearts,
  points,
  hasActiveSubscription,
}: Props) => {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL) {
      return;
    }
    startTransition(() => {
      refillHearts().catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <div className="w-full space-y-10">
      {/* Start a family plan Top Banner matching Photo 3 */}
      <div className="relative w-full rounded-3xl bg-gradient-to-r from-[#18262d] via-[#1d1b4b] to-[#4a1d6d] p-6 border-2 border-[#202f36] text-white flex flex-col justify-between min-h-[160px] overflow-hidden shadow-xl">
        <div className="max-w-[340px] space-y-2 z-10">
          <h2 className="text-2xl font-black tracking-tight">Start a family plan!</h2>
          <p className="text-sm font-semibold text-[#8496a0]">
            Save on Super Duolingo when you learn with friends
          </p>
          <div className="pt-2">
            <Button className="bg-white text-black font-extrabold rounded-2xl hover:bg-slate-200 px-6 py-2.5 uppercase text-xs tracking-wider">
              LEARN MORE
            </Button>
          </div>
        </div>
        <div className="absolute right-4 bottom-2 w-48 h-36 opacity-90">
          <Image src="/hero.svg" alt="Family Plan Characters" fill className="object-contain" />
        </div>
      </div>

      {/* Hearts Section matching Photo 3 */}
      <div className="space-y-4">
        <h2 className="text-2xl font-black text-white">Hearts</h2>
        <div className="w-full h-0.5 bg-[#202f36] rounded-full" />
        
        {/* Refill Hearts */}
        <div className="flex items-center w-full py-4 gap-x-5">
          <div className="h-16 w-16 rounded-2xl border-2 border-[#202f36] bg-[#18262d] flex items-center justify-center shrink-0">
            <Image src="/heart.svg" alt="Heart" height={40} width={40} />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-white text-lg font-black">
              Refill Hearts
            </p>
            <p className="text-sm text-[#8496a0] font-medium leading-snug max-w-sm">
              Get full hearts so you can worry less about making mistakes in a lesson
            </p>
          </div>
          <Button
            onClick={onRefillHearts}
            disabled={hearts === 5}
            variant="ghost"
            className="border-2 border-[#202f36] bg-[#131f24] text-[#52656d] font-black uppercase rounded-2xl px-6 py-2.5 min-w-[100px]"
          >
            {hearts === 5 ? "FULL" : "REFILL"}
          </Button>
        </div>

        {/* Unlimited Hearts */}
        <div className="flex items-center w-full py-4 gap-x-5">
          <div className="h-16 w-16 rounded-2xl border-2 border-[#be52f2] bg-gradient-to-tr from-[#1cb0f6] to-[#ce82ff] flex items-center justify-center shrink-0 shadow-lg">
            <InfinityIcon className="h-10 w-10 text-white stroke-[3]" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-white text-lg font-black">
              Unlimited Hearts
            </p>
            <p className="text-sm text-[#8496a0] font-medium leading-snug max-w-sm">
              Never run out of hearts with Super!
            </p>
          </div>
          <Button
            variant="super"
            className="font-black uppercase text-xs tracking-wider rounded-2xl px-6 py-2.5 min-w-[120px]"
          >
            FREE TRIAL
          </Button>
        </div>
      </div>

      {/* Power-Ups Section matching Photo 3 */}
      <div className="space-y-4 pt-4">
        <h2 className="text-2xl font-black text-white">Power-Ups</h2>
        <div className="w-full h-0.5 bg-[#202f36] rounded-full" />

        {/* Streak Freeze */}
        <div className="flex items-center w-full py-4 gap-x-5">
          <div className="h-16 w-16 rounded-2xl border-2 border-[#202f36] bg-[#18262d] flex items-center justify-center shrink-0">
            <Snowflake className="h-10 w-10 text-[#1cb0f6] fill-[#1cb0f6]/20 stroke-[2.5]" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-x-3">
              <p className="text-white text-lg font-black">
                Streak Freeze
              </p>
              <span className="bg-[#202f36] text-[#8496a0] text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                0 / 2 EQUIPPED
              </span>
            </div>
            <p className="text-sm text-[#8496a0] font-medium leading-snug max-w-sm">
              Streak Freeze allows your streak to remain in place for one full day of inactivity.
            </p>
          </div>
          <Button
            variant="ghost"
            className="border-2 border-[#1899d6] bg-[#18262d] text-[#1cb0f6] hover:bg-[#18313d] font-black uppercase text-xs tracking-wider rounded-2xl px-5 py-2.5 flex items-center gap-x-2 min-w-[130px]"
          >
            <span>GET FOR:</span>
            <span>💎 200</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
