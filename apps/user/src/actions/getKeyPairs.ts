import type { UserKeyPairs } from "vanellus";
import { AuthError } from "vanellus";
import { getStorage } from "./getStorage";

export const getKeyPairs = () => {
  const storage = getStorage();

  const keyPairs = storage.get<UserKeyPairs>("keyPairs");

  if (!keyPairs) {
    throw new AuthError("Please authenticate");
  }

  return keyPairs;
};
