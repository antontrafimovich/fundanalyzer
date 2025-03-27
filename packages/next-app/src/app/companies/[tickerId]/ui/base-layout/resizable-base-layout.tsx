"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React, { useEffect, useState } from "react";

export const ResizableBaseLayout = ({
  blocks,
}: {
  blocks: React.ReactElement[];
}) => {
  const [table, charts] = blocks;

  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    // Function to check screen width
    const checkScreenWidth = () => {
      setIsWideScreen(window.innerWidth > 900);
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
      <ResizablePanelGroup direction="vertical" className="size-full">
        <ResizablePanel defaultSize={40} className="flex flex-col">
          {table}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60} className="flex flex-col">
          {charts}
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="size-full">
      <ResizablePanel defaultSize={50} className="flex flex-col">
        {table}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50} className="flex flex-col">
        {charts}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
