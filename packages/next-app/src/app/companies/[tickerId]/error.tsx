"use client";

import { Card } from "@/components/ui/card";

export default function Error({ error }: { error: Error }) {
  return (
    <Card className="flex flex-1 font-bold items-center justify-center min-h-0 border-t-0 border-border rounded-tl-none border-l-0">
      An error has occurred, reason: Ticker name is probably incorrect. Details:{" "}
      {error.message}
    </Card>
  );
}
