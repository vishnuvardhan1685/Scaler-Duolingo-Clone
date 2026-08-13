import Image from "next/image";

type Props = {
  question: string;
};

export const QuestionBubble = ({ question }: Props) => {
  return (
    <div className="flex items-center gap-x-4 mb-6">
      <Image
        src="/mascot.svg"
        alt="Mascot"
        height={60}
        width={60}
        className="hidden lg:block"
      />
      <Image
        src="/mascot.svg"
        alt="Mascot"
        height={40}
        width={40}
        className="block lg:hidden"
      />
      <div className="relative py-3 px-5 border-2 border-[#202f36] bg-[#18262d] text-white rounded-2xl text-sm lg:text-base font-extrabold shadow-sm">
        {question}
        <div
          className="absolute -left-3 top-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-[#202f36] transform -translate-y-1/2 -rotate-90"
        />
      </div>
    </div>
  );
};
