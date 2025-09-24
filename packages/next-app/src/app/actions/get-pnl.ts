import { getData } from "./get-data";
import { PnlInfoApi, PnlInfoApiSchema, TickerIdSchema } from "../../lib/schemas";

export async function getPnl(tickerId: string): Promise<PnlInfoApi[]> {
  // Validate tickerId
  TickerIdSchema.parse(tickerId);

  const domain = process.env.DOMAIN;
  const profitAndLossPageRoute = process.env.PROFIT_AND_LOSS_PAGE_ROUTE;

  try {
    const fetchUrl = `${domain}/${profitAndLossPageRoute}/${tickerId}`;
    const data = await getData(fetchUrl);
    // Validate the data
    return data.map(item => PnlInfoApiSchema.parse(item));
  } catch (error) {
    console.error(`Failed to fetch profit and loss data for ${tickerId}:`, error);
    return [];
  }
}
