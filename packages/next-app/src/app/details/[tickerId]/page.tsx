import { getTickers } from "@/app/actions/get-tickers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";

import CashflowChart from "./cashflow-chart/cashflow-chart";
import DataTable from "./data-table/data-table";
import RevenueChart from "./revenue-chart/revenue-chart";
import ReturnChart from "./roe-chart/roe-chart";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

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
    <Card className="flex flex-1 min-h-0 border-t-0 border-border-primary rounded-tl-none border-l-0">
      <ResizablePanelGroup direction="horizontal" className="size-full">
        <ResizablePanel defaultSize={50} className="flex flex-col">
          <Suspense fallback={<>Loading Data Table...</>}>
            <CardHeader>
              <CardTitle>{company.text}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 pr-1">
              <DataTable tickerId={tickerId} />
            </CardContent>
          </Suspense>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} className="flex flex-col">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50} className="flex flex-col">
              <Suspense fallback={<>Loading Revenue Chart...</>}>
                <CardHeader>
                  <CardTitle>Revenue Chart</CardTitle>
                </CardHeader>
                <CardContent className="overflow-auto">
                  <RevenueChart tickerId={tickerId} />
                </CardContent>
              </Suspense>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={50} className="flex flex-col">
                  <Suspense fallback={<>Loading Return Chart...</>}>
                    <CardHeader>
                      <CardTitle>Profitability Chart</CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-auto flex-1 min-h-0">
                      <ReturnChart tickerId={tickerId} />
                    </CardContent>
                  </Suspense>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50} className="flex flex-col">
                  <Suspense fallback={<>Loading Cashflow Chart...</>}>
                    <CardHeader>
                      <CardTitle>Cashflow Chart</CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-auto flex-1 min-h-0">
                      <CashflowChart tickerId={tickerId} />
                    </CardContent>
                  </Suspense>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Card>
  );
}
