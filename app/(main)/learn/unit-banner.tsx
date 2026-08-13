"use client";

import { ArrowLeft, NotebookText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGuidebookModal } from "@/store/use-guidebook-modal";

type Props = {
  title: string;
  description: string;
  order?: number;
};

export const UnitBanner = ({
  title,
  description,
  order = 1,
}: Props) => {
  const { open } = useGuidebookModal();
  const isPurple = order % 2 === 0;

  return (
    <div className={`w-full rounded-2xl p-5 text-white flex items-center justify-between shadow-md relative overflow-hidden border-b-4 ${
      isPurple ? "bg-[#ce82ff] border-[#be52f2]" : "bg-[#58cc02] border-[#46a302]"
    }`}>
      <div className="space-y-1 z-10">
        <div className="flex items-center gap-x-2 text-xs font-black uppercase tracking-wider text-white/90">
          <ArrowLeft className="h-4 w-4 stroke-[3]" />
          <span>SECTION 1, UNIT {order}</span>
        </div>
        <h3 className="text-2xl font-black tracking-wide pt-0.5">
          {description || title}
        </h3>
      </div>
      <Button
        onClick={() => open(`SECTION 1, UNIT ${order}`)}
        size="sm"
        variant="ghost"
        className="z-10 border-2 border-white/40 bg-white/15 hover:bg-white/25 text-white rounded-xl px-4 py-2 text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 h-10"
      >
        <NotebookText className="h-4 w-4" />
        GUIDEBOOK
      </Button>
    </div>
  );
};
