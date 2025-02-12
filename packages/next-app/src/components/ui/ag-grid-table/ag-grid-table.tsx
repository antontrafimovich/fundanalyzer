"use client";

import { themeQuartz } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';

import { Skeleton } from '../skeleton';
import { AgGridReactProps } from './ag-grid-table.model';


const theme = themeQuartz.withParams({
  headerBackgroundColor: "#fff",
  wrapperBorderRadius: "0",
  wrapperBorder: "none",
  rowHoverColor: "hsl(240 4.8% 95.9%)",
  columnHoverColor: "hsl(240 4.8% 95.9%)",
});

export default function AgGridTable<T>(props: AgGridReactProps<T>) {
  const [isGridReady, setIsGridReady] = useState(false);

  return (
    <div className="ag-theme-quartz flex-1 min-w-0 h-full relative">
      {!isGridReady && <DataTableSkeleton />}
      <AgGridReact
        floatingFiltersHeight={40}
        headerHeight={40}
        rowHeight={40}
        theme={theme}
        onGridReady={() => setTimeout(() => setIsGridReady(true), 400)}
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

function DataTableSkeleton() {
  return (
    <div className="absolute inset-0 size-full bg-white z-10">
      <div className="flex space-x-4 border-b border-gray-200 pb-2 mb-2">
        <Skeleton className="w-1/4 h-6" />
        <Skeleton className="w-1/4 h-6" />
        <Skeleton className="w-1/4 h-6" />
      </div>
      {[...Array(19)].map((_, index) => (
        <div
          key={index}
          className="flex space-x-4 border-b border-gray-200 pb-2 mb-2"
        >
          <Skeleton className="w-1/4 h-6" />
          <Skeleton className="w-1/4 h-6" />
          <Skeleton className="w-1/4 h-6" />
        </div>
      ))}
    </div>
  );
}
