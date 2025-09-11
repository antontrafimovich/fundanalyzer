import { parse } from "node-html-parser";

export async function fetchAndParseHTML(url: string) {
  const response = await fetch(url, { next: { revalidate: 3600 } });
  const cloned = response.clone();
  const data = await cloned.text();
  const dom = parse(data);

  return dom;
}
