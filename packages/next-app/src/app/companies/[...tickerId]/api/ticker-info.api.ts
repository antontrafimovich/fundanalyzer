import { mapTickerInfoApiToDm } from "./ticker-info.api-mapper";
import {
  AssetsInfoApi,
  CashflowInfoApi,
  CommonDataApi,
  ShareInfoApi,
  TickerInfoApi,
} from "./ticker-info.api-model";

const DOMAIN = process.env.DOMAIN || "http://localhost:4000";

async function getTickerProfitAndLossData(
  tickerId: string
): Promise<TickerInfoApi[]> {
  const response = await fetch(`${DOMAIN}/pnl/${tickerId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 3600,
    },
  });

  return response.json();
}

async function getSharesInfo(tickerId: string): Promise<ShareInfoApi[]> {
  const response = await fetch(`${DOMAIN}/shares/${tickerId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 3600,
    },
  });

  return response.json();
}

async function getAssetsInfo(tickerId: string): Promise<AssetsInfoApi[]> {
  const response = await fetch(`${DOMAIN}/assets/${tickerId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 3600,
    },
  });

  return response.json();
}

async function getCashflowInfo(tickerId: string): Promise<CashflowInfoApi[]> {
  const response = await fetch(`${DOMAIN}/cashflow/${tickerId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 3600,
    },
  });

  return response.json();
}

export async function getTickerCommonData(
  tickerId: string
): Promise<CommonDataApi> {
  const response = await fetch(`${DOMAIN}/${tickerId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 3600,
    },
  });

  return response.json();
}

export async function getTickerInfo(tickerId: string) {
  try {
    const [tickerInfo, sharesResponse, assetsInfo, cashflowInfo, commonData] =
      await Promise.all([
        getTickerProfitAndLossData(tickerId),
        getSharesInfo(tickerId),
        getAssetsInfo(tickerId),
        getCashflowInfo(tickerId),
        getTickerCommonData(tickerId),
      ]);

    return mapTickerInfoApiToDm(
      tickerInfo,
      sharesResponse,
      assetsInfo,
      cashflowInfo,
      commonData
    );
  } catch (err) {
    console.error(err);
  }
}
