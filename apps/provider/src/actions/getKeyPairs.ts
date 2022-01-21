import { AuthError, ProviderKeyPairs } from "vanellus";
import { getStorage } from "./getStorage";

export const getKeyPairs = () => {
  const storage = getStorage();

  const keyPairs = storage.get<ProviderKeyPairs>("keyPairs");

  if (!keyPairs) {
    throw new AuthError("Please authenticate");
  }

  return keyPairs;
};
