"use client";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { AgGridReact } from "ag-grid-react";
import { useContext } from "react";

import { Company } from "../../model/company";
import { RootContext } from "../providers/context-provider";

export default function CompaniesTable(props: { companies: Company[] }) {
  const { setSelectedCompanies } = useContext(RootContext);

  // const columns = [{ field: "text" }, { field: "shortname" }];

  const rowData = props.companies;

  return (
    <div
      className="ag-theme-quartz flex-1 min-w-0 h-full" // applying the Data Grid theme
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={[
          { field: "shortname" },
          { field: "text", filter: true, flex: 1 },
        ]}
        rowSelection={{
          mode: "multiRow",
          checkboxes: false,
          headerCheckbox: false,
          enableClickSelection: true,
        }}
        onRowSelected={({ data }) => {
          setSelectedCompanies([data!]);
        }}
      />
    </div>
  );
}
