import { mapTickerInfoApiToDm } from "./ticker-info.api-mapper";
import {
  AssetsInfoApi,
  ShareInfoApi,
  TickerInfoApi,
} from "./ticker-info.api-model";

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

async function getAssetsInfo(tickerId: string): Promise<AssetsInfoApi[]> {
  const response = await fetch(`http://localhost:4000/assets/${tickerId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

export async function getTickerInfo(tickerId: string) {
  try {
    const [tickerInfo, sharesResponse, assetsInfo] = await Promise.all([
      getTickerProfitAndLossData(tickerId),
      getSharesInfo(tickerId),
      getAssetsInfo(tickerId),
    ]);

    return mapTickerInfoApiToDm(tickerInfo, sharesResponse, assetsInfo);
  } catch (err) {
    console.error(err);
  }
}
