import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Promo = () => {
  return (
    <div className="space-y-4">
      {/* Unlock Leaderboards Card */}
      <div className="border-2 border-[#202f36] bg-[#18262d] rounded-2xl p-4 space-y-4">
        <h3 className="font-bold text-lg text-white">
          Unlock Leaderboards!
        </h3>
        <div className="flex items-center gap-x-4">
          <div className="h-14 w-14 rounded-2xl bg-[#202f36] flex items-center justify-center border border-[#37464f] shrink-0">
            <Lock className="h-7 w-7 text-[#8496a0]" />
          </div>
          <p className="text-sm text-[#8496a0] font-medium leading-snug">
            Complete 3 more lessons to start competing
          </p>
        </div>
      </div>

      {/* Create Profile Card */}
      <div className="border-2 border-[#202f36] bg-[#18262d] rounded-2xl p-5 space-y-4">
        <h3 className="font-bold text-lg text-white">
          Create a profile to save your progress!
        </h3>
        <div className="space-y-3">
          <Button
            asChild
            variant="secondary"
            className="w-full h-12 text-sm uppercase tracking-wide font-extrabold"
          >
            <Link href="/profile">
              CREATE A PROFILE
            </Link>
          </Button>
          <Button
            asChild
            variant="primary"
            className="w-full h-12 text-sm uppercase tracking-wide font-extrabold"
          >
            <Link href="/sign-in">
              SIGN IN
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
