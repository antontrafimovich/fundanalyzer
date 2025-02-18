import { getTickers } from "@/app/actions/get-tickers";
import { CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Panel } from "../ui/panel/panel";
import { CommonDataTable } from "./common-data-table/common-data-table";
import { DividendsTable } from "./dividends-table/dividends-table";

export default async function InfoTable({ tickerId }: { tickerId: string }) {
  const companies = await getTickers();

  const company = companies.find((company) => company.ut === tickerId)!;

  return (
    <Tabs defaultValue="common" className="size-full">
      <Panel>
        <Panel.Header>
          <CardTitle className="flex gap-3 items-center">
            <span>{company.text}</span>
            <TabsList className="h-7 flex">
              <TabsTrigger className="px-1 py-0.25" value="common">Common</TabsTrigger>
              <TabsTrigger className="px-1 ml-2 py-0.25" value="dividends">Dividends</TabsTrigger>
            </TabsList>
          </CardTitle>
        </Panel.Header>
        <Panel.Content className="flex-1 min-h-0 pr-1">
          <TabsContent value="common" className="h-full">
            <CommonDataTable ticker={tickerId} />
          </TabsContent>
          <TabsContent value="dividends" className="size-full">
            <DividendsTable tickerId={tickerId} />
          </TabsContent>
        </Panel.Content>
      </Panel>
    </Tabs>
  );
}
