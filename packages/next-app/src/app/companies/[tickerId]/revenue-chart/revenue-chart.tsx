import { ChartConfig } from "@/components/ui/chart";
import { getTickerInfo } from "../api/ticker-info.api";
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
  
  // Measure getTickerInfo() performance
  const startTime = performance.now();
  const data = await getTickerInfo(tickerId);
  const endTime = performance.now();
  const executionTime = endTime - startTime;
  console.log(`Performance measurement - getTickerInfo() execution time: ${executionTime.toFixed(2)}ms`);

  const chartData = data!.yearToYearData
    .map((row, index, y2yData) => {
      return {
        year: row.year,
        revenue:
          Math.round(
            (row["Przychody ze sprzedaży"] / row["Liczba akcji"]) * 1000 * 10
          ) / 10,
        profit:
          Math.round((row["Zysk netto"] / row["Liczba akcji"]) * 1000 * 10) /
          10,
        price: index === y2yData.length - 1 ? data!.price : row["Kurs"],
      };
    })
    .filter((item) => item.price > 0);

  return <Chart chartConfig={chartConfig} chartData={chartData} />;
}
