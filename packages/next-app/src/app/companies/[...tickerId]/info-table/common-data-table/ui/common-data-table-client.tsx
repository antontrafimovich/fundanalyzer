"use client";

import { formatNumber } from "@/app/shared/utils/number";
import AgGridTable from "@/components/ui/ag-grid-table/ag-grid-table";
import { GridOptions } from "ag-grid-community";

type TableRow = {
  title: string;
  [key: string]: string | number | null;
};

type Column = NonNullable<GridOptions<TableRow>["columnDefs"]>[number];

type DataItem = {
  year: string;
  [key: string]: string | number | null;
};

type TableProps<T extends DataItem> = {
  data: T[];
  hide?: (keyof T)[];
  boldKeys?: (keyof T)[];
};

export const CommonDataTableClient = <T extends DataItem>(props: TableProps<T>) => {
  const { data, hide, boldKeys } = props;

  const columns: Column[] = [
    {
      field: "title" as const,
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
      valueFormatter: (props: { value: string | number }) => {
        const { value } = props;
        return typeof value === "number" ? formatNumber(value, ",d") : value;
      },

      minWidth: 100,
    })),
  ];

  const rows = Object.keys(data![0]).reduce<TableRow[]>((acc, key) => {
    if (hide && hide.includes(key)) return acc;

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
  }, []);

  return (
    <AgGridTable
      {...props}
      rowSelection={undefined}
      columnHoverHighlight
      rowClass="even:bg-gray-50"
      rowClassRules={{
        "font-bold": ({ data }) => boldKeys!.includes(data!.title as string),
      }}
      suppressCellFocus
      columnDefs={columns}
      rowData={rows}
    />
  );
};
