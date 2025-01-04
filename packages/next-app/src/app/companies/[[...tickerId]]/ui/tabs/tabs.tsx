"use client";
import {
  Tabs as ShadcnTabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

import { useTabs } from "./use-tabs";
import { useEffect } from "react";

export const Tabs = ({ active }: { active: string }) => {
  const router = useRouter();

  const { tabs, closeTab, appendTab } = useTabs({
    onCloseTab: (tab, tabs) => {
      if (active !== tab) {
        return;
      }

      const closingIndex = tabs.indexOf(tab);

      if (tabs.length > 1) {
        const nextActiveTab = tabs[closingIndex + 1] || tabs[closingIndex - 1];
        router.push(`/companies/${nextActiveTab}`);
      } else {
        router.push("/companies");
      }
    },
  });

  useEffect(() => {
    if (active && !tabs.includes(active)) {
      appendTab(active);
    }

    if (!active && tabs.length > 0) {
      router.push(`/companies/${tabs[0]}`);
    }
  }, []);

  return (
    <ShadcnTabs
      defaultValue={active || tabs[0]}
      className="w-[400px]"
      onValueChange={(value) => {
        router.push(`/companies/${value}`);
      }}
    >
      <TabsList className="bg-transparent pb-0 items-end pl-0">
        {tabs.map((tab) => (
          <TabsTrigger
            className="border-b-ra rounded-b-none hover:bg-border"
            key={tab}
            value={tab}
          >
            {tab}

            <span
              className="ml-2"
              onMouseDown={(e) => {
                e.stopPropagation();
                closeTab(tab);
              }}
            >
              X
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
    </ShadcnTabs>
  );
};
