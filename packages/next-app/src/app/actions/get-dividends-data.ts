import { fetchAndParseHTML } from "./fetch-and-parse-html";
import { DividendsInfoApi, DividendsInfoApiSchema, TickerIdSchema } from "../../lib/schemas";

export async function getDividendsData(company: string): Promise<DividendsInfoApi[]> {
  // Validate company (tickerId)
  TickerIdSchema.parse(company);

  const domain = process.env.DOMAIN;
  const dividendsDataPageRoute = process.env.DIVIDENDS_PAGE_ROUTE;

  try {
    const fetchUrl = `${domain}/${dividendsDataPageRoute}/${company}`;
    const document = await fetchAndParseHTML(fetchUrl);

    const rows = document.querySelectorAll(".table-c > table > tr")?.slice(1);
    const result = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const [yearItem, , , dividendsItem] = row.querySelectorAll("td");
      const year = yearItem?.textContent?.trim();
      const dividend = dividendsItem.textContent?.trim();

      const item = {
        year: year || "",
        dividends: isNaN(Number(dividend.split(" ").join("")))
          ? 0
          : Number(dividend.split(" ").join("")),
      };

      result.push(DividendsInfoApiSchema.parse(item));
    }

    return result;
  } catch (error) {
    console.error(`Failed to fetch dividends data for ${company}:`, error);
    return [];
  }
}
