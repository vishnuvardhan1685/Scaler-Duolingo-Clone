"use client";

import { useState } from "react";
import Link from "next/link";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";

export default function SettingsPage() {
  const [sound, setSound] = useState(true);
  const [animations, setAnimations] = useState(true);
  const [motivational, setMotivational] = useState(true);
  const [listening, setListening] = useState(true);

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={{ id: 1, title: "Spanish", imageSrc: "/es.svg" }}
          hearts={5}
          points={150}
          hasActiveSubscription={false}
        />

        {/* Right Settings Nav Navigation Card matching Photo 5 */}
        <div className="border-2 border-[#202f36] bg-[#18262d] rounded-3xl p-5 space-y-3 shadow-xl">
          <div className="flex flex-col gap-y-2.5 text-sm font-bold text-[#8496a0]">
            <Link href="/settings" className="hover:text-white transition py-1">Account</Link>
            <Link href="/settings" className="text-white font-extrabold py-1">Preferences</Link>
            <Link href="/profile" className="hover:text-white transition py-1">Profile</Link>
            <Link href="/settings" className="hover:text-white transition py-1">Notifications</Link>
            <Link href="/courses" className="hover:text-white transition py-1">Courses</Link>
            <Link href="/settings" className="hover:text-white transition py-1">Duolingo for Schools</Link>
            <Link href="/settings" className="hover:text-white transition py-1">Social accounts</Link>
            <Link href="/settings" className="hover:text-white transition py-1">Privacy settings</Link>
          </div>
        </div>

        {/* Subscription Card */}
        <div className="border-2 border-[#202f36] bg-[#18262d] rounded-3xl p-5 space-y-2 shadow-xl mt-4">
          <h3 className="font-extrabold text-white text-sm">Subscription</h3>
          <p className="text-[#1cb0f6] font-bold text-xs cursor-pointer hover:underline">Choose a plan</p>
        </div>

        {/* Support Card */}
        <div className="border-2 border-[#202f36] bg-[#18262d] rounded-3xl p-5 space-y-2 shadow-xl mt-4">
          <h3 className="font-extrabold text-white text-sm">Support</h3>
          <p className="text-[#8496a0] font-bold text-xs cursor-pointer hover:text-white">Help Center</p>
        </div>

        {/* LOG OUT */}
        <div className="pt-4 text-center">
          <Link href="/" className="text-xs font-black uppercase tracking-widest text-[#1cb0f6] hover:underline">
            LOG OUT
          </Link>
        </div>
      </StickyWrapper>

      <FeedWrapper>
        <div className="space-y-8">
          <h1 className="text-2xl lg:text-3xl font-black text-white">
            Preferences
          </h1>

          <div className="space-y-6">
            <h2 className="text-lg font-black text-white">
              Lesson experience
            </h2>
            <div className="w-full h-0.5 bg-[#202f36]" />

            <div className="space-y-5">
              {/* Sound effects */}
              <div className="flex items-center justify-between">
                <span className="text-white font-extrabold text-base">Sound effects</span>
                <button
                  onClick={() => setSound(!sound)}
                  className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                    sound ? "bg-[#1cb0f6]" : "bg-[#202f36]"
                  }`}
                >
                  <div
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      sound ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Animations */}
              <div className="flex items-center justify-between">
                <span className="text-white font-extrabold text-base">Animations</span>
                <button
                  onClick={() => setAnimations(!animations)}
                  className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                    animations ? "bg-[#1cb0f6]" : "bg-[#202f36]"
                  }`}
                >
                  <div
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      animations ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Motivational messages */}
              <div className="flex items-center justify-between">
                <span className="text-white font-extrabold text-base">Motivational messages</span>
                <button
                  onClick={() => setMotivational(!motivational)}
                  className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                    motivational ? "bg-[#1cb0f6]" : "bg-[#202f36]"
                  }`}
                >
                  <div
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      motivational ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Listening exercises */}
              <div className="flex items-center justify-between">
                <span className="text-white font-extrabold text-base">Listening exercises</span>
                <button
                  onClick={() => setListening(!listening)}
                  className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                    listening ? "bg-[#1cb0f6]" : "bg-[#202f36]"
                  }`}
                >
                  <div
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      listening ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
}
