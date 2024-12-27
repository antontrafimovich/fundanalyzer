import { ChartConfig } from "@/components/ui/chart";
import { getTickerInfo } from "../api/ticker-info.api";
import Chart from "./ui/charts/chart";

const chartConfig = {
  liabilities: {
    label: "Liabilities",
    color: "#eb6b25",
  },
  bookValue: {
    label: "Book Value",
    color: "#2563eb",
  },
  price: {
    label: "Price",
    color: "#DE639A",
  },
} satisfies ChartConfig;

export default async function LiabilitiesChart({
  tickerId,
}: {
  tickerId: string;
}) {
  const data = await getTickerInfo(tickerId);

  const chartData = data!.map((row) => {
    return {
      year: row.year,
      liabilities:
        Math.round(
          ((row["Zobowiązania długoterminowe"] +
            row["Zobowiązania krótkoterminowe"]) /
            row["Liczba akcji"]) *
            1000 *
            10
        ) / 10,
      bookValue:
        Math.round(
          (row["Kapitał własny akcjonariuszy jednostki dominującej"] /
            row["Liczba akcji"]) *
            1000 *
            10
        ) / 10,
      price: row["Kurs"],
    };
  });

  return <Chart chartConfig={chartConfig} chartData={chartData} />;
}
