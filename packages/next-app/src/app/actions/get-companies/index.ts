import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from 'node:url';

import { Company } from "../../model/company";

export async function getCompanies(): Promise<Company[]> {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  
  try {
    const r = await readFile(path.resolve(__dirname, "tickers.json"), {
      encoding: "utf-8",
    });

    return JSON.parse(r);
  } catch (error: unknown) {
    console.error("Error reading tickers.json:", error);
    return [];
  }
}
