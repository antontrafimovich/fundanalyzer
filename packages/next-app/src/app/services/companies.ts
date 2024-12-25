import { Company } from "../model/company";

const DOMAIN = process.env.DOMAIN || "http://localhost:4000";

export async function getCompanies(): Promise<Company[]> {
  const response = await fetch(`${DOMAIN}/companies`, {
    next: {
      revalidate: 3600,
    },
  });

  return response.json();
}
