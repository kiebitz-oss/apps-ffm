import { getApi } from "./getApi";
import { setSecret } from "./setSecret";

export const generateSecret = () => {
  const secret = getApi().generateSecret();

  setSecret(secret);

  return secret;
};
