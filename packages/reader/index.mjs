import { parse } from "node-html-parser";
import fs from "node:fs/promises";

import process from "node:process";

const domain = process.env.DOMAIN;

const profitAndLossPageRoute = process.env.PROFIT_AND_LOSS_PAGE_ROUTE;
const balanceReportPageRoute = process.env.BALANCE_REPORT_PAGE_ROUTE;
const cashflowReportPageRoute = process.env.CASHFLOW_REPORT_PAGE_ROUTE;

const companyRoute = process.env.COMPANY_ROUTE;

const url = `${domain}/${balanceReportPageRoute}/${companyRoute}`;

async function fetchAndParseHTML(url) {
  const response = await fetch(url);

  const data = await response.text();
  // const data = await fs.readFile("./data.html", "utf-8");

  // fs.writeFile("./data.html", data);

  console.log(data);

  const dom = parse(data);

  return dom;
}

// Example usage
fetchAndParseHTML(url).then((document) => {
  const years = document
    .querySelectorAll(".report-table th")
    .map((i) => i.firstChild.textContent.trim())
    .filter(Boolean);

  console.log("years", years);

  const rows = document.querySelectorAll(".report-table tr").slice(1);

  let eachYearFiancialData = years.map((year) => ({ year }));
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const name = row.querySelector("td.f").innerText.trim();

    console.log("name is ", name);

    const cells = row.querySelectorAll("td").slice(1, -1);

    console.log(cells.length);

    eachYearFiancialData.forEach((r, index) => {
      // console.log(cells[index].querySelector(".value"))
      console.log(eachYearFiancialData)
      r[name] = cells[index].querySelector(".value").textContent.trim();
    });
  }

  console.log(eachYearFiancialData);
  // Do something with the document
});
