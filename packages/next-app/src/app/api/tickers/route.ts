import { type NextRequest } from "next/server";

async function getCompanies(): Promise<{ text: string }[]> {
  const response = await fetch("http://localhost:4000/companies", {
    next: {
      revalidate: 3600,
    },
  });

  return response.json();
}

export async function GET(request: NextRequest) {
  console.log(JSON.stringify(request));
  console.log(request.nextUrl.href);

  const filterQuery = request.nextUrl.searchParams.get("filter");

  const data = await getCompanies();

  let filteredData = data;

  if (filterQuery) {
    filteredData = data.filter((company) => company.text.includes(filterQuery));
  }

  return new Response(JSON.stringify(filteredData), { status: 200 });
}
