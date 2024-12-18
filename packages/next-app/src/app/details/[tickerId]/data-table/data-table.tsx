import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTickerInfo } from "../api/ticker-info.api";
import { formatNumber } from "@/app/shared/utils/number";

const BOLD_KEYS = [
  "Przychody ze sprzedaży",
  "Zysk ze sprzedaży",
  "Zysk operacyjny (EBIT)",
  "Zysk z działalności gospodarczej",
  "Zysk przed opodatkowaniem",
  "Zysk netto",
  "Zysk netto akcjonariuszy jednostki dominującej",
  "EBITDA",
];

export default async function DataTable({ tickerId }: { tickerId: string }) {
  const data = await getTickerInfo(tickerId);
  const columns = data!.map((row) => row.year);

  const rawRows = data!.reduce((acc, row) => {
    Object.keys(row).forEach((key) => {
      if (key === "year") return;

      acc[key] = acc[key] || [];
      acc[key].push(row[key]);
    });

    return acc;
  }, {} as Record<string, number[]>);

  const rows = Object.entries(rawRows).map(([key, value]) => [key, ...value]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead key="title" className="min-w-[200px]">
            Title
          </TableHead>
          {columns.map((column) => {
            return (
              <TableHead className="min-w-[100px]" key={column}>
                {column}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row[0]}
            className={`even:bg-gray-100 ${
              BOLD_KEYS.includes(row[0] as string) ? "font-bold" : ""
            }`}
          >
            {row.map((cell, index) => {
              return (
                <TableCell key={`${row[0]}_${index}`}>
                  {typeof cell === "number" ? formatNumber(cell, ",d") : cell}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
