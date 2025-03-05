import { fetchAndParseHTML } from "./fetch-and-parse-html";

export type CommonDataApi = {
  currentPrice: string;
  companyDescription: string;
  website: string;
};
export async function getCommonData(company: string): Promise<CommonDataApi> {
  const domain = process.env.DOMAIN;
  const commonDataPageRoute = process.env.COMMON_DATA_PAGE_ROUTE;

  try {
    const fetchUrl = `${domain}/${commonDataPageRoute}/${company}`;
    const document = await fetchAndParseHTML(fetchUrl);

    const getElementText = (selector: string) => {
      const element = document.querySelector(selector);
      return element ? element.innerText.trim() : null;
    };

    const currentPrice = getElementText(".q_ch_act");
    const companyDescription = getElementText(".profileDesc > p > .hidden");
    const website = getElementText(".profileSummary.hidden > tr:last-child a");

    return { currentPrice: currentPrice || "N/A", companyDescription: companyDescription || "N/A", website: website || "N/A" };
  } catch (error) {
    console.error(`Failed to fetch common data for ${company}:`, error);
    return { currentPrice: "N/A", companyDescription: "N/A", website: "N/A" };
  }
}
