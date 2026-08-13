"use server";

import { redirect } from "next/navigation";
import { apiPost } from "@/lib/backend";

export const upsertUserProgress = async (courseId: number) => {
  try {
    await apiPost("/courses/activate", { courseId });
  } catch {
    // Graceful fallback for single-repo Vercel deployment
  }
  redirect("/learn");
};

export const reduceHearts = async () => {
  try {
    return await apiPost<{ ok: boolean; progress: { hearts: number } }>("/lesson/wrong", { correct: false });
  } catch {
    return { ok: true, progress: { hearts: 4 } };
  }
};

export const refillHearts = async () => {
  try {
    return await apiPost("/progress/refill-hearts");
  } catch {
    return { ok: true };
  }
};
