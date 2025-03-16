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
  boldKeys?: (keyof T)[];
};

export const DividendsTableClient = <T extends DataItem>(
  props: TableProps<T>
) => {
  const { data, boldKeys } = props;

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
    ...data!.map<Column>((row) => ({
      field: row.year.toString(),
      filter: false,
      suppressMovable: true,
      sortable: false,
      resizable: false,
      width: 80,
      cellClass: "hover:bg-table-cellHoverBackground",
      valueFormatter: (props) => {
        const { value } = props;
        if (typeof value !== "number") {
          return value;
        }

        if (
          props.data?.title.includes("Dynamic") ||
          ["DPR"].includes(props.data!.title)
        ) {
          return formatNumber(value, ".0%");
        }

        if (props.data?.title.includes("DY")) {
          return formatNumber(value, ".1%");
        }

        return typeof value === "number" ? formatNumber(value, ",.2f") : value;
      },
    })),
  ];

  const rows = Object.keys(data![0]).reduce<TableRow[]>((acc, key) => {
    if (["year", "dividends"].includes(key)) return acc;

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
        "font-bold": ({ data }) =>
          !!boldKeys && boldKeys.includes(data!.title as string),
      }}
      suppressCellFocus
      columnDefs={columns}
      rowData={rows}
    />
  );
};
