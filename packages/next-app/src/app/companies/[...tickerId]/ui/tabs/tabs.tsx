"use client";
import {
  Tabs as ShadcnTabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

import { useTabs } from "./use-tabs";
import { useEffect } from "react";

export const Tabs = ({ active }: { active: string | undefined }) => {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ShadcnTabs
      defaultValue={active}
      className="w-[400px]"
      onValueChange={(value) => {
        router.push(`/companies/${value}`);
      }}
    >
      <TabsList className="bg-transparent pb-0 items-end pl-0">
        {tabs.map((tab) => (
          <TabsTrigger
            className="border-b-ra rounded-b-none hover:bg-border min-w-32 flex justify-between"
            key={tab}
            value={tab}
          >
            {tab}

            <span
              className="ml-2 hover:bg-slate-100 inline-flex items-center justify-center size-5 rounded-sm"
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                width="1em"
                height="1em"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
    </ShadcnTabs>
  );
};
