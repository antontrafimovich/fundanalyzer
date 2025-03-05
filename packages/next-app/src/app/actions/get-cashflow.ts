import { getData } from "./get-data";

export type CashflowInfoApi = {
  year: string;
  "Przepływy pieniężne z działalności operacyjnej": string;
  "Przepływy pieniężne z działalności inwestycyjnej": string;
  "Przepływy pieniężne z działalności finansowej": string;
};

export async function getCashflow(tickerId: string): Promise<CashflowInfoApi[]> {
  const domain = process.env.DOMAIN;
  const cashflowReportPageRoute = process.env.CASHFLOW_REPORT_PAGE_ROUTE;

  try {
    const fetchUrl = `${domain}/${cashflowReportPageRoute}/${tickerId}`;
    return await getData(fetchUrl);
  } catch (error) {
    console.error(`Failed to fetch cashflow data for ${tickerId}:`, error);
    return [];
  }
}
