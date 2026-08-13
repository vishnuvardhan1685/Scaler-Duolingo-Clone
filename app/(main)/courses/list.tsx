"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Volume2, Sparkles, Check } from "lucide-react";

import { courses, userProgress } from "@/db/schema";
import { upsertUserProgress } from "@/actions/user-progress";
import { isLocalDemoMode } from "@/lib/local-mode";

import { Card } from "./card";

type Props = {
  courses: typeof courses.$inferSelect[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

type LetterGroup = {
  lang: string;
  flag: string;
  title: string;
  letters: { char: string; sound: string; audioSrc?: string }[];
};

const LETTER_GROUPS: LetterGroup[] = [
  {
    lang: "Hindi",
    flag: "🇮🇳",
    title: "Devanagari Vowels & Consonants",
    letters: [
      { char: "अ", sound: "a" },
      { char: "आ", sound: "aa" },
      { char: "इ", sound: "i" },
      { char: "ई", sound: "ee" },
      { char: "उ", sound: "u" },
      { char: "ऊ", sound: "oo" },
      { char: "क", sound: "ka" },
      { char: "ख", sound: "kha" },
      { char: "ग", sound: "ga" },
      { char: "घ", sound: "gha" },
    ],
  },
  {
    lang: "Japanese",
    flag: "🇯🇵",
    title: "Hiragana Characters",
    letters: [
      { char: "あ", sound: "a" },
      { char: "い", sound: "i" },
      { char: "う", sound: "u" },
      { char: "え", sound: "e" },
      { char: "お", sound: "o" },
      { char: "か", sound: "ka" },
      { char: "き", sound: "ki" },
      { char: "く", sound: "ku" },
      { char: "け", sound: "ke" },
      { char: "こ", sound: "ko" },
    ],
  },
  {
    lang: "Spanish",
    flag: "🇪🇸",
    title: "Spanish Alphabets & Accents",
    letters: [
      { char: "Ñ", sound: "eñe" },
      { char: "Á", sound: "a con acento" },
      { char: "É", sound: "e con acento" },
      { char: "Í", sound: "i con acento" },
      { char: "Ó", sound: "o con acento" },
      { char: "Ú", sound: "u con acento" },
      { char: "Ü", sound: "u con diéresis" },
      { char: "LL", sound: "doble ele" },
      { char: "RR", sound: "doble erre" },
      { char: "CH", sound: "che" },
    ],
  },
  {
    lang: "French",
    flag: "🇫🇷",
    title: "French Vowels & Sounds",
    letters: [
      { char: "É", sound: "e acute" },
      { char: "È", sound: "e grave" },
      { char: "Ê", sound: "e circumflex" },
      { char: "À", sound: "a grave" },
      { char: "Ç", sound: "c cedilla" },
      { char: "Œ", sound: "o-e ligature" },
      { char: "OU", sound: "oo sound" },
      { char: "ON", sound: "nasal o" },
      { char: "AN", sound: "nasal a" },
      { char: "IN", sound: "nasal i" },
    ],
  },
];

export const List = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [selectedLang, setSelectedLang] = useState<string>("Hindi");

  const onClick = (id: number) => {
    if (pending) return;
    if (isLocalDemoMode || id === activeCourseId) {
      return router.push("/learn");
    }
    startTransition(() => {
      upsertUserProgress(id).catch(() => toast.error("Something went wrong."));
    });
  };

  const playSound = (sound: string) => {
    toast.success(`Playing sound: ${sound}`);
  };

  const currentGroup = LETTER_GROUPS.find((g) => g.lang === selectedLang) || LETTER_GROUPS[0];

  return (
    <div className="space-y-10 pt-4">
      {/* Letters / Alphabet Learning Section matching Duolingo */}
      <div className="space-y-6 border-2 border-[#202f36] bg-[#18262d] rounded-3xl p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-white flex items-center gap-x-2">
              <Sparkles className="h-6 w-6 text-[#ffd900]" />
              Letters & Characters
            </h2>
            <p className="text-sm text-[#8496a0] font-semibold mt-1">
              Learn the alphabet sounds of your target language
            </p>
          </div>

          {/* Language Flag Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {LETTER_GROUPS.map((group) => (
              <button
                key={group.lang}
                onClick={() => setSelectedLang(group.lang)}
                className={`flex items-center gap-x-2 px-3.5 py-2 rounded-2xl text-xs font-black uppercase transition border-2 ${
                  selectedLang === group.lang
                    ? "bg-[#18313d] border-[#1899d6] text-[#1cb0f6] shadow-md"
                    : "bg-[#131f24] border-[#202f36] text-[#8496a0] hover:text-white"
                }`}
              >
                <span className="text-base">{group.flag}</span>
                <span>{group.lang}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Subheading */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm font-extrabold text-[#58cc02]">
            {currentGroup.flag} {currentGroup.title}
          </p>
          <span className="text-xs font-extrabold text-[#8496a0]">
            Tap cards to practice sound
          </span>
        </div>

        {/* Interactive Character Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {currentGroup.letters.map((item) => (
            <div
              key={item.char}
              onClick={() => playSound(item.sound)}
              className="group border-2 border-[#202f36] bg-[#131f24] hover:bg-[#202f36] p-4 rounded-2xl cursor-pointer flex flex-col items-center justify-center transition-all hover:scale-105 shadow-md active:scale-95"
            >
              <span className="text-3xl font-black text-white group-hover:text-[#1cb0f6] transition">
                {item.char}
              </span>
              <span className="text-xs font-extrabold text-[#8496a0] mt-1">
                &quot;{item.sound}&quot;
              </span>
              <div className="mt-2 h-7 w-7 rounded-xl bg-[#18262d] flex items-center justify-center text-[#1cb0f6] group-hover:bg-[#18313d]">
                <Volume2 className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Language Courses Grid */}
      <div className="space-y-4 pt-2">
        <h2 className="text-2xl font-black text-white">All Courses</h2>
        <div className="grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
          {courses.map((course) => (
            <Card
              key={course.id}
              id={course.id}
              title={course.title}
              imageSrc={course.imageSrc}
              onClick={onClick}
              disabled={pending}
              active={course.id === activeCourseId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
