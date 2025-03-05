import { getCompanies } from "@/app/actions/get-companies";

import { Search } from "./search";

export const SearchServer = async () => {
  const companies = await getCompanies();

  return (
    <Search
      items={companies.map((company) => ({
        title: company.text,
        ticker: company.ut,
      }))}
    />
  );
};
