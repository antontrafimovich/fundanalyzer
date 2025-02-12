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

export const Table = <T extends DataItem>(props: TableProps<T>) => {
  const { data, hide, boldKeys } = props;

  const columns: Column[] = [
    {
      field: "title" as const,
      resizable: true,
      headerName: "",
      suppressMovable: true,
      filter: false,
      flex: 1,
      minWidth: 200,
      sortable: false,
      cellClass: "hover:bg-table-cellHoverBackground",
      pinned: "left" as const,
    },
    ...Object.keys(data![0])
      .filter((key) => key !== "year")
      .map((key) => ({
        field: key,
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

  const rows = data.map((item) => {
    const { year, ...rest } = item;

    return { ...rest, title: year };
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
