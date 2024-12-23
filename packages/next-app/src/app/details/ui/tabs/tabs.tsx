"use client";

import {
  Tabs as ShadcnTabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { useRouter } from "next/navigation";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";

export const Tabs = () => {
  const router = useRouter();

  const [tabs] = useLocalStorage<string[]>("tabs", ["CD-PROJEKT", "TXT"]);
  const [activeTab, setActive] = useLocalStorage<string>(
    "activeTab",
    "CD-PROJEKT"
  );

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
          </TabsTrigger>
        ))}
      </TabsList>
    </ShadcnTabs>
  );
};
