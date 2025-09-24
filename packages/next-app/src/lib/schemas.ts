import { z } from "zod";

// Schema for AssetsInfoApi
export const AssetsInfoApiSchema = z.object({
  year: z.string(),
  "Aktywa razem": z.string(),
  "Kapitał własny akcjonariuszy jednostki dominującej": z.string(),
  "Zobowiązania krótkoterminowe": z.string(),
  "Zobowiązania długoterminowe": z.string(),
});

export type AssetsInfoApi = z.infer<typeof AssetsInfoApiSchema>;

// Schema for CashflowInfoApi
export const CashflowInfoApiSchema = z.object({
  year: z.string(),
  "Przepływy pieniężne z działalności operacyjnej": z.string(),
  "Przepływy pieniężne z działalności inwestycyjnej": z.string(),
  "Przepływy pieniężne z działalności finansowej": z.string(),
});

export type CashflowInfoApi = z.infer<typeof CashflowInfoApiSchema>;

// Schema for tickerId
export const TickerIdSchema = z.string().min(1).max(30); // Updated to 30 chars max

// Schema for CommonDataApi
export const CommonDataApiSchema = z.object({
  currentPrice: z.string(),
  companyDescription: z.string(),
  website: z.string(),
});

export type CommonDataApi = z.infer<typeof CommonDataApiSchema>;

// Schema for DividendsInfoApi
export const DividendsInfoApiSchema = z.object({
  year: z.string(),
  dividends: z.number(),
});

export type DividendsInfoApi = z.infer<typeof DividendsInfoApiSchema>;

// Schema for PnlInfoApi
export const PnlInfoApiSchema = z.object({
  year: z.string(),
}).catchall(z.string());

export type PnlInfoApi = z.infer<typeof PnlInfoApiSchema>;

// Schema for ShareInfoApi
export const ShareInfoApiSchema = z.object({
  year: z.string(),
  Kurs: z.string(),
  "Liczba akcji": z.string(),
});

export type ShareInfoApi = z.infer<typeof ShareInfoApiSchema>;

// Schema for Company
export const CompanySchema = z.object({
  text: z.string(),
  shortname: z.string(),
  ut: z.string(),
});

export type Company = z.infer<typeof CompanySchema>;

// Add more schemas as needed
