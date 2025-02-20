"use server";

import { getTickerInfo } from "../companies/[...tickerId]/api/ticker-info.api";

export async function validateTicker(tickerId: string): Promise<boolean> {
  try {
    await getTickerInfo(tickerId);
    return true;
  } catch (error) {
    console.log("Error in validation", error);
    return false;
  }
}
