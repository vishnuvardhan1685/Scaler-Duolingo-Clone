import Link from "next/link";
import Image from "next/image";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Promo = () => {
  return (
    <div className="space-y-4">
      {/* Try Super for Free Card matching Screenshot 4 */}
      <div className="border-2 border-[#202f36] bg-[#18262d] rounded-3xl p-5 space-y-4 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="space-y-1 max-w-[180px]">
            <span className="bg-[#ce82ff] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-lg tracking-wider">
              SUPER
            </span>
            <h3 className="font-black text-lg text-white pt-1">
              Try Super for free
            </h3>
            <p className="text-xs text-[#8496a0] font-semibold leading-relaxed">
              No ads, personalized practice, and unlimited Legendary!
            </p>
          </div>
          <div className="relative w-16 h-16 shrink-0">
            <Image src="/mascot.svg" alt="Super Owl" fill className="object-contain filter drop-shadow-md" />
          </div>
        </div>

        <Link href="/shop" className="block">
          <Button
            className="w-full bg-[#4c44e6] hover:bg-[#3b34c4] text-white font-extrabold uppercase text-xs tracking-wider rounded-2xl py-3 shadow-md"
          >
            TRY 1 WEEK FREE
          </Button>
        </Link>
      </div>

      {/* Unlock Leaderboards Card matching Screenshot 4 */}
      <div className="border-2 border-[#202f36] bg-[#18262d] rounded-3xl p-5 space-y-3 shadow-xl">
        <h3 className="font-extrabold text-white text-sm">Unlock Leaderboards!</h3>
        <div className="flex items-center gap-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#131f24] border border-[#202f36] flex items-center justify-center text-xl shrink-0">
            🛡️
          </div>
          <p className="text-xs text-[#8496a0] font-semibold flex-1">
            Complete 3 more lessons to start competing
          </p>
        </div>
      </div>
    </div>
  );
};
