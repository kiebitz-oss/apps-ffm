import { ProviderInput } from "vanellus";
import { getApi } from "./getApi";
import { getKeyPairs } from "./getKeyPairs";

export const storeProvider = (providerInput: ProviderInput, code?: string) => {
  return getApi().storeProvider(providerInput, getKeyPairs(), code);
};
