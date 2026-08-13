"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { X, Copy, Check } from "lucide-react";

import { useInviteModal } from "@/store/use-invite-modal";

export const InviteFriendsModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  const { isOpen, close } = useInviteModal();

  const inviteLink = "https://invite.duolingo.com/BDHTZTB5CW";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isOpen) {
    return null;
  }

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);

      setCopied(true);
      toast.success("Invite link copied to clipboard!");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error("Failed to copy invite link");
      console.error(error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4"
      onClick={close}
    >
      {/* Modal */}
      <div
        className="relative w-full max-w-md rounded-3xl border-2 border-[#202f36] bg-[#18262d] p-6 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={close}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#202f36] bg-[#131f24] text-[#8496a0] transition hover:bg-[#202f36] hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center pt-2 text-center">
          {/* Mascot */}
          <div className="relative my-2 h-28 w-32">
            <Image
              src="/hero.svg"
              alt="Duo Invite"
              fill
              className="object-contain drop-shadow-lg"
            />
          </div>

          {/* Title */}
          <h2 className="mt-2 text-2xl font-black text-white">
            Invite friends
          </h2>

          <p className="mt-2 mb-6 px-2 text-sm font-bold leading-relaxed text-[#8496a0]">
            Tell your friends it&apos;s free and fun to learn a language on
            Duolingo!
          </p>

          {/* Invite link */}
          <div className="flex w-full items-center justify-between gap-x-2 rounded-2xl border-2 border-[#202f36] bg-[#131f24] p-3 shadow-inner">
            <span className="flex-1 truncate px-1 text-left text-xs font-bold text-[#8496a0]">
              {inviteLink}
            </span>

            <button
              type="button"
              onClick={onCopy}
              className="flex shrink-0 items-center gap-x-1 px-2 py-1 text-xs font-black uppercase tracking-wider text-[#1cb0f6] transition hover:text-[#1899d6]"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#58cc02]" />
                  <span className="text-[#58cc02]">COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>COPY LINK</span>
                </>
              )}
            </button>
          </div>

          {/* Share */}
          <div className="w-full space-y-3 pt-6 text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-[#8496a0]">
              Or share on...
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  toast.success("Sharing on Facebook...")
                }
                className="w-full rounded-2xl border-2 border-[#202f36] bg-[#18262d] py-3 text-xs font-extrabold uppercase tracking-wider text-[#1cb0f6] transition hover:bg-[#202f36]"
              >
                FACEBOOK
              </button>

              <button
                type="button"
                onClick={() =>
                  toast.success("Sharing on Twitter...")
                }
                className="w-full rounded-2xl border-2 border-[#202f36] bg-[#18262d] py-3 text-xs font-extrabold uppercase tracking-wider text-[#1cb0f6] transition hover:bg-[#202f36]"
              >
                TWITTER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};