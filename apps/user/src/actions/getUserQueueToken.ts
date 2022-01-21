import { UserQueueToken } from "vanellus";
import { getStorage } from "./getStorage";

export const getUserQueueToken = () => {
  return getStorage().get<UserQueueToken>("token");
};
