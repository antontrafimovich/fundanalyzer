'use client'

import { createContext, PropsWithChildren, useState } from "react";

export const RootContext = createContext({});

export const ContextProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  return (
    <RootContext.Provider value={{ selectedCompanies, setSelectedCompanies }}>
      {children}
    </RootContext.Provider>
  );
};
