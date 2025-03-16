import { Card, CardTitle } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Suspense } from "react";

import CashflowChart from "./cashflow-chart/cashflow-chart";
import InfoTable from "./info-table/info-table";
import LiabilitiesChart from "./liabilities-chart/liabilities-chart";
import RevenueChart from "./revenue-chart/revenue-chart";
import ReturnChart from "./roe-chart/roe-chart";
import { ResizableChartLayout } from "./ui/chart-layout/resizable-chart-layout";
import { Panel } from "./ui/panel/panel";
import { AppSidebar } from "./ui/sidebar/sidebar";

export default async function Page({
  params,
}: {
  params: Promise<{ tickerId: string }>;
}) {
  const tickerId = (await params).tickerId;

  if (!tickerId || tickerId === "_") {
    return (
      <Card className="flex flex-1 items-center justify-center min-h-0 font-bold border-t-0 border-border rounded-tl-none border-l-0">
        Please select a company from the search or open one of the tabs
      </Card>
    );
  }

  return (
    <SidebarProvider className="min-h-0 flex-1">
      <Suspense fallback={<>Loading Sidebar...</>}>
        <AppSidebar tickerId={tickerId} />
      </Suspense>
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
              <ResizableChartLayout
                blocks={[
                  <Suspense fallback={<>Loading Revenue Chart...</>} key={0}>
                    <Panel>
                      <Panel.Header>
                        <CardTitle>Revenue Chart</CardTitle>
                      </Panel.Header>
                      <Panel.Content className="overflow-auto p-0 pb-6 flex-1 min-h-0">
                        <RevenueChart tickerId={tickerId} />
                      </Panel.Content>
                    </Panel>
                  </Suspense>,
                  <Suspense
                    fallback={<>Loading Liabilities Chart...</>}
                    key={1}
                  >
                    <Panel>
                      <Panel.Header>
                        <CardTitle>Liabilities Chart</CardTitle>
                      </Panel.Header>
                      <Panel.Content className="overflow-auto p-0 pb-6 pr-6 flex-1 min-h-0">
                        <LiabilitiesChart tickerId={tickerId} />
                      </Panel.Content>
                    </Panel>
                  </Suspense>,
                  <Suspense fallback={<>Loading Return Chart...</>} key={2}>
                    <Panel>
                      <Panel.Header>
                        <CardTitle>Profitability Chart</CardTitle>
                      </Panel.Header>
                      <Panel.Content className="overflow-auto p-0 pb-6 pr-6 flex-1 min-h-0">
                        <ReturnChart tickerId={tickerId} />
                      </Panel.Content>
                    </Panel>
                  </Suspense>,
                  <Suspense fallback={<>Loading Cashflow Chart...</>} key={3}>
                    <Panel>
                      <Panel.Header>
                        <CardTitle>Cashflow Chart</CardTitle>
                      </Panel.Header>
                      <Panel.Content className="overflow-auto p-0 pb-6 pr-6 flex-1 min-h-0">
                        <CashflowChart tickerId={tickerId} />
                      </Panel.Content>
                    </Panel>
                  </Suspense>,
                ]}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </Card>
      </main>
    </SidebarProvider>
  );
}
