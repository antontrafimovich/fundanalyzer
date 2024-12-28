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

  const { tabs, closeTab, appendTab } = useTabs();

  useEffect(() => {
    if (active && !tabs.includes(active)) {
      appendTab(active);
    }
  }, []);

  return (
    <ShadcnTabs
      defaultValue={active || tabs[0]}
      className="w-[400px]"
      onValueChange={(value) => {
        console.log("anton");
        router.push(`/${value}`);
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
              onClick={(e) => {
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
