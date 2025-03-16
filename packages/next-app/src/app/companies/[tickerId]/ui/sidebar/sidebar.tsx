import { formatNumber } from "@/app/shared/utils/number";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

import { getTickerInfo } from "../../api/ticker-info.api";
import Link from "next/link";

export async function AppSidebar({ tickerId }: { tickerId: string }) {
  const tickerInfo = (await getTickerInfo(tickerId))!;
  const lastYearTickerInfo = tickerInfo.yearToYearData.at(-1)!;

  const cToZ =
    tickerInfo.price /
    ((lastYearTickerInfo["Zysk netto"] / lastYearTickerInfo["Liczba akcji"]) *
      1000);

  const cToZFive =
    tickerInfo.yearToYearData.slice(-6, -1).reduce((result, item) => {
      return (
        result +
        item["Kurs"] / ((item["Zysk netto"] / item["Liczba akcji"]) * 1000)
      );
    }, 0) / 5;

  return (
    <Sidebar className="h-auto" collapsible="icon">
      <SidebarContent className="relative">
        <h1 className="text-xl font-bold pt-6 pl-6">Summary</h1>
        <ul className="p-6 font-sans">
          <li className="py-1">
            <span className="font-bold">C/Z:</span> {formatNumber(cToZ, ".2f")}
          </li>
          <li className="py-1">
            <span className="font-bold">Liczba akcji:</span>{" "}
            {formatNumber(lastYearTickerInfo["Liczba akcji"], ",d")}
          </li>
          <li className="py-1">
            <span className="font-bold">Market Cap:</span>{" "}
            {formatNumber(
              lastYearTickerInfo["Liczba akcji"] * lastYearTickerInfo["Kurs"],
              ",d"
            )}
          </li>
          <li className="py-1">
            <span className="font-bold">C/Z 5 Years</span>:{" "}
            {formatNumber(cToZFive, ".2f")}
          </li>
          <li className="py-1">
            <span className="font-bold">Current Price</span>:{" "}
            {formatNumber(tickerInfo.price, ".2f")}
          </li>
          <li className="py-1">
            <span className="font-bold">Description</span>:{" "}
            {tickerInfo.description}
          </li>
          <li className="py-1">
            <span className="font-bold">Website</span>: <Link href={tickerInfo.website} passHref target="_blank" className="underline text-[-webkit-link]">{tickerInfo.website}</Link>
          </li>
        </ul>
      </SidebarContent>
    </Sidebar>
  );
}
