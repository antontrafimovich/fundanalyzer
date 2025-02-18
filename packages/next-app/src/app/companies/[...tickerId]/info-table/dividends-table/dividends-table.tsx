import { getDividendsData, getTickerInfo } from "../../api/ticker-info.api";
import { DividendsTableClient } from "./ui/dividends-table-client";

export const DividendsTable = async ({ tickerId }: { tickerId: string }) => {
  const dividends = await getDividendsData(tickerId);
  const tickerInfo = (await getTickerInfo(tickerId))!;

  const last4YarsMiddlePrice =
    tickerInfo.yearToYearData
      .slice(0, 4)
      .map((year) => year["Kurs"])
      .reduce((a, b) => a + b, 0) / 4;

  const data = dividends.map((dividend, index) => {
    const tickerInfoForYear = tickerInfo.yearToYearData.at((index + 1) * -1);
    const tickerInfoForPrevYear = tickerInfo.yearToYearData.at(
      (index + 2) * -1
    );
    const dpsCurrentYear =
      (dividend.dividends * 1000) / tickerInfoForYear!["Liczba akcji"];

    const rpsCurrentYear =
      (tickerInfoForYear!["Przychody ze sprzedaży"] * 1000) /
      tickerInfoForYear!["Liczba akcji"];

    const ppsCurrentYear =
      (tickerInfoForYear!["Zysk netto"] * 1000) /
      tickerInfoForYear!["Liczba akcji"];

    const dpr = dpsCurrentYear / ppsCurrentYear;

    const price = index === 0 ? tickerInfo.price : tickerInfoForYear!["Kurs"];

    const p2e = price / ppsCurrentYear;

    const dy = dpsCurrentYear / price;

    const dyVsLast4YearsMiddlePrice = dpsCurrentYear / last4YarsMiddlePrice;

    if (!tickerInfoForPrevYear) {
      return {
        year: dividend.year,
        DPS: dpsCurrentYear,
        RPS: rpsCurrentYear,
        PPS: ppsCurrentYear,
        DPR: dpr,
        "DPS Dynamic": null,
        "RPS Dynamic": null,
        "PPS Dynamic": null,
        dividends: dividend.dividends,
        Price: price,
        "P/E": p2e,
        DY: dy,
        "DY vs Last 4 Years":
          index > dividends.length - 5 ? null : dyVsLast4YearsMiddlePrice,
      } as const;
    }

    const dpsPrevYear =
      (dividends[index + 1]?.dividends * 1000) /
      tickerInfoForPrevYear!["Liczba akcji"];

    const rpsPrevYear =
      (tickerInfoForPrevYear!["Przychody ze sprzedaży"] * 1000) /
      tickerInfoForPrevYear!["Liczba akcji"];

    const ppsPrevYear =
      (tickerInfoForPrevYear!["Zysk netto"] * 1000) /
      tickerInfoForPrevYear!["Liczba akcji"];

    return {
      year: dividend.year,
      RPS: rpsCurrentYear,
      "RPS Dynamic": rpsPrevYear ? rpsCurrentYear / rpsPrevYear - 1 : null,
      PPS: ppsCurrentYear,
      "PPS Dynamic": ppsPrevYear ? ppsCurrentYear / ppsPrevYear - 1 : null,
      DPS: dpsCurrentYear,
      "DPS Dynamic": dpsPrevYear ? dpsCurrentYear / dpsPrevYear - 1 : null,
      dividends: dividend.dividends,
      DPR: dpr,
      Price: price,
      "P/E": p2e,
      DY: dy,
      "DY vs Last 4 Years":
        index > dividends.length - 5 ? null : dyVsLast4YearsMiddlePrice,
    } as const;
  });

  return <DividendsTableClient data={data} boldKeys={["DPR", "DPS", "DY"]} />;
};
