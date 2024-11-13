"use client";

import { useSearchParams } from 'next/navigation';


export default function ActionSelector() {
  //   const { selectedCompanies } = useContext(RootContext);

  const params = useSearchParams();

  const selectedCompanies = params.get("selected");

  return (
    <div>
      <div>
        <button>
          Compare {selectedCompanies}
        </button>
      </div>
      <div>
        <button>View Details</button>
      </div>
    </div>
  );
}
