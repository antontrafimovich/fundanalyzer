export type TickerYearInfo = {
  [key: string]: number;
} & { "Data publikacji": string; year: string };

export type TickerInfo = {
  price: number;
  description: string;
  website: string;
  yearToYearData: TickerYearInfo[];
};
