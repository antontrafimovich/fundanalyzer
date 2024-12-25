"use client";

import { themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import { AgGridReactProps } from "./ag-grid-table.model";

const theme = themeQuartz.withParams({
  headerBackgroundColor: "#fff",
  wrapperBorderRadius: "0",
  wrapperBorder: "none",
  rowHoverColor: 'hsl(240 4.8% 95.9%)',
  columnHoverColor: 'hsl(240 4.8% 95.9%)',
});

export default function AgGridTable<T>(props: AgGridReactProps<T>) {
  return (
    <div className="ag-theme-quartz flex-1 min-w-0 h-full">
      <AgGridReact
        floatingFiltersHeight={40}
        headerHeight={40}
        rowHeight={40}
        theme={theme}
        
        rowSelection={{
          mode: "multiRow",
          checkboxes: false,
          headerCheckbox: false,
          enableClickSelection: true,
        }}
        {...props}
      />
    </div>
  );
}
