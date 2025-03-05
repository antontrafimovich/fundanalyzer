import { getAssets } from "../../../actions/get-assets";
import { getCashflow } from "../../../actions/get-cashflow";
import { getCommonData } from "../../../actions/get-common-data";
import { getDividendsData } from "../../../actions/get-dividends-data";
import { getPnl } from "../../../actions/get-pnl";
import { getShares } from "../../../actions/get-shares";
import { mapTickerInfoApiToDm } from "./ticker-info.api-mapper";

export async function getTickerDividendsData(tickerId: string) {
  const dividendsData = await getDividendsData(tickerId);
  return dividendsData.slice(0, 11);
}

export async function getTickerInfo(tickerId: string) {
  const [tickerInfo, sharesResponse, assetsInfo, cashflowInfo, commonData] =
    await Promise.all([
      getPnl(tickerId),
      getShares(tickerId),
      getAssets(tickerId),
      getCashflow(tickerId),
      getCommonData(tickerId),
    ]);

  return mapTickerInfoApiToDm(
    tickerInfo,
    sharesResponse,
    assetsInfo,
    cashflowInfo,
    commonData
  );
}
