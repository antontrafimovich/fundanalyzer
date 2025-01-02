import { AssetsInfoApi } from "../companies/[[...tickerId]]/api/ticker-info.api-model";

export type AssetsInfo = {
  [T in keyof AssetsInfoApi]: number;
};
