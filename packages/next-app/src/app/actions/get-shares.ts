import { getData } from "./get-data";
import { ShareInfoApi, ShareInfoApiSchema, TickerIdSchema } from "../../lib/schemas";

export async function getShares(tickerId: string): Promise<ShareInfoApi[]> {
  // Validate tickerId
  TickerIdSchema.parse(tickerId);

  const domain = process.env.DOMAIN;
  const ratiosPageRoute = process.env.RATIOS_PAGE_ROUTE;

  try {
    const fetchUrl = `${domain}/${ratiosPageRoute}/${tickerId}`;
    const data = await getData(fetchUrl);
    // Validate the data
    return data.map(item => ShareInfoApiSchema.parse(item));
  } catch (error) {
    console.error(`Failed to fetch shares data for ${tickerId}:`, error);
    return [];
  }
}
