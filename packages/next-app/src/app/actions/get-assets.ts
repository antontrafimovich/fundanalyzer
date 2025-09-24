import { getData } from "./get-data";
import { AssetsInfoApi, AssetsInfoApiSchema, TickerIdSchema } from "../../lib/schemas";

export async function getAssets(tickerId: string): Promise<AssetsInfoApi[]> {
  // Validate tickerId
  TickerIdSchema.parse(tickerId);

  const domain = process.env.DOMAIN;
  const balanceReportPageRoute = process.env.BALANCE_REPORT_PAGE_ROUTE;

  try {
    const fetchUrl = `${domain}/${balanceReportPageRoute}/${tickerId}`;
    const data = await getData(fetchUrl);
    // Validate the data
    return data.map(item => AssetsInfoApiSchema.parse(item));
  } catch (error) {
    console.error(`Failed to fetch assets data for ${tickerId}:`, error);
    return [];
  }
}
