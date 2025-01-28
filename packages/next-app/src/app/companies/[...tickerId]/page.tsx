import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Suspense } from "react";

import { getTickerInfo } from "./api/ticker-info.api";
import CashflowChart from "./cashflow-chart/cashflow-chart";
import InfoTable from "./info-table/info-table";
import LiabilitiesChart from "./liabilities-chart/liabilities-chart";
import RevenueChart from "./revenue-chart/revenue-chart";
import ReturnChart from "./roe-chart/roe-chart";
import { AppSidebar } from "./ui/sidebar/sidebar";

// export async function generateStaticParams() {
//   return [{ tickerId: ["CD-PROJEKT"] }];
// }

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

  await getTickerInfo(tickerId);

  return (
    <SidebarProvider className="min-h-0 flex-1">
      <AppSidebar tickerId={tickerId} />
      <main className="flex-1 min-w-0 relative">
        <div className="absolute w-[30px] flex items-center justify-center h-[60px] rounded-2xl bg-[#f9fafb] cursor-pointer border border-[#e7e7e9] left-[-15px] z-50 bottom-0 top-0 m-[auto]">
          <SidebarTrigger />
        </div>

        <Card className="flex flex-1 min-h-0 border-t-0 h-full border-border rounded-tl-none rounded-bl-none border-l-0">
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
      </main>
    </SidebarProvider>
  );
}
