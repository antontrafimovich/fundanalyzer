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
  const minLiabilities = Math.min(...chartData.map((item) => item.liabilities));
  const minBookValue = Math.min(...chartData.map((item) => item.bookValue));
  const minPrice = Math.min(...chartData.map((item) => item.price));
  const maxLiabilities = Math.max(...chartData.map((item) => item.liabilities));
  const maxBookValue = Math.max(...chartData.map((item) => item.bookValue));
  const maxPrice = Math.max(...chartData.map((item) => item.price));

  const minDomain = Math.floor(
    Math.min(minLiabilities, minBookValue, minPrice)
  );

  const maxDomain = Math.ceil(Math.max(maxLiabilities, maxBookValue, maxPrice));

  const maxAbsDomain = Math.max(Math.abs(minDomain), Math.abs(maxDomain));

  const yDomain = [
    minDomain >= 0 ? 0 : minDomain - maxAbsDomain * 0.1,
    maxDomain + maxAbsDomain * 0.1,
  ];

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
