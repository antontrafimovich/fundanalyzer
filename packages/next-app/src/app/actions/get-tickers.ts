"use server";

import { Company } from "../model/company";
import { getCompanies } from "../services/companies";

export async function getTickers({ filter }: { filter?: string } = {}): Promise<
  Company[]
> {
  console.log("filter", filter);

  const data = await getCompanies();

  const filterQuery = filter;
  let filteredData = data;

  if (filterQuery) {
    filteredData = data.filter((company) =>
      company.text.toLowerCase().includes(filterQuery.toLowerCase())
    );
  }

  return filteredData;
}
