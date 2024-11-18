"use client";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { RootContext } from "../providers/context-provider";
import { useRouter } from "next/navigation";

export default function ActionSelector() {
  const { selectedCompanies } = useContext(RootContext);
  const router = useRouter();

  const [company] = selectedCompanies;

  return (
    <div className="basis-32 flex flex-col gap-2">
      <Button
        onClick={() => {
          router.push(`/details/${company.ut}`);
        }}
      >
        View Details
      </Button>
      <Button>Compare</Button>
    </div>
  );
}
