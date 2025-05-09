"use client";

import { useLocalStorage } from "@/components/hooks/use-local-storage";

export function useTabs({
  onCloseTab,
}: { onCloseTab?: (tab: string, tabs: string[]) => void } = {}) {
  const [tabs, setTabs] = useLocalStorage<string[]>("tabs", [], {
    initializeWithValue: false,
  });

  const appendTab = (tab: string) => {
    setTabs((prev) => Array.from(new Set([...prev, tab])));
  };

  const closeTab = (tab: string) => {
    setTabs((prev) => {
      onCloseTab?.(tab, prev);

      return prev.filter((t) => t !== tab);
    });
  };

  return { tabs, appendTab, closeTab };
}
