import { parse } from "node-html-parser";

export async function fetchAndParseHTML(url: string) {
  const response = await fetch(url);
  const data = await response.text();
  const dom = parse(data);

  return dom;
}
