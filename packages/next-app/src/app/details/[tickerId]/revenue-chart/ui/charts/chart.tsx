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
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";

type ChartDataItem = {
  year: string;
  revenue: number;
  profit: number;
  price: number;
};

export type ChartProps = {
  chartConfig: ChartConfig;
  chartData: ChartDataItem[];
};

export default function Chart({ chartConfig, chartData }: ChartProps) {
  const minRevenue = Math.min(...chartData.map((item) => item.revenue));
  const minProfit = Math.min(...chartData.map((item) => item.profit));
  const minPrice = Math.min(...chartData.map((item) => item.price));
  const maxRevenue = Math.max(...chartData.map((item) => item.revenue));
  const maxProfit = Math.max(...chartData.map((item) => item.profit));
  const maxPrice = Math.max(...chartData.map((item) => item.price));

  const yDomain = [
    Math.round(Math.min(minRevenue, minProfit, minPrice)) - 5,
    Math.round(Math.max(maxRevenue, maxProfit, maxPrice)) + 5,
  ];

  console.log(yDomain)

  return (
    <ChartContainer config={chartConfig} className="size-full">
      <ComposedChart data={chartData}>
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
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
        <Bar
          dataKey="profit"
          fill="var(--color-profit)"
          radius={4}
          label={{ fill: "white" }}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke="var(--color-price)"
          strokeWidth={2}
        />
      </ComposedChart>
    </ChartContainer>
  );
}
