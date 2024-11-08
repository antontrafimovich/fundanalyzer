import { parse } from "node-html-parser";
import { createServer } from "http";
import process from "node:process";
import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";

const domain = process.env.DOMAIN;

const profitAndLossPageRoute = process.env.PROFIT_AND_LOSS_PAGE_ROUTE;
const balanceReportPageRoute = process.env.BALANCE_REPORT_PAGE_ROUTE;
const cashflowReportPageRoute = process.env.CASHFLOW_REPORT_PAGE_ROUTE;

const companyRoute = process.env.COMPANY_ROUTE;

const url = `${domain}/${profitAndLossPageRoute}/${companyRoute}`;

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
// fetchAndParseHTML(url).then((document) => {
//   const years = document
//     .querySelectorAll(".report-table th")
//     .map((i) => i.firstChild.textContent.trim())
//     .filter(Boolean);

//   const metricRows = document.querySelectorAll(".report-table tr").slice(1);

//   let fiancialDataPerYear = years.map((year) => ({ year }));

//   for (let i = 0; i < metricRows.length; i++) {
//     const metricRow = metricRows[i];
//     const metricName = metricRow.querySelector("td.f").innerText.trim();

//     const metricValuesCells = metricRow.querySelectorAll("td").slice(1, -1);

//     fiancialDataPerYear.forEach((data, index) => {
//       const metricValue = metricValuesCells[index].querySelector(".value");

//       if (!metricValue) {
//         data[metricName] = "";
//         return;
//       }

//       data[metricName] = metricValue.textContent.trim();
//     });
//   }

//   console.log(fiancialDataPerYear);
//   // Do something with the document
// });

const getData = async (url) => {
  const document = await fetchAndParseHTML(url);

  const years = document
    .querySelectorAll(".report-table th")
    .map((i) => i.firstChild.textContent.trim())
    .filter(Boolean);

  const metricRows = document.querySelectorAll(".report-table tr").slice(1);

  let fiancialDataPerYear = years.map((year) => ({ year }));

  for (let i = 0; i < metricRows.length; i++) {
    const metricRow = metricRows[i];
    const metricName = metricRow.querySelector("td.f").innerText.trim();

    const metricValuesCells = metricRow.querySelectorAll("td").slice(1, -1);

    fiancialDataPerYear.forEach((data, index) => {
      const metricValue = metricValuesCells[index].querySelector(".value");

      if (!metricValue) {
        data[metricName] = "";
        return;
      }

      data[metricName] = metricValue.textContent.trim();
    });
  }

  return fiancialDataPerYear;
};

const server = createServer(async (req, res) => {
  const urlParts = req.url.split("/");
  const segment = urlParts[1];

  if (req.method === "GET" && segment === "companies") {
    const r = createReadStream("./tickers.json");
    console.log("Request for companies");
    try {
      res.writeHead(200, { "Content-Type": "application/json" });
      await pipeline(r, res);
    } catch (error) {
      console.error(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }

    return;
  }

  if (req.method === "GET" && segment) {
    const fetchUrl = `${domain}/${profitAndLossPageRoute}/${segment}`;
    try {
      const data = await getData(fetchUrl);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
