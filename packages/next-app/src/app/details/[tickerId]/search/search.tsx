"use client";

import { Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover } from '@reach/combobox';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo, useRef, useState } from 'react';


export type SearchProps = {
  items: string[];
};

export const Search = ({ items }: SearchProps) => {
  const [term, setTerm] = useState("");
  const results = useCityMatch(term, items);

  return (
    <div className="w-full">
      <Combobox aria-label="Cities" className="w-full">
        <ComboboxInput
          className="flex h-9 w-4/12 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          value={term}
          onChange={(event) => {
            console.log(event.target.value);
            setTerm(event.target.value);
          }}
        />
        {results && (
          <ComboboxPopover className="shadow-popup mt-1 h-96 rounded-md border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
            {results.length > 0 ? (
              <SearchResultsList items={results} />
            ) : (
              <span style={{ display: "block", margin: 8 }}>
                No results found
              </span>
            )}
          </ComboboxPopover>
        )}
      </Combobox>
    </div>
  );
};

function useCityMatch(term: string, items: string[]) {
  // const throttledTerm = useThrottle(term, 100);
  return useMemo(
    () =>
      term.trim() === ""
        ? items
        : items.filter((item) =>
            item.toLowerCase().includes(term.toLowerCase())
          ),
    [term, items]
  );
}

export const SearchResultsList = ({ items }: { items: string[] }) => {
  const parentRef = useRef<HTMLDivElement>(null);

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  return (
    <>
      <div ref={parentRef} className="h-full overflow-auto p-1">
        <ComboboxList
          className="w-full relative"
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {/* Only the visible items in the virtualizer, manually positioned to be in view */}
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <ComboboxOption
              key={virtualItem.key}
              value={items[virtualItem.index]}
              className="flex cursor-pointer gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none  hover:bg-accent hover:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {items[virtualItem.index]}
            </ComboboxOption>
          ))}
        </ComboboxList>
      </div>
    </>
  );
};
