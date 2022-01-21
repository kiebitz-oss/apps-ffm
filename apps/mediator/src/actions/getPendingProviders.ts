import { getApi } from "./getApi";
import { getKeyPairs } from "./getKeyPairs";

export const getPendingProviders = async () => {
  return getApi().getPendingProviders(getKeyPairs());
};
