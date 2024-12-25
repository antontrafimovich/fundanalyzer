"use client";

import { useLocalStorage } from "@/components/hooks/use-local-storage";

export function useTabs() {
  const [tabs, setTabs] = useLocalStorage<string[]>("tabs", []);
  const [activeTab, setActive] = useLocalStorage<string>("activeTab", "");

  const appendTab = (tab: string) => {
    setTabs((prev) => [...prev, tab]);
    setActive(tab);
  };

  const closeTab = (tab: string) => {
    const prevTabIndex = tabs.indexOf(tab) - 1;
    setTabs((prev) => {
      return prev.filter((t) => t !== tab);
    });

    if (tab === activeTab) {
      setActive(tabs[prevTabIndex]);
    }
  };

  return { tabs, activeTab, setActive, appendTab, closeTab };
}
