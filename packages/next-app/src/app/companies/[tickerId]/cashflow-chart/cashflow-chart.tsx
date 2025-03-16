import { ChartConfig } from "@/components/ui/chart";
import { getTickerInfo } from "../api/ticker-info.api";
import Chart from "./ui/charts/chart";

const chartConfig = {
  operationalCashflow: {
    label: "Przepływy operacyjne na akcję",
    color: "#2563eb",
  },
  investCashflow: {
    label: "Przełwy inwestycyjne na akcję",
    color: "#F84AA7",
  },
  financeCashflow: {
    label: "Przepływy finansowe na akcje",
    color: "#eb6b25",
  },
} satisfies ChartConfig;

export default async function CashflowChart({
  tickerId,
}: {
  tickerId: string;
}) {
  const data = await getTickerInfo(tickerId);

  const chartData = data!.yearToYearData.map((row) => {
    return {
      year: row.year,
      operationalCashflow:
        Math.round(
          (row["Przepływy pieniężne z działalności operacyjnej"] /
            row["Liczba akcji"]) *
            1000 *
            10
        ) / 10,
      investCashflow:
        Math.round(
          (row["Przepływy pieniężne z działalności inwestycyjnej"] /
            row["Liczba akcji"]) *
            1000 *
            10
        ) / 10,
      financeCashflow:
        Math.round(
          (row["Przepływy pieniężne z działalności finansowej"] /
            row["Liczba akcji"]) *
            1000 *
            10
        ) / 10,
    };
  });

  return <Chart chartConfig={chartConfig} chartData={chartData} />;
}
