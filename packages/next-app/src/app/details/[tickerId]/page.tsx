import { getTickers } from '@/app/actions/get-tickers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Suspense } from 'react';

import CashflowChart from './cashflow-chart/cashflow-chart';
import DataTable from './data-table/data-table';
import RevenueChart from './revenue-chart/revenue-chart';
import ReturnChart from './roe-chart/roe-chart';
import { Search } from './search/search';

export default async function Page({
  params,
}: {
  params: Promise<{ tickerId: string }>;
}) {
  const tickerId = (await params).tickerId;

  const companies = await getTickers();

  await fetch(`http://localhost:4000/${tickerId}`);

  console.log(companies.map((company) => company.text))

  return (
    <div className="flex flex-col h-full bg-surface-primary">
      <div className="basis-14 px-7 flex items-center shadow-sm bg-white">
        <Search items={companies.map((company) => company.text)} />
      </div>
      <div className="flex min-h-0 gap-2 p-2 h-full bg-surface-primary">
        <Card className="flex flex-col flex-1 min-w-0 d7d2ed border-border-primary">
          <Suspense fallback={<>Loading Data Table...</>}>
            <CardHeader>
              <CardTitle>Raw Info</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 pr-1">
              <DataTable tickerId={tickerId} />
            </CardContent>
          </Suspense>
        </Card>

        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <Card className="flex flex-1 min-h-0 flex-col border-border-primary">
            <Suspense fallback={<>Loading Revenue Chart...</>}>
              <CardHeader>
                <CardTitle>Revenue Chart</CardTitle>
              </CardHeader>
              <CardContent className="overflow-auto">
                <RevenueChart tickerId={tickerId} />
              </CardContent>
            </Suspense>
          </Card>
          <div className="flex flex-1 gap-2 min-h-0">
            <Card className="flex flex-col flex-1 min-w-0 border-border-primary">
              <Suspense fallback={<>Loading Return Chart...</>}>
                <CardHeader>
                  <CardTitle>Profitability Chart</CardTitle>
                </CardHeader>
                <CardContent className="overflow-auto flex-1 min-h-0">
                  <ReturnChart tickerId={tickerId} />
                </CardContent>
              </Suspense>
            </Card>
            <Card className="flex flex-col flex-1 min-w-0 border-border-primary">
              <Suspense fallback={<>Loading Cashflow Chart...</>}>
                <CardHeader>
                  <CardTitle>Cashflow Chart</CardTitle>
                </CardHeader>
                <CardContent className="overflow-auto flex-1 min-h-0">
                  <CashflowChart tickerId={tickerId} />
                </CardContent>
              </Suspense>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
