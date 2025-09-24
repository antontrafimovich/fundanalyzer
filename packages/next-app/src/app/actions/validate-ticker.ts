"use server";

import { TickerIdSchema } from "../../lib/schemas";
import { getTickerInfo } from "../companies/[tickerId]/api/ticker-info.api";

export async function validateTicker(tickerId: string): Promise<boolean> {
  // Validate tickerId format
  try {
    TickerIdSchema.parse(tickerId);
  } catch {
    return false;
  }

  try {
    await getTickerInfo(tickerId);
    return true;
  } catch (error) {
    console.error("Error in validation", error);
    return false;
  }
}
