import { getData } from "./get-data";

export type AssetsInfoApi = {
  year: string;
  "Aktywa razem": string;
  "Kapitał własny akcjonariuszy jednostki dominującej": string;
  "Zobowiązania krótkoterminowe": string;
  "Zobowiązania długoterminowe": string;
};

export async function getAssets(tickerId: string): Promise<AssetsInfoApi[]> {
  const domain = process.env.DOMAIN;
  const balanceReportPageRoute = process.env.BALANCE_REPORT_PAGE_ROUTE;

  try {
    const fetchUrl = `${domain}/${balanceReportPageRoute}/${tickerId}`;
    return await getData(fetchUrl);
  } catch (error) {
    console.error(`Failed to fetch assets data for ${tickerId}:`, error);
    return [];
  }
}
