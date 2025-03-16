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
    const data = await getData(fetchUrl);
    console.log('pnl data', data)
    return data;
  } catch (error) {
    console.error(`Failed to fetch profit and loss data for ${tickerId}:`, error);
    return [];
  }
}
