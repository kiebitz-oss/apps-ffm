import { AuthError } from "vanellus";
import { getStorage } from "./getStorage";

export const getSecret = () => {
  const storage = getStorage();

  const secret = storage.get<string>("secret");

  if (!secret) {
    throw new AuthError("Please authenticate");
  }

  return secret;
};
