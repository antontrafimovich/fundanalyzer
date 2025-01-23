export type TickerInfoApi = {
  year: string;
  [key: string]: string;
};

export type ShareInfoApi = {
  year: string;
  Kurs: string;
  "Liczba akcji": string;
};

export type AssetsInfoApi = {
  "Aktywa razem": string;
  "Kapitał własny akcjonariuszy jednostki dominującej": string;
  "Zobowiązania krótkoterminowe": string;
  "Zobowiązania długoterminowe": string;
};

export type CashflowInfoApi = {
  year: string;
  "Przepływy pieniężne z działalności operacyjnej": string;
  "Przepływy pieniężne z działalności inwestycyjnej": string;
  "Przepływy pieniężne z działalności finansowej": string;
};

export type CommonDataApi = {
  currentPrice: string;
  companyDescription: string;
  website: string;
};
