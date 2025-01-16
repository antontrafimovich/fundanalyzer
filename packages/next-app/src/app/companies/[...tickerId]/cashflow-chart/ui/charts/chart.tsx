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
  ReferenceLine,
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
          domain={([dataMin, dataMax]) => {
            const absMax = Math.max(
              Math.abs(Math.ceil(dataMin)),
              Math.abs(Math.floor(dataMax))
            );
            return [
              dataMin >= 0 ? 0 : dataMin - absMax * 0.1,
              dataMax + absMax * 0.1,
            ];
          }}
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
