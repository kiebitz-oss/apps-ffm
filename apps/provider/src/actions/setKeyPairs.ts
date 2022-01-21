import type { ProviderKeyPairs } from "vanellus";
import { getStorage } from "./getStorage";

export const setKeyPairs = async (keyPairs?: ProviderKeyPairs) => {
  const storage = getStorage();

  if (keyPairs) {
    // disabled until isValidKeyPairs validates pending providers
    // const isValid = await getApi().isValidKeyPairs(keyPairs);

    // if (!isValid) {
    //   return false;
    // }

    storage.set("keyPairs", keyPairs);

    return true;
  }

  storage.remove("keyPairs");

  return true;
};
