import { getApi } from "./getApi";
import { getKeyPairs } from "./getKeyPairs";

export const getProviderData = () => {
  return getApi().checkProvider(getKeyPairs());
};
