import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

type Props = {
  points: number;
};

export const Quests = ({ points }: Props) => {
  return (
    <div className="space-y-6">
      <div className="border-2 border-[#202f36] bg-[#18262d] rounded-2xl p-4 space-y-4">
        <div className="flex items-center justify-between w-full">
          <h3 className="font-bold text-lg text-white">
            Daily Quests
          </h3>
          <Link href="/quests">
            <Button
              size="sm"
              variant="ghost"
              className="text-[#1cb0f6] font-bold text-xs uppercase tracking-wide hover:bg-[#202f36] p-0 h-auto"
            >
              VIEW ALL
            </Button>
          </Link>
        </div>
        <div className="flex items-center w-full gap-x-4">
          <div className="h-10 w-10 flex items-center justify-center shrink-0">
            <Zap className="h-9 w-9 text-[#ffd900] fill-[#ffd900]" />
          </div>
          <div className="flex flex-col gap-y-1.5 w-full">
            <p className="text-white text-sm font-bold">
              Earn 10 XP
            </p>
            <div className="relative h-4 w-full bg-[#202f36] rounded-full overflow-hidden flex items-center px-3 justify-between">
              <div 
                className="absolute left-0 top-0 h-full bg-[#ffd900] transition-all rounded-full" 
                style={{ width: `${Math.min(100, (points / 10) * 100)}%` }} 
              />
              <span className="relative z-10 text-[10px] font-extrabold text-[#8496a0]">
                {points} / 10
              </span>
              <span className="relative z-10 text-xs">🎁</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links matching screenshot */}
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-[11px] font-bold uppercase tracking-wider text-[#52656d] px-2 text-center">
        <Link href="/about" className="hover:text-white transition">ABOUT</Link>
        <Link href="/blog" className="hover:text-white transition">BLOG</Link>
        <Link href="/store" className="hover:text-white transition">STORE</Link>
        <Link href="/efficacy" className="hover:text-white transition">EFFICACY</Link>
        <Link href="/careers" className="hover:text-white transition">CAREERS</Link>
        <Link href="/investors" className="hover:text-white transition">INVESTORS</Link>
        <Link href="/terms" className="hover:text-white transition">TERMS</Link>
        <Link href="/privacy" className="hover:text-white transition">PRIVACY</Link>
      </div>
    </div>
  );
};
