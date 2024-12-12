import { AssetsInfo } from "../model/assets-info";
import { ShareInfo } from "../model/share-info";
import { TickerInfo } from "../model/ticker-info";
import {
  AssetsInfoApi,
  ShareInfoApi,
  TickerInfoApi,
} from "./ticker-info.api-model";

export function mapTickerInfoApiToDm(
  tickerInfo: TickerInfoApi[],
  sharesInfo: ShareInfoApi[],
  assetsInfo: AssetsInfoApi[]
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

    return {
      "Aktywa razem": assets,
      "Kapitał własny akcjonariuszy jednostki dominującej": equity,
    };
  }, {});

  return tickerInfo.map<TickerInfo>((row, index) => {
    const sharesRow =
      sharesMap[index === tickerInfo.length - 1 ? "2024" : row.year];

    const assetsRow = assetsInfoList[index];

    const mappedRow = Object.keys(row).reduce<TickerInfo>((acc, key) => {
      if (key === "Data publikacji") {
        return {
          ...acc,
          [key]: row[key],
        } as TickerInfo;
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
    } as unknown as TickerInfo;
  });
}
