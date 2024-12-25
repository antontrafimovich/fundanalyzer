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

  const minDomain = Math.round(Math.min(minRevenue, minProfit));
  const yDomain = [
    minDomain >= 0 ? 0 : minDomain - 5,
    Math.ceil(Math.max(maxRevenue, maxProfit)) + 5,
  ];

  const priceDomain = [
    Math.ceil(minPrice < 5 ? minPrice : minPrice - 5),
    Math.round(Math.ceil(maxPrice + 5) / 10) * 10,
  ];

  return (
    <ChartContainer config={chartConfig} className="size-full">
      <ComposedChart data={chartData} margin={{ left: 0 }} cx={5}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="year"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          // tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          allowDecimals={false}
          domain={yDomain}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          yAxisId={"revenue"}
          // tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          domain={priceDomain}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          orientation="right"
          yAxisId={"price"}
          // tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          yAxisId={"revenue"}
          dataKey="revenue"
          fill="var(--color-revenue)"
          radius={4}
          label={{
            fill: "var(--color-revenue)",
            position: "top",
            fontWeight: "bold",
          }}
        />
        <Bar
          yAxisId={"revenue"}
          dataKey="profit"
          fill="var(--color-profit)"
          radius={4}
          label={{
            fill: "var(--color-profit)",
            position: "top",
            fontWeight: "bold",
          }}
        />
        <Line
          yAxisId={"price"}
          type="monotone"
          dataKey="price"
          stroke="var(--color-price)"
          strokeWidth={2}
          activeDot={{ r: 6 }}
        />
      </ComposedChart>
    </ChartContainer>
  );
}
