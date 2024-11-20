import { Company } from "../model/company";

export async function getCompanies(): Promise<Company[]> {
  const response = await fetch("http://localhost:4000/companies", {
    next: {
      revalidate: 3600,
    },
  });

  return response.json();
}
