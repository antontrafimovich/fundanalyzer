import { format } from "d3-format";

export const formatNumber = (number: number, specifier: string) => {
  return format(specifier)(number);
};
