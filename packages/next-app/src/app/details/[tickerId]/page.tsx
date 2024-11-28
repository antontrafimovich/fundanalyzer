import { Suspense } from "react";
import DataTable from "./data-table/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RevenueChart from "./revenue-chart/revenue-chart";

export default async function Page({
  params,
}: {
  params: Promise<{ tickerId: string }>;
}) {
  const tickerId = (await params).tickerId;

  await fetch(`http://localhost:4000/${tickerId}`);

  return (
    <div className="flex">
      <Card className="w-1/2 flex flex-col first:basis-auto first:grow-0 first:shrink-0">
        <Suspense fallback={<>Loading Data Table...</>}>
          <CardHeader>
            <CardTitle>Raw Info</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable tickerId={tickerId} />
          </CardContent>
        </Suspense>
      </Card>

      <Card className="w-1/2 flex flex-col first:basis-auto first:grow-0 first:shrink-0">
        <Suspense fallback={<>Loading Revenue Chart...</>}>
          <CardHeader>
            <CardTitle>Revenue Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart tickerId={tickerId} />
          </CardContent>
        </Suspense>
      </Card>
    </div>
  );
}
