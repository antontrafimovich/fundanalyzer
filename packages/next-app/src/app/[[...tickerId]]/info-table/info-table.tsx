import { getTickerInfo } from "../api/ticker-info.api";
import { Table } from "./ui/table";

export default async function InfoTable({ tickerId }: { tickerId: string }) {
  const data = await getTickerInfo(tickerId);

  return <Table data={data!} />;
}
