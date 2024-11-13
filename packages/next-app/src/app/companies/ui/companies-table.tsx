"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function CompaniesTable(props: {
  companies: { text: string; shortname: string }[];
}) {
  //   const { setSelectedCompanies } = useContext(RootContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Company</th>
        </tr>
      </thead>
      <tbody>
        {props.companies.map((company) => (
          <tr
            key={company.text}
            onClick={() =>
              router.push(
                "/companies" +
                  "?" +
                  createQueryString("selected", company.shortname)
              )
            }
          >
            <td>{company.text}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
