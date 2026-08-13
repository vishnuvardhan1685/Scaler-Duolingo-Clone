import { create } from "zustand";
import { persist } from "zustand/middleware";

type LanguageProgress = {
  completedCount: number;
  xp: number;
};

type ProgressStoreState = {
  languageProgress: Record<string, LanguageProgress>;
  getCompletedCount: (langCode?: string) => number;
  getXp: (langCode?: string) => number;
  incrementProgress: (langCode?: string) => void;
  resetProgress: (langCode?: string) => void;
};

const DEFAULT_PROGRESS: LanguageProgress = { completedCount: 1, xp: 150 };

export const useProgressStore = create<ProgressStoreState>()(
  persist(
    (set, get) => ({
      languageProgress: {
        es: { completedCount: 1, xp: 150 },
        fr: { completedCount: 1, xp: 150 },
        de: { completedCount: 1, xp: 150 },
        it: { completedCount: 1, xp: 150 },
        ja: { completedCount: 1, xp: 150 },
        hi: { completedCount: 1, xp: 150 },
        ko: { completedCount: 1, xp: 150 },
        zh: { completedCount: 1, xp: 150 },
        ru: { completedCount: 1, xp: 150 },
        en: { completedCount: 1, xp: 150 },
        chess: { completedCount: 1, xp: 150 },
        math: { completedCount: 1, xp: 150 },
      },
      getCompletedCount: (langCode = "es") => {
        const progress = get().languageProgress[langCode];
        return progress?.completedCount ?? 1;
      },
      getXp: (langCode = "es") => {
        const progress = get().languageProgress[langCode];
        return progress?.xp ?? 150;
      },
      incrementProgress: (langCode = "es") =>
        set((state) => {
          const current = state.languageProgress[langCode] || DEFAULT_PROGRESS;
          return {
            languageProgress: {
              ...state.languageProgress,
              [langCode]: {
                completedCount: current.completedCount + 1,
                xp: current.xp + 10,
              },
            },
          };
        }),
      resetProgress: (langCode = "es") =>
        set((state) => ({
          languageProgress: {
            ...state.languageProgress,
            [langCode]: { completedCount: 1, xp: 150 },
          },
        })),
    }),
    {
      name: "duolingo-language-progress-v3",
    }
  )
);
