import { parse } from "node-html-parser";
import { createServer } from "http";
import process from "node:process";
import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import path from "node:path";

import { getCommonData, getDividendsData, getData } from "./actions";
import { getCompanies } from "../../next-app/src/app/actions/get-companies";

const domain = process.env.DOMAIN;

const profitAndLossPageRoute = process.env.PROFIT_AND_LOSS_PAGE_ROUTE;
const balanceReportPageRoute = process.env.BALANCE_REPORT_PAGE_ROUTE;
const commonDataPageRoute = process.env.COMMON_DATA_PAGE_ROUTE;
const dividendsDataPageRoute = process.env.DIVIDENDS_PAGE_ROUTE;
const cashflowReportPageRoute = process.env.CASHFLOW_REPORT_PAGE_ROUTE;

const ratiosPageRoute = process.env.RATIOS_PAGE_ROUTE;

async function fetchAndParseHTML(url) {
  const response = await fetch(url);
  const data = await response.text();
  const dom = parse(data);

  return dom;
}

const server = createServer(async (req, res) => {
  const urlParts = req.url.split("/");
  const [, segment, payload] = urlParts;

  if (req.method === "GET" && segment === "companies") {
    await getCompanies(res);
    return;
  }

  if (req.method === "GET" && segment === "shares" && payload) {
    const fetchUrl = `${domain}/${ratiosPageRoute}/${payload}`;

    try {
      const data = await getData(fetchUrl);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } catch (error) {
      console.error(error.message);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(error.message);
    }

    return;
  }

  if (req.method === "GET" && segment === "assets" && payload) {
    const fetchUrl = `${domain}/${balanceReportPageRoute}/${payload}`;

    try {
      const data = await getData(fetchUrl);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } catch (error) {
      console.error(error.message);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(error.message);
    }

    return;
  }

  if (req.method === "GET" && segment === "cashflow" && payload) {
    const fetchUrl = `${domain}/${cashflowReportPageRoute}/${payload}`;

    try {
      const data = await getData(fetchUrl);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } catch (error) {
      console.error(error.message);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(error.message);
    }

    return;
  }

  if (req.method === "GET" && segment === "pnl" && payload) {
    const fetchUrl = `${domain}/${profitAndLossPageRoute}/${payload}`;
    try {
      const data = await getData(fetchUrl);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } catch (error) {
      console.error(error.message);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(error.message);
    }

    return;
  }

  if (req.method === "GET" && segment === "dividends" && payload) {
    try {
      const data = await getDividendsData(payload);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } catch (error) {
      console.error(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(error.message);
    }

    return;
  }

  if (req.method === "GET" && segment) {
    try {
      const data = await getCommonData(segment);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } catch (error) {
      console.error(error.message);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(error.message);
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
