"use client";

import { useRouter } from "next/navigation";
import { Check, ChevronDown } from "lucide-react";
import { useLanguageStore, Language } from "@/store/use-language-store";

const ALL_COURSES: (Language & { learners: string })[] = [
  {
    code: "es",
    name: "Spanish",
    flagEmoji: "🇪🇸",
    title: "Form basic sentences",
    learners: "42M learners",
  },
  {
    code: "fr",
    name: "French",
    flagEmoji: "🇫🇷",
    title: "Learn the basics of French",
    learners: "22.8M learners",
  },
  {
    code: "ch",
    name: "Taiwanese",
    flagEmoji: "🇹🇼",
    title: "Master Taiwanese",
    learners: "21.3M learners",
  },
  {
    code: "ja",
    name: "Japanese",
    flagEmoji: "🇯🇵",
    title: "Learn Hiragana & essentials",
    learners: "18.2M learners",
  },
  {
    code: "de",
    name: "German",
    flagEmoji: "🇩🇪",
    title: "Master German greetings",
    learners: "15.9M learners",
  },
  {
    code: "tel",
    name: "Telugu",
    flagEmoji: "🇮🇳",
    title: "Practice Telugu phrases",
    learners: "24M learners",
  },
  {
    code: "hi",
    name: "Hindi",
    flagEmoji: "🇮🇳",
    title: "Learn basic Hindi phrases",
    learners: "13.9M learners",
  },
  {
    code: "ko",
    name: "Korean",
    flagEmoji: "🇰🇷",
    title: "Learn Hangul & phrases",
    learners: "12.5M learners",
  },
  {
    code: "it",
    name: "Italian",
    flagEmoji: "🇮🇹",
    title: "Speak Italian food & dining",
    learners: "10.4M learners",
  },
  {
    code: "zh",
    name: "Chinese (Simplified)",
    flagEmoji: "🇨🇳",
    title: "Learn Pinyin & characters",
    learners: "9.26M learners",
  },
  {
    code: "ru",
    name: "Russian",
    flagEmoji: "🇷🇺",
    title: "Learn Cyrillic & basics",
    learners: "7.82M learners",
  },
  {
    code: "en",
    name: "English",
    flagEmoji: "🇺🇸",
    title: "Master English conversation",
    learners: "29.6M learners",
  },
];

export default function CoursesPage() {
  const router = useRouter();
  const { currentLanguage, setLanguage } = useLanguageStore();

  const onSelectCourse = (course: typeof ALL_COURSES[0]) => {
    setLanguage(course);
    router.push("/learn");
  };

  return (
    <div className="max-w-5xl mx-auto px-6 pt-4 pb-16 space-y-8">
      {/* Header matching Screenshot */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl lg:text-3xl font-black text-white">
          Courses for English Speakers
        </h1>
        <button className="flex items-center gap-x-2 text-xs font-black uppercase text-[#8496a0] hover:text-white transition">
          <span>I SPEAK ENGLISH</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* 4x3 Grid matching Screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {ALL_COURSES.map((course) => {
          const isSelected = currentLanguage?.code === course.code;

          return (
            <div
              key={course.code}
              onClick={() => onSelectCourse(course)}
              className={`relative border-2 rounded-3xl p-6 flex flex-col items-center justify-center space-y-3 cursor-pointer transition shadow-xl hover:scale-[1.02] active:scale-[0.98] ${
                isSelected
                  ? "bg-[#18313d] border-[#1cb0f6]"
                  : "bg-[#18262d] border-[#202f36] hover:bg-[#202f36]"
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 bg-[#58cc02] text-black rounded-lg p-1">
                  <Check className="h-4 w-4 stroke-[3]" />
                </div>
              )}

              {/* Icon Frame matching Screenshot */}
              <div className="h-20 w-24 rounded-2xl bg-[#131f24] border-2 border-[#202f36] flex items-center justify-center text-4xl shadow-md">
                {course.flagEmoji}
              </div>

              <div className="text-center space-y-1">
                <p className="text-white font-extrabold text-base leading-tight">
                  {course.name}
                </p>
                <p className="text-[#8496a0] font-bold text-xs">
                  {course.learners}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
