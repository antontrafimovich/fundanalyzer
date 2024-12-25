"use client"

import {
  Tabs as ShadcnTabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useTabs } from "./use-tabs";

export const Tabs = () => {
  const router = useRouter();

  const { activeTab, tabs, setActive, closeTab } = useTabs();

  useEffect(() => {
    router.push(`/details/${activeTab}`);
  }, [router, activeTab]);

  return (
    <ShadcnTabs
      value={activeTab}
      className="w-[400px]"
      onValueChange={(value) => setActive(value)}
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
