import { ReactNode, Suspense } from "react";

import { SearchServer } from "./ui/search/search-server";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-full bg-surface-primary">
      <div className="basis-14 px-2 flex items-center shadow-sm bg-white">
        <Suspense fallback={<>Loading...</>}>
          <SearchServer />
        </Suspense>
      </div>
      {children}
    </div>
  );
}
