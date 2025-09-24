import { fetchAndParseHTML } from "./fetch-and-parse-html";

type FinancialData = {
  year: string;
  [key: string]: string;
};

export async function getData<T extends FinancialData>(
  url: string
): Promise<T[]> {
  const document = await fetchAndParseHTML(url);

  const years = document
    .querySelectorAll(".report-table th")
    .map((i) => i.firstChild?.textContent?.trim() || "")
    .filter(Boolean);

  const metricRows = document.querySelectorAll(".report-table tr").slice(1);

  const financialData = years.map((year) => ({ year })) as T[];

  for (let i = 0; i < metricRows.length; i++) {
    const metricRow = metricRows[i];
    const metricName = metricRow.querySelector("td.f")?.textContent?.trim() || "";

    const metricValuesCells = metricRow.querySelectorAll("td").slice(1, -1);

    financialData.forEach((data, index) => {
      const metricValue = metricValuesCells[index]?.querySelector(".value");

      if (!metricValue) {
        (data as Record<string, string>)[metricName] = "";
        return;
      }

      (data as Record<string, string>)[metricName] =
        metricValue.textContent?.trim() || "";
    });
  }

  return financialData;
}
