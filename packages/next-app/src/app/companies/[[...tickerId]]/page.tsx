import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Suspense } from "react";

import CashflowChart from "./cashflow-chart/cashflow-chart";
import InfoTable from "./info-table/info-table";
import LiabilitiesChart from "./liabilities-chart/liabilities-chart";
import RevenueChart from "./revenue-chart/revenue-chart";
import ReturnChart from "./roe-chart/roe-chart";

export default async function Page({
  params,
}: {
  params: Promise<{ tickerId: string }>;
}) {
  const [tickerId] = (await params).tickerId ?? [];

  if (!tickerId) {
    return (
      <Card className="flex flex-1 items-center justify-center min-h-0 border-t-0 border-border rounded-tl-none border-l-0">
        Please select a company from the search bar
      </Card>
    );
  }

  return (
    <Card className="flex flex-1 min-h-0 border-t-0 border-border rounded-tl-none border-l-0">
      <ResizablePanelGroup direction="horizontal" className="size-full">
        <ResizablePanel defaultSize={40} className="flex flex-col">
          <Suspense fallback={<>Loading Data Table...</>}>
            <InfoTable tickerId={tickerId} />
          </Suspense>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60} className="flex flex-col">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50} className="flex flex-col">
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={50} className="flex flex-col">
                  <Suspense fallback={<>Loading Revenue Chart...</>}>
                    <CardHeader>
                      <CardTitle>Revenue Chart</CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-auto p-0 pb-6 flex-1 min-h-0">
                      <RevenueChart tickerId={tickerId} />
                    </CardContent>
                  </Suspense>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50} className="flex flex-col">
                  <Suspense fallback={<>Loading Liabilities Chart...</>}>
                    <CardHeader>
                      <CardTitle>Liabilities Chart</CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-auto p-0 pb-6 pr-6 flex-1 min-h-0">
                      <LiabilitiesChart tickerId={tickerId} />
                    </CardContent>
                  </Suspense>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={50} className="flex flex-col">
                  <Suspense fallback={<>Loading Return Chart...</>}>
                    <CardHeader>
                      <CardTitle>Profitability Chart</CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-auto p-0 pb-6 pr-6 flex-1 min-h-0">
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
                    <CardContent className="overflow-auto p-0 pb-6 pr-6 flex-1 min-h-0">
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
