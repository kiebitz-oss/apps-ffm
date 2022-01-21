import { getStorage } from "./getStorage";

export const setSecret = (secret?: string) => {
  const storage = getStorage();

  if (secret) {
    storage.set("secret", secret);

    return true;
  }

  storage.remove("secret");

  return true;
};
