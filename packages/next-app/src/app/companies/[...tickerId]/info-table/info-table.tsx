import { getTickers } from '@/app/actions/get-tickers';
import { CardTitle } from '@/components/ui/card';

import { getTickerInfo } from '../api/ticker-info.api';
import { Panel } from '../ui/panel/panel';
import { Table } from './ui/table';

export default async function InfoTable({ tickerId }: { tickerId: string }) {
  const data = await getTickerInfo(tickerId);
  const companies = await getTickers();

  const company = companies.find((company) => company.ut === tickerId)!;

  return (
    <Panel>
      <Panel.Header>
        <CardTitle className="flex items-center gap-1">
          <span>{company.text}</span>
        </CardTitle>
      </Panel.Header>
      <Panel.Content className="flex-1 min-h-0 pr-1">
        <Table data={data!.yearToYearData} />
      </Panel.Content>
    </Panel>
  );
}
