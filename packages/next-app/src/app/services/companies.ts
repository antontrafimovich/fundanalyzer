export async function getCompanies(): Promise<{ text: string, shortname: string }[]> {
  const response = await fetch("http://localhost:4000/companies", {
    next: {
      revalidate: 3600,
    },
  });

  return response.json();
}
