import { ReactNode, Suspense } from 'react';

import { SearchServer } from './ui/search/search-server';
import { Tabs } from './ui/tabs/tabs';

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ tickerId: string }>;
}) {
  const [activeTicker] = (await params).tickerId ?? [];

  return (
    <div className="flex flex-col h-full bg-surface-primary">
      <div className="basis-14 px-2 flex items-center shadow-sm bg-white">
        <Suspense fallback={<>Loading...</>}>
          <SearchServer />
        </Suspense>
      </div>
      <div className="flex flex-col min-h-0 p-2 pt-0 h-full bg-surface-primary">
        <Tabs active={activeTicker} />
        {children}
      </div>
    </div>
  );
}
