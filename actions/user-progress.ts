"use server";

import { redirect } from "next/navigation";
import { apiPost } from "@/lib/backend";

export const upsertUserProgress = async (courseId: number) => {
  await apiPost("/courses/activate", { courseId });
  redirect("/learn");
};

export const reduceHearts = async () => {
  return apiPost<{ ok: boolean; progress: { hearts: number } }>("/lesson/wrong", { correct: false });
};

export const refillHearts = async () => {
  return apiPost("/progress/refill-hearts");
};
