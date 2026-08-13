import { create } from "zustand";

type GuidebookModalState = {
  isOpen: boolean;
  unitTitle: string;
  open: (title?: string) => void;
  close: () => void;
};

export const useGuidebookModal = create<GuidebookModalState>((set) => ({
  isOpen: false,
  unitTitle: "Section 1, Unit 1",
  open: (title = "Section 1, Unit 1") => set({ isOpen: true, unitTitle: title }),
  close: () => set({ isOpen: false }),
}));
