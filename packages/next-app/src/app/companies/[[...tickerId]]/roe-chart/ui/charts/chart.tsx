"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
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
  roa: number;
  roe: number;
};

type ExtendedChartDataItem = ChartDataItem & {
  midPoint: number;
};

export type ChartProps = {
  chartConfig: ChartConfig;
  chartData: ChartDataItem[];
};

export default function Chart({ chartConfig, chartData }: ChartProps) {
  const finalChartData = useMemo(() => {
    return chartData.reduce<ExtendedChartDataItem[]>((result, next) => {
      if (result.length === 0) {
        return [{ ...next, midPoint: next.roa }];
      }

      const roaSum = [...result.map((item) => item.roa), next.roa].reduce(
        (acc, curr) => acc + curr
      );

      const midRoa = roaSum / (result.length + 1);

      return [...result, { ...next, midPoint: midRoa }];
    }, []);
  }, [chartData]);

  const returnDomain = useMemo(() => {
    const minRoa = Math.min(...finalChartData.map((item) => item.roa));
    const minRoe = Math.min(...finalChartData.map((item) => item.roe));
    const maxRoa = Math.max(...finalChartData.map((item) => item.roa));
    const maxRoe = Math.max(...finalChartData.map((item) => item.roe));

    const minDomain = Math.round(Math.min(minRoa, minRoe));
    return [
      minDomain >= 0 ? 0 : minDomain - 0.02,
      Math.max(maxRoa, maxRoe) + 0.02,
    ];
  }, [finalChartData]);

  return (
    <ChartContainer config={chartConfig} className="size-full">
      <ComposedChart accessibilityLayer data={finalChartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="year"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          // tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          domain={returnDomain}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => Number(value * 100).toFixed(0) + "%"}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              valueFormatter={(value) =>
                (Number(value as string) * 100).toFixed(0) + "%"
              }
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="roe" fill="var(--color-roe)" radius={4} />
        <Bar dataKey="roa" fill="var(--color-roa)" radius={4} />
        <Line
          type="monotone"
          dataKey="midPoint"
          stroke="#DE639A"
          strokeWidth={2}
          activeDot={{ r: 6 }}
        />
      </ComposedChart>
    </ChartContainer>
  );
}
