import { AssetsInfoApi } from "../api/ticker-info.api-model";

export type AssetsInfo = {
  [T in keyof AssetsInfoApi]: number;
};
