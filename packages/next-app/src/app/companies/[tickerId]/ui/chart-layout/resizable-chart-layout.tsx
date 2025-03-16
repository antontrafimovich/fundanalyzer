"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React, { useEffect, useState } from "react";

export const ResizableChartLayout = ({
  blocks,
}: {
  blocks: React.ReactElement[];
}) => {
  const [revenueChart, liabilitiesChart, profitabilityChart, cashflowChart] =
    blocks;

  const [isWideScreen, setIsWideScreen] = useState(false);

  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    // Function to check screen width
    const checkScreenWidth = () => {
      setIsWideScreen(window.innerWidth > 1920);
    };

    // Check initially
    checkScreenWidth();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);

  if (!isWideScreen) {
    return (
      <div className="size-full relative">
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50} className="flex flex-col">
            {activePage === 1 ? revenueChart : profitabilityChart}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} className="flex flex-col">
            {activePage === 2 ? liabilitiesChart : cashflowChart}
          </ResizablePanel>
        </ResizablePanelGroup>

        <Pagination className="absolute w-auto top-3 right-3">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() =>
                  setActivePage((active) => (active - 1 > 0 ? active - 1 : 2))
                }
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={activePage === 1}
                onClick={() => setActivePage(1)}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={activePage === 2}
                onClick={() => setActivePage(2)}
              >
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setActivePage((active) => (active + 1 > 2 ? 1 : active + 1))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  }

  return (
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel defaultSize={50} className="flex flex-col">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50} className="flex flex-col">
            {revenueChart}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} className="flex flex-col">
            {liabilitiesChart}
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50} className="flex flex-col">
            {profitabilityChart}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} className="flex flex-col">
            {cashflowChart}
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
