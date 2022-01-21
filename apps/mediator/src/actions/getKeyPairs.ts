import type { MediatorKeyPairs } from "vanellus";
import { AuthError } from "vanellus";
import { getStorage } from "./getStorage";

export const getKeyPairs = () => {
  const storage = getStorage();

  const keyPairs = storage.get<MediatorKeyPairs>("keyPairs");

  if (!keyPairs) {
    throw new AuthError("Please authenticate");
  }

  return keyPairs;
};
