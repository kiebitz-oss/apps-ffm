import { getAnonymousApi } from "./getAnonymousApi";

export const getConfigurables = async () => {
  return getAnonymousApi().getConfigurables();
};
