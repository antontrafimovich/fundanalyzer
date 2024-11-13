import { ContextProvider } from "./providers/context-provider";
import CompaniesTable from "./ui/companies-table";
import { getTickers } from "../actions/get-tickers";
import ActionSelector from "./ui/action-selector";

export default async function Page() {
  const companies = await getTickers();

  return (
    <ContextProvider>
      <div className="flex gap-10">
        <ActionSelector />
        <CompaniesTable companies={companies} />
      </div>
    </ContextProvider>
  );
}
