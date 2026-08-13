import { create } from "zustand";

export type Language = {
  name: string;
  code: string;
  flagSrc?: string;
  flagEmoji: string;
  title: string;
};

export const LANGUAGES: Language[] = [
  { name: "Spanish", code: "es", flagSrc: "/es.svg", flagEmoji: "🇪🇸", title: "Form basic sentences" },
  { name: "French", code: "fr", flagSrc: "/fr.svg", flagEmoji: "🇫🇷", title: "Learn the basics of French" },
  { name: "German", code: "de", flagSrc: "/de.svg", flagEmoji: "🇩🇪", title: "Master German greetings" },
  { name: "Italian", code: "it", flagSrc: "/it.svg", flagEmoji: "🇮🇹", title: "Speak Italian food & dining" },
  { name: "Japanese", code: "jp", flagSrc: "/jp.svg", flagEmoji: "🇯🇵", title: "Learn Hiragana & essentials" },
  { name: "Hindi", code: "hi", flagSrc: "/hr.svg", flagEmoji: "🇮🇳", title: "Learn basic Hindi phrases" },
];

type LanguageState = {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
};

export const useLanguageStore = create<LanguageState>((set) => ({
  currentLanguage: LANGUAGES[0],
  setLanguage: (language) => set({ currentLanguage: language }),
}));
