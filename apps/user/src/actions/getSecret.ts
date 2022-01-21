import { AuthError } from "vanellus";
import { generateSecret } from "./generateSecret";
import { getStorage } from "./getStorage";
import { setSecret } from "./setSecret";

export const getSecret = (force: boolean = false) => {
  let secret = getStorage().get<string>("secret");

  if (!secret && force) {
    secret = generateSecret();
    setSecret(secret);
  }

  if (!secret) {
    throw new AuthError("Please authenticate");
  }

  return secret;
};
