import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { unstable_cache } from "next/cache";

import { Company, CompanySchema } from "../../../lib/schemas";

async function getCompaniesInner(): Promise<Company[]> {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  try {
    const r = await readFile(path.resolve(__dirname, "tickers.json"), {
      encoding: "utf-8",
    });

    const data = JSON.parse(r);
    // Validate the data
    return data.map((item: unknown) => CompanySchema.parse(item));
  } catch (error: unknown) {
    console.error("Error reading tickers.json:", error);
    return [];
  }
}

export const getCompanies = unstable_cache(() => getCompaniesInner(), ['companies']);
