import type { MediatorKeyPairs } from "vanellus";
import { getApi } from "./getApi";
import { getStorage } from "./getStorage";

export const setKeyPairs = async (keyPairs: MediatorKeyPairs | null) => {
  const storage = getStorage();
  const api = getApi();

  if (keyPairs) {
    const isValid = await api.isValidKeyPairs(keyPairs);

    if (!isValid) {
      return false;
    }

    storage.set("keyPairs", keyPairs);

    return true;
  }

  storage.remove("keyPairs");

  return true;
};
