import Image from "next/image";
import { Flame, Gem, Heart, Trophy } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

type Props = {
  streak: number;
  points: number;
  hearts: number;
  gems: number;
  dailyXp?: number;
  dailyGoalXp?: number;
};

const Stat = ({
  icon,
  label,
  value,
  className,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
  className?: string;
}) => {
  return (
    <div className={`flex items-center gap-2 rounded-2xl border-2 bg-white px-4 py-2 shadow-sm ${className ?? ""}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600">
        {icon}
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[10px] uppercase tracking-wide text-slate-400">{label}</span>
        <span className="text-sm font-extrabold text-slate-700">{value}</span>
      </div>
    </div>
  );
};

export const TopStats = ({ streak, points, hearts, gems, dailyXp = 0, dailyGoalXp = 50 }: Props) => {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3 rounded-3xl border-2 border-slate-200 bg-gradient-to-r from-white via-slate-50 to-green-50 p-3">
      <div className="flex items-center gap-2 rounded-2xl bg-green-500 px-4 py-2 text-white shadow-sm">
        <Image src="/mascot.svg" alt="Lingo" width={28} height={28} />
        <span className="text-sm font-extrabold uppercase tracking-wide">Lingo</span>
      </div>
      <Stat icon={<Flame className="h-4 w-4" />} label="Streak" value={streak} />
      <Stat icon={<Trophy className="h-4 w-4" />} label="XP" value={points} />
      <Stat icon={<Heart className="h-4 w-4" />} label="Hearts" value={hearts} />
      <Stat icon={<Gem className="h-4 w-4" />} label="Gems" value={gems} />
      <div className="min-w-[150px] rounded-2xl border-2 bg-white px-3 py-2">
        <div className="flex justify-between text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
          <span>Daily goal</span><span>{Math.min(dailyXp, dailyGoalXp)}/{dailyGoalXp} XP</span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-amber-400 transition-all" style={{ width: `${Math.min(100, (dailyXp / dailyGoalXp) * 100)}%` }} />
        </div>
      </div>
      <Button variant="ghost" size="sm" asChild className="ml-auto hidden md:inline-flex">
        <a href="/profile">Profile</a>
      </Button>
    </div>
  );
};
