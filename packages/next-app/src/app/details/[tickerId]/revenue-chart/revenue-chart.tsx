import { ChartConfig } from "@/components/ui/chart";
import { getTickerInfo } from "../../api/ticker-info.api";
import Chart from "./ui/charts/chart";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#2563eb",
  },
  profit: {
    label: "Profit",
    color: "#eb6b25",
  },
  price: {
    label: "Price",
    color: "#DE639A",
  },
} satisfies ChartConfig;

export default async function RevenueChart({ tickerId }: { tickerId: string }) {
  const data = await getTickerInfo(tickerId);

  const chartData = data!.map((row) => {
    return {
      year: row.year,
      revenue:
        Math.round(
          (row["Przychody ze sprzedaży"] / row["Liczba akcji"]) * 1000 * 10
        ) / 10,
      profit:
        Math.round((row["Zysk netto"] / row["Liczba akcji"]) * 1000 * 10) / 10,
      price: row["Kurs"],
    };
  });

  return <Chart chartConfig={chartConfig} chartData={chartData} />;
}
