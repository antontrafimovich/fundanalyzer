"use client";

import { TickerInfo } from "@/app/model/ticker-info";
import { formatNumber } from "@/app/shared/utils/number";
import AgGridTable from "@/components/ui/ag-grid-table/ag-grid-table";

export type TableProps = {
  data: TickerInfo[];
};

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

export const Table = ({ data }: TableProps) => {
  const columns = [
    {
      field: "title",
      resizable: true,
      suppressMovable: true,
      filter: false,
      flex: 1,
      minWidth: 200,
      sortable: false,
      cellClass: "hover:bg-table-cellHoverBackground",
      pinned: "left" as const,
    },
    ...data!.map((row) => ({
      field: row.year.toString(),
      filter: false,
      suppressMovable: true,
      sortable: false,
      resizable: false,
      cellClass: "hover:bg-table-cellHoverBackground",
      flex: 1,
      valueFormatter: ({ value }: { value: string | number }) => {
        return typeof value === "number" ? formatNumber(value, ",d") : value;
      },

      minWidth: 100,
    })),
  ];

  const rows: Array<Record<string, string | number>> = Object.keys(
    data![0]
  ).reduce((acc, key) => {
    if (key === "year") return acc;

    return [
      ...acc,
      {
        title: key,
        ...data!.reduce(
          (result, row) => ({ ...result, [row.year]: row[key] }),
          {}
        ),
      },
    ];
  }, [] as Array<Record<string, string | number>>);

  return (
    <AgGridTable
      rowSelection={undefined}
      columnHoverHighlight
      rowClass="even:bg-gray-50"
      rowClassRules={{
        "font-bold": ({ data }) => BOLD_KEYS.includes(data!.title as string),
      }}
      suppressCellFocus
      columnDefs={columns}
      //   onGridReady={({ api }) => {
      //     api.autoSizeAllColumns();
      //   }}
      rowData={rows}
    />
  );
};
