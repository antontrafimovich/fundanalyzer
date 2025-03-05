import { getData } from "./get-data";

export type ShareInfoApi = {
  year: string;
  Kurs: string;
  "Liczba akcji": string;
};

export async function getShares(tickerId: string): Promise<ShareInfoApi[]> {
  const domain = process.env.DOMAIN;
  const ratiosPageRoute = process.env.RATIOS_PAGE_ROUTE;

  try {
    const fetchUrl = `${domain}/${ratiosPageRoute}/${tickerId}`;
    return await getData(fetchUrl);
  } catch (error) {
    console.error(`Failed to fetch shares data for ${tickerId}:`, error);
    return [];
  }
}
