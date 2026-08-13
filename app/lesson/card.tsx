import Image from "next/image";
import { useCallback } from "react";
import { useAudio, useKey } from "react-use";

import { cn } from "@/lib/utils";
import { challenges } from "@/db/schema";

type Props = {
  id: string;
  imageSrc: string | null;
  audioSrc: string | null;
  text: string;
  shortcut: string;
  selected?: boolean;
  onClick: () => void;
  disabled?: boolean;
  status?: "correct" | "wrong" | "none",
  type: typeof challenges.$inferSelect["type"];
};

export const Card = ({
  id,
  imageSrc,
  audioSrc,
  text,
  shortcut,
  selected,
  onClick,
  status,
  disabled,
  type,
}: Props) => {
  const [audio, _, controls] = useAudio({ src: audioSrc || "" });

  const handleClick = useCallback(() => {
    if (disabled) return;

    controls.play();
    onClick();
  }, [disabled, onClick, controls]);

  useKey(shortcut, handleClick, {}, [handleClick]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "h-full border-2 border-[#202f36] bg-[#18262d] text-white rounded-2xl border-b-4 hover:bg-[#202f36] p-4 lg:p-6 cursor-pointer active:border-b-2 transition-all",
        selected && "border-[#1899d6] bg-[#18313d] text-[#1cb0f6]",
        selected && status === "correct" 
          && "border-[#46a302] bg-[#132d18] text-[#58cc02]",
        selected && status === "wrong" 
          && "border-[#ea2b2b] bg-[#2d1818] text-[#ff4b4b]",
        disabled && "pointer-events-none opacity-50",
        type === "ASSIST" && "lg:p-3 w-full"
      )}
    >
      {audio}
      {imageSrc && (
        <div
          className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full"
        >
          <Image src={imageSrc} fill alt={text} className="object-contain" />
        </div>
      )}
      <div className={cn(
        "flex items-center justify-between",
        type === "ASSIST" && "flex-row-reverse",
      )}>
        {type === "ASSIST" && <div />}
        <p className={cn(
          "text-white text-sm lg:text-base font-bold",
          selected && "text-[#1cb0f6]",
          selected && status === "correct" 
            && "text-[#58cc02]",
          selected && status === "wrong" 
            && "text-[#ff4b4b]",
        )}>
          {text}
        </p>
        <div className={cn(
          "lg:w-[30px] lg:h-[30px] w-[20px] h-[20px] border-2 border-[#202f36] flex items-center justify-center rounded-lg text-[#8496a0] lg:text-[15px] text-xs font-bold",
          selected && "border-[#1899d6] text-[#1cb0f6] bg-[#18313d]",
          selected && status === "correct" 
            && "border-[#46a302] text-[#58cc02] bg-[#132d18]",
          selected && status === "wrong" 
            && "border-[#ea2b2b] text-[#ff4b4b] bg-[#2d1818]",
        )}>
          {shortcut}
        </div>
      </div>
    </div>
  );
};
