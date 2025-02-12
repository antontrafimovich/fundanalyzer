import { getTickers } from "@/app/actions/get-tickers";
import { CardTitle } from "@/components/ui/card";

import { getTickerInfo } from "../api/ticker-info.api";
import { Panel } from "../ui/panel/panel";
import { Table } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DividendsTable } from "./dividends-table/dividends-table";

export default async function InfoTable({ tickerId }: { tickerId: string }) {
  const data = await getTickerInfo(tickerId);
  const companies = await getTickers();

  const company = companies.find((company) => company.ut === tickerId)!;

  return (
    <Tabs defaultValue="common" className="size-full">
      <Panel>
        <Panel.Header>
          <CardTitle className="flex gap-3 items-center">
            <span>{company.text}</span>
            <TabsList className="grid w-[200px] grid-cols-2">
              <TabsTrigger value="common">Common</TabsTrigger>
              <TabsTrigger value="dividends">Dividends</TabsTrigger>
            </TabsList>
          </CardTitle>
        </Panel.Header>
        <Panel.Content className="flex-1 min-h-0 pr-1">
          <TabsContent value="common" className="h-full">
            <Table
              data={data!.yearToYearData}
              boldKeys={[
                "Przychody ze sprzedaży",
                "Zysk ze sprzedaży",
                "Zysk operacyjny (EBIT)",
                "Zysk z działalności gospodarczej",
                "Zysk przed opodatkowaniem",
                "Zysk netto",
                "Zysk netto akcjonariuszy jednostki dominującej",
                "EBITDA",
              ]}
            />
          </TabsContent>
          <TabsContent value="dividends" className="size-full">
            <DividendsTable tickerId={tickerId} />
          </TabsContent>
        </Panel.Content>
      </Panel>
    </Tabs>
  );

  // return (
  //   <Panel>
  //     <Panel.Header>
  //       <CardTitle className="flex items-center gap-1">
  //         <span>{company.text}</span>
  //       </CardTitle>
  //     </Panel.Header>
  //     <Panel.Content className="flex-1 min-h-0 pr-1">
  //       <Table data={data!.yearToYearData} />
  //     </Panel.Content>
  //   </Panel>
  // );
}
