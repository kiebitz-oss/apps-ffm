import { getAnonymousApi } from "./getAnonymousApi";

export const getProviders = async (
  zipFrom: number | string,
  zipTo?: number | string
) => {
  return getAnonymousApi().getProviders(zipFrom, zipTo);
};
