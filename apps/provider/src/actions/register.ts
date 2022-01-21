import type { ProviderInput } from "vanellus";
import { getApi } from "./getApi";
import { getStorage } from "./getStorage";

export const register = async (
  providerInput: ProviderInput,
  signupCode?: string
) => {
  const api = getApi();
  const storage = getStorage();
  const keyPairs = await getApi().generateKeyPairs();
  const secret = api.generateSecret();

  storage.set("keyPairs", keyPairs);
  storage.set("secret", secret);

  return api.storeProvider(providerInput, keyPairs, signupCode);
};
