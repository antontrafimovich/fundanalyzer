"use client";

import { useLocalStorage } from "@/components/hooks/use-local-storage";
import { useRouter } from "next/navigation";

export function useTabs() {
  const [tabs, setTabs] = useLocalStorage<string[]>("tabs", []);
  const router = useRouter();

  const appendTab = (tab: string) => {
    setTabs((prev) => {
      router.push(`/${tab}`);
      return [...prev, tab];
    });
  };

  const closeTab = (tab: string) => {
    setTabs((prev) => {
      const closingIndex = prev.indexOf(tab);
      if (closingIndex !== 0) {
        router.push(`/${prev[closingIndex - 1]}`);
      } else {
        router.push("/");
      }

      return prev.filter((t) => t !== tab);
    });
  };

  return { tabs, appendTab, closeTab };
}
