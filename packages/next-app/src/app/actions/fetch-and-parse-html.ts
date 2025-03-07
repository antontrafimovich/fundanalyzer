import { parse } from "node-html-parser";

export async function fetchAndParseHTML(url: string) {
  const response = await fetch(url, { next: { revalidate: 3600 } });
  const data = await response.text();
  const dom = parse(data);

  return dom;
}
