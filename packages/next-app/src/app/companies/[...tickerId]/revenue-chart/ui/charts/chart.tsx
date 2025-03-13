"use client";

import { formatNumber } from "@/app/shared/utils/number";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
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
  const [loading, setIsLoading] = useState(true);

  console.log(loading);

  return (
    <>
      {loading && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            background: "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          Loading...
        </div>
      )}
      <ChartContainer config={chartConfig} className="size-full">
        <ComposedChart
          data={chartData}
          margin={{ left: 0 }}
          cx={5}
          throttleDelay={100}
        >
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
            domain={([dataMin, dataMax]) => {
              const absMax = Math.max(
                Math.abs(Math.floor(dataMin)),
                Math.abs(Math.ceil(dataMax))
              );
              return [
                dataMin >= 0 ? 0 : dataMin - absMax * 0.1,
                dataMax + absMax * 0.1,
              ];
            }}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            yAxisId={"revenue"}
            tickFormatter={(value) =>
              value % 1 === 0 ? value.toString() : formatNumber(value, ".1f")
            }
          />
          <YAxis
            domain={[
              0,
              (dataMax: number) => Math.floor(dataMax * 1.1 * 10) / 10,
            ]}
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            orientation="right"
            yAxisId={"price"}
            tickFormatter={(value) =>
              value % 1 === 0 ? value.toString() : formatNumber(value, ".1f")
            }
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            yAxisId={"revenue"}
            dataKey="revenue"
            fill="var(--color-revenue)"
            radius={4}
            onAnimationEnd={() => {
              setIsLoading(false);
            }}
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
    </>
  );
}
