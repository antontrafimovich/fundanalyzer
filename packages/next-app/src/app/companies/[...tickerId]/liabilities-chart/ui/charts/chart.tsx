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
  liabilities: number;
  bookValue: number;
  price: number;
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
          dataKey="bookValue"
          fill="var(--color-bookValue)"
          stackId={"test"}
        />
        <Bar
          dataKey="liabilities"
          fill="var(--color-liabilities)"
          stackId={"test"}
        />
        <Bar dataKey="price" fill="var(--color-price)" />
      </BarChart>
    </ChartContainer>
  );
}
