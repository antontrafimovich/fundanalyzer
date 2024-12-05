import { ShareInfo } from "../model/share-info";
import { TickerInfo } from "../model/ticker-info";
import { ShareInfoApi, TickerInfoApi } from "./ticker-info.api-model";

export function mapTickerInfoApiToDm(
  tickerInfo: TickerInfoApi[],
  sharesInfo: ShareInfoApi[]
): TickerInfo[] {
  const sharesMap: {
    [key: string]: ShareInfo;
  } = sharesInfo.reduce((result, item) => {
    const [year] = item.year.split("/");
    const price = Number(item["Kurs"].split(",").join("."));
    const count = Number(item["Liczba akcji"].split(" ").join(""));

    return { ...result, [year]: { Kurs: price, "Liczba akcji": count } };
  }, {});

  return tickerInfo.map<TickerInfo>((row, index) => {
    const sharesRow =
      sharesMap[index === tickerInfo.length - 1 ? "2024" : row.year];

    const mappedRow = Object.keys(row).reduce<TickerInfo>((acc, key) => {
      if (key === "Data publikacji") {
        return {
          ...acc,
          [key]: new Date(row[key]).getDate(),
        };
      }
      console.log(row[key]);
      return {
        ...acc,
        [key]: Number(row[key].split(" ").join("")),
      };
    }, {} as TickerInfo);

    return {
      ...sharesRow,
      ...mappedRow,
    };
  });
}
