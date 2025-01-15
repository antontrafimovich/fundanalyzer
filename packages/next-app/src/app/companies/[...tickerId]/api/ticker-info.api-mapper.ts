import { AssetsInfo } from "../../../model/assets-info";
import { CashflowInfo } from "../../../model/cashflow-info";
import { ShareInfo } from "../../../model/share-info";
import { TickerInfo } from "../../../model/ticker-info";
import {
  AssetsInfoApi,
  CashflowInfoApi,
  ShareInfoApi,
  TickerInfoApi,
} from "./ticker-info.api-model";

export function mapTickerInfoApiToDm(
  tickerInfo: TickerInfoApi[],
  sharesInfo: ShareInfoApi[],
  assetsInfo: AssetsInfoApi[],
  cashflowInfo: CashflowInfoApi[]
): TickerInfo[] {
  const sharesMap: {
    [key: string]: ShareInfo;
  } = sharesInfo.reduce((result, item) => {
    const [year] = item.year.split("/");
    const price = Number(item["Kurs"].split(",").join("."));
    const count = Number(item["Liczba akcji"].split(" ").join(""));

    return { ...result, [year]: { Kurs: price, "Liczba akcji": count } };
  }, {});

  const assetsInfoList = assetsInfo.map<AssetsInfo>((item) => {
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

  const cashflowInfoList = cashflowInfo.map<CashflowInfo>((item) => {
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

  return tickerInfo
    .map<TickerInfo>((row, index) => {
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

        return {
          ...acc,
          [key]: Number(row[key].split(" ").join("")),
        };
      }, {} as TickerInfo);

      return {
        ...sharesRow,
        ...mappedRow,
        ...assetsRow,
        ...cashflowRow,
      } as unknown as TickerInfo;
    })
    .slice(Math.max(tickerInfo.length - 11, 0));
}
