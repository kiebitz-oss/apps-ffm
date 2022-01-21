import type { UserKeyPairs } from "vanellus";
import { getStorage } from "./getStorage";

export const setKeyPairs = async (keyPairs?: UserKeyPairs) => {
  const storage = getStorage();

  if (keyPairs) {
    storage.get<UserKeyPairs>("keyPairs", keyPairs);

    return true;
  }

  storage.remove("keyPairs");

  return true;
};
