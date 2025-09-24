import { getData } from "./get-data";
import { CashflowInfoApi, CashflowInfoApiSchema, TickerIdSchema } from "../../lib/schemas";

export async function getCashflow(tickerId: string): Promise<CashflowInfoApi[]> {
  // Validate tickerId
  TickerIdSchema.parse(tickerId);

  const domain = process.env.DOMAIN;
  const cashflowReportPageRoute = process.env.CASHFLOW_REPORT_PAGE_ROUTE;

  try {
    const fetchUrl = `${domain}/${cashflowReportPageRoute}/${tickerId}`;
    const data = await getData(fetchUrl);
    // Validate the data
    return data.map(item => CashflowInfoApiSchema.parse(item));
  } catch (error) {
    console.error(`Failed to fetch cashflow data for ${tickerId}:`, error);
    return [];
  }
}
