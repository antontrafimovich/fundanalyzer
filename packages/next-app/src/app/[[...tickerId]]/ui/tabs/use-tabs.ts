"use client";

import { useLocalStorage } from "@/components/hooks/use-local-storage";

export function useTabs() {
  const [tabs, setTabs] = useLocalStorage<string[]>("tabs", []);

  const appendTab = (tab: string) => {
    setTabs((prev) => [...prev, tab]);
  };

  const closeTab = (tab: string) => {
    setTabs((prev) => {
      return prev.filter((t) => t !== tab);
    });
  };

  return { tabs, appendTab, closeTab };
}
