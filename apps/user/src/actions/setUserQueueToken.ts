import { UserQueueToken } from "vanellus";
import { getStorage } from "./getStorage";

export const setUserQueueToken = (token?: UserQueueToken) => {
  const storage = getStorage();

  if (token) {
    storage.set("token", token);

    return true;
  }

  storage.remove("token");

  return true;
};
