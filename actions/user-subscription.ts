"use server";

import { apiPost } from "@/lib/backend";

export const createStripeUrl = async () => {
  await apiPost("/progress/refill-hearts");
  return { data: undefined };
};
