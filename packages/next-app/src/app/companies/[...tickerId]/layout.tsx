import { ReactNode } from "react";

import { Tabs } from "./ui/tabs/tabs";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ tickerId: string }>;
}) {
  const [activeTicker] = (await params).tickerId ?? [];

  return (
    <div className="flex flex-col min-h-0 h-full p-2 pt-0 bg-surface-primary">
      <Tabs active={activeTicker === "_" ? undefined : activeTicker} />
      {children}
    </div>
  );
}
