import { getTickerInfo } from "../../api/ticker-info.api";
import { CommonDataTableClient } from "./ui/common-data-table-client";

export type CommonDataTableProps = {
  ticker: string;
};

export const CommonDataTable = async ({ ticker }: CommonDataTableProps) => {
  const data = await getTickerInfo(ticker);

  if (!data || !data.yearToYearData || data.yearToYearData.length === 0) {
    console.warn(`No data available for ticker &quot;${ticker}&quot;. Check application logic or data source.`);
    return (
      <div className="flex items-center justify-center h-32 text-red-500 font-semibold">
        No data available for ticker &quot;{ticker}&quot;. This may indicate an issue with the application logic or data source.
      </div>
    );
  }

  return (
    <CommonDataTableClient
      data={data.yearToYearData}
      boldKeys={[
        "Przychody ze sprzedaży",
        "Zysk ze sprzedaży",
        "Zysk operacyjny (EBIT)",
        "Zysk z działalności gospodarczej",
        "Zysk przed opodatkowaniem",
        "Zysk netto",
        "Zysk netto akcjonariuszy jednostki dominującej",
        "EBITDA",
      ]}
      hide={[
        'year',
        "Aktywa razem",
        "Kapitał własny akcjonariuszy jednostki dominującej",
        "Zobowiązania długoterminowe",
        "Zobowiązania krótkoterminowe",
        "Przepływy pieniężne z działalności finansowej",
        "Przepływy pieniężne z działalności inwestycyjnej",
        "Przepływy pieniężne z działalności operacyjnej",
      ]}
    />
  );
};
