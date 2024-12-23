import { getTickers } from "@/app/actions/get-tickers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";

import CashflowChart from "./cashflow-chart/cashflow-chart";
import DataTable from "./data-table/data-table";
import RevenueChart from "./revenue-chart/revenue-chart";
import ReturnChart from "./roe-chart/roe-chart";

export default async function Page({
  params,
}: {
  params: Promise<{ tickerId: string }>;
}) {
  const tickerId = (await params).tickerId;

  const companies = await getTickers();

  const company = companies.find((company) => company.ut === tickerId)!;

  await fetch(`http://localhost:4000/${tickerId}`);

  return (
    <div className="flex flex-1 gap-2 min-h-0">
      <Card className="flex rounded-tl-none flex-col flex-1 min-w-0 border-border-primary border-t-0">
        <Suspense fallback={<>Loading Data Table...</>}>
          <CardHeader>
            <CardTitle>{company.text}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 pr-1">
            <DataTable tickerId={tickerId} />
          </CardContent>
        </Suspense>
      </Card>

      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <Card className="flex flex-1 min-h-0 flex-col border-border-primary">
          <Suspense fallback={<>Loading Revenue Chart...</>}>
            <CardHeader>
              <CardTitle>Revenue Chart</CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto">
              <RevenueChart tickerId={tickerId} />
            </CardContent>
          </Suspense>
        </Card>
        <div className="flex flex-1 gap-2 min-h-0">
          <Card className="flex flex-col flex-1 min-w-0 border-border-primary">
            <Suspense fallback={<>Loading Return Chart...</>}>
              <CardHeader>
                <CardTitle>Profitability Chart</CardTitle>
              </CardHeader>
              <CardContent className="overflow-auto flex-1 min-h-0">
                <ReturnChart tickerId={tickerId} />
              </CardContent>
            </Suspense>
          </Card>
          <Card className="flex flex-col flex-1 min-w-0 border-border-primary">
            <Suspense fallback={<>Loading Cashflow Chart...</>}>
              <CardHeader>
                <CardTitle>Cashflow Chart</CardTitle>
              </CardHeader>
              <CardContent className="overflow-auto flex-1 min-h-0">
                <CashflowChart tickerId={tickerId} />
              </CardContent>
            </Suspense>
          </Card>
        </div>
      </div>
    </div>
  );
}
