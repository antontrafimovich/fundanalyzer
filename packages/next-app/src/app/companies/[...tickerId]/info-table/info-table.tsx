import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTickerInfo } from "../api/ticker-info.api";
import { Table } from "./ui/table";
import { getTickers } from "@/app/actions/get-tickers";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default async function InfoTable({ tickerId }: { tickerId: string }) {
  const data = await getTickerInfo(tickerId);
  const companies = await getTickers();

  console.log(tickerId, "tickerId");

  const company = companies.find((company) => company.ut === tickerId)!;

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-1">
          <SidebarTrigger />
          <span>{company.text}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 pr-1">
        <Table data={data!} />
      </CardContent>
    </>
  );
}
