"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartDataItem = {
  year: string;
  operationalCashflow: number;
  investCashflow: number;
  financeCashflow: number;
};

export type ChartProps = {
  chartConfig: ChartConfig;
  chartData: ChartDataItem[];
};

export default function Chart({ chartConfig, chartData }: ChartProps) {
  const minOperationalCashflow = Math.min(
    ...chartData.map((item) => item.operationalCashflow)
  );
  const minInvestCashflow = Math.min(
    ...chartData.map((item) => item.investCashflow)
  );
  const minFinanceCashflow = Math.min(
    ...chartData.map((item) => item.financeCashflow)
  );
  const maxOperationalCashflow = Math.max(
    ...chartData.map((item) => item.operationalCashflow)
  );
  const maxInvestCashflow = Math.max(
    ...chartData.map((item) => item.investCashflow)
  );

  const maxFinanceCashflow = Math.max(
    ...chartData.map((item) => item.financeCashflow)
  );

  const yDomain = [
    Math.round(
      Math.min(minOperationalCashflow, minInvestCashflow, minFinanceCashflow)
    ) - 5,
    Math.round(
      Math.max(maxOperationalCashflow, maxInvestCashflow, maxFinanceCashflow)
    ) + 5,
  ];

  console.log(yDomain);

  return (
    <ChartContainer config={chartConfig} className="size-full">
      <BarChart stackOffset="sign" data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="year"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          // tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          domain={yDomain}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          // tickFormatter={(value) => value.slice(0, 3)}
        />
        <ReferenceLine y={0} stroke="#000" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="operationalCashflow"
          fill="var(--color-operationalCashflow)"
          stackId={"test"}
        />
        <Bar
          dataKey="financeCashflow"
          fill="var(--color-financeCashflow)"
          stackId={"test"}
        />
        <Bar
          dataKey="investCashflow"
          fill="var(--color-investCashflow)"
          stackId={"test"}
        />
      </BarChart>
    </ChartContainer>
  );
}
