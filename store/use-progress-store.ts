import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProgressStoreState = {
  completedCount: number;
  xp: number;
  streak: number;
  incrementProgress: () => void;
  resetProgress: () => void;
};

export const useProgressStore = create<ProgressStoreState>()(
  persist(
    (set) => ({
      completedCount: 1,
      xp: 150,
      streak: 1,
      incrementProgress: () =>
        set((state) => ({
          completedCount: state.completedCount + 1,
          xp: state.xp + 10,
        })),
      resetProgress: () => set({ completedCount: 1, xp: 150 }),
    }),
    {
      name: "duolingo-user-progress",
    }
  )
);
