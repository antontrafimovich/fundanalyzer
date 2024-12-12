import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";

import DataTable from "./data-table/data-table";
import RevenueChart from "./revenue-chart/revenue-chart";
import ReturnChart from "./roe-chart/roe-chart";

export default async function Page({
  params,
}: {
  params: Promise<{ tickerId: string }>;
}) {
  const tickerId = (await params).tickerId;

  await fetch(`http://localhost:4000/${tickerId}`);

  return (
    <div className="flex gap-3 p-4 h-full">
      <Card className="flex-1 min-w-0 flex flex-col">
        <Suspense fallback={<>Loading Data Table...</>}>
          <CardHeader>
            <CardTitle>Raw Info</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 pr-1">
            <DataTable tickerId={tickerId} />
          </CardContent>
        </Suspense>
      </Card>

      <div className="flex-1 min-w-0 flex flex-col gap-3">
        <Card className="flex flex-1 min-h-0 flex-col">
          <Suspense fallback={<>Loading Revenue Chart...</>}>
            <CardHeader>
              <CardTitle>Revenue Chart</CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto">
              <RevenueChart tickerId={tickerId} />
            </CardContent>
          </Suspense>
        </Card>
        <Card className="flex flex-1 min-h-0 flex-col">
          <Suspense fallback={<>Loading Return Chart...</>}>
            <CardHeader>
              <CardTitle>Profitability Chart</CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto">
              <ReturnChart tickerId={tickerId} />
            </CardContent>
          </Suspense>
        </Card>
      </div>
    </div>
  );
}
