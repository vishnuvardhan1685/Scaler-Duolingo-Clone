"use client";

import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type SoundItem = {
  symbol: string;
  word: string;
};

const VOWELS: SoundItem[] = [
  { symbol: "α", word: "hot" },
  { symbol: "æ", word: "cat" },
  { symbol: "ʌ", word: "but" },
  { symbol: "ε", word: "bed" },
  { symbol: "eɪ", word: "say" },
  { symbol: "ɝ", word: "bird" },
  { symbol: "ɪ", word: "ship" },
  { symbol: "i", word: "sheep" },
  { symbol: "ə", word: "about" },
  { symbol: "oʊ", word: "boat" },
  { symbol: "ʊ", word: "foot" },
  { symbol: "u", word: "food" },
  { symbol: "aʊ", word: "cow" },
  { symbol: "aɪ", word: "time" },
  { symbol: "ɔɪ", word: "boy" },
];

const CONSONANTS: SoundItem[] = [
  { symbol: "b", word: "book" },
  { symbol: "tʃ", word: "chair" },
  { symbol: "d", word: "day" },
  { symbol: "f", word: "far" },
  { symbol: "g", word: "go" },
  { symbol: "h", word: "he" },
];

export const List = () => {
  const playSound = (word: string) => {
    toast.success(`Pronouncing sound for "${word}"`);
  };

  return (
    <div className="w-full flex flex-col items-center pt-2 pb-12 space-y-8">
      {/* Title & Header Area matching Screenshot 4 */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl lg:text-3xl font-black text-white">
          Let&apos;s learn English sounds!
        </h1>
        <p className="text-sm lg:text-base text-[#8496a0] font-bold">
          Train your ear and learn to pronounce English sounds
        </p>
        <div className="pt-3">
          <Link href="/lesson">
            <Button className="bg-[#1cb0f6] border-b-4 border-[#1899d6] hover:bg-[#1cb0f6]/90 text-white font-black uppercase tracking-wider text-xs rounded-2xl px-10 py-3 shadow-lg">
              START +10 XP
            </Button>
          </Link>
        </div>
      </div>

      {/* Vowels Section matching Screenshot 4 */}
      <div className="w-full space-y-4 max-w-xl">
        <div className="flex items-center gap-x-4">
          <div className="flex-1 h-0.5 bg-[#202f36]" />
          <span className="text-[#8496a0] font-extrabold text-sm uppercase tracking-wider">
            Vowels
          </span>
          <div className="flex-1 h-0.5 bg-[#202f36]" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          {VOWELS.map((item) => (
            <button
              key={item.word}
              onClick={() => playSound(item.word)}
              className="border-2 border-[#202f36] bg-[#18262d] hover:bg-[#202f36] p-4 rounded-2xl flex flex-col items-center justify-center transition hover:scale-105 active:scale-95 shadow-md"
            >
              <span className="text-xl font-black text-white">{item.symbol}</span>
              <span className="text-xs font-bold text-[#8496a0] mt-0.5">{item.word}</span>
              <div className="w-6 h-1 bg-[#37464f] rounded-full mt-2" />
            </button>
          ))}
        </div>
      </div>

      {/* Consonants Section matching Screenshot 4 */}
      <div className="w-full space-y-4 max-w-xl pt-2">
        <div className="flex items-center gap-x-4">
          <div className="flex-1 h-0.5 bg-[#202f36]" />
          <span className="text-[#8496a0] font-extrabold text-sm uppercase tracking-wider">
            Consonants
          </span>
          <div className="flex-1 h-0.5 bg-[#202f36]" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          {CONSONANTS.map((item) => (
            <button
              key={item.word}
              onClick={() => playSound(item.word)}
              className="border-2 border-[#202f36] bg-[#18262d] hover:bg-[#202f36] p-4 rounded-2xl flex flex-col items-center justify-center transition hover:scale-105 active:scale-95 shadow-md"
            >
              <span className="text-xl font-black text-white">{item.symbol}</span>
              <span className="text-xs font-bold text-[#8496a0] mt-0.5">{item.word}</span>
              <div className="w-6 h-1 bg-[#37464f] rounded-full mt-2" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
