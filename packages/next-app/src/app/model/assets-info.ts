import { AssetsInfoApi } from "../actions/get-assets";

export type AssetsInfo = {
  [T in Exclude<keyof AssetsInfoApi, "year">]: number;
};
