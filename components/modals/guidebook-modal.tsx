"use client";

import { useEffect, useState } from "react";
import { BookOpen, X, Sparkles, Volume2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGuidebookModal } from "@/store/use-guidebook-modal";

export const GuidebookModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, close, unitTitle } = useGuidebookModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-xl bg-[#18262d] border-2 border-[#202f36] text-white rounded-3xl p-6 shadow-2xl">
        <DialogHeader className="flex flex-row items-center justify-between pb-4 border-b-2 border-[#202f36]">
          <div className="flex items-center gap-x-3">
            <div className="h-10 w-10 rounded-2xl bg-[#58cc02] flex items-center justify-center text-white">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-black text-white">
                Unit Guidebook
              </DialogTitle>
              <p className="text-xs text-[#8496a0] font-bold uppercase tracking-wider">
                {unitTitle}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4 max-h-[60vh] overflow-y-auto pr-2">
          {/* Key Phrases Section */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-base text-[#58cc02] flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Key Phrases
            </h3>
            <p className="text-xs text-[#8496a0] font-semibold">
              Use these essential expressions in everyday conversations:
            </p>
            
            <div className="space-y-2.5">
              <div className="p-3.5 rounded-2xl bg-[#131f24] border border-[#202f36] flex items-center justify-between">
                <div>
                  <p className="font-extrabold text-white text-base">Hola, ¿cómo estás?</p>
                  <p className="text-xs text-[#8496a0] font-medium">Hello, how are you?</p>
                </div>
                <button className="h-9 w-9 rounded-xl bg-[#202f36] hover:bg-[#18313d] flex items-center justify-center text-[#1cb0f6]">
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#131f24] border border-[#202f36] flex items-center justify-between">
                <div>
                  <p className="font-extrabold text-white text-base">Mucho gusto, me llamo Duo.</p>
                  <p className="text-xs text-[#8496a0] font-medium">Nice to meet you, my name is Duo.</p>
                </div>
                <button className="h-9 w-9 rounded-xl bg-[#202f36] hover:bg-[#18313d] flex items-center justify-center text-[#1cb0f6]">
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#131f24] border border-[#202f36] flex items-center justify-between">
                <div>
                  <p className="font-extrabold text-white text-base">Por favor y gracias.</p>
                  <p className="text-xs text-[#8496a0] font-medium">Please and thank you.</p>
                </div>
                <button className="h-9 w-9 rounded-xl bg-[#202f36] hover:bg-[#18313d] flex items-center justify-center text-[#1cb0f6]">
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Grammar Tips Section */}
          <div className="space-y-3 pt-2">
            <h3 className="font-extrabold text-base text-[#1cb0f6]">
              Grammar Tips & Rules
            </h3>
            <div className="p-4 rounded-2xl bg-[#131f24] border border-[#202f36] space-y-2">
              <p className="font-extrabold text-sm text-white">Gender in Nouns</p>
              <p className="text-xs text-[#8496a0] leading-relaxed">
                Nouns ending in <span className="text-[#58cc02] font-bold">-o</span> are usually masculine (el niño), while nouns ending in <span className="text-[#ce82ff] font-bold">-a</span> are usually feminine (la niña).
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t-2 border-[#202f36] flex justify-end">
          <Button
            onClick={close}
            variant="secondary"
            className="font-extrabold uppercase text-xs tracking-wider rounded-2xl px-6 py-2.5"
          >
            Got it!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
