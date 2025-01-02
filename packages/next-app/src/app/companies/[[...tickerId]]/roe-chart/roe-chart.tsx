import { ChartConfig } from "@/components/ui/chart";
import { getTickerInfo } from "../api/ticker-info.api";
import Chart from "./ui/charts/chart";

const chartConfig = {
  roa: {
    label: "ROA",
    color: "#eb6b25",
  },
  roe: {
    label: "ROE",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export default async function ReturnChart({ tickerId }: { tickerId: string }) {
  const data = await getTickerInfo(tickerId);

  const chartData = data!.map((row) => {
    return {
      year: row.year,
      roa:
        Math.round((row["Zysk netto"] / row["Aktywa razem"]) * 10000) / 10000,
      roe:
        Math.round(
          (row["Zysk netto"] /
            row["Kapitał własny akcjonariuszy jednostki dominującej"]) *
            10000
        ) / 10000,
    };
  });

  return <Chart chartConfig={chartConfig} chartData={chartData} />;
}
