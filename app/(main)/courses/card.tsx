import Image from "next/image";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  title: string;
  id: number;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  active?: boolean;
};

export const Card = ({
  title,
  id,
  imageSrc,
  disabled,
  onClick,
  active,
}: Props) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "h-full border-2 border-[#202f36] bg-[#18262d] text-white rounded-2xl border-b-4 hover:bg-[#202f36] cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] min-w-[200px] transition-all",
        active && "border-[#1899d6] bg-[#18313d]",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      <div className="min-h-[24px] w-full flex items-center justify-end">
        {active && (
          <div className="rounded-md bg-[#58cc02] flex items-center justify-center p-1.5">
            <Check className="text-white stroke-[4] h-4 w-4" />
          </div>
        )}
      </div>
      <Image
        src={imageSrc}
        alt={title}
        height={70}
        width={93.33}
        className="rounded-lg drop-shadow-md border border-[#202f36] object-cover"
      />
      <p className="text-white text-center font-black mt-3">
        {title}
      </p>
    </div>
  );
};
