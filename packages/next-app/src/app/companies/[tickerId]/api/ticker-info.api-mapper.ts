import { AssetsInfoApi } from "@/app/actions/get-assets";
import { CashflowInfoApi } from "@/app/actions/get-cashflow";
import { CommonDataApi } from "@/app/actions/get-common-data";
import { PnlInfoApi } from "@/app/actions/get-pnl";
import { ShareInfoApi } from "@/app/actions/get-shares";

import { AssetsInfo } from "../../../model/assets-info";
import { CashflowInfo } from "../../../model/cashflow-info";
import { ShareInfo } from "../../../model/share-info";
import { TickerInfo, TickerYearInfo } from "../../../model/ticker-info";

export function mapTickerInfoApiToDm(
  tickerInfo: PnlInfoApi[],
  sharesInfo: ShareInfoApi[],
  assetsInfo: AssetsInfoApi[],
  cashflowInfo: CashflowInfoApi[],
  commonData: CommonDataApi
): TickerInfo {
  const sharesInfoFiltered = sharesInfo.filter(
    (item) => item && item["Liczba akcji"] && item["Kurs"]
  );
  const sharesMap: {
    [key: string]: ShareInfo;
  } = sharesInfoFiltered.reduce((result, item) => {
    const [year] = item.year.split("/");
    const price = Number(item["Kurs"].split(",").join("."));
    const count = Number(item["Liczba akcji"].split(" ").join(""));

    return { ...result, [year]: { Kurs: price, "Liczba akcji": count } };
  }, {});

  const assetsInfoList = assetsInfo
    .filter((item) => item)
    .map<AssetsInfo>((item) => {
      const assets = Number(item["Aktywa razem"].split(" ").join(""));
      const equity = Number(
        item["Kapitał własny akcjonariuszy jednostki dominującej"]
          .split(" ")
          .join("")
      );
      const currentLiabilities = Number(
        item["Zobowiązania krótkoterminowe"].split(" ").join("")
      );
      const nonCurrentLiabilities = Number(
        item["Zobowiązania długoterminowe"].split(" ").join("")
      );

      return {
        "Aktywa razem": assets,
        "Kapitał własny akcjonariuszy jednostki dominującej": equity,
        "Zobowiązania długoterminowe": nonCurrentLiabilities,
        "Zobowiązania krótkoterminowe": currentLiabilities,
      };
    }, {});

  const cashflowInfoList = cashflowInfo
    .filter((item) => item)
    .map<CashflowInfo>((item) => {
      const finCashflow = Number(
        item["Przepływy pieniężne z działalności finansowej"].split(" ").join("")
      );
      const investCashflow = Number(
        item["Przepływy pieniężne z działalności inwestycyjnej"]
          .split(" ")
          .join("")
      );
      const operationalCashflow = Number(
        item["Przepływy pieniężne z działalności operacyjnej"].split(" ").join("")
      );

      return {
        "Przepływy pieniężne z działalności finansowej": finCashflow,
        "Przepływy pieniężne z działalności inwestycyjnej": investCashflow,
        "Przepływy pieniężne z działalności operacyjnej": operationalCashflow,
      };
    }, {});

  const yToYData = tickerInfo
    .filter((item) => item)
    .map((row, index) => {
      const sharesRow =
        sharesMap[index === tickerInfo.length - 1 ? "2024" : row.year];

      const assetsRow = assetsInfoList[index];
      const cashflowRow = cashflowInfoList[index];

      const mappedRow = Object.keys(row).reduce<TickerInfo>((acc, key) => {
        if (key === "Data publikacji") {
          return acc;
        }

        if (key === "year") {
          return {
            ...acc,
            year: row[key],
          } as TickerInfo;
        }

        const value = row[key];
        if (!value) {
          return {
            ...acc,
            [key]: 0,
          };
        }

        return {
          ...acc,
          [key]: Number(value.split(" ").join("")),
        };
      }, {} as TickerInfo);

      return {
        ...(sharesRow || {}),
        ...mappedRow,
        ...(assetsRow || {}),
        ...(cashflowRow || {}),
      } as unknown as TickerYearInfo;
    })
    .slice(Math.max(tickerInfo.length - 11, 0));

  return {
    price: Number(commonData.currentPrice),
    description: commonData.companyDescription,
    website: commonData.website,
    yearToYearData: yToYData,
  };
}
