import { getTickerInfo } from "../api/ticker-info.api";
import { getSharesInfo } from "./api/ticker-shares.api";

export default async function RevenueChart({ tickerId }: { tickerId: string }) {
  const data = await getTickerInfo(tickerId);
  // const shares = await getSharesInfo(tickerId);

  return <div>In progress</div>;
}
