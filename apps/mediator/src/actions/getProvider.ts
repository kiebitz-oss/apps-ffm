import { getApi } from "./getApi";
import { getKeyPairs } from "./getKeyPairs";

export const getProvider = async (providerId: string) => {
  return getApi().getProvider(providerId, getKeyPairs());
};
