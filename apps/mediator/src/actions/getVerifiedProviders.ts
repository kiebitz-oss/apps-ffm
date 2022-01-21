import { getApi } from "./getApi";
import { getKeyPairs } from "./getKeyPairs";

export const getVerifiedProviders = async () => {
  return getApi().getVerifiedProviders(getKeyPairs());
};
