import { Suspense } from "react";
import DataTable from "./data-table/data-table";
import { Card } from "@/components/ui/card";

export default async function Page({
  params,
}: {
  params: Promise<{ tickerId: string }>;
}) {
  const tickerId = (await params).tickerId;

  await fetch(`http://localhost:4000/${tickerId}`);

  return (
    <div>
      <Card>
        <Suspense fallback={<>Loading Data Table...</>}>
          <DataTable tickerId={tickerId} />
        </Suspense>
      </Card>
    </div>
  );
}
