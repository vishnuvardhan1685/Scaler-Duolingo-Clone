"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, Crown, LockKeyhole, Star, Dumbbell, Trophy } from "lucide-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import "react-circular-progressbar/dist/styles.css";

type Props = {
  id: number;
  title: string;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
};

export const LessonButton = ({
  id,
  title,
  index,
  totalCount,
  locked,
  current,
  percentage
}: Props) => {
  const cycleLength = 8;
  const cycleIndex = index % cycleLength;

  let indentationLevel;

  if (cycleIndex <= 2) {
    indentationLevel = cycleIndex;
  } else if (cycleIndex <= 4) {
    indentationLevel = 4 - cycleIndex;
  } else if (cycleIndex <= 6) {
    indentationLevel = 4 - cycleIndex;
  } else {
    indentationLevel = cycleIndex - 8;
  }

  const rightPosition = indentationLevel * 40;

  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = !current && !locked;

  // Icons matching Photo 1: Crown for active node, Check for completed, Star/Dumbbell/Trophy for locked
  const Icon = current ? Crown : isCompleted ? Check : (index % 3 === 1 ? Dumbbell : index % 3 === 2 ? Trophy : Star);

  const href = isCompleted ? `/lesson/${id}` : "/lesson";

  return (
    <Link href={href} aria-disabled={locked} style={{ pointerEvents: locked ? "none" : "auto" }}>
      <div
        className="relative"
        style={{
          right: `${rightPosition}px`,
          marginTop: isFirst && !isCompleted ? 60 : 32,
        }}
      >
        <div className="relative z-10 flex flex-col items-center">
          {/* Green Mascot Head on the right of active node matching Photo 1 */}
          {current && (
            <div className="absolute left-[85px] top-3 flex items-center z-20">
              <div className="relative h-16 w-16 bg-[#387e14] rounded-2xl p-1 border-2 border-[#58cc02] shadow-xl flex items-center justify-center">
                <Image src="/mascot.svg" alt="Duo Mascot Head" width={48} height={48} className="object-contain" />
              </div>
            </div>
          )}

          {current ? (
            <div className="h-[98px] w-[98px] relative flex items-center justify-center">
              {/* START Speech Bubble Badge matching Photo 1 */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3.5 py-1 border-2 border-[#37464f] font-black uppercase text-[11px] text-white bg-[#202f36] rounded-xl tracking-wider shadow-xl z-30 flex flex-col items-center">
                START
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-[#202f36]" />
              </div>

              <CircularProgressbarWithChildren
                value={Number.isNaN(percentage) ? 25 : percentage}
                styles={{
                  path: {
                    stroke: "#58cc02",
                    strokeWidth: 9,
                  },
                  trail: {
                    stroke: "#202f36",
                    strokeWidth: 9,
                  },
                }}
              >
                <Button
                  size="rounded"
                  variant="secondary"
                  className="h-[74px] w-[74px] border-b-8 border-[#46a302] bg-[#58cc02] hover:bg-[#58cc02]/90 shadow-xl"
                >
                  <Icon className="h-9 w-9 fill-white text-white" />
                </Button>
              </CircularProgressbarWithChildren>
            </div>
          ) : isCompleted ? (
            /* Completed Green Node matching Photo 1 */
            <Button
              size="rounded"
              variant="secondary"
              className="h-[74px] w-[74px] border-b-8 border-[#46a302] bg-[#58cc02] hover:bg-[#58cc02]/90 shadow-md"
            >
              <Check className="h-9 w-9 text-white stroke-[4]" />
            </Button>
          ) : (
            /* Locked Dark Node matching Photo 1 */
            <Button
              size="rounded"
              variant="locked"
              className="h-[70px] w-[70px] border-b-8 border-[#18262d] bg-[#202f36] text-[#52656d] shadow-md"
            >
              <Icon className="h-8 w-8 fill-[#52656d] text-[#52656d] stroke-[#52656d]" />
            </Button>
          )}

          {/* Node label badge matching Photo 1 */}
          <div className={cn(
            "mt-2.5 px-3 py-1 rounded-xl text-center text-xs font-extrabold shadow-sm border",
            locked 
              ? "bg-[#18262d] text-[#52656d] border-[#202f36]" 
              : current 
              ? "bg-[#18262d] text-[#58cc02] border-2 border-[#58cc02]" 
              : "bg-[#18262d] text-[#8496a0] border-[#202f36]"
          )}>
            <p>{title}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
