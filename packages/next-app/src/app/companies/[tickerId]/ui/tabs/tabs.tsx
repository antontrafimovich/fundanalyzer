"use client";

import { useTabs } from "@/app/companies/utils/use-tabs";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
    <ul className="pr-1 h-[28px] flex list list-none gap-0" role="tablist">
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <li
            key={tab}
            className={classNames(
              "p-0",
              "flex",
              "rounded-b-none",
              "min-w-32",
              "items-center",
              "text-sm",
              "font-medium",
              "justify-between",
              "rounded-md",
              { "bg-background": isActive },
              { "text-foreground": isActive },
              { "shadow-sm": isActive },
              { "hover:bg-border": !isActive }
            )}
            value={tab}
          >
            <Link
              className="pl-3 pr-2 py-1 flex-1 text-ellipsis overflow-hidden whitespace-nowrap text-left"
              href={`/companies/${tab}`}
            >
              {tab}
            </Link>

            <span
              className="mr-2 hover:bg-slate-100 inline-flex cursor-pointer items-center justify-center size-5 rounded-sm"
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
          </li>
        );
      })}
    </ul>
  );
};
