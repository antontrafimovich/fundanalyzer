import { getTickers } from "@/app/actions/get-tickers";
import { Search } from "./search";

export const SearchServer = async () => {
  const companies = await getTickers();

  return (
    <Search
      items={companies.map((company) => ({
        title: company.text,
        ticker: company.ut,
      }))}
    />
  );
};
