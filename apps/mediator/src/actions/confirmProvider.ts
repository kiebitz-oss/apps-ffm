import type { Provider } from "vanellus";
import { getApi } from "./getApi";
import { getKeyPairs } from "./getKeyPairs";

export const confirmProvider = (provider: Provider) => {
  return getApi().confirmProvider(provider, getKeyPairs());
};
