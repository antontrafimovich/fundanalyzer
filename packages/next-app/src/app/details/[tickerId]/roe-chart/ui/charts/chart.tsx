"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';


export type ChartProps = {
  chartConfig: ChartConfig;
  chartData: any;
};

export default function Chart({ chartConfig, chartData }: ChartProps) {
  return (
    <ChartContainer config={chartConfig} className="size-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="year"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          // tickFormatter={(value) => value.slice(0, 3)}
        />
        
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="roa" fill="var(--color-roa)" radius={4} />
        <Bar dataKey="roe" fill="var(--color-roe)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
