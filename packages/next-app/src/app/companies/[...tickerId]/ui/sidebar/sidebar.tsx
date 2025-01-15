import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { getTickerInfo } from "../../api/ticker-info.api";
import { formatNumber } from "@/app/shared/utils/number";

export async function AppSidebar({ tickerId }: { tickerId: string }) {
  const tickerInfo = (await getTickerInfo(tickerId))!;
  const lastYearTickerInfo = tickerInfo.at(-1)!;

  const cToZ =
    lastYearTickerInfo["Kurs"] /
    ((lastYearTickerInfo["Zysk netto"] / lastYearTickerInfo["Liczba akcji"]) *
      1000);

  const cToZFive =
    tickerInfo.slice(-6, -1).reduce((result, item) => {
      return (
        result +
        item["Kurs"] / ((item["Zysk netto"] / item["Liczba akcji"]) * 1000)
      );
    }, 0) / 5;

  return (
    <Sidebar className="h-auto" collapsible="icon">
      <SidebarContent>
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
        </ul>
      </SidebarContent>
    </Sidebar>
  );
}
