import { mapTickerInfoApiToDm } from "./ticker-info.api-mapper";
import { ShareInfoApi, TickerInfoApi } from "./ticker-info.api-model";

async function getTickerProfitAndLossData(
  tickerId: string
): Promise<TickerInfoApi[]> {
  const response = await fetch(`http://localhost:4000/${tickerId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

async function getSharesInfo(tickerId: string): Promise<ShareInfoApi[]> {
  const response = await fetch(`http://localhost:4000/shares/${tickerId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

export async function getTickerInfo(tickerId: string) {
  try {
    const [tickerInfo, sharesResponse] = await Promise.all([
      getTickerProfitAndLossData(tickerId),
      getSharesInfo(tickerId),
    ]);

    return mapTickerInfoApiToDm(tickerInfo, sharesResponse);
  } catch (err) {
    console.error(err);
  }
}
