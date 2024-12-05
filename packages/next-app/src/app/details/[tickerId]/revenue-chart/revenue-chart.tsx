import { getTickerInfo } from "../api/ticker-info.api";
import { getSharesInfo } from "./api/ticker-shares.api";

export default async function RevenueChart({ tickerId }: { tickerId: string }) {
  const data = await getTickerInfo(tickerId);

  const chartData = data!.map((row) => {
    return {
      year: row.year,
      revenue: row["Przychody ze sprzedaży"] / row["Liczba akcji"],
      profit: row["Zysk (strata) brutto"],
    };
  });
  // const shares = await getSharesInfo(tickerId);

  return <div>In progress</div>;
}
