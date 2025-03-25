import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Card className="flex flex-1 min-h-0 border-t-0 border-border rounded-tl-none border-l-0">
      <div className="flex-1 p-6 flex-col space-y-6">
        <Skeleton className="w-1/2 h-6" />

        <DataTableSkeleton />
      </div>
      <Separator orientation="vertical" />
      <div className="flex-1 p-6">
        <CombinedChartSkeleton />
      </div>
    </Card>
  );
}

function DataTableSkeleton() {
  return (
    <div>
      <div className="flex space-x-4 border-b border-gray-200 pb-2 mb-2">
        <Skeleton className="w-1/4 h-6" />
        <Skeleton className="w-1/4 h-6" />
        <Skeleton className="w-1/4 h-6" />
      </div>
      {[...Array(19)].map((_, index) => (
        <div
          key={index}
          className="flex space-x-4 border-b border-gray-200 pb-2 mb-2"
        >
          <Skeleton className="w-1/4 h-6" />
          <Skeleton className="w-1/4 h-6" />
          <Skeleton className="w-1/4 h-6" />
        </div>
      ))}
    </div>
  );
}

function CombinedChartSkeleton() {
  return (
    <div className="flex flex-col size-full space-y-5">
      <div className="flex w-full basis-6 shrink-0 grow-0 justify-between">
        <Skeleton className="w-1/6 h-6" />
        <Skeleton className="w-1/6 h-6" />
      </div>
      <Skeleton className="w-full flex-1 min-h-0" />
    </div>
  );
}
