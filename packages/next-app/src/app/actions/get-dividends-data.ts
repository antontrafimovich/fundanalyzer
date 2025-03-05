import { fetchAndParseHTML } from "./fetch-and-parse-html";

export type DividendsInfoApi = {
  year: string;
  dividends: number;
};

export async function getDividendsData(company: string): Promise<DividendsInfoApi[]> {
  const domain = process.env.DOMAIN;
  const dividendsDataPageRoute = process.env.DIVIDENDS_PAGE_ROUTE;
  const fetchUrl = `${domain}/${dividendsDataPageRoute}/${company}`;
  const document = await fetchAndParseHTML(fetchUrl);

  const rows = document.querySelectorAll(".table-c > table > tr")?.slice(1);
  const result = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const [yearItem, , , dividendsItem] = row.querySelectorAll("td");
    const year = yearItem?.innerText.trim();
    const dividend = dividendsItem.innerText.trim();

    result.push({
      year,
      dividends: isNaN(Number(dividend.split(" ").join("")))
        ? 0
        : Number(dividend.split(" ").join("")),
    });
  }

  return result;
}
