"use client";

import Link from "next/link";
import { ArrowLeft, ChevronDown, Check } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useLanguageStore, LANGUAGES, Language } from "@/store/use-language-store";

type Props = {
  title: string;
};

export const Header = ({ title }: Props) => {
  const { currentLanguage, setLanguage } = useLanguageStore();
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 bg-[#131f24] pb-3 lg:pt-[28px] lg:mt-[2px] flex items-center justify-between border-b-2 border-[#202f36] mb-5 text-[#8496a0] lg:z-50">
      <Link href="/courses">
        <Button variant="ghost" size="sm" className="hover:bg-[#202f36] p-2">
          <ArrowLeft className="h-5 w-5 stroke-[2.5] text-[#8496a0]" />
        </Button>
      </Link>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-x-2 font-black text-lg text-white uppercase tracking-widest hover:text-[#58cc02] transition px-3 py-1 rounded-xl hover:bg-[#18262d]"
        >
          <span>{currentLanguage?.name || title}</span>
          <ChevronDown className="h-4 w-4 text-[#8496a0]" />
        </button>

        {open && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-56 bg-[#18262d] border-2 border-[#202f36] rounded-2xl shadow-2xl p-2 z-50 flex flex-col gap-y-1">
            <div className="px-3 py-1.5 text-[10px] font-black uppercase text-[#8496a0] tracking-wider">
              MY COURSES
            </div>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang);
                  setOpen(false);
                }}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition ${
                  currentLanguage.code === lang.code
                    ? "bg-[#202f36] text-[#58cc02]"
                    : "text-white hover:bg-[#202f36]/70"
                }`}
              >
                <div className="flex items-center gap-x-3">
                  <span className="text-lg">{lang.flagEmoji}</span>
                  <span>{lang.name}</span>
                </div>
                {currentLanguage.code === lang.code && (
                  <Check className="h-4 w-4 text-[#58cc02] stroke-[3]" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="w-10" />
    </div>
  );
};
