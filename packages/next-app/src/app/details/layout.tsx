import { getTickers } from "@/app/actions/get-tickers";
import { ReactNode } from "react";
import { Search } from "./ui/search/search";
import { Tabs } from "./ui/tabs/tabs";

export default async function Layout({ children }: { children: ReactNode }) {
  const companies = await getTickers();

  return (
    <div className="flex flex-col h-full bg-surface-primary">
      <div className="basis-14 px-2 flex items-center shadow-sm bg-white">
        <Search
          items={companies.map((company) => ({
            title: company.text,
            ticker: company.ut,
          }))}
        />
      </div>
      <div className="flex flex-col min-h-0 p-2 pt-0 h-full bg-surface-primary">
        <Tabs />
        {children}
      </div>
    </div>
  );
}
