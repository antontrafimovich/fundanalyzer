import { getData } from "./get-data";

export type PnlInfoApi = {
  year: string;
  [key: string]: string;
};

export async function getPnl(tickerId: string): Promise<PnlInfoApi[]> {
  const domain = process.env.DOMAIN;
  const profitAndLossPageRoute = process.env.PROFIT_AND_LOSS_PAGE_ROUTE;

  try {
    const fetchUrl = `${domain}/${profitAndLossPageRoute}/${tickerId}`;
    return getData(fetchUrl);
  } catch (error) {
    console.error(`Failed to fetch profit and loss data for ${tickerId}:`, error);
    return [];
  }
}
