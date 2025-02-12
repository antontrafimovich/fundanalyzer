import { formatNumber } from "@/app/shared/utils/number";

import { getDividendsData, getTickerInfo } from "../../api/ticker-info.api";
import { Column, Table, TableRow } from "../ui/table";

export const DividendsTable = async ({ tickerId }: { tickerId: string }) => {
  const dividends = await getDividendsData(tickerId);
  const tickerInfo = (await getTickerInfo(tickerId))!;

  const data = dividends.map((dividend, index) => {
    const tickerInfoForYear = tickerInfo.yearToYearData.at((index + 1) * -1);
    const tickerInfoForPrevYear = tickerInfo.yearToYearData.at(
      (index + 2) * -1
    );
    const dpsCurrentYear =
      (dividend.dividends * 1000) / tickerInfoForYear!["Liczba akcji"];
    const dpsPrevYear =
      (dividends[index + 1]?.dividends * 1000) /
      tickerInfoForPrevYear!["Liczba akcji"];

    return {
      year: dividend.year,
      DPS: dpsCurrentYear,
      "DPS Dynamic": dpsPrevYear
        ? (dpsCurrentYear / dpsPrevYear - 1) * 100
        : null,
      dividends: dividend.dividends,
    } as const;
  });

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
    if (key === "year") return acc;

    return [
      ...acc,
      {
        title: key,
        ...data!.reduce(
          (result, row) => ({
            ...result,
            [row.year]: row[key as keyof (typeof data)[0]],
          }),
          {}
        ),
      },
    ];
  }, []);

  return <Table rows={rows} columns={columns} />;
};
