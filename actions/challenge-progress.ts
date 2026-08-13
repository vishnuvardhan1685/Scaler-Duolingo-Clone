"use server";

import { apiPost } from "@/lib/backend";

export const upsertChallengeProgress = async (challengeId: number) => {
  return apiPost<{ ok: boolean; progress?: { hearts: number } }>("/lesson/complete", { exerciseId: challengeId, correct: true });
};
