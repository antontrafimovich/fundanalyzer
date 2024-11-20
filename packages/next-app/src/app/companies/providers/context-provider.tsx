"use client";

import { Company } from "@/app/model/company";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

export const RootContext = createContext<{
  selectedCompanies: Company[];
  setSelectedCompanies: Dispatch<SetStateAction<Company[]>>;
}>({
  selectedCompanies: [],
  setSelectedCompanies: () => {},
});

export const ContextProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [selectedCompanies, setSelectedCompanies] = useState<Company[]>([]);

  return (
    <RootContext.Provider value={{ selectedCompanies, setSelectedCompanies }}>
      {children}
    </RootContext.Provider>
  );
};
